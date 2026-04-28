export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import { getCompanies, getStats } from "@/lib/companies";
import { ObservatoireDashboard } from "@/components/ObservatoireDashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Observatoire romand des entreprises | NeoFidu",
  description:
    "Suivez en temps réel toutes les créations d'entreprises en Suisse romande. Recherchez par canton, forme juridique ou secteur d'activité.",
  openGraph: {
    title: "Observatoire romand des entreprises | NeoFidu",
    description:
      "Toutes les créations d'entreprises en Suisse romande, en temps réel.",
  },
};

export const revalidate = 3600;

export default async function ObservatoirePage(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchParams = props.searchParams || {};
  const filters = {
    search: (searchParams.q as string) || "",
    canton: (searchParams.canton as string) || "",
    legal_form: (searchParams.forme as string) || "",
    sector: (searchParams.secteur as string) || "",
    page: parseInt((searchParams.page as string) || "1"),
  };

  const [{ companies, total }, stats] = await Promise.all([
    getCompanies(filters),
    getStats(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        <ObservatoireDashboard
          companies={companies}
          total={total}
          stats={stats}
          initialFilters={filters}
        />
      </main>
      <Footer />
    </>
  );
}
