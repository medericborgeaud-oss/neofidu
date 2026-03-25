import type { Metadata } from "next";
import SwissDebtClock from "@/components/SwissDebtClock";

const TITLE = "Swiss Debt Clock — Federal Budget 2026";
const DESC =
  "Track Switzerland's federal debt in real time. Revenue, expenses " +
  "and deficit per second based on the 2026 federal budget published " +
  "by the Federal Finance Administration (FFA).";
const URL = "https://neofidu.ch/swiss-debt";
const OG_IMAGE = "https://neofidu.ch/og/dette-suisse.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Swiss debt clock",
    "Switzerland federal debt",
    "Swiss national debt",
    "federal budget 2026",
    "Swiss government spending",
    "Swiss federal revenue",
    "Swiss deficit",
    "Bundeshaushalt 2026",
    "Schweizer Schulden",
    "dette suisse",
    "Federal Finance Administration",
    "FFA",
    "EFV",
  ],
  alternates: {
    canonical: URL,
    languages: {
      "fr-CH": "https://neofidu.ch/dette-suisse",
      "en": URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    siteName: "NeoFidu",
    locale: "en",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Swiss federal debt clock in real time — NeoFidu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://neofidu.ch" },
      { "@type": "ListItem", position: 2, name: "Swiss Debt Clock", item: URL },
    ],
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESC,
    url: URL,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "NeoFidu", url: "https://neofidu.ch" },
    about: {
      "@type": "Thing",
      name: "Swiss federal debt",
      description:
        "Real-time estimate of the Swiss Confederation net debt, based on the 2026 federal budget.",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much is Switzerland's federal debt in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The net debt of the Swiss Confederation was estimated at approximately CHF 140 billion at the start of 2026, according to data from the Federal Finance Administration (FFA). The 2026 budget projects a financing deficit of CHF 742 million.",
        },
      },
      {
        "@type": "Question",
        name: "What are Switzerland's main federal revenue sources?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The main federal revenue sources in 2026 are: VAT (CHF 28.1 billion), direct federal tax on corporations (CHF 17.1 billion), direct federal tax on individuals (CHF 15.9 billion), withholding tax (CHF 6.7 billion), and mineral oil tax (CHF 4.5 billion). Total revenue amounts to CHF 90.4 billion.",
        },
      },
      {
        "@type": "Question",
        name: "What are the largest Swiss federal spending categories?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Federal spending in 2026 is dominated by social welfare (old-age insurance, disability, asylum) at CHF 31.8 billion, followed by finance & taxes (cantonal shares) at CHF 14.8 billion, transport & infrastructure at CHF 11.2 billion, and education & research at CHF 9.0 billion. Total expenditure reaches CHF 91.1 billion.",
        },
      },
      {
        "@type": "Question",
        name: "Where does the data for this debt clock come from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All data is based on the 2026 federal budget published by the Swiss Federal Finance Administration (FFA / EFV). The Confederation's net debt figure comes from publications by the Federal Department of Finance (FDF). The clock extrapolates the budgeted deficit continuously for illustrative purposes.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function SwissDebtPage() {
  return (
    <>
      <JsonLd />
      <main className="pt-28 md:pt-36 pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-4">
              Swiss Federal Debt Clock
            </h1>
            <p className="text-slate-400 leading-relaxed">
              Watch Switzerland&apos;s federal debt evolve in real time. This
              clock is based on the{" "}
              <strong className="text-slate-300">2026 federal budget</strong>{" "}
              published by the Federal Finance Administration.
            </p>
          </div>

          <SwissDebtClock />

          <section className="max-w-2xl mx-auto mt-16 space-y-8 text-slate-400 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-slate-200 mb-2">
                How does this clock work?
              </h2>
              <p>
                The clock extrapolates the annual budgeted deficit (CHF 742
                million for 2026) continuously, second by second, from January
                1st 2026. This is an illustrative estimate: the actual debt
                fluctuates based on real cash flows throughout the year.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-200 mb-2">
                2026 Federal Budget at a Glance
              </h2>
              <p>
                The Confederation projects total revenue of{" "}
                <strong className="text-slate-300">CHF 90.4 billion</strong> and
                expenditure of{" "}
                <strong className="text-slate-300">CHF 91.1 billion</strong>,
                resulting in a financing deficit of CHF 742 million. VAT remains
                the largest revenue source (CHF 28.1 bn), while social welfare
                is the largest spending category (CHF 31.8 bn).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-200 mb-2">
                Sources & Methodology
              </h2>
              <p>
                All data comes from the{" "}
                <a
                  href="https://www.efv.admin.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Federal Finance Administration (FFA / EFV)
                </a>{" "}
                and the{" "}
                <a
                  href="https://www.efd.admin.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Federal Department of Finance (FDF / EFD)
                </a>
                . The Confederation&apos;s net debt at end-2025 is estimated at
                approximately CHF 140 billion. This clock is provided for
                informational purposes and is not an official indicator.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
