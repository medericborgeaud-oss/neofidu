import type { Metadata } from "next";
import { ConnecteurPage } from "@/components/mcp/ConnecteurPage";

export const metadata: Metadata = {
  title: "AI connector: Swiss taxes in Claude and ChatGPT",
  description:
    "Add NeoFidu's free MCP connector to Claude or ChatGPT: 2026 income tax with the official Swiss Federal Tax Administration calculator, taxes in 657 French-speaking municipalities, tax return guides.",
  alternates: {
    canonical: "https://neofidu.ch/en/connecteur-ia",
    languages: { "fr-CH": "https://neofidu.ch/connecteur-ia", en: "https://neofidu.ch/en/connecteur-ia" },
  },
};

export default function Page() {
  return <ConnecteurPage lang="en" />;
}
