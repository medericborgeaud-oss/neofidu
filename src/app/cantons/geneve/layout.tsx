import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Return Geneva 2026",
  description:
    "Tax return service in Geneva. Quasi-resident, cross-border workers, GeTax. From CHF 50.",
  keywords: [
    "déclaration impôts Genève",
    "impôts Geneva",
    "fiduciaire Genève",
    "GeTax",
    "quasi-résident Genève",
    "TOU frontalier",
    "délai fiscal Genève 2026",
    "tax return Geneva",
    "Geneva tax advisor",
    "cross-border worker tax"
  ],
  openGraph: {
    title: "Déclaration d'impôts Genève 2026",
    description:
      "Expert fiduciaire pour votre déclaration d'impôts genevoise. Spécialiste quasi-résident et frontaliers. Dès CHF 50.-",
    url: "https://www.neofidu.ch/cantons/geneve",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/geneve",
  },
};

export default function GeneveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
