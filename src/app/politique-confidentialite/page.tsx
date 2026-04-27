"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Lock, Shield, Eye, Database, UserCheck, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const sectionsFr = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: Shield,
    content: `
      <p>NeoFidu (ci-après "NeoFidu", "nous" ou "notre") s'engage à protéger la vie privée de ses utilisateurs et clients. La présente Politique de Confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles.</p>
      <p>Cette politique s'applique à toutes les données collectées via notre site web neofidu.ch et dans le cadre de nos prestations de services fiduciaires.</p>
      <p>En utilisant nos services, vous acceptez les pratiques décrites dans cette politique.</p>
    `,
  },
  {
    id: "responsable",
    title: "2. Responsable du traitement",
    icon: UserCheck,
    content: `
      <p>Le responsable du traitement des données personnelles est :</p>
      <p>
        <strong>NeoFidu – Entreprise individuelle</strong><br />
        Tél : +41 78 691 39 12<br />
        Email : contact@neofidu.ch
      </p>
      <p>Pour toute question relative à la protection de vos données, vous pouvez nous contacter à l'adresse ci-dessus.</p>
    `,
  },
  {
    id: "donnees-collectees",
    title: "3. Données collectées",
    icon: Database,
    content: `
      <h4>3.1 Données d'identification</h4>
      <ul>
        <li>Nom et prénom</li>
        <li>Adresse postale</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone</li>
        <li>Date de naissance</li>
        <li>État civil</li>
      </ul>

      <h4>3.2 Données fiscales et financières</h4>
      <ul>
        <li>Revenus et patrimoine</li>
        <li>Relevés bancaires</li>
        <li>Certificats de salaire</li>
        <li>Documents fiscaux</li>
        <li>Informations sur les biens immobiliers</li>
      </ul>

      <h4>3.3 Données de connexion</h4>
      <ul>
        <li>Adresse IP</li>
        <li>Type de navigateur</li>
        <li>Pages visitées</li>
        <li>Date et heure de connexion</li>
      </ul>

      <h4>3.4 Données de paiement</h4>
      <p>Les données de paiement (carte bancaire) sont traitées de manière sécurisée par notre prestataire de paiement certifié (Stripe) et ne sont pas stockées sur nos serveurs.</p>
    `,
  },
  {
    id: "finalites",
    title: "4. Finalités du traitement",
    icon: Eye,
    content: `
      <p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
      <ul>
        <li><strong>Exécution des prestations</strong> : établissement de déclarations fiscales, tenue de comptabilité, gérance immobilière</li>
        <li><strong>Gestion de la relation client</strong> : communication, suivi des demandes, facturation</li>
        <li><strong>Obligations légales</strong> : respect des exigences fiscales et comptables suisses</li>
        <li><strong>Amélioration des services</strong> : analyse statistique anonymisée pour optimiser nos prestations</li>
        <li><strong>Sécurité</strong> : prévention des fraudes et protection de nos systèmes</li>
      </ul>
      <p>Nous ne vendons jamais vos données à des tiers et ne les utilisons pas à des fins publicitaires sans votre consentement explicite.</p>
    `,
  },
  {
    id: "base-legale",
    title: "5. Base légale du traitement",
    icon: Shield,
    content: `
      <p>Le traitement de vos données repose sur les bases légales suivantes :</p>
      <ul>
        <li><strong>Exécution du contrat</strong> : le traitement est nécessaire à l'exécution des prestations que vous avez commandées</li>
        <li><strong>Obligation légale</strong> : certains traitements sont imposés par la loi (conservation des documents comptables, déclarations fiscales)</li>
        <li><strong>Intérêt légitime</strong> : amélioration de nos services, sécurité informatique</li>
        <li><strong>Consentement</strong> : pour les communications marketing, lorsque vous y avez expressément consenti</li>
      </ul>
    `,
  },
  {
    id: "conservation",
    title: "6. Durée de conservation",
    icon: Database,
    content: `
      <p>Vos données sont conservées pendant les durées suivantes :</p>
      <ul>
        <li><strong>Documents fiscaux et comptables</strong> : 10 ans conformément au droit suisse</li>
        <li><strong>Données de facturation</strong> : 10 ans</li>
        <li><strong>Données de connexion</strong> : 12 mois</li>
        <li><strong>Correspondance client</strong> : 5 ans après la fin de la relation contractuelle</li>
      </ul>
      <p>À l'expiration de ces délais, vos données sont supprimées ou anonymisées de manière irréversible.</p>
    `,
  },
  {
    id: "destinataires",
    title: "7. Destinataires des données",
    icon: Globe,
    content: `
      <p>Vos données peuvent être communiquées aux destinataires suivants :</p>
      <ul>
        <li><strong>Autorités fiscales</strong> : dans le cadre de l'établissement de vos déclarations</li>
        <li><strong>Prestataires techniques</strong> : hébergement (Vercel), base de données (Supabase), stockage de documents (Supabase Storage (Dublin, UE)), paiements (Stripe), envoi d'emails (Resend) – tous soumis à des obligations de confidentialité</li>
        <li><strong>Professionnels du droit</strong> : en cas de litige, avec votre accord préalable</li>
      </ul>
      <p>Certains de nos prestataires sont basés aux États-Unis. Ces transferts sont encadrés par des Clauses Contractuelles Types (CCT) approuvées par la Commission européenne, garantissant un niveau de protection adéquat conformément à la LPD et au RGPD.</p>
    `,
  },
  {
    id: "securite",
    title: "8. Sécurité des données",
    icon: Lock,
    content: `
      <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
      <ul>
        <li>Chiffrement des données en transit (SSL/TLS) et au repos (AES-256)</li>
        <li>Authentification sécurisée et gestion des accès</li>
        <li>Sauvegardes régulières et plan de reprise d'activité</li>
        <li>Formation du personnel à la protection des données</li>
        <li>Audits de sécurité réguliers</li>
      </ul>
      <p>Notre infrastructure est hébergée via des prestataires conformes au RGPD et à la LPD, tous situés dans l'Union européenne : Vercel (application web, Francfort), Supabase (base de données et stockage de documents, Dublin), Stripe (paiements, Dublin, certifié PCI DSS Level 1). Les emails transactionnels sont envoyés via Resend (États-Unis), seul prestataire hors UE, encadré par des Clauses Contractuelles Types. Les données standards (chiffrement AES-256 au repos, SSL/TLS en transit) protègent l'ensemble de vos informations.`,
  },
  {
    id: "droits",
    title: "9. Vos droits",
    icon: UserCheck,
    content: `
      <p>Conformément à la législation applicable, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
        <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
        <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données (sous réserve des obligations légales de conservation)</li>
        <li><strong>Droit à la limitation</strong> : restreindre le traitement de vos données</li>
        <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
        <li><strong>Droit d'opposition</strong> : vous opposer au traitement pour des raisons légitimes</li>
        <li><strong>Droit de retirer votre consentement</strong> : à tout moment pour les traitements basés sur le consentement</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à contact@neofidu.ch. Nous répondrons dans un délai d'un mois.</p>
    `,
  },
  {
    id: "cookies",
    title: "10. Cookies",
    icon: Globe,
    content: `
      <p>Notre site utilise des cookies pour améliorer votre expérience de navigation :</p>
      <ul>
        <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (session, sécurité)</li>
        <li><strong>Cookies analytiques</strong> : pour comprendre comment vous utilisez notre site (anonymisés)</li>
      </ul>
      <p>Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est déposé.</p>
    `,
  },
  {
    id: "modifications",
    title: "11. Modifications de la politique",
    icon: Shield,
    content: `
      <p>Nous pouvons modifier cette Politique de Confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication sur notre site.</p>
      <p>En cas de modification substantielle, nous vous en informerons par email ou par un avis visible sur notre site.</p>
      <p><em>Dernière mise à jour : Février 2026</em></p>
    `,
  },
];

