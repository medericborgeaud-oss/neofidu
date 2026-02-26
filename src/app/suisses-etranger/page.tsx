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
  MapPin,
  Clock,
  Shield,
  Phone,
  Mail,
  Building,
  Users,
  Plane,
  Home,
  Calculator,
  HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Globe,
    title: "Service 100% en ligne",
    description: "Gérez votre déclaration d'impôts suisse depuis n'importe où dans le monde, sans vous déplacer.",
  },
  {
    icon: Clock,
    title: "Fuseau horaire flexible",
    description: "Notre équipe s'adapte à votre fuseau horaire pour les échanges et les questions.",
  },
  {
    icon: FileText,
    title: "Documents numériques",
    description: "Envoyez vos documents par voie électronique, recevez votre déclaration par email.",
  },
  {
    icon: Shield,
    title: "Expertise fiscale suisse",
    description: "Nos spécialistes connaissent les particularités fiscales des Suisses de l'étranger.",
  },
];

const situations = [
  {
    icon: Plane,
    title: "Expatriation récente",
    description: "Vous venez de quitter la Suisse et devez remplir votre dernière déclaration d'impôts ? Nous gérons la proratisation et les formalités de départ.",
  },
  {
    icon: Home,
    title: "Propriétaire en Suisse",
    description: "Vous possédez un bien immobilier en Suisse ? Nous déclarons vos revenus locatifs et gérons l'imposition de votre propriété.",
  },
  {
    icon: Building,
    title: "Activité professionnelle en Suisse",
    description: "Vous travaillez pour une entreprise suisse depuis l'étranger ? Nous optimisons votre situation fiscale.",
  },
  {
    icon: Calculator,
    title: "Retour en Suisse prévu",
    description: "Vous planifiez votre retour ? Nous vous conseillons sur les implications fiscales et préparons votre transition.",
  },
];

const faqs = [
  {
    question: "Dois-je toujours payer des impôts en Suisse si je vis à l'étranger ?",
    answer: "Cela dépend de votre situation. Si vous avez des revenus de source suisse (immobilier, activité lucrative), vous restez imposable en Suisse sur ces revenus. Nous analysons votre situation pour déterminer vos obligations fiscales.",
  },
  {
    question: "Comment envoyer mes documents depuis l'étranger ?",
    answer: "Tout se fait en ligne ! Vous scannez ou photographiez vos documents et les téléchargez sur notre plateforme sécurisée. Pas besoin d'envoyer de courrier postal.",
  },
  {
    question: "Pouvez-vous gérer les conventions de double imposition ?",
    answer: "Oui, nous connaissons les conventions de double imposition que la Suisse a signées avec plus de 100 pays. Nous vous aidons à éviter la double imposition et à récupérer les impôts payés en trop.",
  },
  {
    question: "Quels délais pour les Suisses de l'étranger ?",
    answer: "Les délais sont généralement les mêmes que pour les résidents. Cependant, des prolongations sont possibles. Nous pouvons demander un délai supplémentaire en votre nom si nécessaire.",
  },
];

const countries = [
  "France", "Allemagne", "États-Unis", "Canada", "Royaume-Uni",
  "Australie", "Singapour", "Émirats Arabes Unis", "Belgique", "Luxembourg",
  "Italie", "Espagne", "Pays-Bas", "Autriche", "Portugal"
];

export default function SuissesEtrangerPage() {
  return (
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
              <span className="text-sm font-medium">Service dédié aux expatriés suisses</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Déclaration d'impôts pour les{" "}
              <span className="underline decoration-teal-300 decoration-4 underline-offset-4">
                Suisses de l'étranger
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Vous vivez à l'étranger mais avez des obligations fiscales en Suisse ?
              Notre fiduciaire en ligne vous accompagne où que vous soyez dans le monde.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                <Link href="/demande">
                  Déposer ma demande
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
                  Nous contacter
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
              <p className="text-3xl md:text-4xl font-bold text-primary">800K+</p>
              <p className="text-muted-foreground">Suisses à l'étranger</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">100+</p>
              <p className="text-muted-foreground">Conventions fiscales</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
              <p className="text-muted-foreground">Plateforme accessible</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
              <p className="text-muted-foreground">En ligne</p>
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
              Pourquoi choisir NeoFidu depuis l'étranger ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre service est conçu pour répondre aux besoins spécifiques des expatriés suisses.
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
              Votre situation nous concerne
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quelle que soit votre situation d'expatrié, nous avons l'expertise pour vous aider.
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
              Nous accompagnons les Suisses dans le monde entier
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nos clients vivent aux quatre coins du monde. Voici quelques pays d'où ils nous font confiance :
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
              + tous les autres pays
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
            className="max-w-3xl mx-auto"
          >
            <Card className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Tarifs pour les Suisses de l'étranger
                </h2>
                <p className="text-muted-foreground">
                  Les mêmes tarifs transparents que pour les résidents suisses
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-slate-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Déclaration simple</p>
                  <p className="text-3xl font-bold text-primary">CHF 150.-</p>
                  <p className="text-sm text-muted-foreground mt-2">Revenus salariés, sans immobilier</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Déclaration complète</p>
                  <p className="text-3xl font-bold text-primary">CHF 250.-</p>
                  <p className="text-sm text-muted-foreground mt-2">Avec immobilier en Suisse</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Analyse de votre situation fiscale internationale</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Gestion des conventions de double imposition</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Communication par email et visioconférence</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Livraison électronique de votre déclaration</span>
                </div>
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/demande">
                    Commencer ma déclaration
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </Card>
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
              Questions fréquentes des expatriés
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
              Besoin d'aide depuis l'étranger ?
            </h2>
            <p className="text-slate-300 mb-8">
              Notre équipe est disponible pour répondre à vos questions par email ou visioconférence.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-slate-800 border-slate-700">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold mb-1">Email</p>
                <a
                  href="mailto:contact@neofidu.ch"
                  className="text-primary hover:underline"
                >
                  contact@neofidu.ch
                </a>
              </Card>
              <Card className="p-6 bg-slate-800 border-slate-700">
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold mb-1">Téléphone / WhatsApp</p>
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
                Déposer ma demande maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
