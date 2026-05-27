// src/components/CommunesDashboard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  MapPin,
  Users,
  TrendingDown,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Commune,
  CommuneFilters,
  CommunesStats,
  CANTON_NAMES,
  CANTON_COLORS,
  formatPopulation,
  formatTaux,
} from "@/lib/communes";

const CANTONS = ["VD", "GE", "VS", "FR", "NE", "JU"];

const CANTON_BADGE: Record<string, string> = {
  VD: "bg-blue-100 text-blue-700",
  GE: "bg-red-100 text-red-700",
  VS: "bg-orange-100 text-orange-700",
  FR: "bg-purple-100 text-purple-700",
  NE: "bg-teal-100 text-teal-700",
  JU: "bg-pink-100 text-pink-700",
};

interface Props {
  communes: Commune[];
  total: number;
  stats: CommunesStats;
  initialFilters: CommuneFilters;
}

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header compact */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Communes romandes
        </h1>
        <p className="text-sm text-gray-500">
          {stats.total.toLocaleString("fr-CH")} communes dans 6 cantons
        </p>
      </div>

      {/* KPI row compact */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {stats.plus_grande && (
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 flex items-center gap-1">
              <Users className="w-3 h-3" /> Plus peuplee
            </p>
            <p className="text-sm font-semibold text-gray-900 truncate">{stats.plus_grande.nom}</p>
            <p className="text-[10px] text-gray-400">{stats.plus_grande.population?.toLocaleString("fr-CH")} hab.</p>
          </div>
        )}
        {stats.plus_petite && (
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Plus petite
            </p>
            <p className="text-sm font-semibold text-gray-900 truncate">{stats.plus_petite.nom}</p>
            <p className="text-[10px] text-gray-400">{stats.plus_petite.population?.toLocaleString("fr-CH")} hab.</p>
          </div>
        )}
        {stats.taux_min && (
          <div className="bg-emerald-50 rounded-lg px-3 py-2">
            <p className="text-[10px] uppercase tracking-wide text-emerald-500 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Coeff. min
            </p>
            <p className="text-sm font-semibold text-emerald-700">{stats.taux_min.taux}</p>
            <p className="text-[10px] text-emerald-500">{stats.taux_min.nom} ({stats.taux_min.canton})</p>
          </div>
        )}
        {stats.taux_max && (
          <div className="bg-amber-50 rounded-lg px-3 py-2">
            <p className="text-[10px] uppercase tracking-wide text-amber-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Coeff. max
            </p>
            <p className="text-sm font-semibold text-amber-700">{stats.taux_max.taux}</p>
            <p className="text-[10px] text-amber-500">{stats.taux_max.nom} ({stats.taux_max.canton})</p>
          </div>
        )}
      </div>

      {/* Search + canton filters inline */}
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
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                canton === c
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              title={cs ? `${cs.count} communes` : c}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {search && (
            <button
              onClick={() => clearFilter("search")}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs"
            >
              &quot;{search}&quot;
              <X className="w-3 h-3" />
            </button>
          )}
          {canton && (
            <button
              onClick={() => clearFilter("canton")}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs"
            >
              {CANTON_NAMES[canton] || canton}
              <X className="w-3 h-3" />
            </button>
          )}
          <span className="text-xs text-gray-400">
            {total.toLocaleString("fr-CH")} resultat{total !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Communes GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {communes.map((commune) => (
          <Link
            key={commune.slug}
            href={`/communes/${commune.slug}`}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-100 hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            {/* Canton color dot */}
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: CANTON_COLORS[commune.canton] || "#9FE1CB" }}
            />
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 truncate">
                  {commune.nom}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${CANTON_BADGE[commune.canton] || "bg-gray-100 text-gray-500"}`}>
                  {commune.canton}
                </span>
              </div>
              {commune.district && (
                <p className="text-[10px] text-gray-400 truncate">{commune.district}</p>
              )}
            </div>
            {/* Metrics */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {commune.taux_commune != null && (
                <span className="text-xs font-semibold text-gray-700">{commune.taux_commune}</span>
              )}
              {commune.population != null && (
                <span className="text-[10px] text-gray-400 w-10 text-right">{formatPopulation(commune.population)}</span>
              )}
              <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {communes.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Aucune commune trouvee</p>
          <Link
            href="/communes"
            className="text-sm text-emerald-600 hover:underline mt-2 inline-block"
          >
            Reinitialiser les filtres
          </Link>
        </div>
      )}

      {/* Pagination compact */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {currentPage > 1 && (
            <Link
              href={buildUrl({ page: currentPage - 1 })}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Link>
          )}
          <span className="text-xs text-gray-500 px-2">
            Page {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={buildUrl({ page: currentPage + 1 })}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 bg-emerald-50 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="text-emerald-800 font-medium text-sm">
            Vous habitez en Suisse romande ?
          </p>
          <p className="text-xs text-emerald-600">
            Declaration d&apos;impots des CHF 89.\u2014 | Comptabilite des CHF 500.\u2014/an
          </p>
        </div>
        <Link href="/demande">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm whitespace-nowrap">
            Faire ma demande
          </Button>
        </Link>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-4">
        Source : Registre officiel des communes (OFS) via LINDAS
      </p>
    </div>
  );
}
