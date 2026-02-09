import { NextRequest, NextResponse } from "next/server";
import { findRequestByReference } from "@/lib/requests-store";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    if (!reference || reference.length < 4) {
      return NextResponse.json(
        { error: "Référence invalide" },
        { status: 400 }
      );
    }

    const clientRequest = await findRequestByReference(reference);

    if (!clientRequest) {
      return NextResponse.json(
        { error: "Aucune demande trouvée avec cette référence" },
        { status: 404 }
      );
    }

    // Retourner les informations sans données sensibles
    return NextResponse.json({
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
    });
  } catch (error) {
    console.error("Erreur recherche demande:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
