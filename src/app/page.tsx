import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Simulators } from "@/components/Simulators";
import { SwissMapBanner } from "@/components/SwissMapBanner";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ExpatBanner } from "@/components/ExpatBanner";

export const metadata: Metadata = {
  title: "NeoFidu | Déclaration d'impôts Suisse en ligne | Swiss Tax Returns | Dès CHF 50",
  description: "Déclaration d'impôts Suisse en ligne dès CHF 50. Fiduciaire digitale pour Vaud, Genève, Valais, Fribourg. Service en français et anglais. Swiss tax returns for expats from CHF 50.",
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
    title: "NeoFidu | Déclaration d'impôts Suisse | Swiss Tax Returns | Dès CHF 50",
    description: "Fiduciaire en ligne pour votre déclaration d'impôts. Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura. Service bilingue FR/EN.",
    url: "https://www.neofidu.ch",
    type: "website",
    siteName: "NeoFidu",
    locale: "fr_CH",
    alternateLocale: ["en_CH", "en_GB"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoFidu | Déclaration d'impôts Suisse | Dès CHF 50",
    description: "Déclaration d'impôts depuis votre smartphone. Vaud, Genève, Valais. We speak English!",
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
      <ExpatBanner />
    </main>
  );
}
