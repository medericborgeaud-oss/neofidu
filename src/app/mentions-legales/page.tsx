"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Building, Mail, Phone, MapPin, CreditCard, Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function MentionsLegalesPage() {
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
              Retour à l'accueil
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
              Mentions <span className="text-gradient">Légales</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Informations légales conformément à la législation suisse
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
                  <h2 className="text-xl md:text-2xl font-bold">Identification de l'entreprise</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-foreground">Dénomination sociale</p>
                        <p>NeoFidu</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Forme juridique</p>
                        <p>Entreprise individuelle (Einzelunternehmen)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Propriétaire / Responsable</p>
                        <p className="text-primary font-medium">Médéric Borgeaud</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground">Adresse complète</p>
                          <p>Crettaz 1</p>
                          <p>1854 Leysin</p>
                          <p>Canton de Vaud</p>
                          <p>Suisse</p>
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
                  <h2 className="text-xl md:text-2xl font-bold">Coordonnées</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
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
                      <p className="font-semibold text-foreground">Téléphone</p>
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
                  <h2 className="text-xl md:text-2xl font-bold">Tarification et paiements</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Devise</p>
                    <p>Tous les prix affichés sur ce site sont exprimés en <strong className="text-foreground">CHF (Francs suisses)</strong>, TVA incluse le cas échéant.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">Modes de paiement acceptés</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Cartes bancaires (Visa, Mastercard)</li>
                      <li>TWINT</li>
                      <li>Virement bancaire (sur demande)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">Zone de service</p>
                    <p>NeoFidu propose ses services de fiduciaire en ligne à l'ensemble des cantons de Suisse romande (Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura).</p>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">Nature des services</p>
                    <p>NeoFidu est une fiduciaire digitale proposant des services dématérialisés (déclarations d'impôts, comptabilité, conseil fiscal). Aucune marchandise physique n'est vendue ou livrée.</p>
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
                  <h2 className="text-xl md:text-2xl font-bold">Documents juridiques</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/conditions-generales"
                    className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Conditions Générales (CGU)
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Termes et conditions d'utilisation de nos services
                    </p>
                  </Link>

                  <Link
                    href="/politique-confidentialite"
                    className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Politique de confidentialité
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Protection et traitement de vos données personnelles
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
                  <h2 className="text-xl md:text-2xl font-bold">Hébergement et sécurité</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Hébergeur</p>
                    <p>Vercel Inc.<br />
                    340 S Lemon Ave #4133<br />
                    Walnut, CA 91789<br />
                    États-Unis</p>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">Sécurité des paiements</p>
                    <p>Les paiements sont sécurisés par Stripe, plateforme certifiée PCI DSS Level 1.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">Protection des données</p>
                    <p>Les données sont protégées conformément à la Loi fédérale sur la protection des données (LPD) et au RGPD.</p>
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
              Dernière mise à jour : Février 2026
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
