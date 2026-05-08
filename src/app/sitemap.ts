// src/app/sitemap.ts
// Sitemap dynamique avec pages communes + sociétés

import { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-data";
import { createClient } from "@supabase/supabase-js";

const baseUrl = "https://neofidu.ch";
const BATCH_SIZE = 2000;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Create sitemap entry with all required fields
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

// Tell Next.js how many sitemap files to generate
// This creates /sitemap/0.xml, /sitemap/1.xml, etc.
export async function generateSitemaps() {
  const { count } = await supabase
    .from("companies")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);

  const total = count || 0;

  // Sitemap 0 = static pages + communes + first batch of companies
  const numSitemaps = Math.max(1, Math.ceil(total / BATCH_SIZE));

  return Array.from({ length: numSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // ============================================
  // STATIC PAGES + COMMUNES — only in first sitemap (id=0)
  // ============================================
  let staticPages: MetadataRoute.Sitemap = [];
  let communePages: MetadataRoute.Sitemap = [];

  if (id === 0) {
    staticPages = [
      // Homepage
      createEntry("", { lastModified: currentDate, changeFrequency: "weekly", priority: 1.0 }),

      // Tax request form
      createEntry("/demande", { lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 }),
      createEntry("/demande/prolongation", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 }),

      // Contact
      createEntry("/contact", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 }),

      // Pricing
      createEntry("/tarifs", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),

      // Swiss abroad
      createEntry("/suisses-etranger", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),

      // Expats
      createEntry("/expats", { lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 }),

      // Independants
      createEntry("/independants", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),

      // Company creation
      createEntry("/creation-entreprise", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),

      // Property management
      createEntry("/gerance-immobiliere", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),

      // FAQ
      createEntry("/faq", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 }),

      // ── Simulators ──
      createEntry("/simulateur", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
      createEntry("/simulateur/impots", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.95 }),
      createEntry("/simulateur/3eme-pilier", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
      createEntry("/simulateur/valeur-locative", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
      createEntry("/simulateur/gain-immobilier", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),
      createEntry("/simulateur/carte-impots", { lastModified: currentDate, changeFrequency: "weekly", priority: 1.0 }),
      createEntry("/simulateur/salaire-net", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.95 }),
      createEntry("/simulateur/baisse-loyer", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.95 }),
      createEntry("/simulateur/retraite", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.92 }),

      // ── Guides ──
      createEntry("/guide/deductions-fiscales", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }),

      // ── Cantons ──
      createEntry("/cantons", { lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 }),
      ...["vaud", "geneve", "valais", "fribourg", "neuchatel", "jura"].map((canton) =>
        createEntry(`/cantons/${canton}`, { lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 })
      ),

      // ── Blog ──
      createEntry("/blog", { lastModified: currentDate, changeFrequency: "daily", priority: 0.85 }),
      ...blogArticles.map((article) =>
        createEntry(`/blog/${article.slug}`, { lastModified: article.date, changeFrequency: "monthly", priority: 0.7 })
      ),

      // ── Observatoire main page ──
      createEntry("/observatoire", { lastModified: currentDate, changeFrequency: "daily", priority: 0.9 }),

      // ── Communes main page ──
      createEntry("/communes", { lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 }),

      // ── Debt pages ──
      createEntry("/dette-suisse", { lastModified: currentDate, changeFrequency: "daily", priority: 0.8 }),
      createEntry("/swiss-debt", { lastModified: currentDate, changeFrequency: "daily", priority: 0.8 }),

      // ── Legal ──
      createEntry("/conditions-generales", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
      createEntry("/politique-confidentialite", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
      createEntry("/mentions-legales", { lastModified: currentDate, changeFrequency: "yearly", priority: 0.3 }),
    ];

    // ── Commune individual pages (all ~759 in sitemap 0) ──
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
  }

  // ============================================
  // COMPANY PAGES — batched across all sitemaps
  // ============================================
  const start = id * BATCH_SIZE;

  const { data: companies } = await supabase
    .from("companies")
    .select("slug, updated_at")
    .eq("is_active", true)
    .order("slug", { ascending: true })
    .range(start, start + BATCH_SIZE - 1);

  const companyPages: MetadataRoute.Sitemap = (companies || []).map((c) => ({
    url: `${baseUrl}/observatoire/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...communePages, ...companyPages];
}
