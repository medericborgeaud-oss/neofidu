import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comptabilité pour Indépendants & Freelances en Suisse | Neofidu",
  description:
    "Comptabilité simplifiée pour indépendants et freelances en Suisse romande. Déclaration d'impôts, TVA, création d'entreprise. Dès CHF 500.-/an. Devis gratuit.",
  keywords: [
    "comptabilité indépendant suisse",
    "comptable freelance suisse",
    "comptabilité freelance",
    "fiduciaire indépendant",
    "déclaration impôts indépendant",
    "TVA indépendant suisse",
    "création entreprise indépendant",
    "raison individuelle suisse",
    "devenir indépendant suisse",
    "freelance suisse comptabilité",
    "auto-entrepreneur suisse",
    "statut indépendant suisse",
    "charges sociales indépendant",
    "AVS indépendant",
    "comptable pour freelance vaud",
    "comptable indépendant genève",
  ],
  openGraph: {
    title: "Comptabilité pour Indépendants & Freelances | Neofidu",
    description:
      "Comptabilité simplifiée pour indépendants en Suisse romande. Déclaration d'impôts, TVA, accompagnement création d'entreprise. Devis gratuit.",
    url: "https://www.neofidu.ch/independants",
    type: "website",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comptabilité Indépendants & Freelances Suisse",
    description: "Comptabilité dès CHF 500.-/an. TVA, impôts, création entreprise. 100% digital.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/independants",
  },
};

// JSON-LD Schema
const independantsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Comptabilité pour Indépendants - Neofidu",
  "description": "Service de comptabilité et accompagnement fiscal pour indépendants et freelances en Suisse romande",
  "url": "https://www.neofidu.ch/independants",
  "provider": {
    "@type": "Organization",
    "name": "Neofidu",
    "url": "https://www.neofidu.ch"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services pour indépendants",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Comptabilité annuelle indépendant"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "500",
          "priceCurrency": "CHF",
          "unitText": "an"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Déclaration d'impôts indépendant"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "90",
          "priceCurrency": "CHF"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création entreprise (raison individuelle)"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "290",
          "priceCurrency": "CHF"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte un comptable pour indépendant en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chez Neofidu, la comptabilité pour indépendants démarre à CHF 500.- par an. Ce forfait inclut la tenue comptable, les déclarations TVA et le bouclement annuel. Le tarif exact dépend du volume de transactions."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les obligations comptables d'un indépendant en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un indépendant doit tenir une comptabilité simplifiée (recettes/dépenses) si son CA est inférieur à CHF 500'000. Au-delà, une comptabilité en partie double est obligatoire. La TVA est obligatoire dès CHF 100'000 de CA annuel."
      }
    },
    {
      "@type": "Question",
      "name": "Comment créer son activité d'indépendant en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour devenir indépendant en Suisse : 1) S'affilier à une caisse AVS comme indépendant, 2) S'inscrire au Registre du Commerce si CA > CHF 100'000, 3) S'assujettir à la TVA si nécessaire. Neofidu vous accompagne dans toutes ces démarches."
      }
    }
  ]
};

export default function IndependantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(independantsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
