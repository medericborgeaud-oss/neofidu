import type { Metadata } from "next";
import { BarometrePage, barometreTexts } from "@/components/barometre/BarometrePage";

const { summary } = barometreTexts("en");

export const metadata: Metadata = {
  title: "French-speaking Switzerland tax barometer 2026: taxes by municipality | NeoFidu",
  description: `2026 income tax in the 657 municipalities of French-speaking Switzerland for 4 typical profiles, based on the official Swiss Federal Tax Administration calculator. ${summary[0]}`.slice(0, 300),
  alternates: {
    canonical: "https://neofidu.ch/en/barometre-fiscal",
    languages: {
      "fr-CH": "https://neofidu.ch/barometre-fiscal",
      en: "https://neofidu.ch/en/barometre-fiscal",
    },
  },
  openGraph: {
    title: "French-speaking Switzerland tax barometer 2026",
    description: summary[0],
    url: "https://neofidu.ch/en/barometre-fiscal",
    type: "article",
  },
};

export default function Page() {
  return <BarometrePage lang="en" />;
}
