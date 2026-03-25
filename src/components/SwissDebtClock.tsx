"use client";

import { useState, useEffect, useRef } from "react";

// ════════════════════════════════════════════════════════════════
//  DONNÉES — Budget fédéral suisse 2026
//  Sources: Administration fédérale des finances (AFF / EFV)
//  efv.admin.ch · efd.admin.ch
// ════════════════════════════════════════════════════════════════

const DEBT_JAN1 = 140.0e9; // Dette nette Confédération au 1er janv. 2026 (EFD)
const ANNUAL_DEFICIT = 0.742e9; // Déficit de financement budgété 2026
const ANNUAL_REV = 90.4e9; // Recettes totales (ord. + extra.)
const ANNUAL_EXP = 91.1e9; // Dépenses totales (ord. + extra.)

const S = 365 * 24 * 3600; // Secondes en 2026
const PS_REV = ANNUAL_REV / S;
const PS_EXP = ANNUAL_EXP / S;
const PS_DEF = ANNUAL_DEFICIT / S;

const JAN1 = new Date("2026-01-01T00:00:00+01:00").getTime();

interface Category {
  l: string;
  a: number;
  c: string;
}

const RECETTES: Category[] = [
  { l: "TVA", a: 28.1e9, c: "#34d399" },
  { l: "Impôt fédéral direct – personnes morales", a: 17.1e9, c: "#10b981" },
  { l: "Impôt fédéral direct – personnes physiques", a: 15.9e9, c: "#059669" },
  { l: "Impôt anticipé", a: 6.7e9, c: "#6ee7b7" },
  { l: "Impôt sur les huiles minérales", a: 4.5e9, c: "#a7f3d0" },
  { l: "Droits de timbre", a: 2.3e9, c: "#86efac" },
  { l: "Impôt sur le tabac", a: 2.2e9, c: "#4ade80" },
  { l: "Impôt complémentaire OCDE (nouveau)", a: 1.6e9, c: "#22d3ee" },
  { l: "Redevance poids lourds (RPLP)", a: 1.5e9, c: "#22c55e" },
  { l: "Taxe sur le CO₂", a: 1.1e9, c: "#2dd4bf" },
  { l: "Droits de douane", a: 0.7e9, c: "#14b8a6" },
  { l: "Autres recettes", a: 8.7e9, c: "#047857" },
];

const DEPENSES: Category[] = [
  { l: "Prévoyance sociale (AVS, AI, APG, PC, asile)", a: 31.8e9, c: "#f87171" },
  { l: "Finances & impôts (part cantonale IFD)", a: 14.8e9, c: "#fb923c" },
  { l: "Trafic & infrastructure (CFF, routes, rail)", a: 11.2e9, c: "#fbbf24" },
  { l: "Formation & recherche (EPF, FNS, Erasmus+)", a: 9.0e9, c: "#a78bfa" },
  { l: "Défense nationale & armée", a: 7.8e9, c: "#60a5fa" },
  { l: "Relations extérieures & coopération au dév.", a: 3.8e9, c: "#c084fc" },
  { l: "Agriculture & alimentation", a: 3.8e9, c: "#f472b6" },
  { l: "Autres tâches fédérales", a: 8.9e9, c: "#94a3b8" },
];

// ── Helpers ──
function f2(n: number): string {
  return Math.round(n).toLocaleString("de-CH");
}
function fShort(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + " Mrd";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + " Mio";
  return f2(n);
}

