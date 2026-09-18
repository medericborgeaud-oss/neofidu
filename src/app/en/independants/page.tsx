import type { Metadata } from "next";
import { IndependantsContent } from "../../independants/page";

export const metadata: Metadata = {
  title: "Accounting & Tax for the Self-Employed in Switzerland",
  description:
    "Online fiduciary for the self-employed and freelancers in French-speaking Switzerland: AVS registration, 3rd pillar, bookkeeping, VAT and tax optimisation. Service available in English.",
  keywords: [
    "self-employed Switzerland",
    "freelancer Switzerland",
    "sole proprietorship Switzerland",
    "Swiss accounting self-employed",
    "AVS self-employed",
    "fiduciary Switzerland English",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/independants",
    languages: {
      "fr-CH": "https://neofidu.ch/independants",
      "en-CH": "https://neofidu.ch/en/independants",
      "x-default": "https://neofidu.ch/independants",
    },
  },
  openGraph: {
    title: "Accounting & Tax for the Self-Employed in Switzerland | NeoFidu",
    description:
      "Online fiduciary for the self-employed and freelancers in French-speaking Switzerland: AVS, 3rd pillar, bookkeeping, VAT and tax optimisation.",
    type: "website",
    url: "https://neofidu.ch/en/independants",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function IndependantsEnPage() {
  return <IndependantsContent forceEn />;
}
