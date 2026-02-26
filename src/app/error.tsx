"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Une erreur est survenue
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Nous sommes désolés, quelque chose s'est mal passé.
          Veuillez réessayer ou revenir à la page d'accueil.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réessayer
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-muted-foreground">
          <p>
            Si le problème persiste, contactez-nous à{" "}
            <a href="mailto:contact@neofidu.ch" className="text-primary hover:underline">
              contact@neofidu.ch
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
