"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, FileText, Calculator, Rocket, Home, Users, ClipboardList, TrendingUp, MapPin, Search, Globe, Building2, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [particuliersOpen, setParticuliersOpen] = useState(false);
  const [entreprisesOpen, setEntreprisesOpen] = useState(false);
  const [outilsOpen, setOutilsOpen] = useState(false);
  const { t, locale, isEnglish } = useLanguage();
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Searchable pages
  const searchPages = [
    { href: "/simulateur/impots", label: isEnglish ? "Tax Simulator" : "Simulateur d'impôts", category: isEnglish ? "Tools" : "Outils" },
    { href: "/simulateur/salaire-net", label: isEnglish ? "Net Salary Calculator" : "Calculateur salaire net", category: isEnglish ? "Tools" : "Outils" },
    { href: "/simulateur/3eme-pilier", label: isEnglish ? "3rd Pillar Simulator" : "Simulateur 3ème pilier", category: isEnglish ? "Tools" : "Outils" },
    { href: "/simulateur/valeur-locative", label: isEnglish ? "Rental Value Calculator" : "Calculateur valeur locative", category: isEnglish ? "Tools" : "Outils" },
    { href: "/simulateur/carte-impots", label: isEnglish ? "Swiss Tax Map" : "Carte fiscale suisse", category: isEnglish ? "Tools" : "Outils" },
    { href: "/simulateur/gain-immobilier", label: isEnglish ? "Capital Gains Tax" : "Impôt gain immobilier", category: isEnglish ? "Tools" : "Outils" },
    { href: "/simulateur/simulateur-retraite", label: isEnglish ? "Retirement Simulator" : "Simulateur de retraite", category: isEnglish ? "Tools" : "Outils" },
    { href: "/simulateur/baisse-loyer", label: isEnglish ? "Rent Reduction Calculator" : "Calculateur baisse de loyer", category: isEnglish ? "Tools" : "Outils" },
    { href: "/demande", label: isEnglish ? "Tax Return" : "Déclaration d'impôts", category: "Services" },
    { href: "/independants", label: isEnglish ? "Accounting" : "Comptabilité", category: "Services" },
    { href: "/creation-entreprise", label: isEnglish ? "Company Creation" : "Création d'entreprise", category: "Services" },
    { href: "/entreprises", label: isEnglish ? "SMEs & Corporations" : "PME & Sociétés", category: "Services" },
              { href: "/second-avis", label: isEnglish ? "Free second opinion" : "Second avis gratuit", category: "Services" },
    { href: "/associations-fondations", label: isEnglish ? "Associations & Foundations" : "Associations & Fondations", category: "Services" },
    { href: "/expats", label: "Expats", category: "Services" },
    { href: "/tarifs", label: isEnglish ? "Pricing" : "Tarifs", category: "Informations" },
    { href: "/blog", label: "Blog", category: "Informations" },
    { href: "/contact", label: "Contact", category: "Informations" },
    { href: "/observatoire", label: isEnglish ? "Company Observatory" : "Observatoire des entreprises", category: "Informations" },
    { href: "/communes", label: isEnglish ? "Communes" : "Communes romandes", category: "Informations" },
    { href: "/guide/deductions-fiscales", label: isEnglish ? "Tax Deductions Guide" : "Guide déductions fiscales", category: "Informations" },
    { href: isEnglish ? "/swiss-debt" : "/dette-suisse", label: isEnglish ? "Swiss Debt Clock" : "Compteur dette suisse", category: "Informations" },
    { href: "/suivi", label: isEnglish ? "File Tracking" : "Suivi de dossier", category: "Informations" },
    { href: "/#about", label: isEnglish ? "About" : "À propos", category: "Informations" },
  ];

  const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredPages = searchQuery.length > 0
    ? searchPages.filter(p => normalize(p.label).includes(normalize(searchQuery)))
    : searchPages;

  const handleSearchSelect = useCallback((href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  }, [router]);

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Menu items — segmented by client profile
  const particuliersItems = [
    {
      href: "/demande",
      label: isEnglish ? "Tax Return" : "Déclaration d'impôts",
      icon: FileText,
      description: isEnglish ? "Personal tax filing" : "Remplir votre déclaration",
    },
    {
      href: "/expats",
      label: isEnglish ? "Expats in Switzerland" : "Expatriés en Suisse",
      icon: Globe,
      description: isEnglish ? "Source tax & TOU" : "Impôt à la source & TOU",
    },
    {
      href: "/guide/deductions-fiscales",
      label: isEnglish ? "Tax Deductions Guide" : "Guide déductions fiscales",
      icon: BookOpen,
      description: isEnglish ? "All deductions explained" : "Toutes les déductions expliquées",
    },
    {
      href: "/suisses-etranger",
      label: isEnglish ? "Swiss Abroad" : "Suisses de l'\u00e9tranger",
      icon: Users,
      description: isEnglish ? "Tax filing from abroad" : "D\u00e9claration depuis l'\u00e9tranger",
    },
  ];

  const entreprisesItems = [
    {
      href: "/independants",
      label: isEnglish ? "Freelancers" : "Indépendants & Freelances",
      icon: Calculator,
      description: isEnglish ? "Accounting & tax returns" : "Comptabilité & déclarations",
    },
    {
      href: "/creation-entreprise",
      label: isEnglish ? "Company Creation" : "Création d'entreprise",
      icon: Rocket,
      description: isEnglish ? "LLC, AG, Sole prop." : "Sàrl, SA, RI",
    },
    {
      href: "/entreprises",
      label: isEnglish ? "SMEs & Corporations" : "PME & Sociétés",
      icon: Building2,
      description: isEnglish ? "Accounting, payroll & tax" : "Comptabilité, salaires & fiscalité",
    },
              { href: "/second-avis", label: isEnglish ? "Free second opinion" : "Second avis gratuit", icon: Search, description: isEnglish ? "Free invoice comparison" : "Comparatif de facture gratuit" },
    {
      href: "/observatoire",
      label: isEnglish ? "Company Observatory" : "Observatoire des entreprises",
      icon: TrendingUp,
      description: isEnglish ? "Market data & trends" : "Données et tendances du marché",
    },
    {
      href: "/associations-fondations",
      label: isEnglish ? "Associations & Foundations" : "Associations & Fondations",
      icon: Users,
      description: isEnglish ? "Accounting & tax for non-profits" : "Comptabilité & fiscalité associative",
    },
  ];

  const outilsItems = [
    {
      href: "/simulateur/impots",
      label: isEnglish ? "Tax Simulator" : "Simulateur d'impôts",
      icon: Calculator,
      description: isEnglish ? "Estimate your taxes" : "Estimez vos impôts",
    },
    {
      href: "/simulateur/salaire-net",
      label: isEnglish ? "Net Salary Calculator" : "Calculateur salaire net",
      icon: Calculator,
      description: isEnglish ? "Gross to net" : "Du brut au net",
    },
    {
      href: "/simulateur/3eme-pilier",
      label: isEnglish ? "3rd Pillar Simulator" : "Simulateur 3ème pilier",
      icon: TrendingUp,
      description: isEnglish ? "Retirement savings" : "Épargne retraite",
    },
    {
      href: "/simulateur/carte-impots",
      label: isEnglish ? "Swiss Tax Map" : "Carte fiscale suisse",
      icon: MapPin,
      description: isEnglish ? "Compare by municipality" : "Comparez par commune",
    },
    {
      href: "/simulateur/baisse-loyer",
      label: isEnglish ? "Rent Reduction" : "Baisse de loyer",
      icon: Home,
      description: isEnglish ? "Calculate your reduction" : "Calculez votre baisse",
    },
    {
      href: "/simulateur/gain-immobilier",
      label: isEnglish ? "Capital Gains Tax" : "Impôt gain immobilier",
      icon: Home,
      description: isEnglish ? "Property capital gains" : "Plus-value immobilière",
    },
    {
      href: "/communes",
      label: isEnglish ? "Commune Directory" : "Répertoire des communes",
      icon: MapPin,
      description: isEnglish ? "All Swiss Romand communes" : "Toutes les communes romandes",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
        style={{ top: "0px" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <span className="text-2xl md:text-4xl font-bold text-primary">
                  neo
                </span>
                <span className="text-2xl md:text-4xl font-bold text-foreground">
                  fidu
                </span>
                <span className="text-sm font-medium ml-1 text-muted-foreground">
                  .ch
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Particuliers Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10">
                    {isEnglish ? "Individuals" : "Particuliers"}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-2">
                  {particuliersItems.map((item) => (
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
                      href="/demande"
                      className="flex items-center gap-2 p-3 text-sm text-primary hover:text-primary"
                    >
                      {isEnglish ? "Start my tax return →" : "Déposer ma déclaration →"}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Entreprises Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10">
                    {isEnglish ? "Businesses" : "Entreprises"}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-2">
                  {entreprisesItems.map((item) => (
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
                      href="/independants"
                      className="flex items-center gap-2 p-3 text-sm text-primary hover:text-primary"
                    >
                      {isEnglish ? "All business services →" : "Tous les services entreprise →"}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Outils gratuits Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10">
                    {isEnglish ? "Free Tools" : "Outils gratuits"}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72 p-2">
                  {outilsItems.map((item) => (
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
                      href="/simulateur"
                      className="flex items-center gap-2 p-3 text-sm text-primary hover:text-primary"
                    >
                      {isEnglish ? "View all tools →" : "Voir tous les outils →"}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Direct links */}
              <Link
                href="/blog"
                className="px-3 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10"
              >
                Blog
              </Link>
              <Link
                href="/tarifs"
                className="px-3 py-2 rounded-full text-sm font-medium transition-all text-foreground hover:text-primary hover:bg-primary/10"
              >
                {t("header.pricing")}
              </Link>

              {/* Suivi des demandes — small icon */}
              <Link
                href="/suivi"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-all"
                title={isEnglish ? "Track your request" : "Suivi des demandes"}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                {isEnglish ? "Tracking" : "Suivi"}
              </Link>

              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label={isEnglish ? "Search" : "Rechercher"}
              >
                <Search className="w-5 h-5" />
              </button>

              <Button
                asChild
                className="ml-2 rounded-full px-6 text-sm"
              >
                <Link href="/demande">{t("header.cta")}</Link>
              </Button>
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center gap-2 lg:hidden">
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
                  <div className="flex flex-col space-y-4 mt-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-primary">neo</span>
                      <span className="text-2xl font-bold text-foreground">fidu</span>
                      <span className="text-sm text-muted-foreground">.ch</span>
                    </Link>

                    {/* Mobile Particuliers Section */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setParticuliersOpen(!particuliersOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium text-foreground py-2"
                      >
                        {isEnglish ? "Individuals" : "Particuliers"}
                        <ChevronDown className={`w-5 h-5 transition-transform ${particuliersOpen ? "rotate-180" : ""}`} />
                      </button>
                      {particuliersOpen && (
                        <div className="mt-2 space-y-1 pl-2">
                          {particuliersItems.map((item) => (
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

                    {/* Mobile Entreprises Section */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setEntreprisesOpen(!entreprisesOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium text-foreground py-2"
                      >
                        {isEnglish ? "Businesses" : "Entreprises"}
                        <ChevronDown className={`w-5 h-5 transition-transform ${entreprisesOpen ? "rotate-180" : ""}`} />
                      </button>
                      {entreprisesOpen && (
                        <div className="mt-2 space-y-1 pl-2">
                          {entreprisesItems.map((item) => (
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

                    {/* Mobile Outils gratuits Section */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setOutilsOpen(!outilsOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium text-foreground py-2"
                      >
                        {isEnglish ? "Free Tools" : "Outils gratuits"}
                        <ChevronDown className={`w-5 h-5 transition-transform ${outilsOpen ? "rotate-180" : ""}`} />
                      </button>
                      {outilsOpen && (
                        <div className="mt-2 space-y-1 pl-2">
                          {outilsItems.map((item) => (
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
                          <Link
                            href="/simulateur"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 py-3 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                          >
                            {isEnglish ? "View all tools →" : "Voir tous les outils →"}
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Direct links */}
                    <Link
                      href="/blog"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/tarifs"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                    >
                      {t("header.pricing")}
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                    >
                      Contact
                    </Link>

                    {/* Espace client section */}
                    <div className="pt-3 mt-1 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <ClipboardList className="w-3.5 h-3.5" />
                        {isEnglish ? "Client area" : "Espace client"}
                      </p>
                      <Link
                        href="/suivi"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-primary hover:text-primary/80 transition-colors py-2 border-b border-border flex items-center gap-2"
                      >
                        <ClipboardList className="w-4 h-4" />
                        {isEnglish ? "Track my request" : "Suivi des demandes"}
                      </Link>
                    </div>

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

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div
            className="max-w-xl mx-auto mt-24 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={isEnglish ? "Search pages, tools, services..." : "Rechercher pages, outils, services..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredPages.length > 0) {
                    handleSearchSelect(filteredPages[0].href);
                  }
                }}
                className="flex-1 text-lg outline-none bg-transparent placeholder:text-muted-foreground/60"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono text-muted-foreground bg-muted rounded border">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filteredPages.length === 0 ? (
                <p className="px-6 py-8 text-center text-muted-foreground">
                  {isEnglish ? "No results found" : "Aucun résultat"}
                </p>
              ) : (
                Object.entries(
                  filteredPages.reduce((acc, page) => {
                    if (!acc[page.category]) acc[page.category] = [];
                    acc[page.category].push(page);
                    return acc;
                  }, {} as Record<string, typeof searchPages>)
                ).map(([category, pages]) => (
                  <div key={category}>
                    <p className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {category}
                    </p>
                    {pages.map((page) => (
                      <button
                        key={page.href}
                        onClick={() => handleSearchSelect(page.href)}
                        className="w-full text-left px-6 py-3 hover:bg-primary/5 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-foreground group-hover:text-primary transition-colors">{page.label}</span>
                        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          {isEnglish ? "Enter" : "Entrer"} ↵
                        </span>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className="px-6 py-3 border-t bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
              <span>{isEnglish ? "Navigate with keyboard" : "Naviguer au clavier"}</span>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-white rounded border text-[10px]">↵</kbd>
                <span>{isEnglish ? "to select" : "pour ouvrir"}</span>
                <kbd className="px-1.5 py-0.5 bg-white rounded border text-[10px] ml-2">ESC</kbd>
                <span>{isEnglish ? "to close" : "pour fermer"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
