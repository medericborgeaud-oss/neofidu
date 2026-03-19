import RetirementIncomeSimulator from "@/components/RetirementIncomeSimulator";
import { Shield, PiggyBank, TrendingUp } from "lucide-react";

export default function SimulateurRetraitePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-10">
        <div className="flex justify-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-blue-500" /> AVS
          </span>
          <span className="flex items-center gap-1.5">
            <PiggyBank className="h-4 w-4 text-green-500" /> 2ème pilier
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-purple-500" /> 3ème pilier
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Calculateur de revenus à la retraite
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estimez votre revenu mensuel à la retraite en combinant les trois piliers
          du système suisse de prévoyance.
        </p>
      </div>
      <RetirementIncomeSimulator />
    </main>
  );
}
