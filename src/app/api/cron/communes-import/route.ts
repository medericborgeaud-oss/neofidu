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

// ─── SOURCE 1 : LINDAS SPARQL (schéma corrigé) ───

async function fetchCommunesLINDAS(filterCanton?: string): Promise<any[]> {
  // Requête SPARQL corrigée — utilise le namespace schema.ld.admin.ch
  // au lieu de gont.ch (l'ancien namespace ne retournait aucun résultat)
  //
  // Structure LINDAS :
  //   - Communes : https://ld.admin.ch/municipality/{code_ofs}
  //   - Cantons  : https://ld.admin.ch/canton/{code_ofs}
  //   - Classe   : https://schema.ld.admin.ch/PoliticalMunicipality
  //   - Propriétés : schema:name, schema:identifier

  const cantonFilter = filterCanton
    ? `FILTER(?cantonId = ${Object.entries(CANTON_MAP).find(([, v]) => v === filterCanton)?.[0] || 0})`
    : `FILTER(?cantonId IN (10, 22, 23, 24, 25, 26))`;

  const query = `
PREFIX schema: <http://schema.org/>
PREFIX admin: <https://schema.ld.admin.ch/>

SELECT DISTINCT ?id ?name ?cantonId
WHERE {
  ?municipality a admin:PoliticalMunicipality ;
    schema:name ?name ;
    schema:identifier ?id .

  ?canton a admin:Canton ;
    schema:containsPlace ?municipality ;
    schema:identifier ?cantonId .

  ${cantonFilter}
}
ORDER BY ?cantonId ?name
`;

  console.log("[LINDAS] Sending SPARQL query (schema.ld.admin.ch)...");

  const res = await fetch("https://ld.admin.ch/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/sparql-query",
      Accept: "application/sparql-results+json",
    },
    body: query,
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`LINDAS HTTP ${res.status}: ${errorText.substring(0, 500)}`);
  }

  const json = await res.json();
  const bindings = json.results?.bindings || [];

  console.log(`[LINDAS] Got ${bindings.length} raw results`);

  // Dédupliquer (LINDAS peut retourner des doublons multilingues)
  const seen = new Set<number>();
  const communes: any[] = [];

  for (const b of bindings) {
    const codeOfs = parseInt(b.id.value);
    if (seen.has(codeOfs)) continue;
    seen.add(codeOfs);

    const cantonId = parseInt(b.cantonId.value);
    const canton = CANTON_MAP[cantonId];
    if (!canton) continue;

    communes.push({
      code_ofs: codeOfs,
      nom: b.name.value,
      canton,
      district: null, // LINDAS simple query — district enrichi plus tard
      population: null,
      superficie_km2: null,
    });
  }

  return communes;
}

// ─── SOURCE 2 : OpenPLZ API (fallback fiable) ───

