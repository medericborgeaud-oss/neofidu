// src/components/mcp/ConnecteurPage.tsx
// Page de presentation du connecteur IA (serveur MCP) de NeoFidu, FR et EN.

import Link from "next/link";
import { ChevronRight, Plug } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const MCP_URL = "https://neofidu.ch/api/mcp";

export function ConnecteurPage({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const base = fr ? "" : "/en";

  const tools = fr
    ? [
        ["calculate_income_tax", "Calcule l'impôt sur le revenu 2026 (fédéral, cantonal, communal) pour les 26 cantons, avec le calculateur officiel de l'AFC. Commune précise pour la Suisse romande, 3e pilier, statut marié, enfants, indépendant.", "Combien d'impôts vais-je payer à Nyon avec CHF 120'000 de salaire, marié, 2 enfants ?"],
        ["get_municipality_taxes", "Impôts 2026 d'une des 657 communes romandes pour 4 profils types, avec son rang dans le canton.", "Combien d'impôts paie-t-on à Leysin ?"],
        ["rank_municipalities", "Classement des communes romandes les moins ou les plus imposées, par canton et par profil (baromètre fiscal).", "Quelles sont les 10 communes vaudoises les moins chères pour une famille ?"],
        ["search_tax_guides", "Recherche dans les guides NeoFidu pour remplir sa déclaration (VaudTax, GeTax, VSTax, FriTax) : déductions, codes, montants officiels.", "Où déclarer mes frais de transport dans VaudTax ?"],
      ]
    : [
        ["calculate_income_tax", "Calculates 2026 income tax (federal, cantonal, municipal) for all 26 cantons with the official Swiss Federal Tax Administration calculator. Specific municipality in French-speaking Switzerland, pillar 3a, married status, children, self-employed.", "How much tax will I pay in Nyon on a CHF 120,000 salary, married with 2 children?"],
        ["get_municipality_taxes", "2026 income tax in any of the 657 French-speaking municipalities for 4 typical profiles, with its rank in the canton.", "How much tax do you pay in Leysin?"],
        ["rank_municipalities", "Ranking of the lowest- or highest-taxed French-speaking municipalities, by canton and profile (tax barometer).", "Which are the 10 cheapest municipalities in Vaud for a family?"],
        ["search_tax_guides", "Searches NeoFidu's guides for filling in the tax return (VaudTax, GeTax, VSTax, FriTax): deductions, return codes, official amounts.", "Where do I declare commuting costs in VaudTax?"],
      ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background pt-20 md:pt-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav aria-label="Breadcrumb" className="pt-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href={base || "/"} className="hover:text-primary">
                  {fr ? "Accueil" : "Home"}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li className="text-foreground">{fr ? "Connecteur IA" : "AI connector"}</li>
            </ol>
          </nav>

          <article className="py-8">
            <p className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <Plug className="h-4 w-4" aria-hidden /> MCP · Claude · ChatGPT
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {fr ? "Les impôts suisses directement dans votre assistant IA" : "Swiss taxes right inside your AI assistant"}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {fr
                ? "Ajoutez le connecteur gratuit de NeoFidu à Claude, ChatGPT ou tout assistant compatible MCP (Model Context Protocol). Votre assistant pourra calculer vos impôts 2026 avec le calculateur officiel de l'AFC, comparer les communes romandes et consulter nos guides de déclaration, en citant ses sources."
                : "Add NeoFidu's free connector to Claude, ChatGPT or any assistant that supports MCP (Model Context Protocol). Your assistant can then calculate your 2026 taxes with the official Swiss Federal Tax Administration calculator, compare French-speaking municipalities and read our tax return guides, citing its sources."}
            </p>

            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 mb-8">
              <p className="text-sm font-semibold text-foreground mb-2">{fr ? "Adresse du connecteur" : "Connector URL"}</p>
              <code className="block break-all rounded-md bg-background border border-border px-3 py-2 text-sm">{MCP_URL}</code>
              <p className="text-xs text-muted-foreground mt-2">
                {fr ? "Gratuit, sans compte, en lecture seule. Aucune donnée personnelle n'est conservée." : "Free, no account, read-only. No personal data is stored."}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">{fr ? "Comment l'ajouter" : "How to add it"}</h2>
            <h3 className="text-lg font-semibold text-foreground mb-2">Claude</h3>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mb-5">
              {fr ? (
                <>
                  <li>Ouvrez les paramètres, rubrique Connecteurs.</li>
                  <li>Choisissez « Ajouter un connecteur personnalisé ».</li>
                  <li>Nom : NeoFidu ; URL : {MCP_URL}</li>
                </>
              ) : (
                <>
                  <li>Open Settings, Connectors section.</li>
                  <li>Choose “Add custom connector”.</li>
                  <li>Name: NeoFidu; URL: {MCP_URL}</li>
                </>
              )}
            </ol>
            <h3 className="text-lg font-semibold text-foreground mb-2">ChatGPT</h3>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mb-5">
              {fr ? (
                <>
                  <li>Ouvrez les paramètres, rubrique Applications et connecteurs.</li>
                  <li>Activez le mode développeur dans les paramètres avancés, puis créez un connecteur.</li>
                  <li>URL : {MCP_URL}, sans authentification.</li>
                </>
              ) : (
                <>
                  <li>Open Settings, Apps &amp; Connectors section.</li>
                  <li>Turn on developer mode in the advanced settings, then create a connector.</li>
                  <li>URL: {MCP_URL}, no authentication.</li>
                </>
              )}
            </ol>
            <p className="text-sm text-muted-foreground mb-8">
              {fr
                ? "Les intitulés des menus peuvent varier selon la version et l'abonnement. Tout autre client MCP (« Streamable HTTP ») fonctionne avec la même adresse."
                : "Menu labels may vary by version and plan. Any other MCP client (“Streamable HTTP”) works with the same URL."}
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">{fr ? "Ce que votre assistant peut faire" : "What your assistant can do"}</h2>
            <div className="space-y-4 mb-8">
              {tools.map(([name, desc, ex]) => (
                <div key={name} className="rounded-lg border border-border p-4">
                  <p className="font-mono text-sm text-primary mb-1">{name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{desc}</p>
                  <p className="text-sm text-foreground">
                    <span className="text-muted-foreground">{fr ? "Exemple : " : "Example: "}</span>« {ex} »
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">{fr ? "Sources et limites" : "Sources and limits"}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {fr ? (
                <>
                  Les montants viennent du calculateur fiscal officiel de l&apos;Administration fédérale des contributions (période fiscale 2026) et des{" "}
                  <Link href="/guide/vaudtax" className="text-primary underline">guides NeoFidu</Link>. Ils sont indicatifs : impôt sur le revenu uniquement, déductions standard, sans impôt sur la fortune ni impôt ecclésiastique. Pour un calcul complet,{" "}
                  <Link href="/demande" className="text-primary underline">confiez votre déclaration à NeoFidu</Link> (dès CHF 89).
                </>
              ) : (
                <>
                  Amounts come from the official Swiss Federal Tax Administration calculator (2026 tax period) and{" "}
                  <Link href="/en/guide/vaudtax" className="text-primary underline">NeoFidu&apos;s guides</Link>. They are indicative: income tax only, standard deductions, no wealth or church tax. For a full calculation,{" "}
                  <Link href="/en/demande" className="text-primary underline">have NeoFidu prepare your tax return</Link> (from CHF 89).
                </>
              )}
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
