import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez NeoFidu, votre fiduciaire digitale en Suisse. Déclaration d'impôts, comptabilité, création d'entreprise — we speak English!",
  keywords: [
    "contact fiduciaire suisse",
    "contact neofidu",
    "fiduciaire en ligne contact",
    "contact tax advisor switzerland",
    "contact accountant switzerland",
  ],
  openGraph: {
    title: "Contact NeoFidu | Fiduciaire digitale en Suisse",
    description:
      "Contactez notre équipe. We speak English!",
    type: "website",
    url: "https://www.neofidu.ch/contact",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
