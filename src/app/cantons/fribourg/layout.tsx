import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Return Fribourg 2026",
  description:
    "Tax return service in Fribourg. FriTax, bilingual FR/DE. Fribourg, Bulle, Morat. From CHF 50.",
  keywords: [
    "déclaration impôts Fribourg",
    "impôts Fribourg",
    "fiduciaire Fribourg",
    "FriTax",
    "déductions famille Fribourg",
    "délai fiscal Fribourg 2026",
    "tax return Fribourg",
    "Fribourg tax advisor",
    "Bulle fiduciaire",
    "bilingual tax service"
  ],
  openGraph: {
    title: "Déclaration d'impôts Fribourg 2026",
    description:
      "Expert fiduciaire pour votre déclaration d'impôts fribourgeoise. Service bilingue FR/DE. Dès CHF 50.-",
    url: "https://www.neofidu.ch/cantons/fribourg",
    type: "website",
    locale: "fr_CH",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons/fribourg",
  },
};

export default function FribourgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
