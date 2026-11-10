// src/lib/mcp/tools.ts
// Outils exposes par le serveur MCP de NeoFidu (/api/mcp) : calcul d'impot (calculateur AFC),
// impots par commune, classement des communes, recherche dans les guides fiscaux.
// Chaque reponse cite ses sources (pages neofidu.ch) pour que l'assistant puisse les reprendre.

import { calculateIncomeTax, SWISS_CANTONS, TAX_YEAR, TaxInputError } from "@/lib/estv-calc";
import { BARO_COMMUNES, type BaroCommune } from "@/lib/barometre";
import { PROFILS, PROFIL_LABELS, formatChf, type ProfilId } from "@/lib/commune-impots";
import { vaudtaxGuide } from "@/lib/guides/vaudtax";
import { getaxGuide } from "@/lib/guides/getax";
import { vstaxGuide } from "@/lib/guides/vstax";
import { fritaxGuide } from "@/lib/guides/fritax";
import type { GuideBlock, GuideChapterContent, GuideDefinition, GuideLocale } from "@/lib/guides/types";

const SITE = "https://neofidu.ch";
const ROMAND = ["VD", "GE", "VS", "FR", "NE", "JU"];
const OFFER_FR = `Faire préparer sa déclaration d'impôt par NeoFidu (fiduciaire en ligne, Suisse romande) : dès CHF 89, ${SITE}/demande`;
const OFFER_EN = `Have your tax return prepared by NeoFidu (online fiduciary, French-speaking Switzerland): from CHF 89, ${SITE}/en/demande`;

