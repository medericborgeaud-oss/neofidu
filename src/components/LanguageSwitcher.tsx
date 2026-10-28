"use client";

import { useLanguage } from "@/lib/language-context";
import { localeNames, Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { isEnglishPath, languageToggleTarget } from "@/lib/en-routes";

interface LanguageSwitcherProps {
  variant?: "header" | "footer" | "minimal";
  className?: string;
}

export function LanguageSwitcher({ variant = "header", className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Switch language: navigate to the /en (or French) URL when one exists,
  // otherwise fall back to a client-side language switch.
  const switchTo = (lang: Locale) => {
    setLocale(lang);
    const onEn = isEnglishPath(pathname);
    if ((lang === "en" && !onEn) || (lang === "fr" && onEn)) {
      router.push(languageToggleTarget(pathname));
    }
  };

  const toggleLanguage = () => {
    switchTo(locale === "fr" ? "en" : "fr");
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
              onClick={() => switchTo(lang)}
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
  const pathname = usePathname();
  const router = useRouter();

  if (locale === "en") return null;

  const goEnglish = () => {
    setLocale("en");
    router.push(languageToggleTarget(pathname));
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 text-center text-sm">
      <span className="mr-2">🌍</span>
      <span className="font-medium">We speak English!</span>
      <span className="mx-2 opacity-60">|</span>
      <button
        onClick={goEnglish}
        className="underline hover:no-underline font-medium"
      >
        Switch to English
      </button>
    </div>
  );
}
