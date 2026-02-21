"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";

type ConsentType = "all" | "essential" | null;

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  timestamp?: number;
}

interface SavedCookiePreferences extends CookiePreferences {
  timestamp: number;
}

const CONSENT_KEY = "neofidu_cookie_consent";
const CONSENT_EXPIRY_DAYS = 365;

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as SavedCookiePreferences;
        // Check if consent is still valid (not expired)
        const expiryTime = parsed.timestamp + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        if (Date.now() < expiryTime) {
          // Consent is valid, load analytics if accepted
          if (parsed.analytics) {
            enableAnalytics();
          }
          return;
        }
      } catch {
        // Invalid saved consent, show banner
      }
    }
    // Show banner after a short delay for better UX
    const timer = setTimeout(() => setShowBanner(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const enableAnalytics = () => {
    // Enable Google Analytics by setting a flag
    if (typeof window !== "undefined") {
      (window as Window & { gaConsentGranted?: boolean }).gaConsentGranted = true;
      // If gtag is already loaded, update consent
      if ((window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag!("consent", "update", {
          analytics_storage: "granted",
        });
      }
    }
  };

  const saveConsent = (prefs: CookiePreferences) => {
    const consent = {
      ...prefs,
      timestamp: Date.now(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

    if (prefs.analytics) {
      enableAnalytics();
    }

    // Dispatch event to notify Google Analytics
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookieConsentChanged"));
    }

    setShowBanner(false);
  };

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
  };

  const acceptEssential = () => {
    saveConsent({ analytics: false, marketing: false });
  };

  const savePreferences = () => {
    saveConsent({ ...preferences, timestamp: Date.now() });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Main banner */}
          <div className="p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nous respectons votre vie privée
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic de notre site.
                  Vous pouvez choisir les cookies que vous acceptez.{" "}
                  <Link href="/politique-confidentialite" className="text-primary hover:underline">
                    En savoir plus
                  </Link>
                </p>

                {/* Detailed options */}
                {showDetails && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Cookies essentiels</p>
                        <p className="text-xs text-gray-500">Nécessaires au fonctionnement du site</p>
                      </div>
                      <div className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium text-gray-600">
                        Toujours actifs
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Cookies analytiques</p>
                        <p className="text-xs text-gray-500">Google Analytics - Mesure d'audience anonyme</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Cookies marketing</p>
                        <p className="text-xs text-gray-500">Publicités personnalisées (non utilisés)</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={acceptAll}
                    className="rounded-full px-6"
                  >
                    Tout accepter
                  </Button>
                  <Button
                    onClick={acceptEssential}
                    variant="outline"
                    className="rounded-full px-6"
                  >
                    Essentiels uniquement
                  </Button>
                  {!showDetails ? (
                    <Button
                      onClick={() => setShowDetails(true)}
                      variant="ghost"
                      className="rounded-full px-6"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Personnaliser
                    </Button>
                  ) : (
                    <Button
                      onClick={savePreferences}
                      variant="ghost"
                      className="rounded-full px-6"
                    >
                      Enregistrer mes choix
                    </Button>
                  )}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={acceptEssential}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to check if analytics consent was given
export function useAnalyticsConsent(): boolean {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as SavedCookiePreferences;
        setHasConsent(parsed.analytics);
      } catch {
        setHasConsent(false);
      }
    }
  }, []);

  return hasConsent;
}
