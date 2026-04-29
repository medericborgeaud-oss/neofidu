import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Backfill route v2.1 — uses POST /api/v1/company/search (public endpoint)
// FIX: name field requires minLength: 3. Old "A*" (2 chars) silently failed.
// Now uses "A**" (3 chars) or smarter patterns.
//
// Usage:
//   ?days=30         → fetch last 30 days (default: 30, max: 90)
//   ?details=false   → skip fetching purpose from detail endpoint
//   ?test=true       → diagnostic mode: tries different name patterns, reports what works
//   ?canton=VD       → test a single canton only
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes for backfill

const ZEFIX_API = "https://www.zefix.admin.ch/ZefixPublicREST/api/v1";
const CANTONS_ROMANDS = ["VD", "GE", "VS", "FR", "NE", "JU"];

// ── Name prefix strategies (Zefix requires name minLength: 3) ───────────────
// Strategy 1: single letter + two wildcards → "A**" (3 chars, broadest coverage)
// Strategy 2: common Swiss company name starters (FR/DE) → more targeted
// Strategy 3: two-letter combos + wildcard → "Ab*", "Ac*"... (more precise but many requests)

const WILDCARD_PREFIXES = [
  ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(c => `${c}**`),
  ...Array.from("0123456789").map(c => `${c}**`),
];

// Fallback: common 3+ char starters if wildcards don't work
const COMMON_PREFIXES = [
  // French company starters
  "Soc", "Ass", "Cab", "Con", "Imm", "Fon", "Ent", "Gro", "Ins", "Pro",
  "Ser", "Age", "Ate", "Bur", "Cie", "Com", "Coo", "Eco", "Etu", "Exp",
  "Fin", "Gar", "Ges", "Hol", "Int", "Inv", "Lab", "Man", "Med", "Net",
  "Par", "Pha", "Pol", "Pre", "Res", "Sau", "Tra", "Uni", "Val", "Ven",
  // German company starters
  "Bau", "Ber", "Die", "Ein", "Fir", "Geb", "Han", "Ind", "Kap", "Lie",
  "Mie", "Neu", "Pri", "Sch", "Sta", "Ste", "Tec", "Ver", "Woh", "Zen",
  // Common international
  "The", "New", "All", "Glo", "Dig", "Tec", "Sol", "Art", "Max", "Top",
];

interface ZefixCompanyShort {
  name: string;
  ehraid: number;
  uid: string;
  chid: string;
  legalSeatId: number;
  legalSeat: string;
  registryOfCommerceId: number;
  legalForm?: { id?: number; name?: string; uid?: string };
  status: string;
  sogcDate: string; // Last SOGC/SHAB publication date (YYYY-MM-DD)
  deletionDate?: string;
}

