"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FileText, Calculator, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  // Fiscalité
  {
    category: "Fiscalité",
    question: "Quelles pièces justificatives sont nécessaires ?",
    answer: "Munissez-vous de vos attestations de revenus, de vos extraits bancaires arrêtés au 31 décembre, des confirmations de primes maladie, ainsi que de tout justificatif lié à vos charges déductibles (garde d'enfants, pensions versées, dépenses professionnelles)."
  },
  {
    category: "Fiscalité",
    question: "Combien de temps dure le traitement de mon dossier ?",
    answer: "Le délai habituel avoisine les deux semaines ouvrées. Une option accélérée permet d'obtenir un rendu sous 72 heures moyennant un supplément tarifaire."
  },
  {
    category: "Fiscalité",
    question: "Par quel canal transmettre mes pièces ?",
    answer: "L'envoi numérique par courriel est recommandé (scans lisibles ou photos nettes). L'acheminement postal reste possible avec un léger surcoût pour couvrir les frais de traitement."
  },
  {
    category: "Fiscalité",
    question: "J'ai changé d'adresse en cours d'année, que faire ?",
    answer: "Mentionnez ce changement lors de votre inscription. C'est le domicile au 31 décembre qui détermine le canton compétent pour l'imposition."
  },
  {
    category: "Fiscalité",
    question: "Est-il possible d'obtenir un report d'échéance ?",
    answer: "Absolument. Une extension jusqu'à fin septembre peut être sollicitée avant la fin du mois de juin. Un délai de grâce jusqu'au 30 juin est généralement octroyé sans formalité particulière."
  },
  {
    category: "Fiscalité",
    question: "Quels abattements puis-je revendiquer ?",
    answer: "Plusieurs postes sont éligibles : trajets domicile-travail, repas hors foyer, perfectionnement professionnel, assurance maladie, intérêts d'emprunt, contributions d'entretien, versements au pilier 3a et travaux de rénovation immobilière. Nous veillons à exploiter chaque opportunité."
  },
  // Gestion comptable
  {
    category: "Gestion comptable",
    question: "Quelles prestations comptables proposez-vous ?",
    answer: "Notre offre couvre la saisie courante, la production des comptes annuels, les formalités TVA, l'administration des salaires et cotisations sociales, et l'accompagnement stratégique pour alléger votre charge fiscale."
  },
  {
    category: "Gestion comptable",
    question: "Comment s'organise la collaboration ?",
    answer: "Vous nous adressez vos justificatifs (factures, relevés) selon une cadence mensuelle ou trimestrielle. Nous enregistrons les opérations, produisons les déclarations requises et vous transmettons un état de situation régulier."
  },
  {
    category: "Gestion comptable",
    question: "À partir de quel seuil la TVA devient-elle obligatoire ?",
    answer: "L'assujettissement s'applique dès lors que le chiffre d'affaires atteint CHF 100'000 par an. En deçà, l'inscription demeure facultative mais peut s'avérer judicieuse selon votre secteur."
  },
  {
    category: "Gestion comptable",
    question: "Raison individuelle ou Sàrl : quelles différences ?",
    answer: "L'entreprise individuelle se crée aisément mais expose l'exploitant sur ses biens personnels. La Sàrl limite les risques au capital investi (minimum CHF 20'000) au prix d'obligations comptables accrues. Nous vous guidons dans ce choix."
  },
  // Honoraires
  {
    category: "Honoraires",
    question: "Comment définissez-vous vos prix ?",
    answer: "Le montant dépend de la complexité du dossier : statut familial, nombre de propriétés, portefeuille de titres, etc. Le tarif s'affiche instantanément lors de votre simulation en ligne."
  },
  {
    category: "Honoraires",
    question: "Quelles options de règlement proposez-vous ?",
    answer: "Virement bancaire, TWINT et cartes Visa ou Mastercard sont acceptés. Le paiement intervient après acceptation du devis et avant le lancement des travaux."
  },
  {
    category: "Honoraires",
    question: "Des échelonnements sont-ils envisageables ?",
    answer: "Pour la comptabilité, une facturation mensuelle ou trimestrielle est prévue (avec remise de 10 % sur l'option trimestrielle). Les prestations fiscales ponctuelles se règlent en une seule fois."
  },
  // Informations générales
  {
    category: "Informations générales",
    question: "Quels territoires couvrez-vous ?",
    answer: "Nous accompagnons les contribuables et entreprises de six cantons francophones : Vaud, Valais, Genève, Neuchâtel, Jura et Fribourg."
  },
  {
    category: "Informations générales",
    question: "Comment vous joindre ?",
    answer: "Adressez-nous un message via contact@neofidu.ch ou remplissez le formulaire disponible sur le site. Nous garantissons une réponse sous un jour ouvré. En cas d'urgence liée à un dossier actif, un rappel téléphonique est prévu."
  },
  {
    category: "Informations générales",
    question: "La protection de mes informations est-elle assurée ?",
    answer: "La sécurité de vos données constitue une priorité absolue. Nos échanges transitent par des canaux chiffrés (SSL), vos fichiers sont hébergés de façon cryptée et nous appliquons rigoureusement la législation helvétique sur la protection des données."
  },
];

const categories = ["Tous", "Fiscalité", "Gestion comptable", "Honoraires", "Informations générales"];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredFAQ = activeCategory === "Tous"
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Questions <span className="text-gradient">fréquentes</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Trouvez rapidement les réponses à vos questions sur nos services
              de déclarations d'impôts et de comptabilité.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category === "Déclarations d'impôts" && <FileText className="w-4 h-4 mr-2" />}
                {category === "Comptabilité" && <Calculator className="w-4 h-4 mr-2" />}
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFAQ.map((item, index) => (
              <Card
                key={index}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "shadow-lg border-primary/20" : ""
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-lg">{item.question}</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === index ? "bg-primary text-white" : "bg-secondary"
                  }`}>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5">
                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-teal-50">
              <h3 className="text-xl font-bold mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
              <p className="text-muted-foreground mb-6">
                Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons sous 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-full">
                  <Link href="/#contact">Nous contacter</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/demande">Démarrer une demande</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
