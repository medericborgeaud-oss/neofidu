import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { GoogleAnalytics, GoogleTagManagerNoScript } from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.neofidu.ch"),
  title: {
    default: "NeoFidu | Fiduciaire en ligne Suisse | Swiss Tax Returns & Accounting",
    template: "%s | NeoFidu",
  },
  description:
    "Fiduciaire digitale suisse. DÃ©claration d'impÃ´ts en ligne dÃ¨s CHF 50. Service pour Vaud, GenÃ¨ve, Valais, Fribourg, NeuchÃ¢tel, Jura. We speak English!",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  keywords: [
    "fiduciaire en ligne",
    "impÃ´ts Suisse",
    "simulateur impÃ´ts",
    "dÃ©claration fiscale Suisse",
    "fiduciaire Suisse romande"
  ],
  authors: [{ name: "NeoFidu" }],
  creator: "NeoFidu",
  publisher: "NeoFidu SA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",

    url: "https://www.neofidu.ch",
    siteName: "NeoFidu",
    title: "NeoFidu | Swiss Tax Returns & Accounting",
    description:
      "Swiss tax returns online. Tax filing, accounting and property management. Vaud, Valais, Geneva. We speak English!",
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
  alternates: {
    canonical: "https://www.neofidu.ch",
    languages: {
      "fr-CH": "https://www.neofidu.ch",
      "en": "https://www.neofidu.ch",
      "en-CH": "https://www.neofidu.ch",
      "x-default": "https://www.neofidu.ch",
    },
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org LocalBusiness optimized for Google Business Profile
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FinancialService", "AccountingService", "ProfessionalService"],
    "@id": "https://www.neofidu.ch/#organization",
    name: "Neofidu",
    legalName: "NeoFidu",
    alternateName: ["NeoFidu", "Neofidu Fiduciaire", "NeoFidu Swiss Fiduciary"],
    description:
      "Votre fiduciaire nouvelle gÃ©nÃ©ration en Suisse romande. Simplifiez votre gestion financiÃ¨re avec Neofidu, la solution 100% en ligne pour particuliers, indÃ©pendants et PME. SpÃ©cialistes de la fiscalitÃ© et de la comptabilitÃ©.",
    "inLanguage": ["fr", "en"],
    "knowsLanguage": [
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "German", alternateName: "de" },
    ],
    url: "https://www.neofidu.ch",
    logo: {
      "@type": "ImageObject",
      url: "https://www.neofidu.ch/logo.svg",
      width: 200,
      height: 60,
      caption: "Neofidu Logo",
    },
    image: [
      "https://www.neofidu.ch/og-image.svg",
      "https://www.neofidu.ch/logo.svg",
    ],
    telephone: "+41786913912",
    email: "contact@neofidu.ch",
    // Contact points for different purposes
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+41786913912",
        contactType: "customer service",
        availableLanguage: ["French", "English"],
        areaServed: [
          "GenÃ¨ve",
          "Vaud",
          "Valais",
          "Fribourg",
          "NeuchÃ¢tel",
          "Jura",
        ],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      },
      {
        "@type": "ContactPoint",
        email: "contact@neofidu.ch",
        contactType: "customer support",
        availableLanguage: ["French", "English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Crettaz 1",
      addressLocality: "Leysin",
      postalCode: "1854",
      addressRegion: "VD",
      addressCountry: "CH",
      // Additional address details for Google
      name: "Neofidu",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.3411,
      longitude: 7.0119,
    },
    hasMap: "https://maps.google.com/?q=Neofidu,+Crettaz+1,+1854+Leysin,+Switzerland",
    // Opening hours matching Google Business (closes 5PM = 17:00)
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    // Text format for Google
    openingHours: ["Mo-Fr 09:00-17:00"],
    priceRange: "CHF 50 - CHF 1000",
    currenciesAccepted: "CHF",
    paymentAccepted: ["Credit Card", "Visa", "Mastercard", "PayPal", "Klarna", "Bank Transfer"],
    // Area served - cantons
    areaServed: [
      { "@type": "AdministrativeArea", name: "Canton de Vaud", "@id": "https://www.wikidata.org/wiki/Q12771" },
      { "@type": "AdministrativeArea", name: "Canton du Valais", "@id": "https://www.wikidata.org/wiki/Q834" },
      { "@type": "AdministrativeArea", name: "Canton de GenÃ¨ve", "@id": "https://www.wikidata.org/wiki/Q11917" },
      { "@type": "AdministrativeArea", name: "Canton de NeuchÃ¢tel", "@id": "https://www.wikidata.org/wiki/Q12738" },
      { "@type": "AdministrativeArea", name: "Canton du Jura", "@id": "https://www.wikidata.org/wiki/Q12755" },
      { "@type": "AdministrativeArea", name: "Canton de Fribourg", "@id": "https://www.wikidata.org/wiki/Q12640" },
    ],
    // Services offered
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services fiduciaires Neofidu",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DÃ©claration d'impÃ´ts",
            description: "DÃ©claration fiscale complÃ¨te pour particuliers et indÃ©pendants",
            provider: { "@id": "https://www.neofidu.ch/#organization" },
            serviceType: "Tax Preparation",
            areaServed: { "@type": "Country", name: "Switzerland" },
          },
          price: "50",
          priceCurrency: "CHF",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "50",
            priceCurrency: "CHF",
            minPrice: "50",
            maxPrice: "150",
            valueAddedTaxIncluded: true,
          },
          availability: "https://schema.org/InStock",
          url: "https://www.neofidu.ch/demande",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ComptabilitÃ© PME",
            description: "Services comptables pour petites et moyennes entreprises",
            provider: { "@id": "https://www.neofidu.ch/#organization" },
            serviceType: "Accounting",
          },
          price: "500",
          priceCurrency: "CHF",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "500",
            priceCurrency: "CHF",
            unitText: "annÃ©e",
            valueAddedTaxIncluded: false,
          },
          url: "https://www.neofidu.ch/demande",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GÃ©rance immobiliÃ¨re",
            description: "Gestion locative complÃ¨te pour propriÃ©taires",
            provider: { "@id": "https://www.neofidu.ch/#organization" },
            serviceType: "Property Management",
            areaServed: ["Canton de Vaud", "Canton du Valais"],
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "5",
            priceCurrency: "CHF",
            unitText: "% des loyers bruts",
            valueAddedTaxIncluded: false,
          },
          url: "https://www.neofidu.ch/demande",
        },
      ],
    },
    // Social profiles and identifiers
    sameAs: [
      "https://www.linkedin.com/company/neofidu",
      "https://www.neofidu.ch",
    ],
    // Business details
    foundingDate: "2015",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leysin",
        addressRegion: "Vaud",
        addressCountry: "CH",
      },
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 10,
    },
    slogan: "La fiduciaire rÃ©inventÃ©e",
    // Additional properties for Google Business
    isAccessibleForFree: false,
    publicAccess: false, // Online service, no physical visits
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Service 100% en ligne", value: true },
      { "@type": "LocationFeatureSpecification", name: "Support en anglais", value: true },
      { "@type": "LocationFeatureSpecification", name: "Paiement sÃ©curisÃ©", value: true },
    ],
    // Reviews placeholder - will help Google know you accept reviews
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1",
      reviewCount: "1",
    },
    // Action to request service
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.neofidu.ch/demande",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeDirectDownload",
    },
  };

  // Organization schema (separate for better entity recognition)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.neofidu.ch/#org",
    name: "Neofidu",
    url: "https://www.neofidu.ch",
    logo: "https://www.neofidu.ch/logo.svg",
    description: "Fiduciaire digitale en Suisse romande - DÃ©claration d'impÃ´ts, comptabilitÃ©, gÃ©rance immobiliÃ¨re",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Crettaz 1",
      addressLocality: "Leysin",
      postalCode: "1854",
      addressRegion: "VD",
      addressCountry: "CH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+41786913912",
      contactType: "customer service",
      email: "contact@neofidu.ch",
      availableLanguage: ["French", "English"],
    },
    sameAs: ["https://www.linkedin.com/company/neofidu"],
  };

  // WebSite schema for sitelinks search box
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.neofidu.ch/#website",
    url: "https://www.neofidu.ch",
    name: "Neofidu",
    alternateName: "NeoFidu",
    description: "Fiduciaire digitale en Suisse romande - DÃ©claration d'impÃ´ts dÃ¨s CHF 50",
    publisher: {
      "@id": "https://www.neofidu.ch/#organization",
    },
    inLanguage: ["fr-CH", "en"],
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.neofidu.ch/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ReadAction",
        target: "https://www.neofidu.ch",
      },
    ],
  };

  // Enhanced FAQ schema with more questions for Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien coÃ»te une dÃ©claration d'impÃ´ts chez Neofidu ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chez Neofidu, la dÃ©claration d'impÃ´ts commence ÃÂ  CHF 50 pour les cas simples (Basic), CHF 100 pour les situations avec propriÃ©tÃ© ou personnes ÃÂ  charge (Comfort), et CHF 150 pour les patrimoines diversifiÃ©s (Integral). Tous les prix incluent la TVA ÃÂ  8.1%.",
        },
      },
      {
        "@type": "Question",
        name: "Dans quels cantons suisses Neofidu est-il disponible ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Neofidu offre ses services dans 6 cantons de Suisse romande : Vaud, Valais, GenÃ¨ve, NeuchÃ¢tel, Jura et Fribourg. Notre service est 100% en ligne, accessible partout.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le dÃ©lai pour recevoir ma dÃ©claration d'impÃ´ts ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le dÃ©lai standard est de 10 jours ouvrÃ©s. Des options express sont disponibles : Prioritaire (7 jours, +CHF 20) ou Express (48h, +CHF 120).",
        },
      },
      {
        "@type": "Question",
        name: "Neofidu parle-t-il anglais ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, Neofidu offre un service complet en anglais pour les expatriÃ©s et rÃ©sidents internationaux en Suisse. We speak English and can help you with your Swiss tax return!",
        },
      },
      {
        "@type": "Question",
        name: "Comment fonctionne le service en ligne de Neofidu ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "1) Remplissez notre formulaire en ligne, 2) TÃ©lÃ©chargez vos documents (certificat de salaire, relevÃ©s bancaires), 3) Payez en ligne (Visa, Mastercard, PayPal, Klarna), 4) Recevez votre dÃ©claration complÃ©tÃ©e par email. Tout se fait depuis votre smartphone ou ordinateur.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les horaires de Neofidu ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos bureaux sont ouverts du lundi au vendredi de 9h ÃÂ  17h. Notre plateforme en ligne est accessible 24h/24 pour soumettre vos demandes.",
        },
      },
      {
        "@type": "Question",
        name: "Neofidu propose-t-il des services de comptabilitÃ© ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, Neofidu propose des services de comptabilitÃ© pour indÃ©pendants (dÃ¨s CHF 500/an) et PME (dÃ¨s CHF 1000/an), incluant la clÃ´ture annuelle, les dÃ©comptes TVA et le suivi comptable rÃ©gulier.",
        },
      },
      {
        "@type": "Question",
        name: "Comment contacter Neofidu ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous pouvez nous contacter par email ÃÂ  contact@neofidu.ch, par tÃ©lÃ©phone au +41 78 691 39 12, ou via notre formulaire de contact en ligne. RÃ©ponse garantie sous 1 jour ouvrÃ©.",
        },
      },
    ],
  };

  // BreadcrumbList for homepage
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
    ],
  };

  // Combine all schemas
  const allSchemas = [localBusinessSchema, organizationSchema, webSiteSchema, faqSchema, breadcrumbSchema];

  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Hreflang for FR/EN bilingual content */}
        <link rel="alternate" hreflang="fr-CH" href="https://www.neofidu.ch" />
        <link rel="alternate" hreflang="x-default" href="https://www.neofidu.ch" />

        {/* Favicon - ensure proper reference */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />

        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured data */}
        {allSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <GoogleTagManagerNoScript />
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
