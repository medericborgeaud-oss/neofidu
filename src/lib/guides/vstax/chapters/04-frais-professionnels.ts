import type { GuideChapter } from "../../types";

export const fraisProfessionnels: GuideChapter = {
  slug: "frais-professionnels",
  readTime: 7,
  fr: {
    title: "Frais professionnels dans VSTax : déplacements, repas, forfait de 3 % et télétravail",
    navTitle: "Frais professionnels",
    metaTitle: "VSTax : déduire ses frais professionnels en Valais (2026)",
    metaDescription:
      "Frais de déplacement (CHF 0.75 par km, vélo CHF 700), repas à CHF 15 par jour (max. CHF 3'200), forfait de 3 % (CHF 2'000 à 4'000), télétravail et plafond fédéral de CHF 3'300 dans l'annexe 5 de VSTax.",
    keywords: [
      "frais professionnels valais 2026",
      "vstax frais de déplacement",
      "déduction voiture valais 0.75",
      "repas hors domicile valais 3200",
      "forfait 3 % frais professionnels valais",
      "télétravail impôt valais",
    ],
    summary: [
      "Les frais professionnels se remplissent dans l'**annexe 5**, sous le salaire, et le total part sous le **code 1910** (1920 pour le contribuable 2). Chaque conjoint qui travaille a ses propres frais.",
      "Voiture : **CHF 0.75 par km** jusqu'à 15'000 km par an, puis tarif dégressif, sur 220 jours de travail. Vélo ou vélomoteur : **CHF 700** par an. Transports publics : frais effectifs.",
      "Repas hors du domicile : **CHF 15 par jour**, au maximum **CHF 3'200** (CHF 7.50 et CHF 1'600 avec une cantine). Autres frais : forfait de **3 % du salaire net**, entre **CHF 2'000 et CHF 4'000**.",
      "À l'impôt fédéral direct, les frais de déplacement sont plafonnés à **CHF 3'300** ; VSTax calcule la différence (code 2711).",
    ],
    blocks: [
      { type: "h2", id: "annexe-5", text: "Où saisir les frais dans VSTax" },
      { type: "path", items: ["Formulaires", "Salaires et frais professionnels", "1. Frais de déplacement jusqu'au lieu de travail"] },
      {
        type: "p",
        text: "L'annexe 5 comporte six rubriques par contribuable : **1. Frais de déplacement**, **2. Repas pris hors du domicile**, **3. Travail par équipe**, **4. Séjour hors du domicile**, **5. Autres dépenses professionnelles** et **6. Divers**. Le total des frais est reporté sous le **code 1910** en page 3. Aucune déduction n'est admise pour des frais que l'employeur rembourse.",
      },
      {
        type: "screenshot",
        file: "04-frais-professionnels.webp",
        alt: "Annexe 5 de VSTax : frais de déplacement en voiture, repas hors du domicile et forfait de 3 %",
        caption: "Les rubriques 1 à 6 de l'annexe 5 et le report sous le code 1910 (VSTax 2025, données fictives)",
      },

      { type: "h2", id: "deplacements", text: "1. Frais de déplacement" },
      {
        type: "table",
        head: ["Moyen de transport", "Déduction 2026 (impôt cantonal)"],
        rows: [
          ["Transports publics (train, car postal, bus)", "Frais effectifs (abonnement)"],
          ["Vélo, vélomoteur, motocycle léger (plaque jaune)", "Jusqu'à CHF 700 par an"],
          ["Moto ou scooter de plus de 50 cm³", "Jusqu'à CHF 0.40 par km"],
          ["Voiture, de 0 à 15'000 km", "CHF 0.75 par km"],
          ["Voiture, de 15'001 à 17'500 km", "CHF 0.65 par km"],
          ["Voiture, de 17'501 à 20'000 km", "CHF 0.60 par km"],
          ["Voiture, de 20'001 à 25'000 km", "CHF 0.55 par km"],
          ["Voiture, de 25'001 à 30'000 km", "CHF 0.45 par km"],
          ["Voiture, de 30'001 à 40'000 km", "CHF 0.40 par km"],
          ["Plafond à l'impôt fédéral direct", "CHF 3'300 au total"],
        ],
        caption: "Sources : Guide de la déclaration d'impôts 2025 et « Adaptation des déductions forfaitaires pour l'imposition 2026 », SCC Valais ; circulaire AFC 2-215-D-2025 pour le plafond fédéral 2026.",
      },
      {
        type: "p",
        text: "La voiture n'est admise que si les transports publics ne sont pas utilisables : arrêt trop éloigné, horaires irréguliers, véhicule indispensable au travail. Le calcul se fait sur **220 jours de travail** par an. Le retour à midi est compté au maximum **CHF 15 par jour**. Le parking au lieu de travail est compris dans le tarif au km ; seul le parking **Park & Rail** se déduit en plus, sur justificatif.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Exemple : 25 km de trajet simple en voiture",
        text: "25 km x 2 x 220 jours = 11'000 km, soit **CHF 8'250** à CHF 0.75 le km pour l'impôt cantonal. À l'impôt fédéral direct, la déduction est limitée à **CHF 3'300** : VSTax ajoute la différence sous le code 2711 de la feuille IFD. Saisissez les km par jour et le nombre de jours, VSTax fait le calcul.",
      },
      {
        type: "p",
        text: "Si vous disposez d'un **véhicule de service** pour aller au travail, répondez « oui » à la question « Disposez-vous d'un véhicule commercial pour vous rendre du domicile sur le lieu de travail ? ». Vous ne déduisez alors pas de frais de voiture : la part privée (0,9 % du prix d'achat par mois, au moins CHF 150) est déjà comprise dans votre salaire net.",
      },

      { type: "h2", id: "repas", text: "2. et 3. Repas hors du domicile et travail par équipe" },
      {
        type: "table",
        head: ["Situation", "Déduction"],
        rows: [
          ["Repas de midi pris hors du domicile", "CHF 15 par jour, max. CHF 3'200 par an"],
          ["Repas à prix réduit (cantine, case G du certificat)", "CHF 7.50 par jour, max. CHF 1'600 par an"],
          ["Travail par équipe ou de nuit (deux repas principaux impossibles à domicile)", "CHF 15 par jour, max. CHF 3'200, non cumulable avec les repas"],
        ],
        caption: "Source : annexe 5 de la Déclaration 2025 et « Adaptation des déductions forfaitaires pour l'imposition 2026 », SCC Valais.",
      },
      {
        type: "p",
        text: "Aucune déduction n'est admise si le repas subventionné ne vous coûte pas plus qu'à la maison, par exemple un repas de midi à moins de CHF 10.",
      },

      { type: "h2", id: "sejour", text: "4. Séjour hors du domicile" },
      {
        type: "p",
        text: "Si vous logez près de votre lieu de travail pendant la semaine et rentrez régulièrement le week-end, vous déduisez le **coût de la chambre**, les **deux repas à CHF 15 chacun** (au maximum CHF 6'400 par an pour les deux) et le trajet hebdomadaire. Cette déduction ne se cumule pas avec celle des repas ou du travail par équipe. Indiquez la période et joignez le bail de la chambre.",
      },

      { type: "h2", id: "autres-frais", text: "5. et 6. Forfait de 3 % et autres frais" },
      {
        type: "p",
        text: "La rubrique **5. Autres dépenses professionnelles** accorde un forfait de **3 % du salaire net**, au minimum **CHF 2'000** et au maximum **CHF 4'000** par an. Il couvre l'outillage, le matériel informatique et les logiciels, les ouvrages professionnels, les vêtements de travail, l'usure exceptionnelle des vêtements et chaussures et l'usage d'une chambre de travail privée. Des frais effectifs plus élevés sont possibles, avec une liste détaillée et les justificatifs. Le forfait n'est pas réduit en cas de chômage ou de maladie passagère.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Pas déductibles comme frais professionnels",
        text: "Les **cotisations syndicales** et d'associations professionnelles ne sont pas déductibles en Valais. Les **frais de formation continue** ne vont pas dans l'annexe 5 mais sous le code 2581 (voir [Déductions](/guide/vstax/deductions)).",
      },

      { type: "h2", id: "teletravail", text: "Télétravail" },
      {
        type: "p",
        text: "L'annexe 5 demande « **Avez-vous effectué du télétravail ?** » et le nombre de jours. Les jours de télétravail réduisent les déplacements en voiture, les repas et le séjour hors du domicile : seuls les frais effectivement supportés sont admis. Le forfait vélo de CHF 700 n'est pas réduit, et un abonnement de transports publics (abonnement général ou de parcours) reste déductible en entier sur justificatif.",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour la voiture en Valais ?",
        a: "CHF 0.75 par km jusqu'à 15'000 km par an, puis un tarif dégressif jusqu'à CHF 0.40, calculé sur 220 jours de travail, si les transports publics ne sont pas utilisables. À l'impôt fédéral direct, les frais de déplacement sont plafonnés à CHF 3'300.",
      },
      {
        q: "Quel est le forfait pour les repas hors du domicile en Valais ?",
        a: "CHF 15 par jour, au maximum CHF 3'200 par an. Avec une cantine ou des repas subventionnés (case G du certificat de salaire), CHF 7.50 par jour, au maximum CHF 1'600.",
      },
      {
        q: "Qu'est-ce que le forfait de 3 % dans VSTax ?",
        a: "La déduction des autres frais professionnels : 3 % du salaire net, au minimum CHF 2'000 et au maximum CHF 4'000. Elle couvre l'outillage, l'informatique, les vêtements de travail et la chambre de travail privée.",
      },
      {
        q: "Le télétravail réduit-il les frais professionnels ?",
        a: "Oui. Les jours de télétravail, à indiquer dans l'annexe 5, réduisent les frais de voiture et de repas. L'abonnement de transports publics et le forfait vélo restent déductibles en entier.",
      },
    ],
  },
  en: {
    title: "Work expenses in VSTax: commuting, meals, the 3% flat rate and working from home",
    navTitle: "Work expenses",
    metaTitle: "VSTax: deducting work expenses in Valais (2026)",
    metaDescription:
      "Commuting (CHF 0.75 per km, bike CHF 700), meals at CHF 15 a day (max. CHF 3,200), the 3% flat rate (CHF 2,000 to 4,000), working from home and the CHF 3,300 federal cap in VSTax schedule 5.",
    keywords: [
      "valais work expenses 2026",
      "vstax commuting costs",
      "valais car deduction per km",
      "valais meal deduction",
      "valais 3% flat rate expenses",
      "working from home tax valais",
    ],
    summary: [
      "Work expenses are entered in **schedule 5**, below the salary, and the total goes to **code 1910** (1920 for taxpayer 2). Each working spouse has their own expenses.",
      "Car: **CHF 0.75 per km** up to 15,000 km a year, then a decreasing rate, based on 220 working days. Bike or moped: **CHF 700** a year. Public transport: actual cost.",
      "Meals away from home: **CHF 15 a day**, up to **CHF 3,200** (CHF 7.50 and CHF 1,600 with a canteen). Other costs: flat **3% of net salary**, between **CHF 2,000 and CHF 4,000**.",
      "For direct federal tax, commuting costs are capped at **CHF 3,300**; VSTax works out the difference (code 2711).",
    ],
    blocks: [
      { type: "h2", id: "annexe-5", text: "Where to enter expenses in VSTax" },
      { type: "path", items: ["Formulaires", "Salaires et frais professionnels", "1. Frais de déplacement jusqu'au lieu de travail"] },
      {
        type: "p",
        text: "Schedule 5 has six sections per taxpayer: **1. commuting** (« Frais de déplacement »), **2. meals away from home** (« Repas pris hors du domicile »), **3. shift work** (« Travail par équipe »), **4. staying away from home** (« Séjour hors du domicile »), **5. other work expenses** (« Autres dépenses professionnelles ») and **6. miscellaneous** (« Divers »). The total goes to **code 1910** on page 3. Nothing can be deducted for costs your employer reimburses.",
      },
      {
        type: "screenshot",
        file: "04-frais-professionnels.webp",
        alt: "VSTax schedule 5: car commuting, meals away from home and 3% flat rate",
        caption: "Sections 1 to 6 of schedule 5 and the transfer to code 1910 (VSTax 2025, fictitious data)",
      },

      { type: "h2", id: "deplacements", text: "1. Commuting costs" },
      {
        type: "table",
        head: ["Means of transport", "2026 deduction (cantonal tax)"],
        rows: [
          ["Public transport (train, PostBus, bus)", "Actual cost (season ticket)"],
          ["Bicycle, moped, light motorbike (yellow plate)", "Up to CHF 700 a year"],
          ["Motorbike or scooter over 50 cc", "Up to CHF 0.40 per km"],
          ["Car, 0 to 15,000 km", "CHF 0.75 per km"],
          ["Car, 15,001 to 17,500 km", "CHF 0.65 per km"],
          ["Car, 17,501 to 20,000 km", "CHF 0.60 per km"],
          ["Car, 20,001 to 25,000 km", "CHF 0.55 per km"],
          ["Car, 25,001 to 30,000 km", "CHF 0.45 per km"],
          ["Car, 30,001 to 40,000 km", "CHF 0.40 per km"],
          ["Cap for direct federal tax", "CHF 3,300 in total"],
        ],
        caption: "Sources: Guide de la déclaration d'impôts 2025 and \"Adaptation des déductions forfaitaires pour l'imposition 2026\", SCC Valais; Swiss Federal Tax Administration circular 2-215-D-2025 for the 2026 federal cap.",
      },
      {
        type: "p",
        text: "A car is only accepted if public transport cannot reasonably be used: stop too far away, irregular hours, car essential for the job. The calculation uses **220 working days** a year. Going home at lunchtime counts for at most **CHF 15 a day**. Parking at work is included in the per-km rate; only **Park & Rail** parking can be added, with receipts.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Example: a 25 km one-way commute by car",
        text: "25 km x 2 x 220 days = 11,000 km, i.e. **CHF 8,250** at CHF 0.75 per km for cantonal tax. For direct federal tax the deduction is capped at **CHF 3,300**: VSTax adds back the difference under code 2711 of the federal sheet. Enter km per day and number of days, and VSTax does the maths.",
      },
      {
        type: "p",
        text: "If you have a **company car** for commuting, answer « oui » to « Disposez-vous d'un véhicule commercial pour vous rendre du domicile sur le lieu de travail ? » (do you have a company vehicle to get to work?). You then deduct no car costs: the private share (0.9% of the purchase price per month, at least CHF 150) is already included in your net salary.",
      },

      { type: "h2", id: "repas", text: "2. and 3. Meals away from home and shift work" },
      {
        type: "table",
        head: ["Situation", "Deduction"],
        rows: [
          ["Lunch regularly eaten away from home", "CHF 15 a day, max. CHF 3,200 a year"],
          ["Subsidised meals (canteen, box G on the certificate)", "CHF 7.50 a day, max. CHF 1,600 a year"],
          ["Shift or night work (both main meals impossible at home)", "CHF 15 a day, max. CHF 3,200, not combined with meals"],
        ],
        caption: "Source: schedule 5 of the 2025 return and \"Adaptation des déductions forfaitaires pour l'imposition 2026\", SCC Valais.",
      },
      {
        type: "p",
        text: "No deduction is allowed if a subsidised meal costs you no more than eating at home, for example a lunch for less than CHF 10.",
      },

      { type: "h2", id: "sejour", text: "4. Staying away from home" },
      {
        type: "p",
        text: "If you stay near your workplace during the week and go home regularly at weekends, you deduct the **cost of the room**, **two meals at CHF 15 each** (up to CHF 6,400 a year for both) and the weekly trip. This cannot be combined with the meal or shift-work deduction. Give the period and attach the room lease.",
      },

      { type: "h2", id: "autres-frais", text: "5. and 6. The 3% flat rate and other costs" },
      {
        type: "p",
        text: "Section **5. Autres dépenses professionnelles** gives a flat rate of **3% of net salary**, at least **CHF 2,000** and at most **CHF 4,000** a year. It covers tools, computer equipment and software, professional books, work clothes, exceptional wear of clothes and shoes and the use of a private study. Higher actual costs can be claimed with a detailed list and receipts. The flat rate is not reduced for temporary unemployment or illness.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Not deductible as work expenses",
        text: "**Trade union** and professional association fees are not deductible in Valais. **Training costs** do not go in schedule 5 but under code 2581 (see [Deductions](/guide/vstax/deductions)).",
      },

      { type: "h2", id: "teletravail", text: "Working from home" },
      {
        type: "p",
        text: "Schedule 5 asks « **Avez-vous effectué du télétravail ?** » (did you work from home?) and the number of days. Home-working days reduce car commuting, meals and staying away from home: only costs actually incurred are accepted. The CHF 700 bike rate is not reduced, and a public transport season ticket (GA travelcard or route pass) stays fully deductible with receipts.",
      },
    ],
    faq: [
      {
        q: "How much can I deduct for my car in Valais?",
        a: "CHF 0.75 per km up to 15,000 km a year, then a decreasing rate down to CHF 0.40, based on 220 working days, if public transport cannot be used. For direct federal tax, commuting costs are capped at CHF 3,300.",
      },
      {
        q: "What is the meal deduction in Valais?",
        a: "CHF 15 a day, up to CHF 3,200 a year. With a canteen or subsidised meals (box G on the salary certificate), CHF 7.50 a day, up to CHF 1,600.",
      },
      {
        q: "What is the 3% flat rate in VSTax?",
        a: "The deduction for other work expenses: 3% of net salary, at least CHF 2,000 and at most CHF 4,000. It covers tools, IT, work clothes and a private study.",
      },
      {
        q: "Does working from home reduce my deductions?",
        a: "Yes. Home-working days, entered in schedule 5, reduce car and meal costs. A public transport season ticket and the bike flat rate stay fully deductible.",
      },
    ],
  },
};
