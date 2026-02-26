import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Fiscalité Suisse - Conseils",
  description: "Actualités fiscales et conseils comptables pour la Suisse romande. Guides sur les impôts et TVA.",
  keywords: [
    "blog fiscalité suisse",
    "actualités impôts suisse",
    "conseils déclaration fiscale",
    "comptabilité PME suisse",
    "TVA suisse",
  ],
  openGraph: {
    title: "Blog Fiscalité | NeoFidu",
    description: "Actualités fiscales et conseils comptables en Suisse romande.",
    type: "website",
    url: "https://www.neofidu.ch/blog",
    siteName: "NeoFidu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Fiscalité | NeoFidu",
    description: "Actualités fiscales en Suisse romande.",
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
  return <>{children}</>;
}
