import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SalarySimulatorClient } from "./SalarySimulatorClient";
import { SimulatorInternalLinks } from "@/components/SimulatorInternalLinks";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Clock, Shield, TrendingDown, Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simulateur Salaire Net Suisse 2026 | Calculateur par Canton",
  description:
    "Calculez votre salaire net en Suisse par canton. Simulateur gratuit avec AVS, LPP, impôts fédéraux et cantonaux. Comparez les 26 cantons suisses.",
  keywords: [
    "salaire net suisse",
    "calculateur salaire suisse",
    "simulateur salaire net",
    "salaire brut net suisse",
    "cotisations sociales suisse",
    "AVS Suisse",
    "LPP Suisse",
    "impôts cantonaux suisse",
    "net salary switzerland",
    "swiss salary calculator",
    "gross to net switzerland",
    "swiss social contributions",
  ],
  openGraph: {
    title: "Simulateur Salaire Net Suisse 2026 | 26 Cantons | Gratuit",
    description:
      "Calculez votre salaire net en Suisse. Estimation instantanée pour tous les 26 cantons suisses. Aucune inscription requise.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/salaire-net",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur Salaire Net Suisse 2026 | Gratuit",
    description: "Calculez votre salaire net suisse en 2 minutes. Tous les cantons couverts.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/salaire-net",
  },
};

const features = [
  {
    icon: Clock,
    titleFr: "Résultat instantané",
    titleEn: "Instant results",
    descFr: "Calcul en temps réel",
    descEn: "Real-time calculation",
  },
  {
    icon: Shield,
    titleFr: "Données 2026",
    titleEn: "2026 data",
    descFr: "Barèmes à jour",
    descEn: "Up-to-date rates",
  },
  {
    icon: TrendingDown,
    titleFr: "Optimisation",
    titleEn: "Optimization",
    descFr: "Comparez les cantons",
    descEn: "Compare cantons",
  },
];

const faqsFr = [
  {
    question: "Comment est calculé le salaire net en Suisse ?",
    answer:
      "Le salaire net en Suisse est calculé en déduisant du salaire brut les cotisations sociales obligatoires (AVS/AI/APG à 5.3%, AC à 1.1%, AANP environ 1.5%, et LPP variable selon l'âge) ainsi que les impôts (fédéral direct et cantonal/communal).",
  },
  {
    question: "Quels sont les cantons les moins imposés en Suisse ?",
    answer:
      "Les cantons avec la fiscalité la plus avantageuse sont généralement Zoug (ZG), Schwytz (SZ), Nidwald (NW), Obwald (OW) et Appenzell Rhodes-Intérieures (AI). Zoug est souvent considéré comme le canton le plus attractif fiscalement.",
  },
  {
    question: "Qu'est-ce que la LPP et comment est-elle calculée ?",
    answer:
      "La LPP (Loi sur la Prévoyance Professionnelle) est le 2e pilier du système de retraite suisse. Le taux de cotisation employé varie selon l'âge : 3.5% (25-34 ans), 5% (35-44 ans), 7.5% (45-54 ans) et 9% (55-65 ans).",
  },
  {
    question: "Quelle est la différence entre impôt fédéral et cantonal ?",
    answer:
      "L'impôt fédéral direct (IFD) est identique dans toute la Suisse avec un barème progressif. Les impôts cantonaux et communaux varient selon votre lieu de résidence et représentent généralement la part la plus importante de la charge fiscale.",
  },
];

const faqsEn = [
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

export default function SalaireNetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simulateur Salaire Net Suisse - NeoFidu",
    description:
      "Calculez votre salaire net en Suisse par canton avec notre simulateur gratuit",
    url: "https://www.neofidu.ch/simulateur/salaire-net",
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
    mainEntity: faqsFr.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Gratuit & Instantané / Free & Instant</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Simulateur <span className="text-emerald-300">Salaire Net</span>
                  <br />
                  <span className="text-2xl md:text-3xl font-normal opacity-90">Net Salary Calculator</span>
                </h1>

                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Calculez votre salaire net en Suisse par canton. Cotisations sociales, impôts fédéraux et cantonaux inclus.
                  <br />
                  <span className="text-white/70">Calculate your Swiss net salary by canton. Social contributions and taxes included.</span>
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {["Vaud", "Genève", "Valais", "Zurich", "Zoug", "+20"].map((canton) => (
                    <span key={canton} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {canton}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {features.map((feature) => (
                  <div key={feature.titleFr} className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.titleFr}</h3>
                      <p className="text-sm text-muted-foreground">{feature.descFr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Simulator */}
          <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <SalarySimulatorClient />
            </div>
          </section>

          {/* Other simulators */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Autres simulateurs / Other simulators</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Link href="/simulateur/impots">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <Calculator className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-bold text-lg mb-2">Simulateur d'impôts / Tax Calculator</h3>
                      <p className="text-muted-foreground text-sm">
                        Estimez vos impôts annuels par canton / Estimate your annual taxes by canton
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/simulateur/3eme-pilier">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <TrendingDown className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-bold text-lg mb-2">Simulateur 3e Pilier / Pillar 3a Calculator</h3>
                      <p className="text-muted-foreground text-sm">
                        Calculez vos économies d'impôts / Calculate your tax savings
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">
                Questions fréquentes / FAQ
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqsFr.map((faq, idx) => (
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

          {/* Internal Links */}
          <SimulatorInternalLinks currentPage="salaire-net" />
        </main>

        <Footer />
      </div>
    </>
  );
}
