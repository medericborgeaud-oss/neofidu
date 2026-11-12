"use client";

import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// Discreet one-line band pointing to the free tools (homepage).
export function Simulators() {
  const { isEnglish } = useLanguage();
  const prefix = isEnglish ? "/en" : "";

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-center gap-x-6 gap-y-2 text-sm md:text-base text-muted-foreground text-center sm:text-left">
          <span className="flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4 text-primary shrink-0" />
            {isEnglish ? "Want an estimate first?" : "Envie d'une estimation d'abord ?"}
          </span>
          <Link
            href={prefix + "/simulateur/impots"}
            className="inline-flex items-center justify-center gap-1 font-medium text-primary hover:underline"
          >
            {isEnglish ? "Estimate my taxes for free" : "Estimer mes impôts gratuitement"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href={prefix + "/simulateur"} className="hover:text-foreground hover:underline">
            {isEnglish ? "All free tools" : "Tous les outils gratuits"}
          </Link>
        </div>
      </div>
    </section>
  );
}
