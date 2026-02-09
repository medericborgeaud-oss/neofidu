import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Actualités fiscales et comptables | NeoFidu",
  description: "Suivez les dernières actualités fiscales en Suisse romande. Conseils pratiques, analyses d'experts et guides pour optimiser vos impôts et votre comptabilité. Articles sur la fiscalité, TVA, déclaration d'impôts.",
  keywords: [
    "blog fiscalité suisse",
    "actualités impôts suisse",
    "conseils déclaration fiscale",
    "comptabilité PME suisse",
    "TVA suisse",
    "optimisation fiscale romande",
    "déductions fiscales suisse",
    "3ème pilier déductions",
  ],
  openGraph: {
    title: "Blog | NeoFidu - Actualités fiscales Suisse Romande",
    description: "Restez informé des évolutions fiscales en Suisse. Articles et conseils d'experts pour particuliers, indépendants et PME.",
    type: "website",
    url: "https://neofidu.ch/blog",
    siteName: "NeoFidu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | NeoFidu - Actualités fiscales",
    description: "Actualités fiscales et conseils comptables en Suisse romande.",
  },
  alternates: {
    canonical: "https://neofidu.ch/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
