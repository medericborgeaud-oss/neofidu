import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, blogCategories, BlogArticle } from "@/lib/blog-data";
import BlogArticleClient from "./BlogArticleClient";

// Generate static paths for all blog articles
export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic metadata for each blog article
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article non trouvé | Article Not Found",
      description: "Cet article n'existe pas ou a été supprimé. This article doesn't exist or has been removed.",
    };
  }

  const categoryInfo = blogCategories[article.category];

  // Build keywords array with article-specific keywords if available
  const baseKeywords = [
    categoryInfo.name.toLowerCase(),
    categoryInfo.nameEn.toLowerCase(),
    "fiscalité suisse",
    "Swiss taxation",
    "comptabilité",
    "accounting",
    "impôts suisse",
    "Swiss taxes",
    article.category,
  ];

  const allKeywords = article.keywords
    ? [...article.keywords, ...baseKeywords]
    : baseKeywords;

  // Use French title with Neofidu branding for better SEO
  const seoTitle = `${article.title} | Neofidu`;

  // Use French description for meta (primary audience is French-speaking Switzerland)
  const seoDescription = article.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: allKeywords,
    authors: [{ name: "NeoFidu" }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://www.neofidu.ch/blog/${article.slug}`,
      siteName: "NeoFidu",
      images: [{ url: "https://www.neofidu.ch/og-image.jpg", width: 1200, height: 630, alt: article.title }],
      publishedTime: article.date,
      authors: ["NeoFidu"],
      section: categoryInfo.name,
      tags: [categoryInfo.name, categoryInfo.nameEn, "Fiscalité Suisse", "Swiss Taxation", "Comptabilité", "Accounting"],
      locale: "fr_CH",
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleEn || article.title,
      description: article.excerptEn || article.excerpt,
    },
    alternates: {
      canonical: `https://www.neofidu.ch/blog/${article.slug}`,
    },
  };
}

// Generate JSON-LD structured data for article
function generateArticleJsonLd(article: BlogArticle) {
  const categoryInfo = blogCategories[article.category];

  // Combine article-specific keywords with default keywords
  const allKeywords = article.keywords
    ? [...article.keywords, categoryInfo.name, categoryInfo.nameEn, "Fiscalité Suisse", "Swiss Taxation", "Comptabilité", "Accounting"]
    : [categoryInfo.name, categoryInfo.nameEn, "Fiscalité Suisse", "Swiss Taxation", "Comptabilité", "Accounting", "Impôts"];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    alternativeHeadline: article.titleEn || undefined,
    description: article.excerpt,
    image: {
      "@type": "ImageObject",
      url: "https://www.neofidu.ch/og-image.jpg",
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
      "@id": `https://neofidu.ch/blog/${article.slug}`,
    },
    articleSection: categoryInfo.name,
    keywords: allKeywords,
    inLanguage: ["fr-CH", "en-CH"],
    isAccessibleForFree: true,
    timeRequired: `PT${article.readTime}M`,
  };
}

// Generate BreadcrumbList JSON-LD
function generateBreadcrumbJsonLd(article: BlogArticle) {
  const categoryInfo = blogCategories[article.category];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.neofidu.ch",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.neofidu.ch/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryInfo.name,
        item: `https://www.neofidu.ch/blog?category=${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: `https://www.neofidu.ch/blog/${article.slug}`,
      },
    ],
  };
}

export default async function BlogArticlePage({
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

      {/* Client Component for interactivity */}
      <BlogArticleClient article={article} otherArticles={otherArticles} />
    </>
  );
}
