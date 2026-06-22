"use client";

import { Shield, Clock, Award, Heart } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function TrustSection() {
  const { isEnglish } = useLanguage();

  const pillars = isEnglish
    ? [
        { icon: Shield, title: "Confidentiality", description: "Secure processing and absolute discretion" },
        { icon: Clock, title: "Punctuality", description: "Strict adherence to deadlines" },
        { icon: Award, title: "Expertise", description: "10+ years in Swiss Romand tax" },
        { icon: Heart, title: "Attentiveness", description: "Personalized follow-up" },
      ]
    : [
        { icon: Shield, title: "Confidentialité", description: "Traitement sécurisé et discrétion absolue" },
        { icon: Clock, title: "Ponctualité", description: "Respect strict des échéances" },
        { icon: Award, title: "Savoir-faire", description: "10+ ans en fiscalité romande" },
        { icon: Heart, title: "Écoute", description: "Suivi individualisé" },
      ];

  const quote = isEnglish
    ? "We created NeoFidu to make quality fiduciary services accessible to everyone, without exorbitant fees."
    : "Nous avons créé NeoFidu pour rendre les services fiduciaires de qualité accessibles à tous, sans honoraires exorbitants.";

  const stats = isEnglish
    ? [
        { value: "10+", label: "Years of experience" },
        { value: "6", label: "Cantons served" },
        { value: "24/7", label: "Online availability" },
      ]
    : [
        { value: "10+", label: "Ans d'expérience" },
        { value: "6", label: "Cantons desservis" },
        { value: "24/7", label: "Disponibilité en ligne" },
      ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {isEnglish ? "WHY NEOFIDU" : "POURQUOI NEOFIDU"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              {isEnglish ? "The fiduciary " : "La fiduciaire "}
              <span className="text-gradient">{isEnglish ? "reinvented" : "réinventée"}</span>
            </h2>
            <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
              {isEnglish
                ? "NeoFidu is the 100% online fiduciary of French-speaking Switzerland: tax returns, accounting, VAT and company formation. Quality support at transparent prices, for individuals, the self-employed and companies."
                : "NeoFidu est la fiduciaire 100% en ligne de Suisse romande : déclarations d'impôts, comptabilité, TVA et création d'entreprise. Un accompagnement de qualité à prix transparent, pour les particuliers, les indépendants et les sociétés."}
            </p>
          </div>

          {/* Founder quote + pillars */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
            {/* Left: Founder */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/mederic-borgeaud-avatar.jpg"
                  alt="Médéric Borgeaud"
                  className="w-44 h-44 rounded-full object-cover border-2 border-primary/20 shadow-sm shrink-0"
                />
                <div>
                  <p className="font-semibold text-foreground">Médéric Borgeaud</p>
                  <p className="text-sm text-muted-foreground">{isEnglish ? "Founder" : "Fondateur"}</p>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </div>

            {/* Right: 4 pillars */}
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm border border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <pillar.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-sm mb-1">{pillar.title}</p>
                  <p className="text-xs text-muted-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 md:gap-16 pt-8 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
