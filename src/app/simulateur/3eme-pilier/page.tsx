import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Pillar3aPageClient } from "./Pillar3aPageClient";

export const metadata: Metadata = {
  title: "Pillar 3a Simulator 2026 | Free",
  description:
    "Calculate your tax savings with Pillar 3a. Free simulator. 2026 limit: CHF 7,258.",
  keywords:
    "pillar 3a simulator, 3a calculator, pillar 3a tax savings, 3a limit 2026, 3a deduction switzerland, pension 3a, simulateur 3ème pilier, calculateur pilier 3a, économie impôts 3a, plafond 3ème pilier 2026",
  openGraph: {
    title: "Pillar 3a Simulator 2026 | Tax Savings Calculator",
    description:
      "Calculate your tax savings with Pillar 3a. 2026 limit: CHF 7,258. Free and instant results.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/3eme-pilier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pillar 3a Simulator 2026 | Free",
    description: "Calculate your tax savings with Pillar 3a. Vaud, Geneva, Valais.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/3eme-pilier",
  },
};

export default function Pillar3aSimulatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <Pillar3aPageClient />
      <Footer />
    </main>
  );
}
