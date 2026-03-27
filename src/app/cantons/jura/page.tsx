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
  Tractor,
  TreePine,
  TrendingUp,
  Shield,
  HelpCircle
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
export default function JuraPage() {
  const { isEnglish } = useLanguage();
  const communes = [
    "Delémont", "Porrentruy", "Bassecourt", "Courrendlin", "Courroux",
    "Courtételle", "Alle", "Fontenais", "Haute-Sorne", "Val Terbi",
    "Develier", "Saignelégier", "Les Breuleux", "Le Noirmont", "Clos du Doubs"
  ];
  const services = [
    {
      icon: Users,
      title: isEnglish ? "Individuals" : "Particuliers",
      description: isEnglish
        ? "Complete tax return for Jura residents, employees and families."
        : "Déclaration d'impôts complète pour résidents jurassiens, salariés et familles.",
      price: isEnglish ? "From CHF 50.-" : "Dès CHF 50.-"
    },
    {
      icon: Tractor,
      title: isEnglish ? "Farmers" : "Agriculteurs",
      description: isEnglish
        ? "Accounting and taxation adapted to Jura agricultural operations."
        : "Comptabilité et fiscalité adaptées aux exploitations agricoles jurassiennes.",
      price: isEnglish ? "From CHF 150.-" : "Dès CHF 150.-"
    },
    {
      icon: Building2,
      title: isEnglish ? "Businesses" : "Entreprises",
      description: isEnglish
        ? "Complete accounting services for SMEs and craftsmen in the canton."
        : "Services comptables complets pour PME et artisans du canton.",
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
      date: isEnglish ? "October 31, 2026" : "31 octobre 2026",
      description: isEnglish ? "Ultimate deadline with justification" : "Délai ultime avec motif"
    },
  ];
  const advantages = isEnglish ? [
    "Expertise in the Jura economic fabric",
    "Specialization in agriculture and livestock",
    "Perfect mastery of JuraTax",
    "Flat rates adapted to farm operators",
    "Flexible canton for extensions",
    "Personalized and responsive service"
  ] : [
    "Expertise du tissu économique jurassien",
    "Spécialisation agriculture et élevage",
    "Maîtrise parfaite de JuraTax",
    "Forfaits adaptés aux exploitants",
    "Canton souple pour les prolongations",
    "Service personnalisé et réactif"
  ];
  const faqs = isEnglish ? [
    {
      question: "What is the deadline for filing a tax return in Jura?",
      answer: "The regular deadline is March 31, 2026. An extension until June 30 is available upon request. In justified cases, a further extension until October 31 can be granted — Jura is one of the most flexible cantons for deadlines."
    },
    {
      question: "How are farmers taxed in canton Jura?",
      answer: "Farmers in Jura can benefit from simplified flat-rate accounting or full bookkeeping depending on their operation size. Direct payments, livestock income, and land revenue each have specific tax treatments. We specialize in optimizing agricultural declarations."
    },
    {
      question: "What are the tax rates in Jura?",
      answer: "Jura applies a progressive tax system with combined marginal rates (federal + cantonal + municipal) that are moderate compared to other French-speaking cantons. The lower cost of living and competitive rates make Jura attractive for families and retirees."
    },
    {
      question: "Is Jura interesting for cross-border workers?",
      answer: "Yes, Jura borders France (Alsace and Franche-Comté). Cross-border workers are taxed at source in Switzerland. The proximity to France and lower living costs make Jura an interesting option for settling near the border."
    },
    {
      question: "Can I declare my cryptocurrencies in Jura?",
      answer: "Yes, cryptocurrencies must be declared as miscellaneous movable assets in your Jura tax return via JuraTax. Use the official AFC rate from ICTax or your exchange rate on December 31."
    }
  ] : [
    {
      question: "Quel est le délai pour la déclaration d'impôts dans le Jura ?",
      answer: "Le délai ordinaire est le 31 mars 2026. Une prolongation jusqu'au 30 juin est possible sur demande. Dans des cas justifiés, un délai supplémentaire jusqu'au 31 octobre peut être accordé — le Jura est l'un des cantons les plus souples pour les délais."
    },
    {
      question: "Comment les agriculteurs sont-ils imposés dans le canton du Jura ?",
      answer: "Les agriculteurs jurassiens peuvent bénéficier d'une comptabilité forfaitaire simplifiée ou d'une comptabilité complète selon la taille de leur exploitation. Les paiements directs, les revenus d'élevage et les revenus fonciers ont chacun un traitement fiscal spécifique. Nous sommes spécialisés dans l'optimisation des déclarations agricoles."
    },
    {
      question: "Quels sont les taux d'imposition dans le Jura ?",
      answer: "Le Jura applique un système d'imposition progressif avec des taux marginaux combinés (fédéral + cantonal + communal) modérés par rapport aux autres cantons romands. Le coût de la vie plus bas et des taux compétitifs rendent le Jura attractif pour les familles et les retraités."
    },
    {
      question: "Le Jura est-il intéressant pour les frontaliers ?",
      answer: "Oui, le Jura est frontalier avec la France (Alsace et Franche-Comté). Les frontaliers sont imposés à la source en Suisse. La proximité avec la France et le coût de la vie plus bas font du Jura une option intéressante pour s'installer près de la frontière."
    },
    {
      question: "Peut-on déclarer ses cryptomonnaies dans le Jura ?",
      answer: "Oui, les cryptomonnaies doivent être déclarées dans la fortune mobilière diverse de votre déclaration jurassienne via JuraTax. Utilisez le cours officiel de l'AFC sur ICTax ou le cours de votre exchange au 31 décembre."
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
              { label: "Jura" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Fiduciary for<br />
              <span className="text-emerald-300">Canton Jura</span></>
            ) : (
              <>Fiduciaire pour le{" "}<br />
              <span className="text-emerald-300">Canton du Jura</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "The youngest Swiss canton deserves a modern fiduciary. From Delémont to Porrentruy, we support you with your declaration."
              : "Le plus jeune canton suisse mérite une fiduciaire moderne. De Delémont à Porrentruy, nous vous accompagnons pour votre déclaration."}
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
      {/* Agriculture */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {isEnglish ? "Sector expertise" : "Expertise sectorielle"}
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                {isEnglish ? "Agricultural specialists" : "Spécialistes du monde agricole"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Jura is a rural canton with a strong agricultural tradition. We master the flat rates and specific tax regimes for farms."
                  : "Le Jura est un canton rural avec une forte tradition agricole. Nous maîtrisons les forfaits et régimes fiscaux spécifiques aux exploitations."}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Simplified farm accounting" : "Comptabilité agricole simplifiée"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Flat rates for farms" : "Forfaits pour exploitations"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Direct payment management" : "Gestion des paiements directs"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{isEnglish ? "Successions and transfers" : "Successions et transmissions"}</span>
                </li>
              </ul>
            </div>
            <Card className="p-8 bg-white">
              <Tractor className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Farm operators" : "Exploitants agricoles"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Livestock farmers, dairy producers, cereal growers... We understand your profession and adapt our service to your seasonal constraints."
                  : "Eleveurs, producteurs laitiers, céréaliers... Nous comprenons votre métier et adaptons notre service à vos contraintes saisonnières."}
              </p>
              <Link href="/demande">
                <Button variant="outline" className="w-full">
                  {isEnglish ? "Request a farm quote" : "Demander un devis agricole"}
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
              {isEnglish ? "Jura Tax Deadlines 2026" : "Délais fiscaux Jura 2026"}
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
            <strong>{isEnglish ? "Good to know:" : "Bon à savoir :"}</strong> {isEnglish
              ? "Canton Jura is one of the most flexible for extension requests. Don't hesitate to contact us."
              : "Le canton du Jura est l'un des plus souples pour les demandes de prolongation. N'hésitez pas à nous consulter."}
          </p>
        </div>
      </section>
      {/* Taux d'imposition Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Tax Rates in Jura 2026" : "Taux d'imposition dans le Jura en 2026"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Canton Jura applies a progressive tax system with moderate rates compared to other French-speaking cantons. The combined marginal rate (federal + cantonal + municipal) is around 36-38% for the highest income brackets in Delémont, making it more competitive than Geneva or Vaud."
                  : "Le canton du Jura applique un système d'imposition progressif avec des taux modérés par rapport aux autres cantons romands. Le taux marginal combiné (fédéral + cantonal + communal) se situe autour de 36-38% pour les tranches de revenus les plus élevées à Delémont, ce qui le rend plus compétitif que Genève ou Vaud."}
              </p>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Combined with a significantly lower cost of living (especially real estate), Jura offers an attractive overall tax-to-lifestyle ratio. This is particularly true for families, retirees, and remote workers who can take advantage of lower housing costs while benefiting from competitive tax rates."
                  : "Combiné à un coût de la vie nettement plus bas (surtout l'immobilier), le Jura offre un rapport fiscalité-qualité de vie attractif. C'est particulièrement vrai pour les familles, les retraités et les télétravailleurs qui peuvent profiter de logements plus abordables tout en bénéficiant de taux d'imposition compétitifs."}
              </p>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "Agricultural operators benefit from specific flat-rate regimes that can significantly reduce their tax burden compared to standard self-employment taxation."
                  : "Les exploitants agricoles bénéficient de régimes forfaitaires spécifiques qui peuvent réduire significativement leur charge fiscale par rapport à l'imposition standard des indépendants."}
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
                  ? "Use our free simulator to calculate your exact tax burden in any Jura municipality and compare with other cantons."
                  : "Utilisez notre simulateur gratuit pour calculer votre charge fiscale exacte dans n'importe quelle commune jurassienne et comparer avec les autres cantons."}
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
              {isEnglish ? "Main Tax Deductions in Jura" : "Principales déductions fiscales dans le Jura"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Agricultural flat rates" : "Forfaits agricoles"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Simplified accounting for farms with specific flat rates for livestock, dairy, and crop operations. Significantly reduces administrative burden."
                  : "Comptabilité simplifiée pour les exploitations avec des forfaits spécifiques pour l'élevage, la production laitière et les cultures. Réduit significativement la charge administrative."}
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
                  ? "Fully deductible from taxable income. An effective strategy especially for self-employed and farmers approaching retirement."
                  : "Entièrement déductible du revenu imposable. Une stratégie efficace surtout pour les indépendants et agriculteurs approchant de la retraite."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Childcare costs" : "Frais de garde d'enfants"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deduction for third-party childcare costs (daycare, nanny, after-school care) up to the cantonal limit per child."
                  : "Déduction des frais de garde par des tiers (crèche, nounou, parascolaire) dans la limite du plafond cantonal par enfant."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Property maintenance" : "Frais d'entretien immobilier"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Maintenance and renovation costs for your property are deductible. You can choose between actual costs or a flat rate of 10-20% of rental value."
                  : "Les frais d'entretien et de rénovation de votre bien immobilier sont déductibles. Vous pouvez choisir entre les frais effectifs ou un forfait de 10-20% de la valeur locative."}
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
            {isEnglish ? "Our services for Canton Jura" : "Nos services pour le Canton du Jura"}
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
                ? "Jura uses JuraTax with local specificities (farmers, French cross-border workers). The lower volume of requests requires dedicated expertise. The exact rate is calculated during your online simulation according to your case complexity."
                : "Le Jura utilise JuraTax avec des spécificités locales (agriculteurs, frontaliers France). Le volume de demandes plus faible nécessite une expertise dédiée. Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier."}
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
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? "Tourism and outdoor activities" : "Tourisme et activités de plein air"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Jura attracts many nature lovers. If you have a tourism activity (gîte, B&B, equestrian farm), we manage your taxation."
                  : "Le Jura attire de nombreux amateurs de nature. Si vous avez une activité touristique (gîte, chambre d'hôtes, ferme équestre), nous gérons votre fiscalité."}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {isEnglish ? "Seasonal rentals" : "Locations saisonnières"}</li>
                <li>• {isEnglish ? "Agritourism" : "Agritourisme"}</li>
                <li>• {isEnglish ? "Leisure activities" : "Activités de loisirs"}</li>
              </ul>
            </Card>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {isEnglish
                  ? "Why choose NeoFidu for your Jura taxes?"
                  : "Pourquoi choisir NeoFidu pour vos impôts jurassiens ?"}
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
            <h3 className="text-2xl font-bold mb-4 text-center">
              {isEnglish ? "Jura specificities" : "Spécificités jurassiennes"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>JuraTax</strong> : {isEnglish ? "cantonal software" : "logiciel cantonal"}</li>
                <li>• <strong>{isEnglish ? "Extensions" : "Prolongations"}</strong> : {isEnglish ? "flexible canton" : "canton souple"}</li>
                <li>• <strong>{isEnglish ? "Agriculture" : "Agriculture"}</strong> : {isEnglish ? "adapted flat rates" : "forfaits adaptés"}</li>
              </ul>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>{isEnglish ? "SMEs" : "PME"}</strong> : {isEnglish ? "local economy support" : "soutien à l'économie locale"}</li>
                <li>• <strong>{isEnglish ? "Tourism" : "Tourisme"}</strong> : {isEnglish ? "simplified regimes" : "régimes simplifiés"}</li>
                <li>• <strong>{isEnglish ? "Cross-border" : "Frontaliers"}</strong> : {isEnglish ? "French proximity" : "proximité française"}</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>
      {/* Communes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            {isEnglish ? "We operate throughout the canton" : "Nous intervenons dans tout le canton"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isEnglish
              ? "From Delémont to Porrentruy, from Franches-Montagnes to Ajoie, our 100% online service supports you."
              : "De Delémont à Porrentruy, des Franches-Montagnes à l'Ajoie, notre service 100% en ligne vous accompagne."}
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
              {isEnglish ? "+ all Jura municipalities" : "+ toutes les communes jurassiennes"}
            </span>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Frequently Asked Questions — Taxes in Jura" : "Questions fréquentes — Impôts dans le Jura"}
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
      <section className="py-16 bg-white">
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
                <Link href="/cantons/vaud" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Vaud</Link>
                <Link href="/cantons/geneve" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Genève</Link>
                <Link href="/cantons/fribourg" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Fribourg</Link>
                <Link href="/cantons/valais" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Valais</Link>
                <Link href="/cantons/neuchatel" className="px-4 py-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">Neuchâtel</Link>
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
            {isEnglish ? "Simplify your Jura taxes" : "Simplifiez vos impôts jurassiens"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Individuals, farmers or entrepreneurs, trust your declaration to our experts. Service adapted to the Jura rhythm."
              : "Particuliers, agriculteurs ou entrepreneurs, confiez votre déclaration à nos experts. Service adapté au rythme jurassien."}
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
