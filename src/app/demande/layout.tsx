import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande en ligne - Devis gratuit",
  description: "Déclaration d'impôts ou comptabilité en ligne. Devis gratuit en 2 min pour Vaud, Valais, Genève.",
  keywords: ["demande déclaration impôts", "devis comptabilité", "formulaire fiduciaire", "devis gratuit suisse"],
  openGraph: {
    title: "Demande en ligne | NeoFidu",
    description: "Formulaire de demande pour déclaration fiscale et comptabilité.",
    url: "https://www.neofidu.ch/demande",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/demande",
  },
};

export default function DemandeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
