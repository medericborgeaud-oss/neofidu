import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suivi de demande | NeoFidu",
  description: "Suivez l'avancement de votre dossier fiscal ou comptable en temps réel. Entrez votre numéro de référence pour consulter le statut de votre demande.",
  openGraph: {
    title: "Suivi de demande | NeoFidu",
    description: "Suivez l'avancement de votre dossier fiscal ou comptable en temps réel.",
  },
};

export default function SuiviLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
