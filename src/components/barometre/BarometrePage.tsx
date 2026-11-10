// src/components/barometre/BarometrePage.tsx
// Page "Barometre fiscal romand 2026" (FR et EN). Composant serveur.

import Link from "next/link";
import { ChevronRight, Download, Calculator } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BarometreTable } from "./BarometreTable";
import { PROFILS, PROFIL_LABELS, formatChf } from "@/lib/commune-impots";
import { CANTON_NAMES } from "@/lib/communes";
import {
  BARO_COMMUNES,
  BARO_YEAR,
  BAROMETRE_UPDATED,
  ESTV_URL,
  VILLES_PRINCIPALES,
  cantonStats,
  getBaroCommune,
  ranking,
  romandieMedian,
} from "@/lib/barometre";

type Lang = "fr" | "en";

const CANTON_NAMES_EN: Record<string, string> = {
  VD: "Vaud",
  GE: "Geneva",
  VS: "Valais",
  FR: "Fribourg",
  NE: "Neuchâtel",
  JU: "Jura",
};

export function barometreTexts(lang: Lang) {
  const fr = lang === "fr";
  const l = (n: number) => formatChf(n, lang);
  const cn = (code: string) => (fr ? CANTON_NAMES[code] : CANTON_NAMES_EN[code]) ?? code;
  const n = BARO_COMMUNES.length;
  // "canton du Valais", "canton du Jura", "canton de Vaud"...
  const cantonDe = (code: string) => (["VS", "JU"].includes(code) ? "canton du " : "canton de ") + cn(code);

  const r100 = ranking("seul100");
  const lo100 = r100[0];
  const hi100 = r100[r100.length - 1];
  const fam = ranking("famille150");
  const ret = ranking("retraites70");
  const i100 = PROFILS.indexOf("seul100");
  const iFam = PROFILS.indexOf("famille150");
  const iRet = PROFILS.indexOf("retraites70");

  const stats = cantonStats();
  const famByCanton = [...stats].sort((a, b) => a.median[iFam] - b.median[iFam]);
  const villes = VILLES_PRINCIPALES.map((s) => getBaroCommune(s)!).filter(Boolean);
  const villes100 = [...villes].sort((a, b) => a.totals[i100] - b.totals[i100]);

  const summary = fr
    ? [
        `Pour une personne seule avec un salaire brut de CHF 100'000, l'impôt sur le revenu ${BARO_YEAR} va de CHF ${l(lo100.totals[i100])} (${lo100.nom}, ${lo100.canton}) à CHF ${l(hi100.totals[i100])} (${hi100.nom}, ${hi100.canton}), soit CHF ${l(hi100.totals[i100] - lo100.totals[i100])} d'écart par an pour le même salaire.`,
        `La médiane des ${n} communes romandes est de CHF ${l(romandieMedian("seul100"))} pour ce profil.`,
        `Pour un couple marié avec 2 enfants et CHF 150'000 de salaires bruts, la médiane cantonale va de CHF ${l(famByCanton[0].median[iFam])} (${cantonDe(famByCanton[0].canton)}) à CHF ${l(famByCanton[famByCanton.length - 1].median[iFam])} (${cantonDe(famByCanton[famByCanton.length - 1].canton)}).`,
        `Pour un couple de retraités (rentes de CHF 70'000), l'impôt va de CHF ${l(ret[0].totals[iRet])} (${ret[0].nom}, ${ret[0].canton}) à CHF ${l(ret[ret.length - 1].totals[iRet])} (${ret[ret.length - 1].nom}, ${ret[ret.length - 1].canton}).`,
        `Parmi les principales villes, ${villes100[0].nom} est la moins imposée (CHF ${l(villes100[0].totals[i100])} à 100'000 de salaire) et ${villes100[villes100.length - 1].nom} la plus imposée (CHF ${l(villes100[villes100.length - 1].totals[i100])}).`,
      ]
    : [
        `For a single person earning a gross salary of CHF 100,000, ${BARO_YEAR} income tax ranges from CHF ${l(lo100.totals[i100])} (${lo100.nom}, ${lo100.canton}) to CHF ${l(hi100.totals[i100])} (${hi100.nom}, ${hi100.canton}): a gap of CHF ${l(hi100.totals[i100] - lo100.totals[i100])} a year for the same salary.`,
        `The median across the ${n} French-speaking municipalities is CHF ${l(romandieMedian("seul100"))} for this profile.`,
        `For a married couple with 2 children and CHF 150,000 in gross salaries, the cantonal median ranges from CHF ${l(famByCanton[0].median[iFam])} (canton of ${cn(famByCanton[0].canton)}) to CHF ${l(famByCanton[famByCanton.length - 1].median[iFam])} (canton of ${cn(famByCanton[famByCanton.length - 1].canton)}).`,
        `For a retired couple (CHF 70,000 in pensions), tax ranges from CHF ${l(ret[0].totals[iRet])} (${ret[0].nom}, ${ret[0].canton}) to CHF ${l(ret[ret.length - 1].totals[iRet])} (${ret[ret.length - 1].nom}, ${ret[ret.length - 1].canton}).`,
        `Among the main towns, ${villes100[0].nom} is the lowest-taxed (CHF ${l(villes100[0].totals[i100])} on a CHF 100,000 salary) and ${villes100[villes100.length - 1].nom} the highest (CHF ${l(villes100[villes100.length - 1].totals[i100])}).`,
      ];

  const faq = fr
    ? [
        {
          q: "Quelle est la commune la moins imposée de Suisse romande en 2026 ?",
          a: `Pour une personne seule avec un salaire brut de CHF 100'000, c'est ${lo100.nom} (${cn(lo100.canton)}), avec CHF ${l(lo100.totals[i100])} d'impôt sur le revenu (fédéral, cantonal et communal). Pour une famille avec 2 enfants et CHF 150'000 de salaires, c'est ${fam[0].nom} (${cn(fam[0].canton)}), avec CHF ${l(fam[0].totals[iFam])}.`,
        },
        {
          q: "Quelle est la commune la plus imposée de Suisse romande en 2026 ?",
          a: `Pour une personne seule avec CHF 100'000 de salaire brut, c'est ${hi100.nom} (${cn(hi100.canton)}), avec CHF ${l(hi100.totals[i100])} d'impôt sur le revenu.`,
        },
        {
          q: "Quel canton romand est le moins cher pour une famille ?",
          a: `Pour un couple marié avec 2 enfants et CHF 150'000 de salaires bruts, la commune médiane la moins imposée se trouve dans le ${cantonDe(famByCanton[0].canton)} (CHF ${l(famByCanton[0].median[iFam])} par an), et la plus imposée dans le ${cantonDe(famByCanton[famByCanton.length - 1].canton)} (CHF ${l(famByCanton[famByCanton.length - 1].median[iFam])}).`,
        },
        {
          q: "D'où viennent ces chiffres ?",
          a: `Tous les montants ont été calculés avec le calculateur fiscal officiel de l'Administration fédérale des contributions (AFC), pour la période fiscale ${BARO_YEAR}. Ils couvrent l'impôt sur le revenu uniquement (fédéral, cantonal, communal), sans impôt sur la fortune ni impôt ecclésiastique, avec les déductions standard.`,
        },
      ]
    : [
        {
          q: "Which municipality in French-speaking Switzerland has the lowest taxes in 2026?",
          a: `For a single person earning a gross salary of CHF 100,000, it is ${lo100.nom} (${cn(lo100.canton)}), with CHF ${l(lo100.totals[i100])} in income tax (federal, cantonal and municipal). For a family with 2 children and CHF 150,000 in salaries, it is ${fam[0].nom} (${cn(fam[0].canton)}), with CHF ${l(fam[0].totals[iFam])}.`,
        },
        {
          q: "Which municipality in French-speaking Switzerland has the highest taxes in 2026?",
          a: `For a single person with a CHF 100,000 gross salary, it is ${hi100.nom} (${cn(hi100.canton)}), with CHF ${l(hi100.totals[i100])} in income tax.`,
        },
        {
          q: "Which French-speaking canton is cheapest for a family?",
          a: `For a married couple with 2 children and CHF 150,000 in gross salaries, the lowest median municipality tax is in the canton of ${cn(famByCanton[0].canton)} (CHF ${l(famByCanton[0].median[iFam])} a year) and the highest in the canton of ${cn(famByCanton[famByCanton.length - 1].canton)} (CHF ${l(famByCanton[famByCanton.length - 1].median[iFam])}).`,
        },
        {
          q: "Where do these figures come from?",
          a: `All amounts were computed with the official tax calculator of the Swiss Federal Tax Administration (FTA) for the ${BARO_YEAR} tax period. They cover income tax only (federal, cantonal, municipal), with no wealth tax or church tax, and standard deductions.`,
        },
      ];

  return { summary, faq, stats, villes, cn };
}

