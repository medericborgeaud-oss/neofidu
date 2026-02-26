import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ValeurLocativeSimulator } from "@/components/ValeurLocativeSimulator";
import {
  Home,
  ArrowRight,
  Star,
  TrendingDown,
  Scale,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Simulateur Valeur Locative 2026 | Avant/Après Réforme | NeoFidu",
  description:
    "Calculez l'impact de la suppression de la valeur locative sur vos impôts. Simulateur gratuit pour propriétaires : serez-vous gagnant ou perdant après la réforme ?",
  keywords:
    "valeur locative suisse, suppression valeur locative, réforme fiscale propriétaires, impôt valeur locative, simulation valeur locative, avant après réforme",
  openGraph: {
    title: "Simulateur Valeur Locative 2026 | Avant/Après Réforme",
    description:
      "Serez-vous gagnant ou perdant après la suppression de la valeur locative ? Simulez l'impact sur vos impôts.",
    type: "website",
  },
};

const keyPoints = [
  {
    icon: Home,
    title: "Pour propriétaires",
    description: "Résidence principale uniquement",
  },
  {
    icon: Scale,
    title: "Comparaison claire",
    description: "Avant vs après réforme",
  },
  {
    icon: TrendingDown,
    title: "Impact chiffré",
    description: "En CHF sur vos impôts",
  },
];

const faqs = [
  {
    question: "Qu'est-ce que la valeur locative ?",
    answer:
      "La valeur locative est un revenu fictif que les propriétaires doivent déclarer. Elle correspond au loyer qu'ils pourraient percevoir s'ils louaient leur bien (généralement 60-70% du loyer du marché). Ce montant est imposé comme un revenu, mais en contrepartie, les intérêts hypothécaires et frais d'entretien sont déductibles.",
  },
  {
    question: "Quand la valeur locative sera-t-elle supprimée ?",
    answer:
      "Le Parlement a voté la suppression de la valeur locative pour les résidences principales. La date d'entrée en vigueur n'est pas encore fixée et un référendum est possible. La réforme pourrait entrer en vigueur au plus tôt en 2026.",
  },
  {
    question: "Qui sera gagnant après la réforme ?",
    answer:
      "Seront généralement gagnants : les propriétaires avec peu ou pas d'hypothèque, ceux dont la valeur locative est élevée par rapport à leurs déductions, et ceux qui n'ont pas de travaux d'entretien importants. Seront perdants : les propriétaires fortement endettés avec des intérêts élevés.",
  },
  {
    question: "Les intérêts hypothécaires seront-ils encore déductibles ?",
    answer:
      "Non, avec la suppression de la valeur locative, les intérêts hypothécaires de la résidence principale ne seront plus déductibles. Seuls les frais de rénovation énergétique resteront partiellement déductibles selon les propositions actuelles.",
  },
];

export default function SimulateurValeurLocativePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simulateur Valeur Locative - NeoFidu",
    description:
      "Calculateur gratuit pour estimer l'impact de la suppression de la valeur locative sur vos impôts de propriétaire.",
    url: "https://www.neofidu.ch/simulateur/valeur-locative",
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
          <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <AlertCircle className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">
                    Réforme votée - Serez-vous gagnant ou perdant ?
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Simulateur Valeur Locative
                  <br />
                  <span className="text-amber-300">Avant / Après Réforme</span>
                </h1>

                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Découvrez l'impact de la suppression de la valeur locative sur
                  vos impôts de propriétaire.
                </p>
              </div>
            </div>
          </section>

          {/* Key Points */}
          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {keyPoints.map((point) => (
                  <div key={point.title} className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{point.title}</h3>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Simulator */}
          <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <ValeurLocativeSimulator />
            </div>
          </section>

          {/* Info Box */}
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
              <Card className="max-w-3xl mx-auto bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-blue-900">
                    Ce que change la réforme
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Système actuel
                      </h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">+</span>
                          Valeur locative imposée comme revenu
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">-</span>
                          Intérêts hypothécaires déductibles
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">-</span>
                          Frais d'entretien déductibles
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Après réforme
                      </h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          Plus de valeur locative à déclarer
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">✗</span>
                          Intérêts hypothécaires non déductibles
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">~</span>
                          Rénovation énergétique partiellement déductible
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                <Link href="/simulateur/3eme-pilier">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">Simulateur 3ème Pilier</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Calculez votre économie d'impôts et capital retraite
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
                Questions fréquentes sur la valeur locative
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
                Propriétaire ? Optimisez votre déclaration
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Nos experts connaissent les meilleures stratégies pour les
                propriétaires : frais d'entretien, amortissement, timing optimal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demande">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Confier ma déclaration
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/guide/deductions-fiscales#immobilier">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Guide déductions immobilières
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
