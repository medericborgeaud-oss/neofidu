import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CarteImpotsPageClient } from "@/app/simulateur/carte-impots/CarteImpotsPageClient";
import { SimulatorCTA } from "@/components/SimulatorCTA";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Swiss Tax Map 2026: Compare Cantons | NeoFidu" },
  description:
    "Interactive Swiss tax map 2026. Compare the income tax burden of all 26 Swiss cantons at a glance and find the most tax-efficient canton for your profile.",
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/carte-impots",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/carte-impots",
      "en-CH": "https://neofidu.ch/en/simulateur/carte-impots",
      "x-default": "https://neofidu.ch/simulateur/carte-impots",
    },
  },
  openGraph: {
    title: "Swiss Tax Map 2026: Compare Cantons | NeoFidu",
    description:
      "Interactive Swiss tax map 2026. Compare the income tax burden of all 26 Swiss cantons.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/carte-impots",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function SwissTaxMapEnPage() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Swiss Tax Map 2026",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    url: "https://neofidu.ch/en/simulateur/carte-impots",
    inLanguage: "en",
    description:
      "Compare the income tax rates of all 26 Swiss cantons on an interactive map.",
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Calculators", item: "https://neofidu.ch/en/simulateur" },
      { "@type": "ListItem", position: 2, name: "Swiss Tax Map", item: "https://neofidu.ch/en/simulateur/carte-impots" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-hero text-white pt-24 md:pt-32 pb-12 md:pb-16">
            <div className="container mx-auto px-4">
              <Breadcrumb items={[{ label: "Calculators", href: "/en/simulateur" }, { label: "Swiss Tax Map" }]} className="mb-6" />
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Free Swiss calculator 2026</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Swiss{" "}
                  <span className="text-emerald-300">Tax Map</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Compare the income tax rates of all 26 Swiss cantons. Find the most tax-efficient canton for your profile.
                </p>
              </div>
            </div>
          </section>
          <section className="py-8 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <CarteImpotsPageClient />
            </div>
          </section>
          <SimulatorCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
