import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { vaudtaxGuide } from "@/lib/guides/vaudtax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const metadata: Metadata = buildGuideMetadata(vaudtaxGuide, "fr");

export default function Page() {
  return <GuidePage guide={vaudtaxGuide} locale="fr" />;
}
