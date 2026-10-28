// Métadonnées Next.js et données structurées JSON-LD pour les guides.
import type { Metadata } from "next";
import type { GuideChapter, GuideDefinition, GuideLocale } from "./types";

const SITE = "https://neofidu.ch";

export function guideUrl(guide: GuideDefinition, locale: GuideLocale, chapter?: GuideChapter) {
  const base = locale === "en" ? `${SITE}/en` : SITE;
  return `${base}/guide/${guide.slug}${chapter ? `/${chapter.slug}` : ""}`;
}

export function buildGuideMetadata(
  guide: GuideDefinition,
  locale: GuideLocale,
  chapter?: GuideChapter
): Metadata {
  const content = chapter ? chapter[locale] : guide.pillar[locale];
  const frUrl = guideUrl(guide, "fr", chapter);
  const enUrl = guideUrl(guide, "en", chapter);
  const url = locale === "en" ? enUrl : frUrl;
  return {
    // `absolute` : le titre contient déjà la marque, on évite le doublon du template.
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    keywords: content.keywords,
    authors: [{ name: "NeoFidu", url: SITE }],
    alternates: {
      canonical: url,
      languages: { "fr-CH": frUrl, "en-CH": enUrl, "x-default": frUrl },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      siteName: "NeoFidu",
      type: "article",
      locale: locale === "en" ? "en_CH" : "fr_CH",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export function buildGuideJsonLd(guide: GuideDefinition, locale: GuideLocale, chapter?: GuideChapter) {
  const content = chapter ? chapter[locale] : guide.pillar[locale];
  const url = guideUrl(guide, locale, chapter);
  const home = locale === "en" ? `${SITE}/en` : SITE;

  const author = {
    "@type": "Organization",
    name: locale === "en" ? "The NeoFidu team" : "L'équipe NeoFidu",
    url: SITE,
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: content.title,
    description: content.metaDescription,
    inLanguage: locale === "en" ? "en-CH" : "fr-CH",
    url,
    mainEntityOfPage: url,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author,
    publisher: {
      "@type": "Organization",
      name: "NeoFidu",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.svg` },
    },
    about: [
      { "@type": "Thing", name: `${guide.software}` },
      { "@type": "AdministrativeArea", name: locale === "en" ? "Canton of Vaud" : "Canton de Vaud" },
    ],
    isPartOf: chapter
      ? { "@type": "CreativeWorkSeries", name: guide.pillar[locale].title, url: guideUrl(guide, locale) }
      : undefined,
    keywords: content.keywords.join(", "),
    isAccessibleForFree: true,
  };

  const breadcrumbItems = [
    { name: locale === "en" ? "Home" : "Accueil", item: home },
    { name: guide.pillar[locale].navTitle, item: guideUrl(guide, locale) },
  ];
  if (chapter) breadcrumbItems.push({ name: content.navTitle, item: url });
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
  };

  const graphs: Record<string, unknown>[] = [article, breadcrumb];

  if (content.faq.length > 0) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: stripMd(f.a) },
      })),
    });
  }

  // Étapes numérotées → HowTo (utile aux LLM même si Google n'affiche plus ce rich result).
  const steps = content.blocks.find((b) => b.type === "steps");
  if (steps && steps.type === "steps") {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: content.title,
      inLanguage: locale === "en" ? "en-CH" : "fr-CH",
      step: steps.items.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: stripMd(s),
      })),
    });
  }

  if (!chapter) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: guide.pillar[locale].title,
      itemListElement: guide.chapters.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c[locale].navTitle,
        url: guideUrl(guide, locale, c),
      })),
    });
  }

  return graphs;
}

function stripMd(s: string) {
  return s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
