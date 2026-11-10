"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  ChevronRight,
  Info,
  TrendingDown,
  PiggyBank,
  Building2,
  Users,
  Home,
  Briefcase,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { createClient } from "@supabase/supabase-js";
import { isCommuneFusionnee } from "@/lib/communes-fusionnees";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ROMANDIE_CODES = ["VD", "GE", "VS", "FR", "NE", "JU"];

const cantonTaxRates: Record<
  string,
  { name: string; rate: number; communeAvg: number; region: string; code: string }
> = {
  // Suisse romande
  vaud: { name: "Vaud", rate: 0.14, communeAvg: 0.065, region: "Romandie", code: "VD" },
  geneve: { name: "Genève", rate: 0.14, communeAvg: 0.045, region: "Romandie", code: "GE" },
  valais: { name: "Valais", rate: 0.10, communeAvg: 0.055, region: "Romandie", code: "VS" },
  fribourg: { name: "Fribourg", rate: 0.12, communeAvg: 0.055, region: "Romandie", code: "FR" },
  neuchatel: { name: "Neuchâtel", rate: 0.13, communeAvg: 0.06, region: "Romandie", code: "NE" },
  jura: { name: "Jura", rate: 0.135, communeAvg: 0.055, region: "Romandie", code: "JU" },
  // Suisse alémanique
  zurich: { name: "Zurich", rate: 0.115, communeAvg: 0.055, region: "Alémanique", code: "ZH" },
  bern: { name: "Berne", rate: 0.132, communeAvg: 0.065, region: "Alémanique", code: "BE" },
  luzern: { name: "Lucerne", rate: 0.12, communeAvg: 0.045, region: "Alémanique", code: "LU" },
  uri: { name: "Uri", rate: 0.08, communeAvg: 0.04, region: "Alémanique", code: "UR" },
  schwyz: { name: "Schwyz", rate: 0.065, communeAvg: 0.035, region: "Alémanique", code: "SZ" },
  obwalden: { name: "Obwald", rate: 0.079, communeAvg: 0.038, region: "Alémanique", code: "OW" },
  nidwalden: { name: "Nidwald", rate: 0.065, communeAvg: 0.032, region: "Alémanique", code: "NW" },
  glarus: { name: "Glaris", rate: 0.105, communeAvg: 0.048, region: "Alémanique", code: "GL" },
  zug: { name: "Zoug", rate: 0.055, communeAvg: 0.028, region: "Alémanique", code: "ZG" },
  solothurn: { name: "Soleure", rate: 0.128, communeAvg: 0.058, region: "Alémanique", code: "SO" },
  baselstadt: { name: "Bâle-Ville", rate: 0.14, communeAvg: 0.0, region: "Alémanique", code: "BS" },
  baselland: { name: "Bâle-Campagne", rate: 0.13, communeAvg: 0.055, region: "Alémanique", code: "BL" },
  schaffhausen: { name: "Schaffhouse", rate: 0.10, communeAvg: 0.048, region: "Alémanique", code: "SH" },
  appenzellAr: { name: "Appenzell RE", rate: 0.095, communeAvg: 0.045, region: "Alémanique", code: "AR" },
  appenzellAi: { name: "Appenzell RI", rate: 0.085, communeAvg: 0.038, region: "Alémanique", code: "AI" },
  stgallen: { name: "Saint-Gall", rate: 0.12, communeAvg: 0.058, region: "Alémanique", code: "SG" },
  graubunden: { name: "Grisons", rate: 0.10, communeAvg: 0.052, region: "Alémanique", code: "GR" },
  aargau: { name: "Argovie", rate: 0.11, communeAvg: 0.055, region: "Alémanique", code: "AG" },
  thurgau: { name: "Thurgovie", rate: 0.095, communeAvg: 0.048, region: "Alémanique", code: "TG" },
  // Tessin
  ticino: { name: "Tessin", rate: 0.115, communeAvg: 0.06, region: "Tessin", code: "TI" },
};

