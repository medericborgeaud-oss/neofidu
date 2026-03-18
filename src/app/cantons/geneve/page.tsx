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
  Users
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function GenevePage() {
  const { isEnglish } = useLanguage();

  const communes = [
    "Genève", "Carouge", "Vernier", "Lancy", "Meyrin",
    "Onex", "Thônex", "Versoix", "Grand-Saconnex", "Plan-les-Ouates",
    "Chêne-Bougeries", "Cologny", "Bernex", "Veyrier", "Collonge-Bellerive"
  ];

  const services = [
    {
      icon: Users,
      title: isEnglish ? "Individuals" : "Particuliers",
      description: isEnglish
        ? "Complete tax return for Geneva residents, employees and families."
        : "Déclaration d'impôts complète pour résidents genevois, salariés et familles.",
      price: isEnglish ? "From CHF 50.-" : "Dès CHF 50.-"
    },
    {
      icon: Building2,
      title: isEnglish ? "Businesses" : "Entreprises",
      description: isEnglish
        ? "Accounting and taxation for SMEs and self-employed established in Geneva."
        : "Comptabilité et fiscalité pour PME et indépendants établis à Genève.",
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
      description: isEnglish ? "Extension on request" : "Prolongation sur demande"
    },
    {
      date: isEnglish ? "March 31, 2026" : "31 mars 2026",
      description: isEnglish ? "TOU deadline for cross-border workers" : "Délai TOU frontaliers"
    },
  ];

  const advantages = isEnglish ? [
    "In-depth expertise on quasi-resident status",
    "Perfect mastery of GeTax",
    "Optimization for high incomes",
    "Support for French cross-border workers",
    "Handling of rectification requests",
    "Pension advice (2nd and 3rd pillar)"
  ] : [
    "Expertise pointue sur le statut quasi-résident",
    "Maîtrise parfaite de GeTax",
    "Optimisation pour les hauts revenus",
    "Accompagnement des frontaliers français",
    "Gestion des demandes de rectification",
    "Conseil en prévoyance (2e et 3e pilier)"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Cantons", href: "/cantons" },
              { label: isEnglish ? "Geneva" : "Genève" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Fiduciary for<br />
              <span className="text-emerald-300">Canton Geneva</span></>
            ) : (
              <>Fiduciaire pour le{" "}<br />
              <span className="text-emerald-300">Canton de Genève</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "Geneva tax experts, we support residents and cross-border workers with their 2025 tax return. Quasi-resident status, TOU, tax optimization."
              : "Experts en fiscalité genevoise, nous accompagnons résidents et frontaliers pour leur déclaration d'impôts 2025. Statut quasi-résident, TOU, optimisation fiscale."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/demande">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                {isEnglish ? "Submit my request" : "Déposer ma demande"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/#tarifs">
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
              {isEnglish ? "Geneva Tax Deadlines 2026" : "Délais fiscaux Genève 2026"}
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
            <strong>{isEnglish ? "Cross-border workers:" : "Frontaliers :"}</strong> {isEnglish
              ? "The Subsequent Ordinary Taxation (TOU) request for quasi-resident status must be filed before March 31 of the following year."
              : "La demande de Taxation Ordinaire Ultérieure (TOU) pour le statut quasi-résident doit être déposée avant le 31 mars de l'année suivante."}
          </p>
        </div>
      </section>

      {/* Quasi-résident Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {isEnglish ? "Cross-border expertise" : "Expertise frontaliers"}
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                {isEnglish ? "Quasi-resident status in Geneva" : "Statut quasi-résident à Genève"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "If you work in Geneva and more than 90% of your worldwide income comes from Switzerland, you can benefit from quasi-resident status and access the same deductions as residents."
                  : "Si vous travaillez à Genève et que plus de 90% de vos revenus mondiaux proviennent de Suisse, vous pouvez bénéficier du statut de quasi-résident et accéder aux mêmes déductions que les résidents."}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Pillar 3a contributions deduction" : "Déduction des versements 3e pilier"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "2nd pillar buyback deduction" : "Déduction des rachats 2e pilier"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Transport costs deduction" : "Déduction des frais de transport"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Childcare costs deduction" : "Déduction des frais de garde d'enfants"}</span>
                </li>
              </ul>
            </div>
            <Card className="p-8 bg-white">
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Assess your eligibility" : "Évaluez votre éligibilité"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "We analyze your situation for free to determine if the quasi-resident status is advantageous for you."
                  : "Nous analysons gratuitement votre situation pour déterminer si le statut quasi-résident est avantageux pour vous."}
              </p>
              <Link href="/demande">
                <Button className="w-full">
                  {isEnglish ? "Request a free analysis" : "Demander une analyse gratuite"}
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
          <h2 className="text-3xl font-bold mb-8">
            {isEnglish ? "Our services for Canton Geneva" : "Nos services pour le Canton de Genève"}
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
                ? "Geneva uses GeTax and has unique tax particularities: quasi-resident status for cross-border workers, distinct scales, and many specific deductions. The exact rate is calculated during your online simulation according to your case complexity."
                : "Genève utilise GeTax et présente des particularités fiscales uniques : statut quasi-résident pour frontaliers, barèmes distincts, et nombreuses déductions spécifiques. Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier."}
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
                  ? "Why choose NeoFidu for your Geneva taxes?"
                  : "Pourquoi choisir NeoFidu pour vos impôts genevois ?"}
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
                {isEnglish ? "Geneva specificities" : "Spécificités genevoises"}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>{isEnglish ? "Tax shield" : "Bouclier fiscal"}</strong> : {isEnglish ? "limits wealth taxation" : "limite l'imposition de la fortune"}</li>
                <li>• <strong>GeTax</strong> : {isEnglish ? "official software with e-services" : "logiciel officiel avec e-démarches"}</li>
                <li>• <strong>{isEnglish ? "Quasi-resident" : "Quasi-résident"}</strong> : {isEnglish ? "specific status for cross-border workers" : "statut spécifique pour frontaliers"}</li>
                <li>• <strong>{isEnglish ? "Childcare costs" : "Frais de garde"}</strong> : {isEnglish ? "generous deductions" : "déductions généreuses"}</li>
                <li>• <strong>{isEnglish ? "Source taxation" : "Imposition à la source"}</strong> : {isEnglish ? "rectification possible" : "rectification possible"}</li>
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
              ? "From the City of Geneva to the left bank and right bank municipalities, our 100% online service supports you."
              : "De la Ville de Genève aux communes de la rive gauche et droite, notre service 100% en ligne vous accompagne."}
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
              {isEnglish ? "+ all Geneva municipalities" : "+ toutes les communes genevoises"}
            </span>
          </div>
        </div>
      </section>

      {/* Related Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Related articles */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Useful guides" : "Guides utiles"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog/impot-source-suisse-guide-complet-2026" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Withholding tax: complete guide" : "Impôt à la source : guide complet"}
                  </Link>
                </li>
                <li>
                  <Link href="/guide/deductions-fiscales" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Tax deductions 2026" : "Déductions fiscales 2026"}
                  </Link>
                </li>
                <li>
                  <Link href="/blog/premiere-declaration-impots-suisse-guide" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "First tax return guide" : "Première déclaration d'impôts"}
                  </Link>
                </li>
                <li>
                  <Link href="/tarifs" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "View our pricing" : "Voir nos tarifs"}
                  </Link>
                </li>
              </ul>
            </div>
            {/* Other cantons */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Other cantons" : "Autres cantons"}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/cantons/vaud" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Vaud</Link>
                <Link href="/cantons/fribourg" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Fribourg</Link>
                <Link href="/cantons/valais" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Valais</Link>
                <Link href="/cantons/neuchatel" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Neuchâtel</Link>
                <Link href="/cantons/jura" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Jura</Link>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                {isEnglish
                  ? "Our services are available throughout French-speaking Switzerland."
                  : "Nos services sont disponibles dans toute la Suisse romande."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isEnglish ? "Ready to optimize your Geneva taxes?" : "Prêt à optimiser vos impôts genevois ?"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Residents or cross-border workers, trust your declaration to our experts. Free quasi-resident analysis included."
              : "Résidents ou frontaliers, confiez votre déclaration à nos experts. Analyse quasi-résident gratuite incluse."}
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
