"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PiggyBank,
  ArrowRight,
  Clock,
  Shield,
  TrendingUp,
  Calculator,
  Zap,
} from "lucide-react";
import { Pillar3aSimulatorEnhanced } from "@/components/Pillar3aSimulatorEnhanced";
import { SimulatorInternalLinks } from "@/components/SimulatorInternalLinks";
import { useLanguage } from "@/lib/language-context";
import { Breadcrumb } from "@/components/Breadcrumb";

export function Pillar3aPageClient() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Clock,
      title: t("simulators.pillar3aPage.feature1"),
      description: t("simulators.pillar3aPage.feature1Desc"),
    },
    {
      icon: Shield,
      title: t("simulators.pillar3aPage.feature2"),
      description: t("simulators.pillar3aPage.feature2Desc"),
    },
    {
      icon: TrendingUp,
      title: t("simulators.pillar3aPage.feature3"),
      description: t("simulators.pillar3aPage.feature3Desc"),
    },
  ];

  const faqs = [
    {
      question: t("simulators.pillar3aPage.faq1Q"),
      answer: t("simulators.pillar3aPage.faq1A"),
    },
    {
      question: t("simulators.pillar3aPage.faq2Q"),
      answer: t("simulators.pillar3aPage.faq2A"),
    },
    {
      question: t("simulators.pillar3aPage.faq3Q"),
      answer: t("simulators.pillar3aPage.faq3A"),
    },
    {
      question: t("simulators.pillar3aPage.faq4Q"),
      answer: t("simulators.pillar3aPage.faq4A"),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-primary text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Simulateurs", href: "/simulateur" }, { label: "3ème Pilier" }]} className="mb-6" />
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">{t("simulators.pillar3aPage.badge")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("simulators.pillar3aPage.title")}
            </h1>
            <p className="text-lg text-white/90 mb-8">
              {t("simulators.pillar3aPage.description")}
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-2 text-white/90">
                  <feature.icon className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Pillar3aSimulatorEnhanced />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {t("simulators.pillar3aPage.faqTitle")}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("simulators.pillar3aPage.ctaTitle")}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            {t("simulators.pillar3aPage.ctaDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-emerald-700">
              <Link href="/demande">
                {t("simulators.pillar3aPage.ctaButton1")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              <Link href="/simulateur/impots">
                <Calculator className="mr-2 w-5 h-5" />
                {t("simulators.pillar3aPage.ctaButton2")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <SimulatorInternalLinks currentPage="3eme-pilier" />
    </>
  );
}
