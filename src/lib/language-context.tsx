"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Locale, defaultLocale, translations, locales } from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "neofidu_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isEnPath = pathname === "/en" || (pathname?.startsWith("/en/") ?? false);

  const [locale, setLocaleState] = useState<Locale>(isEnPath ? "en" : defaultLocale);
  const [mounted, setMounted] = useState(false);

  // Load saved language preference. English URLs (/en/...) always render in English.
  useEffect(() => {
    if (isEnPath) {
      setLocaleState("en");
      document.documentElement.lang = "en";
      setMounted(true);
      return;
    }
    const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, [isEnPath]);


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
    const initialLocale: Locale = isEnPath ? "en" : defaultLocale;
    return (
      <LanguageContext.Provider
        value={{
          locale: initialLocale,
          setLocale: () => {},
          t: (path) => {
            const keys = path.split(".");
            let result: unknown = translations[initialLocale];
            for (const key of keys) {
              if (result && typeof result === "object" && key in result) {
                result = (result as Record<string, unknown>)[key];
              } else {
                return path;
              }
            }
            return typeof result === "string" ? result : path;
          },
          isEnglish: isEnPath
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
