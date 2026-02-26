"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FileText, Calculator, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const { isEnglish } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(isEnglish ? "All" : "Tous");

  // Translations
  const t = {
    backToHome: isEnglish ? "Back to home" : "Retour à l'accueil",
    title1: isEnglish ? "Frequently Asked" : "Questions",
    title2: isEnglish ? "Questions" : "fréquentes",
    subtitle: isEnglish
      ? "Find quick answers to your questions about our tax declaration and accounting services."
      : "Trouvez rapidement les réponses à vos questions sur nos services de déclarations d'impôts et de comptabilité.",
    notFound: isEnglish ? "Didn't find your answer?" : "Vous n'avez pas trouvé votre réponse ?",
    notFoundDesc: isEnglish
      ? "Our team is here to help. Contact us and we'll respond within 24 hours."
      : "Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons sous 24h.",
    contactUs: isEnglish ? "Contact us" : "Nous contacter",
    startRequest: isEnglish ? "Start a request" : "Démarrer une demande",
  };

  // Categories
  const categories = isEnglish
    ? ["All", "Taxation", "Accounting", "Pricing", "General Information"]
    : ["Tous", "Fiscalité", "Gestion comptable", "Honoraires", "Informations générales"];

  // FAQ items with translations
  const faqItems: FAQItem[] = isEnglish
    ? [
        // Taxation
        {
          category: "Taxation",
          question: "What supporting documents are required?",
          answer: "You will need your income statements, bank statements as of December 31, health insurance premium confirmations, and any documents related to deductible expenses (childcare, alimony paid, professional expenses)."
        },
        {
          category: "Taxation",
          question: "How long does it take to process my file?",
          answer: "The standard processing time is approximately two business weeks. An express option allows delivery within 72 hours for an additional fee."
        },
        {
          category: "Taxation",
          question: "How can I send my documents?",
          answer: "Digital submission by email is recommended (clear scans or photos). Postal mail is also possible with a small surcharge to cover processing costs."
        },
        {
          category: "Taxation",
          question: "I moved during the year, what should I do?",
          answer: "Mention this change when registering. The residence as of December 31 determines the canton responsible for taxation."
        },
        {
          category: "Taxation",
          question: "Is it possible to get a deadline extension?",
          answer: "Absolutely. An extension until the end of September can be requested before the end of June. A grace period until June 30 is generally granted without special formalities."
        },
        {
          category: "Taxation",
          question: "What deductions can I claim?",
          answer: "Several items are eligible: commuting expenses, meals away from home, professional training, health insurance, loan interest, maintenance contributions, pillar 3a contributions, and property renovation work. We ensure every opportunity is utilized."
        },
        // Accounting
        {
          category: "Accounting",
          question: "What accounting services do you offer?",
          answer: "Our services cover regular bookkeeping, annual financial statements, VAT formalities, and strategic support to reduce your tax burden."
        },
        {
          category: "Accounting",
          question: "How is the collaboration organized?",
          answer: "You send us your supporting documents (invoices, statements) on a monthly or quarterly basis. We record transactions, produce required declarations, and provide you with regular status reports."
        },
        {
          category: "Accounting",
          question: "At what threshold does VAT become mandatory?",
          answer: "VAT registration is required when annual turnover reaches CHF 100,000. Below this threshold, registration remains optional but may be advisable depending on your sector."
        },
        {
          category: "Accounting",
          question: "Sole proprietorship or LLC: what are the differences?",
          answer: "A sole proprietorship is easy to set up but exposes the owner to personal liability. An LLC limits risks to the invested capital (minimum CHF 20,000) at the cost of increased accounting obligations. We guide you in this choice."
        },
        // Pricing
        {
          category: "Pricing",
          question: "How do you determine your prices?",
          answer: "The amount depends on the complexity of the file: family status, number of properties, securities portfolio, etc. The rate is displayed instantly during your online simulation."
        },
        {
          category: "Pricing",
          question: "What payment options do you offer?",
          answer: "Bank transfer, TWINT, and Visa or Mastercard cards are accepted. Payment is made after quote acceptance and before work begins."
        },
        {
          category: "Pricing",
          question: "Are installment payments possible?",
          answer: "For accounting, monthly or quarterly billing is available (with a 10% discount on the quarterly option). One-time tax services are paid in a single payment."
        },
        // General Information
        {
          category: "General Information",
          question: "Which regions do you cover?",
          answer: "We support taxpayers and businesses in six French-speaking cantons: Vaud, Valais, Geneva, Neuchâtel, Jura, and Fribourg."
        },
        {
          category: "General Information",
          question: "How can I contact you?",
          answer: "Send us a message via contact@neofidu.ch or fill out the form on the website. We guarantee a response within one business day. In case of urgency related to an active file, a phone callback is provided."
        },
        {
          category: "General Information",
          question: "Is my information protected?",
          answer: "The security of your data is an absolute priority. Our exchanges are encrypted (SSL), your files are stored encrypted, and we strictly apply Swiss data protection legislation."
        },
      ]
    : [
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
          answer: "Notre offre couvre la saisie courante, la production des comptes annuels, les formalités TVA, et l'accompagnement stratégique pour alléger votre charge fiscale."
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

  const allCategory = isEnglish ? "All" : "Tous";
  const filteredFAQ = activeCategory === allCategory
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
          <BreadcrumbLight
            items={[
              { label: isEnglish ? "FAQ" : "FAQ" },
            ]}
            className="mb-8"
          />

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.title1} <span className="text-gradient">{t.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.subtitle}
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
                {(category === "Déclarations d'impôts" || category === "Taxation") && <FileText className="w-4 h-4 mr-2" />}
                {(category === "Comptabilité" || category === "Accounting") && <Calculator className="w-4 h-4 mr-2" />}
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

          {/* Related Blog Articles */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              {isEnglish ? "Related Articles" : "Articles connexes"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/declaration-impots-2026-guide-complet" className="group">
                <Card className="p-5 h-full hover:shadow-lg hover:border-primary/20 transition-all">
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                    {isEnglish ? "Tax Guide" : "Guide fiscal"}
                  </span>
                  <h3 className="font-semibold mt-2 group-hover:text-primary transition-colors">
                    {isEnglish ? "2026 Tax Return: Complete Guide" : "Déclaration d'impôts 2026 : guide complet"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isEnglish ? "Deductions, deadlines and tips by canton" : "Déductions, délais et conseils par canton"}
                  </p>
                </Card>
              </Link>
              <Link href="/blog/pilier-3a-2026-plafonds-avantages" className="group">
                <Card className="p-5 h-full hover:shadow-lg hover:border-primary/20 transition-all">
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                    {isEnglish ? "Retirement" : "Prévoyance"}
                  </span>
                  <h3 className="font-semibold mt-2 group-hover:text-primary transition-colors">
                    {isEnglish ? "Pillar 3a 2026: Optimization Strategies" : "Pilier 3a 2026 : stratégies d'optimisation"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isEnglish ? "Maximize your tax savings" : "Maximisez vos économies fiscales"}
                  </p>
                </Card>
              </Link>
              <Link href="/blog/tva-suisse-2026-taux-obligations" className="group">
                <Card className="p-5 h-full hover:shadow-lg hover:border-primary/20 transition-all">
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                    {isEnglish ? "VAT" : "TVA"}
                  </span>
                  <h3 className="font-semibold mt-2 group-hover:text-primary transition-colors">
                    {isEnglish ? "Swiss VAT 2026: Complete Guide" : "TVA Suisse 2026 : guide complet"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isEnglish ? "Rates, thresholds and obligations" : "Taux, seuils et obligations"}
                  </p>
                </Card>
              </Link>
            </div>
            <div className="text-center mt-6">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/blog">
                  {isEnglish ? "View all articles" : "Voir tous les articles"} →
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-teal-50">
              <h3 className="text-xl font-bold mb-2">{t.notFound}</h3>
              <p className="text-muted-foreground mb-6">
                {t.notFoundDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-full">
                  <Link href="/#contact">{t.contactUs}</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/demande">{t.startRequest}</Link>
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
