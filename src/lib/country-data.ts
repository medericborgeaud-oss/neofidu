// Données des pages « Suisses de l'étranger » par pays.
// Même logique bilingue que blog-data.ts : chaque champ affiché a sa version EN.

export interface CountrySection {
  title: string;
  titleEn: string;
  content: string;    // HTML
  contentEn: string;  // HTML
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
    relatedCountries: [],
    intro:
      `<p style="margin:0 0 18px;line-height:1.75;">Environ <strong>42 000 Suisses vivent au Canada</strong>, ce qui en fait la deuxième communauté suisse hors d'Europe. Que vous soyez installé à Montréal, Toronto ou Vancouver, votre départ de Suisse ne met pas toujours fin à vos liens fiscaux avec votre canton d'origine - surtout si vous avez conservé un bien immobilier, une rente ou un capital de prévoyance. NeoFidu vous accompagne, en français et 100 % à distance, pour gérer votre situation fiscale romande depuis le Canada.</p>`,
    introEn:
      `<p style="margin:0 0 18px;line-height:1.75;">Around <strong>42,000 Swiss citizens live in Canada</strong>, the second-largest Swiss community outside Europe. Whether you live in Montreal, Toronto or Vancouver, leaving Switzerland does not always end your tax ties with your home canton - especially if you kept a property, a pension or occupational savings. NeoFidu supports you, 100% online, to manage your Swiss (Romandy) tax matters from Canada.</p>`,
    sections: [
      {
        title: "Où êtes-vous imposé : au Canada ou en Suisse ?",
        titleEn: "Where are you taxed: in Canada or in Switzerland?",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Dès lors que vous transférez votre domicile au Canada, vous y devenez en principe <strong>résident fiscal</strong> et y êtes imposé sur votre revenu mondial. Pour éviter que les mêmes revenus soient taxés deux fois, la <strong>convention de double imposition entre la Suisse et le Canada</strong> (en vigueur depuis 1998) répartit les droits d'imposition entre les deux pays.</p><p style="margin:0 0 18px;line-height:1.75;">En pratique, certains revenus restent rattachés à la Suisse malgré votre installation au Canada. C'est là que se joue votre situation, et que quelques démarches bien menées évitent des impôts inutiles.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Once you move your residence to Canada, you generally become a <strong>Canadian tax resident</strong>, taxed there on your worldwide income. To avoid the same income being taxed twice, the <strong>Switzerland-Canada double taxation treaty</strong> (in force since 1998) allocates taxing rights between the two countries.</p><p style="margin:0 0 18px;line-height:1.75;">In practice, some income remains linked to Switzerland despite your move. That is where your situation is decided - and where a few well-handled steps avoid unnecessary tax.</p>`,
      },
      {
        title: "Ce qui reste imposable en Suisse",
        titleEn: "What remains taxable in Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Même résident au Canada, vous conservez des obligations en Suisse dans plusieurs cas :</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Bien immobilier en Suisse</strong> : un logement situé dans un canton romand reste imposable en Suisse (revenu ou valeur locative, et fortune). Une déclaration cantonale reste nécessaire.</li><li><strong>Revenus de source suisse</strong> : certaines rentes, participations ou activités conservées en Suisse.</li><li><strong>Prestations de prévoyance</strong> : voir la section dédiée ci-dessous.</li></ul><div style="background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:8px;padding:16px;margin:22px 0;"><strong>À retenir :</strong> l'immobilier suisse s'impose toujours en Suisse, quel que soit votre pays de résidence.</div>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Even as a Canadian resident, you keep Swiss obligations in several cases:</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Property in Switzerland</strong>: a home in a Romandy canton stays taxable in Switzerland (rental or imputed rental value, and wealth). A cantonal return is still required.</li><li><strong>Swiss-source income</strong>: certain pensions, holdings or activities kept in Switzerland.</li><li><strong>Pension benefits</strong>: see the dedicated section below.</li></ul><div style="background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:8px;padding:16px;margin:22px 0;"><strong>Key point:</strong> Swiss real estate is always taxed in Switzerland, whatever your country of residence.</div>`,
      },
      {
        title: "Vos rentes et votre prévoyance (AVS, 2e et 3e pilier)",
        titleEn: "Your pensions and retirement savings (AVS, 2nd and 3rd pillar)",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">C'est le point le plus important - et le plus mal connu - pour un Suisse au Canada.</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>Rente AVS (1er pilier)</strong> : la Suisse ne prélève pas d'impôt à la source sur l'AVS. Selon la convention, son imposition revient en principe au Canada.</li><li><strong>Retrait du 2e pilier ou du 3e pilier A en capital</strong> : ce versement est <strong>toujours soumis à l'impôt à la source en Suisse</strong>, prélevé par le canton de la fondation de prévoyance.</li></ul><div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:8px;padding:18px;margin:24px 0;"><strong>Bonne nouvelle :</strong> comme la convention CH-Canada attribue l'imposition de ces prestations au pays de résidence, l'impôt à la source suisse peut être <strong>remboursé sur demande</strong>. Il faut une attestation de résidence fiscale des autorités canadiennes (ARC / Revenu Québec), adressée au canton concerné. NeoFidu s'occupe de cette démarche pour vous.</div><p style="margin:0 0 18px;line-height:1.75;">Le canton de la fondation et le moment du retrait ont un impact direct sur le montant : un accompagnement en amont permet souvent de réduire sensiblement la facture.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">This is the most important - and least understood - point for a Swiss citizen in Canada.</p><ul style="margin:4px 0 22px;line-height:1.8;padding-left:22px;"><li><strong>AVS pension (1st pillar)</strong>: Switzerland does not levy withholding tax on AVS. Under the treaty, it is in principle taxable in Canada.</li><li><strong>Lump-sum withdrawal of the 2nd or 3rd pillar</strong>: this payment is <strong>always subject to Swiss withholding tax</strong>, levied by the canton of the pension foundation.</li></ul><div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:8px;padding:18px;margin:24px 0;"><strong>Good news:</strong> because the CH-Canada treaty assigns the taxation of these benefits to the country of residence, the Swiss withholding tax can be <strong>refunded on request</strong>. You need a certificate of tax residence from the Canadian authorities (CRA / Revenu Québec), sent to the relevant canton. NeoFidu handles this for you.</div><p style="margin:0 0 18px;line-height:1.75;">The canton of the foundation and the timing of the withdrawal directly affect the amount: planning ahead often reduces the bill significantly.</p>`,
      },
      {
        title: "Vos obligations déclaratives en Suisse romande",
        titleEn: "Your filing obligations in French-speaking Switzerland",
        content:
          `<p style="margin:0 0 18px;line-height:1.75;">Selon votre situation, vous pouvez encore devoir déposer une déclaration dans votre canton (VD, GE, VS, FR, NE ou JU) - typiquement si vous y détenez un bien immobilier ou d'autres éléments imposables. Les délais et la procédure varient d'un canton à l'autre, et une taxation d'office peut s'appliquer en l'absence de dépôt.</p><p style="margin:0 0 18px;line-height:1.75;">NeoFidu identifie précisément ce que vous devez (ou ne devez plus) déclarer, prépare votre déclaration cantonale et gère les échanges avec l'administration - entièrement à distance.</p>`,
        contentEn:
          `<p style="margin:0 0 18px;line-height:1.75;">Depending on your situation, you may still need to file a return in your canton (VD, GE, VS, FR, NE or JU) - typically if you hold property or other taxable items there. Deadlines and procedures vary by canton, and a default assessment may apply if you do not file.</p><p style="margin:0 0 18px;line-height:1.75;">NeoFidu pinpoints exactly what you must (or no longer must) declare, prepares your cantonal return and handles all exchanges with the administration - entirely remotely.</p>`,
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
        questionEn: "I live in Canada - do I still need to file a Swiss tax return?",
        answer: "Oui si vous conservez un bien immobilier ou des revenus de source suisse dans un canton romand ; sinon, en principe non, mais certaines obligations peuvent subsister. Nous faisons le point sur votre cas.",
        answerEn: "Yes if you keep a property or Swiss-source income in a Romandy canton; otherwise, in principle no, but some obligations may remain. We review your specific case.",
      },
      {
        question: "Mon 2e pilier retiré en capital a été imposé à la source en Suisse : puis-je le récupérer depuis le Canada ?",
        questionEn: "My 2nd pillar lump sum was taxed at source in Switzerland - can I recover it from Canada?",
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
        questionEn: "I own a home in Switzerland but live in Montreal - where is it taxed?",
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
];

export function getCountryPage(slug: string): CountryPage | undefined {
  return countryPages.find((c) => c.slug === slug);
    }
