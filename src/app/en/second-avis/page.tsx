import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import Link from "next/link";
import {
  FileSearch, Clock, ShieldCheck, CheckCircle2, ArrowRight, Scale, Lock,
} from "lucide-react";

export const metadata = {
  title: { absolute: "Free second opinion on your fiduciary invoice | NeoFidu" },
  description:
    "Are you overpaying your fiduciary? Send us your latest invoice and we will tell you within 48h whether you could save. Free, confidential, no commitment.",
  alternates: {
    canonical: "https://neofidu.ch/en/second-avis",
    languages: {
      "fr-CH": "https://neofidu.ch/second-avis",
      "en-CH": "https://neofidu.ch/en/second-avis",
      "x-default": "https://neofidu.ch/second-avis",
    },
  },
};

const steps = [
  { icon: FileSearch, title: "1. You send", text: "Your latest fiduciary invoice or quote, plus 2-3 details about your company (legal form, employees, VAT)." },
  { icon: Scale, title: "2. We analyse", text: "A qualified specialist breaks down your offer item by item: accounting, VAT, year-end closing, payroll, advice." },
  { icon: Clock, title: "3. You get your comparison", text: "Within 48h: what you pay, what it would cost at NeoFidu, and the items you are overpaying. The decision is yours." },
];

const benefits = [
  "An item-by-item comparison of your current invoice",
  "A costed estimate of your budget at NeoFidu",
  "The items you may be overpaying",
  "An honest opinion: if you are already at the right price, we will tell you",
];

const faq = [
  { q: "Is it really free?", a: "Yes. No fees, no commitment. You receive your comparison and do whatever you like with it." },
  { q: "What if I am already well served by my fiduciary?", a: "We will tell you straight. At least you will have the confirmation that you are paying a fair price." },
  { q: "Are my documents confidential?", a: "Absolutely. Your documents are used only to prepare your comparison, are processed securely and are never shared." },
  { q: "Am I obliged to change fiduciary?", a: "No, never. And if you decide to join us, we handle the entire handover for you, in just a few days." },
];

export default function SecondAvisEnPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BreadcrumbLight items={[{ label: "Businesses", href: "/en/entreprises" }, { label: "Free second opinion" }]} className="mb-8" />

          <section className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Business accounting</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-5">Are you overpaying your <span className="text-gradient">fiduciary</span>?</h1>
            <p className="text-lg text-muted-foreground mb-8">Send us your latest invoice. Within 48h we tell you, in full transparency, whether you could pay less - with no commitment, and no need to switch if you are already at the right price.</p>
            <Link href="/en/demande?type=comptabilite" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-4 font-medium hover:opacity-90 transition">Request a free second opinion <ArrowRight className="w-4 h-4" /></Link>
            <p className="text-xs text-muted-foreground mt-3">Free · Confidential · Reply within 48h · No commitment</p>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <div className="bg-white rounded-2xl border p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">What you get, at no cost</h2>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-4">Why we dare the comparison</h2>
            <p className="text-muted-foreground">Because we publish our prices openly. Fiduciary rates vary threefold for the same services - many companies unknowingly pay for a physical office and unjustified hours. Our 100% digital model often means 20 to 40% savings for the same work. The second opinion simply lets you check it, risk-free.</p>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
              <Lock className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Your data is protected</h3>
                <p className="text-sm text-muted-foreground">Your invoice and information are handled in strict confidence, used only to prepare your comparison, and never passed on to third parties. Secure processing, compliant with the Swiss Data Protection Act (FADP).</p>
              </div>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently asked questions</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border p-5 shadow-sm">
                  <h3 className="font-medium mb-1">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/5 to-teal-50 rounded-2xl p-8">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">In 48h, find out if you are overpaying.</h2>
              <p className="text-muted-foreground mb-6">Attach your latest fiduciary invoice and we take care of the rest.</p>
              <Link href="/en/demande?type=comptabilite" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-4 font-medium hover:opacity-90 transition">Request a free second opinion <ArrowRight className="w-4 h-4" /></Link>
              <p className="text-xs text-muted-foreground mt-3">Free · Confidential · No commitment</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
