"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Calculator, Shield, CheckCircle2, Smartphone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { CantonFlag } from "@/components/CantonFlag";
export function Hero() {
  const { t, isEnglish } = useLanguage();
  const features = isEnglish
    ? ["From your smartphone", "Transparent pricing", "Certified specialist"]
    : ["Depuis votre smartphone", "Tarifs affichés", "Spécialiste diplômé"];
  const tagline = isEnglish
    ? "New generation fiduciary in French-speaking Switzerland"
    : "Fiduciaire nouvelle génération en Romandie";
  const title1 = isEnglish ? "Your online" : "Votre fiduciaire";
  const title2 = isEnglish ? "fiduciary" : "en ligne";
  const title3 = isEnglish ? "in French-speaking Switzerland" : "en Suisse romande";
  const subtitle = isEnglish
    ? "Submit your tax return directly from your smartphone or computer. We handle everything else. Individuals, freelancers, companies, and Swiss expats worldwide."
    : "Envoyez votre déclaration d'impôts directement depuis votre smartphone ou ordinateur. Nous nous occupons du reste. Particuliers, indépendants, sociétés et Suisses de l'étranger.";
  const commitments = isEnglish
    ? [
        "Price confirmed before we start",
        "No extra charge without your approval",
        "No minimum term for accounting",
      ]
    : [
        "Prix confirmé avant de commencer",
        "Aucun supplément sans votre accord",
        "Comptabilité sans durée minimale",
      ];
  return (
    <section className="relative md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 md:pt-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-400/5 rounded-full blur-3xl" />
      </div>
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
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
      <div className="relative z-10 container mx-auto px-4 pt-8 pb-16 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
            <span className="text-white/90 text-base font-medium">
              {tagline}
            </span>
          </div>
          {/* Main heading */}
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 md:mb-6 leading-tight">
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
          <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-6 mb-8 md:mb-10">
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
              <Link href={(isEnglish ? "/en" : "") + "/demande"}>
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
              <Link href={(isEnglish ? "/en" : "") + "/simulateur"}>
                <Calculator className="mr-2 w-5 h-5" />
                {isEnglish ? "Estimate my taxes for free" : "Simuler mes impôts gratuitement"}
              </Link>
            </Button>
          </div>
          {/* Trust indicators */}
          <div className="mt-10 md:mt-16 pt-8 border-t border-white/10 pb-12 md:pb-20">
            <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-8 gap-y-2 text-white/90 text-sm md:text-base">
              {commitments.map((item) => (
                <li key={item} className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {/* Canton flags */}
            <div className="flex justify-center gap-5 md:gap-12 mt-10 md:mt-12 flex-wrap">
              {([
                { code: "VD", name: "Vaud", slug: "vaud" },
                { code: "GE", name: isEnglish ? "Geneva" : "Genève", slug: "geneve" },
                { code: "VS", name: "Valais", slug: "valais" },
                { code: "FR", name: "Fribourg", slug: "fribourg" },
                { code: "NE", name: "Neuchâtel", slug: "neuchatel" },
                { code: "JU", name: "Jura", slug: "jura" },
              ] as const).map((canton) => (
                <Link
                  key={canton.code}
                  href={(isEnglish ? "/en" : "") + "/cantons/" + canton.slug}
                  className="flex flex-col items-center gap-2 transition-transform hover:scale-110 hover:-translate-y-0.5"
                  aria-label={canton.name}
                >
                  <div className="overflow-hidden rounded-sm">
                    <CantonFlag canton={canton.code} size={48} eager showBorder={false} />
                  </div>
                  <span className="text-white/70 text-[11px] md:text-sm">{canton.name}</span>
                </Link>
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
