import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pillar3aSimulatorEnhanced } from "@/components/Pillar3aSimulatorEnhanced";
import {
  PiggyBank,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Home,
  Plane,
  Briefcase,
  Calendar,
  Banknote,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Calculateur 3ème Pilier 2026 | Économisez jusqu'à CHF 2'500/an | NeoFidu",
  description:
    "Calculez GRATUITEMENT votre économie d'impôts 3a en 30 secondes. Plafond 2026 : CHF 7'128. Simulation par canton (Vaud, Genève, Valais). Résultat instantané.",
  keywords:
    "calculateur 3ème pilier, simulateur 3a 2026, économie impôts pilier 3a, plafond 3ème pilier 2026, 7128 CHF, déduction fiscale 3a, calcul 3eme pilier, simulation pilier 3a gratuit",
  openGraph: {
    title: "Calculateur 3ème Pilier 2026 | Économisez jusqu'à CHF 2'500/an",
    description:
      "Calculez votre économie d'impôts et capital retraite en 30 secondes. Gratuit et sans inscription.",
    type: "website",
    url: "https://www.neofidu.ch/simulateur/3eme-pilier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur 3ème Pilier 2026 | Économie d'impôts",
    description: "Calculez gratuitement votre économie. Plafond 2026 : CHF 7'128",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/3eme-pilier",
  },
};

const keyFacts = [
  {
    icon: Banknote,
    value: "CHF 7'128",
    label: "Plafond salarié 2026",
    highlight: true,
  },
  {
    icon: TrendingUp,
    value: "28-35%",
    label: "Économie d'impôts",
    highlight: false,
  },
  {
    icon: Calendar,
    value: "31.12.2026",
    label: "Date limite versement",
    highlight: false,
  },
  {
    icon: Shield,
    value: "100%",
    label: "Déductible",
    highlight: false,
  },
];

const withdrawalCases = [
  {
    icon: Home,
    title: "Achat immobilier",
    description: "Retrait anticipé pour l'acquisition de votre résidence principale",
  },
  {
    icon: Plane,
    title: "Départ de Suisse",
    description: "Retrait possible lors du départ définitif hors UE/AELE",
  },
  {
    icon: Briefcase,
    title: "Indépendance",
    description: "Retrait si vous devenez indépendant",
  },
  {
    icon: Calendar,
    title: "Retraite anticipée",
    description: "Dès 5 ans avant l'âge AVS ordinaire",
  },
];

const faqs = [
  {
    question: "Quel est le plafond du 3ème pilier en 2026 ?",
    answer:
      "En 2026, le plafond du 3ème pilier 3a est de CHF 7'128 pour les salariés affiliés à une caisse de pension (2ème pilier). Pour les indépendants sans 2ème pilier, le maximum est de 20% du revenu net, plafonné à CHF 35'640.",
  },
  {
    question: "Combien puis-je économiser en impôts avec le 3ème pilier ?",
    answer:
      "L'économie d'impôts dépend de votre taux marginal d'imposition, qui varie selon votre canton et vos revenus. En moyenne, une cotisation maximale de CHF 7'128 génère une économie de CHF 2'000 à CHF 2'500 d'impôts, soit un rendement immédiat de 28% à 35%.",
  },
  {
    question: "Quelle est la différence entre pilier 3a banque et assurance ?",
    answer:
      "Le pilier 3a banque offre plus de flexibilité (versements libres, possibilité de changer d'établissement). Le pilier 3a assurance combine épargne et couverture risque (décès, invalidité) mais implique des primes fixes. Nous recommandons généralement le 3a bancaire pour sa souplesse.",
  },
  {
    question: "Puis-je retirer mon 3ème pilier avant la retraite ?",
    answer:
      "Oui, dans certains cas : achat de votre résidence principale, départ définitif de Suisse, passage au statut d'indépendant, ou dès 5 ans avant l'âge de la retraite AVS (60 ans pour les femmes nées avant 1964, 59 ans pour les hommes).",
  },
  {
    question: "Combien de comptes 3a puis-je ouvrir ?",
    answer:
      "Il n'y a pas de limite légale au nombre de comptes 3a. Nous recommandons d'ouvrir 4 à 5 comptes pour optimiser la fiscalité au moment du retrait. En étalant les retraits sur plusieurs années, vous réduisez l'imposition progressive.",
  },
  {
    question: "Jusqu'à quand puis-je verser pour l'année fiscale 2026 ?",
    answer:
      "Pour que votre versement soit déductible de l'année fiscale 2026, il doit être effectué au plus tard le 31 décembre 2026. Nous vous recommandons de ne pas attendre le dernier moment pour éviter les retards bancaires.",
  },
];

