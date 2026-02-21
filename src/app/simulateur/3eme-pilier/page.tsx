import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pillar3aSimulator } from "@/components/Pillar3aSimulator";
import {
  PiggyBank,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Simulateur 3ème Pilier 2025 | Économie d'Impôts | NeoFidu",
  description:
    "Calculez votre économie d'impôts avec le 3ème pilier. Simulateur gratuit pour estimer votre capital retraite et vos avantages fiscaux en Suisse romande.",
  keywords:
    "simulateur 3ème pilier, calcul économie impôts 3a, pilier 3a suisse, prévoyance retraite suisse, déduction fiscale 3ème pilier, capital retraite simulation",
  openGraph: {
    title: "Simulateur 3ème Pilier 2025 | Économie d'Impôts",
    description:
      "Calculez votre économie d'impôts et votre capital retraite avec notre simulateur 3a gratuit.",
    type: "website",
  },
};

const benefits = [
  {
    icon: TrendingUp,
    title: "Jusqu'à CHF 2'500/an",
    description: "D'économie d'impôts immédiate",
  },
  {
    icon: PiggyBank,
    title: "Capital garanti",
    description: "Pour votre retraite",
  },
  {
    icon: Shield,
    title: "100% déductible",
    description: "Du revenu imposable",
  },
];

const faqs = [
  {
    question: "Combien puis-je cotiser au 3ème pilier en 2025 ?",
    answer:
      "Les salariés affiliés à une caisse de pension peuvent cotiser jusqu'à CHF 7'056 par an. Les indépendants sans 2ème pilier peuvent cotiser jusqu'à 20% de leur revenu net, avec un maximum de CHF 35'280.",
  },
  {
    question: "Quelle est l'économie d'impôts réelle ?",
    answer:
      "L'économie dépend de votre taux marginal d'imposition. En moyenne, une cotisation de CHF 7'056 génère une économie de CHF 2'000 à CHF 2'500 d'impôts, soit un rendement immédiat de 28% à 35%.",
  },
  {
    question: "Quand puis-je retirer mon 3ème pilier ?",
    answer:
      "Le capital est bloqué jusqu'à 5 ans avant l'âge de la retraite (60 ans pour les femmes, 59 ans pour les hommes). Des retraits anticipés sont possibles pour l'achat d'un bien immobilier, le départ définitif de Suisse, ou le passage à l'indépendance.",
  },
  {
    question: "Comment le capital est-il imposé au retrait ?",
    answer:
      "Au moment du retrait, le capital est imposé séparément du reste de vos revenus, à un taux réduit (environ 5% à 7%). Il est conseillé de fractionner vos avoirs sur plusieurs comptes 3a pour optimiser la fiscalité au retrait.",
  },
];

export default function Simulateur3emePilierPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simulateur 3ème Pilier - NeoFidu",
    description:
      "Calculateur d'économie d'impôts 3ème pilier gratuit. Estimez votre capital retraite et vos avantages fiscaux.",
    url: "https://www.neofidu.ch/simulateur/3eme-pilier",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">
                    Rendement fiscal garanti de 28% à 35%
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Simulateur 3ème Pilier
                  <br />
                  <span className="text-emerald-300">Économie d'Impôts 2025</span>
                </h1>

                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Calculez combien vous économisez en impôts et combien vous
                  accumulerez pour votre retraite.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Simulator */}
          <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <Pillar3aSimulator />
            </div>
          </section>

          {/* Other simulators */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">
                Découvrez nos autres simulateurs
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Link href="/simulateur/impots">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">Simulateur d'Impôts</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Calculez vos impôts dans les 6 cantons romands
                      </p>
                      <span className="text-primary text-sm font-medium flex items-center gap-1">
                        Essayer <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/simulateur/valeur-locative">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">Simulateur Valeur Locative</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Impact de la suppression de la valeur locative
                      </p>
                      <span className="text-primary text-sm font-medium flex items-center gap-1">
                        Essayer <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">
                Questions fréquentes sur le 3ème pilier
              </h2>
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

          {/* CTA */}
          <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Optimisez votre déclaration fiscale
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Nos experts s'assurent que toutes vos déductions sont correctement déclarées,
                y compris votre 3ème pilier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demande">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Confier ma déclaration
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/guide/deductions-fiscales">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Guide des déductions
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
