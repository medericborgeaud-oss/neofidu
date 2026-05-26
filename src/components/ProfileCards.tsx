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
          color: "bg-blue-500/10",
          iconColor: "text-blue-600",
        },
        {
          icon: Calculator,
          title: "Freelancer",
          description: "Tax return, bookkeeping, AVS",
          services: ["Tax return from CHF 149", "Simplified bookkeeping", "AVS contributions"],
          href: "/independants",
          color: "bg-emerald-500/10",
          iconColor: "text-emerald-600",
        },
        {
          icon: Building2,
          title: "SME / Company",
          description: "Accounting, VAT, company creation",
          services: ["Accounting from CHF 500/yr", "VAT returns", "LLC creation"],
          href: "/entreprises",
          color: "bg-orange-500/10",
          iconColor: "text-orange-600",
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
      ]
    : [
        {
          icon: FileText,
          title: "Particulier salarié",
          description: "Déclaration, déductions, 3e pilier",
          services: ["Déclaration dès CHF 89", "Optimisation des déductions", "Conseil 3e pilier"],
          href: "/demande",
          color: "bg-blue-500/10",
          iconColor: "text-blue-600",
        },
        {
          icon: Calculator,
          title: "Indépendant",
          description: "Déclaration, comptabilité, AVS",
          services: ["Déclaration dès CHF 149", "Comptabilité simplifiée", "Cotisations AVS"],
          href: "/independants",
          color: "bg-emerald-500/10",
          iconColor: "text-emerald-600",
        },
        {
          icon: Building2,
          title: "PME / Société",
          description: "Comptabilité, TVA, création d’entreprise",
          services: ["Comptabilité dès CHF 500/an", "Déclarations TVA", "Création Sàrl / SA"],
          href: "/entreprises",
          color: "bg-orange-500/10",
          iconColor: "text-orange-600",
        },
        {
          icon: Globe,
          title: "Expatrié en Suisse",
          description: "Impôt à la source, TOU, quasi-résident",
          services: ["Rectification TOU", "Statut quasi-résident", "Service bilingue FR/EN"],
          href: "/expats",
          color: "bg-purple-500/10",
          iconColor: "text-purple-600",
        },
        {
          icon: Users,
          title: "Suisses de l’étranger",
          description: "Déclaration depuis l’étranger",
          services: ["Déclaration depuis l’étranger", "Double imposition", "Gestion du patrimoine"],
          href: "/suisses-etranger",
          color: "bg-teal-500/10",
          iconColor: "text-teal-600",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {profiles.slice(0, 3).map((profile) => (
            <Link key={profile.title} href={profile.href}>
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group cursor-pointer">
                <div className="flex flex-col h-full">
                  <div className={`p-3 rounded-xl w-fit mb-4 ${profile.color}`}>
                    <profile.icon className={`h-6 w-6 ${profile.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {profile.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {profile.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {profile.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`${profile.iconColor} mt-0.5 flex-shrink-0`}>•</span>
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

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6">
          {profiles.slice(3, 5).map((profile) => (
            <Link key={profile.title} href={profile.href}>
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group cursor-pointer">
                <div className="flex flex-col h-full">
                  <div className={`p-3 rounded-xl w-fit mb-4 ${profile.color}`}>
                    <profile.icon className={`h-6 w-6 ${profile.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {profile.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {profile.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {profile.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`${profile.iconColor} mt-0.5 flex-shrink-0`}>•</span>
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
