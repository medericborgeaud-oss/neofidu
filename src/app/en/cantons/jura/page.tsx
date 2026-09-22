import type { Metadata } from "next";
import { JuraContent } from "../../../cantons/jura/page";

export const metadata: Metadata = {
  title: "Accounting & Tax in Canton Jura",
  description:
    "Online fiduciary in Canton Jura: tax returns, accounting and business services across the canton. Service available in English.",
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/cantons/jura",
    languages: {
      "fr-CH": "https://neofidu.ch/cantons/jura",
      "en-CH": "https://neofidu.ch/en/cantons/jura",
      "x-default": "https://neofidu.ch/cantons/jura",
    },
  },
  openGraph: {
    title: "Accounting & Tax in Canton Jura | NeoFidu",
    description: "Online fiduciary in Canton Jura: tax returns, accounting and business services across the canton. Service available in English.",
    type: "website",
    url: "https://neofidu.ch/en/cantons/jura",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function JuraEnPage() {
  return <JuraContent forceEn />;
}
