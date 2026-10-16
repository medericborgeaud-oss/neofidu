import type { Metadata } from "next";
import ConditionsGeneralesPage from "@/app/conditions-generales/page";

export const metadata: Metadata = {
  title: { absolute: "Terms and Conditions | NeoFidu" },
  description: "General Terms and Conditions governing NeoFidu's fiduciary, accounting and tax services in Switzerland.",
  alternates: {
    canonical: "https://neofidu.ch/en/conditions-generales",
    languages: {
      "fr-CH": "https://neofidu.ch/conditions-generales",
      "en-CH": "https://neofidu.ch/en/conditions-generales",
      "x-default": "https://neofidu.ch/conditions-generales",
    },
  },
};

export default function Page() {
  return <ConditionsGeneralesPage />;
}
