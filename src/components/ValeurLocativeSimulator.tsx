"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Home,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  Scale,
  Banknote,
  Wrench,
  Calculator,
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

interface SimulationResult {
  avant: {
    valeurLocative: number;
    interetsDeductibles: number;
    fraisEntretien: number;
    impactNet: number;
    impotSupplementaire: number;
  };
  apres: {
    valeurLocative: number;
    interetsDeductibles: number;
    fraisEntretien: number;
    impactNet: number;
    impotSupplementaire: number;
  };
  difference: number;
  gagnant: "avant" | "apres" | "egal";
  economieAnnuelle: number;
}

export function ValeurLocativeSimulator() {
  const [formData, setFormData] = useState({
    valeurLocative: "12000",
    interetsHypothecaires: "8000",
    fraisEntretien: "3000",
    canton: "vaud",
    tauxMarginal: "",
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

  const result = useMemo((): SimulationResult | null => {
    const valeurLocative = parseFloat(formData.valeurLocative) || 0;
    const interets = parseFloat(formData.interetsHypothecaires) || 0;
    const fraisEntretien = parseFloat(formData.fraisEntretien) || 0;
    const canton = cantonTaxRates[formData.canton];

    // Utiliser le taux marginal personnalisé ou celui du canton
    const tauxMarginal = formData.tauxMarginal
      ? parseFloat(formData.tauxMarginal) / 100
      : canton.marginalRate;

    if (valeurLocative <= 0) return null;

    // AVANT: Valeur locative imposée, déductions possibles
    const avantImpactNet = valeurLocative - interets - fraisEntretien;
    const avantImpot = avantImpactNet > 0 ? avantImpactNet * tauxMarginal : avantImpactNet * tauxMarginal;

    // APRÈS: Plus de valeur locative, plus de déductions (sauf rénovation énergétique partielle)
    // On considère que seuls 30% des frais d'entretien (rénovation énergétique) restent déductibles
    const fraisRenovationEnergetique = fraisEntretien * 0.3;
    const apresImpactNet = 0 - fraisRenovationEnergetique; // Pas de VL, juste déduction énergie
    const apresImpot = apresImpactNet * tauxMarginal;

    const difference = avantImpot - apresImpot;

    let gagnant: "avant" | "apres" | "egal" = "egal";
    if (difference > 100) gagnant = "apres"; // Après est mieux (on paie moins)
    else if (difference < -100) gagnant = "avant"; // Avant est mieux

    return {
      avant: {
        valeurLocative,
        interetsDeductibles: interets,
        fraisEntretien,
        impactNet: avantImpactNet,
        impotSupplementaire: avantImpot,
      },
      apres: {
        valeurLocative: 0,
        interetsDeductibles: 0,
        fraisEntretien: fraisRenovationEnergetique,
        impactNet: apresImpactNet,
        impotSupplementaire: apresImpot,
      },
      difference,
      gagnant,
      economieAnnuelle: difference,
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
            <Home className="w-6 h-6 text-primary" />
            Simulateur Valeur Locative
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Comparez votre situation fiscale avant et après la suppression de la valeur locative
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Valeur locative */}
            <div>
              <Label htmlFor="valeurLocative" className="text-base font-medium">
                Valeur locative annuelle
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Montant indiqué sur votre taxation (généralement 60-70% du loyer du marché)
              </p>
              <div className="relative">
                <Input
                  id="valeurLocative"
                  type="number"
                  placeholder="12000"
                  value={formData.valeurLocative}
                  onChange={(e) => setFormData({ ...formData, valeurLocative: e.target.value })}
                  className="h-12 pl-12"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
              </div>
            </div>

            {/* Intérêts hypothécaires */}
            <div>
              <Label htmlFor="interets" className="text-base font-medium">
                Intérêts hypothécaires annuels
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Intérêts payés à votre banque (pas l'amortissement)
              </p>
              <div className="relative">
                <Input
                  id="interets"
                  type="number"
                  placeholder="8000"
                  value={formData.interetsHypothecaires}
                  onChange={(e) => setFormData({ ...formData, interetsHypothecaires: e.target.value })}
                  className="h-12 pl-12"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
              </div>
            </div>

            {/* Frais d'entretien */}
            <div>
              <Label htmlFor="entretien" className="text-base font-medium">
                Frais d'entretien annuels
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Forfait (10-20% valeur locative) ou frais effectifs déclarés
              </p>
              <div className="relative">
                <Input
                  id="entretien"
                  type="number"
                  placeholder="3000"
                  value={formData.fraisEntretien}
                  onChange={(e) => setFormData({ ...formData, fraisEntretien: e.target.value })}
                  className="h-12 pl-12"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
              </div>
            </div>

            {/* Canton */}
            <div>
              <Label htmlFor="canton" className="text-base font-medium">
                Canton de résidence
              </Label>
              <select
                id="canton"
                value={formData.canton}
                onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                className="w-full h-12 px-4 rounded-md border border-input bg-background mt-2"
              >
                {Object.entries(cantonTaxRates).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name} (taux marginal ~{(value.marginalRate * 100).toFixed(0)}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Taux marginal personnalisé (optionnel) */}
            <div>
              <Label htmlFor="taux" className="text-base font-medium">
                Taux marginal personnalisé (optionnel)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Laissez vide pour utiliser le taux moyen du canton
              </p>
              <div className="relative">
                <Input
                  id="taux"
                  type="number"
                  step="0.1"
                  min="0"
                  max="50"
                  placeholder="Ex: 35"
                  value={formData.tauxMarginal}
                  onChange={(e) => setFormData({ ...formData, tauxMarginal: e.target.value })}
                  className="h-12 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">À propos de la réforme</p>
                  <p className="text-blue-700">
                    Le Parlement a voté la suppression de la valeur locative. Cette réforme
                    supprime l'imposition du "loyer fictif" mais aussi la déduction des
                    intérêts hypothécaires et des frais d'entretien (sauf rénovation énergétique).
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12">
              Comparer avant / après
              <Scale className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  const isGagnantApres = result.gagnant === "apres";
  const isGagnantAvant = result.gagnant === "avant";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Résultat principal */}
      <Card className={`overflow-hidden ${
        isGagnantApres
          ? "bg-gradient-to-br from-emerald-600 to-teal-700"
          : isGagnantAvant
            ? "bg-gradient-to-br from-amber-600 to-orange-700"
            : "bg-gradient-to-br from-slate-600 to-slate-700"
      } text-white`}>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4">
              {isGagnantApres ? (
                <>
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-medium">Vous serez gagnant après la réforme</span>
                </>
              ) : isGagnantAvant ? (
                <>
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Vous étiez mieux avant la réforme</span>
                </>
              ) : (
                <>
                  <Scale className="w-5 h-5" />
                  <span className="font-medium">Impact neutre</span>
                </>
              )}
            </div>

            <p className="text-white/80 text-sm mb-2">
              {isGagnantApres ? "Économie annuelle estimée" : "Surcoût annuel estimé"}
            </p>
            <p className="text-5xl font-bold">
              {isGagnantApres ? "+" : ""}{formatCurrency(Math.abs(result.economieAnnuelle))}
              <span className="text-2xl font-normal text-white/80">/an</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comparaison détaillée */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* AVANT */}
        <Card className={`${isGagnantAvant ? "ring-2 ring-amber-500" : ""}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">1</span>
                </div>
                Système actuel
              </span>
              {isGagnantAvant && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                  Plus avantageux
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Valeur locative imposée</span>
                </div>
                <span className="font-medium text-red-600">
                  +{formatCurrency(result.avant.valeurLocative)}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Intérêts déductibles</span>
                </div>
                <span className="font-medium text-green-600">
                  -{formatCurrency(result.avant.interetsDeductibles)}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Frais d'entretien déductibles</span>
                </div>
                <span className="font-medium text-green-600">
                  -{formatCurrency(result.avant.fraisEntretien)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Impact sur revenu imposable</span>
                <span className={`font-bold ${result.avant.impactNet > 0 ? "text-red-600" : "text-green-600"}`}>
                  {result.avant.impactNet > 0 ? "+" : ""}{formatCurrency(result.avant.impactNet)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Impact sur impôts</span>
                <span className={`font-bold text-lg ${result.avant.impotSupplementaire > 0 ? "text-red-600" : "text-green-600"}`}>
                  {result.avant.impotSupplementaire > 0 ? "+" : ""}{formatCurrency(result.avant.impotSupplementaire)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* APRÈS */}
        <Card className={`${isGagnantApres ? "ring-2 ring-emerald-500" : ""}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-sm">2</span>
                </div>
                Après réforme
              </span>
              {isGagnantApres && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                  Plus avantageux
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Valeur locative supprimée</span>
                </div>
                <span className="font-medium text-emerald-600">
                  CHF 0
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-muted-foreground">Intérêts non déductibles</span>
                </div>
                <span className="font-medium text-gray-400">
                  CHF 0
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Rénovation énergétique (~30%)</span>
                </div>
                <span className="font-medium text-green-600">
                  -{formatCurrency(result.apres.fraisEntretien)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Impact sur revenu imposable</span>
                <span className={`font-bold ${result.apres.impactNet > 0 ? "text-red-600" : "text-green-600"}`}>
                  {result.apres.impactNet > 0 ? "+" : ""}{formatCurrency(result.apres.impactNet)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Impact sur impôts</span>
                <span className={`font-bold text-lg ${result.apres.impotSupplementaire > 0 ? "text-red-600" : "text-green-600"}`}>
                  {result.apres.impotSupplementaire > 0 ? "+" : ""}{formatCurrency(result.apres.impotSupplementaire)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyse */}
      <Card className="bg-slate-50">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Analyse de votre situation
          </h3>

          <div className="space-y-3 text-sm">
            {isGagnantApres ? (
              <>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Vous serez gagnant</strong> car votre valeur locative ({formatCurrency(result.avant.valeurLocative)})
                    est supérieure à vos déductions actuelles (intérêts + entretien = {formatCurrency(result.avant.interetsDeductibles + result.avant.fraisEntretien)}).
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Vous économiserez environ <strong>{formatCurrency(result.economieAnnuelle)}</strong> par an en impôts.
                  </span>
                </p>
              </>
            ) : isGagnantAvant ? (
              <>
                <p className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Vous serez perdant</strong> car vos déductions actuelles (intérêts + entretien = {formatCurrency(result.avant.interetsDeductibles + result.avant.fraisEntretien)})
                    sont supérieures à votre valeur locative ({formatCurrency(result.avant.valeurLocative)}).
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Vous paierez environ <strong>{formatCurrency(Math.abs(result.economieAnnuelle))}</strong> de plus par an en impôts.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Conseil : Envisagez d'amortir votre hypothèque pour réduire vos intérêts,
                    puisqu'ils ne seront plus déductibles.
                  </span>
                </p>
              </>
            ) : (
              <p className="flex items-start gap-2">
                <Scale className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Impact neutre</strong> : Votre valeur locative et vos déductions s'équilibrent.
                  La réforme n'aura pas d'impact significatif sur vos impôts.
                </span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Avertissement */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Estimation indicative</p>
              <ul className="space-y-1 text-amber-700">
                <li>• La date d'entrée en vigueur n'est pas encore fixée (possible référendum)</li>
                <li>• Les modalités exactes peuvent encore évoluer</li>
                <li>• Le calcul utilise un taux marginal moyen, votre situation peut varier</li>
                <li>• Consultez un spécialiste pour une analyse personnalisée</li>
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
