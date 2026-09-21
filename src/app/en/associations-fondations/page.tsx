import type { Metadata } from "next";
import { AssociationsFondationsContent } from "../../associations-fondations/page";

export const metadata: Metadata = {
  title: "Accounting & Tax for Associations and Foundations in Switzerland",
  description:
    "Online fiduciary for Swiss associations and foundations: bookkeeping, annual accounts, tax exemption, VAT and reporting in French-speaking Switzerland. Service available in English.",
  keywords: [
    "association accounting Switzerland",
    "foundation accounting Switzerland",
    "non-profit tax Switzerland",
    "tax exemption association Switzerland",
    "fiduciary associations Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/associations-fondations",
    languages: {
      "fr-CH": "https://neofidu.ch/associations-fondations",
      "en-CH": "https://neofidu.ch/en/associations-fondations",
      "x-default": "https://neofidu.ch/associations-fondations",
    },
  },
  openGraph: {
    title: "Accounting & Tax for Associations and Foundations in Switzerland | NeoFidu",
    description:
      "Online fiduciary for Swiss associations and foundations: bookkeeping, annual accounts, tax exemption, VAT and reporting.",
    type: "website",
    url: "https://neofidu.ch/en/associations-fondations",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function AssociationsFondationsEnPage() {
  return <AssociationsFondationsContent forceEn />;
}
