"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { usePathname, useRouter } from "next/navigation";

export function ExpatBanner() {
  const { setLocale, isEnglish } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const debtPages: Record<string, string> = {
    "/dette-suisse": "/swiss-debt",
    "/swiss-debt": "/dette-suisse",
  };

  // Detect if current URL is an EN page
  const isOnEnPage = pathname.startsWith("/en/");

  // Detect if current FR page has a dedicated EN version
  const hasEnVersion = /^\/(observatoire|communes)\/[^/]+/.test(pathname);

  const handleClick = () => {
    // Dedicated page pairs (dette-suisse / swiss-debt)
    const target = debtPages[pathname];
    if (target) {
      router.push(target);
      return;
    }

    // EN page → navigate to FR version (remove /en prefix)
    if (isOnEnPage) {
      setLocale("fr");
      router.push(pathname.replace(/^\/en/, ""));
      return;
    }

    // FR page with dedicated EN version → navigate to EN version
    if (hasEnVersion && !isEnglish) {
      setLocale("en");
      router.push("/en" + pathname);
      return;
    }

    // Other pages: toggle locale context for Header/Footer only
    setLocale(isEnglish ? "fr" : "en");
  };

  // Show "Passer en Français" if on EN page or if context is English
  const showFrench = isOnEnPage || isEnglish;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group cursor-pointer"
    >
      <Globe className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
      <span>{showFrench ? "Passer en Français" : "We speak English"}</span>
    </button>
  );
}
