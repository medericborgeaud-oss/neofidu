import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// âââ NEW: Monthly trend data âââ
export interface MonthlyTrend {
  month: string; // "2026-01", "2026-02", etc.
  label: string; // "Jan", "FÃ©v", etc.
  total: number;
  byForm: { RI: number; Sarl: number; SA: number };
}

export interface SectorDistribution {
  sector: string;
  label: string;
  count: number;
  percentage: number;
}

const CANTONS_ROMANDS = ["VD", "GE", "VS", "FR", "NE", "JU"];
const CANTON_NAMES: Record<string, string> = {
  VD: "Vaud",
  GE: "GenÃ¨ve",
  VS: "Valais",
  FR: "Fribourg",
  NE: "NeuchÃ¢tel",
  JU: "Jura",
};
const FORM_LABELS: Record<string, string> = {
  RI: "RI",
  Sarl: "SÃ rl",
  SA: "SA",
};

const SECTOR_LABELS: Record<string, string> = {
  tech: "Informatique",
  conseil: "Conseil",
  commerce: "Commerce",
  sante: "SantÃ©",
  construction: "Construction",
  restauration: "Restauration",
  immobilier: "Immobilier",
};

const MONTH_NAMES = ["Jan", "FÃ©v", "Mar", "Avr", "Mai", "Juin", "Juil", "AoÃ»t", "Sep", "Oct", "Nov", "DÃ©c"];

export { CANTONS_ROMANDS, CANTON_NAMES, FORM_LABELS, SECTOR_LABELS, MONTH_NAMES };

export async function getCompanies(filters: CompanyFilters = {}) {
  const { search, canton, legal_form, sector, page = 1, limit = 20 } = filters;

  let query = supabase
    .from("companies")
    .select("*", { count: "exact" })
    .eq("is_active", true)
    .order("creation_date", { ascending: false });

  if (canton) query = query.eq("canton", canton);
  if (legal_form) query = query.eq("legal_form", legal_form);
  if (sector) query = query.eq("sector", sector);
  if (search) query = query.ilike("name", `%${search}%`);

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { companies: (data as Company[]) || [], total: count || 0 };
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
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [totalRes, todayRes, monthRes, cantonRes, formRes] = await Promise.all([
    supabase.from("companies").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("companies").select("*", { count: "exact", head: true }).eq("is_active", true).gte("created_at", startOfDay),
    supabase.from("companies").select("*", { count: "exact", head: true }).eq("is_active", true).gte("created_at", startOfMonth),
    supabase.rpc("count_by_canton"),
    supabase.rpc("count_by_form"),
  ]);

  return {
    total: totalRes.count || 0,
    today: todayRes.count || 0,
    thisMonth: monthRes.count || 0,
    byCantonSorted: (cantonRes.data as any[]) || [],
    byForm: (formRes.data as any) || { RI: 0, Sarl: 0, SA: 0 },
  };
}

// âââ NEW: Get monthly creation trends (last 12 months) âââ
export async function getMonthlyTrends(): Promise<MonthlyTrend[]> {
  const now = new Date();
  const trends: MonthlyTrend[] = [];

  // Build last 12 months
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
    const startDate = `${monthStr}-01`;
    const endD = new Date(year, month + 1, 0);
    const endDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(endD.getDate()).padStart(2, "0")}`;

    trends.push({
      month: monthStr,
      label: `${MONTH_NAMES[month]} ${year !== now.getFullYear() ? year : ""}`.trim(),
      total: 0,
      byForm: { RI: 0, Sarl: 0, SA: 0 },
    });
  }

  // Fetch all companies from last 12 months in one query
  const startMonth = trends[0].month;
  const { data, error } = await supabase
    .from("companies")
    .select("creation_date, legal_form")
    .eq("is_active", true)
    .gte("creation_date", `${startMonth}-01`)
    .order("creation_date", { ascending: true });

  if (error || !data) return trends;

  // Aggregate
  for (const row of data) {
    const dateMonth = row.creation_date?.substring(0, 7); // "2026-01"
    const trend = trends.find((t) => t.month === dateMonth);
    if (trend) {
      trend.total++;
      if (row.legal_form === "RI") trend.byForm.RI++;
      else if (row.legal_form === "Sarl") trend.byForm.Sarl++;
      else if (row.legal_form === "SA") trend.byForm.SA++;
    }
  }

  return trends;
}

// âââ NEW: Get sector distribution âââ
export async function getSectorDistribution(): Promise<SectorDistribution[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("sector")
    .eq("is_active", true)
    .not("sector", "is", null);

  if (error || !data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    if (row.sector) {
      counts[row.sector] = (counts[row.sector] || 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return Object.entries(counts)
    .map(([sector, count]) => ({
      sector,
      label: SECTOR_LABELS[sector] || sector,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
