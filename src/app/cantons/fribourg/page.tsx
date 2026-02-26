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
  Baby
} from "lucide-react";
import { generateCantonSchema, cantonData } from "@/lib/canton-schema";

const cantonSchema = generateCantonSchema(cantonData.fribourg);

export const metadata: Metadata = {
  title: "Fiduciaire Fribourg | Déclaration d'impôts Canton de Fribourg 2026 - NeoFidu",
  description: "Fiduciaire spécialisée dans le canton de Fribourg. Déclaration d'impôts pour particuliers et familles. Déductions familiales avantageuses. Délai 31 mars 2026.",
  keywords: "fiduciaire fribourg, déclaration impôts fribourg, impôts bulle, fiscalité fribourg, FriTax, déductions famille fribourg",
  openGraph: {
    title: "Fiduciaire Fribourg | Déclaration d'impôts Canton de Fribourg",
    description: "Profitez des déductions familiales fribourgeoises. Experts locaux, tarifs transparents.",
    url: "https://www.neofidu.ch/cantons/fribourg",
  },
};

export default function FribourgPage() {
  const communes = [
    "Fribourg", "Bulle", "Villars-sur-Glâne", "Marly", "Granges-Paccot",
    "Givisiez", "Düdingen", "Estavayer-le-Lac", "Romont", "Châtel-Saint-Denis",
    "Morat", "Kerzers", "Schmitten", "Wünnewil-Flamatt", "Courtepin"
  ];

  const services = [
    {
      icon: Users,
      title: "Particuliers",
      description: "Déclaration d'impôts complète pour résidents fribourgeois, salariés et retraités.",
      price: "Dès 149 CHF"
    },
    {
      icon: Baby,
      title: "Familles",
      description: "Optimisation des déductions familiales généreuses du canton de Fribourg.",
      price: "Dès 179 CHF"
    },
    {
      icon: Building2,
      title: "Entreprises",
      description: "Comptabilité et fiscalité pour PME et indépendants établis à Fribourg.",
      price: "Sur devis"
    }
  ];

  const deadlines = [
    { date: "31 mars 2026", description: "Délai ordinaire de dépôt" },
    { date: "30 juin 2026", description: "Prolongation sur demande" },
    { date: "30 septembre 2026", description: "Prolongation exceptionnelle" },
  ];

  const advantages = [
    "Expertise des déductions familiales fribourgeoises",
    "Maîtrise parfaite de FriTax",
    "Service bilingue français/allemand",
    "Optimisation pour les familles nombreuses",
    "Connaissance des spécificités cantonales",
    "Accompagnement personnalisé"
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
              { label: "Fribourg" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Fiduciaire pour le<br />
            <span className="text-emerald-300">Canton de Fribourg</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Canton bilingue aux déductions familiales généreuses. Nos experts vous accompagnent
            de Fribourg à Bulle pour votre déclaration d'impôts 2026.
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

      {/* Avantage familles */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Avantage fiscal
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                Le canton le plus généreux pour les familles
              </h2>
              <p className="text-muted-foreground mb-6">
                Fribourg offre des déductions particulièrement avantageuses pour les familles avec enfants.
                Frais de garde, déductions par enfant, soutien aux familles monoparentales.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">10'000 CHF</div>
                  <div className="text-sm text-muted-foreground">Frais de garde max/enfant</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">9'000 CHF</div>
                  <div className="text-sm text-muted-foreground">Déduction par enfant</div>
                </Card>
              </div>
            </div>
            <Card className="p-8 bg-white">
              <Baby className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Familles nombreuses</h3>
              <p className="text-muted-foreground mb-4">
                Plus vous avez d'enfants, plus les déductions sont importantes.
                Nous optimisons chaque franc pour maximiser vos économies d'impôts.
              </p>
              <Link href="/demande">
                <Button variant="outline" className="w-full">
                  Calculer mes déductions
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
            <h2 className="text-3xl font-bold">Délais fiscaux Fribourg 2026</h2>
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
          <h2 className="text-3xl font-bold mb-8">Nos services pour le Canton de Fribourg</h2>
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
              <strong>Pourquoi ces tarifs ?</strong> Fribourg utilise FriTax, un logiciel intuitif et bien structuré.
              Cette simplicité nous permet de proposer des tarifs parmi les plus compétitifs de Suisse romande.
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
                Pourquoi choisir NeoFidu pour vos impôts fribourgeois ?
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
              <h3 className="text-2xl font-bold mb-4">Spécificités fribourgeoises</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Familles</strong> : déductions parmi les plus généreuses</li>
                <li>• <strong>FriTax</strong> : logiciel cantonal bilingue</li>
                <li>• <strong>Frais de garde</strong> : jusqu'à 10'000 CHF/enfant</li>
                <li>• <strong>Bilingue</strong> : français et allemand</li>
                <li>• <strong>Formation</strong> : déductions pour études</li>
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
            De la ville de Fribourg à la Gruyère, du district du Lac à la Singine,
            notre service 100% en ligne vous accompagne en français et en allemand.
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
              + toutes les communes fribourgeoises
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Optimisez vos impôts fribourgeois
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Familles, particuliers ou entreprises, confiez votre déclaration à nos experts.
            Service bilingue, tarifs transparents.
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
