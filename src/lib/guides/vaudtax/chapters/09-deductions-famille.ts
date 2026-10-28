import type { GuideChapter } from "../../types";

export const deductionsFamille: GuideChapter = {
  slug: "deductions-famille",
  readTime: 6,
  fr: {
    title: "Déductions famille dans VaudTax : frais de garde, couple biactif, pensions alimentaires",
    navTitle: "Déductions famille",
    metaTitle: "VaudTax 2026 : frais de garde, déduction famille, pension | NeoFidu",
    metaDescription:
      "Frais de garde jusqu'à CHF 15'200 par enfant, déduction pour couple biactif, déduction pour famille, pensions alimentaires et contribuable modeste : les déductions familiales vaudoises 2026.",
    keywords: [
      "frais de garde déduction vaud 15200",
      "déduction double activité vaud 1700",
      "déduction pour famille vaud",
      "pension alimentaire déduction impôt vaud",
      "contribuable modeste vaud",
      "crèche déduction impôt vaud",
    ],
    summary: [
      "**Frais de garde (code 670)** : jusqu'à **CHF 15'200** par enfant de moins de 14 ans, si la garde par un tiers est liée au travail, à la formation ou à une incapacité de gain.",
      "**Couple marié où les deux travaillent (code 235)** : **CHF 1'700** déduits du revenu le plus bas.",
      "**Déduction pour famille (code 725)** : CHF 1'300 par couple, CHF 2'800 pour un parent seul, plus CHF 1'000 par enfant, réduite au-delà de CHF 126'400 de revenu net.",
      "**Pension alimentaire** versée pour un ex-conjoint ou un enfant mineur : déductible à 100 % (code 630) ; reçue : imposable (code 280).",
    ],
    blocks: [
      { type: "h2", id: "frais-de-garde", text: "Frais de garde des enfants (code 670)" },
      { type: "path", items: ["Enfants et personnes à charge", "Afficher", "Enfants mineurs et enfants majeurs en apprentissage ou aux études, frais de garde"] },
      {
        type: "p",
        text: "Vous pouvez déduire jusqu'à **CHF 15'200 par enfant** de moins de 14 ans révolus qui vit avec vous, pour la garde assurée par un tiers : crèche, garderie, accueil parascolaire (UAPE, APEMS), maman de jour, nounou déclarée.",
      },
      {
        type: "list",
        items: [
          "Les **deux parents mariés travaillent** (ou sont en formation, ou en incapacité de gain), ou le parent seul travaille.",
          "La garde a lieu **pendant le temps de travail**, de formation ou d'incapacité.",
          "Seul le **coût de la garde** est déductible, pas les repas, les couches ou les activités de loisirs.",
          "Les **justificatifs sont obligatoires** : joignez les factures ou l'attestation annuelle de la structure.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Les camps de vacances, cours de sport ou de musique ne sont pas des frais de garde. Les frais payés aux grands-parents ne sont admis que s'il s'agit d'une vraie rémunération déclarée.",
      },

      { type: "h2", id: "double-activite", text: "Déduction pour double activité des conjoints (code 235)" },
      {
        type: "p",
        text: "Si les deux conjoints ont un revenu d'activité, **CHF 1'700** sont déduits du revenu le plus bas (après ses frais professionnels et cotisations de prévoyance). Si ce revenu net est inférieur à CHF 1'700, la déduction est limitée à ce montant. VaudTax l'applique automatiquement quand deux revenus d'activité sont saisis. Pour l'impôt fédéral, la déduction est nettement plus élevée et calculée à part.",
      },

      { type: "h2", id: "famille", text: "Déduction supplémentaire pour famille (code 725)" },
      {
        type: "table",
        head: ["Situation", "Montant 2026"],
        rows: [
          ["Couple marié ou partenaires enregistrés vivant ensemble", "CHF 1'300"],
          ["Parent seul tenant un ménage indépendant avec enfant (part 1,3)", "CHF 2'800"],
          ["Par enfant donnant droit à une part de 0,5", "+ CHF 1'000"],
        ],
        caption: "Montants complets jusqu'à CHF 126'400 de revenu net (code 650). Au-delà, la déduction baisse de CHF 100 par tranche de CHF 2'100, puis de CHF 1'000 au-delà de CHF 164'200. Source : ACI, tableau 2026.",
      },
      {
        type: "p",
        text: "Vous n'avez rien à calculer : VaudTax détermine cette déduction à partir de votre situation familiale et de votre revenu.",
      },

      { type: "h2", id: "pensions", text: "Pensions alimentaires (codes 630 et 280)" },
      {
        type: "table",
        head: ["Vous...", "Traitement fiscal", "Où dans VaudTax"],
        rows: [
          ["**versez** une pension à votre ex-conjoint ou pour un enfant mineur", "Déductible à 100 %", "Déductions spéciales sur le revenu, « Pensions alimentaires versées » (code 630)"],
          ["**recevez** une pension pour vous ou un enfant mineur", "Imposable", "Rentes et pensions, « Pensions alimentaires obtenues » (code 280)"],
          ["versez une contribution pour un **enfant majeur**", "Non déductible dès le mois suivant ses 18 ans", "Éventuellement part de 0,5 au quotient familial"],
        ],
      },
      {
        type: "p",
        text: "Le parent qui reçoit la pension imposable pour un enfant mineur obtient aussi la part de 0,5 au quotient familial. Voir [Situation personnelle et enfants](/guide/vaudtax/situation-personnelle).",
      },

      { type: "h2", id: "modeste", text: "Déduction pour contribuable modeste (code 695)" },
      {
        type: "p",
        text: "Vaud accorde une déduction supplémentaire aux ménages à revenu modeste. Le montant dépend du revenu et de la taille de la famille (en 2026, au maximum CHF 17'000 de base, plus CHF 5'700 pour un conjoint ou CHF 3'200 pour une famille monoparentale, plus CHF 3'500 par enfant) et diminue progressivement quand le revenu augmente. VaudTax la calcule automatiquement.",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour la crèche dans le canton de Vaud ?",
        a: "Jusqu'à CHF 15'200 par enfant de moins de 14 ans en 2026, pour les frais de garde par des tiers liés à l'activité lucrative, à la formation ou à l'incapacité de gain des parents. Les justificatifs doivent être joints.",
      },
      {
        q: "La déduction pour couple biactif est-elle automatique ?",
        a: "Oui, VaudTax l'applique dès que les deux conjoints ont un revenu d'activité saisi. Elle est de CHF 1'700 pour l'impôt cantonal, déduits du revenu le plus bas.",
      },
      {
        q: "Puis-je déduire la pension versée à mon enfant majeur aux études ?",
        a: "Non, les contributions pour un enfant majeur ne sont plus déductibles dès le mois suivant sa majorité. Vous pouvez en revanche obtenir la part de 0,5 au quotient familial si vous assurez son entretien.",
      },
    ],
  },
  en: {
    title: "Family deductions in VaudTax: childcare, dual-income couples, maintenance",
    navTitle: "Family deductions",
    metaTitle: "VaudTax 2026: childcare, family deduction, maintenance (English)",
    metaDescription:
      "Childcare up to CHF 15,200 per child, dual-income deduction, family deduction, maintenance payments and low-income deduction: Vaud family deductions for 2026.",
    keywords: [
      "childcare tax deduction vaud",
      "daycare tax deduction switzerland",
      "dual income deduction vaud",
      "alimony tax deduction switzerland",
      "family deduction vaud",
      "vaud tax return children",
    ],
    summary: [
      "**Childcare (code 670)**: up to **CHF 15,200** per child under 14, when third-party care is linked to work, training or inability to work.",
      "**Married couple both working (code 235)**: **CHF 1,700** deducted from the lower income.",
      "**Family deduction (code 725)**: CHF 1,300 per couple, CHF 2,800 for a single parent, plus CHF 1,000 per child, reduced above CHF 126,400 net income.",
      "**Maintenance** paid to an ex-spouse or for a minor child: 100% deductible (code 630); received: taxable (code 280).",
    ],
    blocks: [
      { type: "h2", id: "frais-de-garde", text: "Childcare costs (code 670)" },
      { type: "path", items: ["Enfants et personnes à charge", "Afficher", "Enfants mineurs et enfants majeurs en apprentissage ou aux études, frais de garde"] },
      {
        type: "p",
        text: "You can deduct up to **CHF 15,200 per child** under 14 living with you, for care provided by a third party: nursery, day care, after-school care (UAPE, APEMS), day parent, registered nanny.",
      },
      {
        type: "list",
        items: [
          "**Both married parents work** (or are in training or unable to work), or the single parent works.",
          "Care takes place **during working**, training or incapacity time.",
          "Only the **cost of care** is deductible, not meals, nappies or leisure activities.",
          "**Receipts are mandatory**: attach invoices or the provider's annual statement.",
        ],
      },

      { type: "h2", id: "double-activite", text: "Dual-income deduction (code 235)" },
      {
        type: "p",
        text: "If both spouses have earned income, **CHF 1,700** is deducted from the lower income (after its work expenses and pension contributions). VaudTax applies it automatically when two earned incomes are entered. For federal tax, the deduction is much higher and calculated separately.",
      },

      { type: "h2", id: "famille", text: "Additional family deduction (code 725)" },
      {
        type: "table",
        head: ["Situation", "2026 amount"],
        rows: [
          ["Married couple or registered partners living together", "CHF 1,300"],
          ["Single parent running a household alone with a child (1.3 share)", "CHF 2,800"],
          ["Per child giving a 0.5 share", "+ CHF 1,000"],
        ],
        caption: "Full amounts up to CHF 126,400 net income (code 650), then gradually reduced. Source: ACI 2026 table.",
      },

      { type: "h2", id: "pensions", text: "Maintenance payments (codes 630 and 280)" },
      {
        type: "table",
        head: ["You...", "Tax treatment", "Where in VaudTax"],
        rows: [
          ["**pay** maintenance to an ex-spouse or for a minor child", "100% deductible", "Special deductions, « Pensions alimentaires versées » (code 630)"],
          ["**receive** maintenance for yourself or a minor child", "Taxable", "Pensions, « Pensions alimentaires obtenues » (code 280)"],
          ["pay a contribution for an **adult child**", "Not deductible from the month after they turn 18", "Possibly a 0.5 family quotient share"],
        ],
      },

      { type: "h2", id: "modeste", text: "Low-income deduction (code 695)" },
      {
        type: "p",
        text: "The canton of Vaud grants an extra deduction to low-income households. The amount depends on income and family size and decreases as income rises. VaudTax calculates it automatically.",
      },
    ],
    faq: [
      {
        q: "How much can I deduct for daycare in the canton of Vaud?",
        a: "Up to CHF 15,200 per child under 14 in 2026, for third-party childcare linked to the parents' work, training or inability to work. Receipts must be attached.",
      },
      {
        q: "Is the dual-income deduction automatic?",
        a: "Yes, VaudTax applies it once both spouses have earned income entered. It is CHF 1,700 for cantonal tax, deducted from the lower income.",
      },
    ],
  },
};
