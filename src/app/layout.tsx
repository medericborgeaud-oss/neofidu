import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { GoogleAnalytics, GoogleTagManagerNoScript } from "@/components/GoogleAnalytics";
import { ChatBot } from "@/components/ChatBot";
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
  metadataBase: new URL("https://neofidu.ch"),
  title: {
    default: "NeoFidu | Fiduciaire en Ligne Suisse",
    template: "%s | NeoFidu",
  },
  description:
    "Fiduciaire en ligne en Suisse romande. Déclaration d'impôts dès CHF 50, comptabilité, gérance immobilière. Assistant IA fiscal gratuit.",
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
    "impôts Suisse",
    "simulateur impôts",
    "déclaration fiscale Suisse",
    "fiduciaire Suisse romande"
  ],
  authors: [{ name: "NeoFidu" }],
  creator: "NeoFidu",
  publisher: "NeoFidu",
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
    name: "NeoFidu",
    legalName: "NeoFidu",
    alternateName: ["NeoFidu", "NeoFidu Fiduciaire", "NeoFidu Swiss Fiduciary"],
    description:
      "Votre fiduciaire nouvelle génération en Suisse romande. Simplifiez votre gestion financière avec NeoFidu, la solution 100% en ligne pour particuliers, indépendants et PME. Spécialistes de la fiscalité et de la comptabilité.",
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
      caption: "NeoFidu Logo",
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
          "Genève",
          "Vaud",
          "Valais",
          "Fribourg",
          "Neuchâtel",
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
      addressLocality: "Leysin",
      postalCode: "1854",
      addressRegion: "VD",
      addressCountry: "CH",
      // Additional address details for Google
      name: "NeoFidu",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.3411,
      longitude: 7.0119,
    },
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
      { "@type": "AdministrativeArea", name: "Canton de Genève", "@id": "https://www.wikidata.org/wiki/Q11917" },
      { "@type": "AdministrativeArea", name: "Canton de Neuchâtel", "@id": "https://www.wikidata.org/wiki/Q12738" },
      { "@type": "AdministrativeArea", name: "Canton du Jura", "@id": "https://www.wikidata.org/wiki/Q12755" },
      { "@type": "AdministrativeArea", name: "Canton de Fribourg", "@id": "https://www.wikidata.org/wiki/Q12640" },
    ],
    // Services offered
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services fiduciaires NeoFidu",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Déclaration d'impôts",
            description: "Déclaration fiscale complète pour particuliers et indépendants",
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
            name: "Comptabilité PME",
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
            unitText: "année",
            valueAddedTaxIncluded: false,
          },
          url: "https://www.neofidu.ch/demande",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gérance immobilière",
            description: "Gestion locative complète pour propriétaires",
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
    slogan: "La fiduciaire réinventée",
    // Additional properties for Google Business
    isAccessibleForFree: false,
    publicAccess: false, // Online service, no physical visits
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Service 100% en ligne", value: true },
      { "@type": "LocationFeatureSpecification", name: "Support en anglais", value: true },
      { "@type": "LocationFeatureSpecification", name: "Paiement sécurisé", value: true },{ "@type": "LocationFeatureSpecification", name: "Assistant fiscal IA 24/7", value: true },
{ "@type": "LocationFeatureSpecification", name: "AI Tax Assistant 24/7", value: true },
    ],
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
    name: "NeoFidu",
    url: "https://www.neofidu.ch",
    logo: "https://www.neofidu.ch/logo.svg",
    description: "Fiduciaire digitale en Suisse romande - Déclaration d'impôts, comptabilité, gérance immobilière",
    address: {
      "@type": "PostalAddress",
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
    name: "NeoFidu",
    alternateName: "NeoFidu",
    description: "Fiduciaire digitale en Suisse romande - Déclaration d'impôts dès CHF 50",
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
  const allSchemas = [localBusinessSchema, organizationSchema, webSiteSchema, breadcrumbSchema];

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
        <ChatBot />
      </body>
    </html>
  );
}
