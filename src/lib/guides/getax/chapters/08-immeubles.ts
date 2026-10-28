import type { GuideChapter } from "../../types";

export const immeubles: GuideChapter = {
  slug: "immeubles",
  readTime: 8,
  fr: {
    title: "Immeubles dans GeTax : valeur fiscale, valeur locative, frais d'entretien 2026",
    navTitle: "Immeubles et logement",
    metaTitle: "GeTax 2026 : valeur locative, abattement et forfait d'entretien",
    metaDescription:
      "Déclarer son logement dans GeTax (annexe D) : valeur fiscale et abattement de 4 % par an, valeur locative et taux d'effort, forfait d'entretien 15 % ou 25 %, impôt immobilier complémentaire.",
    keywords: [
      "valeur locative genève 2026",
      "frais d'entretien immeuble genève forfait",
      "abattement 4 % genève valeur fiscale",
      "taux d'effort valeur locative genève",
      "impôt immobilier complémentaire",
      "annexe D getax",
    ],
    summary: [
      "Le propriétaire occupant déclare la **valeur fiscale** de son bien (capital selon estimation) et sa **valeur locative brute** dans l'annexe D. GeTax applique un **abattement de 4 % par année d'occupation**, au plus 40 %.",
      "Forfait d'entretien ICC 2026 : **15 %** de la valeur locative après abattement si le bâtiment a 10 ans ou moins, **25 %** au-delà. Pour l'IFD : 10 % ou 20 % de la valeur locative brute.",
      "Le **taux d'effort** limite la valeur locative à 20 % des revenus bruts, si les intérêts hypothécaires ne la dépassent pas.",
      "La valeur locative sera supprimée au **1er janvier 2029** seulement : elle reste dans la déclaration 2026. Les locataires n'ont rien à déduire pour leur loyer.",
    ],
    blocks: [
      { type: "h2", id: "types", text: "Quel type d'immeuble ?" },
      { type: "path", items: ["Immeubles", "Sélection Immeubles"] },
      {
        type: "table",
        head: ["Rubrique GeTax", "Code", "Exemples"],
        rows: [
          ["Immeubles occupés par le propriétaire", "15.10", "Votre logement, résidence secondaire en Suisse ou à l'étranger"],
          ["Immeubles locatifs ou loués", "15.20", "Appartement loué à un tiers, terrain non bâti"],
          ["Immeubles commerciaux, industriels", "15.30", "Locaux d'activité"],
          ["Immeubles épargne logement PPE", "15.40", "Logements subventionnés en propriété"],
          ["Immeubles HLM", "15.50", "Immeubles locatifs subventionnés"],
        ],
        caption: "Intitulés de GeTax 2025 et codes du Guide de la déclaration 2025, AFC Genève.",
      },
      {
        type: "p",
        text: "Les biens situés **hors du canton ou à l'étranger** se déclarent aussi : ils ne sont pas imposés à Genève, mais comptent pour déterminer le taux d'impôt. Pour un bien à l'étranger, la valeur se convertit au taux de change de l'année fiscale.",
      },

      { type: "h2", id: "donnees", text: "Données de base et fortune" },
      { type: "path", items: ["Immeubles occupés par le propriétaire", "Insérer", "Données de base"] },
      {
        type: "p",
        text: "Indiquez la commune, la parcelle (figurant sur l'avis immobilier de l'AFC), l'adresse, l'année de construction, la date d'occupation, si vous possédiez déjà le bien au 31 décembre de l'année précédente et s'il s'agit de votre **résidence principale**. Pour un couple, répartissez la propriété entre A et B.",
      },
      {
        type: "screenshot",
        file: "08-valeur-locative.webp",
        alt: "Écran Revenu et fortune d'un immeuble dans GeTax : capital selon estimation, abattement 40 %, valeur locative brute, valeur locative après abattement",
        caption: "Valeur fiscale de CHF 850'000 et abattement de 40 % après dix ans d'occupation : la valeur locative ICC passe de 24'000 à 14'400 (GeTax 2025, données fictives)",
      },
      {
        type: "list",
        items: [
          "**Capital selon estimation** (code 15.10) : la valeur fiscale communiquée par l'AFC. Après la majoration de 12 % de 2025 (loi LEFI) pour les villas et PPE, elle est **indexée chaque année dès 2026** ; le montant figure sur le courrier reçu avant le 31 mars.",
          "**Abattement** : 4 % par année d'occupation continue, au plus 40 % après dix ans, calculé par GeTax à partir de la date d'occupation. Il réduit la fortune imposable et la valeur locative ICC.",
          "**Valeur locative brute** : figure sur l'avis immobilier. Le champ est obligatoire (indiquez 0 dans les rares cas où elle est nulle).",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Le taux d'effort",
        text: "La valeur locative ne peut pas dépasser **20 % des revenus bruts totaux** du ménage, calculés au minimum sur CHF 18'700 pour une personne seule en 2026, le double pour un couple. Cette limite ne s'applique que si les intérêts hypothécaires ne dépassent pas la valeur locative. GeTax calcule la réduction dans le champ « Réduction de la valeur locative après application du taux d'effort ».",
      },

      { type: "h2", id: "entretien", text: "Frais d'entretien : forfait ou effectifs" },
      { type: "path", items: ["Immeubles occupés par le propriétaire", "Charges et frais d'entretien"] },
      {
        type: "screenshot",
        file: "08b-entretien.webp",
        alt: "Écran Charges et frais d'entretien de GeTax : forfait ICC 25 % et IFD 20 %",
        caption: "Bâtiment de plus de 10 ans : forfait de 25 % pour l'ICC et de 20 % pour l'IFD (GeTax 2025, données fictives)",
      },
      {
        type: "table",
        head: ["Forfait d'entretien (code 58.10)", "ICC, sur valeur locative après abattement", "IFD, sur valeur locative brute"],
        rows: [
          ["Bâtiment de 10 ans ou moins au début de l'année", "15 %", "10 %"],
          ["Bâtiment de plus de 10 ans", "25 %", "20 %"],
        ],
        caption: "Sources : Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 34 LIPP (ICC) ; aide de GeTax 2025, AFC Genève (IFD).",
      },
      {
        type: "p",
        text: "Vous pouvez choisir, chaque année et pour chaque immeuble, entre le forfait et les **frais effectifs**. En choisissant « Effectif », deux écrans apparaissent : « Frais et taxes effectifs » et « Frais d'entretien effectifs ». Sont déductibles les réparations et rénovations qui n'augmentent pas la valeur du bien, les versements au fonds de rénovation d'une PPE, les primes d'assurance du bâtiment, les frais d'administration par des tiers et les investissements qui économisent l'énergie (reportables sur les deux années suivantes s'ils dépassent le revenu de l'année). Les factures sont à conserver, pas à envoyer.",
      },

      { type: "h2", id: "iic", text: "Impôt immobilier complémentaire" },
      {
        type: "p",
        text: "Genève prélève un impôt immobilier complémentaire (IIC) annuel sur la valeur fiscale, sans déduction des dettes : **1 ‰** en général, **0,2 ‰** pour la résidence principale d'un particulier. Il fait partie des frais d'entretien déductibles en frais effectifs. Une exonération de 20 ans est possible pour un bâtiment à haute ou très haute performance énergétique (attestation de l'OCEN).",
      },

      { type: "h2", id: "locataires", text: "Locataires" },
      {
        type: "p",
        text: "Le loyer de votre logement n'est pas déductible à Genève, et GeTax ne le demande plus depuis la version 2025. Seules les **allocations de logement** reçues de l'OCLPF se déclarent (code 16.35), ainsi que les revenus d'une éventuelle sous-location.",
      },

      { type: "h2", id: "avenir", text: "Et la suppression de la valeur locative ?" },
      {
        type: "p",
        text: "Acceptée en votation fédérale, la réforme entre en vigueur le **1er janvier 2029** (décision du Conseil fédéral du 1er avril 2026). Jusque-là, la valeur locative, la déduction des frais d'entretien et celle des intérêts passifs restent appliquées comme aujourd'hui, y compris dans la déclaration 2026.",
      },
    ],
    faq: [
      {
        q: "Quel est le forfait d'entretien à Genève en 2026 ?",
        a: "Pour l'impôt cantonal, 15 % de la valeur locative après abattement si le bâtiment a 10 ans ou moins au début de l'année, 25 % au-delà. Pour l'impôt fédéral, 10 % ou 20 % de la valeur locative brute.",
      },
      {
        q: "Qu'est-ce que l'abattement de 4 % à Genève ?",
        a: "Pour un logement occupé par son propriétaire, la valeur fiscale et la valeur locative cantonale baissent de 4 % par année d'occupation continue, jusqu'à 40 % après dix ans. GeTax le calcule à partir de la date d'occupation.",
      },
      {
        q: "Où trouver la valeur fiscale et la valeur locative de mon bien ?",
        a: "Sur l'avis immobilier envoyé par l'AFC aux propriétaires. Pour les villas et PPE, la valeur fiscale est indexée chaque année depuis 2026 et communiquée avant le 31 mars.",
      },
      {
        q: "Faut-il déclarer un appartement à l'étranger ?",
        a: "Oui. Il n'est pas imposé à Genève mais compte pour le taux d'impôt. Déclarez sa valeur et sa valeur locative en francs, au taux de change de l'année fiscale.",
      },
    ],
  },
  en: {
    title: "Property in GeTax: tax value, imputed rental value, upkeep costs 2026",
    navTitle: "Property and housing",
    metaTitle: "GeTax 2026: imputed rental value, reduction and upkeep flat rate",
    metaDescription:
      "Declaring your home in GeTax (schedule D): tax value and 4% annual reduction, imputed rental value and 20% effort cap, 15% or 25% upkeep flat rate, complementary property tax.",
    keywords: [
      "imputed rental value geneva 2026",
      "property upkeep deduction geneva",
      "geneva property tax value",
      "eigenmietwert geneva",
      "complementary property tax geneva",
      "getax schedule D",
    ],
    summary: [
      "An owner-occupier declares the **tax value** of the property (« Capital selon estimation ») and its **gross imputed rental value** (« valeur locative brute ») in schedule D. GeTax applies a **4% reduction per year of occupation**, up to 40%.",
      "2026 cantonal upkeep flat rate: **15%** of the reduced rental value if the building is 10 years old or less, **25%** beyond. For federal tax: 10% or 20% of the gross rental value.",
      "The **effort cap** limits the rental value to 20% of gross income, if mortgage interest does not exceed it.",
      "Imputed rental value is only abolished from **1 January 2029**: it remains in the 2026 return. Tenants cannot deduct their rent.",
    ],
    blocks: [
      { type: "h2", id: "types", text: "Which type of property?" },
      { type: "path", items: ["Immeubles", "Sélection Immeubles"] },
      {
        type: "table",
        head: ["GeTax section", "Code", "Examples"],
        rows: [
          ["« Immeubles occupés par le propriétaire » (owner-occupied)", "15.10", "Your home, second home in Switzerland or abroad"],
          ["« Immeubles locatifs ou loués » (rented out)", "15.20", "Flat let to a third party, undeveloped land"],
          ["« Immeubles commerciaux, industriels »", "15.30", "Business premises"],
          ["« Immeubles épargne logement PPE »", "15.40", "Subsidised owner-occupied flats"],
          ["« Immeubles HLM »", "15.50", "Subsidised rental buildings"],
        ],
        caption: "GeTax 2025 labels and codes from the 2025 return guide, AFC Geneva.",
      },
      {
        type: "p",
        text: "Property **outside the canton or abroad** must be declared too: it is not taxed in Geneva but counts for the tax rate. For property abroad, convert the value at the tax year's exchange rate.",
      },

      { type: "h2", id: "donnees", text: "Basic data and wealth" },
      { type: "path", items: ["Immeubles occupés par le propriétaire", "Insérer", "Données de base"] },
      {
        type: "p",
        text: "Enter the municipality, the plot number (on the AFC property notice), the address, the year of construction, the date you moved in, whether you already owned it on 31 December of the previous year and whether it is your **main residence**. For a couple, split ownership between A and B.",
      },
      {
        type: "screenshot",
        file: "08-valeur-locative.webp",
        alt: "GeTax property income and wealth screen: estimated capital, 40% reduction, gross rental value, reduced rental value",
        caption: "Tax value CHF 850,000 and 40% reduction after ten years of occupation: the cantonal rental value drops from 24,000 to 14,400 (GeTax 2025, fictitious data)",
      },
      {
        type: "list",
        items: [
          "**« Capital selon estimation »** (code 15.10): the tax value notified by the AFC. After the 12% increase of 2025 (LEFI law) for houses and condominiums, it is **indexed every year from 2026**; the figure is on the letter received before 31 March.",
          "**« Abattement »** (reduction): 4% per year of continuous occupation, up to 40% after ten years, computed by GeTax from the occupation date. It lowers taxable wealth and the cantonal rental value.",
          "**« Valeur locative brute »** (gross rental value): on the property notice. The field is mandatory (enter 0 in the rare cases where it is nil).",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "The effort cap",
        text: "The rental value may not exceed **20% of the household's total gross income**, computed on at least CHF 18,700 for a single person in 2026, double for a couple. The cap only applies if mortgage interest does not exceed the rental value. GeTax computes the reduction in the field « Réduction de la valeur locative après application du taux d'effort ».",
      },

      { type: "h2", id: "entretien", text: "Upkeep costs: flat rate or actual" },
      { type: "path", items: ["Immeubles occupés par le propriétaire", "Charges et frais d'entretien"] },
      {
        type: "screenshot",
        file: "08b-entretien.webp",
        alt: "GeTax upkeep costs screen: 25% cantonal and 20% federal flat rate",
        caption: "Building over 10 years old: 25% flat rate for cantonal tax and 20% for federal tax (GeTax 2025, fictitious data)",
      },
      {
        type: "table",
        head: ["Upkeep flat rate (code 58.10)", "Cantonal, on reduced rental value", "Federal, on gross rental value"],
        rows: [
          ["Building 10 years old or less at the start of the year", "15%", "10%"],
          ["Building over 10 years old", "25%", "20%"],
        ],
        caption: "Sources: Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 34 LIPP (cantonal); GeTax 2025 help, AFC Geneva (federal).",
      },
      {
        type: "p",
        text: "Each year and for each property, you can choose between the flat rate and **actual costs**. Choosing « Effectif » opens two screens: « Frais et taxes effectifs » and « Frais d'entretien effectifs ». Deductible items include repairs and renovations that do not increase the property's value, payments to a condominium renovation fund, building insurance premiums, third-party management fees and energy-saving investments (carried forward over the next two years if they exceed the year's income). Keep the invoices; do not send them.",
      },

      { type: "h2", id: "iic", text: "Complementary property tax" },
      {
        type: "p",
        text: "Geneva levies an annual complementary property tax (« impôt immobilier complémentaire », IIC) on the tax value, without deducting debts: **1‰** in general, **0.2‰** for an individual's main residence. It counts as a deductible upkeep cost when you claim actual costs. A 20-year exemption is possible for a high or very high energy performance building (OCEN certificate).",
      },

      { type: "h2", id: "locataires", text: "Tenants" },
      {
        type: "p",
        text: "Rent for your home is not deductible in Geneva, and GeTax no longer asks for it since the 2025 version. Only **housing allowances** from the OCLPF are declared (code 16.35), plus any subletting income.",
      },

      { type: "h2", id: "avenir", text: "What about abolishing imputed rental value?" },
      {
        type: "p",
        text: "Approved in a federal vote, the reform takes effect on **1 January 2029** (Federal Council decision of 1 April 2026). Until then, imputed rental value and the deductions for upkeep and mortgage interest continue to apply as today, including in the 2026 return.",
      },
    ],
    faq: [
      {
        q: "What is the upkeep flat rate in Geneva in 2026?",
        a: "For cantonal tax, 15% of the reduced rental value if the building is 10 years old or less at the start of the year, 25% beyond. For federal tax, 10% or 20% of the gross rental value.",
      },
      {
        q: "What is Geneva's 4% reduction?",
        a: "For an owner-occupied home, the tax value and the cantonal rental value fall by 4% per year of continuous occupation, up to 40% after ten years. GeTax computes it from the occupation date.",
      },
      {
        q: "Where do I find my property's tax value and rental value?",
        a: "On the property notice the AFC sends to owners. For houses and condominiums, the tax value is indexed every year since 2026 and notified before 31 March.",
      },
      {
        q: "Do I have to declare a flat abroad?",
        a: "Yes. It is not taxed in Geneva but counts for the tax rate. Declare its value and rental value in francs at the tax year's exchange rate.",
      },
    ],
  },
};
