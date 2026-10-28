import type { GuideChapter } from "../../types";

export const impotSource: GuideChapter = {
  slug: "impot-source-tou",
  readTime: 9,
  fr: {
    title: "Impôt à la source à Genève : DRIS, TOU, quasi-résidents et frontaliers",
    navTitle: "Impôt à la source et TOU",
    metaTitle: "Impôt à la source Genève 2026 : DRIS, TOU, quasi-résident, frontalier",
    metaDescription:
      "Quand demander une rectification (DRIS) ou une taxation ordinaire ultérieure (TOU) à Genève, TOU obligatoire dès CHF 120'000, statut de quasi-résident (90 %), frontaliers de France, délai du 31 mars.",
    keywords: [
      "tou genève",
      "taxation ordinaire ultérieure genève 31 mars",
      "dris genève",
      "quasi-résident genève 90 %",
      "frontalier impôt à la source genève",
      "impôt à la source rectification genève",
    ],
    summary: [
      "Si vous êtes imposé à la source, deux demandes existent : la **DRIS** (rectification du barème, de la situation familiale ou du salaire) et la **TOU** (taxation ordinaire ultérieure, avec une vraie déclaration et toutes les déductions). Délai pour les deux : le **31 mars** de l'année suivante.",
      "Depuis 2021, le **3e pilier, les rachats LPP, les frais de garde et de formation** ne se récupèrent plus par la DRIS : il faut une TOU.",
      "Pour les résidents, la TOU est **obligatoire** dès **CHF 120'000** de revenu brut annuel, ou avec plus de CHF 3'000 de revenus non soumis à la source, de la fortune imposable ou un immeuble.",
      "Les non-résidents, dont les **frontaliers**, ne peuvent demander une TOU que s'ils sont **quasi-résidents** (au moins 90 % des revenus bruts mondiaux du couple imposables en Suisse) ou dans une situation particulière, et doivent la redemander **chaque année**.",
    ],
    blocks: [
      { type: "h2", id: "principe", text: "Impôt à la source : ce que le barème couvre déjà" },
      {
        type: "p",
        text: "Les étrangers sans permis C domiciliés en Suisse, et les personnes domiciliées à l'étranger qui travaillent dans le canton de Genève, sont imposés à la source : l'employeur retient l'impôt sur chaque salaire. Les barèmes intègrent la situation familiale et des **déductions forfaitaires** (frais professionnels, primes d'assurance). Tout ce qui sort de ces forfaits se règle par une demande à déposer au plus tard le **31 mars** de l'année qui suit le prélèvement.",
      },

      { type: "h2", id: "dris-tou", text: "DRIS ou TOU ?" },
      {
        type: "table",
        head: ["", "DRIS (rectification)", "TOU (taxation ordinaire ultérieure)"],
        rows: [
          ["Ce qu'elle corrige", "Salaire retenu, barème, taux, revenu effectif du conjoint (barème C), enfants non pris en compte par l'employeur", "Calcul complet sur déclaration : tous les revenus, la fortune et toutes les déductions"],
          ["3e pilier A, rachats LPP, garde, formation, pensions pour enfants mineurs", "Non, depuis 2021", "Oui"],
          ["Forme", "Formulaire DRIS/TOU, en ligne dans l'espace fiscal ou sur papier", "Même formulaire, puis une déclaration d'impôt complète"],
          ["Délai", "31 mars de l'année suivante", "31 mars de l'année suivante"],
        ],
        caption: "Source : pages « Pourquoi demander la rectification impôt source (DRIS) ? » et « Quand demander ou annoncer une TOU », ge.ch ; AFC Infos février 2026.",
      },
      {
        type: "p",
        text: "Le formulaire DRIS/TOU est envoyé par l'employeur ; avec la e-correspondance, il se remplit directement dans l'espace fiscal des e-démarches. Une copie peut être demandée à l'AFC en cas de perte, de divorce ou de séparation.",
      },

      { type: "h2", id: "residents", text: "Vous habitez en Suisse" },
      { type: "h3", text: "TOU obligatoire" },
      {
        type: "list",
        items: [
          "revenu brut annuel d'au moins **CHF 120'000** (pour un couple, il suffit qu'un des conjoints l'atteigne) ;",
          "revenus bruts **non soumis** à la source d'au moins **CHF 3'000** par an (en dessous, ils se déclarent sur le formulaire DRIS/TOU) ;",
          "fortune imposable ou **propriété immobilière** ;",
          "activité indépendante dans le canton de Genève, ou autre activité à l'étranger.",
        ],
      },
      {
        type: "p",
        text: "Une fois la TOU obligatoire effectuée, elle s'applique **aussi les années suivantes**, même si vous ne remplissez plus les conditions.",
      },
      { type: "h3", text: "TOU sur demande" },
      {
        type: "p",
        text: "En dessous de ces seuils, vous pouvez demander une TOU au plus tard le **31 mars** de l'année qui suit, par exemple pour déduire un rachat LPP ou un 3e pilier. Elle n'a pas besoin d'être renouvelée chaque année, mais elle vaut alors pour les années suivantes : comparez avant de la demander.",
      },

      { type: "h2", id: "non-residents", text: "Vous habitez à l'étranger : quasi-résidents et frontaliers" },
      {
        type: "p",
        text: "Pour une personne domiciliée à l'étranger, la TOU n'est possible que sur demande, à renouveler **chaque année** avant le 31 mars, dans l'un de ces cas :",
      },
      {
        type: "list",
        items: [
          "**Quasi-résident** : au moins **90 %** des revenus bruts mondiaux, conjoint compris, sont imposables en Suisse. L'AFC met à disposition une calculette ; les revenus de fonctionnaires internationaux entrent dans le calcul.",
          "**Situation particulière** : déductions impossibles dans l'État de résidence faute de revenus suffisants, ou cotisations de prévoyance étrangère admises par une convention de double imposition. Écrivez avant le 31 mars à la Direction des affaires fiscales, justificatifs à l'appui.",
          "**Garde alternée** remplissant les critères du splitting partiel.",
        ],
      },
      {
        type: "p",
        text: "L'AFC procède aussi d'office à une TOU si vous êtes salarié dans le canton de Genève **et** indépendant ou propriétaire dans le canton, ou marié à un conjoint qui l'est.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Frontaliers résidant en France",
        text: "Le canton de Genève n'applique pas l'accord franco-suisse de 1983 sur les frontaliers : un frontalier qui habite en France et travaille dans le canton de Genève y est **imposé à la source**. Depuis le 1er janvier 2023, il peut télétravailler jusqu'à **40 %** de son temps de travail annuel sans changement d'imposition. Attention au calcul des 90 % : le salaire d'un conjoint qui travaille dans un autre canton frontalier, imposé en France selon l'accord de 1983, fait baisser la part suisse.",
      },
      {
        type: "p",
        text: "Pour un exemple chiffré et les pièges du statut, lisez notre [guide du quasi-résident frontalier à Genève](/blog/frontalier-quasi-resident-geneve-guide-2026) et le [guide complet de l'impôt à la source](/blog/impot-source-suisse-guide-complet-2026).",
      },

      { type: "h2", id: "apres", text: "Après la demande : la déclaration dans GeTax" },
      {
        type: "steps",
        items: [
          "Déposez le formulaire DRIS/TOU, en ligne ou sur papier, au plus tard le **31 mars**.",
          "Le service de la taxation vous envoie une **déclaration d'impôt** à remplir.",
          "Remplissez-la dans GeTax comme un contribuable ordinaire. Un non-résident coche, sur l'écran « Déclaration », la case « Je suis domicilié(e) à l'étranger et au bénéfice du statut de Quasi-résident ».",
          "Renvoyez-la **dans les deux mois**, avec les justificatifs et, pour un non-résident, le formulaire de quasi-résident.",
          "L'AFC vérifie les conditions, puis taxe : l'impôt retenu à la source est déduit, et le solde vous est remboursé ou facturé dans les 30 jours.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Le 31 mars est impératif",
        text: "Passé ce délai, la retenue à la source de l'année devient définitive : impossible de récupérer ensuite le 3e pilier ou un rachat LPP de cette année. Si vous attendez des documents, déposez d'abord le formulaire et complétez plus tard.",
      },
    ],
    faq: [
      {
        q: "Quelle est la date limite pour une TOU à Genève ?",
        a: "Le 31 mars de l'année qui suit le prélèvement de l'impôt à la source : le 31 mars 2027 pour les revenus 2026. Le même délai vaut pour la DRIS.",
      },
      {
        q: "Peut-on déduire le 3e pilier quand on est imposé à la source à Genève ?",
        a: "Oui, mais uniquement par une taxation ordinaire ultérieure (TOU). Depuis 2021, la DRIS ne permet plus de faire valoir le 3e pilier, les rachats LPP, les frais de garde ou de formation.",
      },
      {
        q: "Qui est quasi-résident à Genève ?",
        a: "Une personne domiciliée à l'étranger dont au moins 90 % des revenus bruts mondiaux, ceux du conjoint compris, sont imposables en Suisse. Elle peut demander une TOU, à renouveler chaque année avant le 31 mars.",
      },
      {
        q: "La TOU est-elle obligatoire au-dessus de CHF 120'000 ?",
        a: "Oui, pour les personnes imposées à la source domiciliées en Suisse dont le revenu brut annuel atteint CHF 120'000 (un seul conjoint suffit). Elle s'applique ensuite aussi les années suivantes.",
      },
    ],
  },
  en: {
    title: "Source tax in Geneva: DRIS, TOU, quasi-residents and cross-border workers",
    navTitle: "Source tax and TOU",
    metaTitle: "Geneva source tax 2026: DRIS, TOU, quasi-resident, cross-border",
    metaDescription:
      "When to request a correction (DRIS) or a subsequent ordinary assessment (TOU) in Geneva, mandatory TOU from CHF 120,000, quasi-resident status (90%), cross-border workers from France, 31 March deadline.",
    keywords: [
      "tou geneva",
      "subsequent ordinary assessment geneva",
      "dris geneva source tax",
      "quasi resident geneva 90 percent",
      "cross-border worker tax geneva",
      "source tax refund geneva",
    ],
    summary: [
      "If you pay tax at source, there are two requests: the **DRIS** (correction of the rate, family situation or salary) and the **TOU** (« taxation ordinaire ultérieure », a full tax return with all deductions). The deadline for both is **31 March** of the following year.",
      "Since 2021, **pillar 3a, pension buy-ins, childcare and training costs** can no longer be claimed through a DRIS: you need a TOU.",
      "For residents, the TOU is **mandatory** from **CHF 120,000** gross annual income, or with more than CHF 3,000 of income not taxed at source, taxable wealth or property.",
      "Non-residents, including **cross-border workers**, can only request a TOU as **quasi-residents** (at least 90% of the couple's worldwide gross income taxable in Switzerland) or in special situations, and must ask **every year**.",
    ],
    blocks: [
      { type: "h2", id: "principe", text: "Source tax: what the rate already covers" },
      {
        type: "p",
        text: "Foreign nationals without a C permit living in Switzerland, and people living abroad who work in the canton of Geneva, are taxed at source: the employer withholds tax from each salary. The rates include the family situation and **flat-rate deductions** (work expenses, insurance premiums). Anything beyond those flat rates requires a request filed by **31 March** of the year after the deduction.",
      },

      { type: "h2", id: "dris-tou", text: "DRIS or TOU?" },
      {
        type: "table",
        head: ["", "DRIS (correction)", "TOU (subsequent ordinary assessment)"],
        rows: [
          ["What it corrects", "Salary used, rate code, rate, spouse's actual income (rate C), children not taken into account by the employer", "Full calculation on a tax return: all income, wealth and all deductions"],
          ["Pillar 3a, pension buy-ins, childcare, training, maintenance for minor children", "No, since 2021", "Yes"],
          ["Form", "DRIS/TOU form, online in your tax account or on paper", "Same form, then a complete tax return"],
          ["Deadline", "31 March of the following year", "31 March of the following year"],
        ],
        caption: "Source: ge.ch pages on the source tax correction (DRIS) and on when to request a TOU; AFC Infos February 2026.",
      },
      {
        type: "p",
        text: "The DRIS/TOU form is sent through your employer; with e-correspondence it is filled in directly in your e-démarches tax account. You can ask the AFC for a copy if you lost it, divorced or separated.",
      },

      { type: "h2", id: "residents", text: "You live in Switzerland" },
      { type: "h3", text: "Mandatory TOU" },
      {
        type: "list",
        items: [
          "gross annual income of at least **CHF 120,000** (for a couple, one spouse reaching it is enough);",
          "gross income **not taxed** at source of at least **CHF 3,000** a year (below that, declare it on the DRIS/TOU form);",
          "taxable wealth or **real estate**;",
          "self-employment in the canton of Geneva, or other work abroad.",
        ],
      },
      {
        type: "p",
        text: "Once a mandatory TOU has been carried out, it **also applies in later years**, even if you no longer meet the conditions.",
      },
      { type: "h3", text: "TOU on request" },
      {
        type: "p",
        text: "Below these thresholds you can request a TOU by **31 March** of the following year, for example to deduct a pension buy-in or pillar 3a. It does not have to be renewed every year, but it then applies to later years too: compare before you ask.",
      },

      { type: "h2", id: "non-residents", text: "You live abroad: quasi-residents and cross-border workers" },
      {
        type: "p",
        text: "For a person living abroad, a TOU is only possible on request, renewed **every year** before 31 March, in one of these cases:",
      },
      {
        type: "list",
        items: [
          "**Quasi-resident**: at least **90%** of worldwide gross income, spouse included, is taxable in Switzerland. The AFC provides a calculator; income of international civil servants counts in the calculation.",
          "**Special situation**: deductions impossible in the country of residence for lack of income, or foreign pension contributions accepted under a double tax treaty. Write to the tax affairs directorate before 31 March with supporting documents.",
          "**Shared custody** meeting the partial splitting criteria.",
        ],
      },
      {
        type: "p",
        text: "The AFC also carries out a TOU automatically if you are employed in the canton of Geneva **and** self-employed or own property there, or are married to a spouse who is.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Cross-border workers living in France",
        text: "The canton of Geneva does not apply the 1983 Franco-Swiss agreement on cross-border workers: someone who lives in France and works in the canton of Geneva is **taxed at source** there. Since 1 January 2023, they may work from home for up to **40%** of their annual working time without any change in taxation. Watch the 90% calculation: the salary of a spouse working in another border canton, taxed in France under the 1983 agreement, lowers the Swiss share.",
      },
      {
        type: "p",
        text: "For a worked example and the pitfalls of the status, read our [guide to quasi-resident status for cross-border workers in Geneva](/blog/frontalier-quasi-resident-geneve-guide-2026) and the [complete guide to Swiss source tax](/blog/impot-source-suisse-guide-complet-2026).",
      },

      { type: "h2", id: "apres", text: "After the request: the return in GeTax" },
      {
        type: "steps",
        items: [
          "File the DRIS/TOU form, online or on paper, by **31 March**.",
          "The assessment service sends you a **tax return** to fill in.",
          "Fill it in with GeTax like any ordinary taxpayer. A non-resident ticks, on the « Déclaration » screen, the box « Je suis domicilié(e) à l'étranger et au bénéfice du statut de Quasi-résident » (I live abroad and have quasi-resident status).",
          "Return it **within two months**, with supporting documents and, for a non-resident, the quasi-resident form.",
          "The AFC checks the conditions, then assesses: tax withheld at source is deducted, and the balance is refunded or billed within 30 days.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "31 March is final",
        text: "After that date, the year's source tax becomes final: you can no longer claim that year's pillar 3a or pension buy-in. If you are waiting for documents, file the form first and complete later.",
      },
    ],
    faq: [
      {
        q: "What is the deadline for a TOU in Geneva?",
        a: "31 March of the year after source tax was withheld: 31 March 2027 for 2026 income. The same deadline applies to the DRIS.",
      },
      {
        q: "Can I deduct pillar 3a if I pay source tax in Geneva?",
        a: "Yes, but only through a subsequent ordinary assessment (TOU). Since 2021, the DRIS no longer covers pillar 3a, pension buy-ins, childcare or training costs.",
      },
      {
        q: "Who is a quasi-resident in Geneva?",
        a: "A person living abroad with at least 90% of worldwide gross income, including the spouse's, taxable in Switzerland. They can request a TOU, renewed every year before 31 March.",
      },
      {
        q: "Is a TOU mandatory above CHF 120,000?",
        a: "Yes, for people taxed at source who live in Switzerland and whose gross annual income reaches CHF 120,000 (one spouse is enough). It then also applies in later years.",
      },
    ],
  },
};
