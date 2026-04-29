"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, CreditCard, TrendingUp, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Company, CompanyStats, CompanyFilters, MonthlyTrend, SectorDistribution, CANTON_NAMES, FORM_LABELS, SECTOR_LABELS } from "@/lib/companies";

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
  monthlyTrends: MonthlyTrend[];
  sectorDistribution: SectorDistribution[];
}

export function ObservatoireDashboard({ companies, total, stats, initialFilters, monthlyTrends, sectorDistribution }: Props) {
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

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `il y a ${days}j`;
  }

  const maxCanton = stats.byCantonSorted.length > 0 ? stats.byCantonSorted[0].count : 1;
  const maxTrend = Math.max(...monthlyTrends.map((t) => t.total), 1);
  const totalSectors = sectorDistribution.reduce((a, b) => a + b.count, 0);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Observatoire romand des entreprises
          </h1>
          <p className="text-gray-500">
            Toutes les créations d&apos;entreprises en Suisse romande, en temps réel
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            VD &middot; GE &middot; VS &middot; FR &middot; NE &middot; JU
          </p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Créations 2026</p>
            <p className="text-2xl font-semibold text-emerald-600">
              {stats.total.toLocaleString("fr-CH")}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Résultats</p>
            <p className="text-2xl font-semibold text-gray-900">
              {total.toLocaleString("fr-CH")}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
