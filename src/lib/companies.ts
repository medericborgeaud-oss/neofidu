import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url, options = {}) => fetch(url, { ...options, cache: 'no-store' }),
  },
});

// ─── Types ───

export interface Company {
  id: string;
  slug: string;
  name: string;
  legal_form: "RI" | "Sarl" | "SA" | "Other";
  canton: string;
  city: string;
  sector: string | null;
  purpose: string | null;
  capital: string | null;
  ide_number: string | null;
  zefix_uid: string | null;
  creation_date: string;
  persons: Person[];
  fosc_history: FoscEntry[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Person {
  name: string;
  role: string;
  initials: string;
}

export interface FoscEntry {
  date: string;
  text: string;
}

export interface CompanyFilters {
  search?: string;
  canton?: string;
  legal_form?: string;
  sector?: string;
  page?: number;
  limit?: number;
}

export interface CompanyStats {
  total: number;
  today: number;
  thisMonth: number;
  byCantonSorted: { canton: string; count: number }[];
  byForm: { RI: number; Sarl: number; SA: number };
}

export interface MonthlyTrend {
  month: string;
  count: number;
}

export interface SectorDistribution {
  sector: string;
  count: number;
}

// ─── Constants ───

export const CANTONS_ROMANDS = ["VD", "GE", "VS", "FR", "NE", "JU"];

export const CANTON_NAMES: Record<string, string> = {
  VD: "Vaud",
  GE: "Genève",
  VS: "Valais",
  FR: "Fribourg",
  NE: "Neuchâtel",
  JU: "Jura",
};

export const FORM_LABELS: Record<string, string> = {
  RI: "RI",
  Sarl: "Sàrl",
  SA: "SA",
};

export const SECTOR_LABELS: Record<string, string> = {
  tech: "Informatique",
  conseil: "Conseil",
  commerce: "Commerce",
  sante: "Santé",
  construction: "Construction",
  restauration: "Restauration & Hôtellerie",
  immobilier: "Immobilier",
  transport: "Transport",
  education: "Éducation",
  finance: "Finance",
  industrie: "Industrie",
  agriculture: "Agriculture",
  art_culture: "Art & Culture",
  nettoyage: "Nettoyage",
  beaute: "Beauté",
  autres: "Autres",
};

// ─── Queries ───

export async function getCompanies(filters: CompanyFilters = {}) {
  const { search, canton, legal_form, sector, page = 1, limit = 20 } = filters;

  const { data, error } = await supabase.rpc("search_companies", {
    search_term: search || "",
    filter_canton: canton || "",
    filter_form: legal_form || "",
    filter_sector: sector || "",
    page_num: page,
    page_size: limit,
  });

  if (error) throw error;

  return {
    companies: (data?.companies as Company[]) || [],
    total: data?.total || 0,
  };
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Company;
}

export async function getStats(): Promise<CompanyStats> {
  const [statsRes, cantonRes, formRes] = await Promise.all([
    supabase.rpc("total_stats"),
    supabase.rpc("count_by_canton"),
    supabase.rpc("count_by_form"),
  ]);

  const stats = (statsRes.data as any) || { total: 0, today: 0, thisMonth: 0 };

  return {
    total: stats.total || 0,
    today: stats.today || 0,
    thisMonth: stats.thisMonth || 0,
    byCantonSorted: (cantonRes.data as any[]) || [],
    byForm: (formRes.data as any) || { RI: 0, Sarl: 0, SA: 0 },
  };
}

export async function getMonthlyTrends(): Promise<MonthlyTrend[]> {
  const { data, error } = await supabase.rpc("monthly_trends");
  if (error) {
    console.error("monthly_trends RPC error:", error);
    return [];
  }
  return (data as MonthlyTrend[]) || [];
}

export async function getSectorDistribution(): Promise<SectorDistribution[]> {
  const { data, error } = await supabase.rpc("count_by_sector");
  if (error) {
    console.error("count_by_sector RPC error:", error);
    return [];
  }
  return (data as SectorDistribution[]) || [];
}

// ─── Similar companies ───

export async function getSimilarCompanies(
  slug: string,
  canton: string,
  city: string,
  sector: string | null,
  limit = 6
): Promise<Pick<Company, "name" | "slug" | "legal_form" | "city">[]> {
  // Priority 1: same sector + same city
  if (sector) {
    const { data } = await supabase
      .from("companies")
      .select("name, slug, legal_form, city")
      .eq("canton", canton)
      .eq("city", city)
      .eq("sector", sector)
      .eq("is_active", true)
      .neq("slug", slug)
      .limit(limit);
    if (data && data.length >= 3) return data;
  }

  // Priority 2: same sector + same canton
  if (sector) {
    const { data } = await supabase
      .from("companies")
      .select("name, slug, legal_form, city")
      .eq("canton", canton)
      .eq("sector", sector)
      .eq("is_active", true)
      .neq("slug", slug)
      .limit(limit);
    if (data && data.length >= 3) return data;
  }

  // Fallback: same city
  const { data } = await supabase
    .from("companies")
    .select("name, slug, legal_form, city")
    .eq("canton", canton)
    .eq("city", city)
    .eq("is_active", true)
    .neq("slug", slug)
    .limit(limit);

  return data || [];
}

// ─── Canton fiscal context ───

export const CANTON_FISCAL: Record<string, {
  tauxEntreprise: string;
  capitalMin: string;
  particularite: string;
}> = {
  VD: {
    tauxEntreprise: "14%",
    capitalMin: "CHF 20'000 (Sàrl) / CHF 100'000 (SA)",
    particularite: "Déduction des frais de garde et formation continue",
  },
  GE: {
    tauxEntreprise: "14%",
    capitalMin: "CHF 20'000 (Sàrl) / CHF 100'000 (SA)",
    particularite: "Statut quasi-résident pour les frontaliers",
  },
  VS: {
    tauxEntreprise: "12%",
    capitalMin: "CHF 20'000 (Sàrl) / CHF 100'000 (SA)",
    particularite: "Un des cantons les plus avantageux fiscalement",
  },
  FR: {
    tauxEntreprise: "14%",
    capitalMin: "CHF 20'000 (Sàrl) / CHF 100'000 (SA)",
    particularite: "Réductions pour les familles avec enfants",
  },
  NE: {
    tauxEntreprise: "13.5%",
    capitalMin: "CHF 20'000 (Sàrl) / CHF 100'000 (SA)",
    particularite: "Baisse progressive de la fiscalité des entreprises",
  },
  JU: {
    tauxEntreprise: "12%",
    capitalMin: "CHF 20'000 (Sàrl) / CHF 100'000 (SA)",
    particularite: "Taux attractif pour les PME",
  },
};

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
