"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  ChevronRight,
  Info,
  TrendingUp,
  TrendingDown,
  Home,
  ArrowRight,
  Wallet,
  Scale,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

// Canton tax rates (approximate)
const cantonTaxRates: Record<string, { name: string; rate: number }> = {
  vaud: { name: "Vaud", rate: 0.32 },
  geneve: { name: "Genève", rate: 0.33 },
  valais: { name: "Valais", rate: 0.28 },
  fribourg: { name: "Fribourg", rate: 0.29 },
  neuchatel: { name: "Neuchâtel", rate: 0.30 },
  jura: { name: "Jura", rate: 0.29 },
};

interface SimulationResult {
  valeurLocative: number;
  interetsHypothecaires: number;
  fraisEntretien: number;
  // Current system
  currentRevenuImposable: number;
  currentImpot: number;
  // After reform
  newRevenuImposable: number;
  newImpot: number;
  // Difference
  difference: number;
  isWinner: boolean;
}

export function ValeurLocativeSimulator() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    valeurLocative: "",
    interetsHypothecaires: "",
    fraisEntretien: "",
    revenuImposable: "",
    canton: "vaud",
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

  const calculateImpact = useMemo((): SimulationResult | null => {
    const valeurLocative = parseFloat(formData.valeurLocative) || 0;
    const interetsHypothecaires = parseFloat(formData.interetsHypothecaires) || 0;
    const fraisEntretien = parseFloat(formData.fraisEntretien) || 0;
    const revenuImposable = parseFloat(formData.revenuImposable) || 0;

    if (revenuImposable <= 0) return null;

    const cantonRate = cantonTaxRates[formData.canton].rate;

    // Current system: +valeur locative, -intérêts, -frais entretien
    const currentImpactOnIncome = valeurLocative - interetsHypothecaires - fraisEntretien;
    const currentRevenuImposable = revenuImposable + currentImpactOnIncome;
    const currentImpot = Math.max(0, currentRevenuImposable * cantonRate);

    // After reform: no valeur locative, no deductions (except partial renovation energétique - estimated at 30%)
    const remainingDeduction = fraisEntretien * 0.3; // Only energy-related renovations
    const newRevenuImposable = revenuImposable - remainingDeduction;
    const newImpot = Math.max(0, newRevenuImposable * cantonRate);

    const difference = newImpot - currentImpot;
    const isWinner = difference < 0;

    return {
      valeurLocative,
      interetsHypothecaires,
      fraisEntretien,
      currentRevenuImposable,
      currentImpot,
      newRevenuImposable,
      newImpot,
      difference,
      isWinner,
    };
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const resetSimulator = () => {
    setShowResult(false);
    setStep(1);
  };

  if (!showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">
              {step}
            </span>
            {step === 1 && t("simulators.valeurLocative.step1Title")}
            {step === 2 && t("simulators.valeurLocative.step2Title")}
            {step === 3 && t("simulators.valeurLocative.step3Title")}
          </CardTitle>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-amber-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="valeurLocative" className="text-base font-medium">
                    {t("simulators.valeurLocative.annualRentalValue")}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("simulators.valeurLocative.annualRentalValueDesc")}
                  </p>
                  <div className="relative">
                    <Input
                      id="valeurLocative"
                      type="number"
                      placeholder="12000"
                      value={formData.valeurLocative}
                      onChange={(e) =>
                        setFormData({ ...formData, valeurLocative: e.target.value })
                      }
                      className="h-12 text-lg pl-12"
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      CHF
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="canton" className="text-base font-medium">
                    {t("simulators.common.cantonOfResidence")}
                  </Label>
                  <select
                    id="canton"
                    value={formData.canton}
                    onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-base mt-2"
                  >
                    {Object.entries(cantonTaxRates).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">{t("simulators.valeurLocative.whereToFind")}</p>
                      <p className="text-blue-700">
                        {t("simulators.valeurLocative.whereToFindDesc")}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.valeurLocative}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600"
                >
                  {t("simulators.common.continue")}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="interetsHypothecaires" className="text-base font-medium">
                    {t("simulators.valeurLocative.mortgageInterest")}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("simulators.valeurLocative.mortgageInterestDesc")}
                  </p>
                  <div className="relative">
                    <Input
                      id="interetsHypothecaires"
                      type="number"
                      placeholder="8000"
                      value={formData.interetsHypothecaires}
                      onChange={(e) =>
                        setFormData({ ...formData, interetsHypothecaires: e.target.value })
                      }
                      className="h-12 text-lg pl-12"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      CHF
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="fraisEntretien" className="text-base font-medium">
                    {t("simulators.valeurLocative.maintenanceCosts")}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("simulators.valeurLocative.maintenanceCostsDesc")}
                  </p>
                  <div className="relative">
                    <Input
                      id="fraisEntretien"
                      type="number"
                      placeholder="3000"
                      value={formData.fraisEntretien}
                      onChange={(e) =>
                        setFormData({ ...formData, fraisEntretien: e.target.value })
                      }
                      className="h-12 text-lg pl-12"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      CHF
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12"
                  >
                    {t("simulators.common.back")}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 h-12 bg-amber-500 hover:bg-amber-600"
                  >
                    {t("simulators.common.continue")}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="revenuImposable" className="text-base font-medium">
                    {t("simulators.valeurLocative.taxableIncome")}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("simulators.valeurLocative.taxableIncomeDesc")}
                  </p>
                  <div className="relative">
                    <Input
                      id="revenuImposable"
                      type="number"
                      placeholder="80000"
                      value={formData.revenuImposable}
                      onChange={(e) =>
                        setFormData({ ...formData, revenuImposable: e.target.value })
                      }
                      className="h-12 text-lg pl-12"
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      CHF
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">{t("simulators.valeurLocative.calculationAssumptions")}</p>
                      <p className="text-amber-700">
                        {t("simulators.valeurLocative.calculationAssumptionsDesc")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 h-12"
                  >
                    {t("simulators.common.back")}
                  </Button>
                  <Button type="submit" className="flex-1 h-12 bg-amber-500 hover:bg-amber-600">
                    {t("simulators.valeurLocative.calculateImpact")}
                    <Calculator className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    );
  }

  if (!calculateImpact) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main result */}
      <Card
        className={`${
          calculateImpact.isWinner
            ? "bg-gradient-to-br from-green-600 to-emerald-700"
            : "bg-gradient-to-br from-red-600 to-rose-700"
        } text-white`}
      >
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {calculateImpact.isWinner ? (
              <TrendingDown className="w-12 h-12 text-green-300" />
            ) : (
              <TrendingUp className="w-12 h-12 text-red-300" />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {calculateImpact.isWinner
              ? t("simulators.valeurLocative.youWouldBeWinner")
              : t("simulators.valeurLocative.youWouldBeLoser")}
          </h2>
          <p className="text-4xl font-bold mb-2">
            {calculateImpact.isWinner ? "-" : "+"}
            {formatCurrency(Math.abs(calculateImpact.difference))}
          </p>
          <p className="text-white/80">
            {calculateImpact.isWinner
              ? t("simulators.valeurLocative.taxSavingsPerYear")
              : t("simulators.valeurLocative.moreTaxesPerYear")}
          </p>
        </CardContent>
      </Card>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="w-5 h-5 text-amber-600" />
              {t("simulators.valeurLocative.currentSystem")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-red-600">
              <span>{t("simulators.valeurLocative.rentalValue")}</span>
              <span className="font-medium">
                +{formatCurrency(calculateImpact.valeurLocative)}
              </span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>{t("simulators.valeurLocative.mortgageInterestDeduction")}</span>
              <span className="font-medium">
                -{formatCurrency(calculateImpact.interetsHypothecaires)}
              </span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>{t("simulators.valeurLocative.maintenanceDeduction")}</span>
              <span className="font-medium">
                -{formatCurrency(calculateImpact.fraisEntretien)}
              </span>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("simulators.valeurLocative.taxableIncomeLabel")}</span>
                <span className="font-medium">
                  {formatCurrency(calculateImpact.currentRevenuImposable)}
                </span>
              </div>
            </div>
            <div className="pt-3 border-t flex justify-between font-bold text-lg">
              <span>{t("simulators.valeurLocative.taxToPay")}</span>
              <span className="text-red-600">{formatCurrency(calculateImpact.currentImpot)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="w-5 h-5 text-amber-600" />
              {t("simulators.valeurLocative.afterReform")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-gray-400">
              <span className="line-through">{t("simulators.valeurLocative.rentalValue").replace("+ ", "")}</span>
              <span className="font-medium">CHF 0</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span className="line-through">{t("simulators.valeurLocative.mortgageInterestDeduction").replace("- ", "")}</span>
              <span className="font-medium">CHF 0</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>{t("simulators.valeurLocative.energyRenovation")}</span>
              <span className="font-medium">
                -{formatCurrency(calculateImpact.fraisEntretien * 0.3)}
              </span>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("simulators.valeurLocative.taxableIncomeLabel")}</span>
                <span className="font-medium">
                  {formatCurrency(calculateImpact.newRevenuImposable)}
                </span>
              </div>
            </div>
            <div className="pt-3 border-t flex justify-between font-bold text-lg">
              <span>{t("simulators.valeurLocative.taxToPay")}</span>
              <span className="text-red-600">{formatCurrency(calculateImpact.newImpot)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Wallet className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                {calculateImpact.isWinner ? t("simulators.valeurLocative.whyWinner") : t("simulators.valeurLocative.whyLoser")}
              </h3>
              <p className="text-sm text-blue-700">
                {calculateImpact.isWinner
                  ? t("simulators.valeurLocative.winnerExplanation")
                  : t("simulators.valeurLocative.loserExplanation")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={resetSimulator} size="lg">
          {t("simulators.common.newSimulation")}
        </Button>
        <Link href="/demande">
          <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600">
            {t("simulators.common.trustDeclaration")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
