import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogArticles, blogCategories } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog: Swiss Tax & Accounting Insights",
  description:
    "Articles in English on Swiss taxation, accounting and running a business in French-speaking Switzerland, by NeoFidu, your online fiduciary.",
  keywords: [
    "Swiss taxation",
    "Swiss accounting",
    "tax return Switzerland",
    "fiduciary Switzerland",
    "self-employed Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/blog",
    languages: {
      "fr-CH": "https://neofidu.ch/blog",
      "en-CH": "https://neofidu.ch/en/blog",
      "x-default": "https://neofidu.ch/blog",
    },
  },
  openGraph: {
    title: "Blog — Swiss Tax & Accounting Insights | NeoFidu",
    description:
      "Articles in English on Swiss taxation, accounting and business in French-speaking Switzerland.",
    type: "website",
    url: "https://neofidu.ch/en/blog",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function blogListJsonLd() {
  const sorted = [...blogArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "NeoFidu Blog",
    url: "https://neofidu.ch/en/blog",
    inLanguage: "en-CH",
    blogPost: sorted.map((article) => ({
      "@type": "BlogPosting",
      headline: article.titleEn || article.title,
      url: `https://neofidu.ch/en/blog/${article.slug}`,
      datePublished: article.date,
      author: { "@type": "Organization", name: "NeoFidu" },
    })),
  };
}

export default function BlogIndexEn() {
  const articles = [...blogArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd()) }}
      />
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-emerald-700">
            Home
          </Link>{" "}
          / <span className="text-gray-700">Blog</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          NeoFidu Blog — in English
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Practical guides on Swiss taxation, accounting and self-employment in
          French-speaking Switzerland. This page is also available in{" "}
          <Link href="/blog" className="text-emerald-700 underline">
            French
          </Link>
          .
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => {
            const cat = blogCategories[article.category];
            return (
              <Link
                key={article.id}
                href={`/en/blog/${article.slug}`}
                className="block rounded-xl border border-gray-200 p-5 transition hover:shadow-md hover:border-emerald-300"
              >
                <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {cat?.nameEn ?? article.category}
                </span>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  {article.titleEn || article.title}
                </h2>
                <p className="mb-3 text-sm text-gray-600">
                  {article.excerptEn || article.excerpt}
                </p>
                <div className="text-xs text-gray-400">
                  {formatDate(article.date)} · {article.readTime} min read
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
