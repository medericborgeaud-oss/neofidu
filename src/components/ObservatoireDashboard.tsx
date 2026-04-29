"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company, CompanyStats, CompanyFilters, SectorDistribution, CANTON_NAMES, FORM_LABELS, SECTOR_LABELS } from "@/lib/companies";

const CANTONS = ["VD", "GE", "VS", "FR", "NE", "JU"];
const FORMS = ["RI", "Sarl", "SA"];
const SECTORS = [
  { value: "tech", label: "Informatique" },
  { value: "conseil", label: "Conseil" },
  { value: "commerce", label: "Commerce" },
  { value: "sante", label: "Santé" },
  { value: "construction", label: "Construction" },
  { value: "restauration", label: "Restauration" },
  { value: "immobilier", label: "Immobilier" },
];

const BADGE_CLASSES: Record<string, string> = {
  RI: "bg-blue-50 text-blue-700",
  Sarl: "bg-emerald-50 text-emerald-700",
  SA: "bg-amber-50 text-amber-700",
};

const BAR_COLORS: Record<string, string> = {
  VD: "#1D9E75",
  GE: "#5DCAA5",
  VS: "#5DCAA5",
  FR: "#9FE1CB",
  NE: "#9FE1CB",
  JU: "#E1F5EE",
};

const SECTOR_COLORS: Record<string, string> = {
  tech: "#1D9E75",
  conseil: "#5DCAA5",
  commerce: "#9FE1CB",
  sante: "#3B82F6",
  construction: "#F59E0B",
  restauration: "#EF4444",
  immobilier: "#8B5CF6",
};

interface Props {
  companies: Company[];
  total: number;
  stats: CompanyStats;
  initialFilters: CompanyFilters;
  sectorDistribution: SectorDistribution[];
}

