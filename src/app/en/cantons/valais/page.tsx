import type { Metadata } from "next";
import { ValaisContent } from "../../../cantons/valais/page";

export const metadata: Metadata = {
  title: "Accounting & Tax in Canton Valais",
  description:
    "Online fiduciary in Canton Valais: tax returns, accounting and business services in Sion, Martigny and across Valais. Service available in English.",
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/cantons/valais",
    languages: {
      "fr-CH": "https://neofidu.ch/cantons/valais",
      "en-CH": "https://neofidu.ch/en/cantons/valais",
      "x-default": "https://neofidu.ch/cantons/valais",
    },
  },
  openGraph: {
    title: "Accounting & Tax in Canton Valais | NeoFidu",
    description: "Online fiduciary in Canton Valais: tax returns, accounting and business services in Sion, Martigny and across Valais. Service available in English.",
    type: "website",
    url: "https://neofidu.ch/en/cantons/valais",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function ValaisEnPage() {
  return <ValaisContent forceEn />;
}
