"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, FileText, Calculator, Rocket, Home, Users } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Banner component - only shown on homepage
function LanguageBannerInternal({ isHomepage }: { isHomepage: boolean }) {
  const { locale, setLocale } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  // Don't show banner if not on homepage, already in English, or dismissed
  if (!isHomepage || locale === "en" || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 text-center text-sm">
      <span className="mr-2">🇨🇭</span>
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [ressourcesOpen, setRessourcesOpen] = useState(false);
  const { t, locale, isEnglish } = useLanguage();
  const pathname = usePathname();

  // Check if we're on the homepage
  const isHomepage = pathname === "/";

  // Services dropdown items
  const serviceItems = [
    {
      href: "/demande",
      label: isEnglish ? "Tax Return" : "Déclaration d'impôts",
      icon: FileText,
      description: isEnglish ? "For individuals" : "Pour particuliers",
    },
    {
      href: "/independants",
      label: isEnglish ? "Accounting" : "Comptabilité",
      icon: Calculator,
      description: isEnglish ? "Freelancers & SMEs" : "Indépendants & PME",
    },
    {
      href: "/creation-entreprise",
      label: isEnglish ? "Company Creation" : "Création d'entreprise",
      icon: Rocket,
      description: isEnglish ? "LLC, AG, Sole prop." : "Sàrl, SA, RI",
    },
    {
      href: "/gerance-immobiliere",
      label: isEnglish ? "Property Management" : "Gérance immobilière",
      icon: Home,
      description: isEnglish ? "Vaud & Valais" : "Vaud & Valais",
    },
    {
      href: "/expats",
      label: isEnglish ? "Expats" : "Expatriés",
      icon: Users,
      description: isEnglish ? "International clients" : "Clients internationaux",
    },
  ];

  const ressourcesItems = [
    {
      href: "/simulateur/impots",
      label: isEnglish ? "Tax Calculator" : "Simulateur d'impôts",
      icon: Calculator,
      description: isEnglish ? "Estimate your cantonal taxes" : "Estimez vos impôts cantonaux",
    },
    {
      href: "/simulateur/salaire-net",
      label: isEnglish ? "Net Salary" : "Salaire net",
      icon: Calculator,
      description: isEnglish ? "Calculate your net salary" : "Calculez votre salaire net",
    },
    {
      href: "/simulateur/3eme-pilier",
      label: isEnglish ? "3rd Pillar" : "3ème pilier",
      icon: Calculator,
      description: isEnglish ? "Optimize your retirement savings" : "Optimisez votre épargne retraite",
    },
    {
      href: "/simulateur",
      label: isEnglish ? "All Simulators" : "Tous les simulateurs",
      icon: Calculator,
      description: isEnglish ? "See all our free tools" : "Voir tous nos outils gratuits",
    },
    {
      href: "/guide/deductions-fiscales",
      label: isEnglish ? "Tax Deductions" : "Déductions fiscales",
      icon: FileText,
      description: isEnglish ? "Guide to Swiss tax deductions" : "Guide des déductions en Suisse",
    },
  ];

  const navItems = [
    { href: "/tarifs", label: t("header.pricing") },
    
    { href: "/suivi", label: t("header.tracking") },
    { href: "/#contact", label: t("header.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if banner should show (only on homepage for French users)
  useEffect(() => {
    setShowBanner(isHomepage && locale === "fr");
  }, [locale, isHomepage]);

  return (
    <>
      {/* Language Banner - shows "We speak English" for French users on homepage only */}
      <LanguageBannerInternal isHomepage={isHomepage} />

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
        style={{ top: showBanner ? "36px" : "0px" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  neo
                </span>
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  fidu
                </span>
                <span className="text-sm font-medium ml-1 text-muted-foreground">
                  .ch
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10">
                    {t("header.services")}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-2">
                  {serviceItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/#services"
                      className="flex items-center gap-2 p-3 text-sm text-primary hover:text-primary"
                    >
                      {isEnglish ? "View all services →" : "Voir tous les services →"}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10">
                    {isEnglish ? "Resources" : "Ressources"}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-2">
                  {ressourcesItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10"
                >
                  {item.label}
                </Link>
              ))}

              {/* Language Switcher */}
              <LanguageSwitcher
                variant="header"
                className="!text-foreground !border-border hover:!bg-primary/10"
              />

              <Button
                asChild
                className="ml-2 rounded-full px-6"
              >
                <Link href="/demande">{t("header.cta")}</Link>
              </Button>
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher
                variant="minimal"
                className="text-foreground"
              />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:bg-primary/10"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-primary">neo</span>
                      <span className="text-2xl font-bold text-foreground">fidu</span>
                      <span className="text-sm text-muted-foreground">.ch</span>
                    </Link>

                    {/* Mobile Services Section */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium text-foreground py-2"
                      >
                        {t("header.services")}
                        <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      {servicesOpen && (
                        <div className="mt-2 space-y-1 pl-2">
                          {serviceItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-3 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              <div>
                                <p className="font-medium text-foreground">{item.label}</p>
                                <p className="text-xs">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Ressources Section */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setRessourcesOpen(!ressourcesOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium text-foreground py-2"
                      >
                        {isEnglish ? "Resources" : "Ressources"}
                        <ChevronDown className={`w-5 h-5 transition-transform ${ressourcesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {ressourcesOpen && (
                        <div>
                          {ressourcesItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-3 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              <div>
                                <p className="font-medium text-foreground">{item.label}</p>
                                <p className="text-xs">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

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
