"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Receipt,
  Briefcase,
  PiggyBank,
  Heart,
  Home,
  GraduationCap,
  Baby,
  Landmark,
  Gift,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Calculator,
  TrendingDown,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function DeductionsPageClient() {
  const { t, isEnglish } = useLanguage();

  const deductionCategories = [
    {
      id: "professionnels",
      icon: Briefcase,
      title: isEnglish ? "Professional expenses" : "Frais professionnels",
      description: isEnglish ? "Deductions related to your professional activity" : "Déductions liées à votre activité professionnelle",
      items: [
        {
          name: isEnglish ? "Commuting costs" : "Frais de déplacement",
          federal: isEnglish ? "According to receipts" : "Selon justificatifs",
          vaud: "CHF 0.70/km, max 15'000 km",
          geneve: isEnglish ? "CHF 0.70/km or PT subscription" : "CHF 0.70/km ou abonnement TP",
          valais: "CHF 0.70/km, max 15'000 km",
          fribourg: isEnglish ? "CHF 0.70/km or actual costs" : "CHF 0.70/km ou frais effectifs",
          neuchatel: "CHF 0.70/km, max 20'000 km",
          jura: "CHF 0.70/km, max 15'000 km",
          tip: isEnglish ? "Keep all your public transport receipts" : "Conservez tous vos justificatifs de transports publics",
        },
        {
          name: isEnglish ? "Meals away from home" : "Repas hors domicile",
          federal: "CHF 3'200/an",
          vaud: "CHF 3'200/an",
          geneve: "CHF 3'200/an",
          valais: "CHF 3'200/an",
          fribourg: "CHF 3'200/an",
          neuchatel: "CHF 3'200/an",
          jura: "CHF 3'200/an",
          tip: isEnglish ? "Deductible if you cannot eat at home at noon" : "Déductible si vous ne pouvez pas rentrer manger à midi",
        },
        {
          name: isEnglish ? "Other professional expenses" : "Autres frais professionnels",
          federal: "3% (min 2'000, max 4'000)",
          vaud: "3% (min 2'000, max 4'000)",
          geneve: "3% (min 2'000, max 4'000)",
          valais: "3% (min 2'000, max 4'000)",
          fribourg: "3% (min 2'000, max 4'000)",
          neuchatel: "3% (min 2'000, max 4'000)",
          jura: "3% (min 2'000, max 4'000)",
          tip: isEnglish ? "Includes work clothes, tools, documentation" : "Inclut vêtements de travail, outils, documentation",
        },
        {
          name: isEnglish ? "Remote work / Home office" : "Télétravail / Home office",
          federal: isEnglish ? "Actual costs" : "Selon frais effectifs",
          vaud: isEnglish ? "Flat rate or actual costs" : "Forfait ou frais effectifs",
          geneve: isEnglish ? "Justified actual costs" : "Frais effectifs justifiés",
          valais: isEnglish ? "Flat rate or actual costs" : "Forfait ou frais effectifs",
          fribourg: isEnglish ? "Flat rate or actual costs" : "Forfait ou frais effectifs",
          neuchatel: isEnglish ? "Justified actual costs" : "Frais effectifs justifiés",
          jura: isEnglish ? "Flat rate or actual costs" : "Forfait ou frais effectifs",
          tip: isEnglish ? "New since COVID - justify the obligation to work remotely" : "Nouveau depuis COVID - justifiez l'obligation de télétravailler",
        },
      ],
    },
    {
      id: "prevoyance",
      icon: PiggyBank,
      title: isEnglish ? "Pension (2nd & 3rd pillar)" : "Prévoyance (2ème et 3ème pilier)",
      description: isEnglish ? "Contributions for your retirement" : "Cotisations pour votre retraite",
      items: [
        {
          name: isEnglish ? "Pillar 3a (employee)" : "3ème pilier A (salarié)",
          federal: "CHF 7'258/an",
          vaud: "CHF 7'258/an",
          geneve: "CHF 7'258/an",
          valais: "CHF 7'258/an",
          fribourg: "CHF 7'258/an",
          neuchatel: "CHF 7'258/an",
          jura: "CHF 7'258/an",
          tip: isEnglish ? "Most advantageous deduction - maximize it every year!" : "Déduction la plus avantageuse - à maximiser chaque année !",
        },
        {
          name: isEnglish ? "Pillar 3a (self-employed without LPP)" : "3ème pilier A (indépendant sans LPP)",
          federal: "20%, max CHF 36'288",
          vaud: "20%, max CHF 36'288",
          geneve: "20%, max CHF 36'288",
          valais: "20%, max CHF 36'288",
          fribourg: "20%, max CHF 36'288",
          neuchatel: "20%, max CHF 36'288",
          jura: "20%, max CHF 36'288",
          tip: isEnglish ? "Much higher amount for self-employed" : "Montant beaucoup plus élevé pour les indépendants",
        },
        {
          name: isEnglish ? "2nd pillar buyback (LPP)" : "Rachat 2ème pilier (LPP)",
          federal: isEnglish ? "According to contribution gaps" : "Selon lacunes de cotisation",
          vaud: "100%",
          geneve: "100%",
          valais: "100%",
          fribourg: "100%",
          neuchatel: "100%",
          jura: "100%",
          tip: isEnglish ? "Powerful strategy to significantly reduce taxes" : "Stratégie puissante pour réduire fortement les impôts",
        },
      ],
    },
    {
      id: "assurances",
      icon: Heart,
      title: isEnglish ? "Insurance & medical expenses" : "Assurances et frais médicaux",
      description: isEnglish ? "Insurance premiums and health expenses" : "Primes d'assurance et dépenses de santé",
      items: [
        {
          name: isEnglish ? "Health insurance (single)" : "Primes assurance maladie (célibataire)",
          federal: "CHF 1'800/an",
          vaud: "CHF 2'520/an",
          geneve: "CHF 2'808/an",
          valais: "CHF 2'520/an",
          fribourg: "CHF 2'520/an",
          neuchatel: "CHF 2'400/an",
          jura: "CHF 2'400/an",
          tip: isEnglish ? "Flat rate amount, no receipts needed" : "Montant forfaitaire, pas besoin de justificatifs",
        },
        {
          name: isEnglish ? "Health insurance (couple)" : "Primes assurance maladie (couple)",
          federal: "CHF 3'600/an",
          vaud: "CHF 5'040/an",
          geneve: "CHF 5'616/an",
          valais: "CHF 5'040/an",
          fribourg: "CHF 5'040/an",
          neuchatel: "CHF 4'800/an",
          jura: "CHF 4'800/an",
          tip: isEnglish ? "Doubled for married couples" : "Doublé pour les couples mariés",
        },
        {
          name: isEnglish ? "Unreimbursed medical expenses" : "Frais médicaux non remboursés",
          federal: isEnglish ? "Exceeding 5% of income" : "Dépassant 5% du revenu",
          vaud: isEnglish ? "Exceeding 5% of income" : "Dépassant 5% du revenu",
          geneve: isEnglish ? "Exceeding 0.5% of wealth" : "Dépassant 0.5% de la fortune",
          valais: isEnglish ? "Exceeding 5% of income" : "Dépassant 5% du revenu",
          fribourg: isEnglish ? "Exceeding 5% of income" : "Dépassant 5% du revenu",
          neuchatel: isEnglish ? "Exceeding 5% of income" : "Dépassant 5% du revenu",
          jura: isEnglish ? "Exceeding 5% of income" : "Dépassant 5% du revenu",
          tip: isEnglish ? "Keep all your medical invoices" : "Conservez toutes vos factures médicales",
        },
      ],
    },
    {
      id: "famille",
      icon: Baby,
      title: isEnglish ? "Family charges" : "Charges de famille",
      description: isEnglish ? "Deductions for children and dependents" : "Déductions pour enfants et personnes à charge",
      items: [
        {
          name: isEnglish ? "Deduction per child" : "Déduction par enfant",
          federal: "CHF 6'600",
          vaud: "CHF 7'800",
          geneve: "CHF 10'078",
          valais: "CHF 7'500",
          fribourg: "CHF 8'100",
          neuchatel: "CHF 5'700",
          jura: "CHF 6'200",
          tip: isEnglish ? "For each minor or child in training" : "Pour chaque enfant mineur ou en formation",
        },
        {
          name: isEnglish ? "Childcare costs" : "Frais de garde",
          federal: "CHF 25'000",
          vaud: "CHF 12'500",
          geneve: isEnglish ? "Actual costs" : "Frais effectifs",
          valais: "CHF 10'100",
          fribourg: "CHF 10'100",
          neuchatel: "CHF 12'000",
          jura: "CHF 10'000",
          tip: isEnglish ? "Only if both parents work" : "Uniquement si les deux parents travaillent",
        },
        {
          name: isEnglish ? "Married couple deduction" : "Déduction pour couple marié",
          federal: "CHF 2'700/an",
          vaud: "CHF 2'400/an",
          geneve: "CHF 1'000/an",
          valais: "CHF 2'500/an",
          fribourg: "CHF 2'520/an",
          neuchatel: "CHF 2'000/an",
          jura: "CHF 2'200/an",
          tip: isEnglish ? "Automatic deduction for married couples" : "Déduction automatique pour les mariés",
        },
      ],
    },
    {
      id: "immobilier",
      icon: Home,
      title: isEnglish ? "Property & housing" : "Immobilier et logement",
      description: isEnglish ? "Deductions for owners and tenants" : "Déductions pour propriétaires et locataires",
      items: [
        {
          name: isEnglish ? "Mortgage interest" : "Intérêts hypothécaires",
          federal: "100%",
          vaud: "100%",
          geneve: "100%",
          valais: "100%",
          fribourg: "100%",
          neuchatel: "100%",
          jura: "100%",
          tip: isEnglish ? "Major deduction for property owners" : "Déduction majeure pour les propriétaires",
        },
        {
          name: isEnglish ? "Property maintenance costs" : "Frais d'entretien immobilier",
          federal: isEnglish ? "Flat 10-20% or actual" : "Forfait 10-20% ou effectifs",
          vaud: isEnglish ? "Flat 20% or actual" : "Forfait 20% ou effectifs",
          geneve: isEnglish ? "Flat 10-20% or actual" : "Forfait 10-20% ou effectifs",
          valais: isEnglish ? "Flat 20% or actual" : "Forfait 20% ou effectifs",
          fribourg: isEnglish ? "Flat 10-20% or actual" : "Forfait 10-20% ou effectifs",
          neuchatel: isEnglish ? "Flat 10-20% or actual" : "Forfait 10-20% ou effectifs",
          jura: isEnglish ? "Flat 10-20% or actual" : "Forfait 10-20% ou effectifs",
          tip: isEnglish ? "Choose between flat rate and actual costs each year" : "Choisissez entre forfait et frais réels chaque année",
        },
        {
          name: isEnglish ? "Energy renovation" : "Rénovation énergétique",
          federal: "100%",
          vaud: isEnglish ? "Carryover 3 years" : "Report possible sur 3 ans",
          geneve: "100%",
          valais: isEnglish ? "Carryover 5 years" : "Report possible sur 5 ans",
          fribourg: isEnglish ? "Carryover 3 years" : "Report possible sur 3 ans",
          neuchatel: "100%",
          jura: "100%",
          tip: isEnglish ? "Insulation, solar panels, heat pumps" : "Isolation, panneaux solaires, pompes à chaleur",
        },
      ],
    },
    {
      id: "formation",
      icon: GraduationCap,
      title: isEnglish ? "Training & development" : "Formation et perfectionnement",
      description: isEnglish ? "Investments in your career" : "Investissements dans votre carrière",
      items: [
        {
          name: isEnglish ? "Continuing education costs" : "Frais de formation continue",
          federal: "CHF 12'900/an max",
          vaud: "CHF 12'900/an max",
          geneve: "CHF 12'000/an max",
          valais: "CHF 12'900/an max",
          fribourg: "CHF 12'900/an max",
          neuchatel: "CHF 12'000/an max",
          jura: "CHF 12'000/an max",
          tip: isEnglish ? "Courses, seminars, professional certifications" : "Cours, séminaires, certifications professionnelles",
        },
        {
          name: isEnglish ? "Professional retraining" : "Reconversion professionnelle",
          federal: "CHF 12'900/an max",
          vaud: "CHF 12'900/an max",
          geneve: "CHF 12'000/an max",
          valais: "CHF 12'900/an max",
          fribourg: "CHF 12'900/an max",
          neuchatel: "CHF 12'000/an max",
          jura: "CHF 12'000/an max",
          tip: isEnglish ? "Same ceiling as continuing education" : "Même plafond que la formation continue",
        },
      ],
    },
    {
      id: "dons",
      icon: Gift,
      title: isEnglish ? "Donations & contributions" : "Dons et cotisations",
      description: isEnglish ? "Tax-advantaged generosity" : "Générosité fiscalement avantageuse",
      items: [
        {
          name: isEnglish ? "Donations to public utility organizations" : "Dons à des organisations d'utilité publique",
          federal: "Max 20%",
          vaud: "Max 20%",
          geneve: "Max 20%",
          valais: "Max 20%",
          fribourg: "Max 20%",
          neuchatel: "Max 20%",
          jura: "Max 20%",
          tip: isEnglish ? "Minimum CHF 100 per donation, ask for tax receipt" : "Minimum CHF 100 par don, demandez le reçu fiscal",
        },
        {
          name: isEnglish ? "Union & professional contributions" : "Cotisations syndicales et professionnelles",
          federal: "100%",
          vaud: "100%",
          geneve: "100%",
          valais: "100%",
          fribourg: "100%",
          neuchatel: "100%",
          jura: "100%",
          tip: isEnglish ? "Unions, professional orders, associations" : "Syndicats, ordres professionnels, associations",
        },
      ],
    },
  ];

  const optimizationTips = [
    {
      title: isEnglish ? "Maximize your Pillar 3a" : "Maximisez votre 3ème pilier",
      description: isEnglish
        ? "This is the most advantageous deduction. CHF 7,258 saves approximately CHF 2,000-2,500 in taxes depending on your marginal rate."
        : "C'est la déduction la plus avantageuse. CHF 7'258 économisent environ CHF 2'000-2'500 d'impôts selon votre taux marginal.",
      icon: PiggyBank,
    },
    {
      title: isEnglish ? "Stagger your LPP buybacks" : "Échelonnez vos rachats LPP",
      description: isEnglish
        ? "Make 2nd pillar buybacks over several years to maximize the tax effect without saturating one year."
        : "Effectuez des rachats 2ème pilier sur plusieurs années pour maximiser l'effet fiscal sans saturer une année.",
      icon: TrendingDown,
    },
    {
      title: isEnglish ? "Group your property work" : "Groupez vos travaux immobiliers",
      description: isEnglish
        ? "If you plan renovations, concentrate them in a high-income year to maximize the deduction."
        : "Si vous prévoyez des rénovations, concentrez-les sur une année à haut revenu pour maximiser la déduction.",
      icon: Home,
    },
    {
      title: isEnglish ? "Keep all your receipts" : "Conservez tous vos justificatifs",
      description: isEnglish
        ? "Keep your receipts for 10 years. The tax authority can request proof at any time."
        : "Gardez vos reçus pendant 10 ans. L'administration fiscale peut demander des preuves à tout moment.",
      icon: Receipt,
    },
    {
      title: isEnglish ? "Compare flat rate vs actual costs" : "Comparez forfait vs frais réels",
      description: isEnglish
        ? "For property maintenance and professional expenses, calculate both options each year."
        : "Pour les frais d'entretien immobilier et professionnels, calculez les deux options chaque année.",
      icon: Calculator,
    },
    {
      title: isEnglish ? "Don't forget medical expenses" : "N'oubliez pas les frais médicaux",
      description: isEnglish
        ? "Deductibles, co-pays, glasses, dentist... everything exceeding 5% of your income is deductible."
        : "Franchises, participations, lunettes, dentiste... tout ce qui dépasse 5% de votre revenu est déductible.",
      icon: Heart,
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Receipt className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isEnglish ? "Complete Guide 2026" : "Guide complet 2026"}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {isEnglish ? "All tax deductions" : "Toutes les déductions fiscales"}
              <br />
              <span className="text-emerald-300">
                {isEnglish ? "in French-speaking Switzerland" : "en Suisse romande"}
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              {isEnglish
                ? "Discover the deductions you are entitled to reduce your taxes. Detailed guide with amounts by canton."
                : "Découvrez les déductions auxquelles vous avez droit pour réduire vos impôts. Guide détaillé avec les montants par canton."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/simulateur">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {isEnglish ? "Simulate my taxes" : "Simuler mes impôts"}
                </Button>
              </Link>
              <Link href="/demande">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  {isEnglish ? "Optimize my declaration" : "Optimiser ma déclaration"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">CHF 7'258</div>
              <div className="text-muted-foreground">
                {isEnglish ? "Max Pillar 3a employee (2026)" : "Max 3ème pilier salarié (2026)"}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">20%+</div>
              <div className="text-muted-foreground">
                {isEnglish ? "Possible savings" : "Économie possible"}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">30+</div>
              <div className="text-muted-foreground">
                {isEnglish ? "Types of deductions" : "Types de déductions"}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">6</div>
              <div className="text-muted-foreground">
                {isEnglish ? "Cantons covered" : "Cantons couverts"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEnglish ? "Deduction categories" : "Catégories de déductions"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {deductionCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
              >
                <cat.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm">{cat.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Deduction Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {deductionCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="text-sm font-normal text-primary bg-primary/10 px-3 py-1 rounded-full">
                            IFD: {item.federal}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                          {[
                            { canton: "Vaud", value: item.vaud },
                            { canton: isEnglish ? "Geneva" : "Genève", value: item.geneve },
                            { canton: "Valais", value: item.valais },
                            { canton: isEnglish ? "Fribourg" : "Fribourg", value: item.fribourg },
                            { canton: isEnglish ? "Neuchâtel" : "Neuchâtel", value: item.neuchatel },
                            { canton: "Jura", value: item.jura },
                          ].map((c) => (
                            <div
                              key={c.canton}
                              className="bg-gray-50 rounded-lg p-3 text-center"
                            >
                              <div className="text-xs text-muted-foreground mb-1">
                                {c.canton}
                              </div>
                              <div className="text-sm font-medium">{c.value}</div>
                            </div>
                          ))}
                        </div>
                        {item.tip && (
                          <div className="flex items-start gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg p-3">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{item.tip}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optimization Tips */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isEnglish ? "Tax optimization tips" : "Conseils d'optimisation fiscale"}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              {isEnglish
                ? "Maximize your deductions with these proven strategies"
                : "Maximisez vos déductions avec ces stratégies éprouvées"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {optimizationTips.map((tip, idx) => (
              <Card key={idx} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-6">
                  <tip.icon className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-white/70 text-sm">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-4">
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-amber-900 mb-2">
                  {isEnglish ? "Important to know" : "Important à savoir"}
                </h3>
                <ul className="space-y-2 text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    {isEnglish
                      ? "The amounts shown are valid for tax year 2026 and may vary."
                      : "Les montants indiqués sont valables pour l'année fiscale 2026 et peuvent varier."}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    {isEnglish
                      ? "Each situation is unique. Some deductions require specific conditions."
                      : "Chaque situation est unique. Certaines déductions nécessitent des conditions spécifiques."}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    {isEnglish
                      ? "Keep all your receipts for at least 10 years."
                      : "Conservez tous vos justificatifs pendant 10 ans minimum."}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    {isEnglish
                      ? "If in doubt, consult a professional to optimize your declaration."
                      : "En cas de doute, consultez un professionnel pour optimiser votre déclaration."}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-emerald-600 text-white overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {isEnglish ? "Don't leave money on the table" : "Ne laissez pas d'argent sur la table"}
                  </h2>
                  <p className="text-white/90 mb-6">
                    {isEnglish
                      ? "Our experts know all the possible deductions in your canton. Trust us with your declaration for maximum optimization."
                      : "Nos experts connaissent toutes les déductions possibles dans votre canton. Confiez-nous votre déclaration pour une optimisation maximale."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/demande">
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
                      >
                        {isEnglish ? "Trust us with my declaration" : "Confier ma déclaration"}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/simulateur">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white bg-transparent text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                      >
                        {isEnglish ? "Simulate first" : "Simuler d'abord"}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-400 flex items-center justify-center">
                      <TrendingDown className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
