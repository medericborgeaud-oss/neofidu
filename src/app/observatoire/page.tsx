export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getCompanies, getStats, getSectorDistribution, getRandomCompanies } from "@/lib/companies";
import { ObservatoireDashboard } from "@/components/ObservatoireDashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Observatoire romand des entreprises | NeoFidu",
  description:
    "Toutes les entreprises actives en Suisse romande. Recherchez par canton, forme juridique ou secteur d\u2019activit\u00e9.",
  openGraph: {
    title: "Observatoire romand des entreprises | NeoFidu",
    description:
      "Toutes les entreprises actives en Suisse romande.",
  },
};

export default async function ObservatoirePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = (params.q as string) || "";
  const canton = (params.canton as string) || "";
  const forme = (params.forme as string) || "";
  const secteur = (params.secteur as string) || "";
  const page = parseInt((params.page as string) || "1", 10);

  const hasFilters = !!(q || canton || forme || secteur || params.page);

  const [companiesData, stats, sectorDistribution] = await Promise.all([
    hasFilters
      ? getCompanies({ search: q, canton, legal_form: forme, sector: secteur, page, limit: 20 })
      : getRandomCompanies(20).then((companies) => ({ companies, total: 0 })),
    getStats(),
    getSectorDistribution(),
  ]);

  return (
    <>
      <Header />
      <ObservatoireDashboard
        companies={companiesData.companies}
        totalCompanies={hasFilters ? companiesData.total : stats.total}
        stats={stats}
        initialFilters={hasFilters ? { search: q, canton, legal_form: forme, sector: secteur, page } : undefined}
        sectorDistribution={sectorDistribution}
        isRandomSelection={!hasFilters}
      />
      <Footer />
    </>
  );
}
