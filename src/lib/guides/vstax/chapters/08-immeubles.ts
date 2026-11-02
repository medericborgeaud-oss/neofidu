import type { GuideChapter } from "../../types";

export const immeubles: GuideChapter = {
  slug: "immeubles",
  readTime: 8,
  fr: {
    title: "Immeubles dans VSTax : valeur locative, chalet, location meublée et frais d'entretien",
    navTitle: "Immeubles",
    metaTitle: "VSTax : déclarer maison, chalet et frais d'entretien en Valais (2026)",
    metaDescription:
      "Remplir l'annexe 2 de VSTax : valeur locative, résidence secondaire et chalet, location meublée ou Airbnb (déduction de 20 %), forfait d'entretien de 10 ou 20 %, forfait de CHF 1'000 pour les taxes de base et taxe cadastrale.",
    keywords: [
      "valeur locative valais",
      "vstax immeubles annexe 2",
      "frais d'entretien immeuble valais forfait",
      "chalet résidence secondaire impôt valais",
      "airbnb impôt valais",
      "taxe cadastrale valais déclaration",
    ],
    summary: [
      "Chaque immeuble se décrit dans l'**annexe 2** (« Immeubles ») : genre, commune, année de construction, valeur locative ou loyers, frais d'entretien. Le revenu net part sous le **code 1110** et la valeur fiscale sous les **codes 2920 à 2923**.",
      "La **valeur locative** est imposable pour tout logement dont vous vous réservez l'usage, résidence secondaire et chalet de vacances compris, quelle que soit la durée d'occupation réelle.",
      "Frais d'entretien : **forfait de 10 %** de la valeur locative ou des loyers si le bâtiment a 10 ans ou moins, **20 %** au-delà, ou frais effectifs. Le choix se fait chaque année et pour chaque immeuble.",
      "Location meublée (y compris Airbnb ou Booking.com) : **déduction forfaitaire de 20 %** des loyers. La valeur fiscale correspond à **100 % de la taxe cadastrale**.",
    ],
    blocks: [
      { type: "h2", id: "annexe-2", text: "L'annexe 2 « Etat et rendements des immeubles »" },
      { type: "path", items: ["Formulaires", "Immeubles", "Etat et rendements des immeubles"] },
      {
        type: "p",
        text: "L'annexe accepte **quatre objets par feuille**, à numéroter. Pour chacun : canton ou pays, commune, rue ou lieu-dit, **genre d'immeuble** (appartement, maison familiale, villa, chalet, mayen, PPE, place de parc), année de construction, date d'achat ou de vente si en 2026, nombre de pièces ou surface, et période d'occupation. Le bas de la colonne calcule le **revenu brut**, retranche les frais d'entretien et donne le **revenu net**, reporté sous le code 1110 (Valais), 1120 (autre canton) ou 1130 (étranger).",
      },
      {
        type: "screenshot",
        file: "08-immeubles.webp",
        alt: "Annexe 2 de VSTax : désignation de deux immeubles, un appartement à Sion et un chalet à Nendaz, avec canton, commune, genre, année de construction, date d'achat, pièces et surface",
        caption: "Un objet par colonne : le haut de l'annexe 2 décrit chaque immeuble ; la valeur locative, les loyers et le forfait d'entretien se saisissent plus bas (VSTax 2025, données fictives)",
      },

      { type: "h2", id: "valeur-locative", text: "Valeur locative et résidence secondaire" },
      {
        type: "p",
        text: "La **valeur locative** est le loyer que vous paieriez pour un logement semblable. Elle est imposable pour le logement que vous occupez, mais aussi pour une **maison de vacances, un chalet ou un mayen** dont vous gardez la jouissance : la durée d'utilisation effective ne joue aucun rôle. Seul un logement inutilisable ou impossible à louer n'a pas de valeur locative. Le montant figure dans les données reprises de l'année précédente ou dans votre dernière décision de taxation ; reprenez-le tel quel.",
      },
      {
        type: "callout",
        tone: "info",
        title: "La valeur locative disparaîtra en 2029",
        text: "La suppression de la valeur locative entre en vigueur le **1er janvier 2029** (Conseil fédéral, 1er avril 2026). Pour les déclarations 2026 à 2028, elle reste imposable et les frais d'entretien restent déductibles. Pour les résidences secondaires, les cantons pourront ensuite prélever un impôt spécial sur les immeubles.",
      },

      { type: "h2", id: "loyers", text: "Loyers, location meublée et Airbnb" },
      {
        type: "table",
        head: ["Revenu", "Ligne de l'annexe 2", "Traitement"],
        rows: [
          ["Logement loué non meublé", "Loyers des immeubles loués non-meublés", "Loyers encaissés, y compris les frais accessoires facturés au-delà des frais réels"],
          ["Logement loué meublé, location de vacances, Airbnb, Booking.com", "Loyers des immeubles loués meublés", "Déduction forfaitaire de 20 % (hors chauffage, électricité et eau)"],
          ["Locaux loués à des fins commerciales", "Loyers des immeubles loués à des fins commerciales", "Seuls les frais effectifs sont déductibles"],
          ["Fermage, droit de superficie, vignes louées", "Fermages, droits de superficie", "Vignes louées : CHF 0.25 par m² pour le propriétaire"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, codes 1110 à 1130.",
      },
      {
        type: "screenshot",
        file: "08-immeubles-rendement.webp",
        alt: "Annexe 2 de VSTax, partie basse : immeubles hors du canton, valeur locative, loyers non meublés et meublés, déduction de 20 %, frais d'entretien forfaitaires ou effectifs, revenu net",
        caption: "Le bas de l'annexe 2 : valeur locative ou loyers par objet, déduction de 20 % sur les meublés, forfait ou frais effectifs, puis les totaux 1110 à 1130 (VSTax 2025)",
      },
      {
        type: "p",
        text: "La déduction de 20 % sur les meublés couvre notamment le nettoyage, la publicité et les annonces, les commissions des plateformes et des agences, les taxes de séjour et de tourisme, internet et télévision, l'assurance et l'amortissement du mobilier. Si votre location atteint l'ampleur d'une **activité indépendante**, il faut joindre un relevé des recettes et des dépenses. Sinon, le revenu se déclare sous le code 1110 comme ci-dessus.",
      },

      { type: "h2", id: "entretien", text: "Frais d'entretien : forfait ou frais effectifs" },
      {
        type: "table",
        head: ["Bâtiment", "Forfait (impôt cantonal et IFD)"],
        rows: [
          ["10 ans ou moins", "10 % de la valeur locative ou des loyers bruts"],
          ["Plus de 10 ans", "20 % de la valeur locative ou des loyers bruts"],
          ["Terrain non bâti, droit de superficie, usage commercial", "Pas de forfait, frais effectifs seulement"],
        ],
        caption: "Sources : Guide de la déclaration d'impôts 2025, SCC Valais ; Feuille cantonale Valais (AFC, février 2026), art. 28 LF et ordonnance fédérale sur les frais relatifs aux immeubles privés.",
      },
      {
        type: "screenshot",
        file: "08-frais-entretien.webp",
        alt: "Formulaire Frais d'entretien de VSTax : frais d'exploitation, forfait de CHF 1'000 pour les taxes de base, assurances immobilières, autres frais et frais d'économie d'énergie",
        caption: "Le détail des frais effectifs : taxes, forfait de CHF 1'000 (résidence principale seulement), assurances, puis les factures de travaux (VSTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "Vous choisissez **chaque année et pour chaque immeuble** entre le forfait et les frais effectifs, à détailler dans le formulaire « **Frais d'entretien** ». Un immeuble de plusieurs appartements compte comme un seul objet, mais chaque **PPE** est un objet distinct. Pour les factures, retenez soit la date de facture, soit la date de paiement, mais la même règle pour toutes.",
      },
      {
        type: "list",
        items: [
          "**Déductibles** : réparations et rénovations qui n'augmentent pas la valeur (peinture, remplacement d'une chaudière, d'une cuisine, de fenêtres, toiture), versements au fonds de rénovation de la PPE, primes d'assurance du bâtiment, frais de gérance par des tiers, taxes de base.",
          "**Forfait pour les taxes de base** : CHF 1'000, couvrant eau, épuration, électricité et ordures (taxes de base), **seulement pour la résidence principale** que vous occupez. Il n'est pas admis pour une PPE, une résidence secondaire, un mayen ou un objet loué.",
          "**Économies d'énergie** : isolation, pompe à chaleur, raccordement au chauffage à distance, panneaux solaires photovoltaïques et thermiques (déductibles immédiatement, directive 4.10). Si ces frais dépassent le revenu, le solde se reporte sur les deux périodes suivantes, comme les frais de démolition avant une reconstruction.",
          "**Non déductibles** : frais d'achat ou de vente (notaire, registre foncier, cédule), taxes de raccordement uniques, énergie de chauffage et eau chaude, travaux qui augmentent la valeur du bien.",
        ],
      },

      { type: "h2", id: "valeur-fiscale", text: "Valeur fiscale de l'immeuble (codes 2920 à 2923)" },
      {
        type: "p",
        text: "La valeur fiscale d'un immeuble valaisan correspond à **100 % de la taxe cadastrale** (les biens-fonds agricoles sont imposés à 15 %). Elle se déclare en page 4, en distinguant **bâtiments** et **biens-fonds**, situés sur votre **commune de domicile** (2920, 2921) ou sur **d'autres communes** (2922, 2923). Les dettes hypothécaires vont dans l'[état des dettes](/guide/vstax/fortune-dettes).",
      },
      {
        type: "table",
        head: ["Immeuble hors du Valais", "Valeur à indiquer (pour le taux)"],
        rows: [
          ["Dans un autre canton", "Valeur fiscale officielle, code 4200"],
          ["À l'étranger, pays avec valeur cadastrale", "Valeur cadastrale x 1,5, convertie en francs, code 4300"],
          ["À l'étranger, sans valeur cadastrale", "Prix d'achat converti en francs, code 4300"],
          ["Valeur locative d'un immeuble à l'étranger", "3 % de la valeur fiscale, code 1130"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, codes 1130 et 4300 (exemples avec un taux de change de 1,09).",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Propriétaire d'un chalet sans habiter en Valais ?",
        text: "Choisissez le type « **Domicilié hors du canton du Valais** » (ou « hors de la Suisse ») à la création de la déclaration. Vous ne déclarez en détail que l'immeuble valaisan ; vos revenus et votre fortune totaux servent à fixer le taux.",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer une valeur locative pour un chalet peu utilisé ?",
        a: "Oui. En Valais, la valeur locative d'une maison de vacances est imposable dès que vous en gardez la jouissance, quelle que soit la durée d'occupation réelle. Seul un logement inutilisable ou impossible à louer en est dispensé.",
      },
      {
        q: "Quel forfait d'entretien pour un immeuble en Valais ?",
        a: "10 % de la valeur locative ou des loyers si le bâtiment a 10 ans ou moins, 20 % s'il est plus ancien. Vous pouvez choisir les frais effectifs à la place, chaque année et pour chaque immeuble.",
      },
      {
        q: "Comment déclarer une location Airbnb en Valais ?",
        a: "Dans l'annexe 2, à la ligne des loyers d'immeubles loués meublés. Une déduction forfaitaire de 20 % couvre notamment les commissions, le nettoyage, les taxes de séjour et l'amortissement du mobilier.",
      },
      {
        q: "Qu'est-ce que le forfait de CHF 1'000 en Valais ?",
        a: "Un forfait pour les taxes de base (eau, épuration, électricité, ordures), réservé à la résidence principale occupée par le propriétaire. Il n'est pas admis pour une PPE, une résidence secondaire ou un objet loué.",
      },
    ],
  },
  en: {
    title: "Property in VSTax: imputed rent, chalets, furnished lets and upkeep costs",
    navTitle: "Property",
    metaTitle: "VSTax: declaring a home, chalet and upkeep costs in Valais (2026)",
    metaDescription:
      "Completing VSTax schedule 2: imputed rental value, holiday homes and chalets, furnished lets and Airbnb (20% deduction), 10% or 20% upkeep flat rate, the CHF 1,000 utility charges flat rate and cadastral value.",
    keywords: [
      "imputed rental value valais",
      "vstax property schedule 2",
      "property upkeep deduction valais",
      "chalet holiday home tax valais",
      "airbnb tax valais",
      "cadastral value valais",
    ],
    summary: [
      "Each property is described in **schedule 2** (« Immeubles »): type, municipality, year built, imputed rent or rents, upkeep costs. Net income goes to **code 1110** and the tax value to **codes 2920 to 2923**.",
      "**Imputed rental value** (« valeur locative ») is taxable on any home you keep for your own use, including a second home or holiday chalet, however little you actually use it.",
      "Upkeep: **10% flat rate** of imputed rent or rents if the building is 10 years old or less, **20%** if older, or actual costs. You choose each year and for each property.",
      "Furnished lets (including Airbnb or Booking.com): **20% flat deduction** on rents. The tax value is **100% of the cadastral value** (« taxe cadastrale »).",
    ],
    blocks: [
      { type: "h2", id: "annexe-2", text: "Schedule 2 « Etat et rendements des immeubles »" },
      { type: "path", items: ["Formulaires", "Immeubles", "Etat et rendements des immeubles"] },
      {
        type: "p",
        text: "The schedule takes **four properties per sheet**, to be numbered. For each: canton or country, municipality, street or locality, **type of property** (flat, house, villa, chalet, « mayen » mountain hut, condominium unit, parking space), year built, purchase or sale date if in 2026, number of rooms or floor area, and period of use. The bottom of the column works out **gross income**, subtracts upkeep and gives **net income**, carried over to code 1110 (Valais), 1120 (other canton) or 1130 (abroad).",
      },
      {
        type: "screenshot",
        file: "08-immeubles.webp",
        alt: "VSTax schedule 2: description of two properties, a flat in Sion and a chalet in Nendaz, with canton, municipality, type, year built, purchase date, rooms and floor area",
        caption: "One property per column: the top of schedule 2 describes each property; imputed rent, rents and the upkeep flat rate are entered further down (VSTax 2025, fictitious data)",
      },

      { type: "h2", id: "valeur-locative", text: "Imputed rental value and second homes" },
      {
        type: "p",
        text: "**Imputed rental value** is the rent you would pay for a similar home. It is taxable on the home you live in, and also on a **holiday home, chalet or mayen** you keep for your own use: how long you actually use it does not matter. Only a home that cannot be lived in or let has no imputed rent. The amount appears in the data carried over from last year or in your latest assessment notice; copy it as it is.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Imputed rental value ends in 2029",
        text: "Its abolition takes effect on **1 January 2029** (Federal Council, 1 April 2026). For the 2026 to 2028 returns, it remains taxable and upkeep costs remain deductible. For second homes, cantons will then be able to levy a special property tax.",
      },

      { type: "h2", id: "loyers", text: "Rents, furnished lets and Airbnb" },
      {
        type: "table",
        head: ["Income", "Line in schedule 2", "Treatment"],
        rows: [
          ["Unfurnished let", "« Loyers des immeubles loués non-meublés »", "Rents received, including service charges billed above actual costs"],
          ["Furnished let, holiday let, Airbnb, Booking.com", "« Loyers des immeubles loués meublés »", "Flat 20% deduction (excluding heating, electricity and water)"],
          ["Premises let for business use", "« Loyers des immeubles loués à des fins commerciales »", "Actual costs only"],
          ["Farm lease, building right, leased vineyards", "« Fermages, droits de superficie »", "Leased vineyards: CHF 0.25 per m² for the owner"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, codes 1110 to 1130.",
      },
      {
        type: "screenshot",
        file: "08-immeubles-rendement.webp",
        alt: "VSTax schedule 2, lower part: property outside the canton, imputed rent, unfurnished and furnished rents, 20% deduction, flat-rate or actual upkeep, net income",
        caption: "The lower part of schedule 2: imputed rent or rents per property, 20% deduction on furnished lets, flat rate or actual costs, then totals 1110 to 1130 (VSTax 2025)",
      },
      {
        type: "p",
        text: "The 20% deduction on furnished lets covers, among other things, cleaning, advertising, platform and agency commissions, visitor and tourist taxes, internet and TV, and insurance and depreciation of furniture. If your letting reaches the scale of a **self-employed business**, you must attach a statement of income and expenses. Otherwise, the income is declared under code 1110 as above.",
      },

      { type: "h2", id: "entretien", text: "Upkeep: flat rate or actual costs" },
      {
        type: "table",
        head: ["Building", "Flat rate (cantonal and federal tax)"],
        rows: [
          ["10 years old or less", "10% of imputed rent or gross rents"],
          ["Over 10 years old", "20% of imputed rent or gross rents"],
          ["Undeveloped land, building right, business use", "No flat rate, actual costs only"],
        ],
        caption: "Sources: Guide de la déclaration d'impôts 2025, SCC Valais; Valais cantonal sheet (Swiss Federal Tax Administration, February 2026), art. 28 of the cantonal law and the federal ordinance on private property costs.",
      },
      {
        type: "screenshot",
        file: "08-frais-entretien.webp",
        alt: "VSTax upkeep costs form: running costs, CHF 1,000 flat rate for basic charges, building insurance, other costs and energy-saving costs",
        caption: "Actual costs in detail: charges, the CHF 1,000 flat rate (main home only), insurance, then works invoices (VSTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "You choose **each year and for each property** between the flat rate and actual costs, detailed in the « **Frais d'entretien** » (upkeep costs) form. A building with several flats counts as one property, but each **condominium unit** is a separate one. For invoices, use either the invoice date or the payment date, but the same rule for all of them.",
      },
      {
        type: "list",
        items: [
          "**Deductible**: repairs and renovations that do not add value (painting, replacing a boiler, kitchen, windows, roof work), payments into the condominium renovation fund, building insurance, management fees paid to third parties, basic utility charges.",
          "**Flat rate for basic charges**: CHF 1,000, covering basic water, sewage, electricity and waste charges, **only for the main home** you occupy. Not allowed for a condominium unit, second home, mayen or let property.",
          "**Energy saving**: insulation, heat pump, district heating connection, photovoltaic and solar thermal panels (deductible immediately, directive 4.10). If these costs exceed income, the balance carries over to the next two tax years, as do demolition costs before rebuilding.",
          "**Not deductible**: purchase or sale costs (notary, land registry, mortgage note), one-off connection fees, heating energy and hot water, work that adds value to the property.",
        ],
      },

      { type: "h2", id: "valeur-fiscale", text: "Tax value of the property (codes 2920 to 2923)" },
      {
        type: "p",
        text: "The tax value of a Valais property is **100% of the cadastral value** (farmland is taxed at 15%). It is declared on page 4, separating **buildings** (« bâtiments ») and **land** (« biens-fonds »), in your **home municipality** (2920, 2921) or in **other municipalities** (2922, 2923). Mortgages go in the [debts list](/guide/vstax/fortune-dettes).",
      },
      {
        type: "table",
        head: ["Property outside Valais", "Value to give (for the rate)"],
        rows: [
          ["In another canton", "Official tax value, code 4200"],
          ["Abroad, country with a cadastral value", "Cadastral value x 1.5, converted to francs, code 4300"],
          ["Abroad, no cadastral value", "Purchase price converted to francs, code 4300"],
          ["Imputed rent of a property abroad", "3% of the tax value, code 1130"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, codes 1130 and 4300 (examples using an exchange rate of 1.09).",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Own a chalet but live outside Valais?",
        text: "Choose the « **Domicilié hors du canton du Valais** » (or « hors de la Suisse ») return type when creating the return. You only declare the Valais property in detail; your total income and wealth set the rate.",
      },
    ],
    faq: [
      {
        q: "Do I pay imputed rent on a chalet I rarely use?",
        a: "Yes. In Valais, the imputed rent of a holiday home is taxable as soon as you keep it for your own use, however little you actually stay there. Only a home that cannot be used or let is exempt.",
      },
      {
        q: "What is the upkeep flat rate for property in Valais?",
        a: "10% of imputed rent or rents if the building is 10 years old or less, 20% if older. You can choose actual costs instead, each year and for each property.",
      },
      {
        q: "How do I declare Airbnb income in Valais?",
        a: "In schedule 2, on the line for furnished lets. A flat 20% deduction covers commissions, cleaning, visitor taxes and furniture depreciation, among other things.",
      },
      {
        q: "What is the CHF 1,000 flat rate in Valais?",
        a: "A flat rate for basic utility charges (water, sewage, electricity, waste), only for the main home occupied by the owner. It is not allowed for condominium units, second homes or let property.",
      },
    ],
  },
};
