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
import { FileText, Calculator, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

type ServiceType = "tax" | "accounting" | "property" | null;

export default function DemandePage() {
  const [serviceType, setServiceType] = useState<ServiceType>(null);

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
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Déposez votre{" "}
              <span className="text-gradient">demande en ligne</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Remplissez le formulaire ci-dessous et recevez un devis personnalisé immédiatement.
            </p>
          </div>

          {/* Service Selection or Form */}
          {serviceType === null ? (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-semibold text-center mb-8">
                Quel service vous intéresse ?
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
                    <h3 className="text-2xl font-bold mb-3">Déclaration d'impôt</h3>
                    <p className="text-muted-foreground mb-6">
                      Pour particuliers et indépendants.
                      Nous établissons votre déclaration avec toutes les déductions légales.
                    </p>
                    <div className="text-primary font-semibold">
                      Dès CHF 50.-
                    </div>
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
                    <h3 className="text-2xl font-bold mb-3">Comptabilité</h3>
                    <p className="text-muted-foreground mb-6">
                      Pour indépendants et entreprises.
                      Gestion comptable complète et établissement de vos bilans.
                    </p>
                    <div className="text-teal-600 font-semibold">
                      Dès CHF 500.-/an
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-amber-500 group relative"
                  onClick={() => setServiceType("property")}
                >
                  <Badge className="absolute top-4 right-4 bg-amber-100 text-amber-700">
                    VD & VS
                  </Badge>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500/20 transition-colors">
                      <Home className="w-10 h-10 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Gérance immobilière</h3>
                    <p className="text-muted-foreground mb-6">
                      Pour propriétaires bailleurs.
                      Gestion complète de vos biens locatifs.
                    </p>
                    <div className="text-amber-600 font-semibold">
                      Dès 5% des loyers
                    </div>
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
                Changer de service
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
                Changer de service
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
                Changer de service
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
