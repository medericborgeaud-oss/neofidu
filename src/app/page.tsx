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
  title: "Swiss Tax Returns for Expats in Switzerland | From CHF 50",
  description: "Swiss tax returns made easy for expats. English-speaking fiduciary from CHF 50. We help foreigners with B/C permits file taxes in Vaud, Geneva, Valais.",
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
    title: "Swiss Tax Returns from CHF 50",
    description: "Swiss tax filing from your smartphone. We speak English! Vaud, Geneva, Valais, Fribourg.",
    url: "https://www.neofidu.ch",
    type: "website",
    siteName: "NeoFidu",
    locale: "fr_CH",

  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Tax Returns | From CHF 50 | We Speak English",
    description: "File your Swiss taxes from your smartphone. We speak English! Vaud, Geneva, Valais.",
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
