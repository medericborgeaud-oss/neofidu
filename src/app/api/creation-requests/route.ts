import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { performSpamCheck, getClientIP } from "@/lib/spam-protection";
import { createRequest } from "@/lib/requests-store";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NF-CRE-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      canton,
      companyType,
      projectDescription,
      _honeypot,
      _formToken,
    } = body;

    // Anti-spam protection
    const clientIP = getClientIP(request.headers);
    const spamCheck = performSpamCheck({
      ip: clientIP,
      honeypot: _honeypot,
      formLoadedAt: _formToken,
    });

    if (spamCheck.isSpam) {
      console.warn(`🚫 Spam detected from ${clientIP}: ${spamCheck.reason}`);
      // Return fake success to not alert bots
      return NextResponse.json({
        success: true,
        message: "Demande reçue",
      });
    }

    // Validation
    if (!firstName || !lastName || !email || !companyType) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Map company type to readable name
    const companyTypeLabels: Record<string, string> = {
      ri: "Raison individuelle",
      sarl: "Sàrl",
      sa: "SA",
      other: "Autre / Je ne sais pas",
    };

    const companyTypeName = companyTypeLabels[companyType] || companyType;

    // Generate reference
    const reference = generateReference();

    // Save to database
    try {
      await createRequest({
        reference,
        type: "creation",
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        customerPhone: phone || undefined,
        canton: canton || "Non spécifié",
        status: "received",
        amount: 0, // Prix à définir après analyse
        paymentStatus: "pending",
        notes: `Demande de création: ${companyTypeName}`,
        data: {
          companyType,
          companyTypeName,
          projectDescription: projectDescription || "",
        },
      });
      console.log(`✅ Demande création entreprise sauvegardée: ${reference}`);
    } catch (dbError) {
      console.error("Erreur sauvegarde DB:", dbError);
      // Continue même si la DB échoue - on envoie quand même les emails
    }

    // Check if Resend is configured
    if (!resend) {
      console.warn("RESEND_API_KEY not configured, skipping email");
      console.log("📧 Company creation request (email not sent):", {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        canton,
        companyType: companyTypeName,
        projectDescription,
      });
      return NextResponse.json({
        success: true,
        message: "Demande reçue (email non configuré)",
      });
    }

    // Send notification email to admin
    await resend.emails.send({
      from: "Neofidu <noreply@neofidu.ch>",
      to: ["contact@neofidu.ch"],
      subject: `🏢 Nouvelle demande création entreprise - ${companyTypeName} [${reference}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🏢 Nouvelle demande de création d'entreprise</h1>
            <p style="color: white; margin: 8px 0 0; opacity: 0.9;">Référence: ${reference}</p>
          </div>

          <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0;">
            <h2 style="color: #7c3aed; margin-top: 0;">Informations du prospect</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;">Nom complet:</td>
                <td style="padding: 8px 0; font-weight: bold;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Téléphone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #7c3aed;">${phone}</a></td>
              </tr>
              ` : ""}
              ${canton ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Canton:</td>
                <td style="padding: 8px 0;">${canton}</td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Type d'entreprise:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #7c3aed;">${companyTypeName}</td>
              </tr>
            </table>

            ${projectDescription ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #334155; margin-bottom: 8px;">Description du projet:</h3>
              <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                ${projectDescription.replace(/\n/g, "<br>")}
              </div>
            </div>
            ` : ""}
          </div>

          <div style="background: #1e293b; padding: 16px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              Demande reçue le ${new Date().toLocaleDateString("fr-CH")} à ${new Date().toLocaleTimeString("fr-CH")}
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "Neofidu <noreply@neofidu.ch>",
      to: [email],
      subject: `Votre demande de création d'entreprise [${reference}] - Neofidu`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Merci pour votre demande !</h1>
            <p style="color: white; margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Référence: ${reference}</p>
          </div>

          <div style="background: white; padding: 30px; border: 1px solid #e2e8f0;">
            <p style="font-size: 16px; color: #334155;">Bonjour ${firstName},</p>

            <p style="font-size: 16px; color: #334155;">
              Nous avons bien reçu votre demande concernant la création d'une <strong>${companyTypeName}</strong>.
            </p>

            <div style="background: #faf5ff; padding: 12px 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #7c3aed;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Votre référence de suivi: <strong style="color: #7c3aed;">${reference}</strong>
              </p>
            </div>

            <p style="font-size: 16px; color: #334155;">
              Un expert Neofidu vous contactera dans les <strong>24 heures ouvrables</strong> pour discuter de votre projet et vous proposer un accompagnement personnalisé.
            </p>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <h3 style="color: #7c3aed; margin-top: 0;">Ce qui vous attend :</h3>
              <ul style="color: #64748b; padding-left: 20px;">
                <li>Un premier échange gratuit de 30 minutes</li>
                <li>Une analyse de votre situation</li>
                <li>Un devis détaillé sans engagement</li>
                <li>Des conseils sur la forme juridique adaptée</li>
              </ul>
            </div>

            <p style="font-size: 16px; color: #334155;">
              En attendant, n'hésitez pas à consulter notre
              <a href="https://www.neofidu.ch/creation-entreprise" style="color: #7c3aed;">guide complet sur la création d'entreprise</a>.
            </p>

            <p style="font-size: 16px; color: #334155; margin-bottom: 0;">
              À très bientôt,<br>
              <strong>L'équipe Neofidu</strong>
            </p>
          </div>

          <div style="background: #1e293b; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: white; margin: 0 0 8px 0; font-weight: bold;">Neofidu</p>
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              Fiduciaire digitale en Suisse romande<br>
              <a href="mailto:contact@neofidu.ch" style="color: #a855f7;">contact@neofidu.ch</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès",
    });
  } catch (error) {
    console.error("Company creation request error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
