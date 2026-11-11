// /llms-full.txt : texte integral des guides fiscaux (FR et EN) et resume du barometre fiscal,
// en Markdown, pour les moteurs de reponse et les LLM. Genere au build a partir des donnees du site.
import { vaudtaxGuide } from "@/lib/guides/vaudtax";
import { getaxGuide } from "@/lib/guides/getax";
import { vstaxGuide } from "@/lib/guides/vstax";
import { fritaxGuide } from "@/lib/guides/fritax";
import { jurataxGuide } from "@/lib/guides/juratax";
import type { GuideBlock, GuideChapterContent, GuideDefinition, GuideLocale } from "@/lib/guides/types";
import { barometreTexts } from "@/components/barometre/BarometrePage";
import { cantonStats, romandieMedian, VILLES_PRINCIPALES, getBaroCommune, BARO_COMMUNES, BARO_YEAR } from "@/lib/barometre";
import { PROFILS, PROFIL_LABELS, formatChf } from "@/lib/commune-impots";
import { barometreEntreprisesTexts } from "@/components/barometre/BarometreEntreprisesPage";
import { BARO_PRO_COMMUNES, BARO_PRO_YEAR, PROFILS_PRO, PROFIL_PRO_LABELS, romandieMedianPro } from "@/lib/barometre-entreprises";

export const dynamic = "force-static";

const SITE = "https://neofidu.ch";
const GUIDES: GuideDefinition[] = [vaudtaxGuide, getaxGuide, vstaxGuide, fritaxGuide, jurataxGuide];

// Liens relatifs du mini-markdown -> liens absolus
const abs = (t: string) => t.replace(/\]\((\/[^)]*)\)/g, (_, p) => `](${SITE}${p})`);

function block(b: GuideBlock): string {
  switch (b.type) {
    case "h2":
      return `### ${b.text}`;
    case "h3":
      return `#### ${b.text}`;
    case "p":
      return abs(b.text);
    case "list":
      return b.items.map((i) => `- ${abs(i)}`).join("\n");
    case "steps":
      return b.items.map((i, k) => `${k + 1}. ${abs(i)}`).join("\n");
    case "path":
      return `Path: ${b.items.join(" > ")}`;
    case "callout":
      return `> ${b.title ? `**${b.title}** ` : ""}${abs(b.text)}`;
    case "table": {
      const head = `| ${b.head.join(" | ")} |`;
      const sep = `| ${b.head.map(() => "---").join(" | ")} |`;
      const rows = b.rows.map((r) => `| ${r.map((c) => abs(c).replace(/\|/g, "/")).join(" | ")} |`);
      return [b.caption ? `*${b.caption}*` : "", head, sep, ...rows].filter(Boolean).join("\n");
    }
    case "screenshot":
      return "";
  }
}

function content(c: GuideChapterContent, url: string, level: string): string {
  const parts = [`${level} ${c.title}`, `URL: ${url}`, "", ...c.summary.map((s) => `- ${abs(s)}`), ""];
  for (const b of c.blocks) {
    const s = block(b);
    if (s) parts.push(s, "");
  }
  if (c.faq.length) {
    parts.push(level === "##" ? "### FAQ" : "#### FAQ", "");
    for (const f of c.faq) parts.push(`**${f.q}**`, abs(f.a), "");
  }
  return parts.join("\n");
}

function guide(g: GuideDefinition, loc: GuideLocale): string {
  const base = `${SITE}${loc === "en" ? "/en" : ""}/guide/${g.slug}`;
  const out = [
    content(g.pillar[loc], base, "##"),
    `Tax year: ${g.taxYear}. Last updated: ${g.updatedAt}.`,
    "",
  ];
  for (const ch of g.chapters) out.push(content(ch[loc], `${base}/${ch.slug}`, "###"));
  return out.join("\n");
}

