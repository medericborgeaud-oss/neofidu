import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase credentials not configured");
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

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

const CANTONS_ROMANDS = ["VD", "GE", "VS", "FR", "NE", "JU"];
const CANTON_NAMES: Record<string, string> = {
  VD: "Vaud",
  GE: "Gen\u00e8ve",
  VS: "Valais",
  FR: "Fribourg",
  NE: "Neuch\u00e2tel",
  JU: "Jura",
};
const FORM_LABELS: Record<string, string> = {
  RI: "RI",
  Sarl: "S\u00e0rl",
  SA: "SA",
};

export { CANTONS_ROMANDS, CANTON_NAMES, FORM_LABELS };

export async function getCompanies(filters: CompanyFilters = {}) {
  try {
    const supabase = getSupabase();
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
    if (error) {
      console.error("getCompanies error:", error);
      return { companies: [] as Company[], total: 0 };
    }
    return { companies: (data as Company[]) || [], total: count || 0 };
  } catch (error) {
    console.error("getCompanies error:", error);
    return { companies: [] as Company[], total: 0 };
  }
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data as Company;
  } catch {
    return null;
  }
}

export async function getStats(): Promise<CompanyStats> {
  try {
    const supabase = getSupabase();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [totalRes, todayRes, monthRes] = await Promise.all([
      supabase.from("companies").select("*", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("companies").select("*", { count: "exact", head: true }).eq("is_active", true).gte("created_at", startOfDay),
      supabase.from("companies").select("*", { count: "exact", head: true }).eq("is_active", true).gte("created_at", startOfMonth),
    ]);

    // Canton stats via RPC (fallback to empty if function doesn't exist yet)
    let byCantonSorted: { canton: string; count: number }[] = [];
    try {
      const cantonRes = await supabase.rpc("count_by_canton");
      if (cantonRes.data) byCantonSorted = cantonRes.data;
    } catch {
      console.warn("count_by_canton RPC not available yet");
    }

    // Form stats via RPC (fallback to empty if function doesn't exist yet)
    let byForm = { RI: 0, Sarl: 0, SA: 0 };
    try {
      const formRes = await supabase.rpc("count_by_form");
      if (formRes.data) byForm = formRes.data;
    } catch {
      console.warn("count_by_form RPC not available yet");
    }

    return {
      total: totalRes.count || 0,
      today: todayRes.count || 0,
      thisMonth: monthRes.count || 0,
      byCantonSorted,
      byForm,
    };
  } catch (error) {
    console.error("getStats error:", error);
    return {
      total: 0,
      today: 0,
      thisMonth: 0,
      byCantonSorted: [],
      byForm: { RI: 0, Sarl: 0, SA: 0 },
    };
  }
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
