import type { GuideChapter } from "../../types";

export const prevoyance: GuideChapter = {
  slug: "prevoyance",
  readTime: 6,
  fr: {
    title: "Prévoyance dans JuraTax : 3e pilier A (520), rachat 3a, rachats LPP (515) et capitaux (905)",
    navTitle: "Prévoyance",
    metaTitle: "JuraTax 2026 : déduire 3e pilier A, rachat 3a et rachat LPP",
    metaDescription:
      "Où déduire le 3e pilier A dans JuraTax (code 520, CHF 7'258), les nouveaux rachats 3a de 2026, les rachats LPP (code 515), les cotisations AVS des non-actifs (510) et comment est imposé un capital de prévoyance (code 905) dans le canton du Jura.",
    keywords: [
      "juratax 3e pilier",
      "déduction 3a jura 2026",
      "rachat 3a 2026 jura",
      "rachat lpp déduction jura",
      "impôt capital 2e pilier jura",
      "code 520 déclaration jura",
    ],
    summary: [
      "**3e pilier A** : codes **520 / 520C**, jusqu'à **CHF 7'258** avec caisse de pension, ou 20 % du revenu d'activité jusqu'à **CHF 36'288** sans 2e pilier. Joignez l'attestation officielle.",
      "**Nouveau en 2026** : les cotisations 3a manquées en 2025 peuvent être rachetées et déduites pour la première fois. Les lacunes d'avant 2025 ne peuvent pas être comblées.",
      "**Rachats LPP** : codes **515 / 515C**, avec l'attestation de paiement et la feuille de calcul du rachat maximal. Aucun retrait en capital pendant **3 ans**, sinon la déduction est refusée.",
      "Un **capital de prévoyance** (2e pilier, 3e pilier A) se déclare au **code 905** : il est imposé séparément, à un tarif réduit, sans déduction sociale.",
    ],
    blocks: [
      { type: "h2", id: "pilier-3a", text: "3e pilier A (codes 520 et 520C)" },
      { type: "path", items: ["Déductions", "Sélection des déductions", "Cotisations AVS / AI / LPP, prévoyance individuelle liée (pilier 3a)"] },
      {
        type: "table",
        head: ["Situation", "Déduction maximale 2026"],
        rows: [
          ["Affilié à une caisse de pension (2e pilier)", "CHF 7'258"],
          ["Sans 2e pilier (indépendant, par exemple)", "20 % du revenu d'activité lucrative, max. CHF 36'288"],
        ],
        caption: "Source : Guide général 2025, page 29, Service des contributions du canton du Jura ; montants fédéraux de l'OPP 3, inchangés pour 2026.",
      },
      {
        type: "p",
        text: "Dans JuraTax, cochez d'abord la déduction dans la **sélection des déductions**, puis saisissez les cotisations versées pour l'année. Chaque conjoint a son propre plafond : le contribuable au code 520, le conjoint au code 520C. Seuls les montants **effectivement versés en 2026** comptent, au maximum le plafond légal. Joignez l'**attestation officielle** de la banque ou de l'assurance : elle figure dans la liste des justificatifs que JuraTax établit à la fin.",
      },
      {
        type: "screenshot",
        file: "05-pilier-3a.webp",
        alt: "Écran Cotisations AVS / AI / LPP, prévoyance individuelle liée (pilier 3a) de JuraTax 2025 : cotisations des non-actifs, 50 % des cotisations 2e pilier des indépendants, rachat 2e pilier, pilier 3a et maximums à titre d'information",
        caption: "Un seul écran pour les cotisations des non-actifs, le rachat LPP et le 3e pilier A ; JuraTax rappelle les maximums (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "info",
        title: "Rachats 3a : une première en 2026",
        text: "Depuis le 1er janvier 2025, une lacune de cotisation 3a peut apparaître lorsque vous n'avez pas versé le maximum. Elle peut être comblée par un **rachat au plus tôt à partir de 2026**, à condition d'avoir versé la cotisation ordinaire complète de l'année, et le rachat est déductible. Les lacunes d'**avant 2025 ne peuvent pas être rachetées**. Votre banque ou votre assurance vous remet une attestation distincte pour le rachat.",
      },

      { type: "h2", id: "rachat-lpp", text: "Rachats dans la caisse de pension (codes 515 et 515C)" },
      {
        type: "p",
        text: "Les rachats d'années d'assurance dans le 2e pilier sont déductibles, pour les salariés comme pour les indépendants, sur présentation de la **feuille de calcul du rachat maximal** et de l'**attestation de paiement** de la caisse. Ne retranchez pas le rachat du salaire déclaré au code 100 : il se déduit uniquement au code 515. Les indépendants y déduisent aussi **50 % de leurs cotisations** personnelles au 2e pilier.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Trois ans sans retrait en capital",
        text: "La déduction d'un rachat est refusée si une **prestation en capital** est versée dans les **trois ans** qui suivent, quel qu'en soit le motif (retraite en capital, versement anticipé pour le logement, départ à l'étranger). Si vous avez fait un **versement anticipé pour votre logement** (EPL), vous devez d'abord le rembourser avant tout rachat.",
      },

      { type: "h2", id: "non-actifs", text: "Cotisations AVS des personnes sans activité (codes 510 et 510C)" },
      {
        type: "p",
        text: "Les personnes **sans activité lucrative** (préretraités, conjoints sans activité dans certains cas, étudiants dès 21 ans) déduisent au code 510 les cotisations AVS/AI/APG qu'elles paient elles-mêmes, ainsi que leurs cotisations LPP. Joignez le justificatif si les cotisations AVS dépassent CHF 1'000.",
      },

      { type: "h2", id: "capital", text: "Retrait en capital (codes 905 et 905C)" },
      {
        type: "p",
        text: "Si vous avez touché en 2026 un capital du **2e pilier** ou du **3e pilier A**, déclarez-le au code 905 (905C pour le conjoint). Dans JuraTax, il se saisit dans « Revenus », « Rentes, pensions, autres indemnités », genre de revenu « **Prestations en capital touchées** », avec le genre de prestation et le nom de la caisse. Ce capital n'est pas additionné à vos autres revenus : il fait l'objet d'une **imposition séparée**, l'année où vous y avez droit, **sans déduction sociale**.",
      },
      {
        type: "table",
        head: ["Tranche du capital", "Couple ou parent seul", "Autres contribuables"],
        rows: [
          ["Premiers CHF 56'700", "0,9 %", "1,1 %"],
          ["CHF 56'700 suivants", "1,1 %", "1,3 %"],
          ["Au-delà", "1,3 %", "1,7 %"],
        ],
        caption: "Taux unitaires de l'impôt cantonal sur les prestations en capital (art. 37 de la loi d'impôt), à multiplier par la quotité cantonale (2,85) et par les quotités communale et paroissiale. Source : feuille cantonale Jura, Administration fédérale des contributions, état février 2026. L'impôt fédéral direct s'élève au cinquième du barème ordinaire.",
      },
      {
        type: "p",
        text: "Le Service des contributions propose une **calculatrice des prestations en capital** sur le guichet virtuel pour estimer l'impôt avant un retrait. Le capital lui-même ne figure plus dans la fortune au 31 décembre que sous la forme des comptes ou placements où il a été versé.",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour le 3e pilier A en 2026 dans le canton du Jura ?",
        a: "CHF 7'258 si vous êtes affilié à une caisse de pension, ou 20 % de votre revenu d'activité lucrative jusqu'à CHF 36'288 sans 2e pilier. La déduction se fait aux codes 520 et 520C de la déclaration.",
      },
      {
        q: "Peut-on racheter des années de 3e pilier A ?",
        a: "Oui, depuis 2026, mais seulement pour les lacunes apparues à partir de 2025. Il suppose d'avoir versé la cotisation ordinaire complète de l'année et il est déductible. Les lacunes d'avant 2025 ne peuvent pas être rachetées.",
      },
      {
        q: "Où déclarer un retrait de 2e pilier dans JuraTax ?",
        a: "Au code 905 (905C pour le conjoint), en cochant la case 2e pilier. Le capital est imposé séparément, à un tarif réduit, sans déduction sociale ; vous recevez une décision distincte.",
      },
      {
        q: "Un rachat LPP est-il déductible si je prends ma retraite en capital deux ans après ?",
        a: "Non. La déduction est refusée si une prestation en capital est versée dans les trois ans qui suivent le rachat, quel qu'en soit le motif.",
      },
    ],
  },
  en: {
    title: "Retirement savings in JuraTax: pillar 3a (520), 3a catch-up, pension fund buy-ins (515) and lump sums (905)",
    navTitle: "Retirement savings",
    metaTitle: "JuraTax 2026: pillar 3a, 3a catch-up and pension buy-ins",
    metaDescription:
      "Where to deduct pillar 3a in JuraTax (code 520, CHF 7,258), the new 2026 pillar 3a catch-up contributions, pension fund buy-ins (code 515), AHV contributions of people not working (510) and how a pension lump sum (code 905) is taxed in Jura.",
    keywords: [
      "juratax pillar 3a",
      "pillar 3a deduction jura 2026",
      "3a catch-up 2026 jura",
      "pension fund buy-in deduction jura",
      "lump sum pension tax jura",
      "jura tax return code 520",
    ],
    summary: [
      "**Pillar 3a**: codes **520 / 520C**, up to **CHF 7,258** with a pension fund, or 20% of earned income up to **CHF 36,288** without pillar 2. Enclose the official certificate.",
      "**New in 2026**: 3a contributions missed in 2025 can be bought back and deducted for the first time. Gaps from before 2025 cannot be filled.",
      "**Pension fund buy-ins**: codes **515 / 515C**, with the payment certificate and the maximum buy-in calculation. No lump-sum withdrawal for **3 years**, otherwise the deduction is refused.",
      "A **pension lump sum** (pillar 2, pillar 3a) is declared under **code 905**: it is taxed separately, at a reduced rate, with no personal deductions.",
    ],
    blocks: [
      { type: "h2", id: "pilier-3a", text: "Pillar 3a (codes 520 and 520C)" },
      { type: "path", items: ["Déductions", "Sélection des déductions", "Cotisations AVS / AI / LPP, prévoyance individuelle liée (pilier 3a)"] },
      {
        type: "table",
        head: ["Situation", "Maximum deduction 2026"],
        rows: [
          ["Member of a pension fund (pillar 2)", "CHF 7,258"],
          ["No pillar 2 (self-employed, for example)", "20% of earned income, max. CHF 36,288"],
        ],
        caption: "Source: 2025 general guide, page 29, Jura Service des contributions; federal OPP 3 amounts, unchanged for 2026.",
      },
      {
        type: "p",
        text: "In JuraTax, first tick the deduction in the **list of deductions** (« sélection des déductions »), then enter the contributions paid for the year. Each spouse has their own cap: the taxpayer under code 520, the spouse under 520C. Only amounts **actually paid in 2026** count, up to the legal cap. Enclose the **official certificate** from the bank or insurer: it appears in the list of supporting documents JuraTax produces at the end.",
      },
      {
        type: "screenshot",
        file: "05-pilier-3a.webp",
        alt: "JuraTax 2025 « Cotisations AVS / AI / LPP, prévoyance individuelle liée (pilier 3a) » screen: contributions of people not working, 50% of the self-employed's pillar 2 contributions, pillar 2 buy-in, pillar 3a and maximums for information",
        caption: "One screen for non-working contributions, pension fund buy-ins and pillar 3a; JuraTax shows the maximums (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "info",
        title: "Pillar 3a catch-up: a first in 2026",
        text: "Since 1 January 2025, a 3a contribution gap can arise when you do not pay the maximum. It can be filled with a **catch-up payment from 2026 at the earliest**, provided you have paid the year's full ordinary contribution, and the catch-up is deductible. Gaps from **before 2025 cannot be bought back**. Your bank or insurer issues a separate certificate for the catch-up.",
      },

      { type: "h2", id: "rachat-lpp", text: "Pension fund buy-ins (codes 515 and 515C)" },
      {
        type: "p",
        text: "Buy-ins of insurance years in pillar 2 are deductible, for employees and the self-employed alike, on presentation of the **maximum buy-in calculation** and the fund's **payment certificate**. Do not subtract the buy-in from the salary under code 100: it is deducted only under code 515. The self-employed also deduct **50% of their personal pillar 2 contributions** there.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Three years without a lump-sum withdrawal",
        text: "A buy-in deduction is refused if a **lump-sum benefit** is paid in the **three years** that follow, for whatever reason (lump-sum retirement, advance withdrawal for housing, leaving for abroad). If you made an **advance withdrawal for your home** (EPL/WEF), you must repay it before any buy-in.",
      },

      { type: "h2", id: "non-actifs", text: "AHV contributions of people not working (codes 510 and 510C)" },
      {
        type: "p",
        text: "People **not gainfully employed** (early retirees, non-working spouses in some cases, students from age 21) deduct under code 510 the AHV/IV/EO contributions they pay themselves, as well as their pension fund contributions. Enclose proof if AHV contributions exceed CHF 1,000.",
      },

      { type: "h2", id: "capital", text: "Lump-sum withdrawal (codes 905 and 905C)" },
      {
        type: "p",
        text: "If you received a **pillar 2** or **pillar 3a** lump sum in 2026, declare it under code 905 (905C for your spouse). In JuraTax, it is entered under « Revenus », « Rentes, pensions, autres indemnités », type of income « **Prestations en capital touchées** » (lump sums received), with the type of benefit and the fund's name. The lump sum is not added to your other income: it is **taxed separately**, in the year you become entitled to it, **with no personal deductions**.",
      },
      {
        type: "table",
        head: ["Portion of the lump sum", "Couple or single parent", "Other taxpayers"],
        rows: [
          ["First CHF 56,700", "0.9%", "1.1%"],
          ["Next CHF 56,700", "1.1%", "1.3%"],
          ["Above", "1.3%", "1.7%"],
        ],
        caption: "Unit rates of cantonal tax on lump-sum benefits (art. 37 of the tax law), multiplied by the cantonal multiplier (2.85) and the municipal and parish multipliers. Source: Federal Tax Administration Jura cantonal sheet, February 2026. Direct federal tax is one fifth of the ordinary scale.",
      },
      {
        type: "p",
        text: "The tax service offers a **lump-sum benefit calculator** on the virtual counter to estimate the tax before a withdrawal. The lump sum itself only appears in your wealth on 31 December as the accounts or investments where it was paid.",
      },
    ],
    faq: [
      {
        q: "How much pillar 3a can I deduct in 2026 in Jura?",
        a: "CHF 7,258 if you belong to a pension fund, or 20% of your earned income up to CHF 36,288 without pillar 2. The deduction goes under codes 520 and 520C of the return.",
      },
      {
        q: "Can I buy back missed pillar 3a years?",
        a: "Yes, from 2026, but only for gaps arising from 2025 onwards. It requires the year's full ordinary contribution to have been paid and is deductible. Gaps from before 2025 cannot be bought back.",
      },
      {
        q: "Where do I declare a pillar 2 withdrawal in JuraTax?",
        a: "Under code 905 (905C for your spouse), ticking the pillar 2 box. The lump sum is taxed separately, at a reduced rate, with no personal deductions; you receive a separate decision.",
      },
      {
        q: "Is a pension fund buy-in deductible if I retire with a lump sum two years later?",
        a: "No. The deduction is refused if a lump-sum benefit is paid in the three years following the buy-in, for whatever reason.",
      },
    ],
  },
};
