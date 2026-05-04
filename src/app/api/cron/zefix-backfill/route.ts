import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Backfill route v3.3 — LINDAS SPARQL (Swiss Open Data)
// NO AUTHENTICATION NEEDED
// Filters by canton using BFS municipality number ranges
// Legal forms mapped via eCH-0097 codes from additionalType URI
//
// Usage:
//   ?test=true       → diagnostic: verify queries work
//   ?canton=VD       → single canton
//   ?limit=100000    → max per canton (default: 100000)
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

// eCH-0097 legal form codes → display labels
const LEGAL_FORM_MAP: Record<string, string> = {
  "0101": "RI",        // Raison individuelle
  "0102": "RI",        // Raison individuelle (variante)
  "0103": "SNC",       // Société en nom collectif
  "0104": "SC",        // Société en commandite
  "0105": "SCA",       // Société en commandite par actions
  "0106": "SA",        // Société anonyme
  "0107": "Sarl",      // Société à responsabilité limitée
  "0108": "SCoop",     // Société coopérative
  "0109": "Association",
  "0110": "Fondation",
  "0111": "Succursale",
  "0113": "Autre",     // Forme étrangère
  "0117": "Autre",     // Institut de droit public (fédéral)
  "0118": "Autre",     // Procuration d'une entreprise étrangère
  "0119": "Autre",     // Administration fédérale
  "0151": "Autre",     // Institut de droit public
};

function mapLegalForm(typeUri: string | undefined): string {
  if (!typeUri) return "Autre";
  // Extract code from URI: "https://ld.admin.ch/ech/97/legalforms/0107" → "0107"
  const match = typeUri.match(/legalforms\/(\d+)/);
  if (match && LEGAL_FORM_MAP[match[1]]) return LEGAL_FORM_MAP[match[1]];
  return "Autre";
}

