import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaiseLoyerCalculator } from "./BaiseLoyerCalculator";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculateur Baisse de Loyer 2026",
  description: "Calculez gratuitement si vous pouvez demander une baisse de loyer en Suisse. Simulateur basÃ© sur le taux de rÃ©fÃ©rence hypothÃ©caire actuel (1.75%). Vaud, GenÃ¨ve, Valais, Fribourg.",
  keywords: [
    "baisse de loyer",
    "calculateur loyer suisse",
    "taux de rÃ©fÃ©rence hypothÃ©caire",
    "taux hypothÃ©caire de rÃ©fÃ©rence",
    "rÃ©duction loyer",
    "diminution loyer suisse",
    "demande baisse loyer",
    "loyer trop cher",
    "taux rÃ©fÃ©rence 2026",
    "baisse loyer vaud",
    "baisse loyer genÃ¨ve",
    "calculateur loyer",
    "simulateur loyer suisse",
    "droit du bail suisse",
    "locataire suisse",
  ],
  openGraph: {
    title: "Calculateur de baisse de loyer Suisse 2026 | Taux de rÃ©fÃ©rence",
    description: "DÃ©couvrez si vous avez droit Ã  une baisse de loyer grÃ¢ce Ã  notre simulateur gratuit basÃ© sur le taux de rÃ©fÃ©rence hypothÃ©caire.",
    url: "https://neofidu.ch/simulateur/baisse-loyer",
    type: "website",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur de baisse de loyer Suisse 2026",
    description: "Simulateur gratuit pour calculer votre droit Ã  une baisse de loyer en Suisse.",
  },
  alternates: {
    canonical: "https://neofidu.ch/simulateur/baisse-loyer",
  },
};

// JSON-LD Schema for the calculator
const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculateur de baisse de loyer Suisse",
  "description": "Simulateur gratuit pour calculer si vous pouvez demander une baisse de loyer en Suisse basÃ© sur le taux de rÃ©fÃ©rence hypothÃ©caire.",
  "url": "https://neofidu.ch/simulateur/baisse-loyer",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CHF"
  },
  "author": {
    "@type": "Organization",
    "name": "NeoFidu",
    "url": "https://neofidu.ch"
  }
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le taux de rÃ©fÃ©rence hypothÃ©caire actuel en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le taux de rÃ©fÃ©rence hypothÃ©caire est actuellement de 1.75% en Suisse (mars 2026). Ce taux est publiÃ© par l'Office fÃ©dÃ©ral du logement et sert de base pour les ajustements de loyer."
      }
    },
    {
      "@type": "Question",
      "name": "Comment demander une baisse de loyer en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour demander une baisse de loyer, vous devez envoyer une lettre recommandÃ©e Ã  votre bailleur en invoquant la baisse du taux de rÃ©fÃ©rence hypothÃ©caire. La demande doit Ãªtre faite pour le prochain terme de rÃ©siliation du bail (gÃ©nÃ©ralement 3 mois Ã  l'avance)."
      }
    },
    {
      "@type": "Question",
      "name": "De combien peut baisser mon loyer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque baisse de 0.25% du taux de rÃ©fÃ©rence permet thÃ©oriquement une rÃ©duction de loyer d'environ 2.91%. Par exemple, si le taux passe de 2% Ã  1.75%, vous pouvez demander une baisse d'environ 2.91% sur votre loyer."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je demander une baisse de loyer rÃ©troactive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, la baisse de loyer n'est pas rÃ©troactive. Elle prend effet au prochain terme de rÃ©siliation du bail aprÃ¨s votre demande. C'est pourquoi il est important d'agir rapidement aprÃ¨s une baisse du taux de rÃ©fÃ©rence."
      }
    }
  ]
};

export default function BaiseLoyerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Calculateur Baisse de Loyer 2026","applicationCategory":"FinanceApplication","operatingSystem":"Web Browser","offers":{"@type":"Offer","price":"0","priceCurrency":"CHF"},"url":"https://www.neofidu.ch/simulateur/baisse-loyer","description":"Calculez votre droit Ã  une baisse de loyer en Suisse selon l'Ã©volution du taux de rÃ©fÃ©rence hypothÃ©caire.","provider":{"@type":"Organization","name":"NeoFidu","url":"https://www.neofidu.ch"}}` }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white pt-24 md:pt-32 pb-12 md:pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Simulateur gratuit · Suisse 2026</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Calculateur{" "}
                  <span className="text-emerald-300">Baisse de Loyer</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Découvrez si vous pouvez demander une réduction de loyer. Basé sur le taux de référence hypothécaire officiel en Suisse.
                </p>
              </div>
            </div>
          </section>
          <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <BaiseLoyerCalculator />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}