import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Return Jura 2026",
  description:
    "Tax return service in Jura. JuraTax, agricultural expertise. Delémont, Porrentruy. From CHF 50.",
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
      "Expert fiduciaire pour votre déclaration d'impôts jurassienne. Spécialiste exploitations agricoles. Dès CHF 50.-",
    url: "https://www.neofidu.ch/cantons/jura",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/jura",
  },
};

export default function JuraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
