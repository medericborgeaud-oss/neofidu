import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

// Lazy load components below the fold for faster initial page load
const ProfileCards = dynamic(() => import("@/components/ProfileCards").then((mod) => ({ default: mod.ProfileCards })), { ssr: true });
const Simulators = dynamic(() => import("@/components/Simulators").then((mod) => ({ default: mod.Simulators })), { ssr: true });
const TrustSection = dynamic(() => import("@/components/TrustSection").then((mod) => ({ default: mod.TrustSection })), { ssr: true });

export const metadata: Metadata = {
  title: { absolute: "Online Fiduciary in Switzerland: Tax & Accounting | NeoFidu" },
  description:
    "Online fiduciary in French-speaking Switzerland. Tax returns from CHF 89, accounting and tax for businesses, the self-employed and expats. Service available in English.",
  keywords: [
    "online fiduciary Switzerland",
    "tax return Switzerland",
    "Swiss accounting",
    "expat tax Switzerland",
    "self-employed Switzerland",
    "fiduciary English Switzerland",
    "NeoFidu",
  ],
  authors: [{ name: "NeoFidu" }],
  alternates: {
    canonical: "https://neofidu.ch/en",
    languages: {
      "fr-CH": "https://neofidu.ch",
      "en-CH": "https://neofidu.ch/en",
      "x-default": "https://neofidu.ch",
    },
  },
  openGraph: {
    title: "Online Fiduciary in Switzerland: Tax & Accounting | NeoFidu",
    description:
      "Online fiduciary in French-speaking Switzerland. Tax returns from CHF 89, accounting and tax for businesses, the self-employed and expats.",
    type: "website",
    url: "https://neofidu.ch/en",
    siteName: "NeoFidu",
    locale: "en_CH",
  },
};

export default function HomeEn() {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <section className="bg-gradient-to-b from-white to-emerald-50/40">
          <ProfileCards />
        </section>
        <section className="bg-white">
          <Simulators />
        </section>
        <section className="bg-gradient-to-b from-emerald-50/30 to-white">
          <TrustSection />
        </section>
        <Footer />
      </main>
    </>
  );
}
