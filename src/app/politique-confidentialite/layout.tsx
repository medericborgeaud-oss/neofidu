import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de NeoFidu. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au droit suisse.",
  openGraph: {
    title: "Politique de Confidentialité | NeoFidu",
    description: "Découvrez comment NeoFidu protège vos données personnelles.",
  },
};

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
