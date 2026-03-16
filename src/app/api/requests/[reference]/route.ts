import { NextRequest, NextResponse } from "next/server";
import { findRequestByReference, ClientRequest } from "@/lib/requests-store";
import { findTaxRequestByReference, findGenericRequestByReference, TaxRequestDB, GenericRequestDB } from "@/lib/supabase";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Convert TaxRequestDB to a tracking-friendly format
// IMPORTANT: Ne pas exposer d'informations confidentielles (commentaires client, etc.)
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
    // SÉCURITÉ: Ne pas exposer les commentaires du client sur la page de suivi publique
    // notes: taxRequest.options?.comments, // SUPPRIMÉ - Information confidentielle
    documentsCount: taxRequest.documents?.length || 0,
  };
}

// Convert ClientRequest (generic request from memory) to a tracking-friendly format
// IMPORTANT: Ne pas exposer d'informations confidentielles
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
    // SÉCURITÉ: Ne pas exposer les notes internes sur la page de suivi publique
    // notes: request.notes, // SUPPRIMÉ - Information confidentielle
    documentsCount: request.documents?.length || 0,
  };
}

// Convert GenericRequestDB (from Supabase) to a tracking-friendly format
// IMPORTANT: Ne pas exposer d'informations confidentielles
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
    // SÉCURITÉ: Ne pas exposer les notes internes sur la page de suivi publique
    // notes: request.notes, // SUPPRIMÉ - Information confidentielle
    // Ne retourner que les noms des documents, pas les URLs (pour éviter l'accès direct)
    documents: request.documents?.map(doc => ({ name: doc.name, uploadedAt: doc.uploadedAt || request.created_at })),
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
      console.log(`[API SUIVI GENERIC] ✅ Demande générique trouvée (Supabase):`);
      console.log(`[API SUIVI GENERIC]   - reference: ${genericRequestDB.reference}`);
      console.log(`[API SUIVI GENERIC]   - status DB: ${genericRequestDB.status}`);
      console.log(`[API SUIVI GENERIC]   - status_history: ${JSON.stringify(genericRequestDB.status_history)}`);
      console.log(`[API SUIVI GENERIC]   - updated_at: ${genericRequestDB.updated_at}`);

      const formatted = formatGenericRequestDB(genericRequestDB);
      console.log(`[API SUIVI GENERIC]   - status formaté: ${formatted.status}`);

      // Add no-cache headers to prevent browser caching
      return new NextResponse(JSON.stringify(formatted), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      });
    }

    // 2. Then try to find in the tax_requests table
    console.log(`[API SUIVI] Recherche dans tax_requests pour: ${reference}`);
    const taxRequest = await findTaxRequestByReference(reference);
    if (taxRequest) {
      console.log(`[API SUIVI] ✅ Demande fiscale trouvée dans Supabase:`);
      console.log(`[API SUIVI]   - reference: ${taxRequest.reference}`);
      console.log(`[API SUIVI]   - status DB: ${taxRequest.status}`);
      console.log(`[API SUIVI]   - paid_at: ${taxRequest.paid_at}`);
      console.log(`[API SUIVI]   - updated_at: ${taxRequest.updated_at}`);
      const formatted = formatTaxRequest(taxRequest);
      console.log(`[API SUIVI]   - status formaté: ${formatted.status}`);
      console.log(`[API SUIVI]   - paymentStatus: ${formatted.paymentStatus}`);

      // Add no-cache headers to prevent browser caching
      return new NextResponse(JSON.stringify(formatted), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      });
    } else {
      console.log(`[API SUIVI] ❌ Aucune demande fiscale trouvée dans tax_requests`);
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
