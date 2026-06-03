/**
 * Utilitaire pour générer le schéma BreadcrumbList JSON-LD
 * Améliore le SEO en permettant l'affichage des breadcrumbs dans les résultats Google
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Breadcrumbs prédéfinis pour les pages principales
export const breadcrumbConfigs = {
  home: [
    { name: "Accueil", url: "https://neofidu.ch" }
  ],
  blog: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Blog", url: "https://neofidu.ch/blog" }
  ],
  blogArticle: (articleTitle: string, articleSlug: string) => [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Blog", url: "https://neofidu.ch/blog" },
    { name: articleTitle, url: `https://neofidu.ch/blog/${articleSlug}` }
  ],
  cantons: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Cantons", url: "https://neofidu.ch/cantons" }
  ],
  canton: (cantonName: string, cantonSlug: string) => [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Cantons", url: "https://neofidu.ch/cantons" },
    { name: cantonName, url: `https://neofidu.ch/cantons/${cantonSlug}` }
  ],
  demande: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Déposer une demande", url: "https://neofidu.ch/demande" }
  ],
  faq: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "FAQ", url: "https://neofidu.ch/faq" }
  ],
  simulateur: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Simulateurs", url: "https://neofidu.ch/simulateur" }
  ],
  simulateurImpots: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Simulateurs", url: "https://neofidu.ch/simulateur" },
    { name: "Simulateur d'impôts", url: "https://neofidu.ch/simulateur/impots" }
  ],
  simulateur3emePilier: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Simulateurs", url: "https://neofidu.ch/simulateur" },
    { name: "Simulateur 3ème pilier", url: "https://neofidu.ch/simulateur/3eme-pilier" }
  ],
  simulateurValeurLocative: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Simulateurs", url: "https://neofidu.ch/simulateur" },
    { name: "Valeur locative", url: "https://neofidu.ch/simulateur/valeur-locative" }
  ],
  suivi: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Suivi des demandes", url: "https://neofidu.ch/suivi" }
  ],
  guideDeductions: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Guide fiscal", url: "https://neofidu.ch/guide" },
    { name: "Déductions fiscales", url: "https://neofidu.ch/guide/deductions-fiscales" }
  ],
  suissesEtranger: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Suisses de l'étranger", url: "https://neofidu.ch/suisses-etranger" }
  ],
  conditionsGenerales: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Conditions générales", url: "https://neofidu.ch/conditions-generales" }
  ],
  politiqueConfidentialite: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Politique de confidentialité", url: "https://neofidu.ch/politique-confidentialite" }
  ],
  mentionsLegales: [
    { name: "Accueil", url: "https://neofidu.ch" },
    { name: "Mentions légales", url: "https://neofidu.ch/mentions-legales" }
  ],
};
