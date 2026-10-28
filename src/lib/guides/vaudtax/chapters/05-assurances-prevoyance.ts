import type { GuideChapter } from "../../types";

export const assurancesPrevoyance: GuideChapter = {
  slug: "assurances-prevoyance",
  readTime: 7,
  fr: {
    title: "Assurance-maladie, 3e pilier et rachats LPP dans VaudTax (2026)",
    navTitle: "Assurances et 3e pilier",
    metaTitle: "VaudTax 2026 : primes maladie, 3e pilier A et rachat LPP | NeoFidu",
    metaDescription:
      "Où déclarer vos primes d'assurance-maladie, vos versements au 3e pilier A (CHF 7'258 en 2026), le nouveau rachat 3a et les rachats de caisse de pension dans VaudTax.",
    keywords: [
      "3e pilier déduction vaud 2026",
      "7258 3e pilier 2026",
      "rachat 3a 2026",
      "déduction assurance maladie vaud",
      "rachat lpp déduction vaud",
      "code 310 vaudtax",
    ],
    summary: [
      "**Primes maladie et assurance-vie (code 300)** : déduction plafonnée à **CHF 5'000** (personne seule), **CHF 9'900** (couple marié) et **CHF 1'300** par enfant, subsides déduits.",
      "**3e pilier A (code 310)** : jusqu'à **CHF 7'258** en 2026 si vous êtes affilié à une caisse de pension, jusqu'à 20 % du revenu (max. CHF 36'288) sinon.",
      "**Nouveau dès 2026** : vous pouvez **racheter** une année 3a non cotisée (à partir de 2025), en plus du versement 2026, et le déduire dès la déclaration 2026.",
      "**Rachat LPP (code 320)** : déductible en totalité s'il n'est pas déjà déduit du salaire (chiffre 10.2 du certificat). Attestation obligatoire dès CHF 10'000.",
    ],
    blocks: [
      { type: "h2", id: "primes", text: "Primes d'assurance-maladie, accident et vie (code 300)" },
      { type: "path", items: ["Primes et cotisations d'assurances (codes 300, 310, 320, 640)", "Afficher", "Cotisations assurance-maladie et accidents, subsides, assurances sur la vie et de prévoyance"] },
      {
        type: "p",
        text: "Indiquez le **montant annuel réel** de vos primes (assurance de base, accident et complémentaires) pour vous et chaque enfant à charge, ainsi que les primes d'assurance-vie et de rentes viagères. Indiquez **obligatoirement les subsides** reçus : ils sont retranchés des primes. VaudTax retient ensuite le plus bas entre le montant net et le plafond.",
      },
      {
        type: "table",
        head: ["Situation au 31 décembre", "Plafond de déduction 2026"],
        rows: [
          ["Personne célibataire, veuve, séparée ou divorcée", "CHF 5'000"],
          ["Couple marié ou partenaires enregistrés", "CHF 9'900"],
          ["Par enfant donnant droit à une part de 0,5", "+ CHF 1'300"],
          ["Si vous payez les primes d'une personne à charge (code 680)", "+ CHF 1'300 au maximum"],
        ],
        caption: "Source : Tableau des principales déductions vaudoises 2026 (ACI).",
      },
      {
        type: "p",
        text: "Exemple : couple avec deux enfants, primes de CHF 17'000, subsides de CHF 4'032. Montant net CHF 12'968, plafond 9'900 + 2 × 1'300 = CHF 12'500. Déduction retenue : **CHF 12'500**.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Le plafond vaudois est généreux. Pour l'impôt fédéral, les plafonds sont beaucoup plus bas et incluent d'autres éléments : VaudTax fait ce calcul tout seul.",
      },

      { type: "h2", id: "pilier-3a", text: "3e pilier A (code 310)" },
      {
        type: "p",
        text: "Le 3e pilier A est la déduction la plus rentable pour la plupart des salariés. Saisissez le montant versé en 2026 selon l'**attestation** de votre banque ou assurance (pièce obligatoire). Chaque conjoint déclare son propre contrat.",
      },
      {
        type: "table",
        head: ["Votre situation", "Versement maximum déductible en 2026"],
        rows: [
          ["Affilié à une caisse de pension (cas de la plupart des salariés)", "**CHF 7'258**"],
          ["Pas de caisse de pension (indépendant, petit salaire)", "20 % du revenu net d'activité, max. **CHF 36'288**"],
        ],
      },
      {
        type: "list",
        items: [
          "Il faut une **activité lucrative soumise à l'AVS** pendant l'année. Sans revenu d'activité, pas de déduction.",
          "Une interruption passagère (chômage, maladie, service militaire) ne fait pas perdre le droit.",
          "Seuls les montants **effectivement versés** sur le compte avant le 31 décembre comptent.",
        ],
      },
      { type: "screenshot", file: "05-pilier-3a.webp", alt: "Formulaire Primes et cotisations d'assurances : primes, subsides, 3e pilier A et rachats LPP", caption: "Primes, subsides et 3e pilier A se saisissent dans le même formulaire (VaudTax 2025, mode simulation, données fictives)" },

      { type: "h2", id: "rachat-3a", text: "Nouveau : le rachat 3a (années manquantes)" },
      {
        type: "p",
        text: "Depuis le 1er janvier 2026, il est possible de **combler une année où vous n'avez pas versé le maximum au 3e pilier**, pour les années à partir de 2025. Concrètement, en 2026 vous pouvez racheter la lacune de 2025 en plus de votre versement ordinaire 2026.",
      },
      {
        type: "steps",
        items: [
          "Vérifiez que vous aviez un revenu soumis à l'AVS en 2025 (année rachetée) **et** en 2026.",
          "Versez d'abord le **maximum ordinaire 2026** (CHF 7'258 si vous avez une caisse de pension).",
          "Faites ensuite le rachat de la lacune 2025, plafonné à CHF 7'258 par année rachetée.",
          "Déclarez le tout avec l'attestation de rachat de votre fondation : le rachat est déductible **dès la déclaration 2026**.",
        ],
      },
      {
        type: "p",
        text: "Exemple : rien versé en 2025, CHF 7'258 versés en 2026 et rachat de CHF 7'258 pour 2025 = **CHF 14'516** de déduction en 2026. La rubrique exacte de saisie sera confirmée à la sortie de VaudTax 2026.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Pour estimer l'économie d'impôt de vos versements, utilisez notre [simulateur 3e pilier](/simulateur/3eme-pilier).",
      },

      { type: "h2", id: "rachat-lpp", text: "Rachats de caisse de pension (code 320)" },
      {
        type: "p",
        text: "Les cotisations LPP ordinaires sont déjà déduites de votre salaire net (chiffre 11) : ne les mettez pas ici. Le code 320 sert aux **rachats d'années d'assurance** que vous avez versés vous-même, et qui ne figurent pas déjà au chiffre 10.2 de votre certificat de salaire.",
      },
      {
        type: "list",
        items: [
          "L'attestation de la caisse de pension est **obligatoire dès CHF 10'000** de rachat, facultative en dessous.",
          "Un retrait en capital dans les 3 ans qui suivent un rachat peut remettre en cause la déduction.",
          "L'office d'impôt peut vous demander l'« Annexe 06 » à faire remplir par votre caisse.",
        ],
      },

      { type: "h2", id: "autres-cotisations", text: "Autres cotisations (code 340)" },
      {
        type: "p",
        text: "Les primes d'assurance perte de gain maladie retenues sur votre salaire (si elles ne sont pas déjà déduites) se déclarent au code 340. Les personnes sans activité lucrative qui paient elles-mêmes des cotisations AVS les déclarent au code 640, dans la même rubrique.",
      },
    ],
    faq: [
      {
        q: "Quel est le plafond du 3e pilier A en 2026 ?",
        a: "CHF 7'258 pour les personnes affiliées à une caisse de pension, et 20 % du revenu net d'activité, au maximum CHF 36'288, pour celles qui n'ont pas de 2e pilier.",
      },
      {
        q: "Puis-je racheter mon 3e pilier pour les années avant 2025 ?",
        a: "Non. Les rachats 3a ne sont possibles que pour les lacunes nées à partir de l'année 2025. Le premier rachat possible se fait en 2026, pour l'année 2025.",
      },
      {
        q: "Combien puis-je déduire pour l'assurance-maladie dans le canton de Vaud ?",
        a: "Au maximum CHF 5'000 pour une personne seule, CHF 9'900 pour un couple marié et CHF 1'300 par enfant à charge, après déduction des subsides reçus.",
      },
      {
        q: "Les primes de ma complémentaire sont-elles déductibles ?",
        a: "Oui, elles entrent dans le total des primes du code 300, avec l'assurance de base et l'assurance-vie, dans la limite du plafond.",
      },
    ],
  },
  en: {
    title: "Health insurance, pillar 3a and pension fund buy-ins in VaudTax (2026)",
    navTitle: "Insurance and pillar 3a",
    metaTitle: "VaudTax 2026: health insurance, pillar 3a and LPP buy-ins (English)",
    metaDescription:
      "Where to declare health insurance premiums, pillar 3a contributions (CHF 7,258 in 2026), the new 3a catch-up payments and pension fund buy-ins in VaudTax.",
    keywords: [
      "pillar 3a deduction 2026",
      "pillar 3a 7258",
      "pillar 3a retroactive payment 2026",
      "health insurance tax deduction vaud",
      "pension fund buy in tax deduction",
      "vaudtax pillar 3a",
    ],
    summary: [
      "**Health and life insurance premiums (code 300)**: deduction capped at **CHF 5,000** (single), **CHF 9,900** (married couple) and **CHF 1,300** per child, minus any subsidies.",
      "**Pillar 3a (code 310)**: up to **CHF 7,258** in 2026 if you belong to a pension fund, up to 20% of income (max CHF 36,288) otherwise.",
      "**New from 2026**: you can **catch up** a missed 3a year (from 2025 onwards) on top of your 2026 contribution and deduct it in the 2026 return.",
      "**Pension fund buy-in (code 320)**: fully deductible if not already deducted from salary (box 10.2 of the certificate). Certificate mandatory from CHF 10,000.",
    ],
    blocks: [
      { type: "h2", id: "primes", text: "Health, accident and life insurance premiums (code 300)" },
      { type: "path", items: ["Primes et cotisations d'assurances (codes 300, 310, 320, 640)", "Afficher", "Cotisations assurance-maladie et accidents, subsides, assurances sur la vie et de prévoyance"] },
      {
        type: "p",
        text: "Enter the **actual annual amount** of your premiums (basic, accident and supplementary cover) for yourself and each dependent child, plus any life and annuity insurance premiums. You **must also enter subsidies** received: they are subtracted. VaudTax then keeps the lower of the net amount and the cap.",
      },
      {
        type: "table",
        head: ["Situation on 31 December", "2026 deduction cap"],
        rows: [
          ["Single, widowed, separated or divorced", "CHF 5,000"],
          ["Married couple or registered partners", "CHF 9,900"],
          ["Per child giving a 0.5 share", "+ CHF 1,300"],
          ["If you pay premiums for a dependant (code 680)", "+ up to CHF 1,300"],
        ],
        caption: "Source: ACI table of main Vaud deductions 2026.",
      },
      {
        type: "callout",
        tone: "info",
        text: "The Vaud cap is generous. Federal caps are much lower and include other items: VaudTax handles that calculation for you.",
      },

      { type: "h2", id: "pilier-3a", text: "Pillar 3a (code 310)" },
      {
        type: "p",
        text: "Pillar 3a is the most valuable deduction for most employees. Enter the amount paid in 2026 according to the **certificate** from your bank or insurer (mandatory document). Each spouse declares their own contract.",
      },
      {
        type: "table",
        head: ["Your situation", "Maximum deductible contribution 2026"],
        rows: [
          ["Member of a pension fund (most employees)", "**CHF 7,258**"],
          ["No pension fund (self-employed, low salary)", "20% of net earned income, max **CHF 36,288**"],
        ],
      },
      {
        type: "list",
        items: [
          "You need **earned income subject to AVS/AHV** during the year. No earned income, no deduction.",
          "A temporary interruption (unemployment, sickness, military service) does not remove the right.",
          "Only amounts **actually credited** to the account by 31 December count.",
        ],
      },
      { type: "screenshot", file: "05-pilier-3a.webp", alt: "Insurance premiums form: premiums, subsidies, pillar 3a and pension buy-ins", caption: "Premiums, subsidies and pillar 3a are entered on the same form (VaudTax 2025, simulation mode, fictitious data)" },

      { type: "h2", id: "rachat-3a", text: "New: pillar 3a catch-up payments" },
      {
        type: "p",
        text: "Since 1 January 2026, you can **fill a year in which you did not pay the full 3a amount**, for years from 2025 onwards. In practice, in 2026 you can catch up your 2025 gap on top of your ordinary 2026 contribution.",
      },
      {
        type: "steps",
        items: [
          "Check that you had AVS-subject earned income in 2025 (the year caught up) **and** in 2026.",
          "First pay the **full ordinary 2026 amount** (CHF 7,258 with a pension fund).",
          "Then make the catch-up payment for 2025, capped at CHF 7,258 per year caught up.",
          "Declare everything with your foundation's catch-up certificate: it is deductible **from the 2026 return**.",
        ],
      },
      {
        type: "p",
        text: "Example: nothing paid in 2025, CHF 7,258 paid in 2026 plus a CHF 7,258 catch-up for 2025 = **CHF 14,516** deduction in 2026. The exact VaudTax field will be confirmed when VaudTax 2026 opens.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Estimate your tax saving with our [pillar 3a simulator](/simulateur/3eme-pilier).",
      },

      { type: "h2", id: "rachat-lpp", text: "Pension fund buy-ins (code 320)" },
      {
        type: "p",
        text: "Ordinary pension fund contributions are already deducted from your net salary (box 11): do not enter them here. Code 320 is for **voluntary buy-ins** you paid yourself that do not already appear in box 10.2 of your salary certificate.",
      },
      {
        type: "list",
        items: [
          "The pension fund certificate is **mandatory from CHF 10,000**, optional below.",
          "A lump-sum withdrawal within 3 years of a buy-in can cancel the deduction.",
          "The tax office may ask for « Annexe 06 » to be completed by your pension fund.",
        ],
      },

      { type: "h2", id: "autres-cotisations", text: "Other contributions (code 340)" },
      {
        type: "p",
        text: "Sickness loss-of-earnings insurance premiums withheld from your salary (if not already deducted) go under code 340. People without earned income who pay AVS contributions themselves declare them under code 640 in the same section.",
      },
    ],
    faq: [
      {
        q: "What is the pillar 3a limit for 2026?",
        a: "CHF 7,258 for people with a pension fund, and 20% of net earned income up to CHF 36,288 for people without a 2nd pillar.",
      },
      {
        q: "Can I catch up pillar 3a years before 2025?",
        a: "No. Catch-up payments are only possible for gaps from 2025 onwards. The first possible catch-up is in 2026, for 2025.",
      },
      {
        q: "How much health insurance can I deduct in the canton of Vaud?",
        a: "Up to CHF 5,000 for a single person, CHF 9,900 for a married couple and CHF 1,300 per dependent child, after subtracting any subsidies.",
      },
    ],
  },
};
