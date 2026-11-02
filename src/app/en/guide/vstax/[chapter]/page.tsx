import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { vstaxGuide } from "@/lib/guides/vstax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return vstaxGuide.chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter } = await params;
  const c = vstaxGuide.chapters.find((x) => x.slug === chapter);
  return c ? buildGuideMetadata(vstaxGuide, "en", c) : {};
}

export default async function Page({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  return <GuidePage guide={vstaxGuide} locale="en" chapterSlug={chapter} />;
}
