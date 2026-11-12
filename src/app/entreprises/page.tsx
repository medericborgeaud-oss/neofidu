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
  Unlock,
  Download,
  Repeat,
  MonitorSmartphone,
} from "lucide-react";
import { AnnualCostExamples } from "@/components/EntreprisePricingDetails";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

const services = [
  {
    icon: Receipt,
    title: "Comptabilit\u00e9 ind\u00e9pendant",
    titleEn: "Self-employed accounting",
    description: "Pour raison individuelle et freelance. Tenue de la comptabilit\u00e9, TVA si assujetti et bouclement annuel.",
    descriptionEn: "For sole proprietorships and freelancers. Bookkeeping, VAT if registered and annual closing.",
    price: "D\u00e8s CHF 500.-",
    priceEn: "From CHF 500.-",
    unit: "/an",
    unitEn: "/year",
    features: [
      "Jusqu'\u00e0 200 transactions par an",
      "Comptabilit\u00e9 compl\u00e8te",
      "D\u00e9clarations TVA (si assujetti)",
      "Bouclement annuel",
      "Rapprochement bancaire",
    ],
    featuresEn: [
      "Up to 200 transactions per year",
      "Complete accounting",
      "VAT returns (if registered)",
      "Annual closing",
      "Bank reconciliation",
    ],
  },
  {
    icon: Calculator,
    title: "Comptabilit\u00e9 PME",
    titleEn: "SME Accounting",
    description: "Tenue de comptabilit\u00e9 compl\u00e8te pour votre S\u00e0rl ou SA jusqu'\u00e0 10 employ\u00e9s. Salaires, TVA, \u00e9tats financiers et d\u00e9claration d'imp\u00f4t de la soci\u00e9t\u00e9.",
    descriptionEn: "Complete accounting for your LLC or AG with up to 10 employees. Payroll, VAT, financial statements and company tax return.",
    price: "D\u00e8s CHF 200.-",
    priceEn: "From CHF 200.-",
    unit: "/mois",
    unitEn: "/month",
    features: [
      "Jusqu'\u00e0 600 transactions par an",
      "Salaires : 2 salari\u00e9s inclus, puis CHF 25.-/fiche/mois",
      "D\u00e9clarations TVA & sociales",
      "\u00c9tats financiers annuels",
      "Conseil strat\u00e9gique fiscal",
    ],
    featuresEn: [
      "Up to 600 transactions per year",
      "Payroll: 2 employees included, then CHF 25.-/payslip/month",
      "VAT & social returns",
      "Annual financial statements",
      "Strategic tax advice",
    ],
  },
  {
    icon: FileText,
    title: "D\u00e9claration fiscale PM",
    titleEn: "Corporate Tax Return",
    description: "D\u00e9claration d\u2019imp\u00f4ts compl\u00e8te pour votre S\u00e0rl ou SA : imp\u00f4t sur le b\u00e9n\u00e9fice, imp\u00f4t sur le capital et annexes.",
    descriptionEn: "Complete tax return for your LLC or AG: profit tax, capital tax and appendices.",
    price: "Incluse",
    priceEn: "Included",
    unit: " dans la formule PME",
    unitEn: " in the SME package",
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
  },
];

