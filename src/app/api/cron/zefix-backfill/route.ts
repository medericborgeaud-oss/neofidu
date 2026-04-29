import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Backfill route v2 — uses POST /api/v1/company/search (public endpoint)
// No more /shab/welcome.json (deprecated/requires special subscription)
// Call with ?days=30 to fetch last 30 days (default: 30)
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes for backfill

const ZEFIX_API = "https://www.zefix.admin.ch/ZefixPublicREST/api/v1";
const CANTONS_ROMANDS = ["VD", "GE", "VS", "FR", "NE", "JU"];

// Name prefixes to paginate through all companies (Zefix requires name with minLength 3)
const NAME_PREFIXES = ["A*", "B*", "C*", "D*", "E*", "F*", "G*", "H*", "I*", "J*", "K*", "L*", "M*", "N*", "O*", "P*", "Q*", "R*", "S*", "T*", "U*", "V*", "W*", "X*", "Y*", "Z*", "0*", "1*", "2*", "3*", "4*", "5*", "6*", "7*", "8*", "9*"];

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
 * Fetch companies from a canton using POST /api/v1/company/search
 * This endpoint is public (no authentication required).
 * We use name prefixes (A*, B*, C*...) to paginate since no date filter exists.
 * Then filter by sogcDate locally.
 */
async function fetchCompaniesForCanton(
  canton: string,
  sinceDate: string,
  authHeader?: string
): Promise<ZefixCompanyShort[]> {
  const recentCompanies: ZefixCompanyShort[] = [];
  const seenUids = new Set<string>();

  for (const prefix of NAME_PREFIXES) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      // Add auth if available (optional but may increase rate limits)
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      const response = await fetch(`${ZEFIX_API}/company/search`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          canton,
          name: prefix,
          activeOnly: true,
        }),
      });

      if (!response.ok) {
        console.error(`Zefix search error for ${canton}/${prefix}: ${response.status}`);
        // If 401, try without auth on next iteration
        continue;
      }

      const data: ZefixCompanyShort[] = await response.json();

      if (Array.isArray(data)) {
        for (const company of data) {
          // Filter: only keep companies with sogcDate >= sinceDate
          if (company.sogcDate && company.sogcDate >= sinceDate && !seenUids.has(company.uid)) {
            seenUids.add(company.uid);
            recentCompanies.push(company);
          }
        }
      }
    } catch (error) {
      console.error(`Error searching ${canton}/${prefix}:`, error);
    }
  }

  return recentCompanies;
}

/**
 * Alternative: fetch company details by UID to get purpose field
 * GET /api/v1/company/uid/{uid} — may require auth
 */
async function fetchCompanyDetails(uid: string, authHeader?: string): Promise<{ purpose?: string; cantonalExcerptWeb?: string } | null> {
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
  const daysBack = parseInt(url.searchParams.get("days") || "30");
  const maxDays = Math.min(daysBack, 90);
  const fetchDetails = url.searchParams.get("details") !== "false"; // default: true

  // Calculate the cutoff date
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxDays);
  const sinceDate = cutoffDate.toISOString().split("T")[0];

  // Optional Zefix auth (for detail endpoints)
  const zefixUser = process.env.ZEFIX_USERNAME;
  const zefixPass = process.env.ZEFIX_PASSWORD;
  const zefixAuth = zefixUser && zefixPass
    ? `Basic ${Buffer.from(`${zefixUser}:${zefixPass}`).toString("base64")}`
    : undefined;

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log(`Backfill v2: searching companies since ${sinceDate} (${maxDays} days back)`);

    let totalFetched = 0;
    let totalInserted = 0;
    let totalClassified = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let totalDetailsFound = 0;
    const cantonResults: { canton: string; fetched: number; inserted: number }[] = [];

    for (const canton of CANTONS_ROMANDS) {
      console.log(`Searching canton ${canton}...`);
      const companies = await fetchCompaniesForCanton(canton, sinceDate, zefixAuth);
      totalFetched += companies.length;
      console.log(`${canton}: found ${companies.length} recent companies`);

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

      cantonResults.push({ canton, fetched: companies.length, inserted: cantonInserted });
    }

    const result = {
      success: true,
      backfill: true,
      version: 2,
      sinceDate,
      maxDays,
      totalFetched,
      totalInserted,
      totalClassified,
      totalSkipped,
      totalErrors,
      totalDetailsFound,
      cantonResults,
    };

    console.log("Backfill v2 result:", JSON.stringify(result));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Backfill v2 error:", error);
    return NextResponse.json(
      { error: "Backfill failed", details: String(error) },
      { status: 500 }
    );
  }
}
