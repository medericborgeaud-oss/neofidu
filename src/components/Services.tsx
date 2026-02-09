"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import {
  FileText,
  Calculator,
  RefreshCw,
  Search,
  Gavel,
  Building2,
  Users,
  BarChart3,
  FileCheck,
  Receipt,
  Home,
  Key,
  Wrench,
  FileSpreadsheet
} from "lucide-react";

export function Services() {
  const { isEnglish } = useLanguage();

  const taxServices = isEnglish
    ? [
        {
          icon: FileText,
          title: "Tax Declaration",
          description: "Complete preparation of your tax form, leveraging every tax advantage applicable to your profile.",
        },
        {
          icon: RefreshCw,
          title: "Installment Adjustment",
          description: "Adaptation of your provisional payments according to your income evolution for better cash flow management.",
        },
        {
          icon: Search,
          title: "Tax Assessment Review",
          description: "Thorough analysis of tax decisions received and dispute in case of detected anomalies.",
        },
        {
          icon: Gavel,
          title: "Appeals & Claims",
          description: "Drafting and filing of appeals with the competent authorities when a taxation appears incorrect.",
        },
      ]
    : [
        {
          icon: FileText,
          title: "Déclaration d'impôts",
          description: "Préparation complète de votre formulaire d'imposition en exploitant chaque avantage fiscal applicable à votre profil.",
        },
        {
          icon: RefreshCw,
          title: "Ajustement des acomptes",
          description: "Adaptation de vos versements provisionnels selon l'évolution de vos revenus pour une meilleure gestion de trésorerie.",
        },
        {
          icon: Search,
          title: "Vérification des bordereaux",
          description: "Analyse minutieuse des décisions fiscales reçues et contestation en cas d'anomalie détectée.",
        },
        {
          icon: Gavel,
          title: "Opposition et réclamation",
          description: "Rédaction et dépôt de recours auprès des autorités compétentes lorsqu'une taxation paraît erronée.",
        },
      ];

  const accountingServices = isEnglish
    ? [
        {
          icon: Users,
          title: "Freelance Accounting",
          description: "Tailored support for professionals practicing as sole proprietors or in liberal professions.",
        },
        {
          icon: Building2,
          title: "SME Management",
          description: "Accounting services calibrated for small and medium-sized structures established in Switzerland.",
        },
        {
          icon: BarChart3,
          title: "Annual Financial Statements",
          description: "Production of your balance sheet and profit and loss statement according to Swiss legal requirements.",
        },
        {
          icon: Receipt,
          title: "VAT Administration",
          description: "Full handling of your VAT statements and associated formalities.",
        },
      ]
    : [
        {
          icon: Users,
          title: "Suivi comptable freelance",
          description: "Accompagnement sur mesure pour les professionnels exerçant en nom propre ou en profession libérale.",
        },
        {
          icon: Building2,
          title: "Gestion PME",
          description: "Prestations comptables calibrées pour les structures de petite et moyenne taille établies en Suisse.",
        },
        {
          icon: BarChart3,
          title: "États financiers annuels",
          description: "Production de votre bilan et compte de profits et pertes selon les exigences légales helvétiques.",
        },
        {
          icon: Receipt,
          title: "Administration TVA",
          description: "Prise en charge intégrale de vos décomptes de taxe sur la valeur ajoutée et formalités associées.",
        },
      ];

  const propertyServices = isEnglish
    ? [
        {
          icon: Key,
          title: "Rental Management",
          description: "Tenant search, lease drafting, inventory and payment tracking.",
        },
        {
          icon: Wrench,
          title: "Technical Monitoring",
          description: "Coordination of maintenance work, claims management and liaison with contractors.",
        },
        {
          icon: FileSpreadsheet,
          title: "Property Accounting",
          description: "Expense statements, annual closing and financial reporting for owners.",
        },
        {
          icon: Home,
          title: "Wealth Advisory",
          description: "Rental yield optimization and support for your real estate projects.",
        },
      ]
    : [
        {
          icon: Key,
          title: "Gestion locative",
          description: "Recherche de locataires, rédaction des baux, états des lieux et suivi des encaissements.",
        },
        {
          icon: Wrench,
          title: "Suivi technique",
          description: "Coordination des travaux d'entretien, gestion des sinistres et relation avec les artisans.",
        },
        {
          icon: FileSpreadsheet,
          title: "Comptabilité immobilière",
          description: "Décomptes de charges, bouclement annuel et reporting financier pour propriétaires.",
        },
        {
          icon: Home,
          title: "Conseil patrimonial",
          description: "Optimisation du rendement locatif et accompagnement dans vos projets immobiliers.",
        },
      ];

  const sectionTitle = isEnglish ? "OUR OFFER" : "Notre offre";
  const mainTitle1 = isEnglish ? "Comprehensive support for" : "Un accompagnement global pour";
  const mainTitle2 = isEnglish ? "your management" : "votre gestion";
  const mainDescription = isEnglish
    ? "Individual, freelancer or business owner: benefit from personalized solutions for your tax, accounting and real estate challenges."
    : "Particulier, travailleur autonome ou dirigeant d'entreprise : bénéficiez de solutions personnalisées pour vos enjeux fiscaux, comptables et immobiliers.";

  const taxTitle = isEnglish ? "Personal Taxation" : "Fiscalité des personnes";
  const taxSubtitle = isEnglish ? "For private taxpayers and self-employed" : "Destiné aux contribuables privés et indépendants";

  const accountingTitle = isEnglish ? "Accounting Expertise" : "Expertise comptable";
  const accountingSubtitle = isEnglish ? "For entrepreneurs and companies" : "Pour les entrepreneurs et sociétés";

  const propertyTitle = isEnglish ? "Property Management" : "Gérance immobilière";
  const propertySubtitle = isEnglish ? "For owners and investors" : "Pour les propriétaires et investisseurs";

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            {mainTitle1}{" "}
            <span className="text-gradient">{mainTitle2}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {mainDescription}
          </p>
        </div>

        {/* Tax Services */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{taxTitle}</h3>
              <p className="text-muted-foreground">{taxSubtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {taxServices.map((service) => (
              <Card
                key={service.title}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-white to-secondary/30"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Accounting Services */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{accountingTitle}</h3>
              <p className="text-muted-foreground">{accountingSubtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accountingServices.map((service) => (
              <Card
                key={service.title}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-500/20 bg-gradient-to-br from-white to-teal-50/50"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
                    <service.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Property Management Services */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-2xl font-bold">{propertyTitle}</h3>
                <p className="text-muted-foreground">{propertySubtitle}</p>
              </div>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                Vaud & Valais
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyServices.map((service) => (
              <Card
                key={service.title}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-amber-500/20 bg-gradient-to-br from-white to-amber-50/50"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                    <service.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
