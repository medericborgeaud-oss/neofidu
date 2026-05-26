"use client";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import {
  Calculator,
  FileText,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Zap,
  BadgeCheck,
  Receipt,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

const services = [
  {
    icon: Calculator,
    title: "Comptabilit\u00e9 PME",
    titleEn: "SME Accounting",
    description: "Tenue de comptabilit\u00e9 compl\u00e8te pour votre S\u00e0rl ou SA. Bouclement annuel, d\u00e9clarations TVA, \u00e9tats financiers et rapprochement bancaire.",
    descriptionEn: "Complete accounting for your LLC or AG. Annual closing, VAT returns, financial statements and bank reconciliation.",
    price: "300",
    unit: "/mois",
    unitEn: "/month",
    features: [
      "Comptabilit\u00e9 compl\u00e8te",
      "D\u00e9clarations TVA & sociales",
      "\u00c9tats financiers annuels",
      "Rapprochement bancaire",
      "Conseil strat\u00e9gique fiscal",
    ],
    featuresEn: [
      "Complete accounting",
      "VAT & social returns",
      "Annual financial statements",
      "Bank reconciliation",
      "Strategic tax advice",
    ],
  },
  {
    icon: FileText,
    title: "D\u00e9claration fiscale PM",
    titleEn: "Corporate Tax Return",
    description: "D\u00e9claration d\u2019imp\u00f4ts compl\u00e8te pour personnes morales. Imp\u00f4t sur le b\u00e9n\u00e9fice, imp\u00f4t sur le capital et annexes.",
    descriptionEn: "Complete tax return for legal entities. Profit tax, capital tax and appendices.",
    price: "490",
    unit: "",
    unitEn: "",
    features: [
      "Imp\u00f4t sur le b\u00e9n\u00e9fice",
      "Imp\u00f4t sur le capital",
      "Annexes compl\u00e8tes",
      "Optimisation fiscale",
      "Suivi avec l\u2019autorit\u00e9 fiscale",
    ],
    featuresEn: [
      "Profit tax",
      "Capital tax",
      "Complete appendices",
      "Tax optimization",
      "Follow-up with tax authority",
    ],
  }
];

const advantages = [
  {
    icon: Zap,
    title: "100% en ligne",
    titleEn: "100% online",
    description: "Tout se fait \u00e0 distance. Pas besoin de vous d\u00e9placer.",
    descriptionEn: "Everything is done remotely. No need to travel.",
  },
  {
    icon: Shield,
    title: "Donn\u00e9es s\u00e9curis\u00e9es",
    titleEn: "Secure data",
    description: "Chiffrement SSL 256-bit et conformit\u00e9 LPD/RGPD.",
    descriptionEn: "SSL 256-bit encryption and LPD/GDPR compliance.",
  },
  {
    icon: Clock,
    title: "R\u00e9actif",
    titleEn: "Responsive",
    description: "Interlocuteur d\u00e9di\u00e9 et r\u00e9ponse rapide.",
    descriptionEn: "Dedicated contact and fast response time.",
  },
  {
    icon: BadgeCheck,
    title: "Expert certifi\u00e9",
    titleEn: "Certified expert",
    description: "Sp\u00e9cialiste en fiscalit\u00e9 et comptabilit\u00e9 suisse.",
    descriptionEn: "Specialist in Swiss taxation and accounting.",
  },
];

export default function EntreprisesPage() {
  const { t, isEnglish } = useLanguage();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary/5 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <BreadcrumbLight
              items={[
                { label: isEnglish ? "Home" : "Accueil", href: "/" },
                { label: isEnglish ? "Businesses" : "Entreprises" },
              ]}
            />
            <div className="max-w-3xl mx-auto text-center mt-8">
              <Badge variant="outline" className="mb-6 text-primary border-primary/30 px-4 py-1.5">
                {isEnglish ? "LLC, AG & Sole Proprietorship" : "S\u00e0rl, SA & Raison individuelle"}
              </Badge>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
              >
                {isEnglish
                  ? "Accounting & Business Services"
                  : "Comptabilit\u00e9 & Services aux entreprises"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                {isEnglish
                  ? "From company creation to annual accounts, NeoFidu supports Swiss SMEs with a fully digital, transparent, and affordable service."
                  : "De la cr\u00e9ation de votre entreprise au bouclement annuel, NeoFidu accompagne les PME romandes avec un service enti\u00e8rement digital, transparent et accessible."}
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/contact">
                    {isEnglish ? "Request a quote" : "Demander un devis"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link href="/tarifs">
                    {isEnglish ? "View pricing" : "Voir les tarifs"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isEnglish ? "Our services for businesses" : "Nos services pour les entreprises"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Whether you are creating your company or managing your daily operations, we have the right solution."
                  : "Que vous cr\u00e9iez votre entreprise ou g\u00e9riez vos op\u00e9rations quotidiennes, nous avons la solution adapt\u00e9e."}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-shadow border-border/50">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {isEnglish ? service.titleEn : service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isEnglish ? service.descriptionEn : service.description}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground">
                        {isEnglish ? "From" : "D\u00e8s"}{" "}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        CHF {service.price}.-
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {isEnglish ? service.unitEn : service.unit}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {(isEnglish ? service.featuresEn : service.features).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full rounded-full">
                        <Link href="/contact">
                          {isEnglish ? "Request a quote" : "Demander un devis"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isEnglish ? "Why choose NeoFidu?" : "Pourquoi choisir NeoFidu\u00a0?"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, index) => (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <adv.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {isEnglish ? adv.titleEn : adv.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isEnglish ? adv.descriptionEn : adv.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isEnglish
                ? "Ready to get started?"
                : "Pr\u00eat \u00e0 vous lancer\u00a0?"}
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              {isEnglish
                ? "Contact us for a free, no-obligation quote tailored to your business needs."
                : "Contactez-nous pour un devis gratuit et sans engagement, adapt\u00e9 aux besoins de votre entreprise."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                <Link href="/contact">
                  {isEnglish ? "Contact us" : "Nous contacter"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-white text-emerald-600 hover:bg-gray-50">
                <Link href="/contact">
                  {isEnglish ? "Request a quote" : "Cr\u00e9emander un devis"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