export function BarometrePage({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  const l = (n: number) => formatChf(n, lang);
  const base = fr ? "" : "/en";
  const { summary, faq, stats, villes, cn } = barometreTexts(lang);
  const labels = PROFILS.map((p) => PROFIL_LABELS[p][lang]);
  const shortLabels = fr
    ? ["Seul, 60k", "Seul, 100k", "Famille, 150k", "Retraités, 70k"]
    : ["Single, 60k", "Single, 100k", "Family, 150k", "Retirees, 70k"];
  const url = `https://neofidu.ch${base}/barometre-fiscal`;
  const csvUrl = "/barometre-fiscal/donnees.csv";
  const updated = fr ? "10 novembre 2026" : "10 November 2026";
  const title = fr
    ? `Baromètre fiscal romand ${BARO_YEAR} : les impôts commune par commune`
    : `French-speaking Switzerland tax barometer ${BARO_YEAR}: taxes municipality by municipality`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: fr ? `Baromètre fiscal romand ${BARO_YEAR}` : `French-speaking Switzerland tax barometer ${BARO_YEAR}`,
      description: fr
        ? `Impôt sur le revenu ${BARO_YEAR} (fédéral, cantonal et communal) dans les ${BARO_COMMUNES.length} communes des cantons de Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura, pour 4 profils types. Calculé avec le calculateur fiscal officiel de l'AFC.`
        : `${BARO_YEAR} income tax (federal, cantonal and municipal) in the ${BARO_COMMUNES.length} municipalities of the cantons of Vaud, Geneva, Valais, Fribourg, Neuchâtel and Jura, for 4 typical profiles. Computed with the official Swiss Federal Tax Administration calculator.`,
      url,
      inLanguage: fr ? "fr-CH" : "en",
      temporalCoverage: String(BARO_YEAR),
      spatialCoverage: { "@type": "Place", name: fr ? "Suisse romande" : "French-speaking Switzerland" },
      dateModified: BAROMETRE_UPDATED,
      creator: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
      isBasedOn: ESTV_URL,
      license: "https://creativecommons.org/licenses/by/4.0/",
      distribution: [
        { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `https://neofidu.ch${csvUrl}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const topN = (p: (typeof PROFILS)[number], n: number, worst = false) => {
    const r = ranking(p);
    return worst ? r.slice(-n).reverse() : r.slice(0, n);
  };

  const MiniTable = ({ p, worst }: { p: (typeof PROFILS)[number]; worst?: boolean }) => {
    const i = PROFILS.indexOf(p);
    return (
      <figure className="rounded-lg border border-border overflow-hidden">
        <figcaption className="bg-muted/60 px-3 py-2 text-sm font-semibold text-foreground">
          {PROFIL_LABELS[p][lang]}
        </figcaption>
        <ol className="text-sm">
          {topN(p, 10, worst).map((c) => (
            <li key={c.slug} className="flex items-center justify-between gap-3 border-t border-border px-3 py-1.5">
              <span className="min-w-0 truncate">
                {/* Rang avec ex aequo : 1 + nombre de communes strictement moins (ou plus) imposees */}
                <span className="text-muted-foreground tabular-nums mr-2">
                  {1 + BARO_COMMUNES.filter((o) => (worst ? o.totals[i] > c.totals[i] : o.totals[i] < c.totals[i])).length}.
                </span>
                <Link href={`${base}/communes/${c.slug}`} className="text-primary hover:underline">
                  {c.nom}
                </Link>{" "}
                {!c.nom.endsWith(")") && <span className="text-muted-foreground">({c.canton})</span>}
              </span>
              <span className="tabular-nums font-medium whitespace-nowrap">CHF {l(c.totals[i])}</span>
            </li>
          ))}
        </ol>
      </figure>
    );
  };

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
                <Link href={`${base}/communes`} className="hover:text-primary">
                  {fr ? "Communes" : "Municipalities"}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li className="text-foreground">{fr ? "Baromètre fiscal" : "Tax barometer"}</li>
            </ol>
          </nav>

          <article className="py-8">
            <header className="mb-8">
              <p className="text-sm font-semibold text-primary mb-2">
                {fr ? `Données ${BARO_YEAR} · ${BARO_COMMUNES.length} communes` : `${BARO_YEAR} data · ${BARO_COMMUNES.length} municipalities`}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">{title}</h1>
              <p className="text-sm text-muted-foreground">
                {fr ? "Par" : "By"} <span className="font-medium text-foreground">{fr ? "l'équipe NeoFidu" : "the NeoFidu team"}</span>
                {" · "}
                {fr ? "Mis à jour le" : "Updated"} <time dateTime={BAROMETRE_UPDATED}>{updated}</time>
                {" · "}
                {fr ? "Source : calculateur fiscal de l'AFC" : "Source: Swiss Federal Tax Administration calculator"}
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

            <h2 id="cantons" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Les écarts entre cantons" : "Differences between cantons"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {fr
                ? "Impôt de la commune médiane de chaque canton, en CHF par an. La moitié des communes du canton paient moins, l'autre moitié plus."
                : "Tax in each canton's median municipality, in CHF per year. Half of the canton's municipalities pay less, half pay more."}
            </p>
            <div className="overflow-x-auto rounded-lg border border-border mb-10">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Canton</th>
                    <th scope="col" className="px-3 py-2 text-right font-semibold">{fr ? "Communes" : "Municipalities"}</th>
                    {shortLabels.map((s) => (
                      <th key={s} scope="col" className="px-3 py-2 text-right font-semibold">
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.map((s) => (
                    <tr key={s.canton} className="border-t border-border">
                      <td className="px-3 py-2 font-medium">{cn(s.canton)}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{s.n}</td>
                      {s.median.map((m, i) => (
                        <td key={i} className="px-3 py-2 text-right tabular-nums">
                          {l(m)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border bg-muted/30">
                    <td className="px-3 py-2 font-semibold">{fr ? "Suisse romande" : "All six cantons"}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{BARO_COMMUNES.length}</td>
                    {PROFILS.map((p) => (
                      <td key={p} className="px-3 py-2 text-right tabular-nums font-semibold">
                        {l(romandieMedian(p))}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="moins-imposees" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Les 10 communes les moins imposées" : "The 10 lowest-taxed municipalities"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              {PROFILS.map((p) => (
                <MiniTable key={p} p={p} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mb-10">
              {fr
                ? "Les communes à égalité partagent le même rang (nombreuses communes valaisannes ont un coefficient identique)."
                : "Municipalities with the same amount share the same rank (many Valais municipalities have identical coefficients)."}
            </p>

            <h2 id="plus-imposees" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Les 10 communes les plus imposées" : "The 10 highest-taxed municipalities"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {PROFILS.map((p) => (
                <MiniTable key={p} p={p} worst />
              ))}
            </div>

            <h2 id="villes" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Les principales villes" : "Main towns"}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border mb-10">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">{fr ? "Ville" : "Town"}</th>
                    {shortLabels.map((s) => (
                      <th key={s} scope="col" className="px-3 py-2 text-right font-semibold">
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
                        {!c.nom.endsWith(")") && <span className="text-muted-foreground">({c.canton})</span>}
                      </td>
                      {c.totals.map((t, i) => (
                        <td key={i} className="px-3 py-2 text-right tabular-nums">
                          {l(t)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="classement" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? `Le classement complet des ${BARO_COMMUNES.length} communes` : `Full ranking of the ${BARO_COMMUNES.length} municipalities`}
            </h2>
            <div className="mb-10">
              <BarometreTable
                lang={lang}
                rows={BARO_COMMUNES.map(({ slug, nom, canton, totals }) => ({ slug, nom, canton, totals }))}
                profilLabels={labels}
                cantonNames={Object.fromEntries(["VD", "GE", "VS", "FR", "NE", "JU"].map((c) => [c, cn(c)]))}
              />
            </div>

            <h2 id="methode" className="scroll-mt-24 text-2xl font-bold text-foreground mb-4">
              {fr ? "Méthode et sources" : "Method and sources"}
            </h2>
            <ul className="mb-6 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
              {fr ? (
                <>
                  <li>
                    Calculs effectués le 10 novembre 2026 avec le{" "}
                    <a href={ESTV_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      calculateur fiscal officiel de l&apos;Administration fédérale des contributions (AFC)
                    </a>
                    , période fiscale {BARO_YEAR}.
                  </li>
                  <li>Impôt sur le revenu uniquement : impôt fédéral direct, impôt cantonal et impôt communal (taxe personnelle incluse lorsqu&apos;elle existe).</li>
                  <li>Sans impôt sur la fortune ni impôt ecclésiastique. Déductions standard du calculateur (cotisations sociales, frais professionnels forfaitaires, primes d&apos;assurance), sans 3e pilier.</li>
                  <li>Profils : salariés de 35 à 40 ans ; enfants de 6 et 9 ans ; retraités de 68 et 70 ans.</li>
                  <li>Les {BARO_COMMUNES.length} communes des 6 cantons romands au 1er janvier {BARO_YEAR}. Rang 1 = commune la moins imposée.</li>
                  <li>Ces montants sont indicatifs : votre impôt réel dépend de l&apos;ensemble de vos revenus, de votre fortune et de vos déductions.</li>
                </>
              ) : (
                <>
                  <li>
                    Computed on 10 November 2026 with the{" "}
                    <a href={ESTV_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      official tax calculator of the Swiss Federal Tax Administration (FTA)
                    </a>
                    , {BARO_YEAR} tax period.
                  </li>
                  <li>Income tax only: direct federal tax, cantonal tax and municipal tax (including personal tax where it applies).</li>
                  <li>No wealth tax or church tax. Standard deductions of the calculator (social contributions, flat-rate professional expenses, insurance premiums), no pillar 3a.</li>
                  <li>Profiles: employees aged 35 to 40; children aged 6 and 9; retirees aged 68 and 70.</li>
                  <li>The {BARO_COMMUNES.length} municipalities of the 6 French-speaking cantons as of 1 January {BARO_YEAR}. Rank 1 = lowest-taxed municipality.</li>
                  <li>These amounts are indicative: your actual tax depends on all your income, wealth and deductions.</li>
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
                  ? "Réutilisation libre avec mention de la source : « Baromètre fiscal romand, NeoFidu, d'après le calculateur de l'AFC »."
                  : "Free to reuse with attribution: “French-speaking Switzerland tax barometer, NeoFidu, based on the FTA calculator”."}
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
                  {fr ? "Calculez votre propre impôt" : "Calculate your own tax"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {fr
                    ? "Même calculateur officiel, avec votre revenu, votre commune et votre 3e pilier."
                    : "Same official calculator, with your income, municipality and pillar 3a."}
                </p>
              </div>
              <Link href={`${base}/simulateur/impots`}>
                <Button className="whitespace-nowrap">
                  <Calculator className="h-4 w-4 mr-2" />
                  {fr ? "Simuler mes impôts" : "Simulate my taxes"}
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
