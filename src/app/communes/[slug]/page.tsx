// src/app/communes/[slug]/page.tsx
// Fiche individuelle d'une commune romande -- optimisee SEO

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
  Calculator,
  HelpCircle,
  Landmark,
  Train,
  Car,
  Bike,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getCommuneBySlug,
  getCommunesVoisines,
  CANTON_NAMES,
  formatPopulation,
  formatTaux,
  formatDensite,
  getCompanyCountByCommune,
} from "@/lib/communes";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const commune = await getCommuneBySlug(params.slug);
  if (!commune) return { title: "Commune non trouvee | NeoFidu" };

  const companyCount = await getCompanyCountByCommune(commune.nom, commune.canton);
  const cantonName = CANTON_NAMES[commune.canton] || commune.canton;
  const popText = commune.population
    ? `${commune.population.toLocaleString("fr-CH")} habitants`
    : "";
  const tauxText = commune.taux_commune
    ? `coefficient communal ${commune.taux_commune}`
    : "";
  const parts = [popText, tauxText].filter(Boolean);

  const canonicalUrl = `https://neofidu.ch/communes/${params.slug}`;

  return {
    title: `Impots a ${commune.nom} (${cantonName}) -- Taux, coefficient fiscal`,
    description: `Impots a ${commune.nom}, ${cantonName}. ${parts.join(", ")}. Comparez la fiscalite avec les communes voisines.`,
    openGraph: {
      title: `Impots a ${commune.nom} (${cantonName})`,
      description: `Fiscalite de ${commune.nom} : ${parts.join(", ")}. Comparez avec les communes voisines.`,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function generateJsonLd(commune: any, cantonName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: `Commune de ${commune.nom}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: commune.nom,
      addressRegion: cantonName,
      postalCode: commune.code_postal || undefined,
      addressCountry: "CH",
    },
    ...(commune.population && {
      areaServed: {
        "@type": "City",
        name: commune.nom,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: cantonName,
        },
      },
    }),
  };
}

const CANTON_DEDUCTIONS: Record<string, {
  fraisRepas: string;
  transportTrain: string;
  transportVoiture: string;
  transportVelo: string;
  transportPlafond: string;
  entretienImmo: string;
  troisPilier: string;
}> = {
  VD: {
    fraisRepas: "CHF 15/jour",
    transportTrain: "Abonnement effectif (AG, demi-tarif, parcours)",
    transportVoiture: "CHF 0.70/km (distance domicile-travail)",
    transportVelo: "CHF 700/an",
    transportPlafond: "Max CHF 7'000/an (tous modes confondus)",
    entretienImmo: "20% (<10 ans) ou 30% (>10 ans) de la valeur locative",
    troisPilier: "CHF 7'258 (3a salarie) / CHF 36'288 (3a independant)",
  },
  GE: {
    fraisRepas: "CHF 15/jour",
    transportTrain: "Frais effectifs (abonnement TPG, CFF)",
    transportVoiture: "Frais effectifs justifies uniquement (pas de forfait km)",
    transportVelo: "Non deductible",
    transportPlafond: "Pas de plafond fixe (frais effectifs)",
    entretienImmo: "Forfait 10% ou frais effectifs",
    troisPilier: "CHF 7'258 (3a salarie) / CHF 36'288 (3a independant)",
  },
  VS: {
    fraisRepas: "CHF 15/jour",
    transportTrain: "AG, demi-tarif ou abonnement de parcours",
    transportVoiture: "CHF 0.70/km",
    transportVelo: "Forfait admis",
    transportPlafond: "Pas de plafond cantonal specifique",
    entretienImmo: "10% de la valeur fiscale",
    troisPilier: "CHF 7'258 (3a salarie) / CHF 36'288 (3a independant)",
  },
  FR: {
    fraisRepas: "CHF 15/jour",
    transportTrain: "Abonnement effectif (AG, demi-tarif, parcours)",
    transportVoiture: "CHF 0.70/km",
    transportVelo: "CHF 700/an",
    transportPlafond: "Max CHF 6'600/an",
    entretienImmo: "10% (<10 ans) ou 20% (>10 ans)",
    troisPilier: "CHF 7'258 (3a salarie) / CHF 36'288 (3a independant)",
  },
  NE: {
    fraisRepas: "CHF 15/jour",
    transportTrain: "Abonnement effectif (AG, demi-tarif, parcours)",
    transportVoiture: "CHF 0.70/km",
    transportVelo: "CHF 700/an",
    transportPlafond: "Max CHF 6'000/an",
    entretienImmo: "20% ou frais effectifs",
    troisPilier: "CHF 7'258 (3a salarie) / CHF 36'288 (3a independant)",
  },
  JU: {
    fraisRepas: "CHF 15/jour",
    transportTrain: "Frais effectifs (abonnement)",
    transportVoiture: "CHF 0.70/km",
    transportVelo: "Admis sur justificatif",
    transportPlafond: "Pas de plafond fixe",
    entretienImmo: "Forfait 10% ou frais effectifs",
    troisPilier: "CHF 7'258 (3a salarie) / CHF 36'288 (3a independant)",
  },
};

export default async function CommunePage({ params }: Props) {
  const commune = await getCommuneBySlug(params.slug);
  if (!commune) notFound();

  const voisines = await getCommunesVoisines(params.slug);
  const cantonName = CANTON_NAMES[commune.canton] || commune.canton;
  const companyCount = await getCompanyCountByCommune(commune.nom, commune.canton);

  const CANTON_THRESHOLDS: Record<string, { low: number; mid: number }> = {
    VD: { low: 54, mid: 65 },
    GE: { low: 35, mid: 44 },
    VS: { low: 120, mid: 135 },
    FR: { low: 50, mid: 70 },
    NE: { low: 68, mid: 72 },
    JU: { low: 155, mid: 175 },
  };

  const thresholds = CANTON_THRESHOLDS[commune.canton] || { low: 70, mid: 90 };

  const tauxColor =
    commune.taux_commune === null
      ? "gray"
      : commune.taux_commune <= thresholds.low
      ? "emerald"
      : commune.taux_commune <= thresholds.mid
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

  const attractiviteText =
    commune.taux_commune === null
      ? ""
      : tauxColor === "emerald"
      ? `Par rapport aux autres communes ${cantonName.toLowerCase() === "valais" ? "valaisannes" : cantonName.toLowerCase() === "vaud" ? "vaudoises" : cantonName.toLowerCase() === "geneve" ? "genevoises" : cantonName.toLowerCase() === "fribourg" ? "fribourgeoises" : cantonName.toLowerCase() === "neuchatel" ? "neuchateloises" : "jurassiennes"}, ${commune.nom} beneficie d'un coefficient communal particulierement attractif.`
      : tauxColor === "amber"
      ? `Le coefficient communal de ${commune.nom} se situe dans la moyenne des communes du canton de ${cantonName}.`
      : `Par rapport aux autres communes du canton de ${cantonName}, ${commune.nom} applique un coefficient communal relativement eleve.`;

  const ctaText = {
    text: `Vous habitez a ${commune.nom} ?`,
    offer: "Declaration d'impots des CHF 89.--",
    href: "/demande",
  };

  const districtText = commune.district ? ` dans le district de ${commune.district}` : "";
  const popSeoText = commune.population
    ? ` Avec ${commune.population.toLocaleString("fr-CH")} habitants`
    : "";
  const densiteSeoText = commune.densite
    ? ` et une densite de ${Math.round(commune.densite)} hab./km2`
    : "";
  const tauxSeoText = commune.taux_commune
    ? `. Le coefficient communal est de ${commune.taux_commune}%`
    : "";
  const tauxCantonSeoText = commune.taux_canton
    ? ` et le taux cantonal de ${commune.taux_canton}%`
    : "";
  const anneeSeoText = commune.annee_fiscale
    ? ` (annee fiscale ${commune.annee_fiscale})`
    : "";

  const seoDescription = `${commune.nom} est une commune du canton de ${cantonName}${districtText}.${popSeoText}${densiteSeoText}${tauxSeoText}${tauxCantonSeoText}${anneeSeoText}. ${attractiviteText}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJsonLd(commune, cantonName)),
          }}
        />

        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link
            href="/communes"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux communes
          </Link>

          <Card className="overflow-hidden mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <p className="text-xs text-gray-400">neofidu.ch/communes/{params.slug}</p>
              {commune.taux_commune !== null && (
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${tauxBadgeClass}`}>
                  Coeff. {commune.taux_commune}%
                </span>
              )}
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Impots a {commune.nom}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                {commune.district ? `${commune.district}, ` : ""}{cantonName}{commune.code_postal ? ` -- ${commune.code_postal}` : ""}
              </p>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{seoDescription}</p>

              {/* KPI Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Users className="w-3 h-3" /> Population</div>
                  <p className="text-sm font-medium text-gray-900">{commune.population ? commune.population.toLocaleString("fr-CH") : "--"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Ruler className="w-3 h-3" /> Densite</div>
                  <p className="text-sm font-medium text-gray-900">{formatDensite(commune.densite)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><MapPin className="w-3 h-3" /> Superficie</div>
                  <p className="text-sm font-medium text-gray-900">{commune.superficie_km2 ? `${commune.superficie_km2.toFixed(1)} km2` : "--"}</p>
                </div>
              </div>

              {/* Fiscalite */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-500" /> Fiscalite de {commune.nom}
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Coefficient communal</p>
                      <p className="text-lg font-semibold text-gray-900">{formatTaux(commune.taux_commune)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Taux cantonal</p>
                      <p className="text-lg font-semibold text-gray-900">{formatTaux(commune.taux_canton)}%</p>
                    </div>
                  </div>
                  {commune.annee_fiscale && (
                    <p className="text-xs text-gray-400 mt-3">Annee fiscale : {commune.annee_fiscale}</p>
                  )}
                  {commune.taux_commune === null && (
                    <p className="text-xs text-gray-400 mt-2 italic">Les taux d&apos;imposition seront ajoutes prochainement.</p>
                  )}
                </div>
              </div>

              {/* Economie */}
              {commune.secteur_dominant && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-500" /> Economie
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Secteur dominant : <span className="font-medium text-gray-900 capitalize">{commune.secteur_dominant}</span>
                    </p>
                    <Link
                      href={`/observatoire?q=${encodeURIComponent(commune.nom)}&canton=${commune.canton}`}
                      className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-3"
                    >
                      Voir les entreprises de {commune.nom} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Immobilier */}
              {(commune.loyer_median_m2 || commune.prix_achat_m2) && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3">Immobilier a {commune.nom}</h2>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                    {commune.loyer_median_m2 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Loyer median au m2</p>
                        <p className="text-lg font-semibold text-gray-900">CHF {commune.loyer_median_m2.toFixed(0)}/m2</p>
                        <p className="text-xs text-gray-400">Prix mensuel moyen au metre carre pour un appartement</p>
                      </div>
                    )}
                    {commune.prix_achat_m2 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Prix achat au m2</p>
                        <p className="text-lg font-semibold text-gray-900">CHF {commune.prix_achat_m2.toLocaleString("fr-CH")}/m2</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Communes voisines */}
              {voisines.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-500" /> Comparer les impots : communes du meme district
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {voisines.map((v: any) => (
                      <Link key={v.slug} href={`/communes/${v.slug}`} className="bg-gray-50 rounded-lg p-3 hover:bg-emerald-50 transition-colors group">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 truncate">{v.nom}</p>
                        <div className="flex items-center gap-3 mt-1">
                          {v.population && <span className="text-xs text-gray-400">{formatPopulation(v.population)} hab.</span>}
                          {v.taux_commune && <span className="text-xs text-gray-400">Coeff. {v.taux_commune}%</span>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-emerald-800 font-medium">{ctaText.text}</p>
                  <p className="text-sm text-emerald-600">{ctaText.offer}</p>
                </div>
                <Link href={ctaText.href}>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap">En savoir plus</Button>
                </Link>
              </div>

              <p className="text-center text-xs text-gray-400 mt-4">Source : OFS / LINDAS -- Code commune {commune.code_ofs}</p>
            </div>
          </Card>
        </div>

        {/* Section: Estimation fiscale (CORRECTED - no wrong calculation) */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Estimation fiscale a {commune.nom}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              En Suisse, l&apos;impot est calcule en appliquant un coefficient communal et un taux cantonal sur un bareme progressif.
              Le montant exact depend de votre revenu, de votre situation familiale et des deductions applicables.
            </p>
            <div className="bg-emerald-50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-emerald-800">Calculez votre impot exact</p>
                <p className="text-xs text-emerald-600">Simulateur gratuit avec les taux de {commune.nom}</p>
              </div>
              <Link href={`/simulateur-impots?commune=${encodeURIComponent(commune.slug || "")}`}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm whitespace-nowrap">Simuler mes impots</Button>
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              En Suisse, l&apos;impot est calcule en appliquant ces coefficients sur un bareme progressif cantonal, pas directement sur le revenu.{" "}
              <Link href="/simulateur-impots" className="text-blue-600 underline">En savoir plus</Link>
            </p>
          </Card>
        </section>

        {/* Section: Tissu economique */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Tissu economique</h2>
            </div>
            {companyCount > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="text-2xl font-bold text-gray-900">{companyCount}</span>{" "}
                  entreprises actives sont enregistrees dans cette commune.
                </p>
                <Link href={`/observatoire?commune=${commune.nom}`} className="text-sm text-blue-600 underline">
                  Voir les entreprises dans l&apos;Observatoire
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Aucune entreprise enregistree dans notre base pour cette commune.</p>
            )}
            {commune.secteur_dominant && (
              <p className="text-sm text-gray-600 mt-3">Secteur dominant : <span className="font-medium">{commune.secteur_dominant}</span></p>
            )}
          </Card>
        </section>

        {/* Section: Deductions fiscales cantonales (ENRICHED with transport details) */}
        {CANTON_DEDUCTIONS[commune.canton] && (
          <section className="max-w-4xl mx-auto px-4 py-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">Principales deductions fiscales ({commune.canton})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-600 font-medium">Type</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Montant / Limite</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Frais de repas</td>
                      <td className="py-2">{CANTON_DEDUCTIONS[commune.canton].fraisRepas}</td>
                    </tr>
                    <tr className="border-b bg-gray-50/50">
                      <td className="py-2 font-medium text-gray-700" colSpan={2}>
                        Frais de transport domicile-travail
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 flex items-center gap-2"><Train className="w-3.5 h-3.5 text-blue-500" /> Train / transports publics</td>
                      <td className="py-2">{CANTON_DEDUCTIONS[commune.canton].transportTrain}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 flex items-center gap-2"><Car className="w-3.5 h-3.5 text-gray-500" /> Voiture</td>
                      <td className="py-2">{CANTON_DEDUCTIONS[commune.canton].transportVoiture}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 flex items-center gap-2"><Bike className="w-3.5 h-3.5 text-green-500" /> Velo</td>
                      <td className="py-2">{CANTON_DEDUCTIONS[commune.canton].transportVelo}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 text-gray-500 text-xs">Plafond transport</td>
                      <td className="py-2 text-xs text-gray-500">{CANTON_DEDUCTIONS[commune.canton].transportPlafond}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Entretien immobilier</td>
                      <td className="py-2">{CANTON_DEDUCTIONS[commune.canton].entretienImmo}</td>
                    </tr>
                    <tr>
                      <td className="py-2">3e pilier (3a)</td>
                      <td className="py-2">{CANTON_DEDUCTIONS[commune.canton].troisPilier}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Montants indicatifs pour l&apos;annee fiscale en cours.{" "}
                <Link href={`/cantons/${commune.canton.toLowerCase()}`} className="text-blue-600 underline">Page canton {commune.canton}</Link>
              </p>
            </Card>
          </section>
        )}

        {/* Section: FAQ structuree avec schema.org */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: `Quel est le taux d'imposition a ${commune.nom} ?`,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `Le coefficient communal a ${commune.nom} est de ${formatTaux(commune.taux_commune)}% et le taux cantonal (${commune.canton}) est de ${formatTaux(commune.taux_canton)}%. Ces coefficients s'appliquent sur l'impot de base cantonal.`,
                    },
                  },
                  {
                    "@type": "Question",
                    name: `Combien d'habitants compte ${commune.nom} ?`,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `${commune.nom} compte ${formatPopulation(commune.population)} habitants.`,
                    },
                  },
                  {
                    "@type": "Question",
                    name: `Comment faire sa declaration d'impots a ${commune.nom} ?`,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `Les habitants de ${commune.nom} (${commune.canton}) peuvent faire appel a NeoFidu, fiduciaire en ligne, pour leur declaration fiscale des CHF 149.`,
                    },
                  },
                ],
              }),
            }}
          />
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions frequentes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Quel est le taux d&apos;imposition a {commune.nom} ?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Le coefficient communal est de {formatTaux(commune.taux_commune)}% et le taux cantonal ({commune.canton}) est de {formatTaux(commune.taux_canton)}%.
                  Ces coefficients s&apos;appliquent sur l&apos;impot de base cantonal (bareme progressif), et non directement sur votre revenu.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">Combien d&apos;habitants compte {commune.nom} ?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {commune.nom} compte {formatPopulation(commune.population)} habitants{commune.superficie_km2 ? `, sur une superficie de ${commune.superficie_km2} km2` : ""}.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">Comment faire sa declaration d&apos;impots a {commune.nom} ?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Les habitants de {commune.nom} peuvent confier leur declaration fiscale a{" "}
                  <Link href="/particuliers" className="text-blue-600 underline">NeoFidu</Link>, fiduciaire en ligne suisse, des CHF 149.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Maillage interne */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2">
            <Link href="/simulateur-impots" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Simulateur fiscal</Link>
            <Link href="/simulateur-salaire" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Simulateur de salaire</Link>
            <Link href={`/cantons/${commune.canton.toLowerCase()}`} className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Canton {commune.canton}</Link>
            <Link href="/communes" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Toutes les communes</Link>
            <Link href="/particuliers" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Declaration fiscale</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
