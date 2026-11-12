"use client";

import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ShieldCheck, Lock, CreditCard, Server, Mail, Loader2, CheckCircle2 } from "lucide-react";

// FR base paths that have a dedicated /en twin route.
const EN_TWIN_EXACT_FOOTER = new Set<string>([
  "/demande",
  "/changer-de-fiduciaire",
  "/suivi",
  "/mentions-legales",
  "/conditions-generales",
  "/politique-confidentialite",
  "/expats",
  "/simulateur/impots",
  "/simulateur/carte-impots",
  "/simulateur/salaire-net",
  "/simulateur/3eme-pilier",
  "/simulateur/valeur-locative",
  "/simulateur/gain-immobilier",
  "/simulateur/baisse-loyer",
  "/simulateur/retraite",
  "/guide/deductions-fiscales",
  "/guide/vaudtax",
  "/guide/getax",
  "/guide/vstax",
  "/guide/fritax",
  "/guide/juratax",
  "/contact",
  "/independants",
  "/tarifs",
  "/entreprises",
  "/creation-entreprise",
  "/associations-fondations",
  "/blog",
  "/faq",
  "/suisses-de-letranger",
  "/observatoire",
  "/cantons",
  "/communes",
  "/barometre-fiscal",
  "/barometre-fiscal/entreprises",
  "/connecteur-ia",
]);

function enHrefFooter(href: string): string {
  if (href === "/") return "/en";
  if (href.startsWith("/#")) return "/en" + href.slice(1);
  if (href === "/suisses-etranger") return "/en/expats";
  if (href.startsWith("/conditions-generales#")) return "/en" + href;
  if (EN_TWIN_EXACT_FOOTER.has(href)) return "/en" + href;
  if (href.startsWith("/blog/") || href.startsWith("/communes/") || href.startsWith("/cantons/") || href.startsWith("/guide/vaudtax/") || href.startsWith("/guide/getax/") || href.startsWith("/guide/vstax/") || href.startsWith("/guide/fritax/") || href.startsWith("/guide/juratax/")) return "/en" + href;
  return href;
}

