import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DeductionsPageClient } from "./DeductionsPageClient";

export const metadata: Metadata = {
  title: "Guide DÃ©ductions Fiscales Suisse 2026",
  description:
    "DÃ©couvrez toutes les dÃ©ductions fiscales auxquelles vous avez droit : 3Ã¨me pilier, frais professionnels, dons, frais de gardeâ¦ Guide mis Ã  jour 2026 pour la Suisse romande.",
  keywords: [
    "dÃ©ductions fiscales suisse",
    "dÃ©ductions fiscales 2026",
    "payer moins d'impÃ´ts suisse",
    "dÃ©ductions impÃ´ts vaud",
    "dÃ©ductions impÃ´ts genÃ¨ve",
    "dÃ©ductions impÃ´ts fribourg",
    "3Ã¨me pilier dÃ©duction",
    "frais professionnels dÃ©duction",
    "frais de garde dÃ©duction",
    "dons dÃ©ductibles suisse",
    "optimisation fiscale suisse romande",
    "guide fiscal suisse",
    "rÃ©duire ses impÃ´ts suisse",
  ],
  openGraph: {
    title: "DÃ©ductions fiscales en Suisse 2026 â Guide complet pour payer moins d'impÃ´ts",
    description: "DÃ©couvrez toutes les dÃ©ductions fiscales auxquelles vous avez droit : 3Ã¨me pilier, frais professionnels, dons, frais de gardeâ¦ Guide 2026.",
    type: "website",
    url: "https://www.neofidu.ch/guide/deductions-fiscales",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/guide/deductions-fiscales",
  },
};

export default function DeductionsFiscalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DeductionsPageClient />
      <Footer />
    </div>
  );
}
