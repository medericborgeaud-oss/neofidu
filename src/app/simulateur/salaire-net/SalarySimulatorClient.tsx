"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Wallet,
  TrendingUp,
  Users,
  Calculator,
  MapPin,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  cantons,
  calculateNetSalary,
  formatCurrency,
  formatPercent,
  type MaritalStatus,
  type AgeGroup,
  type SalaryCalculationResult,
} from "@/lib/salary-calculator";
import { useLanguage } from "@/lib/language-context";

export function SalarySimulatorClient() {
  const { isEnglish } = useLanguage();
  const [grossSalary, setGrossSalary] = useState(100000);
  const [canton, setCanton] = useState("VD");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>("single");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("35-44");
  const [children, setChildren] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  const result = useMemo<SalaryCalculationResult>(() => {
    return calculateNetSalary({
      grossSalary,
      canton,
      maritalStatus,
      ageGroup,
      children,
    });
  }, [grossSalary, canton, maritalStatus, ageGroup, children]);

  const selectedCanton = cantons.find((c) => c.code === canton);

  // Sort cantons for comparison
  const cantonComparison = useMemo(() => {
    return cantons
      .map((c) => {
        const res = calculateNetSalary({
          grossSalary,
          canton: c.code,
          maritalStatus,
          ageGroup,
          children,
        });
        return { ...c, netSalary: res.netSalary, rate: res.effectiveTaxRate };
      })
      .sort((a, b) => b.netSalary - a.netSalary)
      .slice(0, 5);
  }, [grossSalary, maritalStatus, ageGroup, children]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="w-5 h-5 text-primary" />
              {isEnglish ? "Your information" : "Vos informations"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gross Salary */}
            <div className="space-y-2">
              <Label htmlFor="salary" className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                {isEnglish ? "Annual gross salary" : "Salaire brut annuel"}
              </Label>
              <div className="relative">
                <Input
                  id="salary"
                  type="number"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                  className="text-lg font-semibold pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  CHF
                </span>
              </div>
              <input
                type="range"
                min="30000"
                max="500000"
                step="5000"
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Canton */}
            <div className="space-y-2">
              <Label htmlFor="canton" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                {isEnglish ? "Canton of residence" : "Canton de résidence"}
              </Label>
              <select
                id="canton"
                value={canton}
                onChange={(e) => setCanton(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {cantons.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {isEnglish ? c.name : c.nameFr}
                  </option>
                ))}
              </select>
              {selectedCanton && (
                <p className="text-xs text-muted-foreground">
                  {isEnglish ? "Cantonal tax rate" : "Taux d'imposition cantonal"}: ~{selectedCanton.taxRate}%
                </p>
              )}
            </div>

            <Separator />

            {/* Personal situation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {isEnglish ? "Status" : "Situation"}
                </Label>
                <select
                  id="status"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="single">{isEnglish ? "Single" : "Célibataire"}</option>
                  <option value="married">{isEnglish ? "Married" : "Marié(e)"}</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">{isEnglish ? "Age group" : "Tranche d'âge"}</Label>
                <select
                  id="age"
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55-65">55-65</option>
                </select>
              </div>
            </div>

            {/* Children */}
            <div className="space-y-2">
              <Label htmlFor="children">
                {isEnglish ? "Dependent children" : "Enfants à charge"}
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  disabled={children === 0}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChildren(Math.min(6, children + 1))}
                  disabled={children === 6}
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-3 border-0 shadow-lg bg-gradient-to-br from-white to-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              {isEnglish ? "Calculation results" : "Résultat du calcul"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Net salary highlight */}
            <div className="bg-gradient-to-r from-primary to-emerald-500 text-white rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm">
                    {isEnglish ? "Monthly net salary" : "Salaire net mensuel"}
                  </p>
                  <p className="text-4xl font-bold mt-1">
                    {formatCurrency(result.netSalaryMonthly)}
                  </p>
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {formatPercent(100 - result.effectiveTaxRate)} {isEnglish ? "kept" : "conservé"}
                </Badge>
              </div>
              <Separator className="my-4 bg-white/20" />
              <div className="flex justify-between text-sm">
                <span className="text-white/80">{isEnglish ? "Annual net" : "Net annuel"}</span>
                <span className="font-semibold">{formatCurrency(result.netSalary)}</span>
              </div>
            </div>

            {/* Details toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
              {isEnglish ? "View breakdown" : "Voir le détail"}
            </button>

            {showDetails && (
              <div className="space-y-4 animate-in slide-in-from-top-2">
                {/* Social contributions */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {isEnglish ? "Social contributions" : "Cotisations sociales"}
                  </p>
                  <div className="bg-red-50 rounded-lg p-4 space-y-2">
                    <Row label="AVS/AI/APG" value={result.avsAiApg} rate="5.3%" />
                    <Row label={isEnglish ? "Unemployment (AC)" : "Chômage (AC)"} value={result.ac} rate="1.1%" />
                    <Row label="AANP" value={result.aanp} rate="~1.5%" />
                    <Row label="LPP (2e pilier)" value={result.lpp} />
                    <Separator className="bg-red-200" />
                    <Row
                      label="Total"
                      value={result.totalSocialContributions}
                      isTotal
                      rate={formatPercent((result.totalSocialContributions / result.grossSalary) * 100)}
                    />
                  </div>
                </div>

                {/* Taxes */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {isEnglish ? "Taxes" : "Impôts"}
                  </p>
                  <div className="bg-amber-50 rounded-lg p-4 space-y-2">
                    <Row label={isEnglish ? "Federal tax (IFD)" : "Impôt fédéral (IFD)"} value={result.federalTax} />
                    <Row label={`${isEnglish ? "Cantonal tax" : "Impôts"} ${selectedCanton?.nameFr || ""}`} value={result.cantonalTax} />
                    <Separator className="bg-amber-200" />
                    <Row
                      label="Total"
                      value={result.totalTax}
                      isTotal
                      rate={formatPercent((result.totalTax / result.grossSalary) * 100)}
                    />
                  </div>
                </div>

                {/* Summary bar */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {isEnglish ? "Salary breakdown" : "Répartition du salaire"}
                  </p>
                  <div className="h-4 rounded-full overflow-hidden flex bg-secondary">
                    <div
                      className="bg-gradient-to-r from-primary to-emerald-500 transition-all"
                      style={{ width: `${(result.netSalary / result.grossSalary) * 100}%` }}
                    />
                    <div
                      className="bg-red-400 transition-all"
                      style={{ width: `${(result.totalSocialContributions / result.grossSalary) * 100}%` }}
                    />
                    <div
                      className="bg-amber-400 transition-all"
                      style={{ width: `${(result.totalTax / result.grossSalary) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Net
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      {isEnglish ? "Social" : "Cotisations"}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {isEnglish ? "Taxes" : "Impôts"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Top cantons comparison */}
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-3">
                {isEnglish ? "Best cantons for your salary" : "Meilleurs cantons pour votre salaire"}
              </p>
              <div className="space-y-2">
                {cantonComparison.map((c, i) => (
                  <div
                    key={c.code}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      c.code === canton ? "bg-primary/10 border border-primary/20" : "bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground w-4">{i + 1}</span>
                      <span className="font-medium">{isEnglish ? c.name : c.nameFr}</span>
                      {i < 3 && <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">Top 3</Badge>}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatCurrency(c.netSalary)}</p>
                      <p className="text-xs text-muted-foreground">{formatPercent(c.rate)} {isEnglish ? "deducted" : "prélevé"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg p-4">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          {isEnglish
            ? "These calculations are provided for informational purposes only. For an accurate estimate, please consult a fiduciary or the tax administration."
            : "Ces calculs sont fournis à titre indicatif uniquement. Pour une estimation précise, veuillez consulter un fiduciaire ou l'administration fiscale."
          }
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, rate, isTotal }: { label: string; value: number; rate?: string; isTotal?: boolean }) {
  return (
    <div className={`flex justify-between items-center ${isTotal ? "font-semibold" : ""}`}>
      <span className={isTotal ? "" : "text-muted-foreground"}>{label}</span>
      <div className="flex items-center gap-2">
        {rate && <Badge variant="outline" className="text-xs">{rate}</Badge>}
        <span className="font-medium text-red-600">- {formatCurrency(value)}</span>
      </div>
    </div>
  );
}
