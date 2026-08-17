"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight } from "lucide-react";
import { countryPages } from "@/lib/country-data";

export default function SuissesDeLEtrangerPage() {
  const { isEnglish } = useLanguage();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto px-4 pt-28 pb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isEnglish ? "Swiss citizens abroad" : "Suisses de l'étranger"}
            </h1>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              {isEnglish
                ? "You live abroad but kept ties with Switzerland? We handle your Romandy tax matters remotely — property, pensions, pillar withdrawals and cantonal returns."
                : "Vous vivez à l'étranger mais gardez des liens avec la Suisse ? Nous gérons votre fiscalité romande à distance — immobilier, rentes, retraits de piliers et déclarations cantonales."}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {countryPages.map((c) => (
                <Link
                  key={c.slug}
                  href={`/suisses-de-letranger/${c.slug}`}
                  className="rounded-xl border border-border p-5 bg-white hover:border-primary transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">{c.countryEmoji}</span>
                    <span className="font-semibold text-foreground">
                      {isEnglish ? c.countryEn : c.country}
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
