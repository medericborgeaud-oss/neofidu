import type { GuideChapter } from "../../types";

export const fraisProfessionnels: GuideChapter = {
  slug: "frais-professionnels",
  readTime: 8,
  fr: {
    title: "Frais professionnels dans VaudTax : transport, repas, télétravail et forfaits 2026",
    navTitle: "Frais professionnels",
    metaTitle: "Frais professionnels VaudTax 2026 : transport, repas, forfait 3 %",
    metaDescription:
      "Comment déduire ses frais de transport, de repas et les autres frais professionnels dans VaudTax (codes 140 à 165), avec les montants officiels vaudois 2026.",
    keywords: [
      "frais professionnels vaud 2026",
      "frais de transport impôt vaud",
      "déduction voiture impôt vaud 0.75",
      "frais de repas 3200 vaud",
      "télétravail déduction impôt vaud",
      "code 140 vaudtax",
    ],
    summary: [
      "**Transport (code 140)** : forfait selon la distance en transports publics (plafond équivalent à l'abonnement général, CHF 4'080 en 2025). La voiture n'est admise que si les transports publics ne sont pas utilisables : **CHF 0.75/km** jusqu'à 15'000 km en 2026.",
      "**Repas (code 150)** : **CHF 3'200** par an si vous mangez à midi hors de chez vous, **CHF 1'600** avec une cantine ou une participation de l'employeur.",
      "**Autres frais (code 160)** : forfait de **3 % du salaire net**, au minimum CHF 2'000 et au maximum CHF 4'000.",
      "Télétravail, chômage partiel ou maladie : les frais de **transport et de repas** se réduisent au prorata des jours effectivement travaillés sur place.",
    ],
    blocks: [
      { type: "h2", id: "principe", text: "Le principe : forfait ou frais effectifs" },
      {
        type: "p",
        text: "Vous pouvez déduire les frais nécessaires pour gagner votre salaire, s'ils ne sont pas remboursés par l'employeur. Pour chaque catégorie, vous choisissez entre le **forfait** (simple, sans justificatif) et les **frais effectifs** (à prouver sur demande). On ne peut pas cumuler les deux pour une même catégorie.",
      },
      { type: "path", items: ["Frais professionnels et interruption de travail (codes 140 à 165)", "Afficher"] },
      {
        type: "p",
        text: "Les forfaits sont calculés sur **240 jours de travail** par an. Si vous n'avez travaillé qu'une partie de l'année, VaudTax les réduit en proportion. Pensez donc à indiquer d'abord vos **périodes d'interruption de travail** (même rubrique).",
      },
      { type: "screenshot", file: "04-frais-professionnels.webp", alt: "Rubrique Frais professionnels et interruption de travail dans VaudTax", caption: "Ces formulaires ne s'activent qu'après la saisie d'un salaire. Le forfait des autres frais professionnels est calculé automatiquement (VaudTax 2025, mode simulation, données fictives)" },

      { type: "h2", id: "transport", text: "Frais de transport domicile-travail (code 140)" },
      { type: "path", items: ["Frais professionnels et interruption de travail", "Frais de transport"] },
      { type: "h3", text: "Transports publics : la règle de base" },
      {
        type: "p",
        text: "Vaud accorde un forfait selon la **distance la plus courte, en simple course**, entre votre domicile et votre lieu de travail. Vous indiquez le nombre de kilomètres et VaudTax applique le barème officiel.",
      },
      {
        type: "table",
        head: ["Distance simple course", "Déduction annuelle (barème 2025)"],
        rows: [
          ["jusqu'à 2 km", "CHF 1'176"],
          ["5 km", "CHF 1'669"],
          ["10 km", "CHF 2'372"],
          ["19 km", "CHF 2'976"],
          ["30 km", "CHF 3'288"],
          ["40 km", "CHF 3'608"],
          ["51 km et plus (plafond)", "CHF 4'080"],
        ],
        caption: "Extraits du barème forfaitaire des Instructions générales 2025 de l'ACI. Le barème 2026 sera intégré à VaudTax 2026 ; le plafond correspond au coût de l'abonnement général 2e classe.",
      },
      { type: "h3", text: "Voiture, moto, vélo : seulement si justifié" },
      {
        type: "p",
        text: "Le véhicule privé n'est admis que si vous n'avez **aucun transport public utilisable** (horaires, éloignement de l'arrêt, nombreux changements, handicap) ou si vous en avez besoin pour votre travail. Le simple gain de temps ne suffit pas. Si c'est justifié :",
      },
      {
        type: "table",
        head: ["Moyen de transport", "Déduction 2026"],
        rows: [
          ["Voiture, jusqu'à 15'000 km", "**CHF 0.75 par km**"],
          ["Voiture, au-delà de 15'000 km", "CHF 0.35 par km"],
          ["Moto (plus de 50 cm³)", "jusqu'à CHF 0.40 par km (montant 2025)"],
          ["Vélo, vélo électrique lent, cyclomoteur", "jusqu'à CHF 700 par an"],
        ],
        caption: "Source : Tableau des principales déductions vaudoises 2026 (ACI) et Instructions générales 2025.",
      },
      {
        type: "p",
        text: "Exemple : 19 km simple course × 2 × 240 jours = 9'120 km × CHF 0.75 = **CHF 6'840**. Les frais de parking ne sont pas déductibles en plus, et un véhicule de fonction exclut toute déduction de trajet.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Impôt fédéral direct : plafond plus bas",
        text: "Pour l'impôt fédéral, les frais de transport sont plafonnés (CHF 3'300 en 2025). VaudTax fait le calcul fédéral tout seul : vous ne saisissez qu'une fois.",
      },

      { type: "h2", id: "repas", text: "Frais de repas (code 150)" },
      { type: "path", items: ["Frais professionnels et interruption de travail", "Frais de repas et frais de repas du soir (séjour hors du domicile)"] },
      {
        type: "table",
        head: ["Situation", "Déduction annuelle 2026"],
        rows: [
          ["Repas de midi régulièrement pris hors du domicile", "CHF 3'200"],
          ["Avec cantine d'entreprise ou participation de l'employeur (case G cochée)", "CHF 1'600"],
          ["Travail par équipe ou de nuit toute l'année", "CHF 3'200 (non cumulable avec le repas de midi)"],
          ["Séjour la semaine au lieu de travail (midi et soir)", "CHF 6'400 (CHF 4'800 avec cantine à midi)"],
        ],
      },
      {
        type: "p",
        text: "Si vous rentrez manger à la maison, aucune déduction. Si les repas sont tellement subventionnés qu'ils ne vous coûtent pas plus qu'à domicile, rien non plus.",
      },

      { type: "h2", id: "autres-frais", text: "Autres frais professionnels (code 160)" },
      { type: "path", items: ["Frais professionnels et interruption de travail", "Autres frais professionnels et frais pour activité salariée accessoire"] },
      {
        type: "p",
        text: "Un forfait couvre outillage, vêtements de travail spéciaux, livres professionnels, matériel informatique et chambre de travail : **3 % du salaire net, minimum CHF 2'000, maximum CHF 4'000**. Ce forfait n'est **pas réduit** en cas de télétravail ou d'interruption. VaudTax le calcule automatiquement.",
      },
      {
        type: "p",
        text: "Les frais effectifs ne valent la peine que s'ils dépassent clairement le forfait. Attention au **bureau à domicile** : il n'est admis que si le télétravail est une obligation (pas de place de travail adaptée chez l'employeur) et pour la seule part de loyer correspondant à la pièce. Voir aussi [télétravail et déductions](/blog/deductions-fiscales-teletravail-2026).",
      },

      { type: "h2", id: "accessoire", text: "Frais d'une activité accessoire (code 165)" },
      {
        type: "p",
        text: "Pour un revenu déclaré au code 105, le forfait est de **20 % du gain, minimum CHF 800, maximum CHF 2'400** (limité au gain s'il est inférieur à CHF 800). Exemple : CHF 6'000 de gain accessoire donnent CHF 1'200 de déduction.",
      },

      { type: "h2", id: "teletravail", text: "Télétravail et interruptions : la réduction au prorata" },
      {
        type: "p",
        text: "C'est l'erreur la plus fréquente. Si vous télétravaillez deux jours par semaine, vos frais de **transport** et de **repas** se réduisent d'environ 40 %. Le forfait de 3 % (code 160), lui, ne change pas.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Vérifiez le chiffre 13 et les cases F et G de votre certificat de salaire. Si votre employeur rembourse vos frais effectifs ou vous offre l'abonnement, la déduction correspondante tombe. C'est un point que l'office d'impôt contrôle systématiquement.",
      },

      { type: "h2", id: "formation", text: "Et la formation continue ?" },
      {
        type: "p",
        text: "Elle ne se met pas dans les frais professionnels mais dans les déductions spéciales (code 618), jusqu'à CHF 12'000 par personne. Voir le chapitre [Autres déductions](/guide/vaudtax/autres-deductions).",
      },
    ],
    faq: [
      {
        q: "Puis-je déduire ma voiture si le train prend plus de temps ?",
        a: "Non, le gain de temps seul ne suffit pas. Le véhicule privé est admis si aucun transport public n'est raisonnablement utilisable (horaires, éloignement important de l'arrêt, nombreux changements, handicap) ou si vous en avez besoin pour votre travail.",
      },
      {
        q: "Quel est le montant par kilomètre pour la voiture dans le canton de Vaud en 2026 ?",
        a: "CHF 0.75 par km jusqu'à 15'000 km par an, puis CHF 0.35 par km au-delà, selon le tableau des déductions vaudoises 2026 de l'ACI.",
      },
      {
        q: "Je télétravaille 2 jours par semaine. Que change-t-il ?",
        a: "Vos frais de transport et de repas doivent être réduits en proportion des jours passés au bureau (environ 3/5 dans ce cas). Le forfait des autres frais professionnels de 3 % n'est pas réduit.",
      },
      {
        q: "Les frais de repas de CHF 3'200 sont-ils automatiques ?",
        a: "Non. Ils ne sont admis que si vous ne pouvez pas rentrer manger chez vous à midi. Avec une cantine ou une participation de l'employeur, la déduction tombe à CHF 1'600.",
      },
    ],
  },
  en: {
    title: "Work expenses in VaudTax: commuting, meals, home office and 2026 flat rates",
    navTitle: "Work expenses",
    metaTitle: "VaudTax 2026 work expenses: commuting, meals, 3% flat rate",
    metaDescription:
      "How to deduct commuting, meals and other work expenses in VaudTax (codes 140 to 165), with the official Vaud amounts for 2026.",
    keywords: [
      "vaud tax deductions commuting",
      "vaud car deduction per km",
      "meal deduction vaud 3200",
      "home office tax deduction vaud",
      "work expenses switzerland vaud",
      "vaudtax professional expenses",
    ],
    summary: [
      "**Commuting (code 140)**: flat amount based on the public transport distance (capped at the cost of a GA travelcard, CHF 4,080 in 2025). A car is only accepted if public transport is not usable: **CHF 0.75/km** up to 15,000 km in 2026.",
      "**Meals (code 150)**: **CHF 3,200** a year if you eat lunch away from home, **CHF 1,600** with a staff canteen or employer subsidy.",
      "**Other expenses (code 160)**: flat **3% of net salary**, minimum CHF 2,000, maximum CHF 4,000.",
      "Home office, short-time work or sick leave: **commuting and meal** deductions are reduced pro rata to the days actually worked on site.",
    ],
    blocks: [
      { type: "h2", id: "principe", text: "The principle: flat rate or actual costs" },
      {
        type: "p",
        text: "You can deduct the costs needed to earn your salary, provided your employer does not reimburse them. For each category you choose between the **flat rate** (simple, no receipts) and **actual costs** (to be proven on request). You cannot combine both for the same category.",
      },
      { type: "path", items: ["Frais professionnels et interruption de travail (codes 140 à 165)", "Afficher"] },
      {
        type: "p",
        text: "Flat rates are based on **240 working days** a year. If you worked only part of the year, VaudTax reduces them proportionally. Enter your **work interruption periods** first (« Périodes d'interruption de travail », same section).",
      },
      { type: "screenshot", file: "04-frais-professionnels.webp", alt: "Work expenses section in VaudTax", caption: "These forms only unlock once a salary is entered. The other-expenses flat rate is computed automatically (VaudTax 2025, simulation mode, fictitious data)" },

      { type: "h2", id: "transport", text: "Commuting costs (code 140)" },
      { type: "path", items: ["Frais professionnels et interruption de travail", "Frais de transport"] },
      { type: "h3", text: "Public transport: the default rule" },
      {
        type: "p",
        text: "Vaud grants a flat amount based on the **shortest one-way distance** between home and work. You enter the kilometres and VaudTax applies the official scale.",
      },
      {
        type: "table",
        head: ["One-way distance", "Annual deduction (2025 scale)"],
        rows: [
          ["up to 2 km", "CHF 1,176"],
          ["5 km", "CHF 1,669"],
          ["10 km", "CHF 2,372"],
          ["19 km", "CHF 2,976"],
          ["30 km", "CHF 3,288"],
          ["40 km", "CHF 3,608"],
          ["51 km and more (cap)", "CHF 4,080"],
        ],
        caption: "Excerpts from the flat-rate scale in the ACI 2025 general instructions. The 2026 scale will be built into VaudTax 2026; the cap matches the cost of a 2nd-class GA travelcard.",
      },
      { type: "h3", text: "Car, motorbike, bicycle: only if justified" },
      {
        type: "p",
        text: "A private vehicle is only accepted if **no public transport is reasonably usable** (timetables, distance to the stop, many changes, disability) or if you need it for your job. Saving time is not enough. If justified:",
      },
      {
        type: "table",
        head: ["Means of transport", "2026 deduction"],
        rows: [
          ["Car, up to 15,000 km", "**CHF 0.75 per km**"],
          ["Car, beyond 15,000 km", "CHF 0.35 per km"],
          ["Motorbike (over 50 cc)", "up to CHF 0.40 per km (2025 amount)"],
          ["Bicycle, slow e-bike, moped", "up to CHF 700 a year"],
        ],
        caption: "Source: ACI table of main Vaud deductions 2026 and 2025 general instructions.",
      },
      {
        type: "p",
        text: "Example: 19 km one way × 2 × 240 days = 9,120 km × CHF 0.75 = **CHF 6,840**. Parking is not deductible on top, and a company car rules out any commuting deduction.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Federal tax: lower cap",
        text: "For federal direct tax, commuting costs are capped (CHF 3,300 in 2025). VaudTax computes the federal figure automatically: you only enter things once.",
      },

      { type: "h2", id: "repas", text: "Meal costs (code 150)" },
      { type: "path", items: ["Frais professionnels et interruption de travail", "Frais de repas et frais de repas du soir (séjour hors du domicile)"] },
      {
        type: "table",
        head: ["Situation", "Annual deduction 2026"],
        rows: [
          ["Lunch regularly eaten away from home", "CHF 3,200"],
          ["With staff canteen or employer subsidy (box G ticked)", "CHF 1,600"],
          ["Shift or night work all year", "CHF 3,200 (not combined with the lunch deduction)"],
          ["Staying near work during the week (lunch and dinner)", "CHF 6,400 (CHF 4,800 with a canteen at lunch)"],
        ],
      },

      { type: "h2", id: "autres-frais", text: "Other work expenses (code 160)" },
      { type: "path", items: ["Frais professionnels et interruption de travail", "Autres frais professionnels et frais pour activité salariée accessoire"] },
      {
        type: "p",
        text: "A flat rate covers tools, special work clothing, professional books, IT equipment and a home study: **3% of net salary, minimum CHF 2,000, maximum CHF 4,000**. It is **not reduced** for home office or interruptions. VaudTax calculates it automatically.",
      },
      {
        type: "p",
        text: "Actual costs only make sense if they clearly exceed the flat rate. Be careful with a **home office**: it is only accepted if working from home is an obligation (no suitable workplace at your employer) and only for the share of rent for that room.",
      },

      { type: "h2", id: "accessoire", text: "Side activity expenses (code 165)" },
      {
        type: "p",
        text: "For income declared under code 105, the flat rate is **20% of the income, minimum CHF 800, maximum CHF 2,400** (limited to the income if below CHF 800). Example: CHF 6,000 of side income gives a CHF 1,200 deduction.",
      },

      { type: "h2", id: "teletravail", text: "Home office and interruptions: pro rata reduction" },
      {
        type: "p",
        text: "This is the most common mistake. If you work from home two days a week, your **commuting** and **meal** deductions drop by about 40%. The 3% flat rate (code 160) does not change.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Check box 13 and boxes F and G on your salary certificate. If your employer reimburses actual expenses or pays your travelcard, the matching deduction falls away. Tax offices check this systematically.",
      },

      { type: "h2", id: "formation", text: "What about further training?" },
      {
        type: "p",
        text: "It does not go into work expenses but into special deductions (code 618), up to CHF 12,000 per person. See [Other deductions](/guide/vaudtax/autres-deductions).",
      },
    ],
    faq: [
      {
        q: "Can I deduct my car if the train takes longer?",
        a: "No, saving time alone is not enough. A private vehicle is accepted if no public transport is reasonably usable (timetables, long distance to the stop, many changes, disability) or if you need it for your work.",
      },
      {
        q: "What is the per-km car rate in Vaud for 2026?",
        a: "CHF 0.75 per km up to 15,000 km a year, then CHF 0.35 per km beyond, according to the ACI table of Vaud deductions for 2026.",
      },
      {
        q: "I work from home two days a week. What changes?",
        a: "Your commuting and meal deductions must be reduced in proportion to the days spent at the office (about 3/5 here). The 3% flat rate for other work expenses is not reduced.",
      },
    ],
  },
};