// Le calcul est fait cote serveur avec le calculateur officiel de l'AFC
// (voir src/app/api/impots/simulation/route.ts).
interface SimulationResult {
  year: number;
  location: { name: string; isCommune: boolean };
  grossIncome: number;
  socialContributions: number;
  netIncome: number;
  deductions: { pillar3a: number; totalCanton: number };
  taxableIncome: { federal: number; canton: number };
  taxes: { federal: number; cantonal: number; communal: number; total: number };
  disposableIncome: number;
  effectiveRate: number;
  marginalRate: number | null;
}

interface CommuneOption {
  slug: string;
  nom: string;
  taux_commune: number | null;
}

export function TaxSimulatorClient() {
  const { t, isEnglish } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    grossIncome: "",
    canton: "vaud",
    commune: "",
    maritalStatus: "single",
    children: "0",
    hasProperty: false,
    pillar3a: "",
    profession: "employee",
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [communes, setCommunes] = useState<CommuneOption[]>([]);
  const [loadingCommunes, setLoadingCommunes] = useState(false);

  const selectedCantonCode = cantonTaxRates[formData.canton]?.code || "";
  const isRomandie = ROMANDIE_CODES.includes(selectedCantonCode);

  // Pre-selection depuis une fiche commune (/simulateur/impots?commune=leysin-vd)
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("commune");
    if (!slug || isCommuneFusionnee(slug)) return;
    const code = slug.split("-").pop()?.toUpperCase();
    const key = Object.keys(cantonTaxRates).find((k) => cantonTaxRates[k].code === code);
    if (key) setFormData((prev) => ({ ...prev, canton: key, commune: slug }));
  }, []);

  // Fetch communes when canton changes
  useEffect(() => {
    if (!isRomandie) {
      setCommunes([]);
      setFormData((prev) => ({ ...prev, commune: "" }));
      return;
    }

    setLoadingCommunes(true);
    supabase
      .from("communes")
      .select("slug, nom, taux_commune")
      .eq("canton", selectedCantonCode)
      .order("nom")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching communes:", error);
          setCommunes([]);
        } else {
          setCommunes((data || []).filter((c) => !isCommuneFusionnee(c.slug)));
        }
        setLoadingCommunes(false);
      });
  }, [formData.canton, isRomandie, selectedCantonCode]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/impots/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossIncome: parseFloat(formData.grossIncome) || 0,
          canton: selectedCantonCode,
          commune: isRomandie ? formData.commune : "",
          maritalStatus: formData.maritalStatus,
          children: parseInt(formData.children) || 0,
          pillar3a: parseFloat(formData.pillar3a) || 0,
          profession: formData.profession,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setResult(await res.json());
      setShowResult(true);
    } catch {
      setError(
        isEnglish
          ? "The calculation service is temporarily unavailable. Please try again in a moment."
          : "Le service de calcul est momentanément indisponible. Merci de réessayer dans un instant."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetSimulator = () => {
    setShowResult(false);
    setResult(null);
    setStep(1);
  };

  if (!showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
              {step}
            </span>
            {step === 1 && t("simulators.taxSimulator.step1Title")}
            {step === 2 && t("simulators.taxSimulator.step2Title")}
            {step === 3 && t("simulators.taxSimulator.step3Title")}
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
                  <Label htmlFor="grossIncome" className="text-base font-medium">
                    {t("simulators.taxSimulator.grossAnnualIncome")}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("simulators.taxSimulator.grossIncomeDesc")}
                  </p>
                  <div className="relative">
                    <Input
                      id="grossIncome"
                      type="number"
                      placeholder="85000"
                      value={formData.grossIncome}
                      onChange={(e) => setFormData({ ...formData, grossIncome: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, canton: e.target.value, commune: "" })}
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-base mt-2"
                  >
                    <optgroup label={t("simulators.taxSimulator.frenchSwitzerland")}>
                      {Object.entries(cantonTaxRates)
                        .filter(([, value]) => value.region === "Romandie")
                        .map(([key, value]) => (
                          <option key={key} value={key}>
                            {value.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label={t("simulators.taxSimulator.germanSwitzerland")}>
                      {Object.entries(cantonTaxRates)
                        .filter(([, value]) => value.region === "Alémanique")
                        .sort((a, b) => a[1].name.localeCompare(b[1].name))
                        .map(([key, value]) => (
                          <option key={key} value={key}>
                            {value.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label={t("simulators.taxSimulator.ticino")}>
                      {Object.entries(cantonTaxRates)
                        .filter(([, value]) => value.region === "Tessin")
                        .map(([key, value]) => (
                          <option key={key} value={key}>
                            {value.name}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

                {isRomandie && communes.length > 0 && (
                  <div>
                    <Label htmlFor="commune" className="text-base font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {isEnglish ? "Municipality of residence" : "Commune de domicile"}
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      {isEnglish ? "Optional - for a more precise calculation with the municipal coefficient" : "Optionnel - pour un calcul plus précis avec le coefficient communal"}
                    </p>
                    <select
                      id="commune"
                      value={formData.commune}
                      onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                      className="w-full h-12 px-4 rounded-md border border-input bg-background text-base mt-2"
                    >
                      <option value="">{isEnglish ? "- Cantonal capital -" : "- Chef-lieu du canton -"}</option>
                      {communes.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.nom}{c.taux_commune ? ` (coeff. ${c.taux_commune})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {isRomandie && loadingCommunes && (
                  <p className="text-sm text-muted-foreground">{isEnglish ? "Loading municipalities..." : "Chargement des communes..."}</p>
                )}

                <div>
                  <Label className="text-base font-medium">{t("simulators.taxSimulator.professionalStatus")}</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profession: "employee" })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.profession === "employee"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Briefcase className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium">{t("simulators.taxSimulator.employee")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profession: "independent" })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.profession === "independent"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium">{t("simulators.taxSimulator.selfEmployed")}</span>
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.grossIncome}
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
                  <Label className="text-base font-medium">{t("simulators.taxSimulator.maritalStatus")}</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, maritalStatus: "single" })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.maritalStatus === "single"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium">{t("simulators.taxSimulator.single")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, maritalStatus: "married" })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.maritalStatus === "married"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium">{t("simulators.taxSimulator.married")}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="children" className="text-base font-medium">
                    {t("simulators.taxSimulator.childrenCount")}
                  </Label>
                  <select
                    id="children"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-base mt-2"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n === 0 ? t("simulators.taxSimulator.none") : n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
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
                  <Label htmlFor="pillar3a" className="text-base font-medium">
                    {t("simulators.taxSimulator.pillar3aContribution")}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formData.profession === "independent"
                      ? isEnglish
                        ? "Maximum 20% of net self-employed income, up to CHF 36,288 (2026)"
                        : "Maximum 20 % du revenu net d'indépendant, jusqu'à CHF 36'288 (2026)"
                      : t("simulators.taxSimulator.pillar3aMax")}
                  </p>
                  <div className="relative">
                    <Input
                      id="pillar3a"
                      type="number"
                      placeholder="7258"
                      max={formData.profession === "independent" ? 36288 : 7258}
                      value={formData.pillar3a}
                      onChange={(e) => setFormData({ ...formData, pillar3a: e.target.value })}
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
                      <p className="font-medium mb-1">{t("simulators.taxSimulator.automaticDeductions")}</p>
                      <ul className="space-y-1 text-blue-700">
                        <li>• {t("simulators.taxSimulator.professionalExpenses")}</li>
                        <li>• {t("simulators.taxSimulator.healthInsurance")}</li>
                        <li>• {t("simulators.taxSimulator.childDeduction")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-12">
                    {t("simulators.common.back")}
                  </Button>
                  <Button type="submit" className="flex-1 h-12" disabled={loading}>
                    {loading
                      ? isEnglish
                        ? "Calculating..."
                        : "Calcul en cours..."
                      : t("simulators.taxSimulator.calculateTaxes")}
                    <Calculator className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;
  const calculateTaxes = result;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-primary to-emerald-600 text-white">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-white/80 text-sm mb-1">{t("simulators.taxSimulator.grossIncome")}</p>
              <p className="text-3xl font-bold">{formatCurrency(calculateTaxes.grossIncome)}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">{t("simulators.taxSimulator.estimatedTaxes")}</p>
              <p className="text-3xl font-bold text-yellow-300">
                {formatCurrency(calculateTaxes.taxes.total)}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">
                {isEnglish ? "Disposable income" : "Revenu disponible"}
              </p>
              <p className="text-3xl font-bold">{formatCurrency(calculateTaxes.disposableIncome)}</p>
              <p className="text-white/70 text-xs mt-1">
                {isEnglish ? "after social contributions and taxes" : "après cotisations sociales et impôts"}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-white/80">
              {t("simulators.taxSimulator.effectiveTaxRate")} :{" "}
              <span className="text-white font-bold text-xl">
                {calculateTaxes.effectiveRate.toFixed(1)}%
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="w-5 h-5 text-primary" />
              {t("simulators.taxSimulator.appliedDeductions")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {isEnglish ? "Social contributions (AHV, UI, pension)" : "Cotisations sociales (AVS, AC, LPP)"}
              </span>
              <span className="font-medium">{formatCurrency(calculateTaxes.socialContributions)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {isEnglish ? "Tax deductions (cantonal)" : "Déductions fiscales (canton)"}
              </span>
              <span className="font-medium">{formatCurrency(calculateTaxes.deductions.totalCanton)}</span>
            </div>
            {calculateTaxes.deductions.pillar3a > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground pl-3">{t("simulators.taxSimulator.pillar3aLabel")}</span>
                <span>{formatCurrency(calculateTaxes.deductions.pillar3a)}</span>
              </div>
            )}
            <div className="pt-3 border-t flex justify-between font-bold">
              <span>{isEnglish ? "Taxable income (canton)" : "Revenu imposable (canton)"}</span>
              <span className="text-primary">{formatCurrency(calculateTaxes.taxableIncome.canton)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{isEnglish ? "Taxable income (federal)" : "Revenu imposable (IFD)"}</span>
              <span>{formatCurrency(calculateTaxes.taxableIncome.federal)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PiggyBank className="w-5 h-5 text-primary" />
              {t("simulators.taxSimulator.taxDetails")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("simulators.taxSimulator.federalTax")}</span>
              <span className="font-medium">{formatCurrency(calculateTaxes.taxes.federal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("simulators.taxSimulator.cantonalTax")} ({cantonTaxRates[formData.canton].name})
              </span>
              <span className="font-medium">{formatCurrency(calculateTaxes.taxes.cantonal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {isEnglish ? "Municipal tax" : "Impôt communal"}
                <span className="text-xs ml-1">({calculateTaxes.location.name})</span>
              </span>
              <span className="font-medium">{formatCurrency(calculateTaxes.taxes.communal)}</span>
            </div>
            <div className="pt-3 border-t flex justify-between font-bold text-lg">
              <span>{t("simulators.taxSimulator.totalTaxes")}</span>
              <span className="text-red-600">{formatCurrency(calculateTaxes.taxes.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-center text-muted-foreground italic max-w-2xl mx-auto">
        {isEnglish
          ? `* Calculation made with the official tax calculator of the Swiss Federal Tax Administration (FTA), ${calculateTaxes.year} tax period, ${calculateTaxes.location.isCommune ? "" : "cantonal capital, "}income tax only (no wealth or church tax), standard deductions. Indicative result: your actual tax depends on all your deductions.`
          : `* Calcul effectué avec le calculateur fiscal officiel de l'Administration fédérale des contributions (AFC), période fiscale ${calculateTaxes.year}, ${calculateTaxes.location.isCommune ? "" : "chef-lieu du canton, "}impôt sur le revenu uniquement (sans impôt sur la fortune ni impôt ecclésiastique), déductions standard. Résultat indicatif : votre impôt réel dépend de l'ensemble de vos déductions.`}
      </p>

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
  );
}
