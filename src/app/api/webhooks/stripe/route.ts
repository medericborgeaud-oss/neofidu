import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { paymentsStore, type PaymentRecord } from "@/lib/payments-store";
import {
  sendPaymentConfirmationEmail,
  sendAdminNotificationEmail,
  sendTaxSummaryEmail,
  type EmailData,
  type TaxSummaryData,
} from "@/lib/email";
import {
  findTaxRequestByPaymentIntent as findInMemory,
  findTaxRequestByReference as findInMemoryByRef,
  updateTaxRequestStatus as updateInMemory,
} from "@/lib/tax-requests-store";
import {
  isSupabaseConfigured,
  findTaxRequestByPaymentIntent as findSupabase,
  findTaxRequestByReference as findSupabaseByRef,
  updateTaxRequestStatus as updateSupabase,
  TaxRequestDB,
} from "@/lib/supabase";
import { uploadPDFToCloudinary, getCloudinaryFolderUrl } from "@/lib/cloudinary";
import { generateTaxSummaryPDF } from "@/lib/pdf-generator";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// GET handler for testing endpoint availability
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Stripe webhook endpoint is active. Use POST method for webhook events.",
    timestamp: new Date().toISOString(),
  });
}

// Lazy initialization of Stripe to avoid build errors
let stripe: Stripe | null = null;

