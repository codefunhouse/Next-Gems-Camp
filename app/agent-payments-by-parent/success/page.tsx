"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [agentCode, setAgentCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "succeeded" | "failed"
  >("processing");
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
        // Option 1: Fetch from your backend (recommended for security)
        const response = await fetch(
          `/api/verify-payment?payment_intent_id=${paymentIntentId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to verify: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "succeeded") {
          setPaymentStatus("succeeded");
          // Get agent code from metadata (more reliable than URL)
          setAgentCode(data.agentCode || agentCodeFromUrl);
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
            <h4 className="text-2xl font-bold text-gray-800 mb-2">
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

  // Success page
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h4 className="mb-2">Payment Successful!</h4>
          <p className="text-gray-600">
            Thank you for your booking. Your payment has been confirmed.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Transaction ID: {paymentIntentId?.substring(0, 12)}...
          </p>
        </div>

        {agentCode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 mb-1">Your Agent Reference:</p>
            <p className="text-lg font-bold text-blue-900">{agentCode}</p>
            <p className="text-xs text-blue-700 mt-2">
              Please save this code for future communication.
            </p>
          </div>
        )}

        <div className="space-y-4 text-left bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-700">What Happens Next:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Payment confirmation email sent within 5 minutes</li>
            <li>• Our team will contact you within 24 hours</li>
            <li>• Your agent will contact you</li>
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
