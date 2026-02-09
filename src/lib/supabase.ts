import { createClient } from "@supabase/supabase-js";

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Client Supabase côté serveur (avec service role key pour les opérations admin)
export const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Types pour les demandes fiscales
export interface TaxRequestDB {
  id: string;
  reference: string;
  status: "pending" | "paid" | "in_progress" | "completed" | "delivered";
  created_at: string;
  updated_at: string;
  paid_at?: string;

  // Paiement (JSON)
  payment: {
    amount: number;
    currency: string;
    method?: string;
    stripePaymentIntentId?: string;
  };

  // Client (JSON)
  customer: {
    firstName: string;
    lastName: string;
    firstName2?: string;
    lastName2?: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      npa: string;
      city: string;
    };
  };

  // Fiscal (JSON)
  fiscal: {
    canton: string;
    cantonCode: string;
    taxYear: number;
    taxpayerNumber?: string;
    declarationCode?: string;
    clientType: string;
    employmentStatus?: string;
    employmentStatus2?: string;
  };

  // Situation (JSON)
  situation: {
    hasMoved?: boolean;
    hasChildren?: boolean;
    childrenCount?: number;
    monthlyRent?: string;
  };

  // Financial (JSON)
  financial: {
    hasPillar3a?: boolean;
    pillar3aAmount?: string;
    hasStocks?: boolean;
    stocksCount?: number;
    hasGuardCosts?: boolean;
    guardCosts?: string;
    hasAlimonyReceived?: boolean;
    alimonyReceived?: string;
    hasAlimonyPaid?: boolean;
    alimonyPaid?: string;
    hasDonations?: boolean;
    donationsAmount?: string;
    hasDebts?: boolean;
    debtsAmount?: string;
  };

  // Property (JSON)
  property: {
    hasProperty?: boolean;
    propertyCount?: number;
    hasMortgage?: boolean;
    mortgageAmount?: string;
    hasRenovations?: boolean;
    renovationsAmount?: string;
  };

  // Workplaces (JSON array)
  workplaces: {
    adult: number;
    employerName: string;
    transportMode: string;
    workplaceAddress: string;
    daysPerYear: string;
    distanceKm: string;
    employerReimbursement: boolean;
    reimbursementType: string;
    reimbursementAmount: string;
  }[];

  // Options (JSON)
  options: {
    deliveryMethod?: string;
    wantsReview?: boolean;
    deadline?: string;
    comments?: string;
  };

  // Documents (JSON array)
  documents: {
    category: string;
    name: string;
    url?: string;
    uploadedAt: string;
  }[];
}

// Vérifier si Supabase est configuré
export function isSupabaseConfigured(): boolean {
  return !!supabase;
}

// Générer une référence unique
export function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "NF-";
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

// Créer une nouvelle demande
export async function createTaxRequest(data: Omit<TaxRequestDB, "id" | "created_at" | "updated_at" | "reference">): Promise<TaxRequestDB | null> {
  if (!supabase) return null;

  const reference = generateReference();
  const now = new Date().toISOString();

  const { data: result, error } = await supabase
    .from("tax_requests")
    .insert({
      reference,
      status: data.status,
      paid_at: data.paid_at,
      payment: data.payment,
      customer: data.customer,
      fiscal: data.fiscal,
      situation: data.situation,
      financial: data.financial,
      property: data.property,
      workplaces: data.workplaces,
      options: data.options,
      documents: data.documents,
    })
    .select()
    .single();

  if (error) {
    console.error("Erreur création demande Supabase:", error);
    return null;
  }

  return result as TaxRequestDB;
}

// Récupérer toutes les demandes
export async function getAllTaxRequests(): Promise<TaxRequestDB[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("tax_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur récupération demandes Supabase:", error);
    return [];
  }

  return data as TaxRequestDB[];
}

