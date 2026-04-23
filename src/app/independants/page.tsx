"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import {
  Check,
  ArrowRight,
  Calculator,
  FileText,
  Building2,
  Users,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  Briefcase,
  Receipt,
  PiggyBank,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Star,
  BadgeCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    icon: Receipt,
    title: "Comptabilité",
    titleEn: "Accounting",
    description: "Tenue de vos comptes, classement des pièces, suivi de trésorerie. On s'occupe de tout.",
    descriptionEn: "Bookkeeping, document filing, cash flow monitoring. We handle everything.",
    price: "500",
    unit: "/an",
    features: [
      "Saisie des factures et dépenses",
      "Rapprochement bancaire",
      "Tableau de bord mensuel",
      "Conseils d'optimisation",
    ],
    featuresEn: [
      "Invoice and expense entry",
      "Bank reconciliation",
      "Monthly dashboard",
      "Optimization advice",
    ],
  },
  {
    icon: FileText,
    title: "Déclaration d'impôts",
    titleEn: "Tax return",
    description: "Déclaration fiscale optimisée pour indépendants. On maximise vos déductions.",
    descriptionEn: "Optimized tax return for self-employed. We maximize your deductions.",
    price: "90",
    unit: "",
    features: [
      "Annexe activité indépendante",
      "Optimisation déductions pro",
      "Amortissements & provisions",
      "Transmission électronique",
    ],
    featuresEn: [
      "Self-employment appendix",
      "Professional deduction optimization",
      "Depreciation & provisions",
      "Electronic submission",
    ],
  },
  {
    icon: Building2,
    title: "Création d'entreprise",
    titleEn: "Company formation",
    description: "Raison individuelle, Sàrl ou SA. On vous accompagne dans toutes les démarches.",
    descriptionEn: "Sole proprietorship, LLC or AG. We guide you through all the steps.",
    price: "290",
    unit: "",
    features: [
      "Conseil forme juridique",
      "Rédaction des statuts",
      "Inscription au RC",
      "Affiliation AVS/AI",
    ],
    featuresEn: [
      "Legal form advice",
      "Articles of association",
      "Commercial register entry",
      "AVS/AI affiliation",
    ],
  },
];

const creationServices = [
  {
    title: "Raison individuelle",
    titleEn: "Sole proprietorship",
    price: "290",
    description: "La solution la plus simple pour démarrer",
    descriptionEn: "The simplest solution to get started",
    features: [
      "Analyse de votre projet",
      "Affiliation AVS/AI",
      "Inscription RC (si nécessaire)",
      "Conseil assurances",
      "Accompagnement 1er mois",
    ],
  },
  {
    title: "Passage en Sàrl",
    titleEn: "Conversion to LLC",
    price: "990",
    description: "Quand votre activité décolle",
    descriptionEn: "When your business takes off",
    features: [
      "Étude d'opportunité fiscale",
      "Rédaction des statuts",
      "Acte notarié",
      "Inscription RC",
      "Transfert d'actifs",
      "Affiliation caisse de compensation",
    ],
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Gagnez du temps",
    titleEn: "Save time",
    description: "Concentrez-vous sur votre métier, on gère la paperasse.",
    descriptionEn: "Focus on your job, we handle the paperwork.",
  },
  {
    icon: PiggyBank,
    title: "Économisez des impôts",
    titleEn: "Save on taxes",
    description: "On connaît toutes les déductions auxquelles vous avez droit.",
    descriptionEn: "We know all the deductions you're entitled to.",
  },
  {
    icon: Shield,
    title: "Restez en règle",
    titleEn: "Stay compliant",
    description: "Fini le stress des délais et des erreurs administratives.",
    descriptionEn: "No more stress about deadlines and administrative errors.",
  },
  {
    icon: Zap,
    title: "100% digital",
    titleEn: "100% digital",
    description: "Envoyez vos documents par email ou via notre espace client.",
    descriptionEn: "Send your documents by email or via our client portal.",
  },
];

