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
  Mountain,
  Home,
  TrendingUp,
  Shield,
  HelpCircle
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
export default function ValaisPage() {
  const { isEnglish } = useLanguage();
  const communes = [
    "Monthey", "Troistorrents", "Val-d'Illiez", "Champéry", "Collombey-Muraz",
    "Vouvry", "St-Maurice", "Massongex", "Vérossaz",
    "Sion", "Sierre", "Martigny", "Brig-Glis",
    "Nendaz", "Bagnes", "Conthey", "Fully",
    "Savièse", "Ayent", "Zermatt", "Crans-Montana", "Verbier"
  ];
  const services = [
    {
      icon: Users,
      title: isEnglish ? "Individuals" : "Particuliers",
      description: isEnglish
        ? "Complete tax return for Valais residents, employees and families."
        : "Déclaration d'impôts complète pour résidents valaisans, salariés et familles.",
      price: isEnglish ? "From CHF 50.-" : "Dès CHF 50.-"
    },
    {
      icon: Home,
      title: isEnglish ? "Secondary residences" : "Résidences secondaires",
      description: isEnglish
        ? "Specific declaration for owners of chalets and apartments in resort areas."
        : "Déclaration spécifique pour propriétaires de chalets et appartements en station.",
      price: isEnglish ? "From CHF 100.-" : "Dès CHF 100.-"
    },
    {
      icon: Building2,
      title: isEnglish ? "Businesses" : "Entreprises",
      description: isEnglish
        ? "Accounting and taxation for SMEs and self-employed established in Valais."
        : "Comptabilité et fiscalité pour PME et indépendants établis en Valais.",
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
      date: isEnglish ? "December 31, 2026" : "31 décembre 2026",
      description: isEnglish ? "Ultimate deadline with justification" : "Délai ultime avec motif"
    },
  ];
  const advantages = isEnglish ? [
    "In-depth knowledge of Valais taxation",
    "Secondary residence expertise in resort areas",
    "Optimization for real estate income",
    "Perfect mastery of VSTax",
    "Canton-specific pension advice",
    "Bilingual support FR/DE"
  ] : [
    "Connaissance approfondie de la fiscalité valaisanne",
    "Expertise résidences secondaires en station",
    "Optimisation pour les revenus immobiliers",
    "Maîtrise parfaite de VSTax",
    "Conseil en prévoyance adapté au canton",
    "Accompagnement bilingue FR/DE"
  ];
  const faqs = isEnglish ? [
    {
      question: "What is the deadline for filing a tax return in Valais?",
      answer: "The regular deadline is March 31, 2026. An extension until June 30 is available upon request. In justified cases, a further extension until December 31 can be granted — Valais offers one of the longest possible deadlines in Switzerland."
    },
    {
      question: "Is Valais really one of the lowest-taxed cantons?",
      answer: "Yes, Valais offers very competitive tax rates. The combined marginal rate (federal + cantonal + municipal) is around 30-33% for the highest incomes in Sion, significantly lower than Geneva (44.75%) or Vaud (41.5%). The corporate tax rate is also very attractive at approximately 11.9%."
    },
    {
      question: "How is the imputed rental value taxed for chalets in resort areas?",
      answer: "If you own a secondary residence (chalet, apartment) in a Valais resort like Verbier, Zermatt, or Crans-Montana, you must declare the imputed rental value as income. This is calculated based on the property's market rental potential. Maintenance costs and mortgage interest are deductible against this income."
    },
    {
      question: "I rent out my chalet seasonally — how is this taxed?",
      answer: "Seasonal rental income must be declared as income. You can deduct maintenance costs, management fees, insurance, and mortgage interest. If your actual rental income exceeds the imputed rental value, you declare the actual income instead. We help optimize the declaration to minimize your tax burden."
    },
    {
      question: "Can I declare my cryptocurrencies in Valais?",
      answer: "Yes, cryptocurrencies must be declared as movable assets in your Valais tax return via VSTax. Use the official AFC rate from ICTax or your exchange rate on December 31. With Valais's lower wealth tax rates, crypto holdings are taxed more favorably than in many other cantons."
    }
  ] : [
    {
      question: "Quel est le délai pour la déclaration d'impôts en Valais ?",
      answer: "Le délai ordinaire est le 31 mars 2026. Une prolongation jusqu'au 30 juin est possible sur demande. Dans des cas justifiés, un délai supplémentaire jusqu'au 31 décembre peut être accordé — le Valais offre l'un des délais les plus longs possibles en Suisse."
    },
    {
      question: "Le Valais est-il vraiment l'un des cantons les moins imposés ?",
      answer: "Oui, le Valais offre des taux d'imposition très compétitifs. Le taux marginal combiné (fédéral + cantonal + communal) se situe autour de 30-33% pour les revenus les plus élevés à Sion, nettement inférieur à Genève (44,75%) ou Vaud (41,5%). Le taux d'imposition des entreprises est également très attractif, à environ 11,9%."
    },
    {
      question: "Comment la valeur locative est-elle imposée pour les chalets en station ?",
      answer: "Si vous possédez une résidence secondaire (chalet, appartement) dans une station valaisanne comme Verbier, Zermatt ou Crans-Montana, vous devez déclarer la valeur locative comme revenu. Celle-ci est calculée sur la base du potentiel locatif du bien. Les frais d'entretien et les intérêts hypothécaires sont déductibles de ce revenu."
    },
    {
      question: "Je loue mon chalet en saisonnier — comment est-ce imposé ?",
      answer: "Les revenus de location saisonnière doivent être déclarés comme revenu. Vous pouvez déduire les frais d'entretien, les frais de gérance, l'assurance et les intérêts hypothécaires. Si vos revenus locatifs réels dépassent la valeur locative, vous déclarez les revenus réels. Nous aidons à optimiser la déclaration pour minimiser votre charge fiscale."
    },
    {
      question: "Peut-on déclarer ses cryptomonnaies en Valais ?",
      answer: "Oui, les cryptomonnaies doivent être déclarées dans la fortune mobilière de votre déclaration valaisanne via VSTax. Utilisez le cours officiel de l'AFC sur ICTax ou le cours de votre exchange au 31 décembre. Avec les taux d'impôt sur la fortune plus bas du Valais, les avoirs crypto sont imposés plus favorablement que dans d'autres cantons."
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
              { label: "Valais" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Fiduciary for<br />
              <span className="text-emerald-300">Canton Valais</span></>
            ) : (
              <>Fiduciaire pour le{" "}<br />
              <span className="text-emerald-300">Canton du Valais</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "Online fiduciary specialized for canton Valais. We support Monthey, Sion, Sierre, Martigny and all of Valais with your tax return."
              : "Fiduciaire en ligne spécialisée pour le canton du Valais. Nous accompagnons Monthey, Sion, Sierre, Martigny et tout le Valais pour votre déclaration 2026."}
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
      {/* Fiscalité attractive */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {isEnglish ? "Tax advantage" : "Avantage fiscal"}
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                {isEnglish ? "Among the lowest taxation in Switzerland" : "Une fiscalité parmi les plus basses de Suisse"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Canton Valais offers one of the most advantageous tax rates in Switzerland, for both individuals and businesses. A major asset for your wealth."
                  : "Le canton du Valais offre l'un des taux d'imposition les plus avantageux de Suisse, tant pour les particuliers que pour les entreprises. Un atout majeur pour votre patrimoine."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">11.9%</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Corporate rate" : "Taux entreprises"}
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">~25%</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Average income rate" : "Taux revenu moyen"}
                  </div>
                </Card>
              </div>
            </div>
            <Card className="p-8 bg-white">
              <Mountain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Secondary residences" : "Résidences secondaires"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Owner of a chalet in Verbier, Zermatt or Crans-Montana? We handle the imputed rental value and specific deductions for resort properties."
                  : "Propriétaire d'un chalet à Verbier, Zermatt ou Crans-Montana ? Nous gérons la valeur locative et les déductions spécifiques aux biens en station."}
              </p>
              <Link href="/demande">
                <Button variant="outline" className="w-full">
                  {isEnglish ? "Learn more" : "En savoir plus"}
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
              {isEnglish ? "Valais Tax Deadlines 2026" : "Délais fiscaux Valais 2026"}
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
              {isEnglish ? "Tax Rates in Valais 2026" : "Taux d'imposition en Valais en 2026"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Canton Valais is one of the most tax-friendly cantons in Switzerland. The combined marginal rate (federal + cantonal + municipal) ranges from 30% to 33% for the highest incomes depending on the municipality, compared to 41-45% in cantons like Geneva or Vaud."
                  : "Le canton du Valais est l'un des cantons les plus fiscalement avantageux de Suisse. Le taux marginal combiné (fédéral + cantonal + communal) se situe entre 30% et 33% pour les revenus les plus élevés selon la commune, contre 41-45% dans des cantons comme Genève ou Vaud."}
              </p>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "For businesses, the effective corporate tax rate is approximately 11.9%, making Valais highly competitive for company establishment. This has attracted numerous businesses in recent years, particularly in the Sion and Monthey regions."
                  : "Pour les entreprises, le taux d'imposition effectif est d'environ 11,9%, rendant le Valais très compétitif pour l'implantation de sociétés. Cela a attiré de nombreuses entreprises ces dernières années, notamment dans les régions de Sion et Monthey."}
              </p>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "The wealth tax is also moderate. Combined with lower real estate prices than in the Lake Geneva region, Valais offers an excellent overall tax-to-quality-of-life ratio."
                  : "L'impôt sur la fortune est également modéré. Combiné à des prix immobiliers plus bas que dans l'arc lémanique, le Valais offre un excellent rapport fiscalité-qualité de vie."}
              </p>
            </div>
            <Card className="p-6 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">
                  {isEnglish ? "Compare with other cantons" : "Comparez avec les autres cantons"}
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Use our free simulator to calculate your exact tax burden in any Valais municipality and compare with Geneva, Vaud, or other cantons."
                  : "Utilisez notre simulateur gratuit pour calculer votre charge fiscale exacte dans n'importe quelle commune valaisanne et comparer avec Genève, Vaud ou d'autres cantons."}
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
              {isEnglish ? "Main Tax Deductions in Valais" : "Principales déductions fiscales en Valais"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Property maintenance" : "Frais d'entretien immobilier"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Maintenance and renovation costs for your property are deductible. Choose between actual costs or a flat rate (10% for buildings under 10 years, 20% for older buildings)."
                  : "Les frais d'entretien et de rénovation de votre bien immobilier sont déductibles. Choisissez entre les frais effectifs ou un forfait (10% pour les bâtiments de moins de 10 ans, 20% pour les plus anciens)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Imputed rental value" : "Valeur locative"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Secondary residences in resort areas have a specific imputed rental value calculation. Mortgage interest and maintenance costs offset this taxable income."
                  : "Les résidences secondaires en station ont un calcul de valeur locative spécifique. Les intérêts hypothécaires et frais d'entretien compensent ce revenu imposable."}
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
                  ? "Fully deductible from taxable income. Even with Valais's already low rates, buybacks remain a powerful optimization tool for higher incomes."
                  : "Entièrement déductible du revenu imposable. Même avec les taux déjà bas du Valais, les rachats restent un outil d'optimisation puissant pour les revenus élevés."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Childcare costs" : "Frais de garde d'enfants"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deduction for third-party childcare costs (daycare, nanny, after-school care) for children under 14 up to the cantonal ceiling."
                  : "Déduction des frais de garde par des tiers (crèche, nounou, parascolaire) pour les enfants de moins de 14 ans dans la limite du plafond cantonal."}
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
      {/* Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {isEnglish ? "Our services for Canton Valais" : "Nos services pour le Canton du Valais"}
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
                ? "Valais uses VSTax with one of the most advantageous tax scales in Switzerland. The relative simplicity of the cantonal system allows for competitive rates. The exact rate is calculated during your online simulation according to your case complexity."
                : "Le Valais utilise VSTax avec un barème fiscal parmi les plus avantageux de Suisse. La simplicité relative du système cantonal permet des tarifs compétitifs. Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier."}
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
                  ? "Why choose NeoFidu for your Valais taxes?"
                  : "Pourquoi choisir NeoFidu pour vos impôts valaisans ?"}
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
                {isEnglish ? "Valais specificities" : "Spécificités valaisannes"}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>{isEnglish ? "Low rates" : "Taux bas"}</strong> : {isEnglish ? "among the most advantageous in Switzerland" : "parmi les plus avantageux de Suisse"}</li>
                <li>• <strong>VSTax</strong> : {isEnglish ? "mandatory cantonal software" : "logiciel cantonal obligatoire"}</li>
                <li>• <strong>{isEnglish ? "Secondary residences" : "Résidences secondaires"}</strong> : {isEnglish ? "specific imputed rental value" : "valeur locative spécifique"}</li>
                <li>• <strong>{isEnglish ? "Bilingual" : "Bilingue"}</strong> : {isEnglish ? "German-speaking Upper Valais" : "Haut-Valais germanophone"}</li>
                <li>• <strong>{isEnglish ? "Tourism" : "Tourisme"}</strong> : {isEnglish ? "taxation adapted to seasonal rentals" : "fiscalité adaptée aux locations saisonnières"}</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      {/* Communes Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            {isEnglish ? "Expertise for all of Valais" : "Une expertise pour tout le Valais"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isEnglish
              ? "From Monthey to Brig, from the Rhône plain to the highest Alpine resorts, our 100% online service supports you throughout the canton."
              : "De Monthey à Brigue, de la plaine du Rhône aux plus hautes stations alpines, notre service 100% en ligne vous accompagne partout dans le canton."}
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
              {isEnglish ? "+ all Valais municipalities" : "+ toutes les communes valaisannes"}
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
              {isEnglish ? "Frequently Asked Questions — Taxes in Valais" : "Questions fréquentes — Impôts en Valais"}
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
                  <Link href="/blog/creer-entreprise-suisse-2026" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Start a business in Switzerland" : "Créer son entreprise en Suisse"}
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
                <Link href="/cantons/neuchatel" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Neuchâtel</Link>
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
            {isEnglish ? "Take advantage of Valais taxation" : "Profitez de la fiscalité valaisanne"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Trust your tax return to our Valais experts. Fast service, transparent pricing, personalized tax optimization."
              : "Confiez votre déclaration d'impôts à nos experts valaisans. Service rapide, tarifs transparents, optimisation fiscale personnalisée."}
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