<p className="text-xs text-gray-500 mb-1">Ce mois</p>
<p className="text-2xl font-semibold text-gray-900">{stats.thisMonth.toLocaleString("fr-CH")}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Canton #1</p>
            <p className="text-lg font-semibold text-gray-900">
              {stats.byCantonSorted[0]?.canton || "-"}
            </p>
            <p className="text-xs text-emerald-600">
              {stats.byCantonSorted[0]?.count.toLocaleString("fr-CH") || ""}
            </p>
          </div>
        </div>

        {/* âââ NEW: Monthly trends chart âââ */}
        {monthlyTrends.some((t) => t.total > 0) && (
          <Card className="p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-medium text-gray-900">Tendance des créations (12 derniers mois)</h3>
            </div>
            <div className="flex items-end gap-1 h-40">
              {monthlyTrends.map((t) => {
                const height = Math.max((t.total / maxTrend) * 100, 2);
                const riPct = t.total > 0 ? (t.byForm.RI / t.total) * 100 : 0;
                const sarlPct = t.total > 0 ? (t.byForm.Sarl / t.total) * 100 : 0;
                return (
                  <div key={t.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500 font-medium">{t.total || ""}</span>
                    <div
                      className="w-full rounded-t-sm overflow-hidden relative"
                      style={{ height: `${height}%` }}
                      title={`${t.label}: ${t.total} créations (RI: ${t.byForm.RI}, Sàrl: ${t.byForm.Sarl}, SA: ${t.byForm.SA})`}
                    >
                      {/* Stacked bar: RI (dark) + Sàrl (medium) + SA (light) */}
                      <div className="absolute inset-0 flex flex-col">
                        <div style={{ height: `${riPct}%`, backgroundColor: "#1D9E75" }} />
                        <div style={{ height: `${sarlPct}%`, backgroundColor: "#5DCAA5" }} />
                        <div className="flex-1" style={{ backgroundColor: "#9FE1CB" }} />
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{t.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#1D9E75" }} />
                RI
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#5DCAA5" }} />
                Sàrl
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#9FE1CB" }} />
                SA
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder="Rechercher par nom, secteur, mot-clé..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>
          <select
            value={canton}
            onChange={(e) => { setCanton(e.target.value); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            <option value="">Tous les cantons</option>
            {CANTONS.map((c) => (
              <option key={c} value={c}>{CANTON_NAMES[c]}</option>
            ))}
          </select>
          <select
            value={form}
            onChange={(e) => { setForm(e.target.value); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            <option value="">Toutes formes</option>
            {FORMS.map((f) => (
              <option key={f} value={f}>{FORM_LABELS[f]}</option>
            ))}
          </select>
          <select
            value={sector}
            onChange={(e) => { setSector(e.target.value); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            <option value="">Tous secteurs</option>
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <Button
            onClick={applyFilters}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Rechercher
          </Button>
        </div>

        {/* Active filter pills */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Charts row: cantons + forms + sectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Canton ranking */}
          <Card className="p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Classement des cantons</h3>
            <div className="space-y-2">
              {stats.byCantonSorted.slice(0, 6).map(({ canton: c, count }) => {
                const pct = Math.round((count / maxCanton) * 100);
                return (
                  <Link key={c} href={buildUrl({ canton: c })} className="flex items-center gap-2 group">
                    <span className="text-xs text-gray-500 w-7 text-right">{c}</span>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                      <div
                        className="h-full rounded flex items-center pl-2 transition-all"
                        style={{ width: `${pct}%`, backgroundColor: BAR_COLORS[c] || "#9FE1CB" }}
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
          </Card>

          {/* Form distribution */}
          <Card className="p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Formes juridiques</h3>
            <div className="flex items-center gap-6">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" fill="none" stroke="#f3f4f6" strokeWidth={18} />
                {(() => {
                  const t = stats.byForm.RI + stats.byForm.Sarl + stats.byForm.SA || 1;
                  const circ = 2 * Math.PI * 48;
                  const riArc = (stats.byForm.RI / t) * circ;
                  const sarlArc = (stats.byForm.Sarl / t) * circ;
                  const saArc = (stats.byForm.SA / t) * circ;
                  return (
                    <>
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#1D9E75" strokeWidth={18} strokeDasharray={`${riArc} ${circ - riArc}`} transform="rotate(-90 60 60)" />
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#5DCAA5" strokeWidth={18} strokeDasharray={`${sarlArc} ${circ - sarlArc}`} strokeDashoffset={-riArc} transform="rotate(-90 60 60)" />
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#9FE1CB" strokeWidth={18} strokeDasharray={`${saArc} ${circ - saArc}`} strokeDashoffset={-(riArc + sarlArc)} transform="rotate(-90 60 60)" />
                    </>
                  );
                })()}
                <text x="60" y="56" textAnchor="middle" fontSize="18" fontWeight="500" fill="currentColor">
                  {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
                </text>
                <text x="60" y="72" textAnchor="middle" fontSize="11" fill="#9ca3af">total</text>
              </svg>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-600" />
                  RI — {stats.byForm.RI ? Math.round((stats.byForm.RI / (stats.byForm.RI + stats.byForm.Sarl + stats.byForm.SA)) * 100) : 0}%
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-400" />
                  Sàrl — {stats.byForm.Sarl ? Math.round((stats.byForm.Sarl / (stats.byForm.RI + stats.byForm.Sarl + stats.byForm.SA)) * 100) : 0}%
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-200" />
                  SA — {stats.byForm.SA ? Math.round((stats.byForm.SA / (stats.byForm.RI + stats.byForm.Sarl + stats.byForm.SA)) * 100) : 0}%
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* âââ NEW: Sector distribution âââ */}
        {sectorDistribution.length > 0 && (
          <Card className="p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-medium text-gray-900">Répartition par secteur d&apos;activité</h3>
              <span className="text-xs text-gray-400 ml-auto">{totalSectors} entreprises classifiées</span>
            </div>
            <div className="space-y-2.5">
              {sectorDistribution.map(({ sector: s, label, count, percentage }) => {
                const maxSector = sectorDistribution[0]?.count || 1;
                const barWidth = Math.max((count / maxSector) * 100, 3);
                return (
                  <Link
                    key={s}
                    href={buildUrl({ sector: s })}
                    className="flex items-center gap-3 group"
                  >
                    <span className="text-xs text-gray-600 w-24 text-right truncate">{label}</span>
                    <div className="flex-1 h-6 bg-gray-50 rounded overflow-hidden">
                      <div
                        className="h-full rounded flex items-center px-2 transition-all group-hover:opacity-80"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: SECTOR_COLORS[s] || "#9FE1CB",
                        }}
                      >
                        <span className="text-xs font-medium text-white">
                          {count.toLocaleString("fr-CH")}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 w-10 text-right">{percentage}%</span>
                  </Link>
                );
              })}
            </div>
          </Card>
        )}

        {/* Results count */}
        <p className="text-sm font-medium text-gray-900 mb-4">
          {total.toLocaleString("fr-CH")} entreprises
        </p>

        {/* Company feed */}
        {companies.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            Aucun résultat pour ces filtres.
          </p>
        ) : (
          <div className="space-y-2 mb-8">
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
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${BADGE_CLASSES[c.legal_form] || ""}`}>
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
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {timeAgo(c.created_at)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center space-y-4 pt-4 border-t">
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
