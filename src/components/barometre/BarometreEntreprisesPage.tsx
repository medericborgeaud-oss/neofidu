// src/components/barometre/BarometreEntreprisesPage.tsx
// Page "Barometre fiscal des entreprises 2026" (FR et EN) : independants (raison individuelle)
// et petites Sarl dans les 657 communes romandes. Composant serveur.

import Link from "next/link";
import { ChevronRight, Download, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BarometreTable } from "./BarometreTable";
import { formatChf } from "@/lib/commune-impots";
import { CANTON_NAMES } from "@/lib/communes";
import { ESTV_URL } from "@/lib/barometre";
import {
  BARO_PRO_COMMUNES,
  BARO_PRO_UPDATED,
  BARO_PRO_YEAR,
  PROFILS_PRO,
  PROFIL_PRO_LABELS,
  PROFIL_PRO_SHORT,
  cantonProStats,
  getBaroProCommune,
  proIndex,
  rankingPro,
  romandieMedianPro,
  type ProfilProId,
} from "@/lib/barometre-entreprises";

type Lang = "fr" | "en";

const CANTON_NAMES_EN: Record<string, string> = {
  VD: "Vaud",
  GE: "Geneva",
  VS: "Valais",
  FR: "Fribourg",
  NE: "Neuchâtel",
  JU: "Jura",
};

const VILLES = [
  "lausanne-vd",
  "geneve-ge",
  "fribourg-fr",
  "sion-vs",
  "neuchatel-ne",
  "delemont-ju",
  "la-chaux-de-fonds-ne",
  "yverdon-les-bains-vd",
  "montreux-vd",
  "bulle-fr",
  "martigny-vs",
  "nyon-vd",
];

/** Benefice ou revenu de reference de chaque profil, pour le taux effectif */
const BASE: Record<ProfilProId, number> = { ri80: 80000, ri120fam: 120000, sarl50: 50000, sarl150: 150000 };

