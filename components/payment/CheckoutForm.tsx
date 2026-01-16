"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Define form data types
type FormData = {
  parentName: string;
  parentEmail: string;
  parentAddress: string;
  parentPhone: string;
  childName: string;
  childDOB: string;
  childAge: string;
  preferredCycle: string;
};

type FormStep = 1 | 2 | 3;

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [agentCode, setAgentCode] = useState<string>("");
  const [agentCodeError, setAgentCodeError] = useState<string | null>(null);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentAddress: "",
      parentPhone: "",
      childName: "",
      childDOB: "",
      childAge: "",
      preferredCycle: "cycle_1",
    },
  });

  // Validate agent code from URL on mount
  useEffect(() => {
    const codeFromUrl = searchParams.get("agentCode");

    if (!codeFromUrl) {
      setAgentCodeError("No agent code provided");
      return;
    }

    // Convert to uppercase for validation
    const upperCaseCode = codeFromUrl.toUpperCase();

    // Validate format: XXX-AGENTNAME-SC26
    const agentCodeRegex = /^[A-Z]{3}-[A-Z]+-SC26$/;
    if (!agentCodeRegex.test(upperCaseCode)) {
      setAgentCodeError("Invalid agent code format");
      return;
    }

    // Code is valid, store the uppercase version
    setAgentCode(upperCaseCode);
    setAgentCodeError(null);
  }, [searchParams]);

  // Calculate age from DOB
  const childDOB = watch("childDOB");

  useEffect(() => {
    if (childDOB) {
      const birthDate = new Date(childDOB);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setValue("childAge", age.toString());
    }
  }, [childDOB, setValue]);

  // Navigation functions
  const nextStep = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger([
          "parentName",
          "parentEmail",
          "parentAddress",
          "parentPhone",
        ]);
        break;
      case 2:
        isValid = await trigger(["childName", "childDOB"]);
        break;
    }

    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
      setMessage(null);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
      setMessage(null);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    // Prevent submission if not on step 3
    if (currentStep !== 3) {
      console.log("Form submission blocked - not on step 3");
      return;
    }

    if (!stripe || !elements) {
      setMessage("Stripe is not initialized. Please refresh the page.");
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      // Submit the form elements to Stripe to validate
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setMessage(submitError.message || "Please check your payment details.");
        setIsProcessing(false);
        return;
      }

      // Extract payment intent ID from client secret
      const paymentIntentId = clientSecret.split("_secret_")[0];

      // Update PaymentIntent with form data as metadata via backend
      const updateResponse = await fetch("/api/update-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId,
          agentCode: agentCode,
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          parentAddress: formData.parentAddress,
          parentPhone: formData.parentPhone,
          childName: formData.childName,
          childDOB: formData.childDOB,
          childAge: formData.childAge || "0",
          preferredCycle: formData.preferredCycle,
        }),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error("Failed to update payment intent:", errorData);
        setMessage("Failed to save booking details. Please try again.");
        setIsProcessing(false);
        return;
      }

      const updateData = await updateResponse.json();
      console.log("Payment intent updated with booking metadata:", updateData);

      // Confirm the payment
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/agent-payments-by-parent/success?agentCode=${encodeURIComponent(agentCode)}&payment_intent={PAYMENT_INTENT_CLIENT_SECRET}`,
        },
      });

      if (stripeError) {
        setMessage(stripeError.message || "Payment failed. Please try again.");
        console.error("Payment error:", stripeError);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Show error screen if agent code is invalid
  if (agentCodeError) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-900 mb-3">
            Agent Code Required
          </h2>
          <p className="text-red-700 mb-6">
            You need a valid agent code to access this payment page. Please
            contact your agent to receive the correct booking link.
          </p>
          <div className="bg-white border border-red-200 rounded p-4 text-left">
            <p className="text-sm font-medium text-red-900 mb-2">
              Valid agent code format:
            </p>
            <p className="text-sm text-red-700 font-mono">XXX-AGENTNAME-SC26</p>
            <p className="text-xs text-red-600 mt-2">
              Example: GBR-JANEDOE-SC26 or USA-JOHNSMITH-SC26
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Safety check
  if (!stripe || !elements) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Payment form is initializing...</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Reload if this takes too long
        </button>
      </div>
    );
  }

  // Progress steps
  const steps = [
    { number: 1, title: "Parent Details" },
    { number: 2, title: "Child Details" },
    { number: 3, title: "Payment & Finalize" },
  ];

  const cycles = [
    {
      value: "cycle_1",
      label: "Cycle 1",
      dates: "6th - 20th July 2026",
    },
    {
      value: "cycle_2",
      label: "Cycle 2",
      dates: "20th July - 3rd August 2026",
    },
    {
      value: "cycle_3",
      label: "Cycle 3",
      dates: "3rd - 17th August 2026",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded">
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
              This booking is for Canterbury Christ Church University
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Agent Code:{" "}
              <span className="font-mono font-semibold">{agentCode}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.number ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          // Only allow submission on step 3
          if (currentStep !== 3) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
          // Let handleSubmit process it
          handleSubmit(onSubmit)(e);
        }}
        onKeyDown={(e) => {
          // Prevent Enter key from submitting form if not on final step
          if (e.key === "Enter" && currentStep !== 3) {
            e.preventDefault();
          }
        }}
      >
        {/* Step 1: Parent Details */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h4 className="text-xl font-bold text-gray-800">
              Parent/Guardian Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parent Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register("parentName", {
                    required: "Parent name is required",
                  })}
                  className={`w-full p-3 border rounded-lg ${errors.parentName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="John Doe"
                />
                {errors.parentName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parentName.message}
                  </p>
                )}
              </div>

              {/* Parent Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("parentEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full p-3 border rounded-lg ${errors.parentEmail ? "border-red-500" : "border-gray-300"}`}
                  placeholder="john@example.com"
                />
                {errors.parentEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parentEmail.message}
                  </p>
                )}
              </div>

              {/* Parent Phone */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  {...register("parentPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[\d\s-]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className={`w-full p-3 border rounded-lg ${errors.parentPhone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="+44 1234 567890"
                />
                {errors.parentPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parentPhone.message}
                  </p>
                )}
              </div>

              {/* Parent Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Home Address *
                </label>
                <textarea
                  {...register("parentAddress", {
                    required: "Address is required",
                  })}
                  rows={3}
                  className={`w-full p-3 border rounded-lg ${errors.parentAddress ? "border-red-500" : "border-gray-300"}`}
                  placeholder="123 Main Street, London, UK"
                />
                {errors.parentAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parentAddress.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Child Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h4 className="text-xl font-bold text-gray-800">
              Child Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Child Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Child Full Name *
                </label>
                <input
                  type="text"
                  {...register("childName", {
                    required: "Child name is required",
                  })}
                  className={`w-full p-3 border rounded-lg ${errors.childName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Emma Doe"
                />
                {errors.childName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.childName.message}
                  </p>
                )}
              </div>

              {/* Child Date of Birth */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  {...register("childDOB", {
                    required: "Date of birth is required",
                    validate: (value) => {
                      const birthDate = new Date(value);
                      const today = new Date();
                      return birthDate < today || "Date must be in the past";
                    },
                  })}
                  className={`w-full p-3 border rounded-lg ${errors.childDOB ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.childDOB && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.childDOB.message}
                  </p>
                )}
              </div>

              {/* Child Age (auto-calculated) */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Child Age
                </label>
                <input
                  type="text"
                  value={watch("childAge") || ""}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Finalize */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h4 className="text-xl font-bold text-gray-800">
              Finalize Booking
            </h4>

            {/* Preferred Cycle - Radio Buttons */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="block text-sm font-medium mb-4">
                Select Your Preferred Cycle *
              </label>
              <div className="space-y-3">
                {cycles.map((cycle) => (
                  <label
                    key={cycle.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      watch("preferredCycle") === cycle.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      {...register("preferredCycle", {
                        required: "Please select a cycle",
                      })}
                      value={cycle.value}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-semibold text-gray-900">
                        {cycle.label}
                      </p>
                      <p className="text-sm text-gray-600">{cycle.dates}</p>
                    </div>
                    {watch("preferredCycle") === cycle.value && (
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
              {errors.preferredCycle && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.preferredCycle.message}
                </p>
              )}
            </div>

            {/* Stripe Payment Element */}
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4">Payment Details</h3>
              <PaymentElement
                options={{
                  layout: "tabs",
                }}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-4">Order Summary</h4>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Summer Camp Program Fee</span>
                  <span>£3,600.00</span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>£3,600.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={(e) => nextStep(e)}
              className="ml-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to {currentStep === 1 ? "Child Details" : "Payment"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="ml-auto px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Pay £3,600.00 Now"}
            </button>
          )}
        </div>

        {/* Error/Success Messages */}
        {message && (
          <div
            className={`mt-4 p-4 rounded-lg ${message.includes("successful") || message.includes("Thank you") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            <p className="wrap-break-word whitespace-normal">{message}</p>
          </div>
        )}
      </form>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default CheckoutForm;
