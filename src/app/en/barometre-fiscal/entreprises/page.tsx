import type { Metadata } from "next";
import { BarometreEntreprisesPage, barometreEntreprisesTexts } from "@/components/barometre/BarometreEntreprisesPage";

const { summary } = barometreEntreprisesTexts("en");

export const metadata: Metadata = {
  title: "Business tax barometer 2026: self-employed and LLCs by municipality",
  description: `2026 taxes of a self-employed person and a small LLC in the 657 municipalities of French-speaking Switzerland, based on the official FTA calculator. ${summary[0]}`.slice(0, 300),
  alternates: {
    canonical: "https://neofidu.ch/en/barometre-fiscal/entreprises",
    languages: {
      "fr-CH": "https://neofidu.ch/barometre-fiscal/entreprises",
      en: "https://neofidu.ch/en/barometre-fiscal/entreprises",
    },
  },
  openGraph: {
    title: "Business tax barometer 2026",
    description: summary[0],
    url: "https://neofidu.ch/en/barometre-fiscal/entreprises",
    type: "article",
  },
};

export default function Page() {
  return <BarometreEntreprisesPage lang="en" />;
}
