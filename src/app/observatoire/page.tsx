import { Metadata } from "next";
import { getCompanies, getStats } from "@/lib/companies";
import { ObservatoireDashboard } from "@/components/ObservatoireDashboard";

export const metadata: Metadata = {
  title: "Observatoire romand des entreprises | NeoFidu",
  description:
    "Suivez en temps rÃ©el toutes les crÃ©ations d'entreprises en Suisse romande. Recherchez par canton, forme juridique ou secteur d'activitÃ©.",
  openGraph: {
    title: "Observatoire romand des entreprises | NeoFidu",
    description:
      "Toutes les crÃ©ations d'entreprises en Suisse romande, en temps rÃ©el.",
  },
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function ObservatoirePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
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
    <main className="min-h-screen bg-white">
      <ObservatoireDashboard
        companies={companies}
        total={total}
        stats={stats}
        initialFilters={filters}
      />
    </main>
  );
}
