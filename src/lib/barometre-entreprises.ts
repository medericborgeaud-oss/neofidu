// src/lib/barometre-entreprises.ts
// Barometre fiscal romand des entreprises : impots 2026 d'un independant (raison individuelle)
// et d'une petite Sarl dans les 657 communes romandes. Chiffres calcules avec le calculateur
// fiscal officiel de l'AFC (swisstaxcalculator.estv.admin.ch) ; voir
// src/data/barometre-entreprises-2026.json.

import data from "@/data/barometre-entreprises-2026.json";

export const BARO_PRO_UPDATED = "2026-11-11";

export const PROFILS_PRO = ["ri80", "ri120fam", "sarl50", "sarl150"] as const;
export type ProfilProId = (typeof PROFILS_PRO)[number];

export const PROFIL_PRO_LABELS: Record<ProfilProId, { fr: string; en: string }> = {
  ri80: {
    fr: "Indépendant, personne seule, revenu de l'activité CHF 80'000",
    en: "Self-employed, single, business income CHF 80,000",
  },
  ri120fam: {
    fr: "Indépendant, marié, 2 enfants, revenu de l'activité CHF 120'000",
    en: "Self-employed, married, 2 children, business income CHF 120,000",
  },
  sarl50: {
    fr: "Sàrl, bénéfice CHF 50'000, capital propre CHF 100'000",
    en: "LLC (Sàrl), profit CHF 50,000, equity CHF 100,000",
  },
  sarl150: {
    fr: "Sàrl, bénéfice CHF 150'000, capital propre CHF 300'000",
    en: "LLC (Sàrl), profit CHF 150,000, equity CHF 300,000",
  },
};

export const PROFIL_PRO_SHORT: Record<ProfilProId, { fr: string; en: string }> = {
  ri80: { fr: "Indép. seul, 80k", en: "Self-empl. single, 80k" },
  ri120fam: { fr: "Indép. famille, 120k", en: "Self-empl. family, 120k" },
  sarl50: { fr: "Sàrl, bénéfice 50k", en: "LLC, profit 50k" },
  sarl150: { fr: "Sàrl, bénéfice 150k", en: "LLC, profit 150k" },
};

export interface BaroProCommune {
  slug: string;
  nom: string;
  canton: string;
  /** Total par profil, dans l'ordre de PROFILS_PRO */
  totals: number[];
  /** [federal, canton, commune, impot ecclesiastique] par profil */
  detail: number[][];
}

type Raw = {
  annee: number;
  profils: ProfilProId[];
  communes: { s: string; n: string; c: string; t: number[]; d: number[][] }[];
};
const raw = data as unknown as Raw;

export const BARO_PRO_YEAR = raw.annee;

export const BARO_PRO_COMMUNES: BaroProCommune[] = raw.communes.map((c) => ({
  slug: c.s,
  nom: c.n,
  canton: c.c,
  totals: c.t,
  detail: c.d,
}));

export const CANTON_ORDER_PRO = ["VD", "GE", "VS", "FR", "NE", "JU"];

function median(values: number[]): number {
  const v = [...values].sort((a, b) => a - b);
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : Math.round((v[m - 1] + v[m]) / 2);
}

export function proIndex(p: ProfilProId): number {
  return PROFILS_PRO.indexOf(p);
}

/** Communes triees de la moins imposee a la plus imposee pour un profil */
export function rankingPro(p: ProfilProId): BaroProCommune[] {
  const i = proIndex(p);
  return [...BARO_PRO_COMMUNES].sort((a, b) => a.totals[i] - b.totals[i] || a.nom.localeCompare(b.nom, "fr"));
}

/** Rang (1 = moins imposee), les communes a egalite partagent le meme rang */
export function rankOfPro(c: BaroProCommune, p: ProfilProId, worst = false): number {
  const i = proIndex(p);
  return 1 + BARO_PRO_COMMUNES.filter((o) => (worst ? o.totals[i] > c.totals[i] : o.totals[i] < c.totals[i])).length;
}

export interface CantonProStats {
  canton: string;
  n: number;
  /** par profil */
  median: number[];
  min: number[];
  max: number[];
}

export function cantonProStats(): CantonProStats[] {
  return CANTON_ORDER_PRO.map((canton) => {
    const cs = BARO_PRO_COMMUNES.filter((c) => c.canton === canton);
    return {
      canton,
      n: cs.length,
      median: PROFILS_PRO.map((_, i) => median(cs.map((c) => c.totals[i]))),
      min: PROFILS_PRO.map((_, i) => Math.min(...cs.map((c) => c.totals[i]))),
      max: PROFILS_PRO.map((_, i) => Math.max(...cs.map((c) => c.totals[i]))),
    };
  });
}

export function romandieMedianPro(p: ProfilProId): number {
  const i = proIndex(p);
  return median(BARO_PRO_COMMUNES.map((c) => c.totals[i]));
}

export function getBaroProCommune(slug: string): BaroProCommune | undefined {
  return BARO_PRO_COMMUNES.find((c) => c.slug === slug);
}
