"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight, Check } from "lucide-react";
import { CountryPage } from "@/lib/country-data";

function SwissFlag() {
  return (
    <svg width="72" height="72" viewBox="0 0 32 32" role="img" aria-label="Suisse">
      <rect width="32" height="32" fill="#D52B1E" />
      <rect x="13" y="6" width="6" height="20" fill="#ffffff" />
      <rect x="6" y="13" width="20" height="6" fill="#ffffff" />
    </svg>
  );
}

function CountryFlag({ slug }: { slug: string }) {
  if (slug === "royaume-uni") {
    return (
      <svg width="120" height="60" viewBox="0 0 60 30" role="img" aria-label="Royaume-Uni">
        <clipPath id="ukFlag">
          <rect width="60" height="30" />
        </clipPath>
        <g clipPath="url(#ukFlag)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" fill="none" stroke="#ffffff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" fill="none" stroke="#C8102E" strokeWidth="4" />
          <rect x="25" width="10" height="30" fill="#ffffff" />
          <rect y="10" width="60" height="10" fill="#ffffff" />
          <rect x="27" width="6" height="30" fill="#C8102E" />
          <rect y="12" width="60" height="6" fill="#C8102E" />
        </g>
      </svg>
    );
  }
  if (slug === "etats-unis") {
    return (
      <svg width="120" height="63" viewBox="0 0 38 20" role="img" aria-label="États-Unis">
        <rect width="38" height="20" fill="#B22234" />
        {[1, 3, 5, 7, 9, 11].map((i) => (
          <rect key={i} y={i * 1.538} width="38" height="1.538" fill="#ffffff" />
        ))}
        <rect width="15.2" height="10.77" fill="#3C3B6E" />
        {[1.3, 3.0, 4.7, 6.4, 8.1, 9.5].flatMap((y, ri) =>
          [1.6, 4.5, 7.4, 10.3, 13.2].map((x, ci) => {
            const cx = x + (ri % 2 ? 1.45 : 0);
            return cx < 14.5 ? (
              <circle key={`${ri}-${ci}`} cx={cx} cy={y} r={0.5} fill="#ffffff" />
            ) : null;
          })
        )}
      </svg>
    );
  }
  if (slug === "autres-pays") {
    return (
      <svg width="80" height="80" viewBox="0 0 24 24" role="img" aria-label="Autres pays" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    );
  }
  if (slug === "portugal") {
    return (
      <img src={`https://flagcdn.com/pt.svg`} width="120" height="80" alt="Portugal" style={{ objectFit: "cover", borderRadius: "6px" }} />
    );
  }
  if (slug === "espagne") {
    return (
      <img src={`https://flagcdn.com/es.svg`} width="120" height="80" alt="Espagne" style={{ objectFit: "cover", borderRadius: "6px" }} />
    );
  }
  if (slug === "belgique") {
    return (
      <svg width="120" height="80" viewBox="0 0 3 2" role="img" aria-label="Belgique">
        <rect width="1" height="2" fill="#000000" />
        <rect x="1" width="1" height="2" fill="#FAE042" />
        <rect x="2" width="1" height="2" fill="#ED2939" />
      </svg>
    );
  }
  if (slug === "france") {
    return (
      <svg width="120" height="80" viewBox="0 0 3 2" role="img" aria-label="France">
        <rect width="3" height="2" fill="#ffffff" />
        <rect width="1" height="2" fill="#0055A4" />
        <rect x="2" width="1" height="2" fill="#EF4135" />
      </svg>
    );
  }
  return (
    <svg width="132" height="66" viewBox="0 0 64 32" role="img" aria-label="Canada">
      <rect width="64" height="32" fill="#ffffff" />
      <rect x="0" y="0" width="16" height="32" fill="#FF0000" />
      <rect x="48" y="0" width="16" height="32" fill="#FF0000" />
      <g transform="translate(32 16) scale(0.047) translate(-256 -256)" fill="#FF0000">
        <path d="M383.8 351.7c26.4-14.3 49.6-30.5 74.8-46.9-5.9-2.7-11.8-5.4-17.7-8.1-3.6-1.6-6.7-3.4-5.6-8.5 2.3-10.7 4.4-21.5 6.6-32.2-11.6 2.7-22.2 5.2-32.9 7.6-6.9 1.5-10.4-.7-11.3-7.4-.9-6.2-2-12.4-3.2-19.3-9.8 10.6-19.1 20.6-28.4 30.6-6.5 7-12.4 4.5-13.1-4.6-1.9-24.7-3.9-49.4-5.9-74.1-.1-1.4-.5-2.8-.9-5.1-7.2 4.2-13.9 8-20.5 12-6.7 4-9.6 2.9-11.6-4.6-6.4-24.1-13-48.1-19.5-72.2-.4-1.5-1-2.9-1.8-5.3-6.5 11.3-12.5 21.7-18.4 32.1-4.9 8.6-10.7 8.6-15.6 0-5.9-10.4-11.9-20.8-18.4-32.1-.8 2.4-1.4 3.8-1.8 5.3-6.5 24.1-13.1 48.1-19.5 72.2-2 7.5-4.9 8.6-11.6 4.6-6.6-4-13.3-7.8-20.5-12-.4 2.3-.8 3.7-.9 5.1-2 24.7-4 49.4-5.9 74.1-.7 9.1-6.6 11.6-13.1 4.6-9.3-10-18.6-20-28.4-30.6-1.2 6.9-2.3 13.1-3.2 19.3-.9 6.7-4.4 8.9-11.3 7.4-10.7-2.4-21.3-4.9-32.9-7.6 2.2 10.7 4.3 21.5 6.6 32.2 1.1 5.1-2 6.9-5.6 8.5-5.9 2.7-11.8 5.4-17.7 8.1 25.2 16.4 48.4 32.6 74.8 46.9 9.7 5.3 12.9 10.9 8.9 21.2-2.1 5.4-3.4 11.1-5.4 17.7 24.3-5.2 47.3-10.1 70.3-15 .3 8.9.4 17.3 1 25.7.4 5.9 3.5 8.4 9.4 8.3 8.4-.1 16.7 0 25.9 0-2.1 24.6-4.1 48.3-6.1 72 .1 0 3.4.1 6.6.1 3.2 0 6.5-.1 6.6-.1-2-23.7-4-47.4-6.1-72 9.2 0 17.5-.1 25.9 0 5.9.1 9-2.4 9.4-8.3.6-8.4.7-16.8 1-25.7 23 4.9 46 9.8 70.3 15-2-6.6-3.3-12.3-5.4-17.7-4-10.3-.8-15.9 8.9-21.2z" />
      </g>
    </svg>
  );
}

