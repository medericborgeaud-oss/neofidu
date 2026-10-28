import type { GuideChapter } from "../../types";

export const prevoyance: GuideChapter = {
  slug: "prevoyance",
  readTime: 6,
  fr: {
    title: "3e pilier A, rachats LPP et assurances-vie dans GeTax : déductions 2026",
    navTitle: "Prévoyance",
    metaTitle: "GeTax 2026 : déduire 3e pilier A, rachat 3a et rachat LPP",
    metaDescription:
      "Où déduire le 3e pilier A (code 31.40, CHF 7'258), les nouveaux rachats 3a de 2026, les rachats LPP (code 31.30) et les assurances-vie (code 52.11) dans GeTax.",
    keywords: [
      "3e pilier genève 2026",
      "code 31.40 getax",
      "rachat 3a 2026 déclaration",
      "rachat lpp déduction genève",
      "assurance vie déduction genève",
      "pilier 3a 7258",
    ],
    summary: [
      "**3e pilier A** (code 31.40 pour le contribuable A, 41.40 pour B) : jusqu'à **CHF 7'258** avec caisse de pension, ou 20 % du revenu d'activité jusqu'à **CHF 36'288** sans 2e pilier. Montants inchangés en 2026.",
      "**Nouveauté 2026** : les cotisations 3a non versées en 2025 peuvent être rachetées en 2026 et se déduisent pour la première fois dans la déclaration 2026.",
      "**Rachats LPP** : chiffre 10.2 du certificat ou attestation de la caisse, code 31.30. Un retrait en capital dans les trois ans qui suivent fait perdre la déduction.",
      "**Assurances-vie et intérêts d'épargne** (3e pilier B) : plafond cantonal 2026 de **CHF 3'528** pour un couple et **CHF 2'352** pour une personne seule, plus CHF 962 par charge de famille.",
    ],
    blocks: [
      { type: "h2", id: "3a", text: "Le 3e pilier A" },
      { type: "path", items: ["Revenu", "Déductions sociales - Contr.A", "Cotisations au 3ème pilier A"] },
      {
        type: "screenshot",
        file: "05-pilier-3a.webp",
        alt: "Écran Déductions sociales de GeTax : cotisations au 3ème pilier A en colonnes ICC et IFD",
        caption: "Le montant saisi en colonne ICC est repris automatiquement pour l'IFD (GeTax 2025, données fictives)",
      },
      {
        type: "table",
        head: ["Situation", "Déduction maximale 2025 et 2026"],
        rows: [
          ["Affilié à une caisse de pension (2e pilier)", "CHF 7'258"],
          ["Sans 2e pilier (indépendant, par exemple)", "20 % du revenu net d'activité, max. CHF 36'288"],
        ],
        caption: "Sources : aide de GeTax 2025, AFC Genève ; Confédération, « Déductions maximales pilier 3a pour l'année fiscale 2026 » (montants inchangés), 17 novembre 2025.",
      },
      {
        type: "p",
        text: "Saisissez les versements **effectués** pendant l'année, pour chaque contribuable séparément, et joignez **dans tous les cas** l'attestation de la banque ou de l'assurance. Un versement supérieur au plafond n'est pas admis et doit être restitué par l'institution. Les cotisations à un 3e pilier B (assurance-vie libre) ne vont pas ici mais au code 52.11 (voir plus bas).",
      },

      { type: "h2", id: "rachat-3a", text: "Nouveau en 2026 : le rachat de 3e pilier A" },
      {
        type: "p",
        text: "Depuis 2026, on peut combler une **lacune de cotisation 3a** des années précédentes, au plus tôt pour l'année 2025. Le rachat est déductible du revenu imposable **pour la première fois dans la déclaration 2026**, déposée en 2027. Conditions fixées par la Confédération et rappelées par l'AFC :",
      },
      {
        type: "list",
        items: [
          "avoir eu un revenu soumis à l'AVS en Suisse pendant l'année à rattraper **et** pendant l'année du rachat ;",
          "avoir d'abord versé la cotisation ordinaire complète de l'année du rachat ;",
          "rachat limité, pour chaque année manquante, à la « petite cotisation » (CHF 7'258 en 2026), sur dix ans au plus.",
        ],
      },
      {
        type: "table",
        head: ["Exemple (revenu AVS en 2025 et 2026)", "Versé pour 2025", "Rachat en 2026", "Déduction 2026"],
        rows: [
          ["A : cotisations complètes, pas de rachat", "CHF 7'258", "0", "CHF 7'258"],
          ["B : rien versé en 2025", "0", "CHF 7'258", "CHF 14'516"],
          ["C : versement partiel en 2025", "CHF 4'500", "CHF 2'758", "CHF 10'016"],
        ],
        caption: "Source : AFC Genève, « Rachats dans le pilier 3a : ce qui change dans la déclaration d'impôt 2026 », 2026.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Le rachat passe par votre banque ou assurance 3a, qui vérifie la lacune et délivre une attestation distincte. Gardez-la avec l'attestation ordinaire et joignez les deux à la déclaration 2026. Pour aller plus loin : [plafonds et avantages du 3e pilier 2026](/blog/pilier-3a-2026-plafonds-avantages).",
      },

      { type: "h2", id: "rachat-lpp", text: "Rachats de 2e pilier (LPP)" },
      {
        type: "p",
        text: "Un rachat dans la caisse de pension figure souvent au **chiffre 10.2** du certificat de salaire : reportez-le dans « Rachat(s) de la prévoyance professionnelle » (code 31.30) sur l'écran de l'activité dépendante. S'il a été payé directement à la caisse, utilisez son attestation. Dans tous les cas, joignez le justificatif émis par la caisse.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Attention au retrait en capital dans les trois ans",
        text: "Un rachat suivi d'un retrait en capital dans les trois ans n'est pas déductible. Si la taxation a déjà admis la déduction, l'AFC la corrige ensuite par un rappel d'impôt. Pensez-y avant un achat immobilier ou une retraite anticipée.",
      },

      { type: "h2", id: "assurances-vie", text: "Assurances-vie et 3e pilier B" },
      { type: "path", items: ["Déductions", "Assurances-vie et vieillesse"] },
      {
        type: "p",
        text: "Les primes d'assurance-vie (code 52.11) et les **intérêts échus des capitaux d'épargne** (code 56.30, repris de l'état des titres) partagent un **même plafond**, calculé au code 52.15 pour l'ICC.",
      },
      {
        type: "table",
        head: ["Plafond ICC 2026", "Montant"],
        rows: [
          ["Couple marié", "CHF 3'528"],
          ["Personne seule", "CHF 2'352"],
          ["Supplément par charge de famille", "CHF 962"],
          ["Personne ou couple sans 2e pilier ni 3e pilier A", "plafonds doublés"],
          ["Un seul des conjoints affilié", "plafond du couple × 1,5"],
        ],
        caption: "Source : Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 8 RCEPF.",
      },
      {
        type: "p",
        text: "Pour l'IFD, les plafonds sont fixés par la Confédération ; GeTax les applique et affiche le sous-total au code 52.10.",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour le 3e pilier A en 2026 ?",
        a: "CHF 7'258 si vous êtes affilié à une caisse de pension, sinon 20 % du revenu net d'activité jusqu'à CHF 36'288. Les montants sont inchangés par rapport à 2025.",
      },
      {
        q: "Où saisir le 3e pilier dans GeTax ?",
        a: "Revenu, Déductions sociales, champ « Cotisations au 3ème pilier A » (code 31.40 pour le contribuable A, 41.40 pour B). Joignez toujours l'attestation.",
      },
      {
        q: "Le rachat 3a est-il déductible dans la déclaration 2026 ?",
        a: "Oui. Un rachat effectué en 2026 pour une lacune de 2025 est déductible pour la première fois dans la déclaration 2026, en plus de la cotisation ordinaire 2026, aux conditions fixées par la Confédération.",
      },
      {
        q: "Mon rachat LPP n'apparaît pas sur mon certificat de salaire. Que faire ?",
        a: "Saisissez-le quand même au code 31.30 avec l'attestation de votre caisse de pension, qui sert de justificatif.",
      },
    ],
  },
  en: {
    title: "Pillar 3a, pension fund buy-ins and life insurance in GeTax: 2026 deductions",
    navTitle: "Pension savings",
    metaTitle: "GeTax 2026: deducting pillar 3a, 3a catch-up and pension buy-ins",
    metaDescription:
      "Where to deduct pillar 3a (code 31.40, CHF 7,258), the new 2026 pillar 3a catch-up payments, pension fund buy-ins (code 31.30) and life insurance (code 52.11) in GeTax.",
    keywords: [
      "pillar 3a geneva 2026",
      "getax pillar 3a",
      "pillar 3a catch up 2026",
      "pension fund buy-in deduction geneva",
      "life insurance deduction geneva",
      "pillar 3a 7258",
    ],
    summary: [
      "**Pillar 3a** (code 31.40 for taxpayer A, 41.40 for B): up to **CHF 7,258** with a pension fund, or 20% of earned income up to **CHF 36,288** without a 2nd pillar. Amounts unchanged in 2026.",
      "**New in 2026**: 3a contributions not paid in 2025 can be made up in 2026 and are deductible for the first time in the 2026 return.",
      "**Pension fund buy-ins**: box 10.2 of the salary certificate or the fund's statement, code 31.30. A lump-sum withdrawal within three years cancels the deduction.",
      "**Life insurance and savings interest** (pillar 3b): 2026 cantonal cap of **CHF 3,528** for a couple and **CHF 2,352** for a single person, plus CHF 962 per dependant.",
    ],
    blocks: [
      { type: "h2", id: "3a", text: "Pillar 3a" },
      { type: "path", items: ["Revenu", "Déductions sociales - Contr.A", "Cotisations au 3ème pilier A"] },
      {
        type: "screenshot",
        file: "05-pilier-3a.webp",
        alt: "GeTax social deductions screen: pillar 3a contributions in cantonal and federal columns",
        caption: "The amount entered in the ICC column is copied automatically to IFD (GeTax 2025, fictitious data)",
      },
      {
        type: "table",
        head: ["Situation", "Maximum deduction 2025 and 2026"],
        rows: [
          ["Member of a pension fund (2nd pillar)", "CHF 7,258"],
          ["No 2nd pillar (self-employed, for example)", "20% of net earned income, max. CHF 36,288"],
        ],
        caption: "Sources: GeTax 2025 help, AFC Geneva; Swiss Confederation, \"Maximum pillar 3a deductions for tax year 2026\" (unchanged), 17 November 2025.",
      },
      {
        type: "p",
        text: "Enter the payments **made** during the year, separately for each taxpayer, and **always** attach the bank or insurer's certificate. Payments above the cap are not accepted and must be refunded by the provider. Contributions to a pillar 3b (free life insurance) do not go here but under code 52.11 (see below).",
      },

      { type: "h2", id: "rachat-3a", text: "New in 2026: pillar 3a catch-up payments" },
      {
        type: "p",
        text: "Since 2026, you can fill a **3a contribution gap** from previous years, starting with 2025. The catch-up payment is deductible from taxable income **for the first time in the 2026 return**, filed in 2027. Conditions set by the Confederation and summarised by the AFC:",
      },
      {
        type: "list",
        items: [
          "AHV-liable income in Switzerland in the year being made up **and** in the year of the catch-up payment;",
          "the full ordinary contribution for the catch-up year must be paid first;",
          "for each missing year, the catch-up is limited to the \"small contribution\" (CHF 7,258 in 2026), over ten years at most.",
        ],
      },
      {
        type: "table",
        head: ["Example (AHV income in 2025 and 2026)", "Paid for 2025", "Catch-up in 2026", "2026 deduction"],
        rows: [
          ["A: full contributions, no catch-up", "CHF 7,258", "0", "CHF 7,258"],
          ["B: nothing paid in 2025", "0", "CHF 7,258", "CHF 14,516"],
          ["C: partial payment in 2025", "CHF 4,500", "CHF 2,758", "CHF 10,016"],
        ],
        caption: "Source: AFC Geneva, \"Rachats dans le pilier 3a : ce qui change dans la déclaration d'impôt 2026\", 2026.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "The catch-up is made through your 3a bank or insurer, which checks the gap and issues a separate certificate. Keep it with the ordinary certificate and attach both to your 2026 return. More: [pillar 3a limits and benefits 2026](/blog/pilier-3a-2026-plafonds-avantages).",
      },

      { type: "h2", id: "rachat-lpp", text: "2nd pillar buy-ins" },
      {
        type: "p",
        text: "A pension fund buy-in often appears in **box 10.2** of the salary certificate: enter it in « Rachat(s) de la prévoyance professionnelle » (code 31.30) on the employment screen. If you paid the fund directly, use its statement. Either way, attach the fund's document.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Beware of a lump-sum withdrawal within three years",
        text: "A buy-in followed by a lump-sum withdrawal within three years is not deductible. If the assessment has already allowed it, the AFC corrects it later with a supplementary tax assessment. Keep this in mind before buying property or retiring early.",
      },

      { type: "h2", id: "assurances-vie", text: "Life insurance and pillar 3b" },
      { type: "path", items: ["Déductions", "Assurances-vie et vieillesse"] },
      {
        type: "p",
        text: "Life insurance premiums (code 52.11) and **savings interest** (code 56.30, carried over from the securities list) share **one cap**, computed under code 52.15 for cantonal tax.",
      },
      {
        type: "table",
        head: ["Cantonal cap 2026", "Amount"],
        rows: [
          ["Married couple", "CHF 3,528"],
          ["Single person", "CHF 2,352"],
          ["Extra per dependant", "CHF 962"],
          ["Person or couple with no 2nd pillar or pillar 3a", "caps doubled"],
          ["Only one spouse in a pension scheme", "couple cap × 1.5"],
        ],
        caption: "Source: Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 8 RCEPF.",
      },
      {
        type: "p",
        text: "For federal tax, the caps are set by the Confederation; GeTax applies them and shows the subtotal under code 52.10.",
      },
    ],
    faq: [
      {
        q: "How much pillar 3a can I deduct in 2026?",
        a: "CHF 7,258 if you are in a pension fund, otherwise 20% of net earned income up to CHF 36,288. The amounts are unchanged from 2025.",
      },
      {
        q: "Where do I enter pillar 3a in GeTax?",
        a: "« Revenu », « Déductions sociales », field « Cotisations au 3ème pilier A » (code 31.40 for taxpayer A, 41.40 for B). Always attach the certificate.",
      },
      {
        q: "Is a pillar 3a catch-up deductible in the 2026 return?",
        a: "Yes. A catch-up made in 2026 for a 2025 gap is deductible for the first time in the 2026 return, on top of the ordinary 2026 contribution, under the federal conditions.",
      },
      {
        q: "My pension fund buy-in is not on my salary certificate. What now?",
        a: "Enter it anyway under code 31.30 with your pension fund's statement as supporting document.",
      },
    ],
  },
};
