import type { Metadata } from "next";
import ExpatsClient from "./ExpatsClient";

export const metadata: Metadata = {
  title: { absolute: "Swiss Tax Returns for Expats in Switzerland | English Service" },
  description:
    "File your Swiss tax return in English. Expat tax service in French-speaking Switzerland: B, C, L and G permits, withholding tax (quellensteuer) refunds, from CHF 89.",
  keywords: [
    "expat tax Switzerland",
    "Swiss tax return English",
    "quellensteuer refund",
    "withholding tax Switzerland",
    "English speaking fiduciary Switzerland",
    "B permit tax return",
    "cross-border tax Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/expats",
    languages: {
      "en-CH": "https://neofidu.ch/en/expats",
      "x-default": "https://neofidu.ch/en/expats",
    },
  },
  openGraph: {
    title: "Swiss Tax Returns for Expats in Switzerland | NeoFidu",
    description:
      "File your Swiss tax return in English. Expat tax service: permits, withholding tax refunds, from CHF 89.",
    type: "website",
    url: "https://neofidu.ch/en/expats",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function ExpatsEnPage() {
  return <ExpatsClient />;
}
