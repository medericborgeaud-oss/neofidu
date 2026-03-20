"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Zap,
  Clock,
  Shield,
  TrendingDown,
} from "lucide-react";
import { TaxSimulatorClient } from "./TaxSimulatorClient";
import { SimulatorInternalLinks } from "@/components/SimulatorInternalLinks";
import { useLanguage } from "@/lib/language-context";

export function TaxSimulatorPageClient() {
  const { t, isEnglish } = useLanguage();

  const cantonsRomandie = ["Vaud", "Genève", "Valais", "Fribourg", "Neuchâtel", "Jura"];
  const cantonsAlemanique = isEnglish
    ? ["Zurich", "Bern", "Zug", "Lucerne", "Aargau", "St. Gallen"]
    : ["Zurich", "Berne", "Zoug", "Lucerne", "Argovie", "Saint-Gall"];

  const features = [
    {
      icon: Clock,
      title: t("simulators.taxSimulatorPage.feature1"),
      description: t("simulators.taxSimulatorPage.feature1Desc"),
    },
    {
      icon: Shield,
      title: t("simulators.taxSimulatorPage.feature2"),
      description: t("simulators.taxSimulatorPage.feature2Desc"),
    },
    {
      icon: TrendingDown,
      title: t("simulators.taxSimulatorPage.feature3"),
      description: t("simulators.taxSimulatorPage.feature3Desc"),
    },
  ];

  const faqs = [
    {
      question: t("simulators.taxSimulatorPage.faq1Q"),
      answer: t("simulators.taxSimulatorPage.faq1A"),
    },
    {
      question: t("simulators.taxSimulatorPage.faq2Q"),
      answer: t("simulators.taxSimulatorPage.faq2A"),
    },
    {
      question: t("simulators.taxSimulatorPage.faq3Q"),
      answer: t("simulators.taxSimulatorPage.faq3A"),
    },
    {
      question: t("simulators.taxSimulatorPage.faq4Q"),
      answer: t("simulators.taxSimulatorPage.faq4A"),
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">
                {t("simulators.taxSimulatorPage.badge")}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t("simulators.taxSimulatorPage.title")}{" "}
              <span className="text-emerald-300">{t("simulators.taxSimulatorPage.titleHighlight")}</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("simulators.taxSimulatorPage.description")}
            </p>

            <div className="mb-6">
              <p className="text-white/70 text-sm mb-2">{t("simulators.taxSimulatorPage.frenchSwitzerland")}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {cantonsRomandie.map((canton) => (
                  <span
                    key={canton}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm"
                  >
                    {canton}
                  </span>
                ))}
              </div>
              <p className="text-white/70 text-sm mb-2">{t("simulators.taxSimulatorPage.germanSwitzerlandTicino")}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {cantonsAlemanique.map((canton) => (
                  <span
                    key={canton}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm"
                  >
                    {canton}
                  </span>
                ))}
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {t("simulators.taxSimulatorPage.moreCantons")}
                </span>
              </div>
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
            {t("simulators.taxSimulatorPage.otherSimulators")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/simulateur/3eme-pilier">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    {t("simulators.taxSimulatorPage.pillar3aSimTitle")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t("simulators.taxSimulatorPage.pillar3aSimDesc")}
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    {t("simulators.taxSimulatorPage.tryIt")} <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/simulateur/valeur-locative">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    {t("simulators.taxSimulatorPage.valeurLocativeSimTitle")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t("simulators.taxSimulatorPage.valeurLocativeSimDesc")}
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    {t("simulators.taxSimulatorPage.tryIt")} <ArrowRight className="w-4 h-4" />
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
            {t("simulators.taxSimulatorPage.faqTitle")}
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

      {/* Internal Links */}
      <SimulatorInternalLinks currentPage="impots" />
    </main>
  );
}
