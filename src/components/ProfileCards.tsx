"use client";

import { Card } from "@/components/ui/card";
import { FileText, Calculator, Globe, Building2, ArrowRight } from "lucide-react";
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
          color: "bg-blue-500/10",
          iconColor: "text-blue-600",
        },
        {
          icon: Calculator,
          title: "Freelancer / SME",
          description: "Accounting, VAT, company creation",
          services: ["Accounting from CHF 500/yr", "VAT returns", "LLC creation"],
          href: "/independants",
          color: "bg-emerald-500/10",
          iconColor: "text-emerald-600",
        },
        {
          icon: Globe,
          title: "Expat in Switzerland",
          description: "Source tax, TOU, quasi-resident",
          services: ["TOU correction", "Quasi-resident status", "Bilingual FR/EN service"],
          href: "/expats",
          color: "bg-purple-500/10",
          iconColor: "text-purple-600",
        },
        {
          icon: Building2,
          title: "Property owner",
          description: "Property management, rental value, capital gains",
          services: ["Property management", "Rental value optimization", "Capital gains tax"],
          href: "/gerance-immobiliere",
          color: "bg-orange-500/10",
          iconColor: "text-orange-600",
        },
      ]
    : [
        {
          icon: FileText,
          title: "Particulier salariÃ©",
          description: "DÃ©claration, dÃ©ductions, 3e pilier",
          services: ["DÃ©claration dÃ¨s CHF 89", "Optimisation des dÃ©ductions", "Conseil 3e pilier"],
          href: "/demande",
          color: "bg-blue-500/10",
          iconColor: "text-blue-600",
        },
        {
          icon: Calculator,
          title: "IndÃ©pendant / PME",
          description: "ComptabilitÃ©, TVA, crÃ©ation d'entreprise",
          services: ["ComptabilitÃ© dÃ¨s CHF 500/an", "DÃ©clarations TVA", "CrÃ©ation SÃ rl / SA"],
          href: "/independants",
          color: "bg-emerald-500/10",
          iconColor: "text-emerald-600",
        },
        {
          icon: Globe,
          title: "ExpatriÃ© en Suisse",
          description: "ImpÃ´t Ã  la source, TOU, quasi-rÃ©sident",
          services: ["Rectification TOU", "Statut quasi-rÃ©sident", "Service bilingue FR/EN"],
          href: "/expats",
          color: "bg-purple-500/10",
          iconColor: "text-purple-600",
        },
        {
          icon: Building2,
          title: "PropriÃ©taire immobilier",
          description: "GÃ©rance, valeur locative, gain immobilier",
          services: ["GÃ©rance immobiliÃ¨re", "Optimisation valeur locative", "ImpÃ´t sur le gain"],
          href: "/gerance-immobiliere",
          color: "bg-orange-500/10",
          iconColor: "text-orange-600",
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
            {isEnglish ? "You are..." : "Vous Ãªtes..."}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            {isEnglish
              ? "Select your profile and discover the services tailored to your needs."
              : "SÃ©lectionnez votre profil et dÃ©couvrez les services adaptÃ©s Ã  vos besoins."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {profiles.map((profile) => (
            <Link key={profile.href} href={profile.href}>
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group cursor-pointer">
                <div className={`w-14 h-14 rounded-2xl ${profile.color} flex items-center justify-center mb-5`}>
                  <profile.icon className={`w-7 h-7 ${profile.iconColor}`} />
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  {profile.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {profile.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {profile.services.map((service) => (
                    <li key={service} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 flex-shrink-0">â¢</span>
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all mt-auto">
                  {isEnglish ? "Learn more" : "En savoir plus"}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
