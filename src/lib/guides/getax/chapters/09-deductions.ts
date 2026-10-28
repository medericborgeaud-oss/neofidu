import type { GuideChapter } from "../../types";

export const deductions: GuideChapter = {
  slug: "deductions",
  readTime: 8,
  fr: {
    title: "Déductions dans GeTax : assurance-maladie, frais médicaux, garde, formation et dons 2026",
    navTitle: "Déductions",
    metaTitle: "Déductions GeTax 2026 : primes, frais médicaux, garde, dons",
    metaDescription:
      "Toutes les déductions genevoises 2026 dans GeTax : primes d'assurance-maladie (52.21), frais médicaux au-delà de 0,5 % (71.00), garde CHF 26'392, formation CHF 12'791, dons 20 %, pensions versées.",
    keywords: [
      "déductions impôt genève 2026",
      "assurance maladie déduction genève",
      "frais médicaux 0,5 % genève",
      "frais de garde 26392 genève",
      "frais de formation déduction genève",
      "dons déduction impôt genève",
    ],
    summary: [
      "**Primes d'assurance-maladie** (code 52.21) : déductibles jusqu'au **double de la prime moyenne cantonale** par tranche d'âge, soit CHF 17'122 par adulte en 2025.",
      "**Frais médicaux** (code 71.00) : seule la part qui dépasse **0,5 %** du revenu net est déductible à l'ICC ; à l'IFD, le seuil est de 5 %.",
      "**Garde** : jusqu'à **CHF 26'392** par enfant de moins de 14 ans (ICC 2026). **Formation continue** : jusqu'à **CHF 12'791** (ICC 2026).",
      "**Dons** : jusqu'à **20 %** du revenu net ; à l'ICC, la contribution ecclésiastique compte comme un don.",
    ],
    blocks: [
      { type: "h2", id: "selection", text: "Choisir ses déductions" },
      { type: "path", items: ["Déductions", "Sélection Déductions"] },
      {
        type: "p",
        text: "Cochez les rubriques utiles : assurances-vie et vieillesse, assurance-maladie et accidents, pensions et contributions d'entretien versées, rentes viagères payées, autres déductions sur le revenu, frais médicaux, frais liés à un handicap et dons. Les montants des **enfants** (garde, primes, frais médicaux) sont déjà repris de leurs fiches : ne les saisissez pas une seconde fois.",
      },

      { type: "h2", id: "assurance-maladie", text: "Primes d'assurance-maladie et accidents" },
      { type: "path", items: ["Déductions", "Assurances-maladie et accidents"] },
      {
        type: "screenshot",
        file: "09-assurance-maladie.webp",
        alt: "Écran Assurances-maladie et accidents de GeTax : primes ICC et IFD des contribuables A et B, enfants repris automatiquement",
        caption: "Les primes des enfants sont reprises de leurs fiches ; celles des adultes se saisissent ici (GeTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "Indiquez le total des primes **de base et complémentaires** payées pour chaque adulte. La déduction est limitée au double de la prime moyenne cantonale, par tranche d'âge. Si vous recevez un **subside**, déclarez quand même la prime totale ici et le subside au code 16.30 (Autres revenus et fortune).",
      },
      {
        type: "table",
        head: ["Tranche d'âge", "Déduction maximale 2025"],
        rows: [
          ["0 à 18 ans", "CHF 3'965"],
          ["19 à 25 ans", "CHF 12'842"],
          ["Dès 26 ans", "CHF 17'122"],
        ],
        caption: "Source : Guide de la déclaration 2025, AFC Genève (prime moyenne cantonale × 12 × 2). Les plafonds 2026, calculés sur les primes moyennes 2026, seront intégrés à GeTax 2026.",
      },
      {
        type: "p",
        text: "Les primes d'une assurance-accidents privée et d'une assurance perte de gain maladie qui ne figurent pas au chiffre 9 du certificat de salaire se déduisent au code 52.22. Les assurances de choses (ménage, véhicule) ne sont pas déductibles.",
      },

      { type: "h2", id: "frais-medicaux", text: "Frais médicaux, handicap et dons" },
      { type: "path", items: ["Déductions", "Frais médicaux, frais liés à un handicap et dons"] },
      {
        type: "screenshot",
        file: "09b-frais-medicaux-dons.webp",
        alt: "Écran Frais médicaux, frais liés à un handicap et dons de GeTax, colonnes contribuables A, B et enfants",
        caption: "Frais médicaux, frais liés à un handicap, dons et versements aux partis politiques sur un seul écran (GeTax 2025, données fictives)",
      },
      {
        type: "table",
        head: ["Déduction", "Code", "Règle"],
        rows: [
          ["Frais médicaux non remboursés", "71.00", "ICC : part qui dépasse 0,5 % du revenu net (code 92.20) ; IFD : part qui dépasse 5 %"],
          ["Frais liés à un handicap", "59.40", "Entièrement déductibles, sur justificatifs"],
          ["Dons à des institutions d'utilité publique", "73.10 (ICC), 73.20 (IFD)", "Jusqu'à 20 % du revenu net avant dons ; IFD : au moins CHF 100 au total"],
          ["Versements aux partis politiques", "74.00", "ICC : jusqu'à CHF 10'000"],
        ],
        caption: "Sources : Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 32 et 37 LIPP ; Guide de la déclaration 2025 et aide de GeTax 2025, AFC Genève.",
      },
      {
        type: "p",
        text: "Exemple : revenu net de CHF 60'000, frais médicaux non remboursés de CHF 1'800. Le seuil ICC est de 0,5 % × 60'000 = CHF 300 : la déduction cantonale est de **CHF 1'500**. À l'IFD, le seuil est de CHF 3'000 : rien n'est déductible. Les frais de prévention (masques, tests) ne comptent pas.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Contribution ecclésiastique et dons",
        text: "À l'ICC, la contribution versée aux Églises reconnues est **considérée comme un don** (art. 23 RIPP). À l'IFD, les dons aux Églises, contribution religieuse volontaire comprise, ne sont pas déductibles. Joignez une liste de vos dons ; une quittance est exigée à partir de CHF 300 par don. Les justificatifs se gardent en principe à disposition de l'AFC.",
      },

      { type: "h2", id: "garde", text: "Frais de garde des enfants" },
      {
        type: "p",
        text: "Les frais de garde se saisissent dans la **fiche de chaque enfant** et sont reportés aux codes 59.10 (ICC) et 59.12 (IFD). Ils sont déductibles pour chaque enfant **jusqu'au mois de son 14e anniversaire**, si les deux parents travaillent, sont en formation ou en incapacité durable de travailler (ou si le parent seul qui en a la garde est dans ce cas).",
      },
      {
        type: "table",
        head: ["Frais de garde", "ICC", "IFD"],
        rows: [
          ["Plafond par enfant 2026", "CHF 26'392", "CHF 25'800"],
          ["Crèche, garderie, parascolaire (sans cuisine scolaire)", "Oui", "Oui"],
          ["Maman de jour, nounou, jeune fille au pair (hors ménage)", "Oui", "Oui"],
          ["Colonie de vacances, centre aéré", "Oui", "Oui"],
          ["Camps thématiques (sport, musique)", "CHF 50 par jour, max. CHF 250 par semaine", "idem"],
        ],
        caption: "Sources : Feuille cantonale Genève, AFC (Confédération), état février 2026, art. 9 RCEPF (ICC) ; communiqué du DFF sur l'adaptation des déductions IFD à partir de 2027 (CHF 25'800 jusqu'en 2026) ; Guide de la déclaration 2025, AFC Genève.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Déduire des frais de garde réduit la charge de famille ICC de CHF 13'698 à **CHF 10'536** pour cet enfant. GeTax fait la compensation tout seul : la déduction de garde reste en général plus avantageuse dès que les frais dépassent environ CHF 3'200 par an.",
      },

      { type: "h2", id: "formation", text: "Formation continue et pensions versées" },
      { type: "path", items: ["Déductions", "Autres déductions sur le revenu"] },
      {
        type: "list",
        items: [
          "**Frais de formation** (code 59.50) : formation, perfectionnement et reconversion à des fins professionnelles, payés par vous, jusqu'à **CHF 12'791** à l'ICC en 2026 et CHF 13'000 à l'IFD, si vous avez un diplôme du secondaire II ou au moins 20 ans et visez un autre diplôme.",
          "**Pensions alimentaires versées** (code 53.10) : entièrement déductibles pour l'ex-conjoint et pour les enfants mineurs dont il a la garde, jusqu'au mois de la majorité de l'enfant. Indiquez le bénéficiaire et joignez le jugement ou la convention la première année.",
          "**Rentes viagères payées** (code 54.10) et **maintien de la prévoyance** après 58 ans (codes 59.65 et 59.66).",
        ],
      },

      { type: "h2", id: "recap", text: "Le récapitulatif des autres déductions" },
      {
        type: "screenshot",
        file: "09c-autres-deductions.webp",
        alt: "Écran Autres déductions de GeTax : déduction sur la fortune, frais de garde ICC et IFD, déduction pour couples IFD, charges de famille ICC et IFD",
        caption: "GeTax calcule ici la déduction sur la fortune, reprend les frais de garde et chiffre les charges de famille ICC et IFD (GeTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "Cet écran ne demande presque rien : il montre les déductions calculées automatiquement. Les **rentiers AVS ou AI** à revenu modeste y trouvent aussi leur déduction (code 61.30) : en 2026, jusqu'à CHF 10'690 pour une personne seule dont le revenu déterminant ne dépasse pas CHF 85'520, CHF 10'690 ou 12'293 pour un couple dont le revenu net ne dépasse pas CHF 98'348, avec une réduction progressive.",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour l'assurance-maladie à Genève ?",
        a: "Les primes de base et complémentaires jusqu'au double de la prime moyenne cantonale par tranche d'âge : en 2025, CHF 17'122 par adulte dès 26 ans, CHF 12'842 de 19 à 25 ans et CHF 3'965 par enfant.",
      },
      {
        q: "À partir de quel montant les frais médicaux sont-ils déductibles à Genève ?",
        a: "À l'impôt cantonal, la part qui dépasse 0,5 % du revenu net ; à l'impôt fédéral, la part qui dépasse 5 %. Seuls les frais restés à votre charge (franchise, quote-part, soins non remboursés) comptent.",
      },
      {
        q: "Quel est le plafond des frais de garde à Genève en 2026 ?",
        a: "CHF 26'392 par enfant de moins de 14 ans pour l'impôt cantonal et CHF 25'800 pour l'impôt fédéral.",
      },
      {
        q: "La contribution religieuse est-elle déductible ?",
        a: "Oui à l'impôt cantonal, où elle est traitée comme un don (dans la limite de 20 % du revenu net). Non à l'impôt fédéral.",
      },
    ],
  },
  en: {
    title: "Deductions in GeTax: health insurance, medical costs, childcare, training and donations 2026",
    navTitle: "Deductions",
    metaTitle: "GeTax 2026 deductions: premiums, medical costs, childcare, donations",
    metaDescription:
      "All 2026 Geneva deductions in GeTax: health insurance premiums (52.21), medical costs above 0.5% (71.00), childcare CHF 26,392, training CHF 12,791, donations 20%, maintenance paid.",
    keywords: [
      "geneva tax deductions 2026",
      "health insurance deduction geneva",
      "medical expenses deduction geneva",
      "childcare deduction geneva 2026",
      "training costs deduction geneva",
      "donation tax deduction geneva",
    ],
    summary: [
      "**Health insurance premiums** (code 52.21): deductible up to **twice the cantonal average premium** per age group, i.e. CHF 17,122 per adult in 2025.",
      "**Medical costs** (code 71.00): only the share above **0.5%** of net income is deductible for cantonal tax; for federal tax the threshold is 5%.",
      "**Childcare**: up to **CHF 26,392** per child under 14 (cantonal, 2026). **Training**: up to **CHF 12,791** (cantonal, 2026).",
      "**Donations**: up to **20%** of net income; for cantonal tax, the church contribution counts as a donation.",
    ],
    blocks: [
      { type: "h2", id: "selection", text: "Choosing your deductions" },
      { type: "path", items: ["Déductions", "Sélection Déductions"] },
      {
        type: "p",
        text: "Tick the relevant sections: life and old-age insurance, health and accident insurance, maintenance paid, life annuities paid, other income deductions, medical costs, disability costs and donations. **Children's** amounts (childcare, premiums, medical costs) are already carried over from their sheets: do not enter them twice.",
      },

      { type: "h2", id: "assurance-maladie", text: "Health and accident insurance premiums" },
      { type: "path", items: ["Déductions", "Assurances-maladie et accidents"] },
      {
        type: "screenshot",
        file: "09-assurance-maladie.webp",
        alt: "GeTax health and accident insurance screen: cantonal and federal premiums for taxpayers A and B, children carried over automatically",
        caption: "Children's premiums come from their sheets; adults' premiums are entered here (GeTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "Enter the total **basic and supplementary** premiums paid for each adult. The deduction is capped at twice the cantonal average premium, per age group. If you receive a **subsidy**, still declare the full premium here and the subsidy under code 16.30 (« Autres revenus et fortune »).",
      },
      {
        type: "table",
        head: ["Age group", "Maximum deduction 2025"],
        rows: [
          ["0 to 18", "CHF 3,965"],
          ["19 to 25", "CHF 12,842"],
          ["26 and over", "CHF 17,122"],
        ],
        caption: "Source: 2025 return guide, AFC Geneva (cantonal average premium × 12 × 2). The 2026 caps, based on 2026 average premiums, will be built into GeTax 2026.",
      },
      {
        type: "p",
        text: "Premiums for private accident insurance and sickness income insurance not shown in box 9 of the salary certificate go under code 52.22. Property insurance (household, vehicle) is not deductible.",
      },

      { type: "h2", id: "frais-medicaux", text: "Medical costs, disability and donations" },
      { type: "path", items: ["Déductions", "Frais médicaux, frais liés à un handicap et dons"] },
      {
        type: "screenshot",
        file: "09b-frais-medicaux-dons.webp",
        alt: "GeTax medical costs, disability costs and donations screen, columns for taxpayers A, B and children",
        caption: "Medical costs, disability costs, donations and political party contributions on one screen (GeTax 2025, fictitious data)",
      },
      {
        type: "table",
        head: ["Deduction", "Code", "Rule"],
        rows: [
          ["Unreimbursed medical costs", "71.00", "Cantonal: share above 0.5% of net income (code 92.20); federal: share above 5%"],
          ["Disability costs", "59.40", "Fully deductible, with receipts"],
          ["Donations to public-benefit bodies", "73.10 (cantonal), 73.20 (federal)", "Up to 20% of net income before donations; federal: at least CHF 100 in total"],
          ["Political party contributions", "74.00", "Cantonal: up to CHF 10,000"],
        ],
        caption: "Sources: Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 32 and 37 LIPP; 2025 return guide and GeTax 2025 help, AFC Geneva.",
      },
      {
        type: "p",
        text: "Example: net income CHF 60,000, unreimbursed medical costs CHF 1,800. The cantonal threshold is 0.5% × 60,000 = CHF 300: the cantonal deduction is **CHF 1,500**. For federal tax the threshold is CHF 3,000: nothing is deductible. Preventive costs (masks, tests) do not count.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Church contribution and donations",
        text: "For cantonal tax, the contribution paid to recognised churches **counts as a donation** (art. 23 RIPP). For federal tax, donations to churches, including the voluntary church contribution, are not deductible. Attach a list of your donations; a receipt is required from CHF 300 per donation. Receipts are normally kept available for the AFC.",
      },

      { type: "h2", id: "garde", text: "Childcare costs" },
      {
        type: "p",
        text: "Childcare costs are entered in **each child's sheet** and carried to codes 59.10 (cantonal) and 59.12 (federal). They are deductible for each child **until the month of their 14th birthday**, if both parents work, study or are permanently unable to work (or if the single parent with custody is in that situation).",
      },
      {
        type: "table",
        head: ["Childcare", "Cantonal", "Federal"],
        rows: [
          ["Cap per child 2026", "CHF 26,392", "CHF 25,800"],
          ["Nursery, after-school care (school meals excluded)", "Yes", "Yes"],
          ["Childminder, nanny, au pair (excluding housework)", "Yes", "Yes"],
          ["Holiday camps, day centres", "Yes", "Yes"],
          ["Themed camps (sport, music)", "CHF 50 a day, max. CHF 250 a week", "same"],
        ],
        caption: "Sources: Geneva cantonal sheet, Swiss Federal Tax Administration, February 2026, art. 9 RCEPF (cantonal); Federal Department of Finance release on federal deductions from 2027 (CHF 25,800 until 2026); 2025 return guide, AFC Geneva.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Deducting childcare reduces the cantonal dependant deduction from CHF 13,698 to **CHF 10,536** for that child. GeTax handles the trade-off itself: the childcare deduction usually remains worthwhile once costs exceed about CHF 3,200 a year.",
      },

      { type: "h2", id: "formation", text: "Training and maintenance paid" },
      { type: "path", items: ["Déductions", "Autres déductions sur le revenu"] },
      {
        type: "list",
        items: [
          "**Training costs** (« Frais de formation », code 59.50): professional training, further training and retraining you paid yourself, up to **CHF 12,791** for cantonal tax in 2026 and CHF 13,000 for federal tax, if you hold an upper-secondary diploma or are at least 20 and studying for another diploma.",
          "**Maintenance paid** (« Pensions, contributions d'entretien versées », code 53.10): fully deductible for a former spouse and for minor children in their custody, until the month the child comes of age. Name the recipient and attach the judgment or agreement in the first year.",
          "**Life annuities paid** (code 54.10) and **continued pension cover** after age 58 (codes 59.65 and 59.66).",
        ],
      },

      { type: "h2", id: "recap", text: "The summary of other deductions" },
      {
        type: "screenshot",
        file: "09c-autres-deductions.webp",
        alt: "GeTax other deductions screen: wealth allowance, cantonal and federal childcare, federal couple deduction, cantonal and federal dependant deductions",
        caption: "GeTax computes the wealth allowance here, carries over childcare and computes cantonal and federal dependant deductions (GeTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "This screen asks for almost nothing: it shows deductions computed automatically. **AHV or AI pensioners** on modest incomes also get their deduction here (code 61.30): in 2026, up to CHF 10,690 for a single person whose relevant income does not exceed CHF 85,520, and CHF 10,690 or 12,293 for a couple whose net income does not exceed CHF 98,348, tapering off progressively.",
      },
    ],
    faq: [
      {
        q: "How much health insurance can I deduct in Geneva?",
        a: "Basic and supplementary premiums up to twice the cantonal average premium per age group: in 2025, CHF 17,122 per adult aged 26 and over, CHF 12,842 for ages 19 to 25 and CHF 3,965 per child.",
      },
      {
        q: "From what amount are medical costs deductible in Geneva?",
        a: "For cantonal tax, the share above 0.5% of net income; for federal tax, the share above 5%. Only costs you paid yourself (deductible, co-payment, unreimbursed care) count.",
      },
      {
        q: "What is the childcare cap in Geneva in 2026?",
        a: "CHF 26,392 per child under 14 for cantonal tax and CHF 25,800 for federal tax.",
      },
      {
        q: "Is the church contribution deductible?",
        a: "Yes for cantonal tax, where it is treated as a donation (within the 20% of net income limit). No for federal tax.",
      },
    ],
  },
};
