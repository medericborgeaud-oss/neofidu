import type { GuideChapter } from "../../types";

export const logement: GuideChapter = {
  slug: "logement",
  readTime: 8,
  fr: {
    title: "Logement dans VaudTax : déduction pour locataire, valeur locative et frais d'entretien",
    navTitle: "Logement : locataire ou propriétaire",
    metaTitle: "VaudTax : loyer, valeur locative et frais d'entretien 2026 | NeoFidu",
    metaDescription:
      "Locataire : la déduction sociale pour le logement vaudoise (code 660). Propriétaire : valeur locative, forfait d'entretien de 20 % ou 30 %, frais effectifs et intérêts hypothécaires.",
    keywords: [
      "déduction loyer impôt vaud",
      "déduction sociale logement vaud 660",
      "valeur locative vaud",
      "frais d'entretien forfait vaud 30%",
      "intérêts hypothécaires déduction vaud",
      "vaudtax immeuble",
    ],
    summary: [
      "**Locataire** : Vaud offre une **déduction sociale pour le logement** (code 660) si votre loyer net dépasse 20 % de votre revenu net. Elle est plafonnée à **CHF 6'800** en 2026.",
      "**Propriétaire occupant** : vous déclarez une **valeur locative** (réduite de 35 % pour l'impôt cantonal) et déduisez les frais d'entretien et les intérêts hypothécaires.",
      "Forfait d'entretien 2026 pour un logement occupé par le propriétaire : **20 %** de la valeur locative (immeuble de 20 ans et moins) ou **30 %** (plus de 20 ans). Ou les frais effectifs, au choix chaque année.",
      "La valeur locative sera **abolie au 1er janvier 2029** : elle s'applique encore pleinement à la déclaration 2026.",
    ],
    blocks: [
      { type: "h2", id: "locataire", text: "Vous êtes locataire : la déduction sociale pour le logement (code 660)" },
      { type: "path", items: ["Déductions spéciales sur le revenu (codes 618 à 720)", "Afficher", "Déduction sociale pour le logement (code 660)"] },
      {
        type: "p",
        text: "Le loyer n'est en principe pas déductible. Vaud prévoit cependant une **déduction sociale** pour les ménages dont le loyer pèse lourd par rapport au revenu. Elle se calcule ainsi :",
      },
      {
        type: "steps",
        items: [
          "Prenez votre **loyer annuel net, sans les charges**, plafonné à un montant maximal selon votre situation (en 2025 : CHF 11'100 pour une personne seule, CHF 13'700 pour un couple ou un parent seul avec enfant, plus CHF 3'700 par enfant).",
          "Soustrayez **20 % de votre revenu net** (code 650 de la déclaration).",
          "La différence, si elle est positive, est votre déduction, au maximum **CHF 6'800**.",
        ],
      },
      {
        type: "p",
        text: "Exemple (barème 2025) : couple avec deux enfants, revenu net CHF 80'000, loyer net CHF 18'000. 20 % de 80'000 = 16'000. Déduction : 18'000 − 16'000 = **CHF 2'000**. Indiquez le loyer net payé dans l'année à l'endroit prévu dans VaudTax ; l'ACI peut demander le bail.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Cette déduction est souvent oubliée par les familles et les personnes à revenu modeste. Elle ne concerne que le logement principal.",
      },

      { type: "h2", id: "proprietaire", text: "Vous êtes propriétaire : valeur locative et Annexe 07" },
      { type: "path", items: ["Immeubles, terrains et forêts (codes 500 à 540)", "Afficher"] },
      {
        type: "p",
        text: "Chaque immeuble se décrit dans une fiche (l'équivalent de l'Annexe 07 papier) : commune, numéro de parcelle, estimation fiscale, part de propriété, puis le calcul de la **valeur locative** si vous l'habitez, ou les loyers encaissés si vous le louez.",
      },
      { type: "screenshot", file: "08-immeuble.webp", alt: "Fiche immeuble dans VaudTax : commune, parcelle, estimation fiscale", caption: "La fiche immeuble : commune, n° de parcelle et estimation fiscale de votre part (VaudTax 2025, mode simulation, données fictives)" },
      {
        type: "list",
        items: [
          "La **valeur locative** est un revenu fictif : le loyer que vous paieriez pour votre propre logement. Vaud la calcule selon une grille (surface, commune, année de construction, équipements), indexée chaque année.",
          "Pour l'impôt cantonal et communal, elle est **réduite de 35 %**. Pour l'impôt fédéral, de 10 % seulement. VaudTax applique les deux.",
          "L'**estimation fiscale** de l'immeuble (figurant sur votre avis d'estimation) entre dans la fortune. Les dettes hypothécaires viennent en déduction.",
          "Achat ou vente en cours d'année : la valeur locative est calculée au prorata de la durée de possession.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Pour estimer votre valeur locative avant de remplir la fiche, essayez notre [simulateur de valeur locative](/simulateur/valeur-locative).",
      },

      { type: "h2", id: "entretien", text: "Frais d'entretien : forfait ou frais effectifs (code 540)" },
      {
        type: "p",
        text: "Chaque année et pour chaque immeuble, vous choisissez entre le forfait et les frais effectifs. Le forfait ne demande aucun justificatif.",
      },
      {
        type: "table",
        head: ["Immeuble", "Forfait 2026"],
        rows: [
          ["Occupé par le propriétaire, 20 ans et moins", "20 % de la valeur locative"],
          ["Occupé par le propriétaire, plus de 20 ans", "**30 %** de la valeur locative"],
          ["Loué, 20 ans et moins", "10 % du rendement (selon le tableau 2026 : du revenu net de l'immeuble)"],
          ["Loué, plus de 20 ans", "20 % du rendement (idem)"],
        ],
        caption: "Source : Tableau des principales déductions vaudoises 2026 et Instructions complémentaires concernant la propriété immobilière (ACI). Pour l'impôt fédéral, le forfait se calcule sur la valeur locative fédérale.",
      },
      {
        type: "p",
        text: "Les **frais effectifs** valent la peine l'année de gros travaux : réparations, rénovation de cuisine ou salle de bains (hors plus-value), peinture, toiture, frais de gérance, primes d'assurance bâtiment. Les travaux qui **augmentent la valeur** (agrandissement, piscine, première installation) ne sont pas déductibles du revenu, ils réduiront plus tard l'impôt sur le gain immobilier.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Rénovation énergétique",
        text: "Les investissements destinés à économiser l'énergie (isolation, pompe à chaleur, panneaux solaires, fenêtres) sont déductibles comme frais d'entretien. S'ils dépassent le revenu de l'année, le solde peut être reporté sur les deux périodes fiscales suivantes.",
      },

      { type: "h2", id: "hypotheque", text: "Intérêts hypothécaires" },
      {
        type: "p",
        text: "Les intérêts de votre hypothèque se déclarent dans la rubrique **« Intérêts et dettes (codes 610 et 615) »** (voir [Fortune et dettes](/guide/vaudtax/fortune-dettes)), pas dans la fiche immeuble. L'amortissement direct n'est pas déductible ; l'amortissement indirect via le 3e pilier A l'est, dans la limite du 3a.",
      },

      { type: "h2", id: "abolition", text: "Et l'abolition de la valeur locative ?" },
      {
        type: "p",
        text: "Le peuple a accepté la réforme le 28 septembre 2025 et le Conseil fédéral a fixé l'entrée en vigueur au **1er janvier 2029**. D'ici là, rien ne change : la valeur locative, les frais d'entretien et les intérêts restent dans vos déclarations 2026, 2027 et 2028. Avec la réforme, la déduction des frais d'entretien disparaîtra aussi : si vous prévoyez des travaux, le calendrier compte. Voir [notre article sur la réforme](/blog/valeur-locative-suisse-reforme-2026).",
      },
    ],
    faq: [
      {
        q: "Peut-on déduire son loyer dans le canton de Vaud ?",
        a: "Pas directement. Mais Vaud accorde une déduction sociale pour le logement (code 660) lorsque le loyer net dépasse 20 % du revenu net, dans certaines limites et au maximum CHF 6'800 en 2026.",
      },
      {
        q: "Forfait de 20 % ou 30 % : comment savoir ?",
        a: "Pour un logement que vous occupez, le forfait est de 20 % de la valeur locative si l'immeuble a 20 ans ou moins, et de 30 % s'il a plus de 20 ans. Vous pouvez choisir les frais effectifs à la place, immeuble par immeuble et année par année.",
      },
      {
        q: "Quand la valeur locative sera-t-elle supprimée ?",
        a: "Au 1er janvier 2029, selon la décision du Conseil fédéral. Elle reste due pour les périodes fiscales 2026 à 2028.",
      },
      {
        q: "Où déclarer les intérêts de mon hypothèque dans VaudTax ?",
        a: "Dans la rubrique « Intérêts et dettes (codes 610 et 615) », avec le nom de la banque, le solde de la dette au 31 décembre et les intérêts payés dans l'année.",
      },
    ],
  },
  en: {
    title: "Housing in VaudTax: tenant deduction, imputed rental value and maintenance costs",
    navTitle: "Housing: tenant or owner",
    metaTitle: "VaudTax: rent deduction, imputed rental value and maintenance (English)",
    metaDescription:
      "Tenants: the Vaud housing deduction (code 660). Owners: imputed rental value, 20% or 30% flat maintenance deduction, actual costs and mortgage interest.",
    keywords: [
      "rent tax deduction vaud",
      "imputed rental value vaud",
      "eigenmietwert vaud",
      "property maintenance deduction vaud",
      "mortgage interest deduction switzerland",
      "vaudtax property",
    ],
    summary: [
      "**Tenants**: Vaud offers a **housing deduction** (code 660) if your net rent exceeds 20% of your net income, capped at **CHF 6,800** in 2026.",
      "**Owner-occupiers**: you declare an **imputed rental value** (reduced by 35% for cantonal tax) and deduct maintenance costs and mortgage interest.",
      "Flat maintenance deduction in 2026 for an owner-occupied home: **20%** of the rental value (building 20 years old or less) or **30%** (over 20 years). Or actual costs, chosen each year.",
      "Imputed rental value will be **abolished on 1 January 2029**: it still fully applies to the 2026 return.",
    ],
    blocks: [
      { type: "h2", id: "locataire", text: "Tenants: the housing deduction (code 660)" },
      { type: "path", items: ["Déductions spéciales sur le revenu (codes 618 à 720)", "Afficher", "Déduction sociale pour le logement (code 660)"] },
      {
        type: "p",
        text: "Rent is not normally deductible. Vaud does however offer a **social deduction** for households whose rent is high compared with their income:",
      },
      {
        type: "steps",
        items: [
          "Take your **annual net rent excluding charges**, capped according to your situation (2025: CHF 11,100 single, CHF 13,700 couple or single parent with a child, plus CHF 3,700 per child).",
          "Subtract **20% of your net income** (code 650 of the return).",
          "Any positive difference is your deduction, up to **CHF 6,800**.",
        ],
      },
      {
        type: "p",
        text: "Example (2025 scale): couple with two children, net income CHF 80,000, net rent CHF 18,000. 20% of 80,000 = 16,000. Deduction: 18,000 − 16,000 = **CHF 2,000**. Enter the net rent paid during the year in the field provided; the tax office may ask for your lease.",
      },

      { type: "h2", id: "proprietaire", text: "Owners: imputed rental value and property form" },
      { type: "path", items: ["Immeubles, terrains et forêts (codes 500 à 540)", "Afficher"] },
      {
        type: "p",
        text: "Each property is described on a form (the paper « Annexe 07 »): commune, plot number, tax valuation, ownership share, then the **imputed rental value** calculation if you live there, or rent received if you let it.",
      },
      { type: "screenshot", file: "08-immeuble.webp", alt: "Property form in VaudTax: commune, plot number, tax valuation", caption: "The property form: commune, plot number and tax valuation of your share (VaudTax 2025, simulation mode, fictitious data)" },
      {
        type: "list",
        items: [
          "The **imputed rental value** (valeur locative) is notional income: the rent you would pay for your own home. Vaud calculates it from a grid (floor area, commune, year of construction, equipment), indexed each year.",
          "For cantonal and communal tax it is **reduced by 35%**; for federal tax, by only 10%. VaudTax applies both.",
          "The property's **tax valuation** (on your valuation notice) counts as wealth. Mortgage debt is deducted.",
        ],
      },

      { type: "h2", id: "entretien", text: "Maintenance: flat rate or actual costs (code 540)" },
      {
        type: "table",
        head: ["Property", "2026 flat rate"],
        rows: [
          ["Owner-occupied, 20 years old or less", "20% of the rental value"],
          ["Owner-occupied, over 20 years old", "**30%** of the rental value"],
          ["Let, 20 years old or less", "10% of rental income"],
          ["Let, over 20 years old", "20% of rental income"],
        ],
        caption: "Source: ACI table of main Vaud deductions 2026 and supplementary property instructions.",
      },
      {
        type: "p",
        text: "**Actual costs** pay off in a year with major works: repairs, kitchen or bathroom renovation (excluding added value), painting, roof, management fees, building insurance. Works that **add value** (extension, pool) are not deductible from income; they will later reduce property gains tax. Energy-saving investments are deductible and can be carried forward over the next two tax years if they exceed income.",
      },

      { type: "h2", id: "hypotheque", text: "Mortgage interest" },
      {
        type: "p",
        text: "Mortgage interest goes in the **« Intérêts et dettes (codes 610 et 615) »** section (see [Wealth and debts](/guide/vaudtax/fortune-dettes)), not in the property form. Direct repayments are not deductible.",
      },

      { type: "h2", id: "abolition", text: "What about the abolition of imputed rental value?" },
      {
        type: "p",
        text: "Voters approved the reform on 28 September 2025 and the Federal Council set the entry into force for **1 January 2029**. Until then nothing changes: rental value, maintenance and interest deductions remain in your 2026, 2027 and 2028 returns. The maintenance deduction will also disappear with the reform, so timing matters if you plan works.",
      },
    ],
    faq: [
      {
        q: "Can I deduct my rent in Vaud?",
        a: "Not directly. Vaud grants a housing deduction (code 660) when net rent exceeds 20% of net income, within limits and up to CHF 6,800 in 2026.",
      },
      {
        q: "When will imputed rental value be abolished?",
        a: "On 1 January 2029, according to the Federal Council's decision. It still applies to tax years 2026 to 2028.",
      },
      {
        q: "20% or 30% flat maintenance deduction?",
        a: "For a home you live in: 20% of the rental value if the building is 20 years old or less, 30% if older. You may choose actual costs instead, property by property and year by year.",
      },
    ],
  },
};
