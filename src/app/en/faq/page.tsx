import type { Metadata } from "next";
import { FAQContent } from "../../faq/page";

export const metadata: Metadata = {
  title: "FAQ: Swiss Tax & Accounting Questions Answered",
  description:
    "Answers to common questions about Swiss tax returns, accounting, VAT, self-employment and company formation in French-speaking Switzerland. Service available in English.",
  keywords: [
    "Swiss tax FAQ",
    "Swiss accounting questions",
    "tax return Switzerland help",
    "fiduciary FAQ Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/faq",
    languages: {
      "fr-CH": "https://neofidu.ch/faq",
      "en-CH": "https://neofidu.ch/en/faq",
      "x-default": "https://neofidu.ch/faq",
    },
  },
  openGraph: {
    title: "FAQ: Swiss Tax & Accounting Questions Answered | NeoFidu",
    description:
      "Answers to common questions about Swiss tax, accounting, VAT, self-employment and company formation.",
    type: "website",
    url: "https://neofidu.ch/en/faq",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function FAQEnPage() {
  return <FAQContent forceEn />;
}
