export const revalidate = 3600;

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompanyBySlug, getSimilarCompanies, CANTON_NAMES, FORM_LABELS, SECTOR_LABELS, CANTON_FISCAL, type Company } from "@/lib/companies";
import { ArrowLeft, Building2, MapPin, Hash, FileText, Users, Clock, Tag, TrendingUp, Landmark, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommuneMedia from "@/components/CommuneMedia";
import RelatedArticles from "@/components/RelatedArticles";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CantonFlag } from "@/components/CantonFlag";

interface Props {
  params: { slug: string };
}

// ─── FAQ dynamique ───

const FORM_LONG: Record<string, string> = {
  RI: "raison individuelle (RI)",
  Sarl: "société à responsabilité limitée (Sàrl)",
  SA: "société anonyme (SA)",
};

interface FAQItem {
  question: string;
  answer: string;
}

function generateCompanyFAQ(company: Company, cantonName: string): FAQItem[] {
  const faq: FAQItem[] = [];
  const form = company.legal_form;
  const formLong = FORM_LONG[form] || form;
  const fiscal = CANTON_FISCAL[company.canton];

  // Q1 : Présentation de l'entreprise
  let a1 = `${company.name} est une ${formLong} inscrite au registre du commerce du canton de ${cantonName}, basée à ${company.city}.`;
  if (company.purpose) {
    const p = company.purpose.length > 200 ? company.purpose.substring(0, 200) + "…" : company.purpose;
    a1 += ` Son but social est : ${p}`;
  }
  if (company.creation_date) a1 += ` L'entreprise a été fondée le ${company.creation_date}.`;
  if (company.ide_number) a1 += ` Son numéro IDE est ${company.ide_number}.`;
  faq.push({ question: `Qu’est-ce que ${company.name} ?`, answer: a1 });

  // Q2 : Explication de la forme juridique
  if (form === "RI") {
    faq.push({
      question: "Qu’est-ce qu’une raison individuelle (RI) en Suisse ?",
      answer: "Une raison individuelle est la forme juridique la plus simple en Suisse. L’entrepreneur exerce son activité en son nom propre, sans capital minimum requis. La responsabilité est illimitée : l’entrepreneur répond de ses dettes professionnelles sur sa fortune personnelle. L’inscription au registre du commerce est obligatoire lorsque le chiffre d’affaires annuel dépasse CHF 100’000.",
    });
  } else if (form === "Sarl") {
    faq.push({
      question: "Qu’est-ce qu’une Sàrl en Suisse ?",
      answer: "Une société à responsabilité limitée (Sàrl) est une société de capitaux nécessitant un capital social minimum de CHF 20’000, entièrement libéré à la fondation. Les associés ne sont responsables qu’à hauteur de leurs parts sociales. La Sàrl est la forme juridique la plus populaire en Suisse romande pour les PME, car elle combine protection du patrimoine personnel et souplesse de gestion.",
    });
  } else if (form === "SA") {
    faq.push({
      question: "Qu’est-ce qu’une SA en Suisse ?",
      answer: "Une société anonyme (SA) est une société de capitaux dont le capital-actions minimum est de CHF 100’000, dont au moins CHF 50’000 doivent être libérés à la fondation. Les actionnaires ne sont responsables qu’à hauteur de leur apport. La SA doit désigner un organe de révision, sauf en cas d’opting-out pour les sociétés de moins de 10 emplois à plein temps.",
    });
  }

  // Q3 : Obligations fiscales par canton
  if (fiscal) {
    if (form === "RI") {
      faq.push({
        question: `Quelles sont les obligations fiscales d’un indépendant dans le canton de ${cantonName} ?`,
        answer: `En tant qu’indépendant dans le canton de ${cantonName}, les revenus de l’activité sont déclarés dans la déclaration d’impôts personnelle (personne physique). Les cotisations sociales AVS/AI/APG représentent environ 10,6 % du revenu net de l’activité. Une comptabilité simplifiée (recettes/dépenses) est suffisante sous CHF 500’000 de chiffre d’affaires. ${fiscal.particularite}`,
      });
    } else {
      faq.push({
        question: `Quel est le taux d’imposition des entreprises dans le canton de ${cantonName} ?`,
        answer: `Dans le canton de ${cantonName}, le taux d’imposition effectif des bénéfices des personnes morales est d’environ ${fiscal.tauxEntreprise}. ${fiscal.particularite} L’entreprise doit tenir une comptabilité complète (bilan, compte de résultat, annexe) et déposer ses comptes annuels.`,
      });
    }
  }

  // Q4 : Vérification au registre du commerce
  let a4 = "Toute entreprise inscrite au registre du commerce suisse est vérifiable gratuitement via le portail Zefix (zefix.ch), géré par la Confédération.";
  if (company.ide_number) a4 += ` ${company.name} est identifiable par son numéro IDE : ${company.ide_number}.`;
  a4 += " Les mutations (changements de siège, de capital, de direction) sont publiées dans la Feuille officielle suisse du commerce (FOSC).";
  faq.push({
    question: `Comment vérifier l’inscription de ${company.name} au registre du commerce ?`,
    answer: a4,
  });

  // Q5 : Comment créer une entreprise similaire
  if (form === "RI") {
    faq.push({
      question: `Comment devenir indépendant dans le canton de ${cantonName} ?`,
      answer: `Pour créer une raison individuelle dans le canton de ${cantonName}, il suffit de s’inscrire au registre du commerce (obligatoire dès CHF 100’000 de chiffre d’affaires annuel). Le coût d’inscription est d’environ CHF 120 à 200. Vous devrez ensuite vous affilier à une caisse de compensation AVS, souscrire les assurances nécessaires (RC professionnelle, perte de gain) et ouvrir un compte bancaire professionnel. Un fiduciaire comme NeoFidu peut vous accompagner dans ces démarches administratives.`,
    });
  } else if (form === "Sarl") {
    faq.push({
      question: `Comment créer une Sàrl dans le canton de ${cantonName} ?`,
      answer: `Pour fonder une Sàrl dans le canton de ${cantonName}, vous devez disposer d’un capital social de CHF 20’000 (entièrement libéré), rédiger des statuts et passer devant un notaire pour l’acte de fondation. Le capital doit être déposé sur un compte de consignation bancaire. Comptez environ CHF 2’000 à 4’000 pour les frais de fondation (notaire, registre du commerce, publication FOSC). Un fiduciaire comme NeoFidu peut vous accompagner dans toutes ces démarches.`,
    });
  } else if (form === "SA") {
    faq.push({
      question: `Comment créer une SA dans le canton de ${cantonName} ?`,
      answer: `Pour fonder une SA dans le canton de ${cantonName}, un capital-actions de CHF 100’000 est requis, dont au moins CHF 50’000 doivent être libérés. L’acte constitutif doit être établi par un notaire. Comptez environ CHF 3’000 à 6’000 pour les frais de fondation (notaire, registre du commerce, publication FOSC). Un fiduciaire comme NeoFidu peut vous accompagner dans toutes ces démarches.`,
    });
  }

  return faq;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await getCompanyBySlug(params.slug);
  if (!company) return { title: "Entreprise non trouvée | NeoFidu" };

  const formLabel = FORM_LABELS[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;

    const canonicalUrl = `https://neofidu.ch/observatoire/${params.slug}`;

  return {
    title: `${company.name} | Observatoire romand `,
    description: `${company.name} — ${formLabel} à ${company.city} (${cantonName}). ${company.purpose?.substring(0, 120) || ""}`,
      alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const company = await getCompanyBySlug(params.slug);
  if (!company) notFound();

  const [similarCompanies] = await Promise.all([
    getSimilarCompanies(params.slug, company.canton, company.city, company.sector),
  ]);

  const formLabel = FORM_LABELS[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;
  const sectorLabel = company.sector ? (SECTOR_LABELS[company.sector] || company.sector) : null;
  const fiscal = CANTON_FISCAL[company.canton];
  const faqItems = generateCompanyFAQ(company, cantonName);

  const badgeClass =
    company.legal_form === "RI"
      ? "bg-blue-50 text-blue-700"
      : company.legal_form === "Sarl"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  const ctaText =
    company.legal_form === "RI"
      ? { text: "Vous êtes aussi indépendant ?", offer: "Déclaration d'impôts dès CHF 129.-", href: "/demande" }
      : company.legal_form === "Sarl"
      ? { text: "Besoin d'un fiduciaire pour votre Sàrl ?", offer: "Comptabilité dès CHF 500.-/an", href: "/demande" }
      : { text: "Votre SA mérite un accompagnement pro.", offer: "Comptabilité dès CHF 500.-/an", href: "/demande" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://neofidu.ch" },
          { "@type": "ListItem", position: 2, name: "Observatoire", item: "https://neofidu.ch/observatoire" },
          { "@type": "ListItem", position: 3, name: company.name },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24">
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
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">{company.name}</h1>
              <CantonFlag canton={company.canton} size={56} />
            </div>
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

              {/* Commune photo + Map */}
              <CommuneMedia city={company.city} canton={company.canton} />

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

              {/* Canton fiscal context */}
              {fiscal && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Landmark className="w-3 h-3" />Contexte fiscal — {cantonName}
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
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
                  </div>
                </div>
              )}

              {/* Similar companies */}
              {similarCompanies.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <TrendingUp className="w-3 h-3" />
                    {sectorLabel
                      ? `Autres entreprises en ${sectorLabel} — ${company.city}`
                      : `Autres entreprises — ${company.city}`}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {similarCompanies.map((c) => (
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
                </div>
              )}

              {/* FAQ */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <HelpCircle className="w-3 h-3" />Questions fréquentes
                </div>
                <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                  {faqItems.map((item, i) => (
                    <details key={i} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:text-emerald-600 [&::-webkit-details-marker]:hidden">
                        <span>{item.question}</span>
                        <span className="ml-4 flex-shrink-0 text-gray-400 text-lg leading-none group-open:hidden">+</span>
                        <span className="ml-4 flex-shrink-0 text-gray-400 text-lg leading-none hidden group-open:inline">&minus;</span>
                      </summary>
                      <p className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              <RelatedArticles canton={company.canton} legalForm={company.legal_form} city={company.city} />

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
      <Footer />
    </>
  );
}
