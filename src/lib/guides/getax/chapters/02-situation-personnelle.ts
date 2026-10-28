import type { GuideChapter } from "../../types";

export const situationPersonnelle: GuideChapter = {
  slug: "situation-personnelle",
  readTime: 7,
  fr: {
    title: "Situation personnelle et enfants dans GeTax : état civil, splitting et charges de famille 2026",
    navTitle: "Situation personnelle",
    metaTitle: "GeTax 2026 : enfants à charge, splitting et charges de famille",
    metaDescription:
      "Remplir les données personnelles dans GeTax : contribuables A et B, contribution religieuse volontaire, enfants à charge, frais de garde, splitting à 50 % et charges de famille 2026.",
    keywords: [
      "getax enfants à charge",
      "charges de famille genève 2026",
      "splitting genève",
      "contribution religieuse volontaire genève",
      "garde alternée impôt genève",
      "barème avec splitting getax",
    ],
    summary: [
      "Les **contribuables A et B** sont saisis séparément ; pour un couple marié, l'état civil « Marié-e » ouvre la page du contribuable B.",
      "Chaque enfant a sa **fiche** : activité, revenu, fortune, pension alimentaire, mais aussi ses **frais de garde**, **primes d'assurance-maladie** et **frais médicaux**, reportés ensuite automatiquement dans les déductions.",
      "Déduction pour **charge de famille** 2026 : **CHF 13'698** par enfant, réduite à **CHF 10'536** si vous déduisez des frais de garde pour cet enfant.",
      "Couples mariés et parents seuls avec enfant à charge bénéficient du **splitting à 50 %** : le revenu est imposé au taux de la moitié de son montant.",
    ],
    blocks: [
      { type: "h2", id: "contribuables", text: "Contribuables A et B" },
      { type: "path", items: ["Données personnelles", "Identification Contribuable A"] },
      {
        type: "p",
        text: "Indiquez nom, prénom, date de naissance (jj.mm.aaaa), nationalité et profession. Pour un couple marié ou en partenariat enregistré, une seule déclaration est remplie : chaque montant est ensuite saisi dans la colonne du contribuable A ou B, ce qui permet à GeTax de calculer les déductions propres à chacun (forfait professionnel, 3e pilier, double activité).",
      },
      { type: "h3", text: "La contribution religieuse volontaire (CRV)" },
      {
        type: "p",
        text: "Sur la même page, GeTax demande si vous souhaitez verser une contribution religieuse volontaire à l'Église catholique chrétienne, catholique romaine ou protestante, ou à aucune organisation. Si vous cochez une Église, l'AFC calcule le montant et vous envoie une QR-facture séparée : son paiement reste **facultatif**. Ce qui est payé se déduit l'année suivante comme un **don** (voir [Déductions](/guide/getax/deductions)).",
      },

      { type: "h2", id: "enfants", text: "Déclarer ses enfants" },
      { type: "path", items: ["Données personnelles", "Situation Contribuable", "Enfant(s) à charge", "Insérer"] },
      {
        type: "p",
        text: "Cochez d'abord « J'ai des enfants à charge ou pour lesquels je reçois ou paie une pension », puis cliquez sur **Insérer** pour chaque enfant. La fiche demande l'activité (enfant avant âge scolaire, écolier, apprenti, étudiant, en vie professionnelle), le revenu brut, la fortune, si l'enfant vit avec vous, de qui il est l'enfant (couple, contribuable A ou B) et l'existence d'une pension alimentaire.",
      },
      {
        type: "screenshot",
        file: "02-enfant.webp",
        alt: "Fiche Enfant à charge dans GeTax : frais de garde ICC et IFD, prime d'assurance-maladie, allocations familiales",
        caption: "La fiche enfant regroupe aussi ses frais de garde (ICC et IFD), ses primes et ses frais médicaux (GeTax 2025, données fictives)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Les montants des enfants se saisissent ici",
        text: "Depuis GeTax 2024, les frais de garde, primes d'assurance-maladie, subsides, frais médicaux et primes accident des enfants se saisissent **dans la fiche de chaque enfant**. GeTax les reporte ensuite aux codes 59.10 (garde ICC), 59.12 (garde IFD), 52.21 et 71.00. Ne les saisissez pas une seconde fois dans les déductions.",
      },
      {
        type: "p",
        text: "Indiquez aussi si vous recevez des **allocations familiales** pour cet enfant et si elles sont comprises dans votre salaire brut. Si c'est le cas (rubrique 15 « Observations » du certificat de salaire), déduisez-les du chiffre 1 lors de la saisie du salaire : elles sont déclarées ici, enfant par enfant.",
      },

      { type: "h2", id: "conditions", text: "Qui compte comme charge de famille ?" },
      {
        type: "table",
        head: ["Situation de l'enfant", "Charge entière si revenu jusqu'à", "Demi-charge si revenu jusqu'à", "Fortune maximale"],
        rows: [
          ["Mineur", "CHF 16'391", "CHF 24'587", "pas de limite"],
          ["Majeur jusqu'à 25 ans révolus", "CHF 16'391", "CHF 24'587", "CHF 93'537"],
          ["Plus de 25 ans, apprenti ou étudiant", "CHF 16'391", "CHF 24'587", "CHF 93'537"],
          ["Proche incapable de subvenir à ses besoins", "CHF 16'391", "CHF 24'587", "CHF 93'537"],
        ],
        caption: "Source : Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 13 RCEPF, montants 2026.",
      },
      {
        type: "table",
        head: ["Déduction (impôt cantonal)", "Montant 2026"],
        rows: [
          ["Charge de famille entière", "CHF 13'698"],
          ["Charge entière avec déduction de frais de garde", "CHF 10'536"],
          ["Demi-charge", "CHF 6'849"],
          ["Demi-charge avec déduction de frais de garde", "CHF 5'268"],
        ],
        caption: "Source : Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 39 LIPP et 13 RCEPF.",
      },
      {
        type: "p",
        text: "GeTax calcule lui-même le nombre de charges ICC et IFD et l'affiche dans la liste des enfants. Pour l'impôt fédéral, la déduction par enfant est fixée par la Confédération (CHF 6'800 dans GeTax 2025).",
      },

      { type: "h2", id: "splitting", text: "Barème et splitting" },
      {
        type: "screenshot",
        file: "02-bareme.webp",
        alt: "Liste des enfants à charge dans GeTax avec nombre de charges ICC et IFD, barème ICC avec splitting et barème IFD marié",
        caption: "Après la saisie des enfants, GeTax affiche le nombre de charges et le barème appliqué (GeTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "Pour les époux vivant en ménage commun, le taux appliqué est celui qui correspond à **50 % du revenu** du couple. Le même splitting s'applique au contribuable célibataire, veuf, divorcé ou séparé qui fait ménage commun avec ses enfants à charge ou un proche à charge (art. 41 LIPP).",
      },
      {
        type: "callout",
        tone: "info",
        title: "Garde alternée : le splitting partiel",
        text: "Quand les parents séparés partagent la garde à parts égales, la charge de famille est répartie entre eux et un splitting partiel peut s'appliquer. Indiquez précisément dans la fiche de l'enfant qui en assure l'entretien et quelle pension est versée ou reçue ; le Guide de la déclaration de l'AFC détaille les cas.",
      },

      { type: "h2", id: "autres-personnes", text: "Autres personnes à charge" },
      { type: "path", items: ["Données personnelles", "Autre(s) personne(s) à charge"] },
      {
        type: "p",
        text: "Un parent, un frère, une sœur, un oncle, une tante, un neveu ou une nièce incapable de subvenir à ses besoins peut compter comme charge de famille si sa fortune et son revenu restent sous les plafonds du tableau ci-dessus. La déduction est limitée aux dépenses réellement assumées. Gardez la preuve des versements.",
      },
    ],
    faq: [
      {
        q: "Quel est le montant de la déduction pour enfant à Genève en 2026 ?",
        a: "CHF 13'698 par enfant à charge pour l'impôt cantonal et communal, ou CHF 10'536 si vous déduisez aussi des frais de garde pour cet enfant. Une demi-charge vaut CHF 6'849 (CHF 5'268 avec frais de garde).",
      },
      {
        q: "Où saisir les frais de crèche dans GeTax ?",
        a: "Dans la fiche de l'enfant (Données personnelles, Enfant(s) à charge), champ « Frais de garde effectifs », en colonne ICC et IFD. GeTax les reporte aux codes 59.10 et 59.12.",
      },
      {
        q: "La contribution religieuse est-elle obligatoire à Genève ?",
        a: "Non. La contribution religieuse volontaire est facultative : cocher une Église dans GeTax autorise l'AFC à vous envoyer une QR-facture, que vous êtes libre de payer. Le montant payé est traité comme un don.",
      },
      {
        q: "Mon enfant de 22 ans étudie et gagne CHF 12'000. Est-il à charge ?",
        a: "Oui, si sa fortune ne dépasse pas CHF 93'537 : en 2026, un enfant majeur jusqu'à 25 ans reste une charge entière tant que son revenu ne dépasse pas CHF 16'391.",
      },
    ],
  },
  en: {
    title: "Personal situation and children in GeTax: marital status, splitting and 2026 dependant deductions",
    navTitle: "Personal situation",
    metaTitle: "GeTax 2026: children, splitting and dependant deductions",
    metaDescription:
      "Filling in personal data in GeTax: taxpayers A and B, voluntary church contribution, dependent children, childcare costs, 50% splitting and 2026 dependant deductions in Geneva.",
    keywords: [
      "getax children",
      "geneva child tax deduction 2026",
      "geneva tax splitting",
      "geneva church tax voluntary",
      "shared custody tax geneva",
      "getax dependants",
    ],
    summary: [
      "**Taxpayers A and B** are entered separately; for a married couple, the status « Marié-e » (married) opens the page for taxpayer B.",
      "Each child has its own **sheet**: activity, income, wealth, maintenance, but also **childcare costs**, **health insurance premiums** and **medical costs**, which GeTax then carries over to the deductions.",
      "2026 **dependant deduction**: **CHF 13,698** per child, reduced to **CHF 10,536** if you deduct childcare costs for that child.",
      "Married couples and single parents with dependent children get **50% splitting**: income is taxed at the rate for half its amount.",
    ],
    blocks: [
      { type: "h2", id: "contribuables", text: "Taxpayers A and B" },
      { type: "path", items: ["Données personnelles", "Identification Contribuable A"] },
      {
        type: "p",
        text: "Enter name, first name, date of birth (dd.mm.yyyy), nationality and occupation. A married couple or registered partners file one return: each amount then goes in the column for taxpayer A or B, so GeTax can compute each person's own deductions (flat-rate expenses, pillar 3a, two-earner deduction).",
      },
      { type: "h3", text: "The voluntary church contribution (CRV)" },
      {
        type: "p",
        text: "On the same page, GeTax asks whether you wish to pay a voluntary church contribution (« contribution religieuse volontaire ») to the Christian Catholic, Roman Catholic or Protestant Church, or to none. If you tick a church, the AFC computes an amount and sends a separate QR bill: paying it is **optional**. What you pay is deductible the following year as a **donation** (see [Deductions](/guide/getax/deductions)).",
      },

      { type: "h2", id: "enfants", text: "Declaring your children" },
      { type: "path", items: ["Données personnelles", "Situation Contribuable", "Enfant(s) à charge", "Insérer"] },
      {
        type: "p",
        text: "First tick « J'ai des enfants à charge ou pour lesquels je reçois ou paie une pension » (I have dependent children or pay or receive maintenance for them), then click **« Insérer »** (insert) for each child. The sheet asks for the activity (pre-school, pupil, apprentice, student, working), gross income, wealth, whether the child lives with you, whose child it is (couple, taxpayer A or B) and whether maintenance is paid.",
      },
      {
        type: "screenshot",
        file: "02-enfant.webp",
        alt: "Dependent child sheet in GeTax: childcare costs ICC and IFD, health insurance premium, family allowances",
        caption: "The child sheet also holds childcare costs (cantonal and federal), premiums and medical costs (GeTax 2025, fictitious data)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Children's amounts go here",
        text: "Since GeTax 2024, childcare costs, health insurance premiums, subsidies, medical costs and accident premiums for children are entered **in each child's sheet**. GeTax carries them to codes 59.10 (childcare, cantonal), 59.12 (childcare, federal), 52.21 and 71.00. Do not enter them a second time under deductions.",
      },
      {
        type: "p",
        text: "Also state whether you receive **family allowances** (« allocations familiales ») for this child and whether they are included in your gross salary. If they are (box 15 « Observations » of the salary certificate), deduct them from box 1 when you enter the salary: they are declared here, child by child.",
      },

      { type: "h2", id: "conditions", text: "Who counts as a dependant?" },
      {
        type: "table",
        head: ["Child's situation", "Full dependant if income up to", "Half dependant if income up to", "Maximum wealth"],
        rows: [
          ["Minor", "CHF 16,391", "CHF 24,587", "no limit"],
          ["Adult up to age 25", "CHF 16,391", "CHF 24,587", "CHF 93,537"],
          ["Over 25, apprentice or student", "CHF 16,391", "CHF 24,587", "CHF 93,537"],
          ["Relative unable to support themselves", "CHF 16,391", "CHF 24,587", "CHF 93,537"],
        ],
        caption: "Source: Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 13 RCEPF, 2026 amounts.",
      },
      {
        type: "table",
        head: ["Deduction (cantonal tax)", "2026 amount"],
        rows: [
          ["Full dependant", "CHF 13,698"],
          ["Full dependant with childcare deduction", "CHF 10,536"],
          ["Half dependant", "CHF 6,849"],
          ["Half dependant with childcare deduction", "CHF 5,268"],
        ],
        caption: "Source: Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 39 LIPP and 13 RCEPF.",
      },
      {
        type: "p",
        text: "GeTax computes the number of cantonal and federal dependants itself and shows it in the list of children. For federal tax, the child deduction is set by the Confederation (CHF 6,800 in GeTax 2025).",
      },

      { type: "h2", id: "splitting", text: "Tax scale and splitting" },
      {
        type: "screenshot",
        file: "02-bareme.webp",
        alt: "List of dependent children in GeTax with number of cantonal and federal dependants, cantonal scale with splitting and federal married scale",
        caption: "After entering the children, GeTax shows the number of dependants and the scale applied (GeTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "For spouses living together, the rate applied is the one for **50% of the couple's income**. The same splitting applies to a single, widowed, divorced or separated taxpayer living with dependent children or a dependent relative (art. 41 LIPP).",
      },
      {
        type: "callout",
        tone: "info",
        title: "Shared custody: partial splitting",
        text: "When separated parents share custody equally, the dependant deduction is split between them and partial splitting may apply. State clearly in the child's sheet who supports the child and what maintenance is paid or received; the AFC's return guide covers the cases.",
      },

      { type: "h2", id: "autres-personnes", text: "Other dependants" },
      { type: "path", items: ["Données personnelles", "Autre(s) personne(s) à charge"] },
      {
        type: "p",
        text: "A parent, brother, sister, uncle, aunt, nephew or niece unable to support themselves can count as a dependant if their wealth and income stay below the limits in the table above. The deduction is limited to what you actually pay. Keep proof of the payments.",
      },
    ],
    faq: [
      {
        q: "How much is the child deduction in Geneva for 2026?",
        a: "CHF 13,698 per dependent child for cantonal and communal tax, or CHF 10,536 if you also deduct childcare costs for that child. A half dependant is worth CHF 6,849 (CHF 5,268 with childcare).",
      },
      {
        q: "Where do I enter nursery fees in GeTax?",
        a: "In the child's sheet (« Données personnelles », « Enfant(s) à charge »), field « Frais de garde effectifs » (actual childcare costs), in both the ICC and IFD columns. GeTax carries them to codes 59.10 and 59.12.",
      },
      {
        q: "Is church tax compulsory in Geneva?",
        a: "No. The voluntary church contribution is optional: ticking a church in GeTax lets the AFC send you a QR bill, which you are free to pay. The amount paid is treated as a donation.",
      },
      {
        q: "My 22-year-old student earns CHF 12,000. Is she a dependant?",
        a: "Yes, if her wealth does not exceed CHF 93,537: in 2026, an adult child up to age 25 remains a full dependant as long as their income does not exceed CHF 16,391.",
      },
    ],
  },
};
