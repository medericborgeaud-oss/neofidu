import type { Metadata } from "next";
import { ConnecteurPage } from "@/components/mcp/ConnecteurPage";

export const metadata: Metadata = {
  title: "Connecteur IA : les impôts suisses dans Claude et ChatGPT",
  description:
    "Ajoutez le connecteur MCP gratuit de NeoFidu à Claude ou ChatGPT : calcul de l'impôt 2026 avec le calculateur officiel de l'AFC, impôts des 657 communes romandes, guides de déclaration.",
  alternates: {
    canonical: "https://neofidu.ch/connecteur-ia",
    languages: { "fr-CH": "https://neofidu.ch/connecteur-ia", en: "https://neofidu.ch/en/connecteur-ia" },
  },
};

export default function Page() {
  return <ConnecteurPage lang="fr" />;
}
