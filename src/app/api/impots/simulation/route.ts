// src/app/api/impots/simulation/route.ts
// Simulation d'impot sur le revenu basee sur le calculateur officiel de l'AFC
// (swisstaxcalculator.estv.admin.ch). Le calcul est dans src/lib/estv-calc.ts
// (partage avec le serveur MCP /api/mcp).

import { NextResponse } from "next/server";
import { calculateIncomeTax, TaxInputError } from "@/lib/estv-calc";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let input: any;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  try {
    const result = await calculateIncomeTax({
      grossIncome: Number(input?.grossIncome),
      canton: String(input?.canton || ""),
      communeSlug: typeof input?.commune === "string" && input.commune ? input.commune : undefined,
      married: input?.maritalStatus === "married",
      children: Number(input?.children) || 0,
      pillar3a: Number(input?.pillar3a) || 0,
      selfEmployed: input?.profession === "independent",
    });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    if (e instanceof TaxInputError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error("[impots/simulation]", e);
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 });
  }
}
