"use client";

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
  Check,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function ParticuliersPage() {
  const steps = [
    {
      icon: Upload,
      title: "Envoyez vos documents",
      desc: "Certificat de salaire, relevés bancaires, attestations — transmettez tout en quelques clics depuis votre téléphone ou ordinateur.",
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
      desc: "Une fois validée, nous déposons votre déclaration par voie électronique auprès de l'autorité fiscale.",
    },
  ];

  const situations = [
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
      desc: "Valeur locative, intérêts hypothécaires, frais d'entretien — nous optimisons votre imposition immobilière.",
    },
    {
      icon: Star,
      title: "Première déclaration",
      desc: "Vous venez d'avoir 18 ans ou commencez à travailler ? Nous vous guidons pas à pas pour votre toute première déclaration.",
    },
  ];

  const deductions = [
    "Frais professionnels (transport, repas, outils)",
    "Cotisations 3ème pilier (3a)",
    "Intérêts hypothécaires et frais d'entretien",
    "Primes d'assurance (maladie, accident)",
    "Frais de garde d'enfants",
    "Frais de formation et perfectionnement",
    "Frais médicaux au-delà du seuil",
    "Dons et libéralités",
  ];

  const tarifs = [
    {
      name: "Essentiel",
      price: "89",
      subtitle: "Dossier simple",
      features: [
        "1 certificat de salaire",
        "Déductions standard optimisées",
        "Dépôt électronique",
        "Vérification par un expert",
      ],
    },
    {
      name: "Confort",
      price: "149",
      subtitle: "Dossier avec immobilier ou cas particulier",
      features: [
        "Salaire + patrimoine immobilier",
        "Optimisation valeur locative & hypothèque",
        "Déductions entretien & rénovation",
        "Dépôt électronique",
      ],
      popular: true,
    },
    {
      name: "Complet",
      price: "169",
      subtitle: "Déclaration commune & situations complexes",
      features: [
        "Plusieurs certificats de salaire",
        "Déclaration commune optimisée",
        "Déductions famille & garde d'enfants",
        "Dépôt électronique",
      ],
    },
  ];

  const faqs = [
    {
      q: "Quels documents dois-je fournir ?",
      a: "Au minimum : votre certificat de salaire, les relevés bancaires et de titres au 31 décembre, les attestations de primes d'assurance maladie, et les justificatifs de dépenses déductibles (3ème pilier, dons, garde d'enfants, etc.). Nous vous envoyons une checklist détaillée après votre inscription.",
    },
    {
      q: "Combien de temps cela prend-il ?",
      a: "Une fois tous vos documents reçus, votre déclaration est généralement complétée en 5 à 10 jours ouvrables. En période de pointe (février-mars), cela peut prendre jusqu'à 15 jours.",
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
      q: "Et si j'ai besoin d'une prolongation de délai ?",
      a: "Nous pouvons demander une prolongation de délai en votre nom si nécessaire. La plupart des cantons autorisent des prolongations jusqu'en septembre ou plus tard. Nous nous chargeons de la démarche administrative.",
    },
    {
      q: "Mes données sont-elles en sécurité ?",
      a: "Oui. Toutes les données sont chiffrées et stockées sur des serveurs suisses. Nous respectons la Loi fédérale sur la protection des données (LPD/nDSG). Vos documents sont supprimés après 10 ans conformément à la loi.",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="text-center">
              <div className="flex justify-center gap-3 mb-6">
                <span className="bg-teal-700/60 text-teal-100 text-sm px-4 py-1.5 rounded-full border border-teal-600/50">
                  6 cantons
                </span>
                <span className="bg-teal-700/60 text-teal-100 text-sm px-4 py-1.5 rounded-full border border-teal-600/50">
                  100% en ligne
                </span>
                <span className="bg-teal-700/60 text-teal-100 text-sm px-4 py-1.5 rounded-full border border-teal-600/50">
                  Dès CHF 89.-
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {"Votre déclaration d'impôts, gérée par des experts"}
              </h1>

              <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                {"Envoyez vos documents, nos spécialistes diplômés s'occupent de tout. Déductions optimisées, dépôt électronique, tranquillité d'esprit."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demande"
                  className="bg-white text-teal-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  {"Déposer ma demande"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/simulateur"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  {"Simuler mes impôts"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-secondary/50 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10+", label: "ans d'expérience" },
                { value: "6", label: "cantons couverts" },
                { value: "24/7", label: "accès en ligne" },
                { value: "CHF 89.-", label: "prix de départ" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose NeoFidu */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {"Pourquoi confier votre déclaration à NeoFidu ?"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {"Nous combinons la simplicité du digital avec l'expertise professionnelle."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Experts diplômés",
                  desc: "Chaque déclaration est traitée par un spécialiste fiscal qualifié avec une expertise cantonale.",
                },
                {
                  icon: Smartphone,
                  title: "100% en ligne",
                  desc: "Envoyez vos documents depuis votre téléphone, suivez l'avancement en temps réel, aucun déplacement.",
                },
                {
                  icon: Banknote,
                  title: "Tarifs transparents",
                  desc: "Prix fixes dès CHF 89.- Pas de surprise, pas de frais cachés.",
                },
                {
                  icon: Clock,
                  title: "Rapidité",
                  desc: "Votre déclaration complétée en 5-10 jours ouvrables. Prolongations gérées.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process steps */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {"Comment ça marche"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {"Un processus simple en 4 étapes, entièrement en ligne."}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Situations */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Quelle que soit votre situation
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {situations.map((sit, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 bg-white border border-border rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <sit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{sit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{sit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deductions */}
        <section className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {"Les déductions que nous optimisons pour vous"}
              </h2>
              <p className="text-lg text-teal-200 max-w-2xl mx-auto">
                {"Nos experts connaissent chaque déduction disponible dans votre canton."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {deductions.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-teal-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Des tarifs clairs et fixes
              </h2>
              <p className="text-lg text-muted-foreground">
                Pas de surprise. Vous connaissez le prix avant de commencer.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tarifs.map((tarif, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-6 border-2 ${
                    tarif.popular
                      ? "border-primary bg-accent/50"
                      : "border-border bg-white"
                  }`}
                >
                  {tarif.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Le plus populaire
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-1">{tarif.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tarif.subtitle}</p>
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">dès </span>
                    <span className="text-4xl font-bold text-primary">CHF {tarif.price}.-</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tarif.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/demande"
                    className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                      tarif.popular
                        ? "bg-primary text-white hover:bg-teal-600"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Commencer
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              {"Prix valables pour l'année fiscale 2025. Voir tous les tarifs sur notre "}
              <Link href="/tarifs" className="text-primary underline">
                page tarifs
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Cantons */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Disponible dans 6 cantons
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
                  className="bg-white border border-border rounded-xl px-6 py-3 font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              {"Questions fréquentes"}
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-10">
              Tout ce que vous devez savoir sur notre service.
            </p>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {"Prêt à simplifier vos impôts ?"}
            </h2>
            <p className="text-xl text-teal-200 mb-8 max-w-2xl mx-auto">
              {"Rejoignez des milliers de clients satisfaits en Suisse romande. Votre déclaration dès CHF 89.-"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demande"
                className="bg-white text-teal-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                {"Déposer ma demande"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/simulateur"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {"Essayer notre simulateur gratuit"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
