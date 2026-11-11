import type { GuideChapter } from "../../types";

export const fraisProfessionnels: GuideChapter = {
  slug: "frais-professionnels",
  readTime: 7,
  fr: {
    title: "Frais professionnels dans JuraTax : la formule 7, frais effectifs ou forfait de 20 %",
    navTitle: "Frais professionnels",
    metaTitle: "JuraTax : frais professionnels, formule 7 et forfait 20 % (2026)",
    metaDescription:
      "Remplir la formule 7 de JuraTax : dépenses générales CHF 2'000, déplacements (train, vélo, voiture à CHF 0.70 le km), repas CHF 15 par jour (max. CHF 3'200), chambre à l'extérieur, ou forfait de 20 % jusqu'à CHF 4'100. Télétravail et déduction double activité (code 505).",
    keywords: [
      "juratax frais professionnels",
      "formule 7 jura",
      "frais de déplacement impôt jura",
      "déduction repas jura",
      "forfait frais professionnels jura",
      "télétravail impôt jura",
    ],
    summary: [
      "Pour l'impôt cantonal, vous choisissez entre les **frais effectifs** (dépenses générales, déplacements, repas) et un **forfait de 20 %** du revenu, au maximum **CHF 4'100**. Dans un couple, chacun peut choisir.",
      "Frais effectifs : **CHF 2'000** de dépenses générales pour un 100 % toute l'année, transports publics selon tarif, voiture à **CHF 0.70 par km** (si pas de transports publics), repas **CHF 15 par jour**, au maximum CHF 3'200.",
      "Les jours de **télétravail**, aucun frais de déplacement ni de repas n'est déductible. Un abonnement général annuel reste déductible pour toute l'année.",
      "Pour l'impôt fédéral, seuls les frais effectifs comptent : remplissez donc toujours la partie « frais effectifs » de la formule 7.",
    ],
    blocks: [
      { type: "h2", id: "choix", text: "Frais effectifs ou forfait : le choix du canton du Jura" },
      {
        type: "p",
        text: "La **formule 7** « Frais professionnels liés à une activité dépendante » se remplit dans tous les cas. Sa première partie détaille les **frais effectifs** (codes 7000 à 7750). Sa seconde partie calcule la **déduction forfaitaire** (codes 7800 à 7850) : **20 % du revenu**, au maximum **CHF 4'100** pour une activité principale, CHF 2'000 pour un indépendant qui a aussi une activité salariée. Pour l'impôt cantonal, le plus élevé des deux totaux est reporté au **code 500** (500C pour le conjoint). JuraTax fait la comparaison lui-même dans la **« Récapitulation »** des frais professionnels : vous n'avez qu'à saisir vos frais effectifs. Le forfait remplace tous les frais effectifs, déplacements et repas compris : il est intéressant pour les petits revenus et les trajets courts.",
      },
      {
        type: "table",
        head: ["Exemple (salaire net CHF 60'000, 225 jours)", "Frais effectifs", "Forfait"],
        rows: [
          ["Dépenses générales (7000)", "CHF 2'000", "Compris"],
          ["Abonnement de bus annuel (7100)", "CHF 800", "Compris"],
          ["Repas hors du domicile, 225 jours à CHF 15 (7300), plafonnés", "CHF 3'200", "Compris"],
          ["Total", "CHF 6'000", "CHF 4'100 (20 % plafonné)"],
        ],
        caption: "Exemple fictif calculé avec les montants de la formule 7 2025, Service des contributions du canton du Jura. Ici, les frais effectifs sont plus avantageux.",
      },
      {
        type: "screenshot",
        file: "04-formule-7.webp",
        alt: "Récapitulatif des frais professionnels dans JuraTax 2025 : frais de l'activité principale pour l'ICCE et l'IFD, frais de l'activité accessoire, frais admis et déduction pour double activité",
        caption: "Le récapitulatif retient automatiquement la déduction la plus favorable, séparément pour l'impôt cantonal (ICCE) et fédéral (IFD) (JuraTax 2025, données fictives)",
      },

      { type: "h2", id: "frais-effectifs", text: "Le détail des frais effectifs (formule 7)" },
      {
        type: "table",
        head: ["Code", "Frais", "Montant admis"],
        rows: [
          ["7000", "Dépenses professionnelles générales (vêtements, outillage, ouvrages)", "CHF 2'000 pour un 100 % toute l'année, réduits selon le taux et la durée (CHF 1'000 à mi-temps, CHF 500 pour 3 mois à plein temps)"],
          ["7100, 7110", "Train, bus, tram", "Coût effectif de l'abonnement"],
          ["7150", "Vélo, vélomoteur", "max. CHF 700 par an"],
          ["7200, 7210", "Moto, scooter", "CHF 0.40 par km"],
          ["7250 à 7280", "Voiture, si les transports publics manquent ou ne sont pas utilisables", "CHF 0.70 par km jusqu'à 7'999 km par an, CHF 0.65 de 8'000 à 14'999 km, CHF 0.60 dès 15'000 km"],
          ["7300, 7310", "Repas pris hors du domicile", "CHF 15 par jour, max. CHF 3'200"],
          ["7350, 7360", "Repas en cantine ou avec participation de l'employeur (case G du certificat)", "CHF 7.50 par jour, max. CHF 1'600"],
          ["7400, 7410", "Travail par équipes", "CHF 15 par jour, max. CHF 3'200"],
          ["7450, 7460", "Chambre et pension à l'extérieur (retour au domicile en fin de semaine)", "CHF 30 par jour ou CHF 6'400 par an (CHF 22.50 ou CHF 4'800 avec cantine), plus le loyer d'une chambre ou d'un studio"],
          ["7500", "Frais d'un gain accessoire", "20 % du revenu net, min. CHF 800, max. CHF 2'400"],
          ["7700", "Cotisations syndicales et ouvrages professionnels au-delà de CHF 1'000", "Montant effectif"],
        ],
        caption: "Source : formule 7 « Frais professionnels liés à une activité dépendante » 2025 et Guide général 2025, page 27, Service des contributions du canton du Jura.",
      },
      {
        type: "list",
        items: [
          "Comptez en général **225 jours ouvrables** par an, moins les vacances prolongées, le télétravail et les absences.",
          "La distance doit être relativement importante, en règle générale **plus de 1,5 km** par trajet simple.",
          "L'horaire libre ne suffit pas à justifier la voiture : il faut une absence de transports publics, un horaire défavorable, une infirmité ou un autre motif sérieux.",
          "Le retour au domicile à midi est limité à **CHF 15 par jour**. Les indemnités de covoiturage reçues se déduisent des frais.",
          "Si la **case F** du certificat de salaire est cochée (transport gratuit par l'employeur), aucun frais de déplacement n'est admis. Avec un **véhicule de fonction**, répondez oui à la question prévue dans la saisie du salaire.",
          "Aucune déduction de repas n'est admise si le repas principal vous coûte **moins de CHF 10**.",
        ],
      },

      { type: "h2", id: "ecrans", text: "Dans JuraTax, écran par écran" },
      { type: "path", items: ["Frais professionnels", "Sélection des frais professionnels"] },
      {
        type: "p",
        text: "Dans l'arborescence, **« Frais professionnels »** commence par une **sélection** : cochez, pour le contribuable et pour le conjoint, les **frais de déplacements** (transports publics ou individuels), les **frais de repas pris hors du domicile** et le **séjour hors du domicile durant la semaine**. JuraTax n'affiche ensuite que les écrans utiles.",
      },
      {
        type: "screenshot",
        file: "04-selection-frais.webp",
        alt: "Écran Sélection des frais professionnels de JuraTax 2025 : déplacements, repas hors du domicile, séjour hors du domicile, pour le contribuable et le conjoint",
        caption: "La sélection des frais professionnels, pour chaque conjoint (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["Écran de JuraTax", "Ce qu'il faut saisir"],
        rows: [
          ["Données générales", "Domicile, employeur, lieu de travail, période et taux d'activité"],
          ["Déplacement transports publics", "Cochez train, bus ou tram et indiquez le montant de l'abonnement ; vélo ou cyclomoteur : montant à part"],
          ["Déplacement avec un véhicule privé", "« Insérer » une ligne moto ou automobile, puis kilomètres par jour et jours de travail : JuraTax calcule le total en km et le montant"],
          ["Frais de repas", "Nombre de jours de travail en cas normal, en cas de cantine ou en travail par équipes ; JuraTax affiche le montant total admis"],
          ["Séjour hors du domicile", "Période du / au, frais de la chambre ou du studio, jours de travail pour les repas"],
          ["Autres frais professionnels", "Cotisations syndicales, ouvrages professionnels au-delà de CHF 1'000"],
          ["Récapitulation", "Comparaison des frais effectifs et du forfait de 20 %"],
        ],
        caption: "Libellés de JuraTax 2025.",
      },
      {
        type: "screenshot",
        file: "04-transports-publics.webp",
        alt: "Écran Frais de déplacement en transports publics de JuraTax 2025 : train, bus, tram, montant, et vélo ou cyclomoteur",
        caption: "Transports publics : cochez le moyen de transport et saisissez le prix de l'abonnement (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-deplacements.webp",
        alt: "Écran Frais de déplacement avec un véhicule privé de JuraTax 2025 : lignes moto et automobile, km par jour, nombre de jours, km total et récapitulation par conjoint",
        caption: "Véhicule privé : une ligne par trajet, JuraTax calcule les kilomètres et le montant pour chaque conjoint (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-repas.webp",
        alt: "Écran Frais de repas du contribuable de JuraTax 2025 : repas hors du domicile en cas normal, en cas de cantine, travail par équipes et montant total admis",
        caption: "Frais de repas : il suffit d'indiquer les jours de travail, JuraTax applique les tarifs et le plafond (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-sejour.webp",
        alt: "Écran Séjour hors du domicile du contribuable de JuraTax 2025 : période, frais de logement au lieu de travail, frais de repas en cas normal ou de cantine",
        caption: "Séjour hors du domicile : période, logement au lieu de travail et repas (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-autres-frais.webp",
        alt: "Écran Autres frais professionnels du contribuable de JuraTax 2025 : dépenses professionnelles générales CHF 2'000 pour l'impôt cantonal et CHF 2'400 pour l'impôt fédéral, pièce de travail, cotisations syndicales, autres frais, forfait agent d'assurance",
        caption: "« Autres frais professionnels » : JuraTax calcule les dépenses générales (CHF 2'000 pour le canton, 3 % du salaire pour l'IFD) ; ajoutez ici les cotisations syndicales (JuraTax 2025, données fictives)",
      },

      { type: "h2", id: "teletravail", text: "Télétravail" },
      {
        type: "p",
        text: "Pour les jours de **télétravail** ou de réduction de l'horaire de travail (RHT), vous ne pouvez déduire **ni frais de déplacement, ni frais de repas**. Une **chambre de travail** à domicile n'est admise que si le travail ne peut pas, ou pas raisonnablement, être fait au bureau ; la simple convenance personnelle ne suffit pas. Exception utile : un **abonnement général** acheté pour l'année reste déductible pour toute l'année, même avec du télétravail. Votre employeur indique les jours de télétravail sur le certificat de salaire.",
      },

      { type: "h2", id: "double-activite", text: "Les deux conjoints travaillent (code 505)" },
      {
        type: "p",
        text: "Les couples mariés dont les deux conjoints exercent une activité lucrative, principale ou accessoire, déduisent au **code 505** jusqu'à **CHF 2'700**, mais au plus le revenu le moins élevé des deux. La déduction est aussi admise quand un conjoint seconde l'autre de façon importante dans sa profession ou son entreprise. Aucune déduction si l'activité se solde par une perte. JuraTax la calcule à partir des revenus saisis.",
      },

      { type: "h2", id: "ifd", text: "Ce qui diffère pour l'impôt fédéral direct" },
      {
        type: "table",
        head: ["Frais", "Impôt cantonal", "Impôt fédéral direct (montants 2025)"],
        rows: [
          ["Choix forfait ou effectifs", "Oui : 20 %, max. CHF 4'100", "Non : frais effectifs uniquement"],
          ["Autres frais professionnels", "CHF 2'000 de dépenses générales", "Forfait de 3 % du salaire net, min. CHF 2'000, max. CHF 4'000"],
          ["Déplacements", "Sans plafond", "max. CHF 3'300"],
          ["Double activité des conjoints", "max. CHF 2'700", "50 % du revenu le plus bas, min. CHF 8'600, max. CHF 14'100"],
        ],
        caption: "Sources : formule 7 2025 et Guide général 2025, page 28, Service des contributions du canton du Jura.",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour la voiture dans le canton du Jura ?",
        a: "CHF 0.70 par kilomètre jusqu'à 7'999 km par an, CHF 0.65 de 8'000 à 14'999 km et CHF 0.60 au-delà, à condition que les transports publics manquent ou ne soient pas utilisables. Il n'y a pas de plafond cantonal ; l'impôt fédéral plafonne les déplacements à CHF 3'300 (2025).",
      },
      {
        q: "Le forfait de 20 % est-il intéressant ?",
        a: "Il remplace tous les frais effectifs, déplacements et repas compris, et est plafonné à CHF 4'100. Il convient aux trajets courts et aux petits revenus. Dès que vous déduisez des repas ou des trajets en voiture, les frais effectifs sont souvent plus élevés.",
      },
      {
        q: "Peut-on déduire les repas en télétravail ?",
        a: "Non. Pour les jours de télétravail ou de RHT, aucun frais de repas ni de déplacement n'est déductible dans le canton du Jura.",
      },
      {
        q: "Où déduire les cotisations syndicales dans JuraTax ?",
        a: "Au code 7700 de la formule 7, avec les ouvrages professionnels dépassant CHF 1'000. Joignez le justificatif si les cotisations dépassent CHF 500.",
      },
    ],
  },
  en: {
    title: "Work expenses in JuraTax: form 7, actual costs or the 20% flat rate",
    navTitle: "Work expenses",
    metaTitle: "JuraTax: work expenses, form 7 and the 20% flat rate (2026)",
    metaDescription:
      "Fill in JuraTax form 7: CHF 2,000 general expenses, commuting (train, bike, car at CHF 0.70 per km), meals at CHF 15 per day (max. CHF 3,200), room away from home, or the 20% flat rate up to CHF 4,100. Remote work and the two-earner deduction (code 505).",
    keywords: [
      "juratax work expenses",
      "jura form 7",
      "commuting deduction jura",
      "meal deduction jura",
      "flat rate work expenses jura",
      "remote work tax jura",
    ],
    summary: [
      "For cantonal tax, you choose between **actual costs** (general expenses, commuting, meals) and a **20% flat rate** of income, up to **CHF 4,100**. In a couple, each spouse can choose.",
      "Actual costs: **CHF 2,000** of general expenses for a full-time job all year, public transport at cost, car at **CHF 0.70 per km** (if no public transport), meals at **CHF 15 per day**, up to CHF 3,200.",
      "On **remote work** days, no commuting or meal costs are deductible. An annual GA travelcard remains deductible for the whole year.",
      "For federal tax, only actual costs count: so always complete the « actual costs » part of form 7.",
    ],
    blocks: [
      { type: "h2", id: "choix", text: "Actual costs or flat rate: the Jura choice" },
      {
        type: "p",
        text: "**Form 7** « Frais professionnels liés à une activité dépendante » (employee work expenses) is always completed. Its first part lists **actual costs** (codes 7000 to 7750). Its second part calculates the **flat-rate deduction** (codes 7800 to 7850): **20% of income**, up to **CHF 4,100** for a main occupation, CHF 2,000 for a self-employed person who also has a salaried job. For cantonal tax, the higher of the two totals is carried to **code 500** (500C for your spouse). JuraTax compares them itself in the work expenses **« Récapitulation »** (summary): you only enter your actual costs. The flat rate replaces all actual costs, commuting and meals included: it suits low incomes and short commutes.",
      },
      {
        type: "table",
        head: ["Example (net salary CHF 60,000, 225 days)", "Actual costs", "Flat rate"],
        rows: [
          ["General expenses (7000)", "CHF 2,000", "Included"],
          ["Annual bus pass (7100)", "CHF 800", "Included"],
          ["Meals away from home, 225 days at CHF 15 (7300), capped", "CHF 3,200", "Included"],
          ["Total", "CHF 6,000", "CHF 4,100 (20%, capped)"],
        ],
        caption: "Fictitious example calculated with the amounts of the 2025 form 7, Jura Service des contributions. Here, actual costs are more favourable.",
      },
      {
        type: "screenshot",
        file: "04-formule-7.webp",
        alt: "JuraTax 2025 work expenses summary: main activity costs for cantonal (ICCE) and federal (IFD) tax, secondary activity, allowed costs and two-earner deduction",
        caption: "The summary automatically keeps the most favourable deduction, separately for cantonal (ICCE) and federal (IFD) tax (JuraTax 2025, fictitious data)",
      },

      { type: "h2", id: "frais-effectifs", text: "Actual costs in detail (form 7)" },
      {
        type: "table",
        head: ["Code", "Cost", "Amount allowed"],
        rows: [
          ["7000", "General work expenses (clothing, tools, books)", "CHF 2,000 for a full-time job all year, reduced by rate and duration (CHF 1,000 half-time, CHF 500 for 3 months full-time)"],
          ["7100, 7110", "Train, bus, tram", "Actual cost of the pass"],
          ["7150", "Bicycle, moped", "max. CHF 700 per year"],
          ["7200, 7210", "Motorbike, scooter", "CHF 0.40 per km"],
          ["7250 to 7280", "Car, if public transport is missing or unusable", "CHF 0.70 per km up to 7,999 km a year, CHF 0.65 from 8,000 to 14,999 km, CHF 0.60 from 15,000 km"],
          ["7300, 7310", "Meals away from home", "CHF 15 per day, max. CHF 3,200"],
          ["7350, 7360", "Canteen meals or employer contribution (box G of the certificate)", "CHF 7.50 per day, max. CHF 1,600"],
          ["7400, 7410", "Shift work", "CHF 15 per day, max. CHF 3,200"],
          ["7450, 7460", "Room and board away from home (home only at weekends)", "CHF 30 per day or CHF 6,400 per year (CHF 22.50 or CHF 4,800 with a canteen), plus the rent of a room or studio"],
          ["7500", "Costs of secondary employment", "20% of net income, min. CHF 800, max. CHF 2,400"],
          ["7700", "Union dues and professional books above CHF 1,000", "Actual amount"],
        ],
        caption: "Source: 2025 form 7 « Frais professionnels liés à une activité dépendante » and 2025 general guide, page 27, Jura Service des contributions.",
      },
      {
        type: "list",
        items: [
          "Generally count **225 working days** a year, minus extended holidays, remote work and absences.",
          "The distance must be reasonably long, as a rule **more than 1.5 km** each way.",
          "Flexible hours alone do not justify the car: you need missing public transport, unfavourable hours, a disability or another serious reason.",
          "Going home at lunchtime is capped at **CHF 15 per day**. Car-sharing payments received are subtracted from your costs.",
          "If **box F** of the salary certificate is ticked (free transport by the employer), no commuting costs are allowed. With a **company car**, answer yes to the question in the salary entry screen.",
          "No meal deduction is allowed if your main meal costs you **less than CHF 10**.",
        ],
      },

      { type: "h2", id: "ecrans", text: "In JuraTax, screen by screen" },
      { type: "path", items: ["Frais professionnels", "Sélection des frais professionnels"] },
      {
        type: "p",
        text: "In the tree, **« Frais professionnels »** (work expenses) starts with a **selection**: tick, for the taxpayer and the spouse, **commuting costs** (« frais de déplacements », public or private transport), **meals away from home** (« frais de repas pris hors du domicile ») and **staying away from home during the week** (« séjour hors du domicile durant la semaine »). JuraTax then only shows the screens you need.",
      },
      {
        type: "screenshot",
        file: "04-selection-frais.webp",
        alt: "JuraTax 2025 « Sélection des frais professionnels » screen: commuting, meals away from home, staying away from home, for the taxpayer and the spouse",
        caption: "Selecting work expenses, for each spouse (JuraTax 2025)",
      },
      {
        type: "table",
        head: ["JuraTax screen", "What to enter"],
        rows: [
          ["« Données générales » (general data)", "Residence, employer, place of work, period and activity rate"],
          ["« Déplacement transports publics » (public transport)", "Tick train, bus or tram and enter the pass price; bicycle or moped: separate amount"],
          ["« Déplacement avec un véhicule privé » (private vehicle)", "« Insérer » a motorbike or car line, then km per day and working days: JuraTax calculates total km and the amount"],
          ["« Frais de repas » (meals)", "Number of working days in the normal case, with a canteen or for shift work; JuraTax shows the total allowed"],
          ["« Séjour hors du domicile » (staying away)", "Period from / to, cost of the room or studio, working days for meals"],
          ["« Autres frais professionnels » (other work expenses)", "Union dues, professional books above CHF 1,000"],
          ["« Récapitulation » (summary)", "Comparison of actual costs and the 20% flat rate"],
        ],
        caption: "JuraTax 2025 labels.",
      },
      {
        type: "screenshot",
        file: "04-transports-publics.webp",
        alt: "JuraTax 2025 public transport commuting screen: train, bus, tram, amount, and bicycle or moped",
        caption: "Public transport: tick the means of transport and enter the pass price (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-deplacements.webp",
        alt: "JuraTax 2025 private vehicle commuting screen: motorbike and car lines, km per day, number of days, total km and summary per spouse",
        caption: "Private vehicle: one line per journey, JuraTax calculates kilometres and the amount for each spouse (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-repas.webp",
        alt: "JuraTax 2025 meal costs screen: meals away from home in the normal case, with a canteen, shift work and total allowed",
        caption: "Meals: just enter working days, JuraTax applies the rates and the cap (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-sejour.webp",
        alt: "JuraTax 2025 staying away from home screen: period, lodging costs at the place of work, meals in the normal case or with a canteen",
        caption: "Staying away from home: period, lodging at the place of work and meals (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "04-autres-frais.webp",
        alt: "JuraTax 2025 other work expenses screen: general work expenses CHF 2,000 for cantonal tax and CHF 2,400 for federal tax, home office, union dues, other costs, insurance agent flat rate",
        caption: "« Autres frais professionnels »: JuraTax calculates general expenses (CHF 2,000 for the canton, 3% of salary for federal tax); add union dues here (JuraTax 2025, fictitious data)",
      },

      { type: "h2", id: "teletravail", text: "Remote work" },
      {
        type: "p",
        text: "On **remote work** days or short-time work (RHT) days you can deduct **neither commuting nor meal costs**. A **home office** is only allowed if the work cannot, or cannot reasonably, be done at the workplace; personal convenience is not enough. Useful exception: an **annual GA travelcard** bought for the year remains deductible for the whole year, even with remote work. Your employer shows remote work days on the salary certificate.",
      },

      { type: "h2", id: "double-activite", text: "Both spouses working (code 505)" },
      {
        type: "p",
        text: "Married couples where both spouses work, as a main or secondary occupation, deduct up to **CHF 2,700** under **code 505**, but no more than the lower of the two incomes. The deduction is also allowed when one spouse substantially helps in the other's profession or business. No deduction if the activity makes a loss. JuraTax calculates it from the income entered.",
      },

      { type: "h2", id: "ifd", text: "What differs for direct federal tax" },
      {
        type: "table",
        head: ["Cost", "Cantonal tax", "Direct federal tax (2025 amounts)"],
        rows: [
          ["Flat rate or actual costs", "Yes: 20%, max. CHF 4,100", "No: actual costs only"],
          ["Other work expenses", "CHF 2,000 general expenses", "Flat 3% of net salary, min. CHF 2,000, max. CHF 4,000"],
          ["Commuting", "No cap", "max. CHF 3,300"],
          ["Two-earner couple", "max. CHF 2,700", "50% of the lower income, min. CHF 8,600, max. CHF 14,100"],
        ],
        caption: "Sources: 2025 form 7 and 2025 general guide, page 28, Jura Service des contributions.",
      },
    ],
    faq: [
      {
        q: "How much can I deduct for my car in Jura?",
        a: "CHF 0.70 per km up to 7,999 km a year, CHF 0.65 from 8,000 to 14,999 km and CHF 0.60 beyond, provided public transport is missing or unusable. There is no cantonal cap; federal tax caps commuting at CHF 3,300 (2025).",
      },
      {
        q: "Is the 20% flat rate worth it?",
        a: "It replaces all actual costs, commuting and meals included, and is capped at CHF 4,100. It suits short commutes and low incomes. As soon as you deduct meals or car journeys, actual costs are often higher.",
      },
      {
        q: "Can I deduct meals when working from home?",
        a: "No. For remote work or short-time work days, no meal or commuting costs are deductible in the canton of Jura.",
      },
      {
        q: "Where do I deduct union dues in JuraTax?",
        a: "Under code 7700 of form 7, together with professional books above CHF 1,000. Enclose proof if the dues exceed CHF 500.",
      },
    ],
  },
};
