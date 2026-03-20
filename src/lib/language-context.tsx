"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Locale, defaultLocale, translations, locales } from "./i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "neofidu_language";
const EN_SUPPORTED_PAGES = ["/suisses-etranger"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Load saved language preference
  useEffect(() => {
    const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, []);

  // Reset to French when navigating away from English-supported pages
  useEffect(() => {
    if (!mounted) return;
    const isEnPage = EN_SUPPORTED_PAGES.some((p) => pathname.startsWith(p));
    if (!isEnPage && locale === "en") {
      setLocaleState(defaultLocale);
      localStorage.removeItem(STORAGE_KEY);
      document.documentElement.lang = defaultLocale;
    }
  }, [pathname, mounted, locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    // Update html lang attribute
    document.documentElement.lang = newLocale;
  };

  // Translation function
  const t = (path: string): string => {
    const keys = path.split(".");
    let result: unknown = translations[locale];

    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        console.warn(`Translation not found: ${path}`);
        return path;
      }
    }

    return typeof result === "string" ? result : path;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          locale: defaultLocale,
          setLocale: () => {},
          t: (path) => {
            const keys = path.split(".");
            let result: unknown = translations[defaultLocale];
            for (const key of keys) {
              if (result && typeof result === "object" && key in result) {
                result = (result as Record<string, unknown>)[key];
              } else {
                return path;
              }
            }
            return typeof result === "string" ? result : path;
          },
          isEnglish: false
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        isEnglish: locale === "en"
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
