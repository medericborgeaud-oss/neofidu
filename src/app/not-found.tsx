import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page non trouvée | NeoFidu",
  description: "La page que vous recherchez n'existe pas ou a été déplacée. Découvrez nos services de déclaration d'impôts et comptabilité en Suisse romande.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page non trouvée
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          Pas d'inquiétude, nous pouvons vous aider à trouver ce que vous cherchez.
        </p>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Retour à l'accueil
          </Link>
          <Link
            href="/demande"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Déposer une demande
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-border pt-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
            Pages populaires
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
              Nos services
            </Link>
            <span className="text-border">|</span>
            <Link href="/#tarifs" className="text-muted-foreground hover:text-primary transition-colors">
              Nos tarifs
            </Link>
            <span className="text-border">|</span>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
              Blog fiscal
            </Link>
            <span className="text-border">|</span>
            <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
            <span className="text-border">|</span>
            <Link href="/suivi" className="text-muted-foreground hover:text-primary transition-colors">
              Suivi de demande
            </Link>
            <span className="text-border">|</span>
            <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Besoin d'aide ? Contactez-nous à{" "}
            <a href="mailto:contact@neofidu.ch" className="text-primary hover:underline">
              contact@neofidu.ch
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
