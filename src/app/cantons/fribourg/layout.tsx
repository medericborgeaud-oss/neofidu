import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts Fribourg 2026",
  description:
    "Fiduciaire en ligne pour Fribourg : déclaration d'impôts, calcul du 3ème pilier, comptabilité. Service 100% digital, tarifs clairs.",
  keywords: [
    "fiduciaire Fribourg",
    "déclaration impôts Fribourg",
    "comptabilité Fribourg",
    "FriTax",
    "3ème pilier Fribourg",
    "impôts Fribourg 2026",
    "fiduciaire Bulle",
    "fiduciaire en ligne Fribourg",
    "expert fiscal Fribourg",
    "déductions famille Fribourg",
  ],
  openGraph: {
    title: "Fiduciaire Fribourg â Déclaration d'impôts & comptabilité en ligne",
    description:
      "Fiduciaire en ligne pour Fribourg : déclaration d'impôts, calcul du 3ème pilier, comptabilité. Service 100% digital.",
    url: "https://www.neofidu.ch/cantons/fribourg",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/fribourg",
  },
};

// JSON-LD Schema for Fribourg services
const fribourgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Neofidu - Fiduciaire Fribourg",
  "description": "Fiduciaire en ligne pour Fribourg : déclaration d'impôts, calcul du 3ème pilier, comptabilité",
  "url": "https://www.neofidu.ch/cantons/fribourg",
  "logo": "https://www.neofidu.ch/logo.svg",
  "priceRange": "CHF 50 - CHF 500",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Fribourg",
    "addressRegion": "FR",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "46.8065",
    "longitude": "7.1620"
  },
  "areaServed": [
    { "@type": "City", "name": "Fribourg" },
    { "@type": "City", "name": "Bulle" },
    { "@type": "City", "name": "Morat" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services fiduciaires Fribourg",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Déclaration d'impôts Fribourg" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "50", "priceCurrency": "CHF" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Optimisation 3ème pilier Fribourg" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "60", "priceCurrency": "CHF" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "54"
  }
};

export default function FribourgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fribourgSchema) }}
      />
      {children}
    </>
  );
}
