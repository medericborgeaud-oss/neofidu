import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, sendCriticalAlertEmail } from "@/lib/email";
import { uploadToCloudinary, getCloudinaryFolderUrl } from "@/lib/cloudinary";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Generate reference number
function generateReference(): string {
  const prefix = "ONB";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Format date for display
function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Check if Cloudinary is configured
function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const dataString = formData.get("data") as string;

    if (!dataString) {
      return NextResponse.json(
        { success: false, error: "Données manquantes" },
        { status: 400 }
      );
    }

    const data = JSON.parse(dataString);
    const reference = generateReference();
    const submittedAt = new Date();

    // Get files
    const files = formData.getAll("files") as File[];
    const uploadedDocuments: { name: string; url: string; publicId: string }[] = [];

    // Upload files to Cloudinary if configured
    if (files.length > 0 && isCloudinaryConfigured()) {
      console.log(`📤 Uploading ${files.length} files to Cloudinary for onboarding ${reference}`);

      for (const file of files) {
        try {
          const result = await uploadToCloudinary(
            file,
            reference,
            data.contactLastName,
            data.contactFirstName
          );
          uploadedDocuments.push({
            name: file.name,
            url: result.secure_url,
            publicId: result.public_id,
          });
          console.log(`✅ Uploaded: ${file.name}`);
        } catch (uploadError) {
          console.error(`❌ Failed to upload ${file.name}:`, uploadError);
        }
      }
    } else if (files.length > 0 && !isCloudinaryConfigured()) {
      console.error("❌ Cloudinary not configured - files will not be uploaded");
      await sendCriticalAlertEmail({
        service: "Cloudinary (onboarding)",
        error: "Cloudinary non configuré pour l'onboarding",
        details: `${files.length} fichier(s) n'ont pas pu être uploadés`,
        customerName: `${data.contactFirstName} ${data.contactLastName}`,
        customerEmail: data.contactEmail,
        reference,
      });
    }

    // Get Cloudinary folder URL for admin
    const cloudinaryFolderUrl = isCloudinaryConfigured()
      ? getCloudinaryFolderUrl(reference, data.contactLastName, data.contactFirstName)
      : null;

    // Save to Supabase if available
    if (supabase) {
      try {
        const { error } = await supabase.from("onboarding_requests").insert({
          reference,
          company_name: data.companyName,
          business_type: data.businessType,
          canton: data.canton,
          canton_name: data.cantonName,
          activity: data.activity,
          street: data.street,
          npa: data.npa,
          city: data.city,
          contact_first_name: data.contactFirstName,
          contact_last_name: data.contactLastName,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone,
          employees_count: data.employeesCount ? parseInt(data.employeesCount) : null,
          annual_revenue: data.annualRevenue,
          is_vat_registered: data.isVatRegistered,
          current_accounting_software: data.currentAccountingSoftware,
          fiscal_year_end: data.fiscalYearEnd,
          specific_needs: data.specificNeeds,
          urgent_matters: data.urgentMatters,
          documents_count: uploadedDocuments.length,
          documents: uploadedDocuments,
          cloudinary_folder_url: cloudinaryFolderUrl,
          status: "new",
          created_at: submittedAt.toISOString(),
        });

        if (error) {
          console.error("Supabase insert error:", error);
        } else {
          console.log(`✅ Onboarding saved to Supabase: ${reference}`);
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
      }
    }

    // Business type label
    const businessTypeLabels: Record<string, string> = {
      sarl: "Sàrl",
      sa: "SA",
      independent: "Indépendant / RI",
      association: "Association",
      other: "Autre",
    };

    // Send notification email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            📋 Nouveau formulaire d'onboarding
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">
            Référence: <strong>${reference}</strong>
          </p>
        </div>

        <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          ${data.urgentMatters ? `
          <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <h3 style="color: #b45309; margin: 0 0 8px 0;">⚠️ POINTS URGENTS</h3>
            <p style="color: #92400e; margin: 0;">${data.urgentMatters}</p>
          </div>
          ` : ""}

          <h2 style="color: #0d9488; margin-top: 0; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Entreprise</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb; width: 40%;"><strong>Nom:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb; font-size: 16px;"><strong>${data.companyName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Forme juridique:</strong></td>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;">${businessTypeLabels[data.businessType] || data.businessType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Canton:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${data.cantonName || data.canton}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Activité:</strong></td>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;">${data.activity || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Adresse:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${data.street ? `${data.street}, ${data.npa} ${data.city}` : "-"}</td>
            </tr>
          </table>

          <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Contact</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb; width: 40%;"><strong>Nom:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>${data.contactFirstName} ${data.contactLastName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Email:</strong></td>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><a href="mailto:${data.contactEmail}" style="color: #0d9488;">${data.contactEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Téléphone:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${data.contactPhone || "-"}</td>
            </tr>
          </table>

          <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Détails activité</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb; width: 40%;"><strong>Employés:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${data.employeesCount || "0"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>CA annuel:</strong></td>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;">${data.annualRevenue || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>TVA:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${data.isVatRegistered ? "✅ Oui" : "Non"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Logiciel actuel:</strong></td>
              <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;">${data.currentAccountingSoftware || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Fin exercice:</strong></td>
              <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${data.fiscalYearEnd}</td>
            </tr>
          </table>

          ${data.specificNeeds ? `
            <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Besoins spécifiques</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
              ${data.specificNeeds}
            </div>
          ` : ""}

          <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Documents</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            ${uploadedDocuments.length > 0
              ? `<p style="margin: 0 0 10px 0;"><strong>${uploadedDocuments.length} document(s)</strong> uploadé(s) sur Cloudinary:</p>
                 <ul style="margin: 0; padding-left: 20px;">
                   ${uploadedDocuments.map(d => `<li><a href="${d.url}" style="color: #0d9488;">${d.name}</a></li>`).join("")}
                 </ul>
                 ${cloudinaryFolderUrl ? `<p style="margin: 15px 0 0 0;"><a href="${cloudinaryFolderUrl}" style="display: inline-block; background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">📁 Voir le dossier Cloudinary</a></p>` : ""}`
              : `<p style="margin: 0; color: #6b7280;">Aucun document uploadé</p>`
            }
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #1f2937; border-radius: 8px; text-align: center;">
            <p style="color: white; margin: 0 0 15px 0;">Reçu le ${formatDate(submittedAt)}</p>
            <a href="https://www.neofidu.ch/admin" style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Voir dans le Dashboard
            </a>
          </div>
        </div>
      </div>
    `;

    // Send confirmation email to client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            neo<span style="font-weight: normal;">fidu</span><span style="font-size: 14px; opacity: 0.8;">.ch</span>
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">
            Merci pour votre confiance !
          </p>
        </div>

        <div style="padding: 40px; background: #ffffff; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Bonjour ${data.contactFirstName},
          </p>
          <p style="color: #666; line-height: 1.6;">
            Nous avons bien reçu votre formulaire d'onboarding pour <strong>${data.companyName}</strong>.
            Notre équipe va analyser votre dossier et vous recontactera dans les plus brefs délais.
          </p>

          <div style="background: #f0fdfa; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center; border: 2px solid #0d9488;">
            <p style="color: #666; margin: 0 0 8px 0; font-size: 14px;">Votre référence</p>
            <p style="font-size: 28px; font-weight: bold; color: #0d9488; margin: 0; font-family: monospace; letter-spacing: 2px;">
              ${reference}
            </p>
          </div>

          <h3 style="color: #0d9488; margin-top: 30px;">Prochaines étapes</h3>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #0d9488; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">1</span>
              <span style="color: #4b5563;">Notre équipe analyse votre dossier</span>
            </div>
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #0d9488; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</span>
              <span style="color: #4b5563;">Nous vous contactons pour finaliser l'onboarding</span>
            </div>
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #0d9488; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</span>
              <span style="color: #4b5563;">Mise en place de votre comptabilité</span>
            </div>
          </div>

          ${uploadedDocuments.length > 0 ? `
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-top: 25px; border: 1px solid #a7f3d0;">
              <p style="color: #059669; margin: 0; font-weight: 500;">
                ✓ ${uploadedDocuments.length} document(s) bien reçu(s)
              </p>
            </div>
          ` : `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 25px; border: 1px solid #fcd34d;">
              <p style="color: #d97706; margin: 0;">
                📎 N'oubliez pas de nous envoyer vos documents comptables par email !
              </p>
            </div>
          `}

          <p style="color: #666; margin-top: 30px; line-height: 1.6;">
            Des questions ? Répondez simplement à cet email ou contactez-nous à
            <a href="mailto:contact@neofidu.ch" style="color: #0d9488;">contact@neofidu.ch</a>
          </p>

          <p style="color: #666; margin-top: 30px;">
            Cordialement,<br>
            <strong style="color: #0d9488;">L'équipe NeoFidu</strong>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© ${new Date().getFullYear()} NeoFidu SA - Fiduciaire digitale en Suisse romande</p>
        </div>
      </div>
    `;

    // Send emails
    try {
      // Admin notification
      await sendEmail({
        to: process.env.ADMIN_EMAIL || "contact@neofidu.ch",
        subject: `📋 [Onboarding] ${data.companyName} - ${reference}${data.urgentMatters ? " ⚠️ URGENT" : ""}`,
        html: adminEmailHtml,
      });
      console.log(`📧 Admin notification sent for ${reference}`);

      // Client confirmation
      await sendEmail({
        to: data.contactEmail,
        subject: `Bienvenue chez NeoFidu - ${reference}`,
        html: clientEmailHtml,
        replyTo: "contact@neofidu.ch",
      });
      console.log(`📧 Client confirmation sent to ${data.contactEmail}`);
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      reference,
      documentsUploaded: uploadedDocuments.length,
      message: "Formulaire envoyé avec succès",
    });

  } catch (error) {
    console.error("Onboarding submission error:", error);
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de l'envoi" },
      { status: 500 }
    );
  }
}
