import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { findTaxRequestByReference, updateTaxRequestPayment } from "@/lib/tax-requests-store";

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

    // Créer le PaymentIntent avec carte ET TWINT activés
    // TWINT est disponible uniquement pour CHF en Suisse
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount), // Montant en centimes
      currency: currency.toLowerCase(),
      // Activer carte et TWINT explicitement
      payment_method_types: ["card", "twint"],
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
      const taxRequest = findTaxRequestByReference(metadata.taxRequestReference);
      if (taxRequest) {
        updateTaxRequestPayment(taxRequest.reference, paymentIntent.id);
        console.log("📋 PaymentIntent lié à la demande fiscale:", metadata.taxRequestReference);
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
