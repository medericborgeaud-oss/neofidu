// Données des pages « Suisses de l'étranger » par pays.
// Même logique bilingue que blog-data.ts : chaque champ affiché a sa version EN.

export interface CountrySection {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

export interface CountryProfile {
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
}

export interface CountryFaq {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface CountryInfographicItem {
  fr: string;
  en: string;
}

export interface CountryInfographic {
  leftTitle: string;
  leftTitleEn: string;
  rightTitle: string;
  rightTitleEn: string;
  leftItems: CountryInfographicItem[];
  rightItems: CountryInfographicItem[];
  calloutMain: string;
  calloutMainEn: string;
  calloutSub: string;
  calloutSubEn: string;
}

export interface CountryPage {
  slug: string;
  country: string;
  countryEn: string;
  countryEmoji: string;
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  h1: string;
  h1En: string;
  swissPopulation: string;
  swissPopulationEn: string;
  intro: string;
  introEn: string;
  sections: CountrySection[];
  profiles: CountryProfile[];
  faq: CountryFaq[];
  keywords: string[];
  lastUpdated: string;
  relatedCountries?: string[];
  infographic?: CountryInfographic;
}

export const countryPages: CountryPage[] = [
  {
    slug: "canada",
    country: "Canada",
    countryEn: "Canada",
    countryEmoji: "🇨🇦",
    metaTitle: "Suisses au Canada : impôts & fiscalité en Suisse romande",
    metaTitleEn: "Swiss citizens in Canada: taxes & Swiss filing",
    metaDescription:
      "Vous êtes Suisse au Canada ? Déclaration en Suisse, rente AVS, retrait 2e/3e pilier, bien immobilier : NeoFidu gère votre fiscalité romande, 100 % en ligne.",
    metaDescriptionEn:
      "Swiss living in Canada? Swiss tax return, AVS pension, 2nd/3rd pillar withdrawal, property: NeoFidu handles your Romandy tax matters, 100% online.",
    h1: "Suisses au Canada : votre fiscalité et vos obligations en Suisse romande",
    h1En: "Swiss citizens in Canada: your taxes and obligations in French-speaking Switzerland",
    swissPopulation: "≈ 42 000 Suisses au Canada (OFS, 2025)",
    swissPopulationEn: "≈ 42,000 Swiss citizens in Canada (FSO, 2025)",
    lastUpdated: "2026-08-17",
    keywords: [
      "suisse au canada impôts",
      "déclaration impôt suisse canada",
      "convention double imposition suisse canada",
      "retrait 2e pilier canada",
      "remboursement impôt à la source pilier canada",
      "rente AVS canada imposition",
      "fiscalité suisse expatrié québec",
    ],
    relatedCountries: ["france"],
    infographic: {
      leftTitle: "Imposé en Suisse",
      leftTitleEn: "Taxed in Switzerland",
      rightTitle: "Imposé au Canada",
      rightTitleEn: "Taxed in Canada",
      leftItems: [
        { fr: "Bien immobilier en Suisse", en: "Swiss real estate" },
        { fr: "Prestations 2e / 3e pilier", en: "2nd / 3rd pillar benefits" },
        { fr: "Certains revenus suisses", en: "Certain Swiss-source income" },
      ],
      rightItems: [
        { fr: "Salaire et revenus canadiens", en: "Canadian salary & income" },
        { fr: "Rente AVS (1er pilier)", en: "AVS pension (1st pillar)" },
        { fr: "Revenu mondial", en: "Worldwide income" },
      ],
      calloutMain: "2e et 3e pilier : imposé à la source en Suisse, puis remboursé",
      calloutMainEn: "2nd & 3rd pillar: taxed at source in Switzerland, then refunded",
      calloutSub: "La convention CH-Canada attribue l'imposition au pays de résidence",
      calloutSubEn: "The CH-Canada treaty assigns taxation to the country of residence",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">Environ <strong>42 000 Suisses vivent au Canada</strong>, ce qui en fait la deuxième communauté suisse hors d'Europe. Que vous soyez installé à Montréal, Toronto ou Vancouver, votre départ de Suisse ne met pas toujours fin à vos liens fiscaux avec votre canton d'origine, surtout si vous avez conservé un bien immobilier, une rente ou un capital de prévoyance. NeoFidu vous accompagne, en français et 100 % à distance, pour gérer votre situation fiscale romande depuis le Canada.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">Around <strong>42,000 Swiss citizens live in Canada</strong>, the second-largest Swiss community outside Europe. Whether you live in Montreal, Toronto or Vancouver, leaving Switzerland does not always end your tax ties with your home canton, especially if you kept a property, a pension or occupational savings. NeoFidu supports you, 100% online, to manage your Swiss (Romandy) tax matters from Canada.</p>`,
    sections: [
      {
        title: "Où êtes-vous imposé : au Canada ou en Suisse ?",
        titleEn: "Where are you taxed: in Canada or in Switzerland?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Dès lors que vous transférez votre domicile au Canada, vous y devenez en principe <strong>résident fiscal</strong> et y êtes imposé sur votre revenu mondial. Pour éviter que les mêmes revenus soient taxés deux fois, la <strong>convention de double imposition entre la Suisse et le Canada</strong> (en vigueur depuis 1998) répartit les droits d'imposition entre les deux pays.</p><p style="margin:0 0 18px;line-height:1.75;">En pratique, certains revenus restent rattachés à la Suisse malgré votre installation au Canada. C'est là que se joue votre situation, et que quelques démarches bien menées évitent des impôts inutiles.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Once you move your residence to Canada, you generally become a <strong>Canadian tax resident</strong>, taxed there on your worldwide income. To avoid the same income being taxed twice, the <strong>Switzerland-Canada double taxation treaty</strong> (in force since 1998) allocates taxing rights between the two countries.</p><p style="margin:0 0 18px;line-height:1.75;">In practice, some income remains linked to Switzerland despite your move. That is where your situation is decided, and where a few well-handled steps avoid unnecessary tax.</p>`,
      },
      {
        title: "Ce qui reste imposable en Suisse",
        titleEn: "What remains taxable in Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Même résident au Canada, vous conservez des obligations en Suisse dans plusieurs cas :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : un logement situé dans un canton romand reste imposable en Suisse (revenu ou valeur locative, et fortune). Une déclaration cantonale reste nécessaire.</li><li><strong>Revenus de source suisse</strong> : certaines rentes, participations ou activités conservées en Suisse.</li><li><strong>Prestations de prévoyance</strong> : voir la section dédiée ci-dessous.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> l'immobilier suisse s'impose toujours en Suisse, quel que soit votre pays de résidence.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Even as a Canadian resident, you keep Swiss obligations in several cases:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: a home in a Romandy canton stays taxable in Switzerland (rental or imputed rental value, and wealth). A cantonal return is still required.</li><li><strong>Swiss-source income</strong>: certain pensions, holdings or activities kept in Switzerland.</li><li><strong>Pension benefits</strong>: see the dedicated section below.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> Swiss real estate is always taxed in Switzerland, whatever your country of residence.</div>`,
      },
      {
        title: "Vos rentes et votre prévoyance (AVS, 2e et 3e pilier)",
        titleEn: "Your pensions and retirement savings (AVS, 2nd and 3rd pillar)",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">C'est le point le plus important, et le plus mal connu, pour un Suisse au Canada.</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Rente AVS (1er pilier)</strong> : la Suisse ne prélève pas d'impôt à la source sur l'AVS. Selon la convention, son imposition revient en principe au Canada.</li><li><strong>Retrait du 2e pilier ou du 3e pilier A en capital</strong> : ce versement est <strong>toujours soumis à l'impôt à la source en Suisse</strong>, prélevé par le canton de la fondation de prévoyance.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Bonne nouvelle :</strong> comme la convention CH-Canada attribue l'imposition de ces prestations au pays de résidence, l'impôt à la source suisse peut être <strong>remboursé sur demande</strong>. Il faut une attestation de résidence fiscale des autorités canadiennes (ARC / Revenu Québec), adressée au canton concerné. NeoFidu s'occupe de cette démarche pour vous.</div><p style="margin:0 0 18px;line-height:1.75;">Le canton de la fondation et le moment du retrait ont un impact direct sur le montant : un accompagnement en amont permet souvent de réduire sensiblement la facture.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">This is the most important, and least understood, point for a Swiss citizen in Canada.</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>AVS pension (1st pillar)</strong>: Switzerland does not levy withholding tax on AVS. Under the treaty, it is in principle taxable in Canada.</li><li><strong>Lump-sum withdrawal of the 2nd or 3rd pillar</strong>: this payment is <strong>always subject to Swiss withholding tax</strong>, levied by the canton of the pension foundation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Good news:</strong> because the CH-Canada treaty assigns the taxation of these benefits to the country of residence, the Swiss withholding tax can be <strong>refunded on request</strong>. You need a certificate of tax residence from the Canadian authorities (CRA / Revenu Québec), sent to the relevant canton. NeoFidu handles this for you.</div><p style="margin:0 0 18px;line-height:1.75;">The canton of the foundation and the timing of the withdrawal directly affect the amount: planning ahead often reduces the bill significantly.</p>`,
      },
      {
        title: "Vos obligations déclaratives en Suisse romande",
        titleEn: "Your filing obligations in French-speaking Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Selon votre situation, vous pouvez encore devoir déposer une déclaration dans votre canton (VD, GE, VS, FR, NE ou JU), typiquement si vous y détenez un bien immobilier ou d'autres éléments imposables. Les délais et la procédure varient d'un canton à l'autre, et une taxation d'office peut s'appliquer en l'absence de dépôt.</p><p style="margin:0 0 18px;line-height:1.75;">NeoFidu identifie précisément ce que vous devez (ou ne devez plus) déclarer, prépare votre déclaration cantonale et gère les échanges avec l'administration, entièrement à distance.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Depending on your situation, you may still need to file a return in your canton (VD, GE, VS, FR, NE or JU), typically if you hold property or other taxable items there. Deadlines and procedures vary by canton, and a default assessment may apply if you do not file.</p><p style="margin:0 0 18px;line-height:1.75;">NeoFidu pinpoints exactly what you must (or no longer must) declare, prepares your cantonal return and handles all exchanges with the administration, entirely remotely.</p>`,
      },
    ],
    profiles: [
      {
        label: "Retraité installé au Québec",
        labelEn: "Retiree settled in Quebec",
        description: "Rentes AVS/LPP et éventuel bien en Suisse : nous clarifions l'imposition et récupérons l'impôt à la source sur vos prestations de prévoyance.",
        descriptionEn: "AVS/LPP pensions and any Swiss property: we clarify the taxation and recover the withholding tax on your pension benefits.",
      },
      {
        label: "Propriétaire d'un bien en Suisse",
        labelEn: "Owner of a Swiss property",
        description: "Un appartement resté en Valais ou à Genève reste imposable en Suisse : nous gérons votre déclaration cantonale.",
        descriptionEn: "A flat kept in Valais or Geneva stays taxable in Switzerland: we handle your cantonal return.",
      },
      {
        label: "Actif installé au Canada",
        labelEn: "Working in Canada",
        description: "Vous avez quitté la Suisse pour le travail : nous faisons le point sur vos derniers liens fiscaux et vos piliers.",
        descriptionEn: "You left Switzerland for work: we review your remaining tax ties and your pension pillars.",
      },
      {
        label: "Sur le point de partir",
        labelEn: "About to leave",
        description: "Avant le départ : nous optimisons le retrait de vos 2e/3e piliers et anticipons les démarches de remboursement.",
        descriptionEn: "Before leaving: we optimise your 2nd/3rd pillar withdrawal and plan the refund steps.",
      },
    ],
    faq: [
      {
        question: "Je vis au Canada, dois-je encore faire une déclaration d'impôt en Suisse ?",
        questionEn: "I live in Canada, do I still need to file a Swiss tax return?",
        answer: "Oui si vous conservez un bien immobilier ou des revenus de source suisse dans un canton romand ; sinon, en principe non, mais certaines obligations peuvent subsister. Nous faisons le point sur votre cas.",
        answerEn: "Yes if you keep a property or Swiss-source income in a Romandy canton; otherwise, in principle no, but some obligations may remain. We review your specific case.",
      },
      {
        question: "Mon 2e pilier retiré en capital a été imposé à la source en Suisse : puis-je le récupérer depuis le Canada ?",
        questionEn: "My 2nd pillar lump sum was taxed at source in Switzerland, can I recover it from Canada?",
        answer: "Oui. La convention CH-Canada attribue l'imposition de cette prestation au pays de résidence : l'impôt à la source suisse est remboursable sur demande, avec une attestation de résidence fiscale canadienne. NeoFidu s'occupe de la démarche.",
        answerEn: "Yes. The CH-Canada treaty assigns the taxation of this benefit to the country of residence: the Swiss withholding tax is refundable on request, with a Canadian tax-residence certificate. NeoFidu handles the process.",
      },
      {
        question: "Ma rente AVS est-elle imposée en Suisse quand je vis au Canada ?",
        questionEn: "Is my AVS pension taxed in Switzerland while I live in Canada?",
        answer: "La Suisse ne prélève pas d'impôt à la source sur l'AVS. Selon la convention, l'imposition revient en principe au Canada.",
        answerEn: "Switzerland does not levy withholding tax on AVS. Under the treaty, it is in principle taxable in Canada.",
      },
      {
        question: "Je possède un logement en Suisse mais je vis à Montréal : où est-il imposé ?",
        questionEn: "I own a home in Switzerland but live in Montreal, where is it taxed?",
        answer: "Un bien immobilier situé en Suisse reste imposable en Suisse. Une déclaration cantonale est nécessaire ; nous la préparons pour vous.",
        answerEn: "Real estate located in Switzerland stays taxable in Switzerland. A cantonal return is required; we prepare it for you.",
      },
      {
        question: "NeoFidu peut-il gérer ma déclaration à distance depuis le Canada ?",
        questionEn: "Can NeoFidu handle my return remotely from Canada?",
        answer: "Oui, tout se fait 100 % en ligne et en français, sans que vous ayez à vous déplacer.",
        answerEn: "Yes, everything is done 100% online, without you having to travel.",
      },
    ],
  },
  {
    slug: "france",
    country: "France",
    countryEn: "France",
    countryEmoji: "🇫🇷",
    metaTitle: "Suisses en France : frontaliers, quasi-résidents & fiscalité romande",
    metaTitleEn: "Swiss citizens in France: cross-border, quasi-resident & Swiss tax",
    metaDescription:
      "Frontalier ou résident en France ? Imposition à la source, quasi-résident (TOU), retrait 2e pilier, bien en Suisse : NeoFidu gère votre fiscalité romande, en ligne.",
    metaDescriptionEn:
      "Cross-border or resident in France? Source tax, quasi-resident (TOU), 2nd pillar withdrawal, Swiss property: NeoFidu handles your Romandy tax matters online.",
    h1: "Suisses en France : frontaliers, quasi-résidents et fiscalité en Suisse romande",
    h1En: "Swiss citizens in France: cross-border workers, quasi-residents and Swiss taxation",
    swissPopulation: "≈ 212 000 Suisses en France (OFS, 2025)",
    swissPopulationEn: "≈ 212,000 Swiss citizens in France (FSO, 2025)",
    lastUpdated: "2026-08-17",
    keywords: [
      "frontalier suisse impôts",
      "quasi-résident suisse TOU",
      "imposition à la source frontalier genève",
      "déclaration impôt frontalier vaud",
      "retrait 2e pilier résident france remboursement",
      "télétravail frontalier 40%",
      "suisse en france fiscalité",
    ],
    relatedCountries: ["canada"],
    infographic: {
      leftTitle: "Frontalier à Genève",
      leftTitleEn: "Cross-border in Geneva",
      rightTitle: "Frontalier VD, VS, NE, JU",
      rightTitleEn: "Cross-border VD, VS, NE, JU",
      leftItems: [
        { fr: "Imposé à la source en Suisse", en: "Taxed at source in Switzerland" },
        { fr: "Quasi-résident : TOU possible", en: "Quasi-resident: TOU possible" },
        { fr: "Déductions via déclaration", en: "Deductions via a tax return" },
      ],
      rightItems: [
        { fr: "Imposé en France", en: "Taxed in France" },
        { fr: "Compensation versée au canton", en: "Compensation paid to the canton" },
        { fr: "Déductions fiscales françaises", en: "French tax deductions" },
      ],
      calloutMain: "Quasi-résident (≥ 90 % de revenus suisses) : droit à la taxation ordinaire ultérieure",
      calloutMainEn: "Quasi-resident (≥ 90% Swiss income): right to subsequent ordinary taxation",
      calloutSub: "Depuis 2021, permet de déduire 3e pilier, frais, rachats, etc.",
      calloutSubEn: "Since 2021, lets you deduct 3rd pillar, expenses, buy-backs, etc.",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">Avec plus de <strong>212 000 personnes</strong>, la France abrite de loin la plus grande communauté suisse à l'étranger, concentrée le long de la frontière romande (Haute-Savoie, Ain, Doubs). Deux situations très différentes coexistent : le <strong>frontalier</strong>, qui vit en France et travaille en Suisse, et le <strong>résident établi</strong>, qui a quitté la Suisse mais y garde souvent un bien ou une prévoyance. Dans les deux cas, votre imposition dépend de règles précises, et NeoFidu vous accompagne en français et à distance.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">With over <strong>212,000 people</strong>, France is by far the largest Swiss community abroad, concentrated along the Romandy border (Haute-Savoie, Ain, Doubs). Two very different situations coexist: the <strong>cross-border worker</strong>, who lives in France and works in Switzerland, and the <strong>established resident</strong>, who has left Switzerland but often keeps property or pension savings there. In both cases, your taxation follows precise rules, and NeoFidu supports you in French, remotely.</p>`,
    sections: [
      {
        title: "Frontalier : tout dépend de votre canton de travail",
        titleEn: "Cross-border worker: it all depends on your canton of employment",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Contrairement à une idée reçue, il n'existe pas un seul régime frontalier, mais deux, selon le canton où vous travaillez :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Genève</strong> (accord de 1983) : vous êtes <strong>imposé à la source en Suisse</strong>. Genève verse ensuite une compensation aux départements français.</li><li><strong>Vaud, Valais, Neuchâtel, Jura</strong> et 4 autres cantons (accord de 1966) : vous êtes <strong>imposé en France</strong>, et la Suisse reçoit une compensation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> le canton de votre employeur détermine tout. Un frontalier à Genève et un frontalier à Nyon (Vaud) ne sont pas imposés au même endroit.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Contrary to popular belief, there is not one cross-border regime but two, depending on the canton where you work:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Geneva</strong> (1983 agreement): you are <strong>taxed at source in Switzerland</strong>. Geneva then pays compensation to the French departments.</li><li><strong>Vaud, Valais, Neuchâtel, Jura</strong> and 4 other cantons (1966 agreement): you are <strong>taxed in France</strong>, and Switzerland receives compensation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> your employer's canton determines everything. A cross-border worker in Geneva and one in Nyon (Vaud) are not taxed in the same place.</div>`,
      },
      {
        title: "Quasi-résident : récupérez vos déductions avec la TOU",
        titleEn: "Quasi-resident: recover your deductions with the TOU",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Si vous êtes imposé à la source (typiquement à Genève) et que <strong>au moins 90 % des revenus de votre foyer</strong> proviennent de Suisse, vous avez le statut de <strong>quasi-résident</strong>. Depuis 2021, cela vous ouvre un <strong>droit</strong> à la <strong>taxation ordinaire ultérieure (TOU)</strong> : vous déposez une vraie déclaration et êtes imposé comme un résident.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>L'intérêt :</strong> déduire vos frais réels (3e pilier, rachats LPP, frais de garde, pensions, trajets, intérêts de dette). Bien menée, la TOU permet souvent de récupérer une partie de l'impôt à la source prélevé. C'est le cœur de métier de NeoFidu.</div><p style="margin:0 0 18px;line-height:1.75;">Attention : la TOU est <strong>irrévocable</strong> pour l'année concernée et doit être demandée dans les délais. Un calcul préalable évite les mauvaises surprises.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">If you are taxed at source (typically in Geneva) and <strong>at least 90% of your household income</strong> comes from Switzerland, you have <strong>quasi-resident</strong> status. Since 2021, this gives you a <strong>right</strong> to <strong>subsequent ordinary taxation (TOU)</strong>: you file a full return and are taxed like a resident.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>The benefit:</strong> deducting your actual expenses (3rd pillar, LPP buy-backs, childcare, alimony, commuting, debt interest). Done well, the TOU often lets you recover part of the source tax withheld. This is NeoFidu's core expertise.</div><p style="margin:0 0 18px;line-height:1.75;">Note: the TOU is <strong>irrevocable</strong> for the year concerned and must be requested on time. A prior calculation avoids unpleasant surprises.</p>`,
      },
      {
        title: "Télétravail : la règle des 40 %",
        titleEn: "Telework: the 40% rule",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Depuis 2023, un accord franco-suisse autorise les frontaliers à <strong>télétravailler jusqu'à 40 %</strong> de leur temps depuis la France sans transfert de l'imposition. Au-delà de ce seuil, la répartition des droits d'imposition change et des obligations supplémentaires peuvent apparaître. Un suivi de vos jours de télétravail est donc essentiel.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Since 2023, a Franco-Swiss agreement allows cross-border workers to <strong>telework up to 40%</strong> of their time from France without shifting taxation. Beyond this threshold, the allocation of taxing rights changes and additional obligations may arise. Tracking your telework days is therefore essential.</p>`,
      },
      {
        title: "Vous avez quitté la Suisse pour la France",
        titleEn: "You have left Switzerland for France",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Si vous êtes résident établi en France, vous y êtes imposé sur votre revenu mondial, mais des liens avec la Suisse subsistent :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : il reste imposable en Suisse (déclaration cantonale nécessaire).</li><li><strong>Retrait du 2e ou 3e pilier en capital</strong> : imposé à la source en Suisse, mais <strong>remboursable</strong> sur demande (dans un délai de 3 ans) une fois le capital déclaré en France. Exception : si votre employeur était public (canton, commune), l'imposition reste en Suisse.</li><li><strong>Rente AVS</strong> : la Suisse ne prélève pas d'impôt à la source ; l'imposition revient en principe à la France.</li></ul>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">If you are an established resident in France, you are taxed there on your worldwide income, but ties with Switzerland remain:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: it stays taxable in Switzerland (cantonal return required).</li><li><strong>2nd or 3rd pillar lump-sum withdrawal</strong>: taxed at source in Switzerland, but <strong>refundable</strong> on request (within 3 years) once the capital is declared in France. Exception: if your employer was public (canton, municipality), taxation stays in Switzerland.</li><li><strong>AVS pension</strong>: Switzerland does not levy source tax; taxation is in principle in France.</li></ul>`,
      },
    ],
    profiles: [
      {
        label: "Frontalier à Genève",
        labelEn: "Cross-border worker in Geneva",
        description: "Imposé à la source : nous vérifions votre statut de quasi-résident et déposons une TOU pour récupérer vos déductions.",
        descriptionEn: "Taxed at source: we check your quasi-resident status and file a TOU to recover your deductions.",
      },
      {
        label: "Frontalier VD, VS, NE, JU",
        labelEn: "Cross-border worker VD, VS, NE, JU",
        description: "Imposé en France : nous vous aidons à sécuriser votre situation entre les deux pays et votre prévoyance.",
        descriptionEn: "Taxed in France: we help secure your situation across both countries and your pension planning.",
      },
      {
        label: "Retraité en France",
        labelEn: "Retiree in France",
        description: "Rentes et retrait de piliers : nous clarifions l'imposition et récupérons l'impôt à la source suisse.",
        descriptionEn: "Pensions and pillar withdrawals: we clarify taxation and recover the Swiss source tax.",
      },
      {
        label: "Propriétaire d'un bien en Suisse",
        labelEn: "Owner of a Swiss property",
        description: "Un bien resté en Suisse reste imposable en Suisse : nous gérons votre déclaration cantonale à distance.",
        descriptionEn: "A property kept in Switzerland stays taxable in Switzerland: we handle your cantonal return remotely.",
      },
    ],
    faq: [
      {
        question: "Frontalier à Genève, puis-je récupérer une partie de mes impôts ?",
        questionEn: "As a cross-border worker in Geneva, can I recover part of my taxes?",
        answer: "Souvent oui. Si au moins 90 % des revenus de votre foyer sont suisses, vous êtes quasi-résident et pouvez demander la taxation ordinaire ultérieure (TOU) pour déduire vos frais réels. NeoFidu calcule d'abord si c'est avantageux, puis dépose la demande.",
        answerEn: "Often yes. If at least 90% of your household income is Swiss, you are a quasi-resident and can request subsequent ordinary taxation (TOU) to deduct your actual expenses. NeoFidu first checks whether it is worthwhile, then files the request.",
      },
      {
        question: "Je travaille dans le canton de Vaud et vis en France : où suis-je imposé ?",
        questionEn: "I work in the canton of Vaud and live in France, where am I taxed?",
        answer: "En France, en vertu de l'accord de 1966 qui couvre Vaud, Valais, Neuchâtel, Jura et quatre autres cantons. La Suisse reçoit une compensation. Genève, elle, applique un régime différent (imposition à la source).",
        answerEn: "In France, under the 1966 agreement covering Vaud, Valais, Neuchâtel, Jura and four other cantons. Switzerland receives compensation. Geneva applies a different regime (taxation at source).",
      },
      {
        question: "J'ai retiré mon 2e pilier en capital, imposé en Suisse : puis-je le récupérer depuis la France ?",
        questionEn: "My 2nd pillar lump sum was taxed in Switzerland, can I recover it from France?",
        answer: "Oui dans la plupart des cas : l'impôt à la source suisse est remboursable sur demande (dans un délai de 3 ans), une fois le capital déclaré en France. Exception : si votre employeur était une entité publique, l'imposition reste suisse.",
        answerEn: "Yes in most cases: the Swiss source tax is refundable on request (within 3 years), once the capital is declared in France. Exception: if your employer was a public entity, taxation stays Swiss.",
      },
      {
        question: "Combien de télétravail puis-je faire depuis la France ?",
        questionEn: "How much telework can I do from France?",
        answer: "Jusqu'à 40 % de votre temps de travail depuis 2023, sans transfert de l'imposition. Au-delà, les règles changent : mieux vaut suivre vos jours et anticiper.",
        answerEn: "Up to 40% of your working time since 2023, without shifting taxation. Beyond that, the rules change: it is best to track your days and plan ahead.",
      },
      {
        question: "Je possède un bien en Suisse mais je vis en France : où est-il imposé ?",
        questionEn: "I own a property in Switzerland but live in France, where is it taxed?",
        answer: "L'immobilier situé en Suisse reste imposable en Suisse, quel que soit votre pays de résidence. Une déclaration cantonale est nécessaire ; nous la préparons pour vous.",
        answerEn: "Real estate located in Switzerland stays taxable in Switzerland, whatever your country of residence. A cantonal return is required; we prepare it for you.",
      },
    ],
  },
  {
    slug: "belgique",
    country: "Belgique",
    countryEn: "Belgium",
    countryEmoji: "🇧🇪",
    metaTitle: "Suisses en Belgique : impôts & fiscalité en Suisse romande",
    metaTitleEn: "Swiss citizens in Belgium: taxes & Swiss filing",
    metaDescription:
      "Vous êtes Suisse en Belgique ? Rente AVS, retrait 2e/3e pilier, bien immobilier en Suisse, déclaration cantonale : NeoFidu gère votre fiscalité romande, en ligne.",
    metaDescriptionEn:
      "Swiss living in Belgium? AVS pension, 2nd/3rd pillar withdrawal, Swiss property, cantonal return: NeoFidu handles your Romandy tax matters, online.",
    h1: "Suisses en Belgique : votre fiscalité et vos obligations en Suisse romande",
    h1En: "Swiss citizens in Belgium: your taxes and obligations in French-speaking Switzerland",
    swissPopulation: "Communauté suisse établie en Belgique (OFS)",
    swissPopulationEn: "Swiss community established in Belgium (FSO)",
    lastUpdated: "2026-08-17",
    keywords: [
      "suisse en belgique impôts",
      "déclaration impôt suisse belgique",
      "convention double imposition suisse belgique",
      "retrait 2e pilier belgique remboursement",
      "rente AVS belgique imposition",
      "fiscalité suisse expatrié bruxelles",
    ],
    relatedCountries: ["france", "canada"],
    infographic: {
      leftTitle: "Imposé en Suisse",
      leftTitleEn: "Taxed in Switzerland",
      rightTitle: "Imposé en Belgique",
      rightTitleEn: "Taxed in Belgium",
      leftItems: [
        { fr: "Bien immobilier en Suisse", en: "Swiss real estate" },
        { fr: "Prestations 2e / 3e pilier", en: "2nd / 3rd pillar benefits" },
        { fr: "Certains revenus suisses", en: "Certain Swiss-source income" },
      ],
      rightItems: [
        { fr: "Salaire et revenus belges", en: "Belgian salary & income" },
        { fr: "Rente AVS (1er pilier)", en: "AVS pension (1st pillar)" },
        { fr: "Revenu mondial", en: "Worldwide income" },
      ],
      calloutMain: "2e et 3e pilier : imposé à la source en Suisse, puis remboursé",
      calloutMainEn: "2nd & 3rd pillar: taxed at source in Switzerland, then refunded",
      calloutSub: "La convention CH-Belgique attribue l'imposition au pays de résidence",
      calloutSubEn: "The CH-Belgium treaty assigns taxation to the country of residence",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">De Bruxelles à la Wallonie, une communauté suisse durable vit en Belgique, souvent francophone et proche de la Suisse romande. Que vous y travailliez pour une institution européenne ou que vous y soyez retraité, votre installation ne met pas toujours fin à vos liens fiscaux avec votre canton d'origine, surtout si vous avez gardé un bien immobilier ou une prévoyance. NeoFidu vous accompagne, en français et 100 % à distance.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">From Brussels to Wallonia, a lasting Swiss community lives in Belgium, often French-speaking and close to French-speaking Switzerland. Whether you work for a European institution or are retired there, moving does not always end your tax ties with your home canton, especially if you kept property or pension savings. NeoFidu supports you, in French and 100% remotely.</p>`,
    sections: [
      {
        title: "Où êtes-vous imposé : en Belgique ou en Suisse ?",
        titleEn: "Where are you taxed: in Belgium or in Switzerland?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Résident en Belgique, vous y êtes en principe imposé sur votre revenu mondial. La <strong>convention de double imposition entre la Suisse et la Belgique</strong> répartit les droits d'imposition pour éviter que les mêmes revenus soient taxés deux fois. Certains éléments restent toutefois rattachés à la Suisse, et c'est là que se joue votre situation.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">As a Belgian resident, you are in principle taxed there on your worldwide income. The <strong>Switzerland-Belgium double taxation treaty</strong> allocates taxing rights to avoid the same income being taxed twice. Some items nonetheless remain linked to Switzerland, and that is where your situation is decided.</p>`,
      },
      {
        title: "Ce qui reste imposable en Suisse",
        titleEn: "What remains taxable in Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Même résident en Belgique, vous conservez des obligations en Suisse dans plusieurs cas :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : il reste imposable en Suisse (revenu ou valeur locative, et fortune). Une déclaration cantonale reste nécessaire.</li><li><strong>Revenus de source suisse</strong> : certaines rentes, participations ou activités conservées en Suisse.</li><li><strong>Prestations de prévoyance</strong> : voir la section ci-dessous.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> l'immobilier suisse s'impose toujours en Suisse, quel que soit votre pays de résidence.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Even as a Belgian resident, you keep Swiss obligations in several cases:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: it stays taxable in Switzerland (rental or imputed rental value, and wealth). A cantonal return is still required.</li><li><strong>Swiss-source income</strong>: certain pensions, holdings or activities kept in Switzerland.</li><li><strong>Pension benefits</strong>: see the section below.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> Swiss real estate is always taxed in Switzerland, whatever your country of residence.</div>`,
      },
      {
        title: "Vos rentes et votre prévoyance (AVS, 2e et 3e pilier)",
        titleEn: "Your pensions and retirement savings (AVS, 2nd and 3rd pillar)",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Point clé pour un Suisse en Belgique :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Rente AVS (1er pilier)</strong> : la Suisse ne prélève pas d'impôt à la source ; l'imposition revient en principe à la Belgique.</li><li><strong>Retrait du 2e ou 3e pilier A en capital</strong> : toujours soumis à l'impôt à la source en Suisse, prélevé par le canton de la fondation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Bonne nouvelle :</strong> comme la convention CH-Belgique attribue l'imposition au pays de résidence, l'impôt à la source suisse est <strong>remboursable sur demande</strong>, avec une attestation de résidence fiscale belge adressée au canton concerné. NeoFidu s'occupe de la démarche.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Key point for a Swiss citizen in Belgium:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>AVS pension (1st pillar)</strong>: Switzerland does not levy source tax; taxation is in principle in Belgium.</li><li><strong>2nd or 3rd pillar lump-sum withdrawal</strong>: always subject to Swiss source tax, levied by the canton of the foundation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Good news:</strong> because the CH-Belgium treaty assigns taxation to the country of residence, the Swiss source tax is <strong>refundable on request</strong>, with a Belgian tax-residence certificate sent to the relevant canton. NeoFidu handles the process.</div>`,
      },
      {
        title: "Vos obligations déclaratives en Suisse romande",
        titleEn: "Your filing obligations in French-speaking Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Selon votre situation, vous pouvez encore devoir déposer une déclaration dans votre canton (VD, GE, VS, FR, NE ou JU), typiquement si vous y détenez un bien immobilier. NeoFidu identifie ce que vous devez déclarer, prépare votre déclaration cantonale et gère les échanges avec l'administration, entièrement à distance.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Depending on your situation, you may still need to file a return in your canton (VD, GE, VS, FR, NE or JU), typically if you hold property there. NeoFidu identifies what you must declare, prepares your cantonal return and handles all exchanges with the administration, entirely remotely.</p>`,
      },
    ],
    profiles: [
      {
        label: "Fonctionnaire européen à Bruxelles",
        labelEn: "EU staff in Brussels",
        description: "Situation souvent particulière (statut fiscal spécifique) : nous faisons le point sur vos liens fiscaux suisses restants.",
        descriptionEn: "Often a specific tax status: we review your remaining Swiss tax ties.",
      },
      {
        label: "Retraité en Belgique",
        labelEn: "Retiree in Belgium",
        description: "Rentes et retrait de piliers : nous clarifions l'imposition et récupérons l'impôt à la source suisse.",
        descriptionEn: "Pensions and pillar withdrawals: we clarify taxation and recover the Swiss source tax.",
      },
      {
        label: "Propriétaire d'un bien en Suisse",
        labelEn: "Owner of a Swiss property",
        description: "Un bien resté en Suisse reste imposable en Suisse : nous gérons votre déclaration cantonale à distance.",
        descriptionEn: "A property kept in Switzerland stays taxable in Switzerland: we handle your cantonal return remotely.",
      },
      {
        label: "Sur le point de partir",
        labelEn: "About to leave",
        description: "Avant le départ : nous optimisons le retrait de vos 2e/3e piliers et anticipons le remboursement.",
        descriptionEn: "Before leaving: we optimise your 2nd/3rd pillar withdrawal and plan the refund.",
      },
    ],
    faq: [
      {
        question: "Je vis en Belgique, dois-je encore faire une déclaration d'impôt en Suisse ?",
        questionEn: "I live in Belgium, do I still need to file a Swiss tax return?",
        answer: "Oui si vous conservez un bien immobilier ou des revenus de source suisse dans un canton romand ; sinon, en principe non. Nous faisons le point sur votre cas.",
        answerEn: "Yes if you keep a property or Swiss-source income in a Romandy canton; otherwise, in principle no. We review your specific case.",
      },
      {
        question: "Mon 2e pilier retiré en capital a été imposé à la source en Suisse : puis-je le récupérer depuis la Belgique ?",
        questionEn: "My 2nd pillar lump sum was taxed in Switzerland, can I recover it from Belgium?",
        answer: "Oui dans la plupart des cas : la convention CH-Belgique attribue l'imposition au pays de résidence, l'impôt à la source suisse est donc remboursable sur demande avec une attestation de résidence fiscale belge.",
        answerEn: "Yes in most cases: the CH-Belgium treaty assigns taxation to the country of residence, so the Swiss source tax is refundable on request with a Belgian tax-residence certificate.",
      },
      {
        question: "Ma rente AVS est-elle imposée en Suisse quand je vis en Belgique ?",
        questionEn: "Is my AVS pension taxed in Switzerland while I live in Belgium?",
        answer: "La Suisse ne prélève pas d'impôt à la source sur l'AVS ; l'imposition revient en principe à la Belgique.",
        answerEn: "Switzerland does not levy source tax on AVS; taxation is in principle in Belgium.",
      },
      {
        question: "Je possède un logement en Suisse mais je vis en Belgique : où est-il imposé ?",
        questionEn: "I own a home in Switzerland but live in Belgium, where is it taxed?",
        answer: "L'immobilier situé en Suisse reste imposable en Suisse. Une déclaration cantonale est nécessaire ; nous la préparons pour vous.",
        answerEn: "Real estate located in Switzerland stays taxable in Switzerland. A cantonal return is required; we prepare it for you.",
      },
      {
        question: "NeoFidu peut-il gérer ma déclaration à distance depuis la Belgique ?",
        questionEn: "Can NeoFidu handle my return remotely from Belgium?",
        answer: "Oui, tout se fait 100 % en ligne et en français, sans que vous ayez à vous déplacer.",
        answerEn: "Yes, everything is done 100% online, without you having to travel.",
      },
    ],
  },
  {
    slug: "espagne",
    country: "Espagne",
    countryEn: "Spain",
    countryEmoji: "🇪🇸",
    metaTitle: "Suisses en Espagne : impôts & fiscalité en Suisse romande",
    metaTitleEn: "Swiss citizens in Spain: taxes & Swiss filing",
    metaDescription:
      "Vous êtes Suisse en Espagne ? Rente AVS, retrait 2e/3e pilier, timing du départ, bien en Suisse : NeoFidu gère votre fiscalité romande, en ligne et en français.",
    metaDescriptionEn:
      "Swiss living in Spain? AVS pension, 2nd/3rd pillar withdrawal, departure timing, Swiss property: NeoFidu handles your Romandy tax matters online.",
    h1: "Suisses en Espagne : votre fiscalité et vos obligations en Suisse romande",
    h1En: "Swiss citizens in Spain: your taxes and obligations in French-speaking Switzerland",
    swissPopulation: "≈ 28 200 Suisses en Espagne (OFS, 2025)",
    swissPopulationEn: "≈ 28,200 Swiss citizens in Spain (FSO, 2025)",
    lastUpdated: "2026-08-17",
    keywords: [
      "suisse en espagne impôts",
      "retraité suisse espagne fiscalité",
      "convention double imposition suisse espagne",
      "retrait 2e pilier espagne remboursement",
      "rente AVS espagne imposition",
      "résidence fiscale suisse espagne",
    ],
    relatedCountries: ["france", "belgique"],
    infographic: {
      leftTitle: "Imposé en Suisse",
      leftTitleEn: "Taxed in Switzerland",
      rightTitle: "Imposé en Espagne",
      rightTitleEn: "Taxed in Spain",
      leftItems: [
        { fr: "Bien immobilier en Suisse", en: "Swiss real estate" },
        { fr: "Prestations 2e / 3e pilier", en: "2nd / 3rd pillar benefits" },
        { fr: "Certains revenus suisses", en: "Certain Swiss-source income" },
      ],
      rightItems: [
        { fr: "Salaire et revenus espagnols", en: "Spanish salary & income" },
        { fr: "Rente AVS (1er pilier)", en: "AVS pension (1st pillar)" },
        { fr: "Revenu mondial", en: "Worldwide income" },
      ],
      calloutMain: "2e et 3e pilier : imposé à la source en Suisse, puis remboursé",
      calloutMainEn: "2nd & 3rd pillar: taxed at source in Switzerland, then refunded",
      calloutSub: "La convention CH-Espagne attribue l'imposition au pays de résidence",
      calloutSubEn: "The CH-Spain treaty assigns taxation to the country of residence",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">L'Espagne est l'une des destinations préférées des Suisses romands, en particulier à la retraite : environ <strong>28 200 Suisses</strong> y vivent, de la Costa Blanca à Barcelone. S'installer au soleil ne met pas fin à vos liens fiscaux avec la Suisse, surtout si vous gardez un bien immobilier ou touchez des prestations de prévoyance. Et le <strong>moment de votre départ</strong> peut changer beaucoup de choses. NeoFidu vous accompagne, en français et 100 % à distance.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">Spain is one of the favourite destinations for French-speaking Swiss, especially in retirement: around <strong>28,200 Swiss citizens</strong> live there, from the Costa Blanca to Barcelona. Moving to the sun does not end your tax ties with Switzerland, especially if you keep property or receive pension benefits. And the <strong>timing of your departure</strong> can change a lot. NeoFidu supports you, in French and 100% remotely.</p>`,
    sections: [
      {
        title: "Où êtes-vous imposé : en Espagne ou en Suisse ?",
        titleEn: "Where are you taxed: in Spain or in Switzerland?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Résident fiscal en Espagne (en général dès que vous y passez plus de 183 jours par an), vous y êtes imposé sur votre revenu mondial. La <strong>convention de double imposition entre la Suisse et l'Espagne</strong> évite que les mêmes revenus soient taxés deux fois. Certains éléments restent toutefois rattachés à la Suisse, notamment votre immobilier et votre prévoyance.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">As a Spanish tax resident (generally once you spend more than 183 days a year there), you are taxed on your worldwide income. The <strong>Switzerland-Spain double taxation treaty</strong> avoids the same income being taxed twice. Some items nonetheless remain linked to Switzerland, notably your real estate and pension savings.</p>`,
      },
      {
        title: "Ce qui reste imposable en Suisse",
        titleEn: "What remains taxable in Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Même résident en Espagne, vous conservez des obligations en Suisse dans plusieurs cas :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : il reste imposable en Suisse (revenu ou valeur locative, et fortune). Une déclaration cantonale reste nécessaire.</li><li><strong>Revenus de source suisse</strong> : certaines rentes, participations ou activités conservées en Suisse.</li><li><strong>Prestations de prévoyance</strong> : voir la section ci-dessous.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> l'immobilier suisse s'impose toujours en Suisse, quel que soit votre pays de résidence.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Even as a Spanish resident, you keep Swiss obligations in several cases:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: it stays taxable in Switzerland (rental or imputed rental value, and wealth). A cantonal return is still required.</li><li><strong>Swiss-source income</strong>: certain pensions, holdings or activities kept in Switzerland.</li><li><strong>Pension benefits</strong>: see the section below.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> Swiss real estate is always taxed in Switzerland, whatever your country of residence.</div>`,
      },
      {
        title: "Prévoyance et timing du départ (le point clé)",
        titleEn: "Pension savings and departure timing (the key point)",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Pour un futur retraité en Espagne, le calendrier du retrait de prévoyance est décisif :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Rente AVS (1er pilier)</strong> : la Suisse ne prélève pas d'impôt à la source ; l'imposition revient en principe à l'Espagne.</li><li><strong>Retrait du 2e ou 3e pilier en capital</strong> : toujours imposé à la source en Suisse, prélevé par le canton de la fondation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Bonne nouvelle :</strong> comme la convention CH-Espagne attribue l'imposition au pays de résidence, l'impôt à la source suisse est <strong>remboursable sur demande</strong>, avec une attestation de résidence fiscale espagnole. Mais attention : selon que vous retirez votre capital <strong>avant ou après</strong> être devenu résident espagnol, le traitement diffère. Un calcul en amont peut éviter une imposition défavorable.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">For a future retiree in Spain, the timing of the pension withdrawal is decisive:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>AVS pension (1st pillar)</strong>: Switzerland does not levy source tax; taxation is in principle in Spain.</li><li><strong>2nd or 3rd pillar lump-sum withdrawal</strong>: always taxed at source in Switzerland, levied by the canton of the foundation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Good news:</strong> because the CH-Spain treaty assigns taxation to the country of residence, the Swiss source tax is <strong>refundable on request</strong>, with a Spanish tax-residence certificate. But note: whether you withdraw your capital <strong>before or after</strong> becoming a Spanish resident changes the treatment. A prior calculation can avoid unfavourable taxation.</div>`,
      },
      {
        title: "Vos obligations déclaratives en Suisse romande",
        titleEn: "Your filing obligations in French-speaking Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Selon votre situation, vous pouvez encore devoir déposer une déclaration dans votre canton (VD, GE, VS, FR, NE ou JU), typiquement si vous y détenez un bien immobilier. NeoFidu identifie ce que vous devez déclarer, prépare votre déclaration cantonale et gère les échanges avec l'administration, entièrement à distance.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Depending on your situation, you may still need to file a return in your canton (VD, GE, VS, FR, NE or JU), typically if you hold property there. NeoFidu identifies what you must declare, prepares your cantonal return and handles all exchanges with the administration, entirely remotely.</p>`,
      },
    ],
    profiles: [
      {
        label: "Retraité sur la côte",
        labelEn: "Retiree on the coast",
        description: "Rentes AVS/LPP et retrait de piliers : nous clarifions l'imposition et récupérons l'impôt à la source suisse.",
        descriptionEn: "AVS/LPP pensions and pillar withdrawals: we clarify taxation and recover the Swiss source tax.",
      },
      {
        label: "Sur le point de partir",
        labelEn: "About to leave",
        description: "Le timing du retrait est crucial : nous calculons le meilleur moment pour retirer vos 2e/3e piliers.",
        descriptionEn: "Withdrawal timing is crucial: we calculate the best moment to withdraw your 2nd/3rd pillars.",
      },
      {
        label: "Propriétaire d'un bien en Suisse",
        labelEn: "Owner of a Swiss property",
        description: "Un bien resté en Suisse reste imposable en Suisse : nous gérons votre déclaration cantonale à distance.",
        descriptionEn: "A property kept in Switzerland stays taxable in Switzerland: we handle your cantonal return remotely.",
      },
      {
        label: "Actif installé en Espagne",
        labelEn: "Working in Spain",
        description: "Vous avez quitté la Suisse pour le travail : nous faisons le point sur vos derniers liens fiscaux et vos piliers.",
        descriptionEn: "You left Switzerland for work: we review your remaining tax ties and your pension pillars.",
      },
    ],
    faq: [
      {
        question: "Je vis en Espagne, dois-je encore faire une déclaration d'impôt en Suisse ?",
        questionEn: "I live in Spain, do I still need to file a Swiss tax return?",
        answer: "Oui si vous conservez un bien immobilier ou des revenus de source suisse dans un canton romand ; sinon, en principe non. Nous faisons le point sur votre cas.",
        answerEn: "Yes if you keep a property or Swiss-source income in a Romandy canton; otherwise, in principle no. We review your specific case.",
      },
      {
        question: "Faut-il retirer son 2e pilier avant ou après s'installer en Espagne ?",
        questionEn: "Should I withdraw my 2nd pillar before or after moving to Spain?",
        answer: "Cela dépend de votre situation : le moment du retrait change le traitement fiscal entre la Suisse et l'Espagne. Un calcul préalable permet souvent d'économiser. NeoFidu compare les scénarios pour vous.",
        answerEn: "It depends on your situation: the timing of the withdrawal changes the tax treatment between Switzerland and Spain. A prior calculation often saves money. NeoFidu compares the scenarios for you.",
      },
      {
        question: "Mon 2e pilier retiré en capital a été imposé à la source en Suisse : puis-je le récupérer depuis l'Espagne ?",
        questionEn: "My 2nd pillar lump sum was taxed in Switzerland, can I recover it from Spain?",
        answer: "Oui dans la plupart des cas : la convention CH-Espagne attribue l'imposition au pays de résidence, l'impôt à la source suisse est donc remboursable sur demande avec une attestation de résidence fiscale espagnole.",
        answerEn: "Yes in most cases: the CH-Spain treaty assigns taxation to the country of residence, so the Swiss source tax is refundable on request with a Spanish tax-residence certificate.",
      },
      {
        question: "Ma rente AVS est-elle imposée en Suisse quand je vis en Espagne ?",
        questionEn: "Is my AVS pension taxed in Switzerland while I live in Spain?",
        answer: "La Suisse ne prélève pas d'impôt à la source sur l'AVS ; l'imposition revient en principe à l'Espagne.",
        answerEn: "Switzerland does not levy source tax on AVS; taxation is in principle in Spain.",
      },
      {
        question: "NeoFidu peut-il gérer ma déclaration à distance depuis l'Espagne ?",
        questionEn: "Can NeoFidu handle my return remotely from Spain?",
        answer: "Oui, tout se fait 100 % en ligne et en français, sans que vous ayez à vous déplacer.",
        answerEn: "Yes, everything is done 100% online, without you having to travel.",
      },
    ],
  },
  {
    slug: "portugal",
    country: "Portugal",
    countryEn: "Portugal",
    countryEmoji: "🇵🇹",
    metaTitle: "Suisses au Portugal : impôts & fiscalité en Suisse romande",
    metaTitleEn: "Swiss citizens in Portugal: taxes & Swiss filing",
    metaDescription:
      "Vous êtes Suisse au Portugal ? Fin du régime RNH, rente AVS, retrait 2e/3e pilier, bien en Suisse : NeoFidu gère votre fiscalité romande, en ligne et en français.",
    metaDescriptionEn:
      "Swiss living in Portugal? End of the NHR regime, AVS pension, 2nd/3rd pillar withdrawal, Swiss property: NeoFidu handles your Romandy tax matters online.",
    h1: "Suisses au Portugal : votre fiscalité et vos obligations en Suisse romande",
    h1En: "Swiss citizens in Portugal: your taxes and obligations in French-speaking Switzerland",
    swissPopulation: "Communauté suisse établie au Portugal (OFS)",
    swissPopulationEn: "Swiss community established in Portugal (FSO)",
    lastUpdated: "2026-08-17",
    keywords: [
      "suisse au portugal impôts",
      "retraité suisse portugal fiscalité",
      "fin régime RNH portugal 2024",
      "convention double imposition suisse portugal",
      "retrait 2e pilier portugal remboursement",
      "rente AVS portugal imposition",
    ],
    relatedCountries: ["espagne", "france"],
    infographic: {
      leftTitle: "Imposé en Suisse",
      leftTitleEn: "Taxed in Switzerland",
      rightTitle: "Imposé au Portugal",
      rightTitleEn: "Taxed in Portugal",
      leftItems: [
        { fr: "Bien immobilier en Suisse", en: "Swiss real estate" },
        { fr: "Prestations 2e / 3e pilier", en: "2nd / 3rd pillar benefits" },
        { fr: "Certains revenus suisses", en: "Certain Swiss-source income" },
      ],
      rightItems: [
        { fr: "Salaire et revenus portugais", en: "Portuguese salary & income" },
        { fr: "Rente AVS (1er pilier)", en: "AVS pension (1st pillar)" },
        { fr: "Revenu mondial", en: "Worldwide income" },
      ],
      calloutMain: "2e et 3e pilier : imposé à la source en Suisse, puis remboursé",
      calloutMainEn: "2nd & 3rd pillar: taxed at source in Switzerland, then refunded",
      calloutSub: "La convention CH-Portugal attribue l'imposition au pays de résidence",
      calloutSubEn: "The CH-Portugal treaty assigns taxation to the country of residence",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">Longtemps réputé comme un paradis fiscal pour les retraités, le Portugal a beaucoup changé : le régime « Résident Non Habituel » (RNH) a été supprimé pour les nouveaux arrivants. Il reste une destination très appréciée des Suisses romands, mais la fiscalité mérite désormais un examen attentif, surtout si vous conservez un bien ou une prévoyance en Suisse. NeoFidu vous accompagne, en français et 100 % à distance.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">Long known as a tax haven for retirees, Portugal has changed a lot: the "Non-Habitual Resident" (NHR) regime has been abolished for new arrivals. It remains a very popular destination for French-speaking Swiss, but the tax situation now deserves careful review, especially if you keep property or pension savings in Switzerland. NeoFidu supports you, in French and 100% remotely.</p>`,
    sections: [
      {
        title: "Où êtes-vous imposé : au Portugal ou en Suisse ?",
        titleEn: "Where are you taxed: in Portugal or in Switzerland?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Résident fiscal au Portugal, vous y êtes imposé sur votre revenu mondial. La <strong>convention de double imposition entre la Suisse et le Portugal</strong> répartit les droits d'imposition pour éviter une double taxation. Certains éléments restent toutefois rattachés à la Suisse, notamment votre immobilier et votre prévoyance.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">As a Portuguese tax resident, you are taxed there on your worldwide income. The <strong>Switzerland-Portugal double taxation treaty</strong> allocates taxing rights to avoid double taxation. Some items nonetheless remain linked to Switzerland, notably your real estate and pension savings.</p>`,
      },
      {
        title: "La fin de l'avantage RNH (depuis 2024)",
        titleEn: "The end of the NHR advantage (since 2024)",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">C'est le changement le plus important. Le régime <strong>Résident Non Habituel (RNH)</strong>, qui permettait aux retraités étrangers de bénéficier d'une imposition très faible sur leurs pensions, a été <strong>fermé aux nouveaux arrivants dès 2024</strong>.</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li>Les <strong>nouveaux résidents</strong> sont désormais imposés au barème portugais ordinaire (progressif, jusqu'à ~48 %).</li><li>Les personnes <strong>déjà au bénéfice du RNH</strong> conservent leurs avantages jusqu'à la fin de leur période de 10 ans.</li><li>Un nouveau régime (IFICI) existe depuis 2025, mais il vise des profils qualifiés spécifiques, pas les retraités.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> ne vous fiez pas aux anciens articles qui présentent encore le Portugal comme un eldorado fiscal. Un calcul actualisé est indispensable avant de partir.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">This is the most important change. The <strong>Non-Habitual Resident (NHR)</strong> regime, which let foreign retirees enjoy very low taxation on their pensions, was <strong>closed to new arrivals from 2024</strong>.</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>New residents</strong> are now taxed under ordinary Portuguese rates (progressive, up to ~48%).</li><li>People <strong>already benefiting from NHR</strong> keep their advantages until the end of their 10-year period.</li><li>A new regime (IFICI) exists from 2025, but it targets specific qualified profiles, not retirees.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> do not rely on old articles that still present Portugal as a tax haven. An up-to-date calculation is essential before you move.</div>`,
      },
      {
        title: "Ce qui reste imposable en Suisse",
        titleEn: "What remains taxable in Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Même résident au Portugal, vous conservez des obligations en Suisse dans plusieurs cas :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : il reste imposable en Suisse (revenu ou valeur locative, et fortune). Une déclaration cantonale reste nécessaire.</li><li><strong>Revenus de source suisse</strong> : certaines rentes, participations ou activités conservées en Suisse.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> l'immobilier suisse s'impose toujours en Suisse, quel que soit votre pays de résidence.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Even as a Portuguese resident, you keep Swiss obligations in several cases:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: it stays taxable in Switzerland (rental or imputed rental value, and wealth). A cantonal return is still required.</li><li><strong>Swiss-source income</strong>: certain pensions, holdings or activities kept in Switzerland.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> Swiss real estate is always taxed in Switzerland, whatever your country of residence.</div>`,
      },
      {
        title: "Vos rentes et votre prévoyance (AVS, 2e et 3e pilier)",
        titleEn: "Your pensions and retirement savings (AVS, 2nd and 3rd pillar)",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Point clé pour un Suisse au Portugal :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Rente AVS (1er pilier)</strong> : la Suisse ne prélève pas d'impôt à la source ; l'imposition revient en principe au Portugal.</li><li><strong>Retrait du 2e ou 3e pilier en capital</strong> : toujours imposé à la source en Suisse, prélevé par le canton de la fondation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Bonne nouvelle :</strong> comme la convention CH-Portugal attribue l'imposition au pays de résidence, l'impôt à la source suisse est <strong>remboursable sur demande</strong>, avec une attestation de résidence fiscale portugaise. Le moment du retrait, combiné à la fin du RNH, mérite un calcul précis.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Key point for a Swiss citizen in Portugal:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>AVS pension (1st pillar)</strong>: Switzerland does not levy source tax; taxation is in principle in Portugal.</li><li><strong>2nd or 3rd pillar lump-sum withdrawal</strong>: always taxed at source in Switzerland, levied by the canton of the foundation.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Good news:</strong> because the CH-Portugal treaty assigns taxation to the country of residence, the Swiss source tax is <strong>refundable on request</strong>, with a Portuguese tax-residence certificate. The timing of the withdrawal, combined with the end of NHR, deserves a precise calculation.</div>`,
      },
    ],
    profiles: [
      {
        label: "Retraité au Portugal",
        labelEn: "Retiree in Portugal",
        description: "Avec la fin du RNH, l'imposition a changé : nous recalculons votre situation et récupérons l'impôt à la source suisse.",
        descriptionEn: "With the end of NHR, taxation has changed: we recalculate your situation and recover the Swiss source tax.",
      },
      {
        label: "Sur le point de partir",
        labelEn: "About to leave",
        description: "Nous comparons les scénarios (timing du retrait des piliers, fin du RNH) pour éviter les mauvaises surprises.",
        descriptionEn: "We compare scenarios (pillar withdrawal timing, end of NHR) to avoid unpleasant surprises.",
      },
      {
        label: "Propriétaire d'un bien en Suisse",
        labelEn: "Owner of a Swiss property",
        description: "Un bien resté en Suisse reste imposable en Suisse : nous gérons votre déclaration cantonale à distance.",
        descriptionEn: "A property kept in Switzerland stays taxable in Switzerland: we handle your cantonal return remotely.",
      },
      {
        label: "Actif installé au Portugal",
        labelEn: "Working in Portugal",
        description: "Vous avez quitté la Suisse pour le travail : nous faisons le point sur vos derniers liens fiscaux et vos piliers.",
        descriptionEn: "You left Switzerland for work: we review your remaining tax ties and your pension pillars.",
      },
    ],
    faq: [
      {
        question: "Le Portugal est-il encore un paradis fiscal pour les retraités suisses ?",
        questionEn: "Is Portugal still a tax haven for Swiss retirees?",
        answer: "Non, plus pour les nouveaux arrivants : le régime RNH a été fermé en 2024. Les nouveaux résidents sont imposés au barème portugais ordinaire. Un calcul actualisé est indispensable avant de partir.",
        answerEn: "No, not for new arrivals: the NHR regime was closed in 2024. New residents are taxed under ordinary Portuguese rates. An up-to-date calculation is essential before moving.",
      },
      {
        question: "Je vis au Portugal, dois-je encore faire une déclaration d'impôt en Suisse ?",
        questionEn: "I live in Portugal, do I still need to file a Swiss tax return?",
        answer: "Oui si vous conservez un bien immobilier ou des revenus de source suisse dans un canton romand ; sinon, en principe non. Nous faisons le point sur votre cas.",
        answerEn: "Yes if you keep a property or Swiss-source income in a Romandy canton; otherwise, in principle no. We review your specific case.",
      },
      {
        question: "Mon 2e pilier retiré en capital a été imposé à la source en Suisse : puis-je le récupérer depuis le Portugal ?",
        questionEn: "My 2nd pillar lump sum was taxed in Switzerland, can I recover it from Portugal?",
        answer: "Oui dans la plupart des cas : la convention CH-Portugal attribue l'imposition au pays de résidence, l'impôt à la source suisse est donc remboursable sur demande avec une attestation de résidence fiscale portugaise.",
        answerEn: "Yes in most cases: the CH-Portugal treaty assigns taxation to the country of residence, so the Swiss source tax is refundable on request with a Portuguese tax-residence certificate.",
      },
      {
        question: "Ma rente AVS est-elle imposée en Suisse quand je vis au Portugal ?",
        questionEn: "Is my AVS pension taxed in Switzerland while I live in Portugal?",
        answer: "La Suisse ne prélève pas d'impôt à la source sur l'AVS ; l'imposition revient en principe au Portugal.",
        answerEn: "Switzerland does not levy source tax on AVS; taxation is in principle in Portugal.",
      },
      {
        question: "NeoFidu peut-il gérer ma déclaration à distance depuis le Portugal ?",
        questionEn: "Can NeoFidu handle my return remotely from Portugal?",
        answer: "Oui, tout se fait 100 % en ligne et en français, sans que vous ayez à vous déplacer.",
        answerEn: "Yes, everything is done 100% online, without you having to travel.",
      },
    ],
  },
  {
    slug: "royaume-uni",
    country: "Royaume-Uni",
    countryEn: "United Kingdom",
    countryEmoji: "🇬🇧",
    metaTitle: "Suisses au Royaume-Uni : impôts & fiscalité en Suisse romande",
    metaTitleEn: "Swiss citizens in the UK: taxes & Swiss filing",
    metaDescription:
      "Vous êtes Suisse au Royaume-Uni ? Fin du régime non-dom (2025), rente AVS, retrait 2e/3e pilier, bien en Suisse : NeoFidu gère votre fiscalité romande, en ligne.",
    metaDescriptionEn:
      "Swiss living in the UK? End of the non-dom regime (2025), AVS pension, 2nd/3rd pillar withdrawal, Swiss property: NeoFidu handles your Romandy tax matters online.",
    h1: "Suisses au Royaume-Uni : votre fiscalité et vos obligations en Suisse romande",
    h1En: "Swiss citizens in the UK: your taxes and obligations in French-speaking Switzerland",
    swissPopulation: "≈ 41 400 Suisses au Royaume-Uni (OFS, 2025)",
    swissPopulationEn: "≈ 41,400 Swiss citizens in the UK (FSO, 2025)",
    lastUpdated: "2026-08-17",
    keywords: [
      "suisse au royaume-uni impôts",
      "suisse à londres fiscalité",
      "fin régime non-dom 2025",
      "convention double imposition suisse royaume-uni",
      "retrait 2e pilier UK remboursement",
      "rente AVS royaume-uni imposition",
    ],
    relatedCountries: ["etats-unis", "france"],
    infographic: {
      leftTitle: "Imposé en Suisse",
      leftTitleEn: "Taxed in Switzerland",
      rightTitle: "Imposé au Royaume-Uni",
      rightTitleEn: "Taxed in the UK",
      leftItems: [
        { fr: "Bien immobilier en Suisse", en: "Swiss real estate" },
        { fr: "Prestations 2e / 3e pilier", en: "2nd / 3rd pillar benefits" },
        { fr: "Certains revenus suisses", en: "Certain Swiss-source income" },
      ],
      rightItems: [
        { fr: "Salaire et revenus britanniques", en: "UK salary & income" },
        { fr: "Rente AVS (1er pilier)", en: "AVS pension (1st pillar)" },
        { fr: "Revenu mondial", en: "Worldwide income" },
      ],
      calloutMain: "2e et 3e pilier : imposé à la source en Suisse, puis remboursé",
      calloutMainEn: "2nd & 3rd pillar: taxed at source in Switzerland, then refunded",
      calloutSub: "La convention CH-Royaume-Uni attribue l'imposition au pays de résidence",
      calloutSubEn: "The CH-UK treaty assigns taxation to the country of residence",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">Environ <strong>41 400 Suisses vivent au Royaume-Uni</strong>, une grande partie à Londres. La fiscalité britannique a connu un changement majeur en 2025 avec la fin du régime « non-dom ». Si vous gardez un bien ou une prévoyance en Suisse, votre canton d'origine peut encore attendre une déclaration. NeoFidu gère votre fiscalité romande, en français et 100 % à distance.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">Around <strong>41,400 Swiss citizens live in the UK</strong>, many in London. UK taxation saw a major change in 2025 with the end of the "non-dom" regime. If you keep property or pension savings in Switzerland, your home canton may still expect a return. NeoFidu handles your Romandy taxes, in French and 100% remotely.</p>`,
    sections: [
      {
        title: "Où êtes-vous imposé : au Royaume-Uni ou en Suisse ?",
        titleEn: "Where are you taxed: in the UK or in Switzerland?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Résident fiscal au Royaume-Uni, vous y êtes imposé sur votre revenu mondial. La <strong>convention de double imposition entre la Suisse et le Royaume-Uni</strong> répartit les droits d'imposition pour éviter une double taxation. Votre immobilier suisse et votre prévoyance restent toutefois rattachés à la Suisse.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">As a UK tax resident, you are taxed there on your worldwide income. The <strong>Switzerland-UK double taxation treaty</strong> allocates taxing rights to avoid double taxation. Your Swiss real estate and pension savings nonetheless remain linked to Switzerland.</p>`,
      },
      {
        title: "La fin du régime « non-dom » (2025)",
        titleEn: "The end of the non-dom regime (2025)",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Depuis avril 2025, le Royaume-Uni a <strong>supprimé le statut « non-dom »</strong> (remittance basis) et l'a remplacé par un régime fondé sur la résidence. Les nouveaux arrivants bénéficient d'une exonération temporaire de leurs revenus étrangers durant leurs premières années, puis sont imposés sur leur revenu mondial.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> ce changement modifie l'intérêt du Royaume-Uni pour les nouveaux résidents fortunés. Un point sur votre situation avant ou après votre installation est vivement conseillé.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Since April 2025, the UK has <strong>abolished the "non-dom" status</strong> (remittance basis) and replaced it with a residence-based regime. New arrivals get a temporary exemption on their foreign income during their first years, then are taxed on their worldwide income.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> this change alters the UK's appeal for wealthy new residents. A review of your situation before or after moving is strongly recommended.</div>`,
      },
      {
        title: "Vos rentes, votre prévoyance et votre bien en Suisse",
        titleEn: "Your pensions, savings and Swiss property",
        content:
          `<ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : reste imposable en Suisse (déclaration cantonale nécessaire).</li><li><strong>Rente AVS</strong> : pas d'impôt à la source suisse ; imposition en principe au Royaume-Uni.</li><li><strong>Retrait 2e/3e pilier en capital</strong> : imposé à la source en Suisse, mais <strong>remboursable sur demande</strong> si la convention attribue l'imposition au Royaume-Uni.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>NeoFidu</strong> vérifie la convention applicable, prépare votre déclaration cantonale et gère la demande de remboursement, entièrement à distance.</div>`,
        contentEn:
          `<ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: stays taxable in Switzerland (cantonal return required).</li><li><strong>AVS pension</strong>: no Swiss source tax; taxation in principle in the UK.</li><li><strong>2nd/3rd pillar lump sum</strong>: taxed at source in Switzerland, but <strong>refundable on request</strong> if the treaty assigns taxation to the UK.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>NeoFidu</strong> checks the applicable treaty, prepares your cantonal return and handles the refund request, entirely remotely.</div>`,
      },
    ],
    profiles: [
      { label: "Actif installé à Londres", labelEn: "Working in London", description: "Nous faisons le point sur vos liens fiscaux suisses restants et votre prévoyance.", descriptionEn: "We review your remaining Swiss tax ties and your pension planning." },
      { label: "Nouveau résident (ex non-dom)", labelEn: "New resident (ex non-dom)", description: "Le régime a changé en 2025 : nous clarifions ce que cela implique côté suisse.", descriptionEn: "The regime changed in 2025: we clarify what it means on the Swiss side." },
      { label: "Propriétaire d'un bien en Suisse", labelEn: "Owner of a Swiss property", description: "Un bien resté en Suisse reste imposable en Suisse : nous gérons votre déclaration cantonale.", descriptionEn: "A property kept in Switzerland stays taxable in Switzerland: we handle your cantonal return." },
      { label: "Sur le point de partir", labelEn: "About to leave", description: "Nous anticipons le retrait de vos piliers et les démarches de remboursement.", descriptionEn: "We plan your pillar withdrawal and refund steps." },
    ],
    faq: [
      { question: "Le régime non-dom existe-t-il encore au Royaume-Uni ?", questionEn: "Does the non-dom regime still exist in the UK?", answer: "Non, il a été supprimé en avril 2025 et remplacé par un régime basé sur la résidence. Les nouveaux arrivants bénéficient d'une exonération temporaire de leurs revenus étrangers.", answerEn: "No, it was abolished in April 2025 and replaced by a residence-based regime. New arrivals get a temporary exemption on their foreign income." },
      { question: "Je vis au Royaume-Uni, dois-je encore déclarer en Suisse ?", questionEn: "I live in the UK, do I still need to file in Switzerland?", answer: "Oui si vous conservez un bien immobilier ou des revenus de source suisse dans un canton romand ; sinon, en principe non. Nous faisons le point sur votre cas.", answerEn: "Yes if you keep a property or Swiss-source income in a Romandy canton; otherwise, in principle no. We review your case." },
      { question: "Puis-je récupérer l'impôt à la source sur mon 2e pilier depuis le Royaume-Uni ?", questionEn: "Can I recover the source tax on my 2nd pillar from the UK?", answer: "Oui dans la plupart des cas : si la convention attribue l'imposition à la résidence, l'impôt à la source suisse est remboursable sur demande avec une attestation de résidence fiscale britannique.", answerEn: "Yes in most cases: if the treaty assigns taxation to residence, the Swiss source tax is refundable on request with a UK tax-residence certificate." },
      { question: "NeoFidu peut-il gérer ma déclaration à distance depuis le Royaume-Uni ?", questionEn: "Can NeoFidu handle my return remotely from the UK?", answer: "Oui, tout se fait 100 % en ligne et en français.", answerEn: "Yes, everything is done 100% online, in French." },
    ],
  },
  {
    slug: "etats-unis",
    country: "États-Unis",
    countryEn: "United States",
    countryEmoji: "🇺🇸",
    metaTitle: "Suisses aux États-Unis : impôts, FATCA & fiscalité romande",
    metaTitleEn: "Swiss citizens in the USA: taxes, FATCA & Swiss filing",
    metaDescription:
      "Vous êtes Suisse aux États-Unis ? FATCA, double nationalité, rente AVS, retrait 2e/3e pilier, bien en Suisse : NeoFidu gère votre fiscalité romande, en ligne.",
    metaDescriptionEn:
      "Swiss living in the USA? FATCA, dual citizenship, AVS pension, 2nd/3rd pillar withdrawal, Swiss property: NeoFidu handles your Romandy tax matters online.",
    h1: "Suisses aux États-Unis : votre fiscalité et vos obligations en Suisse romande",
    h1En: "Swiss citizens in the USA: your taxes and obligations in French-speaking Switzerland",
    swissPopulation: "≈ 85 900 Suisses aux États-Unis (OFS, 2025)",
    swissPopulationEn: "≈ 85,900 Swiss citizens in the USA (FSO, 2025)",
    lastUpdated: "2026-08-17",
    keywords: [
      "suisse aux états-unis impôts",
      "FATCA suisse",
      "double nationalité suisse américain impôts",
      "convention double imposition suisse états-unis",
      "retrait 2e pilier USA imposition",
      "rente AVS états-unis imposition",
    ],
    relatedCountries: ["royaume-uni", "canada"],
    infographic: {
      leftTitle: "Imposé en Suisse",
      leftTitleEn: "Taxed in Switzerland",
      rightTitle: "Imposé aux États-Unis",
      rightTitleEn: "Taxed in the USA",
      leftItems: [
        { fr: "Bien immobilier en Suisse", en: "Swiss real estate" },
        { fr: "Prestations 2e / 3e pilier", en: "2nd / 3rd pillar benefits" },
        { fr: "Certains revenus suisses", en: "Certain Swiss-source income" },
      ],
      rightItems: [
        { fr: "Salaire et revenus américains", en: "US salary & income" },
        { fr: "Rente AVS (1er pilier)", en: "AVS pension (1st pillar)" },
        { fr: "Revenu mondial", en: "Worldwide income" },
      ],
      calloutMain: "2e et 3e pilier : imposé à la source en Suisse, souvent remboursable",
      calloutMainEn: "2nd & 3rd pillar: taxed at source in Switzerland, often refundable",
      calloutSub: "Selon la convention CH-USA ; attention à la double nationalité",
      calloutSubEn: "Under the CH-US treaty; watch out for dual citizenship",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">Avec près de <strong>85 900 personnes</strong>, les États-Unis abritent la plus grande communauté suisse hors d'Europe. C'est aussi la juridiction la plus complexe : entre <strong>FATCA</strong> (vos comptes suisses déclarés au fisc américain) et l'imposition fondée sur la citoyenneté, mieux vaut être bien accompagné. NeoFidu gère votre fiscalité romande et coordonne avec votre situation américaine, en français et à distance.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">With nearly <strong>85,900 people</strong>, the USA hosts the largest Swiss community outside Europe. It is also the most complex jurisdiction: between <strong>FATCA</strong> (your Swiss accounts reported to the US tax authorities) and citizenship-based taxation, good guidance is essential. NeoFidu handles your Romandy taxes and coordinates with your US situation, in French and remotely.</p>`,
    sections: [
      {
        title: "Où êtes-vous imposé : aux États-Unis ou en Suisse ?",
        titleEn: "Where are you taxed: in the USA or in Switzerland?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Résident aux États-Unis, vous y êtes imposé sur votre revenu mondial. La <strong>convention de double imposition entre la Suisse et les États-Unis</strong> évite une double taxation.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Point crucial :</strong> les États-Unis imposent leurs <strong>citoyens et détenteurs de green card</strong> sur leur revenu mondial, où qu'ils vivent. Si vous êtes double national suisse-américain, votre situation exige une coordination fine entre les deux pays.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">As a US resident, you are taxed there on your worldwide income. The <strong>Switzerland-US double taxation treaty</strong> avoids double taxation.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Crucial point:</strong> the USA taxes its <strong>citizens and green card holders</strong> on their worldwide income, wherever they live. If you are a Swiss-US dual national, your situation requires careful coordination between the two countries.</div>`,
      },
      {
        title: "FATCA : la transparence bancaire",
        titleEn: "FATCA: banking transparency",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">En vigueur entre la Suisse et les États-Unis depuis 2014, <strong>FATCA</strong> oblige les banques suisses à transmettre au fisc américain les informations sur les comptes détenus par des personnes américaines. Concrètement, vos avoirs en Suisse ne sont pas invisibles : une déclaration cohérente des deux côtés est indispensable.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">In force between Switzerland and the USA since 2014, <strong>FATCA</strong> requires Swiss banks to report to the US tax authorities information on accounts held by US persons. In practice, your Swiss assets are not invisible: consistent reporting on both sides is essential.</p>`,
      },
      {
        title: "Vos rentes, votre prévoyance et votre bien en Suisse",
        titleEn: "Your pensions, savings and Swiss property",
        content:
          `<ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : reste imposable en Suisse (déclaration cantonale nécessaire).</li><li><strong>Rente AVS</strong> : pas d'impôt à la source suisse ; imposition en principe aux États-Unis.</li><li><strong>Retrait 2e/3e pilier en capital</strong> : imposé à la source en Suisse, souvent remboursable ; le traitement américain de la prévoyance suisse est toutefois technique.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>NeoFidu</strong> prend en charge votre déclaration cantonale suisse et la demande de remboursement, et vous oriente pour la coordination avec votre déclaration américaine.</div>`,
        contentEn:
          `<ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: stays taxable in Switzerland (cantonal return required).</li><li><strong>AVS pension</strong>: no Swiss source tax; taxation in principle in the USA.</li><li><strong>2nd/3rd pillar lump sum</strong>: taxed at source in Switzerland, often refundable; the US treatment of Swiss pensions is, however, technical.</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>NeoFidu</strong> handles your Swiss cantonal return and the refund request, and guides you on coordination with your US filing.</div>`,
      },
    ],
    profiles: [
      { label: "Double national suisse-américain", labelEn: "Swiss-American dual national", description: "Situation complexe (imposition US sur la citoyenneté) : nous gérons le volet suisse et coordonnons avec votre conseil américain.", descriptionEn: "Complex situation (US citizenship-based tax): we handle the Swiss side and coordinate with your US adviser." },
      { label: "Expatrié aux États-Unis", labelEn: "Expat in the USA", description: "Nous faisons le point sur vos liens fiscaux suisses et FATCA.", descriptionEn: "We review your Swiss tax ties and FATCA." },
      { label: "Propriétaire d'un bien en Suisse", labelEn: "Owner of a Swiss property", description: "Un bien resté en Suisse reste imposable en Suisse : nous gérons votre déclaration cantonale.", descriptionEn: "A property kept in Switzerland stays taxable in Switzerland: we handle your cantonal return." },
      { label: "Sur le point de partir", labelEn: "About to leave", description: "Nous anticipons le retrait de vos piliers avant votre installation aux États-Unis.", descriptionEn: "We plan your pillar withdrawal before you move to the USA." },
    ],
    faq: [
      { question: "Je suis double national suisse-américain : ma situation est-elle particulière ?", questionEn: "I'm a Swiss-US dual national: is my situation special?", answer: "Oui. Les États-Unis imposent leurs citoyens sur leur revenu mondial, où qu'ils vivent. Votre cas exige une coordination entre les deux pays ; nous gérons le volet suisse.", answerEn: "Yes. The USA taxes its citizens on their worldwide income, wherever they live. Your case requires coordination between the two countries; we handle the Swiss side." },
      { question: "Qu'est-ce que FATCA change pour moi ?", questionEn: "What does FATCA change for me?", answer: "Vos comptes suisses peuvent être communiqués au fisc américain. Une déclaration cohérente des deux côtés est indispensable pour éviter les problèmes.", answerEn: "Your Swiss accounts may be reported to the US tax authorities. Consistent reporting on both sides is essential to avoid problems." },
      { question: "Puis-je récupérer l'impôt à la source sur mon 2e pilier depuis les États-Unis ?", questionEn: "Can I recover the source tax on my 2nd pillar from the USA?", answer: "Souvent oui, si la convention attribue l'imposition à la résidence. Le traitement américain étant technique, nous vérifions au cas par cas.", answerEn: "Often yes, if the treaty assigns taxation to residence. As the US treatment is technical, we check case by case." },
      { question: "NeoFidu peut-il gérer ma déclaration suisse à distance depuis les États-Unis ?", questionEn: "Can NeoFidu handle my Swiss return remotely from the USA?", answer: "Oui, tout le volet suisse se fait 100 % en ligne et en français.", answerEn: "Yes, the entire Swiss side is done 100% online, in French." },
    ],
  },
  {
    slug: "autres-pays",
    country: "Autres pays",
    countryEn: "Other countries",
    countryEmoji: "🌍",
    metaTitle: "Suisses de l'étranger : autres pays | fiscalité en Suisse romande",
    metaTitleEn: "Swiss citizens abroad: other countries | Swiss (Romandy) tax",
    metaDescription:
      "Votre pays n'est pas listé ? La Suisse a des conventions fiscales avec près de 100 pays. NeoFidu gère votre déclaration romande et vos piliers, où que vous soyez.",
    metaDescriptionEn:
      "Your country isn't listed? Switzerland has tax treaties with nearly 100 countries. NeoFidu handles your Romandy return and pension pillars, wherever you live.",
    h1: "Suisses de l'étranger : votre fiscalité romande, où que vous soyez",
    h1En: "Swiss citizens abroad: your Romandy taxes, wherever you live",
    swissPopulation: "≈ 100 conventions fiscales signées par la Suisse",
    swissPopulationEn: "≈ 100 tax treaties signed by Switzerland",
    lastUpdated: "2026-08-17",
    keywords: [
      "suisse de l'étranger impôts",
      "déclaration impôt suisse depuis l'étranger",
      "convention double imposition suisse",
      "retrait 2e pilier étranger remboursement",
      "rente AVS étranger imposition",
      "fiscalité expatrié suisse romand",
    ],
    relatedCountries: ["france", "canada", "espagne"],
    infographic: {
      leftTitle: "Imposé en Suisse",
      leftTitleEn: "Taxed in Switzerland",
      rightTitle: "Imposé dans votre pays",
      rightTitleEn: "Taxed in your country",
      leftItems: [
        { fr: "Bien immobilier en Suisse", en: "Swiss real estate" },
        { fr: "Prestations 2e / 3e pilier", en: "2nd / 3rd pillar benefits" },
        { fr: "Certains revenus suisses", en: "Certain Swiss-source income" },
      ],
      rightItems: [
        { fr: "Salaire et revenus locaux", en: "Local salary & income" },
        { fr: "Rente AVS (1er pilier)", en: "AVS pension (1st pillar)" },
        { fr: "Revenu mondial", en: "Worldwide income" },
      ],
      calloutMain: "2e et 3e pilier : imposé à la source en Suisse, souvent remboursable",
      calloutMainEn: "2nd & 3rd pillar: taxed at source in Switzerland, often refundable",
      calloutSub: "Selon la convention entre la Suisse et votre pays de résidence",
      calloutSubEn: "Depending on the treaty between Switzerland and your country of residence",
    },
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">Votre pays de résidence ne figure pas encore dans nos guides détaillés ? Ce n'est pas un problème. La Suisse a conclu des <strong>conventions de double imposition avec près de 100 pays</strong>, et les grands principes sont souvent les mêmes : votre immobilier suisse reste imposable en Suisse, vos piliers de prévoyance suivent des règles spécifiques, et votre canton d'origine peut encore attendre une déclaration. NeoFidu gère votre fiscalité romande <strong>où que vous viviez</strong>, en français et 100 % à distance.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">Your country of residence isn't in our detailed guides yet? That's not a problem. Switzerland has <strong>double taxation treaties with nearly 100 countries</strong>, and the main principles are often the same: your Swiss real estate stays taxable in Switzerland, your pension pillars follow specific rules, and your home canton may still expect a return. NeoFidu handles your Romandy taxes <strong>wherever you live</strong>, in French and 100% remotely.</p>`,
    sections: [
      {
        title: "Le principe : où êtes-vous imposé ?",
        titleEn: "The principle: where are you taxed?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">En règle générale, votre pays de résidence vous impose sur votre revenu mondial. La convention de double imposition entre la Suisse et ce pays répartit ensuite les droits d'imposition pour éviter que les mêmes revenus soient taxés deux fois. Le détail dépend de la convention concernée, mais plusieurs éléments reviennent presque partout, ci-dessous.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">As a rule, your country of residence taxes you on your worldwide income. The double taxation treaty between Switzerland and that country then allocates taxing rights to avoid the same income being taxed twice. The details depend on the specific treaty, but several elements recur almost everywhere, below.</p>`,
      },
      {
        title: "Ce qui reste (presque toujours) imposable en Suisse",
        titleEn: "What (almost always) remains taxable in Switzerland",
        content:
          `<ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : quasi universellement imposable en Suisse (déclaration cantonale nécessaire).</li><li><strong>Revenus de source suisse</strong> : certaines rentes, participations ou activités conservées en Suisse.</li><li><strong>Prestations de prévoyance en capital</strong> : imposées à la source en Suisse (voir ci-dessous).</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> l'immobilier suisse s'impose en Suisse, quel que soit votre pays de résidence.</div>`,
        contentEn:
          `<ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: almost universally taxable in Switzerland (cantonal return required).</li><li><strong>Swiss-source income</strong>: certain pensions, holdings or activities kept in Switzerland.</li><li><strong>Lump-sum pension benefits</strong>: taxed at source in Switzerland (see below).</li></ul><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> Swiss real estate is taxed in Switzerland, whatever your country of residence.</div>`,
      },
      {
        title: "Vos rentes et votre prévoyance",
        titleEn: "Your pensions and retirement savings",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">La <strong>rente AVS</strong> n'est pas soumise à l'impôt à la source suisse ; son imposition revient en général à votre pays de résidence. Le <strong>retrait du 2e ou 3e pilier en capital</strong> est toujours imposé à la source en Suisse.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Bon à savoir :</strong> si la convention avec votre pays attribue l'imposition à la résidence, l'impôt à la source suisse est <strong>remboursable sur demande</strong>. C'est le cas de nombreux pays. NeoFidu vérifie la convention applicable et s'occupe de la démarche.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">The <strong>AVS pension</strong> is not subject to Swiss source tax; taxation generally goes to your country of residence. The <strong>2nd or 3rd pillar lump-sum withdrawal</strong> is always taxed at source in Switzerland.</p><div style="background:hsl(var(--accent));border-left:4px solid hsl(var(--primary));border-radius:8px;padding:18px;margin:24px 0;"><strong>Good to know:</strong> if the treaty with your country assigns taxation to residence, the Swiss source tax is <strong>refundable on request</strong>. This is the case for many countries. NeoFidu checks the applicable treaty and handles the process.</div>`,
      },
      {
        title: "Votre pays n'est pas listé ? Parlons-en",
        titleEn: "Your country isn't listed? Let's talk",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Nous accompagnons les Suisses de l'étranger <strong>dans tous les pays</strong>, y compris ceux qui n'ont pas encore leur guide dédié. Décrivez-nous votre situation (pays, bien en Suisse, prévoyance) et nous vous dirons précisément ce qui vous concerne, avant tout engagement.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">We support Swiss citizens abroad <strong>in every country</strong>, including those without a dedicated guide yet. Tell us your situation (country, Swiss property, pension) and we will tell you exactly what applies to you, before any commitment.</p>`,
      },
    ],
    profiles: [
      {
        label: "Retraité à l'étranger",
        labelEn: "Retiree abroad",
        description: "Rentes et retrait de piliers : nous clarifions l'imposition et récupérons l'impôt à la source suisse quand c'est possible.",
        descriptionEn: "Pensions and pillar withdrawals: we clarify taxation and recover the Swiss source tax where possible.",
      },
      {
        label: "Propriétaire d'un bien en Suisse",
        labelEn: "Owner of a Swiss property",
        description: "Un bien resté en Suisse reste imposable en Suisse : nous gérons votre déclaration cantonale à distance.",
        descriptionEn: "A property kept in Switzerland stays taxable in Switzerland: we handle your cantonal return remotely.",
      },
      {
        label: "Actif installé à l'étranger",
        labelEn: "Working abroad",
        description: "Nous faisons le point sur vos derniers liens fiscaux suisses et sur votre prévoyance.",
        descriptionEn: "We review your remaining Swiss tax ties and your pension planning.",
      },
      {
        label: "Sur le point de partir",
        labelEn: "About to leave",
        description: "Nous anticipons le retrait de vos piliers et les démarches de remboursement selon votre destination.",
        descriptionEn: "We plan your pillar withdrawal and refund steps according to your destination.",
      },
    ],
    faq: [
      {
        question: "Mon pays n'est pas dans vos guides : pouvez-vous quand même m'aider ?",
        questionEn: "My country isn't in your guides: can you still help me?",
        answer: "Oui. Nous accompagnons les Suisses de l'étranger dans tous les pays. Nous vérifions la convention applicable et gérons votre déclaration romande, où que vous viviez.",
        answerEn: "Yes. We support Swiss citizens abroad in every country. We check the applicable treaty and handle your Romandy return, wherever you live.",
      },
      {
        question: "Je vis à l'étranger, dois-je encore faire une déclaration d'impôt en Suisse ?",
        questionEn: "I live abroad, do I still need to file a Swiss tax return?",
        answer: "Oui si vous conservez un bien immobilier ou des revenus de source suisse dans un canton romand ; sinon, en principe non. Nous faisons le point sur votre cas.",
        answerEn: "Yes if you keep a property or Swiss-source income in a Romandy canton; otherwise, in principle no. We review your specific case.",
      },
      {
        question: "Puis-je récupérer l'impôt à la source prélevé sur mon 2e pilier ?",
        questionEn: "Can I recover the source tax withheld on my 2nd pillar?",
        answer: "Souvent oui : si la convention entre la Suisse et votre pays attribue l'imposition à la résidence, l'impôt à la source est remboursable sur demande. Nous vérifions et nous en occupons.",
        answerEn: "Often yes: if the treaty between Switzerland and your country assigns taxation to residence, the source tax is refundable on request. We check and handle it.",
      },
      {
        question: "NeoFidu peut-il gérer ma déclaration à distance ?",
        questionEn: "Can NeoFidu handle my return remotely?",
        answer: "Oui, tout se fait 100 % en ligne et en français, sans que vous ayez à vous déplacer.",
        answerEn: "Yes, everything is done 100% online, without you having to travel.",
      },
    ],
  },
];

export function getCountryPage(slug: string): CountryPage | undefined {
  return countryPages.find((c) => c.slug === slug);
}
