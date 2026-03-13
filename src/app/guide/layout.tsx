import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Guides Fiscaux",
    default: "Guides Fiscaux",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
