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
  Watch,
  Train
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function NeuchatelPage() {
  const { isEnglish } = useLanguage();

  const communes = [
    "Neuchâtel", "La Chaux-de-Fonds", "Le Locle", "Val-de-Travers", "Boudry",
    "Milvignes", "Val-de-Ruz", "Peseux", "Corcelles-Cormondrèche", "Hauterive",
    "Saint-Blaise", "Bevaix", "Cortaillod", "La Tène", "Colombier"
  ];

  const services = [
    {
      icon: Users,
      title: isEnglish ? "Individuals" : "Particuliers",
      description: isEnglish
        ? "Complete tax return for Neuchâtel residents, employees and families."
        : "Déclaration d'impôts complète pour résidents neuchâtelois, salariés et familles.",
      price: isEnglish ? "From CHF 50.-" : "Dès CHF 50.-"
    },
    {
      icon: Watch,
      title: isEnglish ? "Watch industry" : "Industrie horlogère",
      description: isEnglish
        ? "Services adapted to employees and executives in the Neuchâtel watch sector."
        : "Services adaptés aux employés et cadres du secteur horloger neuchâtelois.",
      price: isEnglish ? "From CHF 70.-" : "Dès CHF 70.-"
    },
    {
      icon: Building2,
      title: isEnglish ? "Businesses" : "Entreprises",
      description: isEnglish
        ? "Accounting and taxation for SMEs and self-employed in the canton."
        : "Comptabilité et fiscalité pour PME et indépendants du canton.",
      price: isEnglish ? "On quote" : "Sur devis"
    }
  ];

  const deadlines = [
    {
      date: isEnglish ? "March 31, 2026" : "31 mars 2026",
      description: isEnglish ? "Regular filing deadline" : "Délai ordinaire de dépôt"
    },
    {
      date: isEnglish ? "June 30, 2026" : "30 juin 2026",
      description: isEnglish ? "Free extension" : "Prolongation gratuite"
    },
    {
      date: isEnglish ? "September 30, 2026" : "30 septembre 2026",
      description: isEnglish ? "Paid extension" : "Prolongation payante"
    },
  ];

  const advantages = isEnglish ? [
    "Knowledge of the Neuchâtel economic fabric",
    "Expertise for the watch industry",
    "Perfect mastery of NeTax",
    "Optimization of transport costs",
    "Management of extension requests",
    "Advice adapted to French cross-border workers"
  ] : [
    "Connaissance du tissu économique neuchâtelois",
    "Expertise pour l'industrie horlogère",
    "Maîtrise parfaite de NeTax",
    "Optimisation des frais de transport",
    "Gestion des demandes de prolongation",
    "Conseil adapté aux frontaliers français"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Cantons", href: "/cantons" },
              { label: "Neuchâtel" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Fiduciary for<br />
              <span className="text-emerald-300">Canton Neuchâtel</span></>
            ) : (
              <>Fiduciaire pour le<br />
              <span className="text-emerald-300">Canton de Neuchâtel</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "In the heart of watchmaking country, our experts support you from Neuchâtel to La Chaux-de-Fonds with your 2025 tax return."
              : "Au cœur du pays horloger, nos experts vous accompagnent de Neuchâtel à La Chaux-de-Fonds pour votre déclaration d'impôts 2025."}
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

      {/* Industrie horlogère */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {isEnglish ? "Sector expertise" : "Expertise sectorielle"}
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                {isEnglish ? "Watch industry specialists" : "Spécialistes de l'industrie horlogère"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Canton Neuchâtel is the birthplace of Swiss watchmaking. We know the tax specificities of the sector: bonuses, stock options, travel allowances."
                  : "Le canton de Neuchâtel est le berceau de l'horlogerie suisse. Nous connaissons les spécificités fiscales du secteur : bonus, stock-options, indemnités de déplacement."}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Management of bonuses and exceptional premiums" : "Gestion des bonus et primes exceptionnelles"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Declaration of participations and stock options" : "Déclaration des participations et stock-options"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Tax optimization for high incomes" : "Optimisation fiscale pour hauts revenus"}</span>
                </li>
              </ul>
            </div>
            <Card className="p-8 bg-white">
              <Watch className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Watch executives" : "Cadres horlogers"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Rolex, Patek Philippe, TAG Heuer... We support executives from major watch houses with their tax declaration."
                  : "Rolex, Patek Philippe, TAG Heuer... Nous accompagnons les cadres des grandes maisons horlogères dans leur déclaration fiscale."}
              </p>
              <Link href="/demande">
                <Button variant="outline" className="w-full">
                  {isEnglish ? "Request a quote" : "Demander un devis"}
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
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Neuchâtel Tax Deadlines 2026" : "Délais fiscaux Neuchâtel 2026"}
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
        </div>
      </section>

      {/* Transport */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8 bg-white">
              <Train className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Public transport deduction" : "Déduction transports publics"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Canton Neuchâtel allows full deduction of the Onde Verte subscription for public transport. We optimize this deduction."
                  : "Le canton de Neuchâtel permet la déduction intégrale de l'abonnement Onde Verte pour les transports publics. Nous optimisons cette déduction."}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {isEnglish ? "Deductible Onde Verte subscription" : "Abonnement Onde Verte déductible"}</li>
                <li>• {isEnglish ? "Parking costs if necessary" : "Frais de parking si nécessaire"}</li>
                <li>• {isEnglish ? "Car mileage allowances" : "Indemnités kilométriques voiture"}</li>
              </ul>
            </Card>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {isEnglish ? "Our services for Neuchâtel" : "Nos services pour Neuchâtel"}
              </h2>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <Card key={index} className="p-4 flex items-center gap-4">
                    <service.icon className="w-10 h-10 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <span className="text-primary font-semibold text-sm">{service.price}</span>
                  </Card>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>{isEnglish ? "Why these rates?" : "Pourquoi ces tarifs ?"}</strong> {isEnglish
                    ? "Neuchâtel uses a standardized and accessible tax system. Our competitive rates reflect the relative simplicity of processing Neuchâtel files. The exact rate is calculated during your online simulation."
                    : "Neuchâtel utilise un système fiscal standardisé et accessible. Nos tarifs compétitifs reflètent la simplicité relative du traitement des dossiers neuchâtelois. Le tarif exact est calculé lors de votre simulation en ligne."}
                </p>
              </div>
            </div>
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
                  ? "Why choose NeoFidu for your Neuchâtel taxes?"
                  : "Pourquoi choisir NeoFidu pour vos impôts neuchâtelois ?"}
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
                {isEnglish ? "Neuchâtel specificities" : "Spécificités neuchâteloises"}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>NeTax</strong> : {isEnglish ? "official cantonal software" : "logiciel cantonal officiel"}</li>
                <li>• <strong>{isEnglish ? "Transport" : "Transports"}</strong> : {isEnglish ? "Onde Verte deduction" : "déduction Onde Verte"}</li>
                <li>• <strong>{isEnglish ? "Watchmaking" : "Horlogerie"}</strong> : {isEnglish ? "bonuses and premiums expertise" : "expertise bonus et primes"}</li>
                <li>• <strong>{isEnglish ? "Cross-border" : "Frontaliers"}</strong> : {isEnglish ? "region close to France" : "région proche de la France"}</li>
                <li>• <strong>{isEnglish ? "Mobile app" : "Application mobile"}</strong> : {isEnglish ? "receipt scanning" : "scan de justificatifs"}</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Communes Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            {isEnglish ? "We operate throughout the canton" : "Nous intervenons dans tout le canton"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isEnglish
              ? "From the Littoral to the Neuchâtel Mountains, from Neuchâtel to Le Locle, our 100% online service supports you."
              : "Du Littoral aux Montagnes neuchâteloises, de Neuchâtel au Locle, notre service 100% en ligne vous accompagne."}
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
              {isEnglish ? "+ all Neuchâtel municipalities" : "+ toutes les communes neuchâteloises"}
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isEnglish ? "Simplify your Neuchâtel taxes" : "Simplifiez vos impôts neuchâtelois"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Individuals or watchmaking professionals, trust your declaration to our experts. Fast service, transparent pricing."
              : "Particuliers ou professionnels de l'horlogerie, confiez votre déclaration à nos experts. Service rapide, tarifs transparents."}
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
                {isEnglish ? "Simulate my taxes" : "Simuler mes impôts"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
