"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Home, TrendingDown, Calculator, Calendar, CheckCircle2, AlertTriangle,
  ArrowRight, FileText, Scale, Percent, HelpCircle, ChevronDown, ChevronUp,
  Mail, Clock, BadgePercent,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

// Historical reference rates
const referenceRates = [
  { date: "2024-12-01", rate: 1.75, label: "Décembre 2024" },
  { date: "2023-12-01", rate: 1.75, label: "Décembre 2023" },
  { date: "2023-06-01", rate: 1.50, label: "Juin 2023" },
  { date: "2022-06-01", rate: 1.25, label: "Juin 2022" },
  { date: "2020-03-01", rate: 1.25, label: "Mars 2020" },
  { date: "2017-06-01", rate: 1.50, label: "Juin 2017" },
  { date: "2015-06-01", rate: 1.75, label: "Juin 2015" },
  { date: "2013-09-01", rate: 2.00, label: "Sept 2013" },
  { date: "2012-06-01", rate: 2.25, label: "Juin 2012" },
  { date: "2011-06-01", rate: 2.75, label: "Juin 2011" },
  { date: "2009-09-01", rate: 3.00, label: "Sept 2009" },
  { date: "2008-12-01", rate: 3.50, label: "Déc 2008" },
];

const CURRENT_RATE = 1.75;
const CURRENT_RATE_DATE = "Mars 2026";

function calculateReduction(oldRate: number, newRate: number): number {
  if (newRate >= oldRate) return 0;
  const steps = (oldRate - newRate) / 0.25;
  return steps * 2.91;
}

