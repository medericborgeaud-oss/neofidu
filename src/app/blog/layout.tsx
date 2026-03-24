import type { Metadata } from "next";
import { blogArticles } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog Fiscalité Suisse - Conseils",
  description:
    "Actualités fiscales et conseils comptables pour la Suisse romande. Guides pratiques sur les impôts, la TVA, la comptabilité et la création d'entreprise.",
  keywords: [
    "blog fiscalité suisse",
    "actualités impôts suisse",
    "conseils déclaration fiscale",
    "comptabilité PME suisse",
    "TVA suisse",
  ],
  openGraph: {
    title: "Blog Fiscalité",
    description:
      "Actualités fiscales et conseils comptables en Suisse romande. Guides pratiques sur les impôts et la TVA.",
    type: "website",
    url: "https://www.neofidu.ch/blog",
    siteName: "",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const publishedArticles = blogArticles.filter(
    (a) => a.slug !== "premiere-declaration-impots-suisse-guide"
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog NeoFidu - Fiscalité et comptabilité en Suisse",
    url: "https://www.neofidu.ch/blog",
    itemListElement: publishedArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.neofidu.ch/blog/${article.slug}`,
      name: article.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
