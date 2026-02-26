"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, Home, FileText } from "lucide-react";
import { SuccessIllustration } from "@/components/Illustrations";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status");

    // Generate reference
    const ref = paymentIntent?.slice(-8).toUpperCase() || Math.random().toString(36).substr(2, 8).toUpperCase();
    setReference(ref);

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

          <div className="space-y-4 text-left bg-secondary/50 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold">Prochaines étapes :</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Vous recevrez un email de confirmation sous peu</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Un conseiller analysera votre dossier dans les 24h</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Nous vous contacterons si des documents supplémentaires sont nécessaires</span>
              </li>
            </ul>
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
