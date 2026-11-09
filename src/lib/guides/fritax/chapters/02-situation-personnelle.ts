import type { GuideChapter } from "../../types";

export const situationPersonnelle: GuideChapter = {
  slug: "situation-personnelle",
  readTime: 6,
  fr: {
    title: "Situation personnelle dans FriTax : état civil, religion, enfants et cases A, B, C",
    navTitle: "Situation personnelle",
    metaTitle: "FriTax : remplir la page 1, enfants à charge et cases A, B, C (2026)",
    metaDescription:
      "Comment remplir la page 1 de la déclaration fribourgeoise dans FriTax : état civil au 31 décembre, mariage ou divorce en cours d'année, religion et impôt ecclésiastique, enfants et personnes à charge (cases A*, B*, C*).",
    keywords: [
      "fritax enfants à charge",
      "déclaration impôt fribourg page 1",
      "cases a b c déclaration fribourg",
      "garde alternée impôt fribourg",
      "impôt ecclésiastique fribourg",
      "mariage divorce impôt fribourg",
    ],
    summary: [
      "La page 1 décrit votre situation **au 31 décembre 2026** : c'est l'état civil à cette date qui compte pour toute l'année.",
      "Mariés en 2026 : **une déclaration commune** pour toute l'année. Divorcés ou séparés en 2026 : **une déclaration chacun** pour toute l'année.",
      "Pour chaque enfant ou personne à charge, cochez la case **A*** (vit dans votre ménage), **B*** (vit par exemple chez l'autre parent) ou **C*** (alternativement chez vous et ailleurs).",
      "La **religion** indiquée détermine l'impôt ecclésiastique, perçu en pour-cent de l'impôt cantonal de base.",
    ],
    blocks: [
      { type: "h2", id: "etat-civil", text: "État civil : la situation au 31 décembre fait foi" },
      {
        type: "p",
        text: "Toutes les données de la première page sont à compléter ou à corriger. Le SCC retient votre situation personnelle, professionnelle et familiale **au 31 décembre 2026** (ou à la fin de l'assujettissement en cas de départ à l'étranger ou de décès).",
      },
      {
        type: "table",
        head: ["Situation en 2026", "Déclaration à remplir"],
        rows: [
          ["Mariage ou partenariat enregistré", "Une déclaration commune pour toute l'année 2026, signée ou envoyée pour les deux"],
          ["Divorce, séparation de corps ou de fait", "Une déclaration séparée pour chacun, pour toute l'année 2026"],
          ["Décès du conjoint", "Une déclaration commune jusqu'au décès, puis une déclaration du conjoint survivant pour la suite de l'année"],
          ["Arrivée d'un autre canton", "Imposition dans le canton de Fribourg pour toute l'année 2026 : tous les revenus de l'année"],
          ["Départ vers un autre canton", "Pas d'impôt fribourgeois pour 2026 ; les acomptes déjà payés sont remboursés"],
          ["Arrivée de l'étranger ou départ définitif à l'étranger", "Imposition pour la seule période de résidence en Suisse"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, « Changement d'état civil » et « Déplacement de domicile ».",
      },
      {
        type: "callout",
        tone: "info",
        title: "Couples : un revenu commun, un taux adouci",
        text: "Le revenu de la personne 2 s'ajoute à celui de la personne 1, quel que soit le régime matrimonial. En contrepartie, le revenu du couple est imposé au taux correspondant à **50 %** de son montant (splitting intégral). Les familles monoparentales en bénéficient aussi.",
      },
      {
        type: "screenshot",
        file: "02-situation-personnelle.webp",
        alt: "Page 1 de la déclaration dans FriTax : nom, prénom, date de naissance, état civil, religion, profession et employeur des personnes 1 et 2",
        caption: "La page 1 : une colonne par personne pour les couples (FriTax 2025)",
      },

      { type: "h2", id: "religion", text: "Religion et impôt ecclésiastique" },
      {
        type: "p",
        text: "Le champ **religion** n'est pas anodin : les paroisses perçoivent un **impôt ecclésiastique** calculé en pour-cent de l'impôt cantonal de base, comme l'impôt communal. Vérifiez la confession indiquée pour chaque personne : les coefficients communaux et paroissiaux sont publiés sur [fr.ch/scc/pp](https://www.fr.ch/scc/pp).",
      },
      {
        type: "p",
        text: "L'adresse e-mail que vous indiquez permet au SCC de vous contacter par ce canal, qui n'est **pas sécurisé**. Si vous écrivez au SCC par e-mail, il pourra vous répondre de la même manière.",
      },

      { type: "h2", id: "enfants", text: "Enfants et personnes à charge : cases A*, B* et C*" },
      {
        type: "table",
        head: ["Case", "Signification", "Exemple"],
        rows: [
          ["A*", "L'enfant ou la personne vit dans votre ménage", "Enfant d'un couple marié, enfant d'un parent seul qui en a la garde"],
          ["B*", "L'enfant vit ailleurs, par exemple chez l'autre parent", "Parent qui verse une contribution d'entretien"],
          ["C*", "L'enfant vit alternativement chez vous et ailleurs", "Garde alternée, étudiant qui a son propre logement en semaine"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, chapitre IV « Situation personnelle, professionnelle et familiale ».",
      },
      {
        type: "p",
        text: "Ces cases déterminent l'octroi des **déductions sociales** pour enfants (code 6.110) et pour personnes à charge (6.120), ainsi que la déduction des **frais de garde** (4.380). Un enfant donne droit à la déduction s'il est **mineur** ou en **apprentissage ou études**. Pour un enfant majeur en formation, la déduction est en principe accordée si son revenu brut reste **inférieur à CHF 18'000** sur douze mois. Les montants sont détaillés au chapitre [Déductions](/guide/fritax/deductions).",
      },
      {
        type: "screenshot",
        file: "02-enfants.webp",
        alt: "Rubrique des enfants à charge dans FriTax : nom, date de naissance, formation et cases A, B, C",
        caption: "Une ligne par enfant, avec la case A*, B* ou C* (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "02-fiche-enfant.webp",
        alt: "Fiche Enfants de FriTax : onglets Informations générales, Frais de garde et Pension alimentaire",
        caption: "Chaque enfant a sa fiche : informations générales (ménage, études, apprentissage, religion), frais de garde et pension alimentaire (FriTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Revenus et fortune d'un enfant mineur",
        text: "Le **salaire** d'un enfant mineur (apprentissage, job d'été) est imposé séparément : l'enfant remplit sa propre déclaration. En revanche, ses **autres revenus et sa fortune** (compte d'épargne, rente d'orphelin, part de succession) figurent dans la déclaration du parent qui détient l'autorité parentale.",
      },
      {
        type: "p",
        text: "Une **personne à charge** autre qu'un enfant (parent âgé, proche invalide) donne droit à **CHF 5'000** si elle ne peut subvenir elle-même à ses besoins et que vous assumez son entretien pour au moins CHF 6'700 par an. Cette déduction n'est pas accordée pour un conjoint.",
      },
      {
        type: "p",
        text: "Les **pensions alimentaires** reçues ou versées se détaillent dans la rubrique « **D, Pension alimentaire** » de la dernière page, en distinguant la part du conjoint et celle des enfants. Voir [Salaire et revenus](/guide/fritax/salaire) pour les pensions reçues et [Déductions](/guide/fritax/deductions) pour celles que vous versez.",
      },
    ],
    faq: [
      {
        q: "Nous nous sommes mariés en 2026 : une ou deux déclarations ?",
        a: "Une seule déclaration commune pour toute l'année 2026. C'est l'état civil au 31 décembre qui compte, et le couple bénéficie du splitting intégral pour toute l'année.",
      },
      {
        q: "Garde alternée : quelle case cocher dans FriTax ?",
        a: "La case C*, pour un enfant qui vit alternativement chez vous et ailleurs. La case B* concerne l'enfant qui vit chez l'autre parent, la case A* l'enfant qui vit dans votre ménage.",
      },
      {
        q: "Mon enfant de 17 ans fait un apprentissage : doit-il remplir une déclaration ?",
        a: "Oui. Le revenu de l'activité lucrative d'un enfant mineur est imposé séparément : il remplit sa propre déclaration. Ses autres revenus et sa fortune restent dans la déclaration du parent.",
      },
      {
        q: "Je suis arrivé d'un autre canton en 2026 : sur quelle période suis-je imposé ?",
        a: "Sur toute l'année 2026 dans le canton de Fribourg, qui est votre domicile au 31 décembre. Déclarez tous vos revenus de l'année, y compris ceux réalisés avant le déménagement.",
      },
    ],
  },
  en: {
    title: "Personal situation in FriTax: marital status, religion, children and boxes A, B, C",
    navTitle: "Personal situation",
    metaTitle: "FriTax: filling in page 1, dependent children and boxes A, B, C (2026)",
    metaDescription:
      "How to fill in page 1 of the Fribourg return in FriTax: marital status on 31 December, marriage or divorce during the year, religion and church tax, children and dependants (boxes A*, B*, C*).",
    keywords: [
      "fritax children",
      "fribourg tax return page 1",
      "fribourg tax dependants",
      "shared custody tax fribourg",
      "church tax fribourg",
      "marriage divorce tax fribourg",
    ],
    summary: [
      "Page 1 describes your situation **on 31 December 2026**: your marital status on that date applies to the whole year.",
      "Married in 2026: **one joint return** for the whole year. Divorced or separated in 2026: **one return each** for the whole year.",
      "For each child or dependant, tick box **A*** (lives in your household), **B*** (lives elsewhere, e.g. with the other parent) or **C*** (alternates between your home and elsewhere).",
      "The **religion** you state determines the church tax, levied as a percentage of the basic cantonal tax.",
    ],
    blocks: [
      { type: "h2", id: "etat-civil", text: "Marital status: the situation on 31 December counts" },
      {
        type: "p",
        text: "All the data on the first page must be completed or corrected. The SCC uses your personal, professional and family situation **on 31 December 2026** (or at the end of your tax liability if you leave Switzerland or die).",
      },
      {
        type: "table",
        head: ["Situation in 2026", "Return to file"],
        rows: [
          ["Marriage or registered partnership", "One joint return for the whole of 2026, signed or filed for both"],
          ["Divorce, legal or actual separation", "A separate return for each person, for the whole of 2026"],
          ["Death of a spouse", "A joint return up to the date of death, then a return for the surviving spouse for the rest of the year"],
          ["Arrival from another canton", "Taxed in Fribourg for the whole of 2026: all income for the year"],
          ["Move to another canton", "No Fribourg tax for 2026; instalments already paid are refunded"],
          ["Arrival from abroad or final departure abroad", "Taxed only for the period of residence in Switzerland"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, sections on change of marital status and change of residence.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Couples: joint income, softer rate",
        text: "Person 2's income is added to person 1's, whatever the matrimonial property regime. In return, the couple's income is taxed at the rate for **50%** of its amount (full splitting). Single-parent families benefit too.",
      },
      {
        type: "screenshot",
        file: "02-situation-personnelle.webp",
        alt: "Page 1 of the return in FriTax: surname, first name, date of birth, marital status, religion, occupation and employer of persons 1 and 2",
        caption: "Page 1: one column per person for couples (FriTax 2025)",
      },

      { type: "h2", id: "religion", text: "Religion and church tax" },
      {
        type: "p",
        text: "The **religion** field matters: parishes levy a **church tax** calculated as a percentage of the basic cantonal tax, like the municipal tax. Check the denomination shown for each person: municipal and parish multipliers are published at [fr.ch/scc/pp](https://www.fr.ch/scc/pp).",
      },
      {
        type: "p",
        text: "The email address you give allows the SCC to contact you through this channel, which is **not secure**. If you write to the SCC by email, it may reply the same way.",
      },

      { type: "h2", id: "enfants", text: "Children and dependants: boxes A*, B* and C*" },
      {
        type: "table",
        head: ["Box", "Meaning", "Example"],
        rows: [
          ["A*", "The child or person lives in your household", "Child of a married couple, child of a single parent with custody"],
          ["B*", "The child lives elsewhere, for example with the other parent", "Parent paying child maintenance"],
          ["C*", "The child alternates between your home and elsewhere", "Shared custody, student with their own lodgings during the week"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, chapter IV « Situation personnelle, professionnelle et familiale ».",
      },
      {
        type: "p",
        text: "These boxes decide the **social deductions** for children (code 6.110) and other dependants (6.120), as well as the **childcare** deduction (4.380). A child qualifies if they are a **minor** or in an **apprenticeship or education**. For an adult child in education, the deduction is normally granted if their gross income stays **below CHF 18,000** over twelve months. Amounts are detailed in the [Deductions](/guide/fritax/deductions) chapter.",
      },
      {
        type: "screenshot",
        file: "02-enfants.webp",
        alt: "Dependent children section in FriTax: name, date of birth, education and boxes A, B, C",
        caption: "One line per child, with box A*, B* or C* (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "02-fiche-enfant.webp",
        alt: "FriTax child sheet: General information, Childcare and Maintenance tabs",
        caption: "Each child has a sheet: general information (household, studies, apprenticeship, religion), childcare costs and maintenance (FriTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "A minor child's income and wealth",
        text: "A minor child's **earnings** (apprenticeship, summer job) are taxed separately: the child files their own return. Their **other income and wealth** (savings account, orphan's pension, share of an estate), however, go in the return of the parent with parental authority.",
      },
      {
        type: "p",
        text: "A **dependant** other than a child (elderly parent, disabled relative) gives a deduction of **CHF 5,000** if they cannot support themselves and you pay at least CHF 6,700 a year towards their keep. This deduction is not available for a spouse.",
      },
      {
        type: "p",
        text: "**Maintenance payments** received or paid are detailed in section « **D, Pension alimentaire** » (maintenance) on the last page, separating the spouse's share from the children's. See [Salary and income](/guide/fritax/salaire) for maintenance received and [Deductions](/guide/fritax/deductions) for maintenance paid.",
      },
    ],
    faq: [
      {
        q: "We married in 2026: one return or two?",
        a: "One joint return for the whole of 2026. Marital status on 31 December counts, and the couple gets full splitting for the whole year.",
      },
      {
        q: "Shared custody: which box do I tick in FriTax?",
        a: "Box C*, for a child who alternates between your home and elsewhere. Box B* is for a child living with the other parent, box A* for a child living in your household.",
      },
      {
        q: "My 17-year-old is an apprentice: do they need to file a return?",
        a: "Yes. A minor child's earnings are taxed separately: they file their own return. Their other income and wealth stay in the parent's return.",
      },
      {
        q: "I moved from another canton in 2026: which period am I taxed for?",
        a: "For the whole of 2026 in Fribourg, your place of residence on 31 December. Declare all your income for the year, including what you earned before the move.",
      },
    ],
  },
};
