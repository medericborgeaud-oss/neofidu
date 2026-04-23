"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { CreationEntrepriseForm } from "@/components/CreationEntrepriseForm";
import {
  Check,
  ArrowRight,
  Rocket,
  Building2,
  Users,
  Clock,
  Shield,
  FileText,
  Calculator,
  Star,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Scale,
  Banknote,
  ClipboardCheck,
  UserCheck,
  TrendingUp,
  HelpCircle,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { useState } from "react";

const companyTypes = [
  {
    id: "ri",
    name: "Raison individuelle",
    nameEn: "Sole Proprietorship",
    subtitle: "La solution la plus simple pour démarrer",
    subtitleEn: "The simplest solution to get started",
    price: "290",
    icon: Users,
    color: "emerald",
    ideal: "Freelances, consultants",
    idealEn: "Freelancers, consultants",
    capital: "Aucun minimum",
    capitalEn: "No minimum",
    advantages: [
      "Création simple et rapide",
      "Aucun capital minimum requis",
      "Comptabilité simplifiée possible",
      "Frais de constitution très faibles",
    ],
    advantagesEn: [
      "Simple and fast creation",
      "No minimum capital required",
      "Simplified accounting possible",
      "Very low formation costs",
    ],
    included: [
      "Analyse de votre projet",
      "Affiliation AVS/AI",
      "Inscription RC (si nécessaire)",
      "Conseil assurances",
      "Accompagnement 1er mois",
    ],
  },
  {
    id: "sarl",
    name: "Sàrl",
    nameEn: "LLC",
    subtitle: "Le meilleur compromis pour les PME",
    subtitleEn: "The best compromise for SMEs",
    price: "990",
    icon: Building2,
    color: "violet",
    popular: true,
    ideal: "Petites équipes, activités à risque",
    idealEn: "Small teams, risky activities",
    capital: "CHF 20'000.- minimum",
    capitalEn: "CHF 20,000.- minimum",
    advantages: [
      "Responsabilité limitée au capital",
      "Image professionnelle renforcée",
      "Optimisation fiscale possible",
      "Facilement transmissible",
    ],
    advantagesEn: [
      "Liability limited to capital",
      "Enhanced professional image",
      "Tax optimization possible",
      "Easily transferable",
    ],
    included: [
      "Conseil forme juridique",
      "Rédaction des statuts",
      "Coordination notaire",
      "Inscription au RC",
      "Affiliation caisses sociales",
      "Déclaration TVA si nécessaire",
      "Accompagnement 3 mois",
    ],
  },
  {
    id: "sa",
    name: "SA",
    nameEn: "AG (Corporation)",
    subtitle: "Pour les projets ambitieux",
    subtitleEn: "For ambitious projects",
    price: "1490",
    icon: Briefcase,
    color: "amber",
    ideal: "Startups, levée de fonds",
    idealEn: "Startups, fundraising",
    capital: "CHF 100'000.- minimum",
    capitalEn: "CHF 100,000.- minimum",
    advantages: [
      "Crédibilité maximale",
      "Idéale pour lever des fonds",
      "Actionnaires anonymes possibles",
      "Structure adaptée à la croissance",
    ],
    advantagesEn: [
      "Maximum credibility",
      "Ideal for fundraising",
      "Anonymous shareholders possible",
      "Structure adapted to growth",
    ],
    included: [
      "Conseil stratégique complet",
      "Rédaction statuts sur mesure",
      "Coordination notaire",
      "Inscription au RC",
      "Affiliations sociales",
      "Déclaration TVA",
      "Conseil gouvernance",
      "Accompagnement 6 mois",
    ],
  },
];

const comparisonData = [
  {
    criterion: "Capital minimum",
    criterionEn: "Minimum capital",
    ri: "Aucun",
    riEn: "None",
    sarl: "CHF 20'000.-",
    sa: "CHF 100'000.-",
  },
  {
    criterion: "Libération du capital",
    criterionEn: "Capital release",
    ri: "-",
    riEn: "-",
    sarl: "100% à la création",
    sarlEn: "100% at creation",
    sa: "50% minimum",
    saEn: "50% minimum",
  },
  {
    criterion: "Responsabilité",
    criterionEn: "Liability",
    ri: "Illimitée (biens personnels)",
    riEn: "Unlimited (personal assets)",
    sarl: "Limitée au capital",
    sarlEn: "Limited to capital",
    sa: "Limitée au capital",
    saEn: "Limited to capital",
  },
  {
    criterion: "Nombre d'associés",
    criterionEn: "Number of partners",
    ri: "1 seul",
    riEn: "1 only",
    sarl: "1 à 50",
    sa: "1 ou plus",
    saEn: "1 or more",
  },
  {
    criterion: "Anonymat des associés",
    criterionEn: "Partner anonymity",
    ri: "Non",
    riEn: "No",
    sarl: "Non",
    sarlEn: "No",
    sa: "Oui (possible)",
    saEn: "Yes (possible)",
  },
  {
    criterion: "Inscription au RC",
    criterionEn: "CR registration",
    ri: "Facultative < 100k CA",
    riEn: "Optional < 100k revenue",
    sarl: "Obligatoire",
    sarlEn: "Mandatory",
    sa: "Obligatoire",
    saEn: "Mandatory",
  },
  {
    criterion: "Passage chez le notaire",
    criterionEn: "Notary required",
    ri: "Non",
    riEn: "No",
    sarl: "Oui",
    sarlEn: "Yes",
    sa: "Oui",
    saEn: "Yes",
  },
  {
    criterion: "Comptabilité",
    criterionEn: "Accounting",
    ri: "Simplifiée possible",
    riEn: "Simplified possible",
    sarl: "Partie double",
    sarlEn: "Double-entry",
    sa: "Partie double",
    saEn: "Double-entry",
  },
  {
    criterion: "Imposition",
    criterionEn: "Taxation",
    ri: "Revenu personnel",
    riEn: "Personal income",
    sarl: "Bénéfice société + dividendes",
    sarlEn: "Corporate profit + dividends",
    sa: "Bénéfice société + dividendes",
    saEn: "Corporate profit + dividends",
  },
  {
    criterion: "Délai de création",
    criterionEn: "Creation time",
    ri: "1-2 semaines",
    riEn: "1-2 weeks",
    sarl: "2-3 semaines",
    sarlEn: "2-3 weeks",
    sa: "3-4 semaines",
    saEn: "3-4 weeks",
  },
  {
    criterion: "Coût total estimé*",
    criterionEn: "Estimated total cost*",
    ri: "CHF 300 - 500",
    sarl: "CHF 2'500 - 4'000",
    sa: "CHF 4'000 - 8'000",
  },
];

const processSteps = [
  { number: "01", title: "Premier échange gratuit", titleEn: "Free initial call", icon: MessageCircle },
  { number: "02", title: "Devis et validation", titleEn: "Quote and validation", icon: ClipboardCheck },
  { number: "03", title: "Préparation documents", titleEn: "Document preparation", icon: FileText },
  { number: "04", title: "Constitution officielle", titleEn: "Official formation", icon: Scale },
  { number: "05", title: "Affiliations", titleEn: "Affiliations", icon: UserCheck },
  { number: "06", title: "Lancement activité", titleEn: "Activity launch", icon: Rocket },
];

const faqs = [
  {
    q: "Quelle forme juridique choisir ?",
    qEn: "Which legal form should I choose?",
    a: "Cela dépend de votre niveau de risque, vos besoins de financement et vos ambitions. La raison individuelle convient aux activités à faible risque. La Sàrl est idéale avec des associés ou risques financiers. La SA pour les levées de fonds.",
    aEn: "It depends on your risk level, financing needs and ambitions. Sole proprietorship suits low-risk activities. LLC is ideal with partners or financial risks. AG for fundraising.",
  },
  {
    q: "Combien de temps pour créer une entreprise ?",
    qEn: "How long to create a company?",
    a: "Raison individuelle: 1-2 semaines. Sàrl: 2-3 semaines. SA: 3-4 semaines. Ces délais peuvent être réduits si tous les documents sont prêts.",
    aEn: "Sole prop: 1-2 weeks. LLC: 2-3 weeks. AG: 3-4 weeks. Timelines can be shorter if documents are ready.",
  },
  {
    q: "Quels sont les frais de notaire ?",
    qEn: "What are the notary fees?",
    a: "Pour une Sàrl (CHF 20'000 capital): environ CHF 800-1'500. Pour une SA (CHF 100'000 capital): CHF 1'500-3'000. À cela s'ajoutent les frais RC (CHF 600-800). Nos tarifs n'incluent pas ces frais externes.",
    aEn: "For LLC (CHF 20k capital): around CHF 800-1,500. For AG (CHF 100k capital): CHF 1,500-3,000. Plus RC fees (CHF 600-800). Our rates don't include external fees.",
  },
  {
    q: "Puis-je transformer ma raison individuelle en Sàrl ?",
    qEn: "Can I convert my sole proprietorship to LLC?",
    a: "Oui, c'est possible et courant quand l'activité se développe. On peut effectuer une transformation qui permet de transférer les actifs vers la nouvelle Sàrl. Neofidu vous accompagne.",
    aEn: "Yes, it's possible and common when business grows. We can transfer assets to the new LLC. Neofidu supports you.",
  },
];

export default function CreationEntreprisePage() {
  const { isEnglish } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BreadcrumbLight
            items={[{ label: isEnglish ? "Company Creation" : "Création d'entreprise" }]}
            className="mb-8"
          />

          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-violet-100 text-violet-700">
              <Rocket className="w-4 h-4 mr-1" />
              {isEnglish ? "Company creation" : "Création d'entreprise"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {isEnglish ? "Create your " : "Créez votre "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                {isEnglish ? "company in Switzerland" : "entreprise en Suisse"}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isEnglish
                ? "Sole proprietorship, LLC or Corporation? We guide you through all steps. From CHF 290.-"
                : "Raison individuelle, Sàrl ou SA ? On vous accompagne dans toutes les démarches. Dès CHF 290.-"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact-creation">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 px-8">
                  {isEnglish ? "Free consultation" : "Premier échange gratuit"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#formes">
                <Button size="lg" variant="outline" className="px-8">
                  {isEnglish ? "Compare legal forms" : "Comparer les formes"}
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-violet-600" />
                <span>{isEnglish ? "Free first meeting" : "1er échange gratuit"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-violet-600" />
                <span>{isEnglish ? "Fast response" : "Réponse rapide"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-violet-600" />
                <span>{isEnglish ? "No commitment" : "Sans engagement"}</span>
              </div>
            </div>
          </motion.section>

          {/* Company Types */}
          <section id="formes" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Choose your legal form" : "Choisissez votre forme juridique"}
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {companyTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`relative overflow-hidden ${
                    type.popular ? "border-2 border-violet-500 shadow-xl" : "border hover:shadow-lg"
                  }`}
                >
                  {type.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                      <Star className="w-4 h-4 inline mr-1" />
                      {isEnglish ? "Most popular" : "Le plus populaire"}
                    </div>
                  )}
                  <div className={`p-6 ${type.popular ? "pt-14" : ""}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      type.color === "emerald" ? "bg-emerald-100" :
                      type.color === "violet" ? "bg-violet-100" : "bg-amber-100"
                    }`}>
                      <type.icon className={`w-7 h-7 ${
                        type.color === "emerald" ? "text-emerald-600" :
                        type.color === "violet" ? "text-violet-600" : "text-amber-600"
                      }`} />
                    </div>

                    <h3 className="text-xl font-bold mb-1">{isEnglish ? type.nameEn : type.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{isEnglish ? type.subtitleEn : type.subtitle}</p>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground">dès </span>
                      <span className={`text-3xl font-bold ${
                        type.color === "emerald" ? "text-emerald-600" :
                        type.color === "violet" ? "text-violet-600" : "text-amber-600"
                      }`}>CHF {type.price}.-</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isEnglish ? "Notary/RC fees not included" : "Frais notaire/RC non inclus"}
                      </p>
                    </div>

                    <div className="space-y-1 mb-4 text-sm">
                      <p><span className="text-muted-foreground">Capital: </span>{isEnglish ? type.capitalEn : type.capital}</p>
                      <p><span className="text-muted-foreground">{isEnglish ? "Ideal:" : "Idéal:"} </span>{isEnglish ? type.idealEn : type.ideal}</p>
                    </div>

                    <p className="text-sm font-semibold mb-2">{isEnglish ? "Advantages:" : "Avantages :"}</p>
                    <ul className="space-y-1 mb-4">
                      {(isEnglish ? type.advantagesEn : type.advantages).map((adv, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            type.color === "emerald" ? "text-emerald-500" :
                            type.color === "violet" ? "text-violet-500" : "text-amber-500"
                          }`} />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm font-semibold mb-2">{isEnglish ? "Included:" : "Inclus :"}</p>
                    <ul className="space-y-1 mb-6">
                      {type.included.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <BadgeCheck className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="#contact-creation">
                      <Button className={`w-full ${
                        type.color === "emerald" ? "bg-emerald-600 hover:bg-emerald-700" :
                        type.color === "violet" ? "bg-violet-600 hover:bg-violet-700" :
                        "bg-amber-600 hover:bg-amber-700"
                      }`}>
                        {isEnglish ? "Contact us" : "Contactez-nous"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Detailed comparison" : "Comparatif détaillé"}
              </h2>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "All the key differences at a glance"
                  : "Toutes les différences clés en un coup d'œil"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg min-w-[600px]">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                    <th className="p-4 text-left font-semibold w-1/4"></th>
                    <th className="p-4 text-center font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Users className="w-5 h-5" />
                        <span>{isEnglish ? "Sole Prop." : "Raison ind."}</span>
                        <span className="text-xs text-white/70">dès CHF 290.-</span>
                      </div>
                    </th>
                    <th className="p-4 text-center font-semibold bg-white/10">
                      <div className="flex flex-col items-center gap-1">
                        <Building2 className="w-5 h-5" />
                        <span>Sàrl</span>
                        <span className="text-xs text-white/70">dès CHF 990.-</span>
                      </div>
                    </th>
                    <th className="p-4 text-center font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Briefcase className="w-5 h-5" />
                        <span>SA</span>
                        <span className="text-xs text-white/70">dès CHF 1'490.-</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-violet-50/30"} hover:bg-violet-50 transition-colors`}
                    >
                      <td className="p-4 font-medium border-r border-violet-100">
                        {isEnglish ? row.criterionEn : row.criterion}
                      </td>
                      <td className="p-4 text-center text-sm">
                        {isEnglish ? (row.riEn || row.ri) : row.ri}
                      </td>
                      <td className="p-4 text-center text-sm bg-violet-50/50 font-medium">
                        {isEnglish ? (row.sarlEn || row.sarl) : row.sarl}
                      </td>
                      <td className="p-4 text-center text-sm">
                        {isEnglish ? (row.saEn || row.sa) : row.sa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              {isEnglish
                ? "* Total cost includes our fees + notary fees + Commercial Register fees. Varies by canton."
                : "* Coût total inclut nos honoraires + frais de notaire + frais du Registre du Commerce. Varie selon le canton."}
            </p>
          </section>

          {/* Process Steps */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "How it works" : "Comment ça marche"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step) => (
                <Card key={step.number} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{isEnglish ? step.titleEn : step.title}</h3>
                      <step.icon className="w-5 h-5 text-violet-500" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Why Neofidu */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {isEnglish ? "Why choose Neofidu?" : "Pourquoi choisir Neofidu ?"}
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: Banknote, title: isEnglish ? "Clear pricing" : "Prix transparents" },
                  { icon: Clock, title: isEnglish ? "Fast & efficient" : "Rapide et efficace" },
                  { icon: Shield, title: isEnglish ? "Complete support" : "Accompagnement complet" },
                  { icon: TrendingUp, title: isEnglish ? "Long-term partner" : "Partenaire long terme" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-violet-100 text-violet-700">
                <HelpCircle className="w-4 h-4 mr-1" />
                FAQ
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                {isEnglish ? "Frequently asked questions" : "Questions fréquentes"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className={`overflow-hidden ${openFaq === index ? "ring-2 ring-violet-500" : ""}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold">{isEnglish ? faq.qEn : faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-violet-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground">{isEnglish ? faq.aEn : faq.a}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-20" id="contact-creation">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-violet-600 text-white">
                <Phone className="w-4 h-4 mr-1" />
                {isEnglish ? "Free consultation" : "Consultation gratuite"}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Ready to start?" : "Prêt à lancer votre entreprise ?"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Fill out the form below and we'll contact you for a free consultation."
                  : "Remplissez le formulaire ci-dessous et nous vous contactons pour une consultation gratuite."}
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <CreationEntrepriseForm />
            </div>
          </section>

          {/* Resources */}
          <section>
            <div className="bg-secondary/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">{isEnglish ? "Useful resources" : "Ressources utiles"}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="font-semibold mb-3">{isEnglish ? "Related services" : "Services associés"}</p>
                  <ul className="space-y-2">
                    <li><Link href="/independants" className="text-violet-600 hover:underline flex items-center gap-2"><Users className="w-4 h-4" />{isEnglish ? "Freelance accounting" : "Comptabilité indépendants"}</Link></li>
                    <li><Link href="/tarifs" className="text-violet-600 hover:underline flex items-center gap-2"><Calculator className="w-4 h-4" />{isEnglish ? "Our pricing" : "Nos tarifs"}</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-3">{isEnglish ? "Free tools" : "Outils gratuits"}</p>
                  <ul className="space-y-2">
                    <li><Link href="/simulateur/impots" className="text-violet-600 hover:underline flex items-center gap-2"><Calculator className="w-4 h-4" />{isEnglish ? "Tax calculator" : "Simulateur d'impôts"}</Link></li>
                    <li><Link href="/simulateur/salaire-net" className="text-violet-600 hover:underline flex items-center gap-2"><Banknote className="w-4 h-4" />{isEnglish ? "Net salary" : "Salaire net"}</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-3">{isEnglish ? "Our regions" : "Nos régions"}</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Vaud", slug: "vaud" },
                      { name: "Genève", slug: "geneve" },
                      { name: "Fribourg", slug: "fribourg" },
                      { name: "Valais", slug: "valais" }
                    ].map(c => (
                      <Link key={c.slug} href={`/cantons/${c.slug}`} className="px-3 py-1 bg-white rounded-full text-sm hover:bg-violet-600 hover:text-white transition-colors">{c.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
