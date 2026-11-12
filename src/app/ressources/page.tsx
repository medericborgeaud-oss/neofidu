import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Ressources fiscales gratuites | Simulateurs, guides et données | NeoFidu",
  description:
    "Toutes les ressources gratuites de NeoFidu : simulateurs d'impôts, guides pour remplir sa déclaration dans les six cantons romands, données fiscales par commune et actualités.",
  alternates: { canonical: "https://neofidu.ch/ressources" },
};

type ResourceLink = { href: string; label: string; description: string };

const sections: { id: string; title: string; intro: string; links: ResourceLink[] }[] = [
  {
    id: "simulateurs",
    title: "Simulateurs gratuits",
    intro: "Estimez vos impôts et votre épargne en quelques minutes, sans inscription.",
    links: [
      { href: "/simulateur/impots", label: "Simulateur d'impôts", description: "Revenu et fortune, 26 cantons" },
      { href: "/simulateur/salaire-net", label: "Salaire net", description: "Du brut au net, par canton" },
      { href: "/simulateur/3eme-pilier", label: "3e pilier", description: "Économie d'impôt et capital" },
      { href: "/simulateur/gain-immobilier", label: "Gain immobilier", description: "Impôt sur la plus-value" },
      { href: "/simulateur/retraite", label: "Revenus à la retraite", description: "AVS, LPP et 3e pilier" },
      { href: "/simulateur/valeur-locative", label: "Valeur locative", description: "Propriétaires occupants" },
      { href: "/simulateur/baisse-loyer", label: "Baisse de loyer", description: "Selon le taux de référence" },
    ],
  },
  {
    id: "guides",
    title: "Faire sa déclaration soi-même",
    intro: "Des guides pas à pas, logiciel par logiciel, pour remplir votre déclaration vous-même.",
    links: [
      { href: "/guide/vaudtax", label: "Guide VaudTax", description: "Canton de Vaud" },
      { href: "/guide/getax", label: "Guide GeTax", description: "Canton de Genève" },
      { href: "/guide/vstax", label: "Guide VSTax", description: "Canton du Valais" },
      { href: "/guide/fritax", label: "Guide FriTax", description: "Canton de Fribourg" },
      { href: "/guide/juratax", label: "Guide JuraTax", description: "Canton du Jura" },
      { href: "/guide/deductions-fiscales", label: "Déductions fiscales", description: "Toutes les déductions expliquées" },
      { href: "/blog/impot-source-suisse-guide-complet-2026", label: "Impôt à la source", description: "Guide complet" },
      { href: "/blog/declaration-impots-2025-guide-complet", label: "Première déclaration", description: "Les bases pour bien commencer" },
    ],
  },
  {
    id: "donnees",
    title: "Données fiscales",
    intro: "Chiffres officiels pour comparer les communes et les cantons romands.",
    links: [
      { href: "/barometre-fiscal", label: "Baromètre fiscal 2026", description: "Particuliers, par commune" },
      { href: "/barometre-fiscal/entreprises", label: "Baromètre fiscal entreprises", description: "Indépendants et petites Sàrl" },
      { href: "/simulateur/carte-impots", label: "Carte des impôts", description: "Les 26 cantons sur une carte" },
      { href: "/communes", label: "Communes romandes", description: "Coefficients et charge fiscale" },
      { href: "/observatoire", label: "Observatoire des entreprises", description: "Statistiques économiques" },
      { href: "/dette-suisse", label: "Compteur de la dette suisse", description: "Confédération et cantons romands" },
    ],
  },
  {
    id: "plus",
    title: "Actualités et outils",
    intro: "Pour suivre l'actualité fiscale et utiliser nos données ailleurs.",
    links: [
      { href: "/blog", label: "Blog fiscal", description: "Actualités et analyses" },
      { href: "/faq", label: "FAQ", description: "Questions fréquentes" },
      { href: "/connecteur-ia", label: "Connecteur IA", description: "Nos données dans Claude ou ChatGPT" },
    ],
  },
];

export default function RessourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <BreadcrumbLight className="container mx-auto px-4" items={[{ label: "Ressources" }]} />

        <section className="container mx-auto px-4 pt-8 pb-6 md:pt-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Ressources gratuites</h1>
            <p className="text-muted-foreground text-lg">
              Simulateurs, guides et données pour comprendre vos impôts en Suisse romande. Et si vous
              préférez déléguer, nous nous occupons de votre déclaration dès CHF 89.-.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-1">{section.title}</h2>
              <p className="text-muted-foreground mb-5">{section.intro}</p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block h-full rounded-lg border border-border p-4 hover:border-primary/40 transition-colors group"
                    >
                      <span className="font-medium group-hover:text-primary transition-colors">{link.label}</span>
                      <span className="block text-sm text-muted-foreground mt-1">{link.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="rounded-xl bg-secondary/40 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Vous préférez déléguer ?</h2>
              <p className="text-muted-foreground">
                Nous préparons et déposons votre déclaration d&apos;impôts. Prix confirmé avant de commencer.
              </p>
            </div>
            <Link
              href="/demande"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
            >
              Déposer ma demande
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
