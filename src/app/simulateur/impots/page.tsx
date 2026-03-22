import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxSimulatorPageClient } from "./TaxSimulatorPageClient";

export const metadata: Metadata = {
  title: "Simulateur d'impôts Suisse 2026",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Simulateur d'impôts Suisse 2026","applicationCategory":"FinanceApplication","operatingSystem":"Web Browser","offers":{"@type":"Offer","price":"0","priceCurrency":"CHF"},"url":"https://www.neofidu.ch/simulateur/impots","description":"Calculez vos impôts suisses gratuitement en 30 secondes. Valable pour tous les cantons 2026.","provider":{"@type":"Organization","name":"NeoFidu","url":"https://www.neofidu.ch"}}` }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen flex flex-col">
              <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Comment calculer ses impôts en Suisse ?",
              "acceptedAnswer": {"@type": "Answer", "text": "Notre simulateur d’impôts calcule votre charge fiscale en fonction de votre revenu, votre canton, votre situation familiale et vos déductions. Le résultat est gratuit et immédiat."}
            },
            {
              "@type": "Question",
              "name": "Le simulateur couvre-t-il tous les cantons suisses ?",
              "acceptedAnswer": {"@type": "Answer", "text": "Oui, le simulateur NeoFidu couvre les 26 cantons suisses, y compris Genève, Vaud, Fribourg, Valais et Neuchâtel, avec les barèmes fiscaux 2026."}
            },
            {
              "@type": "Question",
              "name": "Quelles déductions fiscales puis-je déduire en Suisse ?",
              "acceptedAnswer": {"@type": "Answer", "text": "Les principales déductions sont : les frais professionnels, les intérêts d’emprunts, le 3ème pilier (jusqu’à CHF 7'056), les primes d’assurance-maladie et les frais de garde."}
            },
            {
              "@type": "Question",
              "name": "Quid des impôts pour les expatriés en Suisse ?",
              "acceptedAnswer": {"@type": "Answer", "text": "Les titulaires d’un permis B ou C sont imposés différemment selon leur statut. Notre simulateur et nos experts fiduciaires vous guident pour optimiser votre situation fiscale."}
            }
          ]
        }) }}
      />
<Header />
        <TaxSimulatorPageClient />
        <Footer />
      </div>
    </>
  );
}