export function ObservatoireDashboard({ companies, total, stats, initialFilters, sectorDistribution }: Props) {
  const [search, setSearch] = useState(initialFilters.search || "");
  const [canton, setCanton] = useState(initialFilters.canton || "");
  const [form, setForm] = useState(initialFilters.legal_form || "");
  const [sector, setSector] = useState(initialFilters.sector || "");

  const hasFilters = search || canton || form || sector;

  function buildUrl(overrides: Partial<CompanyFilters> = {}) {
    const params = new URLSearchParams();
    const s = overrides.search ?? search;
    const c = overrides.canton ?? canton;
    const f = overrides.legal_form ?? form;
    const sec = overrides.sector ?? sector;
    if (s) params.set("q", s);
    if (c) params.set("canton", c);
    if (f) params.set("forme", f);
    if (sec) params.set("secteur", sec);
    const qs = params.toString();
    return `/observatoire${qs ? `?${qs}` : ""}`;
  }

  function clearFilter(key: string) {
    if (key === "search") setSearch("");
    if (key === "canton") setCanton("");
    if (key === "form") setForm("");
    if (key === "sector") setSector("");
    const overrides: any = {};
    overrides[key === "form" ? "legal_form" : key] = "";
    window.location.href = buildUrl(overrides);
  }

  function applyFilters() {
    window.location.href = buildUrl();
  }

  const maxCanton = stats.byCantonSorted.length > 0 ? stats.byCantonSorted[0].count : 1;
  const totalSectors = sectorDistribution.reduce((a, b) => a + b.count, 0);
  const currentPage = initialFilters.page || 1;
  const totalPages = Math.ceil(total / 20);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Header + Search ─── */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Observatoire romand des entreprises
          </h1>
          <p className="text-gray-500 text-sm">
            {stats.total.toLocaleString("fr-CH")} entreprises actives en Suisse romande
          </p>
        </div>

        {/* Search bar */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                placeholder="Rechercher une entreprise..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <select
              value={canton}
              onChange={(e) => setCanton(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="">Canton</option>
              {CANTONS.map((c) => (
                <option key={c} value={c}>{CANTON_NAMES[c]}</option>
              ))}
            </select>
            <select
              value={form}
              onChange={(e) => setForm(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="">Forme</option>
              {FORMS.map((f) => (
                <option key={f} value={f}>{FORM_LABELS[f]}</option>
              ))}
            </select>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="">Secteur</option>
              {SECTORS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <Button
              onClick={applyFilters}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
            >
              Rechercher
            </Button>
          </div>
        </div>

        {/* Active filter pills */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {canton && (
              <button onClick={() => clearFilter("canton")} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                {CANTON_NAMES[canton]} <X className="w-3 h-3" />
              </button>
            )}
            {form && (
              <button onClick={() => clearFilter("form")} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                {FORM_LABELS[form]} <X className="w-3 h-3" />
              </button>
            )}
            {sector && (
              <button onClick={() => clearFilter("sector")} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                {SECTORS.find((s) => s.value === sector)?.label} <X className="w-3 h-3" />
              </button>
            )}
            {search && (
              <button onClick={() => clearFilter("search")} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                &quot;{search}&quot; <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* ─── Main layout: Results + Sidebar ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: Company list (3/5) */}
          <div className="lg:col-span-3">
            <p className="text-sm font-medium text-gray-900 mb-3">
              {hasFilters ? (
                <>{total.toLocaleString("fr-CH")} résultats</>
              ) : (
                <>Dernières entreprises enregistrées</>
              )}
            </p>

            {companies.length === 0 && hasFilters ? (
              <div className="text-center py-16 border border-dashed border-gray-200 rounded-lg">
                <Building2 className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm mb-2">Aucun résultat pour ces filtres.</p>
                <Link href="/observatoire" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Effacer les filtres
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {companies.map((c) => (
                  <Link key={c.id} href={`/observatoire/${c.slug}`}>
                    <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-emerald-300 transition-colors cursor-pointer">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            c.legal_form === "SA" ? "#9FE1CB" : c.legal_form === "Sarl" ? "#5DCAA5" : "#1D9E75",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {c.name}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${BADGE_CLASSES[c.legal_form] || "bg-gray-100 text-gray-600"}`}>
                            {FORM_LABELS[c.legal_form] || c.legal_form}
                          </span>
                          {c.sector && (
                            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                              {SECTOR_LABELS[c.sector] || c.sector}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {c.purpose?.split(",")[0] || ""} — {c.city}, {c.canton}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {currentPage > 1 && (
                  <Link
                    href={buildUrl() + (buildUrl().includes("?") ? "&" : "?") + `page=${currentPage - 1}`}
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Précédent
                  </Link>
                )}
                <span className="text-sm text-gray-500">
                  Page {currentPage} sur {totalPages.toLocaleString("fr-CH")}
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={buildUrl() + (buildUrl().includes("?") ? "&" : "?") + `page=${currentPage + 1}`}
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Suivant
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right: Sidebar (2/5) */}
          <div className="lg:col-span-2 space-y-4">

            {/* Canton ranking */}
            <div className="border border-gray-100 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Par canton</h3>
              <div className="space-y-2">
                {stats.byCantonSorted.slice(0, 6).map(({ canton: c, count }) => {
                  const pct = Math.round((count / maxCanton) * 100);
                  return (
                    <Link key={c} href={buildUrl({ canton: c })} className="flex items-center gap-2 group">
                      <span className="text-xs text-gray-500 w-7 text-right font-medium">{c}</span>
                      <div className="flex-1 h-5 bg-gray-50 rounded overflow-hidden">
                        <div
                          className="h-full rounded flex items-center pl-2 transition-all group-hover:opacity-80"
                          style={{ width: `${Math.max(pct, 8)}%`, backgroundColor: BAR_COLORS[c] || "#9FE1CB" }}
                        >
                          <span className="text-xs font-medium text-white">
                            {count.toLocaleString("fr-CH")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sector distribution */}
            {sectorDistribution.length > 0 && (
              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Par secteur</h3>
                  <span className="text-xs text-gray-400">{totalSectors.toLocaleString("fr-CH")} classifiées</span>
                </div>
                <div className="space-y-2">
                  {sectorDistribution.slice(0, 7).map(({ sector: s, count }) => {
                    const maxSector = sectorDistribution[0]?.count || 1;
                    const barWidth = Math.max((count / maxSector) * 100, 8);
                    const sectorLabel = SECTOR_LABELS[s] || s;
                    return (
                      <Link
                        key={s}
                        href={buildUrl({ sector: s })}
                        className="flex items-center gap-2 group"
                      >
                        <span className="text-xs text-gray-600 w-24 text-right truncate">{sectorLabel}</span>
                        <div className="flex-1 h-5 bg-gray-50 rounded overflow-hidden">
                          <div
                            className="h-full rounded flex items-center px-2 transition-all group-hover:opacity-80"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: SECTOR_COLORS[s] || "#9FE1CB",
                            }}
                          >
                            <span className="text-[11px] font-medium text-white whitespace-nowrap">
                              {count.toLocaleString("fr-CH")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center space-y-3 pt-8 mt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Données Zefix / FOSC &middot; Classification IA par secteur &middot; Propulsé par{" "}
            <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
              NeoFidu
            </Link>
          </p>
          <Link href="/demande">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Vous créez votre entreprise ? On s&apos;occupe de tout dès CHF 500.-
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
