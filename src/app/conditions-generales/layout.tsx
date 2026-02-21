import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales",
  description: "Conditions générales d'utilisation des services NeoFidu. Prestations, responsabilités et tarifs.",
  openGraph: {
    title: "CGU | NeoFidu",
    description: "Conditions générales d'utilisation des services NeoFidu.",
    url: "https://www.neofidu.ch/conditions-generales",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/conditions-generales",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function ConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
