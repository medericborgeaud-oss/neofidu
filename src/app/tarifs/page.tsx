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
      description: "Dossiers sans complexitÃ©",
      descriptionen: "Simple cases",
      price: "89",
      priceNote: "dÃ¨s",
      features: [
        "Personne seule",
        "Attestation(s) de revenus",
        "RelevÃ©(s) de compte",
        "Abattements usuels",
        "Traitement standard (10 jours ouvrÃ©s)",
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
      description: "Formule plÃ©biscitÃ©e",
      descriptionen: "Most popular",
      price: "149",
      priceNote: "dÃ¨s",
      features: [
        "Inclut la formule Basique",
        "Charge(s) de famille",
        "Un logement en propriÃ©tÃ©",
        "DÃ©penses professionnelles",
        "Traitement standard (10 jours ouvrÃ©s)",
        "Assistance dÃ©diÃ©e",
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
      name: "IntÃ©gral",
      nameen: "Integral",
      description: "Patrimoine diversifiÃ©",
      descriptionen: "Diversified assets",
      price: "249",
      priceNote: "dÃ¨s",
      features: [
        "Inclut la formule Confort",
        "Patrimoine immobilier Ã©tendu",
        "Titres et placements",
        "Sources de revenus multiples",
        "Traitement standard (10 jours ouvrÃ©s)",
        "Accompagnement personnalisÃ©",
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
      name: "Suisses de l'Ã©tranger",
      nameen: "Swiss Abroad",
      description: "DÃ©claration depuis l'Ã©tranger",
      descriptionen: "Filing from abroad",
      price: "149",
      priceNote: "dÃ¨s",
      features: [
        "DÃ©claration fiscale complÃ¨te",
        "Couple: +CHF 30.-",
        "IndÃ©pendant: +CHF 40.-",
        "Bien immobilier: +CHF 60.-/bien",
        "Enfant: +CHF 15.-/enfant",

        "Actions (â¥3): +CHF 30.-",],
      featuresen: [
        "Complete tax return",
        "Couple: +CHF 30.-",
        "Self-employed: +CHF 40.-",
        "Property: +CHF 60.-/property",
        "Child: +CHF 15.-/child",

        "Securities (â¥3): +CHF 30.-",],
      popular: false,
      isSwissAbroad: true,
    },
  ],
  entreprises: [
    {
      name: "IndÃ©pendant",
      nameen: "Self-employed",
      description: "Raison individuelle, freelance",
      descriptionen: "Sole proprietorship, freelance",
      price: "500",
      priceNote: "dÃ¨s",
      unit: "/an",
      features: [
        "Tenue de comptabilitÃ© complÃ¨te",
        "DÃ©clarations TVA (si assujetti)",
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
      description: "SÃ rl, SA jusqu'Ã  10 employÃ©s",
      descriptionen: "LLC, AG up to 10 employees",
      price: "300",
      priceNote: "dÃ¨s",
      unit: "/mois",
      features: [
        "ComptabilitÃ© complÃ¨te",
        "Gestion des salaires",
        "DÃ©clarations TVA & sociales",
        "Ãtats financiers annuels",
        "Conseil stratÃ©gique fiscal",
        "Interlocuteur dÃ©diÃ©",
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
      name: "CrÃ©ation d'entreprise",
      nameen: "Company formation",
      description: "RI, SÃ rl ou SA clÃ© en main",
      descriptionen: "Sole prop., LLC or AG turnkey",
      price: "290",
      priceNote: "dÃ¨s",
      features: [
        "Raison individuelle: dÃ¨s CHF 290.-",
        "SÃ rl: dÃ¨s CHF 990.-",
        "SA: dÃ¨s CHF 1'490.-",
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
    feature: "Prix dÃ©claration simple",
    featureen: "Simple tax return price",
    neoFidu: "DÃ¨s CHF 89.-",
    neoFiduen: "From CHF 89.-",
    traditional: "CHF 150.- Ã  300.-",
    traditionalen: "CHF 150.- to 300.-",
  },
  {
    feature: "DÃ©lai de traitement",
    featureen: "Processing time",
    neoFidu: "10 jours ouvrÃ©s",
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
    neoFidu: "Prix fixes affichÃ©s",
    neoFiduen: "Fixed displayed prices",
    traditional: "Tarif horaire variable",
    traditionalen: "Variable hourly rate",
  },
  {
    feature: "Suivi dossier",
    featureen: "File tracking",
    neoFidu: "Espace client en ligne",
    neoFiduen: "Online client portal",
    traditional: "Par tÃ©lÃ©phone/email",
    traditionalen: "By phone/email",
  },
];

const cantons = [
  { name: "GenÃ¨ve", nameen: "Geneva", slug: "geneve", rate: "~44%" },
  { name: "Vaud", nameen: "Vaud", slug: "vaud", rate: "~41%" },
  { name: "Valais", nameen: "Valais", slug: "valais", rate: "~30%" },
  { name: "Fribourg", nameen: "Fribourg", slug: "fribourg", rate: "~36%" },
  { name: "NeuchÃ¢tel", nameen: "NeuchÃ¢tel", slug: "neuchatel", rate: "~38%" },
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
      "priceRange": "CHF 89 - CHF 1490",
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
            "name": "DÃ©claration Basique",
            "description": "DÃ©claration fiscale pour personne seule ou en mÃ©nage avec situation standard"
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
            "name": "DÃ©claration Confort",
            "description": "DÃ©claration fiscale pour famille, propriÃ©taire ou dÃ©penses professionnelles"
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
            "name": "DÃ©claration IntÃ©gral",
            "description": "DÃ©claration fiscale pour patrimoine diversifiÃ© et revenus multiples"
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
            "name": "ComptabilitÃ© PME",
            "description": "ComptabilitÃ© complÃ¨te pour SÃ rl et SA jusqu'Ã  10 employÃ©s"
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
            "name": "CrÃ©ation d'entreprise",
            "description": "Constitution RI dÃ¨s CHF 290.-, SÃ rl dÃ¨s CHF 990.-, SA dÃ¨s CHF 1'490.-"
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
        "name": "Ces prix sont-ils dÃ©finitifs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les prix affichÃ©s sont des prix de dÃ©part. Le devis final dÃ©pend de la complexitÃ© de votre situation. Nous fournissons toujours un devis dÃ©taillÃ© avant de commencer."
        }
      },
      {
        "@type": "Question",
        "name": "Comment obtenir un devis personnalisÃ© ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Remplissez notre formulaire en ligne en 2 minutes. Vous recevrez un devis dÃ©taillÃ© par email, sans aucun engagement."
        }
      },
      {
        "@type": "Question",
        "name": "Quels moyens de paiement acceptez-vous ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous acceptons les virements bancaires, les cartes de crÃ©dit (Visa, Mastercard), PayPal, Klarna (paiement en 3 fois sans frais) et TWINT."
        }
      },
      {
        "@type": "Question",
        "name": "Les tarifs varient-ils selon le canton ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos tarifs de base sont identiques pour tous les cantons romands (GenÃ¨ve, Vaud, Valais, Fribourg, NeuchÃ¢tel, Jura). Le prix final dÃ©pend uniquement de la complexitÃ© de votre dossier, pas de votre canton de rÃ©sidence."
        }
      },
      {
        "@type": "Question",
        "name": "Le prix inclut-il les cryptomonnaies ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La dÃ©claration de cryptomonnaies (Bitcoin, Ethereum, etc.) peut nÃ©cessiter un supplÃ©ment selon le nombre de transactions et de plateformes utilisÃ©es. Demandez un devis pour une estimation prÃ©cise."
        }
      },
      {
        "@type": "Question",
        "name": "Que se passe-t-il si mon dossier est plus complexe que prÃ©vu ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si des Ã©lÃ©ments supplÃ©mentaires apparaissent aprÃ¨s le devis initial, nous vous contactons pour un devis rÃ©visÃ© avant de continuer. Aucun supplÃ©ment n'est facturÃ© sans votre accord prÃ©alable."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous le paiement en plusieurs fois ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, grÃ¢ce Ã  Klarna vous pouvez rÃ©gler en 3 fois sans frais. Cette option est disponible pour toutes les formules particuliers et entreprises."
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
                ? "No surprises, no hidden fees. Clear prices for all our fiduciary services â tax returns, accounting, and company formation in Geneva, Vaud, Valais, Fribourg, NeuchÃ¢tel, and Jura."
                : "Pas de surprise, pas de frais cachÃ©s. Des prix clairs pour tous nos services fiduciaires â dÃ©clarations d'impÃ´ts, comptabilitÃ© et crÃ©ation d'entreprise Ã  GenÃ¨ve, Vaud, Valais, Fribourg, NeuchÃ¢tel et Jura."}
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              {isEnglish
                ? "Fixed prices for tax returns Â· Personalized quote for accounting & corporate tax. Payment in 3 installments available via Klarna. TWINT also accepted."
                : "Prix fixes pour les dÃ©clarations d'impÃ´ts Â· Devis personnalisÃ© pour la comptabilitÃ© & fiscalitÃ© entreprises. Paiement en 3 fois disponible via Klarna. TWINT Ã©galement acceptÃ©."}
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Fixed prices for tax returns" : "Tarifs fixes dÃ©clarations"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Custom quote" : "Devis sur mesure"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>{isEnglish ? "Visa, Mastercard, PayPal, Klarna, TWINT" : "Visa, Mastercard, PayPal, Klarna, TWINT"}</span>
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
                ? "Tax returns: fixed prices displayed â Accounting: free quote"
                : "DÃ©clarations : tarifs fixes affichÃ©s â ComptabilitÃ© : devis gratuit"}
            </h2>
            <p className="text-white/90 mb-4">
              {isEnglish
                ? "No commitment. Personalized quote for accounting & corporate tax."
                : "Sans engagement. Devis personnalisÃ© pour la comptabilitÃ© & fiscalitÃ© entreprises."}
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
                    : "DÃ©clarations d'impÃ´ts & optimisation fiscale personnelle"}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-8 max-w-3xl">
              {isEnglish
                ? "Our individual plans cover all tax situations in French-speaking Switzerland: single or married, homeowner or tenant, salaried or self-employed. Each plan includes preparation, optimization of deductions, and electronic filing to your cantonal tax office."
                : "Nos formules particuliers couvrent toutes les situations fiscales en Suisse romande : cÃ©libataire ou mariÃ©, propriÃ©taire ou locataire, salariÃ© ou indÃ©pendant. Chaque formule inclut la prÃ©paration, l'optimisation des dÃ©ductions et le dÃ©pÃ´t Ã©lectronique auprÃ¨s de votre administration fiscale cantonale."}
            </p>
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-primary shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-emerald-600 p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-1">
                    {isEnglish ? "Tax return" : "Déclaration d’impôts"}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {isEnglish ? "À la carte pricing — pay only for what applies to you" : "Tarif à la carte — payez uniquement ce qui vous concerne"}
                  </p>
                </div>
                <div className="p-8">
                  {/* Prix de base */}
                  <div className="text-center mb-8">
                    <span className="text-sm text-muted-foreground">dès</span>
                    <span className="text-5xl font-bold text-primary ml-2">CHF 89.-</span>
                    <p className="text-sm text-muted-foreground mt-2">
                      {isEnglish ? "Single person · Standard situation" : "Personne seule · Situation standard"}
                    </p>
                  </div>

                  {/* Inclus */}
                  <div className="mb-8 bg-secondary/30 rounded-xl p-5">
                    <p className="font-semibold mb-3 text-sm">
                      {isEnglish ? "Included in the base price:" : "Inclus dans le tarif de base :"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(isEnglish
                        ? ["Income certificate(s)", "Bank statement(s)", "Standard deductions & optimization", "Electronic filing", "Processing in 10 business days", "Dedicated support"]
                        : ["Attestation(s) de revenus", "Relevé(s) de compte", "Déductions et optimisation fiscale", "Dépôt électronique", "Traitement en 10 jours ouvrés", "Assistance dédiée"]
                      ).map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suppléments */}
                  <div className="mb-8">
                    <p className="font-semibold mb-4 text-sm">
                      {isEnglish ? "Add according to your situation:" : "Ajoutez selon votre situation :"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(isEnglish
                        ? [
                            { label: "Couple / married", price: "+CHF 30.-" },
                            { label: "Per child", price: "+CHF 15.-" },
                            { label: "Per property owned", price: "+CHF 60.-" },
                            { label: "Self-employed income", price: "+CHF 40.-" },
                            { label: "Securities (≥3 positions)", price: "+CHF 30.-" },
                            { label: "Professional expenses", price: "+CHF 20.-" },
                          ]
                        : [
                            { label: "Couple / marié", price: "+CHF 30.-" },
                            { label: "Par enfant", price: "+CHF 15.-" },
                            { label: "Par bien immobilier", price: "+CHF 60.-" },
                            { label: "Revenu indépendant", price: "+CHF 40.-" },
                            { label: "Actions (≥3 positions)", price: "+CHF 30.-" },
                            { label: "Dépenses professionnelles", price: "+CHF 20.-" },
                          ]
                      ).map((item, i) => (
                        <div key={i} className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white hover:border-primary/40 transition-colors">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm font-bold text-primary whitespace-nowrap ml-3">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exemple */}
                  <div className="mb-8 border-2 border-dashed border-primary/20 rounded-xl p-5 bg-primary/5">
                    <p className="font-semibold text-sm mb-2">
                      {isEnglish ? "Example:" : "Exemple :"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isEnglish
                        ? "A married couple, 2 children, one property: CHF 89 + 30 + (2×15) + 60 = CHF 209.-"
                        : "Un couple marié, 2 enfants, un bien immobilier : CHF 89 + 30 + (2×15) + 60 = CHF 209.-"}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <Link href="/demande">
                      <Button size="lg" className="px-8">
                        {isEnglish ? "Get my quote" : "Obtenir mon devis"}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-3">
                      {isEnglish ? "Free quote, no commitment" : "Devis gratuit, sans engagement"}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Option Prioritaire Info Box */}
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
                          ? "Need your tax return processed faster? Choose our priority option:"
                          : "AccÃ©lÃ©rez le traitement de votre dÃ©claration fiscale avec notre option prioritaire :"}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium">
                            {isEnglish ? "Priority (7 days)" : "Prioritaire (7 jours)"}
                          </span>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                            +CHF 120
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {isEnglish
                          ? "Select your preferred option during checkout. Processing time starts after all documents are received."
                          : "SÃ©lectionnez votre option lors de la commande. Le dÃ©lai dÃ©bute aprÃ¨s rÃ©ception de tous les documents."}
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
                    : "ComptabilitÃ©, salaires & crÃ©ation d'entreprise"}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-8 max-w-3xl">
              {isEnglish
                ? "Whether you're a freelancer, running a small business, or creating a new company, our business plans provide comprehensive support. From bookkeeping and VAT declarations to payroll management and annual financial statements â all handled digitally with a dedicated advisor."
                : "Que vous soyez freelance, dirigeant d'une PME ou en train de crÃ©er votre entreprise, nos formules entreprises offrent un accompagnement complet. De la tenue de comptabilitÃ© aux dÃ©clarations TVA, en passant par la gestion des salaires et les Ã©tats financiers annuels â le tout gÃ©rÃ© en ligne avec un conseiller dÃ©diÃ©."}
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
                      {isEnglish ? "Recommended" : "RecommandÃ©"}
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
                    <Link href={plan.name === "CrÃ©ation d'entreprise" ? "/creation-entreprise#contact-creation" : "/demande"}>
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
                    : "MÃªmes tarifs, tous les cantons romands"}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Our pricing is the same regardless of your canton. However, each canton has its own tax rates and specific deductions. Discover our dedicated guides for each canton."
                  : "Nos tarifs sont identiques quel que soit votre canton. Cependant, chaque canton a ses propres taux d'imposition et dÃ©ductions spÃ©cifiques. DÃ©couvrez nos guides dÃ©diÃ©s pour chaque canton."}
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
                ? "NeoFidu combines the expertise of a traditional fiduciary with the efficiency and transparency of a 100% digital platform. No appointment needed, no hidden costs â just professional tax services at fair prices."
                : "NeoFidu combine l'expertise d'une fiduciaire traditionnelle avec l'efficacitÃ© et la transparence d'une plateforme 100% digitale. Pas de rendez-vous nÃ©cessaire, pas de coÃ»ts cachÃ©s â simplement des services fiscaux professionnels Ã  des prix justes."}
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
                {isEnglish ? "Pricing FAQ" : "Questions frÃ©quentes sur nos tarifs"}
              </h2>
            </div>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "Are these prices final?"
                    : "Ces prix sont-ils dÃ©finitifs ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "The prices shown are starting prices. The final quote depends on the complexity of your situation. We always provide a detailed quote before starting."
                    : "Les prix affichÃ©s sont des prix de dÃ©part. Le devis final dÃ©pend de la complexitÃ© de votre situation. Nous fournissons toujours un devis dÃ©taillÃ© avant de commencer."}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "How to get a personalized quote?"
                    : "Comment obtenir un devis personnalisÃ© ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Fill out our online form in 2 minutes. You will receive a detailed quote by email, without any commitment."
                    : "Remplissez notre formulaire en ligne en 2 minutes. Vous recevrez un devis dÃ©taillÃ© par email, sans aucun engagement."}
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
                    ? "We accept bank transfers, credit cards (Visa, Mastercard), PayPal, Klarna (pay in 3 installments, interest-free), and TWINT."
                    : "Nous acceptons les virements bancaires, les cartes de crÃ©dit (Visa, Mastercard), PayPal et Klarna (paiement en 3 fois sans frais)."}
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
                    : "Oui, grÃ¢ce Ã  Klarna vous pouvez rÃ©gler en 3 fois sans frais. Cette option est disponible pour toutes les formules particuliers et entreprises."}
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
                    ? <>Our base prices are the same for all cantons in French-speaking Switzerland (<Link href="/cantons/geneve" className="text-primary hover:underline">Geneva</Link>, <Link href="/cantons/vaud" className="text-primary hover:underline">Vaud</Link>, <Link href="/cantons/valais" className="text-primary hover:underline">Valais</Link>, <Link href="/cantons/fribourg" className="text-primary hover:underline">Fribourg</Link>, <Link href="/cantons/neuchatel" className="text-primary hover:underline">NeuchÃ¢tel</Link>, <Link href="/cantons/jura" className="text-primary hover:underline">Jura</Link>). The final price depends solely on the complexity of your file, not your canton of residence.</>
                    : <>Nos tarifs de base sont identiques pour tous les cantons romands (<Link href="/cantons/geneve" className="text-primary hover:underline">GenÃ¨ve</Link>, <Link href="/cantons/vaud" className="text-primary hover:underline">Vaud</Link>, <Link href="/cantons/valais" className="text-primary hover:underline">Valais</Link>, <Link href="/cantons/fribourg" className="text-primary hover:underline">Fribourg</Link>, <Link href="/cantons/neuchatel" className="text-primary hover:underline">NeuchÃ¢tel</Link>, <Link href="/cantons/jura" className="text-primary hover:underline">Jura</Link>). Le prix final dÃ©pend uniquement de la complexitÃ© de votre dossier, pas de votre canton de rÃ©sidence.</>}
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
                    : <>La dÃ©claration de cryptomonnaies (Bitcoin, Ethereum, etc.) peut nÃ©cessiter un supplÃ©ment selon le nombre de transactions et de plateformes utilisÃ©es. <Link href="/blog/declarer-cryptomonnaies-suisse-guide-2026" className="text-primary hover:underline">Consultez notre guide complet sur la dÃ©claration crypto en Suisse</Link> et demandez un devis pour une estimation prÃ©cise.</>}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  {isEnglish
                    ? "What if my file is more complex than expected?"
                    : "Que se passe-t-il si mon dossier est plus complexe que prÃ©vu ?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "If additional elements appear after the initial quote, we contact you for a revised quote before continuing. No supplement is charged without your prior agreement."
                    : "Si des Ã©lÃ©ments supplÃ©mentaires apparaissent aprÃ¨s le devis initial, nous vous contactons pour un devis rÃ©visÃ© avant de continuer. Aucun supplÃ©ment n'est facturÃ© sans votre accord prÃ©alable."}
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
                    : "Votre satisfaction est notre prioritÃ©. Remboursement possible uniquement avant le dÃ©but du traitement."}
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
                : "PrÃªt Ã  gagner du temps et de l'argent ?"}
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
