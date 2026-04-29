export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompanyBySlug, CANTON_NAMES, FORM_LABELS, SECTOR_LABELS } from "@/lib/companies";
import { ArrowLeft, Building2, MapPin, Hash, FileText, Users, Clock, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await getCompanyBySlug(params.slug);
  if (!company) return { title: "Entreprise non trouvée | NeoFidu" };

  const formLabel = FORM_LABELS[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;

  return {
    title: `${company.name} | Observatoire romand | NeoFidu`,
    description: `${company.name} — ${formLabel} à ${company.city} (${cantonName}). ${company.purpose?.substring(0, 120) || ""}`,
  };
}

export default async function CompanyPage({ params }: Props) {
  const company = await getCompanyBySlug(params.slug);
  if (!company) notFound();

  const formLabel = FORM_LABELS[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;
  const sectorLabel = company.sector ? (SECTOR_LABELS[company.sector] || company.sector) : null;

  const badgeClass =
    company.legal_form === "RI"
      ? "bg-blue-50 text-blue-700"
      : company.legal_form === "Sarl"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  const ctaText =
    company.legal_form === "RI"
      ? { text: "Vous êtes aussi indépendant ?", offer: "Déclaration d'impôts dès CHF 50.-", href: "/demande" }
      : company.legal_form === "Sarl"
      ? { text: "Besoin d'un fiduciaire pour votre Sàrl ?", offer: "Comptabilité dès CHF 500.-/an", href: "/demande" }
      : { text: "Votre SA mérite un accompagnement pro.", offer: "Comptabilité dès CHF 500.-/an", href: "/demande" };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link href="/observatoire" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;observatoire
        </Link>

        {/* Main card */}
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
            <p className="text-xs text-gray-400">neofidu.ch/observatoire/{params.slug}</p>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass}`}>{formLabel}</span>
          </div>

          <div className="p-6">
            {/* Company name */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">{company.name}</h1>
            <p className="text-sm text-gray-500 mb-6">{company.city}, {cantonName}</p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <Building2 className="w-3 h-3" />Forme juridique
                </div>
                <p className="text-sm font-medium text-gray-900">{formLabel}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <MapPin className="w-3 h-3" />Siège
                </div>
                <p className="text-sm font-medium text-gray-900">{company.city}, {company.canton}</p>
              </div>

              {company.ide_number && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Hash className="w-3 h-3" />N° IDE
                  </div>
                  <p className="text-sm font-medium text-gray-900">{company.ide_number}</p>
                </div>
              )}

              {company.capital && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Building2 className="w-3 h-3" />Capital
                  </div>
                  <p className="text-sm font-medium text-gray-900">{company.capital}</p>
                </div>
              )}

              {sectorLabel && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Tag className="w-3 h-3" />Secteur
                  </div>
                  <p className="text-sm font-medium text-gray-900">{sectorLabel}</p>
                </div>
              )}
            </div>

            {/* Purpose */}
            {company.purpose && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <FileText className="w-3 h-3" />But social
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">
                  {company.purpose}
                </p>
              </div>
            )}

            {/* Persons */}
            {company.persons && company.persons.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
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

            {/* FOSC History */}
            {company.fosc_history && company.fosc_history.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
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

            {/* CTA */}
            <div className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-emerald-800 font-medium">{ctaText.text}</p>
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
              Source : Registre du commerce via Zefix / FOSC
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
