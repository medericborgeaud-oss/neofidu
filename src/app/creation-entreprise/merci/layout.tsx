import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande reçue | Création d'entreprise | Neofidu",
  description:
    "Votre demande de création d'entreprise a été reçue. Notre équipe vous contactera.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
