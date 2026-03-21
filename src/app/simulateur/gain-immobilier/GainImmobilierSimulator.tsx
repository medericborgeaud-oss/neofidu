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
  TrendingDown,
  Building2,
  ArrowRight,
  Home,
  Clock,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SimulatorInternalLinks } from "@/components/SimulatorInternalLinks";
import { useLanguage } from "@/lib/language-context";
import { Breadcrumb } from "@/components/Breadcrumb";

// IGI rates by canton and holding period (in years)
// Rates decrease with longer holding periods
const cantonIGIRates: Record<
  string,
  { name: string; baseRate: number; reductions: { years: number; reduction: number }[] }
> = {
  vaud: {
    name: "Vaud",
    baseRate: 0.30,
    reductions: [
      { years: 2, reduction: 0.10 },
      { years: 5, reduction: 0.20 },
      { years: 10, reduction: 0.30 },
      { years: 15, reduction: 0.40 },
      { years: 20, reduction: 0.50 },
      { years: 25, reduction: 0.60 },
    ],
  },
  geneve: {
    name: "Genève",
    baseRate: 0.50,
    reductions: [
      { years: 2, reduction: 0.04 },
      { years: 4, reduction: 0.08 },
      { years: 6, reduction: 0.12 },
      { years: 8, reduction: 0.16 },
      { years: 10, reduction: 0.20 },
      { years: 25, reduction: 0.50 },
    ],
  },
  valais: {
    name: "Valais",
    baseRate: 0.25,
    reductions: [
      { years: 5, reduction: 0.10 },
      { years: 10, reduction: 0.20 },
      { years: 15, reduction: 0.30 },
      { years: 20, reduction: 0.40 },
      { years: 25, reduction: 0.50 },
    ],
  },
  fribourg: {
    name: "Fribourg",
    baseRate: 0.22,
    reductions: [
      { years: 5, reduction: 0.05 },
      { years: 10, reduction: 0.15 },
      { years: 15, reduction: 0.25 },
      { years: 20, reduction: 0.35 },
      { years: 25, reduction: 0.45 },
    ],
  },
  neuchatel: {
    name: "Neuchâtel",
    baseRate: 0.28,
    reductions: [
      { years: 5, reduction: 0.10 },
      { years: 10, reduction: 0.20 },
      { years: 15, reduction: 0.30 },
      { years: 20, reduction: 0.40 },
      { years: 25, reduction: 0.50 },
    ],
  },
  jura: {
    name: "Jura",
    baseRate: 0.25,
    reductions: [
      { years: 5, reduction: 0.10 },
      { years: 10, reduction: 0.20 },
      { years: 15, reduction: 0.30 },
      { years: 20, reduction: 0.40 },
      { years: 25, reduction: 0.50 },
    ],
  },
};

interface SimulationResult {
  salePrice: number;
  purchasePrice: number;
  improvements: number;
  sellingCosts: number;
  grossGain: number;
  netGain: number;
  holdingYears: number;
  baseRate: number;
  reduction: number;
  effectiveRate: number;
  taxAmount: number;
  netProfit: number;
}

