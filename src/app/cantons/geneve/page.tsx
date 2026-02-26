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
  Globe
} from "lucide-react";
import { generateCantonSchema, cantonData } from "@/lib/canton-schema";

const cantonSchema = generateCantonSchema(cantonData.geneve);

export const metadata: Metadata = {
  title: "Fiduciaire Genève | Frontaliers & Quasi-résidents | Dès 149 CHF",
  description: "Fiduciaire spécialisée Genève. Experts frontaliers et quasi-résidents. Déclaration d'impôts, TOU, GeTax. Rive gauche, Rive droite. Délai 31 mars 2026.",
  keywords: "fiduciaire genève, fiduciaire quasi resident geneve, fiduciaire geneve pour frontalier, fiduciaire rive gauche genève, fiduciaire rive droite genève, GeTax, TOU genève",
  openGraph: {
    title: "Fiduciaire Genève | Frontaliers & Quasi-résidents",
    description: "Experts fiscalité genevoise. Frontaliers, quasi-résidents, TOU. Tarifs dès 149 CHF.",
    url: "https://www.neofidu.ch/cantons/geneve",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/geneve",
  },
};

export default function GenevePage() {
  const communes = [
    "Genève", "Carouge", "Vernier", "Lancy", "Meyrin",
    "Onex", "Thônex", "Versoix", "Grand-Saconnex", "Plan-les-Ouates",
    "Chêne-Bougeries", "Cologny", "Bernex", "Veyrier", "Collonge-Bellerive"
  ];

  const services = [
    {
      icon: Users,
      title: "Particuliers",
      description: "Déclaration d'impôts complète pour résidents genevois, salariés et familles.",
      price: "Dès 149 CHF"
    },
    {
      icon: Globe,
      title: "Frontaliers",
      description: "Expertise quasi-résident, TOU et optimisation fiscale pour travailleurs frontaliers.",
      price: "Dès 249 CHF"
    },
    {
      icon: Building2,
      title: "Entreprises",
      description: "Comptabilité et fiscalité pour PME et indépendants établis à Genève.",
      price: "Sur devis"
    }
  ];

  const deadlines = [
    { date: "31 mars 2026", description: "Délai ordinaire de dépôt" },
    { date: "30 juin 2026", description: "Prolongation sur demande" },
    { date: "31 mars 2026", description: "Délai TOU frontaliers" },
  ];

  const advantages = [
    "Expertise pointue sur le statut quasi-résident",
    "Maîtrise parfaite de GeTax",
    "Optimisation pour les hauts revenus",
    "Accompagnement des frontaliers français",
    "Gestion des demandes de rectification",
    "Conseil en prévoyance (2e et 3e pilier)"
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
                { label: "Genève" },
              ]}
              className="mb-6"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Fiduciaire pour le<br />
            <span className="text-emerald-300">Canton de Genève</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Experts en fiscalité genevoise, nous accompagnons résidents et frontaliers
            pour leur déclaration d'impôts 2026. Statut quasi-résident, TOU, optimisation fiscale.
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
            <h2 className="text-3xl font-bold">Délais fiscaux Genève 2026</h2>
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
            <strong>Frontaliers :</strong> La demande de Taxation Ordinaire Ultérieure (TOU) pour le statut quasi-résident
            doit être déposée avant le 31 mars de l'année suivante.
          </p>
        </div>
      </section>

      {/* Quasi-résident Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Expertise frontaliers
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                Statut quasi-résident à Genève
              </h2>
              <p className="text-muted-foreground mb-6">
                Si vous travaillez à Genève et que plus de 90% de vos revenus mondiaux proviennent de Suisse,
                vous pouvez bénéficier du statut de quasi-résident et accéder aux mêmes déductions que les résidents.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Déduction des versements 3e pilier</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Déduction des rachats 2e pilier</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Déduction des frais de transport</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Déduction des frais de garde d'enfants</span>
                </li>
              </ul>
            </div>
            <Card className="p-8 bg-white">
              <h3 className="text-xl font-bold mb-4">Évaluez votre éligibilité</h3>
              <p className="text-muted-foreground mb-6">
                Nous analysons gratuitement votre situation pour déterminer si le statut quasi-résident
                est avantageux pour vous.
              </p>
              <Link href="/demande">
                <Button className="w-full">
                  Demander une analyse gratuite
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Nos services pour le Canton de Genève</h2>
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
              <strong>Pourquoi ces tarifs ?</strong> Genève utilise GeTax et présente des particularités fiscales uniques :
              statut quasi-résident pour frontaliers, barèmes distincts, et nombreuses déductions spécifiques.
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
                Pourquoi choisir NeoFidu pour vos impôts genevois ?
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
              <h3 className="text-2xl font-bold mb-4">Spécificités genevoises</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Bouclier fiscal</strong> : limite l'imposition de la fortune</li>
                <li>• <strong>GeTax</strong> : logiciel officiel avec e-démarches</li>
                <li>• <strong>Quasi-résident</strong> : statut spécifique pour frontaliers</li>
                <li>• <strong>Frais de garde</strong> : déductions généreuses</li>
                <li>• <strong>Imposition à la source</strong> : rectification possible</li>
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
            De la Ville de Genève aux communes de la rive gauche et droite,
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
              + toutes les communes genevoises
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à optimiser vos impôts genevois ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Résidents ou frontaliers, confiez votre déclaration à nos experts.
            Analyse quasi-résident gratuite incluse.
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
