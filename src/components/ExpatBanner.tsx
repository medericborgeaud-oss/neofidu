"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { usePathname, useRouter } from "next/navigation";

// Base FR paths that have a dedicated server-rendered English route under /en.
const EN_TWIN_EXACT = new Set<string>([
  "/",
  "/independants",
  "/simulateur/impots",
  "/simulateur/salaire-net",
  "/simulateur/3eme-pilier",
  "/simulateur/valeur-locative",
  "/simulateur/gain-immobilier",
  "/tarifs",
  "/entreprises",
  "/creation-entreprise",
  "/associations-fondations",
  "/blog",
  "/faq",
  "/suisses-de-letranger",
  "/cantons",
]);

// Returns the /en equivalent of a French path, or null when no English route exists.
function toEnPath(p: string | null): string | null {
  if (!p) return null;
  if (p === "/en" || p.startsWith("/en/")) return null;
  if (EN_TWIN_EXACT.has(p)) return p === "/" ? "/en" : "/en" + p;
  if (p.startsWith("/blog/") || p.startsWith("/communes/") || p.startsWith("/cantons/")) return "/en" + p;
  return null;
}

export function ExpatBanner() {
  const { setLocale, isEnglish } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Dedicated page pairs with different slugs (not /en prefixed).
  const debtPages: Record<string, string> = {
    "/dette-suisse": "/en/swiss-debt",
    "/en/swiss-debt": "/dette-suisse",
  };

  const isOnEnPage = pathname === "/en" || (pathname?.startsWith("/en/") ?? false);

  const handleClick = () => {
    // Dedicated page pairs (dette-suisse / swiss-debt)
    const target = debtPages[pathname ?? ""];
    if (target) {
      setLocale(pathname === "/dette-suisse" ? "en" : "fr");
      router.push(target);
      return;
    }

    // Currently English (on an /en URL or English context) -> switch to French
    if (isOnEnPage || isEnglish) {
      setLocale("fr");
      if (isOnEnPage) {
        router.push(pathname === "/en" ? "/" : (pathname ?? "").replace(/^\/en/, ""));
      }
      return;
    }

    // French page -> switch to English: navigate to the /en version if it exists
    setLocale("en");
    const enPath = toEnPath(pathname);
    if (enPath) router.push(enPath);
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
