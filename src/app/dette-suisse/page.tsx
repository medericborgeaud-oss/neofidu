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
tion fédérale des finances (AFF / EFV). La dette nette de la Confédération est tirée des publications du Département fédéral des finances (DFF). Le compteur extrapole le déficit budgété en continu à titre illustratif.",
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
