"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe ONCE outside the component
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function Payment() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Fetch client secret - FIXED: Only fetch once
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 360000, // £3,600 in pence
            currency: "gbp",
            agentCode: `INIT-${Date.now()}`,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Response error:", response.status, errorText);
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.clientSecret) {
          throw new Error("No client secret received");
        }

        setClientSecret(data.clientSecret);
        console.log(
          "✅ Client secret received, length:",
          data.clientSecret.length
        );
      } catch (err) {
        console.error("Failed to fetch client secret:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Payment setup failed: ${errorMessage}`);

        // Auto-retry once after 3 seconds
        if (retryCount < 1) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            console.log("🔄 Retrying client secret fetch...");
          }, 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [retryCount]);

  // Stripe Elements options - NEVER change once set
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#3b82f6",
        colorBackground: "#ffffff",
        colorText: "#1f2937",
        colorDanger: "#ef4444",
        fontFamily: "'Inter', 'system-ui', '-apple-system', sans-serif",
        spacingUnit: "4px",
        borderRadius: "8px",
      },
    },
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">
            Setting up secure payment
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This should only take a moment
          </p>
          <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full animate-pulse"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-red-600"
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
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Unable to Load Payment
            </h3>
            <p className="text-red-600 mb-5">{error}</p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setRetryCount(0);
                  setLoading(true);
                  setError(null);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-3 rounded-lg font-medium transition-colors"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main render - only when clientSecret is available
  if (!clientSecret) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Payment form not available</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="mt-6 inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure SSL Encryption • Powered by Stripe
          </div>
        </div>

        <div className="">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                {/* Render Elements provider with CheckoutForm */}
                <Elements
                  stripe={stripePromise}
                  options={options}
                  key={clientSecret} // Key ensures fresh instance when secret changes
                >
                  <CheckoutForm clientSecret={clientSecret} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
