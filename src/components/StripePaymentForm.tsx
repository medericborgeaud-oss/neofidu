"use client";

import { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Loader2, AlertCircle } from "lucide-react";

// Charger Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface StripePaymentFormProps {
  amount: number; // en CHF (pas en centimes)
  customerEmail: string;
  customerName: string;
  description?: string;
  metadata?: Record<string, string>;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

// Composant interne pour le formulaire de paiement
function CheckoutForm({
  amount,
  onSuccess,
  onError,
}: {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    // Remove beforeunload handler to prevent scary dialog on redirect (e.g. TWINT)
    window.onbeforeunload = null;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/demande/confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Une erreur est survenue");
      onError(error.message || "Erreur de paiement");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id);
    } else if (paymentIntent && paymentIntent.status === "processing") {
      setMessage("Paiement en cours de traitement...");
    } else {
      setMessage("Statut inattendu du paiement");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "accordion",
          defaultValues: {
            billingDetails: {
              address: {
                country: "CH",
              },
            },
          },
          terms: {
            card: "never",
          },
          wallets: {
            applePay: "never",
            googlePay: "never",
          },
        }}
      />

      {message && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{message}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full rounded-full py-6 text-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Payer CHF {amount}.-
          </>
        )}
      </Button>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground">Moyens de paiement acceptés</span>
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Visa */}
            <div className="inline-flex items-center bg-white rounded-md px-2 py-1 border border-gray-200">
              <img src="/payment-logos/visa.svg" alt="Visa" className="h-6" />
            </div>
            {/* Mastercard */}
            <div className="inline-flex items-center bg-white rounded-md px-2 py-1 border border-gray-200">
              <img src="/payment-logos/mastercard.svg" alt="Mastercard" className="h-6" />
            </div>
          {/* PayPal */}
            <div className="inline-flex items-center bg-white rounded-md px-2 py-1 border border-gray-200">
              <img src="/payment-logos/paypal.svg" alt="PayPal" className="h-6" />
            </div>
          {/* Klarna */}
            <div className="inline-flex items-center bg-white rounded-md px-2 py-1 border border-gray-200">
              <img src="/payment-logos/klarna.svg" alt="Klarna" className="h-6" />
            </div>
          {/* TWINT */}
            <div className="inline-flex items-center bg-white rounded-md px-2 py-1 border border-gray-200">
              <img src="/payment-logos/twint.svg" alt="TWINT" className="h-6" />
            </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground opacity-50">Paiement sécurisé par Stripe</span>
        </div>
      </div>
    </form>
  );
}

// Composant principal exporté
export function StripePaymentForm({
  amount,
  customerEmail,
  customerName,
  description,
  metadata,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Créer le PaymentIntent au chargement
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100, // Convertir en centimes
            currency: "chf",
            customerEmail,
            customerName,
            description,
            metadata,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erreur lors de la création du paiement");
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        setError(errorMessage);
        onError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, customerEmail, customerName, description, metadata, onError]);

  if (!stripePromise) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Configuration requise</h3>
          <p className="text-muted-foreground text-sm">
            Les clés Stripe ne sont pas configurées.<br />
            Veuillez ajouter NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY dans vos variables d'environnement.
          </p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Préparation du paiement...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Erreur</h3>
          <p className="text-muted-foreground text-sm">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Réessayer
          </Button>
        </div>
      </Card>
    );
  }

  if (!clientSecret) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-5 h-5 text-primary" />
        <span className="font-semibold">Paiement sécurisé</span>
        <Badge variant="secondary" className="ml-auto">
          CHF {amount}.-
        </Badge>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#0d9488",
              colorBackground: "#ffffff",
              colorText: "#1f2937",
              colorDanger: "#ef4444",
              fontFamily: "system-ui, sans-serif",
              borderRadius: "12px",
              spacingUnit: "4px",
            },
            rules: {
              ".Input": {
                borderRadius: "12px",
                padding: "12px",
              },
              ".Tab": {
                borderRadius: "12px",
              },
              ".Tab--selected": {
                backgroundColor: "#f0fdfa",
                borderColor: "#0d9488",
              },
            },
          },
          locale: "fr",
        }}
      >
        <CheckoutForm amount={amount} onSuccess={onSuccess} onError={onError} />
      </Elements>
    </Card>
  );
}
