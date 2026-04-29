import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Backfill route v3 — uses LINDAS SPARQL (Swiss Linked Data)
// NO AUTHENTICATION NEEDED — Zefix data is public open data
// Endpoint: https://lindas.admin.ch/query
//
// Usage:
//   ?days=30         → fetch companies created in last 30 days (default: 30, max: 90)
//   ?canton=VD       → single canton only
//   ?test=true       → diagnostic mode: test SPARQL connectivity + discover schema
//   ?details=true    → include purpose field (slower, needs Zefix REST API auth)
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes for backfill

const SPARQL_ENDPOINT = "https://lindas.admin.ch/query";

// Canton codes mapped to their LINDAS URIs
// Swiss cantons in LINDAS use the FSO (OFS) municipality numbers
const CANTONS_ROMANDS: Record<string, { code: string; id: string }> = {
  VD: { code: "VD", id: "22" },
  GE: { code: "GE", id: "25" },
  VS: { code: "VS", id: "23" },
  FR: { code: "FR", id: "10" },
  NE: { code: "NE", id: "24" },
  JU: { code: "JU", id: "26" },
};

interface SparqlResult {
  name?: { value: string };
  uid?: { value: string };
  legalForm?: { value: string };
  legalFormLabel?: { value: string };
  municipality?: { value: string };
  canton?: { value: string };
  cantonCode?: { value: string };
  company?: { value: string };
  dateRegistration?: { value: string };
  status?: { value: string };
  purpose?: { value: string };
}

interface ParsedCompany {
  uid: string;
  name: string;
  legalForm: string;
  legalSeat: string;
  canton: string;
  purpose: string;
  registrationDate: string;
  status: string;
  zefixUrl: string;
}

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
 * Execute a SPARQL query against LINDAS endpoint.
 * Returns parsed JSON results or error.
 */
