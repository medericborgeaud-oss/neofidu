"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight, Check } from "lucide-react";
import { CountryPage } from "@/lib/country-data";

function TaxSplitInfographic({ isEnglish }: { isEnglish: boolean }) {
  const L = {
    ch: isEnglish ? "Taxed in Switzerland" : "Imposé en Suisse",
    ca: isEnglish ? "Taxed in Canada" : "Imposé au Canada",
    ch1: isEnglish ? "Swiss real estate" : "Bien immobilier en Suisse",
    ch2: isEnglish ? "2nd / 3rd pillar benefits" : "Prestations 2e / 3e pilier",
    ch3: isEnglish ? "Certain Swiss-source income" : "Certains revenus suisses",
    ca1: isEnglish ? "Canadian salary & income" : "Salaire et revenus canadiens",
    ca2: isEnglish ? "AVS pension (1st pillar)" : "Rente AVS (1er pilier)",
    ca3: isEnglish ? "Worldwide income" : "Revenu mondial",
    box1: isEnglish
      ? "2nd & 3rd pillar: taxed at source in Switzerland, then refunded"
      : "2e et 3e pilier : imposé à la source en Suisse, puis remboursé",
    box2: isEnglish
      ? "The CH–Canada treaty assigns taxation to the country of residence"
      : "La convention CH–Canada attribue l'imposition au pays de résidence",
  };
  return (
    <svg viewBox="0 0 680 300" width="100%" role="img" className="my-8" aria-label={isEnglish ? "Where your income is taxed when you live in Canada" : "Où sont imposés vos revenus quand vous vivez au Canada"}>
      <rect x="40" y="24" width="280" height="40" rx="8" fill="#0d9488" />
      <text x="180" y="49" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600">{L.ch}</text>
      <rect x="360" y="24" width="280" height="40" rx="8" fill="#2563eb" />
      <text x="500" y="49" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600">{L.ca}</text>
      <rect x="40" y="80" width="280" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="360" y="80" width="280" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="60" cy="112" r="3" fill="#0d9488" />
      <text x="74" y="116" fill="#0f172a" fontSize="14">{L.ch1}</text>
      <circle cx="60" cy="144" r="3" fill="#0d9488" />
      <text x="74" y="148" fill="#0f172a" fontSize="14">{L.ch2}</text>
      <circle cx="60" cy="176" r="3" fill="#0d9488" />
      <text x="74" y="180" fill="#0f172a" fontSize="14">{L.ch3}</text>
      <circle cx="380" cy="112" r="3" fill="#2563eb" />
      <text x="394" y="116" fill="#0f172a" fontSize="14">{L.ca1}</text>
      <circle cx="380" cy="144" r="3" fill="#2563eb" />
      <text x="394" y="148" fill="#0f172a" fontSize="14">{L.ca2}</text>
      <circle cx="380" cy="176" r="3" fill="#2563eb" />
      <text x="394" y="180" fill="#0f172a" fontSize="14">{L.ca3}</text>
      <rect x="40" y="216" width="600" height="62" rx="8" fill="#f0fdf4" stroke="#22c55e" />
      <text x="64" y="244" fill="#166534" fontSize="14" fontWeight="600">{L.box1}</text>
      <text x="64" y="264" fill="#166534" fontSize="12">{L.box2}</text>
    </svg>
  );
}

export default function CountryPageClient({ page }: { page: CountryPage }) {
  const { isEnglish } = useLanguage();

  const h1 = isEnglish ? page.h1En : page.h1;
  const pop = isEnglish ? page.swissPopulationEn : page.swissPopulation;
  const intro = isEnglish ? page.introEn : page.intro;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto px-4 pt-28 pb-20">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary">
                {isEnglish ? "Home" : "Accueil"}
              </Link>
              <span className="mx-2">›</span>
              <span>{isEnglish ? "Swiss citizens abroad" : "Suisses de l'étranger"}</span>
              <span className="mx-2">›</span>
              <span className="text-foreground">{isEnglish ? page.countryEn : page.country}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-sm font-medium px-3 py-1 mb-4">
              <span>{page.countryEmoji}</span>
              <span>{pop}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{h1}</h1>

            <Link
              href="/demande"
              className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-semibold hover:opacity-90 transition mb-10"
            >
              {isEnglish ? "Request a free quote" : "Demander un devis gratuit"}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: intro }} />

            <TaxSplitInfographic isEnglish={isEnglish} />

            {page.sections.map((s, i) => (
              <section key={i} className="mt-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {isEnglish ? s.titleEn : s.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: isEnglish ? s.contentEn : s.content }} />
              </section>
            ))}

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {isEnglish ? "Frequent situations" : "Cas fréquents"}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {page.profiles.map((p, i) => (
                  <div key={i} className="rounded-xl border border-border p-5 bg-white">
                    <div className="font-semibold text-foreground mb-1">
                      {isEnglish ? p.labelEn : p.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isEnglish ? p.descriptionEn : p.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-2xl bg-secondary/40 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {isEnglish ? "How NeoFidu helps you" : "Comment NeoFidu vous aide"}
              </h2>
              <ul className="space-y-3">
                {(isEnglish
                  ? [
                      "Your cantonal tax return, prepared and filed remotely",
                      "Recovery of Swiss withholding tax on your 2nd/3rd pillar",
                      "Optimisation of your pillar withdrawal before or after leaving",
                      "100% online, in French, from anywhere",
                    ]
                  : [
                      "Votre déclaration cantonale, préparée et déposée à distance",
                      "Récupération de l'impôt à la source suisse sur vos 2e/3e piliers",
                      "Optimisation du retrait de vos piliers avant ou après le départ",
                      "100 % en ligne, en français, depuis n'importe où",
                    ]
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/tarifs"
                className="inline-flex items-center gap-2 text-primary font-semibold mt-6 hover:underline"
              >
                {isEnglish ? "See our pricing" : "Voir nos tarifs"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">FAQ</h2>
              <div className="space-y-4">
                {page.faq.map((f, i) => (
                  <div key={i} className="rounded-xl border border-border p-5 bg-white">
                    <div className="font-semibold text-foreground mb-2">
                      {isEnglish ? f.questionEn : f.question}
                    </div>
                    <div className="text-muted-foreground">
                      {isEnglish ? f.answerEn : f.answer}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-2xl bg-primary p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-3">
                {isEnglish
                  ? "Manage your Swiss taxes from Canada"
                  : "Gérez votre fiscalité suisse depuis le Canada"}
              </h2>
              <p className="opacity-90 mb-6">
                {isEnglish
                  ? "Free quote, no commitment — 100% online."
                  : "Devis gratuit, sans engagement — 100 % en ligne."}
              </p>
              <Link
                href="/demande"
                className="inline-flex items-center gap-2 bg-white text-primary rounded-full px-6 py-3 font-semibold hover:opacity-90 transition"
              >
                {isEnglish ? "Deposit a request" : "Déposer une demande"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            <p className="text-xs text-muted-foreground mt-8">
              {isEnglish ? "Updated on " : "Mis à jour le "}
              {page.lastUpdated}
              {isEnglish
                ? " · For information only, not contractual advice."
                : " · Informatif, ne constitue pas un conseil individualisé."}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
