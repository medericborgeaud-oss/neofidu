"use client";

import Link from "next/link";
import { Home, FileText, Search, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  const { isEnglish } = useLanguage();

  const popularPages = isEnglish
    ? [
        { label: "Our services", href: "/services" },
        { label: "Pricing", href: "/tarifs" },
        { label: "Tax blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Track my request", href: "/suivi" },
        { label: "Contact", href: "/contact" },
      ]
    : [
        { label: "Nos services", href: "/services" },
        { label: "Nos tarifs", href: "/tarifs" },
        { label: "Blog fiscal", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Suivi de demande", href: "/suivi" },
        { label: "Contact", href: "/contact" },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <span className="text-[10rem] md:text-[14rem] font-extrabold text-primary/[0.07] leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 md:w-24 md:h-24 text-primary/30" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {isEnglish ? "Page not found" : "Page non trouvée"}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            {isEnglish
              ? "Sorry, the page you are looking for does not exist or has been moved. Don't worry, we can help you find what you need."
              : "Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Pas d'inquiétude, nous pouvons vous aider à trouver ce que vous cherchez."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              {isEnglish ? "Back to home" : "Retour à l'accueil"}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {isEnglish ? "Submit a request" : "Déposer une demande"}
            </Link>
          </div>

          {/* Popular Pages */}
          <div className="border-t border-border pt-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {isEnglish ? "Popular pages" : "Pages populaires"}
            </p>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
              {popularPages.map((page, i) => (
                <span key={page.href} className="flex items-center">
                  <Link
                    href={page.href}
                    className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
                  >
                    {page.label}
                  </Link>
                  {i < popularPages.length - 1 && (
                    <span className="text-muted-foreground/40 mx-2">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <p className="mt-8 text-sm text-muted-foreground">
            {isEnglish ? "Need help? Contact us at " : "Besoin d'aide ? Contactez-nous à "}
            <a
              href="mailto:contact@neofidu.ch"
              className="text-primary hover:underline"
            >
              contact@neofidu.ch
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
