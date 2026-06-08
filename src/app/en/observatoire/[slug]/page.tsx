export const revalidate = 3600;

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompanyBySlug, getSimilarCompanies, getCommuneForCompany, CANTON_NAMES, FORM_LABELS, SECTOR_LABELS, CANTON_FISCAL, type Company } from "@/lib/companies";
import { ArrowLeft, Building2, MapPin, Hash, FileText, Users, Clock, Tag, TrendingUp, Landmark, HelpCircle, Shield } from "lucide-react";
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

// ─── English translations ───

const SECTOR_EN: Record<string, string> = {
  tech: "IT & Technology", conseil: "Consulting", commerce: "Commerce & Retail",
  sante: "Healthcare", construction: "Construction", restauration: "Hospitality & Food Service",
  immobilier: "Real Estate", transport: "Transport & Logistics", education: "Education",
  finance: "Finance", industrie: "Manufacturing", agriculture: "Agriculture",
  art_culture: "Arts & Culture", nettoyage: "Cleaning Services", beaute: "Beauty & Wellness",
  autres: "Other",
};

const FORM_EN: Record<string, string> = {
  RI: "Sole Prop.", Sarl: "LLC (Sarl)", SA: "Corp. (SA)",
};

const FORM_LONG_EN: Record<string, string> = {
  RI: "sole proprietorship (RI)",
  Sarl: "limited liability company (Sarl)",
  SA: "corporation (SA)",
};

const FISCAL_EN: Record<string, { particularite: string }> = {
  VD: { particularite: "Possible tax exemptions for innovative startups" },
  GE: { particularite: "International financial hub with access to cross-border talent" },
  VS: { particularite: "One of the lowest corporate tax rates in Switzerland" },
  FR: { particularite: "Bilingual canton with access to both French and German-speaking markets" },
  NE: { particularite: "Gradual reduction in corporate taxation" },
  JU: { particularite: "Canton with economic development potential" },
};

// ─── FAQ (English) ───

interface FAQItem { question: string; answer: string; }

