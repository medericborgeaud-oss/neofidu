import type { GuideChapter } from "../../types";

export const impotSource: GuideChapter = {
  slug: "impot-source-tou",
  readTime: 7,
  fr: {
    title: "Impôt à la source et TOU en Valais : qui remplit VSTax, demande avant le 31 mars, quasi-résidents",
    navTitle: "Impôt à la source et TOU",
    metaTitle: "Impôt à la source Valais : TOU obligatoire ou sur demande (2026)",
    metaDescription:
      "Taxation ordinaire ultérieure (TOU) en Valais : obligatoire dès CHF 120'000 de salaire, sur demande en ligne avant le 31 mars 2027, quasi-résidents à 90 %, frontaliers et déclaration VSTax.",
    keywords: [
      "tou valais",
      "taxation ordinaire ultérieure valais",
      "impôt à la source valais 2026",
      "quasi-résident valais",
      "demande tou 31 mars valais",
      "permis b impôt valais déclaration",
    ],
    summary: [
      "Les travailleurs étrangers sans permis C domiciliés en Valais paient l'**impôt à la source** sur leur salaire. Ils remplissent une déclaration VSTax seulement en cas de **taxation ordinaire ultérieure (TOU)**.",
      "La TOU est **obligatoire** notamment dès un salaire brut de **CHF 120'000** par personne, avec un immeuble, ou avec d'autres revenus non imposés à la source de plus de CHF 1'000.",
      "Sinon, la TOU peut être **demandée en ligne** jusqu'au **31 mars 2027** pour l'année 2026. La demande est **irrévocable** et vaut pour les années suivantes.",
      "Les personnes domiciliées à l'étranger peuvent demander une TOU comme **quasi-résidents** si au moins **90 %** des revenus mondiaux du ménage sont imposables en Suisse.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Qui est imposé à la source en Valais ?" },
      {
        type: "p",
        text: "Un travailleur étranger qui n'a pas de **permis d'établissement (C)** et qui est domicilié ou en séjour dans le canton du Valais est imposé à la source sur le revenu de son activité salariée : l'employeur retient l'impôt sur chaque salaire. Exception : les époux vivant ensemble sont imposés selon la procédure ordinaire, avec une déclaration VSTax, si l'un d'eux est **suisse ou titulaire d'un permis C**.",
      },

      { type: "h2", id: "tou-obligatoire", text: "TOU obligatoire : les cas" },
      {
        type: "table",
        head: ["Situation (résident en Suisse)", "Conséquence"],
        rows: [
          ["Salaire brut annuel de CHF 120'000 ou plus par personne", "TOU obligatoire"],
          ["Fortune imposable de plus de CHF 60'000 (seul) ou CHF 120'000 (couple)", "TOU obligatoire"],
          ["Autres revenus non imposés à la source de plus de CHF 1'000 (rentes, pension alimentaire, rendements de titres)", "TOU obligatoire"],
          ["Propriété d'un immeuble en Suisse ou à l'étranger", "TOU obligatoire"],
          ["Activité lucrative indépendante", "TOU obligatoire"],
          ["Enfant à charge avec un concubin", "TOU obligatoire"],
        ],
        caption: "Source : « Demander une taxation ordinaire ultérieure (TOU) », SCC Valais, vs.ch.",
      },
      {
        type: "p",
        text: "En cas de TOU obligatoire, vous devez vous **annoncer** au SCC au plus tard le **31 mars** de l'année qui suit, si l'administration ne vous a pas déjà envoyé de déclaration.",
      },

      { type: "h2", id: "tou-demande", text: "TOU sur demande : avant le 31 mars, et pour de bon" },
      {
        type: "list",
        items: [
          "La demande se fait **uniquement en ligne**, sur vs.ch ; une lettre libre n'est pas acceptée.",
          "Délai : au plus tard le **31 mars 2027** pour l'année 2026. En cas de départ de Suisse en cours d'année, le délai expire au moment de l'annonce du départ.",
          "La demande est **irrévocable**, même si la TOU coûte plus cher que l'impôt à la source.",
          "Une fois en TOU, vous y restez pour **toutes les années suivantes**, jusqu'à la fin de l'imposition à la source. Le conjoint vivant avec vous est aussi taxé ordinairement, même après une séparation.",
          "L'employeur continue de retenir l'impôt à la source ; celui-ci est imputé sur l'impôt final, avec un remboursement ou un solde à payer.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Quand la TOU vaut la peine",
        text: "Le barème de l'impôt à la source intègre des déductions forfaitaires. La TOU permet de faire valoir vos frais réels : **rachats LPP**, **3e pilier A** (et rachats 3a dès 2026), frais de déplacement élevés, frais de garde, intérêts hypothécaires, pensions alimentaires. Faites le calcul avant de demander : la décision est définitive.",
      },

      { type: "h2", id: "quasi-residents", text: "Domiciliés à l'étranger : statut de quasi-résident" },
      {
        type: "p",
        text: "Une personne domiciliée à l'étranger et imposée à la source en Valais peut demander une TOU si au moins **90 % de ses revenus bruts mondiaux**, y compris ceux du conjoint, sont imposables en Suisse. Contrairement aux résidents, la demande doit être **renouvelée chaque année**, avant le 31 mars. La déclaration se remplit alors avec VSTax, type « **Domicilié hors de la Suisse** », en indiquant aussi les revenus étrangers pour le calcul du taux.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Frontaliers",
        text: "Les frontaliers résidant en **France** et travaillant en Valais relèvent de l'accord franco-suisse de 1983 : ils sont imposés en France sur présentation d'une attestation de résidence fiscale, sans impôt à la source valaisan. Les frontaliers **italiens** et **allemands** sont imposés à la source selon des barèmes spécifiques prévus par les conventions avec ces pays.",
      },

      { type: "h2", id: "remplir", text: "Remplir la déclaration en TOU" },
      {
        type: "p",
        text: "En TOU, vous remplissez une déclaration complète avec VSTax, comme tout contribuable, en suivant les chapitres de ce guide. Le salaire se déclare **net**, d'après le certificat de salaire (chiffre 11), et non après déduction de l'impôt à la source. Joignez les attestations d'impôt à la source de l'employeur : le SCC impute les montants retenus sur l'impôt calculé.",
      },
    ],
    faq: [
      {
        q: "Jusqu'à quand demander une TOU en Valais ?",
        a: "Au plus tard le 31 mars de l'année qui suit, soit le 31 mars 2027 pour l'année 2026, uniquement en ligne sur vs.ch. La demande ne peut plus être retirée ensuite.",
      },
      {
        q: "À partir de quel salaire la TOU est-elle obligatoire en Valais ?",
        a: "Dès un salaire brut annuel de CHF 120'000 par personne. D'autres situations la rendent obligatoire : immeuble, fortune importante, autres revenus de plus de CHF 1'000, activité indépendante.",
      },
      {
        q: "Un frontalier peut-il remplir une déclaration VSTax ?",
        a: "Oui, s'il obtient le statut de quasi-résident : au moins 90 % des revenus mondiaux du ménage imposables en Suisse, avec une demande à renouveler chaque année avant le 31 mars.",
      },
      {
        q: "La TOU est-elle toujours avantageuse ?",
        a: "Non. Elle l'est surtout avec des rachats LPP, un 3e pilier, des frais de déplacement ou de garde élevés. Comme la demande est irrévocable et vaut pour les années suivantes, mieux vaut faire une simulation avant.",
      },
    ],
  },
  en: {
    title: "Source tax and TOU in Valais: who files VSTax, applying before 31 March, quasi-residents",
    navTitle: "Source tax and TOU",
    metaTitle: "Valais source tax: mandatory or requested TOU (2026)",
    metaDescription:
      "Subsequent ordinary assessment (TOU) in Valais: mandatory from CHF 120,000 salary, online request by 31 March 2027, 90% quasi-residents, cross-border workers and the VSTax return.",
    keywords: [
      "tou valais",
      "valais source tax 2026",
      "subsequent ordinary assessment valais",
      "quasi resident valais",
      "b permit tax return valais",
      "withholding tax refund valais expat",
    ],
    summary: [
      "Foreign employees without a C permit living in Valais pay **source tax** on their salary. They only complete a VSTax return under a **subsequent ordinary assessment (TOU)**.",
      "TOU is **mandatory** in particular from a gross salary of **CHF 120,000** per person, if you own property, or with more than CHF 1,000 of other income not taxed at source.",
      "Otherwise, TOU can be **requested online** until **31 March 2027** for 2026. The request is **irrevocable** and applies to the following years.",
      "People living abroad can request TOU as **quasi-residents** if at least **90%** of the household's worldwide income is taxable in Switzerland.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Who pays source tax in Valais?" },
      {
        type: "p",
        text: "A foreign employee without a **settlement permit (C)** who lives or stays in the canton of Valais is taxed at source on employment income: the employer deducts the tax from each payslip. Exception: spouses living together are taxed under the ordinary procedure, with a VSTax return, if one of them is **Swiss or holds a C permit**.",
      },

      { type: "h2", id: "tou-obligatoire", text: "Mandatory TOU: the cases" },
      {
        type: "table",
        head: ["Situation (resident in Switzerland)", "Consequence"],
        rows: [
          ["Gross annual salary of CHF 120,000 or more per person", "TOU mandatory"],
          ["Taxable wealth over CHF 60,000 (single) or CHF 120,000 (couple)", "TOU mandatory"],
          ["Other income not taxed at source over CHF 1,000 (pensions, maintenance, investment income)", "TOU mandatory"],
          ["Owning property in Switzerland or abroad", "TOU mandatory"],
          ["Self-employed activity", "TOU mandatory"],
          ["Dependent child with an unmarried partner", "TOU mandatory"],
        ],
        caption: "Source: \"Demander une taxation ordinaire ultérieure (TOU)\", SCC Valais, vs.ch.",
      },
      {
        type: "p",
        text: "If TOU is mandatory, you must **notify** the SCC by **31 March** of the following year, unless the administration has already sent you a return.",
      },

      { type: "h2", id: "tou-demande", text: "Requested TOU: before 31 March, and for good" },
      {
        type: "list",
        items: [
          "The request is made **online only**, on vs.ch; a plain letter is not accepted.",
          "Deadline: **31 March 2027** at the latest for 2026. If you leave Switzerland during the year, the deadline ends when you notify your departure.",
          "The request is **irrevocable**, even if TOU costs more than source tax.",
          "Once under TOU, you stay there for **all following years**, until source taxation ends. A spouse living with you is also assessed ordinarily, even after separation.",
          "Your employer keeps deducting source tax; it is credited against the final tax, leading to a refund or a balance to pay.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "When TOU pays off",
        text: "Source tax rates include flat-rate deductions. TOU lets you claim your actual costs: **pension fund buy-ins**, **pillar 3a** (and 3a catch-ups from 2026), high commuting costs, childcare, mortgage interest, maintenance payments. Run the numbers before applying: the decision is final.",
      },

      { type: "h2", id: "quasi-residents", text: "Living abroad: quasi-resident status" },
      {
        type: "p",
        text: "A person living abroad and taxed at source in Valais can request TOU if at least **90% of their worldwide gross income**, including their spouse's, is taxable in Switzerland. Unlike residents, the request must be **renewed every year**, before 31 March. The return is then completed in VSTax with the « **Domicilié hors de la Suisse** » (resident abroad) type, including foreign income for the rate calculation.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Cross-border workers",
        text: "Cross-border workers living in **France** and working in Valais fall under the 1983 France-Switzerland agreement: they are taxed in France on presentation of a tax residence certificate, with no Valais source tax. **Italian** and **German** cross-border workers are taxed at source under specific rates provided for by the treaties with those countries.",
      },

      { type: "h2", id: "remplir", text: "Completing the return under TOU" },
      {
        type: "p",
        text: "Under TOU, you complete a full return in VSTax like any taxpayer, following the chapters of this guide. Salary is declared **net** as per the salary certificate (box 11), not after deducting source tax. Attach the employer's source tax statements: the SCC credits the amounts withheld against the tax due.",
      },
    ],
    faq: [
      {
        q: "What is the deadline to request TOU in Valais?",
        a: "31 March of the following year at the latest, i.e. 31 March 2027 for 2026, online only on vs.ch. The request cannot be withdrawn afterwards.",
      },
      {
        q: "From what salary is TOU mandatory in Valais?",
        a: "From a gross annual salary of CHF 120,000 per person. Other situations also make it mandatory: property, significant wealth, other income over CHF 1,000, self-employment.",
      },
      {
        q: "Can a cross-border worker file a VSTax return?",
        a: "Yes, with quasi-resident status: at least 90% of the household's worldwide income taxable in Switzerland, with a request to renew every year before 31 March.",
      },
      {
        q: "Is TOU always worth it?",
        a: "No. It mainly pays off with pension fund buy-ins, pillar 3a, or high commuting or childcare costs. Since the request is irrevocable and applies to later years, run a simulation first.",
      },
    ],
  },
};
