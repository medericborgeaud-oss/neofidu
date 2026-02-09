"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Home } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Pricing() {
  const { isEnglish } = useLanguage();

  const propertyPricing = isEnglish
    ? {
        name: "Property Management",
        price: "5%",
        unit: "of gross rents",
        description: "Complete management of your properties",
        available: ["Vaud", "Valais"],
        features: [
          "Tenant search and selection",
          "Lease and addendum drafting",
          "Entry and exit inventories",
          "Rent collection and tracking",
          "Works and claims management",
          "Annual expense statement",
          "Real estate tax declaration",
          "Detailed monthly reporting",
        ],
      }
    : {
        name: "Gérance immobilière",
        price: "5%",
        unit: "des loyers bruts",
        description: "Gestion complète de vos biens",
        available: ["Vaud", "Valais"],
        features: [
          "Recherche et sélection de locataires",
          "Rédaction des baux et avenants",
          "États des lieux d'entrée et sortie",
          "Encaissement et suivi des loyers",
          "Gestion des travaux et sinistres",
          "Décompte de charges annuel",
          "Déclaration fiscale immobilière",
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
            "Processing within 10 days",
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
            "Processing within 7 days",
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
            "Processing within 5 days",
            "Phone consultation",
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
            "Traitement sous 10 jours",
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
            "Traitement sous 7 jours",
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
            "Traitement sous 5 jours",
            "Entretien téléphonique",
          ],
          popular: false,
        },
      ];

  const accountingPricing = isEnglish
    ? [
        {
          name: "Solo",
          price: "500",
          unit: "/year",
          description: "Perfect to get started",
          features: [
            "Up to 50 operations/month",
            "Annual closing",
            "VAT statements",
            "Email support",
          ],
        },
        {
          name: "Enterprise",
          price: "1'000",
          unit: "/year",
          description: "For established structures",
          features: [
            "Unlimited entries",
            "Quarterly statements",
            "Full VAT management",
            "Dedicated contact",
            "Custom dashboards",
          ],
        },
      ]
    : [
        {
          name: "Solo",
          price: "500",
          unit: "/an",
          description: "Parfait pour se lancer",
          features: [
            "Jusqu'à 50 opérations/mois",
            "Clôture annuelle",
            "Décomptes TVA",
            "Assistance par courriel",
          ],
        },
        {
          name: "Entreprise",
          price: "1'000",
          unit: "/an",
          description: "Pour structures établies",
          features: [
            "Volume d'écritures illimité",
            "Situations trimestrielles",
            "Gestion TVA intégrale",
            "Interlocuteur attitré",
            "Tableaux de bord sur mesure",
          ],
        },
      ];

  const sectionTitle = isEnglish ? "PRICING" : "Grille tarifaire";
  const mainTitle1 = isEnglish ? "Transparent fees," : "Honoraires lisibles,";
  const mainTitle2 = isEnglish ? "no surprises" : "zéro mauvaise surprise";
  const mainDescription = isEnglish
    ? "Each service is quoted upfront. No unexpected charges: all prices shown include VAT (8.1%)."
    : "Chaque prestation est chiffrée en amont. Aucun supplément inattendu : tous les prix affichés sont TTC (TVA 8.1% incluse).";

  const taxTitle = isEnglish ? "Tax Services" : "Prestations fiscales";
  const accountingTitle = isEnglish ? "Accounting" : "Comptabilité";
  const propertyTitle = isEnglish ? "Property Management" : "Gérance immobilière";
  const propertyBadge = isEnglish ? "Vaud & Valais only" : "Vaud & Valais uniquement";

  const popularBadge = isEnglish ? "Popular" : "Populaire";
  const choosePlan = isEnglish ? "Choose this plan" : "Choisir ce forfait";
  const submitRequest = isEnglish ? "Submit a request" : "Déposer une demande";
  const priceNote = isEnglish
    ? "All prices include VAT (8.1%). The exact price is displayed during your online simulation."
    : "Tous les prix sont TTC (TVA 8.1% incluse). Le tarif exact s'affiche lors de votre simulation en ligne.";
  const fromPrefix = isEnglish ? "from" : "dès";

  return (
    <section id="tarifs" className="py-20 md:py-32 bg-white">
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
                    <span className="text-sm text-muted-foreground">CHF</span>
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
      </div>
    </section>
  );
}
