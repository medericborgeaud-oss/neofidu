import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts Neuchâtel 2026",
  description: "Fiduciaire en ligne pour le canton de Neuchâtel. Déclaration d’impôts, comptabilité et conseils fiscaux par des spécialistes. Dès CHF 50.",
  keywords: [
    "déclaration impôts Neuchâtel",
    "impôts La Chaux-de-Fonds",
    "fiduciaire Neuchâtel",
    "NeTax",
    "industrie horlogère impôts",
    "délai fiscal Neuchâtel 2026",
    "tax return Neuchâtel",
    "Neuchâtel tax advisor",
    "Le Locle fiduciaire",
    "Onde Verte déduction"
  ],
  openGraph: {
    title: "Déclaration d'impôts Neuchâtel 2026",
    description:
      "Expert fiduciaire pour votre déclaration d'impôts neuchâteloise. Spécialiste industrie horlogère. Dès CHF 50.-",
    url: "https://www.neofidu.ch/cantons/neuchatel",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/neuchatel",
  },
};

export default function NeuchatelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
