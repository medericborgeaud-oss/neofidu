// src/app/api/cron/communes-import/route.ts
// Import des communes romandes depuis LINDAS (API SPARQL Confédération)
// + enrichissement avec données entreprises depuis notre table companies
//
// Usage :
//   ?secret=xxx&step=communes          → importe les communes depuis LINDAS
//   ?secret=xxx&step=companies          → enrichit avec nb entreprises + secteur
//   ?secret=xxx&step=communes&canton=VD → importe seulement Vaud

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min max (Vercel)

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Codes OFS des cantons romands
const CANTON_MAP: Record<number, string> = {
  10: "FR",
  22: "VD",
  23: "VS",
  24: "NE",
  25: "GE",
  26: "JU",
};

const CANTON_CODES = Object.keys(CANTON_MAP).join(", ");

// ─── Slug generator ───

function generateSlug(nom: string, canton: string): string {
  return (
    nom
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    `-${canton.toLowerCase()}`
  );
}

// ─── LINDAS SPARQL : communes + population + superficie ───

async function fetchCommunesLINDAS(filterCanton?: string): Promise<any[]> {
  // Requête SPARQL pour récupérer les communes actuelles des cantons romands
  // depuis le registre officiel LINDAS (Linked Data Service de la Confédération)
  const query = `
PREFIX schema: <http://schema.org/>
PREFIX gont: <https://gont.ch/>

SELECT DISTINCT ?id ?name ?cantonId ?districtName ?population ?area
WHERE {
  ?municipality a gont:PoliticalMunicipality ;
    gont:id ?id ;
    schema:name ?name ;
    gont:canton ?cantonUri ;
    gont:district ?districtUri .

  ?cantonUri gont:id ?cantonId .
  ?districtUri schema:name ?districtName .

  OPTIONAL { ?municipality schema:population ?population . }
  OPTIONAL { ?municipality gont:area ?area . }

  FILTER(?cantonId IN (${CANTON_CODES}))

  # Seulement les entités actuelles (pas les anciennes communes fusionnées)
  FILTER NOT EXISTS { ?municipality gont:abolitionDate ?abolished . }
}
ORDER BY ?cantonId ?name
`;

  console.log("[LINDAS] Sending SPARQL query...");

  const res = await fetch("https://ld.admin.ch/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/sparql-query",
      Accept: "application/sparql-results+json",
    },
    body: query,
    signal: AbortSignal.timeout(60000), // 60s timeout
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`LINDAS HTTP ${res.status}: ${errorText.substring(0, 500)}`);
  }

  const json = await res.json();
  const bindings = json.results?.bindings || [];

  console.log(`[LINDAS] Got ${bindings.length} raw results`);

  // Dédupliquer (LINDAS peut retourner des doublons à cause des labels multilingues)
  const seen = new Set<number>();
  const communes: any[] = [];

  for (const b of bindings) {
    const codeOfs = parseInt(b.id.value);
    if (seen.has(codeOfs)) continue;
    seen.add(codeOfs);

    const cantonId = parseInt(b.cantonId.value);
    const canton = CANTON_MAP[cantonId];
    if (!canton) continue;

    if (filterCanton && canton !== filterCanton) continue;

    communes.push({
      code_ofs: codeOfs,
      nom: b.name.value,
      canton,
      district: b.districtName?.value || null,
      population: b.population ? parseInt(b.population.value) : null,
      superficie_km2: b.area ? parseFloat(b.area.value) : null,
    });
  }

  return communes;
}

// ─── Fallback : API STATPOP via opendata.swiss ───

async function fetchCommunesStatpop(): Promise<any[]> {
  // Si LINDAS échoue, on utilise le répertoire officiel des communes
  // via l'API JSON du registre
  const url = "https://sms.bfs.admin.ch/WcfBFSSpecificService.svc/AnonymousRest/communes/search?canton=10,22,23,24,25,26";

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`STATPOP HTTP ${res.status}`);
    const data = await res.json();

    return (data || []).map((c: any) => ({
      code_ofs: c.id || c.communeId,
      nom: c.name || c.communeName,
      canton: CANTON_MAP[c.cantonId] || "",
      district: c.districtName || null,
      population: c.population || null,
      superficie_km2: c.area || null,
    }));
  } catch (e) {
    console.error("[STATPOP] Fallback also failed:", e);
    return [];
  }
}

