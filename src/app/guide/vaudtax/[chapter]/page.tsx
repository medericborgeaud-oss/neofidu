import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { vaudtaxGuide } from "@/lib/guides/vaudtax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return vaudtaxGuide.chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter } = await params;
  const c = vaudtaxGuide.chapters.find((x) => x.slug === chapter);
  return c ? buildGuideMetadata(vaudtaxGuide, "fr", c) : {};
}

export default async function Page({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  return <GuidePage guide={vaudtaxGuide} locale="fr" chapterSlug={chapter} />;
}
