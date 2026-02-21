import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";
import { performSpamCheck, getClientIP } from "@/lib/spam-protection";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, canton, service, message, _honeypot, _formToken } = body;

    // Anti-spam protection
    const clientIP = getClientIP(request.headers);
    const spamCheck = performSpamCheck({
      ip: clientIP,
      honeypot: _honeypot,
      formLoadedAt: _formToken,
    });

    if (spamCheck.isSpam) {
      console.warn(`🚫 Spam detected from ${clientIP}: ${spamCheck.reason}`);
      // Retourner un succès factice pour ne pas alerter les bots
      return NextResponse.json({
        success: true,
        message: "Message reçu",
      });
    }

    // Validation
    if (!firstName || !lastName || !email || !canton || !service) {
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

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email");
      return NextResponse.json({
        success: true,
        message: "Message reçu (email non configuré)",
      });
    }

    // Send email
    const result = await sendContactFormEmail({
      firstName,
      lastName,
      email,
      phone,
      canton,
      service,
      message,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Votre message a été envoyé avec succès",
      });
    } else {
      console.error("Email sending failed:", result.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