const sectionsEn = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: Shield,
    content: `
      <p>NeoFidu (hereinafter "NeoFidu", "we" or "our") is committed to protecting the privacy of its users and clients. This Privacy Policy explains how we collect, use, store and protect your personal data.</p>
      <p>This policy applies to all data collected through our neofidu.ch website and as part of our fiduciary services.</p>
      <p>By using our services, you accept the practices described in this policy.</p>
    `,
  },
  {
    id: "responsable",
    title: "2. Data Controller",
    icon: UserCheck,
    content: `
      <p>The data controller for personal data is:</p>
      <p>
        <strong>NeoFidu – Sole Proprietorship</strong><br />
        Tel: +41 78 691 39 12<br />
        Email: contact@neofidu.ch
      </p>
      <p>For any questions regarding the protection of your data, you can contact us at the above address.</p>
    `,
  },
  {
    id: "donnees-collectees",
    title: "3. Data Collected",
    icon: Database,
    content: `
      <h4>3.1 Identification Data</h4>
      <ul>
        <li>First and last name</li>
        <li>Postal address</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Date of birth</li>
        <li>Marital status</li>
      </ul>

      <h4>3.2 Tax and Financial Data</h4>
      <ul>
        <li>Income and assets</li>
        <li>Bank statements</li>
        <li>Salary certificates</li>
        <li>Tax documents</li>
        <li>Real estate information</li>
      </ul>

      <h4>3.3 Connection Data</h4>
      <ul>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Pages visited</li>
        <li>Date and time of connection</li>
      </ul>

      <h4>3.4 Payment Data</h4>
      <p>Payment data (credit card) is processed securely by our certified payment provider (Stripe) and is not stored on our servers.</p>
    `,
  },
  {
    id: "finalites",
    title: "4. Processing Purposes",
    icon: Eye,
    content: `
      <p>Your personal data is collected and processed for the following purposes:</p>
      <ul>
        <li><strong>Service execution</strong>: preparation of tax returns, accounting, property management</li>
        <li><strong>Customer relationship management</strong>: communication, request follow-up, billing</li>
        <li><strong>Legal obligations</strong>: compliance with Swiss tax and accounting requirements</li>
        <li><strong>Service improvement</strong>: anonymized statistical analysis to optimize our services</li>
        <li><strong>Security</strong>: fraud prevention and system protection</li>
      </ul>
      <p>We never sell your data to third parties and do not use it for advertising purposes without your explicit consent.</p>
    `,
  },
  {
    id: "base-legale",
    title: "5. Legal Basis for Processing",
    icon: Shield,
    content: `
      <p>The processing of your data is based on the following legal grounds:</p>
      <ul>
        <li><strong>Contract execution</strong>: processing is necessary for the execution of services you have ordered</li>
        <li><strong>Legal obligation</strong>: certain processing is required by law (retention of accounting documents, tax returns)</li>
        <li><strong>Legitimate interest</strong>: improvement of our services, IT security</li>
        <li><strong>Consent</strong>: for marketing communications, when you have expressly consented</li>
      </ul>
    `,
  },
  {
    id: "conservation",
    title: "6. Retention Period",
    icon: Database,
    content: `
      <p>Your data is retained for the following periods:</p>
      <ul>
        <li><strong>Tax and accounting documents</strong>: 10 years in accordance with Swiss law</li>
        <li><strong>Billing data</strong>: 10 years</li>
        <li><strong>Connection data</strong>: 12 months</li>
        <li><strong>Client correspondence</strong>: 5 years after the end of the contractual relationship</li>
      </ul>
      <p>Upon expiration of these periods, your data is deleted or irreversibly anonymized.</p>
    `,
  },
  {
    id: "destinataires",
    title: "7. Data Recipients",
    icon: Globe,
    content: `
      <p>Your data may be shared with the following recipients:</p>
      <ul>
        <li><strong>Tax authorities</strong>: as part of preparing your tax returns</li>
        <li><strong>Technical providers</strong> (all subject to confidentiality obligations):<ul><li>Web application hosting: <strong>Vercel</strong> (Frankfurt, Germany, EU)</li><li>Database and document storage: <strong>Supabase</strong> (Dublin, Ireland, EU)</li><li>Payments: <strong>Stripe</strong> (Dublin, Ireland, EU, PCI DSS Level 1 certified)</li><li>Transactional emails: <strong>Resend</strong> (USA — contact data only: name and email)</li></ul></li>
        <li><strong>Legal professionals</strong>: in case of dispute, with your prior consent</li>
      </ul>
      <p>Only our transactional email provider (Resend) is based in the United States. This transfer is governed by Standard Contractual Clauses (SCC) approved by the European Commission. No client tax documents transit through the United States: your documents are stored exclusively in the European Union (Dublin, Ireland).`,
  },
  {
    id: "securite",
    title: "8. Data Security",
    icon: Lock,
    content: `
      <p>We implement appropriate technical and organizational measures to protect your data:</p>
      <ul>
        <li>Data encryption in transit (SSL/TLS) and at rest (AES-256)</li>
        <li>Secure authentication and access management</li>
        <li>Regular backups and business continuity plan</li>
        <li>Staff training on data protection</li>
        <li>Regular security audits</li>
      </ul>
      <p>Our infrastructure is hosted through GDPR and DPA compliant providers, all located in the European Union: Vercel (web application, Frankfurt), Supabase (database and document storage, Dublin), Stripe (payments, Dublin, PCI DSS Level 1 certified). Transactional emails are sent via Resend (USA), the only non-EU provider, governed by Standard Contractual Clauses. Industry-standard security (AES-256 encryption at rest, SSL/TLS in transit) protects all your data.`,
  },
  {
    id: "droits",
    title: "9. Your Rights",
    icon: UserCheck,
    content: `
      <p>In accordance with applicable legislation, you have the following rights:</p>
      <ul>
        <li><strong>Right of access</strong>: obtain a copy of your personal data</li>
        <li><strong>Right to rectification</strong>: correct inaccurate or incomplete data</li>
        <li><strong>Right to erasure</strong>: request deletion of your data (subject to legal retention obligations)</li>
        <li><strong>Right to restriction</strong>: restrict the processing of your data</li>
        <li><strong>Right to portability</strong>: receive your data in a structured format</li>
        <li><strong>Right to object</strong>: object to processing for legitimate reasons</li>
        <li><strong>Right to withdraw consent</strong>: at any time for consent-based processing</li>
      </ul>
      <p>To exercise these rights, contact us at contact@neofidu.ch. We will respond within one month.</p>
    `,
  },
  {
    id: "cookies",
    title: "10. Cookies",
    icon: Globe,
    content: `
      <p>Our website uses cookies to improve your browsing experience:</p>
      <ul>
        <li><strong>Essential cookies</strong>: necessary for site operation (session, security)</li>
        <li><strong>Analytics cookies</strong>: to understand how you use our site (anonymized)</li>
      </ul>
      <p>You can configure your browser to refuse cookies or to be alerted when a cookie is placed.</p>
    `,
  },
  {
    id: "modifications",
    title: "11. Policy Modifications",
    icon: Shield,
    content: `
      <p>We may modify this Privacy Policy at any time. Modifications take effect upon publication on our website.</p>
      <p>In case of substantial modification, we will inform you by email or through a visible notice on our site.</p>
      <p><em>Last updated: February 2026</em></p>
    `,
  },
];

