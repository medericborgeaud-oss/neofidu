import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions fréquentes - FAQ",
  description: "Retrouvez les réponses aux questions les plus courantes sur nos services de déclaration fiscale et de comptabilité en Suisse romande. Délais, tarifs, documents requis.",
  openGraph: {
    title: "FAQ | NeoFidu - Fiduciaire Suisse",
    description: "Toutes les réponses à vos questions sur la fiscalité et la comptabilité en Romandie.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
