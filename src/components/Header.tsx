"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Banner component moved here to control positioning
function LanguageBannerInternal() {
  const { locale, setLocale } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  // Don't show banner if already in English or dismissed
  if (locale === "en" || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 text-center text-sm">
      <span className="mr-2">🌍</span>
      <span className="font-medium">We speak English!</span>
      <span className="mx-2 opacity-60">|</span>
      <button
        onClick={() => setLocale("en")}
        className="underline hover:no-underline font-medium"
      >
        Switch to English
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { t, locale } = useLanguage();

  const navItems = [
    { href: "#services", label: t("header.services") },
    { href: "#tarifs", label: t("header.pricing") },
    { href: "/blog", label: t("header.blog") },
    { href: "/suivi", label: t("header.tracking") },
    { href: "#contact", label: t("header.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if banner should show (only for French users who haven't dismissed it)
  useEffect(() => {
    setShowBanner(locale === "fr");
  }, [locale]);

  // Calculate header top position based on banner visibility
  const headerTop = showBanner ? "36px" : "0px";

  return (
    <>
      {/* Language Banner - shows "We speak English" for French users */}
      <LanguageBannerInternal />

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        style={{ top: showBanner ? "36px" : "0px" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <span
                  className={`text-2xl md:text-3xl font-bold transition-colors ${
                    isScrolled ? "text-primary" : "text-white"
                  }`}
                >
                  neo
                </span>
                <span
                  className={`text-2xl md:text-3xl font-bold transition-colors ${
                    isScrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  fidu
                </span>
                <span
                  className={`text-sm font-medium ml-1 transition-colors ${
                    isScrolled ? "text-muted-foreground" : "text-white/80"
                  }`}
                >
                  .ch
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-white/10 ${
                    isScrolled
                      ? "text-foreground hover:text-primary hover:bg-primary/10"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Language Switcher */}
              <LanguageSwitcher
                variant="header"
                className={isScrolled ? "!text-foreground !border-border hover:!bg-primary/10" : ""}
              />

              <Button
                asChild
                className={`ml-2 rounded-full px-6 ${
                  isScrolled
                    ? ""
                    : "bg-white text-primary hover:bg-white/90"
                }`}
              >
                <Link href="/demande">{t("header.cta")}</Link>
              </Button>
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher
                variant="minimal"
                className={isScrolled ? "text-foreground" : "text-white"}
              />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={isScrolled ? "" : "text-white hover:bg-white/10"}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex flex-col space-y-6 mt-8">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-primary">neo</span>
                      <span className="text-2xl font-bold text-foreground">fidu</span>
                      <span className="text-sm text-muted-foreground">.ch</span>
                    </Link>
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Button
                      asChild
                      className="w-full rounded-full mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/demande">{t("header.cta")}</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
