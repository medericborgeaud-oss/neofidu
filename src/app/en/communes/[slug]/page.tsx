// src/app/en/communes/[slug]/page.tsx
// English version of the commune page

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Users, Building2, TrendingDown, Ruler, Globe,
  ArrowRight, Calculator, HelpCircle, Landmark, Train, Car, Bike,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CantonFlag } from "@/components/CantonFlag";
import CommuneMedia from "@/components/CommuneMedia";
import {
  getCommuneBySlug, getCommunesVoisines, CANTON_NAMES,
  formatPopulation, formatTaux, formatDensite, getCompanyCountByCommune,
} from "@/lib/communes";

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const commune = await getCommuneBySlug(params.slug);
  if (!commune) return { title: "Municipality not found | NeoFidu" };

  const cantonName = CANTON_NAMES[commune.canton] || commune.canton;
  const popText = commune.population ? `${commune.population.toLocaleString("en-CH")} inhabitants` : "";
  const tauxText = commune.taux_commune ? `municipal coefficient ${commune.taux_commune}` : "";
  const parts = [popText, tauxText].filter(Boolean);
  const canonicalUrl = `https://neofidu.ch/en/communes/${params.slug}`;

  return {
    title: `Taxes in ${commune.nom} (${cantonName}) — Rate & municipal coefficient`,
    description: `Taxes in ${commune.nom}, ${cantonName}. ${parts.join(", ")}. Compare taxation with neighbouring municipalities.`,
    openGraph: {
      title: `Taxes in ${commune.nom} (${cantonName})`,
      description: `Taxation in ${commune.nom}: ${parts.join(", ")}. Compare with neighbouring municipalities.`,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "fr-CH": `https://neofidu.ch/communes/${params.slug}`,
        "en": canonicalUrl,
      },
    },
  };
}

function generateJsonLd(commune: any, cantonName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: `Municipality of ${commune.nom}`,
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
        containedInPlace: { "@type": "AdministrativeArea", name: cantonName },
      },
    }),
  };
}

const CANTON_DEDUCTIONS_EN: Record<string, {
  mealExpenses: string;
  transportTrain: string;
  transportCar: string;
  transportBike: string;
  transportCap: string;
  propertyMaint: string;
  pillar3a: string;
}> = {
  VD: {
    mealExpenses: "CHF 15/day",
    transportTrain: "Actual subscription (GA, half-fare, route pass)",
    transportCar: "CHF 0.70/km (home-work distance)",
    transportBike: "CHF 700/year",
    transportCap: "Max CHF 7,000/year (all modes combined)",
    propertyMaint: "20% (<10 yrs) or 30% (>10 yrs) of rental value",
    pillar3a: "CHF 7,258 (employed) / CHF 36,288 (self-employed)",
  },
  GE: {
    mealExpenses: "CHF 15/day",
    transportTrain: "Actual costs (TPG, SBB subscription)",
    transportCar: "Actual justified costs only (no per-km rate)",
    transportBike: "Not deductible",
    transportCap: "No fixed cap (actual costs)",
    propertyMaint: "Flat 10% or actual costs",
    pillar3a: "CHF 7,258 (employed) / CHF 36,288 (self-employed)",
  },
  VS: {
    mealExpenses: "CHF 15/day",
    transportTrain: "GA, half-fare or route pass",
    transportCar: "CHF 0.70/km",
    transportBike: "Flat rate accepted",
    transportCap: "No specific cantonal cap",
    propertyMaint: "10% of fiscal value",
    pillar3a: "CHF 7,258 (employed) / CHF 36,288 (self-employed)",
  },
  FR: {
    mealExpenses: "CHF 15/day",
    transportTrain: "Actual subscription (GA, half-fare, route pass)",
    transportCar: "CHF 0.70/km",
    transportBike: "CHF 700/year",
    transportCap: "Max CHF 6,600/year",
    propertyMaint: "10% (<10 yrs) or 20% (>10 yrs)",
    pillar3a: "CHF 7,258 (employed) / CHF 36,288 (self-employed)",
  },
  NE: {
    mealExpenses: "CHF 15/day",
    transportTrain: "Actual subscription (GA, half-fare, route pass)",
    transportCar: "CHF 0.70/km",
    transportBike: "CHF 700/year",
    transportCap: "Max CHF 6,000/year",
    propertyMaint: "20% or actual costs",
    pillar3a: "CHF 7,258 (employed) / CHF 36,288 (self-employed)",
  },
  JU: {
    mealExpenses: "CHF 15/day",
    transportTrain: "Actual costs (subscription)",
    transportCar: "CHF 0.70/km",
    transportBike: "Accepted with receipts",
    transportCap: "No fixed cap",
    propertyMaint: "Flat 10% or actual costs",
    pillar3a: "CHF 7,258 (employed) / CHF 36,288 (self-employed)",
  },
};

