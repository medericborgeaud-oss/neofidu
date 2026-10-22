import type { Metadata } from "next";
import CarteImpotsPage from "@/app/simulateur/carte-impots/page";

export const metadata: Metadata = {
  title: { absolute: "Swiss Tax Map 2026: Compare Cantons | NeoFidu" },
  description:
    "Interactive Swiss tax map 2026. Compare the tax burden of all 26 Swiss cantons and French-speaking municipalities at a glance.",
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur/carte-impots",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur/carte-impots",
      "en-CH": "https://neofidu.ch/en/simulateur/carte-impots",
      "x-default": "https://neofidu.ch/simulateur/carte-impots",
    },
  },
  openGraph: {
    title: "Swiss Tax Map 2026: Compare Cantons | NeoFidu",
    description:
      "Interactive Swiss tax map 2026. Compare the tax burden of all 26 Swiss cantons.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur/carte-impots",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function CarteImpotsEnPage() {
  return <CarteImpotsPage />;
}
