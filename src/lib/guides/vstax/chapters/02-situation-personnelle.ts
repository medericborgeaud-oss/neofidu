import type { GuideChapter } from "../../types";

export const situationPersonnelle: GuideChapter = {
  slug: "situation-personnelle",
  readTime: 7,
  fr: {
    title: "Situation personnelle dans VSTax : état civil, enfants, frais de garde et rabais familial",
    navTitle: "Situation personnelle",
    metaTitle: "VSTax : données personnelles, enfants et frais de garde (2026)",
    metaDescription:
      "Remplir les données personnelles de VSTax, déclarer ses enfants, déductions 2026 pour enfants (CHF 7'860 à 11'930), frais de garde jusqu'à CHF 10'000 et rabais de 35 % pour les familles.",
    keywords: [
      "vstax données personnelles",
      "déduction enfant valais 2026",
      "frais de garde valais",
      "garde propres enfants valais 3130",
      "concubins impôt valais",
      "rabais 35 % impôt valais",
    ],
    summary: [
      "La fenêtre **Données personnelles** s'ouvre au début de chaque nouvelle déclaration et reste accessible par le menu « Modifier » (Ctrl + L). La situation au **31 décembre 2026** est déterminante.",
      "Déduction par enfant : **CHF 7'860** jusqu'à 6 ans, **CHF 8'940** de 6 à 16 ans, **CHF 11'930** dès 16 ans, plus CHF 1'240 dès le 3e enfant (code 2510).",
      "Frais de garde par un tiers : jusqu'à **CHF 10'000** par enfant de moins de 14 ans (code 2512). Garde de ses propres enfants : **CHF 3'130** (code 2512a), sous conditions de taux d'activité.",
      "Les couples mariés et les parents seuls bénéficient d'un **rabais de 35 %** sur l'impôt cantonal, puis de CHF 300 par enfant. Les concubins n'y ont pas droit.",
    ],
    blocks: [
      { type: "h2", id: "donnees-personnelles", text: "La fenêtre Données personnelles" },
      { type: "path", items: ["Modifier", "Données personnelles...", "Contribuables"] },
      {
        type: "screenshot",
        file: "01-donnees-personnelles.webp",
        alt: "Fenêtre Données personnelles au 31.12.2025 de VSTax : contribuable 1 et contribuable 2, numéro AVS, état civil, commune de taxation, contribution 2e pilier",
        caption: "Les données personnelles d'un couple marié : la commune de taxation et la question du 2e pilier sont obligatoires (VSTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "Pour quitter cette fenêtre, VSTax exige : nom, prénom, NPA et lieu, date de naissance, numéro AVS, numéro de contribuable, numéro de dossier, état civil, concubinage (sauf pour les couples mariés), **commune de taxation** et la réponse à la question « Avez-vous versé en 2026 des cotisations à des institutions de prévoyance professionnelle ? ». Pour un couple marié, il faut aussi le nom, le nom de célibataire, le prénom, la date de naissance et le numéro AVS du contribuable 2, et indiquer s'il seconde l'autre dans son entreprise.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "La question du 2e pilier compte",
        text: "Elle détermine le plafond du 3e pilier A (CHF 7'258 avec caisse de pension, 20 % du revenu sinon) et, à l'impôt fédéral, celui des primes d'assurance. Répondez « Oui » dès que votre certificat de salaire montre une cotisation LPP (chiffre 10.1).",
      },
      {
        type: "p",
        text: "L'onglet **Professions** sert à choisir votre profession principale et accessoire dans deux listes, « Classe » puis « Profession ». Si la vôtre n'y figure pas, vous pouvez saisir un texte libre.",
      },

      { type: "h2", id: "etat-civil", text: "État civil, mariage, séparation et déménagement en 2026" },
      {
        type: "table",
        head: ["Situation en 2026", "Conséquence pour la déclaration 2026"],
        rows: [
          ["Mariage", "Une déclaration commune pour toute l'année"],
          ["Divorce ou séparation", "Une déclaration séparée par conjoint pour toute l'année"],
          ["Décès du conjoint", "Imposition commune jusqu'au décès, puis le survivant est imposé seul"],
          ["Enfant devenu majeur", "Imposé seul dès le début de l'année"],
          ["Arrivée d'un autre canton", "Imposé en Valais pour toute l'année 2026, tous revenus compris"],
          ["Arrivée de l'étranger", "Imposé dès la date d'arrivée ; revenus de cette date au 31 décembre"],
          ["Départ dans un autre canton", "Plus de déclaration valaisanne pour 2026 : le nouveau canton impose toute l'année"],
          ["Départ à l'étranger", "Déclaration jusqu'à la date du départ"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, « Changement d'état civil » et « Déplacement de domicile ».",
      },
      {
        type: "p",
        text: "Cochez **Concubinage** si vous vivez en couple sans être mariés. Les concubins remplissent chacun leur déclaration, n'ont pas droit au rabais de 35 % ni à la déduction pour revenu modeste, et se partagent par moitié la déduction de CHF 90'000 sur la fortune lorsqu'ils ont des enfants.",
      },

      { type: "h2", id: "enfants", text: "Déclarer ses enfants (page 1, charge de famille)" },
      {
        type: "p",
        text: "Les enfants se saisissent sous « **Charge de famille** », en page 1 de la déclaration : nom, date de naissance, ménage commun, employeur ou établissement de formation et date de fin de formation. Pour des parents séparés, divorcés ou concubins, VSTax demande en plus si une pension est payée ou reçue, qui a l'autorité parentale, s'il y a garde alternée et si l'enfant est commun avec le concubin. Ces réponses déterminent qui obtient la déduction.",
      },
      {
        type: "table",
        head: ["Enfant à charge (situation au 31 décembre 2026)", "Impôt cantonal (code 2510)"],
        rows: [
          ["Jusqu'à 6 ans", "CHF 7'860"],
          ["De 6 à 16 ans", "CHF 8'940"],
          ["Dès 16 ans, en formation", "CHF 11'930"],
          ["Supplément dès le 3e enfant", "CHF 1'240 par enfant"],
          ["Allocation de naissance ou d'adoption reçue en 2026", "Ajoutée à la déduction"],
          ["Impôt fédéral direct", "CHF 6'800 par enfant"],
        ],
        caption: "Sources : « Adaptation des déductions forfaitaires pour l'imposition 2026 », SCC Valais ; circulaire 2-215-D-2025 de l'Administration fédérale des contributions (IFD 2026).",
      },
      {
        type: "list",
        items: [
          "La déduction suppose que vous supportiez **au moins 50 %** des frais d'entretien et de formation de l'enfant.",
          "Parents imposés séparément avec autorité parentale commune et sans pension pour l'enfant : chacun obtient **la moitié** de la déduction.",
          "Le salaire d'un enfant mineur (y compris un salaire d'apprenti) n'entre pas dans votre déclaration : l'enfant remplit **sa propre déclaration**. Sa fortune et ses autres revenus (intérêts, rente d'orphelin) figurent en revanche dans la vôtre.",
        ],
      },

      { type: "h2", id: "garde", text: "Frais de garde : par un tiers (2512) ou par les parents (2512a)" },
      {
        type: "table",
        head: ["Déduction", "Impôt cantonal", "Impôt fédéral direct"],
        rows: [
          ["Garde par un tiers (crèche, UAPE, maman de jour), enfant de moins de 14 ans", "Frais effectifs, max. CHF 10'000 par enfant", "Frais effectifs, max. CHF 25'800 par enfant"],
          ["Garde de ses propres enfants de moins de 14 ans", "Forfait de CHF 3'130 par enfant", "Pas de déduction"],
          ["Cumul des deux", "Possible, max. CHF 10'000 par enfant", "Sans objet"],
        ],
        caption: "Sources : Feuille cantonale Valais (AFC, février 2026), art. 29 al. 1 let. l LF ; circulaire AFC 2-215-D-2025 pour l'IFD.",
      },
      {
        type: "p",
        text: "La garde par un tiers est déductible si l'enfant vit avec vous et si les frais sont **documentés** et liés directement à votre travail, votre formation ou votre incapacité de gain. Le forfait pour la garde de ses propres enfants est réservé au parent seul dont le taux d'activité **ne dépasse pas 80 %** et au couple dont le taux global **ne dépasse pas 160 %**. Il faut le revendiquer dans la déclaration.",
      },
      {
        type: "screenshot",
        file: "02-enfants.webp",
        alt: "Rubrique Charge de famille de VSTax : tableau des enfants (ménage commun, date de naissance, établissement, fin de formation), questions pour parents séparés, concubin et personnes nécessiteuses",
        caption: "La rubrique « Charge de famille » en page 1 : les colonnes de droite ne concernent que les parents séparés, divorcés ou concubins (VSTax 2025)",
      },

      { type: "h2", id: "autres-charges", text: "Personnes à charge, étudiants et apprentis" },
      {
        type: "table",
        head: ["Déduction", "Code", "Montant 2026"],
        rows: [
          ["Personne à charge incapable de gagner sa vie, que vous entretenez", "2511", "CHF 2'510 (IFD : CHF 6'800)"],
          ["Internat ou famille d'accueil, étudiant du degré secondaire", "2513", "frais effectifs, max. CHF 5'710"],
          ["Logement d'un étudiant du degré tertiaire hors du domicile", "2514", "max. CHF 10'000 (CHF 5'220 en 2025)"],
          ["Revenu propre d'un apprenti ou d'un étudiant (dans sa déclaration)", "2580", "max. CHF 7'770"],
        ],
        caption: "Source : « Adaptation des déductions forfaitaires pour l'imposition 2026 », SCC Valais.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Logement étudiant : seulement sans formation équivalente en Valais",
        text: "La déduction de la rubrique 2514 n'est pas accordée lorsque l'enfant peut suivre une formation équivalente dans un établissement valaisan. Joignez une copie du bail (ou les preuves de loyer) et l'attestation d'immatriculation.",
      },

      { type: "h2", id: "rabais", text: "Rabais de 35 % et déduction pour revenu modeste" },
      {
        type: "p",
        text: "Le Valais n'applique pas de splitting. Pour les **couples mariés** et les **parents seuls** qui vivent avec leurs enfants, l'impôt cantonal sur le revenu est **réduit de 35 %**, au minimum de CHF 680 et au maximum de CHF 4'900, puis de **CHF 300 par enfant**. Les personnes seules sans enfant à revenu modeste reçoivent à la place une déduction de **CHF 21'250** sur le revenu imposable, qui diminue par paliers et disparaît au-delà de CHF 35'470. VSTax calcule ces montants : vous n'avez rien à saisir, mais l'état civil, le concubinage et les enfants doivent être justes.",
      },
    ],
    faq: [
      {
        q: "Quel est le montant de la déduction pour enfant en Valais en 2026 ?",
        a: "CHF 7'860 jusqu'à 6 ans, CHF 8'940 de 6 à 16 ans et CHF 11'930 dès 16 ans pour un enfant en formation, plus CHF 1'240 par enfant dès le troisième. À l'impôt fédéral direct, la déduction est de CHF 6'800 par enfant.",
      },
      {
        q: "Combien peut-on déduire pour la crèche en Valais ?",
        a: "Jusqu'à CHF 10'000 par enfant de moins de 14 ans à l'impôt cantonal et CHF 25'800 à l'impôt fédéral direct, sur justificatifs, si la garde est liée à votre activité, votre formation ou votre incapacité de gain.",
      },
      {
        q: "Qu'est-ce que la déduction pour la garde de ses propres enfants ?",
        a: "Un forfait de CHF 3'130 par enfant de moins de 14 ans à l'impôt cantonal, pour les familles qui gardent elles-mêmes leurs enfants : le parent seul ne doit pas dépasser 80 % d'activité, le couple 160 % au total. Il n'existe pas à l'impôt fédéral.",
      },
      {
        q: "Les concubins ont-ils droit au rabais de 35 % ?",
        a: "Non. La loi fiscale valaisanne exclut les personnes vivant en union libre du rabais de 35 % et de la déduction pour revenu modeste. Chaque concubin remplit sa propre déclaration.",
      },
    ],
  },
  en: {
    title: "Personal situation in VSTax: marital status, children, childcare and the family rebate",
    navTitle: "Personal situation",
    metaTitle: "VSTax: personal data, children and childcare costs (2026)",
    metaDescription:
      "Completing the VSTax personal data, declaring children, 2026 child deductions (CHF 7,860 to 11,930), childcare up to CHF 10,000 and the 35% family tax rebate in Valais.",
    keywords: [
      "vstax personal data",
      "valais child deduction 2026",
      "valais childcare deduction",
      "valais tax unmarried couple",
      "valais family tax rebate",
      "vstax children",
    ],
    summary: [
      "The **personal data** window (« Données personnelles ») opens at the start of every new return and is always available from the « Modifier » menu (Ctrl + L). Your situation on **31 December 2026** is what counts.",
      "Child deduction: **CHF 7,860** up to age 6, **CHF 8,940** from 6 to 16, **CHF 11,930** from 16, plus CHF 1,240 from the third child (code 2510).",
      "Childcare by third parties: up to **CHF 10,000** per child under 14 (code 2512). Looking after your own children: **CHF 3,130** (code 2512a), subject to work-rate conditions.",
      "Married couples and single parents get a **35% rebate** on cantonal tax, then CHF 300 per child. Unmarried couples do not.",
    ],
    blocks: [
      { type: "h2", id: "donnees-personnelles", text: "The personal data window" },
      { type: "path", items: ["Modifier", "Données personnelles...", "Contribuables"] },
      {
        type: "screenshot",
        file: "01-donnees-personnelles.webp",
        alt: "VSTax personal data window on 31.12.2025: taxpayer 1 and taxpayer 2, AHV number, marital status, municipality, pension fund question",
        caption: "Personal data for a married couple: the municipality and the pension fund question are mandatory (VSTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "To close this window, VSTax requires: surname, first name, postcode and town, date of birth, AHV number (« N° AVS »), taxpayer number, file number, marital status (« Etat civil »), cohabitation (« Concubinage », except for married couples), **municipality of assessment** (« Commune de taxation ») and the answer to « Avez-vous versé en 2026 des cotisations à des institutions de prévoyance professionnelle ? » (did you pay pension fund contributions in 2026?). For a married couple, it also needs taxpayer 2's surname, maiden name, first name, date of birth and AHV number, and whether they help in the other's business.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "The pension fund question matters",
        text: "It sets your pillar 3a cap (CHF 7,258 with a pension fund, otherwise 20% of income) and, for federal tax, the insurance premium cap. Answer « Oui » (yes) if your salary certificate shows a pension contribution (box 10.1).",
      },
      {
        type: "p",
        text: "The **Professions** tab lets you pick your main and secondary occupation from two lists, « Classe » (field) then « Profession ». If yours is missing, you can type free text.",
      },

      { type: "h2", id: "etat-civil", text: "Marital status, marriage, separation and moving in 2026" },
      {
        type: "table",
        head: ["Situation in 2026", "Effect on the 2026 return"],
        rows: [
          ["Marriage", "One joint return for the whole year"],
          ["Divorce or separation", "Separate returns for the whole year"],
          ["Death of a spouse", "Joint taxation until the death, then the survivor is taxed alone"],
          ["Child turned 18", "Taxed separately from the start of the year"],
          ["Moved from another canton", "Taxed in Valais for all of 2026, all income included"],
          ["Moved from abroad", "Taxed from the arrival date; income from that date to 31 December"],
          ["Moved to another canton", "No Valais return for 2026: the new canton taxes the whole year"],
          ["Moved abroad", "Return up to the departure date"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, sections on changes in marital status and moving.",
      },
      {
        type: "p",
        text: "Tick **Concubinage** if you live as a couple without being married. Unmarried partners each file their own return, do not get the 35% rebate or the low-income deduction, and split the CHF 90,000 wealth allowance in half when they have children.",
      },

      { type: "h2", id: "enfants", text: "Declaring children (page 1, dependants)" },
      {
        type: "p",
        text: "Children are entered under « **Charge de famille** » (dependants) on page 1 of the return: name, date of birth, same household, employer or school and end date of training. For separated, divorced or unmarried parents, VSTax also asks whether maintenance is paid or received, who has parental authority, whether custody is shared and whether the child is shared with the partner. These answers decide who gets the deduction.",
      },
      {
        type: "table",
        head: ["Dependent child (situation on 31 December 2026)", "Cantonal tax (code 2510)"],
        rows: [
          ["Up to age 6", "CHF 7,860"],
          ["Age 6 to 16", "CHF 8,940"],
          ["16 and over, in education", "CHF 11,930"],
          ["Extra from the third child", "CHF 1,240 per child"],
          ["Birth or adoption allowance received in 2026", "Added to the deduction"],
          ["Direct federal tax", "CHF 6,800 per child"],
        ],
        caption: "Sources: \"Adaptation des déductions forfaitaires pour l'imposition 2026\", SCC Valais; Swiss Federal Tax Administration circular 2-215-D-2025 (federal tax 2026).",
      },
      {
        type: "list",
        items: [
          "You must bear **at least 50%** of the child's living and education costs.",
          "Parents taxed separately with joint parental authority and no child maintenance: each gets **half** of the deduction.",
          "A minor child's salary (including apprentice pay) does not go in your return: the child files **their own return**. Their wealth and other income (interest, orphan's pension) do go in yours.",
        ],
      },

      { type: "h2", id: "garde", text: "Childcare: by third parties (2512) or by the parents (2512a)" },
      {
        type: "table",
        head: ["Deduction", "Cantonal tax", "Direct federal tax"],
        rows: [
          ["Third-party care (nursery, after-school care, childminder), child under 14", "Actual costs, max. CHF 10,000 per child", "Actual costs, max. CHF 25,800 per child"],
          ["Looking after your own children under 14", "Flat CHF 3,130 per child", "No deduction"],
          ["Both combined", "Allowed, max. CHF 10,000 per child", "Not applicable"],
        ],
        caption: "Sources: Valais cantonal sheet (Swiss Federal Tax Administration, February 2026), art. 29 para. 1 let. l of the cantonal tax law; circular 2-215-D-2025 for federal tax.",
      },
      {
        type: "p",
        text: "Third-party care is deductible if the child lives with you and the costs are **documented** and directly linked to your work, training or inability to work. The flat rate for looking after your own children is for a single parent working **no more than 80%** and a couple working **no more than 160%** combined. You have to claim it in the return.",
      },
      {
        type: "screenshot",
        file: "02-enfants.webp",
        alt: "VSTax dependants section: children table (same household, date of birth, school, end of training), questions for separated parents, partner and other dependants",
        caption: "The « Charge de famille » (dependants) section on page 1: the right-hand columns only apply to separated, divorced or unmarried parents (VSTax 2025)",
      },

      { type: "h2", id: "autres-charges", text: "Other dependants, students and apprentices" },
      {
        type: "table",
        head: ["Deduction", "Code", "2026 amount"],
        rows: [
          ["Dependent person unable to earn a living whom you support", "2511", "CHF 2,510 (federal: CHF 6,800)"],
          ["Boarding school or host family, secondary-level student", "2513", "actual costs, max. CHF 5,710"],
          ["Housing for a tertiary-level student living away from home", "2514", "max. CHF 10,000 (CHF 5,220 in 2025)"],
          ["Apprentice's or student's own income (in their return)", "2580", "max. CHF 7,770"],
        ],
        caption: "Source: \"Adaptation des déductions forfaitaires pour l'imposition 2026\", SCC Valais.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Student housing: only if no equivalent course in Valais",
        text: "The code 2514 deduction is refused if the child could follow an equivalent course at a Valais institution. Attach a copy of the lease (or rent receipts) and the enrolment certificate.",
      },

      { type: "h2", id: "rabais", text: "The 35% rebate and the low-income deduction" },
      {
        type: "p",
        text: "Valais does not use income splitting. For **married couples** and **single parents** living with their children, cantonal income tax is **reduced by 35%**, at least CHF 680 and at most CHF 4,900, then by **CHF 300 per child**. Single people without children on low incomes get instead a deduction of **CHF 21,250** from taxable income, which falls in steps and disappears above CHF 35,470. VSTax works these out: there is nothing to enter, but your marital status, cohabitation and children must be correct.",
      },
    ],
    faq: [
      {
        q: "How much is the child deduction in Valais in 2026?",
        a: "CHF 7,860 up to age 6, CHF 8,940 from 6 to 16 and CHF 11,930 from 16 for a child in education, plus CHF 1,240 per child from the third. For direct federal tax, it is CHF 6,800 per child.",
      },
      {
        q: "How much can I deduct for nursery costs in Valais?",
        a: "Up to CHF 10,000 per child under 14 for cantonal tax and CHF 25,800 for direct federal tax, with receipts, if the care is linked to your work, training or inability to work.",
      },
      {
        q: "What is the deduction for looking after your own children?",
        a: "A flat CHF 3,130 per child under 14 for cantonal tax, for families who look after their children themselves: a single parent must not work more than 80%, a couple not more than 160% combined. It does not exist for federal tax.",
      },
      {
        q: "Do unmarried couples get the 35% rebate?",
        a: "No. Valais tax law excludes people living together without being married from the 35% rebate and from the low-income deduction. Each partner files their own return.",
      },
    ],
  },
};
