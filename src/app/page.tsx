import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Simulators } from "@/components/Simulators";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "NeoFidu | Fiduciaire Suisse - Impôts & Comptabilité",
  description: "Fiduciaire digitale en Suisse romande. Déclaration d'impôts dès CHF 50, comptabilité PME. Service en ligne pour Vaud, Genève, Valais.",
  keywords: [
    "fiduciaire suisse",
    "déclaration impôts suisse",
    "comptabilité PME",
    "fiduciaire Lausanne",
    "fiduciaire Genève",
    "déclaration fiscale Vaud",
    "comptable Valais",
    "expert comptable suisse",
    "fiduciaire en ligne",
    "gérance immobilière",
  ],
  openGraph: {
    title: "Fiduciaire Suisse | Déclaration d'impôts & Comptabilité - NeoFidu",
    description: "Fiduciaire digitale en Suisse romande. Déclaration d'impôts dès CHF 50, comptabilité PME. Service pour 6 cantons.",
    url: "https://www.neofidu.ch",
    type: "website",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiduciaire Suisse | NeoFidu",
    description: "Déclaration d'impôts dès CHF 50. Comptabilité PME. Service 100% en ligne.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch",
  },
  verification: {
    google: "verification-code-here",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Simulators />
      <Services />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
