import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/GuidePage";
import { fritaxGuide } from "@/lib/guides/fritax";
import { buildGuideMetadata } from "@/lib/guides/seo";

export const metadata: Metadata = buildGuideMetadata(fritaxGuide, "en");

export default function Page() {
  return <GuidePage guide={fritaxGuide} locale="en" />;
}
