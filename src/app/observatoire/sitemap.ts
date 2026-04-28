import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // Base entry always present
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: "https://neofidu.ch/observatoire",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // If Supabase is not configured, return only base entries
  if (!supabaseUrl || !supabaseAnonKey) {
    return baseEntries;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: companies } = await supabase
      .from("companies")
      .select("slug, updated_at")
      .eq("is_active", true)
      .order("creation_date", { ascending: false });

    const companyEntries = (companies || []).map((c) => ({
      url: `https://neofidu.ch/observatoire/${c.slug}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...baseEntries, ...companyEntries];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return baseEntries;
  }
}
