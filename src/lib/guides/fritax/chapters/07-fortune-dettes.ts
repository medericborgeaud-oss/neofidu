import type { GuideChapter } from "../../types";

export const fortuneDettes: GuideChapter = {
  slug: "fortune-dettes",
  readTime: 6,
  fr: {
    title: "Fortune et dettes dans FriTax : véhicules, assurances-vie, état des dettes (annexe 02) et intérêts",
    navTitle: "Fortune et dettes",
    metaTitle: "FriTax : déclarer voiture, assurance-vie, dettes et intérêts passifs (2026)",
    metaDescription:
      "Autres éléments de fortune dans FriTax (codes 3.510 à 3.570 : voiture, assurances-vie avec valeur de rachat, collections), état des dettes (annexe 02), intérêts passifs privés (4.210) plafonnés au rendement de la fortune plus CHF 50'000, et déduction sociale sur la fortune.",
    keywords: [
      "fritax fortune",
      "état des dettes fribourg",
      "intérêts passifs déduction fribourg",
      "voiture fortune impôt fribourg",
      "assurance vie valeur de rachat fribourg",
      "impôt sur la fortune fribourg",
    ],
    summary: [
      "**Voiture, bateau** (code **3.510**) : valeur vénale ; en règle générale 30 % d'amortissement la première année, puis 20 % du solde par an.",
      "**Assurances-vie avec valeur de rachat** (code **3.520**) : valeur attestée au 31 décembre, après avoir rempli la rubrique **A « Assurances »**. Le mobilier de ménage n'est pas imposable.",
      "**Dettes** : dans l'**état des dettes (annexe 02)**, avec nom et adresse du créancier. Les intérêts passifs privés (**4.210**) sont déductibles jusqu'au rendement brut de la fortune **plus CHF 50'000**.",
      "La **déduction sociale sur la fortune** est de **CHF 55'000** pour une personne seule et **CHF 105'000** pour un couple ou une famille, dégressive.",
    ],
    blocks: [
      { type: "h2", id: "autres-elements", text: "Autres éléments de fortune (codes 3.510 à 3.570)" },
      {
        type: "table",
        head: ["Élément", "Code", "Valeur à déclarer"],
        rows: [
          ["Voitures, motos, bateaux", "3.510", "Valeur vénale ; en règle générale prix d'achat moins 30 % la 1re année, puis 20 % du solde chaque année"],
          ["Assurances-vie et de rentes avec valeur de rachat", "3.520", "Valeur de rachat (participations aux excédents comprises) attestée au 31 décembre 2026"],
          ["Collections, œuvres d'art, bijoux, chevaux de selle", "3.530", "Valeur vénale"],
          ["Fortune mobilière placée dans une exploitation", "3.570", "Selon l'annexe 05 (indépendants) ou 06 (agriculteurs)"],
          ["Mobilier de ménage", "Aucun", "Non imposable"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, codes 3.510 à 3.570.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Rubrique A « Assurances » : aussi pour les polices sans valeur de rachat",
        text: "Avant d'inscrire un montant sous le code 3.520, remplissez la rubrique **A « Assurances »** de la dernière page. Mentionnez-y aussi les assurances **sans valeur de rachat** (risque pur, rentes sans remboursement du capital) : c'est ce qui permet de déduire leurs primes sous le code 4.120 (voir [Déductions](/guide/fritax/deductions)). Les avoirs du 2e pilier et du 3e pilier A ne s'y déclarent pas.",
      },
      {
        type: "screenshot",
        file: "07-assurances.webp",
        alt: "Rubrique A Assurances de FriTax : compagnie, numéro de police, type d'assurance, primes payées et valeur de rachat",
        caption: "La rubrique A sert à la fois à la fortune (3.520) et à la déduction des primes (4.120) (FriTax 2025, données fictives)",
      },

      { type: "h2", id: "dettes", text: "L'état des dettes (annexe 02)" },
      { type: "path", items: ["Formulaires", "Etat des dettes"] },
      {
        type: "p",
        text: "Inscrivez chaque dette privée avec le **nom et l'adresse exacte du créancier** (en Suisse ou à l'étranger), le **solde au 31 décembre 2026** et les **intérêts échus en 2026**, et joignez les relevés ou attestations. Une dette non prouvée ou sans créancier identifié n'est pas admise. Distinguez bien les dettes privées des **dettes commerciales** (code 4.220), qui comptent pour le calcul des cotisations AVS des indépendants.",
      },
      {
        type: "screenshot",
        file: "07-etat-des-dettes.webp",
        alt: "État des dettes de FriTax : créancier, adresse, solde au 31 décembre et intérêts payés",
        caption: "L'annexe 02 : créancier, garanties, taux, intérêts 2025 et dette au 31 décembre ; le total part sous le code 4.210 (FriTax 2025)",
      },

      { type: "h2", id: "interets", text: "Intérêts passifs privés (code 4.210)" },
      {
        type: "list",
        items: [
          "**Déductibles** : intérêts hypothécaires et autres intérêts passifs échus en 2026, frais et commissions liés, intérêts de retard, frais bancaires des comptes courants.",
          "**Plafond** : le rendement brut de la fortune mobilière et immobilière privée (codes 3.210, 3.240, 3.250, 3.310, 3.340 et 3.350) **plus CHF 50'000**. Les rendements de participations qualifiées ne comptent qu'à 70 %.",
          "**Non déductibles** : les intérêts d'un crédit de construction et ses commissions, l'amortissement de la dette, le leasing privé, les frais d'administration des titres et du compte salaire (qui vont sous 4.320).",
          "Si vous avez de la fortune imposable dans un autre canton ou à l'étranger, les dettes et intérêts sont répartis en proportion.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Crédit de construction : quand les intérêts deviennent-ils déductibles ?",
        text: "Pendant la construction, les intérêts du crédit de construction font partie du coût de l'immeuble et ne se déduisent pas. Dès la consolidation en hypothèque, les intérêts hypothécaires deviennent déductibles sous le code 4.210.",
      },

      { type: "h2", id: "impot-fortune", text: "Fortune nette, déduction sociale et barème" },
      {
        type: "p",
        text: "La **fortune nette** correspond à la fortune brute moins les dettes. Le canton de Fribourg en déduit ensuite une **déduction sociale sur la fortune** (code 7.110), calculée automatiquement par FriTax :",
      },
      {
        type: "table",
        head: ["Situation", "Déduction", "Réduction"],
        rows: [
          ["Personne seule sans enfant à charge", "CHF 55'000 si la fortune nette ne dépasse pas CHF 75'000", "CHF 10'000 de moins par tranche de CHF 25'000 en plus ; nulle dès CHF 200'001"],
          ["Couple marié ou personne seule avec enfant à charge", "CHF 105'000 si la fortune nette ne dépasse pas CHF 125'000", "CHF 20'000 de moins par tranche de CHF 35'000 en plus ; nulle dès CHF 300'001"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, code 7.110 ; Feuille cantonale Fribourg, AFC, février 2026 (art. 61 LICD).",
      },
      {
        type: "p",
        text: "L'impôt cantonal de base sur la fortune est progressif, de **0,5 ‰** pour les premiers CHF 50'000 à 3,7 ‰ pour la tranche de CHF 1 à 1,2 million. Au-delà de CHF 1,2 million de fortune imposable, l'ensemble de la fortune est imposé à **2,9 ‰**. Il est multiplié par le coefficient cantonal de 96 %, puis s'y ajoutent l'impôt communal et paroissial. L'impôt fédéral direct ne frappe pas la fortune.",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer sa voiture dans le canton de Fribourg ?",
        a: "Oui, sous le code 3.510, à sa valeur vénale. En règle générale, on admet 30 % d'amortissement sur le prix d'achat la première année, puis 20 % du solde chaque année suivante.",
      },
      {
        q: "Les intérêts hypothécaires sont-ils entièrement déductibles ?",
        a: "Oui, dans la limite du rendement brut de votre fortune privée (y compris la valeur locative) augmenté de CHF 50'000. Les intérêts d'un crédit de construction ne sont pas déductibles.",
      },
      {
        q: "Le 3e pilier fait-il partie de la fortune imposable ?",
        a: "Non. Avant leur versement, les avoirs du 2e pilier et du 3e pilier A ne sont pas soumis à l'impôt sur la fortune. Seules les assurances-vie du 3e pilier B avec valeur de rachat se déclarent sous le code 3.520.",
      },
      {
        q: "À partir de quelle fortune paie-t-on l'impôt sur la fortune dans le canton de Fribourg ?",
        a: "Grâce à la déduction sociale, une personne seule ne paie rien jusqu'à CHF 55'000 de fortune nette environ, et un couple jusqu'à CHF 105'000 environ. La déduction diminue ensuite et disparaît dès CHF 200'001 (personne seule) ou CHF 300'001 (couple).",
      },
    ],
  },
  en: {
    title: "Wealth and debts in FriTax: vehicles, life insurance, the debts list (schedule 02) and interest",
    navTitle: "Wealth and debts",
    metaTitle: "FriTax: declaring your car, life insurance, debts and interest paid (2026)",
    metaDescription:
      "Other assets in FriTax (codes 3.510 to 3.570: car, life insurance with surrender value, collections), the debts list (schedule 02), private interest paid (4.210) capped at investment income plus CHF 50,000, and the social deduction on wealth.",
    keywords: [
      "fritax wealth",
      "fribourg debts list",
      "interest deduction fribourg",
      "car wealth tax fribourg",
      "life insurance surrender value fribourg",
      "wealth tax fribourg",
    ],
    summary: [
      "**Car, boat** (code **3.510**): market value; as a rule 30% depreciation in the first year, then 20% of the remaining value per year.",
      "**Life insurance with a surrender value** (code **3.520**): value certified at 31 December, after filling in section **A « Assurances »** (insurance). Household furniture is not taxable.",
      "**Debts**: in the **debts list (schedule 02, « Etat des dettes »)**, with the creditor's name and address. Private interest paid (**4.210**) is deductible up to gross investment income **plus CHF 50,000**.",
      "The **social deduction on wealth** is **CHF 55,000** for a single person and **CHF 105,000** for a couple or family, tapering off.",
    ],
    blocks: [
      { type: "h2", id: "autres-elements", text: "Other assets (codes 3.510 to 3.570)" },
      {
        type: "table",
        head: ["Asset", "Code", "Value to declare"],
        rows: [
          ["Cars, motorbikes, boats", "3.510", "Market value; as a rule purchase price less 30% in year 1, then 20% of the remaining value each year"],
          ["Life and annuity insurance with a surrender value", "3.520", "Surrender value (including profit shares) certified at 31 December 2026"],
          ["Collections, works of art, jewellery, riding horses", "3.530", "Market value"],
          ["Movable assets invested in a business", "3.570", "Per schedule 05 (self-employed) or 06 (farmers)"],
          ["Household furniture", "None", "Not taxable"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, codes 3.510 to 3.570.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Section A « Assurances »: include policies with no surrender value too",
        text: "Before entering an amount under code 3.520, fill in section **A « Assurances »** on the last page. Also list policies **without a surrender value** (pure risk, annuities without capital repayment): this is what lets you deduct their premiums under code 4.120 (see [Deductions](/guide/fritax/deductions)). 2nd pillar and pillar 3a assets are not declared here.",
      },
      {
        type: "screenshot",
        file: "07-assurances.webp",
        alt: "FriTax section A Assurances: insurer, policy number, type of insurance, premiums paid and surrender value",
        caption: "Section A is used both for wealth (3.520) and for the premium deduction (4.120) (FriTax 2025, fictitious data)",
      },

      { type: "h2", id: "dettes", text: "The debts list (schedule 02)" },
      { type: "path", items: ["Formulaires", "Etat des dettes"] },
      {
        type: "p",
        text: "Enter each private debt with the **creditor's name and exact address** (in Switzerland or abroad), the **balance at 31 December 2026** and the **interest due in 2026**, and attach statements or certificates. A debt that is not proven or has no identified creditor is not accepted. Keep private debts clearly separate from **business debts** (code 4.220), which count for the self-employed's AHV contributions.",
      },
      {
        type: "screenshot",
        file: "07-etat-des-dettes.webp",
        alt: "FriTax debts list: creditor, address, balance at 31 December and interest paid",
        caption: "Schedule 02: creditor, collateral, rate, 2025 interest and debt at 31 December; the total goes to code 4.210 (FriTax 2025)",
      },

      { type: "h2", id: "interets", text: "Private interest paid (code 4.210)" },
      {
        type: "list",
        items: [
          "**Deductible**: mortgage and other interest due in 2026, related fees and commissions, late-payment interest, current account bank charges.",
          "**Cap**: gross income from private movable and immovable assets (codes 3.210, 3.240, 3.250, 3.310, 3.340 and 3.350) **plus CHF 50,000**. Income from qualifying holdings only counts at 70%.",
          "**Not deductible**: interest and commissions on a construction loan, debt repayments, private leasing, securities administration and salary account fees (which go under 4.320).",
          "If you have taxable assets in another canton or abroad, debts and interest are split proportionally.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Construction loan: when does interest become deductible?",
        text: "During construction, interest on the construction loan is part of the cost of the building and is not deductible. Once the loan is converted into a mortgage, mortgage interest becomes deductible under code 4.210.",
      },

      { type: "h2", id: "impot-fortune", text: "Net wealth, social deduction and tax scale" },
      {
        type: "p",
        text: "**Net wealth** is gross wealth less debts. Fribourg then subtracts a **social deduction on wealth** (code 7.110), worked out automatically by FriTax:",
      },
      {
        type: "table",
        head: ["Situation", "Deduction", "Tapering"],
        rows: [
          ["Single person without dependent children", "CHF 55,000 if net wealth does not exceed CHF 75,000", "CHF 10,000 less per additional CHF 25,000; nil from CHF 200,001"],
          ["Married couple or single person with dependent child", "CHF 105,000 if net wealth does not exceed CHF 125,000", "CHF 20,000 less per additional CHF 35,000; nil from CHF 300,001"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, code 7.110; Feuille cantonale Fribourg, Federal Tax Administration, February 2026 (art. 61 LICD).",
      },
      {
        type: "p",
        text: "Basic cantonal wealth tax is progressive, from **0.5‰** on the first CHF 50,000 to 3.7‰ on the band from CHF 1 to 1.2 million. Above CHF 1.2 million of taxable wealth, the whole amount is taxed at **2.9‰**. It is multiplied by the cantonal multiplier of 96%, then municipal and parish tax are added. Direct federal tax does not tax wealth.",
      },
    ],
    faq: [
      {
        q: "Do I need to declare my car in Fribourg?",
        a: "Yes, under code 3.510, at market value. As a rule, 30% depreciation on the purchase price is accepted in the first year, then 20% of the remaining value each following year.",
      },
      {
        q: "Is mortgage interest fully deductible?",
        a: "Yes, up to the gross income from your private assets (including imputed rent) plus CHF 50,000. Interest on a construction loan is not deductible.",
      },
      {
        q: "Is pillar 3a part of taxable wealth?",
        a: "No. Before they are paid out, 2nd pillar and pillar 3a assets are not subject to wealth tax. Only pillar 3b life insurance with a surrender value is declared under code 3.520.",
      },
      {
        q: "From what level of wealth do you pay wealth tax in Fribourg?",
        a: "Thanks to the social deduction, a single person pays nothing up to about CHF 55,000 of net wealth, and a couple up to about CHF 105,000. The deduction then decreases and disappears from CHF 200,001 (single) or CHF 300,001 (couple).",
      },
    ],
  },
};
