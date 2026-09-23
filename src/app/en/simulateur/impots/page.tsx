import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxSimulatorPageClient } from "../../../simulateur/impots/TaxSimulatorPageClient";

export const metadata: Metadata = {
  title: { absolute: "Swiss Tax Calculator 2026: Estimate Your Taxes Free | NeoFidu" },
  description:
    "Free Swiss tax calculator for 2026. Estimate your income tax in Vaud, Geneva, Valais, Fribourg, Neuchatel and Jura in 30 seconds. Instant result, no signup.",
  keywords: [
    "Swiss tax calculator",
    "Switzerland tax simulator 2026",
    "calculate taxes Switzerland",
    "income tax Vaud Geneva",
    "tax estimate Switzerland",
    "free tax calculator Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/impots",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/impots",
      "en-CH": "https://neofidu.ch/en/simulateur/impots",
      "x-default": "https://neofidu.ch/simulateur/impots",
    },
  },
  openGraph: {
    title: "Swiss Tax Calculator 2026: Estimate Your Taxes Free | NeoFidu",
    description:
      "Free Swiss tax calculator for 2026. Estimate your income tax across French-speaking Switzerland in 30 seconds.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/impots",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function TaxSimulatorEnPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Tax Calculator 2026 - NeoFidu",
    description:
      "Estimate your taxes in French-speaking Switzerland in a few clicks. Free tool, instant result for Vaud, Geneva, Fribourg, Valais, Neuchatel and Jura.",
    url: "https://neofidu.ch/en/simulateur/impots",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
    inLanguage: "en",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate my taxes in Switzerland?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tax calculator estimates your tax burden based on your income, canton, family situation and deductions. The result is free and instant.",
        },
      },
      {
        "@type": "Question",
        name: "Does the calculator cover all Swiss cantons?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the NeoFidu calculator covers all 26 Swiss cantons, including Geneva, Vaud, Fribourg, Valais and Neuchatel, using the 2026 tax scales.",
        },
      },
      {
        "@type": "Question",
        name: "Which tax deductions can I claim in Switzerland?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The main deductions are: professional expenses, mortgage interest, the 3rd pillar (up to CHF 7,258), health insurance premiums and childcare costs.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <TaxSimulatorPageClient />
        <Footer />
      </div>
    </>
  );
}