function generateCompanyFAQ(company: Company, cantonName: string): FAQItem[] {
  const faq: FAQItem[] = [];
  const form = company.legal_form;
  const formLong = FORM_LONG_EN[form] || form;
  const fiscal = CANTON_FISCAL[company.canton];
  const fiscalEn = FISCAL_EN[company.canton];

  let a1 = `${company.name} is a ${formLong} registered in the commercial register of the canton of ${cantonName}, based in ${company.city}.`;
  if (company.purpose) {
    const p = company.purpose.length > 200 ? company.purpose.substring(0, 200) + "..." : company.purpose;
    a1 += ` Its registered purpose is: ${p}`;
  }
  if (company.ide_number) a1 += ` Its IDE number is ${company.ide_number}.`;
  faq.push({ question: `What is ${company.name}?`, answer: a1 });

  if (form === "RI") {
    faq.push({
      question: "What is a sole proprietorship (RI) in Switzerland?",
      answer: "A sole proprietorship (Raison individuelle) is the simplest legal form in Switzerland. The entrepreneur operates under their own name, with no minimum capital required. Liability is unlimited: the entrepreneur is personally responsible for all business debts. Registration in the commercial register is mandatory when annual turnover exceeds CHF 100,000.",
    });
  } else if (form === "Sarl") {
    faq.push({
      question: "What is an LLC (Sarl) in Switzerland?",
      answer: "A limited liability company (Sarl/GmbH) is a capital company requiring a minimum share capital of CHF 20,000, fully paid up at incorporation. Members are only liable up to the value of their shares. The Sarl is the most popular legal form in French-speaking Switzerland for SMEs, combining personal asset protection with flexible management.",
    });
  } else if (form === "SA") {
    faq.push({
      question: "What is a corporation (SA) in Switzerland?",
      answer: "A corporation (SA/AG) is a capital company with a minimum share capital of CHF 100,000, of which at least CHF 50,000 must be paid up at incorporation. Shareholders are only liable up to the value of their capital contribution. An SA must appoint an auditor, unless it opts out (possible for companies with fewer than 10 full-time employees).",
    });
  }

  if (fiscal && fiscalEn) {
    if (form === "RI") {
      faq.push({
        question: `What are the tax obligations for self-employed individuals in ${cantonName}?`,
        answer: `As a self-employed individual in the canton of ${cantonName}, business income is declared in the personal tax return (individual taxation). Social security contributions (AHV/IV/EO) amount to approximately 10.6% of net business income. Simplified bookkeeping (income/expenses) is sufficient below CHF 500,000 turnover. ${fiscalEn.particularite}`,
      });
    } else {
      faq.push({
        question: `What is the corporate tax rate in the canton of ${cantonName}?`,
        answer: `In the canton of ${cantonName}, the effective corporate profit tax rate is approximately ${fiscal.tauxEntreprise}. ${fiscalEn.particularite} The company must keep full accounts (balance sheet, income statement, notes) and file annual financial statements.`,
      });
    }
  }

  let a4 = "Any company registered in the Swiss commercial register can be verified free of charge via the Zefix portal (zefix.ch), managed by the Swiss Confederation.";
  if (company.ide_number) a4 += ` ${company.name} is identifiable by its IDE number: ${company.ide_number}.`;
  a4 += " Changes (registered office, capital, management) are published in the Swiss Official Gazette of Commerce (SOGC).";
  faq.push({ question: `How to verify ${company.name}'s commercial register entry?`, answer: a4 });

  if (form === "RI") {
    faq.push({
      question: `How to become self-employed in the canton of ${cantonName}?`,
      answer: `To set up a sole proprietorship in the canton of ${cantonName}, you need to register with the commercial register (mandatory from CHF 100,000 annual turnover). Registration costs approximately CHF 120-200. You will then need to join an AHV compensation fund, take out necessary insurance (professional liability, loss of earnings) and open a business bank account. A fiduciary like NeoFidu can assist you with these administrative steps.`,
    });
  } else if (form === "Sarl") {
    faq.push({
      question: `How to set up an LLC in the canton of ${cantonName}?`,
      answer: `To incorporate an LLC in the canton of ${cantonName}, you need share capital of CHF 20,000 (fully paid up), draft articles of association and appear before a notary for the deed of incorporation. The capital must be deposited in a bank escrow account. Expect approximately CHF 2,000-4,000 for incorporation costs (notary, commercial register, SOGC publication). A fiduciary like NeoFidu can assist you throughout the process.`,
    });
  } else if (form === "SA") {
    faq.push({
      question: `How to incorporate a corporation in the canton of ${cantonName}?`,
      answer: `To incorporate a corporation in the canton of ${cantonName}, share capital of CHF 100,000 is required, of which at least CHF 50,000 must be paid up. The articles of incorporation must be notarized. Expect approximately CHF 3,000-6,000 for incorporation costs (notary, commercial register, SOGC publication). A fiduciary like NeoFidu can assist you throughout the process.`,
    });
  }

  return faq;
}

// ─── Legal obligations (English) ───

const FREQ_COLORS: Record<string, string> = {
  "Setup": "bg-amber-100 text-amber-700",
  "Annual": "bg-blue-100 text-blue-700",
  "Monthly": "bg-green-100 text-green-700",
  "Quarterly": "bg-green-100 text-green-700",
  "Conditional": "bg-red-100 text-red-700",
  "Permanent": "bg-purple-100 text-purple-700",
  "Recommended": "bg-orange-100 text-orange-700",
};

interface ObligationItem { icon: string; title: string; description: string; frequency: string; }

