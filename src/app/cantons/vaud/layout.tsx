import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Return Vaud 2026",
  description:
    "Tax return service in Canton Vaud. VaudTax, Lausanne, Montreux, Nyon. From CHF 50.",
  keywords: [
    "déclaration impôts Vaud",
    "impôts Lausanne",
    "fiduciaire Vaud",
    "VaudTax",
    "délai fiscal Vaud 2026",
    "tax return Vaud",
    "Vaud tax advisor",
    "Lausanne taxes",
    "Montreux fiduciary",
    "Nyon tax services"
  ],
  openGraph: {
    title: "Déclaration d'impôts Vaud 2026",
    description:
      "Expert fiduciaire pour votre déclaration d'impôts vaudoise. Délai: 15 mars 2026. Dès CHF 50.-",
    url: "https://www.neofidu.ch/cantons/vaud",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/vaud",
  },
};

export default function VaudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
