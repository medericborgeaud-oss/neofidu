import { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-data";

const baseUrl = "https://www.neofidu.ch";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // ============================================
  // STATIC PAGES - Core site pages
  // ============================================
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    createEntry("", {
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    }),

    // Tax request form - critical conversion page
    createEntry("/demande", {
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    }),

    // Contact page
    createEntry("/contact", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    }),

    // Pricing page - high conversion intent
    createEntry("/tarifs", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),

    // Swiss abroad page
    createEntry("/suisses-etranger", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),

    // Expats page - High priority for international SEO
    createEntry("/expats", {
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    }),

    // Independants & Freelances page - High conversion intent
    createEntry("/independants", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),

    // Company creation page - High conversion intent
    createEntry("/creation-entreprise", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),

    // Property management page - High conversion intent
    createEntry("/gerance-immobiliere", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),

    // FAQ
    createEntry("/faq", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  ];

  // ============================================
  // SIMULATORS - High-value tools
  // ============================================
  const simulatorPages: MetadataRoute.Sitemap = [
    createEntry("/simulateur", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),
    createEntry("/simulateur/impots", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.95,
    }),
    createEntry("/simulateur/3eme-pilier", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),
    createEntry("/simulateur/valeur-locative", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),
    createEntry("/simulateur/gain-immobilier", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),
    createEntry("/simulateur/carte-impots", {
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    }),
    createEntry("/simulateur/salaire-net", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.95,
    }),
    createEntry("/simulateur/baisse-loyer", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.95,
    }),
    createEntry("/simulateur-retraite", {
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.92,
  }),
  ];

  // ============================================
  // GUIDES - Educational content
  // ============================================
  const guidePages: MetadataRoute.Sitemap = [
    createEntry("/guide/deductions-fiscales", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }),
  ];

  // ============================================
  // CANTON PAGES - Local SEO targeting
  // ============================================
  const cantons = ["vaud", "geneve", "valais", "fribourg", "neuchatel", "jura"];

  const cantonPages: MetadataRoute.Sitemap = [
    createEntry("/cantons", {
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    }),
    ...cantons.map((canton) =>
      createEntry(`/cantons/${canton}`, {
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.85,
      })
    ),
  ];

  // ============================================
  // BLOG - Main blog page and articles
  // ============================================
  const blogPages: MetadataRoute.Sitemap = [
    createEntry("/blog", {
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    }),
    ...blogArticles.map((article) =>
      createEntry(`/blog/${article.slug}`, {
        lastModified: article.date,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    ),
  ];

  // ============================================
  // LEGAL PAGES - Lower priority
  // ============================================
  const legalPages: MetadataRoute.Sitemap = [
    createEntry("/conditions-generales", {
      lastModified: "2026-02-01",
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    createEntry("/politique-confidentialite", {
      lastModified: "2026-02-01",
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    createEntry("/mentions-legales", {
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    }),
  ];

  // Combine all pages
  return [
    ...staticPages,
    ...simulatorPages,
    ...guidePages,
    ...cantonPages,
    ...blogPages,
    ...legalPages,
  ];
}
