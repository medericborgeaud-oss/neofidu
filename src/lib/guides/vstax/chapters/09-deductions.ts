import type { GuideChapter } from "../../types";

export const deductions: GuideChapter = {
  slug: "deductions",
  readTime: 8,
  fr: {
    title: "Déductions dans VSTax : primes d'assurance, frais médicaux, dons, formation et double revenu",
    navTitle: "Déductions",
    metaTitle: "VSTax 2026 : primes d'assurance, frais médicaux, dons et autres déductions",
    metaDescription:
      "Primes d'assurance-maladie et intérêts d'épargne (code 2560, CHF 7'600 couple), frais médicaux au-delà de 2 % (2565), dons (2570), formation (2581, CHF 12'550), déduction de CHF 7'000 pour couples à deux revenus et nouvelles déductions 2026 en Valais.",
    keywords: [
      "déductions impôt valais 2026",
      "primes assurance maladie déduction valais",
      "frais médicaux déduction valais 2 %",
      "dons déduction valais",
      "frais de formation déduction valais",
      "double revenu déduction valais 7000",
    ],
    summary: [
      "**Primes d'assurance-maladie, accidents et vie**, plus les intérêts d'épargne : code **2560**, plafond 2026 de **CHF 7'600** pour un couple et **CHF 3'800** pour une personne seule, plus CHF 1'130 par enfant.",
      "**Frais médicaux** : la part qui dépasse **2 % du revenu net** (code 2565, 5 % à l'impôt fédéral). **Dons** : jusqu'à 20 % du revenu net (code 2570).",
      "**Formation continue** : jusqu'à **CHF 12'550** par contribuable (code 2581). **Couple à deux revenus** : jusqu'à **CHF 7'000** sur le revenu le plus bas (code 2520).",
      "Ces déductions se remplissent dans le formulaire « **Autres déductions** » ; VSTax reporte les totaux en page 3 et calcule l'impôt fédéral à part.",
    ],
    blocks: [
      { type: "h2", id: "vue-ensemble", text: "Vue d'ensemble des déductions 2026" },
      {
        type: "table",
        head: ["Déduction", "Code", "Impôt cantonal 2026", "Impôt fédéral direct 2026"],
        rows: [
          ["Primes d'assurance et intérêts d'épargne, couple", "2560", "CHF 7'600", "CHF 3'700 (CHF 5'550 sans 2e ni 3e pilier)"],
          ["Primes d'assurance et intérêts d'épargne, personne seule", "2560", "CHF 3'800", "CHF 1'800 (CHF 2'700 sans 2e ni 3e pilier)"],
          ["Supplément par enfant ou personne nécessiteuse", "2560", "CHF 1'130", "CHF 700"],
          ["Frais de maladie et accident", "2565 a", "part dépassant 2 % du revenu net", "part dépassant 5 % du revenu net"],
          ["Frais liés à un handicap", "2565 b", "frais effectifs ou forfait", "frais effectifs ou forfait"],
          ["Dons à des institutions d'utilité publique", "2570 a", "max. 20 % du revenu net", "max. 20 %, dès CHF 100"],
          ["Cotisations à un parti politique", "2570 b", "max. CHF 20'930", "plafond fédéral distinct"],
          ["Formation et perfectionnement professionnels", "2581", "max. CHF 12'550 par contribuable", "plafond fédéral distinct"],
          ["Couple à deux revenus", "2520", "max. CHF 7'000 sur le revenu le plus bas", "50 % du revenu le plus bas, min. CHF 8'600, max. CHF 14'100"],
          ["Aidant bénévole d'une personne âgée ou handicapée", "2515", "CHF 6'030", "pas de déduction"],
        ],
        caption: "Sources : « Adaptation des déductions forfaitaires pour l'imposition 2026 » et Guide de la déclaration d'impôts 2025, SCC Valais ; circulaire 2-215-D-2025 de l'Administration fédérale des contributions (IFD 2026).",
      },
      {
        type: "screenshot",
        file: "09-page3-deductions.webp",
        alt: "Page 3 de la déclaration VSTax, section 5 : déductions personnelles de l'impôt cantonal et communal, codes 2510 à 2610",
        caption: "La section 5 en page 3 : enfants, garde, primes (2560), frais de maladie, dons, formation, jusqu'au revenu net imposable (2600) (VSTax 2025)",
      },

      { type: "h2", id: "assurances", text: "Primes d'assurance et intérêts d'épargne (code 2560)" },
      { type: "path", items: ["Formulaires", "Autres déductions", "Primes d'assurances et intérêts de capitaux d'épargne"] },
      {
        type: "p",
        text: "Le formulaire additionne les **primes d'assurance-vie et de rentes**, les **intérêts des comptes d'épargne** (repris de l'état des titres, code A) et les **primes d'assurance-maladie et accidents payées en 2026**, y compris l'assurance d'indemnités journalières maladie. Il retranche les **subsides** reçus pour les primes, puis applique le plafond. Avec des primes de base pour une famille, le plafond est presque toujours atteint : il suffit de saisir les montants et de joindre les décomptes annuels de la caisse.",
      },
      {
        type: "screenshot",
        file: "09-autres-deductions.webp",
        alt: "Formulaire Autres déductions de VSTax : primes d'assurance-maladie, subsides, frais médicaux et dons",
        caption: "Le formulaire « Autres déductions » regroupe primes, frais médicaux, handicap et dons (VSTax 2025, données fictives)",
      },
      {
        type: "callout",
        tone: "info",
        title: "Plafond relevé en 2026",
        text: "Selon la modification de la loi fiscale entrée en vigueur au 1er janvier 2026, le plafond passe de CHF 7'240 à **CHF 7'600** pour un couple marié et de CHF 3'620 à **CHF 3'800** pour les autres contribuables. Le supplément par enfant reste à CHF 1'130.",
      },

      { type: "h2", id: "maladie", text: "Frais de maladie et frais liés à un handicap (code 2565)" },
      {
        type: "p",
        text: "Saisissez les **franchises, quotes-parts et factures non remboursées** de 2026 (médecin, dentiste, lunettes, hôpital), avec la date, l'émetteur et le montant net, et joignez le décompte annuel de la caisse-maladie. Seule la part qui dépasse **2 % du revenu net** (avant déductions sociales) est déductible à l'impôt cantonal ; VSTax fait le calcul. Les médicaments ne sont admis que sur **ordonnance** d'un médecin ou d'un naturopathe agréé : les tickets de pharmacie sans ordonnance sont refusés.",
      },
      {
        type: "list",
        items: [
          "**Résident d'un home** : forfait de CHF 40 par jour sans justificatif, au maximum CHF 14'600 par an.",
          "**Régime alimentaire prescrit par un médecin** (diabète, maladie cœliaque, par exemple) : forfait de **CHF 1'500** par personne, réintroduit en 2025.",
          "**Handicap** (code 2565 b) : frais effectifs entièrement déductibles, ou forfait de CHF 2'500, 5'000 ou 7'500 selon le degré de l'allocation pour impotent, et CHF 2'500 en cas de mucoviscidose, d'insuffisance rénale ou de surdité.",
        ],
      },

      { type: "h2", id: "dons", text: "Dons et partis politiques (code 2570)" },
      {
        type: "p",
        text: "Les dons en espèces ou en valeurs à des institutions suisses exonérées pour but d'utilité publique (et à la Confédération, aux cantons et aux communes) se déduisent jusqu'à **20 % du revenu net**. Indiquez la date, le bénéficiaire et le montant, et joignez les quittances ou une liste signée. Les cotisations et dons à un **parti politique** inscrit au registre, représenté dans un parlement cantonal ou ayant obtenu au moins 3 % des voix se déduisent à part, jusqu'à **CHF 20'930** en 2026.",
      },

      { type: "h2", id: "formation", text: "Formation et perfectionnement (code 2581)" },
      {
        type: "p",
        text: "Les frais de formation et de perfectionnement **à des fins professionnelles**, reconversion comprise, se déduisent jusqu'à **CHF 12'550** par contribuable : écolage, taxes, livres, matériel informatique, déplacements, repas et logement liés au cours. Il faut posséder un diplôme du degré secondaire II (CFC, maturité, ECG) ou avoir plus de 20 ans et ne pas se former pour un premier diplôme de ce niveau. Dans un couple, chaque conjoint a droit à son propre plafond.",
      },

      { type: "h2", id: "couple", text: "Couples à deux revenus et pensions alimentaires" },
      {
        type: "p",
        text: "Lorsque les deux époux travaillent, VSTax déduit jusqu'à **CHF 7'000** (CHF 6'290 en 2025) du **revenu du travail le plus bas** (code 2520). La même déduction vaut pour le conjoint qui seconde l'autre de façon importante dans son entreprise. À l'impôt fédéral direct, la déduction équivaut à 50 % du revenu le plus bas, au minimum CHF 8'600 et au maximum CHF 14'100.",
      },
      {
        type: "p",
        text: "Les **pensions alimentaires versées** sous forme de rente à l'ex-conjoint et pour les enfants mineurs se déduisent sous le **code 2531**, avec le nom et la date de naissance du bénéficiaire. La pension versée à un enfant majeur n'est pas déductible.",
      },

      { type: "h2", id: "nouveau-2026", text: "Nouvelles déductions 2026 et cas particuliers" },
      {
        type: "list",
        items: [
          "**Retraités qui continuent de travailler** : CHF 7'000 du revenu net pour les personnes ayant atteint l'âge de référence AVS qui gardent une activité lucrative, au plus le revenu net de cette activité. Pour un couple ou des concubins qui travaillent tous les deux, CHF 7'000 au total.",
          "**Rentiers AVS vivant seuls** avec une fortune imposable inférieure à CHF 100'000 : déduction de CHF 3'000 (revenu imposable jusqu'à CHF 30'000), CHF 2'000 (jusqu'à CHF 40'000) ou CHF 1'000 (jusqu'à CHF 50'000).",
          "**Rentiers en EMS** : le revenu imposable cantonal est fixé à zéro lorsque le revenu disponible après frais de pension ne dépasse pas CHF 5'490 et qu'il n'y a pas de fortune imposable.",
          "**Cotisations AVS non déduites** ailleurs (personne sans activité lucrative, par exemple) : code 2000, « Autres déductions ».",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Les deux nouvelles déductions pour retraités",
        text: "Elles s'appliquent dès la période fiscale 2026 et ne figuraient pas dans VSTax 2025. Vérifiez dans VSTax 2026 la ligne prévue et, en cas de doute, signalez votre situation dans les « Observations particulières » de la page 1.",
      },

      { type: "h2", id: "ifd", text: "Le formulaire « Impôt fédéral direct »" },
      {
        type: "p",
        text: "La page 3 de la déclaration calcule l'impôt cantonal. Pour l'impôt fédéral direct, VSTax reprend le revenu net (code 2400) dans le formulaire « **Impôt fédéral direct** » et applique les règles fédérales : différence sur les frais de déplacement (code 2711), frais médicaux au-delà de 5 % (2720), déduction pour enfant de CHF 6'800 (2750), déduction pour couple marié de CHF 2'800 (2751), frais de garde jusqu'à CHF 25'800 (2752), primes d'assurance (2780). Vous n'avez en principe rien à y saisir ; le SCC communique le détail lors de la taxation.",
      },
      {
        type: "screenshot",
        file: "09-ifd.webp",
        alt: "Formulaire Impôt fédéral direct de VSTax : revenu net 2400 et déductions fédérales, codes 2710 à 2810",
        caption: "La feuille IFD : VSTax ajoute la limite des frais de déplacement (2711) et applique les plafonds fédéraux (VSTax 2025)",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour l'assurance-maladie en Valais en 2026 ?",
        a: "Les primes d'assurance-maladie, accidents et vie et les intérêts d'épargne sont déductibles ensemble jusqu'à CHF 7'600 pour un couple marié et CHF 3'800 pour une personne seule, plus CHF 1'130 par enfant, après déduction des subsides.",
      },
      {
        q: "À partir de quel montant les frais médicaux sont-ils déductibles en Valais ?",
        a: "À l'impôt cantonal, la part des frais non remboursés qui dépasse 2 % du revenu net. À l'impôt fédéral direct, la part qui dépasse 5 %. Les médicaments doivent être prescrits par un médecin.",
      },
      {
        q: "Quelle est la déduction pour couple à deux revenus en Valais ?",
        a: "Jusqu'à CHF 7'000 en 2026 (CHF 6'290 en 2025) sur le revenu du travail le plus bas. À l'impôt fédéral, 50 % du revenu le plus bas, entre CHF 8'600 et CHF 14'100.",
      },
      {
        q: "Les cotisations syndicales sont-elles déductibles en Valais ?",
        a: "Non. Le guide du SCC précise que les cotisations à des syndicats et associations professionnelles ne sont pas des frais d'acquisition du revenu et ne sont pas déductibles.",
      },
    ],
  },
  en: {
    title: "Deductions in VSTax: insurance premiums, medical costs, donations, training and two-income couples",
    navTitle: "Deductions",
    metaTitle: "VSTax 2026: insurance premiums, medical costs, donations and other deductions",
    metaDescription:
      "Health insurance premiums and savings interest (code 2560, CHF 7,600 for couples), medical costs above 2% (2565), donations (2570), training (2581, CHF 12,550), the CHF 7,000 two-income deduction and new 2026 deductions in Valais.",
    keywords: [
      "valais tax deductions 2026",
      "health insurance deduction valais",
      "medical expenses deduction valais",
      "donations deduction valais",
      "training costs deduction valais",
      "two income couple deduction valais",
    ],
    summary: [
      "**Health, accident and life insurance premiums**, plus savings interest: code **2560**, 2026 cap of **CHF 7,600** for a couple and **CHF 3,800** for a single person, plus CHF 1,130 per child.",
      "**Medical costs**: the part above **2% of net income** (code 2565, 5% for federal tax). **Donations**: up to 20% of net income (code 2570).",
      "**Professional training**: up to **CHF 12,550** per taxpayer (code 2581). **Two-income couple**: up to **CHF 7,000** off the lower income (code 2520).",
      "These deductions go in the « **Autres déductions** » (other deductions) form; VSTax carries the totals to page 3 and works out federal tax separately.",
    ],
    blocks: [
      { type: "h2", id: "vue-ensemble", text: "Overview of 2026 deductions" },
      {
        type: "table",
        head: ["Deduction", "Code", "Cantonal tax 2026", "Direct federal tax 2026"],
        rows: [
          ["Insurance premiums and savings interest, couple", "2560", "CHF 7,600", "CHF 3,700 (CHF 5,550 without 2nd or 3rd pillar)"],
          ["Insurance premiums and savings interest, single", "2560", "CHF 3,800", "CHF 1,800 (CHF 2,700 without 2nd or 3rd pillar)"],
          ["Extra per child or dependent person", "2560", "CHF 1,130", "CHF 700"],
          ["Illness and accident costs", "2565 a", "part above 2% of net income", "part above 5% of net income"],
          ["Disability-related costs", "2565 b", "actual costs or flat rate", "actual costs or flat rate"],
          ["Donations to public-benefit organisations", "2570 a", "max. 20% of net income", "max. 20%, from CHF 100"],
          ["Political party contributions", "2570 b", "max. CHF 20,930", "separate federal cap"],
          ["Professional training", "2581", "max. CHF 12,550 per taxpayer", "separate federal cap"],
          ["Two-income couple", "2520", "max. CHF 7,000 off the lower income", "50% of the lower income, min. CHF 8,600, max. CHF 14,100"],
          ["Volunteer carer of an elderly or disabled person", "2515", "CHF 6,030", "no deduction"],
        ],
        caption: "Sources: \"Adaptation des déductions forfaitaires pour l'imposition 2026\" and Guide de la déclaration d'impôts 2025, SCC Valais; Swiss Federal Tax Administration circular 2-215-D-2025 (federal tax 2026).",
      },
      {
        type: "screenshot",
        file: "09-page3-deductions.webp",
        alt: "Page 3 of the VSTax return, section 5: personal deductions for cantonal and municipal tax, codes 2510 to 2610",
        caption: "Section 5 on page 3: children, childcare, premiums (2560), medical costs, donations, training, down to taxable income (2600) (VSTax 2025)",
      },

      { type: "h2", id: "assurances", text: "Insurance premiums and savings interest (code 2560)" },
      { type: "path", items: ["Formulaires", "Autres déductions", "Primes d'assurances et intérêts de capitaux d'épargne"] },
      {
        type: "p",
        text: "The form adds up **life and annuity insurance premiums**, **interest on savings accounts** (taken from the securities list, code A) and **health and accident insurance premiums paid in 2026**, including sickness daily-allowance insurance. It subtracts any premium **subsidies** received, then applies the cap. With basic health premiums for a family, the cap is almost always reached: just enter the amounts and attach the insurer's annual statements.",
      },
      {
        type: "screenshot",
        file: "09-autres-deductions.webp",
        alt: "VSTax other deductions form: health insurance premiums, subsidies, medical costs and donations",
        caption: "The « Autres déductions » form groups premiums, medical costs, disability and donations (VSTax 2025, fictitious data)",
      },
      {
        type: "callout",
        tone: "info",
        title: "Cap raised in 2026",
        text: "Under the tax law amendment in force from 1 January 2026, the cap rises from CHF 7,240 to **CHF 7,600** for a married couple and from CHF 3,620 to **CHF 3,800** for other taxpayers. The extra per child stays at CHF 1,130.",
      },

      { type: "h2", id: "maladie", text: "Medical and disability costs (code 2565)" },
      {
        type: "p",
        text: "Enter the **deductibles, co-payments and unreimbursed bills** for 2026 (doctor, dentist, glasses, hospital), with the date, issuer and net amount, and attach the health insurer's annual statement. Only the part above **2% of net income** (before personal allowances) is deductible for cantonal tax; VSTax does the maths. Medicines are only accepted with a **prescription** from a doctor or an approved naturopath: pharmacy receipts without a prescription are refused.",
      },
      {
        type: "list",
        items: [
          "**Care home resident**: flat CHF 40 a day without receipts, up to CHF 14,600 a year.",
          "**Special diet prescribed by a doctor** (diabetes, coeliac disease, for example): flat **CHF 1,500** per person, reintroduced in 2025.",
          "**Disability** (code 2565 b): actual costs fully deductible, or a flat CHF 2,500, 5,000 or 7,500 depending on the helplessness allowance level, and CHF 2,500 for cystic fibrosis, kidney failure or deafness.",
        ],
      },

      { type: "h2", id: "dons", text: "Donations and political parties (code 2570)" },
      {
        type: "p",
        text: "Cash or asset donations to Swiss tax-exempt public-benefit organisations (and to the Confederation, cantons and municipalities) are deductible up to **20% of net income**. Give the date, recipient and amount, and attach receipts or a signed list. Contributions and donations to a **political party** that is registered, represented in a cantonal parliament or won at least 3% of the vote are deducted separately, up to **CHF 20,930** in 2026.",
      },

      { type: "h2", id: "formation", text: "Training and further education (code 2581)" },
      {
        type: "p",
        text: "Training and further education costs **for professional purposes**, including retraining, are deductible up to **CHF 12,550** per taxpayer: fees, books, IT equipment, travel, meals and accommodation linked to the course. You must hold an upper-secondary qualification (apprenticeship certificate, baccalaureate) or be over 20 and not studying for a first qualification at that level. In a couple, each spouse has their own cap.",
      },

      { type: "h2", id: "couple", text: "Two-income couples and maintenance payments" },
      {
        type: "p",
        text: "When both spouses work, VSTax deducts up to **CHF 7,000** (CHF 6,290 in 2025) from the **lower earned income** (code 2520). The same applies to a spouse who substantially helps in the other's business. For direct federal tax, the deduction is 50% of the lower income, at least CHF 8,600 and at most CHF 14,100.",
      },
      {
        type: "p",
        text: "**Maintenance paid** as regular payments to a former spouse and for minor children is deducted under **code 2531**, with the recipient's name and date of birth. Maintenance for an adult child is not deductible.",
      },

      { type: "h2", id: "nouveau-2026", text: "New 2026 deductions and special cases" },
      {
        type: "list",
        items: [
          "**Retirees who keep working**: CHF 7,000 off net income for people past the AHV reference age who still have earned income, capped at the net income from that work. For a couple or partners who both work, CHF 7,000 in total.",
          "**AHV pensioners living alone** with taxable wealth under CHF 100,000: deduction of CHF 3,000 (taxable income up to CHF 30,000), CHF 2,000 (up to CHF 40,000) or CHF 1,000 (up to CHF 50,000).",
          "**Care home residents**: cantonal taxable income is set to zero when income left after care home costs does not exceed CHF 5,490 and there is no taxable wealth.",
          "**AHV contributions not deducted** elsewhere (people without earned income, for example): code 2000, « Autres déductions ».",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "The two new deductions for retirees",
        text: "They apply from tax year 2026 and were not in VSTax 2025. Look for the dedicated line in VSTax 2026 and, if in doubt, explain your situation in the « Observations particulières » (remarks) on page 1.",
      },

      { type: "h2", id: "ifd", text: "The « Impôt fédéral direct » form" },
      {
        type: "p",
        text: "Page 3 of the return calculates cantonal tax. For direct federal tax, VSTax takes net income (code 2400) into the « **Impôt fédéral direct** » form and applies federal rules: commuting cap difference (code 2711), medical costs above 5% (2720), CHF 6,800 child deduction (2750), CHF 2,800 married couple deduction (2751), childcare up to CHF 25,800 (2752), insurance premiums (2780). You normally have nothing to enter there; the SCC sends the details with your assessment.",
      },
      {
        type: "screenshot",
        file: "09-ifd.webp",
        alt: "VSTax direct federal tax form: net income 2400 and federal deductions, codes 2710 to 2810",
        caption: "The federal sheet: VSTax adds back the commuting cap (2711) and applies federal caps (VSTax 2025)",
      },
    ],
    faq: [
      {
        q: "How much health insurance can I deduct in Valais in 2026?",
        a: "Health, accident and life insurance premiums and savings interest are deductible together up to CHF 7,600 for a married couple and CHF 3,800 for a single person, plus CHF 1,130 per child, after subtracting subsidies.",
      },
      {
        q: "From what amount are medical costs deductible in Valais?",
        a: "For cantonal tax, the part of unreimbursed costs above 2% of net income. For direct federal tax, the part above 5%. Medicines must be prescribed by a doctor.",
      },
      {
        q: "What is the two-income couple deduction in Valais?",
        a: "Up to CHF 7,000 in 2026 (CHF 6,290 in 2025) off the lower earned income. For federal tax, 50% of the lower income, between CHF 8,600 and CHF 14,100.",
      },
      {
        q: "Are trade union fees deductible in Valais?",
        a: "No. The SCC guide states that union and professional association fees are not costs of earning income and are not deductible.",
      },
    ],
  },
};
