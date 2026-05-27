/ src/components/CommunesDashboard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Commune,
  CommuneFilters,
  CommunesStats,
  CANTON_NAMES,
  formatPopulation,
  formatTaux,
} from "@/lib/communes";
import { CantonFlag } from "@/components/CantonFlag";

const CANTONS = ["VD", "GE", "VS", "FR", "NE", "JU"];

const CANTON_BADGE: Record<string, string> = {
  VD: "bg-blue-100 text-blue-700",
  GE: "bg-red-100 text-red-700",
  VS: "bg-orange-100 text-orange-700",
  FR: "bg-purple-100 text-purple-700",
  NE: "bg-teal-100 text-teal-700",
  JU: "bg-pink-100 text-pink-700",
};

export function CommunesDashboard({
  communes,
  total,
  stats,
  initialFilters,
}: Props) {
  const [search, setSearch] = useState(initialFilters.search || "");
  const [canton, setCanton] = useState(initialFilters.canton || "");
  const currentPage = initialFilters.page || 1;
  const hasFilters = search || canton;

  function buildUrl(overrides: Partial<CommuneFilters> = {}) {
    const params = new URLSearchParams();
    const s = overrides.search ?? search;
    const c = overrides.canton ?? canton;
    const p = overrides.page ?? 1;
    if (s) params.set("q", s);
    if (c) params.set("canton", c);
    if (p > 1) params.set("page", p.toString());
    const qs = params.toString();
    return `/communes${qs ? `?${qs}` : ""}`;
  }

  function clearFilter(key: string) {
    if (key === "search") setSearch("");
    if (key === "canton") setCanton("");
    const overrides: any = {};
    overrides[key] = "";
    window.location.href = buildUrl(overrides);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = buildUrl({ page: 1 });
  }

  const totalPages = Math.ceil(total / 20);
  const cantonStats = stats.by_canton || [];
  const startRank = (currentPage - 1) * 20 + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Communes romandes</h1>
        <p className="text-sm text-gray-500">{stats.total.toLocaleString("fr-CH")} communes dans 6 cantons</p>
      </div>

      {/* KPI row â 3 cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.plus_grande && (
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 flex items-center gap-1 mb-1"><Users className="w-3 h-3" /> Plus peuplee</p>
            <div className="flex items-center gap-2">
              <CantonFlag canton={stats.plus_grande.canton || ""} size={24} />
              <div>
                <p className="text-sm font-semibold text-gray-900 truncate">{stats.plus_grande.nom}</p>
                <p className="text-[10px] text-gray-400">{stats.plus_grande.population?.toLocaleString("fr-CH")} hab.</p>
              </div>
            </div>
          </div>
        )}
        {stats.plus_petite && (
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" /> Plus petite</p>
            <div className="flex items-center gap-2">
              <CantonFlag canton={stats.plus_petite.canton || ""} size={24} />
              <div>
                <p className="text-sm font-semibold text-gray-900 truncate">{stats.plus_petite.nom}</p>
                <p className="text-[10px] text-gray-400">{stats.plus_petite.population?.toLocaleString("fr-CH")} hab.</p>
              </div>
            </div>
          </div>
        )}
        <Link href="/simulateur-impots" className="bg-emerald-50 rounded-xl px-4 py-3 hover:bg-emerald-100 transition-colors group">
          <p className="text-[10px] uppercase tracking-wide text-emerald-500 flex items-center gap-1 mb-1"><Calculator className="w-3 h-3" /> Outil gratuit</p>
          <p className="text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">Simuler mes impots</p>
          <p className="text-[10px] text-emerald-500">Estimation par commune</p>
        </Link>
      </div>

      {/* Search + canton filters */}
      <div className="flex items-center gap-2 mb-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une commune..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </form>
        {CANTONS.map((c) => {
          const cs = cantonStats.find((s: any) => s.canton === c);
          return (
            <Link
              key={c}
              href={buildUrl({ canton: canton === c ? "" : c, page: 1 })}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                canton === c
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={cs ? `${cs.count} communes` : c}
            >
              {canton !== c && <CantonFlag canton={c} size={20} />}
              {c}
            </Link>
          );
        })}
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {search && (
            <button onClick={() => clearFilter("search")} className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs">
              &quot;{search}&quot; <X className="w-3 h-3" />
            </button>
          )}
          {canton && (
            <button onClick={() => clearFilter("canton")} className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs">
              {CANTON_NAMES[canton] || canton} <X className="w-3 h-3" />
            </button>
          )}
          <span className="text-xs text-gray-400">{total.toLocaleString("fr-CH")} resultat{total !== 1 ? "s" : ""}</span>
        </div>
      )}

      {/* Table header */}
      <div className="flex items-center gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
        <span className="w-6 text-center">#</span>
        <span className="flex-1">Commune</span>
        <span className="w-16 text-right">Coeff.</span>
        <span className="w-20 text-right">Population</span>
        <span className="w-6" />
      </div>

      {/* Communes list â single column */}
      <div className="divide-y divide-gray-50">
        {communes.map((commune, i) => (
          <Link
            key={commune.slug}
            href={`/communes/${commune.slug}`}
            className="group flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 transition-colors"
          >
            {/* Rank */}
            <span className="w-6 text-center text-xs text-gray-300 font-medium">{startRank + i}</span>

            {/* Flag + name */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <CantonFlag canton={commune.canton} size={28} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 truncate">{commune.nom}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${CANTON_BADGE[commune.canton] || "bg-gray-100 text-gray-500"}`}>{commune.canton}</span>
                </div>
                {commune.district && (
                  <p className="text-[10px] text-gray-400 truncate">{commune.district}</p>
                )}
              </div>
            </div>

            {/* Coefficient */}
            <div className="w-16 text-right">
              {commune.taux_commune != null ? (
                <span className="text-sm font-semibold text-gray-700">{commune.taux_commune}%</span>
              ) : (
                <span className="text-xs text-gray-300">&mdash;</span>
              )}
            </div>

            {/* Population */}
            <div className="w-20 text-right">
              {commune.population != null ? (
                <span className="text-xs text-gray-500">{commune.population.toLocaleString("fr-CH")}</span>
              ) : (
                <span className="text-xs text-gray-300">&mdash;</span>
              )}
            </div>

            {/* Arrow */}
            <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {communes.length === 0 && (
        <div className="text-center py-16">
          <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Aucune commune trouvee</p>
          <Link href="/communes" className="text-sm text-emerald-600 hover:underline mt-2 inline-block">Reinitialiser les filtres</Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
          {currentPage > 1 && (
            <Link href={buildUrl({ page: currentPage - 1 })} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Link>
          )}
          <span className="text-xs text-gray-500 px-2">Page {currentPage} / {totalPages}</span>
          {currentPage < totalPages && (
            <Link href={buildUrl({ page: currentPage + 1 })} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 bg-emerald-50 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="text-emerald-800 font-medium text-sm">Vous habitez en Suisse romande ?</p>
          <p className="text-xs text-emerald-600">Declaration d&apos;impots des CHF 89.&mdash; | Comptabilite des CHF 500.&mdash;/an</p>
        </div>
        <Link href="/demande">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm whitespace-nowrap">Faire ma demande</Button>
        </Link>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-4">Source : Registre officiel des communes (OFS) via LINDAS</p>
    </div>
  );
}
