"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function SimulatorCTA() {
  const { isEnglish } = useLanguage();

  const bullets = isEnglish
    ? ["From CHF 50", "100% digital", "Certified specialists"]
    : ["Dès CHF 50", "100% digital", "Spécialistes diplômés"];

  return (
    <section className="bg-gradient-to-br from-primary via-teal-600 to-emerald-700 text-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <p className="text-emerald-200 text-sm font-semibold uppercase tracking-widest mb-4">
          {isEnglish ? "From simulator to solution" : "Du simulateur à la solution"}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish
            ? "Want NeoFidu to handle it for you?"
            : "Voulez-vous que NeoFidu s’en occupe pour vous ?"}
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          {isEnglish
            ? "Our certified specialists manage your file from A to Z. Just send your documents — we take care of the rest."
            : "Nos spécialistes diplômés gèrent votre dossier de A à Z. Vous envoyez vos documents, on s’occupe du reste."}
        </p>
        <div className="flex justify-center gap-8 mb-10 flex-wrap">
          {bullets.map((b, i) => (
            <span key={i} className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              {b}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/demande">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-lg">
              {isEnglish ? "Get started" : "Déposer une demande"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/tarifs">
            <Button size="lg" variant="ghost" className="border border-white/50 text-white hover:bg-white/10 hover:text-white px-8">
              {isEnglish ? "See pricing" : "Voir les tarifs"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
