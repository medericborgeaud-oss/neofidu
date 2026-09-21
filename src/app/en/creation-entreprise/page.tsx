import type { Metadata } from "next";
import { CreationEntrepriseContent } from "../../creation-entreprise/CreationEntrepriseClient";

export const metadata: Metadata = {
  title: "Start a Company in Switzerland: Step-by-Step Guide",
  description:
    "Set up your Swiss company with an online fiduciary: sole proprietorship, LLC or corporation. Steps, costs, commercial register and AVS registration in French-speaking Switzerland. Service available in English.",
  keywords: [
    "start a company Switzerland",
    "create LLC Switzerland",
    "company formation Switzerland",
    "Sarl GmbH Switzerland",
    "business registration Switzerland",
    "fiduciary company formation",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/creation-entreprise",
    languages: {
      "fr-CH": "https://neofidu.ch/creation-entreprise",
      "en-CH": "https://neofidu.ch/en/creation-entreprise",
      "x-default": "https://neofidu.ch/creation-entreprise",
    },
  },
  openGraph: {
    title: "Start a Company in Switzerland: Step-by-Step Guide | NeoFidu",
    description:
      "Set up your Swiss company: sole proprietorship, LLC or corporation. Steps, costs and procedures with an online fiduciary.",
    type: "website",
    url: "https://neofidu.ch/en/creation-entreprise",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function CreationEntrepriseEnPage() {
  return <CreationEntrepriseContent forceEn />;
}
