import type { GuideChapter } from "../../types";

export const fortuneDettes: GuideChapter = {
  slug: "fortune-dettes",
  readTime: 6,
  fr: {
    title: "Fortune et dettes dans JuraTax : véhicules, assurances-vie, état des dettes (formule 8) et intérêts passifs",
    navTitle: "Fortune et dettes",
    metaTitle: "JuraTax : véhicules, assurances-vie, dettes et intérêts (2026)",
    metaDescription:
      "Déclarer sa fortune dans JuraTax : véhicules (code 760, dépréciation de 45 % par an), assurances-vie (770), autre fortune (780), successions non partagées (755), état des dettes (formule 8, codes 800 et 810), intérêts passifs (530) et déductions sur la fortune (CHF 57'000 pour un couple).",
    keywords: [
      "juratax fortune",
      "juratax dettes",
      "formule 8 jura",
      "intérêts passifs déduction jura",
      "valeur véhicule déclaration impôt jura",
      "impôt sur la fortune jura",
    ],
    summary: [
      "**Véhicules privés** (code 760) : valeur vénale réduite de **45 % par an** sur la valeur restante. **Assurances-vie** (770) : valeur de rachat attestée par l'assureur.",
      "Les **dettes** se détaillent dans la **formule 8** avec le nom et l'adresse du créancier ; sans ces indications, elles ne sont pas déduites.",
      "Les **intérêts passifs privés** (code 530) sont déductibles jusqu'au rendement brut de votre fortune **plus CHF 50'000**. Le leasing n'est pas déductible.",
      "La fortune nette est diminuée de **CHF 57'000** pour un couple marié, **CHF 28'500** pour les autres contribuables et **CHF 28'500 par enfant**. L'impôt n'est dû que dès **CHF 58'000** de fortune imposable.",
    ],
    blocks: [
      { type: "h2", id: "actif", text: "Les autres éléments de fortune (codes 750 à 780)" },
      {
        type: "table",
        head: ["Code", "Élément", "Valeur à déclarer au 31 décembre 2026"],
        rows: [
          ["750", "Parts à des sociétés en nom collectif, en commandite ou simples (consortiums)", "Part au capital selon les comptes"],
          ["755", "Part à une succession non partagée, une copropriété ou une autre masse de biens", "Part nette selon la formule 6 remplie par l'administrateur de la succession"],
          ["760", "Véhicules privés (voiture, moto, bateau à moteur)", "Valeur vénale : dépréciation de 45 % par an sur la valeur restante"],
          ["770", "Assurances sur la vie avec valeur de rachat, assurances de capitaux et de rentes", "Valeur de rachat fiscale, participations aux excédents comprises, selon l'attestation de l'assureur"],
          ["780", "Autre fortune : numéraire, or et métaux précieux, collections, œuvres d'art, bijoux, chevaux de selle, bateaux", "Valeur vénale"],
        ],
        caption: "Source : Déclaration des personnes physiques 2025 et Guide général 2025, pages 38 à 40, Service des contributions du canton du Jura.",
      },
      {
        type: "p",
        text: "Exemple pour un véhicule : valeur vénale de CHF 10'000 au 1er janvier, moins 45 % de dépréciation, soit **CHF 5'500** au 31 décembre. Le **mobilier de ménage** n'est pas imposable. Pour une **assurance-vie conclue en 2026**, joignez une copie de la police. Pour chaque contrat, JuraTax demande la société d'assurance, l'année de conclusion, l'année d'échéance, la somme assurée et la valeur de rachat.",
      },
      {
        type: "screenshot",
        file: "07-selection-fortune.webp",
        alt: "Écran Sélection des éléments de fortune de JuraTax 2025 : numéraire et métaux précieux, automobiles, assurances sur la vie avec valeur de rachat",
        caption: "Dans « Fortune », cochez numéraire et métaux précieux, automobiles ou assurances-vie (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-assurances-vie.webp",
        alt: "Écran Assurances sur la vie qui ont une valeur de rachat de JuraTax 2025 : société d'assurance, année de conclusion et d'échéance, somme assurée, valeur de rachat fiscale",
        caption: "Une fiche par assurance-vie, avec la valeur de rachat fiscale de l'attestation de l'assureur (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "info",
        title: "Héritage reçu en 2026",
        text: "Si vous avez hérité en 2026, vous êtes imposable sur les biens reçus et leur rendement **dès la dévolution**. Déclarez les biens dont vous disposiez au 31 décembre 2026 et le rendement échu depuis le décès, et joignez l'**acte de partage**. Tant que la succession n'est pas partagée, l'administrateur remplit une **formule 6** dont chaque héritier reçoit un exemplaire ; reportez votre part au code 755 (fortune) et aux codes 380 ou 390 (revenu).",
      },

      { type: "h2", id: "dettes", text: "L'état des dettes (formule 8)" },
      {
        type: "p",
        text: "Pour chaque dette, indiquez le **créancier** (nom et adresse), le numéro de compte, le montant au 31 décembre 2026, les **intérêts échus en 2026**, sans l'amortissement, et le taux. Le total des dettes privées passe au **code 800**, celui des dettes commerciales ou agricoles au **code 810** ; les intérêts privés au **code 530**, les intérêts commerciaux au **code 535**. Joignez l'attestation pour un **nouveau prêt** conclu en 2026, pour des intérêts de dettes privées supérieurs à CHF 500 et pour tout **prêt privé** accordé ou remboursé. Les dettes de l'eRelevé fiscal se reprennent automatiquement dans JuraTax Online.",
      },
      {
        type: "screenshot",
        file: "07-selection-dettes.webp",
        alt: "Écran Sélection des dettes de JuraTax 2025 : dettes hypothécaires sur immeubles privés et autres dettes privées",
        caption: "« Dettes » : hypothèques sur immeubles privés ou autres dettes privées (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-etat-des-dettes.webp",
        alt: "Écran Dette hypothécaire sur immeuble privé de JuraTax 2025 : nom et adresse du créancier, numéro de compte, montant au 31 décembre, intérêts sans amortissement, taux d'intérêt",
        caption: "Une fiche par dette : créancier, solde au 31 décembre et intérêts sans amortissement (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["Déductible", "Non déductible"],
        rows: [
          ["Intérêts hypothécaires et intérêts de prêts privés, jusqu'au rendement brut de la fortune plus CHF 50'000", "Leasing d'une voiture ou d'un autre bien de consommation (assimilé à une location)"],
          ["Pénalité de résiliation anticipée d'une hypothèque à taux fixe, si un nouveau prêt est conclu auprès de la même banque pour le même immeuble", "Intérêts d'un crédit de construction (ils comptent dans le calcul du gain immobilier en cas de vente)"],
          ["Intérêts sur dettes commerciales, sans limite", "Cautionnements non appelés, actes de défaut de biens, cédules remises en garantie au-delà de la dette"],
        ],
        caption: "Source : Guide général 2025, pages 31 et 40, Service des contributions du canton du Jura.",
      },

      { type: "h2", id: "fortune-imposable", text: "De la fortune nette à la fortune imposable" },
      {
        type: "table",
        head: ["Étape", "Code", "Montant 2026"],
        rows: [
          ["Total de l'actif", "790", "Somme des codes 700 à 780"],
          ["Fortune nette", "840", "Actif moins les dettes (codes 800 à 820)"],
          ["Déduction générale", "860", "CHF 57'000 pour un couple marié ou des partenaires enregistrés, CHF 28'500 pour les autres contribuables"],
          ["Par enfant à charge", "870", "CHF 28'500 par enfant au sens du code 620"],
          ["Fortune imposable", "890", "Impôt dû seulement dès CHF 58'000"],
        ],
        caption: "Source : Déclaration des personnes physiques 2025, Service des contributions du canton du Jura ; feuille cantonale Jura, AFC, état février 2026 (montants inchangés en 2026).",
      },
      {
        type: "p",
        text: "Les **immeubles dans un autre canton** (code 892) et **à l'étranger** (code 894) se déclarent aussi : ils ne sont pas imposés dans le canton du Jura, mais ils comptent pour le **taux** de l'impôt. Il n'existe **pas d'impôt fédéral sur la fortune**.",
      },
    ],
    faq: [
      {
        q: "Quelle valeur déclarer pour sa voiture dans le canton du Jura ?",
        a: "La valeur vénale au 31 décembre, calculée avec une dépréciation de 45 % par an sur la valeur restante. Une voiture valant CHF 10'000 au 1er janvier se déclare CHF 5'500 au 31 décembre. Elle se déclare au code 760.",
      },
      {
        q: "À partir de quel montant paie-t-on l'impôt sur la fortune dans le Jura ?",
        a: "Dès une fortune imposable de CHF 58'000, après la déduction générale (CHF 57'000 pour un couple, CHF 28'500 pour les autres) et CHF 28'500 par enfant à charge.",
      },
      {
        q: "Les intérêts d'un leasing sont-ils déductibles ?",
        a: "Non. Un leasing de voiture ou d'autre bien de consommation est assimilé à une location : ni les mensualités ni la part d'intérêts ne sont déductibles.",
      },
      {
        q: "Où déclarer une part d'héritage non partagé dans JuraTax ?",
        a: "Au code 755 pour la fortune et aux codes 380 ou 390 pour le revenu, selon la formule 6 remplie par l'administrateur de la succession et remise à chaque héritier.",
      },
    ],
  },
  en: {
    title: "Wealth and debts in JuraTax: vehicles, life insurance, list of debts (form 8) and interest paid",
    navTitle: "Wealth and debts",
    metaTitle: "JuraTax: vehicles, life insurance, debts and interest (2026)",
    metaDescription:
      "Declare your wealth in JuraTax: vehicles (code 760, 45% depreciation a year), life insurance (770), other assets (780), undivided estates (755), list of debts (form 8, codes 800 and 810), interest paid (530) and wealth tax allowances (CHF 57,000 for a couple).",
    keywords: [
      "juratax wealth",
      "juratax debts",
      "jura form 8",
      "interest deduction jura",
      "car value tax return jura",
      "wealth tax jura",
    ],
    summary: [
      "**Private vehicles** (code 760): market value reduced by **45% a year** on the remaining value. **Life insurance** (770): surrender value certified by the insurer.",
      "**Debts** are itemised on **form 8** with the creditor's name and address; without these details, they are not deducted.",
      "**Private interest paid** (code 530) is deductible up to the gross income from your wealth **plus CHF 50,000**. Leasing is not deductible.",
      "Net wealth is reduced by **CHF 57,000** for a married couple, **CHF 28,500** for other taxpayers and **CHF 28,500 per child**. Tax is only due from **CHF 58,000** of taxable wealth.",
    ],
    blocks: [
      { type: "h2", id: "actif", text: "Other assets (codes 750 to 780)" },
      {
        type: "table",
        head: ["Code", "Asset", "Value to declare at 31 December 2026"],
        rows: [
          ["750", "Shares in general, limited or simple partnerships (consortia)", "Share of capital per the accounts"],
          ["755", "Share in an undivided estate, co-ownership or other pool of assets", "Net share per form 6 completed by the estate's administrator"],
          ["760", "Private vehicles (car, motorbike, motor boat)", "Market value: 45% depreciation a year on the remaining value"],
          ["770", "Life insurance with a surrender value, capital and annuity insurance", "Tax surrender value, including profit shares, per the insurer's certificate"],
          ["780", "Other assets: cash, gold and precious metals, collections, works of art, jewellery, riding horses, boats", "Market value"],
        ],
        caption: "Source: 2025 individual tax return and 2025 general guide, pages 38 to 40, Jura Service des contributions.",
      },
      {
        type: "p",
        text: "Example for a vehicle: market value of CHF 10,000 on 1 January, minus 45% depreciation, gives **CHF 5,500** on 31 December. **Household furniture** is not taxable. For a **life insurance policy taken out in 2026**, enclose a copy of the policy. For each contract, JuraTax asks for the insurer, year taken out, maturity year, sum insured and surrender value.",
      },
      {
        type: "screenshot",
        file: "07-selection-fortune.webp",
        alt: "JuraTax 2025 wealth selection screen: cash and precious metals, cars, life insurance with a surrender value",
        caption: "Under « Fortune », tick cash and precious metals, cars or life insurance (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-assurances-vie.webp",
        alt: "JuraTax 2025 life insurance with surrender value screen: insurer, year taken out and maturity year, sum insured, tax surrender value",
        caption: "One record per life insurance policy, with the tax surrender value from the insurer's certificate (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "info",
        title: "Inheritance received in 2026",
        text: "If you inherited in 2026, you are taxable on the assets received and their income **from the date they passed to you**. Declare the assets you held on 31 December 2026 and the income accrued since the death, and enclose the **deed of distribution**. As long as the estate is undivided, the administrator completes a **form 6**, a copy of which goes to each heir; enter your share under code 755 (wealth) and codes 380 or 390 (income).",
      },

      { type: "h2", id: "dettes", text: "The list of debts (form 8)" },
      {
        type: "p",
        text: "For each debt, enter the **creditor** (name and address), the account number, the balance on 31 December 2026, the **interest due in 2026**, excluding amortisation, and the rate. Total private debts go to **code 800**, business or farm debts to **code 810**; private interest to **code 530**, business interest to **code 535**. Enclose the certificate for a **new loan** taken out in 2026, for private debt interest above CHF 500 and for any **private loan** granted or repaid. Debts from the eRelevé fiscal are carried over automatically in JuraTax Online.",
      },
      {
        type: "screenshot",
        file: "07-selection-dettes.webp",
        alt: "JuraTax 2025 debts selection screen: mortgages on private property and other private debts",
        caption: "« Dettes »: mortgages on private property or other private debts (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "07-etat-des-dettes.webp",
        alt: "JuraTax 2025 mortgage on private property screen: creditor's name and address, account number, amount at 31 December, interest excluding amortisation, interest rate",
        caption: "One record per debt: creditor, balance on 31 December and interest excluding amortisation (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["Deductible", "Not deductible"],
        rows: [
          ["Mortgage interest and private loan interest, up to gross income from wealth plus CHF 50,000", "Leasing of a car or other consumer good (treated as rental)"],
          ["Penalty for early termination of a fixed-rate mortgage, if a new loan is taken out with the same bank for the same property", "Interest on a construction loan (it counts when calculating the property gain on sale)"],
          ["Interest on business debts, without limit", "Guarantees not called, certificates of unpaid debts, mortgage notes pledged beyond the debt"],
        ],
        caption: "Source: 2025 general guide, pages 31 and 40, Jura Service des contributions.",
      },

      { type: "h2", id: "fortune-imposable", text: "From net wealth to taxable wealth" },
      {
        type: "table",
        head: ["Step", "Code", "2026 amount"],
        rows: [
          ["Total assets", "790", "Sum of codes 700 to 780"],
          ["Net wealth", "840", "Assets minus debts (codes 800 to 820)"],
          ["General allowance", "860", "CHF 57,000 for a married couple or registered partners, CHF 28,500 for other taxpayers"],
          ["Per dependent child", "870", "CHF 28,500 per child as defined in code 620"],
          ["Taxable wealth", "890", "Tax due only from CHF 58,000"],
        ],
        caption: "Source: 2025 individual tax return, Jura Service des contributions; Federal Tax Administration Jura cantonal sheet, February 2026 (amounts unchanged in 2026).",
      },
      {
        type: "p",
        text: "**Property in another canton** (code 892) and **abroad** (code 894) is also declared: it is not taxed in the canton of Jura, but it counts towards the tax **rate**. There is **no federal wealth tax**.",
      },
    ],
    faq: [
      {
        q: "What value do I declare for my car in Jura?",
        a: "The market value on 31 December, calculated with 45% depreciation a year on the remaining value. A car worth CHF 10,000 on 1 January is declared at CHF 5,500 on 31 December, under code 760.",
      },
      {
        q: "From what amount is wealth tax due in Jura?",
        a: "From taxable wealth of CHF 58,000, after the general allowance (CHF 57,000 for a couple, CHF 28,500 for others) and CHF 28,500 per dependent child.",
      },
      {
        q: "Is leasing interest deductible?",
        a: "No. Leasing a car or other consumer good is treated as rental: neither the monthly payments nor their interest share are deductible.",
      },
      {
        q: "Where do I declare a share in an undivided inheritance in JuraTax?",
        a: "Under code 755 for wealth and codes 380 or 390 for income, according to form 6 completed by the estate's administrator and given to each heir.",
      },
    ],
  },
};
