import { NextRequest, NextResponse } from "next/server";
import { findRequestByReference } from "@/lib/requests-store";
import { verifyCode } from "@/lib/verification-store";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference, code } = body;

    if (!reference || !code) {
      return NextResponse.json(
        { error: "Référence et code requis" },
        { status: 400 }
      );
    }

    if (code.length !== 6 || !/^\d+$/.test(code)) {
      return NextResponse.json(
        { error: "Le code doit contenir 6 chiffres" },
        { status: 400 }
      );
    }

    // Vérifier que la demande existe
    const clientRequest = await findRequestByReference(reference);
    if (!clientRequest) {
      return NextResponse.json(
        { error: "Demande non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier le code
    const result = verifyCode(clientRequest.reference, clientRequest.customerEmail, code);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Code valide - retourner les données de la demande
    return NextResponse.json({
      success: true,
      request: {
        reference: clientRequest.reference,
        type: clientRequest.type,
        status: clientRequest.status,
        statusHistory: clientRequest.statusHistory,
        canton: clientRequest.canton,
        paymentStatus: clientRequest.paymentStatus,
        createdAt: clientRequest.createdAt,
        updatedAt: clientRequest.updatedAt,
        estimatedCompletion: clientRequest.estimatedCompletion,
        notes: clientRequest.notes,
        documentsCount: clientRequest.documents?.length || 0,
      },
    });
  } catch (error) {
    console.error("Erreur vérification code:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification" },
      { status: 500 }
    );
  }
}
