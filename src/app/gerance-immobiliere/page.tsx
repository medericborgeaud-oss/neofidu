"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { BreadcrumbLight } from "@/components/Breadcrumb";
import {
  Home,
  Users,
  FileText,
  Wrench,
  CreditCard,
  ClipboardCheck,
  BarChart3,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Building2,
  Key,
  Calculator,
  PiggyBank,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export default function GeranceImmobilierePage() {
  const { isEnglish } = useLanguage();

  const services = [
    {
      icon: Users,
      title: isEnglish ? "Tenant Search" : "Recherche de locataires",
      description: isEnglish
        ? "Publication of ads, organization of visits, verification of solvency and references."
        : "Publication d'annonces, organisation des visites, vérification de la solvabilité et des références.",
    },
    {
      icon: FileText,
      title: isEnglish ? "Lease Management" : "Gestion des baux",
      description: isEnglish
        ? "Drafting of leases, addendums, rent indexation and legal compliance."
        : "Rédaction des baux, avenants, indexation des loyers et conformité légale.",
    },
    {
      icon: ClipboardCheck,
      title: isEnglish ? "Entry/Exit Inventories" : "États des lieux",
      description: isEnglish
        ? "Professional entry and exit inventories with detailed photo reports."
        : "États des lieux d'entrée et de sortie professionnels avec rapports photos détaillés.",
    },
    {
      icon: CreditCard,
      title: isEnglish ? "Rent Collection" : "Encaissement des loyers",
      description: isEnglish
        ? "Monthly collection, tracking of payments, management of late payments and reminders."
        : "Encaissement mensuel, suivi des paiements, gestion des retards et relances.",
    },
    {
      icon: Wrench,
      title: isEnglish ? "Works & Maintenance" : "Travaux & entretien",
      description: isEnglish
        ? "Coordination of craftsmen, quotes, monitoring of work and claims management."
        : "Coordination des artisans, devis, suivi des travaux et gestion des sinistres.",
    },
    {
      icon: Calculator,
      title: isEnglish ? "Expense Statement" : "Décompte de charges",
      description: isEnglish
        ? "Annual expense statement, allocation to tenants and regularization."
        : "Décompte de charges annuel, répartition aux locataires et régularisation.",
    },
    {
      icon: BarChart3,
      title: isEnglish ? "Monthly Reporting" : "Reporting mensuel",
      description: isEnglish
        ? "Detailed monthly statement with all transactions and account balance."
        : "Relevé mensuel détaillé avec toutes les opérations et solde de compte.",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: isEnglish ? "Contact" : "Prise de contact",
      description: isEnglish
        ? "Contact us by phone or email. We will discuss your property and your needs."
        : "Contactez-nous par téléphone ou email. Nous discutons de votre bien et de vos besoins.",
    },
    {
      step: "2",
      title: isEnglish ? "Property Visit" : "Visite du bien",
      description: isEnglish
        ? "We visit your property to assess its condition and estimate the rental value."
        : "Nous visitons votre bien pour évaluer son état et estimer la valeur locative.",
    },
    {
      step: "3",
      title: isEnglish ? "Management Contract" : "Mandat de gérance",
      description: isEnglish
        ? "Signing of the management contract detailing our services and fees."
        : "Signature du mandat de gérance détaillant nos prestations et honoraires.",
    },
    {
      step: "4",
      title: isEnglish ? "Effective Takeover" : "Prise en charge",
      description: isEnglish
        ? "Complete inventory, key handover and start of management."
        : "Inventaire complet, remise des clés et début de la gestion.",
    },
  ];

  const faqs = [
    {
      question: isEnglish
        ? "How much does property management cost?"
        : "Combien coûte la gérance immobilière ?",
      answer: isEnglish
        ? "Our management fees are 5% of gross rents collected, excluding VAT. This rate includes all property management services: tenant search, rent collection, inventories, work management and monthly reporting."
        : "Nos honoraires de gérance sont de 5% des loyers bruts encaissés, hors TVA. Ce tarif inclut l'ensemble des services de gestion locative : recherche de locataires, encaissement des loyers, états des lieux, gestion des travaux et reporting mensuel.",
    },
    {
      question: isEnglish
        ? "In which cantons do you offer property management?"
        : "Dans quels cantons proposez-vous la gérance ?",
      answer: isEnglish
        ? "We currently offer our property management services in the cantons of Vaud and Valais. We cover all municipalities in these two cantons."
        : "Nous proposons actuellement nos services de gérance immobilière dans les cantons de Vaud et du Valais. Nous couvrons toutes les communes de ces deux cantons.",
    },
    {
      question: isEnglish
        ? "What types of properties do you manage?"
        : "Quels types de biens gérez-vous ?",
      answer: isEnglish
        ? "We manage all types of residential properties: apartments, villas, studios, chalets, as well as commercial premises and parking spaces."
        : "Nous gérons tous types de biens résidentiels : appartements, villas, studios, chalets, ainsi que les locaux commerciaux et places de parc.",
    },
    {
      question: isEnglish
        ? "How long does it take to find a tenant?"
        : "Combien de temps pour trouver un locataire ?",
      answer: isEnglish
        ? "On average, we find a tenant within 2 to 4 weeks depending on the property and location. Our rigorous selection process ensures quality tenants."
        : "En moyenne, nous trouvons un locataire dans un délai de 2 à 4 semaines selon le bien et la localisation. Notre processus de sélection rigoureux garantit des locataires de qualité.",
    },
    {
      question: isEnglish
        ? "What happens in case of unpaid rent?"
        : "Que se passe-t-il en cas d'impayé ?",
      answer: isEnglish
        ? "We apply a strict reminder procedure: reminder, formal notice, then legal action if necessary. We keep you informed at every step and assist you throughout the process."
        : "Nous appliquons une procédure de relance stricte : rappel, mise en demeure, puis action juridique si nécessaire. Nous vous tenons informé à chaque étape et vous accompagnons dans toutes les démarches.",
    },
    {
      question: isEnglish
        ? "Can I terminate the management contract?"
        : "Puis-je résilier le mandat de gérance ?",
      answer: isEnglish
        ? "Yes, the contract can be terminated with 3 months notice. We ensure a smooth handover to you or to another manager."
        : "Oui, le mandat est résiliable avec un préavis de 3 mois. Nous assurons une passation en douceur vers vous-même ou vers une autre régie.",
    },
  ];

  const advantages = [
    {
      icon: PiggyBank,
      title: isEnglish ? "Competitive Rate" : "Tarif compétitif",
      description: isEnglish ? "5% of gross rents excl. VAT" : "5% des loyers bruts HT",
    },
    {
      icon: Clock,
      title: isEnglish ? "Time Savings" : "Gain de temps",
      description: isEnglish
        ? "We take care of everything"
        : "Nous nous occupons de tout",
    },
    {
      icon: Shield,
      title: isEnglish ? "Security" : "Sécurité",
      description: isEnglish
        ? "Verified and solvent tenants"
        : "Locataires vérifiés et solvables",
    },
    {
      icon: BarChart3,
      title: isEnglish ? "Transparency" : "Transparence",
      description: isEnglish
        ? "Detailed monthly reporting"
        : "Reporting mensuel détaillé",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BreadcrumbLight
            items={[
              {
                label: isEnglish ? "Property Management" : "Gérance Immobilière",
              },
            ]}
            className="mb-8"
          />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-200">
              <MapPin className="w-4 h-4 mr-1" />
              {isEnglish ? "Vaud & Valais" : "Vaud & Valais"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {isEnglish ? (
                <>
                  Property Management{" "}
                  <span className="text-amber-600">Made Simple</span>
                </>
              ) : (
                <>
                  Gérance Immobilière{" "}
                  <span className="text-amber-600">Simplifiée</span>
                </>
              )}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEnglish
                ? "Complete management of your rental properties in Vaud and Valais. Transparent rates, digital service, peace of mind guaranteed."
                : "Gestion complète de vos biens locatifs dans le canton de Vaud et du Valais. Tarifs transparents, service digital, sérénité garantie."}
            </p>

            <div className="inline-flex items-center gap-4 bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Home className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">
                  {isEnglish ? "Starting from" : "À partir de"}
                </p>
                <p className="text-3xl font-bold text-amber-600">
                  5%{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    {isEnglish ? "of gross rents excl. VAT" : "des loyers bruts HT"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Link href="/#contact">
                  {isEnglish ? "Get a free quote" : "Demander un devis gratuit"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {advantages.map((advantage, index) => (
                <Card
                  key={index}
                  className="text-center p-6 border-amber-200 bg-gradient-to-br from-white to-amber-50/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                    <advantage.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold mb-1">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {advantage.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Our Services" : "Nos services"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Complete property management to maximize your rental income while minimizing your concerns."
                  : "Une gestion immobilière complète pour maximiser vos revenus locatifs tout en minimisant vos soucis."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:border-amber-300"
                >
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center mb-3 transition-colors">
                      <service.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "How It Works" : "Comment ça marche ?"}
              </h2>
              <p className="text-muted-foreground">
                {isEnglish
                  ? "4 simple steps to entrust us with your property management"
                  : "4 étapes simples pour nous confier la gestion de votre bien"}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-amber-200" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-20"
          >
            <Card className="max-w-3xl mx-auto overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50/30">
              <CardHeader className="text-center bg-gradient-to-r from-amber-500 to-orange-600 text-white py-8">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">
                  {isEnglish ? "Property Management" : "Gérance Immobilière"}
                </CardTitle>
                <p className="text-white/90">
                  {isEnglish
                    ? "Complete management of your rental properties"
                    : "Gestion complète de vos biens locatifs"}
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground mb-1">
                    {isEnglish ? "Starting from" : "À partir de"}
                  </p>
                  <p className="text-5xl font-bold text-amber-600">5%</p>
                  <p className="text-muted-foreground">
                    {isEnglish ? "of gross rents excl. VAT" : "des loyers bruts HT"}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {services.slice(0, 8).map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{service.title}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      {isEnglish
                        ? "Available in cantons of Vaud and Valais only. Contact us for other regions."
                        : "Disponible uniquement dans les cantons de Vaud et du Valais. Contactez-nous pour d'autres régions."}
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  <Link href="/#contact">
                    {isEnglish ? "Request a free quote" : "Demander un devis gratuit"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEnglish ? "Frequently Asked Questions" : "Questions fréquentes"}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold mb-2 flex items-start gap-3">
                    <Key className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm pl-8">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* CTA Section - Simple */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            id="contact-gerance"
            className="scroll-mt-32"
          >
            <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {isEnglish ? "Interested?" : "Intéressé(e) ?"}
              </h2>
              <p className="text-white/90 mb-8">
                {isEnglish
                  ? "Contact us for a free quote. We will get back to you within 1 business day."
                  : "Contactez-nous pour un devis gratuit. Nous vous recontactons sous 1 jour ouvré."}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-amber-600 hover:bg-white/90"
              >
                <Link href="/#contact">
                  {isEnglish ? "Contact us" : "Nous contacter"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
