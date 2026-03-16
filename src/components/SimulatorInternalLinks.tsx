"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  PiggyBank,
  Home,
  Map,
  TrendingUp,
  FileText,
  Globe,
  MapPin,
  BookOpen,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface SimulatorInternalLinksProps {
  currentPage: "impots" | "3eme-pilier" | "valeur-locative" | "carte-impots" | "gain-immobilier" | "salaire-net";
}

export function SimulatorInternalLinks({ currentPage }: SimulatorInternalLinksProps) {
  const { isEnglish } = useLanguage();

  const simulators = [
    {
      id: "salaire-net",
      href: "/simulateur/salaire-net",
      icon: Wallet,
      title: isEnglish ? "Net Salary Calculator" : "Simulateur Salaire Net",
      description: isEnglish ? "Calculate your net salary by canton" : "Calculez votre salaire net par canton",
      color: "bg-teal-500",
    },
    {
      id: "impots",
      href: "/simulateur/impots",
      icon: Calculator,
      title: isEnglish ? "Tax Calculator" : "Calculateur d'impôts",
      description: isEnglish ? "Estimate your taxes for all 26 cantons" : "Estimez vos impôts pour les 26 cantons",
      color: "bg-emerald-500",
    },
    {
      id: "3eme-pilier",
      href: "/simulateur/3eme-pilier",
      icon: PiggyBank,
      title: isEnglish ? "Pillar 3a Simulator" : "Simulateur 3ème Pilier",
      description: isEnglish ? "Calculate your tax savings with Pillar 3a" : "Calculez vos économies d'impôts avec le 3a",
      color: "bg-blue-500",
    },
    {
      id: "valeur-locative",
      href: "/simulateur/valeur-locative",
      icon: Home,
      title: isEnglish ? "Imputed Rental Value" : "Valeur Locative",
      description: isEnglish ? "Before/after reform comparison" : "Comparaison avant/après réforme",
      color: "bg-purple-500",
    },
    {
      id: "carte-impots",
      href: "/simulateur/carte-impots",
      icon: Map,
      title: isEnglish ? "Swiss Tax Map" : "Carte des Impôts",
      description: isEnglish ? "Compare tax rates by canton" : "Comparez les taux par canton",
      color: "bg-orange-500",
    },
    {
      id: "gain-immobilier",
      href: "/simulateur/gain-immobilier",
      icon: TrendingUp,
      title: isEnglish ? "Capital Gains Tax" : "Gain Immobilier",
      description: isEnglish ? "Calculate tax on property sale" : "Calculez l'impôt sur la vente",
      color: "bg-red-500",
    },
  ];

  const relatedPages = [
    {
      href: "/expats",
      icon: Globe,
      title: isEnglish ? "Tax Service for Expats" : "Service Fiscal Expatriés",
      description: isEnglish ? "English-speaking tax help" : "Aide fiscale en anglais",
      badge: isEnglish ? "English" : "Anglais",
    },
    {
      href: "/guide/deductions-fiscales",
      icon: BookOpen,
      title: isEnglish ? "Tax Deductions Guide" : "Guide des Déductions",
      description: isEnglish ? "All deductions explained" : "Toutes les déductions expliquées",
      badge: isEnglish ? "Guide" : "Guide",
    },
    {
      href: "/blog/first-tax-return-switzerland-expat-guide",
      icon: FileText,
      title: isEnglish ? "First Tax Return Guide" : "Guide Première Déclaration",
      description: isEnglish ? "Complete guide for newcomers" : "Guide complet pour les nouveaux arrivants",
      badge: isEnglish ? "Article" : "Article",
    },
  ];

  const cantons = [
    { href: "/cantons/vaud", name: "Vaud" },
    { href: "/cantons/geneve", name: "Genève" },
    { href: "/cantons/valais", name: "Valais" },
    { href: "/cantons/fribourg", name: "Fribourg" },
    { href: "/cantons/neuchatel", name: "Neuchâtel" },
    { href: "/cantons/jura", name: "Jura" },
  ];

  const filteredSimulators = simulators.filter((sim) => sim.id !== currentPage);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Other Simulators */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {isEnglish ? "Other Calculators" : "Autres Simulateurs"}
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            {isEnglish
              ? "Explore our free tax tools"
              : "Découvrez nos outils fiscaux gratuits"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {filteredSimulators.map((sim) => (
              <Link key={sim.id} href={sim.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 rounded-lg ${sim.color} flex items-center justify-center mb-3`}>
                      <sim.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {sim.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{sim.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {isEnglish ? "Related Resources" : "Ressources Associées"}
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            {isEnglish
              ? "Guides and articles to help you"
              : "Guides et articles pour vous aider"}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {relatedPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <page.icon className="w-5 h-5 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {page.badge}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{page.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Canton Links */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-center">
            {isEnglish ? "Tax Returns by Canton" : "Déclarations par Canton"}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {cantons.map((canton) => (
              <Link
                key={canton.href}
                href={canton.href}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-full border hover:border-primary hover:text-primary transition-colors text-sm"
              >
                <MapPin className="w-3 h-3" />
                {canton.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {isEnglish
              ? "Need help with your tax return?"
              : "Besoin d'aide pour votre déclaration ?"}
          </p>
          <Link
            href="/demande"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            {isEnglish ? "Start Your Tax Return" : "Commencer ma déclaration"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
