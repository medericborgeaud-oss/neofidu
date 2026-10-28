import type { GuideChapter } from "../../types";

export const situationPersonnelle: GuideChapter = {
  slug: "situation-personnelle",
  readTime: 6,
  fr: {
    title: "Situation personnelle et enfants dans VaudTax : état civil, quotient familial",
    navTitle: "Situation personnelle et enfants",
    metaTitle: "VaudTax : déclarer ses enfants et sa situation familiale | NeoFidu",
    metaDescription:
      "Comment remplir l'état civil, les enfants et les personnes à charge dans VaudTax, et comprendre le quotient familial vaudois (parts 1, 1,3, 1,8 et 0,5).",
    keywords: [
      "vaudtax enfants",
      "quotient familial vaud",
      "famille monoparentale impôt vaud 1,3",
      "enfant majeur études impôt vaud",
      "garde alternée impôt vaud",
      "concubinage impôt vaud",
    ],
    summary: [
      "Vaud applique un **quotient familial** : votre revenu imposable est divisé par un nombre de parts pour fixer le taux (1,0 personne seule, 1,8 couple marié, 1,3 parent seul, plus 0,5 par enfant à charge).",
      "C'est la situation au **31 décembre 2026** qui compte. Mariés en cours d'année ? Vous êtes imposés ensemble pour toute l'année.",
      "Les enfants se déclarent dans la rubrique **« Enfants et personnes à charge »** : mineurs et majeurs en apprentissage ou aux études.",
      "Les couples en **concubinage** n'ont pas droit à la part de 1,3, même avec enfants.",
    ],
    blocks: [
      { type: "h2", id: "donnees-preremplies", text: "Les données personnelles préremplies" },
      {
        type: "p",
        text: "Vos nom, prénom, date de naissance, état civil et les enfants mineurs domiciliés chez vous sont préremplis à partir des données du contrôle des habitants. Si une information est fausse, ne la corrigez pas seulement dans VaudTax : un changement d'adresse ou d'état civil s'annonce au **contrôle des habitants** de votre commune, qui transmet à l'ACI.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Pour un couple marié, respectez l'ordre « contribuable 1 » et « contribuable 2 » tel qu'il est prérempli. N'inscrivez pas les données de l'un dans les cases de l'autre, notamment pour les certificats de salaire et le 3e pilier.",
      },

      { type: "h2", id: "etat-civil", text: "État civil : la règle du 31 décembre" },
      {
        type: "table",
        head: ["Situation en 2026", "Conséquence pour la déclaration 2026"],
        rows: [
          ["Mariage ou partenariat enregistré en cours d'année", "Une seule déclaration commune pour **toute l'année** 2026."],
          ["Séparation ou divorce en cours d'année", "Chacun remplit **sa propre déclaration** pour toute l'année 2026."],
          ["Décès du conjoint", "Déclaration commune jusqu'au décès, puis déclaration séparée du conjoint survivant dès le lendemain."],
          ["Concubinage", "Chaque partenaire remplit sa propre déclaration. Pas de part de 1,3."],
        ],
      },
      {
        type: "p",
        text: "Pour un couple marié, les revenus et la fortune s'additionnent quel que soit le régime matrimonial (participation aux acquêts, séparation de biens ou communauté de biens).",
      },

      { type: "h2", id: "quotient-familial", text: "Comprendre le quotient familial vaudois" },
      {
        type: "p",
        text: "C'est la grande particularité vaudoise. Votre revenu imposable est divisé par le total de vos parts pour déterminer le **taux** d'imposition, puis ce taux s'applique à tout votre revenu. Plus vous avez de parts, plus le taux baisse.",
      },
      {
        type: "table",
        head: ["Situation", "Parts"],
        rows: [
          ["Personne célibataire, veuve, séparée ou divorcée", "1,0"],
          ["Couple marié ou partenaires enregistrés vivant ensemble", "1,8"],
          ["Parent seul tenant un ménage indépendant avec un enfant à charge (pas de concubinage)", "1,3"],
          ["Par enfant mineur, en apprentissage ou aux études dont vous assurez l'entretien complet", "+ 0,5"],
        ],
        caption: "Exemple : couple marié avec deux enfants mineurs = 1,8 + 0,5 + 0,5 = 2,8 parts. L'avantage lié aux enfants est plafonné pour les hauts revenus.",
      },
      {
        type: "p",
        text: "VaudTax calcule les parts tout seul à partir de vos réponses. Votre rôle est de bien répondre aux questions sur les enfants et le ménage.",
      },

      { type: "h2", id: "enfants", text: "Déclarer ses enfants dans VaudTax" },
      { type: "path", items: ["Enfants et personnes à charge", "Afficher", "Enfants mineurs et enfants majeurs en apprentissage ou aux études, frais de garde"] },
      {
        type: "steps",
        items: [
          "Ouvrez la rubrique **« Enfants et personnes à charge »** et cliquez sur **« Afficher »**.",
          "Choisissez la ligne des **enfants mineurs et majeurs en apprentissage ou aux études**. Les enfants mineurs domiciliés chez vous apparaissent normalement déjà.",
          "Ajoutez si besoin un enfant majeur en formation que vous entretenez (études, apprentissage), même s'il ne vit plus chez vous.",
          "Si vous êtes célibataire, séparé, divorcé ou veuf, répondez à la question **« Tenez-vous un ménage indépendant seul avec cet/ces enfant(s) ? »**. Répondez « non » si vous vivez en concubinage.",
          "Les frais de garde se saisissent au même endroit : voir le chapitre [Déductions famille](/guide/vaudtax/deductions-famille).",
        ],
      },
      { type: "screenshot", file: "02-enfants.webp", alt: "Rubrique Enfants et personnes à charge dépliée dans le menu VaudTax", caption: "La rubrique dépliée dans le menu (VaudTax 2025, mode simulation, données fictives)" },
      {
        type: "callout",
        tone: "info",
        title: "Parents séparés",
        text: "Le parent qui reçoit une pension alimentaire imposable pour un enfant mineur obtient la part de 0,5 ; celui qui la verse la déduit de son revenu. En garde alternée sans pension déductible, la part de 0,5 peut être partagée par moitié. Plus de détails dans notre article [divorce et impôts](/blog/divorce-suisse-impots-guide-fiscal).",
      },

      { type: "h2", id: "revenus-enfants", text: "Revenus et fortune de vos enfants mineurs" },
      {
        type: "list",
        items: [
          "La **fortune** de l'enfant mineur (compte épargne, par exemple) et ses rendements s'ajoutent à la déclaration du parent qui a l'autorité parentale.",
          "Le **salaire** d'un enfant mineur (job d'été, apprentissage) est imposé séparément : il ne s'ajoute pas à votre déclaration.",
          "Dès l'année de ses 18 ans, l'enfant reçoit sa propre déclaration, même sans revenu.",
        ],
      },

      { type: "h2", id: "personne-a-charge", text: "Autre personne à charge (parent âgé, proche)" },
      { type: "path", items: ["Enfants et personnes à charge", "Afficher", "Autres personnes incapables de subvenir seules à leurs besoins"] },
      {
        type: "p",
        text: "Vous soutenez financièrement un proche (hors conjoint, enfants et concubin) qui ne peut pas travailler et n'a pas le minimum vital ? Vous pouvez demander une déduction de **CHF 3'400** par personne (code 680), à condition que votre aide atteigne au moins ce montant dans l'année. Gardez les preuves de versement.",
      },
    ],
    faq: [
      {
        q: "Nous nous sommes mariés en décembre 2026. Faut-il une déclaration commune ?",
        a: "Oui. Dans le canton de Vaud, la situation au 31 décembre est déterminante : en cas de mariage en cours d'année, vous remplissez une seule déclaration commune pour toute l'année 2026.",
      },
      {
        q: "En concubinage avec un enfant commun, qui obtient la part de 0,5 ?",
        a: "Les concubins ne peuvent pas obtenir la part de 1,3. Pour l'enfant, lorsque les parents exercent conjointement l'autorité parentale sans contribution d'entretien déductible, la part de 0,5 peut être partagée par moitié entre les deux déclarations.",
      },
      {
        q: "Mon enfant de 22 ans fait ses études et vit en colocation. Puis-je le déclarer ?",
        a: "Oui, si vous assurez son entretien. Les enfants majeurs en apprentissage ou aux études donnent droit à une part de 0,5 lorsque vous assurez leur entretien complet.",
      },
    ],
  },
  en: {
    title: "Personal situation and children in VaudTax: marital status and family quotient",
    navTitle: "Personal situation and children",
    metaTitle: "VaudTax: declaring children and family situation (English guide)",
    metaDescription:
      "How to fill in marital status, children and dependants in VaudTax, and how the Vaud family quotient works (1, 1.3, 1.8 and 0.5 shares).",
    keywords: [
      "vaudtax children",
      "vaud family quotient",
      "single parent tax vaud",
      "vaud tax return married couple",
      "shared custody tax vaud",
      "cohabiting couple tax vaud",
    ],
    summary: [
      "Vaud uses a **family quotient**: your taxable income is divided by a number of shares to set your tax rate (1.0 single, 1.8 married couple, 1.3 single parent, plus 0.5 per dependent child).",
      "Your situation on **31 December 2026** is what counts. Married during the year? You are taxed jointly for the whole year.",
      "Children are entered in the section **« Enfants et personnes à charge »** (children and dependants): minors, and adult children in apprenticeship or studies.",
      "**Cohabiting** (unmarried) couples are not entitled to the 1.3 share, even with children.",
    ],
    blocks: [
      { type: "h2", id: "donnees-preremplies", text: "Pre-filled personal data" },
      {
        type: "p",
        text: "Your name, date of birth, marital status and the minor children living with you are pre-filled from the residents' register. If something is wrong, do not only fix it in VaudTax: changes of address or civil status must be reported to your **commune's residents' office** (contrôle des habitants), which informs the tax office.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "For married couples, keep the pre-filled order « contribuable 1 » and « contribuable 2 » (taxpayer 1 and 2). Never enter one spouse's data in the other spouse's fields, especially salary certificates and pillar 3a.",
      },

      { type: "h2", id: "etat-civil", text: "Marital status: the 31 December rule" },
      {
        type: "table",
        head: ["Situation in 2026", "Effect on the 2026 return"],
        rows: [
          ["Marriage or registered partnership during the year", "One joint return for the **whole of 2026**."],
          ["Separation or divorce during the year", "Each person files **their own return** for the whole of 2026."],
          ["Death of a spouse", "Joint return until the date of death, then a separate return for the surviving spouse from the following day."],
          ["Unmarried cohabitation", "Each partner files their own return. No 1.3 share."],
        ],
      },
      {
        type: "p",
        text: "For married couples, income and wealth are added together whatever the matrimonial property regime.",
      },

      { type: "h2", id: "quotient-familial", text: "How the Vaud family quotient works" },
      {
        type: "p",
        text: "This is Vaud's main specificity. Your taxable income is divided by your total number of shares to find your tax **rate**, and that rate then applies to your whole income. More shares mean a lower rate.",
      },
      {
        type: "table",
        head: ["Situation", "Shares"],
        rows: [
          ["Single, widowed, separated or divorced", "1.0"],
          ["Married couple or registered partners living together", "1.8"],
          ["Single parent running a household alone with a dependent child (not cohabiting)", "1.3"],
          ["Per minor child, or adult child in apprenticeship or studies whom you fully support", "+ 0.5"],
        ],
        caption: "Example: married couple with two minor children = 1.8 + 0.5 + 0.5 = 2.8 shares. The child benefit is capped for high incomes.",
      },
      {
        type: "p",
        text: "VaudTax calculates the shares itself from your answers. Your job is to answer the questions about children and household correctly.",
      },

      { type: "h2", id: "enfants", text: "Declaring your children in VaudTax" },
      { type: "path", items: ["Enfants et personnes à charge", "Afficher", "Enfants mineurs et enfants majeurs en apprentissage ou aux études, frais de garde"] },
      {
        type: "steps",
        items: [
          "Open the section **« Enfants et personnes à charge »** and click **« Afficher »** (show).",
          "Choose the line for **minor children and adult children in apprenticeship or studies**. Minor children living with you are usually already listed.",
          "Add any adult child in education whom you support (university, apprenticeship), even if they no longer live with you.",
          "If you are single, separated, divorced or widowed, answer **« Tenez-vous un ménage indépendant seul avec cet/ces enfant(s) ? »** (do you run a household alone with this child?). Answer « non » if you live with a partner.",
          "Childcare costs are entered in the same place: see the [family deductions](/guide/vaudtax/deductions-famille) chapter.",
        ],
      },
      { type: "screenshot", file: "02-enfants.webp", alt: "Children and dependants section expanded in the VaudTax menu", caption: "The section expanded in the menu (VaudTax 2025, simulation mode, fictitious data)" },
      {
        type: "callout",
        tone: "info",
        title: "Separated parents",
        text: "The parent who receives taxable child maintenance for a minor child gets the 0.5 share; the parent who pays it deducts it. With shared custody and no deductible maintenance, the 0.5 share can be split in half.",
      },

      { type: "h2", id: "revenus-enfants", text: "Your minor children's income and wealth" },
      {
        type: "list",
        items: [
          "A minor child's **wealth** (a savings account, for example) and its income are added to the return of the parent with parental authority.",
          "A minor child's **salary** (summer job, apprenticeship) is taxed separately and is not added to your return.",
          "From the year they turn 18, the child receives their own tax return, even with no income.",
        ],
      },

      { type: "h2", id: "personne-a-charge", text: "Other dependants (elderly parent, relative)" },
      { type: "path", items: ["Enfants et personnes à charge", "Afficher", "Autres personnes incapables de subvenir seules à leurs besoins"] },
      {
        type: "p",
        text: "Do you financially support a relative (other than your spouse, children or partner) who cannot work and lacks the minimum subsistence income? You can claim **CHF 3,400** per person (code 680), provided your support reaches at least that amount during the year. Keep proof of payments.",
      },
    ],
    faq: [
      {
        q: "We married in December 2026. Do we file jointly?",
        a: "Yes. In Vaud, your situation on 31 December decides: if you marry during the year, you file a single joint return for the whole of 2026.",
      },
      {
        q: "We are unmarried with a child. Who gets the 0.5 share?",
        a: "Cohabiting partners cannot get the 1.3 share. For the child, when parents share parental authority and no deductible maintenance is paid, the 0.5 share can be split in half between the two returns.",
      },
      {
        q: "My 22-year-old is at university and lives in a flatshare. Can I declare them?",
        a: "Yes, if you support them. Adult children in apprenticeship or studies give a 0.5 share when you fully support them.",
      },
    ],
  },
};
