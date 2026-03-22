import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fiduciaire par canton — Vaud, Genève, Valais, Fribourg | NeoFidu",
  description: "Fiduciaire digitale spécialisée par canton suisse. Déclaration d'impôts, comptabilité et conseil fiscal pour Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura.",
  keywords: [
    "fiduciaire vaud",
    "fiduciaire geneve",
    "fiduciaire valais",
    "comptabilite suisse romande",
    "declaration impots vaud",
    "declaration impots geneve",
    "fiduciaire fribourg",
    "fiduciaire neuchatel",
    "conseiller fiscal suisse",
    "tax advisor switzerland",
  ],
  openGraph: {
    title: "Fiduciaire par canton — Vaud, Genève, Valais, Fribourg | NeoFidu",
    description: "Fiduciaire digitale spécialisée pour chaque canton de Suisse romande.",
    url: "https://www.neofidu.ch/cantons",
    type: "website",
    images: [{ url: "https://www.neofidu.ch/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiduciaire par canton | NeoFidu",
    description: "Fiduciaire digitale spécialisée pour Vaud, Genève, Valais, Fribourg, Neuchâtel et Jura.",
    images: ["https://www.neofidu.ch/og-image.svg"],
  },
  alternates: {
    canonical: "https://www.neofidu.ch/cantons",
    languages: {
      "fr-CH": "https://www.neofidu.ch/cantons",
      "x-default": "https://www.neofidu.ch/cantons",
    },
  },
};

export default function CantonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
