import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Backfill route v3.1 — uses LINDAS SPARQL (Swiss Open Data)
// NO AUTHENTICATION NEEDED — 783k+ companies available
// Endpoint: https://lindas.admin.ch/query
//
// Usage:
//   ?days=30         → fetch all active companies (LINDAS has no date filter, we get all)
//   ?canton=VD       → single canton only
//   ?test=true       → diagnostic mode
//   ?limit=5000      → max companies per canton (default: 10000)
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes for backfill

const SPARQL_ENDPOINT = "https://lindas.admin.ch/query";
const ZEFIX_GRAPH = "https://lindas.admin.ch/foj/zefix";

// Canton codes → LINDAS canton IDs (FSO numbering)
const CANTONS_ROMANDS: Record<string, string> = {
  VD: "22",
  GE: "25",
  VS: "23",
  FR: "10",
  NE: "24",
  JU: "26",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SparqlBinding = Record<string, { type: string; value: string }>;

function mapLegalForm(zefixForm: string | undefined): string {
  if (!zefixForm) return "Autre";
  const lower = zefixForm.toLowerCase();
  if (lower.includes("raison individuelle") || lower.includes("einzelunternehm") || lower.includes("sole proprietorship")) return "RI";
  if (lower.includes("sarl") || lower.includes("gmbh") || lower.includes("limited liability")) return "Sarl";
  if (lower.includes("société anonyme") || lower.includes("aktiengesellschaft") || lower.includes("stock corporation") || lower === "sa" || lower === "ag") return "SA";
  if (lower.includes("association") || lower.includes("verein")) return "Association";
  if (lower.includes("fondation") || lower.includes("stiftung") || lower.includes("foundation")) return "Fondation";
  return "Autre";
}

function classifySector(purpose: string | undefined): string | null {
  if (!purpose) return null;
  const p = purpose.toLowerCase();

  if (
    p.includes("informatique") || p.includes("logiciel") || p.includes("software") ||
    p.includes("développement web") || p.includes("application") || p.includes("digital") ||
    p.includes("données") || p.includes("data") || p.includes("intelligence artificielle") ||
    p.includes("cybersécurité") || p.includes("cloud") || p.includes("saas") ||
    p.includes("fintech") || p.includes("blockchain") || p.includes("crypto") ||
    p.includes("e-commerce") || p.includes("plateforme") || p.includes("hébergement") ||
    p.includes("technolog") || p.includes("it-") || p.includes("programmation") ||
    p.includes("internet") || p.includes("web") || p.includes("app ")
  ) return "tech";

  if (
    p.includes("médic") || p.includes("santé") || p.includes("soins") ||
    p.includes("dentaire") || p.includes("dentiste") || p.includes("pharma") ||
    p.includes("thérap") || p.includes("psycholog") || p.includes("infirm") ||
    p.includes("fitness") || p.includes("sport") || p.includes("physiothérap") ||
    p.includes("cabinet") || p.includes("clinique") || p.includes("laborat") ||
    p.includes("vétérinaire") || p.includes("ostéopath") || p.includes("diététi") ||
    p.includes("gesundheit") || p.includes("medizin") || p.includes("praxis") ||
    p.includes("cosmétique") || p.includes("esthétique") || p.includes("massage") ||
    p.includes("yoga") || p.includes("coach") || p.includes("nutrition")
  ) return "sante";

  if (
    p.includes("construction") || p.includes("bâtiment") || p.includes("travaux") ||
    p.includes("rénovation") || p.includes("maçonnerie") || p.includes("plomberie") ||
    p.includes("électricité") || p.includes("chauffage") || p.includes("menuiserie") ||
    p.includes("carrelage") || p.includes("peinture en bâtiment") || p.includes("toiture") ||
    p.includes("génie civil") || p.includes("charpente") || p.includes("isolation") ||
    p.includes("démolition") || p.includes("terrassement") || p.includes("sanitaire") ||
    p.includes("ventilation") || p.includes("climatisation") || p.includes("serrurerie") ||
    p.includes("bau") || p.includes("renovierung") || p.includes("montage")
  ) return "construction";

  if (
    p.includes("restaurant") || p.includes("café") || p.includes("bar") ||
    p.includes("traiteur") || p.includes("boulangerie") || p.includes("pâtisserie") ||
    p.includes("hôtel") || p.includes("hébergement touristique") || p.includes("catering") ||
    p.includes("food") || p.includes("gastronomie") || p.includes("cuisine") ||
    p.includes("pizzeria") || p.includes("brasserie") || p.includes("bistro") ||
    p.includes("take away") || p.includes("livraison de repas") || p.includes("snack") ||
    p.includes("restauration") || p.includes("tea room") || p.includes("kebab")
  ) return "restauration";

  if (
    p.includes("immobili") || p.includes("gérance") || p.includes("courtage") ||
    p.includes("promotion immobili") || p.includes("régie") || p.includes("foncier") ||
    p.includes("location d'") || p.includes("location de") || p.includes("achat et vente d'immeubles") ||
    p.includes("gestion d'immeubles") || p.includes("copropriété") ||
    p.includes("immobilien") || p.includes("liegenschaft")
  ) return "immobilier";

  if (
    p.includes("conseil") || p.includes("consulting") || p.includes("consultant") ||
    p.includes("fiduciaire") || p.includes("comptab") || p.includes("révision") ||
    p.includes("audit") || p.includes("gestion d'entreprise") || p.includes("management") ||
    p.includes("ressources humaines") || p.includes("recrutement") || p.includes("formation") ||
    p.includes("coaching") || p.includes("stratégi") || p.includes("marketing") ||
    p.includes("communication") || p.includes("publicité") || p.includes("relations publiques") ||
    p.includes("avoca") || p.includes("juridique") || p.includes("notari") ||
    p.includes("traduction") || p.includes("événement") || p.includes("organisation") ||
    p.includes("beratung") || p.includes("treuhand") || p.includes("buchhaltung")
  ) return "conseil";

  if (
    p.includes("commerce") || p.includes("vente") || p.includes("achat") ||
    p.includes("import") || p.includes("export") || p.includes("négoce") ||
    p.includes("distribution") || p.includes("grossiste") || p.includes("détail") ||
    p.includes("marchandise") || p.includes("produit") || p.includes("fourniture") ||
    p.includes("magasin") || p.includes("boutique") || p.includes("représentation") ||
    p.includes("courtier") || p.includes("agent") || p.includes("handel") ||
    p.includes("verkauf") || p.includes("vertrieb") || p.includes("shop")
  ) return "commerce";

  return null;
}

function generateSlug(name: string, uid: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 80);
  const shortUid = uid.replace(/^CHE-?/, "").replace(/\./g, "").substring(0, 9);
  return `${slug}-${shortUid}`;
}

