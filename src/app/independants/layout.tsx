import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ComptabilitÃ© IndÃ©pendants & Freelances | Vaud, GenÃ¨ve, Valais",
  description:
    "Fiduciaire digitale pour indÃ©pendants et freelances Ã  Vaud, GenÃ¨ve et Valais. ComptabilitÃ©, dÃ©claration d'impÃ´ts, TVA. Devis gratuit.",
  keywords: [
    "comptabilitÃ© indÃ©pendant suisse",
    "comptable freelance suisse",
    "comptabilitÃ© freelance",
    "fiduciaire indÃ©pendant",
    "dÃ©claration impÃ´ts indÃ©pendant",
    "TVA indÃ©pendant suisse",
    "crÃ©ation entreprise indÃ©pendant",
    "raison individuelle suisse",
    "devenir indÃ©pendant suisse",
    "freelance suisse comptabilitÃ©",
    "auto-entrepreneur suisse",
    "statut indÃ©pendant suisse",
    "charges sociales indÃ©pendant",
    "AVS indÃ©pendant",
    "comptable pour freelance vaud",
    "comptable indÃ©pendant genÃ¨ve",
  ,
    "comptable indÃ©pendant valais",
    "comptabilitÃ© freelance vaud",
    "comptabilitÃ© freelance genÃ¨ve",
    "comptabilitÃ© freelance valais",
    "fiduciaire freelance vaud",
    "fiduciaire indÃ©pendant valais",
    "dÃ©claration impÃ´ts freelance vaud",
    "comptable freelance genÃ¨ve",
    "indÃ©pendant freelance suisse romande"],
  openGraph: {
    title: "ComptabilitÃ© IndÃ©pendants & Freelances | Vaud Â· GenÃ¨ve Â· Valais | NeoFidu",
    description: "ComptabilitÃ© pour indÃ©pendants Ã  Vaud, GenÃ¨ve et Valais. DÃ©claration d'impÃ´ts, TVA, crÃ©ation entreprise. Devis gratuit en ligne.",
    url: "https://www.neofidu.ch/independants",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/independants",
  },
};

// JSON-LD Schema
const independantsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "ComptabilitÃ© pour IndÃ©pendants - Neofidu",
  "description": "Service de comptabilitÃ© et accompagnement fiscal pour indÃ©pendants et freelances en Suisse romande",
  "url": "https://www.neofidu.ch/independants",
  "provider": {
    "@type": "Organization",
    "name": "Neofidu",
    "url": "https://www.neofidu.ch"
  },
  "areaServed": [
    {"@type": "AdministrativeArea", "name": "Canton de Vaud", "@id": "https://www.wikidata.org/wiki/Q12771"},
    {"@type": "AdministrativeArea", "name": "Canton de GenÃ¨ve", "@id": "https://www.wikidata.org/wiki/Q11917"},
    {"@type": "AdministrativeArea", "name": "Canton du Valais", "@id": "https://www.wikidata.org/wiki/Q834"},
    {"@type": "AdministrativeArea", "name": "Suisse romande"}
  ],
  "offers": {
    "@type": "Offer",
    "price": "90",
    "priceCurrency": "CHF",
    "priceRange": "CHF 90 - CHF 500",
    "url": "https://www.neofidu.ch/independants"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services pour indÃ©pendants",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ComptabilitÃ© annuelle indÃ©pendant"
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
          "name": "DÃ©claration d'impÃ´ts indÃ©pendant"
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
          "name": "CrÃ©ation entreprise (raison individuelle)"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "290",
          "priceCurrency": "CHF"
        }
      }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coÃ»te un comptable pour indÃ©pendant en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chez Neofidu, la comptabilitÃ© pour indÃ©pendants dÃ©marre Ã  CHF 500.- par an. Ce forfait inclut la tenue comptable, les dÃ©clarations TVA et le bouclement annuel. Le tarif exact dÃ©pend du volume de transactions."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les obligations comptables d'un indÃ©pendant en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un indÃ©pendant doit tenir une comptabilitÃ© simplifiÃ©e (recettes/dÃ©penses) si son CA est infÃ©rieur Ã  CHF 500'000. Au-delÃ , une comptabilitÃ© en partie double est obligatoire. La TVA est obligatoire dÃ¨s CHF 100'000 de CA annuel."
      }
    },
    {
      "@type": "Question",
      "name": "Comment crÃ©er son activitÃ© d'indÃ©pendant en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour devenir indÃ©pendant en Suisse : 1) S'affilier Ã  une caisse AVS comme indÃ©pendant, 2) S'inscrire au Registre du Commerce si CA > CHF 100'000, 3) S'assujettir Ã  la TVA si nÃ©cessaire. Neofidu vous accompagne dans toutes ces dÃ©marches."
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
