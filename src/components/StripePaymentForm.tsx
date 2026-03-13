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
          layout: "tabs",
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
          {/* Visa / Mastercard */}
          <div className="inline-flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span className="text-gray-600">Visa / Mastercard</span>
          </div>
          {/* PayPal */}
          <div className="inline-flex items-center gap-1.5 bg-[#003087]/10 rounded-full px-3 py-1.5 text-xs">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#003087]" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
            </svg>
            <span className="text-[#003087] font-medium">PayPal</span>
          </div>
          {/* Klarna */}
          <div className="inline-flex items-center gap-1.5 bg-[#FFB3C7]/30 rounded-full px-3 py-1.5 text-xs">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0A0B09]" fill="currentColor">
              <path d="M4.592 2h14.816A2.592 2.592 0 0 1 22 4.592v14.816A2.592 2.592 0 0 1 19.408 22H4.592A2.592 2.592 0 0 1 2 19.408V4.592A2.592 2.592 0 0 1 4.592 2z"/>
            </svg>
            <span className="text-[#0A0B09] font-medium">Klarna</span>
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
