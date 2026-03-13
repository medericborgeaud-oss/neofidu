import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Return Valais 2026",
  description:
    "Tax return service in Valais. VSTax, secondary residences. Sion, Martigny, Zermatt. From CHF 50.",
  keywords: [
    "déclaration impôts Valais",
    "impôts Sion",
    "fiduciaire Valais",
    "VSTax",
    "résidence secondaire Valais",
    "délai fiscal Valais 2026",
    "tax return Valais",
    "Valais tax advisor",
    "Zermatt taxes",
    "Verbier fiduciary"
  ],
  openGraph: {
    title: "Déclaration d'impôts Valais 2026",
    description:
      "Expert fiduciaire pour votre déclaration d'impôts valaisanne. Spécialiste résidences secondaires. Dès CHF 50.-",
    url: "https://www.neofidu.ch/cantons/valais",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/valais",
  },
};

export default function ValaisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
