import { NextRequest, NextResponse } from "next/server";
import { sendRequestConfirmationEmail } from "@/lib/email";
import { createRequest } from "@/lib/requests-store";
import { performSpamCheck, getClientIP } from "@/lib/spam-protection";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Interface for property management request data
interface PropertyRequestData {
  // Canton
  canton: string;
  cantonCode: string;
  // Property info
  propertyType: string;
  propertyCount: number;
  propertyAddress: string;
  propertyCity: string;
  monthlyRent: string;
  currentlyManaged: boolean;
  currentManager: string;
  // Contact info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  npa: string;
  city: string;
  // Comments
  comments: string;
}

function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NF-GI-${timestamp}-${random}`;
}

// Calculate estimate based on monthly rent (5% of annual rent + TVA 8.1%)
function calculateEstimate(monthlyRent: string): { ht: number; tva: number; ttc: number } {
  const rent = parseFloat(monthlyRent) || 0;
  const annualRent = rent * 12;
  const ht = Math.round(annualRent * 0.05);
  const tva = Math.round(ht * 0.081 * 100) / 100;
  const ttc = Math.round((ht + tva) * 100) / 100;
  return { ht, tva, ttc };
}

// Template for admin notification with full details
function getPropertyRequestAdminHtml(data: PropertyRequestData, reference: string): string {
  const propertyTypeLabels: Record<string, string> = {
    apartment: "Appartement",
    house: "Villa / Maison",
    commercial: "Local commercial",
    mixed: "Immeuble mixte",
  };

  const estimate = calculateEstimate(data.monthlyRent);

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande gérance - NeoFidu</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f5;">
  <table style="max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); padding: 24px; color: white;">
        <h1 style="margin: 0; font-size: 22px;">🏠 Nouvelle demande de gérance immobilière</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">Référence: ${reference}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <!-- Estimation -->
        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
          <p style="margin: 0 0 8px; color: #92400e; font-size: 14px;">Estimation annuelle TTC</p>
          <p style="margin: 0; color: #d97706; font-size: 32px; font-weight: bold;">CHF ${estimate.ttc.toFixed(2)}</p>
          <p style="margin: 8px 0 0; color: #92400e; font-size: 12px;">
            HT: CHF ${estimate.ht}.- | TVA (8.1%): CHF ${estimate.tva.toFixed(2)}
          </p>
        </div>

        <!-- Bien immobilier -->
        <div style="background: #f0fdfa; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; color: #0d9488; font-size: 16px;">🏢 Bien immobilier</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; color: #6b7280; width: 40%;">Type de bien:</td>
              <td style="padding: 6px 0; font-weight: 600;">${propertyTypeLabels[data.propertyType] || data.propertyType}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Nombre de biens:</td>
              <td style="padding: 6px 0;">${data.propertyCount || 1}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Adresse du bien:</td>
              <td style="padding: 6px 0;">${data.propertyAddress}<br>${data.propertyCity}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Canton:</td>
              <td style="padding: 6px 0;">${data.canton}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Loyer mensuel:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #0d9488;">CHF ${data.monthlyRent}.-</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Actuellement en gérance:</td>
              <td style="padding: 6px 0;">${data.currentlyManaged ? `Oui (${data.currentManager || 'Gérant non spécifié'})` : 'Non'}</td>
            </tr>
          </table>
        </div>

        <!-- Contact propriétaire -->
        <div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; color: #1e40af; font-size: 16px;">👤 Propriétaire</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; color: #1e40af; width: 40%;">Nom:</td>
              <td style="padding: 6px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #1e40af;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #1e40af;">Téléphone:</td>
              <td style="padding: 6px 0;"><a href="tel:${data.phone}" style="color: #0d9488;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #1e40af;">Adresse:</td>
              <td style="padding: 6px 0;">${data.street}<br>${data.npa} ${data.city}</td>
            </tr>
          </table>
        </div>

        <!-- Commentaires -->
        ${data.comments ? `
        <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px;">💬 Commentaires</h3>
          <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${data.comments}</p>
        </div>
        ` : ''}

        <!-- CTA -->
        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:${data.email}?subject=Votre demande de gérance immobilière ${reference}" style="background: #d97706; color: white; padding: 14px 28px; text-decoration: none; border-radius: 9999px; font-weight: 600; display: inline-block;">
            Contacter ${data.firstName}
          </a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background: #1f2937; padding: 20px; color: white; text-align: center;">
        <p style="margin: 0; font-size: 12px; opacity: 0.8;">
          Demande reçue le ${new Date().toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const jsonBody = await request.json();
    const body: PropertyRequestData = jsonBody;

    // Anti-spam protection
    const clientIP = getClientIP(request.headers);
    const spamCheck = performSpamCheck({
      ip: clientIP,
      honeypot: jsonBody._honeypot,
      formLoadedAt: jsonBody._formToken,
    });

    if (spamCheck.isSpam) {
      console.warn(`🚫 Spam detected from ${clientIP}: ${spamCheck.reason}`);
      return NextResponse.json({
        success: true,
        reference: "SPAM-BLOCKED",
      });
    }

    // Validation
    if (!body.firstName || !body.lastName || !body.email || !body.canton || !body.propertyType) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Generate reference
    const reference = generateReference();
    const estimate = calculateEstimate(body.monthlyRent);

    // Save request to database
    try {
      await createRequest({
        reference,
        type: "property",
        customerName: `${body.firstName} ${body.lastName}`,
        customerEmail: body.email,
        customerPhone: body.phone,
        canton: body.canton,
        status: "received",
        amount: estimate.ttc,
        paymentStatus: "pending",
        documents: [],
        data: {
          propertyType: body.propertyType,
          propertyCount: body.propertyCount,
          propertyAddress: body.propertyAddress,
          propertyCity: body.propertyCity,
          monthlyRent: body.monthlyRent,
          currentlyManaged: body.currentlyManaged,
          currentManager: body.currentManager,
          street: body.street,
          npa: body.npa,
          city: body.city,
          comments: body.comments,
          estimateHT: estimate.ht,
          estimateTVA: estimate.tva,
          estimateTTC: estimate.ttc,
        },
      });
      console.log(`✅ Property request saved to database: ${reference}`);
    } catch (dbError) {
      console.error("❌ Failed to save property request to database:", dbError);
      // Continue anyway - email notification will still work
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email");
      return NextResponse.json({
        success: true,
        reference,
        estimate: estimate.ttc,
        message: "Demande reçue (email non configuré)",
      });
    }

    // Send confirmation email to client
    const clientEmailResult = await sendRequestConfirmationEmail({
      to: body.email,
      customerName: `${body.firstName} ${body.lastName}`,
      amount: estimate.ttc,
      currency: "CHF",
      service: `Gérance immobilière - ${body.propertyAddress}, ${body.propertyCity}`,
      reference,
      canton: body.canton,
    });

    // Send detailed notification to admin using Resend directly
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.ADMIN_EMAIL || "contact@neofidu.ch";
    const fromEmail = process.env.FROM_EMAIL || "NeoFidu <noreply@neofidu.ch>";

    const adminEmailResult = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `🏠 Nouvelle demande gérance - ${body.propertyCity} (${body.canton}) - CHF ${body.monthlyRent}/mois`,
      html: getPropertyRequestAdminHtml(body, reference),
    });

    console.log("Property request emails sent:", { clientEmailResult, adminEmailResult });

    return NextResponse.json({
      success: true,
      reference,
      estimate: estimate.ttc,
      message: "Votre demande a été envoyée avec succès",
    });
  } catch (error) {
    console.error("Property request error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
