"use client";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import {
  Calculator,
  FileText,
  CheckCircle2,
  ArrowDown,
  Shield,
  ShieldCheck,
  Clock,
  Zap,
  BadgeCheck,
  Receipt,
  Users,
  Building2,
  Mail,
  Send,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

const services = [
  {
    icon: Calculator,
    title: "ComptabilitÃ© annuelle",
    titleEn: "Annual Accounting",
    description:
      "Tenue des comptes, bouclement annuel et prÃ©paration des comptes selon les normes Swiss GAAP RPC 21.",
    descriptionEn:
      "Bookkeeping, annual closing and preparation of accounts according to Swiss GAAP FER 21 standards.",
    features: [
      "Tenue de comptabilitÃ©",
      "Bouclement annuel",
      "Comptes selon Swiss GAAP RPC 21",
      "Rapprochement bancaire",
    ],
    featuresEn: [
      "Bookkeeping",
      "Annual closing",
      "Swiss GAAP FER 21 accounts",
      "Bank reconciliation",
    ],
  },
  {
    icon: FileText,
    title: "DÃ©claration fiscale",
    titleEn: "Tax Return",
    description:
      "DÃ©claration dâimpÃ´t annuelle, demande et suivi dâexonÃ©ration fiscale pour utilitÃ© publique.",
    descriptionEn:
      "Annual tax return, application and monitoring of tax exemption for public utility.",
    features: [
      "DÃ©claration dâimpÃ´t annuelle",
      "Demande dâexonÃ©ration fiscale",
      "Suivi avec lâautoritÃ© fiscale",
      "Optimisation fiscale",
    ],
    featuresEn: [
      "Annual tax return",
      "Tax exemption application",
      "Follow-up with tax authority",
      "Tax optimization",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Organe de rÃ©vision",
    titleEn: "Audit Body",
    description:
      "Rapports pour lâorgane de rÃ©vision, contrÃ´le restreint et prÃ©paration de lâassemblÃ©e gÃ©nÃ©rale.",
    descriptionEn:
      "Reports for the audit body, limited audit and preparation of the general assembly.",
    features: [
      "ContrÃ´le restreint",
      "Rapports de rÃ©vision",
      "PrÃ©paration AG",
      "Conseil en gouvernance",
    ],
    featuresEn: [
      "Limited audit",
      "Audit reports",
      "GA preparation",
      "Governance advice",
    ],
  },
  {
    icon: Receipt,
    title: "Conseil TVA",
    titleEn: "VAT Advisory",
    description:
      "Assujettissement TVA associatif, mÃ©thode des taux de la dette fiscale nette, dÃ©comptes trimestriels.",
    descriptionEn:
      "Non-profit VAT liability, flat tax rate method, quarterly VAT returns.",
    features: [
      "Assujettissement TVA",
      "MÃ©thode taux dette fiscale nette",
      "DÃ©comptes trimestriels",
      "Optimisation TVA",
    ],
    featuresEn: [
      "VAT liability assessment",
      "Flat tax rate method",
      "Quarterly returns",
      "VAT optimization",
    ],
  },
];

const associationTypes = [
  "Clubs sportifs et culturels",
  "Associations caritatives",
  "Associations professionnelles",
  "ONG et associations dâentraide",
];
const associationTypesEn = [
  "Sports and cultural clubs",
  "Charitable associations",
  "Professional associations",
  "NGOs and mutual aid organizations",
];
const fondationTypes = [
  "Fondations dâutilitÃ© publique",
  "Fondations de famille",
  "Fondations dâentreprise",
  "Fondations ecclÃ©siastiques",
];
const fondationTypesEn = [
  "Public utility foundations",
  "Family foundations",
  "Corporate foundations",
  "Ecclesiastical foundations",
];

const advantages = [
  {
    icon: Zap,
    title: "100% en ligne",
    titleEn: "100% online",
    description: "Tout se fait Ã  distance. Pas besoin de vous dÃ©placer.",
    descriptionEn: "Everything is done remotely. No need to travel.",
  },
  {
    icon: Shield,
    title: "DonnÃ©es sÃ©curisÃ©es",
    titleEn: "Secure data",
    description: "Chiffrement SSL 256-bit et conformitÃ© LPD/RGPD.",
    descriptionEn: "SSL 256-bit encryption and LPD/GDPR compliance.",
  },
  {
    icon: Clock,
    title: "RÃ©actif",
    titleEn: "Responsive",
    description: "Interlocuteur dÃ©diÃ© et rÃ©ponse sous 24h par email.",
    descriptionEn: "Dedicated contact and email response within 24h.",
  },
  {
    icon: BadgeCheck,
    title: "Expert certifiÃ©",
    titleEn: "Certified expert",
    description: "SpÃ©cialiste en fiscalitÃ© et comptabilitÃ© suisse.",
    descriptionEn: "Specialist in Swiss taxation and accounting.",
  },
];

const cantons = ["Vaud", "GenÃ¨ve", "Valais", "Fribourg", "NeuchÃ¢tel", "Jura"];

export default function AssociationsFondationsPage() {
  const { t, isEnglish } = useLanguage();
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "association",
    canton: "",
    email: "",
    services: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "associations-fondations" }),
      });
      setIsSuccess(true);
    } catch {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicePills = [
    { key: "comptabilite", label: isEnglish ? "Accounting" : "ComptabilitÃ©" },
    { key: "fiscalite", label: isEnglish ? "Tax" : "FiscalitÃ©" },
    { key: "tva", label: "TVA" },
    { key: "revision", label: isEnglish ? "Audit" : "RÃ©vision" },
    { key: "creation", label: isEnglish ? "Creation" : "CrÃ©ation" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
          <div className="absolute top-[-80px] right-[-60px] w-[240px] h-[240px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-40px] w-[180px] h-[180px] bg-white/5 rounded-full blur-2xl" />
          <div className="container mx-auto px-4 relative z-10">
            <BreadcrumbLight
              items={[
                { label: isEnglish ? "Home" : "Accueil", href: "/" },
                { label: isEnglish ? "Businesses" : "Entreprises", href: "/entreprises" },
                { label: isEnglish ? "Associations & Foundations" : "Associations & Fondations" },
              ]}
            />
            <div className="max-w-3xl mx-auto text-center mt-8">
              <Badge
                variant="outline"
                className="mb-6 text-white/90 border-white/25 bg-white/10 px-4 py-1.5"
              >
                {isEnglish ? "Associations & Foundations" : "Associations & Fondations"}
              </Badge>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                {isEnglish
                  ? "Accounting & Tax for Associations and Foundations"
                  : "ComptabilitÃ© et fiscalitÃ© pour associations et fondations"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
              >
                {isEnglish
                  ? "Your online fiduciary specialized in supporting non-profit organizations in French-speaking Switzerland. Tailored pricing, dedicated expertise."
                  : "Votre fiduciaire en ligne spÃ©cialisÃ©e dans lâaccompagnement des organisations Ã  but non lucratif en Suisse romande. Tarifs adaptÃ©s, expertise dÃ©diÃ©e."}
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-8 bg-white text-primary hover:bg-white/90"
                >
                  <Link href="#devis">
                    <ArrowDown className="mr-2 w-4 h-4" />
                    {isEnglish ? "Request a free quote" : "Demander un devis gratuit"}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-white/30 text-white hover:bg-white/10"
                >
                  <Link href="mailto:contact@neofidu.ch">
                    <Mail className="mr-2 w-4 h-4" />
                    {isEnglish ? "Write to us" : "Nous Ã©crire"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 divide-x divide-border bg-secondary/50">
          <div className="text-center py-8">
            <p className="text-3xl font-bold text-primary">6</p>
            <p className="text-sm text-muted-foreground mt-1">
              {isEnglish ? "Cantons covered" : "Cantons romands couverts"}
            </p>
          </div>
          <div className="text-center py-8">
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground mt-1">
              {isEnglish ? "Online, no travel" : "En ligne, sans dÃ©placement"}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isEnglish ? "Our services" : "Nos services"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Comprehensive support tailored to the specific needs of non-profit organizations."
                  : "Un accompagnement complet adaptÃ© aux besoins spÃ©cifiques des organisations Ã  but non lucratif."}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
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
                    <ul className="space-y-2">
                      {(isEnglish ? service.featuresEn : service.features).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Types */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isEnglish ? "We support" : "Nous accompagnons"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isEnglish
                  ? "Whether you are a small local association or a public utility foundation."
                  : "Que vous soyez une petite association locale ou une fondation dâutilitÃ© publique."}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-8 border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Associations</h3>
                  </div>
                  <ul className="space-y-3">
                    {(isEnglish ? associationTypesEn : associationTypes).map((type) => (
                      <li key={type} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        {type}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full p-8 border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {isEnglish ? "Foundations" : "Fondations"}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {(isEnglish ? fondationTypesEn : fondationTypes).map((type) => (
                      <li key={type} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        {type}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isEnglish ? "Why choose NeoFidu?" : "Pourquoi choisir NeoFiduÂ ?"}
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

        {/* Contact Form */}
        <section id="devis" className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {isEnglish ? "Request your free quote" : "Demandez votre devis gratuit"}
                </h2>
                <p className="text-white/80">
                  {isEnglish
                    ? "Describe your organization and your needs. We will get back to you within 24h by email."
                    : "DÃ©crivez-nous votre organisation et vos besoins. Nous vous recontactons sous 24h par email."}
                </p>
              </div>
              {isSuccess ? (
                <Card className="p-8 text-center bg-white/10 border-white/20 backdrop-blur-sm">
                  <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {isEnglish ? "Request sent!" : "Demande envoyÃ©eÂ !"}
                  </h3>
                  <p className="text-white/80">
                    {isEnglish
                      ? "We will get back to you within 24 hours by email."
                      : "Nous vous recontacterons dans les 24 heures par email."}
                  </p>
                </Card>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Card className="p-8 bg-white/10 border-white/20 backdrop-blur-sm">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm text-white/70 mb-2 block">
                          {isEnglish ? "Organization name" : "Nom de lâorganisation"}
                        </label>
                        <Input
                          value={formData.orgName}
                          onChange={(e) =>
                            setFormData({ ...formData, orgName: e.target.value })
                          }
                          placeholder={isEnglish ? "e.g. Association XYZ" : "ExÂ : Association XYZ"}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white/70 mb-2 block">
                          {isEnglish ? "Organization type" : "Type dâorganisation"}
                        </label>
                        <select
                          value={formData.orgType}
                          onChange={(e) =>
                            setFormData({ ...formData, orgType: e.target.value })
                          }
                          className="w-full h-10 px-3 rounded-md bg-white/10 border border-white/20 text-white/80 text-sm"
                        >
                          <option value="association">Association</option>
                          <option value="fondation">
                            {isEnglish ? "Foundation" : "Fondation"}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm text-white/70 mb-2 block">Canton</label>
                        <select
                          value={formData.canton}
                          onChange={(e) =>
                            setFormData({ ...formData, canton: e.target.value })
                          }
                          className="w-full h-10 px-3 rounded-md bg-white/10 border border-white/20 text-white/80 text-sm"
                          required
                        >
                          <option value="">
                            {isEnglish ? "Choose a canton" : "Choisir un canton"}
                          </option>
                          {cantons.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-white/70 mb-2 block">
                          {isEnglish ? "Contact email" : "Email de contact"}
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="email@organisation.ch"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-sm text-white/70 mb-2 block">
                        {isEnglish ? "Desired services" : "Services souhaitÃ©s"}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {servicePills.map((pill) => (
                          <button
                            key={pill.key}
                            type="button"
                            onClick={() => toggleService(pill.key)}
                            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                              formData.services.includes(pill.key)
                                ? "bg-white/20 border-white/40 text-white"
                                : "bg-transparent border-white/20 text-white/60 hover:text-white/80"
                            } border`}
                          >
                            {pill.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="text-sm text-white/70 mb-2 block">
                        {isEnglish ? "Describe your needs" : "DÃ©crivez vos besoins"}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder={
                          isEnglish
                            ? "Approximate annual budget, number of members, specific needs..."
                            : "Budget annuel approximatif, nombre de membres, besoins spÃ©cifiques..."
                        }
                        className="w-full min-h-[100px] px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm resize-y"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full rounded-full bg-white text-primary hover:bg-white/90"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isEnglish ? "Send my request" : "Envoyer ma demande"}
                    </Button>
                  </Card>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-secondary/50 text-center">
          <p className="text-muted-foreground mb-2">
            {isEnglish
              ? "Questions? Also check our services for"
              : "Des questionsÂ ? Consultez aussi nos services pour"}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/demande" className="text-primary font-medium hover:underline">
              {isEnglish ? "Individuals" : "Particuliers"}
            </Link>
            <span className="text-muted-foreground">{"Â·"}</span>
            <Link href="/entreprises" className="text-primary font-medium hover:underline">
              {isEnglish ? "Businesses" : "Entreprises"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
