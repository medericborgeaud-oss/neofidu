import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suivi de demande",
  description: "Consultez l'avancement de votre déclaration d'impôts en temps réel avec votre numéro de référence.",
  keywords: ["suivi demande fiscale", "statut déclaration impôts", "suivi dossier comptable", "référence NeoFidu"],
  openGraph: {
    title: "Suivi de demande | NeoFidu",
    description: "Suivez l'avancement de votre dossier fiscal en temps réel.",
    url: "https://www.neofidu.ch/suivi",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/suivi",
  },
};

export default function SuiviLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
