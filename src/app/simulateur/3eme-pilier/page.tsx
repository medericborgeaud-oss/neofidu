import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Pillar3aPageClient } from "./Pillar3aPageClient";

export const metadata: Metadata = {
  title: "Simulateur 3ème Pilier 2026 | Gratuit",
  description:
    "Calculez vos économies d'impôts avec le 3ème pilier. Simulateur gratuit. Plafond 2026 : CHF 7'258.",
  keywords:
    "pillar 3a simulator, 3a calculator, pillar 3a tax savings, 3a limit 2026, 3a deduction switzerland, pension 3a, simulateur 3ème pilier, calculateur pilier 3a, économie impôts 3a, plafond 3ème pilier 2026",
  openGraph: {
    title: "Simulateur 3ème Pilier 2026 | Calculateur d'économies d'impôts",
    description:
      "Calculez vos économies d'impôts avec le 3ème pilier. Plafond 2026 : CHF 7'258. Résultat instantané et gratuit.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/3eme-pilier",
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
