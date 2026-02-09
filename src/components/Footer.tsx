"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Footer() {
  const { t, isEnglish } = useLanguage();

  const footerLinks = {
    services: [
      { label: isEnglish ? "Tax declaration" : "Déclaration d'impôt", href: "#services" },
      { label: isEnglish ? "Accounting" : "Comptabilité", href: "#services" },
      { label: isEnglish ? "Property management" : "Gérance immobilière", href: "#services" },
      { label: isEnglish ? "Tax audit" : "Contrôle fiscal", href: "#services" },
    ],
    cantons: [
      { label: "Vaud", href: "#cantons" },
      { label: "Valais", href: "#cantons" },
      { label: isEnglish ? "Geneva" : "Genève", href: "#cantons" },
      { label: isEnglish ? "Neuchâtel" : "Neuchâtel", href: "#cantons" },
      { label: "Jura", href: "#cantons" },
      { label: isEnglish ? "Fribourg" : "Fribourg", href: "#cantons" },
    ],
    company: [
      { label: isEnglish ? "About us" : "À propos", href: "#about" },
      { label: isEnglish ? "Pricing" : "Tarifs", href: "#tarifs" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  };

  const description = isEnglish
    ? "Fully digital fiduciary serving French-speaking Switzerland. Tax and accounting support for households, freelancers and professional structures. We speak English!"
    : "Fiduciaire entièrement dématérialisée au service de la Romandie. Accompagnement fiscal et comptable pour les ménages, les indépendants et les structures professionnelles.";

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
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
            <h3 className="font-semibold text-lg mb-4">
              {isEnglish ? "Services" : "Services"}
            </h3>
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

          {/* Cantons */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {isEnglish ? "Cantons" : "Cantons"}
            </h3>
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

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {isEnglish ? "Company" : "Entreprise"}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} NeoFidu. {isEnglish ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/conditions-generales" className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Terms of service" : "Conditions générales"}
            </Link>
            <Link href="/politique-confidentialite" className="text-slate-500 hover:text-slate-300 text-sm">
              {isEnglish ? "Privacy" : "Confidentialité"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
