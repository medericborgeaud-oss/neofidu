import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface HealthStatus {
  status: "ok" | "degraded" | "error";
  services: {
    cloudinary: boolean;
    stripe: boolean;
    resend: boolean;
    supabase: boolean;
  };
  missingServices: string[];
  timestamp: string;
}

export async function GET() {
  const services = {
    cloudinary: !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ),
    stripe: !!(
      process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PUBLISHABLE_KEY
    ),
    resend: !!process.env.RESEND_API_KEY,
    supabase: !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
  };

  const missingServices: string[] = [];

  if (!services.cloudinary) missingServices.push("Cloudinary (stockage documents)");
  if (!services.stripe) missingServices.push("Stripe (paiements)");
  if (!services.resend) missingServices.push("Resend (emails)");

  // Cloudinary is CRITICAL - without it, documents are lost
  const status: HealthStatus["status"] = !services.cloudinary
    ? "error"
    : missingServices.length > 0
      ? "degraded"
      : "ok";

  const health: HealthStatus = {
    status,
    services,
    missingServices,
    timestamp: new Date().toISOString(),
  };

  // Return 503 if Cloudinary is not configured (critical service)
  const httpStatus = services.cloudinary ? 200 : 503;

  return NextResponse.json(health, { status: httpStatus });
}
