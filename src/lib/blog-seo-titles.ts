// Titres SEO courts (balise <title>) pour les articles dont le titre complet
// depasse ~65 caracteres. Le titre affiche sur la page (H1) ne change pas.
// Regle : 60 caracteres max ; " | NeoFidu" n'est ajoute que si le total reste <= 65.

export const blogSeoTitles: Record<string, { fr?: string; en?: string }> = {
  "frais-bancaires-raison-individuelle-comparatif": {
    fr: "Frais bancaires des indépendants : comparatif 2026",
    en: "Bank Fees for Sole Proprietors: 2026 Comparison",
  },
  "initiative-penalite-mariage-impots-federaux-couples-maries": {
    fr: "Pénalité du mariage : l'initiative sur l'impôt fédéral",
    en: "Marriage Penalty: the Federal Tax Initiative Explained",
  },
  "hypotheque-suisse-fonctionnement-specificites": {
    fr: "L'hypothèque en Suisse : fonctionnement et spécificités",
  },
  "votation-tva-financement-13e-rente-avs-2026": {
    fr: "Votation du 29 novembre : TVA et 13e rente AVS",
  },
  "comment-remplir-declaration-impot-en-ligne-guide": {
    fr: "Remplir sa déclaration d'impôt en ligne : guide",
  },
  "deductions-fiscales-qui-semblent-illegales-suisse": {
    fr: "10 déductions fiscales qui ont l'air illégales",
    en: "10 Swiss Tax Deductions That Look Illegal",
  },
  "reforme-oblf-2026-calcul-rendement-loyer": {
    fr: "Réforme OBLF 2026 : le rendement admissible des loyers",
    en: "OBLF 2026 Reform: Admissible Rental Yield in Switzerland",
  },
  "assurances-independant-suisse": {
    fr: "Indépendant en Suisse : quelles assurances prendre ?",
    en: "Self-Employed in Switzerland: Which Insurances?",
  },
  "dividende-action-americaine-suisse": {
    fr: "Dividendes d'actions américaines : guide du résident suisse",
    en: "US Stock Dividends: Guide for Swiss Residents",
  },
  "impot-au-forfait-suisse-guide": {
    fr: "L'impôt au forfait en Suisse : fonctionnement et enjeux",
    en: "Swiss Lump-Sum Taxation: How It Works",
  },
  "imposition-retrait-2e-pilier-etranger": {
    fr: "Retrait du 2e pilier et départ à l'étranger : la fiscalité",
    en: "2nd Pillar Withdrawal When Moving Abroad: Taxation",
  },
  "suisses-demenagent-france-voisine": {
    fr: "Pourquoi des Suisses s'installent en France voisine",
    en: "Why Swiss People Move to Neighbouring France",
  },
  "retrait-2e-pilier-financer-creation-entreprise": {
    fr: "Financer son entreprise avec le 2e pilier : pour et contre",
    en: "Using Your 2nd Pillar to Start a Business: Pros and Cons",
  },
  "nouvelles-obligations-transparence-sarl-sa-2026": {
    fr: "Sàrl et SA : nouvelles obligations de transparence 2026",
    en: "Swiss LLCs and Corporations: 2026 Transparency Rules",
  },
  "credit-vendeur-suisse-guide": {
    fr: "Le crédit-vendeur en Suisse : guide complet",
  },
  "initiative-12-pourcent-vaud-baisse-impots": {
    fr: "Initiative des 12% : la baisse d'impôts vaudoise expliquée",
  },
  "raison-individuelle-ou-sarl-quand-creer-structure": {
    fr: "Raison individuelle ou Sàrl : quand passer à la Sàrl ?",
    en: "Sole Proprietorship or LLC: When to Incorporate?",
  },
  "echange-automatique-crypto-suisse-2026-fin-anonymat": {
    fr: "Crypto : fin de l'anonymat en Suisse dès 2026",
    en: "Crypto in Switzerland: End of Anonymity from 2026",
  },
  "delais-declaration-impots-2025-cantons": {
    en: "2025 Tax Return Deadlines by Canton",
  },
  "activite-accessoire-suisse-declaration-revenus": {
    fr: "Activité accessoire en Suisse : déclarer ses revenus",
    en: "Side Income in Switzerland: How to Declare It",
  },
  "baisse-loyer-suisse-2026-taux-reference-hypothecaire": {
    en: "Rent Reduction in Switzerland 2026: Reference Rate",
  },
  "impot-source-suisse-guide-complet-2026": {
    en: "Withholding Tax in Switzerland 2026: Complete Guide",
  },
  "imposition-individuelle-couples-maries-suisse-2026": {
    en: "Individual Taxation for Married Couples in Switzerland",
  },
  "declarer-cryptomonnaies-suisse-guide-2026": {
    en: "Declaring Crypto in Switzerland: 2026 Tax Guide",
  },
  "valeur-locative-suisse-reforme-2026": {
    en: "Imputed Rental Value: the 2026 Swiss Reform",
  },
  "frontalier-quasi-resident-geneve-guide-2026": {
    en: "Cross-Border Workers and Quasi-Residents in Geneva",
  },
  "comparatif-3eme-pilier-2026-meilleurs-taux": {
    en: "Pillar 3a Comparison 2026: Bank or Insurance?",
  },
  "deductions-fiscales-frais-reels-suisse-2026": {
    en: "Swiss Tax Deductions 2026: Complete List",
  },
  "declaration-impots-2025-guide-complet": {
    en: "2025 Swiss Tax Return: Complete Guide",
  },
  "pilier-3a-2026-plafonds-avantages": {
    en: "Pillar 3a in 2026: Limits and Tax Strategies",
  },
  "tva-suisse-2026-taux-obligations": {
    en: "Swiss VAT 2026: Rates and Obligations",
  },
  "deductions-fiscales-teletravail-2026": {
    en: "Remote Work Tax Deductions in Switzerland 2026",
  },
  "calculer-impots-suisse-simulateur-guide": {
    en: "How to Calculate Your Swiss Taxes (with Simulator)",
  },
  "expatrie-suisse-romande-impot-source-sans-francais": {
    fr: "Expatrié : gérer l'impôt à la source sans parler français",
    en: "Expats: Withholding Tax Without Speaking French",
  },
  "suisses-etranger-erreurs-fiscales-eviter": {
    fr: "Suisses de l'étranger : 7 erreurs fiscales à éviter",
  },
  "que-faire-epargne-suisse": {
    fr: "Que faire de son épargne en Suisse ? Guide complet",
    en: "What to Do With Your Savings in Switzerland",
  },
  "independant-suisse-retraite-prevoyance": {
    fr: "Indépendant en Suisse : préparer sa retraite",
    en: "Self-Employed in Switzerland: Saving for Retirement",
  },
  "votation-14-juin-2026-pme-independants-ce-qui-change": {
    fr: "Votation du 14 juin : l'impact pour PME et indépendants",
    en: "June 14 Vote: Impact on SMEs and the Self-Employed",
  },
  "gain-immobilier-comparatif-cantons-romands-impenses-deductions": {
    fr: "Gain immobilier : comparatif des 6 cantons romands",
    en: "Property Gains Tax: 6 French-Speaking Cantons Compared",
  },
};

const SUFFIX = " | NeoFidu";

/** Titre <title> final : titre court si dispo, suffixe seulement si ca tient. */
export function blogMetaTitle(slug: string, fullTitle: string, lang: "fr" | "en"): string {
  const short = blogSeoTitles[slug]?.[lang] ?? fullTitle;
  return short.length + SUFFIX.length <= 65 ? short + SUFFIX : short;
}
