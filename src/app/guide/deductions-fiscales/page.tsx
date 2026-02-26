import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
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
  Car,
  Landmark,
  Gift,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Calculator,
  TrendingDown,
  Info,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guide des Déductions Fiscales 2026 | Suisse Romande | NeoFidu",
  description:
    "Guide complet des déductions fiscales en Suisse romande. Découvrez toutes les déductions possibles pour réduire vos impôts : 3ème pilier, frais professionnels, assurance maladie, et plus.",
  keywords:
    "déductions fiscales suisse, déductions impôts vaud, déductions genève, 3ème pilier déduction, frais professionnels suisse, optimisation fiscale",
};

const deductionCategories = [
  {
    id: "professionnels",
    icon: Briefcase,
    title: "Frais professionnels",
    description: "Déductions liées à votre activité professionnelle",
    items: [
      {
        name: "Frais de déplacement",
        federal: "Selon justificatifs",
        vaud: "CHF 0.70/km, max 15'000 km",
        geneve: "CHF 0.70/km ou abonnement TP",
        valais: "CHF 0.70/km, max 15'000 km",
        fribourg: "CHF 0.70/km ou frais effectifs",
        neuchatel: "CHF 0.70/km, max 20'000 km",
        jura: "CHF 0.70/km, max 15'000 km",
        tip: "Conservez tous vos justificatifs de transports publics",
      },
      {
        name: "Repas hors domicile",
        federal: "CHF 3'200/an",
        vaud: "CHF 3'200/an",
        geneve: "CHF 3'200/an",
        valais: "CHF 3'200/an",
        fribourg: "CHF 3'200/an",
        neuchatel: "CHF 3'200/an",
        jura: "CHF 3'200/an",
        tip: "Déductible si vous ne pouvez pas rentrer manger à midi",
      },
      {
        name: "Autres frais professionnels",
        federal: "3% du salaire (min 2'000, max 4'000)",
        vaud: "3% du salaire (min 2'000, max 4'000)",
        geneve: "3% du salaire (min 2'000, max 4'000)",
        valais: "3% du salaire (min 2'000, max 4'000)",
        fribourg: "3% du salaire (min 2'000, max 4'000)",
        neuchatel: "3% du salaire (min 2'000, max 4'000)",
        jura: "3% du salaire (min 2'000, max 4'000)",
        tip: "Inclut vêtements de travail, outils, documentation",
      },
      {
        name: "Télétravail / Home office",
        federal: "Selon frais effectifs",
        vaud: "Forfait ou frais effectifs",
        geneve: "Frais effectifs justifiés",
        valais: "Forfait ou frais effectifs",
        fribourg: "Forfait ou frais effectifs",
        neuchatel: "Frais effectifs justifiés",
        jura: "Forfait ou frais effectifs",
        tip: "Nouveau depuis COVID - justifiez l'obligation de télétravailler",
      },
    ],
  },
  {
    id: "prevoyance",
    icon: PiggyBank,
    title: "Prévoyance (2ème et 3ème pilier)",
    description: "Cotisations pour votre retraite",
    items: [
      {
        name: "3ème pilier A (salarié)",
        federal: "CHF 7'128/an",
        vaud: "CHF 7'128/an",
        geneve: "CHF 7'128/an",
        valais: "CHF 7'128/an",
        fribourg: "CHF 7'128/an",
        neuchatel: "CHF 7'128/an",
        jura: "CHF 7'128/an",
        tip: "Déduction la plus avantageuse - à maximiser chaque année !",
      },
      {
        name: "3ème pilier A (indépendant sans LPP)",
        federal: "20% du revenu, max CHF 35'280",
        vaud: "20% du revenu, max CHF 35'280",
        geneve: "20% du revenu, max CHF 35'280",
        valais: "20% du revenu, max CHF 35'280",
        fribourg: "20% du revenu, max CHF 35'280",
        neuchatel: "20% du revenu, max CHF 35'280",
        jura: "20% du revenu, max CHF 35'280",
        tip: "Montant beaucoup plus élevé pour les indépendants",
      },
      {
        name: "Rachat 2ème pilier (LPP)",
        federal: "Selon lacunes de cotisation",
        vaud: "100% déductible",
        geneve: "100% déductible",
        valais: "100% déductible",
        fribourg: "100% déductible",
        neuchatel: "100% déductible",
        jura: "100% déductible",
        tip: "Stratégie puissante pour réduire fortement les impôts",
      },
    ],
  },
  {
    id: "assurances",
    icon: Heart,
    title: "Assurances et frais médicaux",
    description: "Primes d'assurance et dépenses de santé",
    items: [
      {
        name: "Primes assurance maladie (célibataire)",
        federal: "CHF 1'800/an",
        vaud: "CHF 2'520/an",
        geneve: "CHF 2'808/an",
        valais: "CHF 2'520/an",
        fribourg: "CHF 2'520/an",
        neuchatel: "CHF 2'400/an",
        jura: "CHF 2'400/an",
        tip: "Montant forfaitaire, pas besoin de justificatifs",
      },
      {
        name: "Primes assurance maladie (couple)",
        federal: "CHF 3'600/an",
        vaud: "CHF 5'040/an",
        geneve: "CHF 5'616/an",
        valais: "CHF 5'040/an",
        fribourg: "CHF 5'040/an",
        neuchatel: "CHF 4'800/an",
        jura: "CHF 4'800/an",
        tip: "Doublé pour les couples mariés",
      },
      {
        name: "Primes assurance maladie (par enfant)",
        federal: "CHF 700/enfant",
        vaud: "CHF 1'260/enfant",
        geneve: "CHF 1'404/enfant",
        valais: "CHF 1'260/enfant",
        fribourg: "CHF 1'260/enfant",
        neuchatel: "CHF 1'200/enfant",
        jura: "CHF 1'200/enfant",
        tip: "S'ajoute au forfait adultes",
      },
      {
        name: "Frais médicaux non remboursés",
        federal: "Dépassant 5% du revenu",
        vaud: "Dépassant 5% du revenu",
        geneve: "Dépassant 0.5% de la fortune",
        valais: "Dépassant 5% du revenu",
        fribourg: "Dépassant 5% du revenu",
        neuchatel: "Dépassant 5% du revenu",
        jura: "Dépassant 5% du revenu",
        tip: "Conservez toutes vos factures médicales",
      },
    ],
  },
  {
    id: "famille",
    icon: Baby,
    title: "Charges de famille",
    description: "Déductions pour enfants et personnes à charge",
    items: [
      {
        name: "Déduction par enfant",
        federal: "CHF 6'600/enfant",
        vaud: "CHF 7'800/enfant",
        geneve: "CHF 10'078/enfant",
        valais: "CHF 7'500/enfant",
        fribourg: "CHF 8'100/enfant",
        neuchatel: "CHF 5'700/enfant",
        jura: "CHF 6'200/enfant",
        tip: "Pour chaque enfant mineur ou en formation",
      },
      {
        name: "Frais de garde (crèche, maman de jour)",
        federal: "CHF 25'000/enfant",
        vaud: "CHF 12'500/enfant",
        geneve: "Frais effectifs",
        valais: "CHF 10'100/enfant",
        fribourg: "CHF 10'100/enfant",
        neuchatel: "CHF 12'000/enfant",
        jura: "CHF 10'000/enfant",
        tip: "Uniquement si les deux parents travaillent",
      },
      {
        name: "Déduction pour couple marié",
        federal: "CHF 2'700/an",
        vaud: "CHF 2'400/an",
        geneve: "CHF 1'000/an",
        valais: "CHF 2'500/an",
        fribourg: "CHF 2'520/an",
        neuchatel: "CHF 2'000/an",
        jura: "CHF 2'200/an",
        tip: "Déduction automatique pour les mariés",
      },
      {
        name: "Personne nécessiteuse à charge",
        federal: "CHF 6'600/personne",
        vaud: "CHF 7'800/personne",
        geneve: "CHF 10'078/personne",
        valais: "CHF 7'500/personne",
        fribourg: "CHF 8'100/personne",
        neuchatel: "CHF 5'700/personne",
        jura: "CHF 6'200/personne",
        tip: "Parents âgés, proches handicapés, etc.",
      },
    ],
  },
  {
    id: "immobilier",
    icon: Home,
    title: "Immobilier et logement",
    description: "Déductions pour propriétaires et locataires",
    items: [
      {
        name: "Intérêts hypothécaires",
        federal: "100% déductibles",
        vaud: "100% déductibles",
        geneve: "100% déductibles",
        valais: "100% déductibles",
        fribourg: "100% déductibles",
        neuchatel: "100% déductibles",
        jura: "100% déductibles",
        tip: "Déduction majeure pour les propriétaires",
      },
      {
        name: "Frais d'entretien immobilier",
        federal: "Forfait 10-20% ou effectifs",
        vaud: "Forfait 20% ou effectifs",
        geneve: "Forfait 10-20% ou effectifs",
        valais: "Forfait 20% ou effectifs",
        fribourg: "Forfait 10-20% ou effectifs",
        neuchatel: "Forfait 10-20% ou effectifs",
        jura: "Forfait 10-20% ou effectifs",
        tip: "Choisissez entre forfait et frais réels chaque année",
      },
      {
        name: "Rénovation énergétique",
        federal: "100% déductible",
        vaud: "Report possible sur 3 ans",
        geneve: "100% déductible",
        valais: "Report possible sur 5 ans",
        fribourg: "Report possible sur 3 ans",
        neuchatel: "100% déductible",
        jura: "100% déductible",
        tip: "Isolation, panneaux solaires, pompes à chaleur",
      },
      {
        name: "Intérêts d'épargne-logement",
        federal: "Selon canton",
        vaud: "Non disponible",
        geneve: "Non disponible",
        valais: "CHF 4'000/an max",
        fribourg: "Non disponible",
        neuchatel: "Non disponible",
        jura: "Non disponible",
        tip: "Disponible uniquement dans certains cantons",
      },
    ],
  },
  {
    id: "formation",
    icon: GraduationCap,
    title: "Formation et perfectionnement",
    description: "Investissements dans votre carrière",
    items: [
      {
        name: "Frais de formation continue",
        federal: "CHF 12'900/an max",
        vaud: "CHF 12'900/an max",
        geneve: "CHF 12'000/an max",
        valais: "CHF 12'900/an max",
        fribourg: "CHF 12'900/an max",
        neuchatel: "CHF 12'000/an max",
        jura: "CHF 12'000/an max",
        tip: "Cours, séminaires, certifications professionnelles",
      },
      {
        name: "Reconversion professionnelle",
        federal: "CHF 12'900/an max",
        vaud: "CHF 12'900/an max",
        geneve: "CHF 12'000/an max",
        valais: "CHF 12'900/an max",
        fribourg: "CHF 12'900/an max",
        neuchatel: "CHF 12'000/an max",
        jura: "CHF 12'000/an max",
        tip: "Même plafond que la formation continue",
      },
    ],
  },
  {
    id: "dons",
    icon: Gift,
    title: "Dons et cotisations",
    description: "Générosité fiscalement avantageuse",
    items: [
      {
        name: "Dons à des organisations d'utilité publique",
        federal: "Max 20% du revenu net",
        vaud: "Max 20% du revenu net",
        geneve: "Max 20% du revenu net",
        valais: "Max 20% du revenu net",
        fribourg: "Max 20% du revenu net",
        neuchatel: "Max 20% du revenu net",
        jura: "Max 20% du revenu net",
        tip: "Minimum CHF 100 par don, demandez le reçu fiscal",
      },
      {
        name: "Cotisations syndicales et professionnelles",
        federal: "100% déductibles",
        vaud: "100% déductibles",
        geneve: "100% déductibles",
        valais: "100% déductibles",
        fribourg: "100% déductibles",
        neuchatel: "100% déductibles",
        jura: "100% déductibles",
        tip: "Syndicats, ordres professionnels, associations",
      },
    ],
  },
  {
    id: "divers",
    icon: Receipt,
    title: "Autres déductions",
    description: "Déductions souvent oubliées",
    items: [
      {
        name: "Intérêts de dettes privées",
        federal: "Max revenus fortune + CHF 50'000",
        vaud: "Max revenus fortune + CHF 50'000",
        geneve: "Max revenus fortune + CHF 50'000",
        valais: "Max revenus fortune + CHF 50'000",
        fribourg: "Max revenus fortune + CHF 50'000",
        neuchatel: "Max revenus fortune + CHF 50'000",
        jura: "Max revenus fortune + CHF 50'000",
        tip: "Crédits conso, leasing, découverts bancaires",
      },
      {
        name: "Frais de gestion de fortune",
        federal: "Forfait 0.5% ou effectifs",
        vaud: "Forfait ou effectifs",
        geneve: "Forfait ou effectifs",
        valais: "Forfait ou effectifs",
        fribourg: "Forfait ou effectifs",
        neuchatel: "Forfait ou effectifs",
        jura: "Forfait ou effectifs",
        tip: "Frais de dépôt, droits de garde, conseils",
      },
      {
        name: "Pension alimentaire versée",
        federal: "100% déductible",
        vaud: "100% déductible",
        geneve: "100% déductible",
        valais: "100% déductible",
        fribourg: "100% déductible",
        neuchatel: "100% déductible",
        jura: "100% déductible",
        tip: "Le bénéficiaire déclare le montant en revenu",
      },
      {
        name: "Cotisations AVS/AI/APG (indépendants)",
        federal: "100% déductibles",
        vaud: "100% déductibles",
        geneve: "100% déductibles",
        valais: "100% déductibles",
        fribourg: "100% déductibles",
        neuchatel: "100% déductibles",
        jura: "100% déductibles",
        tip: "Cotisations sociales personnelles des indépendants",
      },
    ],
  },
];

