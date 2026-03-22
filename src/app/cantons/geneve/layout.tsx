import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts Genève 2026",
  description:
    "Fiduciaire en ligne pour Genève : déclaration d'impôts, quasi-résidents, travailleurs frontaliers. Service rapide, 100% digital, tarifs transparents.",
  keywords: [
    "fiduciaire Genève",
    "déclaration impôts Genève",
    "comptabilité Genève",
    "quasi-résident Genève",
    "frontalier Genève",
    "GeTax",
    "TOU frontalier",
    "impôts Genève 2026",
    "fiduciaire en ligne Genève",
    "expert fiscal Genève",
  ],
  openGraph: {
    title: "Fiduciaire Genève â Déclaration d'impôts & comptabilité en ligne",
    description:
      "Fiduciaire en ligne pour Genève : déclaration d'impôts, quasi-résidents, travailleurs frontaliers. Service rapide, 100% digital.",
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
  "name": "Neofidu - Fiduciaire Genève",
  "description": "Fiduciaire en ligne pour Genève : déclaration d'impôts, quasi-résidents, travailleurs frontaliers",
  "url": "https://www.neofidu.ch/cantons/geneve",
  "logo": "https://www.neofidu.ch/logo.svg",
  "image": "https://www.neofidu.ch/og-image.svg",
  "priceRange": "CHF 50 - CHF 500",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Genève",
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
    "name": "Genève"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services fiduciaires Genève",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Déclaration d'impôts Genève"
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
          "name": "Quasi-résident / Frontalier Genève"
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
