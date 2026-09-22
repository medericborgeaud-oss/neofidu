import type { Metadata } from "next";
import { NeuchatelContent } from "../../../cantons/neuchatel/page";

export const metadata: Metadata = {
  title: "Accounting & Tax in Canton Neuchatel",
  description:
    "Online fiduciary in Canton Neuchatel: tax returns, accounting and business services across the canton. Service available in English.",
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/cantons/neuchatel",
    languages: {
      "fr-CH": "https://neofidu.ch/cantons/neuchatel",
      "en-CH": "https://neofidu.ch/en/cantons/neuchatel",
      "x-default": "https://neofidu.ch/cantons/neuchatel",
    },
  },
  openGraph: {
    title: "Accounting & Tax in Canton Neuchatel | NeoFidu",
    description: "Online fiduciary in Canton Neuchatel: tax returns, accounting and business services across the canton. Service available in English.",
    type: "website",
    url: "https://neofidu.ch/en/cantons/neuchatel",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function NeuchatelEnPage() {
  return <NeuchatelContent forceEn />;
}
