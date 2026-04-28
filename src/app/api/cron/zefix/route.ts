import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Vercel Cron - runs daily at 06:00 UTC (08:00 Swiss time)
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  if (lower.includes("fondation") || lower.includes("stiftung")) return "Fondation";
  if (lower.includes("coopérative") || lower.includes("genossenschaft")) return "Coopérative";
  if (lower.includes("société en nom collectif") || lower.includes("kollektivgesellschaft")) return "SNC";
  if (lower.includes("société en commandite") || lower.includes("kommanditgesellschaft")) return "SC";
  return "Autre";
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

async function fetchZefixDaily(username: string, password: string): Promise<ZefixCompany[]> {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
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
        console.error(`Zefix API error for ${canton}: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        allCompanies.push(...data.map((c: ZefixCompany) => ({ ...c, registryOfCommerce: { canton } })));
      }
    } catch (error) {
      console.error(`Error fetching ${canton}:`, error);
    }
  }

  return allCompanies;
}

export async function GET(request: Request) {
  // Verify cron secret (Vercel sends this header for cron jobs)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch new companies from Zefix
    const companies = await fetchZefixDaily(zefixUser, zefixPass);
    console.log(`Fetched ${companies.length} companies from Zefix SHAB`);

    let inserted = 0;
    let skipped = 0;
    let errors = 0;

    for (const company of companies) {
      if (!company.uid || !company.name) {
        skipped++;
        continue;
      }

      const canton = company.registryOfCommerce?.canton || "";
      const slug = generateSlug(company.name, company.uid);
      const legalForm = mapLegalForm(company.legalForm?.name);

      try {
        // Upsert to avoid duplicates (based on uid)
        const { error } = await supabase.from("companies").upsert(
          {
            uid: company.uid,
            name: company.name,
            slug,
            canton,
            legal_form: legalForm,
            legal_seat: company.legalSeat || "",
            purpose: company.purpose || "",
            status: company.status || "active",
            source: "zefix",
            creation_date: company.shabDate || new Date().toISOString().split("T")[0],
            is_active: !company.deleteDate,
            cantonal_excerpt_url: company.cantonalExcerptWeb || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "uid" }
        );

        if (error) {
          console.error(`Error inserting ${company.uid}:`, error.message);
          errors++;
        } else {
          inserted++;
        }
      } catch (err) {
        console.error(`Error processing ${company.uid}:`, err);
        errors++;
      }
    }

    const result = {
      success: true,
      date: new Date().toISOString(),
      fetched: companies.length,
      inserted,
      skipped,
      errors,
    };

    console.log("Zefix import result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Zefix cron error:", error);
    return NextResponse.json(
      { error: "Import failed", details: String(error) },
      { status: 500 }
    );
  }
}
