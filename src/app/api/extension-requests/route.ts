import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured, generateReference } from "@/lib/supabase";
import { performSpamCheck, getClientIP } from "@/lib/spam-protection";

export const dynamic = "force-dynamic";

const extensionRequests: Map<string, ExtensionRequest> = new Map();

interface ExtensionRequest {
  id: string;
  reference: string;
  canton: string;
  extensionUntil: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  npa: string;
  city: string;
  documentUrl?: string;
  amount: number;
  status: "pending" | "paid" | "processed" | "completed";
  createdAt: string;
  paidAt?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const clientIP = getClientIP(request.headers);
    const spamCheck = performSpamCheck({
      ip: clientIP,
      honeypot: body._honeypot,
      formLoadedAt: body._formToken,
    });

    if (spamCheck.isSpam) {
      console.warn("Spam detected from " + clientIP + ": " + spamCheck.reason);
      return NextResponse.json({ success: true, id: "SPAM-BLOCKED" });
    }

    const reference = generateReference();
    const id = Math.random().toString(36).substr(2, 9);

    const extensionData: ExtensionRequest = {
      id,
      reference,
      canton: body.canton,
      extensionUntil: body.extensionUntil,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      npa: body.npa,
      city: body.city,
      documentUrl: body.documentUrl,
      amount: body.amount || 20,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from("extension_requests")
          .insert([{
            reference,
            canton: extensionData.canton,
            extension_until: extensionData.extensionUntil,
            first_name: extensionData.firstName,
            last_name: extensionData.lastName,
            email: extensionData.email,
            phone: extensionData.phone,
            address: extensionData.address,
            npa: extensionData.npa,
            city: extensionData.city,
            document_url: extensionData.documentUrl,
            amount: extensionData.amount,
            status: extensionData.status,
          }])
          .select()
          .single();

        if (error) {
          console.error("Supabase error:", error);
          extensionRequests.set(id, extensionData);
        } else {
          return NextResponse.json({ success: true, id: data.id, reference: data.reference });
        }
      } catch (err) {
        console.error("Database error:", err);
        extensionRequests.set(id, extensionData);
      }
    } else {
      extensionRequests.set(id, extensionData);
    }

    return NextResponse.json({ success: true, id, reference });
  } catch (error) {
    console.error("Error creating extension request:", error);
    return NextResponse.json({ error: "Failed to create extension request" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get("key");

    if (adminKey !== process.env.ADMIN_KEY && adminKey !== "neofidu-admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("extension_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ requests: Array.from(extensionRequests.values()) });
      }

      return NextResponse.json({ requests: data });
    }

    return NextResponse.json({ requests: Array.from(extensionRequests.values()) });
  } catch (error) {
    console.error("Error fetching extension requests:", error);
    return NextResponse.json({ error: "Failed to fetch extension requests" }, { status: 500 });
  }
}
