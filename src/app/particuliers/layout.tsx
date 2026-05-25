import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d’impôts pour particuliers | NeoFidu",
  description:
    "Confiez votre déclaration d’impôts à des spécialistes diplômés. Service 100% en ligne pour salariés en Suisse romande. Dès CHF 89.- Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura.",
  keywords: [
    "déclaration impôts particulier",
    "déclaration impôts salarié",
    "fiduciaire en ligne suisse",
    "faire sa déclaration d impôts",
    "aide déclaration fiscale",
    "déclaration impôts vaud",
    "déclaration impôts genève",
    "impôts suisse romande",
    "remplir déclaration impôts",
    "optimisation fiscale particulier",
    "fiduciaire pas cher suisse",
    "déclaration impôts en ligne",
    "tax return switzerland",
    "swiss tax declaration service",
  ],
  openGraph: {
    title: "Déclaration d’impôts pour particuliers | NeoFidu",
    description:
      "Service de déclaration d’impôts 100% en ligne pour salariés en Suisse romande. Spécialistes diplômés, dès CHF 89.-",
    url: "https://neofidu.ch/particuliers",
    siteName: "NeoFidu",
    type: "website",
  },
  alternates: {
    canonical: "https://neofidu.ch/particuliers",
  },
};

export default function ParticuliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
