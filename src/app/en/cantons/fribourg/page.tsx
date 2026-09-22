import type { Metadata } from "next";
import { FribourgContent } from "../../../cantons/fribourg/page";

export const metadata: Metadata = {
  title: "Accounting & Tax in Canton Fribourg",
  description:
    "Online fiduciary in Canton Fribourg: tax returns, accounting and business services across the canton. Service available in English.",
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/cantons/fribourg",
    languages: {
      "fr-CH": "https://neofidu.ch/cantons/fribourg",
      "en-CH": "https://neofidu.ch/en/cantons/fribourg",
      "x-default": "https://neofidu.ch/cantons/fribourg",
    },
  },
  openGraph: {
    title: "Accounting & Tax in Canton Fribourg | NeoFidu",
    description: "Online fiduciary in Canton Fribourg: tax returns, accounting and business services across the canton. Service available in English.",
    type: "website",
    url: "https://neofidu.ch/en/cantons/fribourg",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function FribourgEnPage() {
  return <FribourgContent forceEn />;
}
