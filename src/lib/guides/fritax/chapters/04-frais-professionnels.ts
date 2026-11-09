import type { GuideChapter } from "../../types";

export const fraisProfessionnels: GuideChapter = {
  slug: "frais-professionnels",
  readTime: 8,
  fr: {
    title: "Frais professionnels dans FriTax : transport, repas, forfait de 3 % et télétravail (annexe 03)",
    navTitle: "Frais professionnels",
    metaTitle: "FriTax 2026 : frais de transport, repas et forfait 3 %",
    metaDescription:
      "Frais de déplacement dans le canton de Fribourg (plafond CHF 12'000, voiture CHF 0.70 par km, vélo CHF 700), repas à CHF 15 (max. CHF 3'200), séjour hors domicile, forfait de 3 % (CHF 2'000 à 4'000), télétravail et déduction pour deux conjoints actifs dans l'annexe 03 de FriTax.",
    keywords: [
      "fritax frais professionnels",
      "frais de déplacement fribourg 2026",
      "déduction voiture fribourg km",
      "frais de repas impôt fribourg",
      "télétravail déduction fribourg",
      "annexe 03 fritax",
    ],
    summary: [
      "Les frais se saisissent dans l'**annexe 03 « Revenu d'activité-Frais d'acquisition »**, formulaire « Revenus d'activité » de la liste « Formulaires », ou bouton bleu « ... » à côté des codes 2.110 à 2.140.",
      "Transport (**2.110**) : transports publics au prix réel ; voiture à **CHF 0.70 par km** seulement sans transports publics utilisables ; plafond de **CHF 12'000** à l'impôt cantonal et **CHF 3'300** à l'impôt fédéral.",
      "Repas (**2.120**) : **CHF 15** par jour, au maximum **CHF 3'200** ; moitié si l'employeur subventionne le repas.",
      "Autres frais (**2.130**) : forfait de **3 % du salaire net**, au minimum CHF 2'000 et au maximum CHF 4'000. Les jours de télétravail ne donnent droit ni aux frais de transport ni aux frais de repas.",
    ],
    blocks: [
      { type: "h2", id: "annexe-03", text: "L'annexe 03 « Revenu d'activité-Frais d'acquisition »" },
      { type: "path", items: ["Formulaires", "Revenus d'activité", "Page 1"] },
      {
        type: "p",
        text: "Les déductions de ce chapitre concernent l'**activité salariée principale**. Pour chaque personne, l'annexe 03 demande le lieu de travail, le moyen de transport, la distance, le nombre de jours de travail ou de repas. FriTax 2025 n'a **pas de case séparée pour le télétravail** : n'indiquez que les jours réellement passés sur le lieu de travail. FriTax reporte les totaux sous les codes 2.110 à 2.140 de la déclaration. Aucune déduction n'est admise pour des frais que l'employeur a pris en charge.",
      },
      {
        type: "screenshot",
        file: "04-annexe03-transport.webp",
        alt: "Page 1 de l'annexe 03 de FriTax : activité salariée, périodes d'interruption, frais de transport publics, vélo et véhicule privé",
        caption: "Page 1 de l'annexe 03 : salaires, interruptions de travail et frais de transport ; le total part sous le code 2.110 (FriTax 2025, données fictives)",
      },
      {
        type: "screenshot",
        file: "04-annexe03-page2.webp",
        alt: "Page 2 de l'annexe 03 de FriTax : repas hors du domicile, séjour hors du domicile, travail par équipes, autres frais professionnels avec case déduction forfaitaire, activité accessoire",
        caption: "Page 2 de l'annexe 03 : repas et séjour hors du domicile (2.120), forfait de 3 % à cocher (2.130) et activité accessoire avec la déduction de 20 % (2.140) (FriTax 2025)",
      },

      { type: "h2", id: "transport", text: "Frais de transport (code 2.110)" },
      {
        type: "table",
        head: ["Moyen de transport", "Déduction"],
        rows: [
          ["Transports publics", "Frais effectifs en 2e classe (1re classe si prouvée)"],
          ["Vélo, cyclomoteur, motocycle à plaque jaune", "CHF 700 par an"],
          ["Motocycle à plaque blanche ou voiture privée", "Le prix des transports publics, sauf si vous prouvez qu'ils ne sont pas utilisables"],
          ["Voiture, sans transports publics utilisables", "CHF 0.70 par km jusqu'à 10'000 km, CHF 0.60 de 10'001 à 20'000 km, CHF 0.50 au-delà"],
          ["Motocycle, sans transports publics utilisables", "CHF 0.40 par km"],
          ["Retour à midi", "Au maximum CHF 15 par jour et CHF 3'200 par an"],
          ["Plafond annuel", "CHF 12'000 (impôt cantonal et communal) ; CHF 3'300 (impôt fédéral direct)"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, code 2.110 et chapitre XI ; Feuille cantonale Fribourg, AFC, février 2026. Montants inchangés en 2026.",
      },
      {
        type: "p",
        text: "Le lieu de travail doit être à **plus de 1,5 km** du domicile. Le SCC compte **220 jours** de travail par an, réduits au prorata en cas d'interruption (chômage, maladie, maternité). La voiture n'est déductible au kilomètre que si vous **prouvez** que les transports publics ne sont pas à disposition ou pas utilisables (handicap, éloignement, horaires défavorables). Quand plusieurs personnes font le trajet ensemble, la déduction complète n'est admise qu'une fois ; la personne 2 ne peut rien déduire de plus si elle utilise le même véhicule que la personne 1.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Exemple : 18 km en voiture, sans transports publics",
        text: "18 km x 2 x 220 jours = 7'920 km, soit **CHF 5'544** à CHF 0.70 le km pour l'impôt cantonal. À l'impôt fédéral direct, la déduction est limitée à **CHF 3'300**. Avec un jour de télétravail par semaine, comptez environ 176 jours au lieu de 220.",
      },
      {
        type: "p",
        text: "Pour les **apprentis**, les trajets vers l'école professionnelle sont des frais de formation non déductibles. Les frais de déplacement des enfants aux études ne sont pas déductibles non plus.",
      },

      { type: "h2", id: "repas", text: "Repas, séjour hors du domicile et travail par équipes (code 2.120)" },
      {
        type: "table",
        head: ["Situation", "Déduction"],
        rows: [
          ["Repas de midi pris hors du domicile", "CHF 15 par repas, max. CHF 3'200 par an"],
          ["Repas à prix réduit par l'employeur (cantine, bons)", "CHF 7.50 par jour, max. CHF 1'600 par an"],
          ["Séjour hors du domicile la semaine", "CHF 30 par jour, max. CHF 6'400 (CHF 22.50 et CHF 4'800 si le repas de midi est subventionné), plus le loyer de la chambre et le retour hebdomadaire"],
          ["Travail par équipes ou de nuit à horaire continu", "CHF 15 par jour, max. CHF 3'200, en principe pas en plus des frais de repas"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, code 2.120.",
      },
      {
        type: "p",
        text: "La déduction pour repas suppose qu'il soit **impossible** de rentrer manger à midi : distance, horaires irréguliers, pause trop courte ou mauvaises liaisons. Aucune déduction n'est admise si un repas principal vous coûte moins de CHF 9. Pour un séjour la semaine au lieu de travail, joignez une copie du contrat de bail de la chambre.",
      },

      { type: "h2", id: "forfait", text: "Autres frais professionnels : le forfait de 3 % (code 2.130)" },
      {
        type: "p",
        text: "Le forfait vaut **3 % du salaire net**, au minimum **CHF 2'000** et au maximum **CHF 4'000** par an, réduit si vous n'avez travaillé qu'une partie de l'année. Le rachat LPP retenu sur le salaire (chiffre 10.2 du certificat) entre dans la base de calcul. Le forfait couvre l'outillage, l'informatique et les logiciels, les livres professionnels, les vêtements de travail, l'usure exceptionnelle des habits et l'**utilisation d'une chambre de travail privée**. Vous pouvez y renoncer et déduire vos frais effectifs, mais il faut alors justifier la totalité des dépenses et leur nécessité professionnelle.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Télétravail : pas de déduction en plus",
        text: "Les frais du **télétravail volontaire** sont compris dans le forfait de 3 % : aucune déduction supplémentaire n'est accordée. En revanche, les jours télétravaillés **réduisent** les frais de transport et de repas. Dans l'annexe 03, ne comptez que les jours passés sur le lieu de travail, et gardez une attestation de votre employeur indiquant votre taux de télétravail en cas de question du SCC.",
      },
      {
        type: "p",
        text: "Les frais de formation, de perfectionnement et de reconversion ne vont pas ici mais sous le **code 4.420**, jusqu'à CHF 12'000 (voir [Déductions](/guide/fritax/deductions)).",
      },

      { type: "h2", id: "accessoire-conjoints", text: "Activité accessoire et deux conjoints actifs (codes 2.140 et 2.510)" },
      {
        type: "list",
        items: [
          "**Code 2.140** : pour une activité salariée accessoire, 20 % du revenu déclaré sous 1.120, au minimum CHF 800 (sans dépasser le gain) et au maximum CHF 2'400 par an. Des frais plus élevés sont admis avec justificatifs.",
          "**Code 2.510** : quand les deux conjoints travaillent, **CHF 500** sont déduits du revenu le plus bas à l'impôt cantonal. À l'impôt fédéral direct, la déduction est de 50 % du revenu le plus bas, au minimum CHF 8'600 et au maximum CHF 14'100. Une seule colonne du code 2.510 peut être utilisée.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour la voiture dans le canton de Fribourg ?",
        a: "CHF 0.70 par km jusqu'à 10'000 km, CHF 0.60 jusqu'à 20'000 km et CHF 0.50 au-delà, sur 220 jours, mais seulement si vous prouvez que les transports publics ne sont pas utilisables. Sinon, la déduction est limitée au prix des transports publics. Plafond : CHF 12'000 à l'impôt cantonal, CHF 3'300 à l'impôt fédéral.",
      },
      {
        q: "Le plafond des frais de transport passe-t-il à CHF 8'000 en 2026 ?",
        a: "Non. Cette baisse faisait partie de la loi sur l'assainissement des finances (LAFE), refusée en votation le 26 avril 2026. Le plafond reste à CHF 12'000 pour l'impôt cantonal et communal.",
      },
      {
        q: "Peut-on déduire des frais de télétravail dans FriTax ?",
        a: "Non, pas en plus du forfait de 3 % qui les couvre. Les jours télétravaillés réduisent par ailleurs les frais de transport et de repas : ne comptez dans l'annexe 03 que les jours passés sur le lieu de travail.",
      },
      {
        q: "Quel est le forfait pour frais professionnels dans le canton de Fribourg ?",
        a: "3 % du salaire net, au minimum CHF 2'000 et au maximum CHF 4'000 par an, sous le code 2.130. Il s'ajoute aux frais de transport et de repas.",
      },
    ],
  },
  en: {
    title: "Work expenses in FriTax: commuting, meals, the 3% flat rate and home office (schedule 03)",
    navTitle: "Work expenses",
    metaTitle: "FriTax 2026: commuting, meals and 3% flat rate",
    metaDescription:
      "Commuting costs in Fribourg (CHF 12,000 cap, car CHF 0.70 per km, bike CHF 700), meals at CHF 15 (max. CHF 3,200), weekly stays away, the 3% flat rate (CHF 2,000 to 4,000), home office and the dual-income deduction in FriTax schedule 03.",
    keywords: [
      "fritax work expenses",
      "fribourg commuting deduction 2026",
      "fribourg car deduction per km",
      "meal deduction tax fribourg",
      "home office deduction fribourg",
      "fritax schedule 03",
    ],
    summary: [
      "Expenses are entered in **schedule 03 « Revenu d'activité-Frais d'acquisition »**, the « Revenus d'activité » form in the « Formulaires » list, or the blue « ... » button next to codes 2.110 to 2.140.",
      "Commuting (**2.110**): public transport at actual cost; car at **CHF 0.70 per km** only if public transport cannot be used; cap of **CHF 12,000** for cantonal tax and **CHF 3,300** for federal tax.",
      "Meals (**2.120**): **CHF 15** per day, up to **CHF 3,200**; half that if your employer subsidises the meal.",
      "Other expenses (**2.130**): flat rate of **3% of net salary**, at least CHF 2,000 and at most CHF 4,000. Home office days give no commuting or meal deduction.",
    ],
    blocks: [
      { type: "h2", id: "annexe-03", text: "Schedule 03 « Revenu d'activité-Frais d'acquisition »" },
      { type: "path", items: ["Formulaires", "Revenus d'activité", "Page 1"] },
      {
        type: "p",
        text: "The deductions in this chapter apply to your **main employment**. For each person, schedule 03 asks for the place of work, means of transport, distance, number of working or meal days. FriTax 2025 has **no separate home office box**: only count the days actually spent at the workplace. FriTax carries the totals over to codes 2.110 to 2.140 of the return. No deduction is allowed for costs your employer paid.",
      },
      {
        type: "screenshot",
        file: "04-annexe03-transport.webp",
        alt: "FriTax schedule 03 page 1: employment, work interruptions, public transport, bicycle and private vehicle costs",
        caption: "Schedule 03, page 1: salaries, work interruptions and commuting costs; the total goes to code 2.110 (FriTax 2025, fictitious data)",
      },
      {
        type: "screenshot",
        file: "04-annexe03-page2.webp",
        alt: "FriTax schedule 03 page 2: meals away from home, weekly stays, shift work, other work expenses with flat-rate box, side employment",
        caption: "Schedule 03, page 2: meals and stays away from home (2.120), the 3% flat rate box (2.130) and side employment with the 20% deduction (2.140) (FriTax 2025)",
      },

      { type: "h2", id: "transport", text: "Commuting costs (code 2.110)" },
      {
        type: "table",
        head: ["Means of transport", "Deduction"],
        rows: [
          ["Public transport", "Actual 2nd-class cost (1st class if proven)"],
          ["Bicycle, moped, yellow-plate motorbike", "CHF 700 a year"],
          ["White-plate motorbike or private car", "The cost of public transport, unless you prove it cannot be used"],
          ["Car, no usable public transport", "CHF 0.70 per km up to 10,000 km, CHF 0.60 from 10,001 to 20,000 km, CHF 0.50 beyond"],
          ["Motorbike, no usable public transport", "CHF 0.40 per km"],
          ["Going home at lunchtime", "Up to CHF 15 a day and CHF 3,200 a year"],
          ["Annual cap", "CHF 12,000 (cantonal and municipal tax); CHF 3,300 (direct federal tax)"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, code 2.110 and chapter XI; Feuille cantonale Fribourg, Federal Tax Administration, February 2026. Amounts unchanged for 2026.",
      },
      {
        type: "p",
        text: "Your workplace must be **more than 1.5 km** from home. The SCC counts **220 working days** a year, reduced pro rata for interruptions (unemployment, illness, maternity). A car is only deductible per kilometre if you **prove** that public transport is unavailable or unusable (disability, distance, unsuitable timetables). When several people travel together, the full deduction is only allowed once; person 2 cannot deduct anything extra if they use the same vehicle as person 1.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Example: 18 km by car, no usable public transport",
        text: "18 km x 2 x 220 days = 7,920 km, i.e. **CHF 5,544** at CHF 0.70 per km for cantonal tax. For direct federal tax, the deduction is capped at **CHF 3,300**. With one home office day a week, count about 176 days instead of 220.",
      },
      {
        type: "p",
        text: "For **apprentices**, travel to vocational school counts as non-deductible training costs. Travel costs of children in education are not deductible either.",
      },

      { type: "h2", id: "repas", text: "Meals, weekly stays away and shift work (code 2.120)" },
      {
        type: "table",
        head: ["Situation", "Deduction"],
        rows: [
          ["Lunch away from home", "CHF 15 per meal, max. CHF 3,200 a year"],
          ["Meal discounted by the employer (canteen, vouchers)", "CHF 7.50 a day, max. CHF 1,600 a year"],
          ["Staying near work during the week", "CHF 30 a day, max. CHF 6,400 (CHF 22.50 and CHF 4,800 if lunch is subsidised), plus room rent and the weekly trip home"],
          ["Shift or continuous night work", "CHF 15 a day, max. CHF 3,200, normally not on top of the meal deduction"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, code 2.120.",
      },
      {
        type: "p",
        text: "The meal deduction requires that going home for lunch is **impossible**: distance, irregular hours, a short break or poor connections. No deduction is allowed if a main meal costs you less than CHF 9. For weekly stays near work, attach a copy of the room's lease.",
      },

      { type: "h2", id: "forfait", text: "Other work expenses: the 3% flat rate (code 2.130)" },
      {
        type: "p",
        text: "The flat rate is **3% of net salary**, at least **CHF 2,000** and at most **CHF 4,000** a year, reduced if you only worked part of the year. A pension fund buy-in deducted from your pay (box 10.2 of the certificate) is included in the base. It covers tools, IT equipment and software, professional books, work clothing, exceptional wear on clothes and the **use of a private study**. You can instead deduct actual costs, but you must then document all expenses and show they were needed for work.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Home office: no extra deduction",
        text: "Costs of **voluntary home working** are covered by the 3% flat rate: no extra deduction is granted. Home office days do, however, **reduce** commuting and meal costs. In schedule 03, only count the days spent at the workplace, and keep a statement from your employer showing your home office rate in case the SCC asks.",
      },
      {
        type: "p",
        text: "Training, further education and retraining costs do not go here but under **code 4.420**, up to CHF 12,000 (see [Deductions](/guide/fritax/deductions)).",
      },

      { type: "h2", id: "accessoire-conjoints", text: "Side income and dual-income couples (codes 2.140 and 2.510)" },
      {
        type: "list",
        items: [
          "**Code 2.140**: for employed side work, 20% of the income declared under 1.120, at least CHF 800 (but not more than the income) and at most CHF 2,400 a year. Higher costs are allowed with receipts.",
          "**Code 2.510**: when both spouses work, **CHF 500** is deducted from the lower income for cantonal tax. For direct federal tax, the deduction is 50% of the lower income, at least CHF 8,600 and at most CHF 14,100. Only one column of code 2.510 may be used.",
        ],
      },
    ],
    faq: [
      {
        q: "How much can I deduct for my car in Fribourg?",
        a: "CHF 0.70 per km up to 10,000 km, CHF 0.60 up to 20,000 km and CHF 0.50 beyond, over 220 days, but only if you prove public transport cannot be used. Otherwise the deduction is limited to the public transport fare. Cap: CHF 12,000 for cantonal tax, CHF 3,300 for federal tax.",
      },
      {
        q: "Is the commuting cap falling to CHF 8,000 in 2026?",
        a: "No. That cut was part of the public finance recovery law (LAFE), rejected by voters on 26 April 2026. The cap stays at CHF 12,000 for cantonal and municipal tax.",
      },
      {
        q: "Can I deduct home office costs in FriTax?",
        a: "No, not on top of the 3% flat rate, which covers them. Home office days also reduce commuting and meal costs: only count days at the workplace in schedule 03.",
      },
      {
        q: "What is the flat rate for work expenses in Fribourg?",
        a: "3% of net salary, at least CHF 2,000 and at most CHF 4,000 a year, under code 2.130. It comes on top of commuting and meal costs.",
      },
    ],
  },
};
