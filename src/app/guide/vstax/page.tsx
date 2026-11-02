import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { vstaxGuide } from "@/lib/guides/vstax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const metadata: Metadata = buildGuideMetadata(vstaxGuide, "fr");

export default function Page() {
  return <GuidePage guide={vstaxGuide} locale="fr" />;
}
