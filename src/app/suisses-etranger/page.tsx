"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  FileText,
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  Phone,
  Mail,
  Building,
  Users,
  Plane,
  Home,
  Calculator,
  HelpCircle,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function SuissesEtrangerPage() {
  const { t, isEnglish } = useLanguage();

  const benefits = [
    {
      icon: Globe,
      title: t("simulators.swissAbroadPage.benefit1Title"),
      description: t("simulators.swissAbroadPage.benefit1Desc"),
    },
    {
      icon: Clock,
      title: t("simulators.swissAbroadPage.benefit2Title"),
      description: t("simulators.swissAbroadPage.benefit2Desc"),
    },
    {
      icon: FileText,
      title: t("simulators.swissAbroadPage.benefit3Title"),
      description: t("simulators.swissAbroadPage.benefit3Desc"),
    },
    {
      icon: Shield,
      title: t("simulators.swissAbroadPage.benefit4Title"),
      description: t("simulators.swissAbroadPage.benefit4Desc"),
    },
  ];

  const situations = [
    {
      icon: Plane,
      title: t("simulators.swissAbroadPage.situation1Title"),
      description: t("simulators.swissAbroadPage.situation1Desc"),
    },
    {
      icon: Home,
      title: t("simulators.swissAbroadPage.situation2Title"),
      description: t("simulators.swissAbroadPage.situation2Desc"),
    },
    {
      icon: Building,
      title: t("simulators.swissAbroadPage.situation3Title"),
      description: t("simulators.swissAbroadPage.situation3Desc"),
    },
    {
      icon: Calculator,
      title: t("simulators.swissAbroadPage.situation4Title"),
      description: t("simulators.swissAbroadPage.situation4Desc"),
    },
  ];

  const faqs = [
    {
      question: t("simulators.swissAbroadPage.faq1Q"),
      answer: t("simulators.swissAbroadPage.faq1A"),
    },
    {
      question: t("simulators.swissAbroadPage.faq2Q"),
      answer: t("simulators.swissAbroadPage.faq2A"),
    },
    {
      question: t("simulators.swissAbroadPage.faq3Q"),
      answer: t("simulators.swissAbroadPage.faq3A"),
    },
    {
      question: t("simulators.swissAbroadPage.faq4Q"),
      answer: t("simulators.swissAbroadPage.faq4A"),
    },
  ];

  const countries = isEnglish
    ? ["France", "Germany", "United States", "Canada", "United Kingdom",
       "Australia", "Singapore", "United Arab Emirates", "Belgium", "Luxembourg",
       "Italy", "Spain", "Netherlands", "Austria", "Portugal"]
    : ["France", "Allemagne", "États-Unis", "Canada", "Royaume-Uni",
       "Australie", "Singapour", "Émirats Arabes Unis", "Belgique", "Luxembourg",
       "Italie", "Espagne", "Pays-Bas", "Autriche", "Portugal"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Déclaration d'impôts pour Suisses de l'étranger",
  "description": "Service de déclaration d'impôts en Suisse pour les citoyens suisses vivant à l'étranger. Expertise en fiscalité internationale et obligations fiscales suisses.",
  "provider": {
    "@type": "AccountingService",
    "name": "NeoFidu",
    "url": "https://www.neofidu.ch"
  },
  "serviceType": "Tax Filing Service",
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  },
  "url": "https://www.neofidu.ch/suisses-etranger",
  "offers": {
    "@type": "Offer",
    "url": "https://www.neofidu.ch/tarifs"
  }
}) }}
      />
      <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary via-primary/90 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{t("simulators.swissAbroadPage.badge")}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("simulators.swissAbroadPage.title")}{" "}
              <span className="underline decoration-teal-300 decoration-4 underline-offset-4">
                {t("simulators.swissAbroadPage.titleHighlight")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("simulators.swissAbroadPage.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                <Link href="/demande">
                  {t("simulators.swissAbroadPage.cta1")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="#contact">
                  {t("simulators.swissAbroadPage.cta2")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">{t("simulators.swissAbroadPage.stat1Value")}</p>
              <p className="text-muted-foreground">{t("simulators.swissAbroadPage.stat1Label")}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">{t("simulators.swissAbroadPage.stat2Value")}</p>
              <p className="text-muted-foreground">{t("simulators.swissAbroadPage.stat2Label")}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">{t("simulators.swissAbroadPage.stat3Value")}</p>
              <p className="text-muted-foreground">{t("simulators.swissAbroadPage.stat3Label")}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">{t("simulators.swissAbroadPage.stat4Value")}</p>
              <p className="text-muted-foreground">{t("simulators.swissAbroadPage.stat4Label")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("simulators.swissAbroadPage.benefitsTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("simulators.swissAbroadPage.benefitsSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Situations Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("simulators.swissAbroadPage.situationsTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("simulators.swissAbroadPage.situationsSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {situations.map((situation, index) => (
              <motion.div
                key={situation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <situation.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{situation.title}</h3>
                      <p className="text-muted-foreground text-sm">{situation.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("simulators.swissAbroadPage.countriesTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("simulators.swissAbroadPage.countriesSubtitle")}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {countries.map((country) => (
              <span
                key={country}
                className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {country}
              </span>
            ))}
            <span className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              {t("simulators.swissAbroadPage.allOtherCountries")}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("simulators.swissAbroadPage.pricingTitle")}
              </h2>
              <p className="text-muted-foreground">
                {t("simulators.swissAbroadPage.pricingSubtitle")}
              </p>
            </div>

            {/* Tarif de base */}
            <Card className="p-8 md:p-10 mb-6 border-2 border-primary/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                    <Globe className="w-4 h-4" />
                    {t("simulators.swissAbroadPage.pricingBadge")}
                  </div>
                  <h3 className="text-xl font-bold">{t("simulators.swissAbroadPage.pricingIndividual")}</h3>
                  <p className="text-muted-foreground text-sm">{t("simulators.swissAbroadPage.pricingIndividualDesc")}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-4xl font-bold text-primary">CHF 100.-</p>
                  <p className="text-sm text-muted-foreground">{t("simulators.swissAbroadPage.pricingBase")}</p>
                  <p className="text-xs text-primary font-medium mt-1">{isEnglish ? "VAT included" : "TTC"}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm font-medium text-muted-foreground mb-4">{t("simulators.swissAbroadPage.supplementsTitle")}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{t("simulators.swissAbroadPage.supplementCouple")}</p>
                    <p className="text-lg font-bold text-primary">+CHF 20.-</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <Building className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{t("simulators.swissAbroadPage.supplementSelfEmployed")}</p>
                    <p className="text-lg font-bold text-primary">+CHF 40.-</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <Home className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{t("simulators.swissAbroadPage.supplementProperty")}</p>
                    <p className="text-lg font-bold text-primary">+CHF 50.-<span className="text-xs font-normal">/{isEnglish ? "property" : "bien"}</span></p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{t("simulators.swissAbroadPage.supplementChild")}</p>
                    <p className="text-lg font-bold text-primary">+CHF 10.-<span className="text-xs font-normal">/{isEnglish ? "child" : "enfant"}</span></p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Exemples de prix */}
            <Card className="p-6 mb-8 bg-slate-50">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                {t("simulators.swissAbroadPage.examplesTitle")}
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <p className="font-medium text-sm mb-1">{t("simulators.swissAbroadPage.example1Title")}</p>
                  <p className="text-2xl font-bold text-primary">CHF 100.-</p>
                  <p className="text-xs text-muted-foreground">{t("simulators.swissAbroadPage.example1Desc")}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <p className="font-medium text-sm mb-1">{t("simulators.swissAbroadPage.example2Title")}</p>
                  <p className="text-2xl font-bold text-primary">CHF 170.-</p>
                  <p className="text-xs text-muted-foreground">{t("simulators.swissAbroadPage.example2Desc")}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <p className="font-medium text-sm mb-1">{t("simulators.swissAbroadPage.example3Title")}</p>
                  <p className="text-2xl font-bold text-primary">CHF 160.-</p>
                  <p className="text-xs text-muted-foreground">{t("simulators.swissAbroadPage.example3Desc")}</p>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                {isEnglish ? "All prices include VAT (8.1%)" : "Tous les prix sont TTC (TVA 8.1% incluse)"}
              </p>
            </Card>

            {/* Express Options */}
            <Card className="mb-8 overflow-hidden border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 via-white to-slate-50/50">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-slate-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">
                      {isEnglish ? "Need it faster?" : "Besoin d'un traitement plus rapide ?"}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      {isEnglish
                        ? "Speed up your tax declaration with our express options:"
                        : "Accélérez le traitement de votre déclaration fiscale avec nos options express :"}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">
                          {isEnglish ? "Priority (7 days)" : "Prioritaire (7 jours)"}
                        </span>
                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                          +CHF 20
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">
                        <Zap className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">
                          {isEnglish ? "Express (48h)" : "Express (48h)"}
                        </span>
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                          +CHF 120
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {isEnglish
                        ? "Standard processing: 10 business days. Select your option during checkout."
                        : "Traitement standard : 10 jours ouvrés. Sélectionnez votre option lors de la commande."}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Documents requis */}
            <Card className="p-6 mb-8 border-amber-200 bg-amber-50/50">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-amber-800">
                <FileText className="w-5 h-5" />
                {t("simulators.swissAbroadPage.documentsTitle")}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{t("simulators.swissAbroadPage.doc1Title")}</p>
                    <p className="text-xs text-muted-foreground">{t("simulators.swissAbroadPage.doc1Desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{t("simulators.swissAbroadPage.doc2Title")}</p>
                    <p className="text-xs text-muted-foreground">{t("simulators.swissAbroadPage.doc2Desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">{t("simulators.swissAbroadPage.doc3Title")}</p>
                    <p className="text-xs text-muted-foreground">{t("simulators.swissAbroadPage.doc3Desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">{t("simulators.swissAbroadPage.doc4Title")}</p>
                    <p className="text-xs text-muted-foreground">{t("simulators.swissAbroadPage.doc4Desc")}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Ce qui est inclus */}
            <Card className="p-6 mb-8">
              <h4 className="font-semibold mb-4">{t("simulators.swissAbroadPage.includedTitle")}</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{t("simulators.swissAbroadPage.included1")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{t("simulators.swissAbroadPage.included2")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{t("simulators.swissAbroadPage.included3")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{t("simulators.swissAbroadPage.included4")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{t("simulators.swissAbroadPage.included5")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{t("simulators.swissAbroadPage.included6")}</span>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/demande">
                  {t("simulators.swissAbroadPage.startDeclaration")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                {t("simulators.swissAbroadPage.priceCalculated")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("simulators.swissAbroadPage.faqTitle")}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("simulators.swissAbroadPage.contactTitle")}
            </h2>
            <p className="text-slate-300 mb-8">
              {t("simulators.swissAbroadPage.contactSubtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-slate-800 border-slate-700">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold mb-1">{t("simulators.swissAbroadPage.email")}</p>
                <a
                  href="mailto:contact@neofidu.ch"
                  className="text-primary hover:underline"
                >
                  contact@neofidu.ch
                </a>
              </Card>
              <Card className="p-6 bg-slate-800 border-slate-700">
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold mb-1">{t("simulators.swissAbroadPage.phoneWhatsApp")}</p>
                <a
                  href="tel:+41786913912"
                  className="text-primary hover:underline"
                >
                  +41 78 691 39 12
                </a>
              </Card>
            </div>

            <Button asChild size="lg" className="font-semibold">
              <Link href="/demande">
                {t("simulators.swissAbroadPage.submitNow")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
