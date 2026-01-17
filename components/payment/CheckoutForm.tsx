"use client";

import { PaymentOption, ProgramCycle } from "@/types/payment";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

// Define form data types
type ChildInfo = {
  childName: string;
  childDOB: string;
  childAge: string;
};

type FormData = {
  agentCode: string;
  parentName: string;
  parentEmail: string;
  parentAddress: string;
  parentPhone: string;
  children: ChildInfo[];
};

type FormStep = 1 | 2 | 3;

interface CheckoutFormProps {
  clientSecret: string;
  selectedCycle: ProgramCycle;
  paymentOption: PaymentOption;
  agentCode: string;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
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

function CheckoutForm({
  clientSecret,
  selectedCycle,
  paymentOption,
  agentCode,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Get pricing info based on payment option
  const pricing =
    paymentOption === "full"
      ? selectedCycle.pricing.full
      : selectedCycle.pricing.deposit;
  const amount = pricing.amount;

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
    control,
  } = useForm<FormData>({
    defaultValues: {
      agentCode: agentCode,
      parentName: "",
      parentEmail: "",
      parentAddress: "",
      parentPhone: "",
      children: [{ childName: "", childDOB: "", childAge: "" }],
    },
  });

  // Use field array for managing multiple children
  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  // Watch all children for display
  const watchedChildren = watch("children");

  // Function to calculate age from DOB
  const calculateAge = (dob: string): string => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  };

  // Handle DOB change and calculate age
  const handleDOBChange = (index: number, value: string) => {
    setValue(`children.${index}.childDOB`, value);
    const age = calculateAge(value);
    setValue(`children.${index}.childAge`, age);
  };

  // Calculate total amount based on number of children
  const numberOfChildren = fields.length;
  const totalAmount = amount * numberOfChildren;
  const totalBalanceAmount =
    paymentOption === "deposit"
      ? selectedCycle.pricing.deposit.balanceAmount * numberOfChildren
      : 0;

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
        // Validate all children
        const childFields = fields.flatMap((_, index) => [
          `children.${index}.childName` as const,
          `children.${index}.childDOB` as const,
        ]);
        isValid = await trigger(childFields);
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
          children: formData.children,
          numberOfChildren: formData.children.length,
          baseAmount: amount,
          totalAmount: totalAmount,
          totalBalanceAmount: totalBalanceAmount,
          preferredCycle: selectedCycle.name,
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
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.",
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
            <h4 className="text-base font-semibold text-gray-800">
              Parent/Guardian Information
            </h4>

            {/* Agent Code Display - Read-only from URL */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Agent Code
              </label>
              <input
                type="text"
                {...register("agentCode")}
                readOnly
                disabled
                className="w-full p-3 border rounded-lg uppercase font-mono text-sm bg-blue-100 border-blue-300 text-blue-800 cursor-not-allowed"
              />
              <p className="text-xs text-blue-700 mt-2">
                This code was provided by your agent via the booking link.
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
            <div className="flex justify-between items-center">
              <h4 className="text-base font-semibold text-gray-800">
                Child Information
              </h4>
              <span className="text-sm text-gray-500">
                {fields.length} {fields.length === 1 ? "child" : "children"}
              </span>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-sm font-medium text-gray-700">
                    Child {index + 1}
                  </h5>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Child Full Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register(`children.${index}.childName`, {
                        required: "Child name is required",
                      })}
                      className={`w-full p-3 border rounded-lg ${errors.children?.[index]?.childName ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Emma Doe"
                    />
                    {errors.children?.[index]?.childName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.children[index].childName?.message}
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
                      {...register(`children.${index}.childDOB`, {
                        required: "Date of birth is required",
                        validate: (value) => {
                          const birthDate = new Date(value);
                          const today = new Date();
                          return (
                            birthDate < today || "Date must be in the past"
                          );
                        },
                        onChange: (e) => handleDOBChange(index, e.target.value),
                      })}
                      className={`w-full p-3 border rounded-lg ${errors.children?.[index]?.childDOB ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.children?.[index]?.childDOB && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.children[index].childDOB?.message}
                      </p>
                    )}
                  </div>

                  {/* Child Age (auto-calculated) */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Age
                    </label>
                    <input
                      type="text"
                      value={watchedChildren?.[index]?.childAge || ""}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Auto-calculated"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Another Child Button */}
            <button
              type="button"
              onClick={() =>
                append({ childName: "", childDOB: "", childAge: "" })
              }
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Another Child
            </button>

            {/* Price info for multiple children */}
            {fields.length > 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You are registering {fields.length}{" "}
                  children. Total: {formatPrice(totalAmount)} (
                  {formatPrice(amount)} per child)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Payment & Finalize */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h4 className="text-base font-semibold text-gray-800">
              Finalize Booking
            </h4>

            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-sm text-gray-700 mb-2">
                Booking Summary
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Program</span>
                  <span className="font-medium">{selectedCycle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates</span>
                  <span className="font-medium">
                    {formatDate(selectedCycle.startDate)} -{" "}
                    {formatDate(selectedCycle.endDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Type</span>
                  <span className="font-medium capitalize">
                    {paymentOption === "full" ? "Full Payment" : "25% Deposit"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stripe Payment Element */}
            <div className="border rounded-lg p-4">
              <h5 className="font-semibold text-sm text-gray-700 mb-3">
                Payment Details
              </h5>
              <PaymentElement
                options={{
                  layout: "tabs",
                }}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-sm text-gray-700 mb-3">
                Order Summary
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    {paymentOption === "full"
                      ? "Full Program Fee"
                      : "Deposit (25%)"}
                    {numberOfChildren > 1 && ` × ${numberOfChildren} children`}
                  </span>
                  <span className="font-medium">
                    {numberOfChildren > 1
                      ? `${formatPrice(amount)} × ${numberOfChildren}`
                      : formatPrice(amount)}
                  </span>
                </div>
                {paymentOption === "deposit" && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>
                        Remaining Balance
                        {numberOfChildren > 1 &&
                          ` (${numberOfChildren} children)`}
                      </span>
                      <span>{formatPrice(totalBalanceAmount)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Balance Due By</span>
                      <span className="text-orange-600 font-medium">
                        {formatDate(selectedCycle.balanceDueDate)}
                      </span>
                    </div>
                  </>
                )}
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-base">
                    <span>Due Today</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {paymentOption === "deposit" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> After this deposit payment, an invoice
                  for the remaining {formatPrice(totalBalanceAmount)} will be
                  sent to your email. Payment must be received by{" "}
                  {formatDate(selectedCycle.balanceDueDate)}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={(e) => nextStep(e)}
              className="ml-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Continue to {currentStep === 1 ? "Child Details" : "Payment"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="ml-auto px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isProcessing
                ? "Processing..."
                : `Pay ${formatPrice(totalAmount)}`}
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