export function Footer() {
  const { t, isEnglish } = useLanguage();
  const L = (href: string) => (isEnglish ? enHrefFooter(href) : href);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Footer kept short for clients (~20 links). Data pages (observatoire, communes,
  // baromètres, connecteur IA, dette...) are reachable via /ressources and the sitemap.
  const footerLinks = {
    services: [
      { label: isEnglish ? "Tax declaration" : "Déclaration d'impôts", href: "/demande" },
      { label: isEnglish ? "Self-employed & Freelances" : "Indépendants", href: "/independants" },
      { label: isEnglish ? "SMEs & companies" : "PME et sociétés", href: "/entreprises" },
      { label: isEnglish ? "Company formation" : "Création d'entreprise", href: "/creation-entreprise" },
      { label: isEnglish ? "Switch fiduciary" : "Changer de fiduciaire", href: "/changer-de-fiduciaire" },
      { label: isEnglish ? "Associations & Foundations" : "Associations et fondations", href: "/associations-fondations" },
      { label: isEnglish ? "Expats in Switzerland" : "Expatriés en Suisse", href: "/expats" },
      { label: isEnglish ? "Swiss citizens abroad" : "Suisses de l'étranger", href: "/suisses-etranger" },
    ],
    resources: [
      { label: isEnglish ? "Free simulators" : "Simulateurs gratuits", href: "/simulateur" },
      { label: isEnglish ? "Tax return guides" : "Guides de déclaration", href: "/ressources#guides" },
      { label: isEnglish ? "Fiscal news" : "Blog fiscal", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: isEnglish ? "All resources" : "Toutes les ressources", href: "/ressources" },
    ],
    neofidu: [
      { label: isEnglish ? "Pricing" : "Tarifs", href: "/tarifs" },
      { label: isEnglish ? "About" : "À propos", href: "/#about" },
      { label: "Contact", href: "/contact" },
      { label: isEnglish ? "Client area" : "Espace client", href: "/suivi" },
    ],
    cantons: [
      { label: "Vaud", href: "/cantons/vaud" },
      { label: isEnglish ? "Geneva" : "Genève", href: "/cantons/geneve" },
      { label: "Valais", href: "/cantons/valais" },
      { label: "Fribourg", href: "/cantons/fribourg" },
      { label: "Neuchâtel", href: "/cantons/neuchatel" },
      { label: "Jura", href: "/cantons/jura" },
    ],
  };

  const columns = [
    { title: isEnglish ? "Services" : "Services", links: footerLinks.services },
    { title: isEnglish ? "Resources" : "Ressources", links: footerLinks.resources },
    { title: "NeoFidu", links: footerLinks.neofidu },
    { title: isEnglish ? "Cantons" : "Cantons", links: footerLinks.cantons },
  ];

  const description = isEnglish
    ? "Fully digital fiduciary serving French-speaking Switzerland. Tax and accounting support for households, freelancers and professional structures. We speak English!"
    : "Fiduciaire entièrement dématérialisée au service de la Romandie. Accompagnement fiscal et comptable pour les ménages, les indépendants et les structures professionnelles.";

  const securityBadges = [
    {
      icon: ShieldCheck,
      label: isEnglish ? "SSL Secured" : "SSL Sécurisé",
      description: isEnglish ? "256-bit encryption" : "Chiffrement 256-bit",
    },
    {
      icon: Lock,
      label: isEnglish ? "Data Protected" : "Données Protégées",
      description: isEnglish ? "GDPR compliant" : "Conforme RGPD",
    },
    {
      icon: CreditCard,
      label: isEnglish ? "Secure Payments" : "Paiements Sécurisés",
      description: "Stripe PCI DSS",
    },
    {
      icon: Server,
      label: isEnglish ? "GDPR Compliant" : "Conforme LPD",
      description: isEnglish ? "Privacy respected" : "Vie privée respectée",
    },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: "" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-lg mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={L(link.href)}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand + Newsletter Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col justify-center">
            <Link href={L("/")} className="flex items-center space-x-1 mb-4">
              <span className="text-2xl font-bold text-primary">neo</span>
              <span className="text-2xl font-bold text-white">fidu</span>
              <span className="text-sm text-slate-400">.ch</span>
            </Link>
            <p className="text-slate-400 mb-4">
              {description}
            </p>
            <LanguageSwitcher variant="footer" />
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-primary" />
              <p className="font-semibold text-lg">Newsletter</p>
            </div>
            <p className="text-slate-400 mb-4">
              {isEnglish
                ? "Tax tips & savings advice delivered to your inbox"
                : "Astuces fiscales & conseils économies directement dans votre boîte mail"}
            </p>
            {isSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400 py-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{isEnglish ? "Subscribed!" : "Inscrit !"}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder={isEnglish ? "Your email" : "Votre email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 h-11 flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 h-11 px-5"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      isEnglish ? "Subscribe" : "S'inscrire"
                    )}
                  </Button>
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <p className="text-slate-500 text-xs">
                  {isEnglish ? "No spam, unsubscribe anytime" : "Pas de spam, désinscription à tout moment"}
                </p>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-10 bg-slate-800" />

        {/* Security Badges */}
        <div className="mb-8">
          <p className="text-slate-500 text-sm mb-4 text-center">
            {isEnglish ? "Your data is protected" : "Vos données sont protégées"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{badge.label}</p>
                  <p className="text-xs text-slate-500">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External links */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-3">
            {isEnglish ? "Useful resources" : "Ressources utiles"}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://www.estv.admin.ch/fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              {isEnglish ? "Federal Tax Administration" : "Administration fédérale des contributions"}
            </a>
            <a
              href="https://www.ahv-iv.ch/fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              AVS/AI
            </a>
            <a
              href="https://www.bfs.admin.ch/bfs/fr/home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              {isEnglish ? "Federal Statistics Office" : "Office fédéral de la statistique"}
            </a>
          </div>
        </div>

        <Separator className="my-6 bg-slate-800" />

        {/* Legal Notice / Mentions légales */}
        <div className="mb-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <p className="font-semibold text-white mb-4">
            {isEnglish ? "Legal Notice" : "Mentions légales"}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-white font-medium mb-2">NeoFidu</p>
              <p className="text-slate-400">
                {isEnglish ? "Sole proprietorship" : "Entreprise individuelle"}
              </p>
              <p className="text-slate-400 mt-2">
                1854 Leysin<br />
                {isEnglish ? "Canton of Vaud, Switzerland" : "Canton de Vaud, Suisse"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-2">
                <span className="text-white">{isEnglish ? "Email:" : "Email :"}</span>{" "}
                <a href="mailto:contact@neofidu.ch" className="hover:text-primary transition-colors">
                  contact@neofidu.ch
                </a>
              </p>
              <p className="text-slate-400">
                <span className="text-white">{isEnglish ? "Prices:" : "Prix :"}</span>{" "}
                {isEnglish ? "All prices displayed in CHF (Swiss Francs)" : "Tous les prix sont affichés en CHF (Francs suisses)"}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {/* Payment Methods */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-slate-500 text-sm">
            {isEnglish ? "Accepted payment methods:" : "Moyens de paiement acceptés :"}
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <img src="/payment-logos/visa.svg" alt="Visa" className="h-7" />
            <img src="/payment-logos/mastercard.svg" alt="Mastercard" className="h-7" />
            <img src="/payment-logos/paypal.svg" alt="PayPal" className="h-6" />
            <img src="/payment-logos/klarna.svg" alt="Klarna" className="h-6" />
            <img src="/payment-logos/twint.svg" alt="TWINT" className="h-7" />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} NeoFidu. {isEnglish ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6">
            <Link href={L("/mentions-legales")} className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Legal notice" : "Mentions légales"}
            </Link>
            <Link href={L("/conditions-generales")} className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Terms of service" : "CGU"}
            </Link>
            <Link href={L("/conditions-generales#remboursements")} className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Refund policy" : "Remboursements"}
            </Link>
            <Link href={L("/politique-confidentialite")} className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Privacy policy" : "Vie privée"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
