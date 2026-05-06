// src/app/communes/page.tsx
// Page liste des communes romandes — dashboard avec recherche et filtres

import { Metadata } from "next";
import { getCommunes, getCommunesStats } from "@/lib/communes";
import { CommunesDashboard } from "@/components/CommunesDashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Communes romandes — Fiscalité, population, entreprises | NeoFidu",
  description:
    "Explorez les 1'098 communes de Suisse romande. Comparez les coefficients d'imposition, la population et le nombre d'entreprises par commune.",
  openGraph: {
    title: "Communes romandes — Fiscalité, population, entreprises | NeoFidu",
    description:
      "Explorez les communes de Suisse romande. Comparez les taux d'imposition et statistiques.",
  },
};

export const dynamic = "force-dynamic"; // Pas de cache — données toujours fraîches
export default async function CommunesPage(props: {
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
