import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Simulateurs Fiscaux | NeoFidu",
    default: "Simulateurs Fiscaux Suisse 2026 | Gratuit | NeoFidu",
  },
  description:
    "Simulateurs fiscaux gratuits pour la Suisse romande. Calculez vos impôts, économies 3ème pilier et impact valeur locative. Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura.",
  keywords: [
    "simulateur impôts suisse",
    "calculateur fiscal",
    "simulateur 3ème pilier",
    "calcul impôts vaud",
    "simulateur genève",
    "valeur locative suisse",
    "outil fiscal gratuit",
  ],
  openGraph: {
    title: "Simulateurs Fiscaux Suisse | Gratuit | NeoFidu",
    description:
      "Calculez vos impôts, économies 3ème pilier et impact valeur locative. 100% gratuit, sans inscription.",
    type: "website",
    locale: "fr_CH",
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
