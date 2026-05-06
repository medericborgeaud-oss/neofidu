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
  Building2,
  TrendingDown,
  TrendingUp,
  Info,
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

  // Barre de cantons avec nb de communes
  const cantonStats = stats.by_canton || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ─── Header ─── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Communes romandes
        </h1>
        <p className="text-gray-500">
          {stats.total.toLocaleString("fr-CH")} communes dans 6 cantons —
          fiscalité, population et entreprises
        </p>
      </div>

      {/* ─── KPI Cards ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {/* Plus grande commune */}
        {stats.plus_grande && (
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Users className="w-3 h-3" />
              Plus peuplée
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {stats.plus_grande.nom}
            </p>
            <p className="text-xs text-gray-500">
              {stats.plus_grande.population?.toLocaleString("fr-CH")} hab. —{" "}
              {stats.plus_grande.canton}
            </p>
          </div>
        )}

        {/* Plus petite commune */}
        {stats.plus_petite && (
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <MapPin className="w-3 h-3" />
              Plus petite
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {stats.plus_petite.nom}
            </p>
            <p className="text-xs text-gray-500">
              {stats.plus_petite.population?.toLocaleString("fr-CH")} hab. —{" "}
              {stats.plus_petite.canton}
            </p>
          </div>
        )}

        {/* Coefficient le plus bas */}
        {stats.taux_min && (
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-emerald-600 mb-1">
              <TrendingDown className="w-3 h-3" />
              Coefficient le plus bas
            </div>
            <p className="text-lg font-semibold text-emerald-700">
              {stats.taux_min.taux}
            </p>
            <p className="text-xs text-emerald-600">
              {stats.taux_min.nom} ({stats.taux_min.canton})
            </p>
          </div>
        )}

        {/* Coefficient le plus haut */}
        {stats.taux_max && (
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-amber-600 mb-1">
              <TrendingUp className="w-3 h-3" />
              Coefficient le plus haut
            </div>
            <p className="text-lg font-semibold text-amber-700">
              {stats.taux_max.taux}
            </p>
            <p className="text-xs text-amber-600">
              {stats.taux_max.nom} ({stats.taux_max.canton})
            </p>
          </div>
        )}
      </div>

      {/* ─── Canton bar chart ─── */}
      {cantonStats.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 mb-3">
            Communes par canton
          </h2>
          <div className="flex gap-2 items-end h-20">
            {cantonStats.map((cs: any) => {
              const maxCount = Math.max(
                ...cantonStats.map((s: any) => s.count)
              );
              const heightPct = Math.max((cs.count / maxCount) * 100, 8);
              const isActive = canton === cs.canton;
              return (
                <Link
                  key={cs.canton}
                  href={buildUrl({
                    canton: isActive ? "" : cs.canton,
                    page: 1,
                  })}
                  className="flex-1 flex flex-col items-center gap-1 group"
                >
                  <span className="text-xs text-gray-400 group-hover:text-emerald-600 transition-colors">
                    {cs.count}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      isActive
                        ? "ring-2 ring-emerald-500"
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor:
                        CANTON_COLORS[cs.canton] || "#9FE1CB",
                    }}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-emerald-600" : "text-gray-500"
                    }`}
                  >
                    {cs.canton}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Search + Filters ─── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une commune..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </form>

        <div className="flex gap-2 flex-wrap">
          {CANTONS.map((c) => (
            <Link
              key={c}
              href={buildUrl({ canton: canton === c ? "" : c, page: 1 })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                canton === c
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Active filters ─── */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {search && (
            <button
              onClick={() => clearFilter("search")}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
            >
              &quot;{search}&quot;
              <X className="w-3 h-3" />
            </button>
          )}
          {canton && (
            <button
              onClick={() => clearFilter("canton")}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
            >
              {CANTON_NAMES[canton] || canton}
              <X className="w-3 h-3" />
            </button>
          )}
          <span className="text-sm text-gray-400 py-1">
            {total.toLocaleString("fr-CH")} résultat
            {total !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* ─── Communes list ─── */}
      <div className="space-y-2">
        {communes.map((commune) => (
          <Link
            key={commune.slug}
            href={`/communes/${commune.slug}`}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
          >
            {/* Nom + canton */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                  {commune.nom}
                </h3>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {commune.canton}
                </span>
              </div>
              {commune.district && (
                <p className="text-xs text-gray-400 truncate">
                  {commune.district}
                </p>
              )}
            </div>

            {/* Coefficient communal */}
            <div className="hidden sm:block text-right w-20">
              <p className="text-xs text-gray-400">Coeff.</p>
              <p className="text-sm font-medium text-gray-700">
                {formatTaux(commune.taux_commune)}
              </p>
            </div>

            {/* Population */}
            <div className="text-right w-16">
              <p className="text-xs text-gray-400">Pop.</p>
              <p className="text-sm font-medium text-gray-700">
                {formatPopulation(commune.population)}
              </p>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* ─── Empty state ─── */}
      {communes.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Aucune commune trouvée</p>
          <Link
            href="/communes"
            className="text-sm text-emerald-600 hover:underline mt-2 inline-block"
          >
            Réinitialiser les filtres
          </Link>
        </div>
      )}

      {/* ─── Pagination ─── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {currentPage > 1 && (
            <Link
              href={buildUrl({ page: currentPage - 1 })}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Link>
          )}

          <span className="text-sm text-gray-500 px-3">
            Page {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link
              href={buildUrl({ page: currentPage + 1 })}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
          )}
        </div>
      )}

      {/* ─── CTA NeoFidu ─── */}
      <div className="mt-12 bg-emerald-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-emerald-800 font-medium">
            Vous habitez en Suisse romande ?
          </p>
          <p className="text-sm text-emerald-600">
            Déclaration d&apos;impôts dès CHF 50.— | Comptabilité dès CHF
            500.—/an
          </p>
        </div>
        <Link href="/demande">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap">
            Faire ma demande
          </Button>
        </Link>
      </div>

      {/* ─── Source ─── */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Source : Registre officiel des communes (OFS) via LINDAS — Mis à jour
        automatiquement
      </p>
    </div>
  );
}
