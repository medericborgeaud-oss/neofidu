import type { GuideChapter } from "../../types";

export const fortuneDettes: GuideChapter = {
  slug: "fortune-dettes",
  readTime: 5,
  fr: {
    title: "Autres éléments de fortune et dettes dans GeTax : véhicules, or, successions, hypothèques",
    navTitle: "Fortune et dettes",
    metaTitle: "GeTax 2026 : déclarer fortune, successions, dettes et intérêts",
    metaDescription:
      "Déclarer dans GeTax véhicules, or, bijoux, assurances-vie, successions (codes 16.40 à 16.80), dettes et intérêts passifs (annexe E), avec la déduction sociale sur la fortune 2026.",
    keywords: [
      "fortune déclaration genève",
      "dettes intérêts passifs genève",
      "succession non partagée getax",
      "déduction sociale fortune genève 2026",
      "annexe E getax",
      "or bijoux déclaration impôt genève",
    ],
    summary: [
      "Ce qui n'est ni un compte ni un titre se déclare dans « **Autres revenus et fortune** » : espèces, or, bijoux au-delà de **CHF 2'138**, véhicules, bateaux, collections (code 16.40), successions (codes 16.50 et 16.80).",
      "Les **dettes** au 31 décembre et les **intérêts** échus pendant l'année se déclarent dans « Intérêts et dettes » (annexe E), avec le créancier et la répartition entre conjoints.",
      "Les intérêts de dettes privées sont déductibles jusqu'au **rendement brut de la fortune augmenté de CHF 50'000**.",
      "Déduction sociale sur la fortune 2026 : **CHF 87'872** pour une personne seule, **CHF 175'743** pour un couple, plus **CHF 43'936** par charge de famille.",
    ],
    blocks: [
      { type: "h2", id: "autres-fortune", text: "Autres revenus et autres éléments de fortune" },
      { type: "path", items: ["Autres revenus et fortune", "Sélection Autres revenus et fortune"] },
      {
        type: "p",
        text: "Cochez les rubriques qui vous concernent : allocations, subsides et sous-location ; numéraires, métaux précieux et véhicules ; autres revenus et fortune ; successions non partagées ; successions reçues. Les écrans correspondants s'ouvrent ensuite.",
      },
      {
        type: "table",
        head: ["Élément", "Code", "Valeur à déclarer"],
        rows: [
          ["Espèces, or, métaux précieux", "16.40", "Cours officiel au 31 décembre (liste de l'Administration fédérale des contributions)"],
          ["Bijoux et argenterie", "16.40", "Valeur vénale, si elle dépasse CHF 2'138 (2026)"],
          ["Voitures, bateaux, avions, véhicules de collection", "16.40", "Valeur vénale au 31 décembre"],
          ["Collections d'art (hors meubles meublants)", "16.40", "Valeur vénale au 31 décembre"],
          ["Succession non partagée", "16.50", "Part du solde imposable selon le formulaire dédié"],
          ["Héritage reçu pendant l'année", "16.80", "Valeur des biens, date, nature, lien de parenté"],
          ["Allocation de logement de l'OCLPF", "16.35", "Montant reçu"],
        ],
        caption: "Sources : Guide de la déclaration 2025, AFC Genève (codes et règles) ; Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 15 RCEPF (CHF 2'138).",
      },
      {
        type: "p",
        text: "Pour un **héritage** reçu en 2026, joignez une copie des actes successoraux ou de la convention de partage. Les biens hérités apparaissent ensuite à leur place habituelle (comptes dans l'état des titres, immeubles dans l'annexe D) au 31 décembre.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Le mobilier de ménage et les effets personnels ne se déclarent pas. Les **assurances-vie** rachetables se déclarent à leur valeur de rachat au 31 décembre, selon l'attestation de l'assureur.",
      },

      { type: "h2", id: "dettes", text: "Dettes et intérêts passifs" },
      { type: "path", items: ["Intérêts et dettes"] },
      {
        type: "p",
        text: "Déclarez les dettes dont vous êtes débiteur **au 31 décembre** (hypothèques, crédits privés, prêts familiaux) et les intérêts **échus pendant l'année**. Indiquez le nom et le domicile du créancier, la date de constitution de la dette et, pour un couple, sa répartition entre les contribuables A et B. Pour un crédit contracté pendant l'année, précisez son but et joignez le justificatif.",
      },
      {
        type: "table",
        head: ["Intérêts", "Déductibilité"],
        rows: [
          ["Dettes privées (hypothèque, crédit, prêt)", "Jusqu'au rendement brut de la fortune + CHF 50'000"],
          ["Dettes commerciales (indépendants)", "Sans limitation"],
          ["Crédit de construction", "Non déductible"],
          ["Intérêts compris dans un leasing privé", "Non déductibles"],
          ["Amortissements", "Non déductibles"],
        ],
        caption: "Source : Guide de la déclaration 2025, AFC Genève.",
      },
      {
        type: "p",
        text: "Selon l'AFC, les justificatifs d'intérêts et de dettes ne sont à envoyer que la première fois ou en cas de changement significatif du montant. Gardez les autres à disposition.",
      },

      { type: "h2", id: "deduction-fortune", text: "La déduction sociale sur la fortune" },
      {
        type: "table",
        head: ["Situation", "Déduction 2026"],
        rows: [
          ["Personne seule", "CHF 87'872"],
          ["Couple marié, ou parent seul avec enfant mineur à charge", "CHF 175'743"],
          ["Par charge de famille", "CHF 43'936 (moins la fortune personnelle de l'apprenti ou de l'étudiant majeur)"],
        ],
        caption: "Source : Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 16 RCEPF.",
      },
      {
        type: "p",
        text: "GeTax applique cette déduction lui-même (code 51.50) : elle apparaît dans « Déductions », « Autres déductions », sous « Déduction sur la fortune ». Seule la fortune nette qui la dépasse est imposée.",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer sa voiture dans la déclaration genevoise ?",
        a: "Oui, à sa valeur vénale au 31 décembre, au code 16.40 (Autres revenus et fortune, Numéraires, métaux précieux, autos).",
      },
      {
        q: "Les intérêts hypothécaires sont-ils déductibles à Genève ?",
        a: "Oui, jusqu'au rendement brut de votre fortune augmenté de CHF 50'000. Ils se déclarent dans « Intérêts et dettes » (annexe E) avec le solde de la dette au 31 décembre.",
      },
      {
        q: "Quelle est la fortune non imposable à Genève en 2026 ?",
        a: "La déduction sociale sur la fortune est de CHF 87'872 pour une personne seule et de CHF 175'743 pour un couple marié, plus CHF 43'936 par charge de famille.",
      },
      {
        q: "Comment déclarer un héritage reçu en 2026 ?",
        a: "Au code 16.80 (Successions) avec la valeur des biens, la date de dévolution, leur nature et votre lien de parenté, en joignant les actes. Les biens figurent ensuite dans votre fortune au 31 décembre.",
      },
    ],
  },
  en: {
    title: "Other assets and debts in GeTax: vehicles, gold, inheritances, mortgages",
    navTitle: "Wealth and debts",
    metaTitle: "GeTax 2026: declaring assets, inheritances, debts and interest",
    metaDescription:
      "Declaring vehicles, gold, jewellery, life insurance, inheritances (codes 16.40 to 16.80), debts and interest paid (schedule E) in GeTax, with the 2026 Geneva wealth allowance.",
    keywords: [
      "geneva wealth tax return",
      "mortgage interest deduction geneva",
      "inheritance tax return geneva",
      "geneva wealth allowance 2026",
      "getax debts",
      "declare car tax return geneva",
    ],
    summary: [
      "Anything that is neither an account nor a security goes in « **Autres revenus et fortune** » (other income and assets): cash, gold, jewellery above **CHF 2,138**, vehicles, boats, collections (code 16.40), inheritances (codes 16.50 and 16.80).",
      "**Debts** on 31 December and **interest** due during the year go in « Intérêts et dettes » (schedule E), with the creditor and the split between spouses.",
      "Interest on private debts is deductible up to **gross investment income plus CHF 50,000**.",
      "2026 wealth allowance: **CHF 87,872** for a single person, **CHF 175,743** for a couple, plus **CHF 43,936** per dependant.",
    ],
    blocks: [
      { type: "h2", id: "autres-fortune", text: "Other income and other assets" },
      { type: "path", items: ["Autres revenus et fortune", "Sélection Autres revenus et fortune"] },
      {
        type: "p",
        text: "Tick what applies: allowances, subsidies and subletting; cash, precious metals and vehicles; other income and assets; undivided estates; inheritances received. The matching screens then open.",
      },
      {
        type: "table",
        head: ["Item", "Code", "Value to declare"],
        rows: [
          ["Cash, gold, precious metals", "16.40", "Official rate on 31 December (Swiss Federal Tax Administration list)"],
          ["Jewellery and silverware", "16.40", "Market value, if above CHF 2,138 (2026)"],
          ["Cars, boats, aircraft, collector vehicles", "16.40", "Market value on 31 December"],
          ["Art collections (other than furnishings)", "16.40", "Market value on 31 December"],
          ["Undivided estate", "16.50", "Share of the taxable balance per the dedicated form"],
          ["Inheritance received during the year", "16.80", "Value of assets, date, nature, relationship"],
          ["Housing allowance from the OCLPF", "16.35", "Amount received"],
        ],
        caption: "Sources: 2025 return guide, AFC Geneva (codes and rules); Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 15 RCEPF (CHF 2,138).",
      },
      {
        type: "p",
        text: "For an **inheritance** received in 2026, attach a copy of the estate documents or the division agreement. The inherited assets then appear in their usual place (accounts in the securities list, property in schedule D) on 31 December.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Household furniture and personal effects are not declared. **Life insurance** policies with a surrender value are declared at that value on 31 December, per the insurer's certificate.",
      },

      { type: "h2", id: "dettes", text: "Debts and interest paid" },
      { type: "path", items: ["Intérêts et dettes"] },
      {
        type: "p",
        text: "Declare the debts you owe **on 31 December** (mortgages, private loans, family loans) and the interest **due during the year**. Give the creditor's name and address, the date the debt was taken out and, for a couple, its split between taxpayers A and B. For a loan taken out during the year, state its purpose and attach the document.",
      },
      {
        type: "table",
        head: ["Interest", "Deductibility"],
        rows: [
          ["Private debts (mortgage, loan)", "Up to gross investment income + CHF 50,000"],
          ["Business debts (self-employed)", "Without limit"],
          ["Construction loan", "Not deductible"],
          ["Interest included in a private lease", "Not deductible"],
          ["Repayments", "Not deductible"],
        ],
        caption: "Source: 2025 return guide, AFC Geneva.",
      },
      {
        type: "p",
        text: "According to the AFC, interest and debt documents only need to be sent the first time or when the amount changes significantly. Keep the others available.",
      },

      { type: "h2", id: "deduction-fortune", text: "The wealth allowance" },
      {
        type: "table",
        head: ["Situation", "2026 allowance"],
        rows: [
          ["Single person", "CHF 87,872"],
          ["Married couple, or single parent with a dependent minor child", "CHF 175,743"],
          ["Per dependant", "CHF 43,936 (minus the personal wealth of an adult apprentice or student)"],
        ],
        caption: "Source: Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 16 RCEPF.",
      },
      {
        type: "p",
        text: "GeTax applies this allowance itself (code 51.50): it appears under « Déductions », « Autres déductions », « Déduction sur la fortune ». Only net wealth above it is taxed.",
      },
    ],
    faq: [
      {
        q: "Do I have to declare my car in the Geneva tax return?",
        a: "Yes, at its market value on 31 December, under code 16.40 (« Autres revenus et fortune », « Numéraires, métaux précieux, autos »).",
      },
      {
        q: "Is mortgage interest deductible in Geneva?",
        a: "Yes, up to your gross investment income plus CHF 50,000. It goes in « Intérêts et dettes » (schedule E) with the outstanding debt on 31 December.",
      },
      {
        q: "How much wealth is tax-free in Geneva in 2026?",
        a: "The wealth allowance is CHF 87,872 for a single person and CHF 175,743 for a married couple, plus CHF 43,936 per dependant.",
      },
      {
        q: "How do I declare an inheritance received in 2026?",
        a: "Under code 16.80 (« Successions ») with the value of the assets, the date, their nature and your relationship to the deceased, attaching the documents. The assets then appear in your wealth on 31 December.",
      },
    ],
  },
};
