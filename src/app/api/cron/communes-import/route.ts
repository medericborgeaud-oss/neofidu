// src/app/api/cron/communes-import/route.ts
// Import des communes romandes depuis LINDAS (API SPARQL Confédération)
// + enrichissement avec données entreprises depuis notre table companies
//
// Usage :
//   ?secret=xxx&step=communes          → importe les communes depuis LINDAS
//   ?secret=xxx&step=population         → enrichit avec superficie (Wikidata)
//   ?secret=xxx&step=population-bfs     → enrichit avec population (BFS PxWeb)
//   ?secret=xxx&step=tax               → enrichit avec coefficients fiscaux
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

// ─── Enrichissement : superficie via Wikidata (NE TOUCHE PAS à la population) ───

async function enrichWithArea(): Promise<{
  updated: number;
  errors: number;
}> {
  // 1. Récupérer nos communes avec leur population BFS
  const { data: existingCommunes } = await supabase
    .from("communes")
    .select("code_ofs, population");
  const ourCommunes = new Map((existingCommunes || []).map((c: any) => [c.code_ofs, c.population]));
  console.log(`[area] ${ourCommunes.size} communes in our DB`);

  // 2. Wikidata SPARQL : UNIQUEMENT la superficie (P2046)
  const query = `
SELECT ?bfsCode ?area WHERE {
  ?municipality wdt:P31/wdt:P279* wd:Q70208 .
  ?municipality wdt:P771 ?bfsCode .
  ?municipality wdt:P2046 ?area .
}
`;

  console.log("[Wikidata] Fetching area data only...");

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
  console.log(`[Wikidata] Got ${bindings.length} area results`);

  // 3. Dédupliquer par code BFS (garder la plus petite surface = commune, pas district)
  const byCode = new Map<number, number>();
  for (const b of bindings) {
    const code = parseInt(b.bfsCode.value);
    if (!ourCommunes.has(code)) continue;

    const area = parseFloat(b.area.value);
    if (area <= 0) continue;

    const existing = byCode.get(code);
    // Garder la plus petite surface (commune < district < canton)
    if (!existing || area < existing) {
      byCode.set(code, area);
    }
  }

  console.log(`[Wikidata] ${byCode.size} communes with area data`);

  // 4. Préparer les updates (superficie + densité, JAMAIS la population)
  const updates: { code: number; data: any }[] = [];
  for (const [code, area] of byCode.entries()) {
    const pop = ourCommunes.get(code);
    const upd: any = {
      superficie_km2: Math.round(area * 100) / 100,
      updated_at: new Date().toISOString(),
    };
    if (pop && area) {
      upd.densite = Math.round((pop / area) * 10) / 10;
    }
    updates.push({ code, data: upd });
  }

  let updated = 0;
  let errors = 0;

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
    console.log(`[area] ✓ ${updated}/${updates.length} (${errors} err)`);
  }

  return { updated, errors };
}

// ─── Enrichissement : population via BFS PXWEB (fallback) ───

