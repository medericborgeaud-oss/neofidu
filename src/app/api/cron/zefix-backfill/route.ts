import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Backfill route — fetches historical Zefix data
// Call with ?days=30 to fetch last 30 days (default: 14)
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes for backfill

const ZEFIX_API = "https://www.zefix.admin.ch/ZefixPublicREST/api/v1";
const CANTONS_ROMANDS = ["VD", "GE", "VS", "FR", "NE", "JU"];

interface ZefixCompany {
  uid: string;
  name: string;
  legalSeat: string;
  cantonalExcerptWeb?: string;
  purpose?: string;
  legalForm?: { name?: string; uid?: string };
  registryOfCommerce?: { canton?: string };
  shabDate?: string;
  deleteDate?: string;
  status?: string;
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

  // Tech / Informatique
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

  // Santé / Médical
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

  // Construction / BTP
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

  // Restauration / Hôtellerie
  if (
    p.includes("restaurant") || p.includes("café") || p.includes("bar") ||
    p.includes("traiteur") || p.includes("boulangerie") || p.includes("pâtisserie") ||
    p.includes("hôtel") || p.includes("hébergement touristique") || p.includes("catering") ||
    p.includes("food") || p.includes("gastronomie") || p.includes("cuisine") ||
    p.includes("pizzeria") || p.includes("brasserie") || p.includes("bistro") ||
    p.includes("take away") || p.includes("livraison de repas") || p.includes("snack") ||
    p.includes("restauration") || p.includes("tea room") || p.includes("kebab")
  ) return "restauration";

  // Immobilier
  if (
    p.includes("immobili") || p.includes("gérance") || p.includes("courtage") ||
    p.includes("promotion immobili") || p.includes("régie") || p.includes("foncier") ||
    p.includes("location d'") || p.includes("location de") || p.includes("achat et vente d'immeubles") ||
    p.includes("gestion d'immeubles") || p.includes("copropriété") ||
    p.includes("immobilien") || p.includes("liegenschaft")
  ) return "immobilier";

  // Conseil / Services aux entreprises
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

  // Commerce (catch-all for trade activities)
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

function getBusinessDays(daysBack: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = 1; i <= daysBack; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const day = d.getDay();
    // Skip weekends (0=Sun, 6=Sat) — SHAB only publishes on business days
    if (day === 0 || day === 6) continue;
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

async function fetchZefixForDate(username: string, password: string, dateStr: string): Promise<ZefixCompany[]> {
  const auth = Buffer.from(`${username}:${password}`).toString("base64");
  const allCompanies: ZefixCompany[] = [];

  for (const canton of CANTONS_ROMANDS) {
    try {
      const response = await fetch(
        `${ZEFIX_API}/shab/welcome.json?registryOfCommerceCanton=${canton}&shabDate=${dateStr}`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`Zefix API error for ${canton} on ${dateStr}: ${response.status}`);
        continue;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        allCompanies.push(...data.map((c: ZefixCompany) => ({
          ...c,
          registryOfCommerce: { canton },
          shabDate: dateStr,
        })));
      }
    } catch (error) {
      console.error(`Error fetching ${canton} on ${dateStr}:`, error);
    }
  }

  return allCompanies;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Allow query param auth for manual trigger
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");
    if (secret !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const zefixUser = process.env.ZEFIX_USERNAME;
  const zefixPass = process.env.ZEFIX_PASSWORD;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  if (!zefixUser || !zefixPass) {
    return NextResponse.json({ error: "Zefix credentials not configured" }, { status: 500 });
  }

  const url = new URL(request.url);
  const daysBack = parseInt(url.searchParams.get("days") || "30");
  const maxDays = Math.min(daysBack, 90); // Cap at 90 days

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const businessDays = getBusinessDays(maxDays);
    console.log(`Backfill: fetching ${businessDays.length} business days (last ${maxDays} days)`);

    let totalFetched = 0;
    let totalInserted = 0;
    let totalClassified = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    const dailyResults: { date: string; fetched: number; inserted: number }[] = [];

    for (const dateStr of businessDays) {
      const companies = await fetchZefixForDate(zefixUser, zefixPass, dateStr);
      totalFetched += companies.length;

      let dayInserted = 0;

      for (const company of companies) {
        if (!company.uid || !company.name) {
          totalSkipped++;
          continue;
        }

        const canton = company.registryOfCommerce?.canton || "";
        const slug = generateSlug(company.name, company.uid);
        const legalForm = mapLegalForm(company.legalForm?.name);
        const sector = classifySector(company.purpose);

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
              purpose: company.purpose || "",
              sector,
              status: company.status || "active",
              source: "zefix",
              creation_date: company.shabDate || dateStr,
              is_active: !company.deleteDate,
              cantonal_excerpt_url: company.cantonalExcerptWeb || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "uid" }
          );

          if (error) {
            console.error(`Error inserting ${company.uid}:`, error.message);
            totalErrors++;
          } else {
            totalInserted++;
            dayInserted++;
          }
        } catch (err) {
          console.error(`Error processing ${company.uid}:`, err);
          totalErrors++;
        }
      }

      if (companies.length > 0) {
        dailyResults.push({ date: dateStr, fetched: companies.length, inserted: dayInserted });
      }

      console.log(`${dateStr}: fetched ${companies.length}, inserted ${dayInserted}`);
    }

    const result = {
      success: true,
      backfill: true,
      daysScanned: businessDays.length,
      totalDays: maxDays,
      totalFetched,
      totalInserted,
      totalClassified,
      totalSkipped,
      totalErrors,
      dailyResults,
    };

    console.log("Backfill result:", JSON.stringify(result));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Backfill error:", error);
    return NextResponse.json(
      { error: "Backfill failed", details: String(error) },
      { status: 500 }
    );
  }
}
