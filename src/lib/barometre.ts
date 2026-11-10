// src/lib/barometre.ts
// Barometre fiscal romand : classement des 657 communes romandes selon l'impot sur le revenu 2026
// pour 4 profils types. Chiffres calcules avec le calculateur fiscal officiel de l'AFC
// (swisstaxcalculator.estv.admin.ch) ; voir src/data/barometre-2026.json.

import data from "@/data/barometre-2026.json";
import { PROFILS, type ProfilId } from "@/lib/commune-impots";

export const BAROMETRE_UPDATED = "2026-11-10";
export const ESTV_URL = "https://swisstaxcalculator.estv.admin.ch/";

export interface BaroCommune {
  slug: string;
  nom: string;
  canton: string;
  population: number;
  /** Total par profil, dans l'ordre de PROFILS */
  totals: number[];
  /** [federal, canton, commune] par profil */
  detail: number[][];
}

type Raw = {
  annee: number;
  profils: ProfilId[];
  communes: { s: string; n: string; c: string; p: number; t: number[]; d: number[][] }[];
};
const raw = data as unknown as Raw;

export const BARO_YEAR = raw.annee;

export const BARO_COMMUNES: BaroCommune[] = raw.communes.map((c) => ({
  slug: c.s,
  nom: c.n,
  canton: c.c,
  population: c.p,
  totals: c.t,
  detail: c.d,
}));

export const CANTON_ORDER = ["VD", "GE", "VS", "FR", "NE", "JU"];

function median(values: number[]): number {
  const v = [...values].sort((a, b) => a - b);
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : Math.round((v[m - 1] + v[m]) / 2);
}

export function profilIndex(p: ProfilId): number {
  return PROFILS.indexOf(p);
}

/** Communes triees de la moins imposee a la plus imposee pour un profil */
export function ranking(p: ProfilId): BaroCommune[] {
  const i = profilIndex(p);
  return [...BARO_COMMUNES].sort((a, b) => a.totals[i] - b.totals[i] || a.nom.localeCompare(b.nom, "fr"));
}

export interface CantonStats {
  canton: string;
  n: number;
  /** par profil */
  median: number[];
  min: { nom: string; slug: string; total: number }[];
  max: { nom: string; slug: string; total: number }[];
}

export function cantonStats(): CantonStats[] {
  return CANTON_ORDER.map((canton) => {
    const cs = BARO_COMMUNES.filter((c) => c.canton === canton);
    const med: number[] = [];
    const mins: CantonStats["min"] = [];
    const maxs: CantonStats["max"] = [];
    PROFILS.forEach((_, i) => {
      const sorted = [...cs].sort((a, b) => a.totals[i] - b.totals[i]);
      med.push(median(cs.map((c) => c.totals[i])));
      const lo = sorted[0];
      const hi = sorted[sorted.length - 1];
      mins.push({ nom: lo.nom, slug: lo.slug, total: lo.totals[i] });
      maxs.push({ nom: hi.nom, slug: hi.slug, total: hi.totals[i] });
    });
    return { canton, n: cs.length, median: med, min: mins, max: maxs };
  });
}

export function romandieMedian(p: ProfilId): number {
  const i = profilIndex(p);
  return median(BARO_COMMUNES.map((c) => c.totals[i]));
}

/** Chefs-lieux et grandes villes, pour le tableau "villes principales" */
export const VILLES_PRINCIPALES = [
  "lausanne-vd",
  "geneve-ge",
  "fribourg-fr",
  "sion-vs",
  "neuchatel-ne",
  "delemont-ju",
  "la-chaux-de-fonds-ne",
  "yverdon-les-bains-vd",
  "montreux-vd",
  "bulle-fr",
  "martigny-vs",
  "nyon-vd",
];

export function getBaroCommune(slug: string): BaroCommune | undefined {
  return BARO_COMMUNES.find((c) => c.slug === slug);
}
