import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { getaxGuide } from "@/lib/guides/getax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getaxGuide.chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter } = await params;
  const c = getaxGuide.chapters.find((x) => x.slug === chapter);
  return c ? buildGuideMetadata(getaxGuide, "fr", c) : {};
}

export default async function Page({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  return <GuidePage guide={getaxGuide} locale="fr" chapterSlug={chapter} />;
}
