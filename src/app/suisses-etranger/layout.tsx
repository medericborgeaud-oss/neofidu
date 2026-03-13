import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swiss Expat Tax Returns",
  description: "Swiss tax returns for expats abroad. Manage your taxes from anywhere. 100% online. We speak English!",
  keywords: [
    // English - very important for this page
    "swiss expat tax return",
    "swiss taxes living abroad",
    "swiss tax filing from abroad",
    "expat tax switzerland",
    "swiss abroad tax return",
    "fifth swiss tax filing",
    "swiss property tax abroad",
    "double taxation switzerland",
    "swiss tax return international",
    "swiss tax help expats",
    "file swiss taxes from usa",
    "swiss taxes from uk",
    "swiss taxes from france",
    // French
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
  ],
  openGraph: {
    title: "Swiss Tax Returns for Expats Abroad",
    description: "Living abroad? Manage your Swiss taxes 100% online. We speak English!",
    type: "website",
    locale: "fr_CH",

    siteName: "NeoFidu",
    url: "https://www.neofidu.ch/suisses-etranger",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Tax Returns for Expats",
    description: "100% online Swiss tax filing for expats. We speak English!",
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