function generateObligations(form: string): ObligationItem[] {
  if (form === "RI") {
    return [
      { icon: "📋", title: "Commercial register", description: "If turnover > CHF 100,000", frequency: "Setup" },
      { icon: "🏦", title: "Bank account", description: "Dedicated business account", frequency: "Setup" },
      { icon: "👥", title: "AHV affiliation", description: "Compensation fund", frequency: "Setup" },
      { icon: "🗂️", title: "Record keeping", description: "10-year retention (CO)", frequency: "Permanent" },
      { icon: "📊", title: "Bookkeeping", description: "Income / expenses", frequency: "Annual" },
      { icon: "📄", title: "Tax return", description: "Individual taxation", frequency: "Annual" },
      { icon: "💰", title: "Social contributions", description: "AHV/IV/EO ~10.6%", frequency: "Quarterly" },
      { icon: "🏷️", title: "VAT", description: "If turnover > CHF 100,000", frequency: "Conditional" },
    ];
  }
  if (form === "Sarl") {
    return [
      { icon: "📋", title: "Commercial register", description: "Registration + SOGC", frequency: "Setup" },
      { icon: "⚖️", title: "Notarized deed", description: "Articles + incorporation", frequency: "Setup" },
      { icon: "🏦", title: "Capital CHF 20,000", description: "100% paid up", frequency: "Setup" },
      { icon: "📊", title: "Bookkeeping", description: "Balance sheet + P&L + notes", frequency: "Annual" },
      { icon: "📄", title: "Tax return", description: "Profit + capital", frequency: "Annual" },
      { icon: "👥", title: "Members meeting", description: "Min. 1x/year", frequency: "Annual" },
      { icon: "💰", title: "Social contributions", description: "AHV, BVG, UVG, ALV", frequency: "Monthly" },
      { icon: "🔍", title: "Auditor", description: "Opt-out possible", frequency: "Conditional" },
    ];
  }
  return [
    { icon: "📋", title: "Commercial register", description: "Registration + SOGC", frequency: "Setup" },
    { icon: "⚖️", title: "Notarized deed", description: "Articles + incorporation", frequency: "Setup" },
    { icon: "🏦", title: "Capital CHF 100,000", description: "Min. 50,000 paid up", frequency: "Setup" },
    { icon: "📊", title: "Bookkeeping", description: "Balance sheet + P&L + notes", frequency: "Annual" },
    { icon: "📄", title: "Tax return", description: "Profit + capital", frequency: "Annual" },
    { icon: "👥", title: "General assembly", description: "Min. 1x/year + board", frequency: "Annual" },
    { icon: "💰", title: "Social contributions", description: "AHV, BVG, UVG, ALV", frequency: "Monthly" },
    { icon: "🔍", title: "Auditor", description: "Opt-out < 10 FTE", frequency: "Conditional" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await getCompanyBySlug(params.slug);
  if (!company) return { title: "Company not found | NeoFidu" };

  const formLabel = FORM_EN[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;
  const canonicalUrl = `https://neofidu.ch/en/observatoire/${params.slug}`;

  return {
    title: `${company.name} | Swiss Company Observatory`,
    description: `${company.name} — ${formLabel} in ${company.city} (${cantonName}). ${company.purpose?.substring(0, 120) || ""}`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "fr-CH": `https://neofidu.ch/observatoire/${params.slug}`,
        "en": canonicalUrl,
      },
    },
  };
}

export default async function CompanyPageEN({ params }: Props) {
  const company = await getCompanyBySlug(params.slug);
  if (!company) notFound();

  const [similarCompanies, communeData] = await Promise.all([
    getSimilarCompanies(params.slug, company.canton, company.city, company.sector),
    getCommuneForCompany(company.city, company.canton),
  ]);

  const formLabel = FORM_EN[company.legal_form] || company.legal_form;
  const cantonName = CANTON_NAMES[company.canton] || company.canton;
  const sectorLabel = company.sector ? (SECTOR_EN[company.sector] || company.sector) : null;
  const fiscal = CANTON_FISCAL[company.canton];
  const tauxPct = fiscal ? parseFloat(fiscal.tauxEntreprise) : 0;
  const exIFD = Math.round(30000 * 0.085);
  const exCantComm = Math.round(30000 * Math.max(tauxPct - 8.5, 0) / 100);
  const totalCoeff = (communeData?.taux_canton ?? 1) + (communeData?.taux_commune ?? 1);
  const exCanton = communeData?.taux_canton ? Math.round(exCantComm * communeData.taux_canton / totalCoeff) : exCantComm;
  const exCommune = communeData?.taux_commune ? Math.round(exCantComm * communeData.taux_commune / totalCoeff) : 0;
  const exTotal = exIFD + exCantComm;
  const faqItems = generateCompanyFAQ(company, cantonName);
  const obligations = generateObligations(company.legal_form);
  const obligationGrid: (ObligationItem | null)[] = [...obligations.slice(0, 4), null, ...obligations.slice(4)];

  const badgeClass =
    company.legal_form === "RI"
      ? "bg-blue-50 text-blue-700"
      : company.legal_form === "Sarl"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  const ctaText =
    company.legal_form === "RI"
      ? { text: "Are you also self-employed?", offer: "Tax return from CHF 129.-", href: "/demande" }
      : company.legal_form === "Sarl"
      ? { text: "Need an accountant for your LLC?", offer: "Accounting from CHF 500.-/year", href: "/demande" }
      : { text: "Your corporation deserves professional support.", offer: "Accounting from CHF 500.-/year", href: "/demande" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: company.name,
        address: { "@type": "PostalAddress", addressLocality: company.city, addressRegion: cantonName, addressCountry: "CH" },
        ...(company.ide_number && { taxID: company.ide_number }),
        ...(company.purpose && { description: company.purpose.substring(0, 300) }),
        url: `https://neofidu.ch/en/observatoire/${params.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question", name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://neofidu.ch" },
          { "@type": "ListItem", position: 2, name: "Observatory", item: "https://neofidu.ch/en/observatoire" },
          { "@type": "ListItem", position: 3, name: company.name },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Language switch + Back link */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/observatoire" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to observatory
          </Link>
          <Link href={`/observatoire/${params.slug}`} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            FR | <span className="font-semibold text-gray-700">EN</span>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
            <p className="text-xs text-gray-400">neofidu.ch/en/observatoire/{params.slug}</p>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass}`}>{formLabel}</span>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">{company.name}</h1>
              <CantonFlag canton={company.canton} size={56} />
            </div>
            <p className="text-sm text-gray-500 mb-6">{company.city}, {cantonName}</p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Building2 className="w-3 h-3" />Legal form</div>
                <p className="text-sm font-medium text-gray-900">{formLabel}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><MapPin className="w-3 h-3" />Headquarters</div>
                <p className="text-sm font-medium text-gray-900">{company.city}, {company.canton}</p>
              </div>
              {company.ide_number && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Hash className="w-3 h-3" />IDE No.</div>
                  <p className="text-sm font-medium text-gray-900">{company.ide_number}</p>
                </div>
              )}
              {company.capital && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Building2 className="w-3 h-3" />Capital</div>
                  <p className="text-sm font-medium text-gray-900">{company.capital}</p>
                </div>
              )}
              {sectorLabel && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Tag className="w-3 h-3" />Sector</div>
                  <p className="text-sm font-medium text-gray-900">{sectorLabel}</p>
                </div>
              )}
            </div>

            <CommuneMedia city={company.city} canton={company.canton} />

            {/* Purpose */}
            {company.purpose && (
              <div className="mb-14">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><FileText className="w-4 h-4" />Company purpose</div>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">{company.purpose}</p>
                <p className="text-xs text-gray-400 mt-1 italic">Original text from the Swiss Commercial Registry</p>
              </div>
            )}

            {/* Persons */}
            {company.persons && company.persons.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"><Users className="w-4 h-4" />Registered persons</div>
                <div className="space-y-3">
                  {company.persons.map((person: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-xs font-medium text-blue-700">{person.initials}</div>
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
              <div className="mb-14">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"><Clock className="w-4 h-4" />SOGC History</div>
                <div className="space-y-2">
                  {company.fosc_history.map((entry: any, i: number) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-gray-400 w-20 flex-shrink-0">{entry.date}</span>
                      <span className="text-gray-600">{entry.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">Original text from the Swiss Official Gazette of Commerce</p>
              </div>
            )}

            {/* Fiscal context */}
            {fiscal && (
              <div className="mb-14">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Landmark className="w-4 h-4" />Tax context &mdash; {company.city} ({cantonName})
                </div>
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Corporate tax rate</span>
                      <p className="font-medium text-gray-900">{fiscal.tauxEntreprise}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Minimum capital</span>
                      <p className="font-medium text-gray-900">{fiscal.capitalMin}</p>
                    </div>
                  </div>
                  {communeData?.taux_commune && (
                    <div className="border-t border-blue-100 pt-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Municipal coefficient ({communeData.nom})</span>
                          <p className="font-medium text-gray-900">{communeData.taux_commune.toFixed(1)}</p>
                        </div>
                        <div className="flex items-end">
                          <Link href={`/en/communes/${communeData.slug}`} className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline">
                            View {communeData.nom} tax profile &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="border-t border-blue-100 pt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Estimate on CHF 30&apos;000 net profit</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-white/60 rounded p-2 text-center">
                        <p className="text-xs text-gray-400">FIT (federal)</p>
                        <p className="font-medium text-gray-900">CHF {exIFD.toLocaleString("de-CH")}</p>
                        <p className="text-xs text-gray-400">8.5%</p>
                      </div>
                      <div className="bg-white/60 rounded p-2 text-center">
                        <p className="text-xs text-gray-400">Canton</p>
                        <p className="font-medium text-gray-900">~CHF {exCanton.toLocaleString("de-CH")}</p>
                        {communeData?.taux_canton && <p className="text-xs text-gray-400">coeff. {communeData.taux_canton.toFixed(1)}</p>}
                      </div>
                      <div className="bg-white/60 rounded p-2 text-center">
                        <p className="text-xs text-gray-400">Municipality</p>
                        <p className="font-medium text-gray-900">~CHF {exCommune.toLocaleString("de-CH")}</p>
                        {communeData?.taux_commune && <p className="text-xs text-gray-400">coeff. {communeData.taux_commune.toFixed(1)}</p>}
                      </div>
                    </div>
                    <div className="mt-2 bg-emerald-50/80 rounded p-2 text-center">
                      <p className="text-xs text-gray-400">Estimated total</p>
                      <p className="font-medium text-emerald-700">~CHF {exTotal.toLocaleString("de-CH")}</p>
                      <p className="text-xs text-gray-400">~{tauxPct}%</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Indicative estimate.{communeData?.taux_commune && ` Municipal coefficient of ${communeData.nom}: ${communeData.taux_commune.toFixed(1)}.`}{communeData?.annee_fiscale && ` ${communeData.annee_fiscale} data.`} Actual amounts depend on the company&apos;s situation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Similar companies */}
            {similarCompanies.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  {sectorLabel ? `Other ${sectorLabel} companies in ${company.city}` : `Other companies in ${company.city}`}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {similarCompanies.map((c) => (
                    <Link key={c.slug} href={`/en/observatoire/${c.slug}`} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                      <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.city} &middot; {FORM_EN[c.legal_form] || c.legal_form}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Legal obligations */}
            <div className="mb-14">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Shield className="w-4 h-4" />Legal obligations
                <span className={`ml-1 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>{formLabel}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {obligationGrid.map((o, i) =>
                  o === null ? (
                    <div key="hub" className="hidden md:flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-emerald-50 border-2 border-emerald-100 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-emerald-600">{formLabel}</span>
                        <span className="text-xs text-gray-500">{obligations.length} obligations</span>
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 md:p-4 text-center">
                      <div className="text-xl md:text-2xl mb-1 md:mb-2">{o.icon}</div>
                      <p className="text-xs md:text-sm font-medium text-gray-900 leading-tight">{o.title}</p>
                      <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 line-clamp-2">{o.description}</p>
                      <span className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${FREQ_COLORS[o.frequency] || "bg-gray-100 text-gray-600"}`}>
                        {o.frequency}
                      </span>
                    </div>
                  )
                )}
              </div>
              {company.legal_form === "RI" && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-3">
                  <span className="text-2xl">{"🛡️"}</span>
                  <div className="flex-1">
                    <p className="font-medium text-orange-800">Insurance &mdash; Highly recommended</p>
                    <p className="text-sm text-orange-600">Professional liability, daily allowance, loss of earnings insurance</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Recommended</span>
                </div>
              )}
            </div>

            {/* FAQ */}
            <div className="mb-14">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"><HelpCircle className="w-4 h-4" />Frequently asked questions</div>
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

            <RelatedArticles canton={company.canton} legalForm={company.legal_form} city={company.city} />

            {/* CTA */}
            <div className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-emerald-800 font-medium">{ctaText.text}</p>
                <p className="text-sm text-emerald-600">{ctaText.offer}</p>
              </div>
              <Link href={ctaText.href}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap">Learn more</Button>
              </Link>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">Source: Swiss Commercial Registry via Zefix / SOGC</p>
          </div>
        </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
