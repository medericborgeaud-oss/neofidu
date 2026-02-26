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
      title: "Article non trouvé | NeoFidu",
      description: "Cet article n'existe pas ou a été supprimé.",
    };
  }

  const categoryInfo = blogCategories[article.category];

  return {
    title: `${article.title} | NeoFidu Blog`,
    description: article.excerpt,
    keywords: [
      categoryInfo.name.toLowerCase(),
      "fiscalité suisse",
      "comptabilité",
      "impôts suisse",
      article.category,
    ],
    authors: [{ name: "NeoFidu" }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://www.neofidu.ch/blog/${article.slug}`,
      siteName: "NeoFidu",
      publishedTime: article.date,
      authors: ["NeoFidu"],
      section: categoryInfo.name,
      tags: [categoryInfo.name, "Fiscalité Suisse", "Comptabilité"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: `https://www.neofidu.ch/blog/${article.slug}`,
    },
  };
}

// Generate JSON-LD structured data for article
function generateArticleJsonLd(article: BlogArticle) {
  const categoryInfo = blogCategories[article.category];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Organization",
      name: "NeoFidu",
      url: "https://www.neofidu.ch",
    },
    publisher: {
      "@type": "Organization",
      name: "NeoFidu",
      logo: {
        "@type": "ImageObject",
        url: "https://www.neofidu.ch/logo.svg",
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.neofidu.ch/blog/${article.slug}`,
    },
    articleSection: categoryInfo.name,
    keywords: [categoryInfo.name, "Fiscalité Suisse", "Comptabilité", "Impôts"],
    inLanguage: "fr-CH",
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
