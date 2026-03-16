import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts Vaud 2026 — Fiduciaire en ligne",
  description:
    "Fiduciaire digitale pour le canton de Vaud : déclaration d'impôts dès CHF 50, comptabilité PME. Lausanne, Aigle, Montreux. Devis gratuit.",
  keywords: [
    // French - Vaud
    "fiduciaire Vaud",
    "déclaration impôts Vaud",
    "comptabilité Vaud",
    "fiduciaire Lausanne",
    "impôts Lausanne",
    "VaudTax",
    // French - Chablais
    "fiduciaire Aigle",
    "déclaration impôts Aigle",
    "fiduciaire Bex",
    "comptable Bex",
    "fiduciaire Leysin",
    "impôts Chablais vaudois",
    "fiduciaire Montreux",
    // English
    "tax return Vaud english",
    "accountant Lausanne english",
    "tax advisor Vaud",
    "fiduciary Vaud english speaking",
    "tax help Aigle",
    "accountant Montreux",
  ],
  openGraph: {
    title: "Fiduciaire Vaud — Tax Return & Accounting",
    description:
      "Online fiduciary for Canton Vaud. Tax returns, SME accounting, freelancers. Lausanne, Aigle, Bex, Montreux. Free quote.",
    url: "https://www.neofidu.ch/cantons/vaud",
    type: "website",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiduciaire Vaud — Tax Return & Accounting",
    description: "Tax returns, SME accounting. Lausanne, Aigle, Bex, Montreux. Free quote.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/vaud",
  },
};

// JSON-LD Schema for Vaud services
const vaudSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Neofidu - Fiduciaire Vaud",
  "description": "Fiduciaire digitale pour le canton de Vaud : déclaration d'impôts, comptabilité PME, indépendants",
  "url": "https://www.neofidu.ch/cantons/vaud",
  "logo": "https://www.neofidu.ch/logo.svg",
  "priceRange": "CHF 50 - CHF 500",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lausanne",
    "addressRegion": "VD",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "46.5197",
    "longitude": "6.6323"
  },
  "areaServed": [
    { "@type": "City", "name": "Lausanne" },
    { "@type": "City", "name": "Montreux" },
    { "@type": "City", "name": "Aigle" },
    { "@type": "City", "name": "Bex" },
    { "@type": "City", "name": "Leysin" },
    { "@type": "City", "name": "Nyon" },
    { "@type": "City", "name": "Vevey" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services fiduciaires Vaud",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Déclaration d'impôts Vaud" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "50", "priceCurrency": "CHF" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Comptabilité PME Vaud" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "500", "priceCurrency": "CHF", "unitText": "an" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "89"
  }
};

export default function VaudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vaudSchema) }}
      />
      {children}
    </>
  );
}
