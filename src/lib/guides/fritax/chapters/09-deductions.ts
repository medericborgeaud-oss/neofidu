import type { GuideChapter } from "../../types";

export const deductions: GuideChapter = {
  slug: "deductions",
  readTime: 9,
  fr: {
    title: "Déductions dans FriTax : primes d'assurance, frais de garde, frais médicaux, dons et déductions sociales",
    navTitle: "Déductions",
    metaTitle: "FriTax 2026 : toutes les déductions fribourgeoises (codes 4.110 à 7.110)",
    metaDescription:
      "Les déductions de la déclaration fribourgeoise 2026 dans FriTax : forfait d'assurance-maladie (4.110), 3e pilier B (4.120), frais de garde jusqu'à CHF 12'000 (4.380), formation (4.420), pensions versées, frais médicaux au-delà de 5 % (5.110), dons, déduction par enfant (6.110) et différences avec l'impôt fédéral.",
    keywords: [
      "fritax déductions",
      "déductions fiscales fribourg 2026",
      "déduction assurance maladie fribourg 4810",
      "frais de garde déduction fribourg",
      "déduction enfant fribourg 8600",
      "frais médicaux déduction fribourg",
    ],
    summary: [
      "**Assurance-maladie et accidents (4.110)** : un **forfait** est accordé automatiquement, CHF 4'810 par adulte, CHF 4'210 par jeune adulte en formation et CHF 1'140 par enfant, moins les réductions de primes reçues.",
      "**Frais de garde (4.380)** : jusqu'à **CHF 12'000** par enfant de moins de 14 ans, si les deux parents (ou le parent seul) travaillent ou sont en formation.",
      "**Frais médicaux (5.110)** : la part qui dépasse **5 % du revenu net** ; **dons (5.120)** : dès CHF 100, jusqu'à 20 % du revenu net.",
      "**Déduction par enfant (6.110)** : **CHF 8'600** (CHF 9'600 dès le troisième), réduite de CHF 100 par tranche de CHF 1'000 de revenu net au-delà de CHF 62'700, au minimum CHF 7'100.",
    ],
    blocks: [
      { type: "h2", id: "primes", text: "Primes d'assurance et intérêts d'épargne (codes 4.110 à 4.150)" },
      {
        type: "table",
        head: ["Code", "Déduction", "Montant 2026"],
        rows: [
          ["4.110", "Assurance-maladie et accidents (forfait)", "CHF 4'810 par adulte (CHF 9'620 pour un couple), CHF 4'210 par jeune adulte de 18 à 25 ans en formation, CHF 1'140 par enfant"],
          ["4.120", "Autres primes : assurances-vie, risque pur, indemnités journalières, rentes viagères (3e pilier B)", "max. CHF 1'500 couple, CHF 750 autres contribuables"],
          ["4.130", "3e pilier A", "CHF 7'258 ou 20 % du revenu, max. CHF 36'288 (voir [Prévoyance](/guide/fritax/prevoyance))"],
          ["4.140", "Rachats LPP", "Montant versé, avec attestation"],
          ["4.150", "Intérêts de capitaux d'épargne", "max. CHF 300 couple, CHF 150 autres contribuables"],
        ],
        caption: "Source : Feuille cantonale Fribourg, AFC, février 2026 (art. 34 LICD et ordonnance sur la déduction des primes d'assurance-maladie) ; Instructions générales 2025, SCC Fribourg.",
      },
      {
        type: "p",
        text: "Le forfait d'assurance-maladie ne dépend **pas des primes réellement payées** : FriTax le calcule selon la composition du ménage, l'âge de chacun au 31 décembre étant déterminant. Si vous recevez une **réduction de primes** de l'ECAS, seule la différence entre le forfait et le subside est déductible ; si vous ne connaissez pas le montant du subside, le SCC en tient compte d'office. Pour le **code 4.120**, remplissez la rubrique **A « Assurances »** : sans elle, pas de déduction. Il n'y a aucune compensation possible entre ces différentes déductions.",
      },
      {
        type: "screenshot",
        file: "09-primes-assurance.webp",
        alt: "Primes d'assurance dans FriTax : forfait d'assurance-maladie calculé selon le ménage, 3e pilier B et intérêts d'épargne",
        caption: "La page 3 : autres revenus et fortune (3.410 à 3.570), puis toutes les déductions de 4.110 à 7.110 ; le forfait d'assurance-maladie (4.110) est calculé automatiquement (FriTax 2025)",
      },

      { type: "h2", id: "autres-deductions", text: "Autres déductions sur le revenu (codes 4.330 à 4.420)" },
      {
        type: "table",
        head: ["Code", "Déduction", "Limite 2026"],
        rows: [
          ["4.330, 4.335", "Rentes et charges durables, droit d'habitation", "Montant versé ; part de rendement pour les rentes viagères"],
          ["4.340", "Pension alimentaire versée au conjoint divorcé ou séparé, et pour enfants mineurs", "Montant prouvé ; pas pour un enfant majeur"],
          ["4.350", "Cotisations AVS/AI/APG/AC des personnes sans activité lucrative", "Montant versé"],
          ["4.370", "Frais liés à un handicap, séjour en home compris", "Frais effectifs restant à charge, ou forfait de CHF 2'500, 5'000 ou 7'500 selon l'allocation pour impotent"],
          ["4.380", "Frais de garde des enfants par un tiers", "max. CHF 12'000 par enfant de moins de 14 ans"],
          ["4.410", "Cotisations et dons aux partis politiques", "max. CHF 5'000"],
          ["4.420", "Formation et perfectionnement à des fins professionnelles", "max. CHF 12'000"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, codes 4.330 à 4.420 ; Feuille cantonale Fribourg, AFC, février 2026.",
      },
      {
        type: "list",
        items: [
          "**Frais de garde** : pour chaque enfant de **moins de 14 ans** (jusqu'au mois de ses 14 ans inclus), sur preuves, si les deux conjoints exercent une activité lucrative, ou si le parent seul qui vit avec l'enfant travaille. Une formation ou une rente AI compte comme activité. Les frais de repas et d'habits ne sont pas des frais de garde.",
          "**Pension alimentaire versée** : remplissez la rubrique « **D, Pension alimentaire** » en séparant la part du conjoint et celle des enfants. Les contributions pour un enfant mineur sont déductibles si le parent qui les reçoit détient l'autorité parentale.",
          "**Formation** : il n'est plus exigé de lien avec l'activité exercée, mais la formation initiale (premier diplôme du secondaire II) et les loisirs ne sont pas déductibles. Seuls les montants que vous avez payés vous-même comptent.",
          "**Handicap** : les personnes sourdes ou dialysées ont droit à un forfait de CHF 2'500, avec certificat médical.",
        ],
      },

      { type: "h2", id: "frais-medicaux", text: "Frais médicaux et dons (codes 5.110 et 5.120)" },
      {
        type: "p",
        text: "Les **frais médicaux, pharmaceutiques et dentaires** non remboursés, payés en 2026 pour vous et les personnes à votre charge, sont déductibles pour la part qui dépasse **5 % du revenu net** (code 4.910). Remplissez la rubrique **B « Frais médicaux »** : joignez un état détaillé avec factures et décomptes d'assurance, ou utilisez l'annexe de liste du SCC, qui dispense de joindre les justificatifs (le SCC peut les demander plus tard). Les cures et régimes ne comptent que sur prescription médicale ; un régime alimentaire vital (cœliakie, par exemple) donne droit à un forfait de CHF 2'500, sauf pour le diabète.",
      },
      {
        type: "p",
        text: "Les **dons** à des institutions d'utilité publique ayant leur siège en Suisse, ainsi qu'à la Confédération, aux cantons et aux communes, sont déductibles dès **CHF 100** par an et jusqu'à **20 % du revenu net**. Remplissez la rubrique **C « Versements bénévoles »**, avec une liste et les justificatifs ou l'annexe de liste du SCC. Le SCC publie une liste des institutions fribourgeoises exonérées. Pour la déduction, la **date de paiement** compte.",
      },
      {
        type: "screenshot",
        file: "09-frais-medicaux-dons.webp",
        alt: "Rubriques B Frais médicaux et C Versements bénévoles de FriTax avec calcul du seuil de 5 % et de la limite de 20 %",
        caption: "Rubriques B et C de la page 4 : FriTax déduit 5 % du revenu net des frais médicaux et limite les dons à 20 % (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "09-frais-de-garde.webp",
        alt: "Onglet Frais de garde de la fiche Enfants de FriTax : date, nom et adresse de la personne ou structure de garde, montant, prestations reçues et part de l'autre parent",
        caption: "Les frais de garde se saisissent dans la fiche de chaque enfant, onglet « Frais de garde » : FriTax déduit les prestations reçues et la part de l'autre parent (FriTax 2025)",
      },

      { type: "h2", id: "deductions-sociales", text: "Déductions sociales (codes 6.110 à 7.110)" },
      {
        type: "table",
        head: ["Code", "Déduction", "Montant 2026"],
        rows: [
          ["6.110", "Par enfant mineur ou en formation", "CHF 8'600 (CHF 9'600 dès le 3e enfant), réduite selon le revenu net, au minimum CHF 7'100 (CHF 8'100 dès le 3e)"],
          ["6.120", "Autre personne à charge, incapable de subvenir à ses besoins", "CHF 5'000"],
          ["6.130", "Contribuable aux études ou en apprentissage, jusqu'à 25 ans", "CHF 3'600, dans sa propre déclaration"],
          ["6.140", "Contribuable en fauteuil roulant actif, sans rente AVS/AI ; orphelin de père et mère", "CHF 2'500 ; CHF 8'600 (dégressive)"],
          ["6.145", "Indemnités forfaitaires reçues pour l'aide et les soins à domicile d'un proche", "Montant reçu, impôt cantonal seulement"],
          ["7.110", "Contribuable à revenu modeste", "De CHF 4'100 à CHF 11'100 selon la situation, dégressive"],
        ],
        caption: "Source : Feuille cantonale Fribourg, AFC, février 2026 (art. 36 LICD) ; Instructions générales 2025, SCC Fribourg.",
      },
      {
        type: "p",
        text: "La **déduction par enfant** est réduite de **CHF 100 par tranche de CHF 1'000** de revenu net au-delà d'une limite de **CHF 62'700** pour le premier enfant, augmentée de CHF 10'100 par enfant supplémentaire. Exemple : avec un enfant et CHF 70'000 de revenu net, la déduction est de CHF 7'800 ; avec deux enfants, la limite passe à CHF 72'800 et la déduction reste de CHF 17'200. FriTax applique ce barème automatiquement.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Déduction pour revenu modeste",
        text: "Le canton de Fribourg accorde une déduction supplémentaire aux revenus modestes : par exemple **CHF 4'100** pour une personne seule sans charge d'entretien dont le revenu ne dépasse pas CHF 20'300, et **CHF 9'100** pour un rentier AVS/AI seul jusqu'à CHF 24'300, réduite ensuite par tranche de CHF 1'000. FriTax la calcule seul.",
      },

      { type: "h2", id: "ifd", text: "Ce qui change à l'impôt fédéral direct" },
      {
        type: "p",
        text: "Il n'y a pas de déclaration séparée pour l'impôt fédéral direct (IFD) : le SCC applique lui-même les différences. Pour vous faire une idée de votre impôt fédéral :",
      },
      {
        type: "table",
        head: ["Code", "Impôt cantonal 2026", "Impôt fédéral direct 2026"],
        rows: [
          ["2.110 Transport", "max. CHF 12'000", "max. CHF 3'300"],
          ["2.510 Deux conjoints actifs", "CHF 500", "50 % du revenu le plus bas, min. CHF 8'600, max. CHF 14'100"],
          ["4.110 à 4.150 Primes et intérêts d'épargne", "Forfaits ci-dessus", "CHF 3'700 couple, CHF 1'800 autres (CHF 5'500 et 2'700 sans 2e pilier ni 3a), + CHF 700 par enfant"],
          ["4.380 Frais de garde", "max. CHF 12'000", "max. CHF 25'800"],
          ["4.410 Partis politiques", "max. CHF 5'000", "max. CHF 10'600"],
          ["4.420 Formation", "max. CHF 12'000", "max. CHF 13'000"],
          ["6.110 Enfant", "CHF 8'600, dégressive", "CHF 6'800, plus CHF 263 de réduction d'impôt par enfant"],
          ["Couple marié", "Splitting intégral", "Déduction de CHF 2'800 et barème pour couples"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, chapitre XI ; communiqué du DFF sur l'adaptation des déductions IFD à partir de 2027 (montants 2025 valables jusqu'en 2026).",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour l'assurance-maladie dans le canton de Fribourg ?",
        a: "Un forfait de CHF 4'810 par adulte, CHF 4'210 par jeune adulte de 18 à 25 ans en formation et CHF 1'140 par enfant, quel que soit le montant des primes payées. Les réductions de primes reçues sont déduites du forfait.",
      },
      {
        q: "Quel est le montant de la déduction pour enfant dans le canton de Fribourg en 2026 ?",
        a: "CHF 8'600 par enfant (CHF 9'600 dès le troisième), réduite de CHF 100 par tranche de CHF 1'000 de revenu net au-delà de CHF 62'700 pour le premier enfant, sans descendre sous CHF 7'100. À l'impôt fédéral, CHF 6'800 par enfant.",
      },
      {
        q: "Les frais de crèche sont-ils déductibles dans le canton de Fribourg ?",
        a: "Oui, jusqu'à CHF 12'000 par enfant de moins de 14 ans (CHF 25'800 à l'impôt fédéral), sur justificatifs, si les deux parents travaillent ou sont en formation, ou si le parent seul travaille.",
      },
      {
        q: "À partir de quand les frais médicaux sont-ils déductibles ?",
        a: "Pour la part qui dépasse 5 % du revenu net. Avec un revenu net de CHF 60'000, seuls les frais non remboursés au-delà de CHF 3'000 sont déductibles.",
      },
    ],
  },
  en: {
    title: "Deductions in FriTax: insurance premiums, childcare, medical costs, donations and social deductions",
    navTitle: "Deductions",
    metaTitle: "FriTax 2026: every Fribourg deduction (codes 4.110 to 7.110)",
    metaDescription:
      "Deductions on the 2026 Fribourg return in FriTax: health insurance flat rate (4.110), pillar 3b (4.120), childcare up to CHF 12,000 (4.380), training (4.420), maintenance paid, medical costs above 5% (5.110), donations, child deduction (6.110) and differences with federal tax.",
    keywords: [
      "fritax deductions",
      "fribourg tax deductions 2026",
      "health insurance deduction fribourg",
      "childcare deduction fribourg",
      "child deduction fribourg",
      "medical costs deduction fribourg",
    ],
    summary: [
      "**Health and accident insurance (4.110)**: a **flat rate** is granted automatically, CHF 4,810 per adult, CHF 4,210 per young adult in education and CHF 1,140 per child, less any premium reductions received.",
      "**Childcare (4.380)**: up to **CHF 12,000** per child under 14, if both parents (or the single parent) work or are in education.",
      "**Medical costs (5.110)**: the share above **5% of net income**; **donations (5.120)**: from CHF 100, up to 20% of net income.",
      "**Child deduction (6.110)**: **CHF 8,600** (CHF 9,600 from the third child), reduced by CHF 100 per CHF 1,000 of net income above CHF 62,700, minimum CHF 7,100.",
    ],
    blocks: [
      { type: "h2", id: "primes", text: "Insurance premiums and savings interest (codes 4.110 to 4.150)" },
      {
        type: "table",
        head: ["Code", "Deduction", "2026 amount"],
        rows: [
          ["4.110", "Health and accident insurance (flat rate)", "CHF 4,810 per adult (CHF 9,620 for a couple), CHF 4,210 per young adult aged 18 to 25 in education, CHF 1,140 per child"],
          ["4.120", "Other premiums: life, pure risk, daily allowance, life annuity insurance (pillar 3b)", "max. CHF 1,500 couple, CHF 750 other taxpayers"],
          ["4.130", "Pillar 3a", "CHF 7,258 or 20% of income, max. CHF 36,288 (see [Pension savings](/guide/fritax/prevoyance))"],
          ["4.140", "Pension fund buy-ins", "Amount paid, with certificate"],
          ["4.150", "Interest on savings", "max. CHF 300 couple, CHF 150 other taxpayers"],
        ],
        caption: "Source: Feuille cantonale Fribourg, Federal Tax Administration, February 2026 (art. 34 LICD and the health insurance premium deduction ordinance); « Instructions générales 2025 », SCC Fribourg.",
      },
      {
        type: "p",
        text: "The health insurance flat rate does **not depend on the premiums you actually paid**: FriTax works it out from your household, based on each person's age on 31 December. If you receive a **premium reduction** from the ECAS (cantonal social insurance office), only the difference between the flat rate and the subsidy is deductible; if you do not know the subsidy amount, the SCC takes it into account itself. For **code 4.120**, fill in section **A « Assurances »**: without it, no deduction. These deductions cannot be offset against each other.",
      },
      {
        type: "screenshot",
        file: "09-primes-assurance.webp",
        alt: "Insurance premiums in FriTax: health insurance flat rate calculated from the household, pillar 3b and savings interest",
        caption: "Page 3: other income and assets (3.410 to 3.570), then every deduction from 4.110 to 7.110; the health insurance flat rate (4.110) is calculated automatically (FriTax 2025)",
      },

      { type: "h2", id: "autres-deductions", text: "Other income deductions (codes 4.330 to 4.420)" },
      {
        type: "table",
        head: ["Code", "Deduction", "2026 limit"],
        rows: [
          ["4.330, 4.335", "Annuities and permanent charges, right of residence", "Amount paid; income portion for life annuities"],
          ["4.340", "Maintenance paid to a divorced or separated spouse, and for minor children", "Proven amount; not for an adult child"],
          ["4.350", "AHV/IV/EO/ALV contributions of people without gainful activity", "Amount paid"],
          ["4.370", "Disability costs, including care home stays", "Actual costs you bear, or a flat CHF 2,500, 5,000 or 7,500 depending on the helplessness allowance"],
          ["4.380", "Childcare by third parties", "max. CHF 12,000 per child under 14"],
          ["4.410", "Membership fees and donations to political parties", "max. CHF 5,000"],
          ["4.420", "Training and further education for work purposes", "max. CHF 12,000"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, codes 4.330 to 4.420; Feuille cantonale Fribourg, Federal Tax Administration, February 2026.",
      },
      {
        type: "list",
        items: [
          "**Childcare**: for each child **under 14** (up to and including the month they turn 14), with proof, if both spouses work, or if the single parent living with the child works. Education or a disability pension counts as work. Food and clothing are not childcare costs.",
          "**Maintenance paid**: fill in section « **D, Pension alimentaire** », separating the spouse's share from the children's. Contributions for a minor child are deductible if the receiving parent has parental authority.",
          "**Training**: a link with your current job is no longer required, but initial training (first upper-secondary qualification) and hobbies are not deductible. Only amounts you paid yourself count.",
          "**Disability**: deaf people and dialysis patients are entitled to a flat CHF 2,500, with a medical certificate.",
        ],
      },

      { type: "h2", id: "frais-medicaux", text: "Medical costs and donations (codes 5.110 and 5.120)" },
      {
        type: "p",
        text: "Unreimbursed **medical, pharmaceutical and dental costs** paid in 2026 for you and your dependants are deductible for the share above **5% of net income** (code 4.910). Fill in section **B « Frais médicaux »** (medical costs): attach a detailed list with invoices and insurance statements, or use the SCC's listing form, which means you need not attach receipts (the SCC may ask for them later). Cures and diets only count if prescribed by a doctor; a vital special diet (coeliac disease, for example) gives a flat CHF 2,500, except for diabetes.",
      },
      {
        type: "p",
        text: "**Donations** to public-benefit organisations based in Switzerland, and to the Confederation, cantons and municipalities, are deductible from **CHF 100** a year up to **20% of net income**. Fill in section **C « Versements bénévoles »** (donations), with a list and receipts or the SCC's listing form. The SCC publishes a list of tax-exempt Fribourg organisations. The **payment date** counts for the deduction.",
      },
      {
        type: "screenshot",
        file: "09-frais-medicaux-dons.webp",
        alt: "FriTax sections B medical costs and C donations, with the 5% threshold and 20% limit calculated",
        caption: "Sections B and C on page 4: FriTax subtracts 5% of net income from medical costs and caps donations at 20% (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "09-frais-de-garde.webp",
        alt: "FriTax child sheet, Childcare tab: date, name and address of the carer, amount, benefits received and the other parent's share",
        caption: "Childcare costs are entered in each child's sheet, « Frais de garde » tab: FriTax subtracts benefits received and the other parent's share (FriTax 2025)",
      },

      { type: "h2", id: "deductions-sociales", text: "Social deductions (codes 6.110 to 7.110)" },
      {
        type: "table",
        head: ["Code", "Deduction", "2026 amount"],
        rows: [
          ["6.110", "Per minor child or child in education", "CHF 8,600 (CHF 9,600 from the 3rd child), reduced with net income, minimum CHF 7,100 (CHF 8,100 from the 3rd)"],
          ["6.120", "Other dependant unable to support themselves", "CHF 5,000"],
          ["6.130", "Taxpayer in education or apprenticeship, up to age 25", "CHF 3,600, in their own return"],
          ["6.140", "Working wheelchair user without AHV/disability pension; full orphan", "CHF 2,500; CHF 8,600 (tapering)"],
          ["6.145", "Flat-rate allowances received for home care of a relative", "Amount received, cantonal tax only"],
          ["7.110", "Taxpayer on a low income", "From CHF 4,100 to CHF 11,100 depending on the situation, tapering"],
        ],
        caption: "Source: Feuille cantonale Fribourg, Federal Tax Administration, February 2026 (art. 36 LICD); « Instructions générales 2025 », SCC Fribourg.",
      },
      {
        type: "p",
        text: "The **child deduction** is reduced by **CHF 100 per CHF 1,000** of net income above a threshold of **CHF 62,700** for the first child, raised by CHF 10,100 for each additional child. Example: with one child and CHF 70,000 net income, the deduction is CHF 7,800; with two children the threshold rises to CHF 72,800 and the deduction stays at CHF 17,200. FriTax applies this scale automatically.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Low-income deduction",
        text: "Fribourg grants an extra deduction for low incomes: for example **CHF 4,100** for a single person with no dependants and income up to CHF 20,300, and **CHF 9,100** for a single AHV/disability pensioner up to CHF 24,300, then reduced per CHF 1,000. FriTax works it out itself.",
      },

      { type: "h2", id: "ifd", text: "What changes for direct federal tax" },
      {
        type: "p",
        text: "There is no separate return for direct federal tax (IFD): the SCC applies the differences itself. To get an idea of your federal tax:",
      },
      {
        type: "table",
        head: ["Code", "Cantonal tax 2026", "Direct federal tax 2026"],
        rows: [
          ["2.110 Commuting", "max. CHF 12,000", "max. CHF 3,300"],
          ["2.510 Both spouses working", "CHF 500", "50% of the lower income, min. CHF 8,600, max. CHF 14,100"],
          ["4.110 to 4.150 Premiums and savings interest", "Flat rates above", "CHF 3,700 couple, CHF 1,800 others (CHF 5,500 and 2,700 without 2nd pillar or 3a), + CHF 700 per child"],
          ["4.380 Childcare", "max. CHF 12,000", "max. CHF 25,800"],
          ["4.410 Political parties", "max. CHF 5,000", "max. CHF 10,600"],
          ["4.420 Training", "max. CHF 12,000", "max. CHF 13,000"],
          ["6.110 Child", "CHF 8,600, tapering", "CHF 6,800, plus a CHF 263 tax reduction per child"],
          ["Married couple", "Full splitting", "CHF 2,800 deduction and married scale"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, chapter XI; Federal Department of Finance release on adjusting federal deductions from 2027 (2025 amounts valid until 2026).",
      },
    ],
    faq: [
      {
        q: "How much can I deduct for health insurance in Fribourg?",
        a: "A flat CHF 4,810 per adult, CHF 4,210 per young adult aged 18 to 25 in education and CHF 1,140 per child, regardless of the premiums actually paid. Premium reductions received are subtracted from the flat rate.",
      },
      {
        q: "How much is the child deduction in Fribourg in 2026?",
        a: "CHF 8,600 per child (CHF 9,600 from the third), reduced by CHF 100 per CHF 1,000 of net income above CHF 62,700 for the first child, but not below CHF 7,100. For federal tax, CHF 6,800 per child.",
      },
      {
        q: "Are nursery costs deductible in Fribourg?",
        a: "Yes, up to CHF 12,000 per child under 14 (CHF 25,800 for federal tax), with receipts, if both parents work or are in education, or if the single parent works.",
      },
      {
        q: "When do medical costs become deductible?",
        a: "For the share above 5% of net income. With net income of CHF 60,000, only unreimbursed costs above CHF 3,000 are deductible.",
      },
    ],
  },
};
