"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  Info,
  TrendingDown,
  PiggyBank,
  Building2,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Wallet,
  Target,
  Sparkles,
  Calendar,
  Calculator,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Percent,
  Banknote,
} from "lucide-react";
import Link from "next/link";

// Tax rates by canton (marginal rates for middle-high income)
const cantonData: Record<string, { name: string; marginalRate: number; withdrawalRate: number }> = {
  vaud: { name: "Vaud", marginalRate: 0.32, withdrawalRate: 0.055 },
  geneve: { name: "Genève", marginalRate: 0.35, withdrawalRate: 0.06 },
  valais: { name: "Valais", marginalRate: 0.28, withdrawalRate: 0.045 },
  fribourg: { name: "Fribourg", marginalRate: 0.30, withdrawalRate: 0.05 },
  neuchatel: { name: "Neuchâtel", marginalRate: 0.32, withdrawalRate: 0.055 },
  jura: { name: "Jura", marginalRate: 0.31, withdrawalRate: 0.05 },
};

const MAX_3A_EMPLOYEE = 7128; // Plafond 2026
const MAX_3A_INDEPENDENT = 35640; // Plafond 2026

interface SimulationResult {
  annualContribution: number;
  taxSavingsYear: number;
  yearsToRetirement: number;
  totalContributions: number;
  totalTaxSavings: number;
  projectedCapital: number;
  projectedInterest: number;
  withdrawalTax: number;
  netCapital: number;
  effectiveReturn: number;
  cantonComparison: Array<{
    canton: string;
    name: string;
    taxSavings: number;
    withdrawalTax: number;
    netBenefit: number;
  }>;
}

