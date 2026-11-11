// src/app/sitemap.ts
// Sitemap dynamique : pages statiques + communes (les fiches entreprises ont été retirées)
export const dynamic = "force-dynamic";
import { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-data";
import { vaudtaxGuide } from "@/lib/guides/vaudtax";
import { getaxGuide } from "@/lib/guides/getax";
import { vstaxGuide } from "@/lib/guides/vstax";
import { fritaxGuide } from "@/lib/guides/fritax";
import { jurataxGuide } from "@/lib/guides/juratax";
import { createClient } from "@supabase/supabase-js";
import { isCommuneFusionnee } from "@/lib/communes-fusionnees";
import PAGE_DATES from "@/data/page-dates.json";


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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dates reelles de derniere modification (derniere modification du code de chaque page,
  // calculee depuis l'historique git dans src/data/page-dates.json) au lieu de la date du jour.
  const pageDate = (route: string) => (PAGE_DATES as Record<string, string>)[route] ?? "2026-11-10";
  const latestArticleDate = blogArticles.map((a) => a.date).sort().slice(-1)[0] ?? "2026-11-10";

  const staticPages: MetadataRoute.Sitemap = [
    createEntry("", { lastModified: pageDate(""), changeFrequency: "weekly", priority: 1.0 }),
    createEntry("/demande", { lastModified: pageDate("/demande"), changeFrequency: "weekly", priority: 0.95 }),
    createEntry("/en/demande", { lastModified: pageDate("/en/demande"), changeFrequency: "weekly", priority: 0.9 }),
    createEntry("/contact", { lastModified: pageDate("/contact"), changeFrequency: "monthly", priority: 0.6 }),
    createEntry("/en/contact", { lastModified: pageDate("/en/contact"), changeFrequency: "monthly", priority: 0.6 }),
    createEntry("/tarifs", { lastModified: pageDate("/tarifs"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/suisses-etranger", { lastModified: pageDate("/suisses-etranger"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/associations-fondations", { lastModified: pageDate("/associations-fondations"), changeFrequency: "monthly", priority: 0.85 }),
    createEntry("/suisses-de-letranger/canada", { lastModified: pageDate("/suisses-de-letranger/canada"), changeFrequency: "monthly", priority: 0.7 }),
    createEntry("/suisses-de-letranger/france", { lastModified: pageDate("/suisses-de-letranger/france"), changeFrequency: "monthly", priority: 0.7 }),
    createEntry("/en/expats", { lastModified: pageDate("/en/expats"), changeFrequency: "weekly", priority: 0.95 }),
    createEntry("/independants", { lastModified: pageDate("/independants"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/creation-entreprise", { lastModified: pageDate("/creation-entreprise"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/entreprises", { lastModified: pageDate("/entreprises"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/faq", { lastModified: pageDate("/faq"), changeFrequency: "monthly", priority: 0.7 }),
    createEntry("/simulateur", { lastModified: pageDate("/simulateur"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/impots", { lastModified: pageDate("/simulateur/impots"), changeFrequency: "monthly", priority: 0.95 }),
    createEntry("/en/simulateur/impots", { lastModified: pageDate("/en/simulateur/impots"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/3eme-pilier", { lastModified: pageDate("/simulateur/3eme-pilier"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/simulateur/3eme-pilier", { lastModified: pageDate("/en/simulateur/3eme-pilier"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/valeur-locative", { lastModified: pageDate("/simulateur/valeur-locative"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/simulateur/valeur-locative", { lastModified: pageDate("/en/simulateur/valeur-locative"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/gain-immobilier", { lastModified: pageDate("/simulateur/gain-immobilier"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/simulateur/gain-immobilier", { lastModified: pageDate("/en/simulateur/gain-immobilier"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/carte-impots", { lastModified: pageDate("/simulateur/carte-impots"), changeFrequency: "weekly", priority: 1.0 }),
    createEntry("/simulateur/salaire-net", { lastModified: pageDate("/simulateur/salaire-net"), changeFrequency: "monthly", priority: 0.95 }),
    createEntry("/en/simulateur/salaire-net", { lastModified: pageDate("/en/simulateur/salaire-net"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/baisse-loyer", { lastModified: pageDate("/simulateur/baisse-loyer"), changeFrequency: "monthly", priority: 0.95 }),
    createEntry("/en/simulateur/baisse-loyer", { lastModified: pageDate("/en/simulateur/baisse-loyer"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/simulateur/retraite", { lastModified: pageDate("/simulateur/retraite"), changeFrequency: "monthly", priority: 0.92 }),
    createEntry("/en/simulateur/retraite", { lastModified: pageDate("/en/simulateur/retraite"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/guide/deductions-fiscales", { lastModified: pageDate("/guide/deductions-fiscales"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/guide/deductions-fiscales", { lastModified: pageDate("/en/guide/deductions-fiscales"), changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/guide/vaudtax", { lastModified: vaudtaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/guide/vaudtax", { lastModified: vaudtaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.85 }),
    ...vaudtaxGuide.chapters.flatMap((c) => [
      createEntry(`/guide/vaudtax/${c.slug}`, { lastModified: vaudtaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.8 }),
      createEntry(`/en/guide/vaudtax/${c.slug}`, { lastModified: vaudtaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.75 }),
    ]),
    createEntry("/guide/getax", { lastModified: getaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/guide/getax", { lastModified: getaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.85 }),
    ...getaxGuide.chapters.flatMap((c) => [
      createEntry(`/guide/getax/${c.slug}`, { lastModified: getaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.8 }),
      createEntry(`/en/guide/getax/${c.slug}`, { lastModified: getaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.75 }),
    ]),
    createEntry("/guide/vstax", { lastModified: vstaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/guide/vstax", { lastModified: vstaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.85 }),
    ...vstaxGuide.chapters.flatMap((c) => [
      createEntry(`/guide/vstax/${c.slug}`, { lastModified: vstaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.8 }),
      createEntry(`/en/guide/vstax/${c.slug}`, { lastModified: vstaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.75 }),
    ]),
    createEntry("/guide/fritax", { lastModified: fritaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/guide/fritax", { lastModified: fritaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.85 }),
    ...fritaxGuide.chapters.flatMap((c) => [
      createEntry(`/guide/fritax/${c.slug}`, { lastModified: fritaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.8 }),
      createEntry(`/en/guide/fritax/${c.slug}`, { lastModified: fritaxGuide.updatedAt, changeFrequency: "monthly", priority: 0.75 }),
    ]),
    createEntry("/guide/juratax", { lastModified: jurataxGuide.updatedAt, changeFrequency: "monthly", priority: 0.9 }),
    createEntry("/en/guide/juratax", { lastModified: jurataxGuide.updatedAt, changeFrequency: "monthly", priority: 0.85 }),
    ...jurataxGuide.chapters.flatMap((c) => [
      createEntry(`/guide/juratax/${c.slug}`, { lastModified: jurataxGuide.updatedAt, changeFrequency: "monthly", priority: 0.8 }),
      createEntry(`/en/guide/juratax/${c.slug}`, { lastModified: jurataxGuide.updatedAt, changeFrequency: "monthly", priority: 0.75 }),
    ]),
    createEntry("/cantons", { lastModified: pageDate("/cantons"), changeFrequency: "monthly", priority: 0.85 }),
    ...["vaud", "geneve", "valais", "fribourg", "neuchatel", "jura"].map((canton) =>
      createEntry(`/cantons/${canton}`, { lastModified: pageDate(`/cantons/${canton}`), changeFrequency: "monthly", priority: 0.85 })
    ),
    createEntry("/blog", { lastModified: latestArticleDate, changeFrequency: "daily", priority: 0.85 }),
    ...blogArticles.map((article) =>
      createEntry(`/blog/${article.slug}`, { lastModified: article.date, changeFrequency: "monthly", priority: 0.7 })
    ),
    createEntry("/observatoire", { lastModified: pageDate("/observatoire"), changeFrequency: "daily", priority: 0.9 }),
    createEntry("/en/observatoire", { lastModified: pageDate("/en/observatoire"), changeFrequency: "daily", priority: 0.85 }),
    createEntry("/connecteur-ia", { lastModified: "2026-11-10", changeFrequency: "monthly", priority: 0.8 }),
    createEntry("/en/connecteur-ia", { lastModified: "2026-11-10", changeFrequency: "monthly", priority: 0.75 }),
    createEntry("/barometre-fiscal", { lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.95 }),
    createEntry("/en/barometre-fiscal", { lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.9 }),
    createEntry("/barometre-fiscal/entreprises", { lastModified: "2026-11-11", changeFrequency: "yearly", priority: 0.95 }),
    createEntry("/en/barometre-fiscal/entreprises", { lastModified: "2026-11-11", changeFrequency: "yearly", priority: 0.9 }),
    createEntry("/communes", { lastModified: pageDate("/communes"), changeFrequency: "weekly", priority: 0.9 }),
    createEntry("/en/communes", { lastModified: pageDate("/en/communes"), changeFrequency: "weekly", priority: 0.85 }),
    createEntry("/dette-suisse", { lastModified: pageDate("/dette-suisse"), changeFrequency: "daily", priority: 0.8 }),
    createEntry("/en/swiss-debt", { lastModified: pageDate("/en/swiss-debt"), changeFrequency: "daily", priority: 0.8 }),
    createEntry("/conditions-generales", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/politique-confidentialite", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/mentions-legales", { lastModified: pageDate("/mentions-legales"), changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/en/mentions-legales", { lastModified: pageDate("/en/mentions-legales"), changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/en/conditions-generales", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/en/politique-confidentialite", { lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 }),
    createEntry("/second-avis", { lastModified: pageDate("/second-avis"), changeFrequency: "monthly", priority: 0.6 }),
    createEntry("/en/second-avis", { lastModified: pageDate("/en/second-avis"), changeFrequency: "monthly", priority: 0.6 }),
    createEntry("/en/suivi", { lastModified: pageDate("/en/suivi"), changeFrequency: "monthly", priority: 0.5 }),
  ];

  // Commune individual pages
  let communePages: MetadataRoute.Sitemap = [];
  try {
    const { data: communes } = await supabase
      .from("communes")
      .select("slug, updated_at")
      .order("slug", { ascending: true });

    // Derniere refonte du contenu des fiches (impots 2026 par profil)
    const communesContentDate = new Date("2026-11-10");
    communePages = (communes || [])
      .filter((c) => !isCommuneFusionnee(c.slug))
      .map((c) => ({
      url: `${baseUrl}/communes/${c.slug}`,
      lastModified: new Date(Math.max(new Date(c.updated_at).getTime(), communesContentDate.getTime())),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap communes error:", e);
  }

  // English commune pages (mirror the FR commune URLs under /en)
  const enCommunePages: MetadataRoute.Sitemap = communePages.map((c) => ({
    ...c,
    url: c.url.replace(`${baseUrl}/communes/`, `${baseUrl}/en/communes/`),
  }));

  // English blog pages (mirror the FR blog URLs under /en)
  const enBlogPages: MetadataRoute.Sitemap = [
    createEntry("/en/blog", { lastModified: latestArticleDate, changeFrequency: "daily", priority: 0.8 }),
    ...blogArticles.map((article) =>
      createEntry(`/en/blog/${article.slug}`, { lastModified: article.date, changeFrequency: "monthly", priority: 0.65 })
    ),
  ];

  // English service pages (mirror FR service URLs under /en)
  const enServicePages: MetadataRoute.Sitemap = [
    createEntry("/en", { lastModified: pageDate("/en"), changeFrequency: "weekly", priority: 0.9 }),
    createEntry("/en/simulateur", { lastModified: pageDate("/en/simulateur"), changeFrequency: "monthly", priority: 0.85 }),
    createEntry("/en/independants", { lastModified: pageDate("/en/independants"), changeFrequency: "monthly", priority: 0.85 }),
    createEntry("/en/tarifs", { lastModified: pageDate("/en/tarifs"), changeFrequency: "monthly", priority: 0.85 }),
    createEntry("/en/entreprises", { lastModified: pageDate("/en/entreprises"), changeFrequency: "monthly", priority: 0.85 }),
    createEntry("/en/creation-entreprise", { lastModified: pageDate("/en/creation-entreprise"), changeFrequency: "monthly", priority: 0.85 }),
    createEntry("/en/associations-fondations", { lastModified: pageDate("/en/associations-fondations"), changeFrequency: "monthly", priority: 0.8 }),
    createEntry("/en/faq", { lastModified: pageDate("/en/faq"), changeFrequency: "monthly", priority: 0.7 }),
    createEntry("/en/cantons", { lastModified: pageDate("/en/cantons"), changeFrequency: "monthly", priority: 0.85 }),
    createEntry("/en/cantons/vaud", { lastModified: pageDate("/en/cantons/vaud"), changeFrequency: "monthly", priority: 0.8 }),
    createEntry("/en/cantons/geneve", { lastModified: pageDate("/en/cantons/geneve"), changeFrequency: "monthly", priority: 0.8 }),
    createEntry("/en/cantons/fribourg", { lastModified: pageDate("/en/cantons/fribourg"), changeFrequency: "monthly", priority: 0.8 }),
    createEntry("/en/cantons/valais", { lastModified: pageDate("/en/cantons/valais"), changeFrequency: "monthly", priority: 0.8 }),
    createEntry("/en/cantons/jura", { lastModified: pageDate("/en/cantons/jura"), changeFrequency: "monthly", priority: 0.8 }),
    createEntry("/en/cantons/neuchatel", { lastModified: pageDate("/en/cantons/neuchatel"), changeFrequency: "monthly", priority: 0.8 }),
  ];

  return [...staticPages, ...communePages, ...enCommunePages, ...enBlogPages, ...enServicePages];
}
