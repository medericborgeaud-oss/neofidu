// src/lib/estv-calc.ts
// Calcul de l'impot sur le revenu avec le calculateur fiscal officiel de l'AFC
// (swisstaxcalculator.estv.admin.ch). Utilise par le simulateur (/api/impots/simulation)
// et par le serveur MCP (/api/mcp).

import locations from "@/data/estv-locations.json";

const ESTV = "https://swisstaxcalculator.estv.admin.ch/delegate/ost-integration/v1/lg-proxy/operation/c3b67379_ESTV";
export const TAX_YEAR = 2026;
const NO_CONFESSION = 4;
export const PILLAR3A_EMPLOYEE = 7258;
export const PILLAR3A_SELF_EMPLOYED = 36288;

type Locs = {
  communes: Record<string, number>;
  chefsLieux: Record<string, { tid: number; nom: string }>;
};
const LOCS = locations as unknown as Locs;

export const SWISS_CANTONS = Object.keys(LOCS.chefsLieux);

export function hasCommuneLocation(slug: string): boolean {
  return Boolean(LOCS.communes[slug]);
}

async function estv(op: string, body: unknown) {
  const res = await fetch(`${ESTV}/${op}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`ESTV ${op} ${res.status}`);
  const json = await res.json();
  return json.response;
}

export interface TaxInput {
  grossIncome: number;
  canton: string; // code a 2 lettres (VD, GE, ZH...)
  communeSlug?: string; // ex. "leysin-vd" (Suisse romande)
  married?: boolean;
  children?: number;
  pillar3a?: number;
  selfEmployed?: boolean;
}

export interface TaxResult {
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
  source: string;
}

export class TaxInputError extends Error {}

export async function calculateIncomeTax(input: TaxInput): Promise<TaxResult> {
  const income = Math.round(Number(input.grossIncome));
  const canton = String(input.canton || "").toUpperCase();
  const married = Boolean(input.married);
  const selfEmployed = Boolean(input.selfEmployed);
  const children = Math.min(Math.max(Math.round(Number(input.children) || 0), 0), 10);
  const pillarCap = selfEmployed ? PILLAR3A_SELF_EMPLOYED : PILLAR3A_EMPLOYEE;
  const pillar3a = Math.min(Math.max(Math.round(Number(input.pillar3a) || 0), 0), pillarCap);

  if (!Number.isFinite(income) || income <= 0 || income > 10_000_000) throw new TaxInputError("invalid_income");
  const chefLieu = LOCS.chefsLieux[canton];
  if (!chefLieu) throw new TaxInputError("invalid_canton");

  // Commune choisie (Suisse romande) ou chef-lieu du canton par defaut
  const communeTid = input.communeSlug ? LOCS.communes[input.communeSlug] : undefined;
  const taxLocationID = communeTid ?? chefLieu.tid;

  const common = {
    SimKey: null,
    TaxYear: TAX_YEAR,
    TaxLocationID: taxLocationID,
    Relationship: married ? 2 : 1,
    Confession1: NO_CONFESSION,
    Confession2: married ? NO_CONFESSION : 0,
    Children: Array.from({ length: children }, () => ({ Age: 10 })),
    Language: 1,
  };

  const detailed = await estv("API_calculateDetailedTaxes", {
    ...common,
    Age1: 40,
    Age2: married ? 40 : 0,
    RevenueType1: selfEmployed ? 2 : 1,
    Revenue1: income,
    RevenueType2: 0,
    Revenue2: 0,
    Fortune: 0,
    Budget: [],
  });

  let fed = detailed.IncomeTaxFed as number;
  let cant = detailed.IncomeTaxCanton as number;
  let city = (detailed.IncomeTaxCity as number) + ((detailed.PersonalTax as number) || 0);
  let taxableFed = detailed.TaxableIncomeFed as number;
  let taxableCanton = detailed.TaxableIncomeCanton as number;

  // 3e pilier : deductible a l'identique (IFD et canton), on recalcule sur le revenu imposable reduit
  if (pillar3a > 0) {
    taxableFed = Math.max(taxableFed - pillar3a, 0);
    taxableCanton = Math.max(taxableCanton - pillar3a, 0);
    const simple = await estv("API_calculateSimpleTaxes", {
      ...common,
      TaxableIncomeCanton: taxableCanton,
      TaxableIncomeFed: taxableFed,
      TaxableFortune: 0,
    });
    fed = simple.IncomeTaxFed;
    cant = simple.IncomeTaxCanton;
    city = simple.IncomeTaxCity + (simple.PersonalTax || 0);
  }

  const p1 = detailed.IncomeP1 || {};
  const social =
    (p1.AIOContribution || 0) + (p1.ALVContribution || 0) + (p1.NBUContribution || 0) + (p1.BVGContribution || 0);
  const netIncome = (p1.NetIncome as number) || income - social;
  const total = fed + cant + city;

  return {
    year: TAX_YEAR,
    location: { name: detailed.Location?.City || chefLieu.nom, isCommune: Boolean(communeTid) },
    grossIncome: income,
    socialContributions: social,
    netIncome,
    deductions: { pillar3a, totalCanton: Math.max(netIncome - taxableCanton, 0) },
    taxableIncome: { federal: taxableFed, canton: taxableCanton },
    taxes: { federal: fed, cantonal: cant, communal: city, total },
    disposableIncome: netIncome - total,
    effectiveRate: (total / income) * 100,
    marginalRate: detailed.MarginalTaxRate ?? null,
    source: "AFC / ESTV",
  };
}
