import type { Metadata } from "next";
import DemandePage from "@/app/demande/page";

export const metadata: Metadata = {
  title: { absolute: "File Your Swiss Tax Return Online | Free Quote | NeoFidu" },
  description:
    "Submit your Swiss tax return request online. For individuals, couples and the self-employed across French-speaking Switzerland. Instant personalized quote, from CHF 89. We speak English!",
  keywords: [
    "swiss tax return online",
    "file taxes switzerland english",
    "expat tax return switzerland",
    "tax filing service switzerland",
    "online tax declaration switzerland english",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/demande",
    languages: {
      "fr-CH": "https://neofidu.ch/demande",
      "en-CH": "https://neofidu.ch/en/demande",
      "x-default": "https://neofidu.ch/demande",
    },
  },
  openGraph: {
    title: "File Your Swiss Tax Return Online | NeoFidu",
    description:
      "Submit your tax return request online. Instant quote, from CHF 89. We speak English!",
    type: "website",
    url: "https://neofidu.ch/en/demande",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function EnDemandePage() {
  return <DemandePage />;
}