/**
 * Extract CHE UID from LINDAS URI.
 * Input:  "https://register.ld.admin.ch/zefix/company/773824/UID/CHE112103297"
 * Output: "CHE-112.103.297"
 */
function extractUID(uidUri: string): string {
  const match = uidUri.match(/CHE(\d{9})/);
  if (!match) return uidUri;
  const digits = match[1];
  return `CHE-${digits.substring(0, 3)}.${digits.substring(3, 6)}.${digits.substring(6, 9)}`;
}

/**
 * Execute a SPARQL query against LINDAS.
 */
async function sparqlQuery(query: string): Promise<{ success: boolean; data?: SparqlBinding[]; error?: string; status?: number }> {
  try {
    const response = await fetch(SPARQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Accept": "application/sparql-results+json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return { success: false, error: errorText.substring(0, 500), status: response.status };
    }

    const json = await response.json();
    return { success: true, data: json.results?.bindings || [], status: response.status };
  } catch (err) {
    return { success: false, error: String(err).substring(0, 500) };
  }
}

/**
 * ── TEST MODE ──
 * Discovers the exact schema and tests canton filtering.
 */
async function runDiagnostic() {
  const tests = [];

  // Test 1: Count total companies
  const t1 = await sparqlQuery(`
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT (COUNT(DISTINCT ?c) AS ?total) WHERE {
      GRAPH <${ZEFIX_GRAPH}> { ?c a admin:ZefixOrganisation }
    }
  `);
  tests.push({ test: "total_companies", result: t1.data?.[0]?.total?.value, ok: t1.success });

  // Test 2: Get full details of ONE company to see all properties
  const t2 = await sparqlQuery(`
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?prop ?val WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        <https://register.ld.admin.ch/zefix/company/773824> ?prop ?val .
      }
    }
  `);
  tests.push({
    test: "all_properties_of_one_company",
    result: t2.data?.map(r => ({ prop: r.prop?.value, val: r.val?.value })),
    ok: t2.success,
  });

  // Test 3: Explore municipality link (for canton filtering)
  const t3 = await sparqlQuery(`
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?muni ?muniProp ?muniVal WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        <https://register.ld.admin.ch/zefix/company/773824> admin:municipality ?muni .
      }
      ?muni ?muniProp ?muniVal .
    }
    LIMIT 20
  `);
  tests.push({
    test: "municipality_properties",
    result: t3.data?.map(r => ({ muni: r.muni?.value, prop: r.muniProp?.value, val: r.muniVal?.value })),
    ok: t3.success,
  });

  // Test 4: Try canton filtering via municipality
  const t4 = await sparqlQuery(`
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?name ?uid ?municipality WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name ;
                 admin:municipality ?muni ;
                 schema:identifier ?uidNode .
        FILTER(CONTAINS(STR(?uidNode), "/UID/"))
      }
      ?muni <https://schema.ld.admin.ch/canton> <https://ld.admin.ch/canton/22> .
      ?muni schema:name ?municipality .
      BIND(STR(?uidNode) AS ?uid)
    }
    LIMIT 5
  `);
  tests.push({
    test: "canton_VD_via_municipality",
    count: t4.data?.length,
    result: t4.data?.slice(0, 5),
    ok: t4.success,
    error: t4.error,
  });

  // Test 5: Alternative — canton link directly on company
  const t5 = await sparqlQuery(`
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?name ?uid ?desc ?municipality WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name ;
                 admin:municipality ?muni ;
                 schema:identifier ?uidNode .
        OPTIONAL { ?company schema:description ?desc }
        FILTER(CONTAINS(STR(?uidNode), "/UID/"))
        FILTER(CONTAINS(STR(?muni), "municipality/5586"))
      }
      OPTIONAL { ?muni schema:name ?municipality }
      BIND(STR(?uidNode) AS ?uid)
    }
    LIMIT 5
  `);
  tests.push({
    test: "canton_VD_lausanne_municipality_5586",
    count: t5.data?.length,
    result: t5.data?.slice(0, 5),
    ok: t5.success,
    error: t5.error,
  });

  // Test 6: Count companies per canton (VD) using the municipality→canton link
  const t6 = await sparqlQuery(`
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT (COUNT(DISTINCT ?company) AS ?total) WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        ?company a admin:ZefixOrganisation ;
                 admin:municipality ?muni .
      }
      ?muni <https://schema.ld.admin.ch/canton> <https://ld.admin.ch/canton/22> .
    }
  `);
  tests.push({
    test: "count_VD_companies",
    result: t6.data?.[0]?.total?.value,
    ok: t6.success,
    error: t6.error,
  });

  return tests;
}

