import { NextRequest, NextResponse } from "next/server";
import { findRequestByReference, ClientRequest } from "@/lib/requests-store";
import { findTaxRequestByReference, findGenericRequestByReference, TaxRequestDB, GenericRequestDB } from "@/lib/supabase";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Convert TaxRequestDB to a tracking-friendly format
function formatTaxRequest(taxRequest: TaxRequestDB) {
  return {
    reference: taxRequest.reference,
    type: "tax" as const,
    status: taxRequest.status,
    statusLabel: getStatusLabel(taxRequest.status),
    statusHistory: [], // Tax requests don't have status history in the same format
    canton: taxRequest.fiscal.canton,
    paymentStatus: taxRequest.status === "pending" ? "pending" : "paid",
    createdAt: taxRequest.created_at,
    updatedAt: taxRequest.updated_at,
    customerName: `${taxRequest.customer.firstName} ${taxRequest.customer.lastName}`,
    estimatedCompletion: undefined,
    notes: taxRequest.options?.comments,
    documentsCount: taxRequest.documents?.length || 0,
  };
}

// Convert ClientRequest (generic request from memory) to a tracking-friendly format
function formatGenericRequest(request: ClientRequest) {
  return {
    reference: request.reference,
    type: request.type,
    status: request.status,
    statusLabel: getStatusLabel(request.status),
    statusHistory: request.statusHistory,
    canton: request.canton,
    paymentStatus: request.paymentStatus,
    createdAt: request.createdAt,
    updatedAt: request.updatedAt,
    customerName: request.customerName,
    estimatedCompletion: request.estimatedCompletion,
    notes: request.notes,
    documentsCount: request.documents?.length || 0,
  };
}

// Convert GenericRequestDB (from Supabase) to a tracking-friendly format
function formatGenericRequestDB(request: GenericRequestDB) {
  return {
    reference: request.reference,
    type: request.type,
    status: request.status,
    statusLabel: getStatusLabel(request.status),
    statusHistory: request.status_history || [],
    canton: request.canton,
    paymentStatus: request.payment_status,
    createdAt: request.created_at,
    updatedAt: request.updated_at,
    customerName: request.customer_name,
    estimatedCompletion: request.estimated_completion,
    notes: request.notes,
    documents: request.documents,
    documentsCount: request.documents?.length || 0,
  };
}

// Get human-readable status label
function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    // Tax request statuses
    pending: "En attente de paiement",
    paid: "Payé",
    in_progress: "En cours de traitement",
    completed: "Terminé",
    delivered: "Livré",
    // Generic request statuses (accounting, property)
    received: "Demande reçue",
    processing: "En traitement",
    done: "Terminé",
    // Other
    payment_pending: "En attente de paiement",
    in_review: "En cours d'analyse",
    documents_needed: "Documents requis",
  };
  return labels[status] || status;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    console.log(`[API] Recherche de la demande: ${reference}`);

    if (!reference || reference.length < 4) {
      return NextResponse.json(
        { error: "Référence invalide" },
        { status: 400 }
      );
    }

    // 1. First try to find in Supabase generic requests table (accounting, property)
    const genericRequestDB = await findGenericRequestByReference(reference);
    if (genericRequestDB) {
      console.log(`[API] Demande générique trouvée (Supabase): ${genericRequestDB.reference}, status: ${genericRequestDB.status}`);
      return NextResponse.json(formatGenericRequestDB(genericRequestDB));
    }

    // 2. Then try to find in the tax_requests table
    const taxRequest = await findTaxRequestByReference(reference);
    if (taxRequest) {
      console.log(`[API] Demande fiscale trouvée: ${taxRequest.reference}, status: ${taxRequest.status}`);
      return NextResponse.json(formatTaxRequest(taxRequest));
    }

    // 3. Fallback to in-memory store (for backwards compatibility)
    const genericRequestMemory = await findRequestByReference(reference);
    if (genericRequestMemory) {
      console.log(`[API] Demande générique trouvée (mémoire): ${genericRequestMemory.reference}, status: ${genericRequestMemory.status}`);
      return NextResponse.json(formatGenericRequest(genericRequestMemory));
    }

    console.log(`[API] Aucune demande trouvée pour: ${reference}`);
    return NextResponse.json(
      { error: "Aucune demande trouvée avec cette référence" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Erreur recherche demande:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
