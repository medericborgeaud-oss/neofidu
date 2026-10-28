import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { getaxGuide } from "@/lib/guides/getax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const metadata: Metadata = buildGuideMetadata(getaxGuide, "fr");

export default function Page() {
  return <GuidePage guide={getaxGuide} locale="fr" />;
}
