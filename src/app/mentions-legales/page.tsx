"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Building, Mail, Phone, MapPin, CreditCard, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function MentionsLegalesPage() {
  const { isEnglish } = useLanguage();

  const t = {
    backToHome: isEnglish ? "Back to home" : "Retour à l'accueil",
    title1: isEnglish ? "Legal" : "Mentions",
    title2: isEnglish ? "Notice" : "Légales",
    subtitle: isEnglish
      ? "Legal information in accordance with Swiss law"
      : "Informations légales conformément à la législation suisse",

    // Company Information
    companyTitle: isEnglish ? "Company Identification" : "Identification de l'entreprise",
    companyName: isEnglish ? "Company name" : "Dénomination sociale",
    legalForm: isEnglish ? "Legal form" : "Forme juridique",
    legalFormValue: isEnglish ? "Sole proprietorship (Einzelunternehmen)" : "Entreprise individuelle (Einzelunternehmen)",
    owner: isEnglish ? "Owner / Manager" : "Propriétaire / Responsable",
    fullAddress: isEnglish ? "Full address" : "Adresse complète",
    cantonVaud: isEnglish ? "Canton of Vaud" : "Canton de Vaud",
    switzerland: isEnglish ? "Switzerland" : "Suisse",

    // Contact
    contactTitle: isEnglish ? "Contact Information" : "Coordonnées",
    email: "Email",
    phone: isEnglish ? "Phone" : "Téléphone",

    // Pricing
    pricingTitle: isEnglish ? "Pricing and Payments" : "Tarification et paiements",
    currency: isEnglish ? "Currency" : "Devise",
    currencyText: isEnglish
      ? "All prices displayed on this website are expressed in"
      : "Tous les prix affichés sur ce site sont exprimés en",
    currencyValue: isEnglish ? "CHF (Swiss Francs)" : "CHF (Francs suisses)",
    vatIncluded: isEnglish ? ", VAT included where applicable." : ", TVA incluse le cas échéant.",
    paymentMethods: isEnglish ? "Accepted payment methods" : "Modes de paiement acceptés",
    paymentCards: isEnglish ? "Credit cards (Visa, Mastercard), PayPal, Klarna" : "Cartes bancaires (Visa, Mastercard), PayPal, Klarna",
    paymentBank: isEnglish ? "Bank transfer (on request)" : "Virement bancaire (sur demande)",
    serviceArea: isEnglish ? "Service area" : "Zone de service",
    serviceAreaText: isEnglish
      ? "NeoFidu offers its online fiduciary services to all cantons of French-speaking Switzerland (Vaud, Geneva, Valais, Fribourg, Neuchâtel, Jura)."
      : "NeoFidu propose ses services de fiduciaire en ligne à l'ensemble des cantons de Suisse romande (Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura).",
    serviceNature: isEnglish ? "Nature of services" : "Nature des services",
    serviceNatureText: isEnglish
      ? "NeoFidu is a digital fiduciary offering dematerialized services (tax returns, accounting, tax consulting). No physical goods are sold or delivered."
      : "NeoFidu est une fiduciaire digitale proposant des services dématérialisés (déclarations d'impôts, comptabilité, conseil fiscal). Aucune marchandise physique n'est vendue ou livrée.",

    // Legal Documents
    legalDocsTitle: isEnglish ? "Legal Documents" : "Documents juridiques",
    termsTitle: isEnglish ? "Terms and Conditions" : "Conditions Générales (CGU)",
    termsDesc: isEnglish
      ? "Terms and conditions for using our services"
      : "Termes et conditions d'utilisation de nos services",
    privacyTitle: isEnglish ? "Privacy Policy" : "Politique de confidentialité",
    privacyDesc: isEnglish
      ? "Protection and processing of your personal data"
      : "Protection et traitement de vos données personnelles",

    // Hosting
    hostingTitle: isEnglish ? "Hosting and Security" : "Hébergement et sécurité",
    infrastructure: isEnglish ? "Infrastructure and data" : "Infrastructure et données",
    infrastructureText: isEnglish
      ? "Data is hosted through GDPR and Swiss DPA compliant providers, with appropriate contractual guarantees (Standard Contractual Clauses) for international transfers."
      : "Les données sont hébergées via des prestataires conformes au RGPD et à la LPD suisse, avec des garanties contractuelles appropriées (Clauses Contractuelles Types) pour les transferts internationaux.",
    webApp: isEnglish ? "Web application: Vercel (USA/Europe)" : "Application web : Vercel (États-Unis/Europe)",
    database: isEnglish ? "Database: Supabase (Europe)" : "Base de données : Supabase (Europe)",
    documents: isEnglish ? "Documents: Cloudinary (USA, AES-256 encryption)" : "Documents : Cloudinary (États-Unis, chiffrement AES-256)",
    payments: isEnglish ? "Payments: Stripe (PCI DSS Level 1 certified)" : "Paiements : Stripe (certifié PCI DSS Level 1)",
    dataProtection: isEnglish ? "Data Protection" : "Protection des données",
    dataProtectionText: isEnglish
      ? "Data is protected in accordance with the Swiss Federal Data Protection Act (DPA) and GDPR."
      : "Les données sont protégées conformément à la Loi fédérale sur la protection des données (LPD) et au RGPD.",

    lastUpdate: isEnglish ? "Last updated: February 2026" : "Dernière mise à jour : Février 2026",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToHome}
            </Link>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.title1} <span className="text-gradient">{t.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{t.companyTitle}</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-foreground">{t.companyName}</p>
                        <p>NeoFidu</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t.legalForm}</p>
                        <p>{t.legalFormValue}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t.owner}</p>
                        <p className="text-primary font-medium">Mederic Borgeaud</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground">{t.fullAddress}</p>
                          <p>Crettaz 1</p>
                          <p>1854 Leysin</p>
                          <p>{t.cantonVaud}</p>
                          <p>{t.switzerland}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{t.contactTitle}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t.email}</p>
                      <a
                        href="mailto:contact@neofidu.ch"
                        className="text-primary hover:underline"
                      >
                        contact@neofidu.ch
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t.phone}</p>
                      <a
                        href="tel:+41786913912"
                        className="text-primary hover:underline"
                      >
                        +41 78 691 39 12
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Payment & Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{t.pricingTitle}</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">{t.currency}</p>
                    <p>{t.currencyText} <strong className="text-foreground">{t.currencyValue}</strong>{t.vatIncluded}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">{t.paymentMethods}</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>{t.paymentCards}</li>
                      <li>{t.paymentBank}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">{t.serviceArea}</p>
                    <p>{t.serviceAreaText}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">{t.serviceNature}</p>
                    <p>{t.serviceNatureText}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{t.legalDocsTitle}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/conditions-generales"
                    className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t.termsTitle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.termsDesc}
                    </p>
                  </Link>

                  <Link
                    href="/politique-confidentialite"
                    className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t.privacyTitle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.privacyDesc}
                    </p>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Hosting & Technical */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{t.hostingTitle}</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">{t.infrastructure}</p>
                    <p className="mb-3">
                      {t.infrastructureText}
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• {t.webApp}</li>
                      <li>• {t.database}</li>
                      <li>• {t.documents}</li>
                      <li>• {t.payments}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">{t.dataProtection}</p>
                    <p>{t.dataProtectionText}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Last update */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-4xl mx-auto mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              {t.lastUpdate}
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
