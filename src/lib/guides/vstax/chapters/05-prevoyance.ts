import type { GuideChapter } from "../../types";

export const prevoyance: GuideChapter = {
  slug: "prevoyance",
  readTime: 6,
  fr: {
    title: "3e pilier A, rachats LPP et prestations en capital dans VSTax : déductions 2026",
    navTitle: "Prévoyance",
    metaTitle: "VSTax 2026 : déduire 3e pilier A, rachat 3a et rachat LPP",
    metaDescription:
      "Où déduire le 3e pilier A (codes 2210 et 2220, CHF 7'258), les nouveaux rachats 3a de 2026, les rachats LPP (code 2100) et déclarer un capital de prévoyance (chiffre 7) dans VSTax.",
    keywords: [
      "3e pilier valais 2026",
      "code 2210 vstax",
      "rachat 3a 2026 déclaration valais",
      "rachat lpp déduction valais",
      "impôt capital prévoyance valais",
      "pilier 3a 7258",
    ],
    summary: [
      "**3e pilier A** : code **2210** pour le contribuable 1, **2220** pour le contribuable 2, en page 3. Jusqu'à **CHF 7'258** avec caisse de pension, ou 20 % du revenu d'activité jusqu'à **CHF 36'288** sans 2e pilier. Montants inchangés en 2026.",
      "**Nouveauté 2026** : les cotisations 3a non versées en 2025 peuvent être rachetées en 2026 et se déduisent pour la première fois dans la déclaration 2026.",
      "**Rachats LPP** : code **2100**, avec l'attestation de la caisse de pension. Un retrait en capital dans les trois ans qui suivent fait perdre la déduction.",
      "Un **capital de prévoyance** reçu en 2026 (2e ou 3e pilier) se déclare au **chiffre 7** de la page 3 ; il est imposé à part, à un taux réduit.",
    ],
    blocks: [
      { type: "h2", id: "3a", text: "Le 3e pilier A (codes 2210 et 2220)" },
      { type: "path", items: ["Formulaires", "Déclaration d'impôts", "Page 3", "Cotisations à des formes reconnues de prévoyance individuelle liée (pilier 3a)"] },
      {
        type: "table",
        head: ["Situation", "Déduction maximale 2025 et 2026"],
        rows: [
          ["Affilié à une caisse de pension (2e pilier)", "CHF 7'258"],
          ["Sans 2e pilier (indépendant, par exemple)", "20 % du revenu net d'activité, max. CHF 36'288"],
        ],
        caption: "Sources : « Adaptation des déductions forfaitaires pour l'imposition 2026 » et Guide de la déclaration d'impôts 2025, SCC Valais.",
      },
      {
        type: "p",
        text: "Saisissez pour chaque contribuable les versements **effectués au 31 décembre 2026**, avec le nom de l'institution et le numéro de police, et joignez l'attestation de la banque ou de l'assurance. La déduction suppose un **revenu d'activité lucrative** ; une interruption passagère (chômage, maladie, service militaire) ne la supprime pas. L'année du départ à la retraite, le versement doit intervenir avant la date de la retraite. Le plafond dépend de la réponse donnée à la question du 2e pilier dans les [données personnelles](/guide/vstax/situation-personnelle).",
      },
      {
        type: "screenshot",
        file: "05-prevoyance.webp",
        alt: "Page 3 de la déclaration dans VSTax : codes 2100, 2210 et 2220 pour le 2e pilier et le 3e pilier A",
        caption: "Les déductions de la page 3 : rachat LPP (2100) et 3e pilier A (2210) avec institution et numéro de police (VSTax 2025, données fictives)",
      },

      { type: "h2", id: "rachat-3a", text: "Nouveau en 2026 : le rachat de 3e pilier A" },
      {
        type: "p",
        text: "Depuis 2026, on peut combler une **lacune de cotisation 3a** des années précédentes, au plus tôt pour l'année 2025. Le rachat est déductible **pour la première fois dans la déclaration 2026**, déposée en 2027. Les conditions sont fixées par la Confédération et valent dans tous les cantons :",
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
        caption: "Exemples établis selon l'ordonnance fédérale sur la prévoyance individuelle liée (OPP 3), modifiée au 1er janvier 2025.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Le rachat passe par votre banque ou assurance 3a, qui vérifie la lacune et délivre une attestation distincte. Joignez-la à la déclaration 2026 avec l'attestation ordinaire. Pour aller plus loin : [plafonds et avantages du 3e pilier 2026](/blog/pilier-3a-2026-plafonds-avantages).",
      },

      { type: "h2", id: "rachat-lpp", text: "Rachats de 2e pilier (code 2100)" },
      {
        type: "p",
        text: "Les cotisations ordinaires à la caisse de pension sont déjà déduites du salaire net. Le **code 2100** reçoit ce qui ne l'est pas encore : surtout les **rachats d'années d'assurance**, souvent indiqués au chiffre 10.2 du certificat de salaire, ou payés directement à la caisse. Indiquez le montant de chaque contribuable et joignez l'attestation de la caisse de pension.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Attention au retrait en capital dans les trois ans",
        text: "Un rachat suivi d'un retrait en capital dans les trois ans n'est pas déductible, selon le droit fédéral. Si la déduction a déjà été admise, elle est corrigée par un rappel d'impôt. Pensez-y avant un achat immobilier ou une retraite anticipée.",
      },

      { type: "h2", id: "capital", text: "Prestations en capital touchées (chiffre 7, codes 1010 et 1020)" },
      { type: "path", items: ["Formulaires", "Prestations en capital touchées"] },
      {
        type: "screenshot",
        file: "05-prestations-capital.webp",
        alt: "Formulaire Détail prestations en capital touchées de VSTax : établissement financier, date de versement, genre de prévoyance (2e pilier, 3e pilier A, autres) et montant",
        caption: "Le détail des prestations en capital : une ligne par versement, total reporté sous le code 1010 (VSTax 2025, données fictives)",
      },
      {
        type: "screenshot",
        file: "05-chiffre7.webp",
        alt: "Chiffre 7 en page 3 de la déclaration VSTax : prestations en capital touchées, cases Non, 2e pilier, 3e pilier A, autres",
        caption: "Le chiffre 7 en page 3 : cochez « Non » si vous n'avez reçu aucun capital, sinon la déclaration reste incomplète (VSTax 2025)",
      },
      {
        type: "p",
        text: "Un capital reçu en 2026 de la **caisse de pension**, du **3e pilier A**, ou versé ensuite de décès ou d'atteinte durable à la santé se déclare au **chiffre 7** de la page 3 : cochez le type (2e pilier, 3e pilier A, autres), indiquez la date de paiement et détaillez le montant dans le formulaire. Le SCC rappelle en tête de son guide de ne pas oublier ce chiffre.",
      },
      {
        type: "table",
        head: ["Règle", "Impôt cantonal et communal", "Impôt fédéral direct"],
        rows: [
          ["Imposition", "Séparée du revenu, impôt annuel entier", "Séparée du revenu"],
          ["Taux", "Taux des prestations périodiques, au plus 4 %", "Un cinquième du barème ordinaire"],
          ["Couples et familles", "Impôt réduit de 2 %, max. CHF 2'450", "Barème des couples"],
          ["Déductions sociales", "Non admises", "Non admises"],
        ],
        caption: "Sources : Guide de la déclaration d'impôts 2025 (chiffre 7) et « Adaptation des déductions forfaitaires pour l'imposition 2026 », SCC Valais.",
      },
      {
        type: "p",
        text: "Le capital lui-même n'entre pas dans le revenu de l'année, mais ce qu'il en reste au 31 décembre fait partie de votre fortune (compte bancaire, titres). Les avoirs encore placés dans le 2e pilier, le 3e pilier A ou sur un compte de libre passage ne se déclarent pas comme fortune.",
      },

      { type: "h2", id: "assurances-vie", text: "Assurances-vie (3e pilier B)" },
      {
        type: "p",
        text: "Les primes d'assurance-vie ne se déduisent pas ici mais avec les primes d'assurance-maladie et les intérêts d'épargne sous le **code 2560**, dans un plafond commun de CHF 7'600 pour un couple et CHF 3'800 pour une personne seule en 2026 (voir [Déductions](/guide/vstax/deductions)). La **valeur de rachat** de la police au 31 décembre se déclare dans la fortune, sous le code 3400 (voir [Fortune et dettes](/guide/vstax/fortune-dettes)).",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour le 3e pilier A en Valais en 2026 ?",
        a: "CHF 7'258 si vous êtes affilié à une caisse de pension, sinon 20 % du revenu net d'activité jusqu'à CHF 36'288. Les montants sont inchangés par rapport à 2025.",
      },
      {
        q: "Où saisir le 3e pilier dans VSTax ?",
        a: "En page 3 de la déclaration, sous les codes 2210 (contribuable 1) et 2220 (contribuable 2), avec le nom de l'institution et le numéro de police. Joignez l'attestation.",
      },
      {
        q: "Le rachat 3a est-il déductible dans la déclaration valaisanne 2026 ?",
        a: "Oui. Un rachat effectué en 2026 pour une lacune de 2025 est déductible pour la première fois dans la déclaration 2026, en plus de la cotisation ordinaire 2026, aux conditions fixées par la Confédération.",
      },
      {
        q: "Comment est imposé un capital LPP ou 3a en Valais ?",
        a: "Séparément du revenu, au taux applicable à une rente équivalente mais au plus 4 % pour l'impôt cantonal, avec une réduction de 2 % (max. CHF 2'450) pour les couples et les familles. À l'impôt fédéral, au cinquième du barème ordinaire.",
      },
    ],
  },
  en: {
    title: "Pillar 3a, pension fund buy-ins and lump sums in VSTax: 2026 deductions",
    navTitle: "Pension savings",
    metaTitle: "VSTax 2026: deducting pillar 3a, 3a catch-up and pension buy-ins",
    metaDescription:
      "Where to deduct pillar 3a (codes 2210 and 2220, CHF 7,258), the new 2026 3a catch-up payments, pension fund buy-ins (code 2100) and how to declare a pension lump sum (section 7) in VSTax.",
    keywords: [
      "pillar 3a valais 2026",
      "vstax pillar 3a",
      "3a catch-up 2026 valais",
      "pension fund buy-in valais",
      "pension lump sum tax valais",
      "pillar 3a 7258",
    ],
    summary: [
      "**Pillar 3a**: code **2210** for taxpayer 1, **2220** for taxpayer 2, on page 3. Up to **CHF 7,258** with a pension fund, or 20% of earned income up to **CHF 36,288** without one. Amounts unchanged in 2026.",
      "**New in 2026**: 3a contributions not paid in 2025 can be made up in 2026 and are deductible for the first time in the 2026 return.",
      "**Pension fund buy-ins**: code **2100**, with the fund's certificate. A lump-sum withdrawal within the next three years cancels the deduction.",
      "A **pension lump sum** received in 2026 (2nd or 3rd pillar) goes in **section 7** on page 3; it is taxed separately at a reduced rate.",
    ],
    blocks: [
      { type: "h2", id: "3a", text: "Pillar 3a (codes 2210 and 2220)" },
      { type: "path", items: ["Formulaires", "Déclaration d'impôts", "Page 3", "Cotisations à des formes reconnues de prévoyance individuelle liée (pilier 3a)"] },
      {
        type: "table",
        head: ["Situation", "Maximum deduction 2025 and 2026"],
        rows: [
          ["Member of a pension fund (2nd pillar)", "CHF 7,258"],
          ["No 2nd pillar (self-employed, for example)", "20% of net earned income, max. CHF 36,288"],
        ],
        caption: "Sources: \"Adaptation des déductions forfaitaires pour l'imposition 2026\" and Guide de la déclaration d'impôts 2025, SCC Valais.",
      },
      {
        type: "p",
        text: "For each taxpayer, enter the payments **made by 31 December 2026**, with the institution's name and policy number, and attach the bank's or insurer's certificate. The deduction requires **earned income**; a temporary break (unemployment, illness, military service) does not cancel it. In the year you retire, the payment must be made before your retirement date. The cap depends on your answer to the pension fund question in the [personal data](/guide/vstax/situation-personnelle).",
      },
      {
        type: "screenshot",
        file: "05-prevoyance.webp",
        alt: "Page 3 of the return in VSTax: codes 2100, 2210 and 2220 for the 2nd pillar and pillar 3a",
        caption: "Page 3 deductions: pension buy-in (2100) and pillar 3a (2210) with institution and policy number (VSTax 2025, fictitious data)",
      },

      { type: "h2", id: "rachat-3a", text: "New in 2026: pillar 3a catch-up payments" },
      {
        type: "p",
        text: "From 2026, you can fill a **3a contribution gap** from earlier years, starting with 2025 at the earliest. The catch-up payment is deductible **for the first time in the 2026 return**, filed in 2027. The conditions are set at federal level and apply in every canton:",
      },
      {
        type: "list",
        items: [
          "AHV-liable income in Switzerland in the missing year **and** in the year of the catch-up;",
          "the full ordinary contribution for the catch-up year must be paid first;",
          "catch-up limited, for each missing year, to the « small contribution » (CHF 7,258 in 2026), over ten years at most.",
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
        caption: "Examples based on the federal ordinance on tied pension provision (BVV 3 / OPP 3), amended on 1 January 2025.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "The catch-up goes through your 3a bank or insurer, which checks the gap and issues a separate certificate. Attach it to the 2026 return with the ordinary certificate. More: [pillar 3a limits and benefits 2026](/blog/pilier-3a-2026-plafonds-avantages).",
      },

      { type: "h2", id: "rachat-lpp", text: "Pension fund buy-ins (code 2100)" },
      {
        type: "p",
        text: "Ordinary pension fund contributions are already deducted from net salary. **Code 2100** takes what is not yet deducted: mainly **buy-ins of insurance years**, often shown in box 10.2 of the salary certificate, or paid directly to the fund. Enter each taxpayer's amount and attach the pension fund's certificate.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Beware of a lump-sum withdrawal within three years",
        text: "Under federal law, a buy-in followed by a lump-sum withdrawal within three years is not deductible. If the deduction was already granted, it is reversed through a supplementary assessment. Keep this in mind before buying property or retiring early.",
      },

      { type: "h2", id: "capital", text: "Lump sums received (section 7, codes 1010 and 1020)" },
      { type: "path", items: ["Formulaires", "Prestations en capital touchées"] },
      {
        type: "screenshot",
        file: "05-prestations-capital.webp",
        alt: "VSTax lump sums received form: financial institution, payment date, type (2nd pillar, pillar 3a, other) and amount",
        caption: "Lump sums received: one line per payment, total carried over to code 1010 (VSTax 2025, fictitious data)",
      },
      {
        type: "screenshot",
        file: "05-chiffre7.webp",
        alt: "Section 7 on page 3 of the VSTax return: lump sums received, boxes No, 2nd pillar, pillar 3a, other",
        caption: "Section 7 on page 3: tick « Non » (no) if you received no lump sum, otherwise the return stays incomplete (VSTax 2025)",
      },
      {
        type: "p",
        text: "A lump sum received in 2026 from a **pension fund**, from **pillar 3a**, or paid after a death or lasting health damage goes in **section 7** on page 3: tick the type (« 2e pilier », « 3e pilier A », « autres »), give the payment date and detail the amount in the form. The SCC reminds taxpayers not to forget this section at the very start of its guide.",
      },
      {
        type: "table",
        head: ["Rule", "Cantonal and municipal tax", "Direct federal tax"],
        rows: [
          ["Taxation", "Separate from income, full annual tax", "Separate from income"],
          ["Rate", "Rate for an equivalent pension, at most 4%", "One fifth of the ordinary scale"],
          ["Couples and families", "Tax reduced by 2%, max. CHF 2,450", "Couples' scale"],
          ["Personal allowances", "Not granted", "Not granted"],
        ],
        caption: "Sources: Guide de la déclaration d'impôts 2025 (section 7) and \"Adaptation des déductions forfaitaires pour l'imposition 2026\", SCC Valais.",
      },
      {
        type: "p",
        text: "The lump sum is not part of the year's income, but whatever remains on 31 December is part of your wealth (bank account, securities). Money still in the 2nd pillar, pillar 3a or a vested benefits account is not declared as wealth.",
      },

      { type: "h2", id: "assurances-vie", text: "Life insurance (pillar 3b)" },
      {
        type: "p",
        text: "Life insurance premiums are not deducted here but together with health insurance premiums and savings interest under **code 2560**, within a shared cap of CHF 7,600 for a couple and CHF 3,800 for a single person in 2026 (see [Deductions](/guide/vstax/deductions)). The policy's **surrender value** on 31 December is declared as wealth under code 3400 (see [Wealth and debts](/guide/vstax/fortune-dettes)).",
      },
    ],
    faq: [
      {
        q: "How much can I deduct for pillar 3a in Valais in 2026?",
        a: "CHF 7,258 if you belong to a pension fund, otherwise 20% of net earned income up to CHF 36,288. Amounts are unchanged from 2025.",
      },
      {
        q: "Where do I enter pillar 3a in VSTax?",
        a: "On page 3 of the return, under codes 2210 (taxpayer 1) and 2220 (taxpayer 2), with the institution's name and policy number. Attach the certificate.",
      },
      {
        q: "Is a 3a catch-up payment deductible in the 2026 Valais return?",
        a: "Yes. A catch-up made in 2026 for a 2025 gap is deductible for the first time in the 2026 return, on top of the ordinary 2026 contribution, under the federal conditions.",
      },
      {
        q: "How is a pension or 3a lump sum taxed in Valais?",
        a: "Separately from income, at the rate for an equivalent pension but at most 4% for cantonal tax, with a 2% reduction (max. CHF 2,450) for couples and families. For federal tax, at one fifth of the ordinary scale.",
      },
    ],
  },
};
