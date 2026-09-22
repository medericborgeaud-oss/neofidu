import type { Metadata } from "next";
import { SuissesDeLEtrangerContent } from "../../suisses-de-letranger/page";

export const metadata: Metadata = {
  title: "Swiss Abroad: Tax & Accounting Services in Switzerland",
  description:
    "Online fiduciary for Swiss citizens living abroad: Swiss tax return, real estate, double taxation and AVS from wherever you live. Service available in English.",
  keywords: [
    "Swiss abroad tax",
    "Swiss expat tax return",
    "double taxation Switzerland",
    "Swiss property tax non-resident",
    "fiduciary Swiss abroad",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/suisses-de-letranger",
    languages: {
      "fr-CH": "https://neofidu.ch/suisses-de-letranger",
      "en-CH": "https://neofidu.ch/en/suisses-de-letranger",
      "x-default": "https://neofidu.ch/suisses-de-letranger",
    },
  },
  openGraph: {
    title: "Swiss Abroad: Tax & Accounting Services in Switzerland | NeoFidu",
    description:
      "Online fiduciary for Swiss citizens living abroad: Swiss tax return, real estate, double taxation and AVS.",
    type: "website",
    url: "https://neofidu.ch/en/suisses-de-letranger",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function SuissesDeLEtrangerEnPage() {
  return <SuissesDeLEtrangerContent forceEn />;
}
