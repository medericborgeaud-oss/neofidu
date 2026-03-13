"use client";

import { StripePaymentForm } from "@/components/StripePaymentForm";

interface PaymentMethodSelectorProps {
  amount: number; // en CHF
  customerEmail: string;
  customerName: string;
  description?: string;
  metadata?: Record<string, string>;
  taxRequestReference: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

export function PaymentMethodSelector({
  amount,
  customerEmail,
  customerName,
  description,
  metadata,
  onSuccess,
  onError,
}: PaymentMethodSelectorProps) {
  // Direct card payment via Stripe (no payment method selection needed)
  return (
    <StripePaymentForm
      amount={amount}
      customerEmail={customerEmail}
      customerName={customerName}
      description={description}
      metadata={metadata}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
}