// ─── Enrichissement : nombre d'entreprises par commune ───

async function enrichWithCompanies(): Promise<{
  updated: number;
  errors: number;
}> {
  // Compter les entreprises par ville depuis notre table companies
  const { data, error } = await supabase.rpc("count_companies_by_city");

  if (error || !data) {
    console.error("[companies] RPC error:", error);
    return { updated: 0, errors: 1 };
  }

  console.log(`[companies] Got ${data.length} city-canton pairs`);

  let updated = 0;
  let errors = 0;

  for (const row of data) {
    const { error: updateError } = await supabase
      .from("communes")
      .update({
        nb_entreprises: row.count,
        secteur_dominant: row.top_sector,
        updated_at: new Date().toISOString(),
      })
      .eq("canton", row.canton)
      .ilike("nom", row.city);

    if (updateError) {
      errors++;
    } else {
      updated++;
    }
  }

  return { updated, errors };
}

// ─── Route principale ───

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Auth
  const secret = searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const step = searchParams.get("step") || "communes";
  const canton = searchParams.get("canton") || undefined;

  console.log(`\n[communes-import] ══════════════════════════════`);
  console.log(`[communes-import] step=${step}, canton=${canton || "tous"}`);
  console.log(`[communes-import] ══════════════════════════════\n`);

  try {
    // ─── STEP 1 : Import des communes ───
    if (step === "communes") {
      // Essayer LINDAS d'abord
      let communes = await fetchCommunesLINDAS(canton).catch((e) => {
        console.error("[LINDAS] Error:", e.message);
        return [] as any[];
      });

      // Fallback si LINDAS échoue
      if (communes.length === 0) {
        console.log("[communes-import] LINDAS returned 0, trying fallback...");
        communes = await fetchCommunesStatpop();
        if (canton) {
          communes = communes.filter((c) => c.canton === canton);
        }
      }

      if (communes.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Aucune commune récupérée depuis LINDAS ni le fallback",
          },
          { status: 500 }
        );
      }

      console.log(`[communes-import] ${communes.length} communes à importer`);

      // Préparer les rows avec slugs
      const rows = communes.map((c) => ({
        code_ofs: c.code_ofs,
        nom: c.nom,
        canton: c.canton,
        district: c.district,
        slug: generateSlug(c.nom, c.canton),
        population: c.population,
        superficie_km2: c.superficie_km2,
        densite:
          c.population && c.superficie_km2
            ? Math.round((c.population / c.superficie_km2) * 10) / 10
            : null,
        updated_at: new Date().toISOString(),
      }));

      // Upsert par batch de 100
      let inserted = 0;
      let errCount = 0;

      for (let i = 0; i < rows.length; i += 100) {
        const chunk = rows.slice(i, i + 100);
        const { error } = await supabase
          .from("communes")
          .upsert(chunk, { onConflict: "code_ofs" });

        if (error) {
          console.error(`[communes-import] Upsert error batch ${i}:`, error.message);
          errCount++;
        } else {
          inserted += chunk.length;
          console.log(`[communes-import] ✓ ${inserted}/${rows.length}`);
        }
      }

      return NextResponse.json({
        success: true,
        step: "communes",
        total: communes.length,
        inserted,
        errors: errCount,
        sample: communes.slice(0, 3).map((c) => `${c.nom} (${c.canton})`),
      });
    }

    // ─── STEP 2 : Enrichir avec données entreprises ───
    if (step === "companies") {
      const result = await enrichWithCompanies();

      return NextResponse.json({
        success: true,
        step: "companies",
        ...result,
      });
    }

    return NextResponse.json(
      { error: `Step inconnu: "${step}". Utilisez ?step=communes ou ?step=companies` },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[communes-import] Fatal:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack?.substring(0, 500),
      },
      { status: 500 }
    );
  }
}
