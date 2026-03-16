import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxSimulatorPageClient } from "./TaxSimulatorPageClient";

export const metadata: Metadata = {
  title: "Simulateur d'impôts Suisse 2026 — Résultat gratuit en 30 secondes | Neofidu",
  description:
    "Calculez vos impôts en Suisse romande en quelques clics. Outil gratuit, résultat immédiat pour Vaud, Genève, Fribourg, Valais et Neuchâtel. Essayez maintenant.",
  keywords: [
    "simulateur impôts suisse",
    "calculateur impôts suisse 2026",
    "calcul impôts vaud",
    "calcul impôts genève",
    "calcul impôts fribourg",
    "calcul impôts valais",
    "calcul impôts neuchâtel",
    "simulation fiscale suisse romande",
    "calculette impôts gratuite",
    "impôts suisse romande",
    "swiss tax calculator",
    "switzerland tax simulator",
    "calculer mes impôts suisse",
    "estimation impôts 2026",
    "outil fiscal gratuit suisse",
  ],
  openGraph: {
    title: "Simulateur d'impôts Suisse 2026 — Résultat gratuit en 30 secondes",
    description:
      "Calculez vos impôts en Suisse romande en quelques clics. Outil gratuit, résultat immédiat pour Vaud, Genève, Fribourg, Valais et Neuchâtel.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/impots",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur d'impôts Suisse 2026 — Résultat gratuit en 30 secondes",
    description: "Calculez vos impôts en Suisse romande en quelques clics. Outil gratuit pour Vaud, Genève, Fribourg, Valais.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/impots",
  },
};

export default function SimulateurImpotsPage() {
  // JSON-LD structured data for SEO
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simulateur d'impôts Suisse 2026 - Neofidu",
    "description": "Calculez vos impôts en Suisse romande en quelques clics. Outil gratuit, résultat immédiat pour Vaud, Genève, Fribourg, Valais et Neuchâtel.",
    "url": "https://www.neofidu.ch/simulateur/impots",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "2026",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CHF",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Neofidu",
      "url": "https://www.neofidu.ch"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "312",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Calcul instantané pour 26 cantons",
      "Optimisation 3ème pilier",
      "Résultat en 30 secondes",
      "100% gratuit"
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment calculer ses impôts en Suisse",
    "description": "Utilisez notre simulateur gratuit pour estimer vos impôts en Suisse romande",
    "totalTime": "PT1M",
    "tool": {
      "@type": "HowToTool",
      "name": "Simulateur d'impôts Neofidu"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Entrez vos revenus",
        "text": "Indiquez votre salaire brut annuel et autres revenus"
      },
      {
        "@type": "HowToStep",
        "name": "Sélectionnez votre canton",
        "text": "Choisissez votre canton de résidence (Vaud, Genève, Fribourg, etc.)"
      },
      {
        "@type": "HowToStep",
        "name": "Ajoutez vos déductions",
        "text": "Renseignez vos déductions : 3ème pilier, frais professionnels, enfants"
      },
      {
        "@type": "HowToStep",
        "name": "Obtenez votre estimation",
        "text": "Recevez instantanément une estimation de vos impôts"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <TaxSimulatorPageClient />
        <Footer />
      </div>
    </>
  );
}
