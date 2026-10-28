// Rendu serveur d'une page de guide (pilier ou chapitre). Aucun JS client requis :
// tout le contenu est dans le HTML initial, ce qui aide Google et les crawlers des LLM.
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Info,
  Lightbulb,
  TriangleAlert,
  MousePointerClick,
} from "lucide-react";
import type {
  GuideBlock,
  GuideChapter,
  GuideChapterContent,
  GuideDefinition,
  GuideLocale,
} from "@/lib/guides/types";

const UI = {
  fr: {
    home: "Accueil",
    guides: "Guides",
    updated: "Mis à jour le",
    taxYear: "Période fiscale",
    read: "min de lecture",
    by: "Par",
    author: "L'équipe NeoFidu, fiduciaire en Suisse romande",
    summary: "En bref",
    toc: "Sommaire du guide",
    onThisPage: "Sur cette page",
    faq: "Questions fréquentes",
    prev: "Précédent",
    next: "Suivant",
    start: "Commencer le guide",
    chapters: "Les chapitres du guide",
    ctaTitle: "Vous préférez déléguer ?",
    ctaButton: "Confier ma déclaration",
    ctaSecondary: "Voir les tarifs",
    dateLocale: "fr-CH",
  },
  en: {
    home: "Home",
    guides: "Guides",
    updated: "Updated on",
    taxYear: "Tax year",
    read: "min read",
    by: "By",
    author: "The NeoFidu team, fiduciary in French-speaking Switzerland",
    summary: "Key points",
    toc: "Guide contents",
    onThisPage: "On this page",
    faq: "Frequently asked questions",
    prev: "Previous",
    next: "Next",
    start: "Start the guide",
    chapters: "Guide chapters",
    ctaTitle: "Rather hand it over?",
    ctaButton: "Hand over my tax return",
    ctaSecondary: "See pricing",
    dateLocale: "en-GB",
  },
} as const;

