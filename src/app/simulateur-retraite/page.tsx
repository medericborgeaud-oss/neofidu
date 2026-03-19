import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RetirementIncomeSimulator from "@/components/RetirementIncomeSimulator";
import { Shield, PiggyBank, TrendingUp } from "lucide-react";

export default function SimulateurRetraitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <PiggyBank className="w-8 h-8 text-green-600" />
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Simulateur de revenus à la retraite
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estimez vos revenus mensuels à la retraite : AVS, 2ème pilier (LPP) et 3ème pilier
          </p>
        </div>
        <RetirementIncomeSimulator />
      </div>
      <Footer />
    </main>
  );
}
