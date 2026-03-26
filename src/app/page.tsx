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
  title: "Fiduciaire en Ligne Suisse | Déclaration d’impôts | NeoFidu",
 description: "Fiduciaire en ligne en Suisse romande. Déclaration d'impôts dès CHF 50, comptabilité, gérance immobilière. Assistant IA fiscal gratuit.",
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


const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Combien coûte une déclaration d'impôts en SuisseÂ ?","acceptedAnswer":{"@type":"Answer","text":"Chez NeoFidu, la déclaration d'impôts commence à CHFÂ 50. Le prix varie selon la complexité de votre situation (revenus, indépendant, propriété…)."}},{"@type":"Question","name":"Puis-je faire ma déclaration d'impôts en ligne en SuisseÂ ?","acceptedAnswer":{"@type":"Answer","text":"Oui. Avec NeoFidu, vous envoyez vos documents depuis votre smartphone ou ordinateur. Nos spécialistes diplômés s'occupent du reste."}},{"@type":"Question","name":"NeoFidu s'adresse-t-il aux indépendants et freelancesÂ ?","acceptedAnswer":{"@type":"Answer","text":"Oui. NeoFidu accompagne les indépendants, freelances et PME pour leur déclaration d'impôts et leur comptabilité dès CHFÂ 500/an."}},{"@type":"Question","name":"Dans quels cantons NeoFidu est-il disponibleÂ ?","acceptedAnswer":{"@type":"Answer","text":"NeoFidu couvre toute la Suisse romandeÂ : Genève, Vaud, Valais, Fribourg, Neuchâtel et Jura."}},{"@type":"Question","name":"Quels sont les délais pour la déclaration d'impôtsÂ ?","acceptedAnswer":{"@type":"Answer","text":"La date limite est généralement le 31 mars, avec prolongation possible selon le canton. NeoFidu vous aide à respecter ces échéances."}}]};
export default function Home() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
    </>
  );
}