const optimizationTips = [
  {
    title: "Maximisez votre 3ème pilier",
    description:
      "C'est la déduction la plus avantageuse. CHF 7'128 économisent environ CHF 2'000-2'500 d'impôts selon votre taux marginal.",
    icon: PiggyBank,
  },
  {
    title: "Échelonnez vos rachats LPP",
    description:
      "Effectuez des rachats 2ème pilier sur plusieurs années pour maximiser l'effet fiscal sans saturer une année.",
    icon: TrendingDown,
  },
  {
    title: "Groupez vos travaux immobiliers",
    description:
      "Si vous prévoyez des rénovations, concentrez-les sur une année à haut revenu pour maximiser la déduction.",
    icon: Home,
  },
  {
    title: "Conservez tous vos justificatifs",
    description:
      "Gardez vos reçus pendant 10 ans. L'administration fiscale peut demander des preuves à tout moment.",
    icon: Receipt,
  },
  {
    title: "Comparez forfait vs frais réels",
    description:
      "Pour les frais d'entretien immobilier et professionnels, calculez les deux options chaque année.",
    icon: Calculator,
  },
  {
    title: "N'oubliez pas les frais médicaux",
    description:
      "Franchises, participations, lunettes, dentiste... tout ce qui dépasse 5% de votre revenu est déductible.",
    icon: Heart,
  },
];

