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
  Baby,
  TrendingUp,
  Shield,
  HelpCircle
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
export function FribourgContent({ forceEn = false }: { forceEn?: boolean }) {
  const { isEnglish: ctxIsEnglish } = useLanguage();
  const isEnglish = forceEn || ctxIsEnglish;
  const communes = [
    "Fribourg", "Bulle", "Villars-sur-Glâne", "Marly", "Granges-Paccot",
    "Givisiez", "Düdingen", "Estavayer-le-Lac", "Romont", "Châtel-Saint-Denis",
    "Morat", "Kerzers", "Schmitten", "Wünnewil-Flamatt", "Courtepin"
  ];
  const services = [
    {
      icon: Users,
      title: isEnglish ? "Individuals" : "Particuliers",
      description: isEnglish
        ? "Complete tax return for Fribourg residents, employees and retirees."
        : "Déclaration d'impôts complète pour résidents fribourgeois, salariés et retraités.",
      price: isEnglish ? "From CHF 89.-" : "Dès CHF 89.-"
    },
    {
      icon: Building2,
      title: isEnglish ? "Businesses" : "Entreprises",
      description: isEnglish
        ? "Accounting and taxation for SMEs and self-employed established in Fribourg."
        : "Comptabilité et fiscalité pour PME et indépendants établis à Fribourg.",
      price: isEnglish ? "On quote" : "Sur devis"
    }
  ];
  const deadlines = [
    {
      date: isEnglish ? "March 31, 2027" : "31 mars 2027",
      description: isEnglish ? "Regular filing deadline (2026 return)" : "Délai ordinaire de dépôt (déclaration 2026)"
    },
    {
      date: isEnglish ? "June 30, 2027" : "30 juin 2027",
      description: isEnglish ? "First extension by paying CHF 20 with the enclosed QR bill" : "Première prolongation en payant CHF 20 avec la QR-facture jointe"
    },
    {
      date: isEnglish ? "December 15, 2027" : "15 décembre 2027",
      description: isEnglish ? "Latest possible deadline (up to 4 extensions at CHF 20 each)" : "Délai ultime (jusqu'à 4 prolongations à CHF 20 chacune)"
    },
  ];
  const advantages = isEnglish ? [
    "Expertise in Fribourg family deductions",
    "Perfect mastery of FriTax",
    "Bilingual French/German service",
    "Optimization for large families",
    "Knowledge of cantonal specificities",
    "Personalized support"
  ] : [
    "Expertise des déductions familiales fribourgeoises",
    "Maîtrise parfaite de FriTax",
    "Service bilingue français/allemand",
    "Optimisation pour les familles nombreuses",
    "Connaissance des spécificités cantonales",
    "Accompagnement personnalisé"
  ];
  const faqs = isEnglish ? [
    {
      question: "What is the deadline for filing a tax return in Fribourg?",
      answer: "For the 2026 return, the deadline is the date printed on page 1, normally March 31, 2027. Paying CHF 20 with the enclosed QR bill moves it to June 30, with no written request. Further CHF 20 extensions to August 31, October 31 and December 15 are possible; no extension is granted beyond December 15."
    },
    {
      question: "Is Fribourg really advantageous for families?",
      answer: "Fribourg taxes couples and single-parent families with full splitting (the rate for 50% of their income). Childcare costs are deductible up to CHF 12,000 per child under 14, and the social deduction per child is CHF 8,600 (CHF 9,600 from the third child), reduced for higher incomes."
    },
    {
      question: "How does the FriTax software work?",
      answer: "FriTax is the free program of the Fribourg cantonal tax service, in French and German. You install it on Windows, macOS or Linux (there is no browser or tablet version), then file electronically with the 6-character FriTax code printed on your return folder. Our step-by-step FriTax guide explains every section."
    },
    {
      question: "What are the tax rates in Fribourg?",
      answer: "Fribourg applies a progressive tax system. The combined marginal rate (federal + cantonal + municipal) varies by municipality. The city of Fribourg has rates comparable to the Swiss average, while some rural municipalities offer significantly lower rates."
    },
    {
      question: "Can I declare my cryptocurrencies in Fribourg?",
      answer: "Yes, cryptocurrencies are declared in the FriTax securities list (schedule 01), one line per currency, at the official Federal Tax Administration rate (ICTax) on December 31, otherwise the platform's rate."
    }
  ] : [
    {
      question: "Quel est le délai pour la déclaration d'impôts dans le canton de Fribourg ?",
      answer: "Pour la déclaration 2026, le délai est la date imprimée en page 1, en principe le 31 mars 2027. En payant CHF 20 avec la QR-facture jointe, il passe au 30 juin, sans demande écrite. D'autres prolongations à CHF 20 sont possibles au 31 août, au 31 octobre et au 15 décembre ; aucune au-delà du 15 décembre."
    },
    {
      question: "Le canton de Fribourg est-il avantageux pour les familles ?",
      answer: "Le canton de Fribourg impose les couples et les familles monoparentales selon le splitting intégral (taux correspondant à 50 % du revenu). Les frais de garde sont déductibles jusqu'à CHF 12'000 par enfant de moins de 14 ans, et la déduction sociale par enfant est de CHF 8'600 (CHF 9'600 dès le troisième), réduite pour les revenus plus élevés."
    },
    {
      question: "Comment fonctionne le logiciel FriTax ?",
      answer: "FriTax est le programme gratuit du Service cantonal des contributions, en français et en allemand. Il s'installe sur Windows, macOS ou Linux (pas de version en ligne ni pour tablette), puis la déclaration s'envoie par internet avec le code FriTax de 6 caractères imprimé sur la fourre. Notre guide FriTax pas à pas détaille chaque rubrique."
    },
    {
      question: "Quels sont les taux d'imposition à Fribourg ?",
      answer: "Fribourg applique un système d'imposition progressif. Le taux marginal combiné (fédéral + cantonal + communal) varie selon la commune. La ville de Fribourg a des taux comparables à la moyenne suisse, tandis que certaines communes rurales offrent des taux nettement plus bas."
    },
    {
      question: "Peut-on déclarer ses cryptomonnaies dans le canton de Fribourg ?",
      answer: "Oui, les cryptomonnaies se déclarent dans l'état des titres de FriTax (annexe 01), une ligne par monnaie, au cours officiel de l'AFC (ICTax) au 31 décembre, à défaut au cours de la plateforme."
    }
  ];
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Cantons", href: "/cantons" },
              { label: "Fribourg" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Fiduciary for<br />
              <span className="text-emerald-300">Canton Fribourg</span></>
            ) : (
              <>Fiduciaire pour le{" "}<br />
              <span className="text-emerald-300">Canton de Fribourg</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "Bilingual canton with generous family deductions. A certified specialist supports you from Fribourg to Bulle with your tax return."
              : "Canton bilingue aux déductions familiales généreuses. Un spécialiste diplômé vous accompagne de Fribourg à Bulle pour votre déclaration d'impôts."}
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
      {/* Avantage familles */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {isEnglish ? "Tax advantage" : "Avantage fiscal"}
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                {isEnglish ? "The most generous canton for families" : "Le canton le plus généreux pour les familles"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Fribourg offers particularly advantageous deductions for families with children. Childcare costs, child deductions, support for single-parent families."
                  : "Fribourg offre des déductions particulièrement avantageuses pour les familles avec enfants. Frais de garde, déductions par enfant, soutien aux familles monoparentales."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">10'000 CHF</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Max childcare/child" : "Frais de garde max/enfant"}
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">9'000 CHF</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Deduction per child" : "Déduction par enfant"}
                  </div>
                </Card>
              </div>
            </div>
            <Card className="p-8 bg-white">
              <Baby className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">
                {isEnglish ? "Large families" : "Familles nombreuses"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "The more children you have, the greater the deductions. We optimize every franc to maximize your tax savings."
                  : "Plus vous avez d'enfants, plus les déductions sont importantes. Nous optimisons chaque franc pour maximiser vos économies d'impôts."}
              </p>
              <Link href="/demande">
                <Button variant="outline" className="w-full">
                  {isEnglish ? "Calculate my deductions" : "Calculer mes déductions"}
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
              {isEnglish ? "Fribourg Tax Deadlines 2026" : "Délais fiscaux Fribourg 2026"}
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
              {isEnglish ? "Tax Rates in Fribourg 2026" : "Taux d'imposition à Fribourg en 2026"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Canton Fribourg applies a progressive tax system with rates that vary significantly by municipality. The city of Fribourg has a combined marginal rate (federal + cantonal + municipal) of around 35-36% for the highest incomes, which is below the Swiss average."
                  : "Le canton de Fribourg applique un système d'imposition progressif avec des taux qui varient considérablement selon la commune. La ville de Fribourg a un taux marginal combiné (fédéral + cantonal + communal) d'environ 35-36% pour les revenus les plus élevés, ce qui est en dessous de la moyenne suisse."}
              </p>
              <p className="text-muted-foreground mb-4">
                {isEnglish
                  ? "Fribourg is particularly attractive for families thanks to its generous deductions, which effectively lower the overall tax burden. Combined with reasonable wealth tax rates, it makes the canton competitive for settling families."
                  : "Fribourg est particulièrement attractif pour les familles grâce à ses déductions généreuses, qui réduisent efficacement la charge fiscale globale. Combiné à des taux d'impôt sur la fortune raisonnables, cela rend le canton compétitif pour les familles qui s'installent."}
              </p>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "The bilingual nature of the canton also means that German-speaking municipalities (Sensebezirk, Seebezirk) may have different municipal tax rates than French-speaking ones."
                  : "Le bilinguisme du canton signifie aussi que les communes germanophones (district de la Singine, du Lac) peuvent avoir des taux communaux différents de ceux des communes francophones."}
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
                  ? "Use our free simulator to compare tax rates across Fribourg municipalities and find the most advantageous one for your situation."
                  : "Utilisez notre simulateur gratuit pour comparer les taux d'imposition des communes fribourgeoises et trouver la plus avantageuse pour votre situation."}
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
              {isEnglish ? "Main Tax Deductions in Fribourg" : "Principales déductions fiscales dans le canton de Fribourg"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Childcare costs" : "Frais de garde d'enfants"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Up to CHF 12,000 per child under 14 per year for third-party childcare (daycare, childminder, after-school care), if both parents or the single parent work (code 4.380)."
                  : "Jusqu'à CHF 12'000 par enfant de moins de 14 ans et par an pour la garde par des tiers (crèche, maman de jour, accueil extrascolaire), si les deux parents ou le parent seul travaillent (code 4.380)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Child deduction" : "Déduction par enfant"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "CHF 8,600 per child (CHF 9,600 from the third), reduced by CHF 100 per CHF 1,000 of net income above CHF 62,700, minimum CHF 7,100 (code 6.110)."
                  : "CHF 8'600 par enfant (CHF 9'600 dès le troisième), réduite de CHF 100 par tranche de CHF 1'000 de revenu net au-delà de CHF 62'700, au minimum CHF 7'100 (code 6.110)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Pillar 3a" : "3ème pilier A"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Deductible up to CHF 7,258 for employees with a 2nd pillar. For self-employed: up to 20% of net income (max CHF 36,288)."
                  : "Déductible jusqu'à CHF 7'258 pour les salariés avec 2e pilier. Pour les indépendants : jusqu'à 20% du revenu net (max CHF 36'288)."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "2nd pillar buyback" : "Rachat de 2ème pilier"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Fully deductible from taxable income. Particularly effective combined with Fribourg's progressive rates."
                  : "Entièrement déductible du revenu imposable. Particulièrement efficace combiné aux taux progressifs fribourgeois."}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">{isEnglish ? "Education costs" : "Frais de formation"}</h3>
              <p className="text-muted-foreground text-sm">
                {isEnglish
                  ? "Fribourg allows deductions for continuing education and professional development costs, supporting career growth."
                  : "Fribourg permet la déduction des frais de formation continue et de perfectionnement professionnel, encourageant le développement de carrière."}
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
            {isEnglish ? "Our services for Canton Fribourg" : "Nos services pour le Canton de Fribourg"}
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
                ? "Fribourg uses FriTax, an intuitive and well-structured software. This simplicity allows us to offer some of the most competitive rates in French-speaking Switzerland. The exact rate is calculated during your online simulation according to your case complexity."
                : "Fribourg utilise FriTax, un logiciel intuitif et bien structuré. Cette simplicité nous permet de proposer des tarifs parmi les plus compétitifs de Suisse romande. Le tarif exact est calculé lors de votre simulation en ligne selon la complexité de votre dossier."}
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
                  ? "Why choose NeoFidu for your Fribourg taxes?"
                  : "Pourquoi choisir NeoFidu pour vos impôts fribourgeois ?"}
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
                {isEnglish ? "Fribourg specificities" : "Spécificités fribourgeoises"}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>{isEnglish ? "Families" : "Familles"}</strong> : {isEnglish ? "among the most generous deductions" : "déductions parmi les plus généreuses"}</li>
                <li>• <strong>FriTax</strong> : {isEnglish ? "free bilingual program, electronic filing without signature" : "programme gratuit bilingue, envoi électronique sans signature"}</li>
                <li>• <strong>{isEnglish ? "Childcare costs" : "Frais de garde"}</strong> : {isEnglish ? "up to CHF 12,000/child" : "jusqu'à CHF 12'000 par enfant"}</li>
                <li>• <strong>{isEnglish ? "Bilingual" : "Bilingue"}</strong> : {isEnglish ? "French and German" : "français et allemand"}</li>
                <li>• <strong>{isEnglish ? "Education" : "Formation"}</strong> : {isEnglish ? "deductions for studies" : "déductions pour études"}</li>
              </ul>
              <Link href={isEnglish ? "/en/guide/fritax" : "/guide/fritax"} className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                <ArrowRight className="w-4 h-4" />
                {isEnglish ? "Fill in your return with FriTax: the complete guide" : "Remplir sa déclaration avec FriTax : le guide complet"}
              </Link>
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
              ? "From the city of Fribourg to Gruyère, from the Lac district to Singine, our 100% online service supports you in French and German."
              : "De la ville de Fribourg à la Gruyère, du district du Lac à la Singine, notre service 100% en ligne vous accompagne en français et en allemand."}
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
              {isEnglish ? "+ all Fribourg municipalities" : "+ toutes les communes fribourgeoises"}
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
              {isEnglish ? "Frequently Asked Questions - Taxes in Fribourg" : "Questions fréquentes - Impôts à Fribourg"}
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
                  <Link href={isEnglish ? "/en/guide/fritax" : "/guide/fritax"} className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "FriTax guide: step by step" : "Guide FriTax pas à pas"}
                  </Link>
                </li>
                <li>
                  <Link href="/guide/deductions-fiscales" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {isEnglish ? "Tax deductions 2026" : "Déductions fiscales 2026"}
                  </Link>
                </li>
                <li>
                  <Link href="/blog/comment-remplir-declaration-impot-en-ligne-guide" className="text-primary hover:underline flex items-center gap-2">
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
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isEnglish ? "Optimize your Fribourg taxes" : "Optimisez vos impôts fribourgeois"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Families, individuals or businesses, trust your declaration to a certified specialist. Bilingual service, transparent pricing."
              : "Familles, particuliers ou entreprises, confiez votre déclaration à un spécialiste diplômé. Service bilingue, tarifs transparents."}
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

export default function FribourgPage() {
  return <FribourgContent />;
}