const guarantees = [
  { icon: Unlock, title: "Sans dur\u00e9e minimale", titleEn: "No minimum term", description: "Mandat r\u00e9siliable par e-mail pour la fin du mois suivant.", descriptionEn: "Mandate can be cancelled by email for the end of the following month." },
  { icon: Download, title: "Vos donn\u00e9es vous appartiennent", titleEn: "Your data belongs to you", description: "Export complet de votre comptabilit\u00e9 \u00e0 tout moment.", descriptionEn: "Full export of your accounts at any time." },
  { icon: BadgeCheck, title: "Aucune surprise", titleEn: "No surprises", description: "Aucun suppl\u00e9ment factur\u00e9 sans votre accord pr\u00e9alable.", descriptionEn: "No extra charge without your prior agreement." },
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

export function EntreprisesContent({ forceEn = false }: { forceEn?: boolean }) {
  const { t, isEnglish: ctxIsEnglish } = useLanguage();
  const isEnglish = forceEn || ctxIsEnglish;
  const L = (h: string) => (isEnglish ? "/en" + h : h);

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
                  <Link href={L("/contact")}>
                    {isEnglish ? "Request a quote" : "Demander un devis"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link href={L("/tarifs")}>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <span className="text-2xl font-bold text-primary">
                        {isEnglish ? service.priceEn : service.price}
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
                        <Link href={L("/contact")}>
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

        {/* Outils */}
        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
              <MonitorSmartphone className="w-10 h-10 text-primary shrink-0" />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {isEnglish ? "Keep your tools: bexio or Banana" : "Gardez vos outils : bexio ou Banana"}
                </h2>
                <p className="text-muted-foreground">
                  {isEnglish
                    ? "Already on bexio? We work directly in your bexio, you keep your tool and your access (the bexio subscription remains at your expense). No software yet? We keep your accounts in Banana Accounting, included in our packages. Either way, your data belongs to you and can be exported at any time."
                    : "Déjà sur bexio ? Nous travaillons directement dans votre bexio, vous gardez votre outil et votre accès (l\u2019abonnement bexio reste à votre charge). Pas encore de logiciel ? Nous tenons votre comptabilité sur Banana Comptabilité, inclus dans nos forfaits. Dans les deux cas, vos données vous appartiennent et sont exportables à tout moment."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exemples de cout annuel */}
        <section className="py-20 bg-slate-50 border-t">
          <div className="container mx-auto px-4">
            <AnnualCostExamples isEnglish={isEnglish} />
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href={L("/tarifs")}>
                  {isEnglish ? "See what is included and excluded" : "Voir ce qui est inclus et exclu"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Changer de fiduciaire */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <Repeat className="w-8 h-8 text-amber-600 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {isEnglish ? "Already have a fiduciary?" : "Vous avez d\u00e9j\u00e0 une fiduciaire\u00a0?"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isEnglish
                      ? "Free second opinion on your invoice within 48h. If you switch, we prepare the transfer letter and take over your file."
                      : "Second avis gratuit sur votre facture en 48 h. Si vous changez, on pr\u00e9pare la lettre de transfert et on reprend votre dossier."}
                  </p>
                </div>
              </div>
              <Button asChild className="rounded-full px-6 whitespace-nowrap">
                <Link href={L("/changer-de-fiduciaire")}>
                  {isEnglish ? "Switch fiduciary" : "Changer de fiduciaire"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
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

        {/* Engagements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
              {isEnglish ? "Our commitments" : "Nos engagements"}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {guarantees.map((g) => (
                <div key={g.title} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <g.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{isEnglish ? g.titleEn : g.title}</h3>
                  <p className="text-sm text-muted-foreground">{isEnglish ? g.descriptionEn : g.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Barometre fiscal des entreprises */}
        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-primary mb-1">
                  {isEnglish ? "2026 data \u00b7 657 municipalities" : "Donn\u00e9es 2026 \u00b7 657 communes"}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {isEnglish ? "Business tax barometer 2026" : "Barom\u00e8tre fiscal des entreprises 2026"}
                </h2>
                <p className="text-muted-foreground">
                  {isEnglish
                    ? "How much tax does a self-employed person or a small LLC pay in each French-speaking municipality? Official FTA figures, canton by canton."
                    : "Combien d\u2019imp\u00f4ts paie un ind\u00e9pendant ou une petite S\u00e0rl dans chaque commune romande\u00a0? Chiffres officiels de l\u2019AFC, canton par canton."}
                </p>
              </div>
              <Button asChild className="rounded-full px-6 whitespace-nowrap">
                <Link href={L("/barometre-fiscal/entreprises")}>
                  {isEnglish ? "See the barometer" : "Voir le barom\u00e8tre"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
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
                <Link href={L("/contact")}>
                  {isEnglish ? "Contact us" : "Nous contacter"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-white text-emerald-600 hover:bg-gray-50">
                <Link href={L("/demande")}>
                  {isEnglish ? "Request a quote" : "Demander un devis"}
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

export default function EntreprisesPage() {
  return <EntreprisesContent />;
}