// --- Mini-markdown : **gras** et [texte](lien) -------------------------------
function renderInline(text: string, locale: GuideLocale): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <strong key={key++} className="font-semibold text-foreground">
          {m[1]}
        </strong>
      );
    } else {
      let href = m[3];
      const external = /^https?:\/\//.test(href);
      if (!external && locale === "en" && href.startsWith("/") && !href.startsWith("/en")) {
        href = `/en${href}`;
      }
      out.push(
        external ? (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {m[2]}
          </a>
        ) : (
          <Link
            key={key++}
            href={href}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {m[2]}
          </Link>
        )
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({
  block,
  locale,
  guide,
}: {
  block: GuideBlock;
  locale: GuideLocale;
  guide: GuideDefinition;
}) {
  const t = UI[locale];
  switch (block.type) {
    case "h2":
      return (
        <h2 id={block.id} className="scroll-mt-24 text-2xl font-bold text-foreground mt-12 mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">{block.text}</h3>;
    case "p":
      return <p className="text-muted-foreground leading-relaxed mb-4">{renderInline(block.text, locale)}</p>;
    case "list":
      return (
        <ul className="mb-5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>{renderInline(item, locale)}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {i + 1}
              </span>
              <span className="text-muted-foreground leading-relaxed pt-0.5">{renderInline(item, locale)}</span>
            </li>
          ))}
        </ol>
      );
    case "path":
      return (
        <div className="mb-6 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            <MousePointerClick className="h-4 w-4" aria-hidden />
            {guide.ui[locale].pathLabel}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-sm">
            {block.items.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />}
                <span className="rounded bg-background border border-border px-2 py-0.5 font-medium text-foreground">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      );
    case "callout": {
      const styles = {
        tip: { box: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40", icon: Lightbulb, color: "text-emerald-700 dark:text-emerald-400" },
        warning: { box: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40", icon: TriangleAlert, color: "text-amber-700 dark:text-amber-400" },
        info: { box: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40", icon: Info, color: "text-sky-700 dark:text-sky-400" },
      }[block.tone];
      const Icon = styles.icon;
      return (
        <aside className={`mb-6 rounded-lg border p-4 ${styles.box}`}>
          <div className="flex gap-3">
            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${styles.color}`} aria-hidden />
            <div>
              {block.title && <p className={`font-semibold mb-1 ${styles.color}`}>{block.title}</p>}
              <p className="text-sm text-foreground/80 leading-relaxed">{renderInline(block.text, locale)}</p>
            </div>
          </div>
        </aside>
      );
    }
    case "table":
      return (
        <figure className="mb-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-2.5 text-left font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-muted-foreground align-top">
                      {renderInline(cell, locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "screenshot": {
      if (!guide.availableScreenshots.has(block.file)) return null;
      const src = `/guides/${guide.slug}/${guide.taxYear}/${block.file}`;
      return (
        <figure className="mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={block.alt}
            loading="lazy"
            className="block max-w-full h-auto mx-auto rounded-lg border border-border shadow-sm"
          />
          {block.caption && (
            <figcaption className="mt-2 text-xs text-muted-foreground text-center">{block.caption}</figcaption>
          )}
        </figure>
      );
    }
  }
}

export function GuideArticle({
  guide,
  locale,
  chapter,
}: {
  guide: GuideDefinition;
  locale: GuideLocale;
  /** Absent = page pilier */
  chapter?: GuideChapter;
}) {
  const t = UI[locale];
  const content: GuideChapterContent = chapter ? chapter[locale] : guide.pillar[locale];
  const index = chapter ? guide.chapters.findIndex((c) => c.slug === chapter.slug) : -1;
  const prev = index > 0 ? guide.chapters[index - 1] : undefined;
  const next = chapter ? guide.chapters[index + 1] : guide.chapters[0];
  const base = locale === "en" ? "/en" : "";
  const pillarHref = `${base}/guide/${guide.slug}`;
  const updated = new Date(guide.updatedAt).toLocaleDateString(t.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const h2s = content.blocks.filter((b): b is Extract<GuideBlock, { type: "h2" }> => b.type === "h2");
  const readTime = chapter ? chapter.readTime : 8;

  return (
    <main className="flex-1 bg-background pt-20 md:pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Fil d'Ariane visuel (le JSON-LD est émis par la page) */}
        <nav aria-label="Breadcrumb" className="pt-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href={base || "/"} className="hover:text-primary">
                {t.home}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              {chapter ? (
                <Link href={pillarHref} className="hover:text-primary">
                  {guide.pillar[locale].navTitle}
                </Link>
              ) : (
                <span className="text-foreground">{guide.pillar[locale].navTitle}</span>
              )}
            </li>
            {chapter && (
              <>
                <li aria-hidden>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li className="text-foreground">{content.navTitle}</li>
              </>
            )}
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] py-8">
          <article className="min-w-0">
            <header className="mb-8">
              {chapter && (
                <p className="text-sm font-semibold text-primary mb-2">
                  {guide.software} · {locale === "fr" ? "Chapitre" : "Chapter"} {index + 1}/{guide.chapters.length}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">{content.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>
                  {t.by} <span className="font-medium text-foreground">{t.author}</span>
                </span>
                <span>
                  {t.updated} <time dateTime={guide.updatedAt}>{updated}</time>
                </span>
                <span>
                  {t.taxYear} {guide.taxYear}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden /> {readTime} {t.read}
                </span>
              </div>
            </header>

            {/* Bloc "En bref" : réponse directe, extrait facilement par Google et les LLM */}
            <section aria-label={t.summary} className="mb-8 rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
              <h2 className="text-base font-bold text-foreground mb-3">{t.summary}</h2>
              <ul className="space-y-2">
                {content.summary.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/90 leading-relaxed">
                    <span className="text-primary font-bold" aria-hidden>
                      ›
                    </span>
                    <span>{renderInline(s, locale)}</span>
                  </li>
                ))}
              </ul>
            </section>

            {h2s.length > 2 && (
              <nav aria-label={t.onThisPage} className="mb-8 lg:hidden rounded-lg border border-border p-4">
                <p className="text-sm font-semibold mb-2">{t.onThisPage}</p>
                <ul className="space-y-1 text-sm">
                  {h2s.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-primary hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {content.blocks.map((block, i) => (
              <Block key={i} block={block} locale={locale} guide={guide} />
            ))}

            {/* Pilier : grille des chapitres */}
            {!chapter && (
              <section className="mt-12">
                <h2 id="chapitres" className="scroll-mt-24 text-2xl font-bold text-foreground mb-5">
                  {t.chapters}
                </h2>
                <ol className="grid gap-3 sm:grid-cols-2">
                  {guide.chapters.map((c, i) => (
                    <li key={c.slug}>
                      <Link
                        href={`${pillarHref}/${c.slug}`}
                        className="group flex h-full gap-3 rounded-lg border border-border p-4 hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {i + 1}
                        </span>
                        <span>
                          <span className="block font-semibold text-foreground group-hover:text-primary">
                            {c[locale].navTitle}
                          </span>
                          <span className="block text-sm text-muted-foreground mt-1 line-clamp-2">
                            {c[locale].metaDescription}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {content.faq.length > 0 && (
              <section className="mt-12">
                <h2 id="faq" className="scroll-mt-24 text-2xl font-bold text-foreground mb-5">
                  {t.faq}
                </h2>
                <div className="space-y-3">
                  {content.faq.map((f, i) => (
                    <details key={i} className="group rounded-lg border border-border p-4 open:bg-muted/30">
                      <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between gap-4">
                        <span>{f.q}</span>
                        <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-open:rotate-90" aria-hidden />
                      </summary>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{renderInline(f.a, locale)}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Navigation précédent / suivant */}
            <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Pagination">
              {prev ? (
                <Link
                  href={`${pillarHref}/${prev.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary"
                >
                  <ArrowLeft className="h-5 w-5 text-primary shrink-0" aria-hidden />
                  <span>
                    <span className="block text-xs text-muted-foreground">{t.prev}</span>
                    <span className="font-semibold">{prev[locale].navTitle}</span>
                  </span>
                </Link>
              ) : chapter ? (
                <Link
                  href={pillarHref}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary"
                >
                  <ArrowLeft className="h-5 w-5 text-primary shrink-0" aria-hidden />
                  <span className="font-semibold">{guide.pillar[locale].navTitle}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`${pillarHref}/${next.slug}`}
                  className="flex items-center justify-end gap-3 rounded-lg border border-border p-4 text-right hover:border-primary sm:col-start-2"
                >
                  <span>
                    <span className="block text-xs text-muted-foreground">{chapter ? t.next : t.start}</span>
                    <span className="font-semibold">{next[locale].navTitle}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-primary shrink-0" aria-hidden />
                </Link>
              )}
            </nav>

            {/* Appel à l'action discret */}
            <section className="mt-12 rounded-xl bg-primary text-primary-foreground p-6 md:p-8">
              <h2 className="text-xl font-bold mb-2">{t.ctaTitle}</h2>
              <p className="opacity-90 mb-5">{guide.ui[locale].ctaText}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`${base}/demande`}
                  className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-2.5 font-semibold text-primary hover:opacity-90"
                >
                  {t.ctaButton} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={`${base}/tarifs`}
                  className="inline-flex items-center rounded-md border border-primary-foreground/40 px-5 py-2.5 font-semibold hover:bg-primary-foreground/10"
                >
                  {t.ctaSecondary}
                </Link>
              </div>
            </section>

            <p className="mt-8 text-xs text-muted-foreground leading-relaxed">{guide.ui[locale].disclaimer}</p>
          </article>

          {/* Sommaire latéral */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <nav aria-label={t.toc} className="rounded-xl border border-border p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <BookOpen className="h-4 w-4 text-primary" aria-hidden /> {t.toc}
                </p>
                <ol className="space-y-1 text-sm">
                  <li>
                    <Link
                      href={pillarHref}
                      className={`block rounded px-2 py-1.5 ${!chapter ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
                    >
                      {locale === "fr" ? "Vue d'ensemble" : "Overview"}
                    </Link>
                  </li>
                  {guide.chapters.map((c, i) => (
                    <li key={c.slug}>
                      <Link
                        href={`${pillarHref}/${c.slug}`}
                        aria-current={chapter?.slug === c.slug ? "page" : undefined}
                        className={`block rounded px-2 py-1.5 ${chapter?.slug === c.slug ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
                      >
                        {i + 1}. {c[locale].navTitle}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
              {h2s.length > 2 && (
                <nav aria-label={t.onThisPage} className="rounded-xl border border-border p-4">
                  <p className="text-sm font-semibold text-foreground mb-3">{t.onThisPage}</p>
                  <ul className="space-y-1 text-sm">
                    {h2s.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="block px-2 py-1 text-muted-foreground hover:text-primary">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

