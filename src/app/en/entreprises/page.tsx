import type { Metadata } from "next";
import { EntreprisesContent } from "../../entreprises/page";

export const metadata: Metadata = {
  title: "Accounting & Tax Services for Companies in Switzerland",
  description:
    "Online fiduciary for Swiss companies (LLC, corporation): bookkeeping, annual accounts, VAT, payroll and tax optimisation in French-speaking Switzerland. Service available in English.",
  keywords: [
    "company accounting Switzerland",
    "LLC accounting Switzerland",
    "Swiss corporate tax",
    "bookkeeping Switzerland",
    "payroll Switzerland",
    "fiduciary companies Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/entreprises",
    languages: {
      "fr-CH": "https://neofidu.ch/entreprises",
      "en-CH": "https://neofidu.ch/en/entreprises",
      "x-default": "https://neofidu.ch/entreprises",
    },
  },
  openGraph: {
    title: "Accounting & Tax Services for Companies in Switzerland | NeoFidu",
    description:
      "Online fiduciary for Swiss companies: bookkeeping, annual accounts, VAT, payroll and tax optimisation.",
    type: "website",
    url: "https://neofidu.ch/en/entreprises",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function EntreprisesEnPage() {
  return <EntreprisesContent forceEn />;
}