// Trouver une demande par référence
export async function findTaxRequestByReference(reference: string): Promise<TaxRequestDB | null> {
  if (!supabase) return null;

  const normalizedRef = reference.toUpperCase().replace(/[^A-Z0-9-]/g, "");

  const { data, error } = await supabase
    .from("tax_requests")
    .select("*")
    .ilike("reference", `%${normalizedRef}%`)
    .limit(1)
    .single();

  if (error) {
    console.error("Erreur recherche demande Supabase:", error);
    return null;
  }

  return data as TaxRequestDB;
}

// Trouver une demande par PaymentIntent ID
export async function findTaxRequestByPaymentIntent(paymentIntentId: string): Promise<TaxRequestDB | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("tax_requests")
    .select("*")
    .filter("payment->stripePaymentIntentId", "eq", paymentIntentId)
    .limit(1)
    .single();

  if (error) {
    console.error("Erreur recherche par PaymentIntent:", error);
    return null;
  }

  return data as TaxRequestDB;
}

// Mettre à jour le statut d'une demande
export async function updateTaxRequestStatus(
  id: string,
  status: TaxRequestDB["status"],
  paidAt?: string
): Promise<TaxRequestDB | null> {
  if (!supabase) return null;

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (paidAt) {
    updateData.paid_at = paidAt;
  }

  const { data, error } = await supabase
    .from("tax_requests")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Erreur mise à jour statut Supabase:", error);
    return null;
  }

  return data as TaxRequestDB;
}

// Mettre à jour le PaymentIntent d'une demande
export async function updateTaxRequestPayment(
  reference: string,
  paymentIntentId: string
): Promise<TaxRequestDB | null> {
  if (!supabase) return null;

  // D'abord récupérer la demande pour avoir le payment actuel
  const request = await findTaxRequestByReference(reference);
  if (!request) return null;

  const updatedPayment = {
    ...request.payment,
    stripePaymentIntentId: paymentIntentId,
  };

  const { data, error } = await supabase
    .from("tax_requests")
    .update({
      payment: updatedPayment,
      updated_at: new Date().toISOString(),
    })
    .eq("id", request.id)
    .select()
    .single();

  if (error) {
    console.error("Erreur mise à jour payment Supabase:", error);
    return null;
  }

  return data as TaxRequestDB;
}

// Obtenir les statistiques
export async function getTaxRequestStats() {
  if (!supabase) {
    return {
      total: 0,
      paid: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      totalRevenue: 0,
    };
  }

  const { data, error } = await supabase
    .from("tax_requests")
    .select("status, payment");

  if (error) {
    console.error("Erreur stats Supabase:", error);
    return {
      total: 0,
      paid: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      totalRevenue: 0,
    };
  }

  const requests = data as { status: string; payment: { amount: number } }[];

  return {
    total: requests.length,
    paid: requests.filter(r => r.status !== "pending").length,
    pending: requests.filter(r => r.status === "pending").length,
    inProgress: requests.filter(r => r.status === "in_progress").length,
    completed: requests.filter(r => r.status === "completed" || r.status === "delivered").length,
    totalRevenue: requests
      .filter(r => r.status !== "pending")
      .reduce((sum, r) => sum + (r.payment?.amount || 0), 0),
  };
}

// Interface pour l'historique des statuts
export interface StatusHistoryEntry {
  id: string;
  request_id: string;
  request_reference: string;
  old_status: string;
  new_status: string;
  changed_at: string;
  changed_by: string;
  notification_sent: boolean;
}

// Ajouter une entrée dans l'historique des statuts
export async function addStatusHistory(
  requestId: string,
  requestReference: string,
  oldStatus: string,
  newStatus: string,
  changedBy: string = "admin",
  notificationSent: boolean = false
): Promise<StatusHistoryEntry | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("status_history")
    .insert({
      request_id: requestId,
      request_reference: requestReference,
      old_status: oldStatus,
      new_status: newStatus,
      changed_by: changedBy,
      notification_sent: notificationSent,
    })
    .select()
    .single();

  if (error) {
    console.error("Erreur ajout historique statut:", error);
    return null;
  }

  return data as StatusHistoryEntry;
}