export function GainImmobilierSimulator() {
  const { t, isEnglish } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    salePrice: "",
    purchasePrice: "",
    improvements: "",
    sellingCosts: "",
    canton: "vaud",
    holdingYears: "",
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

  const calculateTax = useMemo((): SimulationResult | null => {
    const salePrice = parseFloat(formData.salePrice) || 0;
    const purchasePrice = parseFloat(formData.purchasePrice) || 0;
    const improvements = parseFloat(formData.improvements) || 0;
    const sellingCosts = parseFloat(formData.sellingCosts) || 0;
    const holdingYears = parseInt(formData.holdingYears) || 0;

    if (salePrice <= 0 || purchasePrice <= 0) return null;

    const cantonData = cantonIGIRates[formData.canton];
    const grossGain = salePrice - purchasePrice;
    const netGain = grossGain - improvements - sellingCosts;

    if (netGain <= 0) {
      return {
        salePrice,
        purchasePrice,
        improvements,
        sellingCosts,
        grossGain,
        netGain,
        holdingYears,
        baseRate: cantonData.baseRate,
        reduction: 0,
        effectiveRate: 0,
        taxAmount: 0,
        netProfit: netGain,
      };
    }

    // Find the applicable reduction based on holding years
    let reduction = 0;
    for (const r of cantonData.reductions) {
      if (holdingYears >= r.years) {
        reduction = r.reduction;
      }
    }

    // Exemption after 25+ years in some cantons
    const effectiveRate = Math.max(0, cantonData.baseRate - reduction);
    const taxAmount = netGain * effectiveRate;
    const netProfit = netGain - taxAmount;

    return {
      salePrice,
      purchasePrice,
      improvements,
      sellingCosts,
      grossGain,
      netGain,
      holdingYears,
      baseRate: cantonData.baseRate,
      reduction,
      effectiveRate,
      taxAmount,
      netProfit,
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[{ label: "Simulateurs", href: "/simulateur" }, { label: "Gain Immobilier" }]} className="mb-6" />
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">
                  {t("simulators.gainImmobilier.badge")}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {t("simulators.gainImmobilier.title")}
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t("simulators.gainImmobilier.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Key Points */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("simulators.gainImmobilier.keyPoint1Title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("simulators.gainImmobilier.keyPoint1Desc")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("simulators.gainImmobilier.keyPoint2Title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("simulators.gainImmobilier.keyPoint2Desc")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("simulators.gainImmobilier.keyPoint3Title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("simulators.gainImmobilier.keyPoint3Desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simulator */}
        <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
          <div className="container mx-auto px-4">
            {!showResult ? (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                      {step}
                    </span>
                    {step === 1 && t("simulators.gainImmobilier.step1Title")}
                    {step === 2 && t("simulators.gainImmobilier.step2Title")}
                    {step === 3 && t("simulators.gainImmobilier.step3Title")}
                  </CardTitle>
                  <div className="flex gap-2 mt-4">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-2 flex-1 rounded-full transition-colors ${
                          s <= step ? "bg-primary" : "bg-gray-200"
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
                          <Label htmlFor="purchasePrice" className="text-base font-medium">
                            {t("simulators.gainImmobilier.purchasePrice")}
                          </Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("simulators.gainImmobilier.purchasePriceDesc")}
                          </p>
                          <div className="relative">
                            <Input
                              id="purchasePrice"
                              type="number"
                              placeholder="500000"
                              value={formData.purchasePrice}
                              onChange={(e) =>
                                setFormData({ ...formData, purchasePrice: e.target.value })
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
                          <Label htmlFor="salePrice" className="text-base font-medium">
                            {t("simulators.gainImmobilier.salePrice")}
                          </Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("simulators.gainImmobilier.salePriceDesc")}
                          </p>
                          <div className="relative">
                            <Input
                              id="salePrice"
                              type="number"
                              placeholder="750000"
                              value={formData.salePrice}
                              onChange={(e) =>
                                setFormData({ ...formData, salePrice: e.target.value })
                              }
                              className="h-12 text-lg pl-12"
                              required
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                              CHF
                            </span>
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={!formData.purchasePrice || !formData.salePrice}
                          className="w-full h-12"
                        >
                          {t("simulators.common.continue")}
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="improvements" className="text-base font-medium">
                            {t("simulators.gainImmobilier.improvements")}
                          </Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("simulators.gainImmobilier.improvementsDesc")}
                          </p>
                          <div className="relative">
                            <Input
                              id="improvements"
                              type="number"
                              placeholder="50000"
                              value={formData.improvements}
                              onChange={(e) =>
                                setFormData({ ...formData, improvements: e.target.value })
                              }
                              className="h-12 text-lg pl-12"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                              CHF
                            </span>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="sellingCosts" className="text-base font-medium">
                            {t("simulators.gainImmobilier.sellingCosts")}
                          </Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("simulators.gainImmobilier.sellingCostsDesc")}
                          </p>
                          <div className="relative">
                            <Input
                              id="sellingCosts"
                              type="number"
                              placeholder="20000"
                              value={formData.sellingCosts}
                              onChange={(e) =>
                                setFormData({ ...formData, sellingCosts: e.target.value })
                              }
                              className="h-12 text-lg pl-12"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                              CHF
                            </span>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex gap-3">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">{t("simulators.gainImmobilier.deductibleCosts")}</p>
                              <ul className="space-y-1 text-blue-700">
                                <li>• {t("simulators.gainImmobilier.deductibleCost1")}</li>
                                <li>• {t("simulators.gainImmobilier.deductibleCost2")}</li>
                                <li>• {t("simulators.gainImmobilier.deductibleCost3")}</li>
                              </ul>
                            </div>
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
                          <Button type="button" onClick={() => setStep(3)} className="flex-1 h-12">
                            {t("simulators.common.continue")}
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="canton" className="text-base font-medium">
                            {t("simulators.gainImmobilier.cantonOfProperty")}
                          </Label>
                          <select
                            id="canton"
                            value={formData.canton}
                            onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                            className="w-full h-12 px-4 rounded-md border border-input bg-background text-base mt-2"
                          >
                            {Object.entries(cantonIGIRates).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="holdingYears" className="text-base font-medium">
                            {t("simulators.gainImmobilier.holdingPeriod")}
                          </Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("simulators.gainImmobilier.holdingPeriodDesc")}
                          </p>
                          <div className="relative">
                            <Input
                              id="holdingYears"
                              type="number"
                              placeholder="10"
                              min="0"
                              max="50"
                              value={formData.holdingYears}
                              onChange={(e) =>
                                setFormData({ ...formData, holdingYears: e.target.value })
                              }
                              className="h-12 text-lg"
                              required
                            />
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex gap-3">
                            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-amber-800">
                              <p className="font-medium mb-1">{t("simulators.gainImmobilier.holdingReduction")}</p>
                              <p className="text-amber-700">
                                {t("simulators.gainImmobilier.holdingReductionDesc")}
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
                          <Button type="submit" className="flex-1 h-12">
                            {t("simulators.gainImmobilier.calculateIGI")}
                            <Calculator className="w-5 h-5 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            ) : calculateTax ? (
              <div className="max-w-4xl mx-auto space-y-6">
                <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-white/80 text-sm mb-1">{t("simulators.gainImmobilier.netTaxableGain")}</p>
                        <p className="text-3xl font-bold">{formatCurrency(calculateTax.netGain)}</p>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm mb-1">{t("simulators.gainImmobilier.realEstateGainTax")}</p>
                        <p className="text-3xl font-bold text-yellow-300">
                          {formatCurrency(calculateTax.taxAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm mb-1">{t("simulators.gainImmobilier.netProfit")}</p>
                        <p className="text-3xl font-bold">{formatCurrency(calculateTax.netProfit)}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/20 text-center">
                      <p className="text-white/80">
                        {t("simulators.gainImmobilier.effectiveRate")} :{" "}
                        <span className="text-white font-bold text-xl">
                          {(calculateTax.effectiveRate * 100).toFixed(1)}%
                        </span>
                        <span className="text-white/60 ml-2">
                          ({t("simulators.gainImmobilier.baseRate")} {(calculateTax.baseRate * 100).toFixed(0)}% - {t("simulators.gainImmobilier.reduction")}{" "}
                          {(calculateTax.reduction * 100).toFixed(0)}%)
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Building2 className="w-5 h-5 text-primary" />
                        {t("simulators.gainImmobilier.gainCalculation")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("simulators.gainImmobilier.salePrice")}</span>
                        <span className="font-medium">{formatCurrency(calculateTax.salePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("simulators.gainImmobilier.purchasePrice")}</span>
                        <span className="font-medium">
                          - {formatCurrency(calculateTax.purchasePrice)}
                        </span>
                      </div>
                      <div className="flex justify-between text-primary">
                        <span>{t("simulators.gainImmobilier.grossGain")}</span>
                        <span className="font-medium">{formatCurrency(calculateTax.grossGain)}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("simulators.gainImmobilier.improvementsLabel")}</span>
                          <span className="font-medium">
                            - {formatCurrency(calculateTax.improvements)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("simulators.gainImmobilier.sellingCostsLabel")}</span>
                          <span className="font-medium">
                            - {formatCurrency(calculateTax.sellingCosts)}
                          </span>
                        </div>
                      </div>
                      <div className="pt-3 border-t flex justify-between font-bold text-lg">
                        <span>{t("simulators.gainImmobilier.netTaxableGainLabel")}</span>
                        <span className="text-primary">{formatCurrency(calculateTax.netGain)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingDown className="w-5 h-5 text-primary" />
                        {t("simulators.gainImmobilier.taxDetails")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("simulators.common.canton")}</span>
                        <span className="font-medium">{cantonIGIRates[formData.canton].name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("simulators.gainImmobilier.holdingPeriod")}</span>
                        <span className="font-medium">{calculateTax.holdingYears} {t("simulators.common.years")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("simulators.gainImmobilier.baseRateLabel")}</span>
                        <span className="font-medium">
                          {(calculateTax.baseRate * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>{t("simulators.gainImmobilier.holdingReductionLabel")}</span>
                        <span className="font-medium">
                          -{(calculateTax.reduction * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("simulators.gainImmobilier.effectiveRateLabel")}</span>
                        <span className="font-medium">
                          {(calculateTax.effectiveRate * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="pt-3 border-t flex justify-between font-bold text-lg">
                        <span>{t("simulators.gainImmobilier.taxToPay")}</span>
                        <span className="text-red-600">{formatCurrency(calculateTax.taxAmount)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={resetSimulator} size="lg">
                    {t("simulators.common.newSimulation")}
                  </Button>
                  <Link href="/demande">
                    <Button size="lg" className="w-full sm:w-auto">
                      {t("simulators.common.trustDeclaration")}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              {t("simulators.gainImmobilier.faqTitle")}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t("simulators.gainImmobilier.faq1Question")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("simulators.gainImmobilier.faq1Answer")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    {t("simulators.gainImmobilier.faq2Question")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("simulators.gainImmobilier.faq2Answer")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t("simulators.gainImmobilier.faq3Question")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("simulators.gainImmobilier.faq3Answer")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <SimulatorInternalLinks currentPage="gain-immobilier" />
      </main>

      <Footer />
    </div>
  );
}
