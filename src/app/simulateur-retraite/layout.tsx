import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateur Retraite Suisse | AVS, LPP, 3ème Pilier | NeoFidu",
  description:
    "Calculez votre revenu mensuel à la retraite en Suisse : AVS (1er pilier), prévoyance professionnelle LPP (2ème pilier) et 3ème pilier. Simulateur gratuit.",
  keywords: [
    "calculateur retraite suisse",
    "simulateur retraite",
    "rente avs calculateur",
    "revenu retraite suisse",
    "2ème pilier simulateur",
    "calcul rente avs",
    "lpp rente retraite",
    "prévoyance retraite vaud",
    "retraite anticipée suisse",
  ],
  openGraph: {
    title: "Calculateur Retraite Suisse | NeoFidu",
    description:
      "Combien toucherez-vous à la retraite ? Simulez votre AVS, 2ème et 3ème pilier.",
  },
  twitter: {
    card: "summary",
    title: "Calculateur Retraite Suisse | NeoFidu",
    description: "Simulateur gratuit AVS + LPP + 3ème pilier.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
