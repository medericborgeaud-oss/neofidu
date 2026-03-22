import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DÃ©claration d'impÃ´ts GenÃ¨ve 2026",
  description:
    "Fiduciaire en ligne pour GenÃ¨ve : dÃ©claration d'impÃ´ts, quasi-rÃ©sidents, travailleurs frontaliers. Service rapide, 100% digital, tarifs transparents.",
  keywords: [
    "fiduciaire GenÃ¨ve",
    "dÃ©claration impÃ´ts GenÃ¨ve",
    "comptabilitÃ© GenÃ¨ve",
    "quasi-rÃ©sident GenÃ¨ve",
    "frontalier GenÃ¨ve",
    "GeTax",
    "TOU frontalier",
    "impÃ´ts GenÃ¨ve 2026",
    "fiduciaire en ligne GenÃ¨ve",
    "expert fiscal GenÃ¨ve",
  ],
  openGraph: {
    title: "Fiduciaire GenÃ¨ve â DÃ©claration d'impÃ´ts & comptabilitÃ© en ligne",
    description:
      "Fiduciaire en ligne pour GenÃ¨ve : dÃ©claration d'impÃ´ts, quasi-rÃ©sidents, travailleurs frontaliers. Service rapide, 100% digital.",
    url: "https://www.neofidu.ch/cantons/geneve",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/geneve",
  },
};

// JSON-LD Schema for Geneva services
const geneveSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Neofidu - Fiduciaire GenÃ¨ve",
  "description": "Fiduciaire en ligne pour GenÃ¨ve : dÃ©claration d'impÃ´ts, quasi-rÃ©sidents, travailleurs frontaliers",
  "url": "https://www.neofidu.ch/cantons/geneve",
  "logo": "https://www.neofidu.ch/logo.svg",
  "image": "https://www.neofidu.ch/og-image.svg",
  "priceRange": "CHF 50 - CHF 500",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "GenÃ¨ve",
    "addressRegion": "GE",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "46.2044",
    "longitude": "6.1432"
  },
  "areaServed": {
    "@type": "City",
    "name": "GenÃ¨ve"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services fiduciaires GenÃ¨ve",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "DÃ©claration d'impÃ´ts GenÃ¨ve"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "50",
          "priceCurrency": "CHF"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Quasi-rÃ©sident / Frontalier GenÃ¨ve"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "150",
          "priceCurrency": "CHF"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
};

export default function GeneveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(geneveSchema) }}
      />
      {children}
    </>
  );
}
