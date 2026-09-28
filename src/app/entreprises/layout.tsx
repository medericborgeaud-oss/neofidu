import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiduciaire pour PME & Sociétés en Suisse | Comptabilité & Fiscalité",
  description:
    "Comptabilité, salaires, TVA et fiscalité pour PME, Sàrl et SA en Suisse romande. Fiduciaire en ligne, forfaits clairs et accompagnement dédié.",
  keywords: [
    "fiduciaire PME Suisse",
    "comptabilité société Suisse romande",
    "fiscalité Sàrl SA",
    "TVA salaires PME",
    "fiduciaire en ligne entreprise",
  ],
  alternates: {
    canonical: "https://neofidu.ch/entreprises",
    languages: {
      "fr-CH": "https://neofidu.ch/entreprises",
      "en-CH": "https://neofidu.ch/en/entreprises",
      "x-default": "https://neofidu.ch/entreprises",
    },
  },
  openGraph: {
    title: "Fiduciaire pour PME & Sociétés en Suisse | Comptabilité & Fiscalité",
    description:
      "Comptabilité, salaires, TVA et fiscalité pour PME, Sàrl et SA en Suisse romande. Fiduciaire en ligne, forfaits clairs et accompagnement dédié.",
    type: "website",
    url: "https://neofidu.ch/entreprises",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
};

export default function EntreprisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
