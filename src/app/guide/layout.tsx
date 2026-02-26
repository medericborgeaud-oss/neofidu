import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | NeoFidu",
    default: "Guides Fiscaux | NeoFidu",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
