import type { GuideChapter } from "../../types";

export const impotSource: GuideChapter = {
  slug: "impot-source-tou",
  readTime: 6,
  fr: {
    title: "Impôt à la source dans le canton de Fribourg : TOU obligatoire, TOU sur demande et quasi-résidents",
    navTitle: "Impôt à la source et TOU",
    metaTitle: "Impôt à la source Fribourg : TOU, délai du 31 mars et quasi-résident (2026)",
    metaDescription:
      "Quand une personne imposée à la source dans le canton de Fribourg doit ou peut remplir une déclaration FriTax : TOU obligatoire dès CHF 120'000, TOU sur demande avant le 31 mars 2027, statut de quasi-résident (90 %), formulaires et adresse scciso@fr.ch.",
    keywords: [
      "impôt à la source fribourg",
      "tou fribourg",
      "taxation ordinaire ultérieure fribourg",
      "quasi-résident fribourg",
      "impôt à la source 120000 fribourg",
      "fritax impôt à la source",
    ],
    summary: [
      "Résident imposé à la source avec un revenu brut de plus de **CHF 120'000**, de la fortune imposable ou des revenus non soumis à l'impôt à la source : **taxation ordinaire ultérieure (TOU) obligatoire**.",
      "En dessous, la TOU se demande **par écrit au plus tard le 31 mars 2027** pour l'année 2026, par exemple pour déduire un rachat LPP, un 3e pilier A ou des pensions alimentaires.",
      "Non-résidents : la TOU n'est possible qu'avec le statut de **quasi-résident**, soit au moins **90 %** des revenus mondiaux bruts du couple imposables en Suisse.",
      "Une fois en TOU, vous remplissez une déclaration ordinaire avec **FriTax** ; l'impôt à la source retenu est imputé sur l'impôt dû.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Qui est concerné ?" },
      {
        type: "p",
        text: "Les travailleurs étrangers sans permis C domiciliés dans le canton de Fribourg, ainsi que les personnes domiciliées à l'étranger qui travaillent dans le canton, paient en principe l'**impôt à la source**, retenu chaque mois par l'employeur. Le barème intègre des déductions forfaitaires. Selon votre situation, une **taxation ordinaire ultérieure (TOU)** remplace ou complète ce système : vous remplissez alors une déclaration complète et le SCC impute l'impôt déjà retenu.",
      },

      { type: "h2", id: "tou-obligatoire", text: "TOU obligatoire (résidents)" },
      {
        type: "table",
        head: ["Situation en 2026", "Conséquence"],
        rows: [
          ["Revenu brut d'activité de plus de CHF 120'000 par an", "TOU obligatoire pour 2026 et les années suivantes"],
          ["Fortune imposable", "TOU obligatoire"],
          ["Revenus non soumis à l'impôt à la source (loyers, rendements, activité indépendante)", "TOU obligatoire"],
        ],
        caption: "Source : « Infos pour les personnes imposées à la source (PIS) », SCC Fribourg, valable dès le 1er janvier 2021.",
      },
      {
        type: "p",
        text: "Si vous êtes dans l'un de ces cas, vous devez l'**annoncer par écrit avant le 31 mars** de l'année suivante. Le SCC vous envoie alors une déclaration d'impôt, que vous remplissez avec FriTax comme tout contribuable fribourgeois.",
      },

      { type: "h2", id: "tou-demande", text: "TOU sur demande (résidents sous CHF 120'000)" },
      {
        type: "p",
        text: "Un résident dont le revenu reste sous CHF 120'000 peut **demander** une TOU pour faire valoir des déductions que la correction de barème ne couvre pas : **frais professionnels effectifs**, **3e pilier A** (et rachats 3a dès 2026), **rachats LPP**, **pensions alimentaires**, frais de garde, intérêts passifs. La demande se fait **par écrit, au plus tard le 31 mars 2027** pour l'année 2026.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Faites le calcul avant de demander",
        text: "La TOU demandée s'applique ensuite aussi aux **années suivantes**, tant que vous restez imposé à la source. Elle peut donc coûter plus qu'elle ne rapporte, par exemple si vous avez des revenus de fortune ou si la commune applique un coefficient élevé. Simulez d'abord l'impôt ordinaire avec FriTax ou notre [simulateur](/simulateur/impots).",
      },
      {
        type: "p",
        text: "Pour une simple déduction ponctuelle, deux autres démarches existent, chacune **au plus tard le 31 mars** : la **demande de correction de barème** (par exemple pour faire reconnaître un enfant ou un changement d'état civil) et la **demande de décision de taxation**, qui conduit à une décision formelle dès juillet, contestable par réclamation écrite dans les 30 jours.",
      },

      { type: "h2", id: "quasi-resident", text: "Non-résidents : le statut de quasi-résident" },
      {
        type: "p",
        text: "Une personne domiciliée à l'étranger ne peut demander la TOU que si au moins **90 % de ses revenus mondiaux bruts** de l'année, y compris ceux de son conjoint, sont imposables en Suisse. Joignez à la demande le **formulaire de détermination du statut**, les certificats de salaire suisses et les attestations fiscales étrangères, et **désignez obligatoirement un représentant en Suisse**.",
      },
      {
        type: "list",
        items: [
          "Les formulaires sont disponibles sur la page « Personnes imposées à la source » de fr.ch, du 1er janvier au 31 mars.",
          "Ils se renvoient remplis, en PDF, à l'adresse **scciso@fr.ch**.",
          "Une demande de remboursement de l'impôt à la source sur prestations en capital (pour les caisses de pension) existe en français et en anglais.",
        ],
      },

      { type: "h2", id: "fritax", text: "Remplir la TOU dans FriTax" },
      {
        type: "p",
        text: "En TOU, la déclaration est la même que celle des autres contribuables : suivez ce guide depuis le [début](/guide/fritax/avant-de-commencer). Déclarez le **salaire brut moins cotisations**, soit le chiffre 11 du certificat, sous le code 1.110 : l'impôt à la source retenu (chiffre 12 du certificat) n'est pas déduit du salaire, il est **imputé** sur l'impôt calculé. Gardez vos décomptes d'impôt à la source et joignez-les si FriTax les demande.",
      },
    ],
    faq: [
      {
        q: "Jusqu'à quand demander une TOU dans le canton de Fribourg ?",
        a: "Par écrit, au plus tard le 31 mars de l'année suivante, soit le 31 mars 2027 pour l'année 2026. Le même délai vaut pour annoncer une TOU obligatoire.",
      },
      {
        q: "À partir de quel salaire la TOU est-elle obligatoire dans le canton de Fribourg ?",
        a: "Dès un revenu brut d'activité de plus de CHF 120'000 par an, ou dès que vous avez de la fortune imposable ou des revenus non soumis à l'impôt à la source.",
      },
      {
        q: "Comment devenir quasi-résident dans le canton de Fribourg ?",
        a: "Au moins 90 % des revenus mondiaux bruts de l'année, conjoint compris, doivent être imposables en Suisse. Envoyez la demande de TOU avec le formulaire de détermination du statut, les certificats de salaire et attestations étrangères à scciso@fr.ch avant le 31 mars, et désignez un représentant en Suisse.",
      },
      {
        q: "Peut-on renoncer à la TOU après l'avoir demandée ?",
        a: "Non. Une TOU demandée s'applique aussi aux années suivantes tant que vous restez soumis à l'impôt à la source. Faites le calcul avant de déposer la demande.",
      },
    ],
  },
  en: {
    title: "Source tax in Fribourg: mandatory TOU, TOU on request and quasi-residents",
    navTitle: "Source tax and TOU",
    metaTitle: "Fribourg source tax: TOU, 31 March deadline and quasi-resident status (2026)",
    metaDescription:
      "When a person taxed at source in Fribourg must or may file a FriTax return: mandatory subsequent ordinary assessment (TOU) above CHF 120,000, TOU on request by 31 March 2027, quasi-resident status (90%), forms and the scciso@fr.ch address.",
    keywords: [
      "source tax fribourg",
      "tou fribourg",
      "subsequent ordinary assessment fribourg",
      "quasi resident fribourg",
      "withholding tax 120000 fribourg",
      "fritax source tax",
    ],
    summary: [
      "Residents taxed at source with gross income above **CHF 120,000**, taxable wealth or income not subject to source tax: **subsequent ordinary assessment (TOU, « taxation ordinaire ultérieure ») is mandatory**.",
      "Below that, TOU must be **requested in writing by 31 March 2027** for 2026, for example to deduct a pension fund buy-in, pillar 3a or maintenance payments.",
      "Non-residents: TOU is only possible with **quasi-resident** status, i.e. at least **90%** of the couple's worldwide gross income taxable in Switzerland.",
      "Once in TOU, you file an ordinary return with **FriTax**; the source tax withheld is credited against the tax due.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Who is affected?" },
      {
        type: "p",
        text: "Foreign workers without a C permit living in Fribourg, and people living abroad who work in the canton, normally pay **source tax**, withheld monthly by their employer. The scale includes flat-rate deductions. Depending on your situation, a **subsequent ordinary assessment (TOU)** replaces or supplements this system: you then file a full return and the SCC credits the tax already withheld.",
      },

      { type: "h2", id: "tou-obligatoire", text: "Mandatory TOU (residents)" },
      {
        type: "table",
        head: ["Situation in 2026", "Consequence"],
        rows: [
          ["Gross earned income above CHF 120,000 a year", "TOU mandatory for 2026 and following years"],
          ["Taxable wealth", "TOU mandatory"],
          ["Income not subject to source tax (rents, investment income, self-employment)", "TOU mandatory"],
        ],
        caption: "Source: « Infos pour les personnes imposées à la source (PIS) », SCC Fribourg, valid from 1 January 2021.",
      },
      {
        type: "p",
        text: "If any of these applies, you must **notify the SCC in writing before 31 March** of the following year. The SCC then sends you a tax return, which you complete with FriTax like any Fribourg taxpayer.",
      },

      { type: "h2", id: "tou-demande", text: "TOU on request (residents below CHF 120,000)" },
      {
        type: "p",
        text: "A resident with income below CHF 120,000 can **request** a TOU to claim deductions the scale correction does not cover: **actual work expenses**, **pillar 3a** (and 3a catch-up payments from 2026), **pension fund buy-ins**, **maintenance payments**, childcare costs, interest paid. The request must be made **in writing, by 31 March 2027** for 2026.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Do the maths before you apply",
        text: "A requested TOU then also applies to the **following years**, as long as you remain taxed at source. It can therefore cost more than it saves, for example if you have investment income or your municipality has a high multiplier. First simulate the ordinary tax with FriTax or our [tax simulator](/simulateur/impots).",
      },
      {
        type: "p",
        text: "For a one-off adjustment, there are two other options, each **by 31 March**: a **scale correction request** (for example to have a child or a change of marital status recognised) and a **request for an assessment decision**, which leads to a formal decision from July, open to written objection within 30 days.",
      },

      { type: "h2", id: "quasi-resident", text: "Non-residents: quasi-resident status" },
      {
        type: "p",
        text: "A person living abroad can only request a TOU if at least **90% of their worldwide gross income** for the year, including their spouse's, is taxable in Switzerland. Attach the **status determination form**, your Swiss salary certificates and foreign tax certificates to the request, and you **must appoint a representative in Switzerland**.",
      },
      {
        type: "list",
        items: [
          "The forms are available on the « Personnes imposées à la source » page of fr.ch, from 1 January to 31 March.",
          "Send them back completed, as PDF, to **scciso@fr.ch**.",
          "A claim form for the refund of source tax on lump-sum benefits (for pension funds) is available in French and English.",
        ],
      },

      { type: "h2", id: "fritax", text: "Completing a TOU in FriTax" },
      {
        type: "p",
        text: "In a TOU, the return is the same as for other taxpayers: follow this guide from the [start](/guide/fritax/avant-de-commencer). Declare **salary after social contributions**, i.e. box 11 of the certificate, under code 1.110: the source tax withheld (box 12 of the certificate) is not deducted from salary but **credited** against the tax calculated. Keep your source tax statements and attach them if FriTax asks for them.",
      },
    ],
    faq: [
      {
        q: "What is the deadline to request a TOU in Fribourg?",
        a: "In writing, by 31 March of the following year, i.e. 31 March 2027 for 2026. The same deadline applies to notifying a mandatory TOU.",
      },
      {
        q: "From what salary is TOU mandatory in Fribourg?",
        a: "From gross earned income above CHF 120,000 a year, or as soon as you have taxable wealth or income not subject to source tax.",
      },
      {
        q: "How do I become a quasi-resident in Fribourg?",
        a: "At least 90% of the year's worldwide gross income, including your spouse's, must be taxable in Switzerland. Send the TOU request with the status determination form, salary certificates and foreign certificates to scciso@fr.ch before 31 March, and appoint a representative in Switzerland.",
      },
      {
        q: "Can I withdraw from TOU after requesting it?",
        a: "No. A requested TOU also applies to the following years as long as you remain subject to source tax. Do the maths before applying.",
      },
    ],
  },
};
