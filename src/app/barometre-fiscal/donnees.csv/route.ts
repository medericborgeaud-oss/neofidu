// Donnees du barometre fiscal romand au format CSV (reutilisation libre avec mention de la source).
import { BARO_COMMUNES, BARO_YEAR } from "@/lib/barometre";
import { PROFILS } from "@/lib/commune-impots";

export const dynamic = "force-static";

export function GET() {
  const head = ["commune", "slug", "canton", "annee_fiscale"];
  for (const p of PROFILS) head.push(`${p}_federal`, `${p}_cantonal`, `${p}_communal`, `${p}_total`);
  const esc = (v: string | number) => (typeof v === "string" && /[",;\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : String(v));
  const lines = [head.join(",")];
  for (const c of BARO_COMMUNES) {
    const row: (string | number)[] = [c.nom, c.slug, c.canton, BARO_YEAR];
    PROFILS.forEach((_, i) => row.push(c.detail[i][0], c.detail[i][1], c.detail[i][2], c.totals[i]));
    lines.push(row.map(esc).join(","));
  }
  const body =
    "# Barometre fiscal romand 2026, NeoFidu (neofidu.ch/barometre-fiscal), d'apres le calculateur fiscal de l'AFC. Impot sur le revenu, sans fortune ni impot ecclesiastique. Profils: seul60 = personne seule 60'000 brut; seul100 = personne seule 100'000 brut; famille150 = couple marie 2 enfants 90'000 + 60'000 brut; retraites70 = couple de retraites, rentes 40'000 + 30'000. Montants en CHF.\n" +
    lines.join("\n") +
    "\n";
  return new Response("﻿" + body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="barometre-fiscal-romand-2026.csv"',
    },
  });
}
