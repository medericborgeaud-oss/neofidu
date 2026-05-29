import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d’impôts en Ligne | Devis gratuit",
  description: "Déposez votre demande de déclaration d’impôts en ligne en Suisse romande. Devis personnalisé immédiat. Dès CHF 89.",
  keywords: [
    // Français - Principal
    "déclaration impôts en ligne suisse",
    "déclaration impôts suisse",
    "remplir déclaration impôts",
    "aide déclaration fiscale",
    "fiduciaire déclaration impôts",
    "faire sa déclaration impôts",
    "déclaration impôts 2026",
    "déclaration fiscale suisse",
    // Français - Cantons
    "déclaration impôts vaud",
    "déclaration impôts genève",
    "déclaration impôts valais",
    "déclaration impôts fribourg",
    "impôts lausanne",
    "impôts genève particulier",
    // Français - Prix
    "déclaration impôts prix",
    "déclaration impôts pas cher",
    "devis déclaration impôts",
    "tarif fiduciaire impôts",
    "coût déclaration fiscale",
    // Français - Types
    "déclaration impôts couple",
    "déclaration impôts famille",
    "déclaration impôts indépendant",
    "déclaration impôts propriétaire",
    "déclaration impôts 3ème pilier",
    // English
    "swiss tax return online",
    "file taxes switzerland",
    "tax return switzerland english",
    "swiss tax filing service",
    "expat tax return switzerland",
    "tax advisor lausanne english",
    "tax help geneva english",
  ],
  openGraph: {
    title: "Déclaration d'impôts en ligne | Dès CHF 89.- | Neofidu",
    description:
      "Service de déclaration d'impôts en ligne pour la Suisse romande. Particuliers, couples, indépendants. Devis gratuit en 2 minutes.",
    url: "https://www.neofidu.ch/demande",
    siteName: "Neofidu",
    type: "website",
    locale: "fr_CH",
    images: [
      {
        url: "https://www.neofidu.ch/og-demande.png",
        width: 1200,
        height: 630,
        alt: "Déclaration d'impôts en ligne Neofidu",
      },
    ],
  },
  alternates: {
    canonical: "https://www.neofidu.ch/demande",
    languages: {
      "fr-CH": "https://www.neofidu.ch/demande",
      "en": "https://www.neofidu.ch/demande",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data
const taxServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Neofidu - Déclaration d'impôts en ligne",
  "description": "Service de déclaration d'impôts en ligne pour particuliers, couples et indépendants en Suisse romande. 100% digital, tarifs transparents.",
  "url": "https://www.neofidu.ch/demande",
  "logo": "https://www.neofidu.ch/logo.svg",
  "priceRange": "CHF 89 - CHF 200",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Crettaz 1",
    "addressLocality": "Leysin",
    "postalCode": "1854",
    "addressRegion": "VD",
    "addressCountry": "CH"
  },
  "areaServed": [
    { "@type": "State", "name": "Vaud" },
    { "@type": "State", "name": "Genève" },
    { "@type": "State", "name": "Valais" },
    { "@type": "State", "name": "Fribourg" },
    { "@type": "State", "name": "Neuchâtel" },
    { "@type": "State", "name": "Jura" }
  ],
  "availableLanguage": ["French", "English"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services déclaration d'impôts",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Déclaration d'impôts à la carte",
          "description": "Déclaration fiscale à la carte pour particuliers en Suisse romande. Suppléments: couple +30, enfant +15, immobilier +60, indépendant +40, titres +30"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "89",
          "priceCurrency": "CHF",
          "minPrice": "89"
        }
      },
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "156",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une déclaration d'impôts chez Neofidu ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les prix commencent dès CHF 89 pour une déclaration à la carte (personne seule, situation standard). Suppléments: couple +CHF 30, enfant +CHF 15, immobilier +CHF 60, indépendant +CHF 40, titres +CHF 30. Devis gratuit en 2 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Quels documents dois-je fournir ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vous aurez besoin de : certificat de salaire, attestations 3ème pilier, relevés bancaires et titres, attestation de loyer ou valeur locative, et tout justificatif de déduction (frais professionnels, dons, etc.)."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps prend le traitement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une fois tous les documents reçus, votre déclaration est traitée en 14 jours ouvrés (délai standard). Option prioritaire disponible (7 jours, +CHF 120)."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://www.neofidu.ch"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Déclaration d'impôts",
      "item": "https://www.neofidu.ch/demande"
    }
  ]
};

export default function DemandeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
