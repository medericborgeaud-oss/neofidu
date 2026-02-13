import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Questions fréquentes",
  description: "Réponses sur la déclaration d'impôts et comptabilité en Suisse. Délais, tarifs, documents.",
  keywords: ["FAQ fiscalité suisse", "questions impôts", "aide déclaration fiscale"],
  openGraph: {
    title: "FAQ | NeoFidu",
    description: "Réponses sur la fiscalité et comptabilité en Suisse romande.",
    url: "https://www.neofidu.ch/faq",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
