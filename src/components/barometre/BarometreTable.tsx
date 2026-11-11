"use client";
// Classement complet des communes (tri par profil, filtre par canton, recherche).
// Le HTML initial contient toutes les lignes (lisible par les moteurs et les LLM).

import { useMemo, useState } from "react";
import Link from "next/link";

interface Row {
  slug: string;
  nom: string;
  canton: string;
  totals: number[];
}

interface Props {
  lang: "fr" | "en";
  rows: Row[];
  profilLabels: string[];
  cantonNames: Record<string, string>;
  /** Profil affiche au chargement (index dans profilLabels) */
  defaultProfil?: number;
  /** Debut de la legende accessible, ex. "impot sur le revenu 2026" */
  captionSubject?: { fr: string; en: string };
}

const fmt = (n: number, lang: "fr" | "en") =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, lang === "fr" ? "'" : ",");

const strip = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function BarometreTable({ lang, rows, profilLabels, cantonNames, defaultProfil = 1, captionSubject }: Props) {
  const fr = lang === "fr";
  const [profil, setProfil] = useState(defaultProfil);
  const [canton, setCanton] = useState("");
  const [q, setQ] = useState("");

  const sorted = useMemo(() => {
    const qq = strip(q.trim());
    return rows
      .filter((r) => (!canton || r.canton === canton) && (!qq || strip(r.nom).includes(qq)))
      .sort((a, b) => a.totals[profil] - b.totals[profil] || a.nom.localeCompare(b.nom, "fr"));
  }, [rows, profil, canton, q]);

  // Rang dans le perimetre filtre par canton (pas par la recherche)
  const ranks = useMemo(() => {
    const scope = rows
      .filter((r) => !canton || r.canton === canton)
      .sort((a, b) => a.totals[profil] - b.totals[profil]);
    const m = new Map<string, number>();
    scope.forEach((r, i) => {
      const prev = i > 0 ? scope[i - 1] : null;
      m.set(r.slug, prev && prev.totals[profil] === r.totals[profil] ? (m.get(prev.slug) as number) : i + 1);
    });
    return { m, n: scope.length };
  }, [rows, profil, canton]);

  const base = fr ? "" : "/en";

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <label className="flex-1 text-sm">
          <span className="block text-muted-foreground mb-1">{fr ? "Profil" : "Profile"}</span>
          <select
            value={profil}
            onChange={(e) => setProfil(Number(e.target.value))}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            {profilLabels.map((l, i) => (
              <option key={l} value={i}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:w-44 text-sm">
          <span className="block text-muted-foreground mb-1">Canton</span>
          <select
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="">{fr ? "Toute la Suisse romande" : "All French-speaking Switzerland"}</option>
            {Object.entries(cantonNames).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:w-52 text-sm">
          <span className="block text-muted-foreground mb-1">{fr ? "Rechercher une commune" : "Search a municipality"}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={fr ? "ex. Nyon" : "e.g. Nyon"}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          />
        </label>
      </div>

      <div className="max-h-[640px] overflow-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <caption className="sr-only">
            {fr
              ? `Classement des communes romandes, ${captionSubject?.fr ?? "impôt sur le revenu 2026"} : ${profilLabels[profil]}`
              : `Ranking of French-speaking Swiss municipalities, ${captionSubject?.en ?? "2026 income tax"}: ${profilLabels[profil]}`}
          </caption>
          <thead className="bg-muted/60 sticky top-0">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-semibold w-16">
                {fr ? "Rang" : "Rank"}
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold">
                {fr ? "Commune" : "Municipality"}
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold w-16">
                Canton
              </th>
              <th scope="col" className="px-3 py-2 text-right font-semibold">
                {fr ? "Impôt (CHF)" : "Tax (CHF)"}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.slug} className="border-t border-border">
                <td className="px-3 py-1.5 text-muted-foreground tabular-nums">
                  {ranks.m.get(r.slug)}/{ranks.n}
                </td>
                <td className="px-3 py-1.5">
                  <Link href={`${base}/communes/${r.slug}`} className="text-primary hover:underline">
                    {r.nom}
                  </Link>
                </td>
                <td className="px-3 py-1.5 text-muted-foreground">{r.canton}</td>
                <td className="px-3 py-1.5 text-right tabular-nums font-medium">{fmt(r.totals[profil], lang)}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
                  {fr ? "Aucune commune trouvée." : "No municipality found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
