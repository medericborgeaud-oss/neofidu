import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
  template: "%s | NeoFidu",
  default: "NeoFidu",
},
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