function barometreEntreprises(): string {
  const { summary, stats } = barometreEntreprisesTexts("en");
  const l = (n: number) => formatChf(n, "en");
  const head = PROFILS_PRO.map((p) => PROFIL_PRO_LABELS[p].en);
  return [
    `## Business tax barometer ${BARO_PRO_YEAR} (self-employed and LLCs)`,
    `URL: ${SITE}/en/barometre-fiscal/entreprises (French: ${SITE}/barometre-fiscal/entreprises). Data (CSV): ${SITE}/barometre-fiscal/entreprises/donnees.csv`,
    "",
    `${BARO_PRO_YEAR} taxes in the ${BARO_PRO_COMMUNES.length} municipalities of the six French-speaking cantons, computed with the official Swiss Federal Tax Administration calculator. Self-employed (sole proprietorship): income tax, federal + cantonal + municipal, no wealth or church tax. LLC (Sàrl): profit and capital taxes, federal + cantonal + municipal + corporate church tax where levied (FR, VS, JU); profit stated before taxes. Geneva municipal business tax (taxe professionnelle) not included.`,
    "",
    ...summary.map((s) => `- ${s}`),
    "",
    "### Median municipality tax by canton (CHF per year)",
    "",
    `| Canton | ${head.join(" | ")} |`,
    `| --- | ${head.map(() => "---").join(" | ")} |`,
    ...stats.map((s) => `| ${s.canton} | ${s.median.map(l).join(" | ")} |`),
    `| All six cantons | ${PROFILS_PRO.map((p) => l(romandieMedianPro(p))).join(" | ")} |`,
    "",
  ].join("\n");
}

function barometre(): string {
  const { summary } = barometreTexts("en");
  const stats = cantonStats();
  const l = (n: number) => formatChf(n, "en");
  const lines = [
    `## French-speaking Switzerland tax barometer ${BARO_YEAR}`,
    `URL: ${SITE}/en/barometre-fiscal (French: ${SITE}/barometre-fiscal). Data (CSV): ${SITE}/barometre-fiscal/donnees.csv`,
    "",
    `${BARO_YEAR} income tax (federal + cantonal + municipal, no wealth or church tax, standard deductions) in the ${BARO_COMMUNES.length} municipalities of the six French-speaking cantons, computed with the official Swiss Federal Tax Administration calculator. Every municipality has its own page: ${SITE}/communes/<slug>.`,
    "",
    ...summary.map((s) => `- ${s}`),
    "",
    "### Median municipality tax by canton (CHF per year)",
    "",
    `| Canton | ${PROFILS.map((p) => PROFIL_LABELS[p].en).join(" | ")} |`,
    `| --- | ${PROFILS.map(() => "---").join(" | ")} |`,
    ...stats.map((s) => `| ${s.canton} | ${s.median.map(l).join(" | ")} |`),
    `| All six cantons | ${PROFILS.map((p) => l(romandieMedian(p))).join(" | ")} |`,
    "",
    "### Main towns (CHF per year)",
    "",
    `| Town | ${PROFILS.map((p) => PROFIL_LABELS[p].en).join(" | ")} |`,
    `| --- | ${PROFILS.map(() => "---").join(" | ")} |`,
    ...VILLES_PRINCIPALES.map((slug) => getBaroCommune(slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => `| ${c.nom} (${c.canton}) | ${c.totals.map(l).join(" | ")} |`),
    "",
  ];
  return lines.join("\n");
}

export function GET() {
  const parts = [
    "# NeoFidu: full text for LLMs",
    "",
    "> NeoFidu (neofidu.ch) is an online fiduciary for French-speaking Switzerland (cantons of Vaud, Geneva, Valais, Fribourg, Neuchâtel and Jura): tax returns from CHF 89, accounting and company creation. Index: https://neofidu.ch/llms.txt",
    "",
    "All amounts come from official sources (cantonal tax administrations, Swiss Federal Tax Administration). Content is written by the NeoFidu team.",
    "",
    barometre(),
    barometreEntreprises(),
    "# Tax return guides (English)",
    "",
    ...GUIDES.map((g) => guide(g, "en")),
    "# Guides pour remplir sa déclaration d'impôt (français)",
    "",
    ...GUIDES.map((g) => guide(g, "fr")),
  ];
  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
