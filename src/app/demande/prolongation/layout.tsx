import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prolongation délai déclaration d'impôts 2025 | CHF 20.- | NeoFidu",
  description: "Obtenez une prolongation de délai pour votre déclaration d'impôts 2025 en Suisse romande. Service rapide à CHF 20.- TTC. Cantons VD, GE, VS, NE, FR, JU. Traitement sous 1 jour ouvré.",
  keywords: ["prolongation délai impôts", "extension délai déclaration impôts", "prolongation fiscale Suisse", "délai déclaration impôts Vaud", "prolongation impôts Genève"],
  openGraph: {
    title: "Prolongation délai déclaration d'impôts 2025 | NeoFidu",
    description: "Obtenez une prolongation de délai pour votre déclaration d'impôts 2025. CHF 20.- TTC. Cantons VD, GE, VS, NE, FR, JU.",
    url: "https://www.neofidu.ch/demande/prolongation",
    siteName: "NeoFidu",
    locale: "fr_CH",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.neofidu.ch/demande/prolongation",
  },
};

export default function ProlongationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
