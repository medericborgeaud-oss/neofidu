import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Pillar3aPageClient } from "../../../simulateur/3eme-pilier/Pillar3aPageClient";

export const metadata: Metadata = {
  title: { absolute: "Swiss Pillar 3a Calculator 2026: Tax Savings | NeoFidu" },
  description:
    "Calculate your tax savings with the Swiss 3rd pillar (pillar 3a). Free calculator, 2026 limit CHF 7,258. Estimate your retirement capital and tax deduction.",
  keywords: [
    "pillar 3a calculator",
    "Swiss 3rd pillar tax savings",
    "pillar 3a limit 2026",
    "3a deduction Switzerland",
    "retirement savings Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/3eme-pilier",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/3eme-pilier",
      "en-CH": "https://neofidu.ch/en/simulateur/3eme-pilier",
      "x-default": "https://neofidu.ch/simulateur/3eme-pilier",
    },
  },
  openGraph: {
    title: "Swiss Pillar 3a Calculator 2026: Tax Savings | NeoFidu",
    description:
      "Calculate your tax savings with the Swiss 3rd pillar. Free, instant. 2026 limit CHF 7,258.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/3eme-pilier",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function Pillar3aEnPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <Pillar3aPageClient />
      <Footer />
    </main>
  );
}
