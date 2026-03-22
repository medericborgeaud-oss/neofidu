import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DeductionsPageClient } from "./DeductionsPageClient";

export const metadata: Metadata = {
  title: "Guide Déductions Fiscales Suisse 2026",
  description:
    "Découvrez toutes les déductions fiscales auxquelles vous avez droit : 3ème pilier, frais professionnels, dons, frais de gardeâ¦ Guide mis Ã  jour 2026 pour la Suisse romande.",
  keywords: [
    "déductions fiscales suisse",
    "déductions fiscales 2026",
    "payer moins d'impôts suisse",
    "déductions impôts vaud",
    "déductions impôts genève",
    "déductions impôts fribourg",
    "3ème pilier déduction",
    "frais professionnels déduction",
    "frais de garde déduction",
    "dons déductibles suisse",
    "optimisation fiscale suisse romande",
    "guide fiscal suisse",
    "réduire ses impôts suisse",
  ],
  openGraph: {
    title: "Déductions fiscales en Suisse 2026 â Guide complet pour payer moins d'impôts",
    description: "Découvrez toutes les déductions fiscales auxquelles vous avez droit : 3ème pilier, frais professionnels, dons, frais de gardeâ¦ Guide 2026.",
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
