"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxRequestForm } from "@/components/TaxRequestForm";
import { AccountingRequestForm } from "@/components/AccountingRequestForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Calculator, MessageCircle } from "lucide-react";
import Link from "next/link";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { useLanguage } from "@/lib/language-context";

type ServiceType = "tax" | "accounting" | "other" | null;

export default function DemandePage() {
  const { isEnglish } = useLanguage();
  const router = useRouter();
  const [serviceType, setServiceType] = useState<ServiceType>(null);

  // Prevent browser scroll restoration on refresh — always start at top
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const t = {
    backToHome: isEnglish ? "Back to home" : "Retour à l'accueil",
    title1: isEnglish ? "Submit your" : "Déposez votre",
    title2: isEnglish ? "request online" : "demande en ligne",
    subtitle: isEnglish
      ? "Fill out the form below and receive a personalized quote immediately."
      : "Remplissez le formulaire ci-dessous et recevez un devis personnalisé rapidement.",
    guideCta: isEnglish ? "Need help filling it out? Read our step-by-step guide" : "Besoin d'aide pour remplir ? Consultez notre guide pas à pas",
    guideHref: isEnglish ? "/en/blog/comment-remplir-declaration-impot-en-ligne-guide" : "/blog/comment-remplir-declaration-impot-en-ligne-guide",
    whichService: isEnglish ? "Which service interests you?" : "Quel service vous intéresse ?",
    changeService: isEnglish ? "Change service" : "Changer de service",
    taxTitle: isEnglish ? "Tax Declaration" : "Déclaration d'impôt",
    taxDesc: isEnglish
      ? "For individuals and self-employed. We prepare your declaration with all legal deductions."
      : "Pour particuliers et indépendants. Nous établissons votre déclaration avec toutes les déductions légales.",
    taxPrice: isEnglish ? "From CHF 89.-" : "Dès CHF 89.-",
    accountingTitle: isEnglish ? "Accounting" : "Comptabilité",
    accountingDesc: isEnglish
      ? "For self-employed and companies. Complete accounting management and financial statements."
      : "Pour indépendants et entreprises. Gestion comptable complète et établissement de vos bilans.",
    accountingPrice: isEnglish ? "From CHF 500.-/year" : "Dès CHF 500.-/an",
    otherTitle: isEnglish ? "Other request" : "Autre demande",
    otherDesc: isEnglish ? "Company creation, real estate gains, consulting..." : "Création d'entreprise, gain immobilier, conseil...",
      otherPrice: isEnglish ? "Free quote" : "Devis gratuit",
  };

  // Once a form is open, show a minimal header and footer: fewer exits while filling in.
  const inFunnel = serviceType === "tax" || serviceType === "accounting";

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {inFunnel ? (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href={isEnglish ? "/en" : "/"} className="flex items-baseline" aria-label="NeoFidu">
              <span className="text-2xl font-bold text-primary">neo</span>
              <span className="text-2xl font-bold text-foreground">fidu</span>
              <span className="text-sm font-medium ml-1 text-muted-foreground">.ch</span>
            </Link>
            <a
              href="mailto:contact@neofidu.ch"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isEnglish ? "A question? " : "Une question ? "}
              <span className="hidden sm:inline font-medium text-foreground">contact@neofidu.ch</span>
              <span className="sm:hidden font-medium text-foreground">{isEnglish ? "Email us" : "Écrivez-nous"}</span>
            </a>
          </div>
        </header>
      ) : (
        <Header />
      )}
      <div className={inFunnel ? "pt-24 pb-16" : "pt-28 pb-20"}>
        <div className="container mx-auto px-4">
          <BreadcrumbLight items={[{ label: "Déposer une demande" }]} className="mb-8" />

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
                  className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary group"
                  onClick={() => setServiceType("accounting")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <Calculator className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.accountingTitle}</h3>
                    <p className="text-muted-foreground mb-6">{t.accountingDesc}</p>
                    <div className="text-primary font-semibold">{t.accountingPrice}</div>
                  </div>
                </Card>

                <Card
                  className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary group relative"
                  onClick={() => router.push("/contact")}
                >
                  <Badge className="absolute top-4 right-4 bg-primary/10 text-primary">
                    6 cantons
                  </Badge>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <MessageCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.otherTitle}</h3>
                    <p className="text-muted-foreground mb-6">{t.otherDesc}</p>
                    <div className="text-primary font-semibold">{t.otherPrice}</div>
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
              <div className="text-center mb-6">
                <Link href={t.guideHref} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                  <FileText className="w-4 h-4" />
                  {t.guideCta}
                </Link>
              </div>
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
              <div className="text-center py-12"><p className="text-lg text-gray-600">{isEnglish ? "Redirecting..." : "Redirection..."}</p></div>
            </div>
          )}
        </div>
      </div>
      {inFunnel ? (
        <footer className="border-t border-border py-6">
          <div className="container mx-auto px-4 lg:pr-40 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} NeoFidu · Leysin</span>
            <div className="flex gap-4">
              <a href={isEnglish ? "/en/conditions-generales" : "/conditions-generales"} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {isEnglish ? "Terms" : "CGU"}
              </a>
              <a href={isEnglish ? "/en/politique-confidentialite" : "/politique-confidentialite"} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {isEnglish ? "Privacy" : "Vie privée"}
              </a>
              <a href={isEnglish ? "/en/mentions-legales" : "/mentions-legales"} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {isEnglish ? "Legal notice" : "Mentions légales"}
              </a>
            </div>
          </div>
        </footer>
      ) : (
        <Footer />
      )}
    </main>
  );
}
