"use client";

import { PaymentOption } from "@/types/payment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentDetails {
  status: string;
  amount: number;
  currency: string;
  agentCode?: string;
  customerEmail?: string;
  paymentType: PaymentOption;
  productName?: string;
  balanceAmount?: number;
  balanceDueDate?: string;
}

function formatPrice(amount: number, currency: string = "gbp"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function SuccessPage() {
  const [agentCode, setAgentCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "succeeded" | "failed"
  >("processing");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const searchParams = useSearchParams();

  const paymentIntentId = searchParams.get("payment_intent");
  const agentCodeFromUrl = searchParams.get("agentCode");

  useEffect(() => {
    async function verifyPayment() {
      if (!paymentIntentId) {
        console.error("No payment_intent found in URL");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/verify-payment?payment_intent_id=${paymentIntentId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to verify: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "succeeded") {
          setPaymentStatus("succeeded");
          setAgentCode(data.agentCode || agentCodeFromUrl);
          setPaymentDetails({
            status: data.status,
            amount: data.amount,
            currency: data.currency,
            agentCode: data.agentCode,
            customerEmail: data.customerEmail,
            paymentType: data.paymentType || "full",
            productName: data.productName,
            balanceAmount: data.balanceAmount,
            balanceDueDate: data.balanceDueDate,
          });
        } else {
          setPaymentStatus("failed");
        }
      } catch (error) {
        console.error("Failed to verify payment:", error);
        setPaymentStatus("failed");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [paymentIntentId, agentCodeFromUrl]);

  // While loading, show a loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finalizing your payment...</p>
          <p className="text-sm text-gray-500 mt-2">
            This usually takes 2-5 seconds
          </p>
        </div>
      </div>
    );
  }

  // Handle failed payments
  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Payment Processing
            </h4>
            <p className="text-gray-600">
              Your payment is being processed. We&apos;ll email you confirmation
              shortly.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Reference: {paymentIntentId}
            </p>
          </div>

          <Link
            href="/"
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isDeposit = paymentDetails?.paymentType === "deposit";

  // Success page
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDeposit ? "bg-blue-100" : "bg-green-100"}`}>
            <svg
              className={`w-8 h-8 ${isDeposit ? "text-blue-600" : "text-green-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {isDeposit ? (
            <>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Deposit Received!</h4>
              <p className="text-sm text-gray-600">
                Your 25% deposit of {paymentDetails && formatPrice(paymentDetails.amount, paymentDetails.currency)} has been confirmed.
              </p>
            </>
          ) : (
            <>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Successful!</h4>
              <p className="text-sm text-gray-600">
                Thank you for your booking. Your payment has been confirmed.
              </p>
            </>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Transaction ID: {paymentIntentId?.substring(0, 12)}...
          </p>
        </div>

        {/* Deposit-specific info */}
        {isDeposit && paymentDetails?.balanceAmount && paymentDetails?.balanceDueDate && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-left">
                <p className="text-sm font-medium text-amber-800 mb-1">
                  Balance Invoice Sent
                </p>
                <p className="text-sm text-amber-700">
                  An invoice for the remaining{" "}
                  <strong>{formatPrice(paymentDetails.balanceAmount, paymentDetails.currency)}</strong>{" "}
                  has been sent to your email.
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Payment due by:{" "}
                  <strong>{formatDate(paymentDetails.balanceDueDate)}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {agentCode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 mb-1">Your Agent Reference:</p>
            <p className="text-lg font-bold text-blue-900">{agentCode}</p>
            <p className="text-xs text-blue-700 mt-2">
              Please save this code for future communication.
            </p>
          </div>
        )}

        <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="text-sm font-semibold text-gray-700">What Happens Next:</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Payment confirmation email sent within 5 minutes</li>
            {isDeposit && (
              <li>• Balance invoice sent to your email</li>
            )}
            <li>• Our team will contact you within 24 hours</li>
            <li>
              • Please check your spam folder if you don&apos;t see the email
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Return to Home
          </Link>
          <a
            href={`mailto:support@nextgemscamp.com?subject=Payment%20Query%20${paymentIntentId}`}
            className="block border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-50"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