export default function PolitiqueConfidentialitePage() {
  const { isEnglish } = useLanguage();
  const sections = isEnglish ? sectionsEn : sectionsFr;

  const t = {
    backToHome: isEnglish ? "Back to home" : "Retour à l'accueil",
    title1: isEnglish ? "Privacy" : "Politique de",
    title2: isEnglish ? "Policy" : "Confidentialité",
    subtitle: isEnglish
      ? "Learn how NeoFidu protects your personal data."
      : "Découvrez comment NeoFidu protège vos données personnelles.",
    tableOfContents: isEnglish ? "Table of Contents" : "Table des matières",
    questionsTitle: isEnglish ? "Questions about your data?" : "Questions sur vos données ?",
    questionsText: isEnglish
      ? "You can exercise your rights or ask us questions at any time."
      : "Vous pouvez exercer vos droits ou nous poser vos questions à tout moment.",
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
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.title1} <span className="text-gradient">{t.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Table of contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Card className="p-6">
              <h2 className="font-semibold mb-4">{t.tableOfContents}</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">{section.title}</h2>
                  </div>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground
                      prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-6 prose-headings:mb-3
                      prose-p:mb-4 prose-ul:mb-4 prose-li:mb-1
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-teal-50">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.questionsTitle}</h3>
              <p className="text-muted-foreground mb-6">
                {t.questionsText}
              </p>
              <a
                href="mailto:contact@neofidu.ch"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                contact@neofidu.ch
              </a>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