function mapLegalForm(zefixForm: string | undefined): string {
  if (!zefixForm) return "Autre";
  const lower = zefixForm.toLowerCase();
  if (lower.includes("raison individuelle") || lower.includes("einzelunternehm")) return "RI";
  if (lower.includes("sarl") || lower.includes("gmbh")) return "Sarl";
  if (lower.includes("société anonyme") || lower.includes("aktiengesellschaft") || lower === "sa" || lower === "ag") return "SA";
  if (lower.includes("association") || lower.includes("verein")) return "Association";
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
 * Try a single search request and return status + result count.
 * Used by both the test mode and the main backfill.
 */
async function trySearch(
  name: string,
  canton: string,
  authHeader?: string
): Promise<{ status: number; count: number; error?: string; data?: ZefixCompanyShort[] }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  try {
    const response = await fetch(`${ZEFIX_API}/company/search`, {
      method: "POST",
      headers,
      body: JSON.stringify({ canton, name, activeOnly: true }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return { status: response.status, count: 0, error: errorText.substring(0, 200) };
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return { status: response.status, count: data.length, data };
    }
    return { status: response.status, count: 0, error: "Response is not an array" };
  } catch (err) {
    return { status: 0, count: 0, error: String(err).substring(0, 200) };
  }
}

/**
 * ── TEST MODE ──
 * Tries multiple name patterns against a single canton to find what works.
 * Call with ?test=true&canton=VD
 */
async function runDiagnostic(canton: string, authHeader?: string) {
  const testPatterns = [
    // Wildcard patterns (check if * is treated as wildcard)
    { name: "A**", description: "letter + two wildcards (3 chars)" },
    { name: "***", description: "three wildcards" },
    { name: "A*B", description: "letter + wildcard + letter" },
    // Percent wildcard (SQL-style)
    { name: "A%%", description: "letter + two percent wildcards" },
    { name: "%%%", description: "three percent wildcards" },
    // Plain text (no wildcards)
    { name: "ABC", description: "plain 3-letter prefix" },
    { name: "Soc", description: "common FR start (Société)" },
    { name: "Sch", description: "common DE start (Schweizerische)" },
    // Longer patterns
    { name: "Société", description: "full FR word" },
    { name: "Association", description: "full FR word" },
    // Without auth
    { name: "Test", description: "simple word, no auth", skipAuth: true },
  ];

  const results = [];
  for (const pattern of testPatterns) {
    const auth = pattern.skipAuth ? undefined : authHeader;
    const result = await trySearch(pattern.name, canton, auth);
    results.push({
      pattern: pattern.name,
      description: pattern.description,
      httpStatus: result.status,
      resultCount: result.count,
      error: result.error || null,
      sampleNames: result.data?.slice(0, 3).map(c => c.name) || [],
    });
    console.log(`TEST ${pattern.name} (${pattern.description}): HTTP ${result.status}, ${result.count} results`);
  }

  return results;
}

/**
 * Fetch companies from a canton using POST /api/v1/company/search.
 * Uses the best available prefix strategy.
 */
async function fetchCompaniesForCanton(
  canton: string,
  sinceDate: string,
  prefixes: string[],
  authHeader?: string
): Promise<{ companies: ZefixCompanyShort[]; apiErrors: number; httpStatuses: Record<number, number> }> {
  const recentCompanies: ZefixCompanyShort[] = [];
  const seenUids = new Set<string>();
  let apiErrors = 0;
  const httpStatuses: Record<number, number> = {};

  for (const prefix of prefixes) {
    const result = await trySearch(prefix, canton, authHeader);

    // Track HTTP status distribution
    httpStatuses[result.status] = (httpStatuses[result.status] || 0) + 1;

    if (result.status !== 200 || !result.data) {
      if (result.status !== 200) apiErrors++;
      continue;
    }

    for (const company of result.data) {
      // Filter: only keep companies with sogcDate >= sinceDate
      if (company.sogcDate && company.sogcDate >= sinceDate && !seenUids.has(company.uid)) {
        seenUids.add(company.uid);
        recentCompanies.push(company);
      }
    }
  }

  return { companies: recentCompanies, apiErrors, httpStatuses };
}

/**
 * Fetch company details by UID to get purpose field.
 * GET /api/v1/company/uid/{uid} — requires auth.
 */
async function fetchCompanyDetails(
  uid: string,
  authHeader?: string
): Promise<{ purpose?: string; cantonalExcerptWeb?: string } | null> {
  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(`${ZEFIX_API}/company/uid/${uid}`, { headers });
    if (!response.ok) return null;

    const data = await response.json();
    return {
      purpose: data?.purpose?.translations?.fr || data?.purpose?.translations?.de || data?.purpose?.text || "",
      cantonalExcerptWeb: data?.cantonalExcerptWeb || null,
    };
  } catch {
    return null;
  }
}

/**
 * Auto-detect the best prefix strategy by testing a few patterns.
 * Returns the prefixes to use for the full backfill.
 */
async function detectBestPrefixes(canton: string, authHeader?: string): Promise<{ prefixes: string[]; strategy: string }> {
  // Test 1: Does "A**" work? (wildcard strategy)
  const test1 = await trySearch("A**", canton, authHeader);
  if (test1.status === 200 && test1.count > 0) {
    console.log(`Strategy: wildcard "X**" works (test returned ${test1.count} results)`);
    return { prefixes: WILDCARD_PREFIXES, strategy: "wildcard_double_star" };
  }

  // Test 2: Does "***" work? (full wildcard)
  const test2 = await trySearch("***", canton, authHeader);
  if (test2.status === 200 && test2.count > 0) {
    console.log(`Strategy: "***" works (${test2.count} results) — single request per canton!`);
    return { prefixes: ["***"], strategy: "triple_wildcard" };
  }

  // Test 3: Plain text search? (no wildcards, just common names)
  const test3 = await trySearch("Société", canton, authHeader);
  if (test3.status === 200 && test3.count > 0) {
    console.log(`Strategy: plain text works (test returned ${test3.count} results)`);
    return { prefixes: COMMON_PREFIXES, strategy: "common_prefixes" };
  }

  // Test 4: Try with percent wildcards (SQL LIKE style)
  const test4 = await trySearch("A%%", canton, authHeader);
  if (test4.status === 200 && test4.count > 0) {
    const percentPrefixes = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").map(c => `${c}%%`);
    console.log(`Strategy: percent wildcards work (test returned ${test4.count} results)`);
    return { prefixes: percentPrefixes, strategy: "percent_wildcard" };
  }

  // Fallback: use common prefixes (better than nothing)
  console.warn("No wildcard strategy worked. Using common prefixes as fallback.");
  return { prefixes: COMMON_PREFIXES, strategy: "common_prefixes_fallback" };
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
  const fetchDetails = url.searchParams.get("details") !== "false";

  // Optional Zefix auth (for detail endpoints)
  const zefixUser = process.env.ZEFIX_USERNAME;
  const zefixPass = process.env.ZEFIX_PASSWORD;
  const zefixAuth = zefixUser && zefixPass
    ? `Basic ${Buffer.from(`${zefixUser}:${zefixPass}`).toString("base64")}`
    : undefined;

  // ── TEST MODE ─────────────────────────────────────────────────────────────
  if (testMode) {
    const testCanton = singleCanton || "VD";
    console.log(`Running diagnostic on canton ${testCanton}...`);

    // Debug: show env var diagnostics (masked)
    const envDebug = {
      ZEFIX_USERNAME: zefixUser
        ? { set: true, length: zefixUser.length, value: zefixUser.substring(0, 3) + "***" + zefixUser.substring(zefixUser.length - 3) }
        : { set: false },
      ZEFIX_PASSWORD: zefixPass
        ? { set: true, length: zefixPass.length, firstChar: zefixPass[0], lastChar: zefixPass[zefixPass.length - 1] }
        : { set: false },
      authHeaderPreview: zefixAuth
        ? zefixAuth.substring(0, 15) + "..." + zefixAuth.substring(zefixAuth.length - 5)
        : "(none)",
      // Show the raw base64 so we can verify it decodes correctly
      base64Payload: zefixUser && zefixPass
        ? Buffer.from(`${zefixUser}:${zefixPass}`).toString("base64")
        : "(none)",
    };

    const diagnosticResults = await runDiagnostic(testCanton, zefixAuth);
    return NextResponse.json({
      test: true,
      version: "2.1",
      canton: testCanton,
      hasAuth: !!zefixAuth,
      authUser: zefixUser || "(none)",
      envDebug,
      results: diagnosticResults,
      hint: "Look for patterns with httpStatus=200 and resultCount>0. Those work!",
    });
  }

  // ── BACKFILL MODE ─────────────────────────────────────────────────────────
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxDays);
  const sinceDate = cutoffDate.toISOString().split("T")[0];

  const cantons = singleCanton ? [singleCanton] : CANTONS_ROMANDS;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log(`Backfill v2.1: searching companies since ${sinceDate} (${maxDays} days back)`);
    console.log(`Cantons: ${cantons.join(", ")}`);

    // Auto-detect best prefix strategy using first canton
    const { prefixes, strategy } = await detectBestPrefixes(cantons[0], zefixAuth);
    console.log(`Using strategy: ${strategy} (${prefixes.length} prefixes per canton)`);

    let totalFetched = 0;
    let totalInserted = 0;
    let totalClassified = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let totalDetailsFound = 0;
    let totalApiErrors = 0;
    const cantonResults: { canton: string; fetched: number; inserted: number; apiErrors: number; httpStatuses: Record<number, number> }[] = [];

    for (const canton of cantons) {
      console.log(`Searching canton ${canton} with ${prefixes.length} prefixes...`);
      const { companies, apiErrors, httpStatuses } = await fetchCompaniesForCanton(canton, sinceDate, prefixes, zefixAuth);
      totalFetched += companies.length;
      totalApiErrors += apiErrors;
      console.log(`${canton}: found ${companies.length} recent companies (${apiErrors} API errors)`);

      let cantonInserted = 0;

      for (const company of companies) {
        if (!company.uid || !company.name) {
          totalSkipped++;
          continue;
        }

        const slug = generateSlug(company.name, company.uid);
        const legalForm = mapLegalForm(company.legalForm?.name);

        // Try to get detailed info (purpose) if auth available
        let purpose = "";
        let cantonalExcerptUrl: string | null = null;

        if (fetchDetails && zefixAuth) {
          const details = await fetchCompanyDetails(company.uid, zefixAuth);
          if (details) {
            purpose = details.purpose || "";
            cantonalExcerptUrl = details.cantonalExcerptWeb || null;
            totalDetailsFound++;
          }
        }

        const sector = classifySector(purpose || undefined);
        if (sector) totalClassified++;

        try {
          const { error } = await supabase.from("companies").upsert(
            {
              uid: company.uid,
              name: company.name,
              slug,
              canton,
              legal_form: legalForm,
              legal_seat: company.legalSeat || "",
              purpose,
              sector,
              status: company.status || "active",
              source: "zefix",
              creation_date: company.sogcDate || sinceDate,
              is_active: !company.deletionDate,
              cantonal_excerpt_url: cantonalExcerptUrl,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "uid" }
          );

          if (error) {
            console.error(`Error inserting ${company.uid}:`, error.message);
            totalErrors++;
          } else {
            totalInserted++;
            cantonInserted++;
          }
        } catch (err) {
          console.error(`Error processing ${company.uid}:`, err);
          totalErrors++;
        }
      }

      cantonResults.push({ canton, fetched: companies.length, inserted: cantonInserted, apiErrors, httpStatuses });
    }

    const result = {
      success: true,
      backfill: true,
      version: "2.1",
      strategy,
      prefixCount: prefixes.length,
      sinceDate,
      maxDays,
      hasAuth: !!zefixAuth,
      totalFetched,
      totalInserted,
      totalClassified,
      totalSkipped,
      totalErrors,
      totalApiErrors,
      totalDetailsFound,
      cantonResults,
    };

    console.log("Backfill v2.1 result:", JSON.stringify(result));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Backfill v2.1 error:", error);
    return NextResponse.json(
      { error: "Backfill failed", details: String(error) },
      { status: 500 }
    );
  }
}
