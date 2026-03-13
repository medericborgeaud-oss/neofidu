import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxSimulatorPageClient } from "./TaxSimulatorPageClient";

export const metadata: Metadata = {
  title: "Swiss Tax Calculator 2026 | Free",
  description:
    "Calculate your Swiss taxes FREE. Tax simulator for all 26 cantons. Instant results.",
  keywords: [
    "swiss tax calculator",
    "switzerland tax simulator",
    "calculate taxes switzerland",
    "swiss tax calculator 2026",
    "zug tax calculator",
    "zurich tax calculator",
    "geneva tax calculator",
    "vaud tax calculator",
    "swiss tax estimation",
    "calculateur impôts suisse",
    "simulateur impôts 26 cantons",
    "simulation fiscale suisse",
    "calcul impôts zoug",
    "estimation impôts zurich",
    "calculette impôts 2026",
    "impot simulateur suisse",
  ],
  openGraph: {
    title: "Swiss Tax Calculator 2026 | 26 Cantons | Free",
    description:
      "Calculate your Swiss taxes for free. Instant estimate for all 26 Swiss cantons. No registration required.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/impots",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Tax Calculator 2026 | 26 Cantons | Free",
    description: "Calculate your Swiss taxes in 2 minutes. All Swiss cantons covered.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/impots",
  },
};

export default function SimulateurImpotsPage() {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Tax Simulator - NeoFidu",
    description:
      "Free tax calculator for all of Switzerland. Instant estimate for all 26 Swiss cantons, from Zug to Geneva.",
    url: "https://www.neofidu.ch/simulateur/impots",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
    provider: {
      "@type": "Organization",
      name: "NeoFidu",
      url: "https://www.neofidu.ch",
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
        <TaxSimulatorPageClient />
        <Footer />
      </div>
    </>
  );
}
