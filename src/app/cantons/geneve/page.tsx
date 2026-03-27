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
  TrendingUp,
  Shield,
  HelpCircle
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
  const faqs = isEnglish ? [
    {
      question: "What is the deadline for filing a tax return in Geneva?",
      answer: "The regular deadline is March 31, 2026. An extension until June 30 is possible upon request via GeTax or e-démarches."
    },
    {
      question: "What is the quasi-resident status in Geneva?",
      answer: "The quasi-resident status allows cross-border workers taxed at source to request ordinary taxation (TOU) if at least 90% of their worldwide income comes from Switzerland. This grants the same deductions as Geneva residents, including 3rd pillar, 2nd pillar buybacks, and professional expenses."
    },
    {
      question: "How does the Geneva tax shield work?",
      answer: "The tax shield limits the total tax burden (income + wealth) to a percentage of the taxpayer's net income. This mechanism is particularly advantageous for individuals with high net worth but moderate income."
    },
    {
      question: "Is it worth requesting quasi-resident status?",
      answer: "It depends on your situation. If your deductions (3rd pillar, buybacks, transport costs, childcare) exceed the flat-rate deduction already applied to your source tax, the TOU is advantageous. We offer a free analysis to evaluate your case."
    },
    {
      question: "Can I declare my cryptocurrencies in Geneva?",
      answer: "Yes, cryptocurrencies must be declared as wealth in your Geneva tax return via GeTax. Use the official rate from ICTax or your exchange rate on December 31."
    }
  ] : [
    {
      question: "Quel est le délai pour la déclaration d'impôts à Genève ?",
      answer: "Le délai ordinaire est le 31 mars 2026. Une prolongation jusqu'au 30 juin est possible sur demande via GeTax ou e-démarches."
    },
    {
      question: "Qu'est-ce que le statut quasi-résident à Genève ?",
      answer: "Le statut quasi-résident permet aux frontaliers imposés à la source de demander une taxation ordinaire (TOU) s'ils réalisent au moins 90% de leurs revenus mondiaux en Suisse. Cela ouvre droit aux mêmes déductions que les résidents genevois, y compris le 3e pilier, les rachats de 2e pilier et les frais professionnels."
    },
    {
      question: "Comment fonctionne le bouclier fiscal genevois ?",
      answer: "Le bouclier fiscal limite la charge fiscale totale (revenu + fortune) à un pourcentage du revenu net du contribuable. Ce mécanisme est particulièrement avantageux pour les patrimoines élevés avec des revenus modérés."
    },
    {
      question: "Est-ce que le statut quasi-résident vaut le coup ?",
      answer: "Cela dépend de votre situation. Si vos déductions (3e pilier, rachats, frais de transport, garde d'enfants) dépassent la déduction forfaitaire déjà appliquée à votre impôt à la source, la TOU est avantageuse. Nous offrons une analyse gratuite pour évaluer votre cas."
    },
    {
      question: "Peut-on déclarer ses cryptomonnaies à Genève ?",
      answer: "Oui, les cryptomonnaies doivent être déclarées dans la fortune via GeTax. Utilisez le cours officiel publié par l'AFC sur ICTax ou le cours de votre exchange au 31 décembre."
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
              ? "Geneva tax experts, we support residents and cross-border workers with their 2026 tax return. Quasi-resident status, TOU, tax optimization."
              : "Experts en fiscalité genevoise, nous accompagnons résidents et frontaliers pour leur déclaration d'impôts 2026. Statut quasi-résident, TOU, optimisation fiscale."}
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
      {/* Taux d'imposition Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Tax Rates in Geneva 2026" : "Taux d'imposition à Genève en 2026"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "The Canton of Geneva applies a progressive tax system. The maximum combined marginal rate (federal + cantonal + municipal) can reach approximately 44.75% for the highest incomes in the City of Geneva, making it one of the highest-taxed cantons in Switzerland."
                  : "Le canton de Genève applique un système d'imposition progressif. Le taux marginal maximal combiné (fédéral + cantonal + communal) peut atteindre environ 44,75% pour les revenus les plus élevés en Ville de Genève, ce qui en fait l'un des cantons les plus taxés de Suisse."}
              </p>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "However, Geneva offers a tax shield: the combined income and wealth tax cannot exceed a certain percentage of net income. This mechanism protects taxpayers with high wealth but moderate income."
                  : "Cependant, Genève offre un bouclier fiscal : l'impôt sur la fortune et le revenu combinés ne peut pas dépasser un certain pourcentage du revenu net. Ce mécanisme protège les contribuables à forte fortune mais revenus modérés."}
              </p>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "For cross-border workers taxed at source, the rate depends on their gross income and family situation (single, married, with or without children)."
                  : "Pour les frontaliers imposés à la source, le taux dépend de leur revenu brut et de leur situation familiale (célibataire, marié, avec ou sans enfants)."}
              </p>
            </div>
            <Card className="p-6 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">
                  {isEnglish ? "Estimate your taxes" : "Estimez vos impôts"}
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Use our free tax simulator to calculate your exact tax burden in Geneva, municipality by municipality."
                  : "Utilisez notre simulateur gratuit pour calculer votre charge fiscale exacte à Genève, commune par commune."}
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
      {/* Déductions spécifiques Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Main Tax Deductions in Geneva" : "Principales déductions fiscales à Genève"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Transport costs" : "Frais de transport"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deduction of actual or flat-rate costs for commuting to work (public transport or private vehicle, with a cantonal cap)."
                  : "Déduction des frais effectifs ou forfaitaires pour le trajet domicile-travail (transports publics ou véhicule privé, avec un plafond cantonal)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Childcare costs" : "Frais de garde d'enfants"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Geneva is one of the most generous cantons: deduction up to CHF 25,000 per child per year for third-party childcare."
                  : "Genève est l'un des cantons les plus généreux : déduction jusqu'à CHF 25'000 par enfant et par an pour la garde par des tiers."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Pillar 3a" : "3ème pilier A"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deductible up to CHF 7,258 (employed with 2nd pillar) or 20% of net income for self-employed."
                  : "Déductible jusqu'à CHF 7'258 (salariés affiliés à un 2e pilier) ou 20% du revenu net pour les indépendants."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "2nd pillar buyback" : "Rachat de 2ème pilier"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Fully deductible from taxable income — a very effective strategy for high Geneva incomes."
                  : "Entièrement déductible du revenu imposable — stratégie très efficace pour les hauts revenus genevois."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Continuing education" : "Formation continue"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deduction up to CHF 12,000 for professional development costs."
                  : "Déduction jusqu'à CHF 12'000 pour les frais de perfectionnement professionnel."}
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
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Frequently Asked Questions — Taxes in Geneva" : "Questions fréquentes — Impôts à Genève"}
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
                  <Link href="/blog/declarer-cryptomonnaies-suisse-guide-2026" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Declaring crypto in Switzerland" : "Déclarer ses cryptomonnaies en Suisse"}
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
                <Link href="/cantons/vaud" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Vaud</Link>
                <Link href="/cantons/fribourg" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Fribourg</Link>
                <Link href="/cantons/valais" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Valais</Link>
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
