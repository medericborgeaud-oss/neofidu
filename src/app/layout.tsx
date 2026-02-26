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
    default: "NeoFidu | Fiduciaire Suisse - Impôts & Comptabilité",
    template: "%s | NeoFidu",
  },
  description:
    "Fiduciaire digitale en Suisse romande. Déclaration d'impôts dès CHF 50, comptabilité PME. Service pour Vaud, Genève, Valais.",
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
    "fiduciaire suisse",
    "déclaration impôt suisse",
    "comptable Lausanne",
    "fiscalité Suisse romande",
    "expert comptable Genève",
    "déclaration fiscale Vaud",
    "comptabilité PME Suisse",
    "impôts Valais",
    "fiduciaire en ligne",
    "bilan annuel entreprise",
    "TVA Suisse",
    "déclaration revenus Neuchâtel",
    "comptable Fribourg",
    "optimisation fiscale",
    "gérance immobilière Vaud",
    "gestion locative Valais",
    "régie immobilière Lausanne",
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
    title: "NeoFidu | Déclaration d'impôts & Comptabilité en Suisse",
    description:
      "Déclaration d'impôts, comptabilité et gérance immobilière en ligne. Service pour Vaud, Valais et Genève.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoFidu | Fiduciaire Suisse",
    description: "Fiduciaire digitale en Suisse romande. Devis gratuit.",
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
    },
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org LocalBusiness + FinancialService (combined for better SEO)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FinancialService", "AccountingService"],
    "@id": "https://www.neofidu.ch/#organization",
    name: "NeoFidu",
    alternateName: "NeoFidu",
    description:
      "Fiduciaire digitale spécialisée en déclaration d'impôts, comptabilité PME et gérance immobilière pour la Suisse romande. Service 100% en ligne pour 6 cantons.",
    url: "https://www.neofidu.ch",
    logo: {
      "@type": "ImageObject",
      url: "https://www.neofidu.ch/logo.svg",
      width: 200,
      height: 60,
    },
    image: "https://www.neofidu.ch/og-image.svg",
    telephone: "+41 78 691 39 12",
    email: "contact@neofidu.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Crettaz 1",
      addressLocality: "Leysin",
      postalCode: "1854",
      addressRegion: "Vaud",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.3411,
      longitude: 7.0119,
    },
    hasMap: "https://maps.google.com/?q=Crettaz+1,+1854+Leysin,+Switzerland",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "CHF 50 - CHF 1000",
    currenciesAccepted: "CHF",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, TWINT",
    areaServed: [
      {
        "@type": "State",
        name: "Vaud",
        containedInPlace: { "@type": "Country", name: "Switzerland" },
      },
      {
        "@type": "State",
        name: "Valais",
        containedInPlace: { "@type": "Country", name: "Switzerland" },
      },
      {
        "@type": "State",
        name: "Genève",
        containedInPlace: { "@type": "Country", name: "Switzerland" },
      },
      {
        "@type": "State",
        name: "Neuchâtel",
        containedInPlace: { "@type": "Country", name: "Switzerland" },
      },
      {
        "@type": "State",
        name: "Jura",
        containedInPlace: { "@type": "Country", name: "Switzerland" },
      },
      {
        "@type": "State",
        name: "Fribourg",
        containedInPlace: { "@type": "Country", name: "Switzerland" },
      },
    ],
    serviceType: [
      "Déclaration fiscale",
      "Déclaration d'impôts",
      "Comptabilité PME",
      "Comptabilité indépendants",
      "Gérance immobilière",
      "Conseil fiscal",
      "Déclaration TVA",
      "Bilan annuel",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services fiduciaires",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Déclaration d'impôts Basic",
            description: "Déclaration fiscale pour cas simples",
          },
          price: "50",
          priceCurrency: "CHF",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Déclaration d'impôts Comfort",
            description: "Déclaration fiscale avec propriété et personnes à charge",
          },
          price: "100",
          priceCurrency: "CHF",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Déclaration d'impôts Integral",
            description: "Déclaration fiscale complète avec patrimoine diversifié",
          },
          price: "150",
          priceCurrency: "CHF",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Comptabilité Solo",
            description: "Comptabilité pour indépendants et petites structures",
          },
          price: "500",
          priceCurrency: "CHF",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "500",
            priceCurrency: "CHF",
            unitText: "année",
          },
        },
      ],
    },
    sameAs: ["https://www.linkedin.com/company/neofidu"],
    foundingDate: "2015",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 5,
      maxValue: 10,
    },
    slogan: "La fiduciaire réinventée",
    knowsLanguage: ["fr", "de", "en"],
  };

  // WebSite schema for sitelinks search box
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.neofidu.ch/#website",
    url: "https://www.neofidu.ch",
    name: "NeoFidu",
    description: "Fiduciaire digitale en Suisse romande",
    publisher: {
      "@id": "https://www.neofidu.ch/#organization",
    },
    inLanguage: "fr-CH",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.neofidu.ch/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // FAQ schema for common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien coûte une déclaration d'impôts en Suisse ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chez NeoFidu, la déclaration d'impôts commence à CHF 50 pour les cas simples (Basic), CHF 100 pour les situations avec propriété ou personnes à charge (Comfort), et CHF 150 pour les patrimoines diversifiés (Integral). Tous les prix incluent la TVA.",
        },
      },
      {
        "@type": "Question",
        name: "Dans quels cantons suisses NeoFidu est-il disponible ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NeoFidu offre ses services dans 6 cantons de Suisse romande : Vaud, Valais, Genève, Neuchâtel, Jura et Fribourg. Notre service est 100% en ligne.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le délai pour recevoir ma déclaration d'impôts complétée ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le délai standard est de 10 jours ouvrés pour le forfait Basic, 7 jours pour Comfort et 5 jours pour Integral. Une option express est disponible moyennant supplément.",
        },
      },
    ],
  };

  // Combine all schemas
  const allSchemas = [localBusinessSchema, webSiteSchema, faqSchema];

  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Favicon - ensure proper reference */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />

        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
