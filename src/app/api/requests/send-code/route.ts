import { NextRequest, NextResponse } from "next/server";
import { findRequestByReference } from "@/lib/requests-store";
import { createVerificationCode, getLastCodeForDemo } from "@/lib/verification-store";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Lazy initialization de Resend
let resend: any = null;

async function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference } = body;

    if (!reference || reference.length < 4) {
      return NextResponse.json(
        { error: "Numéro de référence invalide" },
        { status: 400 }
      );
    }

    // Vérifier que la demande existe
    const clientRequest = await findRequestByReference(reference);
    if (!clientRequest) {
      return NextResponse.json(
        { error: "Aucune demande trouvée avec cette référence" },
        { status: 404 }
      );
    }

    // Masquer partiellement l'email pour la réponse
    const email = clientRequest.customerEmail;
    const maskedEmail = maskEmail(email);

    // Générer le code de vérification
    const code = createVerificationCode(clientRequest.reference, email);

    // Essayer d'envoyer l'email
    const resendClient = await getResend();

    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: "NeoFidu <noreply@neofidu.ch>",
          to: email,
          subject: `Votre code de vérification NeoFidu: ${code}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
                .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0D917B, #0d9488); padding: 30px; text-align: center; }
                .header h1 { color: white; margin: 0; font-size: 24px; }
                .content { padding: 30px; }
                .code { background: #f0fdfa; border: 2px dashed #0D917B; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
                .code-number { font-size: 36px; font-weight: bold; color: #0d9488; letter-spacing: 8px; font-family: monospace; }
                .info { color: #666; font-size: 14px; margin-top: 20px; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; color: #999; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>NeoFidu</h1>
                </div>
                <div class="content">
                  <p>Bonjour,</p>
                  <p>Vous avez demandé à accéder au suivi de votre dossier <strong>${clientRequest.reference}</strong>.</p>
                  <p>Voici votre code de vérification :</p>
                  <div class="code">
                    <div class="code-number">${code}</div>
                  </div>
                  <p class="info">
                    Ce code est valable pendant <strong>10 minutes</strong>.<br>
                    Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
                  </p>
                </div>
                <div class="footer">
                  © 2026 NeoFidu - Fiduciaire digitale en Romandie
                </div>
              </div>
            </body>
            </html>
          `,
        });

        console.log(`✅ Code de vérification envoyé à ${maskedEmail}`);

        return NextResponse.json({
          success: true,
          email: maskedEmail,
          message: "Un code de vérification a été envoyé par email",
          demo: false,
        });
      } catch (emailError) {
        console.error("Erreur envoi email:", emailError);
        // Continuer en mode démo si l'envoi échoue
      }
    }

    // Mode démo si Resend n'est pas configuré
    console.log(`📧 Mode démo - Code pour ${clientRequest.reference}: ${code}`);

    // En mode démo, on retourne le code directement (UNIQUEMENT POUR LE DÉVELOPPEMENT)
    const demoCode = getLastCodeForDemo(clientRequest.reference, email);

    return NextResponse.json({
      success: true,
      email: maskedEmail,
      message: "Mode démo: le code s'affiche ci-dessous (en production, il sera envoyé par email)",
      demo: true,
      demoCode: demoCode, // À RETIRER EN PRODUCTION
    });
  } catch (error) {
    console.error("Erreur envoi code:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du code" },
      { status: 500 }
    );
  }
}

// Masquer partiellement l'email
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***@***.***";

  const maskedLocal = local.length > 2
    ? local[0] + "***" + local[local.length - 1]
    : "***";

  const domainParts = domain.split(".");
  const maskedDomain = domainParts.length > 1
    ? domainParts[0][0] + "***." + domainParts[domainParts.length - 1]
    : "***";

  return `${maskedLocal}@${maskedDomain}`;
}
