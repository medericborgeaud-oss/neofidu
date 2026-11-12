"use client";

import { Card } from "@/components/ui/card";
import { FileText, Calculator, Globe, Users, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function ProfileCards() {
  const { isEnglish } = useLanguage();

  const profiles = isEnglish
    ? [
        {
          icon: FileText,
          title: "Employee",
          description: "Tax return, deductions, 3rd pillar",
          services: ["Tax return from CHF 89", "Deduction optimization", "3rd pillar advice"],
          href: "/demande",
        },
        {
          icon: Calculator,
          title: "Freelancer",
          description: "Tax return, bookkeeping, AVS",
          services: ["Tax return from CHF 189", "Simplified bookkeeping", "AVS contributions"],
          href: "/independants",
        },
        {
          icon: Building2,
          title: "SME / Company",
          description: "Accounting, VAT, company creation",
          services: ["Accounting from CHF 200/month", "VAT returns", "LLC creation from CHF 990"],
          href: "/entreprises",
        },
        {
          icon: Globe,
          title: "Expat in Switzerland",
          description: "Source tax, TOU, quasi-resident",
          services: ["TOU correction", "Quasi-resident status", "Bilingual FR/EN service"],
          href: "/expats",
        },
        {
          icon: Users,
          title: "Swiss Abroad",
          description: "Tax filing from abroad",
          services: ["Tax return from abroad", "Double taxation", "Patrimony management"],
          href: "/suisses-etranger",
        },
      ]
    : [
        {
          icon: FileText,
          title: "Particulier salarié",
          description: "Déclaration, déductions, 3e pilier",
          services: ["Déclaration dès CHF 89", "Optimisation des déductions", "Conseil 3e pilier"],
          href: "/demande",
        },
        {
          icon: Calculator,
          title: "Indépendant",
          description: "Déclaration, comptabilité, AVS",
          services: ["Déclaration dès CHF 189", "Comptabilité simplifiée", "Cotisations AVS"],
          href: "/independants",
        },
        {
          icon: Building2,
          title: "PME / Société",
          description: "Comptabilité, TVA, création d’entreprise",
          services: ["Comptabilité dès CHF 200/mois", "Déclarations TVA", "Création Sàrl dès CHF 990"],
          href: "/entreprises",
        },
        {
          icon: Globe,
          title: "Expatrié en Suisse",
          description: "Impôt à la source, TOU, quasi-résident",
          services: ["Rectification TOU", "Statut quasi-résident", "Service bilingue FR/EN"],
          href: "/expats",
        },
        {
          icon: Users,
          title: "Suisses de l’étranger",
          description: "Déclaration depuis l’étranger",
          services: ["Déclaration depuis l’étranger", "Double imposition", "Gestion du patrimoine"],
          href: "/suisses-etranger",
        },
      ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {isEnglish ? "YOUR SITUATION" : "VOTRE SITUATION"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            {isEnglish ? "You are..." : "Vous êtes..."}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            {isEnglish
              ? "Select your profile and discover the services tailored to your needs."
              : "Sélectionnez votre profil et découvrez les services adaptés à vos besoins."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {profiles.map((profile) => (
            <Link key={profile.title} href={isEnglish ? "/en" + (profile.href === "/suisses-etranger" ? "/expats" : profile.href) : profile.href}>
              <Card className="p-5 h-full transition-colors border hover:border-primary/40 group cursor-pointer">
                <div className="flex flex-col h-full">
                  <profile.icon className="h-5 w-5 text-primary mb-3" />

                  <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">
                    {profile.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {profile.description}
                  </p>

                  <ul className="space-y-1.5 mb-4">
                    {profile.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary/70 mt-0.5 flex-shrink-0">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>

                  <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all mt-auto">
                    {isEnglish ? "Learn more" : "En savoir plus"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
