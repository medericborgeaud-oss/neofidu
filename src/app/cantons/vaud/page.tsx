"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  Calendar,
  Calculator,
  Clock,
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Briefcase
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function VaudPage() {
  const { isEnglish } = useLanguage();

  const communes = [
    "Leysin", "Aigle", "Les Diablerets", "Ormont-Dessus", "Ormont-Dessous",
    "Villars-sur-Ollon", "Gryon", "Bex", "Ollon", "Lavey-Morcles",
    "Lausanne", "Montreux", "Nyon", "Vevey", "Morges",
    "Yverdon-les-Bains", "Renens", "Pully", "Prilly",
    "Rolle", "Gland", "Payerne", "Echallens"
  ];

  const services = [
    {
      icon: Users,
      title: isEnglish ? "Individuals" : "Particuliers",
      description: isEnglish
        ? "Complete tax return for employees, retirees and families in canton Vaud."
        : "Déclaration d'impôts complète pour salariés, retraités et familles dans le canton de Vaud.",
      price: isEnglish ? "From CHF 50.-" : "Dès CHF 50.-"
    },
    {
      icon: Briefcase,
      title: isEnglish ? "Self-employed" : "Indépendants",
      description: isEnglish
        ? "Accounting and taxation for self-employed and liberal professions in Vaud."
        : "Comptabilité et fiscalité pour indépendants et professions libérales vaudoises.",
      price: isEnglish ? "From CHF 90.-" : "Dès CHF 90.-"
    },
    {
      icon: Building2,
      title: isEnglish ? "SMEs" : "PME",
      description: isEnglish
        ? "Complete accounting services for companies established in canton Vaud."
        : "Services comptables complets pour les entreprises établies dans le canton de Vaud.",
      price: isEnglish ? "On quote" : "Sur devis"
    }
  ];

  const deadlines = [
    {
      date: isEnglish ? "March 15, 2026" : "15 mars 2026",
      description: isEnglish ? "Regular filing deadline" : "Délai ordinaire de dépôt"
    },
    {
      date: isEnglish ? "June 30, 2026" : "30 juin 2026",
      description: isEnglish ? "Free extension (via VaudTax)" : "Prolongation gratuite (via VaudTax)"
    },
    {
      date: isEnglish ? "September 30, 2026" : "30 septembre 2026",
      description: isEnglish ? "Paid extension (CHF 50.-)" : "Prolongation payante (CHF 50.-)"
    },
  ];

  const advantages = isEnglish ? [
    "In-depth knowledge of Vaud taxation",
    "Expert use of VaudTax",
    "Optimization of cantonal deductions",
    "Management of extension requests",
    "Monitoring of provisional installments",
    "Assistance in case of complaint"
  ] : [
    "Connaissance approfondie de la fiscalité vaudoise",
    "Utilisation experte de VaudTax",
    "Optimisation des déductions cantonales",
    "Gestion des demandes de prolongation",
    "Suivi des acomptes provisionnels",
    "Assistance en cas de réclamation"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Cantons", href: "/cantons" },
              { label: "Vaud" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Fiduciary for<br />
              <span className="text-emerald-300">Canton Vaud</span></>
            ) : (
              <>Fiduciaire pour le<br />
              <span className="text-emerald-300">Canton de Vaud</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "Based in Leysin, we support residents of Chablais, the Ormonts Valley, Aigle, Les Diablerets and all of canton Vaud with their 2025 tax return."
              : "Basés à Leysin, nous accompagnons les habitants du Chablais, de la Vallée des Ormonts, d'Aigle, Les Diablerets et de tout le canton de Vaud pour leur déclaration d'impôts 2025."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/demande">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                {isEnglish ? "Submit my request" : "Déposer ma demande"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button size="lg" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white/30">
                {isEnglish ? "View our pricing" : "Voir nos tarifs"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Délais Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Vaud Tax Deadlines 2026" : "Délais fiscaux Vaud 2026"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {deadlines.map((deadline, index) => (
              <Card key={index} className={`p-6 border-2 ${index === 0 ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className={`w-6 h-6 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-2xl font-bold ${index === 0 ? 'text-primary' : ''}`}>
                    {deadline.date}
                  </span>
                </div>
                <p className="text-muted-foreground">{deadline.description}</p>
                {index === 0 && (
                  <span className="inline-block mt-3 text-xs bg-primary text-white px-2 py-1 rounded">
                    {isEnglish ? "Main deadline" : "Délai principal"}
                  </span>
                )}
              </Card>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            <strong>{isEnglish ? "Attention:" : "Attention :"}</strong> {isEnglish
              ? "Canton Vaud has one of the shortest deadlines in French-speaking Switzerland. Don't delay in trusting us with your declaration!"
              : "Le canton de Vaud a l'un des délais les plus courts de Suisse romande. Ne tardez pas à nous confier votre déclaration !"}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {isEnglish ? "Our services for Canton Vaud" : "Nos services pour le Canton de Vaud"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <p className="text-primary font-semibold">{service.price}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{isEnglish ? "Why these rates?" : "Pourquoi ces tarifs ?"}</strong> {isEnglish
                ? "Canton Vaud uses VaudTax, a complex software with many specific deductions. The tight March 15 deadline and the density of requests require reinforced organization. The exact rate is calculated during your online simulation according to your case complexity."
                : "Le canton de Vaud utilise VaudTax, un logiciel complexe avec de nombreuses déductions spécifiques. Le délai serré du 15 mars et la densité des demandes nécessitent une organisation renforcée. Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier."}
            </p>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {isEnglish
                  ? "Why choose NeoFidu for your Vaud taxes?"
                  : "Pourquoi choisir NeoFidu pour vos impôts vaudois ?"}
              </h2>
              <ul className="space-y-4">
                {advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-8 bg-primary/5 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? "Vaud specificities" : "Spécificités vaudoises"}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>{isEnglish ? "Bicycle deduction" : "Déduction vélo"}</strong> : {isEnglish ? "CHF 700 flat rate" : "700 CHF forfaitaires"}</li>
                <li>• <strong>{isEnglish ? "Transport costs" : "Frais de transport"}</strong> : {isEnglish ? "more generous cantonal cap" : "plafond cantonal plus généreux"}</li>
                <li>• <strong>VaudTax</strong> : {isEnglish ? "mandatory official software" : "logiciel officiel obligatoire"}</li>
                <li>• <strong>{isEnglish ? "Installments" : "Acomptes"}</strong> : {isEnglish ? "provisional payment system" : "système de paiements provisionnels"}</li>
                <li>• <strong>{isEnglish ? "Tax scale" : "Barème"}</strong> : {isEnglish ? "progressive cantonal + municipal rate" : "taux progressif cantonal + communal"}</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Communes Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            {isEnglish ? "Based in Leysin, we serve the entire canton" : "Basés à Leysin, nous servons tout le canton"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isEnglish
              ? "Our headquarters is in Leysin, in the heart of the Vaud Chablais. We support the residents of Aigle, Les Diablerets, the Ormonts Valley, Villars, Bex, as well as all of canton Vaud."
              : "Notre siège est à Leysin, au coeur du Chablais vaudois. Nous accompagnons les habitants d'Aigle, Les Diablerets, la Vallée des Ormonts, Villars, Bex, ainsi que tout le canton de Vaud."}
          </p>
          <div className="flex flex-wrap gap-3">
            {communes.map((commune) => (
              <span
                key={commune}
                className="px-4 py-2 bg-white rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {commune}
              </span>
            ))}
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {isEnglish ? "+ all Vaud municipalities" : "+ toutes les communes vaudoises"}
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isEnglish ? "Ready to simplify your Vaud taxes?" : "Prêt à simplifier vos impôts vaudois ?"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Trust our experts with your tax return. Fast service, transparent pricing, deadline compliance guaranteed."
              : "Confiez votre déclaration d'impôts à nos experts. Service rapide, tarifs transparents, respect des délais garanti."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demande">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                {isEnglish ? "Submit my request" : "Déposer ma demande"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/simulateur/impots">
              <Button size="lg" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white/30">
                <Calculator className="mr-2 w-5 h-5" />
                {isEnglish ? "Simulate my VD taxes" : "Simuler mes impôts VD"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