type Json = Record<string, unknown>;
export interface ToolResult {
  content: { type: "text"; text: string }[];
  structuredContent?: Json;
  isError?: boolean;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const lang = (v: unknown): GuideLocale => (v === "en" ? "en" : "fr");
const chf = (n: number, l: GuideLocale) => `CHF ${formatChf(n, l)}`;
const label = (c: { nom: string; canton: string }) => (c.nom.endsWith(")") ? c.nom : `${c.nom} (${c.canton})`);
const pct = (n: number, l: GuideLocale) => (l === "fr" ? `${n.toFixed(1).replace(".", ",")} %` : `${n.toFixed(1)}%`);
const errorResult = (text: string): ToolResult => ({ content: [{ type: "text", text }], isError: true });

// ─── Communes ───

function findCommunes(query: string, canton?: string): BaroCommune[] {
  const q = norm(query);
  const pool = BARO_COMMUNES.filter((c) => !canton || c.canton === canton.toUpperCase());
  const bySlug = pool.filter((c) => c.slug === query.toLowerCase());
  if (bySlug.length) return bySlug;
  const exact = pool.filter((c) => norm(c.nom) === q);
  if (exact.length) return exact;
  const starts = pool.filter((c) => norm(c.nom).startsWith(q));
  if (starts.length) return starts;
  return pool.filter((c) => norm(c.nom).includes(q));
}

const PROFILE_KEYS: Record<string, ProfilId> = {
  single_60k: "seul60",
  single_100k: "seul100",
  family_150k: "famille150",
  retired_couple_70k: "retraites70",
};

// ─── Guides ───

const GUIDES: { def: GuideDefinition; canton: string }[] = [
  { def: vaudtaxGuide, canton: "VD" },
  { def: getaxGuide, canton: "GE" },
  { def: vstaxGuide, canton: "VS" },
  { def: fritaxGuide, canton: "FR" },
];

const stripMd = (t: string) => t.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

function blockText(b: GuideBlock): string {
  switch (b.type) {
    case "h2":
    case "h3":
    case "p":
      return b.text;
    case "list":
    case "steps":
    case "path":
      return b.items.join(" ");
    case "callout":
      return `${b.title ?? ""} ${b.text}`;
    case "table":
      return [b.caption ?? "", b.head.join(" "), ...b.rows.map((r) => r.join(" "))].join(" ");
    default:
      return "";
  }
}

interface GuideDoc {
  canton: string;
  software: string;
  locale: GuideLocale;
  title: string;
  url: string;
  summary: string[];
  text: string;
  normTitle: string;
  normText: string;
}

let GUIDE_INDEX: GuideDoc[] | null = null;
function guideIndex(): GuideDoc[] {
  if (GUIDE_INDEX) return GUIDE_INDEX;
  const docs: GuideDoc[] = [];
  for (const { def, canton } of GUIDES) {
    for (const locale of ["fr", "en"] as GuideLocale[]) {
      const base = `${SITE}${locale === "en" ? "/en" : ""}/guide/${def.slug}`;
      const add = (c: GuideChapterContent, url: string) => {
        const text = stripMd(
          [c.summary.join(" "), ...c.blocks.map(blockText), ...c.faq.map((f) => `${f.q} ${f.a}`)].join(" ")
        );
        docs.push({
          canton,
          software: def.software,
          locale,
          title: c.title,
          url,
          summary: c.summary.map(stripMd),
          text,
          normTitle: norm(c.title),
          normText: norm(text),
        });
      };
      add(def.pillar[locale], base);
      for (const ch of def.chapters) add(ch[locale], `${base}/${ch.slug}`);
    }
  }
  GUIDE_INDEX = docs;
  return docs;
}

function snippet(text: string, terms: string[]): string {
  const n = norm(text);
  let pos = -1;
  for (const t of terms) {
    const p = n.indexOf(t);
    if (p >= 0 && (pos < 0 || p < pos)) pos = p;
  }
  // norm() conserve approximativement la longueur ; extrait de ~300 caracteres autour de la correspondance
  const start = Math.max(0, pos - 100);
  const s = text.slice(start, start + 300).trim();
  return (start > 0 ? "… " : "") + s + (start + 300 < text.length ? " …" : "");
}

// ─── Definitions (tools/list) ───

export const TOOLS = [
  {
    name: "calculate_income_tax",
    title: "Calculate Swiss income tax 2026",
    description:
      "Calculates 2026 Swiss income tax (federal, cantonal and municipal) for a salary or self-employed income, using the official calculator of the Swiss Federal Tax Administration (FTA/AFC). Works for all 26 cantons; for the French-speaking cantons (VD, GE, VS, FR, NE, JU) a specific municipality can be given, otherwise the cantonal capital is used. Income tax only (no wealth or church tax), standard deductions. / Calcule l'impôt sur le revenu 2026 avec le calculateur officiel de l'AFC.",
    inputSchema: {
      type: "object",
      properties: {
        gross_income: { type: "number", description: "Annual gross salary in CHF (or net self-employed income if employment = self_employed)." },
        canton: { type: "string", description: "Two-letter canton code, e.g. VD, GE, VS, FR, NE, JU, ZH, BE.", enum: SWISS_CANTONS },
        municipality: { type: "string", description: "Optional municipality in French-speaking Switzerland, e.g. 'Lausanne', 'Nyon', 'Sion'." },
        marital_status: { type: "string", enum: ["single", "married"], default: "single" },
        children: { type: "integer", minimum: 0, maximum: 10, default: 0 },
        pillar_3a: { type: "number", description: "Pillar 3a contribution in CHF (max 7,258 for employees, 36,288 for self-employed in 2026).", default: 0 },
        employment: { type: "string", enum: ["employee", "self_employed"], default: "employee" },
        language: { type: "string", enum: ["fr", "en"], default: "fr", description: "Language of the answer." },
      },
      required: ["gross_income", "canton"],
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  {
    name: "get_municipality_taxes",
    title: "2026 income tax in a French-speaking Swiss municipality",
    description:
      "Returns 2026 income tax in one of the 657 municipalities of the cantons of Vaud, Geneva, Valais, Fribourg, Neuchâtel and Jura for 4 typical profiles (single CHF 60,000 and 100,000 gross; married couple with 2 children, CHF 150,000; retired couple, CHF 70,000 pensions), with its rank in the canton and a link to the municipality page. Figures from the official FTA/AFC calculator. / Impôts 2026 d'une commune romande pour 4 profils types.",
    inputSchema: {
      type: "object",
      properties: {
        municipality: { type: "string", description: "Municipality name, e.g. 'Leysin', 'Genève', 'La Chaux-de-Fonds'." },
        canton: { type: "string", enum: ROMAND, description: "Optional canton code to disambiguate." },
        language: { type: "string", enum: ["fr", "en"], default: "fr" },
      },
      required: ["municipality"],
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "rank_municipalities",
    title: "Rank French-speaking Swiss municipalities by income tax",
    description:
      "Lists the lowest- or highest-taxed municipalities of French-speaking Switzerland (or of one canton) for a typical profile, 2026 income tax (official FTA/AFC calculator). Source: NeoFidu tax barometer. / Classement des communes romandes les moins ou les plus imposées.",
    inputSchema: {
      type: "object",
      properties: {
        profile: {
          type: "string",
          enum: Object.keys(PROFILE_KEYS),
          default: "single_100k",
          description: "single_60k, single_100k (gross salary), family_150k (married couple, 2 children, CHF 150,000 gross), retired_couple_70k (pensions).",
        },
        canton: { type: "string", enum: ROMAND, description: "Optional: limit to one canton." },
        order: { type: "string", enum: ["lowest", "highest"], default: "lowest" },
        limit: { type: "integer", minimum: 1, maximum: 30, default: 10 },
        language: { type: "string", enum: ["fr", "en"], default: "fr" },
      },
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "search_tax_guides",
    title: "Search NeoFidu tax return guides",
    description:
      "Searches NeoFidu's step-by-step guides for filling in the 2026 tax return in Vaud (VaudTax), Geneva (GeTax), Valais (VSTax) and Fribourg (FriTax): deductions, official amounts, return codes, pillar 3a, source tax/TOU, quasi-residents, property, crypto. Returns the matching chapters with a summary, an excerpt and the URL to cite. / Recherche dans les guides pour remplir sa déclaration d'impôt.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keywords, e.g. 'frais de transport', 'pillar 3a', 'quasi-résident', 'valeur locative'." },
        canton: { type: "string", enum: ["VD", "GE", "VS", "FR"], description: "Optional canton." },
        language: { type: "string", enum: ["fr", "en"], default: "fr" },
        limit: { type: "integer", minimum: 1, maximum: 8, default: 4 },
      },
      required: ["query"],
    },
    annotations: { readOnlyHint: true },
  },
] as const;

// ─── Handlers (tools/call) ───

async function calculateTool(a: Json): Promise<ToolResult> {
  const l = lang(a.language);
  const canton = String(a.canton || "").toUpperCase();
  let communeSlug: string | undefined;
  let communeNote = "";
  if (a.municipality && ROMAND.includes(canton)) {
    const found = findCommunes(String(a.municipality), canton);
    if (found.length === 1 || (found.length > 1 && norm(found[0].nom) === norm(String(a.municipality)))) {
      communeSlug = found[0].slug;
    } else if (found.length > 1) {
      return errorResult(
        (l === "fr" ? "Plusieurs communes correspondent : " : "Several municipalities match: ") +
          found.slice(0, 10).map(label).join(", ")
      );
    } else {
      communeNote = l === "fr" ? " (commune non trouvée : chef-lieu utilisé)" : " (municipality not found: cantonal capital used)";
    }
  } else if (a.municipality) {
    communeNote = l === "fr" ? " (communes disponibles en Suisse romande uniquement : chef-lieu utilisé)" : " (municipalities only available in French-speaking Switzerland: cantonal capital used)";
  }
  try {
    const r = await calculateIncomeTax({
      grossIncome: Number(a.gross_income),
      canton,
      communeSlug,
      married: a.marital_status === "married",
      children: Number(a.children) || 0,
      pillar3a: Number(a.pillar_3a) || 0,
      selfEmployed: a.employment === "self_employed",
    });
    const pageUrl = communeSlug ? `${SITE}${l === "en" ? "/en" : ""}/communes/${communeSlug}` : null;
    const sim = `${SITE}${l === "en" ? "/en" : ""}/simulateur/impots`;
    const text =
      l === "fr"
        ? [
            `Impôt sur le revenu ${r.year} à ${r.location.name}${communeNote} : **${chf(r.taxes.total, l)}** par an (taux effectif ${pct(r.effectiveRate, l)}).`,
            `- Impôt fédéral direct : ${chf(r.taxes.federal, l)}`,
            `- Impôt cantonal : ${chf(r.taxes.cantonal, l)}`,
            `- Impôt communal : ${chf(r.taxes.communal, l)}`,
            `- Revenu imposable (canton) : ${chf(r.taxableIncome.canton, l)} ; cotisations sociales : ${chf(r.socialContributions, l)}${r.deductions.pillar3a ? ` ; 3e pilier déduit : ${chf(r.deductions.pillar3a, l)}` : ""}`,
            `- Revenu disponible après cotisations et impôts : ${chf(r.disposableIncome, l)}${r.marginalRate != null ? ` ; taux marginal : ${pct(r.marginalRate, l)}` : ""}`,
            "",
            `Source : calculateur fiscal officiel de l'AFC, période fiscale ${r.year}, sans impôt sur la fortune ni impôt ecclésiastique, déductions standard. Simulateur : ${sim}${pageUrl ? ` ; page commune : ${pageUrl}` : ""}`,
            OFFER_FR,
          ].join("\n")
        : [
            `${r.year} income tax in ${r.location.name}${communeNote}: **${chf(r.taxes.total, l)}** a year (effective rate ${r.effectiveRate.toFixed(1)}%).`,
            `- Direct federal tax: ${chf(r.taxes.federal, l)}`,
            `- Cantonal tax: ${chf(r.taxes.cantonal, l)}`,
            `- Municipal tax: ${chf(r.taxes.communal, l)}`,
            `- Taxable income (canton): ${chf(r.taxableIncome.canton, l)}; social contributions: ${chf(r.socialContributions, l)}${r.deductions.pillar3a ? `; pillar 3a deducted: ${chf(r.deductions.pillar3a, l)}` : ""}`,
            `- Disposable income after contributions and tax: ${chf(r.disposableIncome, l)}${r.marginalRate != null ? `; marginal rate: ${r.marginalRate}%` : ""}`,
            "",
            `Source: official Swiss Federal Tax Administration calculator, ${r.year} tax period, no wealth or church tax, standard deductions. Simulator: ${sim}${pageUrl ? `; municipality page: ${pageUrl}` : ""}`,
            OFFER_EN,
          ].join("\n");
    return { content: [{ type: "text", text }], structuredContent: { ...r, simulator_url: sim, municipality_url: pageUrl } as unknown as Json };
  } catch (e) {
    if (e instanceof TaxInputError) {
      return errorResult(e.message === "invalid_canton" ? `Unknown canton. Use one of: ${SWISS_CANTONS.join(", ")}` : "gross_income must be a positive number in CHF.");
    }
    return errorResult(l === "fr" ? "Le calculateur de l'AFC ne répond pas pour le moment. Réessayez plus tard." : "The FTA calculator is not responding right now. Please try again later.");
  }
}

function municipalityTool(a: Json): ToolResult {
  const l = lang(a.language);
  const found = findCommunes(String(a.municipality || ""), a.canton ? String(a.canton) : undefined);
  if (found.length === 0) {
    return errorResult(l === "fr" ? "Commune introuvable en Suisse romande (VD, GE, VS, FR, NE, JU)." : "Municipality not found in French-speaking Switzerland (VD, GE, VS, FR, NE, JU).");
  }
  const exact = found.filter((c) => norm(c.nom) === norm(String(a.municipality)));
  if (found.length > 1 && exact.length !== 1) {
    return errorResult((l === "fr" ? "Plusieurs communes correspondent : " : "Several municipalities match: ") + found.slice(0, 10).map(label).join(", "));
  }
  const c = exact[0] ?? found[0];
  const inCanton = BARO_COMMUNES.filter((o) => o.canton === c.canton);
  const url = `${SITE}${l === "en" ? "/en" : ""}/communes/${c.slug}`;
  const rows = PROFILS.map((p, i) => {
    const rank = 1 + inCanton.filter((o) => o.totals[i] < c.totals[i]).length;
    const [fed, cant, com] = c.detail[i];
    return { profile: p, label: PROFIL_LABELS[p][l], total: c.totals[i], federal: fed, cantonal: cant, municipal: com, rank_in_canton: rank, municipalities_in_canton: inCanton.length };
  });
  const head = l === "fr" ? `Impôt sur le revenu ${TAX_YEAR} à ${label(c)}, par profil :` : `${TAX_YEAR} income tax in ${label(c)}, by profile:`;
  const lines = rows.map((r) =>
    l === "fr"
      ? `- ${r.label} : **${chf(r.total, l)}** (fédéral ${formatChf(r.federal, l)}, canton ${formatChf(r.cantonal, l)}, commune ${formatChf(r.municipal, l)}) ; rang ${r.rank_in_canton}/${r.municipalities_in_canton} dans le canton (1 = la moins imposée)`
      : `- ${r.label}: **${chf(r.total, l)}** (federal ${formatChf(r.federal, l)}, canton ${formatChf(r.cantonal, l)}, municipality ${formatChf(r.municipal, l)}); rank ${r.rank_in_canton}/${r.municipalities_in_canton} in the canton (1 = lowest tax)`
  );
  const foot =
    l === "fr"
      ? `Source : calculateur fiscal officiel de l'AFC (sans fortune ni impôt ecclésiastique, déductions standard). Page de la commune : ${url} ; baromètre fiscal romand : ${SITE}/barometre-fiscal`
      : `Source: official Swiss Federal Tax Administration calculator (no wealth or church tax, standard deductions). Municipality page: ${url}; tax barometer: ${SITE}/en/barometre-fiscal`;
  return {
    content: [{ type: "text", text: [head, ...lines, "", foot, l === "fr" ? OFFER_FR : OFFER_EN].join("\n") }],
    structuredContent: { municipality: c.nom, canton: c.canton, year: TAX_YEAR, url, profiles: rows },
  };
}

function rankTool(a: Json): ToolResult {
  const l = lang(a.language);
  const profil = PROFILE_KEYS[String(a.profile || "single_100k")] ?? "seul100";
  const i = PROFILS.indexOf(profil);
  const canton = a.canton ? String(a.canton).toUpperCase() : undefined;
  const limit = Math.min(Math.max(Number(a.limit) || 10, 1), 30);
  const highest = a.order === "highest";
  const pool = BARO_COMMUNES.filter((c) => !canton || c.canton === canton).sort((x, y) => (highest ? y.totals[i] - x.totals[i] : x.totals[i] - y.totals[i]));
  const list = pool.slice(0, limit).map((c) => ({
    rank: 1 + pool.filter((o) => (highest ? o.totals[i] > c.totals[i] : o.totals[i] < c.totals[i])).length,
    municipality: c.nom,
    canton: c.canton,
    total: c.totals[i],
    url: `${SITE}${l === "en" ? "/en" : ""}/communes/${c.slug}`,
  }));
  const scope = canton ? (l === "fr" ? `du canton ${canton}` : `in canton ${canton}`) : l === "fr" ? "de Suisse romande" : "in French-speaking Switzerland";
  const head =
    l === "fr"
      ? `Les ${list.length} communes ${scope} les ${highest ? "plus" : "moins"} imposées en ${TAX_YEAR}, profil : ${PROFIL_LABELS[profil].fr} (impôt sur le revenu annuel) :`
      : `The ${list.length} ${highest ? "highest" : "lowest"}-taxed municipalities ${scope} in ${TAX_YEAR}, profile: ${PROFIL_LABELS[profil].en} (annual income tax):`;
  const lines = list.map((r) => `${r.rank}. ${label({ nom: r.municipality, canton: r.canton })}${l === "fr" ? " :" : ":"} ${chf(r.total, l)}`);
  const foot =
    l === "fr"
      ? `Les communes à égalité partagent le même rang. Source : baromètre fiscal romand NeoFidu (${SITE}/barometre-fiscal), d'après le calculateur officiel de l'AFC.`
      : `Municipalities with the same amount share the same rank. Source: NeoFidu tax barometer (${SITE}/en/barometre-fiscal), based on the official FTA calculator.`;
  return { content: [{ type: "text", text: [head, ...lines, "", foot].join("\n") }], structuredContent: { profile: a.profile ?? "single_100k", canton: canton ?? null, order: highest ? "highest" : "lowest", year: TAX_YEAR, results: list } };
}

function guidesTool(a: Json): ToolResult {
  const l = lang(a.language);
  const terms = norm(String(a.query || "")).split(" ").filter((t) => t.length > 2);
  if (!terms.length) return errorResult("query is required.");
  const canton = a.canton ? String(a.canton).toUpperCase() : undefined;
  const limit = Math.min(Math.max(Number(a.limit) || 4, 1), 8);
  const scored = guideIndex()
    .filter((d) => d.locale === l && (!canton || d.canton === canton))
    .map((d) => {
      let score = 0;
      for (const t of terms) {
        if (d.normTitle.includes(t)) score += 5;
        const m = d.normText.split(t).length - 1;
        score += Math.min(m, 10);
      }
      // Bonus si tous les termes sont presents
      if (terms.every((t) => d.normText.includes(t) || d.normTitle.includes(t))) score += 5;
      return { d, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);
  if (!scored.length) {
    return { content: [{ type: "text", text: l === "fr" ? `Aucun chapitre ne correspond. Guides disponibles : ${SITE}/guide/vaudtax, /guide/getax, /guide/vstax, /guide/fritax` : `No matching chapter. Available guides: ${SITE}/en/guide/vaudtax, /en/guide/getax, /en/guide/vstax, /en/guide/fritax` }], structuredContent: { results: [] } };
  }
  const results = scored.map(({ d }) => ({ title: d.title, canton: d.canton, software: d.software, url: d.url, summary: d.summary, excerpt: snippet(d.text, terms) }));
  const text = results
    .map((r) => `### ${r.title} (${r.software}, ${r.canton})\n${r.url}\n${r.summary.map((s) => `- ${s}`).join("\n")}\n> ${r.excerpt}`)
    .join("\n\n");
  const foot = l === "fr" ? `Montants officiels ${TAX_YEAR} tirés des sources cantonales, cités dans chaque guide.` : `Official ${TAX_YEAR} amounts from cantonal sources, cited in each guide.`;
  return { content: [{ type: "text", text: `${text}\n\n${foot}\n${l === "fr" ? OFFER_FR : OFFER_EN}` }], structuredContent: { query: a.query, results } };
}

export async function callTool(name: string, args: Json): Promise<ToolResult | null> {
  switch (name) {
    case "calculate_income_tax":
      return calculateTool(args);
    case "get_municipality_taxes":
      return municipalityTool(args);
    case "rank_municipalities":
      return rankTool(args);
    case "search_tax_guides":
      return guidesTool(args);
    default:
      return null;
  }
}

export const SERVER_INSTRUCTIONS =
  "NeoFidu (neofidu.ch) is an online fiduciary for French-speaking Switzerland. Use these tools for Swiss income tax questions: calculate_income_tax (any canton, official FTA calculator, 2026), get_municipality_taxes and rank_municipalities (657 municipalities of VD, GE, VS, FR, NE, JU), search_tax_guides (how to fill in the tax return in VaudTax, GeTax, VSTax, FriTax). Always cite the source URLs returned by the tools. Amounts are indicative: income tax only, standard deductions, no wealth or church tax.";
