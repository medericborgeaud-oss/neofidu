import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  isSupabaseConfigured,
  findTaxRequestByReference as findSupabaseByRef,
  updateTaxRequestPayment as updateSupabasePayment,
} from "@/lib/supabase";
import {
  findTaxRequestByReference as findMemoryByRef,
  updateTaxRequestPayment as updateMemoryPayment,
} from "@/lib/tax-requests-store";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Lazy initialization of Stripe to avoid build errors
let stripe: Stripe | null = null;

function getStripe(): Stripe | null {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

export async function POST(request: NextRequest) {
  try {
    const stripeInstance = getStripe();

    if (!stripeInstance) {
      return NextResponse.json(
        { error: "Stripe non configuré. Veuillez configurer les clés API Stripe." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      amount,
      currency = "chf",
      customerEmail,
      customerName,
      description,
      metadata,
    } = body;

    // Validation
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Le montant minimum est de CHF 1.00" },
        { status: 400 }
      );
    }

    if (!customerEmail || !customerName) {
      return NextResponse.json(
        { error: "Email et nom du client requis" },
        { status: 400 }
      );
    }

    // Créer le PaymentIntent pour carte bancaire
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount), // Montant en centimes
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],
      receipt_email: customerEmail,
      description: description || "Prestation NeoFidu",
      metadata: {
        customerName,
        customerEmail,
        ...metadata,
      },
    });

    // Si c'est une déclaration fiscale, lier le PaymentIntent à la demande
    if (metadata?.taxRequestReference) {
      console.log("📋 Tentative de liaison PaymentIntent à la demande:", metadata.taxRequestReference);

      // Utiliser Supabase si configuré, sinon fallback sur le store en mémoire
      if (isSupabaseConfigured()) {
        const taxRequest = await findSupabaseByRef(metadata.taxRequestReference);
        if (taxRequest) {
          const updated = await updateSupabasePayment(taxRequest.reference, paymentIntent.id);
          if (updated) {
            console.log("✅ PaymentIntent lié à la demande fiscale (Supabase):", metadata.taxRequestReference, "->", paymentIntent.id);
          } else {
            console.error("❌ Échec de la mise à jour du PaymentIntent dans Supabase");
          }
        } else {
          console.warn("⚠️ Demande fiscale non trouvée dans Supabase:", metadata.taxRequestReference);
        }
      } else {
        // Fallback: store en mémoire
        const taxRequest = findMemoryByRef(metadata.taxRequestReference);
        if (taxRequest) {
          updateMemoryPayment(taxRequest.reference, paymentIntent.id);
          console.log("📋 PaymentIntent lié à la demande fiscale (mémoire):", metadata.taxRequestReference);
        } else {
          console.warn("⚠️ Demande fiscale non trouvée en mémoire:", metadata.taxRequestReference);
        }
      }
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Erreur création PaymentIntent:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
