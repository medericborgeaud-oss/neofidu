import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Returns for Expats in Switzerland | English Service",
  description: "Swiss tax return service for expats and foreigners. We speak English! B/C permit holders, international employees. From CHF 50. Geneva, Lausanne, Zurich.",
  keywords: [
    // High-priority expat keywords
    "expat tax return switzerland",
    "tax return for foreigners switzerland",
    "english speaking accountant switzerland",
    "expat tax advisor geneva",
    "expat tax help lausanne",
    "foreigner tax filing switzerland",
    "B permit tax return switzerland",
    "C permit tax return",
    "L permit tax filing",
    "international employee tax switzerland",
    "new to switzerland taxes",
    "first tax return switzerland",
    "quellensteuer correction",
    "withholding tax refund",
    "source tax switzerland",
    "tax advisor expats zurich",
    "relocation tax switzerland",
    "moving to switzerland taxes",
    // Nationality-specific
    "american expat taxes switzerland",
    "british expat tax switzerland",
    "german expat tax switzerland",
    "french expat tax switzerland",
    "indian expat tax switzerland",
    "italian expat tax switzerland",
    "spanish expat tax switzerland",
    "portuguese expat tax switzerland",
    "dutch expat tax switzerland",
    "canadian expat tax switzerland",
    "australian expat tax switzerland",
    // Service keywords
    "online tax filing expats",
    "english tax service switzerland",
    "expat accountant switzerland",
    "tax help for foreigners",
    "swiss tax system explained english",
    "pillar 3a for expats",
    "tax deductions for expats",
    "double taxation treaty switzerland",
    // Location-specific expat keywords
    "expat tax return geneva",
    "expat tax advisor lausanne",
    "expat tax service zurich",
    "foreigner tax help basel",
    "international tax bern",
    "expat accountant zug",
    // Long-tail keywords
    "how to file taxes as expat in switzerland",
    "swiss tax return english speaking service",
    "tax advisor for foreigners geneva",
    "help with swiss tax declaration",
    "best tax service for expats switzerland",
    "affordable tax return expats",
    "online tax service foreigners switzerland",
    // Work permit specific
    "B permit holder tax obligations",
    "C permit tax return requirements",
    "L permit short stay tax",
    "G permit frontalier taxes",
    "work permit tax switzerland",
    // Income specific
    "high income expat tax switzerland",
    "stock options tax switzerland expat",
    "RSU taxation switzerland",
    "bonus tax switzerland foreigners",
    "international income swiss tax",
    "foreign income tax switzerland",
  ],
  openGraph: {
    title: "Tax Returns for Expats in Switzerland",
    description: "English-speaking tax service for expats. B/C permits, international employees. From CHF 50.",
    type: "website",
    locale: "en_CH",
    siteName: "NeoFidu",
    url: "https://www.neofidu.ch/expats",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expat Tax Returns Switzerland | English Service",
    description: "We help expats file Swiss taxes. English service. From CHF 50.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/expats",
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

// JSON-LD Structured Data for Expats page
const expatServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.neofidu.ch/expats#service",
  name: "Swiss Tax Returns for Expats",
  alternateName: ["Expat Tax Service Switzerland", "Tax Filing for Foreigners"],
  description: "Professional tax return service for expats and foreigners in Switzerland. English-speaking service, all permit types (B, C, L, G). 100% online.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.neofidu.ch/#organization",
    name: "NeoFidu",
  },
  serviceType: "Tax Return Preparation",
  areaServed: {
    "@type": "Country",
    name: "Switzerland",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Expatriates and Foreigners in Switzerland",
    geographicArea: {
      "@type": "Country",
      name: "Switzerland",
    },
  },
  availableLanguage: ["English", "French"],
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "50",
      priceCurrency: "CHF",
      minPrice: "50",
    },
    availability: "https://schema.org/InStock",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Expat Tax Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "B Permit Tax Return",
          description: "Tax return service for B permit residence holders",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "C Permit Tax Return",
          description: "Tax return service for C permit permanent residents",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Quellensteuer Correction",
          description: "Withholding tax correction and refund claims",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "International Income Declaration",
          description: "Tax filing for expats with foreign income or assets",
        },
      },
    ],
  },
};

const expatFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to file a tax return in Switzerland with a B permit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your income. If you earn over CHF 120,000/year or have additional income (property, investments), you must file. Below this threshold, you're taxed at source (quellensteuer) but can still file to claim deductions and potentially get a refund.",
      },
    },
    {
      "@type": "Question",
      name: "What is quellensteuer (withholding tax) in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quellensteuer is tax deducted directly from your salary by your employer. It's an approximation based on your situation. By filing a tax return, you can often get a refund if you have deductions like pillar 3a contributions, commuting costs, or professional expenses.",
      },
    },
    {
      "@type": "Question",
      name: "Can expats get a refund on quellensteuer in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Many expats overpay through quellensteuer. Common deductions that can lead to refunds include: Pillar 3a contributions (up to CHF 7,258 in 2026), commuting costs, professional expenses, childcare costs, and health insurance premiums.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need to file taxes as an expat in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You need: Salary certificate (Lohnausweis), bank statements showing account balances on December 31st, pillar 3a certificate, rental contract, residence permit, and any other income documents. We provide a clear checklist when you start your tax return.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to file taxes for expats in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At NeoFidu, expat tax returns start from CHF 50 for simple cases. More complex situations with property, investments, or international income range from CHF 100 to CHF 150. All prices are transparent with no hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer English-speaking tax services in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! NeoFidu offers full tax services in English. Our team speaks English and French fluently. All communication, documentation, and support are available in English for expats who don't speak German or French.",
      },
    },
  ],
};

const expatBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.neofidu.ch",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tax Returns for Expats",
      item: "https://www.neofidu.ch/expats",
    },
  ],
};

export default function ExpatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [expatServiceSchema, expatFaqSchema, expatBreadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