export default function DeductionsFiscalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <BreadcrumbLight
              items={[
                { label: "Guide", href: "/guide" },
                { label: "Déductions fiscales" },
              ]}
              className="mb-8"
            />

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Receipt className="w-4 h-4" />
                <span className="text-sm font-medium">Guide complet 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Toutes les déductions fiscales
                <br />
                <span className="text-emerald-300">en Suisse romande</span>
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Découvrez les déductions auxquelles vous avez droit pour réduire
                vos impôts. Guide détaillé avec les montants par canton.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/simulateur">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Simuler mes impôts
                  </Button>
                </Link>
                <Link href="/demande">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Optimiser ma déclaration
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
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  CHF 7'128
                </div>
                <div className="text-muted-foreground">
                  Max 3ème pilier salarié (2026)
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  20%+
                </div>
                <div className="text-muted-foreground">
                  Économie possible
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  30+
                </div>
                <div className="text-muted-foreground">
                  Types de déductions
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  6
                </div>
                <div className="text-muted-foreground">Cantons couverts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Catégories de déductions
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
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
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
                              { canton: "Genève", value: item.geneve },
                              { canton: "Valais", value: item.valais },
                              { canton: "Fribourg", value: item.fribourg },
                              { canton: "Neuchâtel", value: item.neuchatel },
                              { canton: "Jura", value: item.jura },
                            ].map((c) => (
                              <div
                                key={c.canton}
                                className="bg-gray-50 rounded-lg p-3 text-center"
                              >
                                <div className="text-xs text-muted-foreground mb-1">
                                  {c.canton}
                                </div>
                                <div className="text-sm font-medium">
                                  {c.value}
                                </div>
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
                Conseils d'optimisation fiscale
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Maximisez vos déductions avec ces stratégies éprouvées
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {optimizationTips.map((tip, idx) => (
                <Card
                  key={idx}
                  className="bg-white/10 border-white/20 text-white"
                >
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
                    Important à savoir
                  </h3>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Les montants indiqués sont valables pour l'année fiscale
                      2026 et peuvent varier.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Chaque situation est unique. Certaines déductions
                      nécessitent des conditions spécifiques.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Conservez tous vos justificatifs pendant 10 ans minimum.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      En cas de doute, consultez un professionnel pour optimiser
                      votre déclaration.
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
                      Ne laissez pas d'argent sur la table
                    </h2>
                    <p className="text-white/90 mb-6">
                      Nos experts connaissent toutes les déductions possibles
                      dans votre canton. Confiez-nous votre déclaration pour une
                      optimisation maximale.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/demande">
                        <Button
                          size="lg"
                          className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
                        >
                          Confier ma déclaration
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/simulateur">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
                        >
                          Simuler d'abord
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

      <Footer />
    </div>
  );
}
