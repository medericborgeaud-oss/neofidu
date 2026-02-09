import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales",
  description: "Conditions générales d'utilisation des services NeoFidu. Informations sur nos prestations, responsabilités, tarifs, confidentialité et protection des données.",
  openGraph: {
    title: "Conditions Générales | NeoFidu",
    description: "Consultez les conditions générales d'utilisation des services de fiduciaire NeoFidu.",
  },
};

export default function ConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
