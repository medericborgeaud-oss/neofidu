import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DeductionsPageClient } from "../../../guide/deductions-fiscales/DeductionsPageClient";

export const metadata: Metadata = {
  title: { absolute: "Swiss Tax Deductions Guide 2026: Pay Less Tax | NeoFidu" },
  description:
    "Complete guide to tax deductions in Switzerland: professional expenses, 3rd pillar, mortgage interest, donations and childcare. Optimize your taxes.",
  keywords: [
    "Swiss tax deductions",
    "tax deductions Switzerland 2026",
    "pay less tax Switzerland",
    "3rd pillar deduction",
    "professional expenses deduction",
    "childcare deduction Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/guide/deductions-fiscales",
    languages: {
      "fr-CH": "https://neofidu.ch/guide/deductions-fiscales",
      "en-CH": "https://neofidu.ch/en/guide/deductions-fiscales",
      "x-default": "https://neofidu.ch/guide/deductions-fiscales",
    },
  },
  openGraph: {
    title: "Swiss Tax Deductions Guide 2026: Pay Less Tax | NeoFidu",
    description:
      "All the tax deductions you are entitled to in Switzerland: 3rd pillar, professional expenses, donations, childcare and more.",
    type: "website",
    url: "https://neofidu.ch/en/guide/deductions-fiscales",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function DeductionsEnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DeductionsPageClient />
      <Footer />
    </div>
  );
}