const faqs = [
  {
    question: "Combien coûte un comptable pour indépendant en Suisse ?",
    questionEn: "How much does an accountant cost for self-employed in Switzerland?",
    answer: "Chez Neofidu, la comptabilité pour indépendants démarre à CHF 500.- par an. Ce forfait inclut la tenue comptable, le bouclement annuel et les conseils d'optimisation. Le tarif exact dépend de votre volume de transactions. Demandez un devis gratuit pour connaître votre prix.",
    answerEn: "At Neofidu, accounting for self-employed starts at CHF 500.- per year. This package includes bookkeeping, annual closing and optimization advice. The exact rate depends on your transaction volume. Request a free quote to know your price.",
  },
  {
    question: "Quelles sont les obligations comptables d'un indépendant ?",
    questionEn: "What are the accounting obligations of a self-employed person?",
    answer: "En Suisse, un indépendant doit tenir une comptabilité simplifiée (recettes/dépenses) si son chiffre d'affaires est inférieur à CHF 500'000. Au-delà, une comptabilité en partie double est obligatoire. Vous devez conserver vos justificatifs pendant 10 ans. La TVA devient obligatoire dès CHF 100'000 de CA annuel.",
    answerEn: "In Switzerland, a self-employed person must keep simplified accounts (income/expenses) if their turnover is less than CHF 500,000. Above that, double-entry bookkeeping is mandatory. You must keep your receipts for 10 years. VAT becomes mandatory from CHF 100,000 annual turnover.",
  },
  {
    question: "Comment devenir indépendant en Suisse ?",
    questionEn: "How to become self-employed in Switzerland?",
    answer: "Pour devenir indépendant : 1) Obtenez la reconnaissance de votre statut auprès d'une caisse AVS, 2) Inscrivez-vous au Registre du Commerce si votre CA dépasse CHF 100'000, 3) Assujettissez-vous à la TVA si nécessaire, 4) Souscrivez les assurances adéquates (APG, perte de gain). Neofidu vous accompagne dans toutes ces démarches.",
    answerEn: "To become self-employed: 1) Get recognition of your status from an AVS fund, 2) Register with the Commercial Register if your turnover exceeds CHF 100,000, 3) Register for VAT if necessary, 4) Take out adequate insurance (APG, loss of earnings). Neofidu supports you in all these steps.",
  },
  {
    question: "Quelle différence entre raison individuelle et Sàrl ?",
    questionEn: "What's the difference between sole proprietorship and LLC?",
    answer: "La raison individuelle est simple et gratuite à créer, mais vous êtes responsable sur vos biens personnels. La Sàrl protège vos biens personnels (responsabilité limitée au capital de CHF 20'000), offre une meilleure image et permet des optimisations fiscales (mix salaire/dividendes). On vous conseille selon votre situation.",
    answerEn: "Sole proprietorship is simple and free to create, but you're liable with your personal assets. The LLC protects your personal assets (liability limited to CHF 20,000 capital), offers a better image and allows tax optimizations (salary/dividend mix). We advise you based on your situation.",
  },
  {
    question: "Puis-je déduire mes frais de bureau à domicile ?",
    questionEn: "Can I deduct my home office expenses?",
    answer: "Oui ! Si vous travaillez régulièrement depuis chez vous, vous pouvez déduire une partie de votre loyer, électricité, internet, etc. au prorata de la surface utilisée. On calcule la déduction optimale pour vous et on s'assure qu'elle soit acceptée par le fisc.",
    answerEn: "Yes! If you work regularly from home, you can deduct part of your rent, electricity, internet, etc. pro rata to the area used. We calculate the optimal deduction for you and make sure it's accepted by the tax authorities.",
  },
  {
    question: "Vous occupez-vous des cotisations AVS ?",
    questionEn: "Do you handle AVS contributions?",
    answer: "Absolument. On calcule vos cotisations AVS/AI/APG en fonction de votre revenu estimé, on vous rappelle les échéances de paiement, et on ajuste les acomptes si nécessaire. À la fin de l'année, on prépare la déclaration de revenus pour la caisse de compensation.",
    answerEn: "Absolutely. We calculate your AVS/AI/APG contributions based on your estimated income, remind you of payment deadlines, and adjust installments if necessary. At the end of the year, we prepare the income declaration for the compensation fund.",
  },
  {
    question: "Vous intervenez dans quel canton ?",
    questionEn: "Which cantons do you operate in?",
    answer: "NeoFidu accompagne les indépendants et freelances dans toute la Suisse romande : Vaud (Lausanne, Morges, Nyon, Yverdon), Genève, Valais (Sion, Martigny), Fribourg, Neuchâtel et Jura. Service 100 % en ligne.",
    answerEn: "NeoFidu serves self-employed and freelancers across French-speaking Switzerland: Vaud (Lausanne, Morges, Nyon), Geneva, Valais (Sion, Martigny), Fribourg, Neuchâtel and Jura. 100% online service.",
  },
  {
    question: "Vous gérez la comptabilité des indépendants en Valais ?",
    questionEn: "Do you handle accounting for self-employed in Valais?",
    answer: "Oui, NeoFidu gère la comptabilité des indépendants en Valais. Déclaration d’impôts, TVA, AVS/AI : on s’occupe de tout à distance. Parfait pour les freelances et raisons individuelles à Sion, Martigny ou Monthey.",
    answerEn: "Yes, NeoFidu handles accounting for self-employed in Valais. Tax returns, VAT, AVS/AI – we handle everything remotely. Perfect for freelancers and sole traders in Sion, Martigny or Monthey.",
  },
];



