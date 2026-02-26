import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  Star,
  Clock,
  Shield,
  TrendingDown,
} from "lucide-react";
import { TaxSimulatorClient } from "./TaxSimulatorClient";

export const metadata: Metadata = {
  title: "Calculateur Impôts Suisse 2026 | Résultat en 2 min | Gratuit",
  description:
    "Calculez vos impôts GRATUITEMENT en 2 minutes. Simulateur fiscal précis pour Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura. Résultat instantané par canton et commune.",
  keywords:
    "simulateur impôts suisse, calculateur impôts vaud, simulation fiscale genève, calcul impôts valais, estimation impôts suisse romande, calculette impôts 2026, impot simulateur",
  openGraph: {
    title: "Calculateur Impôts Suisse 2026 | Résultat en 2 min",
    description:
      "Calculez vos impôts gratuitement. Estimation instantanée pour les 6 cantons romands. Aucune inscription requise.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/impots",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur Impôts Suisse 2026 | Gratuit",
    description: "Calculez vos impôts en 2 minutes. Vaud, Genève, Valais, Fribourg.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/impots",
  },
};

const features = [
  {
    icon: Clock,
    title: "Résultat instantané",
    description: "Obtenez votre estimation en moins de 2 minutes",
  },
  {
    icon: Shield,
    title: "100% gratuit",
    description: "Aucune inscription requise, aucun engagement",
  },
  {
    icon: TrendingDown,
    title: "Déductions incluses",
    description: "3ème pilier, enfants, frais professionnels...",
  },
];

const cantons = [
  "Vaud",
  "Genève",
  "Valais",
  "Fribourg",
  "Neuchâtel",
  "Jura",
];

const faqs = [
  {
    question: "Comment est calculé le montant de mes impôts ?",
    answer:
      "Notre simulateur prend en compte l'impôt fédéral direct (IFD), l'impôt cantonal et l'impôt communal. Il applique les barèmes officiels et les déductions standards (frais professionnels, assurance maladie, 3ème pilier, déductions pour enfants).",
  },
  {
    question: "Le résultat est-il fiable ?",
    answer:
      "Notre estimation est basée sur les taux officiels et donne une bonne approximation. Le montant exact peut varier selon votre commune et votre situation personnelle complète. Pour une déclaration optimisée, confiez votre dossier à nos experts.",
  },
  {
    question: "Quels cantons sont couverts ?",
    answer:
      "Notre simulateur couvre les 6 cantons de Suisse romande : Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura. Chaque canton a ses propres taux et déductions.",
  },
  {
    question: "Comment réduire mes impôts ?",
    answer:
      "Les principales optimisations incluent : cotiser au 3ème pilier (jusqu'à CHF 7'128), effectuer des rachats LPP, déclarer tous les frais professionnels, et ne pas oublier les frais médicaux dépassant 5% du revenu.",
  },
];

export default function SimulateurImpotsPage() {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simulateur d'Impôts Suisse - NeoFidu",
    description:
      "Calculateur d'impôts gratuit pour la Suisse romande. Estimation instantanée pour Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura.",
    url: "https://www.neofidu.ch/simulateur/impots",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                  <span className="text-sm font-medium">
                    Outil gratuit - Plus de 10'000 simulations
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Simulateur d'Impôts
                  <br />
                  <span className="text-emerald-300">Suisse Romande 2026</span>
                </h1>

                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Calculez vos impôts en 2 minutes. Gratuit, sans inscription,
                  avec toutes les déductions.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {cantons.map((canton) => (
                    <span
                      key={canton}
                      className="bg-white/10 px-3 py-1 rounded-full text-sm"
                    >
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
                  <div
                    key={feature.title}
                    className="flex items-center gap-4 p-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Simulator */}
          <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <TaxSimulatorClient />
            </div>
          </section>

          {/* Other simulators */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">
                Découvrez nos autres simulateurs
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Link href="/simulateur/3eme-pilier">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">
                        Simulateur 3ème Pilier
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Calculez votre économie d'impôts et votre capital retraite
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
                      <h3 className="font-bold text-lg mb-2">
                        Simulateur Valeur Locative
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Impact de la suppression de la valeur locative sur vos impôts
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

          {/* FAQ Section */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">
                Questions fréquentes
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">
                        {faq.answer}
                      </p>
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
                Besoin d'optimiser votre déclaration ?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Nos experts fiscaux connaissent toutes les déductions. Confiez-nous
                votre déclaration pour payer moins d'impôts en toute légalité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demande">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
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