// Récupérer l'historique des statuts pour une demande
export async function getStatusHistoryForRequest(requestId: string): Promise<StatusHistoryEntry[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("status_history")
    .select("*")
    .eq("request_id", requestId)
    .order("changed_at", { ascending: false });

  if (error) {
    console.error("Erreur récupération historique:", error);
    return [];
  }

  return data as StatusHistoryEntry[];
}

// Récupérer tout l'historique des statuts (pour le dashboard)
export async function getAllStatusHistory(limit: number = 50): Promise<StatusHistoryEntry[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("status_history")
    .select("*")
    .order("changed_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erreur récupération historique global:", error);
    return [];
  }

  return data as StatusHistoryEntry[];
}

// Obtenir les statistiques par jour (pour les graphiques)
export async function getRequestsPerDay(days: number = 30): Promise<{ date: string; count: number; revenue: number }[]> {
  if (!supabase) return [];

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("tax_requests")
    .select("created_at, payment")
    .gte("created_at", startDate.toISOString());

  if (error) {
    console.error("Erreur stats par jour:", error);
    return [];
  }

  // Grouper par jour
  const groupedByDay: Record<string, { count: number; revenue: number }> = {};

  for (const request of data as { created_at: string; payment: { amount: number } }[]) {
    const date = request.created_at.split("T")[0];
    if (!groupedByDay[date]) {
      groupedByDay[date] = { count: 0, revenue: 0 };
    }
    groupedByDay[date].count++;
    groupedByDay[date].revenue += request.payment?.amount || 0;
  }

  // Convertir en tableau
  return Object.entries(groupedByDay)
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Obtenir les statistiques par canton
export async function getRequestsPerCanton(): Promise<{ canton: string; count: number; revenue: number }[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("tax_requests")
    .select("fiscal, payment");

  if (error) {
    console.error("Erreur stats par canton:", error);
    return [];
  }

  // Grouper par canton
  const groupedByCanton: Record<string, { count: number; revenue: number }> = {};

  for (const request of data as { fiscal: { cantonCode: string }; payment: { amount: number } }[]) {
    const canton = request.fiscal?.cantonCode || "Autre";
    if (!groupedByCanton[canton]) {
      groupedByCanton[canton] = { count: 0, revenue: 0 };
    }
    groupedByCanton[canton].count++;
    groupedByCanton[canton].revenue += request.payment?.amount || 0;
  }

  // Convertir en tableau
  return Object.entries(groupedByCanton)
    .map(([canton, stats]) => ({ canton, ...stats }))
    .sort((a, b) => b.count - a.count);
}

// SQL pour créer la table (à exécuter dans Supabase Dashboard)
export const CREATE_TABLE_SQL = `
-- Table des demandes fiscales
CREATE TABLE IF NOT EXISTS tax_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  payment JSONB NOT NULL,
  customer JSONB NOT NULL,
  fiscal JSONB NOT NULL,
  situation JSONB,
  financial JSONB,
  property JSONB,
  workplaces JSONB,
  options JSONB,
  documents JSONB
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_tax_requests_reference ON tax_requests(reference);
CREATE INDEX IF NOT EXISTS idx_tax_requests_status ON tax_requests(status);
CREATE INDEX IF NOT EXISTS idx_tax_requests_created_at ON tax_requests(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE tax_requests ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre toutes les opérations avec la service role key
CREATE POLICY "Service role can do everything" ON tax_requests
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Table d'historique des changements de statut
CREATE TABLE IF NOT EXISTS status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES tax_requests(id) ON DELETE CASCADE,
  request_reference TEXT NOT NULL,
  old_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  changed_by TEXT DEFAULT 'admin',
  notification_sent BOOLEAN DEFAULT false
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_status_history_request_id ON status_history(request_id);
CREATE INDEX IF NOT EXISTS idx_status_history_changed_at ON status_history(changed_at DESC);

-- Row Level Security (RLS)
ALTER TABLE status_history ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre toutes les opérations avec la service role key
CREATE POLICY "Service role can do everything" ON status_history
  FOR ALL
  USING (true)
  WITH CHECK (true);
`;
