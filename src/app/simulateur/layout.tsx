import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Simulateurs Fiscaux",
    default: "Simulateurs Fiscaux Gratuits 2026 | Vaud, Genève, Valais",
  },
  description:
    "Free Swiss tax calculators. Calculate your taxes, Pillar 3a savings, rental value impact. All cantons. | Simulateurs fiscaux gratuits Suisse romande. Vaud, Genève, Valais.",
  keywords: [
    // English
    "swiss tax calculator",
    "switzerland tax calculator free",
    "swiss income tax calculator",
    "pillar 3a calculator",
    "swiss tax estimator",
    "geneva tax calculator",
    "vaud tax calculator",
    "zurich tax calculator",
    // French
    "simulateur impôts suisse",
    "calculateur fiscal",
    "simulateur 3ème pilier",
    "calcul impôts vaud",
    "simulateur genève",
    "valeur locative suisse",
    "outil fiscal gratuit",
  ],
  openGraph: {
    title: "Free Swiss Tax Calculators",
    description:
      "Calculate Swiss taxes, Pillar 3a savings, rental value. 100% free, no registration. | Simulateurs fiscaux suisses gratuits.",
    type: "website",
    locale: "fr_CH",
    images: [{ url: "https://www.neofidu.ch/og-image.svg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur",
  },
};

export default function SimulateurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
