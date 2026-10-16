import type { Metadata } from "next";
import MentionsLegalesPage from "@/app/mentions-legales/page";

export const metadata: Metadata = {
  title: { absolute: "Legal Notice | NeoFidu" },
  description: "Legal information for NeoFidu, a Swiss fiduciary based in the Canton of Vaud, in accordance with Swiss law.",
  alternates: {
    canonical: "https://neofidu.ch/en/mentions-legales",
    languages: {
      "fr-CH": "https://neofidu.ch/mentions-legales",
      "en-CH": "https://neofidu.ch/en/mentions-legales",
      "x-default": "https://neofidu.ch/mentions-legales",
    },
  },
};

export default function Page() {
  return <MentionsLegalesPage />;
}
