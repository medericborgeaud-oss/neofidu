"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import Link from "next/link";

const cantonTaxRates: Record<string, { name: string; marginalRate: number }> = {
  vaud: { name: "Vaud", marginalRate: 0.32 },
  geneve: { name: "Genève", marginalRate: 0.35 },
  valais: { name: "Valais", marginalRate: 0.28 },
  fribourg: { name: "Fribourg", marginalRate: 0.30 },
  neuchatel: { name: "Neuchâtel", marginalRate: 0.32 },
  jura: { name: "Jura", marginalRate: 0.31 },
};

const MAX_3A_EMPLOYEE = 7128; // Plafond 2026
const MAX_3A_INDEPENDENT = 35640; // Plafond 2026 (20% du revenu net)

interface Pillar3aResult {
  annualContribution: number;
  taxSavingsYear: number;
  taxSavingsTotal: number;
  yearsToRetirement: number;
  totalContributions: number;
  projectedCapital: number;
  projectedInterest: number;
  yearlyProjection: Array<{
    year: number;
    age: number;
    cumulativeContributions: number;
    cumulativeInterest: number;
    capital: number;
    cumulativeTaxSavings: number;
  }>;
}

export function Pillar3aSimulator() {
  const [formData, setFormData] = useState({
    currentAge: "35",
    retirementAge: "65",
    grossIncome: "85000",
    canton: "vaud",
    contribution: "7128",
    expectedReturn: "2.5",
    isIndependent: false,
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

  const result = useMemo((): Pillar3aResult | null => {
    const currentAge = parseInt(formData.currentAge) || 35;
    const retirementAge = parseInt(formData.retirementAge) || 65;
    const canton = cantonTaxRates[formData.canton];
    const maxContrib = formData.isIndependent ? MAX_3A_INDEPENDENT : MAX_3A_EMPLOYEE;
    const contribution = Math.min(parseFloat(formData.contribution) || 0, maxContrib);
    const expectedReturn = (parseFloat(formData.expectedReturn) || 2) / 100;

    if (contribution <= 0 || currentAge >= retirementAge) return null;

    const yearsToRetirement = retirementAge - currentAge;
    const marginalRate = canton.marginalRate;
    const taxSavingsYear = contribution * marginalRate;

    const yearlyProjection = [];
    let cumulativeContributions = 0;
    let cumulativeInterest = 0;
    let capital = 0;
    let cumulativeTaxSavings = 0;

    for (let i = 1; i <= yearsToRetirement; i++) {
      capital += contribution;
      const interestThisYear = capital * expectedReturn;
      capital += interestThisYear;

      cumulativeContributions += contribution;
      cumulativeInterest += interestThisYear;
      cumulativeTaxSavings += taxSavingsYear;

      yearlyProjection.push({
        year: i,
        age: currentAge + i,
        cumulativeContributions,
        cumulativeInterest,
        capital,
        cumulativeTaxSavings,
      });
    }

    return {
      annualContribution: contribution,
      taxSavingsYear,
      taxSavingsTotal: cumulativeTaxSavings,
      yearsToRetirement,
      totalContributions: cumulativeContributions,
      projectedCapital: capital,
      projectedInterest: cumulativeInterest,
      yearlyProjection,
    };
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  if (!showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Simulateur 3ème Pilier
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Découvrez combien vous pouvez économiser en impôts
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentAge">Âge actuel</Label>
                <Input
                  id="currentAge"
                  type="number"
                  min="18"
                  max="64"
                  value={formData.currentAge}
                  onChange={(e) => setFormData({ ...formData, currentAge: e.target.value })}
                  className="h-12 mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="retirementAge">Âge retraite</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  min="58"
                  max="70"
                  value={formData.retirementAge}
                  onChange={(e) => setFormData({ ...formData, retirementAge: e.target.value })}
                  className="h-12 mt-2"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="income3a">Revenu brut annuel</Label>
              <div className="relative mt-2">
                <Input
                  id="income3a"
                  type="number"
                  placeholder="85000"
                  value={formData.grossIncome}
                  onChange={(e) => setFormData({ ...formData, grossIncome: e.target.value })}
                  className="h-12 pl-12"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
              </div>
            </div>

            <div>
              <Label htmlFor="canton3a">Canton</Label>
              <select
                id="canton3a"
                value={formData.canton}
                onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                className="w-full h-12 px-4 rounded-md border border-input bg-background mt-2"
              >
                {Object.entries(cantonTaxRates).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name} (~{(value.marginalRate * 100).toFixed(0)}%)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Statut professionnel</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isIndependent: false, contribution: "7128" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    !formData.isIndependent ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-medium">Salarié</span>
                  <p className="text-xs text-muted-foreground mt-1">Max. CHF 7'128 (2026)</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isIndependent: true, contribution: "35640" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.isIndependent ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-medium">Indépendant</span>
                  <p className="text-xs text-muted-foreground mt-1">Max. CHF 35'640 (2026)</p>
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="contribution">Cotisation annuelle 3a</Label>
              <div className="relative mt-2">
                <Input
                  id="contribution"
                  type="number"
                  max={formData.isIndependent ? MAX_3A_INDEPENDENT : MAX_3A_EMPLOYEE}
                  value={formData.contribution}
                  onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                  className="h-12 pl-12"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[
                  { label: "50%", value: formData.isIndependent ? Math.round(MAX_3A_INDEPENDENT / 2) : Math.round(MAX_3A_EMPLOYEE / 2) },
                  { label: "Max", value: formData.isIndependent ? MAX_3A_INDEPENDENT : MAX_3A_EMPLOYEE },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, contribution: opt.value.toString() })}
                    className="px-3 py-1 text-sm rounded-full border border-primary/30 text-primary hover:bg-primary/5"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="return">Rendement annuel attendu</Label>
              <div className="relative mt-2">
                <Input
                  id="return"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.expectedReturn}
                  onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
                  className="h-12 pr-12"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[
                  { label: "Prudent", value: "1.5" },
                  { label: "Équilibré", value: "2.5" },
                  { label: "Dynamique", value: "4.0" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, expectedReturn: opt.value })}
                    className="px-3 py-1 text-sm rounded-full border border-primary/30 text-primary hover:bg-primary/5"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full h-12">
              Calculer mes économies
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero stats */}
      <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-8 relative">
          <div className="text-center mb-6">
            <p className="text-white/80 text-sm mb-2">Capital projeté à la retraite</p>
            <p className="text-4xl md:text-5xl font-bold">{formatCurrency(result.projectedCapital)}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <Wallet className="w-5 h-5 mx-auto mb-2 text-emerald-300" />
              <p className="text-white/70 text-xs">Cotisations</p>
              <p className="font-bold">{formatCurrency(result.totalContributions)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <TrendingUp className="w-5 h-5 mx-auto mb-2 text-emerald-300" />
              <p className="text-white/70 text-xs">Intérêts</p>
              <p className="font-bold">{formatCurrency(result.projectedInterest)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <PiggyBank className="w-5 h-5 mx-auto mb-2 text-yellow-300" />
              <p className="text-white/70 text-xs">Éco. impôts</p>
              <p className="font-bold text-yellow-300">{formatCurrency(result.taxSavingsTotal)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Calendar className="w-5 h-5 mx-auto mb-2 text-emerald-300" />
              <p className="text-white/70 text-xs">Durée</p>
              <p className="font-bold">{result.yearsToRetirement} ans</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Économie annuelle</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(result.taxSavingsYear)}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Rendement fiscal immédiat de{" "}
              <span className="font-bold text-primary">
                {((result.taxSavingsYear / result.annualContribution) * 100).toFixed(0)}%
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rendement total</p>
                <p className="text-2xl font-bold text-emerald-600">
                  +{((result.projectedCapital / result.totalContributions - 1) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Grâce aux intérêts composés sur {result.yearsToRetirement} ans
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projection table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Année</th>
                  <th className="text-left py-3 px-2">Âge</th>
                  <th className="text-right py-3 px-2">Cotisations</th>
                  <th className="text-right py-3 px-2">Intérêts</th>
                  <th className="text-right py-3 px-2">Capital</th>
                  <th className="text-right py-3 px-2">Éco. impôts</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyProjection
                  .filter((_, i, arr) => i < 3 || i === arr.length - 1 || (i + 1) % 5 === 0)
                  .map((row, idx, filtered) => (
                    <tr key={row.year} className="border-b hover:bg-gray-50">
                      {idx > 0 && filtered[idx - 1].year !== row.year - 1 && (
                        <td colSpan={6} className="text-center py-1 text-muted-foreground text-xs">
                          ···
                        </td>
                      )}
                      <td className="py-3 px-2">{row.year}</td>
                      <td className="py-3 px-2">{row.age}</td>
                      <td className="py-3 px-2 text-right">{formatCurrency(row.cumulativeContributions)}</td>
                      <td className="py-3 px-2 text-right text-emerald-600">+{formatCurrency(row.cumulativeInterest)}</td>
                      <td className="py-3 px-2 text-right font-medium">{formatCurrency(row.capital)}</td>
                      <td className="py-3 px-2 text-right text-primary">{formatCurrency(row.cumulativeTaxSavings)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">À savoir</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Capital bloqué jusqu'à 5 ans avant la retraite</li>
                <li>• Imposé séparément au retrait (~5-7%)</li>
                <li>• Fractionnez sur plusieurs comptes pour optimiser</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={() => setShowResult(false)} size="lg">
          Nouvelle simulation
        </Button>
        <Link href="/demande">
          <Button size="lg" className="w-full sm:w-auto">
            Optimiser ma déclaration
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
