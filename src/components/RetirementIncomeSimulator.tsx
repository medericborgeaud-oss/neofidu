"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, PiggyBank, Shield, ChevronRight } from "lucide-react";

const AVS_MIN = 1260;
const AVS_MAX = 2520;
const AVS_RAM_MIN = 14700;
const AVS_RAM_MAX = 88200;
const AVS_FULL_YEARS = 44;
const WITHDRAWAL_YEARS = 20;

function fmt(n: number) {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(n);
}

function compound(capital: number, contrib: number, years: number, r: number) {
  if (years <= 0) return capital;
  if (r < 0.0001) return capital + contrib * years;
  return capital * Math.pow(1 + r, years) + contrib * ((Math.pow(1 + r, years) - 1) / r);
}

export default function RetirementIncomeSimulator() {
  const [form, setForm] = useState({
    currentAge: "40",
    retirementAge: "65",
    annualIncome: "85000",
    avsYears: "20",
    lppCapital: "80000",
    lppContrib: "10000",
    lppRate: "6.8",
    p3Capital: "20000",
    p3Contrib: "7258",
    returnRate: "2.5",
  });

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const R = useMemo(() => {
    const age = parseInt(form.currentAge) || 40;
    const ret = parseInt(form.retirementAge) || 65;
    const income = parseFloat(form.annualIncome) || 85000;
    const avsYrs = Math.min(parseInt(form.avsYears) || 20, AVS_FULL_YEARS);
    const lppCap = parseFloat(form.lppCapital) || 0;
    const lppCon = parseFloat(form.lppContrib) || 0;
    const lppR = parseFloat(form.lppRate) / 100 || 0.068;
    const p3Cap = parseFloat(form.p3Capital) || 0;
    const p3Con = parseFloat(form.p3Contrib) || 0;
    const r = parseFloat(form.returnRate) / 100 || 0.025;

    if (age >= ret) return null;
    const yrs = ret - age;

    const totalAvsYrs = Math.min(AVS_FULL_YEARS, avsYrs + yrs);
    const ram = Math.max(AVS_RAM_MIN, Math.min(income, AVS_RAM_MAX));
    const fullRente = AVS_MIN + ((ram - AVS_RAM_MIN) / (AVS_RAM_MAX - AVS_RAM_MIN)) * (AVS_MAX - AVS_MIN);
    const avsMth = fullRente * (totalAvsYrs / AVS_FULL_YEARS);

    const lppFinal = compound(lppCap, lppCon, yrs, r);
    const lppMth = (lppFinal * lppR) / 12;

    const p3Final = compound(p3Cap, p3Con, yrs, r);
    const p3Mth = p3Final / (WITHDRAWAL_YEARS * 12);

    const total = avsMth + lppMth + p3Mth;
    const replRate = total / (income / 12);

    return {
      avsMth: Math.round(avsMth),
      lppMth: Math.round(lppMth),
      lppFinal: Math.round(lppFinal),
      p3Mth: Math.round(p3Mth),
      p3Final: Math.round(p3Final),
      total: Math.round(total),
      replRate,
      totalAvsYrs,
    };
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profil */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-blue-500" />
              Votre profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentAge">Âge actuel</Label>
              <Input id="currentAge" type="number" min={18} max={70}
                value={form.currentAge} onChange={e => upd("currentAge", e.target.value)}
                className="h-12 text-lg mt-1" />
            </div>
            <div>
              <Label htmlFor="retirementAge">Âge de retraite visé</Label>
              <Input id="retirementAge" type="number" min={58} max={72}
                value={form.retirementAge} onChange={e => upd("retirementAge", e.target.value)}
                className="h-12 text-lg mt-1" />
            </div>
            <div>
              <Label htmlFor="annualIncome">Revenu annuel brut actuel</Label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">CHF</span>
                <Input id="annualIncome" type="number" min={10000} step={1000}
                  value={form.annualIncome} onChange={e => upd("annualIncome", e.target.value)}
                  className="h-12 text-lg pl-14" />
              </div>
            </div>
            <div>
              <Label htmlFor="avsYears">Années de cotisation AVS déjà effectuées</Label>
              <Input id="avsYears" type="number" min={0} max={44}
                value={form.avsYears} onChange={e => upd("avsYears", e.target.value)}
                className="h-12 text-lg mt-1" />
              <p className="text-xs text-muted-foreground mt-1">44 ans = rente AVS complète</p>
            </div>
            <div>
              <Label htmlFor="returnRate">Rendement annuel attendu</Label>
              <div className="relative mt-1">
                <Input id="returnRate" type="number" min={0} max={10} step={0.1}
                  value={form.returnRate} onChange={e => upd("returnRate", e.target.value)}
                  className="h-12 text-lg pr-10" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Appliqué au 2ème et 3ème pilier</p>
            </div>
          </CardContent>
        </Card>

        {/* 2ème pilier */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <PiggyBank className="h-4 w-4 text-green-500" />
              2ème pilier (LPP)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="lppCapital">Avoir LPP actuel</Label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">CHF</span>
                <Input id="lppCapital" type="number" min={0} step={1000}
                  value={form.lppCapital} onChange={e => upd("lppCapital", e.target.value)}
                  className="h-12 text-lg pl-14" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Visible sur votre certificat de prévoyance</p>
            </div>
            <div>
              <Label htmlFor="lppContrib">Cotisation annuelle totale</Label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">CHF</span>
                <Input id="lppContrib" type="number" min={0} step={500}
                  value={form.lppContrib} onChange={e => upd("lppContrib", e.target.value)}
                  className="h-12 text-lg pl-14" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Part salarié + part employeur</p>
            </div>
            <div>
              <Label htmlFor="lppRate">Taux de conversion</Label>
              <div className="relative mt-1">
                <Input id="lppRate" type="number" min={4} max={8} step={0.1}
                  value={form.lppRate} onChange={e => upd("lppRate", e.target.value)}
                  className="h-12 text-lg pr-10" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Taux légal 2026 : 6,8% (obligatoire)</p>
            </div>
            <div className="p-3 rounded-lg bg-muted text-xs text-muted-foreground">
              Capital × taux de conversion = rente annuelle.
              Ex : 500’000 × 6,8% = 34’000/an.
            </div>
          </CardContent>
        </Card>

        {/* 3ème pilier */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              3ème pilier (3a)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="p3Capital">Capital 3ème pilier actuel</Label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">CHF</span>
                <Input id="p3Capital" type="number" min={0} step={1000}
                  value={form.p3Capital} onChange={e => upd("p3Capital", e.target.value)}
                  className="h-12 text-lg pl-14" />
              </div>
            </div>
            <div>
              <Label htmlFor="p3Contrib">Cotisation annuelle</Label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">CHF</span>
                <Input id="p3Contrib" type="number" min={0} max={36288} step={500}
                  value={form.p3Contrib} onChange={e => upd("p3Contrib", e.target.value)}
                  className="h-12 text-lg pl-14" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Max 2026 : 7’258 (salarié)</p>
            </div>
            <div className="p-3 rounded-lg bg-muted text-xs text-muted-foreground">
              Le capital est amorti sur <strong>20 ans</strong> après la retraite.
              L&apos;imposition au retrait n&apos;est pas incluse.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Résultats */}
      {R ? (
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <ChevronRight className="h-5 w-5 text-primary" />
              Revenu mensuel estimé à la retraite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <Shield className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-muted-foreground mb-1">AVS · 1er pilier</p>
                <p className="text-2xl font-bold">{fmt(R.avsMth)}</p>
                <p className="text-xs text-muted-foreground mt-1">{R.totalAvsYrs} ans cotisés</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <PiggyBank className="h-5 w-5 text-green-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-muted-foreground mb-1">LPP · 2ème pilier</p>
                <p className="text-2xl font-bold">{fmt(R.lppMth)}</p>
                <p className="text-xs text-muted-foreground mt-1">Capital : {fmt(R.lppFinal)}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <TrendingUp className="h-5 w-5 text-purple-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-muted-foreground mb-1">3ème pilier · sur 20 ans</p>
                <p className="text-2xl font-bold">{fmt(R.p3Mth)}</p>
                <p className="text-xs text-muted-foreground mt-1">Capital : {fmt(R.p3Final)}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-primary text-primary-foreground">
                <p className="text-xs font-medium opacity-80 mb-1">Total mensuel estimé</p>
                <p className="text-3xl font-bold">{fmt(R.total)}</p>
                <p className="text-xs opacity-80 mt-1">par mois</p>
                <div className="mt-2 px-2 py-1 bg-white/20 rounded text-xs font-medium">
                  Taux de remplacement : {Math.round(R.replRate * 100)}%
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Estimation indicative non contractuelle · paramètres 2026 · montants bruts avant impôts ·
              rendement hypothétique de {form.returnRate}%
              <br className="hidden md:block" />
              {" "}Pour un bilan de prévoyance personnalisé,{" "}
              <a href="/demande" className="text-primary underline hover:no-underline">
                contactez NeoFidu
              </a>.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            L&apos;âge de retraite doit être supérieur à l&apos;âge actuel.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
