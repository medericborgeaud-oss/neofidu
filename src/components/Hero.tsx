"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Calculator, Shield, CheckCircle2, Smartphone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t, isEnglish } = useLanguage();

  const features = isEnglish
    ? ["From your smartphone", "Transparent pricing", "Certified specialists"]
    : ["Depuis votre smartphone", "Tarifs affichÃ©s", "SpÃ©cialistes diplÃ´mÃ©s"];

  const tagline = isEnglish
    ? "New generation fiduciary in French-speaking Switzerland"
    : "Fiduciaire nouvelle gÃ©nÃ©ration en Romandie";

  const title1 = isEnglish ? "Your online" : "Votre fiduciaire";
  const title2 = isEnglish ? "fiduciary" : "en ligne";
  const title3 = isEnglish ? "in French-speaking Switzerland" : "en Suisse romande";

  const subtitle = isEnglish
    ? "Submit your tax return directly from your smartphone or computer. We handle everything else. Individuals, freelancers, companies, and Swiss expats worldwide."
    : "Envoyez votre dÃ©claration dâimpÃ´ts directement depuis votre smartphone ou ordinateur. Nous nous occupons du reste. Particuliers, indÃ©pendants, sociÃ©tÃ©s et Suisses de lâÃ©tranger.";

  const stats = isEnglish
    ? [
        { value: "24/7", label: "Online availability" },
        { value: "6", label: "Cantons served" },
        { value: "10+", label: "Years of experience" },
      ]
    : [
        { value: "24/7", label: "DisponibilitÃ© en ligne" },
        { value: "6", label: "Cantons desservis" },
        { value: "10+", label: "Ans dâexpÃ©rience" },
      ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 md:left-20 animate-float opacity-20">
          <FileText className="w-16 h-16 md:w-24 md:h-24 text-white" />
        </div>
        <div className="absolute bottom-32 right-10 md:right-20 animate-float-delayed opacity-20">
          <Calculator className="w-16 h-16 md:w-24 md:h-24 text-white" />
        </div>
        <div className="absolute top-1/2 right-10 md:right-40 animate-float opacity-15">
          <Shield className="w-12 h-12 md:w-16 md:h-16 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
            <span className="text-white/90 text-base font-medium">
              {tagline}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
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
            {" "}
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
                className="flex items-center gap-2 text-white/90"
              >
                {index === 0 ? (
                  <Smartphone className="w-5 h-5 text-emerald-300" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                )}
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons - simplified to 2 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-xl shadow-black/10 group"
            >
              <Link href="/demande">
                {isEnglish ? "Submit a request" : "DÃ©poser une demande"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Link href="/simulateur">
                <Calculator className="mr-2 w-5 h-5" />
                {isEnglish ? "Estimate my taxes for free" : "Simuler mes impÃ´ts gratuitement"}
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/10 pb-20">
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

            {/* Canton flags */}
            <div className="flex justify-center gap-5 md:gap-7 mt-6">
              {[
                { code: "VD", name: isEnglish ? "Vaud" : "Vaud", flag: (
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="40" height="40" fill="#00843D"/>
                    <text x="20" y="24" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">VD</text>
                  </svg>
                )},
                { code: "GE", name: isEnglish ? "Geneva" : "GenÃ¨ve", flag: (
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="20" height="40" fill="#CE1126"/>
                    <rect x="20" width="20" height="40" fill="#FCD116"/>
                    <rect x="15" y="10" width="10" height="14" fill="#CE1126" rx="1"/>
                    <rect x="17" y="6" width="6" height="4" fill="#FCD116"/>
                  </svg>
                )},
                { code: "VS", name: isEnglish ? "Valais" : "Valais", flag: (
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="40" height="20" fill="#CE1126"/>
                    <rect y="20" width="40" height="20" fill="#FFFFFF"/>
                    <g transform="translate(8,8)">
                      <polygon points="12,0 15,8 24,8 17,13 19,22 12,17 5,22 7,13 0,8 9,8" fill="#CE1126" transform="scale(0.55) translate(10,2)"/>
                    </g>
                  </svg>
                )},
                { code: "FR", name: isEnglish ? "Fribourg" : "Fribourg", flag: (
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="20" height="40" fill="#000000"/>
                    <rect x="20" width="20" height="40" fill="#FFFFFF"/>
                  </svg>
                )},
                { code: "NE", name: isEnglish ? "NeuchÃ¢tel" : "NeuchÃ¢tel", flag: (
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="40" height="20" fill="#00843D"/>
                    <rect y="20" width="40" height="20" fill="#CE1126"/>
                    <circle cx="20" cy="20" r="5" fill="#FFFFFF"/>
                  </svg>
                )},
                { code: "JU", name: "Jura", flag: (
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="40" height="40" fill="#FFFFFF"/>
                    <rect width="20" height="20" fill="#CE1126"/>
                    <rect x="20" y="20" width="20" height="20" fill="#CE1126"/>
                  </svg>
                )},
              ].map((canton) => (
                <div key={canton.code} className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white/25 flex-shrink-0">
                    {canton.flag}
                  </div>
                  <span className="text-white/60 text-[10px] md:text-xs">{canton.name}</span>
                </div>
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
