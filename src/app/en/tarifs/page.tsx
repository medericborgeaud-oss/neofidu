import type { Metadata } from "next";
import { TarifsContent } from "../../tarifs/page";

export const metadata: Metadata = {
  title: "Pricing: Online Fiduciary in Switzerland",
  description:
    "Transparent pricing for our online fiduciary services in French-speaking Switzerland: tax returns from CHF 89, accounting, VAT and company formation. No hidden fees. Service available in English.",
  keywords: [
    "fiduciary pricing Switzerland",
    "tax return price Switzerland",
    "accounting price Switzerland",
    "online fiduciary cost",
    "NeoFidu pricing",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/tarifs",
    languages: {
      "fr-CH": "https://neofidu.ch/tarifs",
      "en-CH": "https://neofidu.ch/en/tarifs",
      "x-default": "https://neofidu.ch/tarifs",
    },
  },
  openGraph: {
    title: "Pricing — Online Fiduciary in Switzerland | NeoFidu",
    description:
      "Transparent pricing: tax returns from CHF 89, accounting, VAT and company formation in French-speaking Switzerland.",
    type: "website",
    url: "https://neofidu.ch/en/tarifs",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function TarifsEnPage() {
  return <TarifsContent forceEn />;
}
