import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Protection des données chez NeoFidu. Collecte, utilisation et sécurité selon le droit suisse (LPD).",
  openGraph: {
    title: "Confidentialité | NeoFidu",
    description: "Protection des données personnelles chez NeoFidu.",
    url: "https://www.neofidu.ch/politique-confidentialite",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/politique-confidentialite",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
