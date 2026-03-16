import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'impôts Suisses de l'étranger | NeoFidu",
  description: "Déclaration d'impôts pour les Suisses résidant à l'étranger. Gérez vos impôts suisses depuis n'importe où dans le monde. 100% en ligne. Dès CHF 100.-",
  keywords: [
    // French - primary audience
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
    // English - secondary
    "swiss expat tax return",
    "swiss taxes living abroad",
    "swiss tax filing from abroad",
    "expat tax switzerland",
    "swiss abroad tax return",
    "fifth swiss tax filing",
    "swiss property tax abroad",
    "double taxation switzerland",
  ],
  openGraph: {
    title: "Déclaration d'impôts Suisses de l'étranger | NeoFidu",
    description: "Gérez vos impôts suisses depuis l'étranger. Service 100% en ligne pour les expatriés suisses. Dès CHF 100.-",
    type: "website",
    locale: "fr_CH",
    siteName: "NeoFidu",
    url: "https://www.neofidu.ch/suisses-etranger",
  },
  twitter: {
    card: "summary_large_image",
    title: "Déclaration d'impôts Suisses de l'étranger",
    description: "Service fiscal 100% en ligne pour les Suisses résidant à l'étranger. Dès CHF 100.-",
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
