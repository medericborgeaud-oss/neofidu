import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ZEFIX_API = "https://www.zefix.admin.ch/ZefixPublicREST/api/v1";
const BATCH_SIZE = 10;
const DELAY_MS = 500;

function extractPersons(zefixData: any): { name: string; role: string; initials: string }[] {
  const persons: { name: string; role: string; initials: string }[] = [];
  const rawPersons = zefixData?.persons || [];
  for (const p of rawPersons) {
    const firstName = p.firstName || "";
    const lastName = p.lastName || "";
    const name = `${firstName} ${lastName}`.trim();
    if (!name) continue;
    const funcRaw = p.function || {};
    const role = typeof funcRaw === "object" ? funcRaw.fr || funcRaw.de || funcRaw.en || "" : String(funcRaw);
    const authRaw = p.authorization || {};
    const auth = typeof authRaw === "object" ? authRaw.fr || authRaw.de || authRaw.en || "" : String(authRaw);
    const roleParts = [role, auth].filter(Boolean);
    const roleText = roleParts.length > 0 ? roleParts.join(", ") : "Inscrit(e)";
    const parts = name.split(/\s+/);
    const initials = parts.map((w: string) => w[0]?.toUpperCase() || "").join("").slice(0, 2);
    persons.push({ name, role: roleText, initials });
  }
  return persons;
}

async function fetchZefix(uid: string): Promise<any | null> {
  try {
    const resp = await fetch(`${ZEFIX_API}/company/uid/${uid}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (resp.status === 200) {
      const data = await resp.json();
      return Array.isArray(data) ? data[0] || null : data;
    }
    if (resp.status === 429) {
      await new Promise((r) => setTimeout(r, 30000));
      return fetchZefix(uid);
    }
    return null;
  } catch { return null; }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET() {
  const { count, error } = await supabase
    .from("companies").select("id", { count: "exact", head: true })
    .not("zefix_uid", "is", null).or("persons.is.null,persons.eq.[]");
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ total: count || 0 });
}

export async function POST(req: NextRequest) {
  const { mode = "run" } = await req.json().catch(() => ({ mode: "run" }));
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      try {
        const { count } = await supabase.from("companies").select("id", { count: "exact", head: true })
          .not("zefix_uid", "is", null).or("persons.is.null,persons.eq.[]");
        const total = count || 0;
        send({ type: "start", total });
        if (total === 0) { send({ type: "done", processed: 0, enriched: 0, errors: 0, noPersons: 0 }); controller.close(); return; }
        let processed = 0, enriched = 0, errors = 0, noPersons = 0, offset = 0;
        const limit = mode === "test" ? 1 : total;
        while (processed < limit) {
          const { data: companies, error } = await supabase.from("companies")
            .select("id, zefix_uid, name").not("zefix_uid", "is", null)
            .or("persons.is.null,persons.eq.[]").order("id", { ascending: true }).range(offset, offset + BATCH_SIZE - 1);
          if (error || !companies || companies.length === 0) break;
          for (const company of companies) {
            if (processed >= limit) break;
            const uid = company.zefix_uid;
            if (!uid) continue;
            send({ type: "progress", processed, total: Math.min(total, limit), enriched, errors, noPersons, current: company.name });
            const zefixData = await fetchZefix(uid);
            await sleep(DELAY_MS);
            if (!zefixData) { errors++; processed++; continue; }
            const persons = extractPersons(zefixData);
            if (mode === "test") {
              send({ type: "test_result", company: company.name, uid, rawKeys: Object.keys(zefixData), rawPersons: zefixData.persons?.slice(0, 3), extractedPersons: persons });
            }
            const { error: updateError } = await supabase.from("companies").update({ persons: persons.length > 0 ? persons : [] }).eq("id", company.id);
            if (updateError) { errors++; } else if (persons.length > 0) { enriched++; } else { noPersons++; }
            processed++;
          }
          offset = 0;
        }
        send({ type: "done", processed, enriched, errors, noPersons });
      } catch (e: any) { send({ type: "error", message: e.message || "Erreur inconnue" }); }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
      }
