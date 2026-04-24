import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

/**
 * Diagnostic API - Check configuration status
 * PROTECTED: Only accessible with admin password
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin password
    const adminPassword = request.headers.get("x-admin-password");
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
    }
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (adminPassword !== expectedPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const config = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,

      // Stripe configuration
      stripe: {
        secretKey: !!process.env.STRIPE_SECRET_KEY,
        publishableKey: !!process.env.STRIPE_PUBLISHABLE_KEY,
        webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
        status: process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET ? "✅ Configuré" : "❌ Non configuré",
      },

      // storage configuration
      storage: {
        cloudName: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        apiKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        apiSecret: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        status: process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY
          ? "✅ Configuré"
          : "❌ Non configuré - Documents en mode SIMULATION",
        cloudNameValue: process.env.NEXT_PUBLIC_SUPABASE_URL || "NON DÉFINI",
      },

      // Supabase configuration
      supabase: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        serviceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        status: process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
          ? "✅ Configuré"
          : "❌ Non configuré - Données en MÉMOIRE uniquement",
      },

      // Resend (email) configuration
      email: {
        resendApiKey: !!process.env.RESEND_API_KEY,
        fromEmail: process.env.FROM_EMAIL || "NeoFidu <noreply@neofidu.ch>",
        adminEmail: process.env.ADMIN_EMAIL || "contact@neofidu.ch",
        status: process.env.RESEND_API_KEY
          ? "✅ Configuré"
          : "❌ Non configuré - Emails NON ENVOYÉS",
      },

      // Admin configuration
      admin: {
        username: !!process.env.ADMIN_USERNAME,
        password: !!process.env.ADMIN_PASSWORD,
        status: process.env.ADMIN_PASSWORD ? "✅ Mot de passe personnalisé" : "⚠️ Mot de passe par défaut",
      },

      // Summary of issues
      issues: [] as string[],
    };

    // Collect issues
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      config.issues.push("🔴 storage: Variables manquantes - Les documents ne seront PAS uploadés");
    }

    if (!process.env.RESEND_API_KEY) {
      config.issues.push("🔴 RESEND: API key manquante - Les emails ne seront PAS envoyés");
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      config.issues.push("🔴 STRIPE: Webhook secret manquant - Les notifications de paiement ne fonctionneront PAS");
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      config.issues.push("⚠️ SUPABASE: Non configuré - Données stockées en mémoire (perdues au redémarrage)");
    }

    // Instructions
    const instructions = {
      storage: {
        step1: "Créer un compte sur https://storage.com",
        step2: "Aller dans Settings > API Keys",
        step3: "Copier Cloud name, API Key et API Secret",
        step4: "Ajouter dans GitHub: Repository > Settings > Secrets and variables > Actions",
        variables: ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
      },
      resend: {
        step1: "Créer un compte sur https://resend.com",
        step2: "Aller dans API Keys > Create API Key",
        step3: "Copier la clé API",
        step4: "Ajouter dans GitHub Secrets: RESEND_API_KEY=re_xxx",
        step5: "IMPORTANT: Vérifier le domaine neofidu.ch dans Resend > Domains",
      },
      stripeWebhook: {
        step1: "Aller dans Stripe Dashboard > Developers > Webhooks",
        step2: "Cliquer sur 'Add endpoint'",
        step3: "URL: https://neofidu.ch/api/webhooks/stripe",
        step4: "Événements à écouter: payment_intent.succeeded, payment_intent.payment_failed, charge.refunded",
        step5: "Copier le Signing secret (whsec_xxx) et l'ajouter dans GitHub Secrets: STRIPE_WEBHOOK_SECRET",
      },
    };

    return NextResponse.json({
      ...config,
      instructions,
      recommendation: config.issues.length > 0
        ? "⚠️ Configuration incomplète - Suivez les instructions ci-dessus"
        : "✅ Tout est configuré correctement",
    });
  } catch (error) {
    console.error("Error in config debug:", error);
    return NextResponse.json({ error: "Erreur diagnostic" }, { status: 500 });
  }
}
