import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { CarteImpotsPageClient } from "./CarteImpotsPageClient";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Carte des Impôts Suisses 2026",
  description:
    "Interactive Swiss tax map 2026. Compare tax rates of all 26 Swiss cantons: Zug (5.1%), Schwyz (7.2%), Geneva (14.8%). Find the lowest-taxed canton to optimize your taxes. | Carte interactive des impôts en Suisse.",
  keywords: [
    "swiss tax map",
    "switzerland tax comparison",
    "lowest taxed canton switzerland",
    "swiss cantonal taxes",
    "zug taxes",
    "geneva taxes",
    "vaud taxes",
    "swiss tax rates by canton",
    "carte impôts suisse",
    "carte impôts suisse 2026",
    "impôts par canton suisse",
    "canton moins imposé suisse",
    "fiscalité cantonale suisse",
    "comparatif impôts cantons suisses",
    "zoug impôts",
    "genève impôts",
    "vaud impôts",
    "valais impôts",
  ],
  openGraph: {
    title: "Swiss Tax Map 2026 | Compare All 26 Cantons",
    description:
      "Interactive map comparing tax rates of 26 Swiss cantons. From Zug (5.1%) to Geneva (14.8%), find the ideal canton to optimize your tax situation.",
    url: "https://www.neofidu.ch/simulateur/carte-impots",
    type: "website",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Tax Map 2026 | Compare 26 Cantons",
    description: "Compare taxes of 26 Swiss cantons. From Zug (5.1%) to Geneva (14.8%). Find where to pay less taxes.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/carte-impots",
    languages: {
      "fr-CH": "https://www.neofidu.ch/simulateur/carte-impots",
      "en": "https://www.neofidu.ch/simulateur/carte-impots",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function CarteImpotsPage() {
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Tax Map - NeoFidu",
    description: "Interactive map comparing tax rates of 26 Swiss cantons. Visualize tax differences from Zug to Geneva.",
    url: "https://www.neofidu.ch/simulateur/carte-impots",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
    provider: {
      "@type": "Organization",
      name: "NeoFidu",
      url: "https://www.neofidu.ch",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which Swiss canton has the lowest taxes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Zug is the Swiss canton with the lowest tax burden, approximately 5.1% for a married couple with two children and an income of CHF 100,000. Schwyz and Nidwalden follow closely with rates around 7-7.5%.",
        },
      },
      {
        "@type": "Question",
        name: "Why do taxes vary so much between cantons?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Switzerland, each canton has its own fiscal sovereignty and sets its own tax rates. This fiscal competition between cantons explains the significant gaps, ranging from one to three between Zug and Geneva.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.neofidu.ch" },
      { "@type": "ListItem", position: 2, name: "Simulators", item: "https://www.neofidu.ch/simulateur" },
      { "@type": "ListItem", position: 3, name: "Tax Map", item: "https://www.neofidu.ch/simulateur/carte-impots" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Carte des Impôts Suisses 2026","applicationCategory":"FinanceApplication","operatingSystem":"Web Browser","offers":{"@type":"Offer","price":"0","priceCurrency":"CHF"},"url":"https://www.neofidu.ch/simulateur/carte-impots","description":"Comparez les taux d'imposition des 26 cantons suisses sur une carte interactive.","provider":{"@type":"Organization","name":"NeoFidu","url":"https://www.neofidu.ch"}}` }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white pt-24 md:pt-32 pb-12 md:pb-16">
            <div className="container mx-auto px-4">
              <Breadcrumb items={[{ label: "Simulateurs", href: "/simulateur" }, { label: "Carte des Imp�ts" }]} className="mb-6" />
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Simulateur gratuit · Suisse 2026</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Carte des{" "}
                  <span className="text-emerald-300">Impôts Suisses</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Comparez les taux d’imposition des 26 cantons suisses. Identifiez le canton le plus avantageux fiscalement pour votre profil.
                </p>
              </div>
            </div>
          </section>
          <section className="py-8 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <CarteImpotsPageClient />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}