import type { Metadata } from "next";
import PolitiqueConfidentialitePage from "@/app/politique-confidentialite/page";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | NeoFidu" },
  description: "How NeoFidu collects, uses and protects your personal data, in line with the Swiss Data Protection Act (FADP).",
  alternates: {
    canonical: "https://neofidu.ch/en/politique-confidentialite",
    languages: {
      "fr-CH": "https://neofidu.ch/politique-confidentialite",
      "en-CH": "https://neofidu.ch/en/politique-confidentialite",
      "x-default": "https://neofidu.ch/politique-confidentialite",
    },
  },
};

export default function Page() {
  return <PolitiqueConfidentialitePage />;
}
