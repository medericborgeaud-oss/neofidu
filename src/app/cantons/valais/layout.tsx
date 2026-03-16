import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiduciaire Valais — Déclaration d'impôts & comptabilité en ligne",
  description:
    "Fiduciaire en ligne pour le Valais : déclaration d'impôts, résidences secondaires, comptabilité. Sion, Martigny, Sierre, Monthey. Dès CHF 50.-",
  keywords: [
    // French - Valais
    "fiduciaire Valais",
    "déclaration impôts Valais",
    "impôts Sion",
    "VSTax",
    "fiduciaire Martigny",
    "déclaration impôts Martigny",
    "comptable Martigny",
    "fiduciaire Sierre",
    "fiduciaire Monthey",
    "résidence secondaire Valais",
    "impôts chalet Valais",
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
    title: "Fiduciaire Valais — Tax Return & Accounting",
    description:
      "Online fiduciary for Canton Valais. Tax returns, secondary residences, accounting. Sion, Martigny, Zermatt. From CHF 50.-",
    url: "https://www.neofidu.ch/cantons/valais",
    type: "website",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiduciaire Valais — Tax Return & Accounting",
    description: "Tax returns, secondary residences. Sion, Martigny, Zermatt. From CHF 50.-",
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
  "description": "Fiduciaire en ligne pour le Valais : déclaration d'impôts, résidences secondaires, comptabilité",
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
        "itemOffered": { "@type": "Service", "name": "Déclaration d'impôts Valais" },
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "50", "priceCurrency": "CHF" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Impôts résidence secondaire Valais" },
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
