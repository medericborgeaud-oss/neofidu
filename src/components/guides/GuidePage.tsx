// Enveloppe commune : en-tête, pied de page, JSON-LD et contenu du guide.
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideArticle } from "./GuideArticle";
import { buildGuideJsonLd } from "@/lib/guides/seo";
import type { GuideDefinition, GuideLocale } from "@/lib/guides/types";

export function GuidePage({
  guide,
  locale,
  chapterSlug,
}: {
  guide: GuideDefinition;
  locale: GuideLocale;
  chapterSlug?: string;
}) {
  const chapter = chapterSlug ? guide.chapters.find((c) => c.slug === chapterSlug) : undefined;
  if (chapterSlug && !chapter) notFound();
  const jsonLd = buildGuideJsonLd(guide, locale, chapter);
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique généré côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <GuideArticle guide={guide} locale={locale} chapter={chapter} />
      <Footer />
    </div>
  );
}
