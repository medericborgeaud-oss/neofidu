"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Globe,
  Clock,
  Shield,
  FileText,
  Users,
  ArrowRight,
  Languages,
  HelpCircle,
  Calculator,
  Building,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function ExpatsPage() {
  const { setLocale } = useLanguage();

  // Force English on expats page
  useEffect(() => {
    setLocale("en");
  }, [setLocale]);
  const benefits = [
    {
      icon: Languages,
      title: "We Speak English",
      description: "Full service in English. No need to struggle with German or French forms.",
    },
    {
      icon: Clock,
      title: "Fast & Simple",
      description: "Submit your documents online. We handle everything within 10 business days.",
    },
    {
      icon: Shield,
      title: "Expert Guidance",
      description: "We know expat tax situations: permits, quellensteuer, international income.",
    },
    {
      icon: Calculator,
      title: "From CHF 50",
      description: "Transparent pricing. No hidden fees. Know the cost before you start.",
    },
  ];

  const situations = [
    {
      icon: Briefcase,
      title: "New to Switzerland",
      description: "First time filing Swiss taxes? We guide you through the entire process step by step.",
      tags: ["First tax return", "B permit", "Relocation"],
    },
    {
      icon: Building,
      title: "International Employee",
      description: "Working for a multinational? We handle complex situations with stock options, bonuses, and international income.",
      tags: ["Stock options", "RSUs", "Bonus taxation"],
    },
    {
      icon: Globe,
      title: "Cross-Border Worker",
      description: "Living in France/Germany but working in Switzerland? We manage frontalier tax situations.",
      tags: ["Frontalier", "G permit", "Cross-border"],
    },
    {
      icon: Users,
      title: "Family with Children",
      description: "Married with kids? We maximize your deductions: childcare, pillar 3a, and more.",
      tags: ["Family deductions", "Childcare", "Pillar 3a"],
    },
  ];

  const faqs = [
    {
      question: "Do I need to file a tax return with a B permit?",
      answer: "It depends on your income. If you earn over CHF 120,000/year or have additional income (property, investments), you must file. Below this threshold, you're taxed at source (quellensteuer) but can still file to claim deductions.",
    },
    {
      question: "What is quellensteuer (withholding tax)?",
      answer: "Quellensteuer is tax deducted directly from your salary by your employer. It's an approximation. By filing a tax return, you can often get a refund if you have deductions (pillar 3a, commuting costs, etc.).",
    },
    {
      question: "Can I get a refund on my quellensteuer?",
      answer: "Yes! Many expats overpay through quellensteuer. Common deductions include: Pillar 3a contributions (up to CHF 7,258), commuting costs, professional expenses, and childcare costs.",
    },
    {
      question: "What documents do I need?",
      answer: "Salary certificate (Lohnausweis), bank statements, pillar 3a certificate, rental contract, and any other income documents. We provide a clear checklist when you start.",
    },
    {
      question: "Do you handle US expat taxes?",
      answer: "We handle your Swiss tax return. For US tax obligations (FBAR, FATCA), we can recommend specialized US tax advisors. We ensure your Swiss return is compliant with US reporting requirements.",
    },
  ];

  const permitTypes = [
    { code: "B", name: "B Permit", description: "Residence permit for employed persons" },
    { code: "C", name: "C Permit", description: "Settlement permit (permanent residence)" },
    { code: "L", name: "L Permit", description: "Short-term residence permit" },
    { code: "G", name: "G Permit", description: "Cross-border commuter permit" },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 via-white to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary px-4 py-2 text-sm">
              <Globe className="w-4 h-4 mr-2 inline" />
              English-Speaking Tax Service
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Swiss Tax Returns{" "}
              <span className="text-gradient">Made Easy for Expats</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              New to Switzerland? Confused by the tax system? We help foreigners and expats
              file their Swiss tax returns in English. From CHF 50.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="rounded-full text-lg px-8">
                <Link href="/demande">
                  Start Your Tax Return
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8">
                <Link href="/simulateur/impots">
                  Free Tax Calculator
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>100% Online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>English Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>6 Romandy Cantons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>From CHF 50 <span className="text-xs text-primary">(VAT incl.)</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Expats Choose NeoFidu
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We understand the challenges of filing taxes in a new country. That's why we've built a service specifically for expats.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            We Help All Permit Holders
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Whether you have a B, C, L, or G permit, we know the specific tax rules that apply to your situation.
          </p>

          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {permitTypes.map((permit) => (
              <Card key={permit.code} className="text-center p-6 hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {permit.code}
                </div>
                <h3 className="font-bold mb-1">{permit.name}</h3>
                <p className="text-sm text-muted-foreground">{permit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Situations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Your Situation, Our Expertise
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Every expat situation is unique. We have experience with all of them.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {situations.map((situation) => (
              <Card key={situation.title} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <situation.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{situation.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{situation.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {situation.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Common Questions from Expats
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            New to Swiss taxes? Here are answers to the most common questions.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/faq">
                View All FAQs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to File Your Swiss Tax Return?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of expats who trust NeoFidu for their Swiss taxes.
            Start in 5 minutes, get your return in 10 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="rounded-full text-lg px-8">
              <Link href="/demande">
                Start Now - From CHF 50 (VAT incl.)
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" className="rounded-full text-lg px-8 bg-white/20 border-2 border-white text-white hover:bg-white hover:text-primary">
              <Link href="/#contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
