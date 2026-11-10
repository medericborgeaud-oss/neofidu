// src/app/api/impots/simulation/route.ts
// Simulation d'impot sur le revenu basee sur le calculateur officiel de l'AFC
// (swisstaxcalculator.estv.admin.ch). Remplace l'ancien calcul approximatif
// (taux cantonal fixe) qui surestimait fortement l'impot.

import { NextResponse } from "next/server";
import locations from "@/data/estv-locations.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ESTV = "https://swisstaxcalculator.estv.admin.ch/delegate/ost-integration/v1/lg-proxy/operation/c3b67379_ESTV";
const TAX_YEAR = 2026;
const NO_CONFESSION = 4;
const PILLAR3A_EMPLOYEE = 7258;
const PILLAR3A_SELF_EMPLOYED = 36288;

type Locs = {
  communes: Record<string, number>;
  chefsLieux: Record<string, { tid: number; nom: string }>;
};
const LOCS = locations as unknown as Locs;

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

export async function POST(req: Request) {
  let input: any;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const income = Math.round(Number(input?.grossIncome));
  const canton = String(input?.canton || "").toUpperCase();
  const communeSlug = typeof input?.commune === "string" ? input.commune : "";
  const married = input?.maritalStatus === "married";
  const selfEmployed = input?.profession === "independent";
  const children = Math.min(Math.max(Math.round(Number(input?.children) || 0), 0), 10);
  const pillarCap = selfEmployed ? PILLAR3A_SELF_EMPLOYED : PILLAR3A_EMPLOYEE;
  const pillar3a = Math.min(Math.max(Math.round(Number(input?.pillar3a) || 0), 0), pillarCap);

  if (!Number.isFinite(income) || income <= 0 || income > 10_000_000) {
    return NextResponse.json({ error: "invalid_income" }, { status: 400 });
  }
  const chefLieu = LOCS.chefsLieux[canton];
  if (!chefLieu) return NextResponse.json({ error: "invalid_canton" }, { status: 400 });

  // Commune choisie (Suisse romande) ou chef-lieu du canton par defaut
  const communeTid = communeSlug ? LOCS.communes[communeSlug] : undefined;
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

  try {
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

    return NextResponse.json(
      {
        year: TAX_YEAR,
        location: {
          name: detailed.Location?.City || chefLieu.nom,
          isCommune: Boolean(communeTid),
        },
        grossIncome: income,
        socialContributions: social,
        netIncome,
        deductions: {
          pillar3a,
          totalCanton: Math.max(netIncome - taxableCanton, 0),
        },
        taxableIncome: { federal: taxableFed, canton: taxableCanton },
        taxes: { federal: fed, cantonal: cant, communal: city, total },
        disposableIncome: netIncome - total,
        effectiveRate: (total / income) * 100,
        marginalRate: detailed.MarginalTaxRate ?? null,
        source: "AFC / ESTV",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("[impots/simulation]", e);
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 });
  }
}
