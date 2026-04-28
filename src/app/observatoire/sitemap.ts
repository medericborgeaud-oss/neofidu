import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

  return [
    {
      url: "https://neofidu.ch/observatoire",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...companyEntries,
  ];
}
