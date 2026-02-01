"use client";

import {
  AgeRangeGroup,
  EligibilityResponse,
  PaymentOption,
  ProgramCycle,
} from "@/types/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "../general/Logo";
import AgeRangeSelector from "./AgeRangeSelector";
import CheckoutForm from "./CheckoutForm";
import ContactUs from "./ContactUs";
import CycleSelector from "./CycleSelector";
import PaymentOptionSelector from "./PaymentOptionSelector";

// Initialize Stripe ONCE outside the component
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type FlowStep =
  | "loading"
  | "no-agent-code"
  | "age-range-select"
  | "cycle-select"
  | "payment-select"
  | "checkout"
  | "contact"
  | "error";

function Payment() {
  const searchParams = useSearchParams();
  const agentCode = searchParams.get("agentCode");

  const [step, setStep] = useState<FlowStep>("loading");
  const [cycles, setCycles] = useState<ProgramCycle[]>([]);
  const [selectedCycle, setSelectedCycle] = useState<ProgramCycle | null>(null);
  const [paymentOption, setPaymentOption] = useState<PaymentOption | null>(
    null,
  );
  const [clientSecret, setClientSecret] = useState<string>("");
  const [ageRangeGroups, setAgeRangeGroups] = useState<AgeRangeGroup[]>([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRangeGroup | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  // Fetch eligibility on mount (only if agentCode is present)
  useEffect(() => {
    // Check for agent code first
    if (!agentCode) {
      setStep("no-agent-code");
      return;
    }

    const fetchEligibility = async () => {
      try {
        const response = await fetch("/api/check-eligibility");

        if (!response.ok) {
          throw new Error(`Failed to fetch eligibility: ${response.status}`);
        }

        const data: EligibilityResponse = await response.json();
        setCycles(data.cycles);

        // Check if any cycles are eligible
        const eligibleCycles = data.cycles.filter((c) => c.isEligible);

        if (eligibleCycles.length === 0) {
          setStep("contact");
          return;
        }

        // Group eligible cycles by age range
        const groupMap = new Map<string, { info: string; location: string; count: number }>();
        for (const cycle of eligibleCycles) {
          const key = cycle.ageRange;
          if (!groupMap.has(key)) {
            groupMap.set(key, {
              info: cycle.ageRangeInfo,
              location: cycle.location,
              count: 1,
            });
          } else {
            groupMap.get(key)!.count++;
          }
        }

        const groups: AgeRangeGroup[] = Array.from(groupMap.entries()).map(
          ([ageRange, data]) => ({
            ageRange,
            ageRangeInfo: data.info,
            location: data.location,
            cycleCount: data.count,
          }),
        );

        setAgeRangeGroups(groups);

        // If only 1 age range group, auto-select and skip to cycle-select
        if (groups.length === 1) {
          setSelectedAgeRange(groups[0]);
          setStep("cycle-select");
        } else {
          setStep("age-range-select");
        }
      } catch (err) {
        console.error("Failed to fetch eligibility:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setStep("error");
      }
    };

    fetchEligibility();
  }, [agentCode]);

  // Create payment intent when cycle and payment option are selected
  const handleProceedToCheckout = async () => {
    if (!selectedCycle || !paymentOption) return;

    setIsCreatingIntent(true);
    setError(null);

    try {
      const priceId =
        paymentOption === "full"
          ? selectedCycle.pricing.full.priceId
          : selectedCycle.pricing.deposit.priceId;

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedCycle.id,
          priceId,
          paymentOption,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.clientSecret) {
        throw new Error("No client secret received");
      }

      setClientSecret(data.clientSecret);
      setStep("checkout");
    } catch (err) {
      console.error("Failed to create payment intent:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsCreatingIntent(false);
    }
  };

  // Handle cycle selection
  const handleCycleSelect = (cycle: ProgramCycle) => {
    setSelectedCycle(cycle);
  };

  // Handle payment option selection
  const handlePaymentOptionSelect = (option: PaymentOption) => {
    setPaymentOption(option);
  };

  // Navigation
  const handleContinueToPaymentOption = () => {
    if (selectedCycle) {
      setStep("payment-select");
    }
  };

  const handleBackToCycleSelect = () => {
    setPaymentOption(null);
    setStep("cycle-select");
  };

  // Age range selection
  const handleAgeRangeSelect = (group: AgeRangeGroup) => {
    setSelectedAgeRange(group);
  };

  const handleContinueToCycleSelect = () => {
    if (selectedAgeRange) {
      setSelectedCycle(null);
      setPaymentOption(null);
      setStep("cycle-select");
    }
  };

  const handleBackToAgeRangeSelect = () => {
    setSelectedCycle(null);
    setStep("age-range-select");
  };

  // Stripe Elements options
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

  const renderInfoBanner = () => (
    <div className="bg-blue-50 border-l-4 mt-8 border-blue-600 p-4 mb-8 rounded">
      <div className="flex items-start">
        <svg
          className="w-6 h-6 text-blue-600 mr-3 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-900">
            This booking is for {selectedAgeRange?.location}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Agent Code:{" "}
            <span className="font-mono font-semibold">{agentCode}</span>
          </p>
        </div>
      </div>
    </div>
  );

  const hasMultipleAgeRanges = ageRangeGroups.length > 1;

  const renderProgressIndicator = (activeStep: number) => {
    const totalSteps = hasMultipleAgeRanges ? 4 : 3;

    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNumber = i + 1;
            const isCompleted = stepNumber < activeStep;
            const isActive = stepNumber === activeStep;

            return (
              <React.Fragment key={stepNumber}>
                {i > 0 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      isCompleted ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted
                      ? "bg-blue-600 text-white"
                      : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  // Render loading state
  if (step === "loading") {
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
            Checking availability
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This should only take a moment
          </p>
        </div>
      </div>
    );
  }

  // Render no agent code error
  if (step === "no-agent-code") {
    return (
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto">
          <div className="w-full flex flex-col gap-4 items-center mb-8">
            <Logo type="sec" />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-amber-600"
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
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              Agent Code Required
            </h3>
            <p className="text-sm text-amber-700 mb-4">
              You cannot proceed without a valid agent code. Please ask your
              agent to send you the correct booking link with their agent code
              attached.
            </p>
            <p className="text-xs text-amber-600 mb-5">
              The link should look like: <br />
              <code className="bg-amber-100 px-2 py-1 rounded">
                /agent-payments-by-parent?agentCode=XXX-AGENTNAME-SC26
              </code>
            </p>
            <Link
              href="/"
              className="inline-block w-full bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (step === "error") {
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
              Unable to Load
            </h3>
            <p className="text-red-600 mb-5">{error}</p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
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

  // Render contact us (no eligible cycles)
  if (step === "contact") {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col gap-4 items-center mb-8">
            <Logo type="sec" />
            <h2 className="font-bold text-center">
              Book Your Summer Camp Experience
            </h2>
          </div>
          <ContactUs />
        </div>
      </div>
    );
  }

  // Render age range selection
  if (step === "age-range-select") {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col gap-4 items-center mb-4">
            <Logo type="sec" />
            <h2 className="font-bold text-center">
              Book Your Summer Camp Experience
            </h2>
          </div>
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
              Secure SSL Encryption
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {renderProgressIndicator(1)}

              <AgeRangeSelector
                ageRangeGroups={ageRangeGroups}
                selectedAgeRange={selectedAgeRange}
                onSelect={handleAgeRangeSelect}
              />

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleContinueToCycleSelect}
                  disabled={!selectedAgeRange}
                  className="w-full md:w-auto md:ml-auto md:block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue to Cycle Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render cycle selection
  if (step === "cycle-select") {
    const eligibleCycles = cycles.filter(
      (c) => c.isEligible && c.ageRange === selectedAgeRange?.ageRange,
    );

    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col gap-4 items-center mb-4">
            <Logo type="sec" />
            <h2 className="font-bold text-center">
              Book Your Summer Camp Experience
            </h2>
          </div>
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
              Secure SSL Encryption
            </div>
          </div>

          {renderInfoBanner()}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {renderProgressIndicator(hasMultipleAgeRanges ? 2 : 1)}

              <CycleSelector
                cycles={eligibleCycles}
                selectedCycle={selectedCycle}
                onSelect={handleCycleSelect}
              />

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                {hasMultipleAgeRanges && (
                  <button
                    onClick={handleBackToAgeRangeSelect}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleContinueToPaymentOption}
                  disabled={!selectedCycle}
                  className="w-full md:w-auto md:ml-auto md:block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue to Payment Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render payment option selection
  if (step === "payment-select" && selectedCycle) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col gap-4 items-center mb-4">
            <Logo type="sec" />
            <h2 className="font-bold text-center">
              Book Your Summer Camp Experience
            </h2>
          </div>
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
              Secure SSL Encryption
            </div>
          </div>

          {renderInfoBanner()}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {renderProgressIndicator(hasMultipleAgeRanges ? 3 : 2)}

              {/* Selected cycle summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Selected Cycle</p>
                    <p className="font-semibold text-gray-900">
                      {selectedCycle.name}
                    </p>
                  </div>
                  <button
                    onClick={handleBackToCycleSelect}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>

              <PaymentOptionSelector
                cycle={selectedCycle}
                selectedOption={paymentOption}
                onSelect={handlePaymentOptionSelect}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={handleBackToCycleSelect}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  disabled={!paymentOption || isCreatingIntent}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingIntent ? "Processing..." : "Continue to Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render checkout form
  if (step === "checkout" && clientSecret && selectedCycle && paymentOption) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col gap-4 items-center mb-4">
            <Logo type="sec" />
            <h2 className="font-bold text-center">Complete Your Booking</h2>
          </div>
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
              Secure SSL Encryption - Powered by Stripe
            </div>
            {renderInfoBanner()}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <Elements
                stripe={stripePromise}
                options={options}
                key={clientSecret}
              >
                <CheckoutForm
                  clientSecret={clientSecret}
                  selectedCycle={selectedCycle}
                  paymentOption={paymentOption}
                  agentCode={agentCode!}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
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

export default Payment;
