"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Calculator, Shield, CheckCircle2, Timer, Zap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t, isEnglish } = useLanguage();

  const features = isEnglish
    ? ["5 minutes to complete", "Fully digital", "Transparent pricing", "Certified specialists"]
    : ["5 minutes chrono", "100% digital", "Tarifs affichés", "Spécialistes agréés"];

  const tagline = isEnglish
    ? "New generation fiduciary in French-speaking Switzerland"
    : "Fiduciaire nouvelle génération en Romandie";

  const title1 = isEnglish ? "Tax and administrative" : "Fiscalité et";
  const title2 = isEnglish ? "management" : "gestion administrative";
  const title3 = isEnglish ? "made simple" : "sans complication";

  const subtitle = isEnglish
    ? "Complete your tax return request in just 5 minutes. We handle everything else. Individuals, freelancers and companies across six Swiss Romand cantons."
    : "Déposez votre demande de déclaration d'impôts en 5 minutes chrono. Nous nous occupons du reste. Particuliers, indépendants et sociétés en Suisse romande.";

  const trustText = isEnglish
    ? "They chose us to manage their finances"
    : "Ils nous ont choisi pour gérer leurs finances";

  const stats = isEnglish
    ? [
        { value: "5 min", label: "To submit" },
        { value: "2000+", label: "Cases handled" },
        { value: "6", label: "Cantons served" },
      ]
    : [
        { value: "5 min", label: "Pour déposer" },
        { value: "2000+", label: "Dossiers traités" },
        { value: "6", label: "Cantons desservis" },
      ];

  const speedBadge = isEnglish
    ? "Your tax return in 5 minutes"
    : "Votre déclaration d'impôts en 5 minutes";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-32">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      {/* Floating icons */}
      <div className="absolute top-32 left-10 md:left-20 animate-float opacity-20 pointer-events-none">
        <FileText className="w-16 h-16 md:w-24 md:h-24 text-white" />
      </div>
      <div className="absolute bottom-32 right-10 md:right-20 animate-float-delayed opacity-20 pointer-events-none">
        <Calculator className="w-16 h-16 md:w-24 md:h-24 text-white" />
      </div>
      <div className="absolute top-1/2 right-10 md:right-40 animate-float opacity-15 pointer-events-none">
        <Shield className="w-12 h-12 md:w-16 md:h-16 text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Speed Badge - Prominent selling point */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full px-5 py-2.5 mb-4 shadow-lg shadow-orange-500/30 animate-pulse-slow">
            <Timer className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm md:text-base">
              {speedBadge}
            </span>
            <Zap className="w-4 h-4 text-yellow-200" />
          </div>

          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              {tagline}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title1}{" "}
            <span className="relative inline-block">
              {title2}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            {title3}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10">
            {features.map((feature, index) => (
              <div
                key={feature}
                className={`flex items-center gap-2 ${index === 0 ? "text-amber-300 font-semibold" : "text-white/90"}`}
              >
                {index === 0 ? (
                  <Timer className="w-5 h-5 text-amber-300" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                )}
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-xl shadow-black/10 group"
            >
              <Link href="/demande">
                {isEnglish ? "Start now - It's fast!" : "Commencer - C'est rapide!"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Link href="#tarifs">
                {isEnglish ? "View our prices" : "Consulter nos prix"}
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm mb-4">{trustText}</p>
            <div className="flex justify-center gap-8 items-center">
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${index === 0 ? "text-amber-300" : "text-white"}`}>
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="w-px h-12 bg-white/20" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120V60C240 20 480 0 720 0C960 0 1200 20 1440 60V120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
