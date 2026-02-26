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
  Mountain,
  Home
} from "lucide-react";
import { generateCantonSchema, cantonData } from "@/lib/canton-schema";

const cantonSchema = generateCantonSchema(cantonData.valais);

export const metadata: Metadata = {
  title: "Fiduciaire Valais | Déclaration d'impôts Canton du Valais 2026 - NeoFidu",
  description: "Fiduciaire spécialisée dans le canton du Valais. Déclaration d'impôts pour particuliers et entreprises à Sion, Sierre, Monthey, Martigny. Fiscalité avantageuse. Délai 31 mars 2026.",
  keywords: "fiduciaire valais, déclaration impôts valais, impôts sion, fiscalité valais, VSTax, impôts résidence secondaire valais",
  openGraph: {
    title: "Fiduciaire Valais | Déclaration d'impôts Sion & Canton du Valais",
    description: "Profitez de la fiscalité attractive du Valais. Experts locaux, tarifs transparents.",
    url: "https://www.neofidu.ch/cantons/valais",
  },
};

export default function ValaisPage() {
  const communes = [
    "Sion", "Sierre", "Monthey", "Martigny", "Brig-Glis",
    "Nendaz", "Bagnes", "Conthey", "Fully", "Collombey-Muraz",
    "Savièse", "Ayent", "Zermatt", "Crans-Montana", "Verbier"
  ];

  const services = [
    {
      icon: Users,
      title: "Particuliers",
      description: "Déclaration d'impôts complète pour résidents valaisans, salariés et familles.",
      price: "Dès 149 CHF"
    },
    {
      icon: Home,
      title: "Résidences secondaires",
      description: "Déclaration spécifique pour propriétaires de chalets et appartements en station.",
      price: "Dès 199 CHF"
    },
    {
      icon: Building2,
      title: "Entreprises",
      description: "Comptabilité et fiscalité pour PME et indépendants établis en Valais.",
      price: "Sur devis"
    }
  ];

  const deadlines = [
    { date: "31 mars 2026", description: "Délai ordinaire de dépôt" },
    { date: "30 juin 2026", description: "Prolongation sur demande" },
    { date: "31 décembre 2026", description: "Délai ultime avec motif" },
  ];

  const advantages = [
    "Connaissance approfondie de la fiscalité valaisanne",
    "Expertise résidences secondaires en station",
    "Optimisation pour les revenus immobiliers",
    "Maîtrise parfaite de VSTax",
    "Conseil en prévoyance adapté au canton",
    "Accompagnement bilingue FR/DE"
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
              { label: "Valais" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Fiduciaire pour le<br />
            <span className="text-emerald-300">Canton du Valais</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Profitez d'une fiscalité parmi les plus attractives de Suisse.
            Nos experts vous accompagnent de Sion à Zermatt pour votre déclaration 2026.
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

      {/* Fiscalité attractive */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Avantage fiscal
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                Une fiscalité parmi les plus basses de Suisse
              </h2>
              <p className="text-muted-foreground mb-6">
                Le canton du Valais offre l'un des taux d'imposition les plus avantageux de Suisse,
                tant pour les particuliers que pour les entreprises. Un atout majeur pour votre patrimoine.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">11.9%</div>
                  <div className="text-sm text-muted-foreground">Taux entreprises</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">~25%</div>
                  <div className="text-sm text-muted-foreground">Taux revenu moyen</div>
                </Card>
              </div>
            </div>
            <Card className="p-8 bg-white">
              <Mountain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Résidences secondaires</h3>
              <p className="text-muted-foreground mb-4">
                Propriétaire d'un chalet à Verbier, Zermatt ou Crans-Montana ?
                Nous gérons la valeur locative et les déductions spécifiques aux biens en station.
              </p>
              <Link href="/demande">
                <Button variant="outline" className="w-full">
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Délais Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Délais fiscaux Valais 2026</h2>
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
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Nos services pour le Canton du Valais</h2>
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
              <strong>Pourquoi ces tarifs ?</strong> Le Valais utilise VSTax avec un barème fiscal parmi les plus avantageux de Suisse.
              La simplicité relative du système cantonal permet des tarifs compétitifs.
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
                Pourquoi choisir NeoFidu pour vos impôts valaisans ?
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
              <h3 className="text-2xl font-bold mb-4">Spécificités valaisannes</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Taux bas</strong> : parmi les plus avantageux de Suisse</li>
                <li>• <strong>VSTax</strong> : logiciel cantonal obligatoire</li>
                <li>• <strong>Résidences secondaires</strong> : valeur locative spécifique</li>
                <li>• <strong>Bilingue</strong> : Haut-Valais germanophone</li>
                <li>• <strong>Tourisme</strong> : fiscalité adaptée aux locations saisonnières</li>
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
            Du Chablais valaisan au Haut-Valais, de la plaine aux stations de montagne,
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
              + toutes les communes valaisannes
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Profitez de la fiscalité valaisanne
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Confiez votre déclaration d'impôts à nos experts valaisans.
            Service rapide, tarifs transparents, optimisation garantie.
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
                Simuler mes impôts
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
