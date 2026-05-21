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
        { error: "Stripe non configurÃ©. Veuillez configurer les clÃ©s API Stripe." },
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

    // CrÃ©er le PaymentIntent pour carte bancaire
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount), // Montant en centimes
      currency: currency.toLowerCase(),
      automatic_payment_methods: { enabled: true },
      receipt_email: customerEmail,
      description: description || "Prestation NeoFidu",
      metadata: {
        customerName,
        customerEmail,
        ...metadata,
      },
    });

    // Si c'est une dÃ©claration fiscale, lier le PaymentIntent Ã  la demande
    if (metadata?.taxRequestReference) {
      console.log("ð Tentative de liaison PaymentIntent Ã  la demande:", metadata.taxRequestReference);

      // Utiliser Supabase si configurÃ©, sinon fallback sur le store en mÃ©moire
      if (isSupabaseConfigured()) {
        const taxRequest = await findSupabaseByRef(metadata.taxRequestReference);
        if (taxRequest) {
          const updated = await updateSupabasePayment(taxRequest.reference, paymentIntent.id);
          if (updated) {
            console.log("â PaymentIntent liÃ© Ã  la demande fiscale (Supabase):", metadata.taxRequestReference, "->", paymentIntent.id);
          } else {
            console.error("â Ãchec de la mise Ã  jour du PaymentIntent dans Supabase");
          }
        } else {
          console.warn("â ï¸ Demande fiscale non trouvÃ©e dans Supabase:", metadata.taxRequestReference);
        }
      } else {
        // Fallback: store en mÃ©moire
        const taxRequest = findMemoryByRef(metadata.taxRequestReference);
        if (taxRequest) {
          updateMemoryPayment(taxRequest.reference, paymentIntent.id);
          console.log("ð PaymentIntent liÃ© Ã  la demande fiscale (mÃ©moire):", metadata.taxRequestReference);
        } else {
          console.warn("â ï¸ Demande fiscale non trouvÃ©e en mÃ©moire:", metadata.taxRequestReference);
        }
      }
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Erreur crÃ©ation PaymentIntent:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la crÃ©ation du paiement" },
      { status: 500 }
    );
  }
}
