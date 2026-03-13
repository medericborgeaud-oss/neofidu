import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DeductionsPageClient } from "./DeductionsPageClient";

export const metadata: Metadata = {
  title: "Tax Deductions Guide 2026 | Swiss Tax | Guide Déductions Fiscales Suisse",
  description:
    "Complete guide to tax deductions in French-speaking Switzerland. Discover all possible deductions: Pillar 3a, professional expenses, health insurance, and more. | Guide complet des déductions fiscales en Suisse romande.",
  keywords: [
    "swiss tax deductions",
    "tax deductions switzerland",
    "pillar 3a deduction",
    "professional expenses switzerland",
    "tax optimization switzerland",
    "déductions fiscales suisse",
    "déductions impôts vaud",
    "déductions genève",
    "3ème pilier déduction",
    "frais professionnels suisse",
    "optimisation fiscale",
  ],
  openGraph: {
    title: "Tax Deductions Guide 2026 | Swiss Tax",
    description: "Complete guide to all tax deductions in French-speaking Switzerland. Maximize your savings.",
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
