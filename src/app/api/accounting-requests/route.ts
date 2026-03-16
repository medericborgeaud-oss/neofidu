import { NextRequest, NextResponse } from "next/server";
import { sendRequestConfirmationEmail, sendNewRequestNotificationEmail } from "@/lib/email";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { createRequest } from "@/lib/requests-store";
import { performSpamCheck, getClientIP } from "@/lib/spam-protection";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Interface for accounting request data
interface AccountingRequestData {
  // Canton
  canton: string;
  cantonCode: string;
  // Business info
  businessType: string;
  companyName: string;
  activity: string;
  employeesCount: number;
  annualRevenue: string;
  monthlyTransactions: string;
  isVatRegistered: boolean;
  currentAccountingSoftware: string;
  // Contact info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  npa: string;
  city: string;
  // Services
  selectedServices: string[];
  // Options
  billingFrequency: string;
  comments: string;
  // Documents count
  documentsCount?: number;
}

function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NF-CPT-${timestamp}-${random}`;
}

// Template for admin notification with full details
function getAccountingRequestAdminHtml(data: AccountingRequestData, reference: string): string {
  const businessTypeLabels: Record<string, string> = {
    independent: "Indépendant",
    sarl: "Sàrl",
    sa: "SA",
    other: "Autre forme juridique",
  };

  const servicesHtml = data.selectedServices.map(s => `<li>${s}</li>`).join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande comptabilité - NeoFidu</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f5;">
  <table style="max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 24px; color: white;">
        <h1 style="margin: 0; font-size: 22px;">📊 Nouvelle demande de comptabilité</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">Référence: ${reference}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <!-- Entreprise -->
        <div style="background: #f0fdfa; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; color: #0d9488; font-size: 16px;">🏢 Informations entreprise</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; color: #6b7280; width: 40%;">Raison sociale:</td>
              <td style="padding: 6px 0; font-weight: 600;">${data.companyName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Forme juridique:</td>
              <td style="padding: 6px 0;">${businessTypeLabels[data.businessType] || data.businessType}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Canton:</td>
              <td style="padding: 6px 0;">${data.canton} (${data.cantonCode})</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Activité:</td>
              <td style="padding: 6px 0;">${data.activity || 'Non spécifiée'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Nombre d'employés:</td>
              <td style="padding: 6px 0;">${data.employeesCount || 0}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">CA annuel estimé:</td>
              <td style="padding: 6px 0;">${data.annualRevenue || 'Non spécifié'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Transactions/mois:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #0d9488;">${data.monthlyTransactions || 'Non spécifié'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Logiciel actuel:</td>
              <td style="padding: 6px 0;">${data.currentAccountingSoftware || 'Aucun'}</td>
            </tr>
          </table>
        </div>

        <!-- Contact -->
        <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; color: #92400e; font-size: 16px;">👤 Contact</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; color: #92400e; width: 40%;">Nom:</td>
              <td style="padding: 6px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #92400e;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #92400e;">Téléphone:</td>
              <td style="padding: 6px 0;"><a href="tel:${data.phone}" style="color: #0d9488;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #92400e;">Adresse:</td>
              <td style="padding: 6px 0;">${data.street}<br>${data.npa} ${data.city}</td>
            </tr>
          </table>
        </div>

        <!-- Services demandés -->
        <div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; color: #1e40af; font-size: 16px;">📋 Services demandés</h3>
          <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
            ${servicesHtml || '<li>Aucun service spécifié</li>'}
          </ul>
          <p style="margin: 12px 0 0; color: #1e40af;">
            <strong>Fréquence de facturation:</strong> ${data.billingFrequency === 'monthly' ? 'Mensuelle' : 'Annuelle (-10%)'}
          </p>
        </div>

        <!-- Documents -->
        ${data.documentsCount ? `
        <div style="background: #f3e8ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px; color: #7c3aed; font-size: 16px;">📎 Documents</h3>
          <p style="margin: 0; color: #7c3aed;">${data.documentsCount} document(s) téléchargé(s)</p>
        </div>
        ` : ''}

        <!-- Commentaires -->
        ${data.comments ? `
        <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px;">💬 Commentaires</h3>
          <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${data.comments}</p>
        </div>
        ` : ''}

        <!-- CTA -->
        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:${data.email}?subject=Votre demande de comptabilité ${reference}" style="background: #0d9488; color: white; padding: 14px 28px; text-decoration: none; border-radius: 9999px; font-weight: 600; display: inline-block;">
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
    // Check if it's FormData (with files) or JSON
    const contentType = request.headers.get("content-type") || "";

    let body: AccountingRequestData;
    let files: File[] = [];
    let honeypot: string | undefined;
    let formToken: number | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      // Parse JSON data from formData
      const jsonData = formData.get("data") as string;
      body = JSON.parse(jsonData);

      // Get spam protection fields
      honeypot = formData.get("_honeypot") as string;
      formToken = parseInt(formData.get("_formToken") as string) || undefined;

      // Get files
      const fileEntries = formData.getAll("files") as File[];
      files = fileEntries.filter(f => f instanceof File && f.size > 0);
    } else {
      const jsonBody = await request.json();
      body = jsonBody;
      honeypot = jsonBody._honeypot;
      formToken = jsonBody._formToken;
    }

    // Anti-spam protection
    const clientIP = getClientIP(request.headers);
    const spamCheck = performSpamCheck({
      ip: clientIP,
      honeypot: honeypot,
      formLoadedAt: formToken,
    });

    if (spamCheck.isSpam) {
      console.warn(`🚫 Spam detected from ${clientIP}: ${spamCheck.reason}`);
      return NextResponse.json({
        success: true,
        reference: "SPAM-BLOCKED",
      });
    }

    // Validation
    if (!body.firstName || !body.lastName || !body.email || !body.canton || !body.companyName) {
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

    // Upload documents to Cloudinary if any
    const uploadedDocuments: { name: string; url: string; category: string; uploadedAt: string }[] = [];

    if (files.length > 0) {
      console.log(`📤 Uploading ${files.length} files to Cloudinary...`);

      for (const file of files) {
        try {
          const result = await uploadToCloudinary(file, reference, body.lastName, body.firstName);
          uploadedDocuments.push({
            name: file.name,
            url: result.secure_url,
            category: "accounting",
            uploadedAt: new Date().toISOString(),
          });
          console.log(`✅ Uploaded: ${file.name}`);
        } catch (uploadError) {
          console.error(`❌ Failed to upload ${file.name}:`, uploadError);
        }
      }
    }

    // Save request to database
    try {
      await createRequest({
        reference,
        type: "accounting",
        customerName: `${body.firstName} ${body.lastName}`,
        customerEmail: body.email,
        customerPhone: body.phone,
        canton: body.canton,
        status: "received",
        amount: 0, // Devis à établir
        paymentStatus: "pending",
        documents: uploadedDocuments.map(d => ({
          name: d.name,
          uploadedAt: new Date(d.uploadedAt),
          url: d.url,
        })),
        data: {
          businessType: body.businessType,
          companyName: body.companyName,
          activity: body.activity,
          employeesCount: body.employeesCount,
          annualRevenue: body.annualRevenue,
          monthlyTransactions: body.monthlyTransactions,
          isVatRegistered: body.isVatRegistered,
          currentAccountingSoftware: body.currentAccountingSoftware,
          selectedServices: body.selectedServices,
          billingFrequency: body.billingFrequency,
          comments: body.comments,
          street: body.street,
          npa: body.npa,
          city: body.city,
        },
      });
      console.log(`✅ Request saved to database: ${reference}`);
    } catch (dbError) {
      console.error("❌ Failed to save to database:", dbError);
      // Continue anyway - email notification will still work
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email");
      return NextResponse.json({
        success: true,
        reference,
        documentsUploaded: uploadedDocuments.length,
        message: "Demande reçue (email non configuré)",
      });
    }

    // Send confirmation email to client
    const clientEmailResult = await sendRequestConfirmationEmail({
      to: body.email,
      customerName: `${body.firstName} ${body.lastName}`,
      amount: 0,
      currency: "CHF",
      service: `Comptabilité - ${body.companyName}`,
      reference,
      canton: body.canton,
    });

    // Send detailed notification to admin using Resend directly
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.ADMIN_EMAIL || "contact@neofidu.ch";
    const fromEmail = process.env.FROM_EMAIL || "NeoFidu <noreply@neofidu.ch>";

    // Update documentsCount with actual uploaded count
    body.documentsCount = uploadedDocuments.length;

    const adminEmailResult = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `📊 Nouvelle demande comptabilité - ${body.companyName} (${body.canton})`,
      html: getAccountingRequestAdminHtml(body, reference),
    });

    console.log("Accounting request emails sent:", { clientEmailResult, adminEmailResult });

    return NextResponse.json({
      success: true,
      reference,
      documentsUploaded: uploadedDocuments.length,
      message: "Votre demande a été envoyée avec succès",
    });
  } catch (error) {
    console.error("Accounting request error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
