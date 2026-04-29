import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Backfill route v3.2 — LINDAS SPARQL (Swiss Open Data)
// NO AUTHENTICATION NEEDED
// Filters by canton using BFS municipality number ranges
//
// Usage:
//   ?test=true       → diagnostic: verify queries work
//   ?canton=VD       → single canton
//   ?limit=5000      → max per canton (default: 10000)
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const SPARQL_ENDPOINT = "https://lindas.admin.ch/query";
const ZEFIX_GRAPH = "https://lindas.admin.ch/foj/zefix";
const MUNI_PREFIX = "https://ld.admin.ch/municipality/";

// BFS municipality number ranges per canton (well-known Swiss administrative numbering)
const CANTONS_ROMANDS: Record<string, { min: number; max: number }> = {
  FR: { min: 2000, max: 2399 },
  VD: { min: 5400, max: 5999 },
  VS: { min: 6000, max: 6399 },
  NE: { min: 6400, max: 6499 },
  GE: { min: 6600, max: 6699 },
  JU: { min: 6700, max: 6799 },
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
 * "https://register.ld.admin.ch/zefix/company/773824/UID/CHE112103297" → "CHE-112.103.297"
 */
function extractUID(uidUri: string): string {
  const match = uidUri.match(/CHE(\d{9})/);
  if (!match) return uidUri;
  const d = match[1];
  return `CHE-${d.substring(0, 3)}.${d.substring(3, 6)}.${d.substring(6, 9)}`;
}

/**
 * Extract municipality number from LINDAS URI.
 * "https://ld.admin.ch/municipality/5586" → 5586
 */
function extractMuniId(muniUri: string): number {
  const match = muniUri.match(/municipality\/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

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
 * Build SPARQL query for a canton using BFS municipality number range.
 */
function buildCantonQuery(cantonCode: string, range: { min: number; max: number }, limit: number): string {
  return `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT DISTINCT ?company ?name ?uid ?legalFormLabel ?municipality ?description ?muniUri
    WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name ;
                 admin:municipality ?muniUri ;
                 schema:identifier ?uidNode .
        OPTIONAL { ?company schema:additionalType/schema:name ?legalFormLabel }
        OPTIONAL { ?company schema:description ?description }
        FILTER(CONTAINS(STR(?uidNode), "/UID/"))
        BIND(xsd:integer(REPLACE(STR(?muniUri), "${MUNI_PREFIX}", "")) AS ?muniId)
        FILTER(?muniId >= ${range.min} && ?muniId <= ${range.max})
      }
      OPTIONAL { ?muniUri schema:name ?municipality }
      BIND(STR(?uidNode) AS ?uid)
    }
    LIMIT ${limit}
  `;
}

/**
 * ── TEST MODE ──
 */
async function runDiagnostic() {
  const tests = [];

  // Test 1: Count total
  const t1 = await sparqlQuery(`
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT (COUNT(DISTINCT ?c) AS ?total) WHERE {
      GRAPH <${ZEFIX_GRAPH}> { ?c a admin:ZefixOrganisation }
    }
  `);
  tests.push({ test: "total_companies", result: t1.data?.[0]?.total?.value, ok: t1.success });

  // Test 2: Count VD companies using BFS range filter
  const vdRange = CANTONS_ROMANDS["VD"];
  const t2 = await sparqlQuery(`
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    SELECT (COUNT(DISTINCT ?company) AS ?total) WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        ?company a admin:ZefixOrganisation ;
                 admin:municipality ?muni .
        BIND(xsd:integer(REPLACE(STR(?muni), "${MUNI_PREFIX}", "")) AS ?muniId)
        FILTER(?muniId >= ${vdRange.min} && ?muniId <= ${vdRange.max})
      }
    }
  `);
  tests.push({ test: "count_VD_bfs_range", result: t2.data?.[0]?.total?.value, ok: t2.success, error: t2.error });

  // Test 3: Fetch 5 VD companies with all fields
  const t3 = await sparqlQuery(buildCantonQuery("VD", vdRange, 5));
  tests.push({
    test: "sample_VD_companies",
    count: t3.data?.length,
    result: t3.data?.slice(0, 5).map(r => ({
      name: r.name?.value,
      uid: r.uid?.value ? extractUID(r.uid.value) : null,
      municipality: r.municipality?.value,
      legalForm: r.legalFormLabel?.value,
      description: r.description?.value?.substring(0, 100),
    })),
    ok: t3.success,
    error: t3.error,
  });

  // Test 4: Count all romandie cantons
  for (const [code, range] of Object.entries(CANTONS_ROMANDS)) {
    const t = await sparqlQuery(`
      PREFIX admin: <https://schema.ld.admin.ch/>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      SELECT (COUNT(DISTINCT ?c) AS ?total) WHERE {
        GRAPH <${ZEFIX_GRAPH}> {
          ?c a admin:ZefixOrganisation ;
             admin:municipality ?muni .
          BIND(xsd:integer(REPLACE(STR(?muni), "${MUNI_PREFIX}", "")) AS ?muniId)
          FILTER(?muniId >= ${range.min} && ?muniId <= ${range.max})
        }
      }
    `);
    tests.push({ test: `count_${code}`, result: t.data?.[0]?.total?.value, ok: t.success });
  }

  return tests;
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

  // ── SCHEMA MODE — discover table columns ───────────────────────────────
  if (url.searchParams.get("schema") === "true") {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from("companies").select("*").limit(1);
    const columns = data && data.length > 0 ? Object.keys(data[0]) : null;
    return NextResponse.json({
      schema: true,
      columns,
      sampleRow: data?.[0] || null,
      error: error?.message || null,
      hint: columns ? "Use these column names in the upsert" : "Table might be empty or not exist",
    });
  }

  // ── TEST MODE ─────────────────────────────────────────────────────────────
  if (testMode) {
    const results = await runDiagnostic();
    return NextResponse.json({ test: true, version: "3.2", results });
  }

  // ── BACKFILL MODE ─────────────────────────────────────────────────────────
  const cantonEntries = singleCanton && CANTONS_ROMANDS[singleCanton]
    ? [[singleCanton, CANTONS_ROMANDS[singleCanton]] as [string, { min: number; max: number }]]
    : Object.entries(CANTONS_ROMANDS) as [string, { min: number; max: number }][];

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log(`Backfill v3.2: ${cantonEntries.map(e => e[0]).join(", ")}`);

    let totalFetched = 0;
    let totalInserted = 0;
    let totalClassified = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let firstError: { message: string; code: string; details: string; hint: string; sample: Record<string, unknown> } | null = null;
    const cantonResults: { canton: string; fetched: number; inserted: number; error?: string }[] = [];

    for (const [cantonCode, range] of cantonEntries) {
      console.log(`Querying ${cantonCode} (BFS ${range.min}-${range.max})...`);
      const query = buildCantonQuery(cantonCode, range, limitPerCanton);
      const result = await sparqlQuery(query);

      if (!result.success || !result.data) {
        console.error(`SPARQL error for ${cantonCode}:`, result.error);
        cantonResults.push({ canton: cantonCode, fetched: 0, inserted: 0, error: result.error });
        continue;
      }

      // Deduplicate by company URI
      const seen = new Set<string>();
      const uniqueRows: SparqlBinding[] = [];
      for (const row of result.data) {
        const key = row.company?.value || "";
        if (key && !seen.has(key)) {
          seen.add(key);
          uniqueRows.push(row);
        }
      }

      totalFetched += uniqueRows.length;
      console.log(`${cantonCode}: ${uniqueRows.length} companies`);

      let cantonInserted = 0;

      // Process in batches for Supabase
      const BATCH_SIZE = 50;
      for (let i = 0; i < uniqueRows.length; i += BATCH_SIZE) {
        const batch = uniqueRows.slice(i, i + BATCH_SIZE);
        const records = [];

        for (const row of batch) {
          const uidRaw = row.uid?.value || "";
          const name = row.name?.value || "";
          if (!uidRaw || !name) { totalSkipped++; continue; }

          const uid = extractUID(uidRaw);
          const slug = generateSlug(name, uid);
          const legalForm = mapLegalForm(row.legalFormLabel?.value);
          const purpose = row.description?.value || "";
          const sector = classifySector(purpose || undefined);
          if (sector) totalClassified++;

          records.push({
            uid,
            name,
            slug,
            canton: cantonCode,
            legal_form: legalForm,
            purpose,
            sector,
            updated_at: new Date().toISOString(),
          });
        }

        if (records.length > 0) {
          const { error } = await supabase.from("companies").upsert(records, { onConflict: "uid" });
          if (error) {
            console.error(`Batch insert error:`, error.message);
            // Capture first error for debugging
            if (!firstError) firstError = { message: error.message, code: error.code, details: error.details, hint: error.hint, sample: records[0] };
            totalErrors += records.length;
          } else {
            totalInserted += records.length;
            cantonInserted += records.length;
          }
        }
      }

      cantonResults.push({ canton: cantonCode, fetched: uniqueRows.length, inserted: cantonInserted });
    }

    return NextResponse.json({
      success: true,
      version: "3.2",
      source: "LINDAS SPARQL",
      totalFetched,
      totalInserted,
      totalClassified,
      totalSkipped,
      totalErrors,
      firstError,
      cantonResults,
    });
  } catch (error) {
    console.error("Backfill v3.2 error:", error);
    return NextResponse.json({ error: "Backfill failed", details: String(error) }, { status: 500 });
  }
}
