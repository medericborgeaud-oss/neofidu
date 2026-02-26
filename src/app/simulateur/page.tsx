"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pillar3aSimulator } from "@/components/Pillar3aSimulator";
import { ValeurLocativeSimulator } from "@/components/ValeurLocativeSimulator";
import {
  Calculator,
  ChevronRight,
  Info,
  TrendingDown,
  PiggyBank,
  Building2,
  Users,
  Baby,
  Home,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Tax rates by canton (simplified - effective combined rates for middle income)
const cantonTaxRates: Record<string, { name: string; rate: number; communeAvg: number }> = {
  vaud: { name: "Vaud", rate: 0.14, communeAvg: 0.065 },
  geneve: { name: "Genève", rate: 0.14, communeAvg: 0.045 },
  valais: { name: "Valais", rate: 0.10, communeAvg: 0.055 },
  fribourg: { name: "Fribourg", rate: 0.12, communeAvg: 0.055 },
  neuchatel: { name: "Neuchâtel", rate: 0.13, communeAvg: 0.06 },
  jura: { name: "Jura", rate: 0.135, communeAvg: 0.055 },
};

// Federal tax brackets (simplified)
const federalTaxBrackets = [
  { min: 0, max: 17800, rate: 0 },
  { min: 17800, max: 31600, rate: 0.0077 },
  { min: 31600, max: 41400, rate: 0.0088 },
  { min: 41400, max: 55200, rate: 0.0264 },
  { min: 55200, max: 72500, rate: 0.0297 },
  { min: 72500, max: 78100, rate: 0.0561 },
  { min: 78100, max: 103600, rate: 0.066 },
  { min: 103600, max: 134600, rate: 0.088 },
  { min: 134600, max: 176000, rate: 0.11 },
  { min: 176000, max: Infinity, rate: 0.115 },
];

// Deductions
const DEDUCTIONS = {
  professional: 0.03, // 3% of income, min 2000, max 4000
  professionalMin: 2000,
  professionalMax: 4000,
  insurance: 2600, // Health insurance deduction (single)
  insuranceMarried: 5200,
  insuranceChild: 1300,
  pillar3a: 7128, // Max 3a deduction for 2026
  childDeduction: 6600, // Per child federal
  marriedDeduction: 2600, // Federal married deduction
};

interface SimulationResult {
  grossIncome: number;
  deductions: {
    professional: number;
    insurance: number;
    pillar3a: number;
    children: number;
    married: number;
    total: number;
  };
  taxableIncome: number;
  taxes: {
    federal: number;
    cantonal: number;
    communal: number;
    total: number;
  };
  netIncome: number;
  effectiveRate: number;
}

export default function SimulateurPage() {
  const [activeTab, setActiveTab] = useState<"impots" | "3a" | "valeur-locative">("impots");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    grossIncome: "",
    canton: "vaud",
    maritalStatus: "single",
    children: "0",
    hasProperty: false,
    propertyValue: "",
    pillar3a: "",
    profession: "employee",
  });
  const [showResult, setShowResult] = useState(false);

  const calculateTaxes = useMemo((): SimulationResult | null => {
    const income = parseFloat(formData.grossIncome) || 0;
    if (income <= 0) return null;

    const canton = cantonTaxRates[formData.canton];
    const isMarried = formData.maritalStatus === "married";
    const childrenCount = parseInt(formData.children) || 0;
    const pillar3aContrib = Math.min(parseFloat(formData.pillar3a) || 0, DEDUCTIONS.pillar3a);

    // Calculate deductions
    const professionalDeduction = Math.min(
      Math.max(income * DEDUCTIONS.professional, DEDUCTIONS.professionalMin),
      DEDUCTIONS.professionalMax
    );

    const insuranceDeduction = isMarried
      ? DEDUCTIONS.insuranceMarried + (childrenCount * DEDUCTIONS.insuranceChild)
      : DEDUCTIONS.insurance + (childrenCount * DEDUCTIONS.insuranceChild);

    const childrenDeduction = childrenCount * DEDUCTIONS.childDeduction;
    const marriedDeduction = isMarried ? DEDUCTIONS.marriedDeduction : 0;

    const totalDeductions = professionalDeduction + insuranceDeduction + pillar3aContrib + childrenDeduction + marriedDeduction;

    // Taxable income
    let taxableIncome = Math.max(income - totalDeductions, 0);

    // For married couples, apply splitting
    if (isMarried) {
      taxableIncome = taxableIncome * 0.5;
    }

    // Calculate federal tax (progressive)
    let federalTax = 0;
    for (const bracket of federalTaxBrackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
        federalTax += taxableInBracket * bracket.rate;
      }
    }

    // Double for married (since we calculated on half)
    if (isMarried) {
      federalTax *= 2;
      taxableIncome *= 2; // Restore for display
    }

    // Calculate cantonal tax (simplified flat rate on taxable income)
    const cantonalTax = taxableIncome * canton.rate;

    // Calculate communal tax
    const communalTax = taxableIncome * canton.communeAvg;

    const totalTax = federalTax + cantonalTax + communalTax;
    const netIncome = income - totalTax;
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

    return {
      grossIncome: income,
      deductions: {
        professional: professionalDeduction,
        insurance: insuranceDeduction,
        pillar3a: pillar3aContrib,
        children: childrenDeduction,
        married: marriedDeduction,
        total: totalDeductions,
      },
      taxableIncome,
      taxes: {
        federal: federalTax,
        cantonal: cantonalTax,
        communal: communalTax,
        total: totalTax,
      },
      netIncome,
      effectiveRate,
    };
  }, [formData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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

      <main className="flex-1 bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <BreadcrumbLight
            items={[{ label: "Simulateurs fiscaux" }]}
            className="mb-8"
          />

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Simulateurs <span className="text-gradient">fiscaux</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Estimez vos impôts et optimisez votre prévoyance en quelques clics.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-lg border">
              <button
                onClick={() => { setActiveTab("impots"); setShowResult(false); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "impots"
                    ? "bg-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
                }`}
              >
                <Calculator className="w-5 h-5" />
                <span>Impôts</span>
              </button>
              <button
                onClick={() => { setActiveTab("3a"); setShowResult(false); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "3a"
                    ? "bg-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
                }`}
              >
                <PiggyBank className="w-5 h-5" />
                <span>3ème Pilier</span>
              </button>
              <button
                onClick={() => { setActiveTab("valeur-locative"); setShowResult(false); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "valeur-locative"
                    ? "bg-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Valeur Locative</span>
              </button>
            </div>
          </div>

          {/* 3A Simulator Tab */}
          {activeTab === "3a" && <Pillar3aSimulator />}

          {/* Valeur Locative Simulator Tab */}
          {activeTab === "valeur-locative" && <ValeurLocativeSimulator />}

          {/* Tax Simulator Tab */}
          {activeTab === "impots" && !showResult ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                    {step}
                  </span>
                  {step === 1 && "Vos revenus"}
                  {step === 2 && "Votre situation"}
                  {step === 3 && "Vos déductions"}
                </CardTitle>
                {/* Progress bar */}
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
                  {/* Step 1: Income */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="grossIncome" className="text-base font-medium">
                          Revenu brut annuel
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Salaire brut total avant déductions (13ème inclus)
                        </p>
                        <div className="relative">
                          <Input
                            id="grossIncome"
                            type="number"
                            placeholder="85000"
                            value={formData.grossIncome}
                            onChange={(e) =>
                              setFormData({ ...formData, grossIncome: e.target.value })
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
                          Canton de résidence
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Les taux varient selon le canton
                        </p>
                        <select
                          id="canton"
                          value={formData.canton}
                          onChange={(e) =>
                            setFormData({ ...formData, canton: e.target.value })
                          }
                          className="w-full h-12 px-4 rounded-md border border-input bg-background text-base"
                        >
                          {Object.entries(cantonTaxRates).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Statut professionnel</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, profession: "employee" })
                            }
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.profession === "employee"
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Briefcase className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Salarié</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, profession: "independent" })
                            }
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.profession === "independent"
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Indépendant</span>
                          </button>
                        </div>
                      </div>

                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.grossIncome}
                        className="w-full h-12"
                      >
                        Continuer
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Personal situation */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium">État civil</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, maritalStatus: "single" })
                            }
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.maritalStatus === "single"
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Célibataire</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, maritalStatus: "married" })
                            }
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.maritalStatus === "married"
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Marié(e)</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="children" className="text-base font-medium">
                          Nombre d'enfants à charge
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Enfants de moins de 18 ans ou en formation
                        </p>
                        <select
                          id="children"
                          value={formData.children}
                          onChange={(e) =>
                            setFormData({ ...formData, children: e.target.value })
                          }
                          className="w-full h-12 px-4 rounded-md border border-input bg-background text-base"
                        >
                          {[0, 1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n === 0 ? "Aucun" : n}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Êtes-vous propriétaire ?</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, hasProperty: false })
                            }
                            className={`p-4 rounded-lg border-2 transition-all ${
                              !formData.hasProperty
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="text-sm font-medium">Locataire</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, hasProperty: true })
                            }
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.hasProperty
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Home className="w-5 h-5 mx-auto mb-1 text-primary" />
                            <span className="text-sm font-medium">Propriétaire</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1 h-12"
                        >
                          Retour
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 h-12"
                        >
                          Continuer
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Deductions */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="pillar3a" className="text-base font-medium">
                          Versement 3ème pilier (3a)
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Maximum CHF 7'128 pour les salariés en 2026
                        </p>
                        <div className="relative">
                          <Input
                            id="pillar3a"
                            type="number"
                            placeholder="7128"
                            max={7128}
                            value={formData.pillar3a}
                            onChange={(e) =>
                              setFormData({ ...formData, pillar3a: e.target.value })
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
                            <p className="font-medium mb-1">Déductions automatiques</p>
                            <ul className="space-y-1 text-blue-700">
                              <li>• Frais professionnels : 3% du revenu (min. 2'000, max. 4'000)</li>
                              <li>• Assurance maladie : forfait selon situation</li>
                              <li>• Déduction enfants : CHF 6'600 par enfant</li>
                              {formData.maritalStatus === "married" && (
                                <li>• Splitting marié : division du revenu</li>
                              )}
                            </ul>
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
                          Retour
                        </Button>
                        <Button type="submit" className="flex-1 h-12">
                          Calculer mes impôts
                          <Calculator className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          ) : activeTab === "impots" && (
            /* Results */
            calculateTaxes && (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Summary Card */}
                <Card className="bg-gradient-to-br from-primary to-emerald-600 text-white">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-white/80 text-sm mb-1">Revenu brut</p>
                        <p className="text-3xl font-bold">
                          {formatCurrency(calculateTaxes.grossIncome)}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm mb-1">Impôts estimés</p>
                        <p className="text-3xl font-bold text-yellow-300">
                          {formatCurrency(calculateTaxes.taxes.total)}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm mb-1">Revenu net</p>
                        <p className="text-3xl font-bold">
                          {formatCurrency(calculateTaxes.netIncome)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/20 text-center">
                      <p className="text-white/80">
                        Taux d'imposition effectif :{" "}
                        <span className="text-white font-bold text-xl">
                          {calculateTaxes.effectiveRate.toFixed(1)}%
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Deductions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingDown className="w-5 h-5 text-primary" />
                        Déductions appliquées
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frais professionnels</span>
                        <span className="font-medium">
                          {formatCurrency(calculateTaxes.deductions.professional)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Assurance maladie</span>
                        <span className="font-medium">
                          {formatCurrency(calculateTaxes.deductions.insurance)}
                        </span>
                      </div>
                      {calculateTaxes.deductions.pillar3a > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pilier 3a</span>
                          <span className="font-medium">
                            {formatCurrency(calculateTaxes.deductions.pillar3a)}
                          </span>
                        </div>
                      )}
                      {calculateTaxes.deductions.children > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Déduction enfants</span>
                          <span className="font-medium">
                            {formatCurrency(calculateTaxes.deductions.children)}
                          </span>
                        </div>
                      )}
                      {calculateTaxes.deductions.married > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Déduction marié</span>
                          <span className="font-medium">
                            {formatCurrency(calculateTaxes.deductions.married)}
                          </span>
                        </div>
                      )}
                      <div className="pt-3 border-t flex justify-between font-bold">
                        <span>Total déductions</span>
                        <span className="text-primary">
                          {formatCurrency(calculateTaxes.deductions.total)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Revenu imposable</span>
                        <span>{formatCurrency(calculateTaxes.taxableIncome)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <PiggyBank className="w-5 h-5 text-primary" />
                        Détail des impôts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impôt fédéral direct</span>
                        <span className="font-medium">
                          {formatCurrency(calculateTaxes.taxes.federal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Impôt cantonal ({cantonTaxRates[formData.canton].name})
                        </span>
                        <span className="font-medium">
                          {formatCurrency(calculateTaxes.taxes.cantonal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impôt communal (moy.)</span>
                        <span className="font-medium">
                          {formatCurrency(calculateTaxes.taxes.communal)}
                        </span>
                      </div>
                      <div className="pt-3 border-t flex justify-between font-bold text-lg">
                        <span>Total impôts</span>
                        <span className="text-red-600">
                          {formatCurrency(calculateTaxes.taxes.total)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Disclaimer */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-medium mb-1">Estimation indicative</p>
                        <p>
                          Ce calcul est une estimation simplifiée basée sur des taux moyens.
                          Le montant réel peut varier selon votre commune, votre fortune,
                          et d'autres facteurs. Pour une déclaration optimisée,
                          confiez-nous votre dossier.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={resetSimulator} size="lg">
                    Nouvelle simulation
                  </Button>
                  <Link href="/demande">
                    <Button size="lg" className="w-full sm:w-auto">
                      Confier ma déclaration
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
