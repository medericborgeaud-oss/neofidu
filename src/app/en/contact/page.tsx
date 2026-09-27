import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BreadcrumbLight } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "Contact NeoFidu | English-Speaking Fiduciary in Switzerland" },
  description:
    "Contact NeoFidu, your online fiduciary in Switzerland. Tax returns, accounting, company formation. We speak English!",
  keywords: [
    "contact fiduciary Switzerland",
    "contact NeoFidu",
    "English tax advisor Switzerland",
    "contact accountant Switzerland",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en/contact",
    languages: {
      "fr-CH": "https://neofidu.ch/contact",
      "en-CH": "https://neofidu.ch/en/contact",
      "x-default": "https://neofidu.ch/contact",
    },
  },
  openGraph: {
    title: "Contact NeoFidu | English-Speaking Fiduciary in Switzerland",
    description: "Contact our team. We speak English!",
    type: "website",
    url: "https://neofidu.ch/en/contact",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function ContactEnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <BreadcrumbLight items={[{ label: "Contact" }]} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
