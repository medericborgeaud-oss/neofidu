import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swiss Tax Return Online",
  description: "File your Swiss tax return from your smartphone. Upload documents, we handle the rest. Vaud, Geneva, Valais.",
  keywords: [
    // English
    "swiss tax return online",
    "file taxes switzerland",
    "swiss tax filing app",
    "submit tax return switzerland",
    "expat tax switzerland",
    "swiss tax help english",
    // French
    "déclaration impôts smartphone",
    "déclaration impôts iPhone",
    "déclaration impôts mobile",
    "demande déclaration impôts",
    "devis comptabilité",
    "formulaire fiduciaire",
    "devis gratuit suisse",
  ],
  openGraph: {
    title: "Swiss Tax Return from Your Phone",
    description: "File your Swiss taxes from your smartphone in 5 minutes. We speak English! Vaud, Geneva, Valais.",
    url: "https://www.neofidu.ch/demande",

  },
  alternates: {
    canonical: "https://www.neofidu.ch/demande",
  },
};

export default function DemandeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
