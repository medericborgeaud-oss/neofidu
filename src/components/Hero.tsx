"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Calculator, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t, isEnglish } = useLanguage();

  const features = isEnglish
    ? ["Fully digital", "Transparent pricing", "Certified specialists"]
    : ["100% digital", "Tarifs affichés", "Spécialistes agréés"];

  const tagline = isEnglish
    ? "New generation fiduciary in French-speaking Switzerland"
    : "Fiduciaire nouvelle génération en Romandie";

  const title1 = isEnglish ? "Your online" : "Votre fiduciaire";
  const title2 = isEnglish ? "fiduciary" : "en ligne";
  const title3 = isEnglish ? "in French-speaking Switzerland" : "en Suisse romande";

  const subtitle = isEnglish
    ? "Submit your tax return request online. We handle everything else. Individuals, freelancers, companies, and Swiss expats worldwide."
    : "Déposez votre demande de déclaration d'impôts en ligne. Nous nous occupons du reste. Particuliers, indépendants, sociétés et Suisses de l'étranger.";

  const trustText = isEnglish
    ? "They chose us to manage their finances"
    : "Ils nous ont choisi pour gérer leurs finances";

  const stats = isEnglish
    ? [
        { value: "2000+", label: "Cases handled" },
        { value: "6", label: "Cantons served" },
        { value: "10+", label: "Years of experience" },
      ]
    : [
        { value: "2000+", label: "Dossiers traités" },
        { value: "6", label: "Cantons desservis" },
        { value: "10+", label: "Ans d'expérience" },
      ];

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
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
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
                {isEnglish ? "Submit a request" : "Déposer une demande"}
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

          {/* Simulator Link */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/simulateur"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <Calculator className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium">
                {isEnglish ? "Estimate your taxes with our free simulator" : "Estimez vos impôts avec notre simulateur gratuit"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/10 pb-20">
            <p className="text-white/60 text-sm mb-6">{trustText}</p>
            <div className="flex justify-center gap-8 md:gap-12 items-center">
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-white/80 text-sm md:text-base mt-1">{stat.label}</div>
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
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 80V40C240 13 480 0 720 0C960 0 1200 13 1440 40V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
