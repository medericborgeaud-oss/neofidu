import type { GuideChapter } from "../../types";

export const immeubles: GuideChapter = {
  slug: "immeubles",
  readTime: 7,
  fr: {
    title: "Immeubles dans JuraTax : la formule 4, valeur locative, forfait de 10 % ou 20 % et frais d'entretien",
    navTitle: "Immeubles",
    metaTitle: "JuraTax : immeubles (formule 4), valeur locative et entretien",
    metaDescription:
      "Déclarer un immeuble dans JuraTax : formule 4 par bien-fonds, loyers et valeur locative (codes 300 et 310), valeur officielle (700, 702), immeubles hors canton (892, 894), forfait d'entretien de 10 % ou 20 %, frais effectifs, taxe immobilière, économies d'énergie, photovoltaïque et location de vacances.",
    keywords: [
      "juratax immeuble",
      "formule 4 jura",
      "valeur locative jura",
      "frais d'entretien immeuble jura",
      "forfait entretien 20 % jura",
      "photovoltaïque déduction impôt jura",
    ],
    summary: [
      "Remplissez une **formule 4** « Rendement immobilier » pour **chaque bien-fonds**. Le rendement net passe au **code 300**, un excédent de dépenses au **code 310**.",
      "Chaque année et pour chaque immeuble, choisissez entre le **forfait** (**10 %** du rendement brut si le bâtiment a 10 ans au plus, **20 %** sinon) et les **frais effectifs** selon la date des factures.",
      "Avec le forfait, la **taxe immobilière** n'est plus déductible ; avec les frais effectifs, elle l'est en plus.",
      "La fortune immobilière jurassienne se déclare à la **valeur officielle** (codes 700 et 702) ; un immeuble dans un autre canton ou à l'étranger (892, 894) compte pour le taux.",
    ],
    blocks: [
      { type: "h2", id: "formule-4", text: "Rendement : loyers et valeur locative (formule 4)" },
      {
        type: "p",
        text: "Le **rendement immobilier** comprend les **loyers effectivement encaissés**, sans les acomptes de chauffage et d'eau chaude, l'affermage et tout autre droit de jouissance. Pour le logement que vous occupez vous-même, c'est la **valeur locative** qui est imposée. Un immeuble loué à un prix de faveur, par exemple à un proche, est imposé au minimum sur la valeur locative. Un abattement pour sous-utilisation n'est possible que si une partie de l'immeuble n'est **plus utilisée du tout** ; une chambre d'amis ou les pièces des enfants partis ne suffisent pas, pas plus qu'une résidence secondaire.",
      },
      {
        type: "screenshot",
        file: "08-formule-4.webp",
        alt: "Écran Données de référence (immeubles) de JuraTax 2025 : immeuble bâti, lieu de situation (Jura, autre canton, étranger), commune, âge du bâtiment, achat ou vente en 2025, valeur officielle, installation photovoltaïque",
        caption: "Chaque immeuble commence par ses données : lieu, âge du bâtiment (pas l'année), valeur officielle et photovoltaïque (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "08-selection-rendements.webp",
        alt: "Écran Sélection des rendements et charges de JuraTax 2025 : valeur locative, droit d'habitation, loyers encaissés, location de vacances, fermages, frais d'exploitation et d'entretien effectifs",
        caption: "Puis la sélection des rendements et charges de l'immeuble (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["Code", "Ce qui s'y reporte"],
        rows: [
          ["300", "Rendement net de la fortune immobilière privée"],
          ["310", "Excédent de dépenses de la fortune immobilière privée (joindre toutes les factures)"],
          ["320, 330", "Rendement net ou excédent de dépenses des immeubles commerciaux"],
          ["700", "Valeur officielle des immeubles dans la commune de domicile"],
          ["702", "Valeur officielle des immeubles dans d'autres communes jurassiennes"],
          ["708, 710", "Immeubles commerciaux, immeubles agricoles des exploitants"],
          ["892", "Immeubles dans d'autres cantons, à la valeur fiscale fixée par ce canton"],
          ["894", "Immeubles à l'étranger"],
        ],
        caption: "Source : Déclaration des personnes physiques 2025 et Guide général 2025, page 38, Service des contributions du canton du Jura.",
      },

      { type: "h2", id: "entretien", text: "Forfait ou frais effectifs d'entretien" },
      {
        type: "table",
        head: ["Option", "Règle"],
        rows: [
          ["Forfait (code 4300)", "10 % du rendement locatif brut ou de la valeur locative si le bâtiment a **10 ans au plus** à la fin de l'année fiscale, **20 %** dans les autres cas. Il couvre tous les frais et assurances"],
          ["Frais effectifs (code 4320)", "Frais d'entretien facturés en 2026 : la **date de la facture** est déterminante ; les acomptes ne sont pas déductibles"],
          ["Changement", "Le choix est libre **chaque année et pour chaque immeuble**"],
          ["Exception", "Immeuble privé loué à des tiers principalement à des fins commerciales : frais effectifs uniquement"],
        ],
        caption: "Source : formule 4 « Rendement immobilier » 2025, explications concernant le rendement et les frais d'entretien, Service des contributions du canton du Jura.",
      },
      {
        type: "list",
        items: [
          "**Déductibles** : réparations, remise en état périodique (peinture, tapisseries, façades), rénovations sans plus-value, contributions au fonds de rénovation d'une PPE, entretien des aménagements extérieurs fixes (clôtures).",
          "**Non déductibles** : tonte du gazon, taille des arbres et des haies, déneigement, jardin potager, travaux qui créent une plus-value (abattre une cloison, ajouter des fenêtres, aménager les combles, agrandir le volume chauffé), frais d'achat ou de vente (droits de mutation, courtage).",
          "**Taxe immobilière** : elle n'est plus déductible en plus du forfait. Avec les frais effectifs, elle reste déductible en plus.",
          "**Justificatifs** : joignez les copies des **factures finales de plus de CHF 1'000** si vous déduisez des frais effectifs, et **toutes** les factures en cas d'excédent de dépenses (code 310). Les tickets de caisse ne valent que s'ils identifient l'achat et les travaux.",
        ],
      },
      {
        type: "screenshot",
        file: "08-frais-entretien.webp",
        alt: "Écran Récapitulatif des frais d'entretien de JuraTax 2025 : frais d'entretien, frais d'économie d'énergie 2025, report des frais d'énergie non absorbés 2024, déduction forfaitaire, choix entre forfait et frais effectifs",
        caption: "Le récapitulatif compare frais effectifs et forfait ; c'est ici que vous choisissez (JuraTax 2025)",
      },

      { type: "h2", id: "energie", text: "Économies d'énergie, photovoltaïque et batteries" },
      {
        type: "p",
        text: "Les investissements qui économisent l'énergie ou recourent aux **énergies renouvelables** sont en principe **déductibles intégralement**, après déduction des subventions : isolation de la toiture, des façades ou du plafond de la cave, remplacement d'un chauffage fossile par une **pompe à chaleur** ou un chauffage au bois, raccordement au chauffage à distance, installations **solaires photovoltaïques** et, depuis 2024, **batteries statiques** qui les complètent. Ils ne le sont **pas** lorsqu'ils sont engagés lors de la construction ou dans les **2 ans** qui suivent la construction, l'agrandissement ou une transformation fondamentale. Les **bornes de recharge** ne sont pas déductibles. Si ces frais dépassent votre revenu imposable de l'année, la part **non absorbée** se reporte sur l'année suivante : JuraTax prévoit une ligne « Report des frais d'économie d'énergie non absorbés », à reprendre de votre dernière décision de taxation.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Déclarez la vente d'électricité",
        text: "Le revenu de la **vente d'énergie** produite par vos panneaux photovoltaïques est imposable chaque année : déclarez-le au **code 4180** de la formule 4 et joignez le décompte annuel du fournisseur. Votre propre consommation ne se déduit pas de ce montant.",
      },
      {
        type: "p",
        text: "Les **frais de démolition** en vue d'une construction de remplacement se déclarent l'année de leur facturation, dans la colonne « économie d'énergie » de la formule 4. Si la nouvelle construction n'est pas réalisée dans les deux ans, la déduction est annulée après coup.",
      },

      { type: "h2", id: "cas-particuliers", text: "Location de vacances, usufruit, autres cantons" },
      {
        type: "list",
        items: [
          "**Location d'un logement ou de chambres de vacances** : les recettes sont imposables. Un forfait de **20 % des recettes**, au maximum **CHF 3'000**, couvre les frais généraux et l'usure. Pour le reste de l'année, ajoutez la valeur locative au prorata.",
          "**Usufruit** : revenu et fortune de l'immeuble se déclarent chez l'**usufruitier**.",
          "**Droit d'habitation** : le bénéficiaire déclare sa valeur au code 360. Le propriétaire réduit la valeur officielle d'un multiple du loyer annuel selon l'âge du plus jeune bénéficiaire (20 jusqu'à 30 ans, 9 de 61 à 70 ans, 4 au-delà de 80 ans) et joint une feuille avec les noms et adresses des bénéficiaires.",
          "**Vente ou donation en 2026** : déclarez le rendement jusqu'au transfert de propriété. Le gain immobilier fait l'objet d'une imposition séparée.",
          "**Immeuble dans une autre commune jurassienne** : rien à faire ; votre commune de domicile en reverse une part forfaitaire à la commune de situation.",
          "**Immeuble dans un autre canton ou à l'étranger** : déclarez le rendement et la valeur ; ils ne sont pas imposés dans le Jura mais comptent pour le taux. Joignez l'acte en cas d'achat ou de vente en 2026.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Valeur locative : jusqu'en 2028",
        text: "La suppression de la valeur locative votée au niveau fédéral entre en vigueur le **1er janvier 2029**. Jusqu'à la déclaration 2028, la valeur locative reste imposable et les frais d'entretien restent déductibles.",
      },
    ],
    faq: [
      {
        q: "Forfait de 10 % ou de 20 % dans le canton du Jura ?",
        a: "10 % du rendement brut ou de la valeur locative si le bâtiment a 10 ans au plus à la fin de l'année fiscale, 20 % s'il est plus ancien. Vous pouvez choisir chaque année, pour chaque immeuble, entre le forfait et les frais effectifs.",
      },
      {
        q: "La taxe immobilière est-elle déductible dans le Jura ?",
        a: "Seulement si vous déduisez les frais effectifs d'entretien. Avec le forfait, elle n'est plus déductible en plus.",
      },
      {
        q: "Des panneaux solaires sont-ils déductibles dans le canton du Jura ?",
        a: "Oui, entièrement, sur un immeuble privé existant et après déduction des subventions, de même que les batteries statiques depuis 2024. Ils ne le sont pas s'ils sont posés lors de la construction ou dans les deux ans qui suivent. La vente d'électricité est imposable (code 4180).",
      },
      {
        q: "Faut-il déclarer un appartement en France ou dans un autre canton ?",
        a: "Oui. Son rendement et sa valeur ne sont pas imposés dans le Jura, mais ils servent à déterminer le taux d'imposition. Utilisez les codes 892 (autre canton) ou 894 (étranger).",
      },
    ],
  },
  en: {
    title: "Property in JuraTax: form 4, imputed rent, 10% or 20% flat rate and upkeep costs",
    navTitle: "Property",
    metaTitle: "JuraTax: property (form 4), imputed rent and upkeep",
    metaDescription:
      "Declare property in JuraTax: one form 4 per property, rent and imputed rent (codes 300 and 310), official value (700, 702), property outside the canton (892, 894), 10% or 20% upkeep flat rate, actual costs, property tax, energy savings, solar panels and holiday lets.",
    keywords: [
      "juratax property",
      "jura form 4",
      "imputed rent jura",
      "property upkeep deduction jura",
      "20% flat rate upkeep jura",
      "solar panels tax deduction jura",
    ],
    summary: [
      "Fill in one **form 4** « Rendement immobilier » (property income) for **each property**. Net income goes to **code 300**, an excess of expenses to **code 310**.",
      "Every year and for each property, choose between the **flat rate** (**10%** of gross income if the building is 10 years old or less, **20%** otherwise) and **actual costs** by invoice date.",
      "With the flat rate, **property tax** (« taxe immobilière ») is no longer deductible; with actual costs, it is deductible on top.",
      "Jura property is declared at its **official value** (codes 700 and 702); property in another canton or abroad (892, 894) counts towards the rate.",
    ],
    blocks: [
      { type: "h2", id: "formule-4", text: "Income: rent and imputed rent (form 4)" },
      {
        type: "p",
        text: "**Property income** includes **rent actually received**, excluding heating and hot water charges, farm leases and any other right of use. For a home you live in yourself, the **imputed rent** (« valeur locative ») is taxed. Property let at a favourable rent, for example to a relative, is taxed at least on the imputed rent. A reduction for under-use is only possible if part of the property is **no longer used at all**; a guest room, rooms left by children who moved out or a second home do not qualify.",
      },
      {
        type: "screenshot",
        file: "08-formule-4.webp",
        alt: "JuraTax 2025 property reference data screen: built property, location (Jura, other canton, abroad), municipality, building age, purchase or sale in 2025, official value, solar panels",
        caption: "Each property starts with its data: location, building age (not the year), official value and solar panels (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "08-selection-rendements.webp",
        alt: "JuraTax 2025 income and charges selection screen: imputed rent, right of residence, rents received, holiday lets, farm leases, actual operating and upkeep costs",
        caption: "Then select the property's income and charges (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["Code", "What goes there"],
        rows: [
          ["300", "Net income from private property"],
          ["310", "Excess of expenses on private property (enclose all invoices)"],
          ["320, 330", "Net income or excess of expenses on business property"],
          ["700", "Official value of property in your municipality of residence"],
          ["702", "Official value of property in other Jura municipalities"],
          ["708, 710", "Business property, farm property of farmers"],
          ["892", "Property in other cantons, at the tax value set by that canton"],
          ["894", "Property abroad"],
        ],
        caption: "Source: 2025 individual tax return and 2025 general guide, page 38, Jura Service des contributions.",
      },

      { type: "h2", id: "entretien", text: "Flat rate or actual upkeep costs" },
      {
        type: "table",
        head: ["Option", "Rule"],
        rows: [
          ["Flat rate (code 4300)", "10% of gross rental income or imputed rent if the building is **10 years old or less** at the end of the tax year, **20%** otherwise. It covers all costs and insurance"],
          ["Actual costs (code 4320)", "Upkeep costs invoiced in 2026: the **invoice date** counts; advance payments are not deductible"],
          ["Switching", "You can choose freely **every year and for each property**"],
          ["Exception", "Private property let to third parties mainly for business use: actual costs only"],
        ],
        caption: "Source: 2025 form 4 « Rendement immobilier », notes on property income and upkeep costs, Jura Service des contributions.",
      },
      {
        type: "list",
        items: [
          "**Deductible**: repairs, periodic refurbishment (painting, wallpaper, façades), renovations without added value, contributions to a condominium's renovation fund, upkeep of fixed outdoor fittings (fences).",
          "**Not deductible**: lawn mowing, pruning trees and hedges, snow clearing, vegetable gardens, work that adds value (removing a wall, adding windows, converting the attic, enlarging the heated volume), purchase or sale costs (transfer duties, brokerage).",
          "**Property tax**: no longer deductible on top of the flat rate. With actual costs, it remains deductible on top.",
          "**Supporting documents**: enclose copies of **final invoices above CHF 1,000** if you deduct actual costs, and **all** invoices if you have an excess of expenses (code 310). Till receipts only count if they identify the purchase and the work.",
        ],
      },
      {
        type: "screenshot",
        file: "08-frais-entretien.webp",
        alt: "JuraTax 2025 upkeep costs summary: upkeep costs, 2025 energy-saving costs, carry-forward of unabsorbed 2024 energy costs, flat-rate deduction, choice between flat rate and actual costs",
        caption: "The summary compares actual costs and the flat rate; this is where you choose (JuraTax 2025)",
      },

      { type: "h2", id: "energie", text: "Energy savings, solar panels and batteries" },
      {
        type: "p",
        text: "Investments that save energy or use **renewable energy** are in principle **fully deductible**, after subtracting subsidies: insulating the roof, façades or cellar ceiling, replacing fossil heating with a **heat pump** or wood heating, connecting to district heating, **solar photovoltaic** systems and, since 2024, the **stationary batteries** that complement them. They are **not** deductible when incurred during construction or within **2 years** of construction, extension or a fundamental conversion. **EV charging stations** are not deductible. If these costs exceed your taxable income for the year, the **unabsorbed** part is carried forward to the following year: JuraTax has a line for it (« Report des frais d'économie d'énergie non absorbés »), taken from your last assessment.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Declare electricity sales",
        text: "Income from **selling energy** produced by your solar panels is taxable every year: declare it under **code 4180** of form 4 and enclose the buyer's annual statement. Your own consumption is not subtracted from this amount.",
      },
      {
        type: "p",
        text: "**Demolition costs** for a replacement building are declared in the year they are invoiced, in the « économie d'énergie » (energy saving) column of form 4. If the new building is not completed within two years, the deduction is cancelled retroactively.",
      },

      { type: "h2", id: "cas-particuliers", text: "Holiday lets, usufruct, other cantons" },
      {
        type: "list",
        items: [
          "**Letting a holiday home or rooms**: income is taxable. A flat rate of **20% of receipts**, up to **CHF 3,000**, covers overheads and wear. For the rest of the year, add the imputed rent pro rata.",
          "**Usufruct**: income and wealth from the property are declared by the **usufructuary**.",
          "**Right of residence** (« droit d'habitation »): the beneficiary declares its value under code 360. The owner reduces the official value by a multiple of the annual rent depending on the youngest beneficiary's age (20 up to age 30, 9 from 61 to 70, 4 above 80) and encloses a sheet with the beneficiaries' names and addresses.",
          "**Sale or gift in 2026**: declare income up to the transfer of ownership. The property gain is taxed separately.",
          "**Property in another Jura municipality**: nothing to do; your municipality of residence passes a flat share on to the municipality where it is located.",
          "**Property in another canton or abroad**: declare income and value; they are not taxed in Jura but count towards the rate. Enclose the deed for a purchase or sale in 2026.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Imputed rent: until 2028",
        text: "The abolition of imputed rent voted at federal level takes effect on **1 January 2029**. Up to the 2028 return, imputed rent remains taxable and upkeep costs remain deductible.",
      },
    ],
    faq: [
      {
        q: "10% or 20% flat rate in Jura?",
        a: "10% of gross income or imputed rent if the building is 10 years old or less at the end of the tax year, 20% if older. You can choose each year, for each property, between the flat rate and actual costs.",
      },
      {
        q: "Is property tax (taxe immobilière) deductible in Jura?",
        a: "Only if you deduct actual upkeep costs. With the flat rate, it is no longer deductible on top.",
      },
      {
        q: "Are solar panels tax-deductible in Jura?",
        a: "Yes, fully, on an existing private building and after subsidies, as are stationary batteries since 2024. They are not deductible if installed during construction or within the following two years. Electricity sales are taxable (code 4180).",
      },
      {
        q: "Do I declare a flat in France or in another canton?",
        a: "Yes. Its income and value are not taxed in Jura, but they are used to set your tax rate. Use codes 892 (other canton) or 894 (abroad).",
      },
    ],
  },
};
