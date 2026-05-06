// src/app/api/cron/communes-import/route.ts
// Import des communes romandes depuis LINDAS (API SPARQL Confédération)
// + enrichissement avec données entreprises depuis notre table companies
//
// Usage :
//   ?secret=xxx&step=communes          → importe les communes depuis LINDAS
//   ?secret=xxx&step=population         → enrichit avec population + superficie (Wikidata)
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

// ─── Enrichissement : population + superficie via Wikidata ───

async function enrichWithPopulation(): Promise<{
  updated: number;
  errors: number;
}> {
  // 1. Récupérer les code_ofs de nos communes (seulement celles sans population)
  const { data: existingCommunes } = await supabase
    .from("communes")
    .select("code_ofs");
  const ourCodes = new Set((existingCommunes || []).map((c: any) => c.code_ofs));
  console.log(`[population] ${ourCodes.size} communes in our DB`);

  // 2. Wikidata SPARQL : population et superficie
  // Requête élargie : cherche TOUT entity avec un code commune BFS (P771)
  // Inclut Q70208 (municipality), Q685309 (Einwohnergemeinde), et autres variantes
  const query = `
SELECT ?bfsCode ?population ?area WHERE {
  ?municipality wdt:P771 ?bfsCode .
  OPTIONAL { ?municipality wdt:P1082 ?population . }
  OPTIONAL { ?municipality wdt:P2046 ?area . }
}
`;

  console.log("[Wikidata] Fetching population data...");

  const res = await fetch("https://query.wikidata.org/sparql", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/sparql-results+json",
      "User-Agent": "NeoFidu-CommunesImport/1.0 (https://neofidu.ch)",
    },
    body: `query=${encodeURIComponent(query)}`,
    signal: AbortSignal.timeout(90000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Wikidata HTTP ${res.status}: ${errText.substring(0, 300)}`);
  }

  const json = await res.json();
  const bindings = json.results?.bindings || [];
  console.log(`[Wikidata] Got ${bindings.length} raw results`);

  // 3. Dédupliquer par code BFS (garder la plus grande population = plus récente)
  const byCode = new Map<number, { population: number | null; area: number | null }>();
  for (const b of bindings) {
    const code = parseInt(b.bfsCode.value);
    if (!ourCodes.has(code)) continue; // Ignorer les communes hors romandes

    const pop = b.population ? parseInt(b.population.value) : null;
    const area = b.area ? parseFloat(b.area.value) : null;

    const existing = byCode.get(code);
    if (!existing || (pop && (!existing.population || pop > existing.population))) {
      byCode.set(code, { population: pop, area: area || existing?.area || null });
    }
  }

  console.log(`[Wikidata] ${byCode.size} matching communes with data`);

  // 4. Préparer les updates
  const updates: { code: number; data: any }[] = [];
  for (const [code, d] of byCode.entries()) {
    const upd: any = { updated_at: new Date().toISOString() };
    if (d.population) upd.population = d.population;
    if (d.area) upd.superficie_km2 = Math.round(d.area * 100) / 100;
    if (d.population && d.area) {
      upd.densite = Math.round((d.population / d.area) * 10) / 10;
    }
    updates.push({ code, data: upd });
  }

  let updated = 0;
  let errors = 0;

  // 5. Updates en parallèle par batch de 50
  for (let i = 0; i < updates.length; i += 50) {
    const chunk = updates.slice(i, i + 50);
    const results = await Promise.all(
      chunk.map(({ code, data }) =>
        supabase.from("communes").update(data).eq("code_ofs", code)
      )
    );

    for (const r of results) {
      if (r.error) errors++;
      else updated++;
    }
    console.log(`[population] ✓ ${updated}/${updates.length} (${errors} err)`);
  }

  // Note : le fallback BFS PXWEB est dans un step séparé (step=population-bfs)
  // pour éviter les timeouts Vercel

  return { updated, errors };
}

// ─── Enrichissement : population via BFS PXWEB (fallback) ───

async function enrichWithPopulationBFS(): Promise<{
  updated: number;
  errors: number;
  still_missing: number;
}> {
  const { data: missingPop } = await supabase
    .from("communes")
    .select("code_ofs, nom, canton")
    .is("population", null);

  if (!missingPop || missingPop.length === 0) {
    console.log("[BFS PXWEB] No communes missing population!");
    return { updated: 0, errors: 0, still_missing: 0 };
  }

  // Log les premiers codes manquants et leur type
  const sampleMissing = missingPop.slice(0, 10);
  console.log(`[BFS PXWEB] ${missingPop.length} communes missing population`);
  console.log(`[BFS PXWEB] Sample missing codes: ${sampleMissing.map((c: any) => `${c.code_ofs}(${typeof c.code_ofs})`).join(", ")}`);
  console.log(`[BFS PXWEB] Sample missing names: ${sampleMissing.map((c: any) => c.nom).join(", ")}`);

  const missingCodes = new Set(missingPop.map((c: any) => c.code_ofs));

  // Vérif rapide : est-ce que le Set fonctionne correctement ?
  const firstCode = missingPop[0].code_ofs;
  console.log(`[BFS PXWEB] Set check: firstCode=${firstCode} (${typeof firstCode}), has=${missingCodes.has(firstCode)}, has_number=${missingCodes.has(Number(firstCode))}, has_string=${missingCodes.has(String(firstCode))}`);

  let pxUpdates: { code: number; pop: number }[] = [];

  const pxBase = "https://www.pxweb.bfs.admin.ch/api/v1";
  const pxTable = "px-x-0102010000_103/px-x-0102010000_103.px";

  for (const lang of ["de", "fr"]) {
    if (pxUpdates.length > 0) break;

    const pxUrl = `${pxBase}/${lang}/${pxTable}`;
    console.log(`[BFS PXWEB] Trying ${lang} endpoint...`);

    try {
      // GET metadata
      const metaRes = await fetch(pxUrl, {
        method: "GET",
        headers: { "Accept": "application/json" },
        signal: AbortSignal.timeout(30000),
      });

      if (!metaRes.ok) {
        console.log(`[BFS PXWEB] ${lang} metadata HTTP ${metaRes.status}, skipping`);
        continue;
      }

      const meta = await metaRes.json();
      const variables = meta?.variables || [];
      console.log(`[BFS PXWEB] ${lang} variables:`, variables.map((v: any) => `${v.code}(${v.values?.length || 0})`).join(", "));

      // Identifier les variables
      const communeVar = variables.find((v: any) =>
        v.code.toLowerCase().includes("gemeinde") ||
        v.code.toLowerCase().includes("commune") ||
        v.code.toLowerCase().includes("kanton") ||
        (v.values?.length || 0) > 500
      );

      const yearVar = variables.find((v: any) => {
        const c = (v.code as string).toLowerCase();
        if (c.includes("jahr") || c === "année" || c === "year") return true;
        const vals = v.values || [];
        return vals.length > 0 && vals.length < 50 &&
          vals.every((val: string) => /^\d{4}$/.test(val) && parseInt(val) >= 1900 && parseInt(val) <= 2100);
      });

      if (!communeVar || !yearVar) {
        console.error(`[BFS PXWEB] Could not identify commune/year variables, skipping ${lang}`);
        continue;
      }

      console.log(`[BFS PXWEB] Commune var: "${communeVar.code}" (${communeVar.values.length} values)`);
      console.log(`[BFS PXWEB] Year var: "${yearVar.code}" (${yearVar.values.length} values)`);

      // Trouver les codes OFS manquants dans les valeurs PxWeb
      // Les valeurs PxWeb sont au format "......XXXX" — on doit trouver lesquelles correspondent
      const communeValues = communeVar.values as string[];
      const communeTexts = communeVar.valueTexts as string[];

      // Mapper les codes OFS vers les valeurs PxWeb
      const targetPxValues: string[] = [];
      const matchedCodes: { pxVal: string; cleaned: string; code: number; text: string }[] = [];
      for (let i = 0; i < communeValues.length; i++) {
        const pxVal = communeValues[i];
        const cleaned = pxVal.replace(/\./g, "").replace(/-/g, "").trim();
        const code = parseInt(cleaned);
        if (code > 0 && missingCodes.has(code)) {
          targetPxValues.push(pxVal);
          matchedCodes.push({ pxVal, cleaned, code, text: communeTexts[i] || "" });
        }
      }

      // Log les codes matchés pour debug
      console.log(`[BFS PXWEB] First 10 matched codes:`);
      for (const m of matchedCodes.slice(0, 10)) {
        console.log(`[BFS PXWEB]   pxVal="${m.pxVal}" → cleaned="${m.cleaned}" → code=${m.code} → text="${m.text}"`);
      }

      console.log(`[BFS PXWEB] Found ${targetPxValues.length}/${missingPop.length} missing codes in PxWeb data`);

      if (targetPxValues.length === 0) {
        console.log(`[BFS PXWEB] No matching codes found in ${lang}, trying next...`);
        continue;
      }

      // Construire la query avec SEULEMENT les communes manquantes
      const query: any[] = [];

      for (const v of variables) {
        const code = v.code as string;
        const values = (v.values || []) as string[];
        const texts = (v.valueTexts || []) as string[];

        if (v === communeVar) {
          // Sélectionner uniquement les communes manquantes
          query.push({
            code,
            selection: { filter: "item", values: targetPxValues },
          });
          console.log(`[BFS PXWEB] Commune: ${targetPxValues.length} specific values`);
          continue;
        }

        if (v === yearVar) {
          const lastYear = values[values.length - 1];
          query.push({
            code,
            selection: { filter: "item", values: [lastYear] },
          });
          console.log(`[BFS PXWEB] Year "${code}" → ${lastYear}`);
        } else {
          const totalIdx = texts.findIndex((t: string) => /total/i.test(t));
          const selectedValue = totalIdx >= 0 ? values[totalIdx] : values[0];
          query.push({
            code,
            selection: { filter: "item", values: [selectedValue] },
          });
          console.log(`[BFS PXWEB] Filter "${code}" → "${selectedValue}" (${texts[totalIdx >= 0 ? totalIdx : 0]})`);
        }
      }

      console.log(`[BFS PXWEB] POST query: ${targetPxValues.length} communes × 1 year × totals...`);

      const pxRes = await fetch(pxUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, response: { format: "json" } }),
        signal: AbortSignal.timeout(120000),
      });

      if (!pxRes.ok) {
        const errText = await pxRes.text().catch(() => "");
        console.error(`[BFS PXWEB] ${lang} POST HTTP ${pxRes.status}: ${errText.slice(0, 300)}`);
        continue;
      }

      const pxData = await pxRes.json();
      const pxValues = pxData?.data || [];
      console.log(`[BFS PXWEB] Got ${pxValues.length} entries from ${lang}`);

      // Log samples
      for (const s of pxValues.slice(0, 5)) {
        console.log(`[BFS PXWEB] Sample: key=${JSON.stringify(s.key)}, val=${s.values?.[0]}`);
      }

      const communeVarIdx = variables.indexOf(communeVar);

      for (const entry of pxValues) {
        const rawKey = entry.key?.[communeVarIdx] || entry.key?.[0] || "";
        const codeStr = rawKey.replace(/\./g, "").replace(/-/g, "").trim();
        const code = parseInt(codeStr);
        const pop = parseInt(entry.values?.[0]) || 0;

        if (code > 0 && code < 10000 && pop > 0 && missingCodes.has(code)) {
          pxUpdates.push({ code, pop });
        }
      }

      console.log(`[BFS PXWEB] Matched ${pxUpdates.length} communes with population data`);

    } catch (langErr: any) {
      console.error(`[BFS PXWEB] ${lang} error:`, langErr.message);
    }
  }

  // Batch update — avec count pour vérifier les lignes réellement modifiées
  let updated = 0;
  let errors = 0;
  let rowsAffected = 0;

  // D'abord, vérifier que les codes existent bien en DB
  if (pxUpdates.length > 0) {
    const sampleCodes = pxUpdates.slice(0, 5).map((u) => u.code);
    const { data: checkRows, error: checkErr } = await supabase
      .from("communes")
      .select("code_ofs, nom, population")
      .in("code_ofs", sampleCodes);

    console.log(`[BFS PXWEB] DB check for codes ${sampleCodes.join(",")}:`);
    if (checkErr) {
      console.error(`[BFS PXWEB] DB check error:`, checkErr.message);
    } else if (checkRows) {
      for (const r of checkRows) {
        console.log(`[BFS PXWEB]   code_ofs=${r.code_ofs} (${typeof r.code_ofs}), nom=${r.nom}, pop=${r.population}`);
      }
      console.log(`[BFS PXWEB]   Found ${checkRows.length}/${sampleCodes.length} in DB`);
    }
  }

  for (let i = 0; i < pxUpdates.length; i += 50) {
    const chunk = pxUpdates.slice(i, i + 50);
    const results = await Promise.all(
      chunk.map(({ code, pop }) =>
        supabase
          .from("communes")
          .update({
            population: pop,
            updated_at: new Date().toISOString(),
          })
          .eq("code_ofs", code)
          .select("code_ofs, population")
      )
    );

    for (let j = 0; j < results.length; j++) {
      const r = results[j];
      if (r.error) {
        errors++;
        if (errors <= 3) console.error(`[BFS PXWEB] Update error for ${chunk[j].code}:`, r.error.message);
      } else {
        updated++;
        const affected = r.data?.length || 0;
        rowsAffected += affected;
        // Log les premiers pour debug
        if (i === 0 && j < 3) {
          console.log(`[BFS PXWEB] Update code=${chunk[j].code} pop=${chunk[j].pop} → affected=${affected}, data=${JSON.stringify(r.data)}`);
        }
      }
    }

    console.log(`[BFS PXWEB] ✓ ${updated}/${pxUpdates.length} (${errors} err, ${rowsAffected} rows affected)`);
  }

  // Recalculer la densité pour les communes mises à jour qui ont une superficie
  if (updated > 0) {
    const codes = pxUpdates.map((u) => u.code);
    const { data: withArea } = await supabase
      .from("communes")
      .select("code_ofs, population, superficie_km2")
      .in("code_ofs", codes)
      .not("superficie_km2", "is", null);

    if (withArea) {
      for (const c of withArea) {
        if (c.population && c.superficie_km2) {
          await supabase
            .from("communes")
            .update({ densite: Math.round((c.population / c.superficie_km2) * 10) / 10 })
            .eq("code_ofs", c.code_ofs);
        }
      }
      console.log(`[BFS PXWEB] Recalculated density for ${withArea.length} communes`);
    }
  }

  // Log encore manquantes
  const { data: stillMissing } = await supabase
    .from("communes")
    .select("code_ofs, nom, canton")
    .is("population", null);

  const stillCount = stillMissing?.length || 0;
  if (stillCount > 0) {
    console.log(`[BFS PXWEB] Still missing ${stillCount} communes:`);
    for (const c of (stillMissing || []).slice(0, 20)) {
      console.log(`  - ${c.nom} (${c.canton}) [OFS ${c.code_ofs}]`);
    }
  } else {
    console.log("[BFS PXWEB] All communes now have population data!");
  }

  return { updated, errors, still_missing: stillCount };
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

    // ─── STEP 2 : Enrichir population + superficie (Wikidata) ───
    if (step === "population") {
      const result = await enrichWithPopulation();

      return NextResponse.json({
        success: true,
        step: "population",
        source: "Wikidata",
        ...result,
      });
    }

    // ─── STEP 2b : Fallback BFS PXWEB pour communes sans population ───
    if (step === "population-bfs") {
      const result = await enrichWithPopulationBFS();

      return NextResponse.json({
        success: true,
        step: "population-bfs",
        source: "BFS PXWEB",
        ...result,
      });
    }

    // ─── STEP 3 : Enrichir avec données entreprises ───
    if (step === "companies") {
      const result = await enrichWithCompanies();

      return NextResponse.json({
        success: true,
        step: "companies",
        ...result,
      });
    }

    // ─── STEP 4 : Nettoyage des communes historiques/fusionnées ───
    if (step === "cleanup") {
      // Supprimer les communes sans population = communes historiques/fusionnées
      // qui n'existent plus en tant qu'entités indépendantes
      const { data: obsolete } = await supabase
        .from("communes")
        .select("code_ofs, nom, canton, population")
        .is("population", null);

      if (!obsolete || obsolete.length === 0) {
        return NextResponse.json({
          success: true,
          step: "cleanup",
          message: "Aucune commune obsolète à supprimer",
          deleted: 0,
        });
      }

      console.log(`[cleanup] ${obsolete.length} communes sans population (historiques/fusionnées)`);
      for (const c of obsolete.slice(0, 20)) {
        console.log(`[cleanup]   - ${c.nom} (${c.canton}) [OFS ${c.code_ofs}]`);
      }

      // Supprimer par batch
      const codes = obsolete.map((c: any) => c.code_ofs);
      let deleted = 0;

      for (let i = 0; i < codes.length; i += 100) {
        const chunk = codes.slice(i, i + 100);
        const { error } = await supabase
          .from("communes")
          .delete()
          .in("code_ofs", chunk);

        if (error) {
          console.error(`[cleanup] Delete error:`, error.message);
        } else {
          deleted += chunk.length;
          console.log(`[cleanup] ✓ ${deleted}/${codes.length}`);
        }
      }

      // Compter le total restant
      const { count } = await supabase
        .from("communes")
        .select("*", { count: "exact", head: true });

      console.log(`[cleanup] Done: ${deleted} supprimées, ${count} communes restantes`);

      return NextResponse.json({
        success: true,
        step: "cleanup",
        deleted,
        remaining: count,
        sample_deleted: obsolete.slice(0, 10).map((c: any) => `${c.nom} (${c.canton})`),
      });
    }

    // ─── STEP 5 : Supprimer les communes qui ne sont plus dans le répertoire BFS actuel ───
    if (step === "dedup") {
      // Approche fiable : récupérer la liste OFFICIELLE des communes actuelles
      // depuis BFS PXWEB, et supprimer toute commune de notre DB qui n'y figure pas.
      const pxUrl = "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102010000_103/px-x-0102010000_103.px";

      const metaRes = await fetch(pxUrl, {
        method: "GET",
        headers: { "Accept": "application/json" },
        signal: AbortSignal.timeout(30000),
      });

      if (!metaRes.ok) {
        return NextResponse.json({
          success: false,
          error: `BFS metadata HTTP ${metaRes.status}`,
        }, { status: 500 });
      }

      const meta = await metaRes.json();
      const variables = meta?.variables || [];

      // Trouver la variable commune (celle avec 2000+ valeurs)
      const communeVar = variables.find((v: any) =>
        v.code.toLowerCase().includes("gemeinde") ||
        v.code.toLowerCase().includes("kanton") ||
        (v.values?.length || 0) > 500
      );

      if (!communeVar) {
        return NextResponse.json({
          success: false,
          error: "Could not find commune variable in BFS metadata",
        }, { status: 500 });
      }

      // Extraire les codes OFS actuels (communes uniquement, pas cantons/districts)
      // Format: "......XXXX" pour communes, "-X" pour cantons, ">>XXXX" pour districts
      const bfsCodes = new Set<number>();
      const communeValues = communeVar.values as string[];
      const communeTexts = communeVar.valueTexts as string[];

      for (let i = 0; i < communeValues.length; i++) {
        const val = communeValues[i];
        // Les communes commencent par "......" (6 points)
        if (val.startsWith("......")) {
          const code = parseInt(val.replace(/\./g, ""));
          if (code > 0 && code < 10000) {
            bfsCodes.add(code);
          }
        }
      }

      console.log(`[dedup] BFS has ${bfsCodes.size} current communes`);

      // Récupérer toutes nos communes
      const { data: ourCommunes } = await supabase
        .from("communes")
        .select("code_ofs, nom, canton, population");

      if (!ourCommunes) {
        return NextResponse.json({ success: false, error: "DB query failed" }, { status: 500 });
      }

      console.log(`[dedup] Our DB has ${ourCommunes.length} communes`);

      // Identifier les communes obsolètes (pas dans BFS)
      const toDelete: { code: number; nom: string; canton: string }[] = [];
      for (const c of ourCommunes) {
        if (!bfsCodes.has(c.code_ofs)) {
          toDelete.push({ code: c.code_ofs, nom: c.nom, canton: c.canton });
        }
      }

      console.log(`[dedup] ${toDelete.length} communes not in current BFS list:`);
      for (const c of toDelete.slice(0, 30)) {
        console.log(`[dedup]   - ${c.nom} (${c.canton}) [OFS ${c.code}]`);
      }

      // Supprimer
      let deleted = 0;
      if (toDelete.length > 0) {
        const codes = toDelete.map((c) => c.code);
        for (let i = 0; i < codes.length; i += 100) {
          const chunk = codes.slice(i, i + 100);
          const { error } = await supabase
            .from("communes")
            .delete()
            .in("code_ofs", chunk);

          if (error) {
            console.error(`[dedup] Delete error:`, error.message);
          } else {
            deleted += chunk.length;
          }
        }
      }

      const { count } = await supabase
        .from("communes")
        .select("*", { count: "exact", head: true });

      return NextResponse.json({
        success: true,
        step: "dedup",
        bfs_current: bfsCodes.size,
        our_total_before: ourCommunes.length,
        deleted,
        remaining: count,
        sample_deleted: toDelete.slice(0, 15).map((c) => `${c.nom} (${c.canton})`),
      });
    }

    return NextResponse.json(
      { error: `Step inconnu: "${step}". Steps disponibles: communes, population, population-bfs, companies, cleanup, dedup` },
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