function classifySector(purpose: string | undefined, companyName?: string): string | null {
  if (!purpose) return null;
  const p = purpose.toLowerCase();
  const n = (companyName || "").toLowerCase();

  // ── Priority: company name contains obvious sector hint ──
  if (n.includes("immobili") || n.includes("immo ") || n.includes("régie") || n.includes("foncier")) return "immobilier";
  if (n.includes("restaurant") || n.includes("pizzeria") || n.includes("brasserie") || n.includes("café ") || n.includes("bistro")) return "restauration";
  if (n.includes("garage") || n.includes("carrosserie")) return "commerce";
  if (n.includes("coiffur") || n.includes("salon de beauté") || n.includes("esthétique")) return "beaute";
  if (n.includes("architecte") || n.includes("construction") || n.includes("bâtiment")) return "construction";
  if (n.includes("nettoyage") || n.includes("conciergerie")) return "nettoyage";
  if (n.includes("transport") || n.includes("taxi") || n.includes("déménagement")) return "transport";

  // ── Absolute priority: "immobilier" anywhere in name OR purpose always wins ──
  if (n.includes("immobili") || p.includes("immobili")) return "immobilier";

  // ── 1. Tech / Informatique ──
  if (
    p.includes("informatique") || p.includes("logiciel") || p.includes("software") ||
    p.includes("développement web") || p.includes("application") || p.includes("digital") ||
    p.includes("données") || p.includes("data") || p.includes("intelligence artificielle") ||
    p.includes("cybersécurité") || p.includes("cloud") || p.includes("saas") ||
    p.includes("fintech") || p.includes("blockchain") || p.includes("crypto") ||
    p.includes("e-commerce") || p.includes("plateforme") ||
    p.includes("technolog") || p.includes("it-") || p.includes("programmation") ||
    p.includes("internet") || p.includes("web") || p.includes("app ")
  ) return "tech";

  // ── 2. Santé (médical uniquement) ──
  if (
    p.includes("médic") || p.includes("santé") || p.includes("soins") ||
    p.includes("dentaire") || p.includes("dentiste") || p.includes("pharma") ||
    p.includes("thérap") || p.includes("psycholog") || p.includes("infirm") ||
    p.includes("physiothérap") || p.includes("ergothérap") ||
    p.includes("cabinet médic") || p.includes("clinique") || p.includes("laborat") ||
    p.includes("vétérinaire") || p.includes("ostéopath") || p.includes("diététi") ||
    p.includes("gesundheit") || p.includes("medizin") || p.includes("praxis") ||
    p.includes("hôpital") || p.includes("ophtalmolog") || p.includes("chirurg") ||
    p.includes("radiolog") || p.includes("orthopéd")
  ) return "sante";

  // ── 3. Beauté / Bien-être ──
  if (
    p.includes("cosmétique") || p.includes("esthétique") || p.includes("massage") ||
    p.includes("yoga") || p.includes("coiffur") || p.includes("coiffeu") ||
    p.includes("onglerie") || p.includes("manucure") || p.includes("pédicure") ||
    p.includes("salon de beauté") || p.includes("bien-être") || p.includes("bienêtre") ||
    p.includes("spa") || p.includes("maquillage") || p.includes("tatouage") ||
    p.includes("piercing") || p.includes("soins du corps") || p.includes("soins esthétiques") ||
    p.includes("epilation") || p.includes("kosmetik") || p.includes("schönheit")
  ) return "beaute";

  // ── 4. Construction ──
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

  // ── 5. Restauration / Hôtellerie ──
  if (
    p.includes("restaurant") || p.includes("café") || p.includes("bar") ||
    p.includes("traiteur") || p.includes("boulangerie") || p.includes("pâtisserie") ||
    p.includes("hôtel") || p.includes("hébergement touristique") || p.includes("catering") ||
    p.includes("food") || p.includes("gastronomie") || p.includes("cuisine") ||
    p.includes("pizzeria") || p.includes("brasserie") || p.includes("bistro") ||
    p.includes("take away") || p.includes("livraison de repas") || p.includes("snack") ||
    p.includes("restauration") || p.includes("tea room") || p.includes("tea-room") || p.includes("tearoom") || p.includes("kebab")
  ) return "restauration";

  // ── 6. Transport / Logistique ──
  if (
    p.includes("transport") || p.includes("logistique") || p.includes("déménagement") ||
    p.includes("livraison") || p.includes("coursier") || p.includes("taxi") ||
    p.includes("vtc") || p.includes("ambulance") || p.includes("fret") ||
    p.includes("entreposage") || p.includes("stockage") || p.includes("expédition") ||
    p.includes("camionnage") || p.includes("routier") || p.includes("maritime") ||
    p.includes("aérien") || p.includes("spedition") || p.includes("logistik")
  ) return "transport";

  // ── 7. Éducation / Formation ──
  if (
    p.includes("école") || p.includes("enseignement") || p.includes("formation") ||
    p.includes("éducation") || p.includes("cours") || p.includes("soutien scolaire") ||
    p.includes("crèche") || p.includes("garderie") || p.includes("pédagog") ||
    p.includes("université") || p.includes("académi") || p.includes("institut de formation") ||
    p.includes("langue") || p.includes("tutorat") || p.includes("e-learning") ||
    p.includes("schule") || p.includes("bildung") || p.includes("ausbildung")
  ) return "education";

  // ── 8. Immobilier (AVANT finance pour éviter les faux positifs "investissement immobilier") ──
  if (
    p.includes("immobili") || p.includes("gérance") || p.includes("courtage immobili") ||
    p.includes("promotion immobili") || p.includes("régie") || p.includes("foncier") ||
    p.includes("location d'") || p.includes("location de") || p.includes("achat et vente d'immeubles") ||
    p.includes("gestion d'immeubles") || p.includes("copropriété") ||
    p.includes("immobilien") || p.includes("liegenschaft") ||
    p.includes("achat et vente de biens") || p.includes("biens immobiliers") ||
    p.includes("location immobili") || p.includes("investissement immobili")
  ) return "immobilier";

  // ── 9. Finance / Assurance ──
  if (
    (p.includes("financ") && !p.includes("immobili")) ||
    p.includes("banque") || p.includes("assurance") ||
    (p.includes("investissement") && !p.includes("immobili")) ||
    p.includes("gestion de fortune") || p.includes("gestion de patrimoine") ||
    p.includes("prévoyance") || p.includes("placement") || p.includes("bourse") ||
    p.includes("crédit") || p.includes("prêt hypothécaire") || p.includes("prêt personnel") || p.includes("épargne") ||
    p.includes("courtage en assurance") || p.includes("réassurance") ||
    p.includes("versicherung") || p.includes("finanz") || p.includes("vermögen")
  ) return "finance";

  // ── 10. Industrie / Production ──
  if (
    p.includes("fabrication") || p.includes("manufacture") || p.includes("usinage") ||
    p.includes("mécanique de précision") || p.includes("métallurgie") || p.includes("soudure") ||
    p.includes("injection") || p.includes("moulage") || p.includes("emboutissage") ||
    p.includes("assemblage") || p.includes("production industrielle") || p.includes("usine") ||
    p.includes("industrie") || p.includes("automatisation") || p.includes("robotique") ||
    p.includes("herstellung") || p.includes("fertigung") || p.includes("industrie")
  ) return "industrie";

  // ── 11. Agriculture / Viticulture ──
  if (
    p.includes("agricol") || p.includes("agriculture") || p.includes("viticol") ||
    p.includes("viticult") || p.includes("vignoble") || p.includes("élevage") ||
    p.includes("exploitation agricole") || p.includes("maraîch") || p.includes("horticult") ||
    p.includes("pépinière") || p.includes("apicult") || p.includes("sylvicult") ||
    p.includes("forestier") || p.includes("paysagis") || p.includes("jardin") ||
    p.includes("landwirtschaft") || p.includes("weinbau") || p.includes("gartenbau")
  ) return "agriculture";

  // ── 12. Art / Culture / Médias ──
  if (
    p.includes("artisti") || p.includes("art ") || p.includes("galerie") ||
    p.includes("musique") || p.includes("cinéma") || p.includes("théâtre") ||
    p.includes("photogra") || p.includes("vidéo") || p.includes("film") ||
    p.includes("édition") || p.includes("presse") || p.includes("média") ||
    p.includes("graphi") || p.includes("design") || p.includes("créati") ||
    p.includes("spectacle") || p.includes("divertissement") || p.includes("animation") ||
    p.includes("kunst") || p.includes("verlag") || p.includes("medien")
  ) return "art_culture";

  // ── 13. Nettoyage / Entretien ──
  if (
    p.includes("nettoyage") || p.includes("conciergerie") || p.includes("entretien") ||
    p.includes("hygiène") || p.includes("désinfection") || p.includes("blanchisserie") ||
    p.includes("pressing") || p.includes("lavage") || p.includes("dératisation") ||
    p.includes("reinigung") || p.includes("gebäudereinigung") || p.includes("hauswartung")
  ) return "nettoyage";

  // ── 14. Conseil / Services aux entreprises ──
  if (
    p.includes("conseil") || p.includes("consulting") || p.includes("consultant") ||
    p.includes("fiduciaire") || p.includes("comptab") || p.includes("révision") ||
    p.includes("audit") || p.includes("gestion d'entreprise") || p.includes("management") ||
    p.includes("ressources humaines") || p.includes("recrutement") ||
    p.includes("coaching") || p.includes("stratégi") || p.includes("marketing") ||
    p.includes("communication") || p.includes("publicité") || p.includes("relations publiques") ||
    p.includes("avoca") || p.includes("juridique") || p.includes("notari") ||
    p.includes("traduction") || p.includes("événement") || p.includes("organisation") ||
    p.includes("beratung") || p.includes("treuhand") || p.includes("buchhaltung") ||
    p.includes("expertise") || p.includes("accompagnement") || p.includes("assistance") ||
    p.includes("ingénieur") || p.includes("bureau d'étude") || p.includes("étude") ||
    p.includes("planification") || p.includes("projet") || p.includes("mandat") ||
    p.includes("géomètre") || p.includes("topograph")
  ) return "conseil";

  // ── 15. Commerce (catch-all large pour négoce) ──
  if (
    p.includes("commerce") || p.includes("vente") || p.includes("achat") ||
    p.includes("import") || p.includes("export") || p.includes("négoce") ||
    p.includes("distribution") || p.includes("grossiste") || p.includes("détail") ||
    p.includes("marchandise") || p.includes("produit") || p.includes("fourniture") ||
    p.includes("magasin") || p.includes("boutique") || p.includes("représentation") ||
    p.includes("courtier") || p.includes("agent") || p.includes("handel") ||
    p.includes("verkauf") || p.includes("vertrieb") || p.includes("shop") ||
    p.includes("épicerie") || p.includes("kiosque") || p.includes("tabac") ||
    p.includes("fleur") || p.includes("optique") || p.includes("bijout") ||
    p.includes("horloger") || p.includes("textile") || p.includes("vêtement") ||
    p.includes("mode") || p.includes("chaussur") || p.includes("meuble") ||
    p.includes("électroménager") || p.includes("quincaillerie") || p.includes("librairie") ||
    p.includes("papeterie") || p.includes("jouet") || p.includes("sport") ||
    p.includes("vélo") || p.includes("moto") || p.includes("auto") ||
    p.includes("garage") || p.includes("carrosserie") || p.includes("pneu")
  ) return "commerce";

  // ── 16. Services divers (catch-all final) ──
  if (
    p.includes("prestation") || p.includes("service") || p.includes("exploitation") ||
    p.includes("activité") || p.includes("dienstleistung") || p.includes("betrieb") ||
    p.includes("gestion") || p.includes("gérance") || p.includes("administration") ||
    p.includes("location") || p.includes("holding") || p.includes("participation") ||
    p.includes("société") || p.includes("entreprise")
  ) return "conseil";

  return "autres";
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

    SELECT DISTINCT ?company ?name ?uid ?legalFormType ?municipality ?description ?muniUri
    WHERE {
      GRAPH <${ZEFIX_GRAPH}> {
        ?company a admin:ZefixOrganisation ;
                 schema:legalName ?name ;
                 admin:municipality ?muniUri ;
                 schema:identifier ?uidNode .
        OPTIONAL { ?company schema:additionalType ?legalFormType }
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
      legalFormUri: r.legalFormType?.value,
      legalForm: mapLegalForm(r.legalFormType?.value),
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
  const limitPerCanton = parseInt(url.searchParams.get("limit") || "100000");
  const skipOffset = parseInt(url.searchParams.get("offset") || "0");

  // ── SCHEMA MODE — discover table columns via OpenAPI spec ───────────────
  if (url.searchParams.get("schema") === "true") {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` },
      });
      const spec = await res.json();
      const companiesDef = spec?.definitions?.companies;
      const columns = companiesDef?.properties ? Object.keys(companiesDef.properties) : null;
      const details = companiesDef?.properties || null;
      const required = companiesDef?.required || [];
      return NextResponse.json({ schema: true, columns, required, details });
    } catch (err) {
      return NextResponse.json({ schema: true, error: String(err) });
    }
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

      console.log(`${cantonCode}: ${uniqueRows.length} total companies from SPARQL`);

      // Apply offset and limit to 10k per run to stay within Vercel 300s
      const CHUNK_SIZE = 10000;
      const slicedRows = uniqueRows.slice(skipOffset, skipOffset + CHUNK_SIZE);
      const remaining = uniqueRows.length - skipOffset - slicedRows.length;

      totalFetched += slicedRows.length;
      console.log(`${cantonCode}: processing ${slicedRows.length} (offset=${skipOffset}, remaining=${Math.max(0, remaining)})`);

      let cantonInserted = 0;

      // Process in small batches to avoid Supabase statement timeout
      const BATCH_SIZE = 20;
      for (let i = 0; i < slicedRows.length; i += BATCH_SIZE) {
        const batch = slicedRows.slice(i, i + BATCH_SIZE);
        const records = [];

        for (const row of batch) {
          const uidRaw = row.uid?.value || "";
          const name = row.name?.value || "";
          if (!uidRaw || !name) { totalSkipped++; continue; }

          const uid = extractUID(uidRaw);
          const slug = generateSlug(name, uid);
          const legalForm = mapLegalForm(row.legalFormType?.value);
          const purpose = row.description?.value || "";
          const sector = classifySector(purpose || undefined, name);
          if (sector) totalClassified++;

          records.push({
            zefix_uid: uid,
            ide_number: uid,
            name,
            slug,
            canton: cantonCode,
            city: row.municipality?.value || "",
            legal_form: legalForm,
            purpose,
            sector,
            is_active: true,
            creation_date: new Date().toISOString().split("T")[0],
            updated_at: new Date().toISOString(),
          });
        }

        if (records.length > 0) {
          // Retry once on timeout
          let upsertError = null;
          for (let attempt = 0; attempt < 2; attempt++) {
            const { error } = await supabase.from("companies").upsert(records, { onConflict: "zefix_uid" });
            if (!error) {
              upsertError = null;
              totalInserted += records.length;
              cantonInserted += records.length;
              break;
            }
            upsertError = error;
            if (attempt === 0 && error.code === "57014") {
              // Statement timeout — wait a bit and retry
              await new Promise(r => setTimeout(r, 500));
              continue;
            }
            break;
          }
          if (upsertError) {
            console.error(`Batch insert error:`, upsertError.message);
            if (!firstError) firstError = { message: upsertError.message, code: upsertError.code, details: upsertError.details, hint: upsertError.hint, sample: records[0] };
            totalErrors += records.length;
          }
        }
      }

      cantonResults.push({ canton: cantonCode, fetched: slicedRows.length, inserted: cantonInserted, totalFromSparql: uniqueRows.length, offset: skipOffset, remaining: Math.max(0, remaining) });
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
