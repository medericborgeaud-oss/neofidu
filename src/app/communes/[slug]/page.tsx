// src/app/communes/[slug]/page.tsx
// Fiche individuelle d'une commune romande

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Users,
  Building2,
  TrendingDown,
  Ruler,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getCommuneBySlug,
  getCommunesVoisines,
  CANTON_NAMES,
  formatPopulation,
  formatTaux,
  formatDensite,
} from "@/lib/communes";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const commune = await getCommuneBySlug(params.slug);
  if (!commune) return { title: "Commune non trouvée | NeoFidu" };

  const cantonName = CANTON_NAMES[commune.canton] || commune.canton;
  const popText = commune.population
    ? `${commune.population.toLocaleString("fr-CH")} habitants`
    : "";
  const tauxText = commune.taux_commune
    ? `coefficient communal ${commune.taux_commune}`
    : "";
  const parts = [popText, tauxText].filter(Boolean);

  return {
    title: `${commune.nom} (${cantonName}) — Fiscalité, population | NeoFidu`,
    description: `${commune.nom}, ${cantonName}. ${parts.join(", ")}. Comparez avec les communes voisines.`,
    openGraph: {
      title: `${commune.nom} (${cantonName}) | NeoFidu`,
      description: `Fiche commune : ${parts.join(", ")}.`,
    },
  };
}

export default async function CommunePage({ params }: Props) {
  const commune = await getCommuneBySlug(params.slug);
  if (!commune) notFound();

  const voisines = await getCommunesVoisines(params.slug);
  const cantonName = CANTON_NAMES[commune.canton] || commune.canton;

  // Calcul du taux "attractivité"
  const tauxColor =
    commune.taux_commune === null
      ? "gray"
      : commune.taux_commune < 70
      ? "emerald"
      : commune.taux_commune < 90
      ? "amber"
      : "red";

  const tauxBadgeClass =
    tauxColor === "emerald"
      ? "bg-emerald-100 text-emerald-700"
      : tauxColor === "amber"
      ? "bg-amber-100 text-amber-700"
      : tauxColor === "red"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-500";

  // CTA contextuel
  const ctaText = {
    text: `Vous habitez à ${commune.nom} ?`,
    offer: "Déclaration d'impôts dès CHF 50.—",
    href: "/demande",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/communes"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux communes
        </Link>

        {/* Main card */}
        <Card className="overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
            <p className="text-xs text-gray-400">
              neofidu.ch/communes/{params.slug}
            </p>
            {commune.taux_commune !== null && (
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${tauxBadgeClass}`}
              >
                Coeff. {commune.taux_commune}
              </span>
            )}
          </div>

          <div className="p-6">
            {/* Commune name */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {commune.nom}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {commune.district ? `${commune.district}, ` : ""}
              {cantonName}
              {commune.code_postal ? ` — ${commune.code_postal}` : ""}
            </p>

            {/* ─── KPI Grid ─── */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* Population */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <Users className="w-3 h-3" />
                  Population
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {commune.population
                    ? commune.population.toLocaleString("fr-CH")
                    : "—"}
                </p>
              </div>

              {/* Densité */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <Ruler className="w-3 h-3" />
                  Densité
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatDensite(commune.densite)}
                </p>
              </div>

              {/* Superficie */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <MapPin className="w-3 h-3" />
                  Superficie
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {commune.superficie_km2
                    ? `${commune.superficie_km2.toFixed(1)} km²`
                    : "—"}
                </p>
              </div>

            </div>

            {/* ─── Fiscalité ─── */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-500" />
                Fiscalité
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Coefficient communal
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatTaux(commune.taux_commune)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Taux cantonal
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatTaux(commune.taux_canton)}
                    </p>
                  </div>
                </div>
                {commune.annee_fiscale && (
                  <p className="text-xs text-gray-400 mt-3">
                    Année fiscale : {commune.annee_fiscale}
                  </p>
                )}
                {commune.taux_commune === null && (
                  <p className="text-xs text-gray-400 mt-2 italic">
                    Les taux d&apos;imposition seront ajoutés prochainement.
                  </p>
                )}
              </div>
            </div>


            {/* ─── Économie ─── */}
            {commune.secteur_dominant && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-500" />
                  Économie
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Secteur dominant :{" "}
                    <span className="font-medium text-gray-900 capitalize">
                      {commune.secteur_dominant}
                    </span>
                  </p>
                  <Link
                    href={`/observatoire?q=${encodeURIComponent(commune.nom)}&canton=${commune.canton}`}
                    className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-3"
                  >
                    Voir les entreprises de {commune.nom}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* ─── Immobilier ─── */}
            {(commune.loyer_median_m2 || commune.prix_achat_m2) && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  Immobilier
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  {commune.loyer_median_m2 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Loyer médian au m²
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        CHF {commune.loyer_median_m2.toFixed(0)}/m²
                      </p>
                      <p className="text-xs text-gray-400">
                        Prix mensuel moyen au mètre carré pour un appartement
                      </p>
                    </div>
                  )}
                  {commune.prix_achat_m2 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Prix achat au m²
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        CHF{" "}
                        {commune.prix_achat_m2.toLocaleString("fr-CH")}/m²
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── Communes voisines ─── */}
            {voisines.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  Communes du même district
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {voisines.map((v: any) => (
                    <Link
                      key={v.slug}
                      href={`/communes/${v.slug}`}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-emerald-50 transition-colors group"
                    >
                      <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 truncate">
                        {v.nom}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {v.population && (
                          <span className="text-xs text-gray-400">
                            {formatPopulation(v.population)} hab.
                          </span>
                        )}
                        {v.taux_commune && (
                          <span className="text-xs text-gray-400">
                            Coeff. {v.taux_commune}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ─── CTA ─── */}
            <div className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-emerald-800 font-medium">
                  {ctaText.text}
                </p>
                <p className="text-sm text-emerald-600">{ctaText.offer}</p>
              </div>
              <Link href={ctaText.href}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap">
                  En savoir plus
                </Button>
              </Link>
            </div>

            {/* Source */}
            <p className="text-center text-xs text-gray-400 mt-4">
              Source : OFS / LINDAS — Code commune {commune.code_ofs}
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
