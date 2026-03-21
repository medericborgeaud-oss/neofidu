import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RetirementIncomeSimulator from "@/components/RetirementIncomeSimulator";
import { Zap } from "lucide-react";

export default function SimulateurRetraitePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 text-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Gratuit & Instantané</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Simulateur{" "}
              <span className="text-emerald-300">Retraite</span> Suisse
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Estimez votre rente AVS, LPP et 3ème pilier. Planifiez sereinement votre retraite.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["AVS", "LPP", "3ème Pilier", "Résultat instantané", "100% gratuit"].map(
                (pill) => (
                  <span
                    key={pill}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium"
                  >
                    {pill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>
      <RetirementIncomeSimulator />
      <Footer />
    </main>
  );
}
