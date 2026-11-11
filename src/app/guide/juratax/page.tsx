import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { jurataxGuide } from "@/lib/guides/juratax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const metadata: Metadata = buildGuideMetadata(jurataxGuide, "fr");

export default function Page() {
  return <GuidePage guide={jurataxGuide} locale="fr" />;
}
