import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Rate limiting - simple in-memory store
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max 3 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
               request.headers.get("x-real-ip") ||
               "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Veuillez réessayer dans une minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, firstName } = body;

    // Validate required fields
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Adresse email requise" },
        { status: 400 }
      );
    }

    // Validate email format
    const cleanEmail = email.trim().toLowerCase();
    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Clean first name
    const cleanFirstName = firstName?.trim() || "";

    // Check for Supabase connection
    if (!supabase) {
      console.log("Newsletter subscription (no DB):", { email: cleanEmail, firstName: cleanFirstName });
      // Still return success - we can store locally or send notification
      return NextResponse.json({
        success: true,
        message: "Inscription réussie !",
      });
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", cleanEmail)
      .single();

    if (existingSubscriber) {
      if (existingSubscriber.status === "active") {
        return NextResponse.json(
          { error: "Cette adresse email est déjà inscrite à notre newsletter." },
          { status: 400 }
        );
      }

      // Reactivate if previously unsubscribed
      await supabase
        .from("newsletter_subscribers")
        .update({
          status: "active",
          first_name: cleanFirstName,
          resubscribed_at: new Date().toISOString(),
        })
        .eq("id", existingSubscriber.id);

      return NextResponse.json({
        success: true,
        message: "Réinscription réussie ! Bienvenue à nouveau.",
      });
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: cleanEmail,
        first_name: cleanFirstName,
        status: "active",
        source: "blog",
        ip_address: ip,
        subscribed_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Newsletter insert error:", insertError);
      return NextResponse.json(
        { error: "Une erreur est survenue. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inscription réussie ! Bienvenue dans notre newsletter.",
    });

  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
