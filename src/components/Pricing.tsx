"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Home, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Pricing() {
  const { isEnglish } = useLanguage();

  const propertyPricing = isEnglish
    ? {
        name: "Property Management",
        price: "5%",
        unit: "of gross rents",
        priceNote: "excl. VAT",
        description: "Complete management of your properties",
        available: ["Vaud", "Valais"],
        features: [
          "Tenant search and selection",
          "Lease and addendum drafting",
          "Entry and exit inventories",
          "Rent collection and tracking",
          "Works and claims management",
          "Annual expense statement",
          "Detailed monthly reporting",
        ],
      }
    : {
        name: "Gérance immobilière",
        price: "5%",
        unit: "des loyers bruts",
        priceNote: "HT",
        description: "Gestion complète de vos biens",
        available: ["Vaud", "Valais"],
        features: [
          "Recherche et sélection de locataires",
          "Rédaction des baux et avenants",
          "États des lieux d'entrée et sortie",
          "Encaissement et suivi des loyers",
          "Gestion des travaux et sinistres",
          "Décompte de charges annuel",
          "Reporting mensuel détaillé",
        ],
      };

  const taxPricing = isEnglish
    ? [
        {
          name: "Basic",
          price: "50",
          description: "Simple cases",
          features: [
            "Single person or household",
            "Income certificate(s)",
            "Bank statement(s)",
            "Standard deductions",
            "Standard processing (10 business days)",
          ],
          popular: false,
        },
        {
          name: "Comfort",
          price: "100",
          description: "Most popular",
          features: [
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
          name: "Integral",
          price: "150",
          description: "Diversified assets",
          features: [
            "Includes Comfort plan",
            "Extended real estate",
            "Securities and investments",
            "Multiple income sources",
            "Standard processing (10 business days)",
            "Personalized guidance",
          ],
          popular: false,
        },
      ]
    : [
        {
          name: "Basique",
          price: "50",
          description: "Dossiers sans complexité",
          features: [
            "Personne seule ou en ménage",
            "Attestation(s) de revenus",
            "Relevé(s) de compte",
            "Abattements usuels",
            "Traitement standard (10 jours ouvrés)",
          ],
          popular: false,
        },
        {
          name: "Confort",
          price: "100",
          description: "Formule plébiscitée",
          features: [
            "Inclut la formule Basique",
            "Charge(s) de famille",
            "Un logement en propriété",
            "Dépenses professionnelles",
            "Traitement standard (10 jours ouvrés)",
            "Assistance dédiée",
          ],
          popular: true,
        },
        {
          name: "Intégral",
          price: "150",
          description: "Patrimoine diversifié",
          features: [
            "Inclut la formule Confort",
            "Patrimoine immobilier étendu",
            "Titres et placements",
            "Sources de revenus multiples",
            "Traitement standard (10 jours ouvrés)",
            "Accompagnement personnalisé",
          ],
          popular: false,
        },
      ];

  const accountingPricing = isEnglish
    ? [
        {
          name: "Self-employed",
          price: "500",
          unit: "/year",
          priceNote: "excl. VAT",
          description: "Sole proprietorship, freelance",
          features: [
            "Complete bookkeeping",
            "VAT declarations (if applicable)",
            "Annual closing",
            "Bank reconciliation",
            "Email support",
          ],
        },
        {
          name: "SME",
          price: "300",
          unit: "/month",
          priceNote: "excl. VAT",
          description: "LLC, AG up to 10 employees",
          features: [
            "Complete accounting",
            "Payroll management",
            "VAT & social declarations",
            "Annual financial statements",
            "Dedicated contact",
          ],
        },
      ]
    : [
        {
          name: "Indépendant",
          price: "500",
          unit: "/an",
          priceNote: "HT",
          description: "Raison individuelle, freelance",
          features: [
            "Tenue de comptabilité complète",
            "Déclarations TVA (si assujetti)",
            "Bouclement annuel",
            "Rapprochement bancaire",
            "Assistance par email",
          ],
        },
        {
          name: "PME",
          price: "300",
          unit: "/mois",
          priceNote: "HT",
          description: "Sàrl, SA jusqu'à 10 employés",
          features: [
            "Comptabilité complète",
            "Gestion des salaires",
            "Déclarations TVA & sociales",
            "États financiers annuels",
            "Interlocuteur dédié",
          ],
        },
      ];

  const sectionTitle = isEnglish ? "PRICING" : "Grille tarifaire";
  const mainTitle1 = isEnglish ? "Transparent fees," : "Honoraires lisibles,";
  const mainTitle2 = isEnglish ? "no surprises" : "zéro mauvaise surprise";
  const mainDescription = isEnglish
    ? "Each service is quoted upfront. No unexpected charges. Tax services are shown incl. VAT, accounting and property services excl. VAT."
    : "Chaque prestation est chiffrée en amont. Aucun supplément inattendu. Prestations fiscales TTC, comptabilité et gérance HT.";

  const taxTitle = isEnglish ? "Tax Declaration Pricing" : "Tarifs déclaration d'impôts";
  const accountingTitle = isEnglish ? "Accounting Plans" : "Formules comptabilité";
  const propertyTitle = isEnglish ? "Property Management Fees" : "Honoraires gérance";
  const propertyBadge = isEnglish ? "Vaud & Valais only" : "Vaud & Valais uniquement";

  const popularBadge = isEnglish ? "Popular" : "Populaire";
  const choosePlan = isEnglish ? "Choose this plan" : "Choisir ce forfait";
  const submitRequest = isEnglish ? "Submit a request" : "Déposer une demande";
  const priceNote = isEnglish
    ? "Tax services: prices incl. VAT (8.1%). Accounting & property management: prices excl. VAT. Express options available: Priority (7 days, +CHF 20) or Express (48h, +CHF 120). The exact price is displayed during your online simulation."
    : "Prestations fiscales : prix TTC (TVA 8.1% incluse). Comptabilité & gérance immobilière : prix HT. Options express disponibles : Prioritaire (7 jours, +CHF 20) ou Express (48h, +CHF 120). Le tarif exact s'affiche lors de votre simulation en ligne.";
  const fromPrefix = isEnglish ? "from" : "dès";

  return (
    <section id="tarifs" className="py-20 md:py-32 bg-white content-auto">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            {mainTitle1}{" "}
            <span className="text-gradient">{mainTitle2}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {mainDescription}
          </p>
          {/* Payment methods accepted */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <span className="text-muted-foreground">Visa / Mastercard</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#003087]/10 rounded-full px-4 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#003087]" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
              </svg>
              <span className="text-[#003087] font-medium">PayPal</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#FFB3C7]/30 rounded-full px-4 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0A0B09]" fill="currentColor">
                <path d="M4.592 2h14.816A2.592 2.592 0 0 1 22 4.592v14.816A2.592 2.592 0 0 1 19.408 22H4.592A2.592 2.592 0 0 1 2 19.408V4.592A2.592 2.592 0 0 1 4.592 2zm5.12 6.601h-2.61l-1.492 7.4h2.008l.478-2.404h1.14c1.79 0 2.854-.984 3.107-2.513.253-1.528-.481-2.483-2.63-2.483zm.183 3.263h-.822l.38-1.9h.726c.633 0 .91.224.823.7-.088.503-.46.724-1.03.724zm4.87-3.263h-2.007l-1.492 7.4h2.007l.914-4.523h.03l1.73 4.523h2.008l-3.19-7.4z"/>
              </svg>
              <span className="text-[#0A0B09] font-medium">Klarna</span>
            </div>
          </div>
        </div>

        {/* Tax pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">{taxTitle}</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {taxPricing.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg scale-[1.02]"
                    : "border hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg bg-primary">
                      <Star className="w-3 h-3 mr-1" />
                      {popularBadge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">{fromPrefix} CHF</span>
                    <span className="text-5xl font-bold text-primary ml-1">{plan.price}</span>
                    <span className="text-muted-foreground">.-</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full rounded-full ${
                      plan.popular ? "" : "variant-outline"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href="/demande">{choosePlan}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Express Options Info Box */}
        <div className="max-w-3xl mx-auto mt-8 mb-20">
          <Card className="overflow-hidden border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 via-white to-teal-50/50">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center flex-shrink-0">
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
            </CardContent>
          </Card>
        </div>

        {/* Accounting pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">{accountingTitle}</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {accountingPricing.map((plan) => (
              <Card
                key={plan.name}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-xl border hover:border-teal-500/30 bg-gradient-to-br from-white to-teal-50/30"
              >
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">{fromPrefix} CHF</span>
                    <span className="text-5xl font-bold text-teal-600 ml-1">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.unit}</span>
                    <span className="ml-2 text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{plan.priceNote}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full rounded-full bg-teal-600 hover:bg-teal-700"
                  >
                    <Link href="/demande">{submitRequest}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Property Management pricing */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <h3 className="text-2xl font-bold">{propertyTitle}</h3>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              {propertyBadge}
            </Badge>
          </div>
          <Card className="max-w-2xl mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl border hover:border-amber-500/30 bg-gradient-to-br from-white to-amber-50/30">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{propertyPricing.name}</CardTitle>
              <CardDescription>{propertyPricing.description}</CardDescription>
              <div className="mt-4">
                <span className="text-sm text-muted-foreground">{fromPrefix}</span>
                <span className="text-5xl font-bold text-amber-600 ml-2">{propertyPricing.price}</span>
                <span className="text-muted-foreground ml-1">{propertyPricing.unit}</span>
                <span className="ml-2 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">{propertyPricing.priceNote}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {propertyPricing.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="w-full rounded-full bg-amber-600 hover:bg-amber-700"
              >
                <Link href="/demande">{submitRequest}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          {priceNote}
        </p>

        {/* Payment Methods Note */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <p className="text-center text-muted-foreground text-sm">
            {isEnglish ? "Accepted payment methods:" : "Modes de paiement acceptés :"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Visa / Mastercard */}
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <span className="text-gray-600">Visa / Mastercard</span>
            </div>
            {/* PayPal */}
            <div className="inline-flex items-center gap-2 bg-[#003087]/10 rounded-full px-4 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#003087]" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
              </svg>
              <span className="text-[#003087] font-medium">PayPal</span>
            </div>
            {/* Klarna */}
            <div className="inline-flex items-center gap-2 bg-[#FFB3C7]/30 rounded-full px-4 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0A0B09]" fill="currentColor">
                <path d="M4.592 2h14.816A2.592 2.592 0 0 1 22 4.592v14.816A2.592 2.592 0 0 1 19.408 22H4.592A2.592 2.592 0 0 1 2 19.408V4.592A2.592 2.592 0 0 1 4.592 2z"/>
              </svg>
              <span className="text-[#0A0B09] font-medium">Klarna</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-xs">
            {isEnglish
              ? "Payments secured by Stripe. Refund possible only before processing starts."
              : "Paiements sécurisés par Stripe. Remboursement possible uniquement avant le début du traitement."}
            {" "}
            <Link href="/conditions-generales#remboursements" className="text-primary underline hover:no-underline">
              {isEnglish ? "See conditions" : "Voir les conditions"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
