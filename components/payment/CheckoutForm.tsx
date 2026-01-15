"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Define form data types
type FormData = {
  agentCode: string;
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
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
      agentCode: "",
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
          "agentCode",
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
          agentCode: formData.agentCode,
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
          return_url: `${window.location.origin}/agent-payments-by-parent/success?agentCode=${encodeURIComponent(formData.agentCode)}&payment_intent={PAYMENT_INTENT_CLIENT_SECRET}`,
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

  return (
    <div className="max-w-4xl mx-auto">
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

            {/* Agent Code Input - Full width */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Agent Code *
              </label>
              <input
                type="text"
                {...register("agentCode", {
                  required: "Agent code is required",
                  setValueAs: (value) => value.toUpperCase(),
                  pattern: {
                    value: /^[A-Z]{3}-[A-Z]+-SC26$/,
                    message:
                      "Format must be: XXX-AGENTNAME-SC26 (e.g., USA-JOHNSMITH-SC26)",
                  },
                  validate: (value) => {
                    const parts = value.split("-");
                    if (parts.length !== 3) {
                      return "Agent code must have exactly 3 parts separated by hyphens";
                    }
                    if (parts[0].length !== 3) {
                      return "Country code must be exactly 3 letters";
                    }
                    if (parts[1].length === 0) {
                      return "Agent name cannot be empty";
                    }
                    if (parts[2] !== "SC26") {
                      return "Last part must be SC26";
                    }
                    return true;
                  },
                })}
                className={`w-full p-3 border rounded-lg uppercase font-mono text-lg ${errors.agentCode ? "border-red-500" : "border-blue-300"}`}
                placeholder="USA-JOHNSMITH-SC26"
              />
              {errors.agentCode && (
                <p className="text-red-600 text-sm mt-2 font-medium">
                  {errors.agentCode.message}
                </p>
              )}
              <p className="text-xs text-blue-700 mt-2">
                Format: [3-letter country code]-[agent name without spaces]-SC26
                <br />
                Example: GBR-JANEDOE-SC26 or NGA-ADEKUNLE-SC26
              </p>
            </div>

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

              {/* Parent Phone - Full width on mobile, half on desktop */}
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

              {/* Parent Address - Full width */}
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

            {/* Preferred Cycle */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-2">
                Preferred Cycle *
              </label>
              <select
                {...register("preferredCycle", {
                  required: "Please select a cycle",
                })}
                className={`w-full p-3 border rounded-lg ${errors.preferredCycle ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="cycle_1">
                  Canterbury 6th July 2026 - 20th July 2026
                </option>
                <option value="cycle_2">
                  Canterbury 20th July 2026 - 3rd August 2026
                </option>
                <option value="cycle_3">
                  Canterbury 3rd August 2026 - 17th August 2026
                </option>
              </select>
              {errors.preferredCycle && (
                <p className="text-red-500 text-sm mt-1">
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
                  // wallets: {
                  //   applePay: "never",
                  //   googlePay: "never",
                  // },
                }}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Program Fee</span>
                  <span>£3,500.00</span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>£3,500.00</span>
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
              {isProcessing ? "Processing..." : "Pay Now"}
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
