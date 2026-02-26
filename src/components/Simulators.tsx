"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  PiggyBank,
  Home,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const simulators = [
  {
    id: "impots",
    icon: Calculator,
    title: { fr: "Simulateur d'Impôts", en: "Tax Calculator" },
    description: {
      fr: "Calculez vos impôts en 2 minutes. Tous les cantons romands.",
      en: "Calculate your taxes in 2 minutes. All French-speaking cantons.",
    },
    href: "/simulateur/impots",
    color: "bg-primary",
    gradient: "from-primary to-emerald-600",
  },
  {
    id: "3a",
    icon: PiggyBank,
    title: { fr: "Simulateur 3ème Pilier", en: "3rd Pillar Calculator" },
    description: {
      fr: "Économie d'impôts et capital retraite. Rendement garanti 30%.",
      en: "Tax savings and retirement capital. 30% guaranteed return.",
    },
    href: "/simulateur/3eme-pilier",
    color: "bg-emerald-600",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: "valeur-locative",
    icon: Home,
    title: { fr: "Simulateur Valeur Locative", en: "Property Tax Calculator" },
    description: {
      fr: "Impact de la réforme sur vos impôts de propriétaire.",
      en: "Impact of the reform on your property taxes.",
    },
    href: "/simulateur/valeur-locative",
    color: "bg-amber-600",
    gradient: "from-amber-600 to-orange-600",
  },
];

export function Simulators() {
  const { isEnglish } = useLanguage();

  const title = isEnglish ? "Free Tax Tools" : "Outils fiscaux gratuits";
  const subtitle = isEnglish
    ? "Estimate your taxes, optimize your savings. 100% free, no registration."
    : "Estimez vos impôts, optimisez votre épargne. 100% gratuit, sans inscription.";
  const cta = isEnglish ? "Try it" : "Essayer";
  const badge = isEnglish ? "Free" : "Gratuit";

  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Simulator Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {simulators.map((sim) => (
            <Link key={sim.id} href={sim.href} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg group-hover:-translate-y-1">
                <div className={`h-2 bg-gradient-to-r ${sim.gradient}`} />
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${sim.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <sim.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">
                    {isEnglish ? sim.title.en : sim.title.fr}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {isEnglish ? sim.description.en : sim.description.fr}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* All simulators link */}
        <div className="text-center mt-8">
          <Link href="/simulateur">
            <Button variant="outline" size="lg">
              {isEnglish ? "See all simulators" : "Voir tous les simulateurs"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
