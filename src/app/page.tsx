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
  title: "Fiduciaire en Ligne Suisse | Déclaration dès CHF 50 | NeoFidu",
  description: "Fiduciaire digitale 100% en ligne. Déclaration d'impôts dès CHF 50, comptabilité PME, gérance immobilière. Vaud, Genève, Valais, Fribourg. Tarifs transparents.",
  keywords: [
    "fiduciaire suisse",
    "fiduciaire digitale",
    "fiduciaire en ligne",
    "déclaration impôts suisse",
    "fiduciaire vaud",
    "fiduciaire genève",
    "fiduciaire valais",
    "comptabilité PME",
    "tarif fiduciaire",
    "fiduciaire prix",
    "gérance immobilière",
  ],
  openGraph: {
    title: "Fiduciaire en Ligne Suisse | Dès CHF 50 | NeoFidu",
    description: "Déclaration d'impôts 100% en ligne. Tarifs affichés, spécialistes agréés. Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura.",
    url: "https://www.neofidu.ch",
    type: "website",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiduciaire en Ligne | Dès CHF 50 | NeoFidu",
    description: "Déclaration d'impôts 100% en ligne. Vaud, Genève, Valais. Tarifs transparents.",
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