async function fetchCommunesOpenPLZ(filterCanton?: string): Promise<any[]> {
  // OpenPLZ API : REST simple, pas de SPARQL
  // https://openplzapi.org/ch/Cantons/{key}/Communes
  console.log("[OpenPLZ] Fetching communes via REST API...");

  const cantonEntries = filterCanton
    ? Object.entries(CANTON_MAP).filter(([, v]) => v === filterCanton)
    : Object.entries(CANTON_MAP);

  const communes: any[] = [];

  for (const [cantonCode, cantonAbbr] of cantonEntries) {
    try {
      // pageSize=500 pour tout récupérer d'un coup (max ~400 communes par canton)
      const url = `https://openplzapi.org/ch/Cantons/${cantonCode}/Communes?pageSize=500`;
      console.log(`[OpenPLZ] Fetching ${cantonAbbr}: ${url}`);

      const res = await fetch(url, {
        headers: { Accept: "text/json" },
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) {
        console.error(`[OpenPLZ] HTTP ${res.status} for canton ${cantonAbbr}`);
        continue;
      }

      const data = await res.json();
      console.log(`[OpenPLZ] ${cantonAbbr}: ${data.length} communes`);

      for (const c of data) {
        communes.push({
          code_ofs: parseInt(c.key) || parseInt(c.historicalCode) || 0,
          nom: c.name || c.shortName || "",
          canton: cantonAbbr,
          district: c.district?.name || null,
          population: null,
          superficie_km2: null,
        });
      }
    } catch (e: any) {
      console.error(`[OpenPLZ] Error for ${cantonAbbr}:`, e.message);
    }
  }

  return communes;
}

// ─── SOURCE 3 : geo.admin.ch API (dernier recours) ───

async function fetchCommunesGeoAdmin(filterCanton?: string): Promise<any[]> {
  // API GeoAdmin : swissBOUNDARIES3D — contient toutes les communes suisses
  // On utilise le endpoint "find" avec un wildcard pour récupérer tout
  console.log("[GeoAdmin] Fetching communes via find API...");

  const communes: any[] = [];
  const cantonEntries = filterCanton
    ? Object.entries(CANTON_MAP).filter(([, v]) => v === filterCanton)
    : Object.entries(CANTON_MAP);

  for (const [, cantonAbbr] of cantonEntries) {
    try {
      // Chercher toutes les communes du canton via le champ "kanton"
      const url = `https://api3.geo.admin.ch/rest/services/api/MapServer/find?layer=ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill&searchField=kanton&searchText=${cantonAbbr}&returnGeometry=false`;

      const res = await fetch(url, {
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) {
        console.error(`[GeoAdmin] HTTP ${res.status} for ${cantonAbbr}`);
        continue;
      }

      const data = await res.json();
      const results = data.results || [];
      console.log(`[GeoAdmin] ${cantonAbbr}: ${results.length} results`);

      for (const r of results) {
        const attrs = r.attributes || r.properties || {};
        const codeOfs = attrs.bfs_nr || attrs.id || attrs.gemeindenummer || 0;
        const nom = attrs.gemname || attrs.name || "";

        if (codeOfs && nom) {
          communes.push({
            code_ofs: parseInt(codeOfs),
            nom,
            canton: cantonAbbr,
            district: attrs.bezirksname || null,
            population: null,
            superficie_km2: attrs.gemflaeche ? parseFloat(attrs.gemflaeche) / 1000000 : null,
          });
        }
      }
    } catch (e: any) {
      console.error(`[GeoAdmin] Error for ${cantonAbbr}:`, e.message);
    }
  }

  return communes;
}

// ─── Enrichissement : nombre d'entreprises par commune ───

async function enrichWithCompanies(): Promise<{
  updated: number;
  errors: number;
}> {
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
      let communes: any[] = [];
      let source = "";

      // Source 1 : LINDAS SPARQL
      try {
        communes = await fetchCommunesLINDAS(canton);
        source = "LINDAS";
        console.log(`[communes-import] LINDAS: ${communes.length} communes`);
      } catch (e: any) {
        console.error("[communes-import] LINDAS failed:", e.message);
      }

      // Source 2 : OpenPLZ API (fallback)
      if (communes.length === 0) {
        try {
          console.log("[communes-import] Trying OpenPLZ fallback...");
          communes = await fetchCommunesOpenPLZ(canton);
          source = "OpenPLZ";
          console.log(`[communes-import] OpenPLZ: ${communes.length} communes`);
        } catch (e: any) {
          console.error("[communes-import] OpenPLZ failed:", e.message);
        }
      }

      // Source 3 : geo.admin.ch (dernier recours)
      if (communes.length === 0) {
        try {
          console.log("[communes-import] Trying GeoAdmin fallback...");
          communes = await fetchCommunesGeoAdmin(canton);
          source = "GeoAdmin";
          console.log(`[communes-import] GeoAdmin: ${communes.length} communes`);
        } catch (e: any) {
          console.error("[communes-import] GeoAdmin failed:", e.message);
        }
      }

      if (communes.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Aucune commune récupérée (LINDAS + OpenPLZ + GeoAdmin ont tous échoué)",
          },
          { status: 500 }
        );
      }

      console.log(`[communes-import] ${communes.length} communes à importer (source: ${source})`);

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
        source,
        total: communes.length,
        inserted,
        errors: errCount,
        sample: communes.slice(0, 5).map((c) => `${c.nom} (${c.canton})`),
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
