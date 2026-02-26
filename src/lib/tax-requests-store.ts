// Store des demandes de déclaration fiscale avec toutes les données
// Pour un stockage persistant à long terme, utiliser Supabase ou une BDD

export interface TaxRequestData {
  id: string;
  reference: string;
  status: "pending" | "paid" | "in_progress" | "completed" | "delivered";
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;

  // Paiement
  payment: {
    amount: number;
    currency: string;
    method?: string;
    stripePaymentIntentId?: string;
  };

  // Infos client
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

  // Infos fiscales
  fiscal: {
    canton: string;
    cantonCode: string;
    taxYear: number;
    taxpayerNumber?: string;
    declarationCode?: string;
    clientType: "private" | "independent" | "couple";
    employmentStatus?: "employed" | "retired" | "unemployed";
    employmentStatus2?: "employed" | "retired" | "unemployed";
  };

  // Situation personnelle
  situation: {
    hasMoved?: boolean;
    hasChildren?: boolean;
    childrenCount?: number;
    monthlyRent?: string;
  };

  // Données financières
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

  // Immobilier
  property: {
    hasProperty?: boolean;
    propertyCount?: number;
    hasMortgage?: boolean;
    mortgageAmount?: string;
    hasRenovations?: boolean;
    renovationsAmount?: string;
  };

  // Trajets
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

  // Options
  options: {
    deliveryMethod?: string;
    wantsReview?: boolean;
    deadline?: string;
    comments?: string;
  };

  // Documents
  documents: {
    category: string;
    name: string;
    url?: string;
    uploadedAt: Date;
  }[];
}

// Store en mémoire (sera remplacé par Supabase en production)
// Note: Ces données sont perdues au redémarrage du serveur
export const taxRequestsStore: TaxRequestData[] = [];

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
export function createTaxRequest(data: Omit<TaxRequestData, "id" | "createdAt" | "updatedAt" | "reference">): TaxRequestData {
  const request: TaxRequestData = {
    ...data,
    id: `tax_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    reference: generateReference(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  taxRequestsStore.unshift(request);
  return request;
}

// Trouver une demande par référence
export function findTaxRequestByReference(reference: string): TaxRequestData | undefined {
  const normalizedRef = reference.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return taxRequestsStore.find((req) => {
    const storedRef = req.reference.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return storedRef === normalizedRef || storedRef.endsWith(normalizedRef) || normalizedRef.endsWith(storedRef);
  });
}

// Trouver une demande par PaymentIntent ID
export function findTaxRequestByPaymentIntent(paymentIntentId: string): TaxRequestData | undefined {
  return taxRequestsStore.find((req) => req.payment.stripePaymentIntentId === paymentIntentId);
}

// Mettre à jour le statut d'une demande
export function updateTaxRequestStatus(reference: string, status: TaxRequestData["status"], paidAt?: Date): TaxRequestData | undefined {
  const request = findTaxRequestByReference(reference);
  if (request) {
    request.status = status;
    request.updatedAt = new Date();
    if (paidAt) {
      request.paidAt = paidAt;
    }
  }
  return request;
}

// Mettre à jour une demande avec le PaymentIntent
export function updateTaxRequestPayment(reference: string, paymentIntentId: string): TaxRequestData | undefined {
  const request = findTaxRequestByReference(reference);
  if (request) {
    request.payment.stripePaymentIntentId = paymentIntentId;
    request.updatedAt = new Date();
  }
  return request;
}

// Obtenir toutes les demandes
export function getAllTaxRequests(): TaxRequestData[] {
  return [...taxRequestsStore];
}

// Obtenir les statistiques
export function getTaxRequestStats() {
  const total = taxRequestsStore.length;
  const paid = taxRequestsStore.filter(r => r.status !== "pending").length;
  const pending = taxRequestsStore.filter(r => r.status === "pending").length;
  const inProgress = taxRequestsStore.filter(r => r.status === "in_progress").length;
  const completed = taxRequestsStore.filter(r => r.status === "completed" || r.status === "delivered").length;
  const totalRevenue = taxRequestsStore
    .filter(r => r.status !== "pending")
    .reduce((sum, r) => sum + r.payment.amount, 0);

  return {
    total,
    paid,
    pending,
    inProgress,
    completed,
    totalRevenue,
  };
}
