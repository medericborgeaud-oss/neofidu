export interface CantonSchemaData {
  cantonName: string;
  cantonNameFr: string;
  slug: string;
  description: string;
  areaServed: string[];
}

export function generateCantonSchema(data: CantonSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FinancialService", "AccountingService"],
    "@id": `https://www.neofidu.ch/cantons/${data.slug}#organization`,
    name: `NeoFidu - Fiduciaire ${data.cantonNameFr}`,
    alternateName: `NeoFidu ${data.cantonName}`,
    description: data.description,
    url: `https://www.neofidu.ch/cantons/${data.slug}`,
    logo: {
      "@type": "ImageObject",
      url: "https://www.neofidu.ch/logo.svg",
      width: 200,
      height: 60,
    },
    image: "https://www.neofidu.ch/og-image.svg",
    telephone: "+41 21 000 00 00",
    email: "contact@neofidu.ch",
    address: {
      "@type": "PostalAddress",
      addressRegion: data.cantonNameFr,
      addressCountry: "CH",
    },
    priceRange: "CHF 50 - CHF 1000",
    currenciesAccepted: "CHF",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, TWINT",
    areaServed: data.areaServed.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: data.cantonNameFr,
        containedInPlace: { "@type": "Country", name: "Switzerland" },
      },
    })),
    serviceType: [
      "Déclaration fiscale",
      "Déclaration d'impôts",
      "Comptabilité PME",
      "Comptabilité indépendants",
      "Conseil fiscal",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services fiduciaires ${data.cantonNameFr}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Déclaration d'impôts",
            description: `Déclaration fiscale pour le canton de ${data.cantonNameFr}`,
          },
          price: "149",
          priceCurrency: "CHF",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Comptabilité indépendants",
            description: `Services comptables pour indépendants en ${data.cantonNameFr}`,
          },
          price: "349",
          priceCurrency: "CHF",
        },
      ],
    },
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://www.neofidu.ch/#organization",
      name: "NeoFidu",
      url: "https://www.neofidu.ch",
    },
    sameAs: ["https://www.linkedin.com/company/neofidu"],
    knowsLanguage: ["fr", "de", "en"],
  };
}

// Canton-specific data
export const cantonData: Record<string, CantonSchemaData> = {
  vaud: {
    cantonName: "Vaud",
    cantonNameFr: "Vaud",
    slug: "vaud",
    description:
      "Fiduciaire spécialisée dans le canton de Vaud. Déclaration d'impôts pour particuliers et entreprises à Lausanne, Montreux, Nyon, Vevey. Expertise VaudTax.",
    areaServed: [
      "Lausanne",
      "Montreux",
      "Nyon",
      "Vevey",
      "Morges",
      "Yverdon-les-Bains",
      "Renens",
      "Pully",
    ],
  },
  geneve: {
    cantonName: "Geneva",
    cantonNameFr: "Genève",
    slug: "geneve",
    description:
      "Fiduciaire spécialisée dans le canton de Genève. Expertise frontaliers, statut quasi-résident, GeTax. Service pour particuliers et entreprises.",
    areaServed: [
      "Genève",
      "Carouge",
      "Vernier",
      "Lancy",
      "Meyrin",
      "Onex",
      "Thônex",
      "Versoix",
    ],
  },
  valais: {
    cantonName: "Valais",
    cantonNameFr: "Valais",
    slug: "valais",
    description:
      "Fiduciaire spécialisée dans le canton du Valais. Fiscalité avantageuse, résidences secondaires en station. Service à Sion, Sierre, Monthey, Martigny.",
    areaServed: [
      "Sion",
      "Sierre",
      "Monthey",
      "Martigny",
      "Brig-Glis",
      "Nendaz",
      "Zermatt",
      "Crans-Montana",
    ],
  },
  fribourg: {
    cantonName: "Fribourg",
    cantonNameFr: "Fribourg",
    slug: "fribourg",
    description:
      "Fiduciaire spécialisée dans le canton de Fribourg. Déductions familiales généreuses, service bilingue FR/DE. Expertise FriTax.",
    areaServed: [
      "Fribourg",
      "Bulle",
      "Villars-sur-Glâne",
      "Marly",
      "Düdingen",
      "Estavayer-le-Lac",
      "Romont",
      "Morat",
    ],
  },
  neuchatel: {
    cantonName: "Neuchâtel",
    cantonNameFr: "Neuchâtel",
    slug: "neuchatel",
    description:
      "Fiduciaire spécialisée dans le canton de Neuchâtel. Expertise industrie horlogère, NeTax. Service à Neuchâtel, La Chaux-de-Fonds, Le Locle.",
    areaServed: [
      "Neuchâtel",
      "La Chaux-de-Fonds",
      "Le Locle",
      "Val-de-Travers",
      "Boudry",
      "Milvignes",
      "Peseux",
      "Hauterive",
    ],
  },
  jura: {
    cantonName: "Jura",
    cantonNameFr: "Jura",
    slug: "jura",
    description:
      "Fiduciaire spécialisée dans le canton du Jura. Expertise agricole, forfaits adaptés. Service à Delémont, Porrentruy et toutes les communes jurassiennes.",
    areaServed: [
      "Delémont",
      "Porrentruy",
      "Bassecourt",
      "Courrendlin",
      "Courroux",
      "Saignelégier",
      "Le Noirmont",
      "Les Breuleux",
    ],
  },
};