function TaxSplitInfographic({ data, isEnglish }: { data: NonNullable<CountryPage["infographic"]>; isEnglish: boolean }) {
  return (
    <svg viewBox="0 0 680 300" width="100%" role="img" className="my-8" aria-label={isEnglish ? data.leftTitleEn + " / " + data.rightTitleEn : data.leftTitle + " / " + data.rightTitle}>
      <rect x="40" y="24" width="280" height="40" rx="8" fill="hsl(var(--primary))" />
      <text x="180" y="49" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600">{isEnglish ? data.leftTitleEn : data.leftTitle}</text>
      <rect x="360" y="24" width="280" height="40" rx="8" fill="hsl(var(--secondary-foreground))" />
      <text x="500" y="49" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600">{isEnglish ? data.rightTitleEn : data.rightTitle}</text>
      <rect x="40" y="80" width="280" height="118" rx="8" fill="#ffffff" stroke="hsl(var(--border))" />
      <rect x="360" y="80" width="280" height="118" rx="8" fill="#ffffff" stroke="hsl(var(--border))" />
      {data.leftItems.map((it, i) => (
        <g key={"l" + i}>
          <circle cx="60" cy={112 + i * 32} r="3" fill="hsl(var(--primary))" />
          <text x="74" y={116 + i * 32} fill="hsl(var(--foreground))" fontSize="14">{isEnglish ? it.en : it.fr}</text>
        </g>
      ))}
      {data.rightItems.map((it, i) => (
        <g key={"r" + i}>
          <circle cx="380" cy={112 + i * 32} r="3" fill="hsl(var(--secondary-foreground))" />
          <text x="394" y={116 + i * 32} fill="hsl(var(--foreground))" fontSize="14">{isEnglish ? it.en : it.fr}</text>
        </g>
      ))}
      <rect x="40" y="216" width="600" height="62" rx="8" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" />
      <text x="64" y="244" fill="hsl(var(--accent-foreground))" fontSize="14" fontWeight="600">{isEnglish ? data.calloutMainEn : data.calloutMain}</text>
      <text x="64" y="264" fill="hsl(var(--accent-foreground))" fontSize="12">{isEnglish ? data.calloutSubEn : data.calloutSub}</text>
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
              <Link href="/suisses-etranger" className="hover:text-primary">
                {isEnglish ? "Swiss citizens abroad" : "Suisses de l'étranger"}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-foreground">{isEnglish ? page.countryEn : page.country}</span>
            </nav>

            <div className="flex items-center justify-between mb-6">
              <SwissFlag />
              <CountryFlag slug={page.slug} />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-sm font-medium px-3 py-1 mb-4">
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

            {page.infographic && <TaxSplitInfographic data={page.infographic} isEnglish={isEnglish} />}

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
                  ? "Manage your Swiss taxes from abroad"
                  : "Gérez votre fiscalité suisse depuis l'étranger"}
              </h2>
              <p className="opacity-90 mb-6">
                {isEnglish
                  ? "Free quote, no commitment - 100% online."
                  : "Devis gratuit, sans engagement - 100 % en ligne."}
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