/**
 * Fetch companies for a canton via SPARQL.
 * Uses municipality → canton link for filtering.
 * Only fetches UID-type identifiers to avoid duplicates.
 */
function buildCantonQuery(cantonId: string, limit: number): string {
  return `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>

    SELECT DISTINCT ?company ?name ?uid ?legalFormLabel ?municipality ?description
    WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name ;
                 admin:municipality ?muni ;
                 schema:identifier ?uidNode .
        OPTIONAL { ?company schema:additionalType/schema:name ?legalFormLabel }
        OPTIONAL { ?company schema:description ?description }
        FILTER(CONTAINS(STR(?uidNode), "/UID/"))
      }
      ?muni <https://schema.ld.admin.ch/canton> <https://ld.admin.ch/canton/${cantonId}> .
      OPTIONAL { ?muni schema:name ?municipality }
      BIND(STR(?uidNode) AS ?uid)
    }
    LIMIT ${limit}
  `;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");
    if (secret !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const url = new URL(request.url);
  const testMode = url.searchParams.get("test") === "true";
  const singleCanton = url.searchParams.get("canton");
  const limitPerCanton = parseInt(url.searchParams.get("limit") || "10000");

  // ── TEST MODE ─────────────────────────────────────────────────────────────
  if (testMode) {
    console.log("Running SPARQL v3.1 diagnostic...");
    const results = await runDiagnostic();
    return NextResponse.json({
      test: true,
      version: "3.1",
      source: "LINDAS SPARQL (no auth needed)",
      endpoint: SPARQL_ENDPOINT,
      results,
    });
  }

  // ── BACKFILL MODE ─────────────────────────────────────────────────────────
  const cantonEntries = singleCanton && CANTONS_ROMANDS[singleCanton]
    ? [[singleCanton, CANTONS_ROMANDS[singleCanton]]]
    : Object.entries(CANTONS_ROMANDS);

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log(`Backfill v3.1: SPARQL query for ${cantonEntries.map(e => e[0]).join(", ")}`);

    let totalFetched = 0;
    let totalInserted = 0;
    let totalClassified = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    const cantonResults: { canton: string; fetched: number; inserted: number; queryError?: string }[] = [];

    for (const [cantonCode, cantonId] of cantonEntries) {
      console.log(`Querying ${cantonCode} (canton ID ${cantonId})...`);
      const query = buildCantonQuery(cantonId, limitPerCanton);
      const result = await sparqlQuery(query);

      if (!result.success || !result.data) {
        console.error(`SPARQL error for ${cantonCode}:`, result.error);
        cantonResults.push({ canton: cantonCode, fetched: 0, inserted: 0, queryError: result.error });
        continue;
      }

      // Deduplicate by company URI (in case of multiple bindings)
      const seen = new Set<string>();
      const uniqueRows: SparqlBinding[] = [];
      for (const row of result.data) {
        const companyUri = row.company?.value || "";
        if (!seen.has(companyUri)) {
          seen.add(companyUri);
          uniqueRows.push(row);
        }
      }

      totalFetched += uniqueRows.length;
      console.log(`${cantonCode}: ${result.data.length} raw rows → ${uniqueRows.length} unique companies`);

      let cantonInserted = 0;

      for (const row of uniqueRows) {
        const uidRaw = row.uid?.value || "";
        const name = row.name?.value || "";

        if (!uidRaw || !name) {
          totalSkipped++;
          continue;
        }

        const uid = extractUID(uidRaw);
        const slug = generateSlug(name, uid);
        const legalForm = mapLegalForm(row.legalFormLabel?.value);
        const purpose = row.description?.value || "";
        const sector = classifySector(purpose || undefined);
        if (sector) totalClassified++;

        try {
          const { error } = await supabase.from("companies").upsert(
            {
              uid,
              name,
              slug,
              canton: cantonCode,
              legal_form: legalForm,
              legal_seat: row.municipality?.value || "",
              purpose,
              sector,
              status: "active",
              source: "zefix-sparql",
              creation_date: new Date().toISOString().split("T")[0],
              is_active: true,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "uid" }
          );

          if (error) {
            console.error(`Error inserting ${uid}:`, error.message);
            totalErrors++;
          } else {
            totalInserted++;
            cantonInserted++;
          }
        } catch (err) {
          console.error(`Error processing ${uid}:`, err);
          totalErrors++;
        }
      }

      cantonResults.push({ canton: cantonCode, fetched: uniqueRows.length, inserted: cantonInserted });
    }

    const result = {
      success: true,
      backfill: true,
      version: "3.1",
      source: "LINDAS SPARQL",
      totalFetched,
      totalInserted,
      totalClassified,
      totalSkipped,
      totalErrors,
      cantonResults,
    };

    console.log("Backfill v3.1 result:", JSON.stringify(result));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Backfill v3.1 error:", error);
    return NextResponse.json(
      { error: "Backfill failed", details: String(error) },
      { status: 500 }
    );
  }
}
