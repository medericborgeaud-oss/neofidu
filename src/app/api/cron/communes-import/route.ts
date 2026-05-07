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

// Helper: normaliser un nom de commune pour le matching
function normalizeName(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

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

  console.log(`[tax] ${allCommunes.length} communes to enrich`);
  const debugInfo: any = { matched_vd: 0, matched_other: 0, unmatched: [] };

  // ═══════════════════════════════════════════════════════════════════
  // VD 2026 — 301 communes (Arrêtés d'imposition 2026, source officielle)
  // Clé = nom normalisé, valeur = pour-cent total (coeff communal + impôt spécial affecté)
  // ═══════════════════════════════════════════════════════════════════
  const VD_2026: Record<string, number> = {
    "aclens":60,"agiez":76,"aigle":66,"allaman":65,"arnex-sur-nyon":66,"arnex-sur-orbe":71,
    "arzier-le muids":64,"assens":70,"aubonne":68,"avenches":65,"ballaigues":65,"ballens":73,
    "bassins":72.5,"baulmes":76.5,"bavois":72,"begnins":62.5,"belmont-sur-lausanne":72,
    "belmont-sur-yverdon":70,"bercher":79,"berolle":75.5,"bettens":70,"bex":71,"biere":69,
    "bioley-magnoux":72,"blonay - saint-legier":67.5,"bofflens":69,"bogis-bossey":70,
    "bonvillars":67,"borex":57,"bottens":72.5,"bougy-villars":62,"boulens":71.5,
    "bourg-en-lavaux":62.5,"bournens":65,"boussens":64,"bremblens":68,"bretigny-sur-morrens":76,
    "bretonnieres":69,"buchillon":52,"bullet":75,"bursinel":62,"bursins":71,"burtigny":75,
    "bussigny":62.5,"bussy-sur-moudon":78.5,"chamblon":66,"champagne":65,"champtauroz":77,
    "champvent":70,"chardonne":68,"chateau-doex":81.5,"chavannes-de-bogis":58,
    "chavannes-des-bois":66,"chavannes-le-chene":75,"chavannes-le-veyron":77,
    "chavannes-pres-renens":77.5,"chavannes-sur-moudon":70,"chavornay":70.5,"chene-paquier":75,
    "cheseaux-noreaz":67,"cheseaux-sur-lausanne":73,"cheserex":59,"chessel":65,"chevilly":70,
    "chevroux":68.5,"chexbres":67.5,"chigny":62,"clarmont":72,"coinsins":49,"commugny":58,
    "concise":68,"coppet":57,"corbeyrier":74,"corcelles-le-jorat":75,"corcelles-pres-concise":69,
    "corcelles-pres-payerne":65,"corseaux":67.5,"corsier-sur-vevey":64.5,"cossonay":66,
    "crans":59,"crassier":65,"crissier":63.5,"cronay":75,"croy":74,"cuarnens":76,"cuarny":73,
    "cudrefin":59,"cugy":76,"curtilles":71,"daillens":66,"demoret":78,"denens":63,"denges":62,
    "dizy":75,"dompierre":78,"donneloye":73,"duillier":66,"dully":53,"echallens":72.5,
    "echandens":60.5,"echichens":66,"eclepens":46,"ecublens":62.5,"epalinges":64.5,
    "ependes":73.5,"essertines-sur-rolle":66.5,"essertines-sur-yverdon":72,"etagnieres":73,
    "etoy":60,"eysins":59.5,"faoug":65,"fechy":64,"ferreyres":76,"fey":75,"fiez":69,
    "fontaines-sur-grandson":72,"forel lavaux":69,"founex":57,"froideville":72,"genolier":52,
    "giez":69,"gilly":62.5,"gimel":73,"gingins":60,"givrins":68.5,"gland":61,"gollion":74,
    "goumoens":75.5,"grancy":70,"grandcour":72,"grandevent":71,"grandson":69,"grens":60,
    "gryon":73.5,"hautemorges":68,"henniez":69,"hermenches":78,"jongny":69.5,
    "jorat-menthue":70.5,"jorat-mezieres":71,"jouxtens-mezery":59,"juriens":79,
    "la chaux cossonay":76,"la praz":83,"la rippe":63.5,"la sarraz":70,"la tour-de-peilz":64,
    "labbaye":76,"labergement":80,"lausanne":78.5,"lavey-morcles":71.5,"lavigny":73,
    "le chenit":58.5,"le lieu":70,"le mont-sur-lausanne":72,"le vaud":69,"les clees":80,
    "leysin":78,"lignerolle":78.5,"lisle":75,"lonay":55,"longirod":77.5,"lovatens":75,
    "lucens":69.5,"luins":58.5,"lully":58,"lussery-villars":75,"lussy-sur-morges":61.5,
    "lutry":54,"maracon":74.5,"marchissy":77.5,"mathod":72,"mauborget":70,"mauraz":75,
    "mex":59.5,"mies":54,"missy":69,"moiry":76,"mollens":74,"molondin":81,"mont-la-ville":76,
    "mont-sur-rolle":62,"montagny-pres-yverdon":64.5,"montanaire":70,"montcherand":72,
    "montilliez":72.5,"montpreveyres":74.5,"montreux":65,"montricher":64,"morges":67,
    "morrens":74,"moudon":72.5,"mutrux":80,"novalles":76,"noville":75,"nyon":61,"ogens":76,
    "ollon":68,"onnens":65,"oppens":79,"orbe":75.5,"orges":74,"ormont-dessous":77,
    "ormont-dessus":76,"orny":73,"oron":69,"orzens":79,"oulens-sous-echallens":71,"pailly":76,
    "paudex":66.5,"payerne":70,"penthalaz":72.5,"penthaz":69.5,"penthereaz":74,"perroy":60.5,
    "poliez-pittet":73,"pompaples":66,"pomy":71,"prangins":57,"premier":79.5,"preverenges":65,
    "prevonloup":72.5,"prilly":72.5,"provence":81,"puidoux":68.5,"pully":61,"rances":76.5,
    "renens":77,"rennaz":64,"rivaz":62,"roche":66.5,"rolle":59.5,"romainmotier-envy":81,
    "romanel-sur-lausanne":70.5,"romanel-sur-morges":56,"ropraz":77.5,"rossenges":65,
    "rossiniere":81,"rougemont":79,"rovray":73,"rueyres":73,"saint-barthelemy":77,
    "saint-cergue":66,"saint-george":69.5,"saint-livres":69,"saint-oyens":77,"saint-prex":59,
    "saint-sulpice":55,"sainte-croix":70,"saubraz":77,"savigny":69,"senarclens":68.5,
    "sergey":76,"servion":69,"signy-avenex":58,"st-saphorin lavaux":74,"suchy":70,
    "sullens":64,"suscevaz":72,"syens":65,"tannay":60.5,"tartegnin":79,"tevenon":71.5,
    "tolochenaz":64,"trelex":57,"trey":78,"treycovagnes":73,"treytorrens":81.5,"ursins":75,
    "valbroye":70.5,"valeyres-sous-montagny":70.5,"valeyres-sous-rances":71,
    "valeyres-sous-ursins":77,"vallorbe":70,"vaulion":81,"vaux-sur-morges":56,"vevey":74.5,
    "veytaux":65,"vich":63,"villars-epeney":72,"villars-le-comte":68,"villars-le-terroir":76,
    "villars-sainte-croix":60.5,"villars-sous-yens":74,"villarzel":75,"villeneuve":66.5,
    "vinzel":65,"vuarrens":73.5,"vucherens":75,"vufflens-la-ville":65,"vufflens-le-chateau":60.5,
    "vugelles-la mothe":70,"vuiteboeuf":75,"vulliens":74,"vullierens":76,"vully-les-lacs":67,
    "yens":68,"yverdon-les-bains":75,"yvonand":73,"yvorne":71.5,
  };

  // Variantes de noms VD pour le matching (nom DB → nom dans le fichier)
  // Inclut les anciennes communes fusionnées encore présentes en DB
  const VD_ALIASES: Record<string, string> = {
    "labbaye": "labbaye",
    "l'abbaye": "labbaye",
    "forel (lavaux)": "forel lavaux",
    "saint-saphorin (lavaux)": "st-saphorin lavaux",
    "la chaux (cossonay)": "la chaux cossonay",
    "vugelles-la-mothe": "vugelles-la mothe",
    "chateau-d'oex": "chateau-doex",
    "chateau-doex": "chateau-doex",
    "blonay-saint-legier": "blonay - saint-legier",
    "blonay - saint-legier": "blonay - saint-legier",
    // Anciennes communes fusionnées (nom DB → nom dans VD_2026)
    "cully": "bourg-en-lavaux",
    "riex": "bourg-en-lavaux",
    "epesses": "bourg-en-lavaux",
    "villette lavaux": "bourg-en-lavaux",
    "grandvaux": "bourg-en-lavaux",
    "blonay": "blonay - saint-legier",
    "saint-legier-la chiesaz": "blonay - saint-legier",
    "dommartin": "montilliez",
    "pampigny": "hautemorges",
    "reverolle": "hautemorges",
    "montherod": "hautemorges",
    "bioley-orjulaz": "jorat-menthue",
    "essertes": "oron",
    "forel-sur-lucens": "lucens",
    "dompierre vd": "lucens",
    "treytorrens payerne": "valbroye",
  };

  // Lookup VD coefficient by normalized name with fuzzy alias support
  function getVdCoeff(nom: string): number | undefined {
    const norm = normalizeName(nom);
    // Direct match
    if (VD_2026[norm] !== undefined) return VD_2026[norm];
    // Alias match
    const aliasKey = VD_ALIASES[norm];
    if (aliasKey && VD_2026[aliasKey] !== undefined) return VD_2026[aliasKey];
    // Try without parentheses content: "Forel (Lavaux)" → "forel"
    const noParens = norm.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
    if (noParens !== norm && VD_2026[noParens] !== undefined) return VD_2026[noParens];
    // Try alias on stripped version too: "Dompierre (VD)" → "dompierre vd" → alias
    const joined = norm.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
    if (joined !== norm) {
      if (VD_2026[joined] !== undefined) return VD_2026[joined];
      const joinedAlias = VD_ALIASES[joined];
      if (joinedAlias && VD_2026[joinedAlias] !== undefined) return VD_2026[joinedAlias];
    }
    // Try alias on stripped version: "Villette (Lavaux)" → "villette lavaux" → alias
    if (noParens !== norm) {
      const noParensAlias = VD_ALIASES[noParens];
      if (noParensAlias && VD_2026[noParensAlias] !== undefined) return VD_2026[noParensAlias];
    }
    return undefined;
  }

  // ESTV API désactivée (retourne 405 sur tous les endpoints POST)
  debugInfo.estv = "disabled - ESTV operation endpoints return 405 (browser-only access)";

  // Coefficients cantonaux de base (identiques pour toutes les communes du canton)
  const CANTONAL_RATES: Record<string, number> = {
    VD: 154.5,    // VD: coefficient cantonal 2026
    GE: 100,      // GE: centime additionnel cantonal (base rate)
    FR: 100,      // FR: coefficient cantonal (base rate)
    VS: 100,      // VS: coefficient cantonal (base rate)
    NE: 130.6,    // NE: coefficient cantonal 2025
    JU: 100,      // JU: coefficient cantonal (base rate)
  };

  // ═══════════════════════════════════════════════════════════════════
  // GENÈVE 2026 — 45 communes (centimes additionnels communaux)
  // Source : centimes2018-2026_0.xlsx (fichier officiel)
  // ═══════════════════════════════════════════════════════════════════
  const GE_2026: Record<string, number> = {
    "aire-la-ville":50,"anieres":31,"avully":51,"avusy":49,
    "bardonnex":43,"bellevue":39,"bernex":48,"carouge":40,
    "cartigny":42,"celigny":33,"chancy":51,"chene-bougeries":32,
    "chene-bourg":46,"choulex":40,"collex-bossy":46,"collonge-bellerive":28,
    "cologny":25,"confignon":46,"corsier":31,"dardagny":48,
    "geneve":45.49,"genthod":25,"grand-saconnex":44,"gy":46,
    "hermance":42,"jussy":41,"laconnex":44,"lancy":47,
    "meinier":42,"meyrin":42,"onex":50.5,"perly-certoux":43,
    "plan-les-ouates":37,"pregny-chambesy":32,"presinge":40,"puplinge":49,
    "russin":39,"satigny":39,"soral":44,"thonex":44,
    "troinex":40,"vandoeuvres":27,"vernier":50,"versoix":45.5,
    "veyrier":37,
  };

  // ═══════════════════════════════════════════════════════════════════
  // VALAIS 2026 — 122 communes (coefficient total %)
  // Source : Coefficients_Indexations_Communes_2022-2027.pdf (officiel)
  // ═══════════════════════════════════════════════════════════════════
  const VS_2026: Record<string, number> = {
    "agarn":153,"albinen":145,"anniviers":146,"arbaz":146,
    "ardon":166,"ausserberg":138,"ayent":158,"baltschieder":166,
    "bellwald":160,"bettmeralp":136,"binn":156,"bister":176,
    "bitsch":176,"blatten":136,"bourg-st-pierre":176,"bovernier":156,
    "brigglis":176,"burchen":146,"chalais":146,"chamoson":143,
    "champery":141,"chippis":146,"collombey-muraz":171,"collonges":165,
    "conthey":163,"crans-montana":176,"dorenaz":161,"eggerberg":133,
    "eischoll":146,"eisten":176,"embd":158,"ergisch":176,
    "ernen":176,"evionnaz":176,"evolene":140,"ferden":151,
    "fiesch":160,"fieschertal":176,"finhaut":176,"fully":165,
    "gampel-bratsch":151,"goms":173,"grachen":135,"grengiols":146,
    "grimisuat":163,"grone":143,"guttet-feschel":148,"heremence":176,
    "icogne":176,"inden":136,"iserables":138,"kippel":136,
    "lalden":158,"lax":163,"lens":176,"leuk":156,
    "leukerbad":151,"leytron":146,"liddes":143,"martigny":166,
    "martigny-combe":163,"massongex":168,"mont-noble":148,"monthey":170,
    "morel-filet":140,"naters":176,"nendaz":156,"niedergesteln":156,
    "noble-contree":166,"oberems":176,"obergoms":176,"orsieres":150,
    "port-valais":170,"randa":176,"raron":165,"riddes":153,
    "ried-brig":170,"riederalp":138,"saas-almagell":150,"saas-balen":153,
    "saas-fee":145,"saas-grund":133,"saillon":146,"salgesch":136,
    "salvan":173,"saviese":156,"saxon":166,"sembrancher":155,
    "sierre":161,"simplon":176,"sion":176,"st niklaus":160,
    "st-gingolph":133,"st-leonard":158,"st-martin":150,"st-maurice":163,
    "stalden":171,"staldenried":176,"steg-hohtenn":156,"tasch":155,
    "termen":176,"torbel":176,"trient":176,"troistorrents":166,
    "turtmann - unterems":166,"unterbach":138,"val de bagnes":176,"val dilliez":151,
    "varen":156,"vernayaz":166,"verossaz":153,"vetroz":163,
    "vex":166,"veysonnaz":110,"vionnaz":153,"visp":166,
    "visperterminen":150,"vouvry":158,"wiler":146,"zeneggen":151,
    "zermatt":176,"zwischbergen":176,
  };

  // Aliases VS pour matcher les noms en DB (saint→st, fusions, suffixes)
  const VS_ALIASES: Record<string, string> = {
    "brig-glis": "brigglis",
    "saint-maurice": "st-maurice",
    "saint-leonard": "st-leonard",
    "saint-martin": "st-martin",
    "saint-martin vs": "st-martin",
    "saint-gingolph": "st-gingolph",
    "val d'illiez": "val dilliez",
    "val-d'illiez": "val dilliez",
    "val-dilliez": "val dilliez",
    "saint-niklaus": "st niklaus",
    "turtmann-unterems": "turtmann - unterems",
    // Fusions VS — anciennes communes → commune fusionnée
    "vissoie": "anniviers", "ayer": "anniviers", "chandolin": "anniviers",
    "grimentz": "anniviers", "saint-jean": "anniviers", "saint-luc": "anniviers",
    "miege": "noble-contree", "venthone": "noble-contree", "veyras": "noble-contree",
    "chermignon": "crans-montana", "montana": "crans-montana",
    "randogne": "crans-montana", "mollens vs": "crans-montana",
    "bagnes": "val de bagnes", "volleges": "val de bagnes",
    "oberwald": "goms", "obergesteln": "goms",
    "morel": "morel-filet",
    "erschmatt": "guttet-feschel",
    "bourg-saint-pierre": "bourg-st-pierre",
    "stalden vs": "stalden",
    "wiler lotschen": "wiler",
    "charrat": "charrat",  // exists but may need exact match
    "mund": "mund",  // same — may be missing from data
  };

  // Lookup GE/VS coefficient by normalized name
  function getNameCoeff(nom: string, canton: string): number | undefined {
    const norm = normalizeName(nom);

    if (canton === "GE") {
      if (GE_2026[norm] !== undefined) return GE_2026[norm];
      // GE aliases + strip "(GE)" suffix
      const geAliases: Record<string, string> = {
        "le grand-saconnex": "grand-saconnex",
        "carouge ge": "carouge",
        "corsier ge": "corsier",
      };
      const alias = geAliases[norm];
      if (alias && GE_2026[alias] !== undefined) return GE_2026[alias];
      // Strip parentheses: "Carouge (GE)" → "carouge"
      const noParens = norm.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
      if (noParens !== norm && GE_2026[noParens] !== undefined) return GE_2026[noParens];
      return undefined;
    }

    if (canton === "VS") {
      if (VS_2026[norm] !== undefined) return VS_2026[norm];
      const alias = VS_ALIASES[norm];
      if (alias && VS_2026[alias] !== undefined) return VS_2026[alias];
      // Strip parentheses: "Mollens (VS)" → "mollens"
      const noParens = norm.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
      if (noParens !== norm) {
        if (VS_2026[noParens] !== undefined) return VS_2026[noParens];
        // Also try alias on stripped: "Mollens (VS)" → "mollens vs" → alias
        const joinedAlias = VS_ALIASES[norm.replace(/[()]/g, " ").replace(/\s+/g, " ").trim()];
        if (joinedAlias && VS_2026[joinedAlias] !== undefined) return VS_2026[joinedAlias];
        const noParensAlias = VS_ALIASES[noParens];
        if (noParensAlias && VS_2026[noParensAlias] !== undefined) return VS_2026[noParensAlias];
      }
      return undefined;
    }

    return undefined;
  }

  // ═══════════════════════════════════════════════════════════════════
  // FRIBOURG 2025 — 121 communes (code_ofs → coefficient PM)
  // Source : Calculette PM 2025.xlsx, onglet "taux 2025 communes"
  // ═══════════════════════════════════════════════════════════════════
  const FR_2025: Record<number, number> = {
    2008:87,2011:85,2016:85.6,2022:68.9,2025:80,2027:88.1,
    2029:79.2,2035:87.9,2038:90.3,2041:80,2043:50,2044:84,
    2045:83,2050:77.4,2051:49.9,2053:78,2054:84,2055:70,
    2063:100,2067:55,2068:85,2079:85,2086:86.9,2087:83,
    2096:90,2097:48,2099:88,2102:77,2113:88.4,2114:80,
    2115:85,2117:85,2121:97,2122:75,2123:85,2124:92,
    2125:74.3,2128:79.5,2129:77.2,2130:67,2131:70,2134:80,
    2135:75.6,2137:77.7,2138:100,2140:75,2143:88.1,2145:79.7,
    2147:75,2148:73,2149:100,2152:86,2153:78,2155:79,
    2160:82.8,2162:83.2,2163:89.8,2173:90,2174:69.1,2175:84,
    2177:91.7,2183:75,2186:93,2194:55,2196:80,2197:70,
    2198:67.8,2206:89,2208:80,2211:81,2216:75,2220:84.5,
    2226:80,2228:69,2230:100,2233:74,2234:85,2235:100,
    2236:82,2237:80,2238:85,2239:80,2250:76,2254:80,
    2257:68,2258:75,2261:32,2262:80,2265:79,2266:75,
    2271:52.3,2272:92.6,2274:58,2275:62,2276:72.5,2278:85,
    2284:58,2292:89,2293:82,2294:85.9,2295:76,2296:78,
    2299:90,2300:95,2301:86,2303:95,2304:75,2305:72,
    2306:75,2307:86,2308:89,2309:85.7,2321:78.5,2323:90,
    2325:83.6,2328:81,2333:88,2335:90,2336:83,2337:93.8,
    2338:83,
  };

  // Fusions FR : code_ofs ancien → code_ofs nouveau (pour communes encore en DB)
  const FR_MERGERS: Record<number, number> = {
    2200:2239, 2217:2239,  // Grolley + Ponthaux → Grolley-Ponthaux
    2012:2051,             // Delley → Delley-Portalban
    2013:2053, 2014:2053,  // Domdidier + Dompierre → Belmont-Broye
    2015:2054, 2004:2054,  // Estavayer-le-Lac + Bussy → Estavayer
    2056:2016,             // Fétigny-Ménières → Fétigny
    2061:2099, 2066:2099, 2103:2099, 2105:2099,  // → Siviriez
    2072:2117, 2111:2117,  // Ecublens + Villaz-Saint-Pierre → Villaz
    2089:2096,             // Montet → Romont
    2101:2115,             // Torny-le-Grand → Torny
    2104:2044, 2106:2044,  // Villangeaux + Villaranon → Surpierre
    2107:2114, 2108:2114,  // Villargiroud + Villariaz → Villorsonnens
    2116:2236, 2224:2236, 2225:2236, 2227:2236, 2229:2236,  // → Gibloux
    2158:2163,             // Villars-sous-Mont → Val-de-Charmey
    2171:2122,             // Arconciel → Pont-en-Ogoz
    2185:2234, 2189:2234, 2223:2234,  // Corserey + Ependes + Le Glèbe → La Brillaz
    2213:2238,             // Noréaz → Bois-d'Amont
    2221:2237,             // Prez-vers-Noréaz → Prez
    2222:2220,             // Rossens → Le Mouret
    2243:2254,             // Barberêche → Courtepin
    2259:2275, 2260:2275,  // Galmiz + Gempenach → Murten
    2291:2306,             // Alterswil → Tafers
    2310:2299,             // Zumholz → Plaffeien
  };

  // ═══════════════════════════════════════════════════════════════════
  // NEUCHÂTEL 2026 — 24 communes (nom normalisé → coefficient)
  // Source : screenshot coefficients communaux 2026
  // Fusions : Hauterive + Saint-Blaise + Enges + La Tène → Laténa (68)
  // ═══════════════════════════════════════════════════════════════════
  const NE_2026: Record<string, number> = {
    "cornaux":74,"cressier":77,"le landeron":66,"lignieres":67,
    "boudry":68,"cortaillod":66,"la cote-aux-fees":75,"les verrieres":79,
    "le cerneux-pequignot":72,"la brevine":75,"la chaux-du-milieu":75,"les ponts-de-martel":75,
    "brot-plamboz":75,"la chaux-de-fonds":75,"les planchettes":77,"la sagne":75,
    "val-de-travers":76,"milvignes":63,"val-de-ruz":66,"rochefort":67,
    "la grande beroche":63,"neuchatel":65,"le locle":69,"latena":68,
  };

  // Aliases NE pour matcher les noms en DB (fusions communales)
  const NE_ALIASES: Record<string, string> = {
    // Laténa (2025): Hauterive + Saint-Blaise + Enges + La Tène + Thielle-Wavre
    "hauterive": "latena", "hauterive ne": "latena", "saint-blaise": "latena",
    "enges": "latena", "la tene": "latena", "thielle-wavre": "latena",
    // Milvignes (2013): Auvernier + Bôle + Colombier
    "auvernier": "milvignes", "bole": "milvignes", "colombier": "milvignes",
    "colombier ne": "milvignes",
    // La Grande Béroche (2018): Gorgier + Montalchez + Fresens + Vaumarcus + Saint-Aubin-Sauges + Bevaix
    "gorgier": "la grande beroche", "montalchez": "la grande beroche",
    "fresens": "la grande beroche", "vaumarcus": "la grande beroche",
    "saint-aubin-sauges": "la grande beroche", "bevaix": "la grande beroche",
    "la grande-beroche": "la grande beroche",
    // Neuchâtel (2021): + Corcelles-Cormondrèche + Peseux
    "corcelles-cormondroche": "neuchatel", "corcelles-cormondrече": "neuchatel",
    "peseux": "neuchatel",
    // Val-de-Ruz (2013): + Cernier + Valangin
    "cernier": "val-de-ruz", "valangin": "val-de-ruz",
    // Le Locle (2021): + Les Brenets
    "les brenets": "le locle",
    // Cressier (NE) → strip suffix
    "cressier ne": "cressier",
  };

  // ═══════════════════════════════════════════════════════════════════
  // JURA 2026 — 51 communes (nom normalisé → quotité × 100 = coefficient %)
  // Source : quotites_2026.pdf (3 districts: Delémont, Franches-Montagnes, Porrentruy)
  // Quotité de l'État : 2.85
  // ═══════════════════════════════════════════════════════════════════
  const JU_2026: Record<string, number> = {
    // District de Delémont (20 communes)
    "haute-sorne":210,"boecourt":200,"bourrignon":225,"chatillon":200,
    "val terbi":220,"courchapoix":215,"courrendlin":225,"courroux":215,
    "courtetelle":165,"delemont":190,"develier":195,"ederswiler":220,
    "mervelier":225,"mettembert":220,"movelier":225,"pleigne":210,
    "rossemaison":200,"saulcy":220,"soyhieres":215,"moutier":230,
    // District des Franches-Montagnes (13 communes)
    "le bemont":195,"les bois":205,"les breuleux":130,"les enfers":205,
    "clos du doubs":215,"le genevez":205,"lajoux":220,"montfaucon":220,
    "muriaux":160,"le noirmont":170,"saignelegier":230,"st-brais":225,
    "soubey":225,
    // District de Porrentruy (24 communes)
    "alle":225,"basse-vendline":210,"boncourt":155,"basse-allaine":235,
    "bure":225,"haute-ajoie":215,"coeuve":235,"cornol":205,
    "courchavon":190,"courgenay":205,"courtedoux":220,"damphreux-lugnez":215,
    "fahy":230,"fontenais":235,"grandfontaine":225,"la baroche":215,
    "porrentruy":205,"vendlincourt":230,
  };

  // Aliases JU pour matcher les noms en DB (suffixes, fusions)
  const JU_ALIASES: Record<string, string> = {
    "saint-brais": "st-brais",
    "chatillon ju": "chatillon",
    // Suffixes (JU)
    "le bemont ju": "le bemont",
    "lajoux ju": "lajoux",
    "les genevez ju": "le genevez",  // Les→Le + suffix
    "les genevez": "le genevez",
    // Anciennes communes fusionnées
    "corban": "val terbi",
    "damphreux": "damphreux-lugnez",
    "damvant": "haute-ajoie",
    "bonfol": "basse-allaine",
    "beurnevesin": "basse-vendline",
  };

  // ═══════════════════════════════════════════════════════════════════
  // MATCHING : combiner toutes les sources (6 cantons)
  // VD → par nom (VD_2026, 301 communes, 2026)
  // GE → par nom (GE_2026, 45 communes, 2026)
  // VS → par nom (VS_2026, 122 communes, 2026)
  // FR → par code_ofs (FR_2025, 121 communes, 2025)
  // NE → par nom (NE_2026, 24 communes, 2026)
  // JU → par nom (JU_2026, 51 communes, 2026)
  // ═══════════════════════════════════════════════════════════════════

  const taxUpdates: { code: number; data: any }[] = [];

  for (const commune of allCommunes) {
    let coeff: number | undefined;
    let annee = 2026;

    if (commune.canton === "VD") {
      coeff = getVdCoeff(commune.nom);
      if (coeff !== undefined) debugInfo.matched_vd++;
    } else if (commune.canton === "GE") {
      coeff = getNameCoeff(commune.nom, "GE");
      if (coeff !== undefined) debugInfo.matched_ge = (debugInfo.matched_ge || 0) + 1;
    } else if (commune.canton === "VS") {
      coeff = getNameCoeff(commune.nom, "VS");
      if (coeff !== undefined) debugInfo.matched_vs = (debugInfo.matched_vs || 0) + 1;
    } else if (commune.canton === "FR") {
      coeff = FR_2025[commune.code_ofs];
      // Si pas trouvé, chercher via les fusions (ancien code → nouveau code)
      if (coeff === undefined) {
        const newCode = FR_MERGERS[commune.code_ofs];
        if (newCode) coeff = FR_2025[newCode];
      }
      annee = 2025;
      if (coeff !== undefined) debugInfo.matched_fr = (debugInfo.matched_fr || 0) + 1;
    } else if (commune.canton === "NE") {
      const norm = normalizeName(commune.nom);
      coeff = NE_2026[norm];
      if (coeff === undefined) {
        const alias = NE_ALIASES[norm];
        if (alias) coeff = NE_2026[alias];
      }
      // Strip "(NE)" suffix: "Cressier (NE)" → "cressier"
      if (coeff === undefined) {
        const noParens = norm.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
        if (noParens !== norm) {
          coeff = NE_2026[noParens];
          if (coeff === undefined) {
            const alias2 = NE_ALIASES[noParens];
            if (alias2) coeff = NE_2026[alias2];
          }
        }
        // Also try joined: "Colombier (NE)" → "colombier ne"
        const joined = norm.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
        if (coeff === undefined && joined !== norm) {
          const alias3 = NE_ALIASES[joined];
          if (alias3) coeff = NE_2026[alias3];
        }
      }
      if (coeff !== undefined) debugInfo.matched_ne = (debugInfo.matched_ne || 0) + 1;
    } else if (commune.canton === "JU") {
      const norm = normalizeName(commune.nom);
      coeff = JU_2026[norm];
      if (coeff === undefined) {
        const alias = JU_ALIASES[norm];
        if (alias) coeff = JU_2026[alias];
      }
      // Try without parentheses: "Châtillon (JU)" → "chatillon"
      if (coeff === undefined) {
        const noParens = norm.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
        if (noParens !== norm) coeff = JU_2026[noParens];
      }
      if (coeff !== undefined) debugInfo.matched_ju = (debugInfo.matched_ju || 0) + 1;
    }

    if (coeff !== undefined) {
      const tauxCanton = CANTONAL_RATES[commune.canton] ?? null;
      taxUpdates.push({
        code: commune.code_ofs,
        data: {
          taux_commune: coeff,
          taux_canton: tauxCanton,
          annee_fiscale: annee,
          updated_at: new Date().toISOString(),
        },
      });
    } else {
      debugInfo.unmatched.push({ code: commune.code_ofs, nom: commune.nom, canton: commune.canton });
    }
  }

  console.log(`[tax] ${taxUpdates.length} communes matched (VD:${debugInfo.matched_vd}, GE:${debugInfo.matched_ge||0}, VS:${debugInfo.matched_vs||0}, FR:${debugInfo.matched_fr||0}, NE:${debugInfo.matched_ne||0}, JU:${debugInfo.matched_ju||0})`);

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
    source: "Official cantonal sources (VD:300, GE:45, VS:122, FR:121, NE:24, JU:51)",
    year: 2026,
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

    // ─── STEP 7 : Explorer les APIs fiscales (diagnostic v2) ───
    if (step === "tax-explore") {
      const results: any = { datasets: [], downloads: [] };
      const estvBase = "https://swisstaxcalculator.estv.admin.ch";

      // Helper : lire un endpoint proprement (fix "Body already read")
      async function probe(url: string, opts: any = {}) {
        try {
          const res = await fetch(url, {
            ...opts,
            signal: AbortSignal.timeout(15000),
          });
          const status = res.status;
          const contentType = res.headers.get("content-type") || "";
          const text = await res.text(); // Toujours lire comme texte d'abord
          let parsed: any = null;
          if (contentType.includes("json") || text.startsWith("{") || text.startsWith("[")) {
            try { parsed = JSON.parse(text); } catch {}
          }
          return {
            url,
            status,
            content_type: contentType,
            size: text.length,
            is_json: !!parsed,
            is_array: Array.isArray(parsed),
            array_length: Array.isArray(parsed) ? parsed.length : null,
            keys: parsed && !Array.isArray(parsed) ? Object.keys(parsed) : null,
            first_item_keys: Array.isArray(parsed) && parsed[0] ? Object.keys(parsed[0]) : null,
            sample: parsed ? JSON.stringify(parsed).substring(0, 800) : text.substring(0, 400),
          };
        } catch (e: any) {
          return { url, error: e.message };
        }
      }

      // ── 1. ESTV — analyser le JS principal pour trouver les vrais endpoints ──
      console.log("[tax-explore] Fetching ESTV main JS bundle...");

      // Le chunk principal contient les endpoints API
      const jsUrls = [
        `${estvBase}/static/ost-web/1.4.55/static/js/main.633aced1.chunk.js`,
        `${estvBase}/static/ost-web/1.4.55/static/js/2.84f0dd44.chunk.js`,
      ];

      const discoveredPaths: string[] = [];

      for (const jsUrl of jsUrls) {
        try {
          const jsRes = await fetch(jsUrl, { signal: AbortSignal.timeout(15000) });
          if (jsRes.ok) {
            const js = await jsRes.text();
            console.log(`[tax-explore] JS ${jsUrl.split("/").pop()}: ${js.length} bytes`);

            // Extraire TOUS les chemins d'URL de l'API
            // Chercher les patterns courants dans le code React/JS
            const patterns = [
              /["'`](\/[a-zA-Z0-9\/_.-]+(?:municip|tax|rate|calc|canton|location|commune|scale|deduction|simple|export|burden|load)[a-zA-Z0-9\/_.-]*)["'`]/gi,
              /["'`](\/delegate\/[a-zA-Z0-9\/_.-]+)["'`]/gi,
              /["'`](\/api\/[a-zA-Z0-9\/_.-]+)["'`]/gi,
              /fetch\(["'`]([^"'`]+)["'`]/gi,
              /url:\s*["'`]([^"'`]+)["'`]/gi,
              /endpoint[s]?['"`:]\s*["'`]([^"'`]+)["'`]/gi,
              /baseUrl['"`:]\s*["'`]([^"'`]+)["'`]/gi,
              /concat\(["'`]([^"'`]*(?:delegate|api|ost)[^"'`]*)["'`]/gi,
            ];

            const allMatches = new Set<string>();
            for (const pattern of patterns) {
              let match;
              while ((match = pattern.exec(js)) !== null) {
                const path = match[1];
                if (path && path.length > 3 && path.length < 200) {
                  allMatches.add(path);
                }
              }
            }

            // Aussi chercher "ost-integration" qui est le namespace connu
            const ostMatches = js.match(/ost-integration[^"'`\s)}\]]{0,100}/g) || [];
            const delegateMatches = js.match(/delegate[^"'`\s)}\]]{0,100}/g) || [];

            results[`js_${jsUrl.split("/").pop()}`] = {
              size: js.length,
              api_paths: [...allMatches].slice(0, 50),
              ost_references: [...new Set(ostMatches)].slice(0, 20),
              delegate_references: [...new Set(delegateMatches)].slice(0, 20),
            };

            for (const p of allMatches) {
              if (p.startsWith("/")) discoveredPaths.push(p);
            }
          }
        } catch (e: any) {
          results[`js_error`] = e.message;
        }
      }

      // ── V4 : Approche opendata.swiss + parsing cantonal ──
      // L'API ESTV retourne 405 (browser-only). On passe par les données ouvertes.

      // ── 2. opendata.swiss — chercher les datasets de coefficients fiscaux ──
      console.log("[tax-explore] Searching opendata.swiss for tax coefficient datasets...");

      // Recherches ciblées pour trouver des datasets avec coefficients/Steuerfüsse
      const searches = [
        "steuerf%C3%BCsse+gemeinden+schweiz",
        "coefficients+impots+communaux",
        "charge+fiscale+communes",
        "steuerfuss+kantone+gemeinden",
        "ESTV+steuerbelastung",
      ];

      for (const q of searches) {
        try {
          const res = await fetch(
            `https://opendata.swiss/api/3/action/package_search?q=${q}&rows=3`,
            { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(15000) }
          );
          if (res.ok) {
            const data = await res.json();
            const packages = data?.result?.results || [];
            for (const pkg of packages) {
              // Extraire les URLs de téléchargement (CSV, XLSX, JSON)
              const resources = (pkg.resources || [])
                .filter((r: any) => /csv|xlsx|json|px/i.test(r.format || r.media_type || ""))
                .map((r: any) => ({
                  name: r.name?.fr || r.name?.de || r.name || "",
                  url: r.download_url || r.url,
                  format: r.format,
                  size: r.byte_size,
                }));
              results.datasets.push({
                id: pkg.id,
                identifier: pkg.identifier,
                title: pkg.title?.fr || pkg.title?.de || pkg.display_name || "",
                description: (pkg.description?.fr || pkg.description?.de || "").substring(0, 200),
                organization: pkg.organization?.title?.fr || pkg.organization?.title?.de || "",
                resources_count: (pkg.resources || []).length,
                csv_json_resources: resources.slice(0, 5),
                search_query: q,
              });
            }
          }
        } catch (e: any) {
          results.datasets.push({ error: e.message, search_query: q });
        }
      }

      // ── 3. Chercher spécifiquement le dataset ESTV "Steuerbelastung" ──
      console.log("[tax-explore] Looking for ESTV Steuerbelastung dataset...");

      try {
        // L'ESTV publie annuellement "Steuerbelastung in der Schweiz"
        const estvRes = await fetch(
          `https://opendata.swiss/api/3/action/package_search?q=steuerbelastung+ESTV&rows=10`,
          { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(15000) }
        );
        if (estvRes.ok) {
          const data = await estvRes.json();
          const packages = data?.result?.results || [];
          results.estv_datasets = packages.map((pkg: any) => ({
            id: pkg.id,
            identifier: pkg.identifier,
            title: pkg.title?.fr || pkg.title?.de || "",
            org: pkg.organization?.title?.fr || pkg.organization?.title?.de || "",
            resources: (pkg.resources || []).map((r: any) => ({
              name: r.name?.fr || r.name?.de || r.name || "",
              url: r.download_url || r.url,
              format: r.format,
            })).slice(0, 8),
          }));
        }
      } catch (e: any) {
        results.estv_datasets_error = e.message;
      }

      // ── 4. Chercher les datasets cantonaux romands spécifiquement ──
      console.log("[tax-explore] Looking for cantonal datasets (VD, GE, FR, VS, NE, JU)...");

      const cantonSearches = [
        { q: "coefficients+communaux+Vaud", canton: "VD" },
        { q: "centimes+additionnels+Geneve", canton: "GE" },
        { q: "coefficients+communaux+Fribourg", canton: "FR" },
        { q: "coefficients+communaux+Valais", canton: "VS" },
        { q: "coefficients+communaux+Neuchatel", canton: "NE" },
        { q: "coefficients+impots+Jura", canton: "JU" },
      ];

      for (const { q, canton } of cantonSearches) {
        try {
          const res = await fetch(
            `https://opendata.swiss/api/3/action/package_search?q=${q}&rows=3`,
            { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(10000) }
          );
          if (res.ok) {
            const data = await res.json();
            const packages = data?.result?.results || [];
            results[`canton_${canton}`] = packages.map((pkg: any) => ({
              id: pkg.id,
              identifier: pkg.identifier,
              title: pkg.title?.fr || pkg.title?.de || "",
              org: pkg.organization?.title?.fr || pkg.organization?.title?.de || "",
              resources: (pkg.resources || [])
                .filter((r: any) => /csv|xlsx|json|px|pdf/i.test(r.format || ""))
                .map((r: any) => ({
                  url: r.download_url || r.url,
                  format: r.format,
                  name: r.name?.fr || r.name?.de || r.name || "",
                })).slice(0, 5),
            }));
          }
        } catch (e: any) {
          results[`canton_${canton}`] = { error: e.message };
        }
      }

      // ── 5. Tester des URLs de téléchargement direct ESTV ──
      console.log("[tax-explore] Testing direct ESTV download URLs...");

      const estvDownloads = [
        // L'ESTV publie les Steuerfüsse dans des fichiers Excel/CSV
        "https://www.estv.admin.ch/dam/estv/fr/dokumente/allgemein/Steuerstatistiken/steuerbelastung/steuerfuesse.xlsx.download.xlsx",
        "https://www.estv.admin.ch/dam/estv/fr/dokumente/allgemein/Steuerstatistiken/steuerbelastung/steuerfuesse-gemeinden.xlsx.download.xlsx",
        "https://www.estv.admin.ch/dam/estv/de/dokumente/allgemein/Steuerstatistiken/steuerbelastung/steuerfuesse.xlsx.download.xlsx",
        "https://www.estv.admin.ch/dam/estv/de/dokumente/allgemein/Steuerstatistiken/steuerbelastung-2025.xlsx.download.xlsx",
        // Charge fiscale PDF/Excel links
        "https://www.estv.admin.ch/dam/estv/fr/dokumente/allgemein/Steuerstatistiken/charge-fiscale/charge-fiscale-suisse.xlsx.download.xlsx",
        // Essayer aussi sans le suffixe .download.xlsx
        "https://www.estv.admin.ch/dam/estv/fr/dokumente/allgemein/Steuerstatistiken/steuerbelastung/steuerfuesse.xlsx",
        "https://www.estv.admin.ch/dam/estv/de/dokumente/allgemein/Steuerstatistiken/steuerbelastung/steuerfuesse.xlsx",
      ];

      for (const url of estvDownloads) {
        try {
          const res = await fetch(url, {
            method: "HEAD",
            signal: AbortSignal.timeout(10000),
            redirect: "follow",
          });
          results.downloads.push({
            url,
            status: res.status,
            content_type: res.headers.get("content-type") || "",
            content_length: res.headers.get("content-length") || "",
            location: res.headers.get("location") || "",
          });
        } catch (e: any) {
          results.downloads.push({ url, error: e.message });
        }
      }

      // ── 6. Parser le HTML de Genève (centimes additionnels) ──
      console.log("[tax-explore] Parsing Geneva centimes additionnels HTML...");

      try {
        const geRes = await fetch("https://silgeneve.ch/legis/data/rsg_D3_05p30.htm", {
          signal: AbortSignal.timeout(15000),
        });
        if (geRes.ok) {
          const html = await geRes.text();

          // Extraire les cellules de tableau
          // Le HTML a 3 tables — les centimes sont dans un tableau structuré
          const tableMatches = html.match(/<table[\s\S]*?<\/table>/gi) || [];

          const tables: any[] = [];
          for (let t = 0; t < tableMatches.length; t++) {
            const tableHtml = tableMatches[t];
            // Extraire les lignes
            const rows = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
            const parsedRows: string[][] = [];
            for (const row of rows) {
              const cells = row.match(/<t[dh][\s\S]*?<\/t[dh]>/gi) || [];
              const cellTexts = cells.map((cell: string) =>
                cell.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
              );
              if (cellTexts.some((c: string) => c.length > 0)) {
                parsedRows.push(cellTexts);
              }
            }
            tables.push({
              table_index: t,
              row_count: parsedRows.length,
              column_count: parsedRows[0]?.length || 0,
              first_5_rows: parsedRows.slice(0, 5),
              last_3_rows: parsedRows.slice(-3),
              // Chercher les lignes qui ressemblent à des communes avec des taux
              rate_rows: parsedRows.filter((row: string[]) =>
                row.some((c: string) => /\d{2,3}[.,]\d/.test(c)) &&
                row.some((c: string) => /^[A-ZÀ-Ü]/.test(c))
              ).slice(0, 10),
            });
          }

          // Aussi chercher du contenu hors tableaux
          const plainText = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
          const numberMatches = plainText.match(/[A-ZÀ-Ü][a-zà-ü\-']+[\s\S]{1,30}\d{2,3}[.,]\d/g) || [];

          results.ge_parsed = {
            html_size: html.length,
            table_count: tableMatches.length,
            tables,
            text_matches_sample: numberMatches.slice(0, 15),
            // Aussi dumper les 2000 premiers caractères du texte nettoyé
            plain_text_start: plainText.substring(0, 2000).trim(),
          };
        }
      } catch (e: any) {
        results.ge_parsed = { error: e.message };
      }

      // ── 7. Tester aussi les datasets Fribourg sur opendata.swiss ──
      // On a vu "be3df8df-bd71-4b82-a286-81ec31b60d2d" dans la recherche précédente
      console.log("[tax-explore] Fetching Fribourg coefficients dataset details...");

      try {
        const frRes = await fetch(
          `https://opendata.swiss/api/3/action/package_show?id=be3df8df-bd71-4b82-a286-81ec31b60d2d`,
          { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(10000) }
        );
        if (frRes.ok) {
          const data = await frRes.json();
          const pkg = data?.result;
          results.fr_dataset = {
            title: pkg?.title?.fr || "",
            resources: (pkg?.resources || []).map((r: any) => ({
              name: r.name?.fr || r.name?.de || r.name || "",
              url: r.download_url || r.url,
              format: r.format,
              size: r.byte_size,
            })),
          };

          // Essayer de télécharger le premier CSV
          const csvResource = (pkg?.resources || []).find((r: any) =>
            /csv/i.test(r.format || "")
          );
          if (csvResource) {
            const csvUrl = csvResource.download_url || csvResource.url;
            try {
              const csvRes = await fetch(csvUrl, { signal: AbortSignal.timeout(15000) });
              if (csvRes.ok) {
                const csvText = await csvRes.text();
                results.fr_csv = {
                  url: csvUrl,
                  size: csvText.length,
                  first_500_chars: csvText.substring(0, 500),
                  line_count: csvText.split("\n").length,
                  first_5_lines: csvText.split("\n").slice(0, 5),
                };
              } else {
                results.fr_csv = { url: csvUrl, status: csvRes.status };
              }
            } catch (e: any) {
              results.fr_csv = { url: csvUrl, error: e.message };
            }
          }
        }
      } catch (e: any) {
        results.fr_dataset_error = e.message;
      }

      return NextResponse.json({
        success: true,
        step: "tax-explore-v4",
        total_datasets: results.datasets.length,
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
