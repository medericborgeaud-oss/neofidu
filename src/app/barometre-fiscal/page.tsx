import type { Metadata } from "next";
import { BarometrePage, barometreTexts } from "@/components/barometre/BarometrePage";

const { summary } = barometreTexts("fr");

export const metadata: Metadata = {
  title: "Baromètre fiscal romand 2026 : impôts par commune | NeoFidu",
  description: `Impôt sur le revenu 2026 dans les 657 communes de Suisse romande pour 4 profils types, d'après le calculateur officiel de l'AFC. ${summary[0]}`.slice(0, 300),
  alternates: {
    canonical: "https://neofidu.ch/barometre-fiscal",
    languages: {
      "fr-CH": "https://neofidu.ch/barometre-fiscal",
      en: "https://neofidu.ch/en/barometre-fiscal",
    },
  },
  openGraph: {
    title: "Baromètre fiscal romand 2026",
    description: summary[0],
    url: "https://neofidu.ch/barometre-fiscal",
    type: "article",
  },
};

export default function Page() {
  return <BarometrePage lang="fr" />;
}