export default async function CommunePageEN({ params }: Props) {
  const commune = await getCommuneBySlug(params.slug);
  if (!commune) notFound();

  const voisines = await getCommunesVoisines(params.slug);
  const cantonName = CANTON_NAMES[commune.canton] || commune.canton;
  const companyCount = await getCompanyCountByCommune(commune.nom, commune.canton);

  const CANTON_THRESHOLDS: Record<string, { low: number; mid: number }> = {
    VD: { low: 54, mid: 65 }, GE: { low: 35, mid: 44 }, VS: { low: 120, mid: 135 },
    FR: { low: 50, mid: 70 }, NE: { low: 68, mid: 72 }, JU: { low: 155, mid: 175 },
  };

  const thresholds = CANTON_THRESHOLDS[commune.canton] || { low: 70, mid: 90 };
  const tauxColor =
    commune.taux_commune === null ? "gray"
    : commune.taux_commune <= thresholds.low ? "emerald"
    : commune.taux_commune <= thresholds.mid ? "amber"
    : "red";

  const tauxBadgeClass =
    tauxColor === "emerald" ? "bg-emerald-100 text-emerald-700"
    : tauxColor === "amber" ? "bg-amber-100 text-amber-700"
    : tauxColor === "red" ? "bg-red-100 text-red-700"
    : "bg-gray-100 text-gray-500";

  const attractiviteText =
    commune.taux_commune === null ? ""
    : tauxColor === "emerald"
    ? `Compared to other municipalities in ${cantonName}, ${commune.nom} benefits from a particularly attractive municipal coefficient.`
    : tauxColor === "amber"
    ? `The municipal coefficient of ${commune.nom} is in the average range for municipalities in the canton of ${cantonName}.`
    : `Compared to other municipalities in the canton of ${cantonName}, ${commune.nom} applies a relatively high municipal coefficient.`;

  const districtText = commune.district ? ` in the district of ${commune.district}` : "";
  const popSeoText = commune.population ? ` With ${commune.population.toLocaleString("en-CH")} inhabitants` : "";
  const densiteSeoText = commune.densite ? ` and a density of ${Math.round(commune.densite)} inh./km2` : "";
  const tauxSeoText = commune.taux_commune ? `. The municipal coefficient is ${commune.taux_commune}%` : "";
  const anneeSeoText = commune.annee_fiscale ? ` (fiscal year ${commune.annee_fiscale})` : "";

  const seoDescription = `${commune.nom} is a municipality in the canton of ${cantonName}${districtText}.${popSeoText}${densiteSeoText}${tauxSeoText}${anneeSeoText}. ${attractiviteText}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(commune, cantonName)) }} />

        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/communes" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />Back to municipalities
            </Link>
            <Link href={`/communes/${params.slug}`} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Français
            </Link>
          </div>

          <Card className="overflow-hidden mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <p className="text-xs text-gray-400">neofidu.ch/en/communes/{params.slug}</p>
              {commune.taux_commune !== null && (
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${tauxBadgeClass}`}>Coeff. {commune.taux_commune}%</span>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">Taxes in {commune.nom}</h1>
                  <p className="text-sm text-gray-500 mb-4">
                    {commune.district ? `${commune.district}, ` : ""}{cantonName}{commune.code_postal ? ` — ${commune.code_postal}` : ""}
                  </p>
                </div>
                <CantonFlag canton={commune.canton} size={56} />
              </div>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{seoDescription}</p>

              <CommuneMedia city={commune.nom} canton={commune.canton} />

              {/* KPI Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Users className="w-3 h-3" /> Population</div>
                  <p className="text-sm font-medium text-gray-900">{commune.population ? commune.population.toLocaleString("en-CH") : "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Ruler className="w-3 h-3" /> Density</div>
                  <p className="text-sm font-medium text-gray-900">{commune.densite ? `${Math.round(commune.densite)} inh./km²` : "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><MapPin className="w-3 h-3" /> Area</div>
                  <p className="text-sm font-medium text-gray-900">{commune.superficie_km2 ? `${commune.superficie_km2.toFixed(1)} km²` : "—"}</p>
                </div>
              </div>

              {/* Taxation */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-500" /> Taxation in {commune.nom}
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Municipal coefficient</p>
                      <p className="text-lg font-semibold text-gray-900">{formatTaux(commune.taux_commune)}%</p>
                    </div>
                  </div>
                  {commune.annee_fiscale && (<p className="text-xs text-gray-400 mt-3">Fiscal year: {commune.annee_fiscale}</p>)}
                  {commune.taux_commune === null && (<p className="text-xs text-gray-400 mt-2 italic">Tax rates will be added soon.</p>)}
                </div>
              </div>

              {/* Economy */}
              {commune.secteur_dominant && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-500" /> Economy
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Dominant sector: <span className="font-medium text-gray-900 capitalize">{commune.secteur_dominant}</span>
                    </p>
                    <Link href={`/observatoire?q=${encodeURIComponent(commune.nom)}&canton=${commune.canton}`}
                      className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-3">
                      View companies in {commune.nom} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Real estate */}
              {(commune.loyer_median_m2 || commune.prix_achat_m2) && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3">Real estate in {commune.nom}</h2>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                    {commune.loyer_median_m2 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Median rent per m²</p>
                        <p className="text-lg font-semibold text-gray-900">CHF {commune.loyer_median_m2.toFixed(0)}/m²</p>
                        <p className="text-xs text-gray-400">Average monthly price per square metre for an apartment</p>
                      </div>
                    )}
                    {commune.prix_achat_m2 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Purchase price per m²</p>
                        <p className="text-lg font-semibold text-gray-900">CHF {commune.prix_achat_m2.toLocaleString("en-CH")}/m²</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Neighbouring municipalities */}
              {voisines.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-500" /> Compare taxes: municipalities in the same district
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {voisines.map((v: any) => (
                      <Link key={v.slug} href={`/en/communes/${v.slug}`} className="bg-gray-50 rounded-lg p-3 hover:bg-emerald-50 transition-colors group">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 truncate">{v.nom}</p>
                        <div className="flex items-center gap-3 mt-1">
                          {v.population && <span className="text-xs text-gray-400">{formatPopulation(v.population)} inh.</span>}
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
                  <p className="text-sm text-emerald-800 font-medium">Do you live in {commune.nom}?</p>
                  <p className="text-sm text-emerald-600">Tax return from CHF 89.—</p>
                </div>
                <Link href="/demande">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap">Learn more</Button>
                </Link>
              </div>

              <p className="text-center text-xs text-gray-400 mt-4">Source: FSO / LINDAS — Municipality code {commune.code_ofs}</p>
            </div>
          </Card>
        </div>

        {/* Tax estimation section */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Tax estimation in {commune.nom}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              In Switzerland, taxes are calculated by applying a municipal coefficient and a cantonal rate to a progressive tax scale.
              The exact amount depends on your income, family situation and applicable deductions.
            </p>
            <div className="bg-emerald-50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-emerald-800">Calculate your exact tax</p>
                <p className="text-xs text-emerald-600">Free simulator with {commune.nom} rates</p>
              </div>
              <Link href={`/simulateur-impots?commune=${encodeURIComponent(commune.slug || "")}`}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm whitespace-nowrap">Simulate my taxes</Button>
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              In Switzerland, taxes are calculated by applying these coefficients to a progressive cantonal scale, not directly on income.{" "}
              <Link href="/simulateur-impots" className="text-blue-600 underline">Learn more</Link>
            </p>
          </Card>
        </section>

        {/* Economic fabric */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Economic fabric</h2>
            </div>
            {companyCount > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="text-2xl font-bold text-gray-900">{companyCount}</span>{" "}
                  active companies are registered in this municipality.
                </p>
                <Link href={`/observatoire?commune=${commune.nom}`} className="text-sm text-blue-600 underline">
                  View companies in the Observatory
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No companies registered in our database for this municipality.</p>
            )}
            {commune.secteur_dominant && (
              <p className="text-sm text-gray-600 mt-3">Dominant sector: <span className="font-medium">{commune.secteur_dominant}</span></p>
            )}
          </Card>
        </section>

        {/* Cantonal tax deductions */}
        {CANTON_DEDUCTIONS_EN[commune.canton] && (
          <section className="max-w-4xl mx-auto px-4 py-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">Main tax deductions ({commune.canton})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-600 font-medium">Type</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Amount / Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Meal expenses</td>
                      <td className="py-2">{CANTON_DEDUCTIONS_EN[commune.canton].mealExpenses}</td>
                    </tr>
                    <tr className="border-b bg-gray-50/50">
                      <td className="py-2 font-medium text-gray-700" colSpan={2}>Commuting expenses (home to work)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 flex items-center gap-2"><Train className="w-3.5 h-3.5 text-blue-500" /> Train / public transport</td>
                      <td className="py-2">{CANTON_DEDUCTIONS_EN[commune.canton].transportTrain}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 flex items-center gap-2"><Car className="w-3.5 h-3.5 text-gray-500" /> Car</td>
                      <td className="py-2">{CANTON_DEDUCTIONS_EN[commune.canton].transportCar}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 flex items-center gap-2"><Bike className="w-3.5 h-3.5 text-green-500" /> Bicycle</td>
                      <td className="py-2">{CANTON_DEDUCTIONS_EN[commune.canton].transportBike}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pl-4 text-gray-500 text-xs">Transport cap</td>
                      <td className="py-2 text-xs text-gray-500">{CANTON_DEDUCTIONS_EN[commune.canton].transportCap}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Property maintenance</td>
                      <td className="py-2">{CANTON_DEDUCTIONS_EN[commune.canton].propertyMaint}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Pillar 3a</td>
                      <td className="py-2">{CANTON_DEDUCTIONS_EN[commune.canton].pillar3a}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Indicative amounts for the current fiscal year.{" "}
                <Link href={`/cantons/${commune.canton.toLowerCase()}`} className="text-blue-600 underline">Canton {commune.canton} page</Link>
              </p>
            </Card>
          </section>
        )}

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `What is the tax rate in ${commune.nom}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `The municipal coefficient in ${commune.nom} is ${formatTaux(commune.taux_commune)}%. These coefficients are applied to the cantonal base tax.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `How many inhabitants does ${commune.nom} have?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `${commune.nom} has ${formatPopulation(commune.population)} inhabitants.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `How to file a tax return in ${commune.nom}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Residents of ${commune.nom} (${commune.canton}) can use NeoFidu, an online fiduciary, for their tax return from CHF 149.`,
                  },
                },
              ],
            }),
          }} />
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-800">What is the tax rate in {commune.nom}?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  The municipal coefficient is {formatTaux(commune.taux_commune)}%.
                  These coefficients are applied to the cantonal base tax (progressive scale), not directly on your income.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">How many inhabitants does {commune.nom} have?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {commune.nom} has {formatPopulation(commune.population)} inhabitants{commune.superficie_km2 ? `, over an area of ${commune.superficie_km2} km²` : ""}.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">How to file a tax return in {commune.nom}?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Residents of {commune.nom} can entrust their tax return to{" "}
                  <Link href="/particuliers" className="text-blue-600 underline">NeoFidu</Link>, a Swiss online fiduciary, from CHF 149.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2">
            <Link href="/simulateur-impots" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Tax simulator</Link>
            <Link href="/simulateur-salaire" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Salary simulator</Link>
            <Link href={`/cantons/${commune.canton.toLowerCase()}`} className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Canton {commune.canton}</Link>
            <Link href="/communes" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">All municipalities</Link>
            <Link href="/particuliers" className="text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100">Tax return</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
