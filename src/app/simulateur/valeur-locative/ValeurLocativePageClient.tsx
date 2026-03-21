"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ValeurLocativeSimulator } from "@/components/ValeurLocativeSimulator";
import { SimulatorInternalLinks } from "@/components/SimulatorInternalLinks";
import {
  Home,
  ArrowRight,
  Scale,
  AlertCircle,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ValeurLocativePageClient() {
  const { t } = useLanguage();

  const keyPoints = [
    {
      icon: Home,
      title: t("simulators.valeurLocativePage.keyPoint1"),
      description: t("simulators.valeurLocativePage.keyPoint1Desc"),
    },
    {
      icon: Scale,
      title: t("simulators.valeurLocativePage.keyPoint2"),
      description: t("simulators.valeurLocativePage.keyPoint2Desc"),
    },
    {
      icon: TrendingDown,
      title: t("simulators.valeurLocativePage.keyPoint3"),
      description: t("simulators.valeurLocativePage.keyPoint3Desc"),
    },
  ];

  const faqs = [
    {
      question: t("simulators.valeurLocativePage.faq1Q"),
      answer: t("simulators.valeurLocativePage.faq1A"),
    },
    {
      question: t("simulators.valeurLocativePage.faq2Q"),
      answer: t("simulators.valeurLocativePage.faq2A"),
    },
    {
      question: t("simulators.valeurLocativePage.faq3Q"),
      answer: t("simulators.valeurLocativePage.faq3A"),
    },
    {
      question: t("simulators.valeurLocativePage.faq4Q"),
      answer: t("simulators.valeurLocativePage.faq4A"),
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">
                {t("simulators.valeurLocativePage.badge")}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t("simulators.valeurLocativePage.title")}
              <br />
              <span className="text-amber-300">{t("simulators.valeurLocativePage.titleHighlight")}</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("simulators.valeurLocativePage.description")}
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
                {t("simulators.valeurLocativePage.infoBoxTitle")}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {t("simulators.valeurLocativePage.currentSystem")}
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">+</span>
                      {t("simulators.valeurLocativePage.currentPoint1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">-</span>
                      {t("simulators.valeurLocativePage.currentPoint2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">-</span>
                      {t("simulators.valeurLocativePage.currentPoint3")}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {t("simulators.valeurLocativePage.afterReform")}
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      {t("simulators.valeurLocativePage.afterPoint1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      {t("simulators.valeurLocativePage.afterPoint2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">~</span>
                      {t("simulators.valeurLocativePage.afterPoint3")}
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
            {t("simulators.valeurLocativePage.otherSimulatorsTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/simulateur/impots">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{t("simulators.valeurLocativePage.taxSimTitle")}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t("simulators.valeurLocativePage.taxSimDesc")}
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    {t("simulators.valeurLocativePage.tryIt")} <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/simulateur/3eme-pilier">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{t("simulators.valeurLocativePage.pillar3aSimTitle")}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t("simulators.valeurLocativePage.pillar3aSimDesc")}
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    {t("simulators.valeurLocativePage.tryIt")} <ArrowRight className="w-4 h-4" />
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
            {t("simulators.valeurLocativePage.faqTitle")}
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

      {/* Internal Links */}
      <SimulatorInternalLinks currentPage="valeur-locative" />
    </main>
  );
}
