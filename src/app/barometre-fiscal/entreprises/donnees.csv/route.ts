// Donnees du barometre fiscal des entreprises au format CSV (reutilisation libre avec mention de la source).
import { BARO_PRO_COMMUNES, BARO_PRO_YEAR, PROFILS_PRO } from "@/lib/barometre-entreprises";

export const dynamic = "force-static";

export function GET() {
  const head = ["commune", "slug", "canton", "annee_fiscale"];
  for (const p of PROFILS_PRO) head.push(`${p}_federal`, `${p}_cantonal`, `${p}_communal`, `${p}_ecclesiastique`, `${p}_total`);
  const esc = (v: string | number) => (typeof v === "string" && /[",;\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : String(v));
  const lines = [head.join(",")];
  for (const c of BARO_PRO_COMMUNES) {
    const row: (string | number)[] = [c.nom, c.slug, c.canton, BARO_PRO_YEAR];
    PROFILS_PRO.forEach((_, i) => row.push(...c.detail[i], c.totals[i]));
    lines.push(row.map(esc).join(","));
  }
  const body =
    "# Barometre fiscal des entreprises 2026, NeoFidu (neofidu.ch/barometre-fiscal/entreprises), d'apres le calculateur fiscal de l'AFC. Profils: ri80 = independant (raison individuelle), personne seule, revenu net d'activite 80'000, impot sur le revenu; ri120fam = independant marie, 2 enfants, conjoint sans revenu, revenu net d'activite 120'000, impot sur le revenu; sarl50 = Sarl, benefice avant impots 50'000, capital propre 100'000, impots sur le benefice et le capital; sarl150 = Sarl, benefice avant impots 150'000, capital propre 300'000. Independants sans fortune ni impot ecclesiastique. Taxe professionnelle genevoise non incluse. Montants en CHF.\n" +
    lines.join("\n") +
    "\n";
  return new Response("﻿" + body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="barometre-fiscal-entreprises-2026.csv"',
    },
  });
}
