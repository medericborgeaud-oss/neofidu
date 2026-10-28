import type { GuideChapter } from "../../types";

export const fraisProfessionnels: GuideChapter = {
  slug: "frais-professionnels",
  readTime: 8,
  fr: {
    title: "Frais professionnels dans GeTax : forfait de 3 % ou frais effectifs, ICC et IFD 2026",
    navTitle: "Frais professionnels",
    metaTitle: "Frais professionnels GeTax 2026 : forfait 3 %, déplacements, repas",
    metaDescription:
      "Forfait genevois de 3 % (CHF 641 à 1'817) ou frais effectifs, déplacements limités à CHF 536, repas, télétravail, impôt fédéral et déduction pour couple biactif dans GeTax.",
    keywords: [
      "frais professionnels genève 2026",
      "forfait 3 % genève 1817",
      "frais de déplacement 536 genève",
      "code 31.50 getax",
      "frais de repas impôt genève",
      "télétravail déduction genève",
    ],
    summary: [
      "Impôt cantonal (ICC) : un **forfait unique de 3 %** du salaire net (code 31.50), entre **CHF 641** et **CHF 1'817** en 2026, couvre à la fois déplacements, repas et autres frais.",
      "En frais effectifs, les **déplacements** sont plafonnés à **CHF 536** (code 31.70) quel que soit le moyen de transport, et les **repas** ne sont admis que si le trajet en transports publics dépasse deux heures par jour.",
      "Impôt fédéral (IFD) : le choix se fait **séparément**. Le forfait fédéral (3 %, CHF 2'000 à 4'000 dans GeTax 2025) s'ajoute aux déplacements (max. CHF 3'300) et aux repas.",
      "Couple marié où les deux travaillent : GeTax calcule seul la déduction de **CHF 1'054** (ICC 2026) et la déduction fédérale pour double revenu.",
    ],
    blocks: [
      { type: "h2", id: "principe", text: "Le principe genevois : un seul forfait pour tout" },
      { type: "path", items: ["Revenu", "Déductions pour frais professionnels - Contr.A"] },
      {
        type: "p",
        text: "Pour chaque contribuable salarié, GeTax demande deux choix distincts : « Frais forfaitaires » ou « Frais effectifs » pour l'**IFD**, puis pour l'**ICC**. À Genève, le forfait cantonal est unique : il couvre **les déplacements, les repas pris hors du domicile et les autres frais** (vêtements spéciaux, outillage, littérature professionnelle). C'est la grande différence avec d'autres cantons, où chaque catégorie a son forfait.",
      },
      {
        type: "screenshot",
        file: "04-frais-professionnels.webp",
        alt: "Écran Déductions pour frais professionnels de GeTax : choix forfait ou effectif pour IFD et ICC, forfaits calculés, déduction sur le gain de l'un des époux",
        caption: "Forfaits choisis pour l'IFD et l'ICC : GeTax calcule les montants et ajoute la déduction pour couple biactif (GeTax 2025, données fictives)",
      },

      { type: "h2", id: "forfait", text: "Le forfait ICC : 3 %, CHF 641 à 1'817" },
      {
        type: "p",
        text: "Le forfait vaut **3 % du revenu brut diminué des cotisations AVS/AI/APG/chômage et LPP** (codes 11.00 moins 31.10 et 31.12, avant rachats). Exemple : salaire brut de CHF 104'000, cotisations de CHF 13'960, solde CHF 90'040 × 3 % = CHF 2'701, ramené au plafond de **CHF 1'817**. Dès un salaire net d'environ CHF 60'600, le plafond est atteint.",
      },
      {
        type: "table",
        head: ["Forfait ICC (code 31.50)", "2025", "2026"],
        rows: [
          ["Taux", "3 %", "3 %"],
          ["Minimum", "CHF 640", "CHF 641"],
          ["Maximum", "CHF 1'812", "CHF 1'817"],
        ],
        caption: "Sources : Guide de la déclaration 2025, AFC Genève ; Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 6 al. 2 RCEPF.",
      },

      { type: "h2", id: "effectifs", text: "Les frais effectifs ICC : quand valent-ils la peine ?" },
      {
        type: "table",
        head: ["Frais effectifs ICC", "Code", "Règle"],
        rows: [
          ["Déplacements domicile-travail", "31.70", "max. **CHF 536** en 2026, quel que soit le moyen de transport"],
          ["Repas", "31.60", "seulement si le trajet en transports publics dépasse 2 heures par jour : CHF 15 par jour, max. CHF 3'200 (moitié si case G cochée)"],
          ["Autres frais (cotisations syndicales, etc.)", "31.63", "sur justificatifs"],
        ],
        caption: "Sources : Guide de la déclaration 2025, AFC Genève (règles et montant repas) ; Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 6 al. 1 RCEPF (CHF 536).",
      },
      {
        type: "p",
        text: "Avec des déplacements plafonnés à CHF 536, les frais effectifs ne dépassent le forfait que si vous avez droit aux repas (long trajet) ou de gros autres frais. L'exemple du guide de l'AFC : un habitant d'Hermance avec plus de deux heures de trajet par jour arrive à CHF 3'854 (déplacements 534, repas 3'200, cotisations syndicales 120) contre un forfait de 1'812. Un habitant de Carouge travaillant en ville, lui, a intérêt au forfait.",
      },

      { type: "h2", id: "hors-canton", text: "Vous travaillez hors du canton de Genève" },
      {
        type: "p",
        text: "Pour un employeur établi hors du canton, les repas sont admis selon les normes fédérales (CHF 15 par jour, max. CHF 3'200). Si vous logez la semaine près du lieu de travail, les repas de midi et du soir sont admis jusqu'à CHF 6'400 et le loyer de la chambre jusqu'à CHF 500 par mois à l'ICC (code 31.63, en précisant « Frais de logement »). Les déplacements restent plafonnés à CHF 536 pour l'ICC.",
      },

      { type: "h2", id: "ifd", text: "Impôt fédéral : forfait et frais séparés" },
      {
        type: "table",
        head: ["IFD", "Code", "Montant (GeTax 2025)"],
        rows: [
          ["Forfait autres frais professionnels", "31.20", "3 %, min. CHF 2'000, max. CHF 4'000"],
          ["Déplacements (transports publics, ou voiture si justifiée)", "31.71", "max. CHF 3'300 ; vélo CHF 700 ; voiture CHF 0.70 par km"],
          ["Repas", "31.60", "CHF 15 par jour, max. CHF 3'200"],
          ["Double revenu des époux", "31.90", "50 % du revenu le plus bas, max. CHF 14'100"],
        ],
        caption: "Source : Guide de la déclaration 2025, AFC Genève (montants fédéraux 2025 ; GeTax 2026 intégrera les valeurs 2026).",
      },
      {
        type: "p",
        text: "Pour l'IFD, le forfait ne couvre que les « autres frais » : les déplacements et les repas se saisissent **en plus**, dans les champs « Frais de repas ICC et IFD » et « Frais de déplacements ICC et IFD ». GeTax n'en tient compte que dans la colonne IFD si vous avez choisi le forfait cantonal.",
      },

      { type: "h2", id: "teletravail", text: "Télétravail" },
      {
        type: "p",
        text: "Un bureau à domicile n'est déductible que si une **pièce est exclusivement dédiée** à l'activité professionnelle et que l'employeur ne met **aucune place de travail** à disposition. On déduit alors la part du loyer de cette pièce, liste détaillée et copie du bail à l'appui, à condition de dépasser le forfait. Travailler depuis le salon ne donne droit à rien de particulier. Les jours télétravaillés, ni repas ni déplacements ne sont déductibles.",
      },

      { type: "h2", id: "couple", text: "Couple biactif" },
      {
        type: "p",
        text: "Lorsque les deux époux ou partenaires enregistrés travaillent, l'ICC accorde **CHF 1'054** en 2026 (CHF 1'051 en 2025) sur le revenu le plus bas, au code 31.95. L'IFD accorde 50 % du revenu professionnel le plus bas, au minimum CHF 8'600 (ou le revenu s'il est inférieur) et au maximum CHF 14'100. GeTax remplit ces deux champs seul dans l'écran du contribuable B.",
      },
    ],
    faq: [
      {
        q: "Quel est le forfait pour frais professionnels à Genève en 2026 ?",
        a: "3 % du salaire net (brut moins cotisations AVS et LPP), au minimum CHF 641 et au maximum CHF 1'817 pour l'impôt cantonal et communal. Il couvre déplacements, repas et autres frais.",
      },
      {
        q: "Puis-je déduire mon abonnement Unireso en plus du forfait ?",
        a: "Non pour l'impôt cantonal : le forfait couvre déjà les déplacements, et en frais effectifs ceux-ci sont limités à CHF 536. Pour l'impôt fédéral, oui : les déplacements (max. CHF 3'300 en 2025) s'ajoutent au forfait fédéral.",
      },
      {
        q: "Les frais de repas sont-ils déductibles à Genève ?",
        a: "À l'ICC, seulement en frais effectifs et si le trajet en transports publics dépasse deux heures par jour, ou si l'employeur est hors du canton : CHF 15 par jour, max. CHF 3'200. À l'IFD, ils se déduisent en plus du forfait.",
      },
      {
        q: "Puis-je choisir le forfait pour l'ICC et les frais effectifs pour l'IFD ?",
        a: "Oui. GeTax propose le choix séparément pour l'IFD et pour l'ICC, pour chaque contribuable.",
      },
    ],
  },
  en: {
    title: "Work expenses in GeTax: 3% flat rate or actual costs, cantonal and federal 2026",
    navTitle: "Work expenses",
    metaTitle: "GeTax 2026 work expenses: 3% flat rate, commuting, meals",
    metaDescription:
      "Geneva 3% flat rate (CHF 641 to 1,817) or actual costs, commuting capped at CHF 536, meals, home office, federal tax and the two-earner deduction in GeTax.",
    keywords: [
      "geneva work expenses deduction 2026",
      "geneva flat rate 3 percent",
      "commuting deduction geneva",
      "getax code 31.50",
      "meal deduction geneva tax",
      "home office deduction geneva",
    ],
    summary: [
      "Cantonal tax (ICC): a **single 3% flat rate** of net salary (code 31.50), between **CHF 641** and **CHF 1,817** in 2026, covers commuting, meals and other costs together.",
      "With actual costs, **commuting** is capped at **CHF 536** (code 31.70) whatever the means of transport, and **meals** only count if the public transport journey exceeds two hours a day.",
      "Federal tax (IFD): the choice is made **separately**. The federal flat rate (3%, CHF 2,000 to 4,000 in GeTax 2025) comes on top of commuting (max. CHF 3,300) and meals.",
      "Married couple with two incomes: GeTax computes the **CHF 1,054** deduction (cantonal, 2026) and the federal two-earner deduction itself.",
    ],
    blocks: [
      { type: "h2", id: "principe", text: "The Geneva principle: one flat rate for everything" },
      { type: "path", items: ["Revenu", "Déductions pour frais professionnels - Contr.A"] },
      {
        type: "p",
        text: "For each employed taxpayer, GeTax asks for two separate choices: « Frais forfaitaires » (flat rate) or « Frais effectifs » (actual costs) for **IFD** (federal), then for **ICC** (cantonal). In Geneva the cantonal flat rate is a single amount covering **commuting, meals away from home and other costs** (special clothing, tools, professional literature). That is the big difference from cantons with a flat rate per category.",
      },
      {
        type: "screenshot",
        file: "04-frais-professionnels.webp",
        alt: "GeTax work expenses screen: flat rate or actual costs for federal and cantonal tax, computed flat rates, two-earner deduction",
        caption: "Flat rates chosen for federal and cantonal tax: GeTax computes the amounts and adds the two-earner deduction (GeTax 2025, fictitious data)",
      },

      { type: "h2", id: "forfait", text: "The cantonal flat rate: 3%, CHF 641 to 1,817" },
      {
        type: "p",
        text: "The flat rate is **3% of gross income minus AHV/AI/APG/unemployment and pension contributions** (code 11.00 minus 31.10 and 31.12, before buy-ins). Example: gross salary CHF 104,000, contributions CHF 13,960, balance CHF 90,040 × 3% = CHF 2,701, reduced to the **CHF 1,817** cap. From a net salary of about CHF 60,600, the cap is reached.",
      },
      {
        type: "table",
        head: ["Cantonal flat rate (code 31.50)", "2025", "2026"],
        rows: [
          ["Rate", "3%", "3%"],
          ["Minimum", "CHF 640", "CHF 641"],
          ["Maximum", "CHF 1,812", "CHF 1,817"],
        ],
        caption: "Sources: 2025 return guide, AFC Geneva; Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 6 para. 2 RCEPF.",
      },

      { type: "h2", id: "effectifs", text: "Cantonal actual costs: when are they worth it?" },
      {
        type: "table",
        head: ["Cantonal actual costs", "Code", "Rule"],
        rows: [
          ["Home-to-work commuting", "31.70", "max. **CHF 536** in 2026, whatever the means of transport"],
          ["Meals", "31.60", "only if the public transport journey exceeds 2 hours a day: CHF 15 a day, max. CHF 3,200 (half if box G is ticked)"],
          ["Other costs (union fees, etc.)", "31.63", "with receipts"],
        ],
        caption: "Sources: 2025 return guide, AFC Geneva (rules and meal amount); Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 6 para. 1 RCEPF (CHF 536).",
      },
      {
        type: "p",
        text: "With commuting capped at CHF 536, actual costs only beat the flat rate if you qualify for meals (long journey) or have large other costs. The AFC guide's example: a resident of Hermance with over two hours of travel a day reaches CHF 3,854 (commuting 534, meals 3,200, union fees 120) against a flat rate of 1,812. A resident of Carouge working in the city is better off with the flat rate.",
      },

      { type: "h2", id: "hors-canton", text: "You work outside the canton of Geneva" },
      {
        type: "p",
        text: "For an employer outside the canton, meals are accepted under federal rules (CHF 15 a day, max. CHF 3,200). If you stay near your workplace during the week, lunch and dinner are accepted up to CHF 6,400 and the room rent up to CHF 500 a month for cantonal tax (code 31.63, stating « Frais de logement »). Commuting remains capped at CHF 536 for cantonal tax.",
      },

      { type: "h2", id: "ifd", text: "Federal tax: flat rate and separate costs" },
      {
        type: "table",
        head: ["Federal tax (IFD)", "Code", "Amount (GeTax 2025)"],
        rows: [
          ["Flat rate for other work expenses", "31.20", "3%, min. CHF 2,000, max. CHF 4,000"],
          ["Commuting (public transport, or car if justified)", "31.71", "max. CHF 3,300; bicycle CHF 700; car CHF 0.70 per km"],
          ["Meals", "31.60", "CHF 15 a day, max. CHF 3,200"],
          ["Two-earner couple", "31.90", "50% of the lower income, max. CHF 14,100"],
        ],
        caption: "Source: 2025 return guide, AFC Geneva (2025 federal amounts; GeTax 2026 will include the 2026 values).",
      },
      {
        type: "p",
        text: "For federal tax, the flat rate only covers \"other costs\": commuting and meals are entered **on top**, in the fields « Frais de repas ICC et IFD » and « Frais de déplacements ICC et IFD ». If you chose the cantonal flat rate, GeTax only uses them in the IFD column.",
      },

      { type: "h2", id: "teletravail", text: "Home office" },
      {
        type: "p",
        text: "A home office is only deductible if a **room is used exclusively** for work and your employer provides **no workplace**. You then deduct the share of rent for that room, with a detailed list and a copy of the lease, provided it exceeds the flat rate. Working from the living room gives no specific deduction. On home-office days, neither meals nor commuting are deductible.",
      },

      { type: "h2", id: "couple", text: "Two-earner couples" },
      {
        type: "p",
        text: "When both spouses or registered partners work, cantonal tax grants **CHF 1,054** in 2026 (CHF 1,051 in 2025) on the lower income, under code 31.95. Federal tax grants 50% of the lower earned income, minimum CHF 8,600 (or the income if lower) and maximum CHF 14,100. GeTax fills in both fields itself on taxpayer B's screen.",
      },
    ],
    faq: [
      {
        q: "What is the flat-rate work expense deduction in Geneva for 2026?",
        a: "3% of net salary (gross minus AHV and pension contributions), minimum CHF 641 and maximum CHF 1,817 for cantonal and communal tax. It covers commuting, meals and other costs.",
      },
      {
        q: "Can I deduct my public transport pass on top of the flat rate?",
        a: "Not for cantonal tax: the flat rate already covers commuting, and as actual costs commuting is limited to CHF 536. For federal tax, yes: commuting (max. CHF 3,300 in 2025) is added to the federal flat rate.",
      },
      {
        q: "Are meals deductible in Geneva?",
        a: "For cantonal tax, only as actual costs and if the public transport journey exceeds two hours a day, or if your employer is outside the canton: CHF 15 a day, max. CHF 3,200. For federal tax, they are deducted on top of the flat rate.",
      },
      {
        q: "Can I use the flat rate for cantonal tax and actual costs for federal tax?",
        a: "Yes. GeTax offers the choice separately for federal and cantonal tax, for each taxpayer.",
      },
    ],
  },
};
