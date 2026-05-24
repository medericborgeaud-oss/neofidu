"use client";

import { Card } from "@/components/ui/card";
import { FileText, Calculator, Globe, Building2, ArrowRight, Users } from "lucide-react";
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
          icon: Users,
          title: "Swiss Abroad",
          description: "Tax filing from abroad",
          services: ["Tax return from abroad", "Double taxation", "Patrimony management"],
          href: "/suisses-etranger",
          color: "bg-teal-500/10",
          iconColor: "text-teal-600",
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
          title: "Particulier salari\u00e9",
          description: "D\u00e9claration, d\u00e9ductions, 3e pilier",
          services: ["D\u00e9claration d\u00e8s CHF 89", "Optimisation des d\u00e9ductions", "Conseil 3e pilier"],
          href: "/demande",
          color: "bg-blue-500/10",
          iconColor: "text-blue-600",
        },
        {
          icon: Calculator,
          title: "Ind\u00e9pendant / PME",
          description: "Comptabilit\u00e9, TVA, cr\u00e9ation d'entreprise",
          services: ["Comptabilit\u00e9 d\u00e8s CHF 500/an", "D\u00e9clarations TVA", "Cr\u00e9ation S\u00e0rl / SA"],
          href: "/independants",
          color: "bg-emerald-500/10",
          iconColor: "text-emerald-600",
        },
        {
          icon: Globe,
          title: "Expatri\u00e9 en Suisse",
          description: "Imp\u00f4t \u00e0 la source, TOU, quasi-r\u00e9sident",
          services: ["Rectification TOU", "Statut quasi-r\u00e9sident", "Service bilingue FR/EN"],
          href: "/expats",
          color: "bg-purple-500/10",
          iconColor: "text-purple-600",
        },
        {
          icon: Users,
          title: "Suisses de l'\u00e9tranger",
          description: "D\u00e9claration depuis l'\u00e9tranger",
          services: ["D\u00e9claration depuis l'\u00e9tranger", "Double imposition", "Gestion du patrimoine"],
          href: "/suisses-etranger",
          color: "bg-teal-500/10",
          iconColor: "text-teal-600",
        },
        {
          icon: Building2,
          title: "Propri\u00e9taire immobilier",
          description: "G\u00e9rance, valeur locative, gain immobilier",
          services: ["G\u00e9rance immobili\u00e8re", "Optimisation valeur locative", "Imp\u00f4t sur le gain"],
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
            {isEnglish ? "You are..." : "Vous \u00eates..."}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            {isEnglish
              ? "Select your profile and discover the services tailored to your needs."
              : "S\u00e9lectionnez votre profil et d\u00e9couvrez les services adapt\u00e9s \u00e0 vos besoins."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
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
                      <span className="text-primary mt-0.5 flex-shrink-0">\u2022</span>
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
