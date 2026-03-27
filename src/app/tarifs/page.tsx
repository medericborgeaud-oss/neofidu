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
  Clock,
  Shield,
  Zap,
  FileText,
  Calculator,
  Building2,
  Users,
  Briefcase,
  Star,
  BadgeCheck,
  HelpCircle,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
const pricingData = {
  particuliers: [
    {
      name: "Basique",
      nameen: "Basic",
      description: "Dossiers sans complexité",
      descriptionen: "Simple cases",
      price: "50",
      priceNote: "dès",
      features: [
        "Personne seule",
        "Attestation(s) de revenus",
        "Relevé(s) de compte",
        "Abattements usuels",
        "Traitement standard (10 jours ouvrés)",
      ],
      featuresen: [
        "Single person",
        "Income certificate(s)",
        "Bank statement(s)",
        "Standard deductions",
        "Standard processing (10 business days)",
      ],
      popular: false,
    },
    {
      name: "Confort",
      nameen: "Comfort",
      description: "Formule plébiscitée",
      descriptionen: "Most popular",
      price: "100",
      priceNote: "dès",
      features: [
        "Inclut la formule Basique",
        "Charge(s) de famille",
        "Un logement en propriété",
        "Dépenses professionnelles",
        "Traitement standard (10 jours ouvrés)",
        "Assistance dédiée",
      ],
      featuresen: [
        "Includes Basic plan",
        "Dependents",
        "One owned property",
        "Professional expenses",
        "Standard processing (10 business days)",
        "Dedicated support",
      ],
      popular: true,
    },
    {
      name: "Intégral",
      nameen: "Integral",
      description: "Patrimoine diversifié",
      descriptionen: "Diversified assets",
      price: "150",
      priceNote: "dès",
      features: [
        "Inclut la formule Confort",
        "Patrimoine immobilier étendu",
        "Titres et placements",
        "Sources de revenus multiples",
        "Traitement standard (10 jours ouvrés)",
        "Accompagnement personnalisé",
      ],
      featuresen: [
        "Includes Comfort plan",
        "Extended real estate",
        "Securities and investments",
        "Multiple income sources",
        "Standard processing (10 business days)",
        "Personalized guidance",
      ],
      popular: false,
    },
    {
      name: "Suisses de l'étranger",
      nameen: "Swiss Abroad",
      description: "Déclaration depuis l'étranger",
      descriptionen: "Filing from abroad",
      price: "100",
      priceNote: "dès",
      features: [
        "Déclaration fiscale complète",
        "Couple: +CHF 20.-",
        "Indépendant: +CHF 40.-",
        "Bien immobilier: +CHF 50.-/bien",
        "Enfant: +CHF 10.-/enfant",

        "Actions (≥3): +CHF 20.-",],
      featuresen: [
        "Complete tax return",
        "Couple: +CHF 20.-",
        "Self-employed: +CHF 40.-",
        "Property: +CHF 50.-/property",
        "Child: +CHF 10.-/child",

        "Securities (≥3): +CHF 20.-",],
      popular: false,
      isSwissAbroad: true,
    },
  ],
  entreprises: [
    {
      name: "Indépendant",
      nameen: "Self-employed",
      description: "Raison individuelle, freelance",
      descriptionen: "Sole proprietorship, freelance",
      price: "500",
      priceNote: "dès",
      unit: "/an",
      features: [
        "Tenue de comptabilité complète",
        "Déclarations TVA (si assujetti)",
        "Bouclement annuel",
        "Rapprochement bancaire",
        "Assistance par email",
      ],
      featuresen: [
        "Complete bookkeeping",
        "VAT declarations (if applicable)",
        "Annual closing",
        "Bank reconciliation",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "PME",
      nameen: "SME",
      description: "Sàrl, SA jusqu'à 10 employés",
      descriptionen: "LLC, AG up to 10 employees",
      price: "300",
      priceNote: "dès",
      unit: "/mois",
      features: [
        "Comptabilité complète",
        "Gestion des salaires",
        "Déclarations TVA & sociales",
        "États financiers annuels",
        "Conseil stratégique fiscal",
        "Interlocuteur dédié",
      ],
      featuresen: [
        "Complete accounting",
        "Payroll management",
        "VAT & social declarations",
        "Annual financial statements",
        "Strategic tax advice",
        "Dedicated contact",
      ],
      popular: true,
    },
    {
      name: "Création d'entreprise",
      nameen: "Company formation",
      description: "RI, Sàrl ou SA clé en main",
      descriptionen: "Sole prop., LLC or AG turnkey",
      price: "290",
      priceNote: "dès",
      features: [
        "Raison individuelle: dès CHF 290.-",
        "Sàrl: dès CHF 990.-",
        "SA: dès CHF 1'490.-",
        "Inscription Registre du Commerce",
        "Affiliation AVS/AI",
        "Conseil forme juridique",
      ],
      featuresen: [
        "Sole proprietorship: from CHF 290.-",
        "LLC: from CHF 990.-",
        "AG: from CHF 1'490.-",
        "Commercial register entry",
        "AVS/AI affiliation",
        "Legal form advice",
      ],
      popular: false,
    },
  ],
};
const comparisonData = [
  {
    feature: "Prix déclaration simple",
    featureen: "Simple tax return price",
    neoFidu: "Dès CHF 50.-",
    neoFiduen: "From CHF 50.-",
    traditional: "CHF 150.- à 300.-",
    traditionalen: "CHF 150.- to 300.-",
  },
  {
    feature: "Délai de traitement",
    featureen: "Processing time",
    neoFidu: "10 jours ouvrés",
    neoFiduen: "10 business days",
    traditional: "2-4 semaines",
    traditionalen: "2-4 weeks",
  },
  {
    feature: "Devis",
    featureen: "Quote",
    neoFidu: "Gratuit, en 2 minutes",
    neoFiduen: "Free, in 2 minutes",
    traditional: "Payant ou sur RDV",
    traditionalen: "Paid or by appointment",
  },
  {
    feature: "Communication",
    featureen: "Communication",
    neoFidu: "100% digital, 7j/7",
    neoFiduen: "100% digital, 24/7",
    traditional: "Heures de bureau",
    traditionalen: "Business hours",
  },
  {
    feature: "Transparence prix",
    featureen: "Price transparency",
    neoFidu: "Prix fixes affichés",
    neoFiduen: "Fixed displayed prices",
    traditional: "Tarif horaire variable",
    traditionalen: "Variable hourly rate",
  },
  {
    feature: "Suivi dossier",
    featureen: "File tracking",
    neoFidu: "Espace client en ligne",
    neoFiduen: "Online client portal",
    traditional: "Par téléphone/email",
    traditionalen: "By phone/email",
  },
];

const cantons = [
  { name: "Genève", nameen: "Geneva", slug: "geneve", rate: "~44%" },
  { name: "Vaud", nameen: "Vaud", slug: "vaud", rate: "~41%" },
  { name: "Valais", nameen: "Valais", slug: "valais", rate: "~30%" },
  { name: "Fribourg", nameen: "Fribourg", slug: "fribourg", rate: "~36%" },
  { name: "Neuchâtel", nameen: "Neuchâtel", slug: "neuchatel", rate: "~38%" },
  { name: "Jura", nameen: "Jura", slug: "jura", rate: "~37%" },
];

export default function TarifsPage() {
  const { isEnglish } = useLanguage();
  // JSON-LD Schema for Services and Pricing
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Fiduciary Services",
    "provider": {
      "@type": "Organization",
      "name": "NeoFidu",
      "url": "https://www.neofidu.ch",
      "logo": "https://www.neofidu.ch/logo.svg",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CH",
        "addressRegion": "Suisse romande"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "offers": {
      "@type": "Offer",
      "price": "50",
      "priceCurrency": "CHF",
      "priceRange": "CHF 50 - CHF 1490",
      "url": "https://www.neofidu.ch/tarifs"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services fiduciaires",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Déclaration Basique",
            "description": "Déclaration fiscale pour personne seule ou en ménage avec situation standard"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "50",
            "priceCurrency": "CHF",
            "minPrice": "50"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Déclaration Confort",
            "description": "Déclaration fiscale pour famille, propriétaire ou dépenses professionnelles"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "100",
            "priceCurrency": "CHF",
            "minPrice": "100"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Déclaration Intégral",
            "description": "Déclaration fiscale pour patrimoine diversifié et revenus multiples"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "150",
            "priceCurrency": "CHF",
            "minPrice": "150"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comptabilité PME",
            "description": "Comptabilité complète pour Sàrl et SA jusqu'à 10 employés"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "300",
            "priceCurrency": "CHF",
            "minPrice": "300",
            "unitText": "mois"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Création d'entreprise",
            "description": "Constitution RI dès CHF 290.-, Sàrl dès CHF 990.-, SA dès CHF 1'490.-"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "290",
            "priceCurrency": "CHF",
            "minPrice": "290"
          }
        }
      ]
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ces prix sont-ils définitifs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les prix affichés sont des prix de départ. Le devis final dépend de la complexité de votre situation. Nous fournissons toujours un devis détaillé avant de commencer."
        }
      },
      {
        "@type": "Question",
        "name": "Comment obtenir un devis personnalisé ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Remplissez notre formulaire en ligne en 2 minutes. Vous recevrez un devis détaillé par email sous 1 jour ouvré, sans aucun engagement."
        }
      },
      {
        "@type": "Question",
        "name": "Quels moyens de paiement acceptez-vous ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous acceptons les virements bancaires, les cartes de crédit (Visa, Mastercard), PayPal et Klarna (paiement en 3 fois sans frais)."
        }
      },
      {
        "@type": "Question",
        "name": "Les tarifs varient-ils selon le canton ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos tarifs de base sont identiques pour tous les cantons romands (Genève, Vaud, Valais, Fribourg, Neuchâtel, Jura). Le prix final dépend uniquement de la complexité de votre dossier, pas de votre canton de résidence."
        }
      },
      {
        "@type": "Question",
        "name": "Le prix inclut-il les cryptomonnaies ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La déclaration de cryptomonnaies (Bitcoin, Ethereum, etc.) peut nécessiter un supplément selon le nombre de transactions et de plateformes utilisées. Demandez un devis pour une estimation précise."
        }
      },
      {
        "@type": "Question",
        "name": "Que se passe-t-il si mon dossier est plus complexe que prévu ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si des éléments supplémentaires apparaissent après le devis initial, nous vous contactons pour un devis révisé avant de continuer. Aucun supplément n'est facturé sans votre accord préalable."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous le paiement en plusieurs fois ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, grâce à Klarna vous pouvez régler en 3 fois sans frais. Cette option est disponible pour toutes les formules particuliers et entreprises."
        }
      }
    ]
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <BreadcrumbLight
            items={[{ label: isEnglish ? "Pricing" : "Tarifs" }]}
            className="mb-8"
          />
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <BadgeCheck className="w-4 h-4 mr-1" />
              {isEnglish ? "Transparent pricing" : "Prix transparents"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {isEnglish ? (
                <>
                  <span className="text-gradient">Pricing</span> for Fiduciary Services in French-Speaking Switzerland
                </>
              ) : (
                <>
                  <span className="text-gradient">Tarifs</span> fiduciaires en Suisse romande
                </>
              )}
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              {isEnglish
                ? "No surprises, no hidden fees. Clear prices for all our fiduciary services — tax returns, accounting, and company formation in Geneva, Vaud, Valais, Fribourg, Neuchâtel, and Jura."
                : "Pas de surprise, pas de frais cachés. Des prix clairs pour tous nos services fiduciaires — déclarations d'impôts, comptabilité et création d'entreprise à Genève, Vaud, Valais, Fribourg, Neuchâtel et Jura."}
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              {isEnglish
                ? "Fixed prices for tax returns · Personalized quote within 24h for accounting & property management. Payment in 3 installments available via Klarna."
                : "Prix fixes pour les déclarations d'impôts · Devis personnalisé sous 24h pour la comptabilité & gérance. Paiement en 3 fois disponible via Klarna."}
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Fixed prices for tax returns" : "Tarifs fixes déclarations"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Custom quote within 24h" : "Devis sur mesure sous 24h"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Visa, Mastercard, PayPal, Klarna" : "Visa, Mastercard, PayPal, Klarna"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "100% digital" : "100% digital"}</span>
              </div>
            </div>
          </motion.div>
          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-6 md:p-8 text-white text-center mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              {isEnglish
                ? "Tax returns: fixed prices displayed — Accounting: free quote"
                : "Déclarations : tarifs fixes affichés — Comptabilité : devis gratuit"}
            </h2>
            <p className="text-white/90 mb-4">
              {isEnglish
                ? "No commitment. Personalized quote for accounting & property management within 24 hours."
                : "Sans engagement. Devis personnalisé pour la comptabilité & gérance sous 24 heures."}
            </p>
            <Link href="/demande">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                {isEnglish ? "Request a quote" : "Demander un devis"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
          {/* Particuliers Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isEnglish ? "Individuals" : "Particuliers"}
                </h2>
                <p className="text-muted-foreground">
                  {isEnglish
                    ? "Tax returns & personal tax optimization"
                    : "Déclarations d'impôts & optimisation fiscale personnelle"}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-8 max-w-3xl">
              {isEnglish
                ? "Our individual plans cover all tax situations in French-speaking Switzerland: single or married, homeowner or tenant, salaried or self-employed. Each plan includes preparation, optimization of deductions, and electronic filing to your cantonal tax office."
                : "Nos formules particuliers couvrent toutes les situations fiscales en Suisse romande : célibataire ou marié, propriétaire ou locataire, salarié ou indépendant. Chaque formule inclut la préparation, l'optimisation des déductions et le dépôt électronique auprès de votre administration fiscale cantonale."}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingData.particuliers.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden ${
                    plan.popular
                      ? "border-2 border-primary shadow-xl"
                      : "border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      <Star className="w-3 h-3 inline mr-1" />
                      {isEnglish ? "Most popular" : "Le plus populaire"}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">
                      {isEnglish ? plan.nameen : plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isEnglish ? plan.descriptionen : plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-sm text-muted-foreground">
                        {plan.priceNote}
                      </span>
                      <span className="text-4xl font-bold text-primary ml-1">
                        CHF {plan.price}.-
                      </span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {(isEnglish ? plan.featuresen : plan.features).map(
                        (feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                    <Link href="/demande">
                      <Button
                        className={`w-full ${
                          plan.popular ? "" : "variant-outline"
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {isEnglish ? "Get started" : "Commencer"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            {/* Additional Options Box */}
            <div className="mt-8 max-w-3xl mx-auto">
              <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
                <div className="p-5 flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-2">
                      {isEnglish ? "Additional options — apply to all plans" : "Options supplémentaires — valables pour toutes les formules"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(isEnglish
                        ? ["Couple: +CHF 20.-", "Child: +CHF 10.-/child", "Property: +CHF 50.-/bien", "Securities (≥3): +CHF 20.-"]
                        : ["Couple: +CHF 20.-", "Enfant: +CHF 10.-/enfant", "Bien immobilier: +CHF 50.-/bien", "Actions (≥3): +CHF 20.-"]
                      ).map((item, idx) => (
                        <span key={idx} className="text-xs bg-white border border-primary/20 rounded-full px-3 py-1 text-primary font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* Express Options Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-10 max-w-3xl mx-auto"
            >
              <Card className="overflow-hidden border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 via-white to-emerald-50/50">
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
                          ? "Select your preferred option during checkout. Processing time starts after all documents are received."
                          : "Sélectionnez votre option lors de la commande. Le délai débute après réception de tous les documents."}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.section>
          {/* Entreprises Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isEnglish ? "Businesses" : "Entreprises"}
                </h2>
                <p className="text-muted-foreground">
                  {isEnglish
                    ? "Accounting, payroll & company formation"
                    : "Comptabilité, salaires & création d'entreprise"}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-8 max-w-3xl">
              {isEnglish
                ? "Whether you're a freelancer, running a small business, or creating a new company, our business plans provide comprehensive support. From bookkeeping and VAT declarations to payroll management and annual financial statements — all handled digitally with a dedicated advisor."
                : "Que vous soyez freelance, dirigeant d'une PME ou en train de créer votre entreprise, nos formules entreprises offrent un accompagnement complet. De la tenue de comptabilité aux déclarations TVA, en passant par la gestion des salaires et les états financiers annuels — le tout géré en ligne avec un conseiller dédié."}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingData.entreprises.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden ${
                    plan.popular
                      ? "border-2 border-emerald-500 shadow-xl"
                      : "border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      <Star className="w-3 h-3 inline mr-1" />
                      {isEnglish ? "Recommended" : "Recommandé"}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">
                      {isEnglish ? plan.nameen : plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isEnglish ? plan.descriptionen : plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-sm text-muted-foreground">
                        {plan.priceNote}
                      </span>
                      <span className="text-4xl font-bold text-emerald-600 ml-1">
                        CHF {plan.price}.-
                      </span>
                      {plan.unit && (
                        <span className="text-muted-foreground">
                          {plan.unit}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-3 mb-6">
                      {(isEnglish ? plan.featuresen : plan.features).map(
                        (feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                    <Link href={plan.name === "Création d'entreprise" ? "/creation-entreprise#contact-creation" : "/demande"}>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {isEnglish ? "Get a quote" : "Demander un devis"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
          {/* Cantons Section - NEW SEO */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-20"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  {isEnglish
                    ? "Same prices, all cantons in French-speaking Switzerland"
                    : "Mêmes tarifs, tous les cantons romands"}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Our pricing is the same regardless of your canton. However, each canton has its own tax rates and specific deductions. Discover our dedicated guides for each canton."
                  : "Nos tarifs sont identiques quel que soit votre canton. Cependant, chaque canton a ses propres taux d'imposition et déductions spécifiques. Découvrez nos guides dédiés pour chaque canton."}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {cantons.map((canton) => (
                <Link key={canton.slug} href={`/cantons/${canton.slug}`}>
                  <Card className="p-4 text-center hover:border-primary hover:shadow-md transition-all cursor-pointer group">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {isEnglish ? canton.nameen : canton.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isEnglish ? "Tax rate" : "Taux"} {canton.rate}
                    </p>
                    <span className="text-xs text-primary mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isEnglish ? "See guide" : "Voir le guide"} <ArrowRight className="w-3 h-3" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
          {/* Comparison Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {isEnglish
                  ? "NeoFidu vs Traditional Fiduciary"
                  : "NeoFidu vs Fiduciaire traditionnelle"}
              </h2>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "Why choose an online fiduciary?"
                  : "Pourquoi choisir une fiduciaire en ligne ?"}
              </p>
            </div>
            <div className="max-w-3xl mx-auto overflow-x-auto rounded-xl border">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="p-4 text-left font-semibold"></th>
                    <th className="p-4 text-center font-semibold text-primary">
                      <div className="flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        NeoFidu
                      </div>
                    </th>
                    <th className="p-4 text-center font-semibold text-muted-foreground">
                      {isEnglish ? "Traditional" : "Traditionnelle"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-secondary/20"}
                    >
                      <td className="p-4 font-medium">{isEnglish ? row.featureen : row.feature}</td>
                      <td className="p-4 text-center text-primary font-medium">
                        {isEnglish ? row.neoFiduen : row.neoFidu}
                      </td>
                      <td className="p-4 text-center text-muted-foreground">
                        {isEnglish ? row.traditionalen : row.traditional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-muted-foreground text-sm mt-6 max-w-2xl mx-auto">
              {isEnglish
                ? "NeoFidu combines the expertise of a traditional fiduciary with the efficiency and transparency of a 100% digital platform. No appointment needed, no hidden costs — just professional tax services at fair prices."
                : "NeoFidu combine l'expertise d'une fiduciaire traditionnelle avec l'efficacité et la transparence d'une plateforme 100% digitale. Pas de rendez-vous nécessaire, pas de coûts cachés — simplement des services fiscaux professionnels à des prix justes."}
            </p>
          </motion.section>
          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-20 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-center">
                {isEnglish ? "Pricing FAQ" : "Questions fréquentes sur nos tarifs"}
              </h2>
            </div>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "Are these prices final?"
                    : "Ces prix sont-ils définitifs ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "The prices shown are starting prices. The final quote depends on the complexity of your situation. We always provide a detailed quote before starting."
                    : "Les prix affichés sont des prix de départ. Le devis final dépend de la complexité de votre situation. Nous fournissons toujours un devis détaillé avant de commencer."}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "How to get a personalized quote?"
                    : "Comment obtenir un devis personnalisé ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Fill out our online form in 2 minutes. You will receive a detailed quote by email within 1 business day, without any commitment."
                    : "Remplissez notre formulaire en ligne en 2 minutes. Vous recevrez un devis détaillé par email sous 1 jour ouvré, sans aucun engagement."}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "What payment methods do you accept?"
                    : "Quels moyens de paiement acceptez-vous ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "We accept bank transfers, credit cards (Visa, Mastercard), PayPal, and Klarna (pay in 3 installments, interest-free)."
                    : "Nous acceptons les virements bancaires, les cartes de crédit (Visa, Mastercard), PayPal et Klarna (paiement en 3 fois sans frais)."}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "Do you offer payment in installments?"
                    : "Proposez-vous le paiement en plusieurs fois ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Yes, with Klarna you can pay in 3 interest-free installments. This option is available for all individual and business plans."
                    : "Oui, grâce à Klarna vous pouvez régler en 3 fois sans frais. Cette option est disponible pour toutes les formules particuliers et entreprises."}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "Do prices vary by canton?"
                    : "Les tarifs varient-ils selon le canton ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? <>Our base prices are the same for all cantons in French-speaking Switzerland (<Link href="/cantons/geneve" className="text-primary hover:underline">Geneva</Link>, <Link href="/cantons/vaud" className="text-primary hover:underline">Vaud</Link>, <Link href="/cantons/valais" className="text-primary hover:underline">Valais</Link>, <Link href="/cantons/fribourg" className="text-primary hover:underline">Fribourg</Link>, <Link href="/cantons/neuchatel" className="text-primary hover:underline">Neuchâtel</Link>, <Link href="/cantons/jura" className="text-primary hover:underline">Jura</Link>). The final price depends solely on the complexity of your file, not your canton of residence.</>
                    : <>Nos tarifs de base sont identiques pour tous les cantons romands (<Link href="/cantons/geneve" className="text-primary hover:underline">Genève</Link>, <Link href="/cantons/vaud" className="text-primary hover:underline">Vaud</Link>, <Link href="/cantons/valais" className="text-primary hover:underline">Valais</Link>, <Link href="/cantons/fribourg" className="text-primary hover:underline">Fribourg</Link>, <Link href="/cantons/neuchatel" className="text-primary hover:underline">Neuchâtel</Link>, <Link href="/cantons/jura" className="text-primary hover:underline">Jura</Link>). Le prix final dépend uniquement de la complexité de votre dossier, pas de votre canton de résidence.</>}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "Does the price include cryptocurrency declaration?"
                    : "Le prix inclut-il les cryptomonnaies ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? <>Declaring cryptocurrencies (Bitcoin, Ethereum, etc.) may require a supplement depending on the number of transactions and platforms used. <Link href="/blog/declarer-cryptomonnaies-suisse-guide-2026" className="text-primary hover:underline">Read our complete guide on crypto tax declaration in Switzerland</Link> and request a quote for an accurate estimate.</>
                    : <>La déclaration de cryptomonnaies (Bitcoin, Ethereum, etc.) peut nécessiter un supplément selon le nombre de transactions et de plateformes utilisées. <Link href="/blog/declarer-cryptomonnaies-suisse-guide-2026" className="text-primary hover:underline">Consultez notre guide complet sur la déclaration crypto en Suisse</Link> et demandez un devis pour une estimation précise.</>}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "What if my file is more complex than expected?"
                    : "Que se passe-t-il si mon dossier est plus complexe que prévu ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "If additional elements appear after the initial quote, we contact you for a revised quote before continuing. No supplement is charged without your prior agreement."
                    : "Si des éléments supplémentaires apparaissent après le devis initial, nous vous contactons pour un devis révisé avant de continuer. Aucun supplément n'est facturé sans votre accord préalable."}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "What if I'm not satisfied?"
                    : "Et si je ne suis pas satisfait ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Your satisfaction is our priority. Refund possible only before the start of processing."
                    : "Votre satisfaction est notre priorité. Remboursement possible uniquement avant le début du traitement."}
                </p>
              </Card>
            </div>
          </motion.section>
          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isEnglish
                ? "Ready to save time and money?"
                : "Prêt à gagner du temps et de l'argent ?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {isEnglish
                ? "Get your free quote in 2 minutes. No commitment. Payment in installments available."
                : "Obtenez votre devis gratuit en 2 minutes. Sans engagement. Paiement en plusieurs fois disponible."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande">
                <Button size="lg" className="px-8">
                  {isEnglish ? "Get my free quote" : "Obtenir mon devis gratuit"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/faq">
                <Button size="lg" variant="outline" className="px-8">
                  {isEnglish ? "More questions?" : "D'autres questions ?"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
