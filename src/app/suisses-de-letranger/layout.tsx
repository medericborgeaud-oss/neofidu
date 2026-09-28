import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suisses de l'étranger : impôts en Suisse",
  description:
    "Suisse de l'étranger avec des obligations fiscales en Suisse ? Déclaration d'impôts, immobilier et double imposition, 100% en ligne avec NeoFidu.",
  keywords: [
    "Suisses de l'étranger impôts",
    "déclaration impôts expatrié suisse",
    "immobilier Suisse résident étranger",
    "double imposition Suisse",
    "fiduciaire Suisses de l'étranger",
  ],
  alternates: {
    canonical: "https://neofidu.ch/suisses-de-letranger",
    languages: {
      "fr-CH": "https://neofidu.ch/suisses-de-letranger",
      "en-CH": "https://neofidu.ch/en/suisses-de-letranger",
      "x-default": "https://neofidu.ch/suisses-de-letranger",
    },
  },
  openGraph: {
    title: "Suisses de l'étranger : impôts en Suisse",
    description:
      "Suisse de l'étranger avec des obligations fiscales en Suisse ? Déclaration d'impôts, immobilier et double imposition, 100% en ligne avec NeoFidu.",
    type: "website",
    url: "https://neofidu.ch/suisses-de-letranger",
    siteName: "NeoFidu",
    locale: "fr_CH",
  },
};

export default function SuissesDeLEtrangerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