export default function Simulateur3emePilierPage() {
  // Schema.org WebApplication
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculateur 3ème Pilier Suisse 2026",
    description:
      "Calculateur gratuit d'économie d'impôts 3ème pilier. Estimez votre capital retraite et vos avantages fiscaux par canton.",
    url: "https://www.neofidu.ch/simulateur/3eme-pilier",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
    },
  };

  // Schema.org FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="text-sm font-medium">
                    Rendement fiscal garanti de 28% à 35%
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Calculateur 3ème Pilier
                  <br />
                  <span className="text-emerald-300">Économie d'Impôts 2026</span>
                </h1>

                <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                  Calculez en <strong>30 secondes</strong> combien vous économisez en impôts
                  et combien vous accumulerez pour votre retraite.
                </p>

                {/* Key facts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {keyFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className={`rounded-xl p-4 ${
                        fact.highlight
                          ? "bg-white text-emerald-700"
                          : "bg-white/15 backdrop-blur-sm"
                      }`}
                    >
                      <fact.icon className={`w-6 h-6 mx-auto mb-2 ${fact.highlight ? "text-emerald-600" : ""}`} />
                      <div className={`text-xl md:text-2xl font-bold ${fact.highlight ? "" : "text-white"}`}>
                        {fact.value}
                      </div>
                      <div className={`text-xs ${fact.highlight ? "text-emerald-600" : "text-white/70"}`}>
                        {fact.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Pillar3aSimulatorEnhanced />
              </div>
            </div>
          </section>

          {/* Withdrawal cases */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                  Quand puis-je retirer mon 3ème pilier ?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {withdrawalCases.map((item) => (
                    <Card key={item.title} className="border-2 hover:border-primary/30 transition-colors">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="py-12 bg-amber-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-8 h-8 text-amber-600" />
                  <h2 className="text-2xl font-bold">Conseils d'experts</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-white border-amber-200">
                    <CardContent className="p-6">
                      <Badge className="bg-amber-100 text-amber-800 mb-3">Optimisation</Badge>
                      <h3 className="font-bold mb-2">Ouvrez plusieurs comptes</h3>
                      <p className="text-sm text-muted-foreground">
                        4 à 5 comptes 3a permettent d'étaler les retraits et réduire l'imposition progressive au moment de la retraite.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-amber-200">
                    <CardContent className="p-6">
                      <Badge className="bg-amber-100 text-amber-800 mb-3">Timing</Badge>
                      <h3 className="font-bold mb-2">Versez avant le 15 décembre</h3>
                      <p className="text-sm text-muted-foreground">
                        Pour être sûr que votre versement soit comptabilisé en 2026, n'attendez pas le 31 décembre.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-amber-200">
                    <CardContent className="p-6">
                      <Badge className="bg-amber-100 text-amber-800 mb-3">Choix</Badge>
                      <h3 className="font-bold mb-2">Préférez le 3a bancaire</h3>
                      <p className="text-sm text-muted-foreground">
                        Plus de flexibilité, moins de frais, et possibilité d'investir en fonds de placement selon votre profil.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                  Questions fréquentes sur le 3ème pilier
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground pl-9">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-gradient-to-br from-primary to-emerald-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Besoin d'aide pour votre déclaration ?
              </h2>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Nos experts optimisent vos déductions 3a et toutes les autres pour maximiser votre économie d'impôts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/demande">
                  <Button size="lg" variant="secondary" className="text-primary font-semibold">
                    Déposer ma demande
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/simulateur/impots">
                  <Button size="lg" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white/30">
                    <Calculator className="mr-2 w-5 h-5" />
                    Simulateur d'impôts
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
