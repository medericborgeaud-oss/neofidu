import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { GoogleAnalytics, GoogleTagManagerNoScript } from "@/components/GoogleAnalytics";


const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neofidu.ch"),
  title: {
    default: "NeoFidu | Fiduciaire Digitale en Suisse Romande",
    template: "%s | NeoFidu - Fiduciaire Suisse",
  },
  description: "Fiduciaire nouvelle génération en Romandie. Gestion fiscale, comptable et immobilière pour particuliers, indépendants et PME. Présents à Vaud, Valais, Genève, Neuchâtel, Jura et Fribourg. Devis gratuit en ligne.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
    ],
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
  authors: [{ name: "NeoFidu SA" }],
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
    url: "https://neofidu.ch",
    siteName: "NeoFidu",
    title: "NeoFidu | Fiduciaire Digitale en Suisse Romande",
    description: "Confiez vos impôts et votre comptabilité à des experts. Service 100% en ligne pour 6 cantons romands. Obtenez un devis gratuit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoFidu | Fiduciaire Digitale Suisse",
    description: "Gestion fiscale et comptable simplifiée pour la Romandie. Devis gratuit.",
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
    canonical: "https://neofidu.ch",
    languages: {
      "fr-CH": "https://neofidu.ch",
    },
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "NeoFidu",
    description: "Fiduciaire digitale spécialisée en fiscalité, comptabilité et gérance immobilière pour la Suisse romande",
    url: "https://neofidu.ch",
    logo: "https://neofidu.ch/logo.svg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue Louis Favez",
      addressLocality: "Leysin",
      postalCode: "1854",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.3411,
      longitude: 7.0119,
    },
    areaServed: [
      { "@type": "State", name: "Vaud" },
      { "@type": "State", name: "Valais" },
      { "@type": "State", name: "Genève" },
      { "@type": "State", name: "Neuchâtel" },
      { "@type": "State", name: "Jura" },
      { "@type": "State", name: "Fribourg" },
    ],
    serviceType: ["Déclaration fiscale", "Comptabilité", "Conseil fiscal", "TVA"],
    priceRange: "CHF 60 - CHF 350",
    openingHours: "Mo-Fr 09:00-18:00",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@neofidu.ch",
      contactType: "customer service",
      availableLanguage: ["French", "German"],
    },
  };

  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <GoogleTagManagerNoScript />
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
