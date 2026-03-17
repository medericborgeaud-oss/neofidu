import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création d'entreprise en Suisse 2026",
  description:
    "Créez votre entreprise en Suisse avec Neofidu. Accompagnement complet pour SA, Sàrl ou raison individuelle. Dès CHF 290.- Devis gratuit sous 1 jour ouvré. Inscription RC, statuts, AVS inclus.",
  keywords: [
    // Termes principaux
    "création entreprise suisse",
    "créer sa société suisse",
    "créer une sàrl suisse",
    "créer une sa suisse",
    "raison individuelle suisse",
    // Processus
    "registre du commerce suisse",
    "statuts société suisse",
    "inscription rc suisse",
    "constitution société suisse",
    "ouvrir entreprise suisse",
    // Services
    "fiduciaire création entreprise",
    "aide création entreprise suisse",
    "accompagnement création société",
    "créer entreprise en ligne suisse",
    // Régional
    "création entreprise vaud",
    "créer société genève",
    "ouvrir entreprise valais",
    "fiduciaire création lausanne",
    "créer sàrl suisse romande",
    // Coûts
    "coût création sàrl suisse",
    "prix création sa suisse",
    "tarif création entreprise",
    "frais registre commerce suisse",
    // Spécifique
    "devenir indépendant suisse",
    "passer de salarié à indépendant",
    "transformer raison individuelle en sàrl",
    "capital minimum sàrl suisse",
    "capital minimum sa suisse",
    // English
    "create company switzerland",
    "start business switzerland",
    "LLC switzerland",
    "company formation switzerland",
  ],
  openGraph: {
    title: "Création d'entreprise en Suisse | SA, Sàrl, Raison individuelle | Neofidu",
    description:
      "Accompagnement complet pour créer votre entreprise en Suisse. Raison individuelle dès CHF 290.-, Sàrl dès CHF 990.-, SA dès CHF 1'490.-. Premier échange gratuit.",
    url: "https://www.neofidu.ch/creation-entreprise",
    siteName: "Neofidu",
    type: "website",
    locale: "fr_CH",
    images: [
      {
        url: "https://www.neofidu.ch/og-creation-entreprise.png",
        width: 1200,
        height: 630,
        alt: "Création d'entreprise en Suisse avec Neofidu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Création d'entreprise en Suisse | Neofidu",
    description:
      "Créez votre SA, Sàrl ou raison individuelle en Suisse. Accompagnement complet dès CHF 290.-",
    images: ["https://www.neofidu.ch/og-creation-entreprise.png"],
  },
  alternates: {
    canonical: "https://www.neofidu.ch/creation-entreprise",
    languages: {
      "fr-CH": "https://www.neofidu.ch/creation-entreprise",
      "en": "https://www.neofidu.ch/creation-entreprise",
    },
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

// JSON-LD Structured Data for Company Creation Services
const creationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Neofidu - Création d'entreprise en Suisse",
  "description": "Service de création d'entreprise en Suisse : accompagnement complet pour SA, Sàrl et raison individuelle. Inscription au registre du commerce, rédaction des statuts, affiliation AVS.",
  "url": "https://www.neofidu.ch/creation-entreprise",
  "logo": "https://www.neofidu.ch/logo.svg",
  "image": "https://www.neofidu.ch/og-creation-entreprise.png",
  "priceRange": "CHF 290 - CHF 1490",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Crettaz 1",
    "addressLocality": "Leysin",
    "postalCode": "1854",
    "addressRegion": "VD",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "46.3417",
    "longitude": "7.0117"
  },
  "areaServed": [
    { "@type": "Country", "name": "Switzerland" },
    { "@type": "State", "name": "Vaud" },
    { "@type": "State", "name": "Genève" },
    { "@type": "State", "name": "Valais" },
    { "@type": "State", "name": "Fribourg" },
    { "@type": "State", "name": "Neuchâtel" },
    { "@type": "State", "name": "Jura" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services de création d'entreprise",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création raison individuelle",
          "description": "Création d'une raison individuelle en Suisse avec affiliation AVS/AI et conseil assurances"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "290",
          "priceCurrency": "CHF",
          "minPrice": "290"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création Sàrl",
          "description": "Constitution d'une Sàrl en Suisse avec rédaction des statuts, inscription RC et affiliations"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "990",
          "priceCurrency": "CHF",
          "minPrice": "990"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création SA",
          "description": "Constitution d'une société anonyme en Suisse avec accompagnement complet"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "1490",
          "priceCurrency": "CHF",
          "minPrice": "1490"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.linkedin.com/company/neofidu"
  ]
};

// FAQ Schema for better search results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte la création d'une entreprise en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chez Neofidu, la création d'une raison individuelle commence à CHF 290.-, une Sàrl à CHF 990.- et une SA à CHF 1'490.-. Ces prix n'incluent pas les frais de notaire et du Registre du Commerce qui varient selon le canton."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour créer une entreprise en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les délais varient selon la forme juridique : 1-2 semaines pour une raison individuelle, 2-3 semaines pour une Sàrl, et 3-4 semaines pour une SA. Ces délais peuvent être réduits si tous les documents sont prêts."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le capital minimum pour créer une Sàrl en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le capital minimum pour créer une Sàrl en Suisse est de CHF 20'000.-, entièrement libéré à la création. Pour une SA, le capital minimum est de CHF 100'000.- dont 50% doit être libéré."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle forme juridique choisir pour mon entreprise en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le choix dépend de plusieurs facteurs : la raison individuelle convient aux activités à faible risque, la Sàrl offre une protection du patrimoine personnel avec un capital accessible, et la SA est idéale pour les levées de fonds et les projets ambitieux."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on transformer une raison individuelle en Sàrl ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, c'est possible et courant quand l'activité se développe. On peut effectuer une transformation qui permet de transférer les actifs vers la nouvelle Sàrl. Neofidu vous accompagne dans cette démarche."
      }
    }
  ]
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://www.neofidu.ch"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Création d'entreprise",
      "item": "https://www.neofidu.ch/creation-entreprise"
    }
  ]
};

export default function CreationEntrepriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
