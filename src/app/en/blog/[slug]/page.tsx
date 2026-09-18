import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, blogCategories, BlogArticle } from "@/lib/blog-data";
import BlogArticleClient from "../../../blog/[slug]/BlogArticleClient";

// Generate static paths for all blog articles (English routes)
export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic English metadata for each blog article
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | NeoFidu",
      description: "This article doesn't exist or has been removed.",
    };
  }

  const categoryInfo = blogCategories[article.category];

  const title = article.titleEn || article.title;
  const excerpt = article.excerptEn || article.excerpt;

  const baseKeywords = [
    categoryInfo.nameEn.toLowerCase(),
    categoryInfo.name.toLowerCase(),
    "Swiss taxation",
    "fiscalité suisse",
    "accounting",
    "Swiss taxes",
    article.category,
  ];

  const allKeywords = article.keywords
    ? [...article.keywords, ...baseKeywords]
    : baseKeywords;

  const seoTitle = title;
  const seoDescription = excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: allKeywords,
    authors: [{ name: "NeoFidu" }],
    openGraph: {
      title: title,
      description: excerpt,
      type: "article",
      url: `https://neofidu.ch/en/blog/${article.slug}`,
      siteName: "NeoFidu",
      images: [{ url: `https://neofidu.ch/blog/${article.slug}/opengraph-image`, width: 1200, height: 630, alt: title }],
      publishedTime: article.date,
      authors: ["NeoFidu"],
      section: categoryInfo.nameEn,
      tags: [categoryInfo.nameEn, categoryInfo.name, "Swiss Taxation", "Accounting"],
      locale: "en_CH",
    },
    alternates: {
      canonical: `https://neofidu.ch/en/blog/${article.slug}`,
      languages: {
        "fr-CH": `https://neofidu.ch/blog/${article.slug}`,
        "en-CH": `https://neofidu.ch/en/blog/${article.slug}`,
        "x-default": `https://neofidu.ch/blog/${article.slug}`,
      },
    },
  };
}

// Generate English JSON-LD structured data for the article
function generateArticleJsonLd(article: BlogArticle) {
  const categoryInfo = blogCategories[article.category];
  const title = article.titleEn || article.title;
  const excerpt = article.excerptEn || article.excerpt;

  const allKeywords = article.keywords
    ? [...article.keywords, categoryInfo.nameEn, categoryInfo.name, "Swiss Taxation", "Accounting"]
    : [categoryInfo.nameEn, categoryInfo.name, "Swiss Taxation", "Accounting", "Taxes"];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    alternativeHeadline: article.title || undefined,
    description: excerpt,
    image: {
      "@type": "ImageObject",
      url: `https://neofidu.ch/blog/${article.slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Organization",
      name: "NeoFidu",
      url: "https://neofidu.ch",
      logo: "https://neofidu.ch/logo.svg",
    },
    publisher: {
      "@type": "Organization",
      name: "NeoFidu",
      logo: {
        "@type": "ImageObject",
        url: "https://neofidu.ch/logo.svg",
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://neofidu.ch/en/blog/${article.slug}`,
    },
    articleSection: categoryInfo.nameEn,
    keywords: allKeywords,
    inLanguage: ["en-CH", "fr-CH"],
    isAccessibleForFree: true,
    timeRequired: `PT${article.readTime}M`,
  };
}

// Generate English BreadcrumbList JSON-LD
function generateBreadcrumbJsonLd(article: BlogArticle) {
  const categoryInfo = blogCategories[article.category];
  const title = article.titleEn || article.title;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://neofidu.ch",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://neofidu.ch/en/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryInfo.nameEn,
        item: `https://neofidu.ch/en/blog?category=${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: `https://neofidu.ch/en/blog/${article.slug}`,
      },
    ],
  };
}

export default async function BlogArticlePageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = blogArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleJsonLd(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(article)),
        }}
      />

      {/* Client component, forced to English */}
      <BlogArticleClient article={article} otherArticles={otherArticles} forceEn />
    </>
  );
}
