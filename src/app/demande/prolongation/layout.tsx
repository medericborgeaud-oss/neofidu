import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extension de délai fiscal",
  description: "Demandez une extension de délai pour votre déclaration d'impôts suisse.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.neofidu.ch/demande/prolongation",
  },
};

export default function ProlongationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
