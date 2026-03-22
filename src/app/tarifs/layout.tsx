import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs fiduciaire en ligne Suisse — Prix clairs et transparents",
  description:
    "Découvrez nos tarifs pour la déclaration d'impôts, la comptabilité et les services fiduciaires en Suisse romande. Pas de surprise, devis gratuit en 2 minutes.",
  keywords: [
    "tarif fiduciaire Suisse",
    "tarif fiduciaire Vaud",
    "coût fiduciaire Suisse",
    "devis fiduciaire Vaud",
    "prix déclaration impôts Suisse",
    "tarif comptabilité PME",
    "fiduciaire pas cher Suisse",
    "prix fiduciaire Genève",
    "tarif création entreprise Suisse",
    "fiduciaire en ligne tarifs",
  ],
  openGraph: {
    title: "Tarifs fiduciaire en ligne Suisse — Prix clairs et transparents",
    description:
      "Découvrez nos tarifs pour la déclaration d'impôts, la comptabilité et les services fiduciaires en Suisse romande. Devis gratuit.",
    url: "https://www.neofidu.ch/tarifs",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/tarifs",
  },
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
