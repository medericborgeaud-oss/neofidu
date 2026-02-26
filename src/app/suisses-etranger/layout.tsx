import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts Suisses de l'étranger | Fiduciaire en ligne | NeoFidu",
  description: "Service de déclaration d'impôts pour les Suisses expatriés. Gérez vos obligations fiscales suisses depuis n'importe où dans le monde. 100% en ligne, experts en fiscalité internationale.",
  keywords: [
    "suisse de l'étranger impôts",
    "déclaration impôts expatrié suisse",
    "fiduciaire suisse étranger",
    "impôts suisse depuis l'étranger",
    "5ème suisse déclaration fiscale",
    "expatrié suisse impôts",
    "déclaration fiscale suisse en ligne",
    "aide impôts suisse expatrié",
    "fiduciaire en ligne expatriés",
    "double imposition suisse",
    "impôts immobilier suisse étranger",
    "retour suisse impôts",
    "imposition suisses à l'étranger",
    "fiscalité internationale suisse",
  ].join(", "),
  openGraph: {
    title: "Déclaration d'impôts pour Suisses de l'étranger | NeoFidu",
    description: "Vous vivez à l'étranger ? Gérez vos obligations fiscales suisses 100% en ligne avec NeoFidu, votre fiduciaire digitale.",
    type: "website",
    locale: "fr_CH",
    siteName: "NeoFidu",
    url: "https://www.neofidu.ch/suisses-etranger",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impôts Suisses de l'étranger | NeoFidu",
    description: "Déclaration d'impôts 100% en ligne pour expatriés suisses",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/suisses-etranger",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SuissesEtrangerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
