import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { SimulatorCTA } from "@/components/SimulatorCTA";
import {
  Calculator,
  Wallet,
  PiggyBank,
  Home,
  Building2,
  TrendingDown,
  Map,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Free Swiss Tax Calculators 2026 | NeoFidu" },
  description:
    "Free Swiss tax calculators: income tax, net salary, Pillar 3a, rental value, real estate capital gains. Instant results for all cantons, no registration.",
  keywords: [
    "swiss tax calculator",
    "switzerland tax calculator free",
    "swiss income tax calculator",
    "pillar 3a calculator",
    "net salary calculator switzerland",
    "swiss tax estimator",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/simulateur",
    languages: {
      "fr-CH": "https://neofidu.ch/simulateur",
      "en-CH": "https://neofidu.ch/en/simulateur",
      "x-default": "https://neofidu.ch/simulateur",
    },
  },
  openGraph: {
    title: "Free Swiss Tax Calculators 2026 | NeoFidu",
    description:
      "Free Swiss tax calculators: income tax, net salary, Pillar 3a, rental value and more. Instant results for all cantons.",
    type: "website",
    url: "https://neofidu.ch/en/simulateur",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

const tools = [
  {
    icon: Calculator,
    title: "Income Tax Calculator",
    desc: "Estimate your annual income tax by canton and municipality.",
    href: "/en/simulateur/impots",
  },
  {
    icon: Wallet,
    title: "Net Salary Calculator",
    desc: "Gross to net salary including AVS, LPP and taxes, for all 26 cantons.",
    href: "/en/simulateur/salaire-net",
  },
  {
    icon: PiggyBank,
    title: "Pillar 3a Calculator",
    desc: "Calculate the tax savings from your Pillar 3a contributions.",
    href: "/en/simulateur/3eme-pilier",
  },
  {
    icon: Home,
    title: "Rental Value Calculator",
    desc: "Estimate the imputed rental value (valeur locative) of your home.",
    href: "/en/simulateur/valeur-locative",
  },
  {
    icon: Building2,
    title: "Real Estate Capital Gains Tax",
    desc: "Estimate the tax on the gain from selling a property.",
    href: "/en/simulateur/gain-immobilier",
  },
  {
    icon: TrendingDown,
    title: "Rent Reduction Calculator",
    desc: "Check whether you can request a rent reduction after a reference rate drop.",
    href: "/en/simulateur/baisse-loyer",
  },
  {
    icon: ArrowRight,
    title: "Retirement Income Simulator",
    desc: "Project your retirement income from AVS, LPP and Pillar 3a.",
    href: "/en/simulateur/retraite",
  },
  {
    icon: Map,
    title: "Swiss Tax Map",
    desc: "Compare the tax burden of all 26 Swiss cantons on an interactive map.",
    href: "/en/simulateur/carte-impots",
  },
];

export default function SimulateurHubEnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Swiss Tax Calculators",
    description:
      "A collection of free Swiss tax calculators by NeoFidu: income tax, net salary, Pillar 3a, rental value and more.",
    url: "https://neofidu.ch/en/simulateur",
    inLanguage: "en",
    provider: { "@type": "Organization", name: "NeoFidu", url: "https://neofidu.ch" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://neofidu.ch/en" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "https://neofidu.ch/en/simulateur" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-hero text-white pt-24 md:pt-28 pb-12 md:pb-16">
            <div className="container mx-auto px-4">
              <Breadcrumb items={[{ label: "Calculators" }]} className="mb-6" />
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Free & Instant, 2026 data</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Swiss Tax <span className="text-emerald-300">Calculators</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Free online calculators to estimate your Swiss taxes, net salary, Pillar 3a savings and more, for every canton.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
            <div className="container mx-auto px-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {tools.map((tool) => (
                  <Link key={tool.href} href={tool.href}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <tool.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="font-bold text-lg mb-2">{tool.title}</h2>
                        <p className="text-muted-foreground text-sm">{tool.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <SimulatorCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
