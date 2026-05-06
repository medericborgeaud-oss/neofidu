// src/lib/communes.ts
// Data layer pour l'annuaire des communes romandes

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ───

export interface Commune {
  id: string;
  code_ofs: number;
  slug: string;
  nom: string;
  canton: string;
  district: string | null;
  taux_commune: number | null;
  taux_canton: number | null;
  taux_eglise: number | null;
  annee_fiscale: number | null;
  population: number | null;
  densite: number | null;
  superficie_km2: number | null;
  part_etrangers: number | null;
  nb_entreprises: number | null;
  secteur_dominant: string | null;
  loyer_median_m2: number | null;
  prix_achat_m2: number | null;
  code_postal: number | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface CommuneFilters {
  search?: string;
  canton?: string;
  page?: number;
  limit?: number;
}

export interface CommunesStats {
  total: number;
  by_canton: { canton: string; count: number; total_population: number; taux_moyen: number | null }[];
  taux_min: { nom: string; canton: string; taux: number } | null;
  taux_max: { nom: string; canton: string; taux: number } | null;
  plus_grande: { nom: string; canton: string; population: number } | null;
  plus_petite: { nom: string; canton: string; population: number } | null;
}

// ─── Constantes ───

export const CANTONS_ROMANDS = ["VD", "GE", "VS", "FR", "NE", "JU"];

export const CANTON_NAMES: Record<string, string> = {
  VD: "Vaud",
  GE: "Genève",
  VS: "Valais",
  FR: "Fribourg",
  NE: "Neuchâtel",
  JU: "Jura",
};

export const CANTON_COLORS: Record<string, string> = {
  VD: "#1D9E75",
  GE: "#5DCAA5",
  VS: "#5DCAA5",
  FR: "#9FE1CB",
  NE: "#9FE1CB",
  JU: "#E1F5EE",
};

// ─── Queries ───

export async function getCommunes(filters: CommuneFilters = {}) {
  const { search, canton, page = 1, limit = 20 } = filters;

  let query = supabase
    .from("communes")
    .select("*", { count: "exact" })
    .order("population", { ascending: false, nullsFirst: false });

  if (canton) query = query.eq("canton", canton);
  if (search) query = query.ilike("nom", `%${search}%`);

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { communes: (data as Commune[]) || [], total: count || 0 };
}

export async function getCommuneBySlug(slug: string): Promise<Commune | null> {
  const { data, error } = await supabase
    .from("communes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Commune;
}

export async function getCommunesStats(): Promise<CommunesStats> {
  const { data, error } = await supabase.rpc("communes_stats");

  if (error) {
    console.error("[communes] Stats RPC error:", error);
    return {
      total: 0,
      by_canton: [],
      taux_min: null,
      taux_max: null,
      plus_grande: null,
      plus_petite: null,
    };
  }

  return data as CommunesStats;
}

export async function getCommunesVoisines(slug: string): Promise<Commune[]> {
  const { data, error } = await supabase.rpc("communes_voisines", {
    commune_slug: slug,
    max_results: 6,
  });

  if (error) {
    console.error("[communes] Voisines RPC error:", error);
    return [];
  }

  return (data as Commune[]) || [];
}

// ─── Helpers ───

export function formatPopulation(pop: number | null): string {
  if (!pop) return "—";
  if (pop >= 1000) return `${(pop / 1000).toFixed(1).replace(".0", "")}k`;
  return pop.toString();
}

export function formatTaux(taux: number | null): string {
  if (taux === null || taux === undefined) return "—";
  return `${taux.toFixed(1)}`;
}

export function formatDensite(densite: number | null): string {
  if (!densite) return "—";
  return `${Math.round(densite)} hab/km²`;
}
