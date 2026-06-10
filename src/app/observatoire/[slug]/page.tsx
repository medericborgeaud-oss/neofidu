export const revalidate = 3600;

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompanyBySlug, getSimilarCompanies, getCommuneForCompany, CANTON_NAMES, FORM_LABELS, SECTOR_LABELS, CANTON_FISCAL } from "@/lib/companies";
import { ArrowLeft, Building2, MapPin, Hash, FileText, Users, Clock, Tag, TrendingUp, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import CommuneMedia from "@/components/CommuneMedia";
import RelatedArticles from "@/components/RelatedArticles";
import CostSimulator from "@/components/CostSimulator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CantonFlag } from "@/components/CantonFlag";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await getCompanyBySlug(params.slug);
  if (!company) return { title: "Entreprise non trouvée | NeoFidu" };

  const formLabel = FORM_LABELS[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;
  const canonicalUrl = `https://neofidu.ch/observatoire/${params.slug}`;

  return {
    title: `${company.name} | Observatoire romand`,
    description: `${company.name} — ${formLabel} à ${company.city} (${cantonName}). ${company.purpose?.substring(0, 120) || ""}`,
    alternates: { canonical: canonicalUrl },
  };
}

export default async function CompanyPage({ params }: Props) {
  const company = await getCompanyBySlug(params.slug);
  if (!company) notFound();

  const [similarCompanies, communeData] = await Promise.all([
    getSimilarCompanies(params.slug, company.canton, company.city, company.sector),
    getCommuneForCompany(company.city, company.canton),
  ]);

  const formLabel = FORM_LABELS[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;
  const sectorLabel = company.sector ? (SECTOR_LABELS[company.sector] || company.sector) : null;
  const fiscal = CANTON_FISCAL[company.canton];
  const formShort = company.legal_form === "Sarl" ? "Sàrl" : company.legal_form;

  const badgeClass =
    company.legal_form === "RI"
      ? "bg-blue-50 text-blue-700"
      : company.legal_form === "Sarl"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressRegion: cantonName,
      addressCountry: "CH",
    },
    ...(company.ide_number && { taxID: company.ide_number }),
    ...(company.purpose && { description: company.purpose.substring(0, 300) }),
    url: `https://neofidu.ch/observatoire/${params.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back link */}
          <Link
            href="/observatoire"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour &agrave; l&apos;observatoire
          </Link>

          {/* === TWO-COLUMN LAYOUT === */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch">

            {/* ====== LEFT COLUMN — Content ====== */}
            <div className="space-y-4">
              <Card className="overflow-hidden">

                <div className="p-6">
                  {/* Company name + canton flag */}
                  <div className="flex items-start justify-between mb-1">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {company.name}
                    </h1>
                    <CantonFlag canton={company.canton} size={48} />
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    {company.city}, {cantonName}
                  </p>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                        <Building2 className="w-3 h-3" />Forme juridique
                      </div>
                      <p className="text-sm font-medium text-gray-900">{formLabel}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                        <MapPin className="w-3 h-3" />Si&egrave;ge
                      </div>
                      <p className="text-sm font-medium text-gray-900">{company.city}, {company.canton}</p>
                    </div>
                    {company.ide_number && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                          <Hash className="w-3 h-3" />N&deg; IDE
                        </div>
                        <p className="text-sm font-medium text-gray-900">{company.ide_number}</p>
                      </div>
                    )}
                    {company.capital && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                          <Building2 className="w-3 h-3" />Capital
                        </div>
                        <p className="text-sm font-medium text-gray-900">{company.capital}</p>
                      </div>
                    )}
                    {sectorLabel && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                          <Tag className="w-3 h-3" />Secteur
                        </div>
                        <p className="text-sm font-medium text-gray-900">{sectorLabel}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Commune photo + Map */}
                <div className="px-6">
                  <CommuneMedia city={company.city} canton={company.canton} />
                </div>

                <div className="p-6">
                  {/* Purpose */}
                  {company.purpose && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="w-3 h-3" />But social
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">
                        {company.purpose}
                      </p>
                    </div>
                  )}

                  {/* Canton fiscal context */}
                  {fiscal && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Landmark className="w-3 h-3" />Contexte fiscal &mdash; {cantonName}
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Taux imposition entreprise</span>
                            <p className="font-medium text-gray-900">{fiscal.tauxEntreprise}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Capital minimum</span>
                            <p className="font-medium text-gray-900">{fiscal.capitalMin}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{fiscal.particularite}</p>
                        <div className="bg-white/60 rounded-lg p-3 mt-1">
                          <p className="text-xs font-medium text-gray-700 mb-1">Simulation rapide &mdash; b\u00e9n\u00e9fice net CHF 25&apos;000</p>
                          <p className="text-lg font-bold text-emerald-700">
                            ~CHF {Math.round(25000 * parseFloat(fiscal.tauxEntreprise) / 100).toLocaleString("fr-CH")}&nbsp;
                            <span className="text-xs font-normal text-gray-500">d&apos;imp\u00f4t estim\u00e9</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Persons (if data exists) */}
                  {company.persons && company.persons.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Users className="w-3 h-3" />Personnes inscrites
                      </div>
                      <div className="space-y-3">
                        {company.persons.map((person: any, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-xs font-medium text-blue-700">
                              {person.initials}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{person.name}</p>
                              <p className="text-xs text-gray-500">{person.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FOSC History (if data exists) */}
                  {company.fosc_history && company.fosc_history.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Clock className="w-3 h-3" />Historique FOSC
                      </div>
                      <div className="space-y-2">
                        {company.fosc_history.map((entry: any, i: number) => (
                          <div key={i} className="flex gap-3 text-sm">
                            <span className="text-gray-400 w-20 flex-shrink-0">{entry.date}</span>
                            <span className="text-gray-600">{entry.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Articles */}
                  <RelatedArticles canton={company.canton} legalForm={company.legal_form} city={company.city} />

                  {/* Source */}
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Source : Registre du commerce via Zefix / FOSC
                  </p>
                </div>
              </Card>
            </div>

            {/* ====== RIGHT COLUMN — Sticky sidebar ====== */}
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-4 flex flex-col">

                {/* Cost Simulator */}
                <CostSimulator
                  companyName={company.name}
                  legalForm={company.legal_form}
                  formLabel={formLabel}
                />

                {/* Similar companies */}
                {similarCompanies.length > 0 && (

              </div>
            </div>

          </div>

          {/* Mobile: show simulator below content */}
          <div className="lg:hidden mt-6 space-y-4">
            <CostSimulator
              companyName={company.name}
              legalForm={company.legal_form}
              formLabel={formLabel}
            />
            {similarCompanies.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  {sectorLabel
                    ? `${sectorLabel} — ${company.city}`
                    : `Autres ${formShort} \u00e0 ${company.city}`}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {similarCompanies.slice(0, 6).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/observatoire/${c.slug}`}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.city} · {FORM_LABELS[c.legal_form] || c.legal_form}</p>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
