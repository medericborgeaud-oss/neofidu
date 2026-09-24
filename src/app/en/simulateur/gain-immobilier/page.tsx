import type { Metadata } from "next";
import { GainImmobilierSimulator } from "../../../simulateur/gain-immobilier/GainImmobilierSimulator";

export const metadata: Metadata = {
  title: { absolute: "Swiss Real Estate Capital Gains Tax Calculator 2026 | NeoFidu" },
  description:
    "Free calculator for the Swiss real estate capital gains tax (IGI) when selling a property. Rates by canton (Vaud, Geneva, Valais, Fribourg) and holding period. Instant estimate.",
  keywords: [
    "real estate capital gains tax Switzerland",
    "IGI Switzerland",
    "property sale tax Switzerland",
    "capital gains calculator canton",
    "holding period property tax",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/gain-immobilier",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/gain-immobilier",
      "en-CH": "https://neofidu.ch/en/simulateur/gain-immobilier",
      "x-default": "https://neofidu.ch/simulateur/gain-immobilier",
    },
  },
  openGraph: {
    title: "Swiss Real Estate Capital Gains Tax Calculator 2026 | NeoFidu",
    description:
      "Calculate the capital gains tax when selling your property in Switzerland. Rates by canton and holding period.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/gain-immobilier",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function GainImmobilierEnPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Real Estate Capital Gains Tax Calculator",
    description:
      "Free calculator to estimate the real estate capital gains tax (IGI) when selling a property in Switzerland, by canton and holding period.",
    url: "https://neofidu.ch/en/simulateur/gain-immobilier",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <GainImmobilierSimulator />
    </>
  );
}