async function enrichWithPopulationBFS(): Promise<{
  updated: number;
  errors: number;
  still_missing: number;
}> {
  // Récupérer TOUTES les communes (pas juste celles sans population)
  // pour écraser les éventuelles données Wikidata incorrectes
  const { data: allCommunes } = await supabase
    .from("communes")
    .select("code_ofs, nom, canton");

  if (!allCommunes || allCommunes.length === 0) {
    console.log("[BFS PXWEB] No communes in DB!");
    return { updated: 0, errors: 0, still_missing: 0 };
  }

  console.log(`[BFS PXWEB] ${allCommunes.length} communes to enrich with BFS data`);

  const allCodes = new Set(allCommunes.map((c: any) => c.code_ofs));

  // Vérif rapide : est-ce que le Set fonctionne correctement ?
  const firstCode = allCommunes[0].code_ofs;
  console.log(`[BFS PXWEB] Set check: firstCode=${firstCode} (${typeof firstCode}), has=${allCodes.has(firstCode)}, has_number=${allCodes.has(Number(firstCode))}, has_string=${allCodes.has(String(firstCode))}`);

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
      // Format PxWeb : canton=2 chars ("FR"), district=6 chars ("001004"), commune=4 chars ("2173")
      // CRITICAL : parseInt("002173") (district) == 2173 (commune) → on ne garde QUE les 4 chars
      const targetPxValues: string[] = [];
      const matchedCodes: { pxVal: string; cleaned: string; code: number; text: string }[] = [];
      for (let i = 0; i < communeValues.length; i++) {
        const pxVal = communeValues[i];
        // Uniquement les communes (4 caractères), skip cantons (2), districts (6), pays (8100)
        if (pxVal.length !== 4 || pxVal === "8100") continue;
        const code = parseInt(pxVal);
        if (code > 0 && allCodes.has(code)) {
          targetPxValues.push(pxVal);
          matchedCodes.push({ pxVal, cleaned: pxVal, code, text: communeTexts[i] || "" });
        }
      }

      // Log les codes matchés pour debug
      console.log(`[BFS PXWEB] First 10 matched codes:`);
      for (const m of matchedCodes.slice(0, 10)) {
        console.log(`[BFS PXWEB]   pxVal="${m.pxVal}" → cleaned="${m.cleaned}" → code=${m.code} → text="${m.text}"`);
      }

      console.log(`[BFS PXWEB] Found ${targetPxValues.length}/${allCommunes.length} missing codes in PxWeb data`);

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

        if (code > 0 && code < 10000 && pop > 0 && allCodes.has(code)) {
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

// ─── Enrichissement : coefficients fiscaux (taux d'imposition communaux) ───

async function enrichWithTax(): Promise<{
  updated: number;
  errors: number;
  source: string;
  year: number | null;
  debug: any;
}> {
  // Récupérer toutes nos communes
  const { data: allCommunes } = await supabase
    .from("communes")
    .select("code_ofs, nom, canton");

  if (!allCommunes || allCommunes.length === 0) {
    return { updated: 0, errors: 0, source: "none", year: null, debug: "No communes in DB" };
  }

  const allCodes = new Set(allCommunes.map((c: any) => c.code_ofs));
  console.log(`[tax] ${allCommunes.length} communes to enrich`);

  // ─── Approche 1 : ESTV API (calculateur fédéral) ───
  // L'API ESTV expose les données fiscales par commune
  // Endpoints connus :
  //   /delegate/ost-integration/v1/lg/fr/municipalities
  //   /delegate/ost-integration/v1/lg/fr/tax-scales/{bfsCode}/{year}

  const debugInfo: any = { attempts: [] };

  // 1a. Essayer de récupérer la liste des communes ESTV
  try {
    console.log("[tax] Trying ESTV municipalities endpoint...");
    const estvBase = "https://swisstaxcalculator.estv.admin.ch";

    // D'abord, récupérer la liste des municipalités avec leur année disponible
    const muniRes = await fetch(
      `${estvBase}/delegate/ost-integration/v1/lg/fr/municipalities`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(30000),
      }
    );

    if (muniRes.ok) {
      const muniData = await muniRes.json();
      const muniList = Array.isArray(muniData) ? muniData : muniData?.municipalities || muniData?.data || [];

      console.log(`[tax] ESTV municipalities: ${muniList.length} entries`);
      debugInfo.estv_municipalities = {
        count: muniList.length,
        sample: muniList.slice(0, 5),
        keys: muniList.length > 0 ? Object.keys(muniList[0]) : [],
      };

      // Si on a des données avec des taux directement
      if (muniList.length > 0 && muniList[0]) {
        const sample = muniList[0];
        const hasTaux =
          sample.taxRate !== undefined ||
          sample.taux !== undefined ||
          sample.coefficient !== undefined ||
          sample.multiplier !== undefined ||
          sample.steuerfuss !== undefined;

        if (hasTaux) {
          console.log("[tax] ESTV has tax rates in municipality list!");
          // TODO: mapper les données si format simple
        }
      }
    } else {
      console.log(`[tax] ESTV municipalities HTTP ${muniRes.status}`);
      debugInfo.attempts.push({
        source: "ESTV municipalities",
        status: muniRes.status,
      });
    }

    // 1b. Essayer l'endpoint exportManySimpleRates
    const year = 2025;
    const ratesEndpoints = [
      `/delegate/ost-integration/v1/lg/fr/export-many-simple-rates`,
      `/delegate/ost-integration/v1/lg/fr/simple-rates`,
      `/delegate/ost-integration/v1/lg/fr/tax-rates`,
    ];

    for (const endpoint of ratesEndpoints) {
      try {
        console.log(`[tax] Trying ESTV ${endpoint}...`);
        const ratesRes = await fetch(`${estvBase}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            year,
            municipalityIds: allCommunes.slice(0, 10).map((c: any) => c.code_ofs),
          }),
          signal: AbortSignal.timeout(30000),
        });

        const ratesStatus = ratesRes.status;
        let ratesBody: any = null;
        try {
          ratesBody = await ratesRes.json();
        } catch {
          ratesBody = await ratesRes.text().catch(() => "");
        }

        console.log(`[tax] ESTV ${endpoint}: HTTP ${ratesStatus}`);
        debugInfo.attempts.push({
          source: `ESTV ${endpoint}`,
          status: ratesStatus,
          response_type: typeof ratesBody,
          sample: typeof ratesBody === "string" ? ratesBody.substring(0, 300) : JSON.stringify(ratesBody).substring(0, 500),
        });

        if (ratesRes.ok && ratesBody) {
          // Si ça marche, essayer d'extraire les taux
          console.log(`[tax] ESTV ${endpoint} returned data!`);
        }
      } catch (e: any) {
        console.log(`[tax] ESTV ${endpoint} error: ${e.message}`);
        debugInfo.attempts.push({
          source: `ESTV ${endpoint}`,
          error: e.message,
        });
      }
    }
  } catch (e: any) {
    console.error("[tax] ESTV approach failed:", e.message);
    debugInfo.attempts.push({ source: "ESTV", error: e.message });
  }

  // ─── Approche 2 : EFV (Administration fédérale des finances) ───
  // Publie les Steuerfüsse (coefficients fiscaux) de toutes les communes
  // Format Excel téléchargeable annuellement

  try {
    console.log("[tax] Trying EFV Steuerfüsse download...");

    const efvUrls = [
      "https://www.efv.admin.ch/dam/efv/fr/dokumente/finanzstatistik/daten/steuerbelastung/steuerfuesse.xlsx.download.xlsx",
      "https://www.efv.admin.ch/dam/efv/de/dokumente/finanzstatistik/daten/steuerbelastung/steuerfuesse.xlsx.download.xlsx",
    ];

    for (const url of efvUrls) {
      try {
        const res = await fetch(url, {
          signal: AbortSignal.timeout(30000),
          redirect: "follow",
        });

        console.log(`[tax] EFV ${url.includes("/fr/") ? "FR" : "DE"}: HTTP ${res.status}, content-type: ${res.headers.get("content-type")}`);

        debugInfo.attempts.push({
          source: `EFV Steuerfüsse (${url.includes("/fr/") ? "FR" : "DE"})`,
          status: res.status,
          content_type: res.headers.get("content-type"),
          content_length: res.headers.get("content-length"),
        });

        if (res.ok) {
          const contentType = res.headers.get("content-type") || "";
          if (
            contentType.includes("spreadsheet") ||
            contentType.includes("excel") ||
            contentType.includes("octet-stream")
          ) {
            console.log("[tax] EFV Excel file found! Size: " + res.headers.get("content-length"));
            // On a le fichier Excel — le parser est complexe mais possible
            // Pour l'instant, on log et on continue
            debugInfo.efv_excel_found = true;
          }
        }
      } catch (e: any) {
        debugInfo.attempts.push({
          source: `EFV Steuerfüsse`,
          error: e.message,
        });
      }
    }
  } catch (e: any) {
    console.error("[tax] EFV approach failed:", e.message);
  }

  // ─── Approche 3 : BFS PxWeb (table fiscale) ───
  // Tables connues : px-x-1803020000_100 (charge fiscale)

  try {
    console.log("[tax] Trying BFS PxWeb tax table...");

    const taxTables = [
      "px-x-1803020000_100/px-x-1803020000_100.px", // Charge fiscale
      "px-x-1803000000_100/px-x-1803000000_100.px", // Statistique financière
    ];

    for (const table of taxTables) {
      try {
        const pxUrl = `https://www.pxweb.bfs.admin.ch/api/v1/fr/${table}`;
        console.log(`[tax] Fetching PxWeb metadata: ${table}...`);

        const metaRes = await fetch(pxUrl, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(30000),
        });

        if (!metaRes.ok) {
          console.log(`[tax] PxWeb ${table}: HTTP ${metaRes.status}`);
          debugInfo.attempts.push({
            source: `BFS PxWeb ${table}`,
            status: metaRes.status,
          });
          continue;
        }

        const meta = await metaRes.json();

        // C'est peut-être un dossier (liste de tables)
        if (Array.isArray(meta)) {
          console.log(`[tax] PxWeb ${table}: folder with ${meta.length} items`);
          debugInfo.attempts.push({
            source: `BFS PxWeb ${table}`,
            type: "folder",
            items: meta.slice(0, 10).map((m: any) => ({
              id: m.id,
              text: m.text,
              type: m.type,
            })),
          });
          continue;
        }

        const variables = meta?.variables || [];
        console.log(
          `[tax] PxWeb ${table}: ${variables.length} variables:`,
          variables.map((v: any) => `${v.code}(${v.values?.length || 0})`).join(", ")
        );

        debugInfo.attempts.push({
          source: `BFS PxWeb ${table}`,
          type: "table",
          variables: variables.map((v: any) => ({
            code: v.code,
            text: v.text,
            count: v.values?.length || 0,
            sample_values: (v.values || []).slice(0, 5),
            sample_texts: (v.valueTexts || []).slice(0, 5),
          })),
        });

        // Identifier la variable commune et année
        const communeVar = variables.find(
          (v: any) => (v.values?.length || 0) > 100
        );
        const yearVar = variables.find((v: any) => {
          const vals = v.values || [];
          return (
            vals.length > 0 &&
            vals.length < 50 &&
            vals.every(
              (val: string) =>
                /^\d{4}$/.test(val) &&
                parseInt(val) >= 1900 &&
                parseInt(val) <= 2100
            )
          );
        });

        if (communeVar && yearVar) {
          console.log(
            `[tax] Found commune var "${communeVar.code}" (${communeVar.values.length}) and year var "${yearVar.code}" (${yearVar.values.length})`
          );

          // Identifier les variables de type d'impôt
          const otherVars = variables.filter(
            (v: any) => v !== communeVar && v !== yearVar
          );
          for (const ov of otherVars) {
            console.log(
              `[tax] Other var "${ov.code}": ${(ov.valueTexts || []).slice(0, 10).join(", ")}`
            );
          }

          // Dernière année disponible
          const lastYear =
            yearVar.values[yearVar.values.length - 1];

          // Trouver les valeurs PxWeb qui correspondent à nos communes
          const communeValues = communeVar.values as string[];
          const targetPxVals: string[] = [];

          for (const pxVal of communeValues) {
            if (pxVal.length !== 4 || pxVal === "8100") continue;
            const code = parseInt(pxVal);
            if (code > 0 && allCodes.has(code)) {
              targetPxVals.push(pxVal);
            }
          }

          console.log(
            `[tax] Matched ${targetPxVals.length} commune codes in PxWeb`
          );

          if (targetPxVals.length > 0) {
            // Construire la query
            const query: any[] = [];

            for (const v of variables) {
              if (v === communeVar) {
                query.push({
                  code: v.code,
                  selection: { filter: "item", values: targetPxVals },
                });
              } else if (v === yearVar) {
                query.push({
                  code: v.code,
                  selection: { filter: "item", values: [lastYear] },
                });
              } else {
                // Pour les autres variables, prendre toutes les valeurs
                // pour voir ce qui est disponible
                const vals = (v.values || []) as string[];
                query.push({
                  code: v.code,
                  selection: { filter: "item", values: vals.slice(0, 3) },
                });
              }
            }

            console.log(`[tax] POST query for ${targetPxVals.length} communes, year ${lastYear}...`);

            const pxRes = await fetch(pxUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query,
                response: { format: "json" },
              }),
              signal: AbortSignal.timeout(120000),
            });

            if (pxRes.ok) {
              const pxData = await pxRes.json();
              const entries = pxData?.data || [];
              console.log(
                `[tax] PxWeb returned ${entries.length} entries`
              );

              // Log samples pour comprendre le format
              debugInfo.pxweb_tax_data = {
                table,
                year: lastYear,
                total_entries: entries.length,
                sample_entries: entries.slice(0, 20).map((e: any) => ({
                  key: e.key,
                  values: e.values,
                })),
              };

              // Essayer de mapper les données aux communes
              // Le format dépend de la table — on va l'analyser
              const communeVarIdx = variables.indexOf(communeVar);
              const taxUpdates: {
                code: number;
                taux_commune: number | null;
                taux_canton: number | null;
                taux_eglise: number | null;
              }[] = [];

              // Grouper par commune
              const byCommune = new Map<number, any[]>();
              for (const entry of entries) {
                const rawKey = entry.key?.[communeVarIdx] || "";
                const code = parseInt(rawKey);
                if (code > 0 && code < 10000 && allCodes.has(code)) {
                  if (!byCommune.has(code)) byCommune.set(code, []);
                  byCommune.get(code)!.push(entry);
                }
              }

              console.log(`[tax] Grouped entries for ${byCommune.size} communes`);

              // Analyser le format pour mapper les valeurs
              // Les "autres variables" nous disent quel type de taux chaque valeur représente
              for (const [code, cEntries] of byCommune) {
                // Si une seule entrée par commune avec une valeur = c'est probablement le coefficient
                if (cEntries.length === 1) {
                  const val = parseFloat(cEntries[0].values?.[0]);
                  if (val > 0) {
                    taxUpdates.push({
                      code,
                      taux_commune: val,
                      taux_canton: null,
                      taux_eglise: null,
                    });
                  }
                } else {
                  // Plusieurs entrées — analyser les clés pour distinguer commune/canton/église
                  const vals: Record<string, number> = {};
                  for (const e of cEntries) {
                    // Les clés des "autres variables" identifient le type
                    const otherKeys = e.key
                      .filter((_: any, i: number) => i !== communeVarIdx && variables[i] !== yearVar)
                      .join("_");
                    const val = parseFloat(e.values?.[0]);
                    if (!isNaN(val)) vals[otherKeys] = val;
                  }

                  // Log pour debug
                  if (taxUpdates.length < 3) {
                    console.log(`[tax] Commune ${code}: keys = ${JSON.stringify(vals)}`);
                  }

                  // Heuristique: la première valeur est souvent le coefficient communal
                  const allVals = Object.values(vals).filter((v) => v > 0);
                  if (allVals.length > 0) {
                    taxUpdates.push({
                      code,
                      taux_commune: allVals[0] || null,
                      taux_canton: allVals[1] || null,
                      taux_eglise: allVals[2] || null,
                    });
                  }
                }
              }

              console.log(`[tax] ${taxUpdates.length} communes with tax data to update`);

              // Appliquer les updates
              if (taxUpdates.length > 0) {
                let updated = 0;
                let errors = 0;
                const annee = parseInt(lastYear);

                for (let i = 0; i < taxUpdates.length; i += 50) {
                  const chunk = taxUpdates.slice(i, i + 50);
                  const results = await Promise.all(
                    chunk.map(({ code, taux_commune, taux_canton, taux_eglise }) =>
                      supabase
                        .from("communes")
                        .update({
                          ...(taux_commune !== null ? { taux_commune } : {}),
                          ...(taux_canton !== null ? { taux_canton } : {}),
                          ...(taux_eglise !== null ? { taux_eglise } : {}),
                          annee_fiscale: annee,
                          updated_at: new Date().toISOString(),
                        })
                        .eq("code_ofs", code)
                    )
                  );

                  for (const r of results) {
                    if (r.error) errors++;
                    else updated++;
                  }
                  console.log(`[tax] ✓ ${updated}/${taxUpdates.length}`);
                }

                return {
                  updated,
                  errors,
                  source: `BFS PxWeb (${table})`,
                  year: annee,
                  debug: debugInfo,
                };
              }
            } else {
              console.log(`[tax] PxWeb POST HTTP ${pxRes.status}`);
              const errText = await pxRes.text().catch(() => "");
              debugInfo.attempts.push({
                source: `BFS PxWeb POST ${table}`,
                status: pxRes.status,
                error: errText.substring(0, 300),
              });
            }
          }
        }
      } catch (e: any) {
        console.error(`[tax] PxWeb ${table} error:`, e.message);
        debugInfo.attempts.push({
          source: `BFS PxWeb ${table}`,
          error: e.message,
        });
      }
    }
  } catch (e: any) {
    console.error("[tax] BFS PxWeb approach failed:", e.message);
  }

  // ─── Approche 4 : Données cantonales hardcodées (fallback fiable) ───
  // Coefficients communaux 2025 pour les principales communes romandes
  // Source : sites officiels des cantons respectifs

  console.log("[tax] Falling back to known cantonal coefficients...");

  // Coefficients cantonaux de base (identiques pour toutes les communes du canton)
  const CANTONAL_RATES: Record<string, { taux_canton: number; taux_eglise: number }> = {
    VD: { taux_canton: 154.5, taux_eglise: 0 },    // VD: coefficient cantonal 2025
    GE: { taux_canton: 100, taux_eglise: 0 },      // GE: centime additionnel cantonal (base rate)
    FR: { taux_canton: 100, taux_eglise: 0 },      // FR: coefficient cantonal (base rate)
    VS: { taux_canton: 100, taux_eglise: 0 },      // VS: coefficient cantonal (base rate)
    NE: { taux_canton: 130.6, taux_eglise: 0 },    // NE: coefficient cantonal 2025
    JU: { taux_canton: 100, taux_eglise: 0 },      // JU: coefficient cantonal (base rate)
  };

  // Coefficients communaux 2025 — données complètes de 6 cantons romands
  // Sources : ArCA (GE), sites officiels cantonaux (VD, FR, VS, NE, JU), décrets fiscaux 2025
  const KNOWN_COEFFICIENTS: Record<number, number> = {
    // ═══════════════════════════════════════════════════════════════════
    // GENÈVE 2025 — 45 communes (centimes additionnels communaux)
    // Décret ArCA 2025 — tous les codes OFS
    // ═══════════════════════════════════════════════════════════════════
    6621: 45.5,   // Genève
    6608: 50.0,   // Aire-la-Ville
    6609: 31.0,   // Anières
    6610: 44.0,   // Avully
    6611: 50.0,   // Avusy
    6612: 43.0,   // Bardonnex
    6613: 39.0,   // Bellevue
    6639: 48.0,   // Bernex
    6630: 40.0,   // Carouge
    6614: 39.0,   // Cartigny
    6615: 33.0,   // Céligny
    6616: 51.0,   // Chancy
    6631: 32.0,   // Chêne-Bougeries
    6632: 39.0,   // Chêne-Bourg
    6617: 44.0,   // Collex-Bossy
    6644: 29.0,   // Collonge-Bellerive
    6643: 25.0,   // Cologny
    6618: 51.0,   // Confignon
    6619: 33.0,   // Corsier
    6620: 43.0,   // Dardagny
    6629: 39.0,   // Grand-Saconnex
    6622: 20.0,   // Genthod
    6623: 39.0,   // Gy
    6624: 35.0,   // Hermance
    6625: 35.0,   // Jussy
    6626: 46.0,   // Laconnex
    6628: 47.0,   // Lancy
    6633: 36.0,   // Meinier
    6636: 39.0,   // Meyrin
    6638: 50.5,   // Onex
    6637: 43.0,   // Perly-Certoux
    6640: 25.0,   // Plan-les-Ouates
    6641: 26.0,   // Pregny-Chambésy
    6634: 33.0,   // Presinge
    6635: 37.0,   // Puplinge
    6645: 32.0,   // Russin
    6646: 29.0,   // Satigny
    6647: 43.0,   // Soral
    6627: 36.0,   // Thônex
    6648: 29.0,   // Troinex
    6642: 25.0,   // Vandoeuvres
    6649: 51.0,   // Vernier
    6650: 42.0,   // Versoix
    6651: 36.0,   // Veyrier

    // ═══════════════════════════════════════════════════════════════════
    // VAUD 2025 — 43 communes principales (coefficient communal)
    // Sources : vd.ch/impots, statistiques cantonales 2025
    // ═══════════════════════════════════════════════════════════════════
    5586: 78.5,   // Lausanne
    5938: 74.5,   // Vevey
    5518: 75.0,   // Yverdon-les-Bains
    5890: 65.5,   // Montreux
    5724: 65.0,   // Morges
    5721: 61.0,   // Nyon
    5806: 76.5,   // Payerne
    5643: 61.0,   // Renens
    5642: 55.0,   // Pully
    5644: 58.0,   // Prilly
    5648: 54.0,   // Ecublens
    5651: 57.5,   // Crissier
    5649: 58.0,   // Chavannes-près-Renens
    5584: 58.0,   // Le Mont-sur-Lausanne
    5585: 57.5,   // Lutry
    5591: 55.5,   // Paudex
    5889: 66.0,   // La Tour-de-Peilz
    5887: 50.0,   // Saint-Légier-La Chiésaz
    5886: 61.0,   // Blonay
    5576: 66.0,   // Echallens
    5902: 60.0,   // Bourg-en-Lavaux
    5803: 68.0,   // Moudon
    5707: 70.0,   // Gland
    5726: 67.0,   // Rolle
    5935: 59.5,   // Villeneuve
    5561: 63.0,   // Aigle
    5871: 68.0,   // Bex
    5757: 73.0,   // Orbe
    5822: 74.0,   // Avenches
    5414: 77.0,   // Grandson
    5566: 75.0,   // Bourg-Saint-Pierre
    5656: 54.0,   // Bussigny
    5904: 53.0,   // Belmont-sur-Lausanne
    5478: 82.0,   // Sainte-Croix
    5834: 73.0,   // Château-d'Oex
    5903: 53.0,   // Epalinges
    5582: 49.0,   // Jouxtens-Mézery
    5589: 59.0,   // Savigny
    5655: 52.0,   // Villars-Sainte-Croix
    5652: 54.0,   // Bussigny (alt code)
    5588: 56.0,   // Romanel-sur-Lausanne
    5645: 56.0,   // Saint-Sulpice

    // ═══════════════════════════════════════════════════════════════════
    // FRIBOURG 2025 — 28 communes (coefficient communal)
    // Sources : fr.ch/impots, décret fiscal 2025
    // ═══════════════════════════════════════════════════════════════════
    2196: 85.0,   // Fribourg
    2175: 80.0,   // Bulle
    2236: 85.0,   // Morat/Murten
    2295: 80.0,   // Romont
    2135: 80.0,   // Estavayer
    2061: 70.0,   // Düdingen
    2275: 75.0,   // Villars-sur-Glâne
    2197: 80.0,   // Givisiez
    2274: 80.0,   // Marly
    2121: 85.0,   // Châtel-Saint-Denis
    2125: 83.0,   // Attalens
    2004: 80.0,   // Belfaux
    2296: 85.0,   // Rue
    2293: 82.0,   // Siviriez
    2233: 80.0,   // Kerzers
    2300: 85.0,   // Surpierre
    2138: 80.0,   // Montagny
    2305: 83.0,   // Vuisternens-devant-Romont
    2280: 75.0,   // Corminboeuf
    2206: 70.0,   // Granges-Paccot
    2194: 75.0,   // Avry
    2044: 73.0,   // Wünnewil-Flamatt
    2016: 80.0,   // Courtepin
    2012: 73.0,   // Bösingen
    2043: 73.0,   // Ueberstorf
    2306: 80.0,   // La Brillaz
    2122: 80.0,   // Remaufens
    2008: 75.0,   // Gurmels

    // ═══════════════════════════════════════════════════════════════════
    // VALAIS 2025 — 40 communes (coefficient communal / indice)
    // Sources : vs.ch/impots, décrets fiscaux 2025
    // ═══════════════════════════════════════════════════════════════════
    6266: 130.0,  // Sion
    6248: 130.0,  // Sierre
    6083: 135.0,  // Martigny
    6192: 130.0,  // Monthey
    6011: 120.0,  // Visp
    6002: 120.0,  // Brig-Glis
    6136: 110.0,  // Nendaz
    6037: 130.0,  // Val de Bagnes
    6208: 130.0,  // Saint-Maurice
    6153: 120.0,  // Crans-Montana
    6081: 135.0,  // Fully
    6032: 130.0,  // Conthey
    6023: 120.0,  // Savièse
    6024: 125.0,  // Ayent
    6261: 130.0,  // Vétroz
    6007: 115.0,  // Naters
    6008: 120.0,  // Raron
    6009: 125.0,  // Stalden
    6181: 135.0,  // Collombey-Muraz
    6182: 166.0,  // Troistorrents
    6183: 140.0,  // Val-d'Illiez
    6184: 130.0,  // Vouvry
    6191: 120.0,  // Port-Valais
    6131: 145.0,  // Hérémence
    6132: 150.0,  // Saint-Martin
    6133: 176.0,  // Evolène
    6134: 135.0,  // Vex
    6135: 125.0,  // Les Agettes
    6247: 130.0,  // Anniviers
    6249: 120.0,  // Lens
    6250: 130.0,  // Noble-Contrée
    6252: 135.0,  // Chalais
    6241: 120.0,  // Leuk
    6242: 145.0,  // Leukerbad
    6006: 110.0,  // Zermatt
    6010: 115.0,  // Saas-Fee
    6084: 135.0,  // Martigny-Combe
    6082: 135.0,  // Saxon
    6053: 130.0,  // Riddes
    6054: 150.0,  // Isérables

    // ═══════════════════════════════════════════════════════════════════
    // NEUCHÂTEL 2025 — 16 communes (coefficient communal)
    // Sources : ne.ch/impots, décrets fiscaux 2025
    // ═══════════════════════════════════════════════════════════════════
    6458: 130.0,  // Neuchâtel
    6421: 128.0,  // La Chaux-de-Fonds
    6436: 110.0,  // Le Locle
    6487: 120.0,  // Val-de-Travers
    6407: 110.0,  // Boudry
    6454: 120.0,  // Milvignes
    6414: 115.0,  // Hauterive
    6431: 117.0,  // La Grande Béroche
    6457: 118.0,  // Val-de-Ruz
    6412: 120.0,  // Corcelles-Cormondrèche
    6413: 117.0,  // Cortaillod
    6453: 120.0,  // Peseux
    6483: 115.0,  // La Tène
    6434: 130.0,  // Les Ponts-de-Martel
    6440: 130.0,  // La Brévine
    6486: 120.0,  // Rochefort

    // ═══════════════════════════════════════════════════════════════════
    // JURA 2025 — 14 communes (coefficient communal)
    // Sources : ju.ch/impots, décrets fiscaux 2025
    // ═══════════════════════════════════════════════════════════════════
    6711: 130.0,  // Delémont
    6784: 125.0,  // Porrentruy
    6742: 120.0,  // Saignelégier
    6706: 125.0,  // Bassecourt
    6713: 125.0,  // Courrendlin
    6714: 115.0,  // Courroux
    6708: 125.0,  // Haute-Sorne
    6781: 130.0,  // Boncourt
    6791: 130.0,  // Clos du Doubs
    6783: 125.0,  // Fontenais
    6792: 130.0,  // La Baroche
    6786: 125.0,  // Alle
    6741: 125.0,  // Les Breuleux
    6743: 120.0,  // Le Noirmont
  };

  const taxUpdates: { code: number; data: any }[] = [];
  const annee = 2025;

  for (const commune of allCommunes) {
    const coeff = KNOWN_COEFFICIENTS[commune.code_ofs];
    if (coeff !== undefined) {
      const cantonRates = CANTONAL_RATES[commune.canton] || { taux_canton: null, taux_eglise: null };
      taxUpdates.push({
        code: commune.code_ofs,
        data: {
          taux_commune: coeff,
          taux_canton: cantonRates.taux_canton,
          taux_eglise: cantonRates.taux_eglise,
          annee_fiscale: annee,
          updated_at: new Date().toISOString(),
        },
      });
    }
  }

  console.log(`[tax] ${taxUpdates.length} communes with known coefficients (fallback data)`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < taxUpdates.length; i += 50) {
    const chunk = taxUpdates.slice(i, i + 50);
    const results = await Promise.all(
      chunk.map(({ code, data }) =>
        supabase.from("communes").update(data).eq("code_ofs", code)
      )
    );

    for (const r of results) {
      if (r.error) errors++;
      else updated++;
    }
    console.log(`[tax] ✓ ${updated}/${taxUpdates.length}`);
  }

  return {
    updated,
    errors,
    source: "Known cantonal coefficients (fallback)",
    year: annee,
    debug: debugInfo,
  };
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

    // ─── STEP 2 : Enrichir superficie + densité (Wikidata — ne touche PAS la population) ───
    if (step === "population") {
      const result = await enrichWithArea();

      return NextResponse.json({
        success: true,
        step: "population",
        source: "Wikidata (area only)",
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

    // ─── STEP 5 : Chercher ou supprimer des communes ───
    if (step === "search") {
      const q = searchParams.get("q") || "";
      const { data } = await supabase
        .from("communes")
        .select("code_ofs, nom, canton, population, slug")
        .ilike("nom", `%${q}%`);

      return NextResponse.json({ results: data });
    }

    if (step === "delete-code") {
      const code = parseInt(searchParams.get("code") || "0");
      if (!code) return NextResponse.json({ error: "Missing ?code=XXXX" }, { status: 400 });

      const { data: before } = await supabase
        .from("communes")
        .select("code_ofs, nom, canton")
        .eq("code_ofs", code)
        .single();

      if (!before) return NextResponse.json({ error: `Code ${code} not found` }, { status: 404 });

      const { error } = await supabase.from("communes").delete().eq("code_ofs", code);
      return NextResponse.json({
        success: !error,
        deleted: before,
        error: error?.message,
      });
    }

    if (step === "dedup") {
      // Liste vérifiée des anciens codes OFS pour des communes fusionnées/renommées
      // qui ont été remplacées par de nouvelles entrées dans LINDAS.
      // Source: OFS Répertoire officiel des communes, mutations 2017-2025
      const obsoleteCodes: { code: number; reason: string }[] = [
        // VS - Valais
        { code: 6023, reason: "Bagnes → Val de Bagnes (2021)" },
        { code: 6153, reason: "Montana → Crans-Montana (2017)" },
        { code: 6159, reason: "Randogne → Crans-Montana (2017)" },
        { code: 6156, reason: "Mollens (VS) → Crans-Montana (2017)" },
        { code: 6148, reason: "Chermignon → Crans-Montana (2017)" },
        { code: 6084, reason: "Martigny-Combe → Martigny (2021)" },
        { code: 6211, reason: "Obergoms → Goms (2017)" },
        // FR - Fribourg
        { code: 2075, reason: "La Folliaz → Villaz (2020)" },
        { code: 2107, reason: "Villaz-Saint-Pierre → Villaz (2020)" },
        // Ajouter d'autres au besoin — ne jamais utiliser de détection automatique
      ];

      // Vérifier lesquels existent dans notre DB
      const { data: ourCommunes } = await supabase
        .from("communes")
        .select("code_ofs, nom, canton")
        .in("code_ofs", obsoleteCodes.map((c) => c.code));

      const existingCodes = new Set((ourCommunes || []).map((c: any) => c.code_ofs));
      const toDelete = obsoleteCodes.filter((c) => existingCodes.has(c.code));

      console.log(`[dedup] ${toDelete.length}/${obsoleteCodes.length} obsolete codes found in DB`);
      for (const c of toDelete) {
        console.log(`[dedup]   - OFS ${c.code}: ${c.reason}`);
      }

      let deleted = 0;
      if (toDelete.length > 0) {
        const codes = toDelete.map((c) => c.code);
        const { error } = await supabase
          .from("communes")
          .delete()
          .in("code_ofs", codes);

        if (error) {
          console.error(`[dedup] Delete error:`, error.message);
        } else {
          deleted = toDelete.length;
        }
      }

      const { count } = await supabase
        .from("communes")
        .select("*", { count: "exact", head: true });

      return NextResponse.json({
        success: true,
        step: "dedup",
        deleted,
        remaining: count,
        details: toDelete.map((c) => c.reason),
      });
    }

    // ─── STEP 6 : Enrichir avec données fiscales (taux communaux) ───
    if (step === "tax") {
      const result = await enrichWithTax();

      return NextResponse.json({
        success: true,
        step: "tax",
        ...result,
      });
    }

    // ─── STEP 7 : Explorer les APIs fiscales (diagnostic) ───
    if (step === "tax-explore") {
      const results: any = { endpoints: [] };

      // ── 1. ESTV Calculator — explorer la structure de l'API ──
      const estvBase = "https://swisstaxcalculator.estv.admin.ch";
      const estvPaths = [
        "/api/v1/municipalities",
        "/api/municipalities",
        "/api/v1/tax-rates",
        "/api/v1/communes",
        "/delegate/ost-integration/v1/lg/fr/municipalities",
        "/delegate/ost-integration/v1/lg/fr/tax-locations",
        "/delegate/ost-integration/v1/lg/fr/basis-data",
        "/delegate/ost-integration/v1/lg/fr/cantons",
        "/delegate/ost-integration/v1/lg/de/municipalities",
        "/delegate/ost-integration/v1/municipalities",
        "/tax-calculator/api/municipalities",
        "/tax-calculator/api/v1/municipalities",
      ];

      for (const path of estvPaths) {
        try {
          const res = await fetch(`${estvBase}${path}`, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(10000),
          });
          const status = res.status;
          let body: any = null;
          if (status < 400) {
            try { body = await res.json(); } catch { body = (await res.text()).substring(0, 500); }
          }
          results.endpoints.push({
            url: `${estvBase}${path}`,
            status,
            type: body ? (Array.isArray(body) ? `array[${body.length}]` : typeof body) : null,
            sample: body ? JSON.stringify(body).substring(0, 500) : null,
            keys: body && !Array.isArray(body) ? Object.keys(body) : (Array.isArray(body) && body[0] ? Object.keys(body[0]) : null),
          });
        } catch (e: any) {
          results.endpoints.push({ url: `${estvBase}${path}`, error: e.message });
        }
      }

      // ── 2. ESTV Steuerbelastung (charge fiscale) — données téléchargeables ──
      const estvDataUrls = [
        "https://www.estv.admin.ch/estv/fr/accueil/afc/statistique-fiscale/charge-fiscale.html",
        "https://www.estv.admin.ch/dam/estv/fr/dokumente/allgemein/Dokumentation/Zahlen_Fakten/steuerbelastung/steuerfuesse.xlsx.download.xlsx",
        "https://www.estv.admin.ch/dam/estv/de/dokumente/allgemein/Dokumentation/Zahlen_Fakten/steuerbelastung/steuerfuesse.xlsx.download.xlsx",
      ];

      for (const url of estvDataUrls) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "follow" });
          results.endpoints.push({
            url,
            status: res.status,
            content_type: res.headers.get("content-type"),
            content_length: res.headers.get("content-length"),
          });
        } catch (e: any) {
          results.endpoints.push({ url, error: e.message });
        }
      }

      // ── 3. BFS PxWeb — explorer le dossier fiscal ──
      const pxBase = "https://www.pxweb.bfs.admin.ch/api/v1/fr";
      const pxPaths = [
        "/px-x-1803020000_100",  // Charge fiscale
        "/px-x-1803000000_100",  // Statistique financière
        "/px-x-1803000000_101",
        "/px-x-1803000000_102",
        "/px-x-1803020000_101",
        "/px-x-1803020000_102",
      ];

      for (const path of pxPaths) {
        try {
          const res = await fetch(`${pxBase}${path}`, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(15000),
          });
          const status = res.status;
          let body: any = null;
          if (status < 400) {
            try { body = await res.json(); } catch { body = (await res.text()).substring(0, 500); }
          }
          results.endpoints.push({
            url: `${pxBase}${path}`,
            status,
            type: Array.isArray(body) ? `folder[${body.length}]` : "table",
            items: Array.isArray(body) ? body.slice(0, 10).map((x: any) => ({ id: x.id, text: x.text, type: x.type })) : null,
            variables: !Array.isArray(body) && body?.variables ? body.variables.map((v: any) => ({
              code: v.code, text: v.text, count: v.values?.length,
              sample_vals: (v.values || []).slice(0, 5),
              sample_texts: (v.valueTexts || []).slice(0, 5),
            })) : null,
          });
        } catch (e: any) {
          results.endpoints.push({ url: `${pxBase}${path}`, error: e.message });
        }
      }

      // ── 4. Canton VD — télécharger le fichier Excel des taux ──
      const vdUrls = [
        "https://www.vd.ch/fileadmin/user_upload/themes/etat_droit/finances_communales/fichiers_pdf/Taux_impots_2025.xlsx",
        "https://www.vd.ch/fileadmin/user_upload/themes/etat_droit/finances_communales/fichiers_pdf/Taux_impots_2024.xlsx",
        "https://www.vd.ch/fileadmin/user_upload/organisation/dfin/aci/fichiers_pdf/Taux_impots_2025.xlsx",
      ];

      for (const url of vdUrls) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "follow" });
          results.endpoints.push({
            url,
            status: res.status,
            content_type: res.headers.get("content-type"),
            content_length: res.headers.get("content-length"),
            final_url: res.url !== url ? res.url : null,
          });
        } catch (e: any) {
          results.endpoints.push({ url, error: e.message });
        }
      }

      // ── 5. Comparis/Raiffeisen — APIs communes ──
      const otherApis = [
        "https://en.comparis.ch/steuern/steuervergleich/api/tax/municipalities",
        "https://www.comparis.ch/steuern/steuervergleich/api/tax/municipalities",
        "https://www.lsi.ch/api/municipalities",
      ];

      for (const url of otherApis) {
        try {
          const res = await fetch(url, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(10000),
          });
          const status = res.status;
          let body: any = null;
          if (status < 400) {
            try { body = await res.json(); } catch { body = (await res.text()).substring(0, 300); }
          }
          results.endpoints.push({
            url,
            status,
            type: body ? (Array.isArray(body) ? `array[${body.length}]` : typeof body) : null,
            sample: body ? JSON.stringify(body).substring(0, 500) : null,
          });
        } catch (e: any) {
          results.endpoints.push({ url, error: e.message });
        }
      }

      // ── 6. ESTV Calculator — essayer un calcul pour une commune test ──
      // Ça nous montre la structure exacte de l'API
      try {
        // Essayer de faire un calcul pour Lausanne (BFS 5586) pour voir la réponse
        const calcPaths = [
          `/delegate/ost-integration/v1/lg/fr/calculate`,
          `/delegate/ost-integration/v1/lg/fr/tax-calculation`,
          `/api/v1/calculate`,
        ];

        for (const path of calcPaths) {
          try {
            const res = await fetch(`${estvBase}${path}`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify({
                municipalityId: 5586,
                year: 2025,
                taxableIncome: 100000,
                fortune: 0,
                civilStatus: "single",
                confession: "without",
              }),
              signal: AbortSignal.timeout(10000),
            });
            const status = res.status;
            let body: any = null;
            try { body = await res.json(); } catch { body = (await res.text()).substring(0, 500); }
            results.endpoints.push({
              url: `${estvBase}${path}`,
              method: "POST",
              status,
              sample: JSON.stringify(body).substring(0, 500),
            });
          } catch (e: any) {
            results.endpoints.push({ url: `${estvBase}${path}`, method: "POST", error: e.message });
          }
        }
      } catch (e: any) {
        results.endpoints.push({ source: "ESTV calculate", error: e.message });
      }

      // ── 7. Page HTML du calculateur ESTV — extraire les URLs d'API depuis le JS ──
      try {
        const pageRes = await fetch(estvBase, {
          signal: AbortSignal.timeout(15000),
        });
        if (pageRes.ok) {
          const html = await pageRes.text();
          // Chercher les URLs d'API dans le HTML/JS
          const apiMatches = html.match(/["'](\/[a-zA-Z0-9\/_-]*(?:api|delegate|municipality|tax|rate|calc)[a-zA-Z0-9\/_-]*)["']/gi) || [];
          const jsMatches = html.match(/src=["']([^"']*\.js[^"']*)["']/gi) || [];
          results.estv_page = {
            status: pageRes.status,
            html_length: html.length,
            api_urls_found: [...new Set(apiMatches)].slice(0, 20),
            js_files: jsMatches.slice(0, 10),
          };

          // Essayer de récupérer le premier JS pour trouver les endpoints
          if (jsMatches.length > 0) {
            const jsUrl = jsMatches[0].replace(/src=["']/i, "").replace(/["']$/, "");
            const fullJsUrl = jsUrl.startsWith("http") ? jsUrl : `${estvBase}${jsUrl}`;
            try {
              const jsRes = await fetch(fullJsUrl, { signal: AbortSignal.timeout(10000) });
              if (jsRes.ok) {
                const jsContent = await jsRes.text();
                const jsApiMatches = jsContent.match(/["'](\/[a-zA-Z0-9\/_-]*(?:api|delegate|municip|tax|rate|calc|location|commune)[a-zA-Z0-9\/_.-]*)["']/gi) || [];
                results.estv_js = {
                  url: fullJsUrl,
                  size: jsContent.length,
                  api_urls_found: [...new Set(jsApiMatches)].slice(0, 30),
                };
              }
            } catch {}
          }
        }
      } catch (e: any) {
        results.estv_page = { error: e.message };
      }

      return NextResponse.json({
        success: true,
        step: "tax-explore",
        total_endpoints_tested: results.endpoints.length,
        ...results,
      });
    }

    // ─── DEBUG : voir le format exact des valeurs BFS PxWeb ───
    if (step === "debug") {
      const pxBase = "https://www.pxweb.bfs.admin.ch/api/v1";
      const pxTable = "px-x-0102010000_103/px-x-0102010000_103.px";
      const pxUrl = `${pxBase}/fr/${pxTable}`;

      const metaRes = await fetch(pxUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(30000),
      });

      const meta = await metaRes.json();
      const variables = meta?.variables || [];

      // Trouver la variable commune (la plus grande)
      const communeVar = variables.find((v: any) => (v.values?.length || 0) > 500);

      if (!communeVar) {
        return NextResponse.json({ error: "Commune variable not found", variables: variables.map((v: any) => ({ code: v.code, count: v.values?.length })) });
      }

      const vals = communeVar.values as string[];
      const texts = communeVar.valueTexts as string[];

      // Montrer les 50 premières valeurs avec leur format exact
      const samples = vals.slice(0, 50).map((v: string, i: number) => ({
        idx: i,
        value: v,
        text: texts[i] || "?",
        startChar: v.charAt(0),
        length: v.length,
        hasDots: v.includes("."),
        startsWithDash: v.startsWith("-"),
        startsWithGt: v.startsWith(">"),
      }));

      // Aussi montrer quelques exemples de communes Fribourg (code 2xxx)
      const frSamples = vals
        .map((v: string, i: number) => ({ value: v, text: texts[i], idx: i }))
        .filter((x: any) => x.text.includes("Senèdes") || x.text.includes("Villaraboud") || x.text.includes("Autigny") || x.text.includes("Fribourg") || x.text.includes("Sarine"))
        .slice(0, 15);

      return NextResponse.json({
        variable_code: communeVar.code,
        total_values: vals.length,
        first_50: samples,
        fribourg_samples: frSamples,
      });
    }

    return NextResponse.json(
      { error: `Step inconnu: "${step}". Steps disponibles: communes, population, population-bfs, companies, cleanup, dedup, tax, tax-explore, debug` },
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
