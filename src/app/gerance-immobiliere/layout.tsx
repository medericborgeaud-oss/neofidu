import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gérance Immobilière Vaud & Valais | Dès 5%",
  description:
    "Service de gérance immobilière en ligne pour Vaud et Valais. Gestion locative complète : recherche locataires, encaissement loyers, états des lieux, travaux. Dès 5% des loyers bruts HT.",
  keywords: [
    // Gérance générale
    "gérance immobilière vaud",
    "gérance immobilière valais",
    "gérance locative suisse",
    "gestion locative lausanne",
    "gestion immobilière en ligne",
    "régie immobilière vaud",
    "régie immobilière valais",
    // Services
    "recherche locataires vaud",
    "encaissement loyers",
    "état des lieux lausanne",
    "gestion travaux immobilier",
    "décompte de charges",
    "bail à loyer suisse",
    // Propriétaires
    "gérance pour propriétaires",
    "gestion bien locatif",
    "rentabilité immobilière",
    "investissement locatif suisse",
    "propriétaire bailleur vaud",
    // Villes
    "gérance immobilière lausanne",
    "gérance immobilière montreux",
    "gérance immobilière sion",
    "gérance immobilière martigny",
    "gérance immobilière aigle",
    "gérance immobilière leysin",
    // Prix
    "gérance immobilière tarif",
    "gérance immobilière prix",
    "gérance 5 pourcent",
    "régie pas cher",
  ],
  openGraph: {
    title: "Gérance Immobilière | Vaud & Valais | NeoFidu",
    description:
      "Gestion locative complète pour vos biens immobiliers. Recherche locataires, encaissement loyers, états des lieux. Dès 5% HT.",
    url: "https://www.neofidu.ch/gerance-immobiliere",
    siteName: "NeoFidu",
    type: "website",
    locale: "fr_CH",
    images: [
      {
        url: "https://www.neofidu.ch/og-gerance.png",
        width: 1200,
        height: 630,
        alt: "Gérance immobilière NeoFidu",
      },
    ],
  },
  alternates: {
    canonical: "https://www.neofidu.ch/gerance-immobiliere",
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

// JSON-LD Structured Data
const propertyManagementSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gérance Immobilière NeoFidu",
  description:
    "Service de gérance immobilière digitale pour propriétaires bailleurs dans les cantons de Vaud et Valais. Gestion locative complète, transparente et efficace.",
  provider: {
    "@type": "Organization",
    name: "NeoFidu",
    url: "https://www.neofidu.ch",
  },
  serviceType: "Property Management",
  areaServed: [
    { "@type": "State", name: "Vaud" },
    { "@type": "State", name: "Valais" },
  ],
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "5",
      priceCurrency: "CHF",
      unitText: "% des loyers bruts HT",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de gérance",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recherche et sélection de locataires",
          description: "Publication annonces, visites, vérification solvabilité",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gestion administrative",
          description: "Rédaction baux, avenants, encaissement loyers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "États des lieux",
          description: "États des lieux d'entrée et de sortie professionnels",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gestion technique",
          description: "Suivi travaux, gestion sinistres, maintenance",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte la gérance immobilière chez NeoFidu ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nos honoraires de gérance sont de 5% des loyers bruts encaissés, hors TVA. Ce tarif inclut l'ensemble des services de gestion locative : recherche de locataires, encaissement des loyers, états des lieux, gestion des travaux et reporting mensuel.",
      },
    },
    {
      "@type": "Question",
      name: "Dans quels cantons proposez-vous la gérance immobilière ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous proposons actuellement nos services de gérance immobilière dans les cantons de Vaud et du Valais. Nous couvrons toutes les communes de ces deux cantons.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se passe la mise en gérance de mon bien ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La mise en gérance se fait en 3 étapes : 1) Prise de contact et analyse de votre bien, 2) Signature du mandat de gérance, 3) Prise en charge effective avec inventaire du bien. Le processus prend généralement 1 à 2 semaines.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.neofidu.ch",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gérance Immobilière",
      item: "https://www.neofidu.ch/gerance-immobiliere",
    },
  ],
};

export default function GeranceImmobiliereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertyManagementSchema),
        }}
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
