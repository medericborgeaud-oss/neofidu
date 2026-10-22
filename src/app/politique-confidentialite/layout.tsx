import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Protection des données chez NeoFidu. Collecte, utilisation et sécurité selon le droit suisse (LPD).",
  openGraph: {
    title: "Confidentialité",
    description: "Protection des données personnelles chez NeoFidu.",
    url: "https://neofidu.ch/politique-confidentialite",
  },
  alternates: {
    canonical: "https://neofidu.ch/politique-confidentialite",
    languages: {
      "fr-CH": "https://neofidu.ch/politique-confidentialite",
      "en-CH": "https://neofidu.ch/en/politique-confidentialite",
      "x-default": "https://neofidu.ch/politique-confidentialite",
    },
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