export function barometreEntreprisesTexts(lang: Lang) {
  const fr = lang === "fr";
  const l = (n: number) => formatChf(n, lang);
  const cn = (code: string) => (fr ? CANTON_NAMES[code] : CANTON_NAMES_EN[code]) ?? code;
  const cantonDe = (code: string) =>
    fr ? (["VS", "JU"].includes(code) ? "canton du " : "canton de ") + cn(code) : `canton of ${cn(code)}`;
  const pct = (n: number, p: ProfilProId) =>
    ((n / BASE[p]) * 100).toFixed(1).replace(".", fr ? "," : ".") + (fr ? " %" : "%");

  /** "Greng, FR" ou "Basse-Allaine, Coeuve et Fontenais, JU" ou "Agarn, VS, et 120 autres communes" */
  const extreme = (p: ProfilProId, worst = false) => {
    const i = proIndex(p);
    const r = rankingPro(p);
    const v = worst ? r[r.length - 1].totals[i] : r[0].totals[i];
    const tied = r.filter((c) => c.totals[i] === v);
    const cantons = new Set(tied.map((c) => c.canton));
    let label: string;
    if (tied.length === 1) label = `${tied[0].nom}, ${tied[0].canton}`;
    else if (tied.length <= 3 && cantons.size === 1) {
      const names = tied.map((c) => c.nom);
      label = `${names.slice(0, -1).join(", ")} ${fr ? "et" : "and"} ${names[names.length - 1]}, ${tied[0].canton}`;
    } else
      label = fr
        ? `${tied[0].nom}, ${tied[0].canton}, et ${tied.length - 1} autres communes`
        : `${tied[0].nom}, ${tied[0].canton}, and ${tied.length - 1} other municipalities`;
    return { label, total: v, n: tied.length, first: tied[0] };
  };

  const stats = cantonProStats();
  const byMedian = (p: ProfilProId) => {
    const i = proIndex(p);
    const s = [...stats].sort((a, b) => a.median[i] - b.median[i]);
    return { lo: s[0], hi: s[s.length - 1], i };
  };
  // Cantons ou l'impot d'une Sarl ne depend presque pas de la commune
  const iS50 = proIndex("sarl50");
  const flat = stats.filter((s) => s.max[iS50] - s.min[iS50] < 100).map((s) => s.canton);
  const flatTxt = flat.length
    ? fr
      ? flat.map((c) => (["VS", "JU"].includes(c) ? "du " : "de ") + cn(c)).join(" et ")
      : flat.map(cn).join(" and ")
    : "";

  const s50lo = extreme("sarl50");
  const s50hi = extreme("sarl50", true);
  const m150 = byMedian("sarl150");
  const r80lo = extreme("ri80");
  const r80hi = extreme("ri80", true);
  const mFam = byMedian("ri120fam");

  const summary = fr
    ? [
        `Pour une Sàrl qui réalise CHF 50'000 de bénéfice, les impôts ${BARO_PRO_YEAR} sur le bénéfice et le capital (fédéral, cantonal, communal et ecclésiastique) vont de CHF ${l(s50lo.total)} (${s50lo.label}) à CHF ${l(s50hi.total)} (${s50hi.label}), soit de ${pct(s50lo.total, "sarl50")} à ${pct(s50hi.total, "sarl50")} du bénéfice.`,
        `Pour une Sàrl à CHF 150'000 de bénéfice, la commune médiane la moins imposée se trouve dans le ${cantonDe(m150.lo.canton)} (CHF ${l(m150.lo.median[m150.i])}) et la plus imposée dans le ${cantonDe(m150.hi.canton)} (CHF ${l(m150.hi.median[m150.i])}).`,
        `Pour un indépendant seul avec CHF 80'000 de revenu d'activité, l'impôt sur le revenu va de CHF ${l(r80lo.total)} (${r80lo.label}) à CHF ${l(r80hi.total)} (${r80hi.label}) : CHF ${l(r80hi.total - r80lo.total)} d'écart par an pour le même revenu.`,
        `Pour un indépendant marié avec 2 enfants et CHF 120'000 de revenu d'activité, la médiane cantonale va de CHF ${l(mFam.lo.median[mFam.i])} (${cantonDe(mFam.lo.canton)}) à CHF ${l(mFam.hi.median[mFam.i])} (${cantonDe(mFam.hi.canton)}).`,
        ...(flat.length
          ? [
              `Dans les cantons ${flatTxt}, l'impôt d'une Sàrl est pratiquement le même dans toutes les communes (moins de CHF 100 d'écart à CHF 50'000 de bénéfice) : le choix du siège s'y joue entre cantons, pas entre communes.`,
            ]
          : []),
      ]
    : [
        `For an LLC (Sàrl) making a CHF 50,000 profit, ${BARO_PRO_YEAR} profit and capital taxes (federal, cantonal, municipal and church) range from CHF ${l(s50lo.total)} (${s50lo.label}) to CHF ${l(s50hi.total)} (${s50hi.label}), i.e. ${pct(s50lo.total, "sarl50")} to ${pct(s50hi.total, "sarl50")} of profit.`,
        `For an LLC with a CHF 150,000 profit, the lowest-taxed median municipality is in the ${cantonDe(m150.lo.canton)} (CHF ${l(m150.lo.median[m150.i])}) and the highest in the ${cantonDe(m150.hi.canton)} (CHF ${l(m150.hi.median[m150.i])}).`,
        `For a single self-employed person with CHF 80,000 of business income, income tax ranges from CHF ${l(r80lo.total)} (${r80lo.label}) to CHF ${l(r80hi.total)} (${r80hi.label}): a gap of CHF ${l(r80hi.total - r80lo.total)} a year for the same income.`,
        `For a married self-employed person with 2 children and CHF 120,000 of business income, the cantonal median ranges from CHF ${l(mFam.lo.median[mFam.i])} (${cantonDe(mFam.lo.canton)}) to CHF ${l(mFam.hi.median[mFam.i])} (${cantonDe(mFam.hi.canton)}).`,
        ...(flat.length
          ? [
              `In the cantons of ${flatTxt}, an LLC pays practically the same tax in every municipality (less than CHF 100 apart on a CHF 50,000 profit): the choice of registered office there is between cantons, not municipalities.`,
            ]
          : []),
      ];

  const s150lo = extreme("sarl150");
  const faq = fr
    ? [
        {
          q: "Dans quelle commune romande une Sàrl paie-t-elle le moins d'impôts en 2026 ?",
          a: `Pour CHF 50'000 de bénéfice, c'est ${s50lo.label}, avec CHF ${l(s50lo.total)} d'impôts sur le bénéfice et le capital (fédéral, cantonal, communal et ecclésiastique). Pour CHF 150'000 de bénéfice, c'est ${s150lo.label}, avec CHF ${l(s150lo.total)}. La plus imposée est ${s50hi.label} (CHF ${l(s50hi.total)} pour CHF 50'000 de bénéfice).`,
        },
        {
          q: "Quel canton romand est le plus avantageux pour un indépendant ?",
          a: `Cela dépend de la situation familiale. Pour un indépendant seul avec CHF 80'000 de revenu d'activité, la commune médiane la moins imposée se trouve dans le ${cantonDe(byMedian("ri80").lo.canton)} (CHF ${l(byMedian("ri80").lo.median[proIndex("ri80")])}). Pour un indépendant marié avec 2 enfants et CHF 120'000, c'est le ${cantonDe(mFam.lo.canton)} (CHF ${l(mFam.lo.median[mFam.i])}), grâce au splitting et aux rabais pour enfants. Le ${cantonDe(mFam.hi.canton)} est le plus cher pour les deux profils.`,
        },
        {
          q: "L'impôt d'une Sàrl dépend-il de la commune du siège ?",
          a: flat.length
            ? `Peu, et parfois pas du tout. Dans les cantons ${flatTxt}, l'écart entre communes est inférieur à CHF 100 pour une Sàrl à CHF 50'000 de bénéfice. Ailleurs, le coefficient communal joue davantage, mais l'écart entre cantons reste plus important que l'écart entre communes d'un même canton.`
            : "Oui, mais l'écart entre cantons reste plus important que l'écart entre communes d'un même canton.",
        },
        {
          q: "D'où viennent ces chiffres ?",
          a: `Tous les montants ont été calculés avec le calculateur fiscal officiel de l'Administration fédérale des contributions (AFC), pour la période fiscale ${BARO_PRO_YEAR}. Pour les Sàrl : impôt sur le bénéfice et sur le capital (fédéral, cantonal, communal, et ecclésiastique là où il est dû). Pour les indépendants : impôt sur le revenu (fédéral, cantonal, communal), sans fortune ni impôt ecclésiastique, avec les déductions standard.`,
        },
      ]
    : [
        {
          q: "Which French-speaking Swiss municipality has the lowest taxes for an LLC in 2026?",
          a: `For a CHF 50,000 profit, it is ${s50lo.label}, with CHF ${l(s50lo.total)} in profit and capital taxes (federal, cantonal, municipal and church). For a CHF 150,000 profit, it is ${s150lo.label}, with CHF ${l(s150lo.total)}. The highest-taxed is ${s50hi.label} (CHF ${l(s50hi.total)} on a CHF 50,000 profit).`,
        },
        {
          q: "Which French-speaking canton is cheapest for a self-employed person?",
          a: `It depends on family situation. For a single self-employed person with CHF 80,000 of business income, the lowest-taxed median municipality is in the ${cantonDe(byMedian("ri80").lo.canton)} (CHF ${l(byMedian("ri80").lo.median[proIndex("ri80")])}). For a married self-employed person with 2 children and CHF 120,000, it is the ${cantonDe(mFam.lo.canton)} (CHF ${l(mFam.lo.median[mFam.i])}), thanks to income splitting and child rebates. The ${cantonDe(mFam.hi.canton)} is the most expensive for both profiles.`,
        },
        {
          q: "Does an LLC's tax depend on the municipality of its registered office?",
          a: flat.length
            ? `Only a little, sometimes not at all. In the cantons of ${flatTxt}, the gap between municipalities is under CHF 100 for an LLC with a CHF 50,000 profit. Elsewhere the municipal multiplier matters more, but the gap between cantons remains larger than within a canton.`
            : "Yes, but the gap between cantons remains larger than between municipalities of the same canton.",
        },
        {
          q: "Where do these figures come from?",
          a: `All amounts were computed with the official tax calculator of the Swiss Federal Tax Administration (FTA) for the ${BARO_PRO_YEAR} tax period. For LLCs: profit and capital tax (federal, cantonal, municipal, and church tax where due). For the self-employed: income tax (federal, cantonal, municipal), with no wealth or church tax and standard deductions.`,
        },
      ];

  return { summary, faq, stats, cn, extreme, pct };
}

