// Store des demandes clients (avec Supabase si configuré)

import { supabase, isSupabaseConfigured } from "./supabase";

export type RequestStatus =
  | "received"      // Demande reçue
  | "payment_pending" // En attente de paiement
  | "in_review"     // En cours d'analyse
  | "documents_needed" // Documents supplémentaires requis
  | "in_progress"   // En traitement
  | "completed"     // Terminé
  | "delivered";    // Livré au client

export interface ClientRequest {
  id: string;
  reference: string;
  type: "tax" | "accounting" | "property";
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  canton: string;
  status: RequestStatus;
  statusHistory: {
    status: RequestStatus;
    date: Date;
    note?: string;
  }[];
  amount: number;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: Date;
  updatedAt: Date;
  estimatedCompletion?: Date;
  documents?: {
    name: string;
    uploadedAt: Date;
    url?: string;
  }[];
  notes?: string;
  data?: Record<string, unknown>;
}

// Status labels en français
export const statusLabels: Record<RequestStatus, string> = {
  received: "Demande reçue",
  payment_pending: "En attente de paiement",
  in_review: "En cours d'analyse",
  documents_needed: "Documents requis",
  in_progress: "En traitement",
  completed: "Terminé",
  delivered: "Livré",
};

// Status colors
export const statusColors: Record<RequestStatus, string> = {
  received: "bg-blue-100 text-blue-800",
  payment_pending: "bg-yellow-100 text-yellow-800",
  in_review: "bg-purple-100 text-purple-800",
  documents_needed: "bg-orange-100 text-orange-800",
  in_progress: "bg-teal-100 text-teal-800",
  completed: "bg-green-100 text-green-800",
  delivered: "bg-emerald-100 text-emerald-800",
};

// Store en mémoire (fallback)
export const requestsStore: ClientRequest[] = [];

// ============ FONCTIONS SUPABASE ============

// Créer une demande dans Supabase
export async function createRequestInSupabase(data: Omit<ClientRequest, "id" | "createdAt" | "updatedAt">): Promise<ClientRequest | null> {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn("Supabase non configuré - utilisation mémoire");
    return null;
  }

  try {
    const { data: result, error } = await supabase
      .from("requests")
      .insert({
        reference: data.reference,
        type: data.type,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        canton: data.canton,
        status: data.status,
        status_history: data.statusHistory,
        amount: data.amount,
        payment_status: data.paymentStatus,
        estimated_completion: data.estimatedCompletion,
        documents: data.documents,
        notes: data.notes,
        data: data.data,
      })
      .select()
      .single();

    if (error) {
      console.error("Erreur création request Supabase:", error);
      return null;
    }

    return {
      id: result.id,
      reference: result.reference,
      type: result.type,
      customerName: result.customer_name,
      customerEmail: result.customer_email,
      customerPhone: result.customer_phone,
      canton: result.canton,
      status: result.status,
      statusHistory: result.status_history || [],
      amount: result.amount,
      paymentStatus: result.payment_status,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
      estimatedCompletion: result.estimated_completion ? new Date(result.estimated_completion) : undefined,
      documents: result.documents,
      notes: result.notes,
      data: result.data,
    };
  } catch (err) {
    console.error("Exception création request:", err);
    return null;
  }
}

// Trouver une demande par référence dans Supabase
export async function findRequestInSupabase(reference: string): Promise<ClientRequest | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .ilike("reference", `%${reference}%`)
      .limit(1)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      reference: data.reference,
      type: data.type,
      customerName: data.customer_name,
      customerEmail: data.customer_email,
      customerPhone: data.customer_phone,
      canton: data.canton,
      status: data.status,
      statusHistory: data.status_history || [],
      amount: data.amount,
      paymentStatus: data.payment_status,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      estimatedCompletion: data.estimated_completion ? new Date(data.estimated_completion) : undefined,
      documents: data.documents,
      notes: data.notes,
      data: data.data,
    };
  } catch {
    return null;
  }
}

// Récupérer toutes les demandes depuis Supabase
export async function getAllRequestsFromSupabase(): Promise<ClientRequest[]> {
  if (!isSupabaseConfigured() || !supabase) return [];

  try {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((r) => ({
      id: r.id,
      reference: r.reference,
      type: r.type,
      customerName: r.customer_name,
      customerEmail: r.customer_email,
      customerPhone: r.customer_phone,
      canton: r.canton,
      status: r.status,
      statusHistory: r.status_history || [],
      amount: r.amount,
      paymentStatus: r.payment_status,
      createdAt: new Date(r.created_at),
      updatedAt: new Date(r.updated_at),
      estimatedCompletion: r.estimated_completion ? new Date(r.estimated_completion) : undefined,
      documents: r.documents,
      notes: r.notes,
      data: r.data,
    }));
  } catch {
    return [];
  }
}

// ============ FONCTIONS EXISTANTES (avec Supabase) ============

// Fonction pour trouver une demande par référence
export async function findRequestByReference(reference: string): Promise<ClientRequest | undefined> {
  // Essayer Supabase d'abord
  const supabaseResult = await findRequestInSupabase(reference);
  if (supabaseResult) return supabaseResult;

  // Fallback mémoire
  const normalizedRef = reference.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return requestsStore.find((req) => {
    const storedRef = req.reference.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return storedRef === normalizedRef || storedRef.endsWith(normalizedRef) || normalizedRef.endsWith(storedRef);
  });
}

// Fonction pour créer une nouvelle demande
export async function createRequest(data: Omit<ClientRequest, "id" | "statusHistory" | "createdAt" | "updatedAt">): Promise<ClientRequest> {
  const requestData = {
    ...data,
    statusHistory: [{ status: data.status, date: new Date() }],
  };

  // Essayer Supabase d'abord
  const supabaseResult = await createRequestInSupabase(requestData);
  if (supabaseResult) {
    console.log("✅ Request créée dans Supabase:", supabaseResult.reference);
    return supabaseResult;
  }

  // Fallback mémoire
  console.warn("⚠️ Request créée en mémoire (Supabase non configuré)");
  const request: ClientRequest = {
    ...data,
    id: `req_${Date.now()}`,
    statusHistory: [{ status: data.status, date: new Date() }],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  requestsStore.unshift(request);
  return request;
}

// Fonction pour mettre à jour le statut
export async function updateRequestStatus(reference: string, status: RequestStatus, note?: string): Promise<ClientRequest | undefined> {
  // Supabase
  if (isSupabaseConfigured() && supabase) {
    const existing = await findRequestInSupabase(reference);
    if (existing) {
      const newHistory = [...(existing.statusHistory || []), { status, date: new Date(), note }];
      await supabase
        .from("requests")
        .update({
          status,
          status_history: newHistory,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      existing.status = status;
      existing.statusHistory = newHistory;
      existing.updatedAt = new Date();
      return existing;
    }
  }

  // Fallback mémoire
  const request = requestsStore.find(r => r.reference.includes(reference));
  if (request) {
    request.status = status;
    request.statusHistory.push({ status, date: new Date(), note });
    request.updatedAt = new Date();
  }
  return request;
}
