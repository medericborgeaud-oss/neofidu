import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { jurataxGuide } from "@/lib/guides/juratax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return jurataxGuide.chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter } = await params;
  const c = jurataxGuide.chapters.find((x) => x.slug === chapter);
  return c ? buildGuideMetadata(jurataxGuide, "fr", c) : {};
}

export default async function Page({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  return <GuidePage guide={jurataxGuide} locale="fr" chapterSlug={chapter} />;
}
