import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande en ligne - Devis gratuit",
  description: "Déposez votre demande de déclaration fiscale ou de comptabilité en ligne. Obtenez un devis personnalisé immédiatement. Service disponible pour Vaud, Valais, Genève, Neuchâtel, Jura et Fribourg.",
  openGraph: {
    title: "Demande en ligne | NeoFidu",
    description: "Formulaire de demande pour vos services fiscaux et comptables. Devis instantané et gratuit.",
  },
};

export default function DemandeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
