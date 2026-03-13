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
  updateTaxRequestStatus as updateSupabase,
  TaxRequestDB,
} from "@/lib/supabase";
import {
  findTaxRequestByReference as findMemoryByRef,
  updateTaxRequestStatus as updateMemory,
} from "@/lib/tax-requests-store";
import { uploadPDFToCloudinary, getCloudinaryFolderUrl } from "@/lib/cloudinary";
import { generateTaxSummaryPDF } from "@/lib/pdf-generator";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Map service codes to display names
function getServiceDisplayName(serviceCode: string): string {
  const serviceNames: Record<string, string> = {
    tax: "Déclaration d'impôt",
    accounting: "Comptabilité",
    property: "Gérance immobilière",
  };
  return serviceNames[serviceCode] || serviceCode;
}

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
 * API endpoint to send confirmation emails directly after payment
 * This is a FALLBACK mechanism when the Stripe webhook fails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      reference,
      paymentIntentId,
      customerEmail,
      customerName,
      amount,
      currency = "CHF",
      service = "tax",
      canton,
      cantonCode,
      taxYear,
      taxpayerNumber,
      clientType,
      language = "fr",
    } = body;

    // Validation
    if (!reference || !customerEmail || !customerName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("📧 API send-confirmation appelée pour:", reference);

    // Prepare email data
    const emailData: EmailData = {
      to: customerEmail,
      customerName: customerName,
      amount: amount,
      currency: currency,
      service: getServiceDisplayName(service),
      reference: reference,
      canton: cantonCode ? getCantonName(cantonCode) : canton,
      taxYear: taxYear ? String(taxYear) : undefined,
      taxpayerNumber: taxpayerNumber || undefined,
      language: language as "fr" | "en",
    };

    let customerEmailSent = false;
    let adminEmailSent = false;
    let taxSummarySent = false;

    // 1. Send customer confirmation email
    try {
      const customerResult = await sendPaymentConfirmationEmail(emailData);
      if (customerResult.success) {
        customerEmailSent = true;
        console.log("📧 Email de confirmation envoyé au client:", customerEmail);
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

    // 3. For tax service, find the full request and send the tax summary
    if (service === "tax") {
      try {
        let taxRequest: TaxRequestDB | null = null;

        // Try Supabase first
        if (isSupabaseConfigured()) {
          taxRequest = await findSupabaseByRef(reference);
        }

        // Fallback to memory
        if (!taxRequest) {
          const memoryRequest = findMemoryByRef(reference);
          if (memoryRequest) {
            taxRequest = memoryRequest as unknown as TaxRequestDB;
          }
        }

        if (taxRequest) {
          // Update status to paid
          const paidAt = new Date().toISOString();
          if (isSupabaseConfigured()) {
            await updateSupabase(taxRequest.id, "paid", paidAt);
          } else {
            updateMemory(taxRequest.reference, "paid", new Date());
          }

          // Prepare tax summary data
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
            // Activité indépendante
            isIndependent: taxRequest.fiscal?.isIndependent,
            businessType: taxRequest.business?.businessType,
            businessStartDate: taxRequest.business?.businessStartDate,
            hasIDE: taxRequest.business?.hasIDE,
            ideNumber: taxRequest.business?.ideNumber,
            isRegisteredRC: taxRequest.business?.isRegisteredRC,
            hasVAT: taxRequest.business?.hasVAT,
            vatNumber: taxRequest.business?.vatNumber,
            hasBusinessAccounts: taxRequest.business?.hasBusinessAccounts,
            businessRevenue: taxRequest.business?.businessRevenue,
            businessExpenses: taxRequest.business?.businessExpenses,
            businessNetIncome: taxRequest.business?.businessNetIncome,
            hasAVSIndependent: taxRequest.business?.hasAVSIndependent,
            avsIndependentAmount: taxRequest.business?.avsIndependentAmount,
            hasLPPVoluntary: taxRequest.business?.hasLPPVoluntary,
            lppVoluntaryAmount: taxRequest.business?.lppVoluntaryAmount,
            hasBusinessVehicle: taxRequest.business?.hasBusinessVehicle,
            businessVehiclePercent: taxRequest.business?.businessVehiclePercent,
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
            amount: amount,
            currency: currency,
            paymentMethod: "card",
            paidAt: new Date().toLocaleDateString(language === 'en' ? 'en-GB' : 'fr-CH', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            language: language as "fr" | "en",
          };

          // Generate and upload PDF
          try {
            console.log("📄 Génération du PDF de la fiche récapitulative...");
            const pdfBuffer = await generateTaxSummaryPDF(taxSummaryData);
            console.log("📄 PDF généré avec succès, taille:", pdfBuffer.length, "bytes");

            const uploadResult = await uploadPDFToCloudinary(
              pdfBuffer,
              taxRequest.reference,
              taxRequest.customer.lastName,
              taxRequest.customer.firstName
            );
            if (uploadResult) {
              console.log("📁 Fiche récapitulative PDF sauvegardée dans Cloudinary:", uploadResult.secure_url);
            }
          } catch (pdfError) {
            console.error("❌ Erreur génération/upload PDF:", pdfError);
          }

          // Send tax summary email
          const taxSummaryResult = await sendTaxSummaryEmail(taxSummaryData);
          if (taxSummaryResult.success) {
            taxSummarySent = true;
            console.log("📋 Fiche récapitulative fiscale envoyée à contact@neofidu.ch");
          } else {
            console.error("❌ Erreur envoi fiche fiscale:", taxSummaryResult.error);
          }
        } else {
          console.warn("⚠️ Demande fiscale non trouvée pour:", reference);
        }
      } catch (taxSummaryError) {
        console.error("❌ Exception envoi fiche fiscale:", taxSummaryError);
      }
    }

    return NextResponse.json({
      success: true,
      customerEmailSent,
      adminEmailSent,
      taxSummarySent,
      message: customerEmailSent
        ? "Emails de confirmation envoyés"
        : "Erreur lors de l'envoi des emails - vérifiez la configuration RESEND_API_KEY",
    });
  } catch (error) {
    console.error("Erreur API send-confirmation:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi des confirmations" },
      { status: 500 }
    );
  }
}
