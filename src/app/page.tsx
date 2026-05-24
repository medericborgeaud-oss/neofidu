import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

// Lazy load components below the fold for faster initial page load
const ProfileCards = dynamic(() => import("@/components/ProfileCards").then(mod => ({ default: mod.ProfileCards })), { ssr: true });
const Simulators = dynamic(() => import("@/components/Simulators").then(mod => ({ default: mod.Simulators })), { ssr: true });
const TrustSection = dynamic(() => import("@/components/TrustSection").then(mod => ({ default: mod.TrustSection })), { ssr: true });

export const metadata: Metadata = {
  title: "Fiduciaire en Ligne Suisse | Déclaration d'impôts | NeoFidu",
  description: "Fiduciaire en ligne en Suisse romande. Déclaration d'impôts dès CHF 89, comptabilité, gérance immobilière. Assistant IA fiscal gratuit.",
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
    title: "NeoFidu | Déclaration d'impôts Suisse dès CHF 89",
    description: "Fiduciaire digitale en Suisse romande. Déclaration d'impôts dès CHF 89. Service bilingue FR/EN.",
    url: "https://www.neofidu.ch",
    type: "website",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch",
  },
};

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Combien co\u00fbte une déclaration d'impôts en Suisse ?","acceptedAnswer":{"@type":"Answer","text":"Chez NeoFidu, la déclaration d'impôts commence à CHF 89. Le prix varie selon la complexité de votre situation (revenus, indépendant, propriété…)."}},{"@type":"Question","name":"Puis-je faire ma déclaration d'impôts en ligne en Suisse ?","acceptedAnswer":{"@type":"Answer","text":"Oui. Avec NeoFidu, vous envoyez vos documents depuis votre smartphone ou ordinateur. Nos spécialistes diplômés s'occupent du reste."}},{"@type":"Question","name":"NeoFidu s'adresse-t-il aux indépendants et freelances ?","acceptedAnswer":{"@type":"Answer","text":"Oui. NeoFidu accompagne les indépendants, freelances et PME pour leur déclaration d'impôts et leur comptabilité dès CHF 500/an."}},{"@type":"Question","name":"Dans quels cantons NeoFidu est-il disponible ?","acceptedAnswer":{"@type":"Answer","text":"NeoFidu couvre toute la Suisse romande : Genève, Vaud, Valais, Fribourg, Neuchâtel et Jura."}},{"@type":"Question","name":"Quels sont les délais pour la déclaration d'impôts ?","acceptedAnswer":{"@type":"Answer","text":"La date limite est généralement le 31 mars, avec prolongation possible selon le canton. NeoFidu vous aide à respecter ces échéances."}}]};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <ProfileCards />
        <Simulators />
        <TrustSection />
        <Footer />
      </main>
    </>
  );
}
