import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts en ligne Suisse | Devis gratuit",
  description:
    "Remplissez votre déclaration d'impôts suisse en ligne. Service fiduciaire pour particuliers, couples et indépendants. Dès CHF 50.- Vaud, Genève, Valais, Fribourg. Devis gratuit en 2 minutes.",
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
    title: "Déclaration d'impôts en ligne | Dès CHF 50.- | Neofidu",
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
  "priceRange": "CHF 50 - CHF 200",
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
          "name": "Déclaration Basique",
          "description": "Pour personne seule ou en ménage avec situation standard"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "50",
          "priceCurrency": "CHF",
          "minPrice": "50"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Déclaration Confort",
          "description": "Pour familles, propriétaires, dépenses professionnelles"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "100",
          "priceCurrency": "CHF",
          "minPrice": "100"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Déclaration Intégral",
          "description": "Patrimoine diversifié, titres et placements, revenus multiples"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "150",
          "priceCurrency": "CHF",
          "minPrice": "150"
        }
      }
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
        "text": "Les prix commencent à CHF 50.- pour la formule Basique (personne seule), CHF 100.- pour la formule Confort (famille, propriétaire), et CHF 150.- pour la formule Intégral (patrimoine diversifié). Devis gratuit en 2 minutes."
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
        "text": "Une fois tous les documents reçus, votre déclaration est traitée en 10 jours ouvrés (délai standard). Options express disponibles : Prioritaire (7 jours, +CHF 20) ou Express (48h, +CHF 120)."
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
