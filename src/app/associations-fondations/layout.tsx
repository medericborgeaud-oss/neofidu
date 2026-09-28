import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiduciaire pour Associations & Fondations en Suisse | NeoFidu",
  description:
    "Comptabilité, fiscalité et gestion pour associations et fondations en Suisse romande. Accompagnement dédié aux structures à but non lucratif.",
  keywords: [
    "fiduciaire association Suisse",
    "comptabilité fondation Suisse romande",
    "fiscalité association but non lucratif",
    "exonération fiscale association",
    "gestion comptable fondation",
  ],
  alternates: {
    canonical: "https://neofidu.ch/associations-fondations",
    languages: {
      "fr-CH": "https://neofidu.ch/associations-fondations",
      "en-CH": "https://neofidu.ch/en/associations-fondations",
      "x-default": "https://neofidu.ch/associations-fondations",
    },
  },
  openGraph: {
    title: "Fiduciaire pour Associations & Fondations en Suisse | NeoFidu",
    description:
      "Comptabilité, fiscalité et gestion pour associations et fondations en Suisse romande. Accompagnement dédié aux structures à but non lucratif.",
    type: "website",
    url: "https://neofidu.ch/associations-fondations",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
};

export default function AssociationsFondationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
