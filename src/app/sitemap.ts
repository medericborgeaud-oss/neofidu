// src/app/sitemap.ts
// Sitemap dynamique : pages statiques + communes (les fiches entreprises ont été retirées)
export const dynamic = "force-dynamic";
import { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-data";
import { createClient } from "@supabase/supabase-js";

const baseUrl = "https://neofidu.ch";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function createEntry(
  path: string,
  options: {
    lastModified?: string | Date;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
  } = {}
): MetadataRoute.Sitemap[number] {
  const {
    lastModified = new Date(),
    changeFrequency = "monthly",
    priority = 0.5,
  } = options;
  return {
    url: path ? `${baseUrl}${path}` : baseUrl,
    lastModified: typeof lastModified === "string" ? lastModified : lastModified.toISOString(),
    changeFrequency,
    priority,
  };
}

// Single sitemap file (static pages + communes). Companies are no longer listed.
export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    createEntry("", { lastModified: currentDate, changeFrequency: "weekly", priority: 1.0 }),
    createEntry("/demande", { lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 }),
    createEntry("/contact", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 }),
    createEntry("/tarifs", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/suisses-etranger", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/expats", { lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 }),
    createEntry("/independants", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/creation-entreprise", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/entreprises", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/faq", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 }),
    createEntry("/simulateur", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/impots", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.95 }),
    createEntry("/simulateur/3eme-pilier", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/valeur-locative", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/gain-immobilier", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/carte-impots", { lastModified: currentDate, changeFrequency: "weekly", priority: 1.0 }),
    createEntry("/simulateur/salaire-net", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.95 }),
    createEntry("/simulateur/baisse-loyer", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.95 }),
    createEntry("/simulateur/retraite", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.92 }),
    createEntry("/guide/deductions-fiscales", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/cantons", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 }),
    ...["vaud", "geneve", "valais", "fribourg", "neuchatel", "jura"].map((canton) =>
      createEntry(`/cantons/${canton}`, { lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 })
    ),
    createEntry("/blog", { lastModified: currentDate, changeFrequency: "daily", priority: 0.85 }),
    ...blogArticles.map((article) =>
      createEntry(`/blog/${article.slug}`, { lastModified: article.date, changeFrequency: "monthly", priority: 0.7 })
    ),
    createEntry("/observatoire", { lastModified: currentDate, changeFrequency: "daily", priority: 0.9 }),
    createEntry("/communes", { lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 }),
    createEntry("/dette-suisse", { lastModified: currentDate, changeFrequency: "daily", priority: 0.8 }),
    createEntry("/swiss-debt", { lastModified: currentDate, changeFrequency: "daily", priority: 0.8 }),
    createEntry("/conditions-generales", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/politique-confidentialite", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/mentions-legales", { lastModified: currentDate, changeFrequency: "yearly", priority: 0.3 }),
  ];

  // Commune individual pages
  let communePages: MetadataRoute.Sitemap = [];
  try {
    const { data: communes } = await supabase
      .from("communes")
      .select("slug, updated_at")
      .order("slug", { ascending: true });

    communePages = (communes || []).map((c) => ({
      url: `${baseUrl}/communes/${c.slug}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap communes error:", e);
  }

  return [...staticPages, ...communePages];
}
