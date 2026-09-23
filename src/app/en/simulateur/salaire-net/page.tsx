import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SalarySimulatorClient } from "../../../simulateur/salaire-net/SalarySimulatorClient";
import { SimulatorInternalLinks } from "@/components/SimulatorInternalLinks";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Clock, Shield, TrendingDown, Zap } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SimulatorCTA } from "@/components/SimulatorCTA";

export const metadata: Metadata = {
  title: { absolute: "Swiss Net Salary Calculator 2026: Gross to Net | NeoFidu" },
  description:
    "Calculate your net salary in Switzerland by canton. Free calculator including AVS, LPP, federal and cantonal taxes. Compare all 26 Swiss cantons.",
  keywords: [
    "net salary Switzerland",
    "Swiss salary calculator",
    "gross to net Switzerland",
    "Swiss social contributions",
    "salary calculator canton",
    "AVS LPP calculator",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/salaire-net",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/salaire-net",
      "en-CH": "https://neofidu.ch/en/simulateur/salaire-net",
      "x-default": "https://neofidu.ch/simulateur/salaire-net",
    },
  },
  openGraph: {
    title: "Swiss Net Salary Calculator 2026: Gross to Net | NeoFidu",
    description:
      "Calculate your net salary in Switzerland by canton. Free, instant estimate for all 26 Swiss cantons.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/salaire-net",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

const features = [
  { icon: Clock, title: "Instant results", desc: "Real-time calculation" },
  { icon: Shield, title: "2026 data", desc: "Up-to-date rates" },
  { icon: TrendingDown, title: "Optimization", desc: "Compare cantons" },
];

const faqs = [
  {
    question: "How is net salary calculated in Switzerland?",
    answer:
      "Net salary in Switzerland is calculated by deducting mandatory social contributions (AVS/AI/APG at 5.3%, AC at 1.1%, AANP around 1.5%, and LPP varying by age) and taxes (federal and cantonal/municipal) from the gross salary.",
  },
  {
    question: "Which are the lowest-taxed cantons in Switzerland?",
    answer:
      "The cantons with the most advantageous taxation are generally Zug (ZG), Schwyz (SZ), Nidwalden (NW), Obwalden (OW) and Appenzell Innerrhoden (AI). Zug is often considered the most tax-attractive canton.",
  },
  {
    question: "What is LPP and how is it calculated?",
    answer:
      "LPP (Occupational Pension Law) is the 2nd pillar of the Swiss retirement system. The employee contribution rate varies by age: 3.5% (25-34 years), 5% (35-44 years), 7.5% (45-54 years) and 9% (55-65 years).",
  },
  {
    question: "What is the difference between federal and cantonal tax?",
    answer:
      "Federal direct tax (IFD) is the same throughout Switzerland with a progressive scale. Cantonal and municipal taxes vary according to your place of residence and generally represent the largest portion of the tax burden.",
  },
];

export default function SalaryEnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiss Net Salary Calculator - NeoFidu",
    description: "Calculate your net salary in Switzerland by canton with our free calculator.",
    url: "https://neofidu.ch/en/simulateur/salaire-net",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
    inLanguage: "en",
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
            <div className="container mx-auto px-4">
              <Breadcrumb items={[{ label: "Simulators", href: "/simulateur" }, { label: "Net Salary" }]} className="mb-6" />
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Free & Instant</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Net Salary <span className="text-emerald-300">Calculator</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Calculate your net salary in Switzerland by canton. Social contributions, federal and cantonal taxes included.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Vaud", "Geneva", "Valais", "Zurich", "Zug", "+20"].map((canton) => (
                    <span key={canton} className="bg-white/20 px-3 py-1 rounded-full text-sm">{canton}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <SalarySimulatorClient />
            </div>
          </section>

          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Other simulators</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Link href="/en/simulateur/impots">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <Calculator className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-bold text-lg mb-2">Tax Calculator</h3>
                      <p className="text-muted-foreground text-sm">Estimate your annual taxes by canton</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/simulateur/3eme-pilier">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <TrendingDown className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-bold text-lg mb-2">Pillar 3a Calculator</h3>
                      <p className="text-muted-foreground text-sm">Calculate your tax savings</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <SimulatorCTA />
          <SimulatorInternalLinks currentPage="salaire-net" />
        </main>
        <Footer />
      </div>
    </>
  );
}
