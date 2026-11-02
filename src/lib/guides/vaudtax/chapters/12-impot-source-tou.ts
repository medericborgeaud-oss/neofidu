import type { GuideChapter } from "../../types";

export const impotSource: GuideChapter = {
  slug: "impot-source-tou",
  readTime: 8,
  fr: {
    title: "Impôt à la source dans le canton de Vaud : TOU, nouveau calcul, quasi-résidents et frontaliers",
    navTitle: "Impôt à la source et TOU",
    metaTitle: "Impôt à la source Vaud 2026 : TOU, nouveau calcul, quasi-résident, frontalier",
    metaDescription:
      "Quand remplir une déclaration VaudTax si vous êtes imposé à la source : TOU obligatoire dès CHF 120'000, TOU sur demande avant le 31 mars (formulaire 21049), nouveau calcul, quasi-résidents à 90 % et frontaliers de France.",
    keywords: [
      "tou vaud",
      "taxation ordinaire ultérieure vaud 31 mars",
      "impôt à la source vaud 2026",
      "formulaire 21049 tou",
      "quasi-résident vaud 90 %",
      "frontalier impôt à la source vaud",
    ],
    summary: [
      "Les travailleurs étrangers sans permis C domiciliés dans le canton de Vaud paient l'**impôt à la source** sur leur salaire. Ils ne remplissent une déclaration VaudTax qu'en cas de **taxation ordinaire ultérieure (TOU)**.",
      "La TOU est **obligatoire** dès un salaire brut de **CHF 120'000** par personne, avec une fortune imposable de plus de CHF 60'000 (CHF 120'000 pour un couple), un immeuble ou d'autres revenus non soumis à la source.",
      "Sinon, la TOU se **demande par écrit** avec le formulaire 21049, au plus tard le **31 mars** de l'année suivante. La demande est **irrévocable** et vaut jusqu'à la fin de l'imposition à la source.",
      "Les domiciliés à l'étranger peuvent demander une TOU comme **quasi-résidents** (au moins 90 % des revenus mondiaux du couple imposables en Suisse), chaque année. Les frontaliers de France sont en principe imposés en France.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Qui est imposé à la source dans le canton de Vaud ?" },
      {
        type: "list",
        items: [
          "Les **travailleurs étrangers sans permis d'établissement (C)** domiciliés ou en séjour dans le canton de Vaud : permis B, L, F, N, Ci ou sans autorisation de séjour. L'employeur retient l'impôt sur chaque salaire.",
          "Les personnes **domiciliées à l'étranger** qui travaillent dans le canton de Vaud, quelle que soit leur nationalité, y compris les Suisses : séjours courts, résidence secondaire en Suisse, certains frontaliers.",
          "Les époux vivant ensemble sont imposés selon la procédure ordinaire, avec une déclaration VaudTax, si l'un d'eux est **suisse ou titulaire d'un permis C**.",
        ],
      },
      {
        type: "p",
        text: "Sans TOU, l'impôt à la source **remplace** les impôts fédéral, cantonal et communal sur le revenu. Le barème intègre déjà des déductions forfaitaires ; aucune autre déduction n'est accordée.",
      },

      { type: "h2", id: "tou-obligatoire", text: "TOU obligatoire : les cas" },
      {
        type: "table",
        head: ["Situation (domicile en Suisse)", "Conséquence"],
        rows: [
          ["Salaire annuel brut de plus de CHF 120'000 par personne", "TOU obligatoire"],
          ["Fortune imposable de plus de CHF 60'000 (personne seule) ou CHF 120'000 (couple marié ou partenariat enregistré)", "TOU obligatoire"],
          ["Activité lucrative indépendante", "TOU obligatoire"],
          ["Immeuble en Suisse ou à l'étranger", "TOU obligatoire"],
          ["Autres revenus non soumis à la source (revenus de l'étranger, rente AVS ou AI entière, pension alimentaire)", "TOU obligatoire"],
        ],
        caption: "Source : formulaire 21049 « Demande de taxation ordinaire ultérieure (TOU) » et page « Personnes imposées à la source / sourciers », ACI Vaud, 2026.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Annoncez-vous avant le 31 mars",
        text: "Si vous êtes dans un de ces cas et n'avez pas reçu de déclaration, demandez les formulaires au plus tard le **31 mars** de l'année suivante. Après ce délai, des revenus ou une fortune non déclarés peuvent donner lieu à une procédure pour soustraction d'impôt.",
      },

      { type: "h2", id: "tou-demande", text: "TOU sur demande : formulaire 21049, avant le 31 mars" },
      {
        type: "steps",
        items: [
          "Téléchargez le formulaire **21049 « Demande de taxation ordinaire ultérieure (TOU) »** sur vd.ch, rubrique impôt à la source.",
          "Remplissez-le entièrement : identité, coordonnées bancaires, motif de la demande, retenues d'impôt à la source de l'année avec copie des certificats de salaire.",
          "Signez-le, à deux si vous êtes mariés ou en partenariat enregistré, et envoyez-le à l'Office d'impôt des districts de Lausanne et Ouest lausannois, section impôt à la source / TOU, Rue Caroline 11 bis, case postale 1142, 1001 Lausanne.",
          "Délai : au plus tard le **31 mars 2027** pour l'année 2026. Une demande hors délai est irrecevable. En cas de départ de Suisse, le délai expire à l'annonce du départ à la commune.",
          "Si les conditions sont remplies, l'ACI vous envoie une déclaration d'impôt, à remplir dans VaudTax comme le décrivent les chapitres de ce guide.",
        ],
      },
      {
        type: "list",
        items: [
          "Une demande déposée en bonne et due forme **ne peut pas être retirée**, même si la TOU coûte plus cher que l'impôt retenu.",
          "Pour les personnes domiciliées en Suisse, la demande ne se fait **qu'une fois** : la TOU devient ensuite obligatoire jusqu'à la fin de l'imposition à la source.",
          "L'impôt déjà retenu à la source est imputé, sans intérêts, sur l'impôt calculé dans la TOU.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Quand la TOU vaut la peine",
        text: "Le barème ne tient pas compte de vos frais réels. La TOU permet de déduire les **rachats LPP**, le **3e pilier A** (et les rachats 3a dès 2026), des frais de déplacement élevés, les frais de garde, les intérêts hypothécaires ou les pensions alimentaires versées. Faites une simulation avant de demander : la décision est définitive.",
      },

      { type: "h2", id: "nouveau-calcul", text: "Le nouveau calcul de l'impôt à la source" },
      {
        type: "p",
        text: "Sans passer à la TOU, vous pouvez demander un **nouveau calcul** de l'impôt retenu, au plus tard le **31 mars** de l'année suivante, pour trois motifs seulement : salaire brut erroné, revenu annuel déterminant le taux erroné, ou barème mal appliqué. Le nouveau calcul ne permet pas de faire valoir des déductions supplémentaires : pour cela, il faut une TOU.",
      },
      {
        type: "p",
        text: "**Barème C (couple dont les deux conjoints travaillent)** : le taux tient compte d'un revenu fictif du conjoint, plafonné. Si le revenu réel du conjoint est différent, demandez un nouveau calcul avant le 31 mars, avec la preuve de ce revenu. Si le conjoint est aussi imposé à la source dans le canton de Vaud, l'ACI recalcule d'office sur la base des deux revenus.",
      },

      { type: "h2", id: "quasi-residents", text: "Domiciliés à l'étranger : quasi-résidents" },
      {
        type: "p",
        text: "Une personne domiciliée à l'étranger peut demander une TOU comme **quasi-résidente** si au moins **90 %** de ses revenus bruts mondiaux de l'année, y compris ceux du conjoint, sont imposables en Suisse. La demande se fait avec le même formulaire 21049, avant le 31 mars, et vaut pour une seule année : il faut la **renouveler chaque année**. L'ACI met en ligne une calculette pour vérifier le seuil de 90 %. Un représentant en Suisse doit être indiqué.",
      },

      { type: "h2", id: "frontaliers", text: "Frontaliers de France" },
      {
        type: "p",
        text: "Selon l'accord franco-suisse du 11 avril 1983, le salaire d'un frontalier résidant en France et travaillant dans le canton de Vaud est **imposable en France**, sans impôt à la source suisse, si toutes ces conditions sont remplies :",
      },
      {
        type: "list",
        items: [
          "retour régulier au domicile en France, au moins 4 jours par semaine pour un emploi à 100 % ;",
          "attestation de résidence fiscale remise à l'employeur avant le premier jour de travail, ou avant le 1er janvier de l'année ;",
          "télétravail ne dépassant pas **40 %** du taux d'activité.",
        ],
      },
      {
        type: "p",
        text: "Si une condition manque, l'employeur doit retenir l'impôt à la source. Exception : les Suisses (y compris les doubles nationaux) domiciliés en France et employés par une collectivité publique vaudoise (canton, commune, école publique) sont toujours imposés à la source dans le canton de Vaud.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Contester une décision",
        text: "Une réclamation contre une décision d'impôt à la source doit être envoyée **par lettre signée**, par la poste, dans les **30 jours**. Un courriel ne suffit pas. Contact de l'ACI pour l'impôt à la source : 021 316 20 65, info.aci-source@vd.ch, en indiquant votre numéro de contribuable.",
      },
    ],
    faq: [
      {
        q: "Jusqu'à quand demander une TOU dans le canton de Vaud ?",
        a: "Au plus tard le 31 mars de l'année qui suit, soit le 31 mars 2027 pour l'année 2026, avec le formulaire 21049 signé. Une demande hors délai est irrecevable, et une demande déposée ne peut plus être retirée.",
      },
      {
        q: "À partir de quel salaire la TOU est-elle obligatoire dans le canton de Vaud ?",
        a: "Dès un salaire annuel brut de plus de CHF 120'000 par personne. Elle l'est aussi avec une fortune imposable de plus de CHF 60'000 (CHF 120'000 pour un couple), un immeuble, une activité indépendante ou d'autres revenus non soumis à la source.",
      },
      {
        q: "Peut-on déduire le 3e pilier avec un nouveau calcul de l'impôt à la source ?",
        a: "Non. Le nouveau calcul corrige seulement le salaire, le revenu déterminant le taux ou le barème. Pour déduire le 3e pilier, des rachats LPP ou des frais de garde, il faut une TOU.",
      },
      {
        q: "Un frontalier français qui travaille dans le canton de Vaud paie-t-il l'impôt à la source ?",
        a: "En principe non : selon l'accord de 1983, il est imposé en France s'il rentre chez lui au moins 4 jours par semaine, a remis son attestation de résidence fiscale à temps et ne dépasse pas 40 % de télétravail. Sinon, l'employeur retient l'impôt à la source.",
      },
    ],
  },
  en: {
    title: "Source tax in the canton of Vaud: TOU, recalculation, quasi-residents and cross-border workers",
    navTitle: "Source tax and TOU",
    metaTitle: "Vaud source tax 2026: TOU, recalculation, quasi-resident, cross-border",
    metaDescription:
      "When to file a VaudTax return if you are taxed at source: mandatory TOU from CHF 120,000, requested TOU before 31 March (form 21049), recalculation, 90% quasi-residents and French cross-border workers.",
    keywords: [
      "tou vaud",
      "vaud source tax 2026",
      "subsequent ordinary assessment vaud",
      "form 21049 tou",
      "quasi resident vaud",
      "b permit tax return vaud",
    ],
    summary: [
      "Foreign employees without a C permit living in the canton of Vaud pay **source tax** on their salary. They only complete a VaudTax return under a **subsequent ordinary assessment (TOU)**.",
      "TOU is **mandatory** from a gross salary of **CHF 120,000** per person, with taxable wealth over CHF 60,000 (CHF 120,000 for a couple), property, or other income not taxed at source.",
      "Otherwise, TOU is **requested in writing** with form 21049, by **31 March** of the following year. The request is **irrevocable** and applies until source taxation ends.",
      "People living abroad can request TOU as **quasi-residents** (at least 90% of the couple's worldwide income taxable in Switzerland), every year. French cross-border workers are normally taxed in France.",
    ],
    blocks: [
      { type: "h2", id: "qui", text: "Who pays source tax in the canton of Vaud?" },
      {
        type: "list",
        items: [
          "**Foreign employees without a settlement permit (C)** living or staying in the canton of Vaud: B, L, F, N or Ci permits or no residence permit. The employer deducts the tax from each payslip.",
          "People **living abroad** who work in the canton of Vaud, whatever their nationality, Swiss included: short stays, a second home in Switzerland, some cross-border workers.",
          "Spouses living together are taxed under the ordinary procedure, with a VaudTax return, if one of them is **Swiss or holds a C permit**.",
        ],
      },
      {
        type: "p",
        text: "Without TOU, source tax **replaces** federal, cantonal and municipal income tax. The rates already include flat-rate deductions; no other deduction is granted.",
      },

      { type: "h2", id: "tou-obligatoire", text: "Mandatory TOU: the cases" },
      {
        type: "table",
        head: ["Situation (living in Switzerland)", "Consequence"],
        rows: [
          ["Gross annual salary over CHF 120,000 per person", "TOU mandatory"],
          ["Taxable wealth over CHF 60,000 (single) or CHF 120,000 (married couple or registered partnership)", "TOU mandatory"],
          ["Self-employed activity", "TOU mandatory"],
          ["Property in Switzerland or abroad", "TOU mandatory"],
          ["Other income not taxed at source (foreign income, full AHV or disability pension, maintenance)", "TOU mandatory"],
        ],
        caption: "Source: form 21049 \"Demande de taxation ordinaire ultérieure (TOU)\" and the \"Personnes imposées à la source / sourciers\" page, ACI Vaud, 2026.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Report by 31 March",
        text: "If one of these applies and you have not received a return, ask for the forms by **31 March** of the following year. After that, undeclared income or wealth can lead to tax evasion proceedings.",
      },

      { type: "h2", id: "tou-demande", text: "Requested TOU: form 21049, before 31 March" },
      {
        type: "steps",
        items: [
          "Download form **21049 « Demande de taxation ordinaire ultérieure (TOU) »** from vd.ch, source tax section.",
          "Complete it in full: identity, bank details, reason for the request, source tax withheld during the year with copies of salary certificates.",
          "Sign it, both of you if married or in a registered partnership, and send it to the Office d'impôt des districts de Lausanne et Ouest lausannois, section impôt à la source / TOU, Rue Caroline 11 bis, case postale 1142, 1001 Lausanne.",
          "Deadline: **31 March 2027** at the latest for 2026. Late requests are rejected. If you leave Switzerland, the deadline ends when you report your departure to the municipality.",
          "If you qualify, the ACI sends you a tax return, to complete in VaudTax as described in this guide's chapters.",
        ],
      },
      {
        type: "list",
        items: [
          "A request filed correctly **cannot be withdrawn**, even if TOU costs more than the tax withheld.",
          "For people living in Switzerland, the request can only be made **once**: TOU then becomes mandatory until source taxation ends.",
          "Source tax already withheld is credited, without interest, against the tax worked out under TOU.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "When TOU pays off",
        text: "Source tax rates ignore your actual costs. TOU lets you deduct **pension fund buy-ins**, **pillar 3a** (and 3a catch-ups from 2026), high commuting costs, childcare, mortgage interest or maintenance paid. Run a simulation before applying: the decision is final.",
      },

      { type: "h2", id: "nouveau-calcul", text: "Recalculating source tax" },
      {
        type: "p",
        text: "Without moving to TOU, you can request a **recalculation** (« nouveau calcul ») of the tax withheld, by **31 March** of the following year, on three grounds only: wrong gross salary, wrong annual income used for the rate, or wrong rate applied. A recalculation cannot add deductions: that requires TOU.",
      },
      {
        type: "p",
        text: "**Rate C (both spouses work)**: the rate assumes a capped notional income for the spouse. If the spouse's actual income differs, request a recalculation before 31 March, with proof of that income. If the spouse is also taxed at source in the canton of Vaud, the ACI recalculates automatically using both incomes.",
      },

      { type: "h2", id: "quasi-residents", text: "Living abroad: quasi-residents" },
      {
        type: "p",
        text: "A person living abroad can request TOU as a **quasi-resident** if at least **90%** of their worldwide gross income for the year, including their spouse's, is taxable in Switzerland. The request uses the same form 21049, before 31 March, and covers one year only: it must be **renewed every year**. The ACI provides an online calculator to check the 90% threshold. A representative in Switzerland must be named.",
      },

      { type: "h2", id: "frontaliers", text: "Cross-border workers from France" },
      {
        type: "p",
        text: "Under the France-Switzerland agreement of 11 April 1983, the salary of a cross-border worker living in France and working in the canton of Vaud is **taxable in France**, with no Swiss source tax, if all these conditions are met:",
      },
      {
        type: "list",
        items: [
          "regular return home to France, at least 4 days a week for a full-time job;",
          "tax residence certificate given to the employer before the first day of work, or before 1 January of the year;",
          "working from home no more than **40%** of the work rate.",
        ],
      },
      {
        type: "p",
        text: "If a condition is not met, the employer must withhold source tax. Exception: Swiss nationals (dual nationals included) living in France and employed by a Vaud public body (canton, municipality, public school) are always taxed at source in the canton of Vaud.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Challenging a decision",
        text: "An objection to a source tax decision must be sent as a **signed letter** by post within **30 days**. Email is not enough. ACI source tax contact: 021 316 20 65, info.aci-source@vd.ch, quoting your taxpayer number.",
      },
    ],
    faq: [
      {
        q: "What is the deadline to request TOU in the canton of Vaud?",
        a: "31 March of the following year at the latest, i.e. 31 March 2027 for 2026, with the signed form 21049. Late requests are rejected, and a filed request cannot be withdrawn.",
      },
      {
        q: "From what salary is TOU mandatory in the canton of Vaud?",
        a: "From a gross annual salary over CHF 120,000 per person. It is also mandatory with taxable wealth over CHF 60,000 (CHF 120,000 for a couple), property, self-employment or other income not taxed at source.",
      },
      {
        q: "Can I deduct pillar 3a through a source tax recalculation?",
        a: "No. A recalculation only corrects the salary, the income used for the rate or the rate itself. To deduct pillar 3a, pension buy-ins or childcare, you need TOU.",
      },
      {
        q: "Does a French cross-border worker in the canton of Vaud pay source tax?",
        a: "Normally not: under the 1983 agreement, they are taxed in France if they go home at least 4 days a week, gave their tax residence certificate on time and work from home no more than 40%. Otherwise, the employer withholds source tax.",
      },
    ],
  },
};