// ── Sub-components ──
function CategoryBar({ cat, total }: { cat: Category; total: number }) {
  const pct = (cat.a / total) * 100;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 gap-2">
        <span className="font-medium">{cat.l}</span>
        <span className="opacity-60 whitespace-nowrap tabular-nums">
          {fShort(cat.a)} · {pct.toFixed(1)}%
        </span>
      </div>
      <div className="h-[7px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, backgroundColor: cat.c }}
        />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
export default function SwissDebtClock() {
  const [tab, setTab] = useState<"r" | "d">("r");
  const [vals, setVals] = useState({
    debt: DEBT_JAN1,
    ytd: 0,
    page: 0,
    rev: 0,
    exp: 0,
  });

  const pageOpen = useRef(Date.now());
  const display = useRef({ debt: DEBT_JAN1, ytd: 0, page: 0, rev: 0, exp: 0 });

  useEffect(() => {
    let raf: number;
    const animate = () => {
      const now = Date.now();
      const secJan1 = (now - JAN1) / 1000;
      const secPage = (now - pageOpen.current) / 1000;

      const t = {
        debt: DEBT_JAN1 + secJan1 * PS_DEF,
        ytd: secJan1 * PS_DEF,
        page: secPage * PS_DEF,
        rev: secPage * PS_REV,
        exp: secPage * PS_EXP,
      };

      const d = display.current;
      const k = 0.1;
      d.debt += (t.debt - d.debt) * k;
      d.ytd += (t.ytd - d.ytd) * k;
      d.page += (t.page - d.page) * k;
      d.rev += (t.rev - d.rev) * k;
      d.exp += (t.exp - d.exp) * k;

      setVals({
        debt: d.debt,
        ytd: d.ytd,
        page: d.page,
        rev: d.rev,
        exp: d.exp,
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cats = tab === "r" ? RECETTES : DEPENSES;
  const total = tab === "r" ? ANNUAL_REV : ANNUAL_EXP;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 rounded-2xl p-6 md:p-10 max-w-[960px] mx-auto border border-white/[0.06] shadow-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center mb-2">
          <span className="relative inline-flex h-[9px] w-[9px] mr-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-[9px] w-[9px] bg-emerald-500" />
          </span>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            En direct · Budget fédéral 2026
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 mb-1">
          <svg
            className="inline-block align-middle mr-1.5 -mt-0.5"
            width="28"
            height="28"
            viewBox="0 0 32 32"
          >
            <rect width="32" height="32" rx="4" fill="#D52B1E" />
            <rect x="8" y="13" width="16" height="6" rx="1" fill="#fff" />
            <rect x="13" y="8" width="6" height="16" rx="1" fill="#fff" />
          </svg>
          Compteur de la dette suisse
        </h1>
        <p className="text-xs opacity-40">
          Estimation en temps réel · Sources : Administration fédérale des
          finances (AFF)
        </p>
      </div>

      {/* Main debt counter */}
      <div className="bg-red-500/[0.07] border border-red-500/[0.12] rounded-xl p-5 text-center mb-3">
        <div className="text-xs uppercase tracking-wider opacity-55 mb-2">
          Dette nette estimée de la Confédération — en ce moment
        </div>
        <div className="text-4xl md:text-5xl font-extrabold text-red-400 tabular-nums leading-tight">
          CHF {f2(vals.debt)}
        </div>
      </div>

      {/* Delta cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 text-center">
          <div className="text-xs uppercase tracking-wider opacity-55">
            Augmentation depuis le 1er janv. 2026
          </div>
          <div className="text-2xl font-bold text-orange-400 tabular-nums mt-1.5">
            + CHF {f2(vals.ytd)}
          </div>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 text-center">
          <div className="text-xs uppercase tracking-wider opacity-55">
            Augmentation depuis l&apos;ouverture de cette page
          </div>
          <div className="text-2xl font-bold text-yellow-400 tabular-nums mt-1.5">
            + CHF {f2(vals.page)}
          </div>
        </div>
      </div>

      {/* Revenue / Expenses since page open */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 text-center">
          <div className="text-xs uppercase tracking-wider opacity-55">
            Recettes fédérales depuis l&apos;ouverture de cette page
          </div>
          <div className="text-xl font-bold text-emerald-400 tabular-nums mt-1.5">
            CHF {f2(vals.rev)}
          </div>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 text-center">
          <div className="text-xs uppercase tracking-wider opacity-55">
            Dépenses fédérales depuis l&apos;ouverture de cette page
          </div>
          <div className="text-xl font-bold text-red-400 tabular-nums mt-1.5">
            CHF {f2(vals.exp)}
          </div>
        </div>
      </div>

      {/* Per-second */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4 text-center">
          <div className="text-xs uppercase tracking-wider opacity-55">
            Recettes / seconde
          </div>
          <div className="text-base font-bold text-emerald-400 tabular-nums mt-1">
            CHF {f2(PS_REV)}
          </div>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4 text-center">
          <div className="text-xs uppercase tracking-wider opacity-55">
            Dépenses / seconde
          </div>
          <div className="text-base font-bold text-red-400 tabular-nums mt-1">
            CHF {f2(PS_EXP)}
          </div>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4 text-center">
          <div className="text-xs uppercase tracking-wider opacity-55">
            Déficit / seconde
          </div>
          <div className="text-base font-bold text-yellow-400 tabular-nums mt-1">
            CHF {f2(PS_DEF)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setTab("r")}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            tab === "r"
              ? "bg-emerald-500/[0.18] text-emerald-400"
              : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
          }`}
        >
          Recettes · 90.4 Mrd
        </button>
        <button
          onClick={() => setTab("d")}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            tab === "d"
              ? "bg-red-500/[0.14] text-red-400"
              : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
          }`}
        >
          Dépenses · 91.1 Mrd
        </button>
      </div>

      {/* Category bars */}
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
        {cats.map((c) => (
          <CategoryBar key={c.l} cat={c} total={total} />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-4 text-[0.6rem] opacity-30 leading-relaxed">
        neofidu.ch · Données indicatives basées sur le budget fédéral 2026
        <br />
        Sources : Administration fédérale des finances — efv.admin.ch
      </div>
    </div>
  );
}
