"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, Home, FileText, Mail, Clock, FileCheck, Send, AlertCircle, CalendarClock, ShieldCheck } from "lucide-react";
import { SuccessIllustration } from "@/components/Illustrations";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    // Stripe parameters
    const paymentIntent = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status");

    // Generate reference
    const ref = paymentIntent?.slice(-8).toUpperCase() || Math.random().toString(36).substr(2, 8).toUpperCase();
    setReference(ref);

    // Handle Stripe redirects
    if (redirectStatus === "succeeded") {
      setStatus("success");
      setMessage("Votre paiement a été confirmé avec succès !");
    } else if (redirectStatus === "processing") {
      setStatus("loading");
      setMessage("Votre paiement est en cours de traitement...");
    } else if (redirectStatus === "requires_payment_method") {
      setStatus("error");
      setMessage("Le paiement a échoué. Veuillez réessayer.");
    } else if (paymentIntent) {
      // Vérifier le statut via l'API si nécessaire
      setStatus("success");
      setMessage("Paiement reçu !");
    } else {
      // Accès direct à la page sans paramètres de paiement valides
      setStatus("error");
      setMessage("Aucun paiement détecté. Veuillez compléter le processus de paiement.");
    }
  }, [searchParams]);

  return (
    <Card className="p-8 md:p-12 text-center">
      {status === "loading" && (
        <>
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-primary" />
          <h1 className="text-2xl font-bold mb-4">Traitement en cours...</h1>
          <p className="text-muted-foreground">{message}</p>
        </>
      )}

      {status === "success" && (
        <>
          <SuccessIllustration className="w-40 h-40 mx-auto mb-6" />
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Paiement confirmé !
          </h1>
          <p className="text-muted-foreground text-lg mb-8">{message}</p>

          <div className="bg-primary/5 rounded-2xl p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Référence de transaction
            </p>
            <p className="font-mono font-semibold">
              #NF-{reference}
            </p>
          </div>

          {/* Timeline détaillée du processus */}
          <div className="text-left mb-8">
            <h3 className="font-bold text-xl mb-6 text-center">Et maintenant, que se passe-t-il ?</h3>

            {/* Étape 1: Confirmation immédiate */}
            <div className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-l-0">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Maintenant</span>
                </div>
                <h4 className="font-medium mb-1">Email de confirmation de paiement</h4>
                <p className="text-sm text-muted-foreground">
                  Vous recevez immédiatement un email confirmant la réception de votre paiement et de vos documents.
                  Votre dossier est maintenant entre nos mains.
                </p>
              </div>
            </div>

            {/* Étape 2: Analyse du dossier */}
            <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary rounded-full border-2 border-white" />
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Sous 24-48h</span>
                </div>
                <h4 className="font-medium mb-1">Analyse de votre dossier</h4>
                <p className="text-sm text-muted-foreground">
                  Un conseiller fiscal vérifie la complétude de vos documents.
                  Si des pièces manquent ou sont illisibles, nous vous contactons par email pour les obtenir.
                </p>
              </div>
            </div>

            {/* Étape 3: Préparation et envoi direct */}
            <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">5 à 10 jours ouvrés</span>
                </div>
                <h4 className="font-medium mb-1">Établissement et envoi de votre déclaration</h4>
                <p className="text-sm text-muted-foreground">
                  Nous remplissons votre déclaration d'impôts en optimisant toutes les déductions possibles,
                  puis nous l'<strong>envoyons directement à l'administration fiscale</strong> de votre canton.
                </p>
              </div>
            </div>

            {/* Étape 4: Envoi quittance au client */}
            <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-white" />
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Après soumission</span>
                </div>
                <h4 className="font-medium mb-1">Réception de votre quittance</h4>
                <p className="text-sm text-muted-foreground">
                  Une fois la déclaration soumise, vous recevez par email votre <strong>quittance officielle</strong>
                  ainsi qu'une copie complète de la déclaration envoyée. Conservez ces documents.
                </p>
              </div>
            </div>

            {/* Étape 5: Réponse administration */}
            <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-white" />
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarClock className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">2 à 6 mois</span>
                </div>
                <h4 className="font-medium mb-1">Retour de l'administration fiscale</h4>
                <p className="text-sm text-muted-foreground">
                  Vous recevrez directement de l'administration : la <strong>décision de taxation</strong> (avis d'imposition)
                  et les <strong>bulletins de versement</strong> pour le paiement de vos impôts.
                </p>
              </div>
            </div>

            {/* Étape 6: Délai de réclamation */}
            <div className="relative pl-8">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white" />
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">30 jours après réception</span>
                </div>
                <h4 className="font-medium mb-1">Délai de réclamation</h4>
                <p className="text-sm text-muted-foreground">
                  Si vous n'êtes pas d'accord avec la taxation, vous disposez de <strong>30 jours</strong> pour
                  déposer une réclamation auprès de l'administration. Contactez-nous si besoin, nous pouvons vous accompagner.
                </p>
              </div>
            </div>
          </div>

          {/* Encadré important */}
          <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Notre engagement</h4>
                <p className="text-sm text-muted-foreground">
                  Nous restons disponibles après l'envoi de votre déclaration. En cas de question de l'administration
                  ou de demande de justificatifs supplémentaires, contactez-nous et nous vous assisterons.
                </p>
              </div>
            </div>
          </div>

          {/* Suivi de demande */}
          <div className="bg-secondary/50 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Suivez votre demande</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Vous pouvez consulter l'état d'avancement de votre dossier à tout moment.
                </p>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href="/suivi">
                    Accéder au suivi
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="rounded-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/blog">
                <FileText className="w-4 h-4 mr-2" />
                Lire nos articles
              </Link>
            </Button>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Paiement échoué
          </h1>
          <p className="text-muted-foreground text-lg mb-8">{message}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="rounded-full">
              <Link href="/demande">Réessayer</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/#contact">Nous contacter</Link>
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

function ConfirmationLoading() {
  return (
    <Card className="p-8 md:p-12 text-center">
      <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-primary" />
      <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
    </Card>
  );
}

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Suspense fallback={<ConfirmationLoading />}>
              <ConfirmationContent />
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