export default function IndependantsPage() {
  const { isEnglish } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <BreadcrumbLight
            items={[{ label: isEnglish ? "Self-employed & Freelancers" : "Indépendants & Freelances" }]}
            className="mb-8"
          />

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Briefcase className="w-4 h-4 mr-1" />
              {isEnglish ? "For self-employed" : "Pour les indépendants"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {isEnglish ? (
                <>
                  Accounting for <span className="text-gradient">freelancers</span> made simple
                </>
              ) : (
                <>
                  La comptabilité des <span className="text-gradient">indépendants</span>, en toute simplicité
                </>
              )}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isEnglish
                ? "You do your job, we handle the numbers. Accounting, taxes, VAT, business creation — everything is taken care of. From CHF 500.-/year."
                : "Vous faites votre métier, on s'occupe des chiffres. Comptabilité, impôts, TVA, création d'entreprise — tout est pris en charge. Dès CHF 500.-/an."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande">
                <Button size="lg" className="px-8">
                  {isEnglish ? "Get a free quote" : "Demander un devis gratuit"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/tarifs">
                <Button size="lg" variant="outline" className="px-8">
                  {isEnglish ? "See pricing" : "Voir les tarifs"}
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Free quote" : "Devis gratuit"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Fast response" : "Réponse rapide"}</span>
              </div>
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {isEnglish ? benefit.titleEn : benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isEnglish ? benefit.descriptionEn : benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Services Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Our services for self-employed" : "Nos services pour indépendants"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Everything you need to manage your business with peace of mind"
                  : "Tout ce dont vous avez besoin pour gérer votre activité en toute sérénité"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-2 bg-gradient-to-r from-primary to-emerald-500" />
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {isEnglish ? service.titleEn : service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {isEnglish ? service.descriptionEn : service.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground">dès </span>
                      <span className="text-3xl font-bold text-primary">CHF {service.price}.-</span>
                      <span className="text-muted-foreground">{service.unit}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {(isEnglish ? service.featuresEn : service.features).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={service.title === "Création d'entreprise" ? "/creation-entreprise#contact-creation" : "/demande"}>
                      <Button className="w-full">
                        {isEnglish ? "Get started" : "Commencer"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Express Options */}
            <Card className="mt-8 overflow-hidden border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 via-white to-emerald-50/50">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">
                      {isEnglish ? "Need it faster?" : "Besoin d'un traitement plus rapide ?"}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      {isEnglish
                        ? "Speed up your tax declaration with our express options:"
                        : "Accélérez le traitement de votre déclaration fiscale avec nos options express :"}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">
                          {isEnglish ? "Priority (7 days)" : "Prioritaire (7 jours)"}
                        </span>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                          +CHF 20
                        </Badge>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">
                        <Zap className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">
                          {isEnglish ? "Express (48h)" : "Express (48h)"}
                        </span>
                        <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                          +CHF 120
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {isEnglish
                        ? "Standard processing: 10 business days. Select your option during checkout."
                        : "Traitement standard : 10 jours ouvrés. Sélectionnez votre option lors de la commande."}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Creation Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-primary/5 to-emerald-50 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <Badge className="mb-4 bg-emerald-100 text-emerald-700">
                  <Building2 className="w-4 h-4 mr-1" />
                  {isEnglish ? "Business creation" : "Création d'entreprise"}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {isEnglish
                    ? "We support you from the start"
                    : "On vous accompagne dès le départ"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {isEnglish
                    ? "Want to become self-employed or create your company? We handle all the administrative procedures for you."
                    : "Vous voulez devenir indépendant ou créer votre société ? On s'occupe de toutes les démarches administratives pour vous."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {creationServices.map((service, index) => (
                  <Card key={index} className="p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">
                        {isEnglish ? service.titleEn : service.title}
                      </h3>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        dès CHF {service.price}.-
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {isEnglish ? service.descriptionEn : service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/creation-entreprise#contact-creation">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    {isEnglish ? "Discuss my project" : "Discuter de mon projet"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.section>



                    {/* Zones desservies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Serving freelancers across French-speaking Switzerland" : "Indépendants en Suisse romande : on est là"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "NeoFidu supports self-employed and freelancers in Vaud, Geneva and Valais — 100% online."
                  : "NeoFidu accompagne les indépendants et freelances à Vaud, Genève et en Valais — 100 % en ligne."}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-white rounded-2xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2">{isEnglish ? "Canton of Vaud" : "Canton de Vaud"}</h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Accounting and taxes for freelancers in Lausanne, Morges, Nyon, Yverdon and across Vaud."
                    : "Comptabilité et déclaration d’impôts pour indépendants à Lausanne, Morges, Nyon, Yverdon et dans tout le canton."}
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2">{isEnglish ? "Canton of Geneva" : "Canton de Genève"}</h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Tax returns and bookkeeping for Geneva-based self-employed and freelancers."
                    : "Déclaration d’impôts et comptabilité pour indépendants et freelances à Genève."}
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2">{isEnglish ? "Canton of Valais" : "Canton du Valais"}</h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Accounting, VAT and taxes for self-employed in Sion, Martigny and across Valais."
                    : "Comptabilité, TVA et impôts pour indépendants à Sion, Martigny et dans tout le Valais."}
                </p>
              </div>
            </div>
          </motion.section>

{/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Frequently asked questions" : "Questions fréquentes"}
              </h2>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "Everything you need to know about accounting for self-employed"
                  : "Tout ce que vous devez savoir sur la comptabilité des indépendants"}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden transition-all ${openFaq === index ? "ring-2 ring-primary" : ""}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold">
                      {isEnglish ? faq.questionEn : faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground">
                        {isEnglish ? faq.answerEn : faq.answer}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/faq" className="text-primary hover:underline inline-flex items-center gap-2">
                {isEnglish ? "See all FAQs" : "Voir toutes les questions"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.section>

          {/* Related Content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-20"
          >
            <div className="bg-secondary/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">
                {isEnglish ? "Useful resources" : "Ressources utiles"}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="font-semibold mb-3">{isEnglish ? "Free tools" : "Outils gratuits"}</p>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/simulateur/impots" className="text-primary hover:underline flex items-center gap-2">
                        <Calculator className="w-4 h-4" />
                        {isEnglish ? "Tax calculator" : "Simulateur d'impôts"}
                      </Link>
                    </li>
                    <li>
                      <Link href="/simulateur/3eme-pilier" className="text-primary hover:underline flex items-center gap-2">
                        <PiggyBank className="w-4 h-4" />
                        {isEnglish ? "3rd pillar calculator" : "Calculateur 3ème pilier"}
                      </Link>
                    </li>
                    <li>
                      <Link href="/simulateur/salaire-net" className="text-primary hover:underline flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {isEnglish ? "Net salary calculator" : "Simulateur salaire net"}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-3">{isEnglish ? "Guides" : "Guides"}</p>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/blog/creer-entreprise-suisse-2026" className="text-primary hover:underline flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {isEnglish ? "Start a business in Switzerland" : "Créer son entreprise en Suisse"}
                      </Link>
                    </li>
                    <li>
                      <Link href="/guide/deductions-fiscales" className="text-primary hover:underline flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {isEnglish ? "Tax deductions guide" : "Guide déductions fiscales"}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-3">{isEnglish ? "Our regions" : "Nos régions"}</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/cantons/vaud" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Vaud</Link>
                    <Link href="/cantons/geneve" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Genève</Link>
                    <Link href="/cantons/fribourg" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Fribourg</Link>
                    <Link href="/cantons/valais" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Valais</Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gradient-to-r from-primary to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isEnglish
                ? "Ready to simplify your accounting?"
                : "Prêt à simplifier votre comptabilité ?"}
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              {isEnglish
                ? "Join hundreds of self-employed and freelancers who trust Neofidu. Free quote, no commitment."
                : "Faites confiance à Neofidu pour votre comptabilité. Devis gratuit, sans engagement."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8">
                  {isEnglish ? "Get my free quote" : "Obtenir mon devis gratuit"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/tarifs">
                <Button size="lg" className="bg-white/10 border-2 border-white text-white hover:bg-white/30 px-8">
                  {isEnglish ? "View pricing" : "Voir les tarifs"}
                </Button>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
