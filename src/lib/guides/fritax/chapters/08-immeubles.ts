import type { GuideChapter } from "../../types";

export const immeubles: GuideChapter = {
  slug: "immeubles",
  readTime: 8,
  fr: {
    title: "Immeubles dans FriTax : valeur locative, valeur fiscale, loyers et frais d'entretien (annexe 04)",
    navTitle: "Immeubles",
    metaTitle: "FriTax 2026 : valeur locative, frais d'entretien 10 % ou 20 % et travaux énergétiques",
    metaDescription:
      "Remplir l'état des immeubles de FriTax (annexe 04) : valeur locative et valeur fiscale (code 3.310), nouveaux propriétaires, loyers encaissés et location meublée (3.340), forfait d'entretien de 10 % ou 20 % (4.310), investissements énergétiques (4.311) et immeubles hors canton.",
    keywords: [
      "fritax immeuble",
      "valeur locative fribourg",
      "frais d'entretien immeuble fribourg forfait",
      "déduction travaux énergie fribourg",
      "valeur fiscale immeuble fribourg",
      "location meublée impôt fribourg",
    ],
    summary: [
      "Tout propriétaire remplit l'**état des immeubles (annexe 04)**. Pour le logement que vous occupez, déclarez la **valeur locative** (revenu) et la **valeur fiscale** (fortune) de votre dernier avis de taxation, sous le **code 3.310**.",
      "Nouveaux propriétaires depuis le 1er janvier 2026 ou travaux d'agrandissement : remplissez le **questionnaire d'immeubles** du SCC.",
      "Frais d'entretien (**4.310**) : chaque année et pour chaque immeuble, au choix **forfait** (10 % du rendement brut pour un immeuble construit après 2015, 20 % sinon) ou **frais effectifs**.",
      "Investissements pour économiser l'énergie (**4.311**) : déductibles à **100 %**, seulement avec les frais effectifs, reportables sur les deux années suivantes.",
    ],
    blocks: [
      { type: "h2", id: "annexe-04", text: "L'état des immeubles (annexe 04)" },
      { type: "path", items: ["Formulaires", "Etat des immeubles"] },
      {
        type: "p",
        text: "Une ligne par immeuble : commune, article du registre foncier, part de propriété, usage (habité par vous, loué, résidence secondaire), **valeur locative** ou loyers, **valeur fiscale** et frais d'entretien. FriTax reporte les totaux sous les codes 3.310 à 3.350 (revenu et fortune) et 4.310 à 4.315 (frais). Un immeuble est soit **privé**, soit **commercial**, selon son usage prépondérant.",
      },
      {
        type: "screenshot",
        file: "08-etat-des-immeubles.webp",
        alt: "État des immeubles de FriTax : commune, article, valeur fiscale, valeur locative, loyers et frais d'entretien",
        caption: "Page 2 de l'état des immeubles : une colonne par immeuble ; ligne 17, type de frais d'entretien (10 %, 20 % ou FE pour frais effectifs) (FriTax 2025)",
      },

      { type: "h2", id: "valeur-locative", text: "Valeur locative et valeur fiscale (code 3.310)" },
      {
        type: "p",
        text: "Pour le logement que vous occupez, reprenez la **valeur locative** et la **valeur fiscale** de votre **dernier avis de taxation** : elles ont été relevées en 2014 et restent en principe actuelles. Si vous louez une partie de l'immeuble ou le sous-louez, déclarez les loyers sous le code 3.340 et la valeur locative est réduite en proportion.",
      },
      {
        type: "table",
        head: ["Situation", "Démarche"],
        rows: [
          ["Achat après le 1er janvier 2026", "Remplir le questionnaire d'immeubles avec son instruction (www.fr.ch/scc/estimation_immeubles, commune ou SCC)"],
          ["Agrandissement, rénovation intérieure, combles, couvert à voiture, piscine enterrée", "Annoncer les travaux avec le même questionnaire"],
          ["Logement durablement sous-utilisé", "Réduction possible à l'impôt fédéral direct seulement, sur requête motivée (pas pour une résidence secondaire)"],
          ["Immeuble à l'étranger", "Valeur vénale en francs, prise en compte seulement pour le taux d'imposition"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, code 3.310 et chapitre XI.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Comment le SCC calcule la valeur fiscale",
        text: "La valeur fiscale d'un immeuble privé est la moyenne pondérée entre **deux fois la valeur de rendement** (valeur locative capitalisée) et **une fois la valeur vénale** : (2 x valeur de rendement + valeur vénale) / 3. Elle est donc en général nettement inférieure au prix du marché.",
      },
      {
        type: "p",
        text: "La suppression de la valeur locative, décidée au niveau fédéral, n'entre en vigueur que le **1er janvier 2029**. Pour la déclaration 2026, la valeur locative reste imposable et les frais d'entretien et intérêts hypothécaires restent déductibles.",
      },

      { type: "h2", id: "loyers", text: "Loyers, location meublée et droit d'habitation (codes 3.340 à 3.350)" },
      {
        type: "list",
        items: [
          "**Loyers encaissés (3.340)** : montant brut, y compris la réduction accordée au concierge et les acomptes de charges non décomptés à part. Si le chauffage et les charges sont compris dans le loyer selon le bail, un forfait de **15 %** peut être déduit des loyers.",
          "**Logement de vacances meublé** : déclarez les recettes à raison de **4/5**, ou de **2/3** si vous fournissez aussi le linge. Le SCC publie une notice sur la location d'immeubles meublés et de courte durée.",
          "**Fermages (3.343)** et **droit d'habitation (3.345)** : le propriétaire d'un immeuble grevé d'un droit d'habitation déclare sa valeur sous 3.345 et la déduit comme charge durable sous 4.335 ; le bénéficiaire la déclare sous 3.410.",
          "**Autres rendements (3.350)** : revente d'électricité solaire (méthode nette : seulement si la production dépasse votre consommation, en francs), rendement des forêts, rentes de droit de superficie, rétribution unique photovoltaïque non déduite des frais.",
        ],
      },

      { type: "h2", id: "entretien", text: "Frais d'entretien : forfait ou frais effectifs (code 4.310)" },
      {
        type: "table",
        head: ["Immeuble privé", "Forfait (en % du rendement brut)"],
        rows: [
          ["Construit après le 31 décembre 2015", "10 %"],
          ["Construit avant", "20 %"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, codes 4.310 à 4.315 ; ordonnance DFIN sur la déduction des frais relatifs aux immeubles privés.",
      },
      {
        type: "p",
        text: "Le forfait se calcule sur le rendement brut total de l'immeuble (valeur locative, loyers, droit d'habitation). Vous pouvez choisir **chaque année et pour chaque immeuble** entre forfait et frais effectifs. Le forfait est exclu pour les immeubles commerciaux et agricoles, les immeubles loués surtout à des fins commerciales, les terrains non bâtis (places de parc, entrepôts) et les immeubles grevés d'un droit de superficie rémunéré.",
      },
      {
        type: "p",
        text: "Pour les **frais effectifs**, ouvrez dans FriTax « **Frais effectifs des immeubles** », « Immeuble 1 » (« Ajouter un formulaire » pour un deuxième immeuble) : c'est la **formule de répartition** du SCC, que la notice spéciale explique. La prime ECAB et les contributions immobilières de la commune y figurent déjà ; chaque facture y est numérotée, décrite et classée (entretien déductible ou plus-value non déductible), avec les copies des factures. Comptez le montant net, après rabais, escomptes, prestations d'assurance et subventions. Pour un immeuble privé, c'est la **date de paiement** qui compte. Votre propre travail n'est pas déductible.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Économies d'énergie et démolition (code 4.311)",
        text: "Les investissements destinés à **économiser l'énergie et à ménager l'environnement** (isolation, fenêtres, pompe à chaleur, panneaux photovoltaïques sur un immeuble privé) sont déductibles à **100 %**, de même que les **frais de démolition** en vue d'une construction de remplacement (à annoncer au SCC avant les travaux). Conditions : choisir les frais effectifs, et l'immeuble ne doit pas avoir moins de cinq ans. Si la déduction dépasse votre revenu de l'année, le solde se reporte sur les **deux périodes fiscales suivantes**.",
      },
      {
        type: "screenshot",
        file: "08-frais-entretien.webp",
        alt: "Saisie des frais d'entretien effectifs dans FriTax : entretien, investissements énergétiques et total reporté sous les codes 4.310 et 4.311",
        caption: "La formule de répartition : chaque facture se répartit entre plus-value, entretien (4.310) et économie d'énergie ou démolition (4.311) ; prime ECAB et contributions immobilières sont déjà listées (FriTax 2025)",
      },

      { type: "h2", id: "hors-canton", text: "Immeuble dans un autre canton ou vente" },
      {
        type: "p",
        text: "Un immeuble situé dans **un autre canton** est imposé dans ce canton ; il figure dans l'état des immeubles pour la répartition et le calcul du taux, et les dettes et intérêts sont répartis en proportion. En cas de **vente** d'un immeuble privé, vous recevez d'office une formule pour l'**impôt sur les gains immobiliers**, distincte de la déclaration. Un transfert économique (cession d'un droit d'emption, transfert dans la fortune commerciale) doit être annoncé au SCC dans les 30 jours.",
      },
    ],
    faq: [
      {
        q: "Où trouver ma valeur locative dans le canton de Fribourg ?",
        a: "Sur votre dernier avis de taxation, qui indique la valeur locative (revenu) et la valeur fiscale (fortune) de votre immeuble. Les nouveaux propriétaires remplissent d'abord le questionnaire d'immeubles du SCC.",
      },
      {
        q: "Quel forfait pour les frais d'entretien dans le canton de Fribourg ?",
        a: "10 % du rendement brut pour un immeuble construit après le 31 décembre 2015, 20 % pour un immeuble plus ancien. Vous pouvez choisir chaque année entre ce forfait et les frais effectifs.",
      },
      {
        q: "Les panneaux solaires sont-ils déductibles dans le canton de Fribourg ?",
        a: "Oui, entièrement, sous le code 4.311, en choisissant les frais effectifs, sauf dans les cinq premières années suivant la construction. La revente d'électricité est imposable sous le code 3.350 si la production dépasse votre consommation.",
      },
      {
        q: "La valeur locative est-elle encore imposée en 2026 ?",
        a: "Oui. Sa suppression au niveau fédéral entre en vigueur le 1er janvier 2029. Jusque-là, la valeur locative reste imposable et les frais d'entretien et intérêts hypothécaires restent déductibles.",
      },
    ],
  },
  en: {
    title: "Property in FriTax: imputed rent, tax value, rental income and upkeep costs (schedule 04)",
    navTitle: "Property",
    metaTitle: "FriTax 2026: imputed rent, 10% or 20% upkeep deduction and energy works",
    metaDescription:
      "Completing the FriTax property list (schedule 04): imputed rent and tax value (code 3.310), new owners, rental income and furnished lets (3.340), the 10% or 20% upkeep flat rate (4.310), energy-saving investments (4.311) and property in another canton.",
    keywords: [
      "fritax property",
      "imputed rent fribourg",
      "property upkeep deduction fribourg",
      "energy renovation deduction fribourg",
      "property tax value fribourg",
      "furnished rental tax fribourg",
    ],
    summary: [
      "Every owner fills in the **property list (schedule 04, « Etat des immeubles »)**. For a home you live in, declare the **imputed rent** (income) and **tax value** (wealth) from your last assessment notice, under **code 3.310**.",
      "New owners since 1 January 2026 or extension works: fill in the SCC's **property questionnaire**.",
      "Upkeep costs (**4.310**): each year and for each property, choose the **flat rate** (10% of gross income for a building built after 2015, 20% otherwise) or **actual costs**.",
      "Energy-saving investments (**4.311**): **100%** deductible, with actual costs only, and can be carried over to the next two years.",
    ],
    blocks: [
      { type: "h2", id: "annexe-04", text: "The property list (schedule 04)" },
      { type: "path", items: ["Formulaires", "Etat des immeubles"] },
      {
        type: "p",
        text: "One line per property: municipality, land register number, ownership share, use (your home, rented out, second home), **imputed rent** or rents, **tax value** and upkeep costs. FriTax carries the totals over to codes 3.310 to 3.350 (income and wealth) and 4.310 to 4.315 (costs). A property is either **private** or **business**, depending on its main use.",
      },
      {
        type: "screenshot",
        file: "08-etat-des-immeubles.webp",
        alt: "FriTax property list: municipality, land register number, tax value, imputed rent, rents and upkeep costs",
        caption: "Property list, page 2: one column per property; line 17, type of upkeep deduction (10%, 20% or FE for actual costs) (FriTax 2025)",
      },

      { type: "h2", id: "valeur-locative", text: "Imputed rent and tax value (code 3.310)" },
      {
        type: "p",
        text: "For the home you live in, use the **imputed rent** (« valeur locative ») and **tax value** (« valeur fiscale ») from your **last assessment notice**: they were raised in 2014 and in principle remain current. If you rent out or sublet part of the property, declare the rent under code 3.340 and the imputed rent is reduced proportionally.",
      },
      {
        type: "table",
        head: ["Situation", "What to do"],
        rows: [
          ["Purchase after 1 January 2026", "Fill in the property questionnaire with its instructions (www.fr.ch/scc/estimation_immeubles, municipality or SCC)"],
          ["Extension, interior renovation, loft conversion, carport, in-ground pool", "Report the works using the same questionnaire"],
          ["Home permanently under-used", "Reduction possible for direct federal tax only, on a reasoned request (not for a second home)"],
          ["Property abroad", "Market value in francs, used only to set the tax rate"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, code 3.310 and chapter XI.",
      },
      {
        type: "callout",
        tone: "info",
        title: "How the SCC sets the tax value",
        text: "The tax value of a private property is the weighted average of **twice the income value** (capitalised imputed rent) and **once the market value**: (2 x income value + market value) / 3. It is therefore usually well below the market price.",
      },
      {
        type: "p",
        text: "The abolition of imputed rent, decided at federal level, only takes effect on **1 January 2029**. For the 2026 return, imputed rent is still taxable and upkeep costs and mortgage interest are still deductible.",
      },

      { type: "h2", id: "loyers", text: "Rents, furnished lets and rights of residence (codes 3.340 to 3.350)" },
      {
        type: "list",
        items: [
          "**Rents received (3.340)**: gross amount, including any reduction granted to the caretaker and service-charge payments not settled separately. If heating and charges are included in the rent under the lease, a flat **15%** can be deducted from rents.",
          "**Furnished holiday home**: declare **4/5** of the takings, or **2/3** if you also provide linen. The SCC publishes a guidance note on furnished and short-term lets.",
          "**Farm rents (3.343)** and **rights of residence (3.345)**: the owner of a property subject to a right of residence declares its value under 3.345 and deducts it as a permanent charge under 4.335; the beneficiary declares it under 3.410.",
          "**Other property income (3.350)**: solar electricity sold (net method: only if production exceeds your consumption, in francs), forestry income, building-right annuities, one-off photovoltaic subsidies not deducted from costs.",
        ],
      },

      { type: "h2", id: "entretien", text: "Upkeep costs: flat rate or actual costs (code 4.310)" },
      {
        type: "table",
        head: ["Private property", "Flat rate (% of gross income)"],
        rows: [
          ["Built after 31 December 2015", "10%"],
          ["Built earlier", "20%"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, codes 4.310 to 4.315; DFIN ordinance on the deduction of private property costs.",
      },
      {
        type: "p",
        text: "The flat rate is calculated on the property's total gross income (imputed rent, rents, right of residence). You can choose **each year and for each property** between the flat rate and actual costs. The flat rate is not available for business and farm property, property let mainly for business purposes, undeveloped land (parking spaces, storage) and land subject to a paid building right.",
      },
      {
        type: "p",
        text: "For **actual costs**, open « **Frais effectifs des immeubles** », « Immeuble 1 » in FriTax (« Ajouter un formulaire » for a second property): this is the SCC's **allocation form** (« formule de répartition »), explained in the special guidance note. The ECAB building insurance premium and municipal property contributions are already listed; each invoice is numbered, described and classified (deductible upkeep or non-deductible improvement), with copies of the invoices. Count the net amount, after discounts, insurance payouts and subsidies. For private property, the **payment date** counts. Your own labour is not deductible.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Energy saving and demolition (code 4.311)",
        text: "Investments to **save energy and protect the environment** (insulation, windows, heat pump, solar panels on private property) are **100%** deductible, as are **demolition costs** ahead of a replacement building (to be reported to the SCC before the works). Conditions: choose actual costs, and the building must be at least five years old. If the deduction exceeds your income for the year, the balance carries over to the **next two tax periods**.",
      },
      {
        type: "screenshot",
        file: "08-frais-entretien.webp",
        alt: "Entering actual upkeep costs in FriTax: maintenance, energy investments and totals carried to codes 4.310 and 4.311",
        caption: "The allocation form: each invoice is split between improvement, upkeep (4.310) and energy saving or demolition (4.311); the ECAB premium and property contributions are already listed (FriTax 2025)",
      },

      { type: "h2", id: "hors-canton", text: "Property in another canton, or a sale" },
      {
        type: "p",
        text: "Property located in **another canton** is taxed there; it appears in the property list for the tax split and the rate calculation, and debts and interest are split proportionally. When you **sell** a private property, you automatically receive a form for **real estate capital gains tax**, separate from the return. An economic transfer (assignment of a purchase right, transfer to business assets) must be reported to the SCC within 30 days.",
      },
    ],
    faq: [
      {
        q: "Where do I find my imputed rent in Fribourg?",
        a: "On your last assessment notice, which shows your property's imputed rent (income) and tax value (wealth). New owners first fill in the SCC's property questionnaire.",
      },
      {
        q: "What is the flat-rate upkeep deduction in Fribourg?",
        a: "10% of gross income for a building built after 31 December 2015, 20% for older buildings. You can choose each year between this flat rate and actual costs.",
      },
      {
        q: "Are solar panels deductible in Fribourg?",
        a: "Yes, in full, under code 4.311, if you choose actual costs, except in the first five years after construction. Electricity sold is taxable under code 3.350 if production exceeds your consumption.",
      },
      {
        q: "Is imputed rent still taxed in 2026?",
        a: "Yes. Its abolition at federal level takes effect on 1 January 2029. Until then, imputed rent remains taxable and upkeep costs and mortgage interest remain deductible.",
      },
    ],
  },
};
