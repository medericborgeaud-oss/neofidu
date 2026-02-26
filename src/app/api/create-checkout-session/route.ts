import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

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
        { error: "Stripe non configure" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { requestId, requestType, amount, customerEmail, customerName, description } = body;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Montant minimum CHF 1" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = baseUrl + "/demande/confirmation?session_id={CHECKOUT_SESSION_ID}&type=" + requestType;
    const cancelUrl = baseUrl + "/demande/prolongation?canceled=true";

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: [{
        price_data: {
          currency: "chf",
          product_data: { name: description || "Prestation NeoFidu" },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { requestId, requestType, customerName, customerEmail },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Erreur paiement" }, { status: 500 });
  }
}
