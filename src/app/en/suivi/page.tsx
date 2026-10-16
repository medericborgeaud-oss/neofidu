import type { Metadata } from "next";
import SuiviPage from "@/app/suivi/page";

export const metadata: Metadata = {
  title: { absolute: "Track my request | NeoFidu" },
  description: "Track the progress of your tax or accounting request with NeoFidu using your reference number.",
  alternates: {
    canonical: "https://neofidu.ch/en/suivi",
    languages: {
      "fr-CH": "https://neofidu.ch/suivi",
      "en-CH": "https://neofidu.ch/en/suivi",
      "x-default": "https://neofidu.ch/suivi",
    },
  },
};

export default function Page() {
  return <SuiviPage />;
}
