import { NextRequest, NextResponse } from "next/server";
import {
  sendPaymentConfirmationEmail,
  sendAdminNotificationEmail,
  sendTaxSummaryEmail,
  type EmailData,
  type TaxSummaryData,
} from "@/lib/email";
import {
  isSupabaseConfigured,
  findTaxRequestByReference as findSupabaseByRef,
  TaxRequestDB,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Admin endpoint to resend emails for a specific tax request
// POST /api/admin/resend-emails
// Body: { reference: "NF-XXXXX", adminSecret: "..." }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference, adminSecret } = body;

    // Simple auth check
    const expectedSecret = process.env.ADMIN_API_SECRET || process.env.STRIPE_WEBHOOK_SECRET;
    if (!adminSecret || adminSecret !== expectedSecret) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    if (!reference) {
      return NextResponse.json({ error: "Reference requise" }, { status: 400 });
    }

    // Check Resend configuration
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        error: "RESEND_API_KEY non configure dans Vercel",
        fix: "Allez dans Vercel > Settings > Environment Variables et ajoutez RESEND_API_KEY",
      }, { status: 500 });
    }

    // Find the tax request in Supabase
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase non configure" }, { status: 500 });
    }

    const taxRequest = await findSupabaseByRef(reference);
    if (!taxRequest) {
      return NextResponse.json({ error: "Demande non trouvee: " + reference }, { status: 404 });
    }

    const customerEmail = taxRequest.customer?.email;
    const customerName = taxRequest.customer?.firstName + " " + taxRequest.customer?.lastName;

    if (!customerEmail) {
      return NextResponse.json({ error: "Email client manquant dans la demande" }, { status: 400 });
    }

    const results: Record<string, unknown> = {};

    // 1. Send payment confirmation to customer
    const emailData: EmailData = {
      to: customerEmail,
      customerName: customerName,
      amount: taxRequest.price || 0,
      currency: "CHF",
      service: "Declaration d'impots",
      reference: taxRequest.reference,
      canton: taxRequest.canton || undefined,
      language: "fr",
    };

    try {
      const confirmResult = await sendPaymentConfirmationEmail(emailData);
      results.customerEmail = { success: confirmResult.success, to: customerEmail };
    } catch (err) {
      results.customerEmail = { success: false, error: String(err) };
    }

    // 2. Send admin notification
    try {
      const adminResult = await sendAdminNotificationEmail(emailData);
      results.adminEmail = { success: adminResult.success };
    } catch (err) {
      results.adminEmail = { success: false, error: String(err) };
    }

    // 3. Send tax summary if data available
    try {
      const taxSummaryData: TaxSummaryData = {
        reference: taxRequest.reference,
        customerName: customerName,
        customerEmail: customerEmail,
        canton: taxRequest.canton || "",
        taxYear: taxRequest.tax_year || "",
        taxpayerNumber: taxRequest.customer?.taxpayerNumber || "",
        clientType: taxRequest.client_type || "private",
        formData: taxRequest.form_data || {},
        documents: taxRequest.documents || [],
        price: taxRequest.price || 0,
        paidAt: taxRequest.paid_at || new Date().toISOString(),
      };
      const summaryResult = await sendTaxSummaryEmail(taxSummaryData);
      results.taxSummary = { success: summaryResult.success };
    } catch (err) {
      results.taxSummary = { success: false, error: String(err) };
    }

    return NextResponse.json({
      success: true,
      reference,
      customerEmail,
      results,
    });
  } catch (error) {
    console.error("Erreur resend-emails:", error);
    return NextResponse.json(
      { error: "Erreur interne", details: String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint to check email configuration status
export async function GET() {
  const config = {
    resendApiKey: !!process.env.RESEND_API_KEY,
    fromEmail: process.env.FROM_EMAIL || "NeoFidu <noreply@neofidu.ch>",
    adminEmail: process.env.ADMIN_EMAIL || "contact@neofidu.ch",
    stripeWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    stripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
    supabaseConfigured: isSupabaseConfigured(),
  };

  const issues: string[] = [];
  if (!config.resendApiKey) issues.push("RESEND_API_KEY manquant - les emails ne peuvent pas etre envoyes");
  if (!config.stripeWebhookSecret) issues.push("STRIPE_WEBHOOK_SECRET manquant - le webhook Stripe ne fonctionnera pas");
  if (!config.stripeSecretKey) issues.push("STRIPE_SECRET_KEY manquant - Stripe non configure");
  if (!config.supabaseConfigured) issues.push("Supabase non configure");

  return NextResponse.json({
    status: issues.length === 0 ? "ok" : "issues_found",
    config,
    issues,
    timestamp: new Date().toISOString(),
  });
}
