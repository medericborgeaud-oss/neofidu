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
  Briefcase,
  TrendingUp,
  Shield,
  HelpCircle
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
export default function VaudPage() {
  const { isEnglish } = useLanguage();
  const communes = [
    "Leysin", "Aigle", "Les Diablerets", "Ormont-Dessus", "Ormont-Dessous",
    "Villars-sur-Ollon", "Gryon", "Bex", "Ollon", "Lavey-Morcles",
    "Lausanne", "Montreux", "Nyon", "Vevey", "Morges",
    "Yverdon-les-Bains", "Renens", "Pully", "Prilly",
    "Rolle", "Gland", "Payerne", "Echallens"
  ];
  const services = [
    {
      icon: Users,
      title: isEnglish ? "Individuals" : "Particuliers",
      description: isEnglish
        ? "Complete tax return for employees, retirees and families in canton Vaud."
        : "Déclaration d'impôts complète pour salariés, retraités et familles dans le canton de Vaud.",
      price: isEnglish ? "From CHF 50.-" : "Dès CHF 50.-"
    },
    {
      icon: Briefcase,
      title: isEnglish ? "Self-employed" : "Indépendants",
      description: isEnglish
        ? "Accounting and taxation for self-employed and liberal professions in Vaud."
        : "Comptabilité et fiscalité pour indépendants et professions libérales vaudoises.",
      price: isEnglish ? "From CHF 500.-/year" : "Dès CHF 500.-/an"
    },
    {
      icon: Building2,
      title: isEnglish ? "SMEs" : "PME",
      description: isEnglish
        ? "Complete accounting services for companies established in canton Vaud."
        : "Services comptables complets pour les entreprises établies dans le canton de Vaud.",
      price: isEnglish ? "On quote" : "Sur devis"
    }
  ];
  const deadlines = [
    {
      date: isEnglish ? "March 15, 2026" : "15 mars 2026",
      description: isEnglish ? "Regular filing deadline" : "Délai ordinaire de dépôt"
    },
    {
      date: isEnglish ? "June 30, 2026" : "30 juin 2026",
      description: isEnglish ? "Free extension (via VaudTax)" : "Prolongation gratuite (via VaudTax)"
    },
    {
      date: isEnglish ? "September 30, 2026" : "30 septembre 2026",
      description: isEnglish ? "Paid extension (CHF 50.-)" : "Prolongation payante (CHF 50.-)"
    },
  ];
  const advantages = isEnglish ? [
    "In-depth knowledge of Vaud taxation",
    "Expert use of VaudTax",
    "Optimization of cantonal deductions",
    "Management of extension requests",
    "Monitoring of provisional installments",
    "Assistance in case of complaint"
  ] : [
    "Connaissance approfondie de la fiscalité vaudoise",
    "Utilisation experte de VaudTax",
    "Optimisation des déductions cantonales",
    "Gestion des demandes de prolongation",
    "Suivi des acomptes provisionnels",
    "Assistance en cas de réclamation"
  ];
  const faqs = isEnglish ? [
    {
      question: "What is the deadline for filing a tax return in Vaud?",
      answer: "The regular deadline is March 15, 2026 — one of the earliest in Switzerland. A free extension until June 30 is possible via VaudTax. A paid extension (CHF 50) until September 30 can also be requested."
    },
    {
      question: "How does the VaudTax software work?",
      answer: "VaudTax is the mandatory official software for filing tax returns in canton Vaud. It can be downloaded from the canton's website or used online. It guides you through each section of your return and calculates your tax automatically."
    },
    {
      question: "What are the main deductions specific to Vaud?",
      answer: "Canton Vaud offers several specific deductions: a CHF 700 flat-rate bicycle deduction for commuting, generous transport cost caps, professional expense deductions, pillar 3a (up to CHF 7,258), 2nd pillar buybacks, and childcare costs."
    },
    {
      question: "How do provisional installments work in Vaud?",
      answer: "Canton Vaud sends provisional tax bills based on your last known assessment. You pay throughout the year in installments. If your income has changed significantly, you can request an adjustment to avoid a large balance at the end."
    },
    {
      question: "Can I declare my cryptocurrencies in Vaud?",
      answer: "Yes, cryptocurrencies must be declared in the securities appendix of your Vaud tax return. Indicate the name, quantity, rate, and total value for each crypto. Use code 299 'Other assets' to report the total."
    }
  ] : [
    {
      question: "Quel est le délai pour la déclaration d'impôts dans le canton de Vaud ?",
      answer: "Le délai ordinaire est le 15 mars 2026 — l'un des plus courts de Suisse. Une prolongation gratuite jusqu'au 30 juin est possible via VaudTax. Une prolongation payante (CHF 50.-) jusqu'au 30 septembre peut aussi être demandée."
    },
    {
      question: "Comment fonctionne le logiciel VaudTax ?",
      answer: "VaudTax est le logiciel officiel obligatoire pour remplir sa déclaration dans le canton de Vaud. Il peut être téléchargé sur le site du canton ou utilisé en ligne. Il vous guide section par section et calcule automatiquement votre impôt."
    },
    {
      question: "Quelles sont les principales déductions spécifiques à Vaud ?",
      answer: "Le canton de Vaud offre plusieurs déductions spécifiques : un forfait vélo de CHF 700 pour les trajets domicile-travail, des plafonds généreux pour les frais de transport, les frais professionnels, le 3e pilier A (jusqu'à CHF 7'258), les rachats de 2e pilier et les frais de garde."
    },
    {
      question: "Comment fonctionnent les acomptes provisionnels à Vaud ?",
      answer: "Le canton de Vaud envoie des factures provisionnelles basées sur votre dernière taxation connue. Vous payez tout au long de l'année par acomptes. Si vos revenus ont significativement changé, vous pouvez demander un ajustement pour éviter un solde important en fin d'année."
    },
    {
      question: "Peut-on déclarer ses cryptomonnaies dans le canton de Vaud ?",
      answer: "Oui, les cryptomonnaies doivent être déclarées dans l'annexe titres de votre déclaration vaudoise. Indiquez le nom, la quantité, le cours et la valeur totale pour chaque crypto. Utilisez le code 299 « Autres avoirs » pour reporter le total."
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
              { label: "Vaud" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Fiduciary for<br />
              <span className="text-emerald-300">Canton Vaud</span></>
            ) : (
              <>Fiduciaire pour le{" "}<br />
              <span className="text-emerald-300">Canton de Vaud</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "Based in Leysin, we support residents of Chablais, the Ormonts Valley, Aigle, Les Diablerets and all of canton Vaud with their tax return."
              : "Basés à Leysin, nous accompagnons les habitants du Chablais, de la Vallée des Ormonts, d'Aigle, Les Diablerets et de tout le canton de Vaud pour leur déclaration d'impôts."}
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
              {isEnglish ? "Vaud Tax Deadlines 2026" : "Délais fiscaux Vaud 2026"}
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
            <strong>{isEnglish ? "Attention:" : "Attention :"}</strong> {isEnglish
              ? "Canton Vaud has one of the shortest deadlines in French-speaking Switzerland. Don't delay in trusting us with your declaration!"
              : "Le canton de Vaud a l'un des délais les plus courts de Suisse romande. Ne tardez pas à nous confier votre déclaration !"}
          </p>
        </div>
      </section>
      {/* Taux d'imposition Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Tax Rates in Vaud 2026" : "Taux d'imposition dans le canton de Vaud en 2026"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Canton Vaud applies a progressive tax system. The combined marginal tax rate (federal + cantonal + municipal) varies significantly depending on the municipality. In Lausanne, the maximum marginal rate can reach approximately 41.5%, while certain municipalities like Jouxtens-Mézery offer rates below 30%."
                  : "Le canton de Vaud applique un système d'imposition progressif. Le taux marginal combiné (fédéral + cantonal + communal) varie considérablement selon la commune. À Lausanne, le taux marginal maximal peut atteindre environ 41,5%, tandis que certaines communes comme Jouxtens-Mézery offrent des taux inférieurs à 30%."}
              </p>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "The municipal tax rate (called 'coefficient') is applied as a multiplier to the cantonal base tax. This means that choosing your municipality of residence can have a significant impact on your tax bill."
                  : "Le taux communal (appelé « coefficient ») s'applique comme un multiplicateur à l'impôt cantonal de base. Cela signifie que le choix de votre commune de résidence peut avoir un impact significatif sur votre facture fiscale."}
              </p>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "The wealth tax in Vaud is also progressive, ranging from 1‰ to approximately 7.5‰ depending on the level of taxable wealth."
                  : "L'impôt sur la fortune à Vaud est également progressif, allant de 1‰ à environ 7,5‰ selon le niveau de fortune imposable."}
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
                  ? "Use our free tax simulator to calculate your exact tax burden in any Vaud municipality."
                  : "Utilisez notre simulateur gratuit pour calculer votre charge fiscale exacte dans n'importe quelle commune vaudoise."}
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
              {isEnglish ? "Main Tax Deductions in Vaud" : "Principales déductions fiscales dans le canton de Vaud"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Bicycle deduction" : "Forfait vélo"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Vaud is one of the few cantons offering a flat-rate deduction of CHF 700 for bicycle commuting — a unique benefit for eco-friendly taxpayers."
                  : "Vaud est l'un des rares cantons offrant un forfait de CHF 700 pour les trajets à vélo — un avantage unique pour les contribuables éco-responsables."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Transport costs" : "Frais de transport"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deduction of actual costs for public transport or private vehicle (with a cantonal cap of CHF 7,000 for car commuting)."
                  : "Déduction des frais effectifs de transports publics ou de véhicule privé (avec un plafond cantonal de CHF 7'000 pour les trajets en voiture)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Pillar 3a" : "3ème pilier A"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deductible up to CHF 7,258 for employees with a 2nd pillar. For self-employed without pension fund: up to 20% of net income (max CHF 36,288)."
                  : "Déductible jusqu'à CHF 7'258 pour les salariés avec 2e pilier. Pour les indépendants sans caisse de pension : jusqu'à 20% du revenu net (max CHF 36'288)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "2nd pillar buyback" : "Rachat de 2ème pilier"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Fully deductible from taxable income. A particularly effective strategy for higher tax brackets in Vaud's progressive system."
                  : "Entièrement déductible du revenu imposable. Une stratégie particulièrement efficace dans le barème progressif vaudois pour les tranches élevées."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Childcare costs" : "Frais de garde d'enfants"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deduction for third-party childcare costs (daycare, nanny, after-school care) up to the cantonal limit."
                  : "Déduction des frais de garde par des tiers (crèche, nounou, parascolaire) dans la limite du plafond cantonal."}
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
            {isEnglish ? "Our services for Canton Vaud" : "Nos services pour le Canton de Vaud"}
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
                ? "Canton Vaud uses VaudTax, a complex software with many specific deductions. The tight March 15 deadline and the density of requests require reinforced organization. The exact rate is calculated during your online simulation according to your case complexity."
                : "Le canton de Vaud utilise VaudTax, un logiciel complexe avec de nombreuses déductions spécifiques. Le délai serré du 15 mars et la densité des demandes nécessitent une organisation renforcée. Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier."}
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
                  ? "Why choose NeoFidu for your Vaud taxes?"
                  : "Pourquoi choisir NeoFidu pour vos impôts vaudois ?"}
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
                {isEnglish ? "Vaud specificities" : "Spécificités vaudoises"}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>{isEnglish ? "Bicycle deduction" : "Déduction vélo"}</strong> : {isEnglish ? "CHF 700 flat rate" : "700 CHF forfaitaires"}</li>
                <li>• <strong>{isEnglish ? "Transport costs" : "Frais de transport"}</strong> : {isEnglish ? "more generous cantonal cap" : "plafond cantonal plus généreux"}</li>
                <li>• <strong>VaudTax</strong> : {isEnglish ? "mandatory official software" : "logiciel officiel obligatoire"}</li>
                <li>• <strong>{isEnglish ? "Installments" : "Acomptes"}</strong> : {isEnglish ? "provisional payment system" : "système de paiements provisionnels"}</li>
                <li>• <strong>{isEnglish ? "Tax scale" : "Barème"}</strong> : {isEnglish ? "progressive cantonal + municipal rate" : "taux progressif cantonal + communal"}</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      {/* Communes Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            {isEnglish ? "Based in Leysin, we serve the entire canton" : "Basés à Leysin, nous servons tout le canton"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isEnglish
              ? "Our headquarters is in Leysin, in the heart of the Vaud Chablais. We support the residents of Aigle, Les Diablerets, the Ormonts Valley, Villars, Bex, as well as all of canton Vaud."
              : "Notre siège est à Leysin, au cœur du Chablais vaudois. Nous accompagnons les habitants d'Aigle, Les Diablerets, la Vallée des Ormonts, Villars, Bex, ainsi que tout le canton de Vaud."}
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
              {isEnglish ? "+ all Vaud municipalities" : "+ toutes les communes vaudoises"}
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
              {isEnglish ? "Frequently Asked Questions — Taxes in Vaud" : "Questions fréquentes — Impôts dans le canton de Vaud"}
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
                <Link href="/cantons/geneve" className="px-4 py-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">Genève</Link>
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
            {isEnglish ? "Ready to simplify your Vaud taxes?" : "Prêt à simplifier vos impôts vaudois ?"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Trust our experts with your tax return. Fast service, transparent pricing, deadline compliance guaranteed."
              : "Confiez votre déclaration d'impôts à nos experts. Service rapide, tarifs transparents, respect des délais garanti."}
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
                {isEnglish ? "Simulate my VD taxes" : "Simuler mes impôts VD"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
