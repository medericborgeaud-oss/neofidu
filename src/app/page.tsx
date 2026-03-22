import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

// Lazy load components below the fold for faster initial page load
const Simulators = dynamic(() => import("@/components/Simulators").then(mod => ({ default: mod.Simulators })), { ssr: true });
const SwissMapBanner = dynamic(() => import("@/components/SwissMapBanner").then(mod => ({ default: mod.SwissMapBanner })), { ssr: true });
const Services = dynamic(() => import("@/components/Services").then(mod => ({ default: mod.Services })), { ssr: true });
const Pricing = dynamic(() => import("@/components/Pricing").then(mod => ({ default: mod.Pricing })), { ssr: true });
const About = dynamic(() => import("@/components/About").then(mod => ({ default: mod.About })), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact").then(mod => ({ default: mod.Contact })), { ssr: true });

export const metadata: Metadata = {
  title: "NeoFidu | Déclaration d'impôts Suisse dès CHF 50",
  description: "Fiduciaire digitale en Suisse romande. Déclaration d'impôts dès CHF 50. Vaud, Genève, Valais. Service bilingue FR/EN.",
  keywords: [
    // Expat-specific keywords (high priority)
    "expat tax return switzerland",
    "swiss tax for foreigners",
    "english speaking tax advisor switzerland",
    "expat accountant geneva",
    "expat tax help lausanne",
    "foreigner tax return switzerland",
    "B permit tax return",
    "C permit tax filing",
    "new to switzerland taxes",
    "first swiss tax return",
    "international employee tax switzerland",
    "relocation tax help switzerland",
    "expat tax consultant zurich",
    "tax advisor for expats",
    "quellensteuer correction",
    "withholding tax refund switzerland",
    // General English keywords
    "swiss tax return online",
    "switzerland tax filing",
    "file taxes switzerland",
    "swiss tax accountant",
    "geneva tax return",
    "lausanne tax filing",
    "online tax filing switzerland",
    // French keywords
    "fiduciaire suisse",
    "fiduciaire digitale",
    "fiduciaire en ligne",
    "déclaration impôts suisse",
    "déclaration impôts étranger",
    "fiduciaire vaud",
    "fiduciaire genève",
    "fiduciaire valais",
    "comptabilité PME",
    "fiduciaire Leysin",
    "fiduciaire Aigle",
    "fiduciaire Monthey",
  ],
  openGraph: {
    title: "NeoFidu | Déclaration d'impôts Suisse dès CHF 50",
    description: "Fiduciaire digitale en Suisse romande. Déclaration d'impôts dès CHF 50. Service bilingue FR/EN.",
    url: "https://www.neofidu.ch",
    type: "website",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch",
  },
  // Vérification Google Search Console - À configurer avec le vrai code
  // verification: {
  //   google: "VOTRE_CODE_GOOGLE_SEARCH_CONSOLE",
  // },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Simulators />
      <Services />
      <Pricing />
      <SwissMapBanner />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
