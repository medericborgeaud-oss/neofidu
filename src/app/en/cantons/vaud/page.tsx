import type { Metadata } from "next";
import { VaudContent } from "../../../cantons/vaud/page";

export const metadata: Metadata = {
  title: "Accounting & Tax in Canton Vaud",
  description:
    "Online fiduciary in Canton Vaud: tax returns, accounting and business services in Lausanne, Morges, Nyon, Yverdon and across Vaud. Service available in English.",
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/cantons/vaud",
    languages: {
      "fr-CH": "https://neofidu.ch/cantons/vaud",
      "en-CH": "https://neofidu.ch/en/cantons/vaud",
      "x-default": "https://neofidu.ch/cantons/vaud",
    },
  },
  openGraph: {
    title: "Accounting & Tax in Canton Vaud | NeoFidu",
    description: "Online fiduciary in Canton Vaud: tax returns, accounting and business services in Lausanne, Morges, Nyon, Yverdon and across Vaud. Service available in English.",
    type: "website",
    url: "https://neofidu.ch/en/cantons/vaud",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function VaudEnPage() {
  return <VaudContent forceEn />;
}
