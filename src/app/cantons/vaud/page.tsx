import type { Metadata } from "next";
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
import { generateCantonSchema, cantonData } from "@/lib/canton-schema";

export const metadata: Metadata = {
  title: "Fiduciaire Vaud | Déclaration Impôts dès 149 CHF | Lausanne, Nyon",
  description: "Fiduciaire spécialisée canton de Vaud. Déclaration d'impôts pour particuliers et indépendants. Lausanne, Montreux, Nyon, Vevey. Délai 15 mars 2026. Prix transparents.",
  keywords: "fiduciaire vaud, fiduciaire vaud prix, tarif fiduciaire vaud, déclaration impôts vaud, impôts lausanne, fiduciaire nyon, VaudTax 2026, devis fiduciaire vaud",
  openGraph: {
    title: "Fiduciaire Vaud | Dès 149 CHF | Lausanne, Nyon, Montreux",
    description: "Déclaration d'impôts vaudoise en toute sérénité. Tarifs transparents, experts VaudTax, délai 15 mars 2026.",
    url: "https://www.neofidu.ch/cantons/vaud",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/vaud",
  },
};

const cantonSchema = generateCantonSchema(cantonData.vaud);

export default function VaudPage() {
  const communes = [
    "Lausanne", "Montreux", "Nyon", "Vevey", "Morges",
    "Yverdon-les-Bains", "Renens", "Pully", "Prilly", "Aigle",
    "Rolle", "Gland", "Bex", "Payerne", "Echallens"
  ];

  const services = [
    {
      icon: Users,
      title: "Particuliers",
      description: "Déclaration d'impôts complète pour salariés, retraités et familles dans le canton de Vaud.",
      price: "Dès 149 CHF"
    },
    {
      icon: Briefcase,
      title: "Indépendants",
      description: "Comptabilité et fiscalité pour indépendants et professions libérales vaudoises.",
      price: "Dès 349 CHF"
    },
    {
      icon: Building2,
      title: "PME",
      description: "Services comptables complets pour les entreprises établies dans le canton de Vaud.",
      price: "Sur devis"
    }
  ];

  const deadlines = [
    { date: "15 mars 2026", description: "Délai ordinaire de dépôt" },
    { date: "30 juin 2026", description: "Prolongation gratuite (via VaudTax)" },
    { date: "30 septembre 2026", description: "Prolongation payante (CHF 50.-)" },
  ];

  const advantages = [
    "Connaissance approfondie de la fiscalité vaudoise",
    "Utilisation experte de VaudTax",
    "Optimisation des déductions cantonales",
    "Gestion des demandes de prolongation",
    "Suivi des acomptes provisionnels",
    "Assistance en cas de réclamation"
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cantonSchema) }}
      />
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
            Fiduciaire pour le<br />
            <span className="text-emerald-300">Canton de Vaud</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Experts en fiscalité vaudoise, nous accompagnons les particuliers et entreprises
            de Lausanne à Montreux pour leur déclaration d'impôts 2026.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/demande">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                Déposer ma demande
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button size="lg" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white/30">
                Voir nos tarifs
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
            <h2 className="text-3xl font-bold">Délais fiscaux Vaud 2026</h2>
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
                    Délai principal
                  </span>
                )}
              </Card>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            <strong>Attention :</strong> Le canton de Vaud a l'un des délais les plus courts de Suisse romande.
            Ne tardez pas à nous confier votre déclaration !
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Nos services pour le Canton de Vaud</h2>
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
              <strong>Pourquoi ces tarifs ?</strong> Le canton de Vaud utilise VaudTax, un logiciel complexe avec de nombreuses déductions spécifiques.
              Le délai serré du 15 mars et la densité des demandes nécessitent une organisation renforcée.
              Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier.
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
                Pourquoi choisir NeoFidu pour vos impôts vaudois ?
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
              <h3 className="text-2xl font-bold mb-4">Spécificités vaudoises</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Déduction vélo</strong> : 700 CHF forfaitaires</li>
                <li>• <strong>Frais de transport</strong> : plafond cantonal plus généreux</li>
                <li>• <strong>VaudTax</strong> : logiciel officiel obligatoire</li>
                <li>• <strong>Acomptes</strong> : système de paiements provisionnels</li>
                <li>• <strong>Barème</strong> : taux progressif cantonal + communal</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Communes Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Nous intervenons dans tout le canton</h2>
          <p className="text-muted-foreground mb-8">
            Que vous habitiez à Lausanne, sur la Riviera, dans le Chablais ou le Nord vaudois,
            notre service 100% en ligne vous accompagne.
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
              + toutes les communes vaudoises
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à simplifier vos impôts vaudois ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Confiez votre déclaration d'impôts à nos experts. Service rapide, tarifs transparents,
            respect des délais garanti.
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
                Simuler mes impôts VD
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
