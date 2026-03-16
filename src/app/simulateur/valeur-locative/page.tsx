import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ValeurLocativePageClient } from "./ValeurLocativePageClient";

export const metadata: Metadata = {
  title: "Imputed Rental Value Simulator 2026 | Before/After Reform | Simulateur Valeur Locative",
  description:
    "Calculate the impact of the elimination of imputed rental value on your taxes. Free simulator for homeowners: will you be a winner or loser after the reform? | Calculez l'impact de la suppression de la valeur locative.",
  keywords: [
    "imputed rental value switzerland",
    "eigenmietwert simulator",
    "rental value tax reform",
    "swiss property tax calculator",
    "homeowner tax switzerland",
    "valeur locative suisse",
    "suppression valeur locative",
    "réforme fiscale propriétaires",
    "impôt valeur locative",
    "simulation valeur locative",
    "avant après réforme",
  ],
  openGraph: {
    title: "Imputed Rental Value Simulator 2026 | Before/After Reform",
    description:
      "Will you be a winner or loser after the elimination of imputed rental value? Simulate the impact on your taxes.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/valeur-locative",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imputed Rental Value Simulator 2026 | Before/After Reform",
    description: "Homeowners: will you win or lose after the reform? Free simulator.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/valeur-locative",
  },
};

export default function SimulateurValeurLocativePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Imputed Rental Value Simulator - NeoFidu",
    description:
      "Free calculator to estimate the impact of the elimination of imputed rental value on your property taxes.",
    url: "https://www.neofidu.ch/simulateur/valeur-locative",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <ValeurLocativePageClient />
        <Footer />
      </div>
    </>
  );
}
