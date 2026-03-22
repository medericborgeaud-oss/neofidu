import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DÃ©claration d'impÃ´ts Fribourg 2026",
  description:
    "Fiduciaire en ligne pour Fribourg : dÃ©claration d'impÃ´ts, calcul du 3Ã¨me pilier, comptabilitÃ©. Service 100% digital, tarifs clairs.",
  keywords: [
    "fiduciaire Fribourg",
    "dÃ©claration impÃ´ts Fribourg",
    "comptabilitÃ© Fribourg",
    "FriTax",
    "3Ã¨me pilier Fribourg",
    "impÃ´ts Fribourg 2026",
    "fiduciaire Bulle",
    "fiduciaire en ligne Fribourg",
    "expert fiscal Fribourg",
    "dÃ©ductions famille Fribourg",
  ],
  openGraph: {
    title: "Fiduciaire Fribourg â DÃ©claration d'impÃ´ts & comptabilitÃ© en ligne",
    description:
      "Fiduciaire en ligne pour Fribourg : dÃ©claration d'impÃ´ts, calcul du 3Ã¨me pilier, comptabilitÃ©. Service 100% digital.",
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
  "description": "Fiduciaire en ligne pour Fribourg : dÃ©claration d'impÃ´ts, calcul du 3Ã¨me pilier, comptabilitÃ©",
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
        "itemOffered": { "@type": "Service", "name": "DÃ©claration d'impÃ´ts Fribourg" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "50", "priceCurrency": "CHF" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Optimisation 3Ã¨me pilier Fribourg" },
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
