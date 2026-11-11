import type { GuideChapter } from "../../types";

export const impotSource: GuideChapter = {
  slug: "impot-source-tou",
  readTime: 6,
  fr: {
    title: "Impôt à la source dans le canton du Jura : TOU obligatoire, TOU sur demande, quasi-résidents et frontaliers",
    navTitle: "Impôt à la source et TOU",
    metaTitle: "Impôt à la source Jura : TOU, quasi-résident et frontaliers",
    metaDescription:
      "Quand une personne imposée à la source dans le canton du Jura doit ou peut remplir une déclaration JuraTax : TOU obligatoire dès CHF 120'000, TOU sur demande avant le 31 mars 2027, statut de quasi-résident (90 %) et frontaliers français selon l'accord de 1983.",
    keywords: [
      "impôt à la source jura",
      "tou jura",
      "taxation ordinaire ultérieure jura",
      "quasi-résident jura",
      "frontalier france jura impôt",
      "juratax impôt à la source",
    ],
    summary: [
      "Résident imposé à la source avec un revenu brut de plus de **CHF 120'000**, de la fortune imposable ou des revenus non soumis à l'impôt à la source : **taxation ordinaire ultérieure (TOU) obligatoire**.",
      "En dessous, la TOU se demande **par écrit au plus tard le 31 mars 2027** pour l'année 2026, par exemple pour déduire un rachat LPP, un 3e pilier A ou des pensions alimentaires.",
      "Non-résidents : la TOU n'est possible qu'avec le statut de **quasi-résident**, soit au moins **90 %** des revenus mondiaux bruts du couple imposables en Suisse.",
      "Les **frontaliers qui habitent en France** et rentrent chaque jour sont imposés **en France** selon l'accord franco-suisse de 1983, pas à la source dans le Jura.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Qui est concerné ?" },
      {
        type: "p",
        text: "Les travailleurs étrangers sans permis C domiciliés dans le canton du Jura, ainsi que les personnes domiciliées à l'étranger qui y travaillent, paient en principe l'**impôt à la source**, retenu chaque mois par l'employeur selon un barème qui intègre des déductions forfaitaires. Selon votre situation, une **taxation ordinaire ultérieure (TOU)** remplace ce système : vous remplissez alors une déclaration complète avec JuraTax et le Service des contributions impute l'impôt déjà retenu. Ces règles découlent du droit fédéral, harmonisé depuis le 1er janvier 2021.",
      },

      { type: "h2", id: "tou-obligatoire", text: "TOU obligatoire (résidents)" },
      {
        type: "table",
        head: ["Situation en 2026", "Conséquence"],
        rows: [
          ["Revenu brut d'activité de plus de CHF 120'000 par an", "TOU obligatoire pour 2026 et les années suivantes, jusqu'à la fin de l'imposition à la source"],
          ["Fortune imposable", "TOU obligatoire"],
          ["Revenus non soumis à l'impôt à la source (loyers, rendements, activité indépendante)", "TOU obligatoire"],
          ["Conjoint d'une personne soumise à la TOU, s'il est lui-même imposé à la source", "TOU également"],
        ],
        caption: "Source : loi fédérale sur l'impôt fédéral direct (art. 89) et loi fédérale sur l'harmonisation des impôts directs (art. 33a), ordonnance sur l'impôt à la source (seuil de CHF 120'000), en vigueur depuis le 1er janvier 2021.",
      },
      {
        type: "p",
        text: "Si vous êtes dans l'un de ces cas, **annoncez-le par écrit avant le 31 mars** de l'année suivante. Le Service des contributions vous envoie alors une déclaration d'impôt, que vous la remplissez avec JuraTax comme tout contribuable jurassien.",
      },

      { type: "h2", id: "tou-demande", text: "TOU sur demande (résidents sous CHF 120'000)" },
      {
        type: "p",
        text: "Un résident dont le revenu reste sous CHF 120'000 peut **demander** une TOU pour faire valoir des déductions que le barème ne contient pas : **frais professionnels effectifs**, **3e pilier A** (et rachats 3a dès 2026), **rachats LPP**, **pensions alimentaires**, frais de garde, intérêts passifs. La demande se fait **par écrit, au plus tard le 31 mars 2027** pour l'année 2026.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Faites le calcul avant de demander",
        text: "La TOU demandée s'applique ensuite aussi aux **années suivantes**, tant que vous restez imposé à la source : il n'est pas possible d'y renoncer. Elle peut donc coûter plus qu'elle ne rapporte, par exemple si vous avez des revenus de fortune ou si votre commune applique une quotité élevée. Simulez d'abord l'impôt ordinaire avec la calculatrice du guichet virtuel jurassien ou notre [simulateur](/simulateur/impots).",
      },

      { type: "h2", id: "quasi-resident", text: "Non-résidents : le statut de quasi-résident" },
      {
        type: "p",
        text: "Une personne domiciliée à l'étranger ne peut demander la TOU que si au moins **90 % de ses revenus mondiaux bruts** de l'année, y compris ceux de son conjoint, sont imposables en Suisse. La demande se dépose également **avant le 31 mars** de l'année suivante, avec les certificats de salaire suisses et les justificatifs des revenus étrangers. Le statut est vérifié chaque année.",
      },

      { type: "h2", id: "frontaliers", text: "Frontaliers résidant en France" },
      {
        type: "p",
        text: "Le canton du Jura applique l'**accord franco-suisse du 11 avril 1983** sur les travailleurs frontaliers. Un frontalier qui **habite en France et rentre en principe chaque jour** à son domicile est imposé **en France** sur son salaire jurassien ; l'employeur ne retient pas d'impôt à la source s'il reçoit chaque année l'**attestation de résidence fiscale** française. En contrepartie, la France verse au canton une compensation financière. Un frontalier ne remplit donc **pas de déclaration JuraTax** pour son salaire. Un frontalier qui réside en Allemagne ou qui ne rentre pas chaque jour relève d'autres règles : vérifiez votre situation auprès du Service des contributions.",
      },

      { type: "h2", id: "juratax", text: "Remplir la TOU dans JuraTax" },
      {
        type: "p",
        text: "En TOU, la déclaration est la même que celle des autres contribuables : suivez ce guide depuis le [début](/guide/juratax/avant-de-commencer). Déclarez le **salaire net du chiffre 11** du certificat au code 100 : l'impôt à la source retenu (chiffre 12) n'est pas déduit du salaire, il est **imputé** sur l'impôt calculé. Gardez vos décomptes d'impôt à la source et joignez-les si JuraTax les demande.",
      },
    ],
    faq: [
      {
        q: "Jusqu'à quand demander une TOU dans le canton du Jura ?",
        a: "Par écrit, au plus tard le 31 mars de l'année suivante, soit le 31 mars 2027 pour l'année 2026. Le même délai vaut pour annoncer une TOU obligatoire et pour une demande de quasi-résident.",
      },
      {
        q: "À partir de quel salaire la TOU est-elle obligatoire dans le Jura ?",
        a: "Dès un revenu brut d'activité de plus de CHF 120'000 par an, ou dès que vous avez de la fortune imposable ou des revenus non soumis à l'impôt à la source.",
      },
      {
        q: "Un frontalier français qui travaille à Delémont paie-t-il l'impôt dans le Jura ?",
        a: "Non, s'il rentre en principe chaque jour en France et remet à son employeur l'attestation de résidence fiscale française : selon l'accord de 1983, il est imposé en France. Le canton reçoit une compensation financière de la France.",
      },
      {
        q: "Peut-on renoncer à la TOU après l'avoir demandée ?",
        a: "Non. Une TOU demandée s'applique aussi aux années suivantes tant que vous restez soumis à l'impôt à la source. Faites le calcul avant de déposer la demande.",
      },
    ],
  },
  en: {
    title: "Tax at source in the canton of Jura: mandatory TOU, TOU on request, quasi-residents and cross-border workers",
    navTitle: "Tax at source and TOU",
    metaTitle: "Tax at source in Jura: TOU, quasi-residents and cross-border workers",
    metaDescription:
      "When a person taxed at source in the canton of Jura must or may file a JuraTax return: mandatory TOU from CHF 120,000, TOU on request before 31 March 2027, quasi-resident status (90%) and French cross-border workers under the 1983 agreement.",
    keywords: [
      "tax at source jura",
      "tou jura",
      "subsequent ordinary assessment jura",
      "quasi-resident jura",
      "cross-border worker france jura tax",
      "juratax tax at source",
    ],
    summary: [
      "Resident taxed at source with gross income above **CHF 120,000**, taxable wealth or income not subject to tax at source: **subsequent ordinary assessment (TOU) is mandatory**.",
      "Below that, TOU is requested **in writing by 31 March 2027 at the latest** for 2026, for example to deduct a pension fund buy-in, pillar 3a or maintenance payments.",
      "Non-residents: TOU is only possible with **quasi-resident** status, i.e. at least **90%** of the couple's worldwide gross income taxable in Switzerland.",
      "**Cross-border workers living in France** who return home every day are taxed **in France** under the 1983 Franco-Swiss agreement, not at source in Jura.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Who is concerned?" },
      {
        type: "p",
        text: "Foreign workers without a C permit living in the canton of Jura, and people living abroad who work there, normally pay **tax at source**, withheld monthly by the employer under a scale that includes flat-rate deductions. Depending on your situation, a **subsequent ordinary assessment (TOU, « taxation ordinaire ultérieure »)** replaces this system: you then file a full return with JuraTax and the tax service credits the tax already withheld. These rules come from federal law, harmonised since 1 January 2021.",
      },

      { type: "h2", id: "tou-obligatoire", text: "Mandatory TOU (residents)" },
      {
        type: "table",
        head: ["Situation in 2026", "Consequence"],
        rows: [
          ["Gross earned income above CHF 120,000 a year", "Mandatory TOU for 2026 and following years, until taxation at source ends"],
          ["Taxable wealth", "Mandatory TOU"],
          ["Income not subject to tax at source (rent, investment income, self-employment)", "Mandatory TOU"],
          ["Spouse of a person under TOU, if also taxed at source", "TOU as well"],
        ],
        caption: "Source: Federal Direct Tax Act (art. 89) and Federal Tax Harmonisation Act (art. 33a), Tax at Source Ordinance (CHF 120,000 threshold), in force since 1 January 2021.",
      },
      {
        type: "p",
        text: "If any of these applies to you, **report it in writing before 31 March** of the following year. The tax service then sends you a tax return, which you complete with JuraTax like any Jura taxpayer.",
      },

      { type: "h2", id: "tou-demande", text: "TOU on request (residents below CHF 120,000)" },
      {
        type: "p",
        text: "A resident whose income stays below CHF 120,000 can **request** a TOU to claim deductions not built into the scale: **actual work expenses**, **pillar 3a** (and 3a catch-up contributions from 2026), **pension fund buy-ins**, **maintenance payments**, childcare, interest paid. The request is made **in writing, by 31 March 2027 at the latest** for 2026.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Do the maths before you ask",
        text: "A requested TOU then also applies to the **following years**, as long as you remain taxed at source: you cannot opt out. It can therefore cost more than it saves, for example if you have investment income or your municipality has a high multiplier. First simulate ordinary tax with the calculator on the Jura virtual counter or our [tax simulator](/simulateur/impots).",
      },

      { type: "h2", id: "quasi-resident", text: "Non-residents: quasi-resident status" },
      {
        type: "p",
        text: "A person living abroad can only request a TOU if at least **90% of their worldwide gross income** for the year, including their spouse's, is taxable in Switzerland. The request is also filed **before 31 March** of the following year, with Swiss salary certificates and proof of foreign income. The status is checked every year.",
      },

      { type: "h2", id: "frontaliers", text: "Cross-border workers living in France" },
      {
        type: "p",
        text: "The canton of Jura applies the **Franco-Swiss agreement of 11 April 1983** on cross-border workers. A cross-border worker who **lives in France and normally returns home every day** is taxed **in France** on their Jura salary; the employer does not withhold tax at source if it receives the French **certificate of tax residence** each year. In return, France pays the canton financial compensation. A cross-border worker therefore does **not file a JuraTax return** for their salary. A cross-border worker living in Germany, or who does not return home daily, falls under other rules: check your situation with the tax service.",
      },

      { type: "h2", id: "juratax", text: "Filing a TOU in JuraTax" },
      {
        type: "p",
        text: "Under TOU, the return is the same as for other taxpayers: follow this guide from the [start](/guide/juratax/avant-de-commencer). Declare the **net salary from box 11** of the certificate under code 100: tax withheld at source (box 12) is not subtracted from the salary, it is **credited** against the tax calculated. Keep your tax-at-source statements and enclose them if JuraTax asks for them.",
      },
    ],
    faq: [
      {
        q: "What is the deadline to request a TOU in Jura?",
        a: "In writing, by 31 March of the following year, i.e. 31 March 2027 for 2026. The same deadline applies to reporting a mandatory TOU and to a quasi-resident request.",
      },
      {
        q: "From what salary is TOU mandatory in Jura?",
        a: "From gross earned income above CHF 120,000 a year, or as soon as you have taxable wealth or income not subject to tax at source.",
      },
      {
        q: "Does a French cross-border worker employed in Delémont pay tax in Jura?",
        a: "No, if they normally return to France every day and give their employer the French certificate of tax residence: under the 1983 agreement, they are taxed in France. The canton receives financial compensation from France.",
      },
      {
        q: "Can I give up TOU after requesting it?",
        a: "No. A requested TOU also applies to the following years as long as you remain taxed at source. Do the maths before filing the request.",
      },
    ],
  },
};