function getStripe(): Stripe | null {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

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

export async function POST(request: NextRequest) {
  try {
    const stripeInstance = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeInstance || !webhookSecret) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripeInstance.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Traiter les différents événements
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("✅ Paiement réussi:", paymentIntent.id);

        // Générer la référence
        const reference = paymentIntent.metadata?.taxRequestReference || `NF-${paymentIntent.id.slice(-8).toUpperCase()}`;

        // 🔒 PROTECTION CONTRE LES DOUBLONS
        // Vérifier si ce paiement a déjà été traité
        const existingPayment = paymentsStore.find(p => p.paymentIntentId === paymentIntent.id);
        if (existingPayment && existingPayment.status === "succeeded") {
          console.log("⚠️ Paiement déjà traité, ignoré:", paymentIntent.id);
          return NextResponse.json({ received: true, status: "already_processed" });
        }

        // Vérifier aussi dans Supabase si la demande est déjà marquée comme payée
        if (isSupabaseConfigured() && paymentIntent.metadata?.taxRequestReference) {
          const existingRequest = await findSupabaseByRef(paymentIntent.metadata.taxRequestReference);
          if (existingRequest && existingRequest.status === "paid") {
            console.log("⚠️ Demande déjà payée dans Supabase, emails non renvoyés:", paymentIntent.metadata.taxRequestReference);
            return NextResponse.json({ received: true, status: "already_paid" });
          }
        }

        // Enregistrer le paiement
        const payment: PaymentRecord = {
          id: `pay_${Date.now()}`,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
          status: "succeeded",
          customerEmail: paymentIntent.receipt_email || paymentIntent.metadata?.customerEmail || "",
          customerName: paymentIntent.metadata?.customerName || "",
          description: paymentIntent.description || "",
          paymentMethod: paymentIntent.payment_method_types?.[0] || "unknown",
          createdAt: new Date(),
          metadata: paymentIntent.metadata as Record<string, string>,
        };

        paymentsStore.unshift(payment);

        // ✉️ ENVOI DES EMAILS UNIQUEMENT APRÈS CONFIRMATION DU PAIEMENT
        const customerEmail = paymentIntent.receipt_email || paymentIntent.metadata?.customerEmail;
        const customerName = paymentIntent.metadata?.customerName || "Client";
        const serviceCode = paymentIntent.metadata?.service || "tax";
        const cantonCode = paymentIntent.metadata?.canton;
        const taxYear = paymentIntent.metadata?.taxYear;
        const taxpayerNumber = paymentIntent.metadata?.taxpayerNumber;
        const language = (paymentIntent.metadata?.language as "fr" | "en") || "fr";

        if (customerEmail) {
          const emailData: EmailData = {
            to: customerEmail,
            customerName: customerName,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency.toUpperCase(),
            service: getServiceDisplayName(serviceCode),
            reference: reference,
            canton: cantonCode ? getCantonName(cantonCode) : undefined,
            description: paymentIntent.description || undefined,
            taxYear: taxYear || undefined,
            taxpayerNumber: taxpayerNumber || undefined,
            language: language,
          };

          // Envoyer l'email de confirmation au client
          try {
            const customerEmailResult = await sendPaymentConfirmationEmail(emailData);
            if (customerEmailResult.success) {
              console.log("📧 Email de confirmation envoyé au client:", customerEmail);
            } else {
              console.error("❌ Erreur envoi email client:", customerEmailResult.error);
            }
          } catch (emailError) {
            console.error("❌ Exception envoi email client:", emailError);
          }

          // Envoyer la notification à l'admin
          try {
            const adminEmailResult = await sendAdminNotificationEmail(emailData);
            if (adminEmailResult.success) {
              console.log("📧 Notification admin envoyée");
            } else {
              console.error("❌ Erreur envoi notification admin:", adminEmailResult.error);
            }
          } catch (emailError) {
            console.error("❌ Exception envoi notification admin:", emailError);
          }

          // 📋 ENVOYER LA FICHE RÉCAPITULATIVE FISCALE SI C'EST UNE DÉCLARATION D'IMPÔTS
          if (serviceCode === "tax") {
            try {
              // Chercher la demande - d'abord dans Supabase, sinon en mémoire
              let taxRequest: TaxRequestDB | null = null;

              if (isSupabaseConfigured()) {
                taxRequest = await findSupabase(paymentIntent.id);
                if (!taxRequest && paymentIntent.metadata?.taxRequestReference) {
                  taxRequest = await findSupabaseByRef(paymentIntent.metadata.taxRequestReference);
                }
              }

              // Fallback to in-memory store
              if (!taxRequest) {
                const memoryRequest = findInMemory(paymentIntent.id) ||
                  (paymentIntent.metadata?.taxRequestReference ? findInMemoryByRef(paymentIntent.metadata.taxRequestReference) : null);
                if (memoryRequest) {
                  taxRequest = memoryRequest as unknown as TaxRequestDB;
                }
              }

              if (taxRequest) {
                // Mettre à jour le statut
                const paidAt = new Date().toISOString();
                if (isSupabaseConfigured()) {
                  await updateSupabase(taxRequest.id, "paid", paidAt);
                } else {
                  updateInMemory(taxRequest.reference, "paid", new Date());
                }

                // Préparer les données pour la fiche récapitulative
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
                  hasSoldStocks: taxRequest.financial?.hasSoldStocks,
                  soldStocksDetails: taxRequest.financial?.soldStocksDetails,
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
                  hasSoldProperty: taxRequest.property?.hasSoldProperty,
                  soldPropertyDetails: taxRequest.property?.soldPropertyDetails,
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
                  amount: paymentIntent.amount / 100,
                  currency: paymentIntent.currency.toUpperCase(),
                  paymentMethod: paymentIntent.payment_method_types?.[0],
                  paidAt: new Date().toLocaleDateString(language === 'en' ? 'en-GB' : 'fr-CH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }),
                  language: language,
                };

                // 📁 Générer et sauvegarder la fiche récapitulative PDF dans Cloudinary
                try {
                  console.log("📄 Génération du PDF de la fiche récapitulative...");
                  const pdfBuffer = await generateTaxSummaryPDF(taxSummaryData);
                  console.log("📄 PDF généré avec succès, taille:", pdfBuffer.length, "bytes");

                  // Use customer name for folder naming
                  const customerLastName = taxRequest.customer.lastName;
                  const customerFirstName = taxRequest.customer.firstName;

                  const uploadResult = await uploadPDFToCloudinary(
                    pdfBuffer,
                    taxRequest.reference,
                    customerLastName,
                    customerFirstName
                  );
                  if (uploadResult) {
                    console.log("📁 Fiche récapitulative PDF sauvegardée dans Cloudinary:", uploadResult.secure_url);
                    console.log("📂 Dossier client:", getCloudinaryFolderUrl(taxRequest.reference, customerLastName, customerFirstName));
                  }
                } catch (cloudinaryError) {
                  console.error("❌ Erreur génération/sauvegarde fiche PDF:", cloudinaryError);
                }

                // Envoyer la fiche récapitulative fiscale par email
                const taxSummaryResult = await sendTaxSummaryEmail(taxSummaryData);
                if (taxSummaryResult.success) {
                  console.log("📋 Fiche récapitulative fiscale envoyée à contact@neofidu.ch");
                } else {
                  console.error("❌ Erreur envoi fiche fiscale:", taxSummaryResult.error);
                }
              } else {
                // Fallback: envoyer une fiche minimale avec les métadonnées Stripe
                console.log("⚠️ Demande non trouvée, création fiche minimale");
                const minimalTaxSummary: TaxSummaryData = {
                  reference: reference,
                  customerName: customerName,
                  customerEmail: customerEmail,
                  address: { street: "", npa: "", city: "" },
                  canton: cantonCode ? getCantonName(cantonCode) : "N/A",
                  cantonCode: cantonCode || "",
                  taxYear: taxYear || String(new Date().getFullYear() - 1),
                  taxpayerNumber: taxpayerNumber,
                  clientType: paymentIntent.metadata?.clientType || "private",
                  amount: paymentIntent.amount / 100,
                  currency: paymentIntent.currency.toUpperCase(),
                  paymentMethod: paymentIntent.payment_method_types?.[0],
                  paidAt: new Date().toLocaleDateString('fr-CH'),
                };

                const taxSummaryResult = await sendTaxSummaryEmail(minimalTaxSummary);
                if (taxSummaryResult.success) {
                  console.log("📋 Fiche récapitulative fiscale (minimale) envoyée");
                }
              }
            } catch (taxSummaryError) {
              console.error("❌ Exception envoi fiche fiscale:", taxSummaryError);
            }
          }
        } else {
          console.warn("⚠️ Pas d'email client trouvé, notifications non envoyées");
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("❌ Paiement échoué:", paymentIntent.id);

        const payment: PaymentRecord = {
          id: `pay_${Date.now()}`,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
          status: "failed",
          customerEmail: paymentIntent.receipt_email || paymentIntent.metadata?.customerEmail || "",
          customerName: paymentIntent.metadata?.customerName || "",
          description: paymentIntent.description || "",
          paymentMethod: paymentIntent.payment_method_types?.[0] || "unknown",
          createdAt: new Date(),
          metadata: paymentIntent.metadata as Record<string, string>,
        };

        paymentsStore.unshift(payment);
        // Note: Pas d'email envoyé en cas d'échec - le client voit l'erreur sur la page
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log("🔄 Remboursement:", charge.id);

        // Mettre à jour le statut du paiement
        const existingPayment = paymentsStore.find(
          (p) => p.paymentIntentId === charge.payment_intent
        );
        if (existingPayment) {
          existingPayment.status = "refunded";
        }
        break;
      }

      case "payment_intent.created": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("📝 PaymentIntent créé:", paymentIntent.id);
        // Note: Pas d'email à la création, seulement après confirmation
        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
