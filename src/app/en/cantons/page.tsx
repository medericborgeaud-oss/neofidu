import type { Metadata } from "next";
import { CantonsContent } from "../../cantons/page";

export const metadata: Metadata = {
  title: "Accounting & Tax by Canton in French-Speaking Switzerland",
  description:
    "Online fiduciary across French-speaking Switzerland: tax returns, accounting and business services for Vaud, Geneva, Fribourg, Valais, Neuchatel and Jura. Service available in English.",
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/cantons",
    languages: {
      "fr-CH": "https://neofidu.ch/cantons",
      "en-CH": "https://neofidu.ch/en/cantons",
      "x-default": "https://neofidu.ch/cantons",
    },
  },
  openGraph: {
    title: "Accounting & Tax by Canton in French-Speaking Switzerland | NeoFidu",
    description:
      "Online fiduciary across French-speaking Switzerland: Vaud, Geneva, Fribourg, Valais, Neuchatel and Jura.",
    type: "website",
    url: "https://neofidu.ch/en/cantons",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function CantonsEnPage() {
  return <CantonsContent forceEn />;
}
