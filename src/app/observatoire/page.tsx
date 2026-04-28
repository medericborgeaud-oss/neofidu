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

export default async function ObservatoirePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = {
    search: searchParams.q || "",
    canton: searchParams.canton || "",
    legal_form: searchParams.forme || "",
    sector: searchParams.secteur || "",
    page: parseInt(searchParams.page || "1"),
  };

  const [{ companies, total }, stats] = await Promise.all([
    getCompanies(filters),
    getStats(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <ObservatoireDashboard
          companies={companies}
          total={total}
          stats={stats}
        />
      </main>
      <Footer />
    </>
  );
}
