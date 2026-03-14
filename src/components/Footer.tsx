"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ShieldCheck, Lock, CreditCard, Server } from "lucide-react";

export function Footer() {
  const { t, isEnglish } = useLanguage();

  const footerLinks = {
    services: [
      { label: isEnglish ? "Tax declaration" : "Déclaration d'impôt", href: "/demande" },
      { label: isEnglish ? "Accounting services" : "Services comptables", href: "/demande" },
      { label: isEnglish ? "Property management" : "Gérance immobilière", href: "/demande" },
      { label: isEnglish ? "Expats in Switzerland" : "Expatriés en Suisse", href: "/expats" },
      { label: isEnglish ? "Swiss citizens abroad" : "Suisses de l'étranger", href: "/suisses-etranger" },
    ],
    tools: [
      { label: isEnglish ? "Net salary calculator" : "Simulateur salaire net", href: "/simulateur/salaire-net" },
      { label: isEnglish ? "Tax calculator" : "Simulateur d'impôts", href: "/simulateur/impots" },
      { label: isEnglish ? "3rd pillar calculator" : "Simulateur 3ème pilier", href: "/simulateur/3eme-pilier" },
      { label: isEnglish ? "Real estate gain tax" : "Gain immobilier", href: "/simulateur/gain-immobilier" },
      { label: isEnglish ? "Property tax simulator" : "Simulateur valeur locative", href: "/simulateur/valeur-locative" },
      { label: isEnglish ? "Swiss tax map" : "Carte des impôts suisses", href: "/simulateur/carte-impots" },
      { label: isEnglish ? "Tax deductions guide" : "Guide des déductions", href: "/guide/deductions-fiscales" },
    ],
    info: [
      { label: isEnglish ? "Our pricing" : "Nos tarifs", href: "/#tarifs" },
      { label: isEnglish ? "About NeoFidu" : "Qui sommes-nous", href: "/#about" },
      { label: isEnglish ? "Fiscal news" : "Actualités fiscales", href: "/blog" },
      { label: isEnglish ? "Help center" : "Centre d'aide", href: "/faq" },
      { label: isEnglish ? "Track request" : "Suivre ma demande", href: "/suivi" },
    ],
    cantons: [
      { label: isEnglish ? "Fiduciary Vaud" : "Fiduciaire Vaud", href: "/cantons/vaud" },
      { label: isEnglish ? "Fiduciary Geneva" : "Fiduciaire Genève", href: "/cantons/geneve" },
      { label: isEnglish ? "Fiduciary Valais" : "Fiduciaire Valais", href: "/cantons/valais" },
      { label: isEnglish ? "Fiduciary Fribourg" : "Fiduciaire Fribourg", href: "/cantons/fribourg" },
      { label: isEnglish ? "Fiduciary Neuchâtel" : "Fiduciaire Neuchâtel", href: "/cantons/neuchatel" },
      { label: isEnglish ? "Fiduciary Jura" : "Fiduciaire Jura", href: "/cantons/jura" },
    ],
  };

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

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-1 mb-4">
              <span className="text-2xl font-bold text-primary">neo</span>
              <span className="text-2xl font-bold text-white">fidu</span>
              <span className="text-sm text-slate-400">.ch</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              {description}
            </p>

            {/* Language switcher in footer */}
            <div className="mb-4">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-lg mb-4">
              {isEnglish ? "Services" : "Nos services"}
            </p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <p className="font-semibold text-lg mb-4">
              {isEnglish ? "Free tools" : "Outils gratuits"}
            </p>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-semibold text-lg mb-4">
              {isEnglish ? "Information" : "Informations"}
            </p>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cantons */}
          <div>
            <p className="font-semibold text-lg mb-4">
              {isEnglish ? "Locations" : "Régions"}
            </p>
            <ul className="space-y-3">
              {footerLinks.cantons.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
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
              href="https://www.estv.admin.ch/estv/fr/accueil.html"
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
              <p className="text-slate-400 mt-1">
                <span className="text-white">{isEnglish ? "Owner:" : "Propriétaire :"}</span>{" "}
                Mederic Borgeaud
              </p>
              <p className="text-slate-400 mt-2">
                Crettaz 1<br />
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
              <p className="text-slate-400 mb-2">
                <span className="text-white">{isEnglish ? "Phone:" : "Téléphone :"}</span>{" "}
                <a href="tel:+41786913912" className="hover:text-primary transition-colors">
                  +41 78 691 39 12
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
        <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-slate-500 text-sm">
            {isEnglish ? "Accepted payment methods:" : "Moyens de paiement acceptés :"}
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Visa / Mastercard */}
            <div className="inline-flex items-center gap-2 bg-slate-700 rounded-full px-3 py-1.5 text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <span className="text-slate-300 text-xs">Visa / Mastercard</span>
            </div>
            {/* PayPal */}
            <div className="inline-flex items-center gap-1.5 bg-[#003087]/20 rounded-full px-3 py-1.5 text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#00457C]" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
              </svg>
              <span className="text-[#003087] font-medium text-xs">PayPal</span>
            </div>
            {/* Klarna */}
            <div className="inline-flex items-center gap-1.5 bg-[#FFB3C7]/40 rounded-full px-3 py-1.5 text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0A0B09]" fill="currentColor">
                <path d="M4.592 2h14.816A2.592 2.592 0 0 1 22 4.592v14.816A2.592 2.592 0 0 1 19.408 22H4.592A2.592 2.592 0 0 1 2 19.408V4.592A2.592 2.592 0 0 1 4.592 2z"/>
              </svg>
              <span className="text-[#0A0B09] font-medium text-xs">Klarna</span>
            </div>
          </div>
        </div>

        <Separator className="my-4 bg-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} NeoFidu. {isEnglish ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6">
            <Link href="/mentions-legales" className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Legal notice" : "Mentions légales"}
            </Link>
            <Link href="/conditions-generales" className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Terms of service" : "CGU"}
            </Link>
            <Link href="/conditions-generales#remboursements" className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Refund policy" : "Remboursements"}
            </Link>
            <Link href="/politique-confidentialite" className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Privacy policy" : "Vie privée"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
