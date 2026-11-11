import type { GuideChapter } from "../../types";

export const situationPersonnelle: GuideChapter = {
  slug: "situation-personnelle",
  readTime: 6,
  fr: {
    title: "Situation personnelle dans JuraTax : état civil, confession, statut, enfants et familles recomposées",
    navTitle: "Situation personnelle",
    metaTitle: "JuraTax : état civil, enfants à charge et tarif marié (2026)",
    metaDescription:
      "Remplir la page 1 de la déclaration jurassienne dans JuraTax : état civil au 31 décembre 2026, confession et impôt ecclésiastique, statut professionnel, enfants à charge (apprenti ou étudiant), parents séparés, concubins, garde alternée et IBAN.",
    keywords: [
      "juratax situation personnelle",
      "juratax enfants à charge",
      "tarif marié jura",
      "concubins impôt jura",
      "garde alternée impôt jura",
      "impôt ecclésiastique jura",
    ],
    summary: [
      "C'est la situation au **31 décembre 2026** qui compte : un couple marié en 2026 est imposé ensemble pour **toute l'année** ; un couple divorcé ou séparé en 2026 est imposé séparément pour toute l'année.",
      "Déclarez chaque enfant à charge : mineur au 31 décembre 2026, ou majeur **en apprentissage (A)** ou **aux études (E)**, avec son établissement et la date de fin de formation.",
      "Le **tarif réservé aux couples** s'applique aussi au parent seul qui vit avec ses enfants. Les concubins avec enfants n'y ont en principe pas droit.",
      "Indiquez un **IBAN suisse** : sans lui, un éventuel trop-perçu est porté en compte sur l'année en cours au lieu d'être remboursé.",
    ],
    blocks: [
      { type: "h2", id: "etat-civil", text: "État civil, confession et statut" },
      {
        type: "p",
        text: "Dans « Données de référence », l'écran **« Situation du contribuable »** demande l'état civil au 31 décembre 2026 (**célibataire**, **mariés / partenaires enregistrés**, **veuf**, **séparé** ou **divorcé**), si vous avez des **enfants à charge**, si vous vous êtes **mariés pendant l'année** et, si vous n'êtes pas mariés, si vous **tenez un ménage indépendant**. Vos réponses déterminent les écrans qui suivent.",
      },
      { type: "path", items: ["Données de référence", "Situation du contribuable"] },
      {
        type: "screenshot",
        file: "02-situation-personnelle.webp",
        alt: "Écran Situation du contribuable de JuraTax 2025 : état civil, enfants à charge, mariage dans l'année et ménage indépendant",
        caption: "« Situation du contribuable » : état civil, enfants, mariage dans l'année et ménage indépendant (JuraTax 2025)",
      },
      {
        type: "p",
        text: "Viennent ensuite **« Données personnelles du contribuable »** puis **« du/de la conjoint(e) »** : nom et prénom, date de naissance, numéro AVS, confession, activité principale, profession, employeur, date de début d'activité en 2026 et une question importante, **« Êtes-vous arrivé dans le canton en 2026 ou étiez-vous à l'impôt à la source ? »**. Répondez oui si c'est le cas : le Service des contributions en tient compte pour la taxation.",
      },
      {
        type: "table",
        head: ["Champ", "Ce qu'il faut savoir"],
        rows: [
          ["Confession", "Catholique, réformée, autre ou sans. L'impôt ecclésiastique n'est dû qu'aux paroisses des Églises reconnues ; la confession catholique-chrétienne n'est pas reconnue dans le canton du Jura"],
          ["Activité principale", "Salarié, salarié de sa société, indépendant, agriculteur, rentier, agent d'assurance ou crèche à domicile, étudiant, apprenti, sans activité lucrative. Ce choix ouvre les rubriques de revenus correspondantes"],
          ["Observations", "Écran « Observations » : périodes sans activité et service militaire effectué en 2026, avec les dates. Elles expliquent un revenu plus bas ou des frais professionnels réduits"],
          ["Mandataire", "Même écran : nom de la fiduciaire, adresse, téléphone et e-mail, si une autre personne a rempli votre déclaration"],
        ],
        caption: "Source : Déclaration des personnes physiques 2025 et Guide général 2025, pages 14 et 15, Service des contributions du canton du Jura.",
      },
      {
        type: "screenshot",
        file: "02-donnees-personnelles.webp",
        alt: "Écran Données personnelles du contribuable de JuraTax 2025 : nom, date de naissance, numéro AVS, confession, activité principale, profession, employeur et arrivée dans le canton",
        caption: "« Données personnelles du contribuable » : confession, activité principale et arrivée dans le canton ou impôt à la source (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "02-observations.webp",
        alt: "Écran Observations de JuraTax 2025 : périodes sans activité ou service militaire, coordonnées de la personne ayant rempli la déclaration",
        caption: "« Observations » : périodes sans activité et coordonnées du mandataire (JuraTax 2025)",
      },

      { type: "h2", id: "changements", text: "Mariage, divorce, décès en 2026" },
      {
        type: "list",
        items: [
          "**Mariage en 2026** : vous êtes imposés ensemble pour toute l'année 2026 et remplissez une seule déclaration au nom du couple. Les acomptes facturés séparément sont cumulés sur le compte du couple.",
          "**Divorce ou séparation en 2026** : chacun est imposé séparément pour toute l'année et remplit sa propre déclaration. La moitié des acomptes payés sur le compte du couple est attribuée à chaque ex-conjoint, sauf demande conjointe d'une autre répartition.",
          "**Décès d'un conjoint** : l'imposition du couple s'arrête au jour du décès. Le conjoint survivant est ensuite imposé seul ; la déclaration est adressée au liquidateur de la succession ou au conjoint survivant.",
          "**Déménagement dans une autre commune jurassienne ou un autre canton** : la commune ou le canton de domicile au 31 décembre impose toute l'année.",
        ],
      },

      { type: "h2", id: "enfants", text: "Enfants à charge" },
      { type: "path", items: ["Données de référence", "Enfants à charge", "Insérer"] },
      {
        type: "p",
        text: "Inscrivez les enfants **mineurs au 31 décembre 2026** sous votre autorité parentale et les **enfants majeurs en apprentissage ou aux études** dont vous assumez l'entretien de manière prépondérante. Dans **« Enfants à charge »**, cliquez sur **« Insérer »** pour chaque enfant (« Modifier » et « Effacer » servent à corriger la liste). Sous la liste, JuraTax indique le nombre d'enfants pour lesquels vous demandez la **déduction pour enfant** et le **barème parental**.",
      },
      {
        type: "screenshot",
        file: "02-enfants.webp",
        alt: "Écran Enfants à charge de JuraTax 2025 : liste des enfants avec boutons Insérer, Modifier, Effacer, et déduction pour enfants",
        caption: "« Enfants à charge » : un enfant par ligne, avec le nombre d'enfants donnant droit à la déduction et au barème parental (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["Champ de la fiche « Données personnelles de l'enfant »", "Ce qu'il faut indiquer"],
        rows: [
          ["Nom, prénom, sexe, date de naissance", "Selon l'état civil"],
          ["Vivez-vous avec cet enfant ?", "Oui ou non : décisif pour le tarif et le barème parental"],
          ["Situation des parents", "Mariés, concubins ou autres (parents séparés ou divorcés)"],
          ["Autorité parentale officielle", "Oui, non ou partagée"],
          ["Garde alternée ; revenu inférieur à l'autre parent", "En garde alternée, le parent au revenu le plus faible obtient le tarif marié"],
          ["Pension alimentaire versée ou reçue", "Montant annuel, avec le nom et l'adresse de l'autre parent"],
          ["Frais de garde versés", "Crèche, accueil extrascolaire, maman de jour (code 555)"],
          ["Apprentissage ou études", "Type de formation, début, clôture probable, employeur ou établissement"],
        ],
        caption: "Libellés de JuraTax 2025. Les écrans suivants de la fiche servent au revenu de l'enfant pendant l'apprentissage ou les études et au calcul de la déduction.",
      },
      {
        type: "screenshot",
        file: "02-fiche-enfant.webp",
        alt: "Fiche Données personnelles de l'enfant dans JuraTax 2025 : situation des parents, autorité parentale, garde alternée, pensions alimentaires, frais de garde versés, apprentissage ou études",
        caption: "La fiche de chaque enfant : situation des parents, garde alternée, pensions et frais de garde (JuraTax 2025)",
      },
      {
        type: "p",
        text: "Le **revenu et la fortune des enfants mineurs** s'ajoutent à ceux du parent qui détient l'autorité parentale : déclarez leurs comptes dans votre état des titres. Seul le **revenu d'une activité lucrative** de l'enfant (et ses gains immobiliers) est imposé séparément. Un enfant majeur en formation remplit sa propre déclaration et peut y faire valoir la déduction pour apprenti ou étudiant (code 660).",
      },

      { type: "h2", id: "familles", text: "Concubins, parents séparés, garde alternée : qui déduit quoi ?" },
      {
        type: "table",
        head: ["Situation", "Déduction pour enfant (620) et primes (525)", "Tarif cantonal"],
        rows: [
          ["Couple marié", "Au couple", "Tarif marié"],
          ["Concubins, enfant né avant 2014, sans autorité parentale commune", "Au parent qui détient l'autorité parentale", "Personne seule pour les deux parents"],
          ["Concubins avec autorité parentale commune (toujours le cas pour un enfant né dès 2014), sans contribution d'entretien", "Moitié à chaque parent", "Personne seule pour les deux parents"],
          ["Parents séparés ou divorcés (2 ménages), autorité commune, sans contribution d'entretien", "Moitié à chaque parent", "Tarif marié au parent qui vit avec l'enfant ; en garde alternée, à celui dont le revenu net (code 590) est le plus faible"],
          ["Parents séparés, enfant majeur en formation, avec contributions d'entretien", "Au parent qui verse la contribution, si l'enfant est encore à charge", "Tarif marié au parent qui vit avec l'enfant"],
        ],
        caption: "Source : Guide général 2025, « Imposition des époux et de la famille », pages 8 à 12, Service des contributions du canton du Jura. Pour l'impôt fédéral direct, des règles proches s'appliquent avec le barème parental.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Joignez la convention",
        text: "Pour partager les déductions entre parents qui exercent l'autorité parentale en commun, la **convention d'entretien** de l'enfant doit être produite. Pour des concubins avec un enfant né avant 2014, joignez la décision de l'autorité tutélaire si l'autorité parentale commune a été établie.",
      },

      { type: "h2", id: "iban", text: "IBAN et déclaration sans papier l'an prochain" },
      {
        type: "p",
        text: "Indiquez le **titulaire du compte et l'IBAN** (CH suivi de 19 caractères). Le Service des contributions ne rembourse un trop-perçu que sur un IBAN ; à défaut, le montant est porté en compte sur l'année en cours. En bas de la page 1, une case permet aussi de renoncer au matériel papier : cochez-la si vous remplirez la prochaine déclaration avec JuraTax. Vous ne recevrez alors plus de documents sous forme papier.",
      },
    ],
    faq: [
      {
        q: "Un enfant majeur aux études reste-t-il à charge dans le canton du Jura ?",
        a: "Oui, s'il est en apprentissage ou aux études et que vous assumez son entretien de manière prépondérante. Déclarez-le avec la lettre A (apprenti) ou E (étudiant) et la date de fin de formation. La déduction n'est pas accordée si son revenu annuel, bourse comprise, dépasse CHF 19'800.",
      },
      {
        q: "Des concubins avec enfants ont-ils droit au tarif marié dans le Jura ?",
        a: "En principe non. Le tarif marié est réservé aux couples mariés vivant ensemble et aux personnes qui tiennent seules un ménage avec des enfants à charge. Des concubins ne tiennent pas seuls un ménage et sont imposés chacun au tarif des personnes seules.",
      },
      {
        q: "Qui obtient le tarif marié en garde alternée ?",
        a: "Pour l'impôt cantonal, le parent dont le revenu net (code 590) est le plus faible. L'autre parent est imposé au tarif des personnes seules. Chacun reçoit la moitié de la déduction pour enfant.",
      },
      {
        q: "Je me suis marié en 2026 : une ou deux déclarations ?",
        a: "Une seule. Les époux sont imposés ensemble pour toute l'année du mariage et remplissent une déclaration commune 2026 en février 2027.",
      },
    ],
  },
  en: {
    title: "Personal situation in JuraTax: marital status, religion, status, children and blended families",
    navTitle: "Personal situation",
    metaTitle: "JuraTax: marital status, dependent children, married scale",
    metaDescription:
      "Fill in page 1 of the Jura tax return in JuraTax: marital status on 31 December 2026, religion and church tax, professional status, dependent children (apprentice or student), separated parents, unmarried couples, shared custody and IBAN.",
    keywords: [
      "juratax personal situation",
      "juratax dependent children",
      "jura married tax scale",
      "unmarried couple tax jura",
      "shared custody tax jura",
      "church tax jura",
    ],
    summary: [
      "What counts is your situation on **31 December 2026**: a couple married in 2026 is taxed jointly for the **whole year**; a couple divorced or separated in 2026 is taxed separately for the whole year.",
      "List each dependent child: a minor on 31 December 2026, or an adult **in an apprenticeship (A)** or **studying (E)**, with the school and the end date of training.",
      "The **scale reserved for couples** also applies to a single parent living with their children. Unmarried couples with children are normally not entitled to it.",
      "Enter a **Swiss IBAN**: without it, any overpayment is credited to the current year instead of being refunded.",
    ],
    blocks: [
      { type: "h2", id: "etat-civil", text: "Marital status, religion and status" },
      {
        type: "p",
        text: "Under « Données de référence » (reference data), the **« Situation du contribuable »** (taxpayer's situation) screen asks for your marital status on 31 December 2026 (**single** « célibataire », **married / registered partners** « Mariés/L. Part », **widowed** « veuf », **separated** « séparé » or **divorced** « divorcé »), whether you have **dependent children**, whether you **married during the year** and, if not married, whether you **run your own household**. Your answers decide which screens follow.",
      },
      { type: "path", items: ["Données de référence", "Situation du contribuable"] },
      {
        type: "screenshot",
        file: "02-situation-personnelle.webp",
        alt: "JuraTax 2025 « Situation du contribuable » screen: marital status, dependent children, marriage during the year and own household",
        caption: "« Situation du contribuable »: marital status, children, marriage during the year and own household (JuraTax 2025)",
      },
      {
        type: "p",
        text: "Next come **« Données personnelles du contribuable »** (taxpayer's personal data) and **« du/de la conjoint(e) »** (spouse's): surname and first name, date of birth, AHV number, religion, main activity, occupation, employer, start date of work in 2026 and an important question, **« Êtes-vous arrivé dans le canton en 2026 ou étiez-vous à l'impôt à la source ? »** (did you move to the canton in 2026 or were you taxed at source?). Answer yes if so: the tax service takes it into account in your assessment.",
      },
      {
        type: "table",
        head: ["Field", "What to know"],
        rows: [
          ["Religion (« Confession »)", "Catholic, Reformed, other or none. Church tax is only due to parishes of recognised churches; the Christian Catholic church is not recognised in the canton of Jura"],
          ["Main activity (« Activité principale »)", "Employee, employee of your own company, self-employed, farmer, pensioner, insurance agent or home childcare, student, apprentice, not gainfully employed. This choice opens the matching income sections"],
          ["Remarks (« Observations »)", "« Observations » screen: periods without work and military service in 2026, with dates. They explain lower income or reduced work expenses"],
          ["Representative", "Same screen: the fiduciary's name, address, phone and email, if someone else completed your return"],
        ],
        caption: "Source: 2025 individual tax return and 2025 general guide, pages 14 and 15, Jura Service des contributions.",
      },
      {
        type: "screenshot",
        file: "02-donnees-personnelles.webp",
        alt: "JuraTax 2025 « Données personnelles du contribuable » screen: name, date of birth, AHV number, religion, main activity, occupation, employer and arrival in the canton",
        caption: "« Données personnelles du contribuable »: religion, main activity and arrival in the canton or tax at source (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "02-observations.webp",
        alt: "JuraTax 2025 « Observations » screen: periods without work or military service, details of the person who completed the return",
        caption: "« Observations »: periods without work and the representative's details (JuraTax 2025)",
      },

      { type: "h2", id: "changements", text: "Marriage, divorce, death in 2026" },
      {
        type: "list",
        items: [
          "**Married in 2026**: you are taxed jointly for the whole of 2026 and file a single return in the couple's name. Instalments billed separately are combined on the couple's account.",
          "**Divorced or separated in 2026**: each spouse is taxed separately for the whole year and files their own return. Half of the instalments paid on the couple's account goes to each former spouse, unless both ask jointly for another split.",
          "**Death of a spouse**: joint taxation ends on the day of death. The surviving spouse is then taxed alone; the return is sent to the estate's liquidator or the surviving spouse.",
          "**Moving to another Jura municipality or another canton**: the municipality or canton of residence on 31 December taxes the whole year.",
        ],
      },

      { type: "h2", id: "enfants", text: "Dependent children" },
      { type: "path", items: ["Données de référence", "Enfants à charge", "Insérer"] },
      {
        type: "p",
        text: "List children who are **minors on 31 December 2026** under your parental authority and **adult children in an apprenticeship or studying** whom you mainly support. Under **« Enfants à charge »** (dependent children), click **« Insérer »** (insert) for each child (« Modifier » and « Effacer », edit and delete, correct the list). Below the list, JuraTax shows how many children you claim the **child deduction** and the **parental scale** for.",
      },
      {
        type: "screenshot",
        file: "02-enfants.webp",
        alt: "JuraTax 2025 « Enfants à charge » screen: list of children with Insérer, Modifier, Effacer buttons, and child deduction",
        caption: "« Enfants à charge »: one child per line, with the number of children qualifying for the deduction and the parental scale (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["Field on the « Données personnelles de l'enfant » form", "What to enter"],
        rows: [
          ["Surname, first name, sex, date of birth", "As registered"],
          ["« Vivez-vous avec cet enfant ? » (do you live with this child?)", "Yes or no: decisive for the scale and the parental scale"],
          ["« Situation des parents » (parents' situation)", "Married, unmarried couple or other (separated or divorced parents)"],
          ["« Autorité parentale officielle » (parental authority)", "Yes, no or shared"],
          ["« Garde alternée » (shared custody); lower income than the other parent", "In shared custody, the parent with the lower income gets the married scale"],
          ["Maintenance paid or received", "Annual amount, with the other parent's name and address"],
          ["« Frais de garde versés » (childcare costs paid)", "Nursery, after-school care, childminder (code 555)"],
          ["« Apprentissage ou études » (apprenticeship or studies)", "Type of training, start, expected end, employer or school"],
        ],
        caption: "JuraTax 2025 labels. The form's following screens cover the child's income during an apprenticeship or studies and the deduction calculation.",
      },
      {
        type: "screenshot",
        file: "02-fiche-enfant.webp",
        alt: "« Données personnelles de l'enfant » form in JuraTax 2025: parents' situation, parental authority, shared custody, maintenance, childcare costs, apprenticeship or studies",
        caption: "Each child's form: parents' situation, shared custody, maintenance and childcare costs (JuraTax 2025)",
      },
      {
        type: "p",
        text: "The **income and wealth of minor children** are added to those of the parent with parental authority: list their accounts in your securities list. Only the child's **earned income** (and property gains) is taxed separately. An adult child in training files their own return and can claim the apprentice or student deduction there (code 660).",
      },

      { type: "h2", id: "familles", text: "Unmarried couples, separated parents, shared custody: who deducts what?" },
      {
        type: "table",
        head: ["Situation", "Child deduction (620) and premiums (525)", "Cantonal scale"],
        rows: [
          ["Married couple", "To the couple", "Married scale"],
          ["Unmarried couple, child born before 2014, no joint parental authority", "To the parent with parental authority", "Single scale for both parents"],
          ["Unmarried couple with joint parental authority (always the case for a child born from 2014), no maintenance payments", "Half to each parent", "Single scale for both parents"],
          ["Separated or divorced parents (2 households), joint authority, no maintenance payments", "Half to each parent", "Married scale for the parent living with the child; in shared custody, for the one with the lower net income (code 590)"],
          ["Separated parents, adult child in training, with maintenance payments", "To the parent paying maintenance, if the child is still dependent", "Married scale for the parent living with the child"],
        ],
        caption: "Source: 2025 general guide, « Imposition des époux et de la famille », pages 8 to 12, Jura Service des contributions. For direct federal tax, similar rules apply with the parental scale.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Enclose the agreement",
        text: "To share deductions between parents with joint parental authority, the child's **maintenance agreement** must be provided. For an unmarried couple with a child born before 2014, enclose the guardianship authority's decision if joint parental authority was established.",
      },

      { type: "h2", id: "iban", text: "IBAN and going paperless next year" },
      {
        type: "p",
        text: "Enter the **account holder and IBAN** (CH followed by 19 characters). The tax service only refunds an overpayment to an IBAN; otherwise the amount is credited to the current year. At the bottom of page 1, a box also lets you give up paper documents: tick it if you will complete next year's return with JuraTax. You will then no longer receive anything on paper.",
      },
    ],
    faq: [
      {
        q: "Is an adult child at university still a dependant in Jura?",
        a: "Yes, if they are in an apprenticeship or studying and you mainly support them. List them with the letter A (apprentice) or E (student) and the end date of training. The deduction is not granted if their annual income, grants included, exceeds CHF 19,800.",
      },
      {
        q: "Do unmarried couples with children get the married scale in Jura?",
        a: "Normally not. The married scale is reserved for married couples living together and for people running a household alone with dependent children. Unmarried couples do not run a household alone and are each taxed on the single scale.",
      },
      {
        q: "Who gets the married scale in shared custody?",
        a: "For cantonal tax, the parent with the lower net income (code 590). The other parent is taxed on the single scale. Each receives half of the child deduction.",
      },
      {
        q: "I got married in 2026: one return or two?",
        a: "One. Spouses are taxed jointly for the whole year of marriage and file a joint 2026 return in February 2027.",
      },
    ],
  },
};
