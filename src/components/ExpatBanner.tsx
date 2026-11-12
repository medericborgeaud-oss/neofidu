"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { usePathname, useRouter } from "next/navigation";
import { isEnglishPath, languageToggleTarget } from "@/lib/en-routes";

export function ExpatBanner() {
  const { setLocale, isEnglish } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const isOnEnPage = isEnglishPath(pathname);

  // Va toujours quelque part : la page jumelle si elle existe, sinon l'accueil de l'autre langue.
  const handleClick = () => {
    setLocale(isOnEnPage ? "fr" : "en");
    router.push(languageToggleTarget(pathname));
  };

  // Show "Français" if on EN page or if context is English
  const showFrench = isOnEnPage || isEnglish;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group cursor-pointer"
    >
      <Globe className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
      <span>{showFrench ? "Français" : "English"}</span>
    </button>
  );
}
