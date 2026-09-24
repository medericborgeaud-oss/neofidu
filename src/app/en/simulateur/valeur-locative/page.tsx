import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ValeurLocativePageClient } from "../../../simulateur/valeur-locative/ValeurLocativePageClient";

export const metadata: Metadata = {
  title: { absolute: "Swiss Imputed Rental Value Simulator 2026 | NeoFidu" },
  description:
    "Calculate the impact of abolishing the imputed rental value (valeur locative) on your Swiss taxes. Free simulator for homeowners: winner or loser after the reform?",
  keywords: [
    "imputed rental value Switzerland",
    "eigenmietwert simulator",
    "rental value tax reform",
    "Swiss homeowner tax",
    "valeur locative Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/valeur-locative",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/valeur-locative",
      "en-CH": "https://neofidu.ch/en/simulateur/valeur-locative",
      "x-default": "https://neofidu.ch/simulateur/valeur-locative",
    },
  },
  openGraph: {
    title: "Swiss Imputed Rental Value Simulator 2026 | NeoFidu",
    description:
      "Will you be a winner or loser after the abolition of the imputed rental value? Simulate the impact on your taxes.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/valeur-locative",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function ValeurLocativeEnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Imputed Rental Value Simulator - NeoFidu",
    description:
      "Free calculator to estimate the impact of abolishing the imputed rental value on your property taxes.",
    url: "https://neofidu.ch/en/simulateur/valeur-locative",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <ValeurLocativePageClient />
        <Footer />
      </div>
    </>
  );
}