export function Pillar3aSimulatorEnhanced() {
  const [formData, setFormData] = useState({
    currentAge: "35",
    retirementAge: "65",
    grossIncome: "85000",
    canton: "vaud",
    contribution: "7128",
    expectedReturn: "2.0",
    isIndependent: false,
    numberOfAccounts: "4",
  });
  const [showResult, setShowResult] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const result = useMemo((): SimulationResult | null => {
    const currentAge = parseInt(formData.currentAge) || 35;
    const retirementAge = parseInt(formData.retirementAge) || 65;
    const canton = cantonData[formData.canton];
    const maxContrib = formData.isIndependent ? MAX_3A_INDEPENDENT : MAX_3A_EMPLOYEE;
    const contribution = Math.min(parseFloat(formData.contribution) || 0, maxContrib);
    const expectedReturn = (parseFloat(formData.expectedReturn) || 2) / 100;
    const numberOfAccounts = parseInt(formData.numberOfAccounts) || 1;

    if (contribution <= 0 || currentAge >= retirementAge) return null;

    const yearsToRetirement = retirementAge - currentAge;
    const marginalRate = canton.marginalRate;
    const taxSavingsYear = contribution * marginalRate;

    // Calculate projected capital with compound interest
    let capital = 0;
    let totalContributions = 0;
    let totalInterest = 0;

    for (let i = 1; i <= yearsToRetirement; i++) {
      capital += contribution;
      const interestThisYear = capital * expectedReturn;
      capital += interestThisYear;
      totalContributions += contribution;
      totalInterest += interestThisYear;
    }

    const totalTaxSavings = taxSavingsYear * yearsToRetirement;

    // Withdrawal tax calculation (staged withdrawal optimization)
    // With multiple accounts, you can spread withdrawals over multiple years
    const yearsOfWithdrawal = Math.min(numberOfAccounts, 5);
    const capitalPerYear = capital / yearsOfWithdrawal;
    // Progressive withdrawal tax rate (simplified)
    const baseWithdrawalRate = canton.withdrawalRate;
    const withdrawalTax = capital * baseWithdrawalRate * (1 - (yearsOfWithdrawal - 1) * 0.1);

    const netCapital = capital - withdrawalTax;

    // Effective return considering tax savings and withdrawal tax
    const effectiveReturn = (netCapital + totalTaxSavings - totalContributions) / totalContributions;

    // Canton comparison
    const cantonComparison = Object.entries(cantonData).map(([key, data]) => {
      const savings = contribution * yearsToRetirement * data.marginalRate;
      const wTax = capital * data.withdrawalRate;
      return {
        canton: key,
        name: data.name,
        taxSavings: savings,
        withdrawalTax: wTax,
        netBenefit: savings - wTax,
      };
    }).sort((a, b) => b.netBenefit - a.netBenefit);

    return {
      annualContribution: contribution,
      taxSavingsYear,
      yearsToRetirement,
      totalContributions,
      totalTaxSavings,
      projectedCapital: capital,
      projectedInterest: totalInterest,
      withdrawalTax,
      netCapital,
      effectiveReturn,
      cantonComparison,
    };
  }, [formData]);

  const handleCalculate = () => {
    if (result) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setShowResult(false);
  };

  return (
    <Card className="shadow-2xl border-2">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Calculateur 3ème Pilier 2026</CardTitle>
              <p className="text-sm text-muted-foreground">Économie d'impôts et capital retraite</p>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800">
            Plafond CHF 7'128
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {!showResult ? (
          <div className="space-y-6">
            {/* Status selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Votre statut professionnel</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isIndependent: false, contribution: "7128" })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    !formData.isIndependent
                      ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Briefcase className={`w-8 h-8 mx-auto mb-2 ${!formData.isIndependent ? "text-emerald-600" : "text-gray-400"}`} />
                  <span className="font-semibold block">Salarié</span>
                  <span className="text-xs text-muted-foreground">Max CHF 7'128/an</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isIndependent: true, contribution: "35640" })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.isIndependent
                      ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Building2 className={`w-8 h-8 mx-auto mb-2 ${formData.isIndependent ? "text-emerald-600" : "text-gray-400"}`} />
                  <span className="font-semibold block">Indépendant</span>
                  <span className="text-xs text-muted-foreground">Max CHF 35'640/an</span>
                </button>
              </div>
            </div>

            {/* Main inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentAge">Âge actuel</Label>
                <Input
                  id="currentAge"
                  type="number"
                  min={18}
                  max={64}
                  value={formData.currentAge}
                  onChange={(e) => setFormData({ ...formData, currentAge: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="retirementAge">Âge de la retraite</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  min={59}
                  max={70}
                  value={formData.retirementAge}
                  onChange={(e) => setFormData({ ...formData, retirementAge: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
            </div>

            {/* Canton selection */}
            <div>
              <Label htmlFor="canton">Canton de résidence</Label>
              <select
                id="canton"
                value={formData.canton}
                onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                className="w-full h-12 px-4 border rounded-lg text-lg bg-white"
              >
                {Object.entries(cantonData).map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.name} (taux marginal ~{formatPercent(data.marginalRate)})
                  </option>
                ))}
              </select>
            </div>

            {/* Contribution */}
            <div>
              <Label htmlFor="contribution">Cotisation annuelle prévue</Label>
              <div className="relative mt-1">
                <Input
                  id="contribution"
                  type="number"
                  max={formData.isIndependent ? MAX_3A_INDEPENDENT : MAX_3A_EMPLOYEE}
                  value={formData.contribution}
                  onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                  className="h-12 text-lg pl-14"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">CHF</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[
                  { label: "50%", value: formData.isIndependent ? Math.round(MAX_3A_INDEPENDENT / 2) : Math.round(MAX_3A_EMPLOYEE / 2) },
                  { label: "Maximum", value: formData.isIndependent ? MAX_3A_INDEPENDENT : MAX_3A_EMPLOYEE },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, contribution: opt.value.toString() })}
                    className="px-4 py-1.5 text-sm rounded-full border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced options */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedReturn">Rendement attendu (%/an)</Label>
                <select
                  id="expectedReturn"
                  value={formData.expectedReturn}
                  onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
                  className="w-full h-12 px-4 border rounded-lg bg-white"
                >
                  <option value="0.5">0.5% (Compte épargne)</option>
                  <option value="1.0">1.0% (Obligations)</option>
                  <option value="2.0">2.0% (Mixte prudent)</option>
                  <option value="3.0">3.0% (Mixte équilibré)</option>
                  <option value="4.0">4.0% (Actions)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="numberOfAccounts">Nombre de comptes 3a</Label>
                <select
                  id="numberOfAccounts"
                  value={formData.numberOfAccounts}
                  onChange={(e) => setFormData({ ...formData, numberOfAccounts: e.target.value })}
                  className="w-full h-12 px-4 border rounded-lg bg-white"
                >
                  <option value="1">1 compte</option>
                  <option value="2">2 comptes</option>
                  <option value="3">3 comptes</option>
                  <option value="4">4 comptes (recommandé)</option>
                  <option value="5">5 comptes</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Plus de comptes = moins d'impôts au retrait
                </p>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              size="lg"
              className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculer mon économie d'impôts
            </Button>
          </div>
        ) : result ? (
          <div className="space-y-6">
            {/* Main results */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="text-3xl font-bold">{formatCurrency(result.taxSavingsYear)}</div>
                  <div className="text-sm text-white/80">Économie d'impôts/an</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <PiggyBank className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="text-3xl font-bold">{formatCurrency(result.projectedCapital)}</div>
                  <div className="text-sm text-white/80">Capital à la retraite</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="text-3xl font-bold">{formatPercent(result.effectiveReturn)}</div>
                  <div className="text-sm text-white/80">Rendement total</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed breakdown */}
            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Détail de la simulation sur {result.yearsToRetirement} ans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Cotisations totales</span>
                    <span className="font-semibold">{formatCurrency(result.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Intérêts accumulés</span>
                    <span className="font-semibold text-emerald-600">+{formatCurrency(result.projectedInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Capital brut</span>
                    <span className="font-semibold">{formatCurrency(result.projectedCapital)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Impôt au retrait (estimé)</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(result.withdrawalTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b bg-emerald-50 -mx-6 px-6">
                    <span className="font-semibold">Capital net estimé</span>
                    <span className="font-bold text-lg text-emerald-600">{formatCurrency(result.netCapital)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-blue-50 -mx-6 px-6">
                    <span className="font-semibold">Économies d'impôts totales</span>
                    <span className="font-bold text-lg text-blue-600">{formatCurrency(result.totalTaxSavings)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Canton comparison */}
            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" />
                  Comparaison par canton
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.cantonComparison.map((c, idx) => (
                    <div
                      key={c.canton}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        c.canton === formData.canton ? "bg-emerald-100 border-2 border-emerald-300" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {idx === 0 && <Badge className="bg-amber-100 text-amber-800">Top</Badge>}
                        <span className={c.canton === formData.canton ? "font-semibold" : ""}>{c.name}</span>
                        {c.canton === formData.canton && (
                          <Badge variant="outline" className="text-xs">Votre canton</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-emerald-600">+{formatCurrency(c.netBenefit)}</div>
                        <div className="text-xs text-muted-foreground">bénéfice net</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1"
              >
                Modifier les paramètres
              </Button>
              <Link href="/demande" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600">
                  Optimiser ma déclaration
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              * Simulation indicative basée sur les taux moyens. Les résultats réels peuvent varier selon votre commune et votre situation personnelle.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
