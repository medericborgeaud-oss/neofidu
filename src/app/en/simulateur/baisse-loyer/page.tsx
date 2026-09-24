import type { Metadata } from "next";
import { BaiseLoyerCalculator } from "../../../simulateur/baisse-loyer/BaiseLoyerCalculator";

export const metadata: Metadata = {
  title: { absolute: "Swiss Rent Reduction Calculator 2026 | Reference Rate | NeoFidu" },
  description:
    "Free calculator to check if you can request a rent reduction in Switzerland based on the official mortgage reference rate. Instant result for all cantons.",
  keywords: [
    "rent reduction Switzerland",
    "mortgage reference rate",
    "rent decrease calculator",
    "Swiss tenant rights",
    "reference rate 2026",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/baisse-loyer",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/baisse-loyer",
      "en-CH": "https://neofidu.ch/en/simulateur/baisse-loyer",
      "x-default": "https://neofidu.ch/simulateur/baisse-loyer",
    },
  },
  openGraph: {
    title: "Swiss Rent Reduction Calculator 2026 | NeoFidu",
    description:
      "Check if you can request a rent reduction in Switzerland based on the mortgage reference rate.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/baisse-loyer",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function BaiseLoyerEnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Rent Reduction Calculator",
    description:
      "Free calculator to estimate your rent reduction in Switzerland based on the mortgage reference rate.",
    url: "https://neofidu.ch/en/simulateur/baisse-loyer",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BaiseLoyerCalculator />
    </>
  );
}
