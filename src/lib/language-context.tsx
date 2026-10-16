"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Locale, defaultLocale, translations } from "./i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// The display language is determined solely by the URL: French routes render in
// French, routes under /en render in English. A saved preference no longer leaks
// English onto a French URL (or the reverse). Switching language is handled by
// navigation in LanguageSwitcher, which moves to the matching /en (or FR) URL.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || (pathname?.startsWith("/en/") ?? false);
  const locale: Locale = isEnglish ? "en" : defaultLocale;

  // Kept for API compatibility. Language follows the URL, so this is a no-op;
  // LanguageSwitcher performs the actual switch by navigating to the other URL.
  const setLocale = (_newLocale: Locale) => {};

  const t = (path: string): string => {
    const keys = path.split(".");
    let result: unknown = translations[locale];

    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }

    return typeof result === "string" ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isEnglish }}>
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
