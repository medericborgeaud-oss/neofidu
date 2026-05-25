"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import {
  FileText,
  Shield,
  Clock,
  CheckCircle2,
  ChevronDown,
  Upload,
  Search,
  Send,
  ArrowRight,
  Calculator,
  Smartphone,
  Users,
  MapPin,
  Star,
  Banknote,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function ParticuliersPage() {
  const { isEnglish } = useLanguage();

  const steps = isEnglish
    ? [
        {
          icon: Upload,
          title: "Upload your documents",
          desc: "Salary certificate, bank statements, insurance documents — send everything securely from your phone or computer.",
        },
        {
          icon: Search,
          title: "Analysis by our experts",
          desc: "A certified specialist reviews your file and optimizes every deduction you’re entitled to.",
        },
        {
          icon: FileText,
          title: "Review & validation",
          desc: "You receive your completed tax return for review. We explain every choice made.",
        },
        {
          icon: Send,
          title: "Submission",
          desc: "Once validated, we submit your return electronically to the tax authority.",
        },
      ]
    : [
        {
          icon: Upload,
          title: "Envoyez vos documents",
          desc: "Certificat de salaire, relevés bancaires, attestations d’assurance — transmettez tout en quelques clics depuis votre téléphone ou ordinateur.",
        },
        {
          icon: Search,
          title: "Analyse par nos experts",
          desc: "Un spécialiste diplômé analyse votre dossier et optimise chaque déduction à laquelle vous avez droit.",
        },
        {
          icon: FileText,
          title: "Vérification & validation",
          desc: "Vous recevez votre déclaration complétée pour relecture. Nous vous expliquons chaque choix.",
        },
        {
          icon: Send,
          title: "Soumission",
          desc: "Une fois validée, nous déposons votre déclaration par voie électronique auprès de l’autorité fiscale.",
        },
      ];

  const situations = isEnglish
    ? [
        {
          icon: Users,
          title: "Employed (single or couple)",
          desc: "Salary, bonuses, benefits in kind — we handle your complete return with all applicable deductions.",
        },
        {
          icon: MapPin,
          title: "New to a canton",
          desc: "You recently moved? We know the specific rules for each canton and ensure nothing is missed.",
        },
        {
          icon: Banknote,
          title: "Property owner",
          desc: "Rental value, mortgage interest, maintenance costs — we optimize your real estate taxation.",
        },
        {
          icon: Star,
          title: "First tax return",
          desc: "Just turned 18 or started working? We guide you through your very first declaration step by step.",
        },
      ]
    : [
        {
          icon: Users,
          title: "Salarié (seul ou en couple)",
          desc: "Salaire, bonus, avantages en nature — nous gérons votre déclaration complète avec toutes les déductions applicables.",
        },
        {
          icon: MapPin,
          title: "Nouvel arrivant dans un canton",
          desc: "Vous avez récemment déménagé ? Nous connaissons les règles spécifiques de chaque canton et veillons à ne rien oublier.",
        },
        {
          icon: Banknote,
          title: "Propriétaire immobilier",
          desc: "Valeur locative, intérêts hypothécaires, frais d’entretien — nous optimisons votre imposition immobilière.",
        },
        {
          icon: Star,
          title: "Première déclaration",
          desc: "Vous venez d’avoir 18 ans ou commencez à travailler ? Nous vous guidons pas à pas pour votre toute première déclaration.",
        },
      ];

  const deductions = isEnglish
    ? [
        "Professional expenses (commuting, meals, tools)",
        "3rd pillar (3a) contributions",
        "Mortgage interest and maintenance",
        "Insurance premiums (health, accident)",
        "Childcare costs",
        "Training and education expenses",
        "Medical expenses above the threshold",
        "Charitable donations",
      ]
    : [
        "Frais professionnels (transport, repas, outils)",
        "Cotisations 3ème pilier (3a)",
        "Intérêts hypothécaires et frais d’entretien",
        "Primes d’assurance (maladie, accident)",
        "Frais de garde d’enfants",
        "Frais de formation et perfectionnement",
        "Frais médicaux au-delà du seuil",
        "Dons et libéralités",
      ];

  const tarifs = isEnglish
    ? [
        {
          name: "Single, no property",
          price: "89",
          features: [
            "1 salary certificate",
            "Standard deductions",
            "Electronic submission",
            "Expert review",
          ],
        },
        {
          name: "Single, with property",
          price: "149",
          features: [
            "Salary + rental value",
            "Mortgage optimization",
            "Maintenance deductions",
            "Electronic submission",
          ],
          popular: true,
        },
        {
          name: "Couple / Family",
          price: "169",
          features: [
            "2 salary certificates",
            "Joint declaration",
            "Childcare deductions",
            "Electronic submission",
          ],
        },
      ]
    : [
        {
          name: "Célibataire, sans bien",
          price: "89",
          features: [
            "1 certificat de salaire",
            "Déductions standard",
            "Dépôt électronique",
            "Vérification par un expert",
          ],
        },
        {
          name: "Célibataire, avec bien",
          price: "149",
          features: [
            "Salaire + valeur locative",
            "Optimisation hypothèque",
            "Déductions entretien",
            "Dépôt électronique",
          ],
          popular: true,
        },
        {
          name: "Couple / Famille",
          price: "169",
          features: [
            "2 certificats de salaire",
            "Déclaration commune",
            "Déductions garde d’enfants",
            "Dépôt électronique",
          ],
        },
      ];

  const faqs = isEnglish
    ? [
        {
          q: "What documents do I need to provide?",
          a: "At minimum: your salary certificate, bank/investment statements as of December 31, health insurance premium statements, and any receipts for deductible expenses (3rd pillar, donations, childcare, etc.). We provide a detailed checklist after you sign up.",
        },
        {
          q: "How long does it take?",
          a: "Once we receive all your documents, your declaration is typically completed within 5 to 10 business days. During peak season (February-March), it may take up to 15 days.",
        },
        {
          q: "Which cantons do you cover?",
          a: "We serve all 6 French-speaking cantons: Vaud, Geneva, Valais, Fribourg, Neuchâtel, and Jura. Each declaration is handled by a specialist familiar with the specific cantonal rules.",
        },
        {
          q: "Can I still save money if I'm just a simple employee?",
          a: "Absolutely. Many employees miss deductions they're entitled to: effective professional expenses instead of the flat rate, 3rd pillar contributions, training costs, medical expenses, and more. On average, our clients save significantly more than our fee.",
        },
        {
          q: "What if I have a deadline extension?",
          a: "We can request a deadline extension on your behalf if needed. Most cantons allow extensions until September or later. We handle the administrative process for you.",
        },
        {
          q: "Is my data secure?",
          a: "Yes. All data is encrypted and stored on Swiss servers. We comply with the Swiss Federal Data Protection Act (LPD/nDSG). Your documents are deleted after 10 years as required by law.",
        },
      ]
    : [
        {
          q: "Quels documents dois-je fournir ?",
          a: "Au minimum : votre certificat de salaire, les relevés bancaires et de titres au 31 décembre, les attestations de primes d’assurance maladie, et les justificatifs de dépenses déductibles (3ème pilier, dons, garde d’enfants, etc.). Nous vous envoyons une checklist détaillée après votre inscription.",
        },
        {
          q: "Combien de temps cela prend-il ?",
          a: "Une fois tous vos documents reçus, votre déclaration est généralement complétée en 5 à 10 jours ouvrables. En période de pointe (février-mars), cela peut prendre jusqu’à 15 jours.",
        },
        {
          q: "Quels cantons couvrez-vous ?",
          a: "Nous couvrons les 6 cantons romands : Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura. Chaque déclaration est traitée par un spécialiste qui connaît les règles cantonales spécifiques.",
        },
        {
          q: "Puis-je économiser même en tant que simple salarié ?",
          a: "Absolument. Beaucoup de salariés passent à côté de déductions auxquelles ils ont droit : frais professionnels effectifs au lieu du forfait, cotisations 3ème pilier, frais de formation, frais médicaux, etc. En moyenne, nos clients économisent bien plus que le coût de nos honoraires.",
        },
        {
          q: "Et si j’ai besoin d’une prolongation de délai ?",
          a: "Nous pouvons demander une prolongation de délai en votre nom si nécessaire. La plupart des cantons autorisent des prolongations jusqu’en septembre ou plus tard. Nous nous chargeons de la démarche administrative.",
        },
        {
          q: "Mes données sont-elles en sécurité ?",
          a: "Oui. Toutes les données sont chiffrées et stockées sur des serveurs suisses. Nous respectons la Loi fédérale sur la protection des données (LPD/nDSG). Vos documents sont supprimés après 10 ans conformément à la loi.",
        },
      ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center"
            >
              <motion.div variants={fadeInUp} className="flex justify-center gap-3 mb-6">
                <span className="bg-blue-800/60 text-blue-200 text-sm px-4 py-1.5 rounded-full border border-blue-700/50">
                  {isEnglish ? "6 cantons" : "6 cantons"}
                </span>
                <span className="bg-blue-800/60 text-blue-200 text-sm px-4 py-1.5 rounded-full border border-blue-700/50">
                  {isEnglish ? "100% online" : "100% en ligne"}
                </span>
                <span className="bg-blue-800/60 text-blue-200 text-sm px-4 py-1.5 rounded-full border border-blue-700/50">
                  {isEnglish ? "From CHF 89.-" : "Dès CHF 89.-"}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                {isEnglish
                  ? "Your tax return, handled by experts"
                  : "Votre déclaration d’impôts, gérée par des experts"}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                {isEnglish
                  ? "Upload your documents, and our certified specialists take care of everything. Optimized deductions, electronic submission, peace of mind."
                  : "Envoyez vos documents, nos spécialistes diplômés s’occupent de tout. Déductions optimisées, dépôt électronique, tranquillité d’esprit."}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demande"
                  className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  {isEnglish ? "Submit my request" : "Déposer ma demande"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/simulateur"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  {isEnglish ? "Simulate my taxes" : "Simuler mes impôts"}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 border-b">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10+", label: isEnglish ? "years of experience" : "ans d’expérience" },
                { value: "6", label: isEnglish ? "cantons covered" : "cantons couverts" },
                { value: "24/7", label: isEnglish ? "online access" : "accès en ligne" },
                {
                  value: isEnglish ? "CHF 89.-" : "CHF 89.-",
                  label: isEnglish ? "starting price" : "prix de départ",
                },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-blue-900">{stat.value}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose NeoFidu */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-14"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isEnglish
                  ? "Why trust NeoFidu with your declaration?"
                  : "Pourquoi confier votre déclaration à NeoFidu ?"}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isEnglish
                  ? "We combine digital simplicity with professional expertise."
                  : "Nous combinons la simplicité du digital avec l’expertise professionnelle."}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Shield,
                  title: isEnglish ? "Certified experts" : "Experts diplômés",
                  desc: isEnglish
                    ? "Every return is handled by a qualified tax specialist with cantonal expertise."
                    : "Chaque déclaration est traitée par un spécialiste fiscal qualifié avec une expertise cantonale.",
                },
                {
                  icon: Smartphone,
                  title: isEnglish ? "100% online" : "100% en ligne",
                  desc: isEnglish
                    ? "Upload documents from your phone, track progress in real-time, no office visit needed."
                    : "Envoyez vos documents depuis votre téléphone, suivez l’avancement en temps réel, aucun déplacement.",
                },
                {
                  icon: Banknote,
                  title: isEnglish ? "Transparent pricing" : "Tarifs transparents",
                  desc: isEnglish
                    ? "Fixed prices from CHF 89.- No surprises, no hidden fees."
                    : "Prix fixes dès CHF 89.- Pas de surprise, pas de frais cachés.",
                },
                {
                  icon: Clock,
                  title: isEnglish ? "Fast turnaround" : "Rapidité",
                  desc: isEnglish
                    ? "Your declaration completed in 5-10 business days. Deadline extensions handled."
                    : "Votre déclaration complétée en 5-10 jours ouvrables. Prolongations gérées.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process steps */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-14"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? "How it works" : "Comment ça marche"}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isEnglish
                  ? "A simple 4-step process, entirely online."
                  : "Un processus simple en 4 étapes, entièrement en ligne."}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-4 gap-8"
            >
              {steps.map((step, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center relative">
                  <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-blue-200" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Situations */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-14"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? "Whatever your situation" : "Quelle que soit votre situation"}
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {situations.map((sit, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <sit.icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{sit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{sit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Deductions */}
        <section className="py-20 bg-blue-950 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-14"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                {isEnglish
                  ? "Deductions we optimize for you"
                  : "Les déductions que nous optimisons pour vous"}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-blue-200 max-w-2xl mx-auto">
                {isEnglish
                  ? "Our experts know every deduction available in your canton."
                  : "Nos experts connaissent chaque déduction disponible dans votre canton."}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto"
            >
              {deductions.map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tarifs */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-14"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? "Clear, fixed pricing" : "Des tarifs clairs et fixes"}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600">
                {isEnglish
                  ? "No surprises. You know the price before you start."
                  : "Pas de surprise. Vous connaissez le prix avant de commencer."}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {tarifs.map((tarif, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`relative rounded-2xl p-6 border-2 ${
                    (tarif as { popular?: boolean }).popular
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {(tarif as { popular?: boolean }).popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      {isEnglish ? "Most popular" : "Le plus populaire"}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tarif.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-900">CHF {tarif.price}.-</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tarif.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/demande"
                    className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                      (tarif as { popular?: boolean }).popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {isEnglish ? "Get started" : "Commencer"}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <p className="text-center text-sm text-gray-500 mt-8">
              {isEnglish
                ? "Prices valid for 2025 tax year. See full pricing on our "
                : "Prix valables pour l’année fiscale 2025. Voir tous les tarifs sur notre "}
              <Link href="/tarifs" className="text-blue-600 underline">
                {isEnglish ? "pricing page" : "page tarifs"}
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Cantons */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isEnglish ? "Available in 6 cantons" : "Disponible dans 6 cantons"}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Vaud", href: "/cantons/vaud" },
                { name: "Genève", href: "/cantons/geneve" },
                { name: "Valais", href: "/cantons/valais" },
                { name: "Fribourg", href: "/cantons/fribourg" },
                { name: "Neuchâtel", href: "/cantons/neuchatel" },
                { name: "Jura", href: "/cantons/jura" },
              ].map((canton) => (
                <Link
                  key={canton.name}
                  href={canton.href}
                  className="bg-white border border-gray-200 rounded-xl px-6 py-3 font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {canton.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center"
              >
                {isEnglish ? "Frequently asked questions" : "Questions fréquentes"}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-600 text-center mb-10"
              >
                {isEnglish
                  ? "Everything you need to know about our service."
                  : "Tout ce que vous devez savoir sur notre service."}
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-3">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isEnglish
                ? "Ready to simplify your taxes?"
                : "Prêt à simplifier vos impôts ?"}
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              {isEnglish
                ? "Join thousands of satisfied clients in French-speaking Switzerland. Your declaration starts at CHF 89.-"
                : "Rejoignez des milliers de clients satisfaits en Suisse romande. Votre déclaration dès CHF 89.-"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demande"
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                {isEnglish ? "Submit my request" : "Déposer ma demande"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/simulateur"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {isEnglish ? "Try our free simulator" : "Essayer notre simulateur gratuit"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
