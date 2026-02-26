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
  Tractor,
  TreePine
} from "lucide-react";
import { generateCantonSchema, cantonData } from "@/lib/canton-schema";

const cantonSchema = generateCantonSchema(cantonData.jura);

export const metadata: Metadata = {
  title: "Fiduciaire Jura | Déclaration d'impôts Canton du Jura 2026 - NeoFidu",
  description: "Fiduciaire spécialisée dans le canton du Jura. Déclaration d'impôts pour particuliers, agriculteurs et PME. Delémont, Porrentruy. Délai 31 mars 2026.",
  keywords: "fiduciaire jura, déclaration impôts jura, impôts delémont, fiscalité jura, JuraTax, agriculteurs jura",
  openGraph: {
    title: "Fiduciaire Jura | Déclaration d'impôts Canton du Jura",
    description: "Experts fiscaux pour le canton du Jura. Particuliers, agriculteurs et entreprises.",
    url: "https://www.neofidu.ch/cantons/jura",
  },
};

export default function JuraPage() {
  const communes = [
    "Delémont", "Porrentruy", "Bassecourt", "Courrendlin", "Courroux",
    "Courtételle", "Alle", "Fontenais", "Haute-Sorne", "Val Terbi",
    "Develier", "Saignelégier", "Les Breuleux", "Le Noirmont", "Clos du Doubs"
  ];

  const services = [
    {
      icon: Users,
      title: "Particuliers",
      description: "Déclaration d'impôts complète pour résidents jurassiens, salariés et familles.",
      price: "Dès 149 CHF"
    },
    {
      icon: Tractor,
      title: "Agriculteurs",
      description: "Comptabilité et fiscalité adaptées aux exploitations agricoles jurassiennes.",
      price: "Dès 299 CHF"
    },
    {
      icon: Building2,
      title: "Entreprises",
      description: "Services comptables complets pour PME et artisans du canton.",
      price: "Sur devis"
    }
  ];

  const deadlines = [
    { date: "31 mars 2026", description: "Délai ordinaire de dépôt" },
    { date: "30 juin 2026", description: "Prolongation sur demande" },
    { date: "31 octobre 2026", description: "Délai ultime avec motif" },
  ];

  const advantages = [
    "Expertise du tissu économique jurassien",
    "Spécialisation agriculture et élevage",
    "Maîtrise parfaite de JuraTax",
    "Forfaits adaptés aux exploitants",
    "Canton souple pour les prolongations",
    "Service personnalisé et réactif"
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
                { label: "Jura" },
              ]}
              className="mb-6"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Fiduciaire pour le<br />
            <span className="text-emerald-300">Canton du Jura</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Le plus jeune canton suisse mérite une fiduciaire moderne.
            De Delémont à Porrentruy, nous vous accompagnons pour votre déclaration 2026.
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

      {/* Agriculture */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Expertise sectorielle
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                Spécialistes du monde agricole
              </h2>
              <p className="text-muted-foreground mb-6">
                Le Jura est un canton rural avec une forte tradition agricole.
                Nous maîtrisons les forfaits et régimes fiscaux spécifiques aux exploitations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Comptabilité agricole simplifiée</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Forfaits pour exploitations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Gestion des paiements directs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Successions et transmissions</span>
                </li>
              </ul>
            </div>
            <Card className="p-8 bg-white">
              <Tractor className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Exploitants agricoles</h3>
              <p className="text-muted-foreground mb-4">
                Eleveurs, producteurs laitiers, céréaliers... Nous comprenons votre métier
                et adaptons notre service à vos contraintes saisonnières.
              </p>
              <Link href="/demande">
                <Button variant="outline" className="w-full">
                  Demander un devis agricole
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
            <h2 className="text-3xl font-bold">Délais fiscaux Jura 2026</h2>
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
            <strong>Bon à savoir :</strong> Le canton du Jura est l'un des plus souples
            pour les demandes de prolongation. N'hésitez pas à nous consulter.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Nos services pour le Canton du Jura</h2>
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
              <strong>Pourquoi ces tarifs ?</strong> Le Jura utilise JuraTax avec des spécificités locales (agriculteurs, frontaliers France).
              Le volume de demandes plus faible nécessite une expertise dédiée.
              Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier.
            </p>
          </div>
        </div>
      </section>

      {/* Nature et tourisme */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8 bg-primary/5 border-primary/20">
              <TreePine className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Tourisme et activités de plein air</h3>
              <p className="text-muted-foreground mb-4">
                Le Jura attire de nombreux amateurs de nature. Si vous avez une activité touristique
                (gîte, chambre d'hôtes, ferme équestre), nous gérons votre fiscalité.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Locations saisonnières</li>
                <li>• Agritourisme</li>
                <li>• Activités de loisirs</li>
              </ul>
            </Card>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Pourquoi choisir NeoFidu pour vos impôts jurassiens ?
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
          </div>
        </div>
      </section>

      {/* Spécificités */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Spécificités jurassiennes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>JuraTax</strong> : logiciel cantonal</li>
                <li>• <strong>Prolongations</strong> : canton souple</li>
                <li>• <strong>Agriculture</strong> : forfaits adaptés</li>
              </ul>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>PME</strong> : soutien à l'économie locale</li>
                <li>• <strong>Tourisme</strong> : régimes simplifiés</li>
                <li>• <strong>Frontaliers</strong> : proximité française</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Communes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Nous intervenons dans tout le canton</h2>
          <p className="text-muted-foreground mb-8">
            De Delémont à Porrentruy, des Franches-Montagnes à l'Ajoie,
            notre service 100% en ligne vous accompagne.
          </p>
          <div className="flex flex-wrap gap-3">
            {communes.map((commune) => (
              <span
                key={commune}
                className="px-4 py-2 bg-secondary/50 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {commune}
              </span>
            ))}
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              + toutes les communes jurassiennes
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simplifiez vos impôts jurassiens
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Particuliers, agriculteurs ou entrepreneurs, confiez votre déclaration à nos experts.
            Service adapté au rythme jurassien.
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
