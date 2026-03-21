"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxRequestForm } from "@/components/TaxRequestForm";
import { AccountingRequestForm } from "@/components/AccountingRequestForm";
import { PropertyRequestForm } from "@/components/PropertyRequestForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calculator, Home } from "lucide-react";
import Link from "next/link";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { useLanguage } from "@/lib/language-context";

type ServiceType = "tax" | "accounting" | "property" | null;

export default function DemandePage() {
  const { isEnglish } = useLanguage();
  const [serviceType, setServiceType] = useState<ServiceType>(null);

  const t = {
    backToHome: isEnglish ? "Back to home" : "Retour à l'accueil",
    title1: isEnglish ? "Submit your" : "Déposez votre",
    title2: isEnglish ? "request online" : "demande en ligne",
    subtitle: isEnglish
      ? "Fill out the form below and receive a personalized quote immediately."
      : "Remplissez le formulaire ci-dessous et recevez un devis personnalisé immédiatement.",
    whichService: isEnglish ? "Which service interests you?" : "Quel service vous intéresse ?",
    changeService: isEnglish ? "Change service" : "Changer de service",
    taxTitle: isEnglish ? "Tax Declaration" : "Déclaration d'impôt",
    taxDesc: isEnglish
      ? "For individuals and self-employed. We prepare your declaration with all legal deductions."
      : "Pour particuliers et indépendants. Nous établissons votre déclaration avec toutes les déductions légales.",
    taxPrice: isEnglish ? "From CHF 50.-" : "Dès CHF 50.-",
    accountingTitle: isEnglish ? "Accounting" : "Comptabilité",
    accountingDesc: isEnglish
      ? "For self-employed and companies. Complete accounting management and financial statements."
      : "Pour indépendants et entreprises. Gestion comptable complète et établissement de vos bilans.",
    accountingPrice: isEnglish ? "From CHF 500.-/year" : "Dès CHF 500.-/an",
    propertyTitle: isEnglish ? "Property Management" : "Gérance immobilière",
    propertyDesc: isEnglish
      ? "For landlord owners. Complete management of your rental properties."
      : "Pour propriétaires bailleurs. Gestion complète de vos biens locatifs.",
    propertyPrice: isEnglish ? "From 5% of rents" : "Dès 5% des loyers",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BreadcrumbLight items={[{ label: "D�poser une demande" }]} className="mb-8" />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.title1}{" "}
              <span className="text-gradient">{t.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.subtitle}
            </p>
          </div>

          {serviceType === null ? (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-semibold text-center mb-8">
                {t.whichService}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card
                  className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary group"
                  onClick={() => setServiceType("tax")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.taxTitle}</h3>
                    <p className="text-muted-foreground mb-6">{t.taxDesc}</p>
                    <div className="text-primary font-semibold">{t.taxPrice}</div>
                  </div>
                </Card>

                <Card
                  className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-500 group"
                  onClick={() => setServiceType("accounting")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-teal-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-500/20 transition-colors">
                      <Calculator className="w-10 h-10 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.accountingTitle}</h3>
                    <p className="text-muted-foreground mb-6">{t.accountingDesc}</p>
                    <div className="text-teal-600 font-semibold">{t.accountingPrice}</div>
                  </div>
                </Card>

                <Card
                  className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-amber-500 group relative"
                  onClick={() => setServiceType("property")}
                >
                  <Badge className="absolute top-4 right-4 bg-amber-100 text-amber-700">
                    VD &amp; VS
                  </Badge>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500/20 transition-colors">
                      <Home className="w-10 h-10 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.propertyTitle}</h3>
                    <p className="text-muted-foreground mb-6">{t.propertyDesc}</p>
                    <div className="text-amber-600 font-semibold">{t.propertyPrice}</div>
                  </div>
                </Card>
              </div>
            </div>
          ) : serviceType === "tax" ? (
            <div className="max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setServiceType(null)}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.changeService}
              </Button>
              <TaxRequestForm />
            </div>
          ) : serviceType === "accounting" ? (
            <div className="max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setServiceType(null)}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.changeService}
              </Button>
              <AccountingRequestForm />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setServiceType(null)}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.changeService}
              </Button>
              <PropertyRequestForm />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
