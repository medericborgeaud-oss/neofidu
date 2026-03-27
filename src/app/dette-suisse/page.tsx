import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SwissDebtClock from "@/components/SwissDebtClock";
import Link from "next/link";

// ════════════════════════════════════════════════════════════════
//  SEO — Metadata (Next.js App Router)
// ════════════════════════════════════════════════════════════════
const TITLE = "Compteur de la dette suisse en direct — Budget fédéral 2026";
const DESC =
  "Suivez en temps réel l'évolution de la dette fédérale suisse. " +
  "Recettes, dépenses et déficit par seconde selon le budget 2026 " +
  "de l'Administration fédérale des finances (AFF).";
const URL = "https://www.neofidu.ch/dette-suisse";
const OG_IMAGE = "https://www.neofidu.ch/og/dette-suisse.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "dette suisse",
    "dette fédérale suisse",
    "compteur dette suisse",
    "budget fédéral 2026",
    "finances fédérales suisse",
    "dette confédération",
    "déficit fédéral suisse",
    "recettes fédérales",
    "dépenses fédérales",
    "TVA suisse",
    "impôt fédéral direct",
    "administration fédérale des finances",
    "AFF",
    "EFV",
    "Swiss debt clock",
    "Schweizer Schulden",
    "Bundeshaushalt 2026",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    siteName: "NeoFidu",
    locale: "fr_CH",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Compteur de la dette fédérale suisse en temps réel — NeoFidu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ════════════════════════════════════════════════════════════════
//  JSON-LD Structured Data
// ════════════════════════════════════════════════════════════════
function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.neofidu.ch",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compteur de la dette suisse",
        item: URL,
      },
    ],
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESC,
    url: URL,
    inLanguage: "fr-CH",
    isPartOf: {
      "@type": "WebSite",
      name: "NeoFidu",
      url: "https://www.neofidu.ch",
    },
    about: {
      "@type": "Thing",
      name: "Dette fédérale suisse",
      description:
        "Estimation en temps réel de la dette nette de la Confédération suisse, basée sur le budget fédéral 2026.",
    },
    mainEntity: {
      "@type": "Dataset",
      name: "Budget fédéral suisse 2026",
      description:
        "Recettes et dépenses de la Confédération suisse pour l'exercice 2026, selon l'Administration fédérale des finances.",
       license: "https://opendata.swiss/en/terms-of-use",   
      creator: {
        "@type": "Organization",
        name: "Administration fédérale des finances (AFF)",
        url: "https://www.efv.admin.ch",
      },
      temporalCoverage: "2026",
      spatialCoverage: {
        "@type": "Place",
        name: "Suisse",
      },
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quel est le montant de la dette fédérale suisse en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La dette nette de la Confédération suisse était estimée à environ 140 milliards de francs au début de l'année 2026, selon les données de l'Administration fédérale des finances (AFF). Le budget 2026 prévoit un déficit de financement de 742 millions de francs.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles sont les principales recettes de la Confédération suisse ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les principales recettes fédérales en 2026 sont : la TVA (28,1 milliards), l'impôt fédéral direct sur les personnes morales (17,1 milliards), l'impôt fédéral direct sur les personnes physiques (15,9 milliards), l'impôt anticipé (6,7 milliards) et l'impôt sur les huiles minérales (4,5 milliards). Le total des recettes s'élève à 90,4 milliards de francs.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les principaux postes de dépenses fédérales ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les dépenses fédérales 2026 sont dominées par la prévoyance sociale (AVS, AI, APG, PC, asile) avec 31,8 milliards, suivie par les finances et impôts (parts cantonales) à 14,8 milliards, le trafic et l'infrastructure à 11,2 milliards, et la formation et recherche à 9,0 milliards. Le total des dépenses atteint 91,1 milliards de francs.",
        },
      },
      {
        "@type": "Question",
        name: "D'où proviennent les données de ce compteur de la dette ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les données sont basées sur le budget fédéral 2026 publié par l'Administration fédérale des finances (AFF / EFV). La dette nette de la Confédération est tirée des publications du Département fédéral des finances (DFF). Le compteur extrapole le déficit budgété en continu à titre illustratif.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

// ════════════════════════════════════════════════════════════════
//  PAGE
// ════════════════════════════════════════════════════════════════
export default function DettesSuissePage() {
  return (
    <>
      <JsonLd />
      <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
        <Header />

        <div className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
              <span className="mx-2">/</span>
              <span>Compteur de la dette suisse</span>
            </nav>

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-primary">
                  <rect width="32" height="32" rx="4" fill="#D52B1E" />
                  <rect x="8" y="13" width="16" height="6" rx="1" fill="#fff" />
                  <rect x="13" y="8" width="6" height="16" rx="1" fill="#fff" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Compteur de la dette{" "}
                <span className="text-gradient">suisse</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Visualisez en temps réel l&apos;évolution de la dette de la
                Confédération suisse. Ce compteur est basé sur le{" "}
                <strong className="text-foreground">budget fédéral 2026</strong>{" "}
                publié par l&apos;Administration fédérale des finances.
              </p>
            </div>

            {/* Widget */}
            <SwissDebtClock />

            {/* SEO content */}
            <section className="max-w-3xl mx-auto mt-16 space-y-8">
              <div className="bg-white/80 rounded-2xl border p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-3">
                  Comment fonctionne ce compteur ?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le compteur extrapole le déficit annuel budgété (742 millions de
                  CHF pour 2026) en continu, seconde par seconde, à partir du
                  1er janvier 2026. Il s&apos;agit d&apos;une estimation
                  illustrative : la dette réelle fluctue en fonction des
                  encaissements et décaissements effectifs tout au long de
                  l&apos;année.
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl border p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-3">
                  Budget fédéral 2026 en bref
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  La Confédération prévoit des recettes totales de{" "}
                  <strong className="text-foreground">90,4 milliards de francs</strong>{" "}
                  et des dépenses de{" "}
                  <strong className="text-foreground">91,1 milliards de francs</strong>,
                  soit un déficit de financement de 742 millions. La TVA reste la
                  première source de revenus (28,1 Mrd), tandis que la prévoyance
                  sociale représente le plus gros poste de dépenses (31,8 Mrd).
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl border p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-3">
                  Sources et méthodologie
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Toutes les données proviennent de l&apos;
                  <a
                    href="https://www.efv.admin.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Administration fédérale des finances (AFF / EFV)
                  </a>{" "}
                  et du{" "}
                  <a
                    href="https://www.efd.admin.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Département fédéral des finances (DFF / EFD)
                  </a>
                  . La dette nette de la Confédération fin 2025 est estimée à
                  environ 140 milliards de francs. Ce compteur est proposé à titre
                  informatif et ne constitue pas un indicateur officiel.
                </p>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link
                href="/demande"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Besoin d&apos;aide avec vos impôts ?
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
