import { NextRequest, NextResponse } from "next/server";
import {
  isSupabaseConfigured,
  createTaxRequest as createSupabaseRequest,
  getAllTaxRequests as getSupabaseRequests,
  getTaxRequestStats as getSupabaseStats,
  generateReference,
} from "@/lib/supabase";
import {
  createTaxRequest as createMemoryRequest,
  getAllTaxRequests as getMemoryRequests,
  getTaxRequestStats as getMemoryStats,
} from "@/lib/tax-requests-store";
import { performSpamCheck, getClientIP } from "@/lib/spam-protection";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// POST - Créer une nouvelle demande de déclaration fiscale
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Anti-spam protection
    const clientIP = getClientIP(request.headers);
    const spamCheck = performSpamCheck({
      ip: clientIP,
      honeypot: body._honeypot,
      formLoadedAt: body._formToken,
    });

    if (spamCheck.isSpam) {
      console.warn(`🚫 Spam detected from ${clientIP}: ${spamCheck.reason}`);
      return NextResponse.json({
        success: true,
        reference: "SPAM-BLOCKED",
      });
    }

    const requestData = {
      status: "pending" as const,
      paid_at: undefined,
      payment: {
        amount: body.amount || 0,
        currency: body.currency || "CHF",
        method: body.paymentMethod,
      },
      customer: {
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        firstName2: body.firstName2,
        lastName2: body.lastName2,
        email: body.email || "",
        phone: body.phone,
        address: {
          street: body.street || "",
          npa: body.npa || "",
          city: body.city || "",
        },
      },
      fiscal: {
        canton: body.cantonName || body.canton || "",
        cantonCode: body.cantonCode || body.canton || "",
        taxYear: body.taxYear || new Date().getFullYear() - 1,
        taxpayerNumber: body.taxpayerNumber,
        declarationCode: body.declarationCode,
        clientType: body.clientType || "private",
        employmentStatus: body.employmentStatus,
        employmentStatus2: body.employmentStatus2,
      },
      situation: {
        hasMoved: body.hasMoved,
        hasChildren: body.hasChildren,
        childrenCount: body.childrenCount,
        monthlyRent: body.monthlyRent,
      },
      financial: {
        hasPillar3a: body.hasPillar3a,
        pillar3aAmount: body.pillar3aAmount,
        hasStocks: body.hasStocks,
        stocksCount: body.stocksCount,
        hasGuardCosts: body.hasGuardCosts,
        guardCosts: body.guardCosts,
        hasAlimonyReceived: body.hasAlimonyReceived,
        alimonyReceived: body.alimonyReceived,
        hasAlimonyPaid: body.hasAlimonyPaid,
        alimonyPaid: body.alimonyPaid,
        hasDonations: body.hasDonations,
        donationsAmount: body.donationsAmount,
        hasDebts: body.hasDebts,
        debtsAmount: body.debtsAmount,
      },
      property: {
        hasProperty: body.hasProperty,
        propertyCount: body.propertyCount,
        hasMortgage: body.hasMortgage,
        mortgageAmount: body.mortgageAmount,
        hasRenovations: body.hasRenovations,
        renovationsAmount: body.renovationsAmount,
      },
      workplaces: body.workplaces || [],
      options: {
        deliveryMethod: body.deliveryMethod,
        wantsReview: body.wantsReview,
        deadline: body.deadline,
        comments: body.comments,
      },
      documents: (body.documents || []).map((doc: { category: string; name: string; url?: string }) => ({
        ...doc,
        uploadedAt: new Date().toISOString(),
      })),
    };

    // Essayer Supabase d'abord
    if (isSupabaseConfigured()) {
      const supabaseRequest = await createSupabaseRequest(requestData);
      if (supabaseRequest) {
        console.log("📋 Demande fiscale créée dans Supabase:", supabaseRequest.reference);
        return NextResponse.json({
          success: true,
          reference: supabaseRequest.reference,
          id: supabaseRequest.id,
          storage: "supabase",
        });
      }
    }

    // Fallback sur le store en mémoire
    const memoryRequest = createMemoryRequest({
      status: "pending",
      payment: requestData.payment,
      customer: requestData.customer,
      fiscal: {
        ...requestData.fiscal,
        clientType: requestData.fiscal.clientType as "private" | "independent" | "couple",
        employmentStatus: requestData.fiscal.employmentStatus as "employed" | "retired" | "unemployed" | undefined,
        employmentStatus2: requestData.fiscal.employmentStatus2 as "employed" | "retired" | "unemployed" | undefined,
      },
      situation: requestData.situation,
      financial: requestData.financial,
      property: requestData.property,
      workplaces: requestData.workplaces,
      options: requestData.options,
      documents: requestData.documents.map((d: { category: string; name: string; url?: string; uploadedAt: string }) => ({
        ...d,
        uploadedAt: new Date(d.uploadedAt),
      })),
    });

    console.log("📋 Demande fiscale créée en mémoire:", memoryRequest.reference);
    console.warn("⚠️ ATTENTION: Données en mémoire - seront perdues au redémarrage du serveur");

    return NextResponse.json({
      success: true,
      reference: memoryRequest.reference,
      id: memoryRequest.id,
      storage: "memory",
      warning: "Données stockées en mémoire uniquement - Configurez Supabase pour la persistance",
    });
  } catch (error) {
    console.error("Erreur création demande fiscale:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la demande" },
      { status: 500 }
    );
  }
}

// GET - Obtenir toutes les demandes (admin)
export async function GET(request: NextRequest) {
  try {
    // Vérifier le mot de passe admin
    const adminPassword = request.headers.get("x-admin-password");
    const expectedPassword = process.env.ADMIN_PASSWORD || "neofidu-admin-2024";

    if (adminPassword !== expectedPassword) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Essayer Supabase d'abord
    if (isSupabaseConfigured()) {
      const requests = await getSupabaseRequests();
      const stats = await getSupabaseStats();

      return NextResponse.json({
        requests,
        stats,
        storage: "supabase",
      });
    }

    // Fallback sur le store en mémoire
    const requests = getMemoryRequests();
    const stats = getMemoryStats();

    return NextResponse.json({
      requests: requests.map(r => ({
        ...r,
        created_at: r.createdAt.toISOString(),
        updated_at: r.updatedAt.toISOString(),
        paid_at: r.paidAt?.toISOString(),
      })),
      stats,
      storage: "memory",
      warning: "Données stockées en mémoire - Configurez Supabase pour la persistance",
    });
  } catch (error) {
    console.error("Erreur récupération demandes fiscales:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des demandes" },
      { status: 500 }
    );
  }
}
