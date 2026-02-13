import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

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

// Mot de passe admin simple (en production, utiliser une vraie authentification)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "neofidu-admin-2024";

export async function GET(request: NextRequest) {
  try {
    // Vérification simple du mot de passe via header
    const authHeader = request.headers.get("x-admin-password");

    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const stripeInstance = getStripe();

    // Si Stripe n'est pas configuré, retourner des données de démonstration
    if (!stripeInstance) {
      return NextResponse.json({
        payments: getDemoPayments(),
        stats: {
          totalPayments: 5,
          totalRevenue: 450,
          successfulPayments: 4,
          failedPayments: 1,
          pendingPayments: 0,
        },
        demo: true,
      });
    }

    // Récupérer les paiements depuis Stripe
    const paymentIntents = await stripeInstance.paymentIntents.list({
      limit: 100,
      expand: ["data.payment_method"],
    });

    const payments = paymentIntents.data.map((pi) => ({
      id: pi.id,
      amount: pi.amount / 100,
      currency: pi.currency.toUpperCase(),
      status: pi.status,
      customerEmail: pi.receipt_email || pi.metadata?.customerEmail || "N/A",
      customerName: pi.metadata?.customerName || "N/A",
      description: pi.description || "N/A",
      paymentMethod: pi.payment_method_types?.[0] || "unknown",
      createdAt: new Date(pi.created * 1000).toISOString(),
      metadata: pi.metadata,
    }));

    // Statistiques
    const stats = {
      totalPayments: payments.length,
      totalRevenue: payments
        .filter((p) => p.status === "succeeded")
        .reduce((sum, p) => sum + p.amount, 0),
      successfulPayments: payments.filter((p) => p.status === "succeeded").length,
      failedPayments: payments.filter((p) => p.status === "requires_payment_method" || p.status === "canceled").length,
      pendingPayments: payments.filter((p) => p.status === "processing" || p.status === "requires_confirmation").length,
    };

    return NextResponse.json({
      payments,
      stats,
    });
  } catch (error) {
    console.error("Erreur récupération paiements:", error);

    // Si Stripe n'est pas configuré, retourner des données de démonstration
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        payments: getDemoPayments(),
        stats: {
          totalPayments: 5,
          totalRevenue: 450,
          successfulPayments: 4,
          failedPayments: 1,
          pendingPayments: 0,
        },
        demo: true,
      });
    }

    return NextResponse.json(
      { error: "Erreur lors de la récupération des paiements" },
      { status: 500 }
    );
  }
}

// Données de démonstration
function getDemoPayments() {
  return [
    {
      id: "pi_demo_001",
      amount: 150,
      currency: "CHF",
      status: "succeeded",
      customerEmail: "jean.dupont@example.com",
      customerName: "Jean Dupont",
      description: "Déclaration d'impôt 2025 - Vaud",
      paymentMethod: "card",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      metadata: { canton: "VD", service: "tax" },
    },
    {
      id: "pi_demo_002",
      amount: 100,
      currency: "CHF",
      status: "succeeded",
      customerEmail: "marie.martin@example.com",
      customerName: "Marie Martin",
      description: "Déclaration d'impôt 2025 - Genève",
      paymentMethod: "twint",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      metadata: { canton: "GE", service: "tax" },
    },
    {
      id: "pi_demo_003",
      amount: 80,
      currency: "CHF",
      status: "succeeded",
      customerEmail: "pierre.blanc@example.com",
      customerName: "Pierre Blanc",
      description: "Déclaration d'impôt 2025 - Valais",
      paymentMethod: "card",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      metadata: { canton: "VS", service: "tax" },
    },
    {
      id: "pi_demo_004",
      amount: 70,
      currency: "CHF",
      status: "requires_payment_method",
      customerEmail: "sophie.rouge@example.com",
      customerName: "Sophie Rouge",
      description: "Déclaration d'impôt 2025 - Neuchâtel",
      paymentMethod: "card",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      metadata: { canton: "NE", service: "tax" },
    },
    {
      id: "pi_demo_005",
      amount: 50,
      currency: "CHF",
      status: "succeeded",
      customerEmail: "luc.vert@example.com",
      customerName: "Luc Vert",
      description: "Déclaration d'impôt 2025 - Fribourg",
      paymentMethod: "twint",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      metadata: { canton: "FR", service: "tax" },
    },
  ];
}
