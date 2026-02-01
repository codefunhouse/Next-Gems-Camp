export type PaymentOption = "full" | "deposit";

export interface ProgramCycle {
  id: string; // Stripe Product ID
  name: string;
  startDate: string;
  endDate: string;
  isEligible: boolean;
  balanceDueDate: string;
  ageRange: string;
  ageRangeInfo: string;
  location: string;
  pricing: {
    full: { priceId: string; amount: number };
    deposit: { priceId: string; amount: number; balanceAmount: number };
  };
}

export interface AgeRangeGroup {
  ageRange: string;
  ageRangeInfo: string;
  location: string;
  cycleCount: number;
}

export interface EligibilityResponse {
  cycles: ProgramCycle[];
}

export interface CreatePaymentIntentRequest {
  productId: string;
  priceId: string;
  paymentOption: PaymentOption;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export interface VerifyPaymentResponse {
  status: string;
  amount: number;
  currency: string;
  agentCode?: string;
  customerEmail?: string;
  created: string;
  paymentType?: PaymentOption;
  productId?: string;
  balanceAmount?: number;
  balanceDueDate?: string;
}
