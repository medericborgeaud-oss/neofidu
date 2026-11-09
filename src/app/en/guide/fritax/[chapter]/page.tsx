import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { fritaxGuide } from "@/lib/guides/fritax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return fritaxGuide.chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter } = await params;
  const c = fritaxGuide.chapters.find((x) => x.slug === chapter);
  return c ? buildGuideMetadata(fritaxGuide, "en", c) : {};
}

export default async function Page({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  return <GuidePage guide={fritaxGuide} locale="en" chapterSlug={chapter} />;
}
