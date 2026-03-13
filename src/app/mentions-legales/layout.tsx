import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales de NeoFidu, fiduciaire en ligne. Dénomination sociale, forme juridique, adresse, coordonnées et informations sur les prix en CHF.",
  keywords: "mentions légales, neofidu, fiduciaire, suisse, entreprise individuelle, contact, CHF",
  openGraph: {
    title: "Mentions Légales",
    description: "Informations légales conformément à la législation suisse",
    type: "website",
    locale: "fr_CH",
    siteName: "NeoFidu",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/mentions-legales",
  },
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
