import type { Metadata } from "next";
import { BarometreEntreprisesPage, barometreEntreprisesTexts } from "@/components/barometre/BarometreEntreprisesPage";

const { summary } = barometreEntreprisesTexts("fr");

export const metadata: Metadata = {
  title: "Baromètre fiscal des entreprises 2026 : indépendants et Sàrl par commune",
  description: `Impôts 2026 d'un indépendant et d'une petite Sàrl dans les 657 communes romandes, d'après le calculateur officiel de l'AFC. ${summary[0]}`.slice(0, 300),
  alternates: {
    canonical: "https://neofidu.ch/barometre-fiscal/entreprises",
    languages: {
      "fr-CH": "https://neofidu.ch/barometre-fiscal/entreprises",
      en: "https://neofidu.ch/en/barometre-fiscal/entreprises",
    },
  },
  openGraph: {
    title: "Baromètre fiscal des entreprises 2026",
    description: summary[0],
    url: "https://neofidu.ch/barometre-fiscal/entreprises",
    type: "article",
  },
};

export default function Page() {
  return <BarometreEntreprisesPage lang="fr" />;
}
