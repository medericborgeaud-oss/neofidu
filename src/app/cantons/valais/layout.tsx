import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DÃ©claration d'impÃ´ts Valais 2026",
  description:
    "Fiduciaire en ligne pour le Valais : dÃ©claration d'impÃ´ts, rÃ©sidences secondaires, comptabilitÃ©. Sion, Martigny, Sierre, Monthey. DÃ¨s CHF 50.-",
  keywords: [
    // French - Valais
    "fiduciaire Valais",
    "dÃ©claration impÃ´ts Valais",
    "impÃ´ts Sion",
    "VSTax",
    "fiduciaire Martigny",
    "dÃ©claration impÃ´ts Martigny",
    "comptable Martigny",
    "fiduciaire Sierre",
    "fiduciaire Monthey",
    "rÃ©sidence secondaire Valais",
    "impÃ´ts chalet Valais",
    // English
    "tax return Valais english",
    "accountant Valais english",
    "tax advisor Martigny",
    "Zermatt tax return",
    "Verbier tax help",
    "secondary residence tax Valais",
    "chalet tax switzerland",
    "fiduciary Valais english speaking",
  ],
  openGraph: {
    title: "Fiduciaire Valais â Tax Return & Accounting",
    description:
      "Online fiduciary for Canton Valais. Tax returns, secondary residences, accounting. Sion, Martigny, Zermatt. From CHF 50.-",
    url: "https://www.neofidu.ch/cantons/valais",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/valais",
  },
};

// JSON-LD Schema for Valais services
const valaisSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Neofidu - Fiduciaire Valais",
  "description": "Fiduciaire en ligne pour le Valais : dÃ©claration d'impÃ´ts, rÃ©sidences secondaires, comptabilitÃ©",
  "url": "https://www.neofidu.ch/cantons/valais",
  "logo": "https://www.neofidu.ch/logo.svg",
  "priceRange": "CHF 50 - CHF 500",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sion",
    "addressRegion": "VS",
    "addressCountry": "CH"
  },
  "areaServed": [
    { "@type": "City", "name": "Sion" },
    { "@type": "City", "name": "Martigny" },
    { "@type": "City", "name": "Sierre" },
    { "@type": "City", "name": "Monthey" },
    { "@type": "City", "name": "Zermatt" },
    { "@type": "City", "name": "Verbier" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services fiduciaires Valais",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "DÃ©claration d'impÃ´ts Valais" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "50", "priceCurrency": "CHF" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "ImpÃ´ts rÃ©sidence secondaire Valais" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "90", "priceCurrency": "CHF" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "64"
  }
};

export default function ValaisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(valaisSchema) }}
      />
      {children}
    </>
  );
}
