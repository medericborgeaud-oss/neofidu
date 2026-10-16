// src/app/en/communes/page.tsx
// English index of French-speaking Switzerland municipalities

import { Metadata } from "next";
import { getCommunes, getCommunesStats } from "@/lib/communes";
import { CommunesDashboard } from "@/components/CommunesDashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Municipalities of French-speaking Switzerland: taxes, population, companies | NeoFidu" },
  description:
    "Explore the municipalities of French-speaking Switzerland. Compare tax coefficients, population and the number of companies per municipality.",
  alternates: {
    canonical: "https://neofidu.ch/en/communes",
    languages: {
      "fr-CH": "https://neofidu.ch/communes",
      "en-CH": "https://neofidu.ch/en/communes",
      "x-default": "https://neofidu.ch/communes",
    },
  },
  openGraph: {
    title: "Municipalities of French-speaking Switzerland | NeoFidu",
    description:
      "Explore the municipalities of French-speaking Switzerland. Compare tax rates and statistics.",
    type: "website",
    url: "https://neofidu.ch/en/communes",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export const revalidate = 3600;
export default async function CommunesEnPage(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchParams = props.searchParams || {};
  const filters = {
    search: (searchParams.q as string) || "",
    canton: (searchParams.canton as string) || "",
    page: parseInt((searchParams.page as string) || "1"),
  };

  const [{ communes, total }, stats] = await Promise.all([
    getCommunes(filters),
    getCommunesStats(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        <CommunesDashboard
          communes={communes}
          total={total}
          stats={stats}
          initialFilters={filters}
        />
      </main>
      <Footer />
    </>
  );
}
