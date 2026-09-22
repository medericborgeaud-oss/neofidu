import type { Metadata } from "next";
import { GeneveContent } from "../../../cantons/geneve/page";

export const metadata: Metadata = {
  title: "Accounting & Tax in Canton Geneva",
  description:
    "Online fiduciary in Canton Geneva: tax returns, withholding tax, accounting and business services. Service available in English.",
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/cantons/geneve",
    languages: {
      "fr-CH": "https://neofidu.ch/cantons/geneve",
      "en-CH": "https://neofidu.ch/en/cantons/geneve",
      "x-default": "https://neofidu.ch/cantons/geneve",
    },
  },
  openGraph: {
    title: "Accounting & Tax in Canton Geneva | NeoFidu",
    description: "Online fiduciary in Canton Geneva: tax returns, withholding tax, accounting and business services. Service available in English.",
    type: "website",
    url: "https://neofidu.ch/en/cantons/geneve",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function GeneveEnPage() {
  return <GeneveContent forceEn />;
}
