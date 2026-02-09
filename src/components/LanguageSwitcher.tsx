"use client";

import { useLanguage } from "@/lib/language-context";
import { localeNames, Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "header" | "footer" | "minimal";
  className?: string;
}

export function LanguageSwitcher({ variant = "header", className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "fr" ? "en" : "fr");
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${className}`}
        aria-label={t("language.switchTo")}
      >
        <Globe className="w-4 h-4" />
        <span>{locale.toUpperCase()}</span>
      </button>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Globe className="w-4 h-4 text-slate-400" />
        <div className="flex gap-1">
          {(["fr", "en"] as Locale[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                locale === lang
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {localeNames[lang]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Header variant (default)
  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
        locale === "en"
          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
          : "bg-transparent border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
      } ${className}`}
      aria-label={t("language.switchTo")}
    >
      <Globe className="w-4 h-4" />
      <span>{localeNames[locale === "fr" ? "en" : "fr"]}</span>
    </button>
  );
}

// Banner component to show we speak English
export function LanguageBanner() {
  const { locale, setLocale, t } = useLanguage();

  if (locale === "en") return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 text-center text-sm">
      <span className="mr-2">🌍</span>
      <span className="font-medium">We speak English!</span>
      <span className="mx-2 opacity-60">|</span>
      <button
        onClick={() => setLocale("en")}
        className="underline hover:no-underline font-medium"
      >
        Switch to English
      </button>
    </div>
  );
}
