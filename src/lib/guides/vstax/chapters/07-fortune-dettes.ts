import type { GuideChapter } from "../../types";

export const fortuneDettes: GuideChapter = {
  slug: "fortune-dettes",
  readTime: 6,
  fr: {
    title: "Fortune et dettes dans VSTax : véhicules, assurances-vie, état des dettes et déduction de CHF 90'000",
    navTitle: "Fortune et dettes",
    metaTitle: "VSTax : déclarer sa fortune, ses dettes et intérêts passifs (2026)",
    metaDescription:
      "Autre fortune (code 3300), valeur de rachat des assurances-vie (3400), état des dettes et intérêts passifs (annexe 4), déduction de CHF 45'000 ou 90'000 sur la fortune et héritages dans VSTax.",
    keywords: [
      "fortune déclaration impôt valais",
      "état des dettes vstax",
      "intérêts passifs déduction valais",
      "déduction fortune valais 90000",
      "valeur de rachat assurance vie valais",
      "héritage déclaration impôt valais",
    ],
    summary: [
      "Véhicules privés, or, collections et œuvres d'art vont sous le **code 3300** ; véhicules et objets de valeur sont estimés à **80 % de leur valeur d'assurance**. Le mobilier de ménage n'est pas imposable.",
      "La **valeur de rachat** des assurances-vie au 31 décembre se déclare sous le **code 3400**.",
      "Les dettes et leurs intérêts se détaillent dans l'**état des dettes** (annexe 4) : dettes privées sous le **code 3800**, intérêts sous le **code 1720**, déductibles jusqu'au rendement de la fortune plus CHF 50'000.",
      "Sur la fortune nette, VSTax déduit **CHF 90'000** pour un couple ou une famille et **CHF 45'000** pour les autres personnes (code 3900).",
    ],
    blocks: [
      { type: "h2", id: "autre-fortune", text: "Autre fortune (code 3300)" },
      { type: "path", items: ["Formulaires", "Déclaration d'impôts", "Page 4", "Autre fortune, participation à des hoiries"] },
      {
        type: "screenshot",
        file: "07-page4-actifs.webp",
        alt: "Page 4 de la déclaration VSTax : actifs au 31 décembre, immeubles (codes 2910 à 2923), titres (3200), autre fortune (3300), assurances-vie (3400)",
        caption: "Les actifs en page 4 : valeur fiscale de l'an dernier à gauche, de l'année à droite ; le code 3200 vient de l'état des titres (VSTax 2025)",
      },
      {
        type: "table",
        head: ["Élément", "Valeur à déclarer au 31.12.2026"],
        rows: [
          ["Véhicules privés, caravanes, camping-cars, bateaux", "80 % de la valeur d'assurance"],
          ["Œuvres d'art, collections, bijoux", "80 % de la valeur d'assurance"],
          ["Billets de banque, or et métaux précieux", "Valeur vénale selon la liste officielle des cours"],
          ["Part à une succession non partagée", "Selon la répartition de l'administrateur de l'hoirie"],
          ["Mobilier de ménage, objets personnels courants", "Non imposables, à ne pas déclarer"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, codes 3300 et 3400.",
      },
      {
        type: "p",
        text: "Comptes, titres et crypto ne vont pas ici mais dans l'[état des titres](/guide/vstax/comptes-titres) (code 3200). Les immeubles ont leur propre annexe (voir [Immeubles](/guide/vstax/immeubles)).",
      },

      { type: "h2", id: "assurances-vie", text: "Assurances-vie et de rentes (code 3400)" },
      {
        type: "p",
        text: "Les polices qui ont une **valeur de rachat** (assurance mixte, assurance-vie entière, 3e pilier B) se déclarent à cette valeur au 31 décembre, bonus et excédents compris, telle qu'elle figure sur l'attestation fiscale de l'assureur. Le tableau demande la société, l'année de conclusion, l'année d'échéance, la somme assurée, la valeur de rachat et la prime annuelle. La valeur de rachat d'une assurance de rentes reste imposable après le début du versement de la rente. Une assurance risque pur (décès seul) n'a pas de valeur de rachat. Les primes, elles, se déduisent sous le code 2560 (voir [Déductions](/guide/vstax/deductions)).",
      },

      { type: "h2", id: "dettes", text: "L'état des dettes (annexe 4)" },
      { type: "path", items: ["Formulaires", "Etat des dettes"] },
      {
        type: "p",
        text: "Pour chaque dette : **créancier, numéro de compte, type de dette** (compte privé, hypothèque, prêt entre tiers, prêt de sa propre société, crédit à la construction, crédit à la consommation), **montant au 31 décembre** et **intérêts payés en 2026**. Le formulaire distingue les dettes privées (codes 3800 et 1720), agricoles (3700 et 1710) et commerciales (3600).",
      },
      {
        type: "screenshot",
        file: "07-etat-des-dettes.webp",
        alt: "État des dettes dans VSTax : hypothèque avec créancier, numéro de compte, montant au 31.12 et intérêts",
        caption: "Chaque dette avec son montant au 31 décembre et ses intérêts de l'année (VSTax 2025, données fictives)",
      },
      {
        type: "table",
        head: ["Intérêt", "Impôt cantonal", "Impôt fédéral direct"],
        rows: [
          ["Intérêts hypothécaires et intérêts de dettes privées", "Déductibles jusqu'au rendement brut de la fortune + CHF 50'000", "Même plafond"],
          ["Intérêts d'un crédit de construction", "Déductibles", "Non déductibles"],
          ["Part d'intérêts d'un leasing (voiture, par exemple)", "Non déductible", "Non déductible"],
          ["Frais d'acte d'emprunt, cédule hypothécaire", "Non déductibles", "Non déductibles"],
          ["Pénalité de résiliation d'hypothèque, nouveau prêt chez le même prêteur", "Déductible comme intérêt", "Déductible comme intérêt"],
          ["Pénalité de résiliation d'hypothèque en cas de vente", "Non déductible du revenu (gain immobilier)", "Non déductible"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, codes 1710 et 1720, et directive 7.11 du SCC.",
      },

      { type: "h2", id: "deduction-fortune", text: "La déduction sur la fortune (code 3900)" },
      {
        type: "table",
        head: ["Situation au 31 décembre 2026", "Déduction"],
        rows: [
          ["Couple marié", "CHF 90'000"],
          ["Personne seule avec enfant à charge (veuve, divorcée, célibataire)", "CHF 90'000"],
          ["Concubins avec enfant", "CHF 90'000 partagés par moitié"],
          ["Autres personnes", "CHF 45'000"],
        ],
        caption: "Source : « Adaptation des déductions forfaitaires pour l'imposition 2026 », SCC Valais (art. 59 LF, montants relevés de 50 % en 2025).",
      },
      {
        type: "p",
        text: "VSTax l'applique automatiquement d'après votre état civil et vos enfants. En cas d'assujettissement sur une partie de l'année, elle est réduite en proportion. La **fortune dans un autre canton** (code 4200) et **à l'étranger** (code 4300) n'est pas imposée en Valais mais sert à fixer le taux. Lorsque les impôts sur la fortune et sur son rendement dépassent 20 % du revenu imposable, une réduction est calculée d'office.",
      },

      { type: "h2", id: "informations", text: "Héritage, donation et déclaration spontanée (chiffre 10)" },
      {
        type: "screenshot",
        file: "07-page4-passifs.webp",
        alt: "Page 4 de la déclaration VSTax : passifs (codes 3600 à 4400), déduction forfaitaire 3900 et chiffre 10, informations sur l'évolution de fortune",
        caption: "Passifs, déduction forfaitaire (3900) et chiffre 10 : héritage, donation, gains de jeux et déclaration spontanée (VSTax 2025)",
      },
      {
        type: "p",
        text: "En bas de la page 4, le chiffre **10. Informations complémentaires concernant l'évolution de fortune** demande si vous avez reçu ou fait une **donation**, reçu un **héritage** ou un **avancement d'hoirie**, ou réalisé des **gains de jeux** en 2026. Indiquez le montant, le lien de parenté, la date et joignez les actes (pacte successoral, convention de partage, acte de donation). Ces montants ne sont pas un revenu imposable, mais ils expliquent la hausse de votre fortune. La même rubrique permet une **déclaration spontanée** de revenus ou de fortune oubliés les années précédentes : sans amende si l'autorité n'en avait pas connaissance.",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer sa voiture dans la déclaration valaisanne ?",
        a: "Oui, sous le code 3300 « Autre fortune », à 80 % de sa valeur d'assurance au 31 décembre. Une voiture en leasing ne vous appartient pas et ne se déclare pas.",
      },
      {
        q: "Quel est le montant de la déduction sur la fortune en Valais ?",
        a: "CHF 90'000 pour un couple marié ou une personne seule avec enfant à charge, CHF 45'000 pour les autres personnes. Les concubins avec enfant se partagent CHF 90'000.",
      },
      {
        q: "Les intérêts hypothécaires sont-ils déductibles en Valais ?",
        a: "Oui, avec les autres intérêts de dettes privées, jusqu'au rendement brut de votre fortune augmenté de CHF 50'000. Ils se saisissent dans l'état des dettes et partent sous le code 1720.",
      },
      {
        q: "Un héritage est-il imposable comme revenu ?",
        a: "Non. Il se signale au chiffre 10 de la déclaration, avec les actes, et augmente votre fortune au 31 décembre. Un éventuel impôt sur les successions fait l'objet d'une procédure distincte de la déclaration d'impôt.",
      },
    ],
  },
  en: {
    title: "Wealth and debts in VSTax: vehicles, life insurance, debts list and the CHF 90,000 allowance",
    navTitle: "Wealth and debts",
    metaTitle: "VSTax: declaring wealth, debts and interest (2026)",
    metaDescription:
      "Other assets (code 3300), life insurance surrender values (3400), debts and interest (schedule 4), the CHF 45,000 or 90,000 wealth allowance and inheritances in VSTax.",
    keywords: [
      "valais wealth tax return",
      "vstax debts",
      "mortgage interest deduction valais",
      "valais wealth allowance",
      "life insurance surrender value valais",
      "inheritance valais tax return",
    ],
    summary: [
      "Private vehicles, gold, collections and works of art go under **code 3300**; vehicles and valuables are valued at **80% of their insured value**. Household furniture is not taxable.",
      "The **surrender value** of life insurance policies on 31 December goes under **code 3400**.",
      "Debts and interest are listed in the **debts list** (« Etat des dettes », schedule 4): private debts under **code 3800**, interest under **code 1720**, deductible up to your investment income plus CHF 50,000.",
      "From net wealth, VSTax deducts **CHF 90,000** for a couple or family and **CHF 45,000** for others (code 3900).",
    ],
    blocks: [
      { type: "h2", id: "autre-fortune", text: "Other assets (code 3300)" },
      { type: "path", items: ["Formulaires", "Déclaration d'impôts", "Page 4", "Autre fortune, participation à des hoiries"] },
      {
        type: "screenshot",
        file: "07-page4-actifs.webp",
        alt: "Page 4 of the VSTax return: assets on 31 December, property (codes 2910 to 2923), securities (3200), other assets (3300), life insurance (3400)",
        caption: "Assets on page 4: last year's tax value on the left, this year's on the right; code 3200 comes from the securities list (VSTax 2025)",
      },
      {
        type: "table",
        head: ["Item", "Value to declare on 31.12.2026"],
        rows: [
          ["Private vehicles, caravans, motorhomes, boats", "80% of insured value"],
          ["Works of art, collections, jewellery", "80% of insured value"],
          ["Bank notes, gold and precious metals", "Market value from the official price list"],
          ["Share in an undivided estate", "Based on the estate administrator's split"],
          ["Household furniture, everyday personal items", "Not taxable, do not declare"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, codes 3300 and 3400.",
      },
      {
        type: "p",
        text: "Accounts, securities and crypto do not go here but in the [securities list](/guide/vstax/comptes-titres) (code 3200). Property has its own schedule (see [Property](/guide/vstax/immeubles)).",
      },

      { type: "h2", id: "assurances-vie", text: "Life and annuity insurance (code 3400)" },
      {
        type: "p",
        text: "Policies with a **surrender value** (endowment, whole-life insurance, pillar 3b) are declared at that value on 31 December, bonuses included, as shown on the insurer's tax certificate. The table asks for the company, year taken out, maturity year, sum insured, surrender value and annual premium. The surrender value of an annuity insurance stays taxable after the annuity starts. Pure risk insurance (death cover only) has no surrender value. Premiums are deducted under code 2560 (see [Deductions](/guide/vstax/deductions)).",
      },

      { type: "h2", id: "dettes", text: "The debts list (schedule 4)" },
      { type: "path", items: ["Formulaires", "Etat des dettes"] },
      {
        type: "p",
        text: "For each debt: **creditor, account number, type of debt** (private account, mortgage, loan from a third party, loan from your own company, construction loan, consumer credit), **amount on 31 December** and **interest paid in 2026**. The form separates private debts (codes 3800 and 1720), farm debts (3700 and 1710) and business debts (3600).",
      },
      {
        type: "screenshot",
        file: "07-etat-des-dettes.webp",
        alt: "Debts list in VSTax: mortgage with creditor, account number, amount on 31.12 and interest",
        caption: "Each debt with its amount on 31 December and the year's interest (VSTax 2025, fictitious data)",
      },
      {
        type: "table",
        head: ["Interest", "Cantonal tax", "Direct federal tax"],
        rows: [
          ["Mortgage interest and interest on private debts", "Deductible up to gross investment income + CHF 50,000", "Same cap"],
          ["Construction loan interest", "Deductible", "Not deductible"],
          ["Interest share of a lease (car, for example)", "Not deductible", "Not deductible"],
          ["Loan arrangement costs, mortgage note fees", "Not deductible", "Not deductible"],
          ["Mortgage break fee, new loan with the same lender", "Deductible as interest", "Deductible as interest"],
          ["Mortgage break fee on sale of the property", "Not deductible from income (property gains)", "Not deductible"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, codes 1710 and 1720, and SCC directive 7.11.",
      },

      { type: "h2", id: "deduction-fortune", text: "The wealth allowance (code 3900)" },
      {
        type: "table",
        head: ["Situation on 31 December 2026", "Allowance"],
        rows: [
          ["Married couple", "CHF 90,000"],
          ["Single person with a dependent child (widowed, divorced, single)", "CHF 90,000"],
          ["Unmarried couple with a child", "CHF 90,000 split in half"],
          ["Others", "CHF 45,000"],
        ],
        caption: "Source: \"Adaptation des déductions forfaitaires pour l'imposition 2026\", SCC Valais (art. 59 of the cantonal tax law, amounts raised by 50% in 2025).",
      },
      {
        type: "p",
        text: "VSTax applies it automatically based on your marital status and children. If you were taxable for only part of the year, it is reduced proportionally. **Wealth in another canton** (code 4200) and **abroad** (code 4300) is not taxed in Valais but sets the rate. When taxes on wealth and its income exceed 20% of taxable income, a reduction is calculated automatically.",
      },

      { type: "h2", id: "informations", text: "Inheritance, gifts and voluntary disclosure (section 10)" },
      {
        type: "screenshot",
        file: "07-page4-passifs.webp",
        alt: "Page 4 of the VSTax return: liabilities (codes 3600 to 4400), wealth allowance 3900 and section 10 on changes in wealth",
        caption: "Liabilities, wealth allowance (3900) and section 10: inheritance, gifts, gambling winnings and voluntary disclosure (VSTax 2025)",
      },
      {
        type: "p",
        text: "At the bottom of page 4, section **10. Informations complémentaires concernant l'évolution de fortune** (additional information on changes in wealth) asks whether in 2026 you received or made a **gift**, received an **inheritance** or an **advance on inheritance**, or won **gambling prizes**. Give the amount, relationship and date, and attach the deeds (inheritance agreement, partition agreement, deed of gift). These amounts are not taxable income, but they explain why your wealth rose. The same section allows a **voluntary disclosure** of income or wealth omitted in earlier years: no fine if the authorities did not already know.",
      },
    ],
    faq: [
      {
        q: "Do I declare my car in the Valais return?",
        a: "Yes, under code 3300 « Autre fortune », at 80% of its insured value on 31 December. A leased car is not yours and is not declared.",
      },
      {
        q: "How much is the wealth allowance in Valais?",
        a: "CHF 90,000 for a married couple or a single person with a dependent child, CHF 45,000 for others. Unmarried couples with a child share CHF 90,000.",
      },
      {
        q: "Is mortgage interest deductible in Valais?",
        a: "Yes, with other interest on private debts, up to your gross investment income plus CHF 50,000. It is entered in the debts list and goes to code 1720.",
      },
      {
        q: "Is an inheritance taxable as income?",
        a: "No. It is reported in section 10 of the return, with the deeds, and increases your wealth on 31 December. Any inheritance tax is handled in a separate procedure, outside the tax return.",
      },
    ],
  },
};
