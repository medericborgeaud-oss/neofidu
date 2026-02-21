// Store des paiements en mémoire (en production, utiliser une base de données)
export interface PaymentRecord {
  id: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: "succeeded" | "failed" | "pending" | "refunded";
  customerEmail: string;
  customerName: string;
  description: string;
  paymentMethod: string;
  createdAt: Date;
  metadata: Record<string, string>;
}

// Store global pour les paiements (en mémoire)
// Note: En production, utiliser une vraie base de données
export const paymentsStore: PaymentRecord[] = [];
