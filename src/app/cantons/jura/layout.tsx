import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts Jura 2026",
  description: "Fiduciaire en ligne pour le canton du Jura. Déclaration d’impôts, comptabilité et conseils fiscaux par des spécialistes diplômés. Dès CHF 89.",
  keywords: [
    "déclaration impôts Jura",
    "impôts Delémont",
    "fiduciaire Jura",
    "JuraTax",
    "exploitation agricole impôts",
    "délai fiscal Jura 2026",
    "tax return Jura",
    "Jura tax advisor",
    "Porrentruy fiduciaire",
    "prolongation délai Jura"
  ],
  openGraph: {
    title: "Déclaration d'impôts Jura 2026",
    description:
      "Expert fiduciaire pour votre déclaration d'impôts jurassienne. Spécialiste exploitations agricoles. Dès CHF 89.-",
    url: "https://neofidu.ch/cantons/jura",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://neofidu.ch/cantons/jura",
  },
};

export default function JuraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
