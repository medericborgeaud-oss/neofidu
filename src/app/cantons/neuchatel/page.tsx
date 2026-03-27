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
  Train,
  TrendingUp,
  Shield,
  HelpCircle
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
  const faqs = isEnglish ? [
    {
      question: "What is the deadline for filing a tax return in Neuchâtel?",
      answer: "The regular deadline is March 31, 2026. A free extension until June 30 is available. A paid extension until September 30 can also be requested."
    },
    {
      question: "How are watch industry bonuses taxed in Neuchâtel?",
      answer: "Bonuses, exceptional premiums, and stock options from watch companies are fully taxable as income. They must be declared in the year they are received. We help optimize your declaration by ensuring all applicable professional deductions are claimed."
    },
    {
      question: "What are the tax rates in Neuchâtel?",
      answer: "Neuchâtel applies a progressive tax system. The combined marginal rate (federal + cantonal + municipal) reaches approximately 38-39% for the highest incomes in the city of Neuchâtel. La Chaux-de-Fonds and Le Locle have slightly different municipal rates. The canton is mid-range for French-speaking Switzerland."
    },
    {
      question: "Can I deduct my Onde Verte subscription?",
      answer: "Yes, the Onde Verte public transport subscription is fully deductible as a professional expense for commuting in Neuchâtel. This applies to all zones covered by your subscription for your home-to-work journey."
    },
    {
      question: "Can I declare my cryptocurrencies in Neuchâtel?",
      answer: "Yes, cryptocurrencies must be declared as miscellaneous movable assets in your Neuchâtel tax return via NeTax. Use the official AFC rate from ICTax or your exchange rate on December 31."
    }
  ] : [
    {
      question: "Quel est le délai pour la déclaration d'impôts à Neuchâtel ?",
      answer: "Le délai ordinaire est le 31 mars 2026. Une prolongation gratuite jusqu'au 30 juin est possible. Une prolongation payante jusqu'au 30 septembre peut également être demandée."
    },
    {
      question: "Comment les bonus horlogers sont-ils imposés à Neuchâtel ?",
      answer: "Les bonus, primes exceptionnelles et stock-options des entreprises horlogères sont entièrement imposables comme revenu. Ils doivent être déclarés l'année de leur perception. Nous aidons à optimiser votre déclaration en s'assurant que toutes les déductions professionnelles applicables sont réclamées."
    },
    {
      question: "Quels sont les taux d'imposition à Neuchâtel ?",
      answer: "Neuchâtel applique un système d'imposition progressif. Le taux marginal combiné (fédéral + cantonal + communal) atteint environ 38-39% pour les revenus les plus élevés en ville de Neuchâtel. La Chaux-de-Fonds et Le Locle ont des taux communaux légèrement différents. Le canton se situe dans la moyenne de la Suisse romande."
    },
    {
      question: "Peut-on déduire son abonnement Onde Verte ?",
      answer: "Oui, l'abonnement de transports publics Onde Verte est entièrement déductible comme frais professionnels pour les trajets domicile-travail à Neuchâtel. Cela s'applique à toutes les zones couvertes par votre abonnement pour votre trajet professionnel."
    },
    {
      question: "Peut-on déclarer ses cryptomonnaies à Neuchâtel ?",
      answer: "Oui, les cryptomonnaies doivent être déclarées dans la fortune mobilière diverse de votre déclaration neuchâteloise via NeTax. Utilisez le cours officiel de l'AFC sur ICTax ou le cours de votre exchange au 31 décembre."
    }
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
              <>Fiduciaire pour le{" "}<br />
              <span className="text-emerald-300">Canton de Neuchâtel</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "In the heart of watchmaking country, our experts support you from Neuchâtel to La Chaux-de-Fonds with your tax return."
              : "Au cœur du pays horloger, nos experts vous accompagnent de Neuchâtel à La Chaux-de-Fonds pour votre déclaration d'impôts."}
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
                  ? "TAG Heuer, Zenith, Girard-Perregaux... We support executives from major watch houses with their tax declaration."
                  : "TAG Heuer, Zenith, Girard-Perregaux... Nous accompagnons les cadres des grandes maisons horlogères dans leur déclaration fiscale."}
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
      {/* Taux d'imposition Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Tax Rates in Neuchâtel 2026" : "Taux d'imposition à Neuchâtel en 2026"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Canton Neuchâtel applies a progressive tax system. The combined marginal rate (federal + cantonal + municipal) reaches approximately 38-39% for the highest incomes in the city of Neuchâtel, placing it in the mid-range of French-speaking Swiss cantons."
                  : "Le canton de Neuchâtel applique un système d'imposition progressif. Le taux marginal combiné (fédéral + cantonal + communal) atteint environ 38-39% pour les revenus les plus élevés en ville de Neuchâtel, ce qui le place dans la moyenne des cantons romands."}
              </p>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Municipal rates vary across the canton. La Chaux-de-Fonds and Le Locle, the two main cities in the Mountains region, have slightly higher municipal coefficients than the Littoral municipalities around Neuchâtel city."
                  : "Les taux communaux varient à travers le canton. La Chaux-de-Fonds et Le Locle, les deux principales villes des Montagnes, ont des coefficients communaux légèrement plus élevés que les communes du Littoral autour de la ville de Neuchâtel."}
              </p>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "For watch industry executives with high incomes, optimizing deductions (pillar 3a, 2nd pillar buybacks, professional expenses) is essential to reduce the effective tax rate."
                  : "Pour les cadres horlogers aux revenus élevés, l'optimisation des déductions (3e pilier, rachats de 2e pilier, frais professionnels) est essentielle pour réduire le taux d'imposition effectif."}
              </p>
            </div>
            <Card className="p-6 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">
                  {isEnglish ? "Compare municipalities" : "Comparez les communes"}
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Use our free simulator to calculate your exact tax burden in any Neuchâtel municipality and compare Littoral vs. Mountains."
                  : "Utilisez notre simulateur gratuit pour calculer votre charge fiscale exacte dans n'importe quelle commune neuchâteloise et comparer Littoral vs. Montagnes."}
              </p>
              <Link href="/simulateur/impots">
                <Button className="w-full">
                  <Calculator className="mr-2 w-4 h-4" />
                  {isEnglish ? "Free tax simulator" : "Simulateur d'impôts gratuit"}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
      {/* Déductions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Main Tax Deductions in Neuchâtel" : "Principales déductions fiscales à Neuchâtel"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Onde Verte subscription" : "Abonnement Onde Verte"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "The Onde Verte public transport subscription is fully deductible as a professional expense for commuting. A significant saving for daily commuters."
                  : "L'abonnement de transports publics Onde Verte est entièrement déductible comme frais professionnels pour les trajets domicile-travail. Une économie significative pour les pendulaires."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Pillar 3a" : "3ème pilier A"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deductible up to CHF 7,258 for employees with a 2nd pillar. Self-employed without pension fund: up to 20% of net income (max CHF 36,288)."
                  : "Déductible jusqu'à CHF 7'258 pour les salariés avec 2e pilier. Indépendants sans caisse de pension : jusqu'à 20% du revenu net (max CHF 36'288)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "2nd pillar buyback" : "Rachat de 2ème pilier"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Fully deductible from taxable income. Especially strategic for watch industry executives with high variable compensation."
                  : "Entièrement déductible du revenu imposable. Particulièrement stratégique pour les cadres horlogers avec des rémunérations variables élevées."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Professional expenses" : "Frais professionnels"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Flat-rate deduction for meals, work tools, and professional clothing. Can be replaced by actual costs if higher and documented."
                  : "Déduction forfaitaire pour les repas, outils de travail et vêtements professionnels. Peut être remplacée par les frais effectifs s'ils sont supérieurs et documentés."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Childcare costs" : "Frais de garde d'enfants"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deduction for third-party childcare costs (daycare, after-school care) for children under 14 up to the cantonal ceiling."
                  : "Déduction des frais de garde par des tiers (crèche, parascolaire) pour les enfants de moins de 14 ans dans la limite du plafond cantonal."}
              </p>
            </Card>
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Complete guide" : "Guide complet"}</h3>
              <p className="text-muted-foreground text-sm mb-3">
                {isEnglish
                  ? "Discover all available deductions for the 2026 tax year."
                  : "Découvrez toutes les déductions disponibles pour l'année fiscale 2026."}
              </p>
              <Link href="/guide/deductions-fiscales" className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                {isEnglish ? "View the guide" : "Voir le guide"}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Card>
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
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Frequently Asked Questions — Taxes in Neuchâtel" : "Questions fréquentes — Impôts à Neuchâtel"}
            </h2>
          </div>
          <div className="space-y-6 max-w-3xl">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Related Content Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Useful guides" : "Guides utiles"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/guide/deductions-fiscales" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Tax deductions 2026" : "Déductions fiscales 2026"}
                  </Link>
                </li>
                <li>
                  <Link href="/blog/impot-source-suisse-guide-complet-2026" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Withholding tax: complete guide" : "Impôt à la source : guide complet"}
                  </Link>
                </li>
                <li>
                  <Link href="/blog/declarer-cryptomonnaies-suisse-guide-2026" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Declaring crypto in Switzerland" : "Déclarer ses cryptomonnaies en Suisse"}
                  </Link>
                </li>
                <li>
                  <Link href="/simulateur/3eme-pilier" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "3rd pillar calculator" : "Simulateur 3ème pilier"}
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
            <div>
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Other cantons" : "Autres cantons"}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/cantons/vaud" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Vaud</Link>
                <Link href="/cantons/geneve" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Genève</Link>
                <Link href="/cantons/fribourg" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Fribourg</Link>
                <Link href="/cantons/valais" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Valais</Link>
                <Link href="/cantons/jura" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Jura</Link>
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