export function BaiseLoyerCalculator() {
  const { isEnglish } = useLanguage();
  const [entryDate, setEntryDate] = useState("");
  const [currentRent, setCurrentRent] = useState("");
  const [lastAdjustmentRate, setLastAdjustmentRate] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const entryRate = useMemo(() => {
    if (!entryDate) return null;
    const entryDateObj = new Date(entryDate);
    for (const rate of referenceRates) {
      if (entryDateObj >= new Date(rate.date)) return rate.rate;
    }
    return referenceRates[referenceRates.length - 1].rate;
  }, [entryDate]);

  const results = useMemo(() => {
    const rateToUse = lastAdjustmentRate || entryRate;
    if (!rateToUse || !currentRent) return null;
    const rent = parseFloat(currentRent);
    if (isNaN(rent) || rent <= 0) return null;

    const reductionPercent = calculateReduction(rateToUse, CURRENT_RATE);
    const monthlyReduction = (rent * reductionPercent) / 100;

    return {
      oldRate: rateToUse,
      newRate: CURRENT_RATE,
      reductionPercent: reductionPercent.toFixed(2),
      monthlyReduction: monthlyReduction.toFixed(0),
      newRent: (rent - monthlyReduction).toFixed(0),
      yearlyReduction: (monthlyReduction * 12).toFixed(0),
      canReduce: reductionPercent > 0,
    };
  }, [entryRate, lastAdjustmentRate, currentRent]);

  const faqItems = [
    { question: "Quel est le taux de référence actuel ?", answer: `Le taux est de ${CURRENT_RATE}% (${CURRENT_RATE_DATE}). Il est publié par l'Office fédéral du logement.` },
    { question: "Comment demander une baisse ?", answer: "Envoyez une lettre recommandée à votre bailleur en mentionnant la baisse du taux. Respectez le délai de préavis (3 mois)." },
    { question: "Mon bailleur peut-il refuser ?", answer: "Il peut contester s'il prouve une hausse des coûts. En cas de litige, saisissez l'autorité de conciliation." },
    { question: "La baisse est-elle automatique ?", answer: "Non, c'est au locataire de faire la demande par écrit. Sans demande, le loyer reste inchangé." },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BreadcrumbLight items={[{ label: "Simulateurs", href: "/simulateur" }, { label: "Baisse de loyer" }]} className="mb-8" />

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Calculateur de <span className="text-gradient">baisse de loyer</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Calculez si vous pouvez demander une baisse de loyer selon le taux de référence hypothécaire suisse.
            </p>
          </motion.div>

          {/* Current rate banner */}
          <Card className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-primary/10 to-teal-50 border-primary/20 p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Percent className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taux de référence actuel</p>
                  <p className="text-2xl font-bold text-primary">{CURRENT_RATE}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Mis à jour : {CURRENT_RATE_DATE}</span>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Calculator Form */}
            <Card className="p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Calculer ma baisse de loyer
              </h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="entryDate">Date d'entrée dans le logement</Label>
                  <Input id="entryDate" type="date" value={entryDate} onChange={(e) => { setEntryDate(e.target.value); setShowResult(false); }} className="mt-1.5" max={new Date().toISOString().split("T")[0]} />
                  {entryRate && <p className="text-xs text-muted-foreground mt-1">Taux à cette date : <span className="font-medium text-primary">{entryRate}%</span></p>}
                </div>
                <div>
                  <Label>Taux lors du dernier ajustement <span className="text-xs text-muted-foreground">(optionnel)</span></Label>
                  <select value={lastAdjustmentRate || ""} onChange={(e) => { setLastAdjustmentRate(e.target.value ? parseFloat(e.target.value) : null); setShowResult(false); }} className="mt-1.5 w-full px-3 py-2 border rounded-lg bg-white text-sm">
                    <option value="">Utiliser le taux à l'entrée</option>
                    {[3.50, 3.00, 2.75, 2.50, 2.25, 2.00, 1.75, 1.50, 1.25].map(r => <option key={r} value={r}>{r}%</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="currentRent">Loyer mensuel actuel (CHF)</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">CHF</span>
                    <Input id="currentRent" type="number" value={currentRent} onChange={(e) => { setCurrentRent(e.target.value); setShowResult(false); }} placeholder="1'800" className="pl-12" min="0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Loyer net sans les charges</p>
                </div>
                <Button onClick={() => setShowResult(true)} disabled={!entryDate || !currentRent} className="w-full rounded-xl py-6">
                  <Calculator className="w-5 h-5 mr-2" /> Calculer ma baisse potentielle
                </Button>
              </div>
            </Card>

            {/* Results */}
            <AnimatePresence mode="wait">
              {showResult && results ? (
                <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card className={`p-6 shadow-lg ${results.canReduce ? "border-2 border-emerald-500/30" : "border-2 border-amber-500/30"}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${results.canReduce ? "bg-emerald-100" : "bg-amber-100"}`}>
                      {results.canReduce ? <CheckCircle2 className="w-7 h-7 text-emerald-600" /> : <AlertTriangle className="w-7 h-7 text-amber-600" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{results.canReduce ? "Vous pouvez demander une baisse !" : "Pas de baisse possible"}</h3>
                    {results.canReduce ? (
                      <>
                        <p className="text-muted-foreground mb-6">Le taux est passé de {results.oldRate}% à {results.newRate}%.</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-emerald-50 rounded-xl p-4 text-center">
                            <p className="text-sm text-muted-foreground">Réduction mensuelle</p>
                            <p className="text-2xl font-bold text-emerald-600">- CHF {results.monthlyReduction}</p>
                          </div>
                          <div className="bg-emerald-50 rounded-xl p-4 text-center">
                            <p className="text-sm text-muted-foreground">Économie annuelle</p>
                            <p className="text-2xl font-bold text-emerald-600">CHF {results.yearlyReduction}</p>
                          </div>
                        </div>
                        <div className="bg-secondary/50 rounded-xl p-4">
                          <div className="flex justify-between mb-2"><span className="text-sm text-muted-foreground">Loyer actuel</span><span>CHF {currentRent}</span></div>
                          <div className="flex justify-between mb-2"><span className="text-sm text-muted-foreground">Réduction ({results.reductionPercent}%)</span><span className="text-emerald-600">- CHF {results.monthlyReduction}</span></div>
                          <div className="border-t pt-2 flex justify-between"><span className="font-semibold">Nouveau loyer</span><span className="text-xl font-bold text-primary">CHF {results.newRent}</span></div>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Le taux actuel ({results.newRate}%) n'est pas inférieur à celui de votre entrée ({results.oldRate}%).</p>
                    )}
                  </Card>
                  <Card className="mt-4 p-5 bg-gradient-to-br from-primary/5 to-teal-50 border-primary/20">
                    <div className="flex items-start gap-4">
                      <Scale className="w-10 h-10 text-primary" />
                      <div>
                        <h4 className="font-semibold mb-1">Besoin d'aide ?</h4>
                        <p className="text-sm text-muted-foreground mb-3">Notre équipe vous accompagne dans vos démarches.</p>
                        <Button asChild size="sm" className="rounded-full"><Link href="/#contact">Nous contacter <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card className="p-6 bg-secondary/30 border-dashed">
                  <div className="text-center py-8">
                    <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Résultats</h3>
                    <p className="text-muted-foreground text-sm">Remplissez le formulaire pour voir votre baisse potentielle</p>
                  </div>
                </Card>
              )}
            </AnimatePresence>
          </div>

          {/* SEO Content */}
          <section className="max-w-4xl mx-auto mt-16">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Tout savoir sur la baisse de loyer en Suisse</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Le <strong>taux de référence hypothécaire</strong> est publié par l'Office fédéral du logement. Il sert de base pour les ajustements de loyer en Suisse.</p>
                <p>Chaque baisse de <strong>0.25%</strong> du taux permet une réduction d'environ <strong>2.91%</strong> du loyer. Par exemple, un passage de 2% à 1.75% justifie une baisse de 2.91%.</p>
                <p>Tout locataire en Suisse (Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura) peut demander une baisse si le taux actuel est inférieur au taux lors de la dernière fixation de loyer.</p>
                <h3 className="text-lg font-semibold text-foreground pt-4">Historique des taux</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  {referenceRates.slice(0, 8).map((r, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-2 text-center">
                      <span className="block text-xs text-muted-foreground">{r.label}</span>
                      <span className="font-semibold">{r.rate}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>

          {/* FAQ */}
          <section className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes</h2>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <Card key={index} className={`overflow-hidden ${openFaqIndex === index ? "border-primary/20" : ""}`}>
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="w-full p-4 text-left flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.question}</span>
                    </div>
                    {openFaqIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  <div className="grid transition-all duration-300" style={{ gridTemplateRows: openFaqIndex === index ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 pl-12 text-muted-foreground text-sm">{item.answer}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-2xl mx-auto mt-12 text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-teal-50">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Besoin d'optimiser vos finances ?</h3>
              <p className="text-muted-foreground mb-6">NeoFidu vous accompagne dans vos déclarations d'impôts en Suisse romande.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="rounded-full"><Link href="/demande">Démarrer ma déclaration <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
                <Button asChild variant="outline" className="rounded-full"><Link href="/simulateur">Autres simulateurs</Link></Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