async function sparqlQuery(query: string): Promise<{ success: boolean; data?: SparqlResult[]; error?: string; status?: number }> {
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
 * Tests SPARQL connectivity, discovers available properties, and fetches sample data.
 */
async function runDiagnostic() {
  const tests = [];

  // Test 1: Basic connectivity — count companies
  const countQuery = `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT (COUNT(?company) AS ?total)
    WHERE {
      GRAPH <https://lindas.admin.ch/foj/zefix> {
        ?company a admin:ZefixOrganisation .
      }
    }
  `;
  const countResult = await sparqlQuery(countQuery);
  tests.push({
    test: "count_all_companies",
    success: countResult.success,
    httpStatus: countResult.status,
    result: countResult.data?.[0]?.total?.value || null,
    error: countResult.error || null,
  });

  // Test 2: Discover properties on a single company
  const propsQuery = `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT DISTINCT ?property
    WHERE {
      GRAPH <https://lindas.admin.ch/foj/zefix> {
        ?company a admin:ZefixOrganisation ;
                 ?property ?value .
      }
    }
    LIMIT 50
  `;
  const propsResult = await sparqlQuery(propsQuery);
  tests.push({
    test: "discover_properties",
    success: propsResult.success,
    httpStatus: propsResult.status,
    result: propsResult.data?.map((r: Record<string, { value: string }>) => r.property?.value) || [],
    error: propsResult.error || null,
  });

  // Test 3: Fetch 5 sample companies from VD with all available fields
  const sampleQuery = `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?company ?name ?uid ?legalFormLabel ?municipality
    WHERE {
      GRAPH <https://lindas.admin.ch/foj/zefix> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name .
        OPTIONAL { ?company schema:identifier ?uid }
        OPTIONAL { ?company schema:additionalType/schema:name ?legalFormLabel }
        OPTIONAL { ?company schema:address/schema:addressLocality ?municipality }
      }
    }
    LIMIT 5
  `;
  const sampleResult = await sparqlQuery(sampleQuery);
  tests.push({
    test: "sample_companies",
    success: sampleResult.success,
    httpStatus: sampleResult.status,
    result: sampleResult.data?.slice(0, 5) || [],
    error: sampleResult.error || null,
  });

  // Test 4: Try filtering by canton (VD)
  const cantonQuery = `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?name ?uid ?municipality
    WHERE {
      GRAPH <https://lindas.admin.ch/foj/zefix> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name ;
                 schema:address ?addr .
        ?addr schema:addressLocality ?municipality .
        OPTIONAL { ?company schema:identifier ?uid }
        FILTER(CONTAINS(STR(?company), "/canton/22") || CONTAINS(STR(?addr), "Vaud") || CONTAINS(STR(?municipality), "Lausanne"))
      }
    }
    LIMIT 5
  `;
  const cantonResult = await sparqlQuery(cantonQuery);
  tests.push({
    test: "filter_by_canton_VD",
    success: cantonResult.success,
    httpStatus: cantonResult.status,
    result: cantonResult.data?.slice(0, 5) || [],
    error: cantonResult.error || null,
  });

  // Test 5: Alternative canton filter approach
  const cantonQuery2 = `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?name ?uid ?municipality ?canton
    WHERE {
      GRAPH <https://lindas.admin.ch/foj/zefix> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name .
        OPTIONAL { ?company schema:identifier ?uid }
        OPTIONAL { ?company schema:address/schema:addressLocality ?municipality }
        OPTIONAL { ?company admin:canton ?canton }
      }
    }
    LIMIT 3
  `;
  const cantonResult2 = await sparqlQuery(cantonQuery2);
  tests.push({
    test: "discover_canton_property",
    success: cantonResult2.success,
    httpStatus: cantonResult2.status,
    result: cantonResult2.data?.slice(0, 3) || [],
    error: cantonResult2.error || null,
  });

  // Test 6: Try without GRAPH clause (maybe data isn't in named graph)
  const noGraphQuery = `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    SELECT ?company ?name
    WHERE {
      ?company a admin:ZefixOrganisation ;
               schema:legalName ?name .
    }
    LIMIT 3
  `;
  const noGraphResult = await sparqlQuery(noGraphQuery);
  tests.push({
    test: "query_without_graph",
    success: noGraphResult.success,
    httpStatus: noGraphResult.status,
    result: noGraphResult.data?.slice(0, 3) || [],
    error: noGraphResult.error || null,
  });

  return tests;
}

/**
 * Build SPARQL query to fetch companies for a canton since a given date.
 * The exact query will be refined after test mode reveals the schema.
 */
function buildCantonQuery(cantonCode: string, sinceDate: string, limit: number = 10000): string {
  // This query attempts multiple approaches to filter by canton
  // Will be refined based on test mode results
  return `
    PREFIX schema: <http://schema.org/>
    PREFIX admin: <https://schema.ld.admin.ch/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?company ?name ?uid ?legalFormLabel ?municipality ?dateRegistration
    WHERE {
      GRAPH <https://lindas.admin.ch/foj/zefix> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name .
        OPTIONAL { ?company schema:identifier ?uid }
        OPTIONAL { ?company schema:additionalType/schema:name ?legalFormLabel }
        OPTIONAL { ?company schema:address/schema:addressLocality ?municipality }
        OPTIONAL { ?company schema:foundingDate ?dateRegistration }

        # Filter by canton — using the register of commerce canton
        ?company admin:registeredIn ?register .
        ?register admin:canton <https://ld.admin.ch/canton/${CANTONS_ROMANDS[cantonCode]?.id || "22"}> .
      }
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
  const daysBack = parseInt(url.searchParams.get("days") || "30");
  const maxDays = Math.min(daysBack, 90);

  // ── TEST MODE ─────────────────────────────────────────────────────────────
  if (testMode) {
    console.log("Running SPARQL diagnostic...");
    const diagnosticResults = await runDiagnostic();
    return NextResponse.json({
      test: true,
      version: "3.0",
      source: "LINDAS SPARQL (no auth needed)",
      endpoint: SPARQL_ENDPOINT,
      results: diagnosticResults,
      hint: "Check which tests succeed and what properties are available. This will help us build the right query.",
    });
  }

  // ── BACKFILL MODE ─────────────────────────────────────────────────────────
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxDays);
  const sinceDate = cutoffDate.toISOString().split("T")[0];

  const cantonCodes = singleCanton ? [singleCanton] : Object.keys(CANTONS_ROMANDS);
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log(`Backfill v3: SPARQL query for companies since ${sinceDate} (${maxDays} days back)`);
    console.log(`Cantons: ${cantonCodes.join(", ")}`);

    let totalFetched = 0;
    let totalInserted = 0;
    let totalClassified = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    const cantonResults: { canton: string; fetched: number; inserted: number; queryError?: string }[] = [];

    for (const cantonCode of cantonCodes) {
      console.log(`Querying canton ${cantonCode} via SPARQL...`);
      const query = buildCantonQuery(cantonCode, sinceDate);
      const result = await sparqlQuery(query);

      if (!result.success || !result.data) {
        console.error(`SPARQL error for ${cantonCode}:`, result.error);
        cantonResults.push({ canton: cantonCode, fetched: 0, inserted: 0, queryError: result.error });
        continue;
      }

      const companies = result.data;
      totalFetched += companies.length;
      console.log(`${cantonCode}: found ${companies.length} companies`);

      let cantonInserted = 0;

      for (const row of companies) {
        const uid = row.uid?.value || "";
        const name = row.name?.value || "";

        if (!uid || !name) {
          totalSkipped++;
          continue;
        }

        const slug = generateSlug(name, uid);
        const legalForm = mapLegalForm(row.legalFormLabel?.value);
        const purpose = row.purpose?.value || "";
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
              creation_date: row.dateRegistration?.value || sinceDate,
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

      cantonResults.push({ canton: cantonCode, fetched: companies.length, inserted: cantonInserted });
    }

    const result = {
      success: true,
      backfill: true,
      version: "3.0",
      source: "LINDAS SPARQL",
      sinceDate,
      maxDays,
      totalFetched,
      totalInserted,
      totalClassified,
      totalSkipped,
      totalErrors,
      cantonResults,
    };

    console.log("Backfill v3 result:", JSON.stringify(result));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Backfill v3 error:", error);
    return NextResponse.json(
      { error: "Backfill failed", details: String(error) },
      { status: 500 }
    );
  }
}
