// src/lib/commune-impots.ts
// Impots 2026 par commune pour 4 profils types, pre-calcules avec le
// calculateur fiscal officiel de l'AFC (swisstaxcalculator.estv.admin.ch).
// Donnees : src/data/communes-impots-2026.json (impot sur le revenu, sans fortune,
// sans impot ecclesiastique, deductions standard du calculateur).

import data from "@/data/communes-impots-2026.json";

export type ProfilId = "seul60" | "seul100" | "famille150" | "retraites70";

export const PROFILS: ProfilId[] = ["seul60", "seul100", "famille150", "retraites70"];

export const PROFIL_LABELS: Record<ProfilId, { fr: string; en: string }> = {
  seul60: {
    fr: "Personne seule, salaire brut CHF 60'000",
    en: "Single person, gross salary CHF 60,000",
  },
  seul100: {
    fr: "Personne seule, salaire brut CHF 100'000",
    en: "Single person, gross salary CHF 100,000",
  },
  famille150: {
    fr: "Couple marié, 2 enfants, salaires bruts CHF 90'000 + 60'000",
    en: "Married couple, 2 children, gross salaries CHF 90,000 + 60,000",
  },
  retraites70: {
    fr: "Couple de retraités, rentes CHF 40'000 + 30'000",
    en: "Retired couple, pensions CHF 40,000 + 30,000",
  },
};

export interface ImpotProfil {
  federal: number;
  cantonal: number;
  communal: number;
  total: number;
  rang: number; // 1 = commune la moins chere du canton pour ce profil
}

export interface CommuneImpots {
  annee: number;
  source: string;
  nbCommunesCanton: number;
  profils: Record<ProfilId, ImpotProfil & { medianeCanton: number }>;
}

type Raw = {
  annee: number;
  source: string;
  communes: Record<string, Record<ProfilId, [number, number, number, number, number]>>;
  cantons: Record<string, { n: number } & Record<ProfilId, { min: number; max: number; median: number }>>;
};

const raw = data as unknown as Raw;

export function getCommuneImpots(slug: string, canton: string): CommuneImpots | null {
  const c = raw.communes[slug];
  const cant = raw.cantons[canton];
  if (!c || !cant) return null;
  const profils = {} as CommuneImpots["profils"];
  for (const p of PROFILS) {
    const [federal, cantonal, communal, total, rang] = c[p];
    profils[p] = { federal, cantonal, communal, total, rang, medianeCanton: cant[p].median };
  }
  return { annee: raw.annee, source: raw.source, nbCommunesCanton: cant.n, profils };
}

// 16687 -> "16'687" (fr) / "16,687" (en)
export function formatChf(n: number, lang: "fr" | "en" = "fr"): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, lang === "fr" ? "'" : ",");
}

export function rangFr(n: number): string {
  return n === 1 ? "1er" : `${n}e`;
}

export function rankEn(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
