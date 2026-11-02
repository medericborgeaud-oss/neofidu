import type { GuideChapter } from "../../types";

export const fortuneDettes: GuideChapter = {
  slug: "fortune-dettes",
  readTime: 6,
  fr: {
    title: "Fortune et dettes dans VaudTax : voiture, assurance-vie, mobilier, crédits",
    navTitle: "Fortune et dettes",
    metaTitle: "VaudTax : déclarer sa fortune, sa voiture et ses dettes | NeoFidu",
    metaDescription:
      "Quels éléments de fortune déclarer dans VaudTax (codes 420 à 445) et comment déduire vos dettes et intérêts passifs (codes 610 et 615). Seuil d'exonération vaudois.",
    keywords: [
      "déclarer voiture impôt vaud",
      "fortune imposable vaud seuil",
      "dettes déduction impôt vaud",
      "intérêts passifs déduction vaud",
      "assurance vie valeur de rachat impôt",
      "leasing déduction impôt vaud",
    ],
    summary: [
      "La fortune nette n'est pas imposée dans le canton de Vaud si elle reste **sous CHF 60'000** (personne seule) ou **CHF 120'000** (couple marié).",
      "Se déclarent notamment : **voiture** et autres biens de valeur (code 430), **valeur de rachat des assurances-vie** (code 435), espèces et or (code 420).",
      "Le 2e pilier et le 3e pilier A **ne sont pas** de la fortune imposable.",
      "Les **dettes** au 31 décembre réduisent la fortune et leurs **intérêts** sont déductibles (codes 610 et 615). Le leasing n'est pas une dette déductible.",
    ],
    blocks: [
      { type: "h2", id: "seuil", text: "Le seuil d'exonération vaudois" },
      {
        type: "p",
        text: "Vaud n'impose pas la fortune nette inférieure à **CHF 60'000** pour une personne seule et **CHF 120'000** pour un couple marié vivant en ménage commun. Au-delà, toute la fortune est imposable. Il faut quand même tout déclarer : c'est l'administration qui applique le seuil.",
      },

      { type: "h2", id: "elements", text: "Les autres éléments de fortune" },
      { type: "path", items: ["Autres éléments de fortune et revenus de fortune (codes 420 à 445)", "Afficher"] },
      {
        type: "screenshot",
        file: "07-autres-elements.webp",
        alt: "Rubrique Autres éléments de fortune et revenus de fortune (codes 420 à 445) de VaudTax : numéraire et crypto, successions, autos et bijoux, assurances sur la vie, objets mobiliers, autre fortune",
        caption: "Les six formulaires de la rubrique : chacun s'ouvre en cliquant sur son nom (VaudTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-autos.webp",
        alt: "Formulaire Autos, motos, chevaux de selle, collections, bijoux, bateaux, tableaux (code 430) de VaudTax : une valeur imposable globale",
        caption: "Code 430 : additionnez vos véhicules et objets de valeur, par exemple une voiture de CHF 15'000 et un bateau de CHF 20'000 donnent CHF 35'000 (VaudTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-assurances-vie.webp",
        alt: "Formulaire Assurances sur la vie (code 435) de VaudTax : société d'assurances, numéro de police, années de conclusion et d'échéance, somme assurée, valeur de rachat",
        caption: "Une police par formulaire ; seule la valeur de rachat au 31 décembre est imposable (VaudTax 2025)",
      },
      {
        type: "table",
        head: ["Élément", "Code", "Valeur à déclarer"],
        rows: [
          ["Billets de banque, or, métaux précieux", "420", "Valeur vénale au 31.12 (francs étrangers convertis)."],
          ["Part d'une succession non partagée", "425", "Votre part des biens, compléter aussi la page 4 point 6."],
          ["Voiture, moto, bateau, bijoux, œuvres d'art, collections", "430", "Valeur vénale au 31.12."],
          ["Assurance-vie et assurance de rentes (3e pilier B)", "435", "**Valeur de rachat** au 31.12 selon l'attestation de l'assureur."],
          ["Mobilier de ménage", "440", "30 % de la valeur d'assurance incendie, avec une déduction de CHF 60'000 (seul) ou CHF 120'000 (couple)."],
          ["Toute autre fortune non listée", "445", "Valeur et rendement."],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "La voiture",
        text: "Indiquez une valeur vénale réaliste au 31 décembre, pas le prix d'achat. Une voiture en leasing ne vous appartient pas : elle ne se déclare pas en fortune, et les mensualités de leasing ne sont pas déductibles.",
      },
      {
        type: "p",
        text: "Le **mobilier de ménage** courant n'est en pratique presque jamais imposé grâce à la déduction de CHF 60'000 / 120'000. Les avoirs de **2e pilier et de 3e pilier A** ne sont pas de la fortune imposable : ne les déclarez pas ici.",
      },

      { type: "h2", id: "dettes", text: "Dettes et intérêts passifs (codes 610 et 615)" },
      { type: "path", items: ["Intérêts et dettes (codes 610 et 615)", "Afficher", "Intérêts et dettes"] },
      {
        type: "screenshot",
        file: "07-interets-dettes.webp",
        alt: "Formulaire Intérêts et dettes (codes 610 et 615) de VaudTax : type privé ou commercial, dette hypothécaire ou autre, créancier, IBAN, numéro de compte, intérêts et montant au 31 décembre",
        caption: "Une dette par formulaire : choisissez « Dette garantie par gage immobilier » pour une hypothèque (VaudTax 2025)",
      },
      {
        type: "p",
        text: "Listez chaque dette au 31 décembre (hypothèque, crédit privé, prêt d'un proche) avec le nom du créancier, le solde et les intérêts payés en 2026. Les soldes réduisent votre fortune, les intérêts réduisent votre revenu.",
      },
      {
        type: "list",
        items: [
          "Les intérêts privés sont déductibles jusqu'au montant de vos rendements de fortune bruts **plus CHF 50'000**.",
          "L'**amortissement** (remboursement du capital) n'est pas déductible.",
          "Les intérêts d'un **crédit de construction** ne sont en général pas déductibles (ils augmentent le coût de l'immeuble).",
          "Les mensualités de **leasing** sont assimilées à un loyer : pas déductibles.",
          "Un intérêt négatif sur un placement se déclare ici, avec un rendement nul dans l'état des titres.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Si vous avez importé un eRelevé fiscal, vos hypothèques et crédits bancaires sont souvent déjà remplis. Vérifiez quand même les montants avec le décompte annuel de la banque.",
      },
    ],
    faq: [
      {
        q: "Dois-je déclarer ma voiture dans ma déclaration d'impôt vaudoise ?",
        a: "Oui, à sa valeur vénale au 31 décembre, sous le code 430. Une voiture en leasing ne se déclare pas, puisqu'elle appartient à la société de leasing.",
      },
      {
        q: "À partir de quel montant la fortune est-elle imposée dans le canton de Vaud ?",
        a: "La fortune nette n'est pas imposée si elle n'atteint pas CHF 60'000 pour une personne seule ou CHF 120'000 pour un couple marié vivant en ménage commun.",
      },
      {
        q: "Mon 2e pilier et mon 3e pilier A comptent-ils dans ma fortune ?",
        a: "Non. Les avoirs de prévoyance professionnelle et de 3e pilier A ne sont pas soumis à l'impôt sur la fortune tant qu'ils ne sont pas versés.",
      },
    ],
  },
  en: {
    title: "Wealth and debts in VaudTax: car, life insurance, furniture, loans",
    navTitle: "Wealth and debts",
    metaTitle: "VaudTax: declaring wealth, your car and debts (English guide)",
    metaDescription:
      "Which assets to declare in VaudTax (codes 420 to 445) and how to deduct debts and interest (codes 610 and 615). Vaud wealth tax exemption threshold.",
    keywords: [
      "wealth tax vaud threshold",
      "declare car tax return switzerland",
      "debt interest deduction vaud",
      "life insurance surrender value tax",
      "leasing tax deduction switzerland",
      "vaudtax wealth",
    ],
    summary: [
      "Net wealth is not taxed in the canton of Vaud **below CHF 60,000** (single) or **CHF 120,000** (married couple).",
      "Declare in particular: **car** and other valuables (code 430), **life insurance surrender value** (code 435), cash and gold (code 420).",
      "2nd pillar and pillar 3a savings are **not** taxable wealth.",
      "**Debts** at 31 December reduce your wealth and their **interest** is deductible (codes 610 and 615). Leasing is not a deductible debt.",
    ],
    blocks: [
      { type: "h2", id: "seuil", text: "The Vaud exemption threshold" },
      {
        type: "p",
        text: "The canton of Vaud does not tax net wealth below **CHF 60,000** for a single person and **CHF 120,000** for a married couple living together. Above that, all wealth is taxable. You still declare everything: the tax office applies the threshold.",
      },

      { type: "h2", id: "elements", text: "Other assets" },
      { type: "path", items: ["Autres éléments de fortune et revenus de fortune (codes 420 à 445)", "Afficher"] },
      {
        type: "screenshot",
        file: "07-autres-elements.webp",
        alt: "VaudTax other assets and investment income section (codes 420 to 445): cash and crypto, inheritances, cars and jewellery, life insurance, movable property, other assets",
        caption: "The section's six forms: click a name to open it (VaudTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-autos.webp",
        alt: "VaudTax cars, motorbikes, horses, collections, jewellery, boats, paintings form (code 430): one total taxable value",
        caption: "Code 430: add up your vehicles and valuables, for example a CHF 15,000 car and a CHF 20,000 boat give CHF 35,000 (VaudTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-assurances-vie.webp",
        alt: "VaudTax life insurance form (code 435): insurer, policy number, start and maturity years, sum insured, surrender value",
        caption: "One policy per form; only the surrender value on 31 December is taxable (VaudTax 2025)",
      },
      {
        type: "table",
        head: ["Asset", "Code", "Value to declare"],
        rows: [
          ["Banknotes, gold, precious metals", "420", "Market value at 31.12 (foreign currency converted)."],
          ["Share of an undivided estate", "425", "Your share of the assets; also complete page 4, item 6."],
          ["Car, motorbike, boat, jewellery, art, collections", "430", "Market value at 31.12."],
          ["Life and annuity insurance (pillar 3b)", "435", "**Surrender value** at 31.12 per the insurer's certificate."],
          ["Household furniture", "440", "30% of fire insurance value, minus a CHF 60,000 (single) or CHF 120,000 (couple) allowance."],
          ["Any other wealth not listed", "445", "Value and income."],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Your car",
        text: "Enter a realistic market value on 31 December, not the purchase price. A leased car does not belong to you: it is not declared as wealth, and lease payments are not deductible.",
      },

      { type: "h2", id: "dettes", text: "Debts and interest (codes 610 and 615)" },
      { type: "path", items: ["Intérêts et dettes (codes 610 et 615)", "Afficher", "Intérêts et dettes"] },
      {
        type: "screenshot",
        file: "07-interets-dettes.webp",
        alt: "VaudTax interest and debts form (codes 610 and 615): private or business, mortgage or other debt, creditor, IBAN, account number, interest and balance on 31 December",
        caption: "One debt per form: choose « Dette garantie par gage immobilier » (secured by property) for a mortgage (VaudTax 2025)",
      },
      {
        type: "p",
        text: "List each debt at 31 December (mortgage, personal loan, loan from a relative) with the creditor's name, the balance and the interest paid in 2026. Balances reduce your wealth; interest reduces your income.",
      },
      {
        type: "list",
        items: [
          "Private interest is deductible up to your gross investment income **plus CHF 50,000**.",
          "**Repayments** of principal are not deductible.",
          "Interest on a **construction loan** is generally not deductible (it adds to the property's cost).",
          "**Lease** payments are treated as rent: not deductible.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I have to declare my car?",
        a: "Yes, at its market value on 31 December, under code 430. A leased car is not declared, since it belongs to the leasing company.",
      },
      {
        q: "From what amount is wealth taxed in the canton of Vaud?",
        a: "Net wealth is not taxed if it stays below CHF 60,000 for a single person or CHF 120,000 for a married couple living together.",
      },
      {
        q: "Do my 2nd pillar and pillar 3a count as wealth?",
        a: "No. Occupational pension and pillar 3a savings are not subject to wealth tax until they are paid out.",
      },
    ],
  },
};
