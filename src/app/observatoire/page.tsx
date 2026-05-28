export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getCompanies, getStats, getSectorDistribution, getRandomCompanies } from "@/lib/companies";
import { ObservatoireDashboard } from "@/components/ObservatoireDashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Observatoire romand des entreprises | NeoFidu",
  description:
    "Toutes les entreprises actives en Suisse romande. Recherchez par canton, forme juridique ou secteur d’activité.",
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
  const search = (params.search as string) || "";
  const canton = (params.canton as string) || "";
  const legal_form = (params.legal_form as string) || "";
  const sector = (params.sector as string) || "";
  const page = parseInt((params.page as string) || "1", 10);

  const hasFilters = !!(search || canton || legal_form || sector || page > 1);

  const [companiesData, stats, sectorDistribution] = await Promise.all([
    hasFilters
      ? getCompanies({ search, canton, legal_form, sector, page, per_page: 20 })
      : getRandomCompanies(20).then((companies) => ({ companies, total: companies.length })),
    getStats(),
    getSectorDistribution(),
  ]);

  return (
    <>
      <Header />
      <ObservatoireDashboard
        companies={companiesData.companies}
        totalCompanies={companiesData.total}
        stats={stats}
        sectorDistribution={sectorDistribution}
        isRandomSelection={!hasFilters}
      />
      <Footer />
    </>
  );
}
