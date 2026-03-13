"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ExpatBanner() {
  const { setLocale, isEnglish } = useLanguage();

  // Don't show if already in English
  if (isEnglish) return null;

  const handleClick = () => {
    setLocale("en");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group cursor-pointer"
    >
      <Globe className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
      <span>We speak English</span>
    </button>
  );
}
