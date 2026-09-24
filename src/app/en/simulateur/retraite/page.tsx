import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RetirementIncomeSimulator from "@/components/RetirementIncomeSimulator";
import { Zap } from "lucide-react";
import { SimulatorCTA } from "@/components/SimulatorCTA";

export const metadata: Metadata = {
  title: { absolute: "Swiss Retirement Income Simulator 2026: AVS, LPP, 3a | NeoFidu" },
  description:
    "Estimate your retirement income in Switzerland: AVS pension, LPP capital (2nd pillar) and 3rd pillar. Free, instant simulator with 2026 parameters.",
  keywords: [
    "Swiss retirement simulator",
    "AVS pension calculator",
    "LPP 2nd pillar pension",
    "retirement income Switzerland",
    "Swiss pension planning",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/retraite",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/retraite",
      "en-CH": "https://neofidu.ch/en/simulateur/retraite",
      "x-default": "https://neofidu.ch/simulateur/retraite",
    },
  },
  openGraph: {
    title: "Swiss Retirement Income Simulator 2026 | NeoFidu",
    description:
      "Estimate your AVS, LPP and 3rd pillar retirement income in Switzerland. Free and instant.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/retraite",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function RetraiteEnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Retirement Income Simulator",
    description:
      "Free calculator to estimate your retirement income in Switzerland (AVS, LPP, 3rd pillar).",
    url: "https://neofidu.ch/en/simulateur/retraite",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
    inLanguage: "en",
  };

  return (
    <main className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 text-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Free & Instant</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Swiss <span className="text-emerald-300">Retirement</span> Simulator
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Estimate your AVS, LPP and 3rd pillar income. Plan your retirement with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["AVS", "LPP", "3rd Pillar", "Instant result", "100% free"].map((pill) => (
                <span key={pill} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <RetirementIncomeSimulator />
      <SimulatorCTA />
      <Footer />
    </main>
  );
}