export function BarometreEntreprisesPage({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  const l = (n: number) => formatChf(n, lang);
  const base = fr ? "" : "/en";
  const { summary, faq, stats, cn, extreme, pct } = barometreEntreprisesTexts(lang);
  const labels = PROFILS_PRO.map((p) => PROFIL_PRO_LABELS[p][lang]);
  const short = PROFILS_PRO.map((p) => PROFIL_PRO_SHORT[p][lang]);
  const url = `https://neofidu.ch${base}/barometre-fiscal/entreprises`;
  const csvUrl = "/barometre-fiscal/entreprises/donnees.csv";
  const updated = fr ? "11 novembre 2026" : "11 November 2026";
  const villes = VILLES.map((s) => getBaroProCommune(s)!).filter(Boolean);
  const n = BARO_PRO_COMMUNES.length;
  const title = fr
    ? `Baromètre fiscal des entreprises ${BARO_PRO_YEAR} : indépendants et Sàrl, commune par commune`
    : `Business tax barometer ${BARO_PRO_YEAR}: self-employed and LLCs, municipality by municipality`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: fr ? `Baromètre fiscal romand des entreprises ${BARO_PRO_YEAR}` : `French-speaking Switzerland business tax barometer ${BARO_PRO_YEAR}`,
      description: fr
        ? `Impôts ${BARO_PRO_YEAR} d'un indépendant (raison individuelle) et d'une petite Sàrl dans les ${n} communes des cantons de Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura, pour 4 profils types. Calculé avec le calculateur fiscal officiel de l'AFC.`
        : `${BARO_PRO_YEAR} taxes of a self-employed person (sole proprietorship) and of a small LLC (Sàrl) in the ${n} municipalities of the cantons of Vaud, Geneva, Valais, Fribourg, Neuchâtel and Jura, for 4 typical profiles. Computed with the official Swiss Federal Tax Administration calculator.`,
      url,
      inLanguage: fr ? "fr-CH" : "en",
      temporalCoverage: String(BARO_PRO_YEAR),
      spatialCoverage: { "@type": "Place", name: fr ? "Suisse romande" : "French-speaking Switzerland" },
      dateModified: BARO_PRO_UPDATED,
      creator: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
      isBasedOn: ESTV_URL,
      license: "https://creativecommons.org/licenses/by/4.0/",
      distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `https://neofidu.ch${csvUrl}` }],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const th = "px-3 py-2 text-right font-semibold";
  const td = "px-3 py-2 text-right tabular-nums";

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique genere cote serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="flex-1 bg-background pt-20 md:pt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Breadcrumb" className="pt-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href={base || "/"} className="hover:text-primary">
                  {fr ? "Accueil" : "Home"}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li>
                <Link href={`${base}/barometre-fiscal`} className="hover:text-primary">
                  {fr ? "Baromètre fiscal" : "Tax barometer"}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li className="text-foreground">{fr ? "Entreprises" : "Businesses"}</li>
            </ol>
          </nav>

          <article className="py-8">
            <header className="mb-8">
              <p className="text-sm font-semibold text-primary mb-2">
                {fr ? `Données ${BARO_PRO_YEAR} · ${n} communes` : `${BARO_PRO_YEAR} data · ${n} municipalities`}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">{title}</h1>
              <p className="text-sm text-muted-foreground">
                {fr ? "Par" : "By"} <span className="font-medium text-foreground">NeoFidu</span>
                {" · "}
                {fr ? "Mis à jour le" : "Updated"} <time dateTime={BARO_PRO_UPDATED}>{updated}</time>
                {" · "}
                {fr ? "Source : calculateur fiscal de l'AFC" : "Source: Swiss Federal Tax Administration calculator"}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {fr ? (
                  <>
                    Combien d&apos;impôts paie une petite entreprise selon la commune où elle est établie ? Le baromètre compare deux
                    formes juridiques : l&apos;indépendant en raison individuelle, imposé sur son revenu, et la Sàrl, imposée sur son
                    bénéfice et son capital. Pour les salariés et les retraités, consultez le{" "}
                    <Link href="/barometre-fiscal" className="text-primary underline">
                      baromètre fiscal des particuliers
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    How much tax does a small business pay depending on its municipality? The barometer compares two legal forms: the
                    self-employed sole proprietor, taxed on income, and the LLC (Sàrl), taxed on profit and capital. For employees and
                    retirees, see the{" "}
                    <Link href="/en/barometre-fiscal" className="text-primary underline">
                      personal tax barometer
                    </Link>
                    .
                  </>
                )}
              </p>
            </header>

            <section aria-label={fr ? "En bref" : "Key findings"} className="mb-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
              <h2 className="text-base font-bold text-foreground mb-3">{fr ? "En bref" : "Key findings"}</h2>
              <ul className="space-y-2">
                {summary.map((s) => (
                  <li key={s} className="flex gap-2 text-sm text-foreground/90 leading-relaxed">
                    <span className="text-primary font-bold" aria-hidden>
                      ›
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            <h2 id="profils" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Les 4 profils comparés" : "The 4 profiles compared"}
            </h2>
            <ul className="mb-10 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
              {fr ? (
                <>
                  <li>
                    <strong className="text-foreground">Indépendant seul, 80k</strong> : raison individuelle, personne seule, revenu
                    net de l&apos;activité de CHF 80&apos;000 (après cotisations AVS). Impôt sur le revenu.
                  </li>
                  <li>
                    <strong className="text-foreground">Indépendant famille, 120k</strong> : raison individuelle, marié, 2 enfants de 6
                    et 9 ans, conjoint sans revenu, revenu net de l&apos;activité de CHF 120&apos;000. Impôt sur le revenu.
                  </li>
                  <li>
                    <strong className="text-foreground">Sàrl, bénéfice 50k</strong> : bénéfice avant impôts de CHF 50&apos;000, capital
                    propre de CHF 100&apos;000 (dont CHF 20&apos;000 de capital social). Impôts sur le bénéfice et le capital.
                  </li>
                  <li>
                    <strong className="text-foreground">Sàrl, bénéfice 150k</strong> : bénéfice avant impôts de CHF 150&apos;000,
                    capital propre de CHF 300&apos;000. Impôts sur le bénéfice et le capital.
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <strong className="text-foreground">Self-employed single, 80k</strong>: sole proprietorship, single person, net
                    business income of CHF 80,000 (after social security contributions). Income tax.
                  </li>
                  <li>
                    <strong className="text-foreground">Self-employed family, 120k</strong>: sole proprietorship, married, 2 children aged
                    6 and 9, spouse without income, net business income of CHF 120,000. Income tax.
                  </li>
                  <li>
                    <strong className="text-foreground">LLC, profit 50k</strong>: pre-tax profit of CHF 50,000, equity of CHF 100,000
                    (including CHF 20,000 share capital). Profit and capital taxes.
                  </li>
                  <li>
                    <strong className="text-foreground">LLC, profit 150k</strong>: pre-tax profit of CHF 150,000, equity of CHF
                    300,000. Profit and capital taxes.
                  </li>
                </>
              )}
            </ul>

            <h2 id="cantons" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Les écarts entre cantons" : "Differences between cantons"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {fr
                ? "Impôts de la commune médiane de chaque canton, en CHF par an. La moitié des communes du canton paient moins, l'autre moitié plus."
                : "Taxes in each canton's median municipality, in CHF per year. Half of the canton's municipalities pay less, half pay more."}
            </p>
            <div className="overflow-x-auto rounded-lg border border-border mb-10">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">
                      Canton
                    </th>
                    {short.map((s) => (
                      <th key={s} scope="col" className={th}>
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.map((s) => (
                    <tr key={s.canton} className="border-t border-border">
                      <td className="px-3 py-2 font-medium">{cn(s.canton)}</td>
                      {s.median.map((m, i) => (
                        <td key={i} className={td}>
                          {l(m)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border bg-muted/30">
                    <td className="px-3 py-2 font-semibold">{fr ? "Suisse romande" : "All six cantons"}</td>
                    {PROFILS_PRO.map((p) => (
                      <td key={p} className={`${td} font-semibold`}>
                        {l(romandieMedianPro(p))}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="extremes" className="scroll-mt-24 text-2xl font-bold text-foreground mb-2">
              {fr ? "Les communes les moins et les plus imposées" : "Lowest- and highest-taxed municipalities"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {fr
                ? "Pour chaque profil, la commune la moins imposée et la plus imposée des 657 communes romandes, en CHF par an, et la part du revenu ou du bénéfice que cela représente."
                : "For each profile, the lowest- and highest-taxed of the 657 French-speaking municipalities, in CHF per year, and the share of income or profit it represents."}
            </p>
            <div className="overflow-x-auto rounded-lg border border-border mb-10">
              <table className="w-full text-sm min-w-[680px]">
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">
                      {fr ? "Profil" : "Profile"}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">
                      {fr ? "Moins imposée" : "Lowest-taxed"}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">
                      {fr ? "Plus imposée" : "Highest-taxed"}
                    </th>
                    <th scope="col" className={th}>
                      {fr ? "Écart" : "Gap"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PROFILS_PRO.map((p, i) => {
                    const lo = extreme(p);
                    const hi = extreme(p, true);
                    return (
                      <tr key={p} className="border-t border-border align-top">
                        <td className="px-3 py-2 font-medium">{short[i]}</td>
                        <td className="px-3 py-2">
                          <span className="font-semibold tabular-nums">CHF {l(lo.total)}</span>{" "}
                          <span className="text-muted-foreground">({pct(lo.total, p)})</span>
                          <br />
                          <span className="text-muted-foreground">{lo.label}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="font-semibold tabular-nums">CHF {l(hi.total)}</span>{" "}
                          <span className="text-muted-foreground">({pct(hi.total, p)})</span>
                          <br />
                          <span className="text-muted-foreground">{hi.label}</span>
                        </td>
                        <td className={`${td} font-semibold`}>{l(hi.total - lo.total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h2 id="villes" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Les principales villes" : "Main towns"}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border mb-10">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">
                      {fr ? "Ville" : "Town"}
                    </th>
                    {short.map((s) => (
                      <th key={s} scope="col" className={th}>
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {villes.map((c) => (
                    <tr key={c.slug} className="border-t border-border">
                      <td className="px-3 py-2">
                        <Link href={`${base}/communes/${c.slug}`} className="text-primary hover:underline">
                          {c.nom}
                        </Link>{" "}
                        <span className="text-muted-foreground">({c.canton})</span>
                      </td>
                      {c.totals.map((t, i) => (
                        <td key={i} className={td}>
                          {l(t)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="classement" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? `Le classement complet des ${n} communes` : `Full ranking of the ${n} municipalities`}
            </h2>
            <div className="mb-10">
              <BarometreTable
                lang={lang}
                rows={BARO_PRO_COMMUNES.map(({ slug, nom, canton, totals }) => ({ slug, nom, canton, totals }))}
                profilLabels={labels}
                cantonNames={Object.fromEntries(["VD", "GE", "VS", "FR", "NE", "JU"].map((c) => [c, cn(c)]))}
                defaultProfil={proIndex("sarl50")}
                captionSubject={{ fr: "impôts 2026 des entreprises", en: "2026 business taxes" }}
              />
            </div>

            <h2 id="ri-ou-sarl" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Indépendant ou Sàrl : attention aux comparaisons" : "Sole proprietor or LLC: compare with care"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {fr
                ? "Les montants des indépendants et des Sàrl ne se comparent pas directement. L'indépendant paie l'impôt sur tout son revenu d'activité, plus les cotisations AVS. La Sàrl paie l'impôt sur son bénéfice, mais son associé est en plus imposé sur le salaire et les dividendes qu'il en retire. Le choix de la forme juridique dépend du revenu, des besoins en liquidités, de la prévoyance et des risques. Nous pouvons faire ce calcul pour votre situation."
                : "Amounts for the self-employed and for LLCs cannot be compared directly. A sole proprietor pays income tax on all business income, plus social security contributions. An LLC pays tax on its profit, but its partner is also taxed on the salary and dividends drawn from it. The right legal form depends on income, cash needs, pension planning and risk. We can run this calculation for your situation."}
            </p>

            <h2 id="limites" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Ce que le baromètre ne compare pas" : "What the barometer does not compare"}
            </h2>
            <ul className="mb-10 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
              {fr ? (
                <>
                  <li>
                    La taxe professionnelle communale genevoise, due par les entreprises et les indépendants établis dans le canton de
                    Genève, qui dépend du chiffre d&apos;affaires, des loyers et du nombre d&apos;employés.
                  </li>
                  <li>
                    Les cotisations sociales de l&apos;indépendant (AVS/AI/APG, allocations familiales), qui ne sont pas des impôts.
                  </li>
                  <li>
                    L&apos;imposition de l&apos;associé de la Sàrl sur son salaire et ses dividendes, et l&apos;impôt anticipé sur les
                    dividendes.
                  </li>
                  <li>
                    L&apos;impôt sur la fortune de l&apos;indépendant, l&apos;impôt ecclésiastique des personnes physiques, le 3e pilier
                    et les rachats LPP.
                  </li>
                  <li>
                    Les impôts fonciers et immobiliers, ainsi que les taxes communales (déchets, eau, etc.).
                  </li>
                </>
              ) : (
                <>
                  <li>
                    The Geneva municipal business tax (taxe professionnelle communale), due by businesses and self-employed people
                    established in the canton of Geneva, based on turnover, rent and headcount.
                  </li>
                  <li>Social security contributions of the self-employed (AHV/AVS, family allowances), which are not taxes.</li>
                  <li>Taxation of the LLC&apos;s partner on salary and dividends, and withholding tax on dividends.</li>
                  <li>Wealth tax of the self-employed, personal church tax, pillar 3a and pension buy-ins.</li>
                  <li>Property taxes and municipal charges (waste, water, etc.).</li>
                </>
              )}
            </ul>

            <h2 id="methode" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Méthode et sources" : "Method and sources"}
            </h2>
            <ul className="mb-6 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
              {fr ? (
                <>
                  <li>
                    Calculs effectués le 11 novembre 2026 avec le{" "}
                    <a href={ESTV_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      calculateur fiscal officiel de l&apos;Administration fédérale des contributions (AFC)
                    </a>
                    , période fiscale {BARO_PRO_YEAR}.
                  </li>
                  <li>
                    Sàrl : impôt fédéral direct sur le bénéfice, impôts cantonal et communal sur le bénéfice et le capital, et impôt
                    ecclésiastique des personnes morales là où il est prélevé (cantons de Fribourg, du Valais et du Jura). Le bénéfice
                    indiqué est avant impôts : les impôts sont déduits comme charge, comme dans la réalité.
                  </li>
                  <li>
                    Dans les cantons de Vaud, de Genève, de Fribourg et de Neuchâtel, l&apos;impôt sur le bénéfice est imputé sur
                    l&apos;impôt sur le capital : ces deux Sàrl n&apos;y paient donc pas d&apos;impôt sur le capital.
                  </li>
                  <li>
                    Indépendants : impôt fédéral direct, impôts cantonal et communal sur le revenu (taxe personnelle incluse lorsqu&apos;elle
                    existe), sans fortune ni impôt ecclésiastique, avec les déductions standard du calculateur et sans 3e pilier.
                  </li>
                  <li>
                    Les {n} communes des 6 cantons romands au 1er janvier {BARO_PRO_YEAR}. Les communes à égalité partagent le même
                    rang.
                  </li>
                  <li>Ces montants sont indicatifs : l&apos;impôt réel dépend des comptes et de la situation de chaque entreprise.</li>
                </>
              ) : (
                <>
                  <li>
                    Computed on 11 November 2026 with the{" "}
                    <a href={ESTV_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      official tax calculator of the Swiss Federal Tax Administration (FTA)
                    </a>
                    , {BARO_PRO_YEAR} tax period.
                  </li>
                  <li>
                    LLCs: direct federal tax on profit, cantonal and municipal taxes on profit and capital, and corporate church tax
                    where levied (Fribourg, Valais and Jura). Profit is stated before taxes: taxes are deducted as an expense, as in
                    reality.
                  </li>
                  <li>
                    In Vaud, Geneva, Fribourg and Neuchâtel, profit tax is credited against capital tax, so these two LLCs pay no capital
                    tax there.
                  </li>
                  <li>
                    Self-employed: direct federal tax, cantonal and municipal income tax (including personal tax where it applies), with
                    no wealth or church tax, the calculator&apos;s standard deductions and no pillar 3a.
                  </li>
                  <li>
                    The {n} municipalities of the 6 French-speaking cantons as of 1 January {BARO_PRO_YEAR}. Municipalities with the same
                    amount share the same rank.
                  </li>
                  <li>These amounts are indicative: actual tax depends on each business&apos;s accounts and situation.</li>
                </>
              )}
            </ul>
            <p className="mb-10">
              <a href={csvUrl} className="inline-flex items-center gap-2 text-primary underline" download>
                <Download className="h-4 w-4" aria-hidden />
                {fr ? "Télécharger toutes les données (CSV)" : "Download all data (CSV)"}
              </a>
              <span className="block text-xs text-muted-foreground mt-1">
                {fr
                  ? "Réutilisation libre avec mention de la source : « Baromètre fiscal des entreprises, NeoFidu, d'après le calculateur de l'AFC »."
                  : "Free to reuse with attribution: “Business tax barometer, NeoFidu, based on the FTA calculator”."}
              </span>
            </p>

            <h2 id="faq" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Questions fréquentes" : "Frequently asked questions"}
            </h2>
            <div className="space-y-5 mb-10">
              {faq.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-foreground mb-1">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">
                  {fr ? "Comptabilité et impôts de votre entreprise" : "Accounting and taxes for your business"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {fr
                    ? "Indépendant dès CHF 500/an, Sàrl ou SA dès CHF 200/mois (déclaration d'impôt incluse), création de Sàrl dès CHF 990."
                    : "Self-employed from CHF 500/year, LLC or AG from CHF 200/month (tax return included), LLC formation from CHF 990."}
                </p>
              </div>
              <Link href={`${base}/demande`}>
                <Button className="whitespace-nowrap">
                  {fr ? "Demander un devis" : "Request a quote"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
