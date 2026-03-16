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
import {
  findTaxRequestByReference as findMemoryByRef,
} from "@/lib/tax-requests-store";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Map canton codes to names
function getCantonName(cantonCode: string): string {
  const cantonNames: Record<string, string> = {
    VD: "Vaud",
    VS: "Valais",
    GE: "Genève",
    NE: "Neuchâtel",
    JU: "Jura",
    FR: "Fribourg",
  };
  return cantonNames[cantonCode] || cantonCode;
}

/**
 * Admin API to resend confirmation email for an existing request
 * PROTECTED: Only accessible with admin password
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    console.log("📧 Admin: Renvoi email de confirmation pour:", reference);

    // Find the request
    let taxRequest: TaxRequestDB | null = null;

    if (isSupabaseConfigured()) {
      taxRequest = await findSupabaseByRef(reference);
    }

    if (!taxRequest) {
      const memoryRequest = findMemoryByRef(reference);
      if (memoryRequest) {
        taxRequest = memoryRequest as unknown as TaxRequestDB;
      }
    }

    if (!taxRequest) {
      return NextResponse.json(
        { error: `Request ${reference} not found` },
        { status: 404 }
      );
    }

    // Prepare email data
    const emailData: EmailData = {
      to: taxRequest.customer.email,
      customerName: `${taxRequest.customer.firstName} ${taxRequest.customer.lastName}`,
      amount: taxRequest.payment.amount,
      currency: taxRequest.payment.currency || "CHF",
      service: "Déclaration d'impôt",
      reference: taxRequest.reference,
      canton: getCantonName(taxRequest.fiscal.cantonCode),
      taxYear: String(taxRequest.fiscal.taxYear),
      taxpayerNumber: taxRequest.fiscal.taxpayerNumber,
    };

    let customerEmailSent = false;
    let adminEmailSent = false;
    let taxSummarySent = false;

    // 1. Send customer confirmation email
    try {
      const customerResult = await sendPaymentConfirmationEmail(emailData);
      if (customerResult.success) {
        customerEmailSent = true;
        console.log("📧 Email de confirmation envoyé au client:", taxRequest.customer.email);
      } else {
        console.error("❌ Erreur envoi email client:", customerResult.error);
      }
    } catch (emailError) {
      console.error("❌ Exception envoi email client:", emailError);
    }

    // 2. Send admin notification
    try {
      const adminResult = await sendAdminNotificationEmail(emailData);
      if (adminResult.success) {
        adminEmailSent = true;
        console.log("📧 Notification admin envoyée");
      } else {
        console.error("❌ Erreur envoi notification admin:", adminResult.error);
      }
    } catch (emailError) {
      console.error("❌ Exception envoi notification admin:", emailError);
    }

    // 3. Send tax summary
    try {
      const taxSummaryData: TaxSummaryData = {
        reference: taxRequest.reference,
        customerName: `${taxRequest.customer.firstName} ${taxRequest.customer.lastName}`,
        customerName2: taxRequest.customer.firstName2 && taxRequest.customer.lastName2
          ? `${taxRequest.customer.firstName2} ${taxRequest.customer.lastName2}`
          : undefined,
        customerEmail: taxRequest.customer.email,
        customerPhone: taxRequest.customer.phone,
        address: taxRequest.customer.address,
        canton: taxRequest.fiscal.canton,
        cantonCode: taxRequest.fiscal.cantonCode,
        taxYear: String(taxRequest.fiscal.taxYear),
        taxpayerNumber: taxRequest.fiscal.taxpayerNumber,
        declarationCode: taxRequest.fiscal.declarationCode,
        clientType: taxRequest.fiscal.clientType,
        employmentStatus: taxRequest.fiscal.employmentStatus,
        employmentStatus2: taxRequest.fiscal.employmentStatus2,
        hasMoved: taxRequest.situation?.hasMoved,
        hasChildren: taxRequest.situation?.hasChildren,
        childrenCount: taxRequest.situation?.childrenCount,
        monthlyRent: taxRequest.situation?.monthlyRent,
        hasPillar3a: taxRequest.financial?.hasPillar3a,
        pillar3aAmount: taxRequest.financial?.pillar3aAmount,
        hasStocks: taxRequest.financial?.hasStocks,
        stocksCount: taxRequest.financial?.stocksCount,
        hasGuardCosts: taxRequest.financial?.hasGuardCosts,
        guardCosts: taxRequest.financial?.guardCosts,
        hasAlimonyReceived: taxRequest.financial?.hasAlimonyReceived,
        alimonyReceived: taxRequest.financial?.alimonyReceived,
        hasAlimonyPaid: taxRequest.financial?.hasAlimonyPaid,
        alimonyPaid: taxRequest.financial?.alimonyPaid,
        hasDonations: taxRequest.financial?.hasDonations,
        donationsAmount: taxRequest.financial?.donationsAmount,
        hasDebts: taxRequest.financial?.hasDebts,
        debtsAmount: taxRequest.financial?.debtsAmount,
        hasProperty: taxRequest.property?.hasProperty,
        propertyCount: taxRequest.property?.propertyCount,
        hasMortgage: taxRequest.property?.hasMortgage,
        mortgageAmount: taxRequest.property?.mortgageAmount,
        hasRenovations: taxRequest.property?.hasRenovations,
        renovationsAmount: taxRequest.property?.renovationsAmount,
        workplaces: taxRequest.workplaces || [],
        deliveryMethod: taxRequest.options?.deliveryMethod,
        wantsReview: taxRequest.options?.wantsReview,
        deadline: taxRequest.options?.deadline,
        comments: taxRequest.options?.comments,
        documents: (taxRequest.documents || []).map(d => ({
          category: d.category,
          name: d.name,
          url: d.url,
        })),
        amount: taxRequest.payment.amount,
        currency: taxRequest.payment.currency || "CHF",
        paymentMethod: taxRequest.payment.method,
        paidAt: taxRequest.paid_at
          ? new Date(taxRequest.paid_at).toLocaleDateString('fr-CH', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : new Date().toLocaleDateString('fr-CH'),
      };

      const taxSummaryResult = await sendTaxSummaryEmail(taxSummaryData);
      if (taxSummaryResult.success) {
        taxSummarySent = true;
        console.log("📋 Fiche récapitulative fiscale envoyée à contact@neofidu.ch");
      } else {
        console.error("❌ Erreur envoi fiche fiscale:", taxSummaryResult.error);
      }
    } catch (taxSummaryError) {
      console.error("❌ Exception envoi fiche fiscale:", taxSummaryError);
    }

    return NextResponse.json({
      success: customerEmailSent || adminEmailSent || taxSummarySent,
      reference: taxRequest.reference,
      customerEmailSent,
      adminEmailSent,
      taxSummarySent,
      customerEmail: taxRequest.customer.email,
      message: customerEmailSent
        ? `Emails renvoyés avec succès à ${taxRequest.customer.email}`
        : "Erreur lors de l'envoi - vérifiez la configuration RESEND_API_KEY",
    });
  } catch (error) {
    console.error("Erreur API admin/resend-confirmation:", error);
    return NextResponse.json(
      { error: "Erreur lors du renvoi des confirmations" },
      { status: 500 }
    );
  }
}
