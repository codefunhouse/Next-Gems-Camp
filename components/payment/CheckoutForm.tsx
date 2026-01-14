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
  parentName: string;
  parentEmail: string;
  parentAddress: string;
  parentPhone: string;
  childName: string;
  childDOB: string;
  childAge: string;
  childPassport: string;
  preferredCycle: string;
};

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Generate the random agent code on the frontend
  const [agentCode] = useState(() => {
    return "AGT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  });

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentAddress: "",
      parentPhone: "",
      childName: "",
      childDOB: "",
      childAge: "",
      childPassport: "",
      preferredCycle: "cycle_1",
    },
  });

  // Calculate age from DOB
  const childDOB = watch("childDOB");
  const [calculatedAge, setCalculatedAge] = useState<string>("");

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
      setCalculatedAge(age.toString());
    }
  }, [childDOB]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    if (!stripe || !elements) {
      setMessage("Stripe is not initialized. Please refresh the page.");
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    console.log("FormData: ", formData);

    try {
      // Submit the form elements to Stripe to validate
      const { error: submitError } = await elements.submit();
      console.log("Submit Error: ", submitError);

      if (submitError) {
        setMessage(submitError.message || "Please check your payment details.");
        setIsProcessing(false);
        return;
      }
      //   // Save the form data to your backend (optional - for database storage)
      //   const saveResponse = await fetch("/api/save-booking", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       ...formData,
      //       childAge: calculatedAge || formData.childAge,
      //       agentCode,
      //     }),
      //   });

      //   if (!saveResponse.ok) {
      //     console.error("Failed to save booking data");
      //     // Continue with payment even if save fails
      //   }

      // Confirm the payment using the existing PaymentIntent
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
        window.location.href = "/agent-payments-by-parents";
      }
      // If no error, Stripe will redirect to return_url
    } catch (err) {
      console.error("Payment error:", err);
      setMessage(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Safety check - prevent rendering if Elements context is gone
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 space-y-6"
    >
      <h3 className="text-center">Next Gems Summer Camp Booking</h3>
      <p className="text-xl text-center font-semibold text-gray-700">
        Program Fee: £3,600
      </p>

      {/* Section: Pre-filled Agent Code (Display only) */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm font-medium text-blue-800">
          Your Agent Reference
        </p>
        <p className="text-2xl font-bold text-blue-900">{agentCode}</p>
        <p className="text-xs text-blue-700 mt-1">
          Please save this code for future communication.
        </p>
        <input type="hidden" name="agentCode" value={agentCode} />
      </div>

      {/* Stripe Payment Element for Card Details */}
      <div className="p-4 border rounded-lg">
        <h3 className="font-bold text-lg mb-4">Payment Details</h3>

        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />

        {/* <p className="text-sm text-gray-500 mt-2">
          Test card: 4242 4242 4242 4242 | Any future date | Any 3 digits
        </p> */}
      </div>

      {/* Section: Parent/Guardian Details */}
      <fieldset className="space-y-4 p-4 border rounded-lg">
        <legend className="font-bold text-lg">Parent/Guardian Details</legend>

        {/* Parent Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            {...register("parentName", { required: "Parent name is required" })}
            className={`w-full p-2 border rounded ${errors.parentName ? "border-red-500" : ""}`}
          />
          {errors.parentName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parentName.message}
            </p>
          )}
        </div>

        {/* Parent Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
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
            className={`w-full p-2 border rounded ${errors.parentEmail ? "border-red-500" : ""}`}
          />
          {errors.parentEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parentEmail.message}
            </p>
          )}
        </div>

        {/* Parent Address */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Home Address *
          </label>
          <textarea
            {...register("parentAddress", { required: "Address is required" })}
            rows={3}
            className={`w-full p-2 border rounded ${errors.parentAddress ? "border-red-500" : ""}`}
          />
          {errors.parentAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parentAddress.message}
            </p>
          )}
        </div>

        {/* Parent Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
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
            className={`w-full p-2 border rounded ${errors.parentPhone ? "border-red-500" : ""}`}
            placeholder="+44 1234 567890"
          />
          {errors.parentPhone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parentPhone.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Section: Child Details */}
      <fieldset className="space-y-4 p-4 border rounded-lg">
        <legend className="font-bold text-lg">Child Details</legend>

        {/* Child Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Child Full Name *
          </label>
          <input
            type="text"
            {...register("childName", { required: "Child name is required" })}
            className={`w-full p-2 border rounded ${errors.childName ? "border-red-500" : ""}`}
          />
          {errors.childName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.childName.message}
            </p>
          )}
        </div>

        {/* Child Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">
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
            className={`w-full p-2 border rounded ${errors.childDOB ? "border-red-500" : ""}`}
          />
          {errors.childDOB && (
            <p className="text-red-500 text-sm mt-1">
              {errors.childDOB.message}
            </p>
          )}
        </div>

        {/* Child Age (auto-calculated or manual) */}
        <div>
          <label className="block text-sm font-medium mb-1">Child Age *</label>
          <input
            type="text"
            value={calculatedAge || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-50"
            placeholder="Auto-calculated from DOB"
          />
          <input
            type="hidden"
            {...register("childAge")}
            value={calculatedAge}
          />
        </div>

        {/* Child's Passport */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Passport Number *
          </label>
          <input
            type="text"
            {...register("childPassport", {
              required: "Passport number is required",
              minLength: {
                value: 6,
                message: "Passport number must be at least 6 characters",
              },
            })}
            className={`w-full p-2 border rounded ${errors.childPassport ? "border-red-500" : ""}`}
            placeholder="e.g., AB123456"
          />
          {errors.childPassport && (
            <p className="text-red-500 text-sm mt-1">
              {errors.childPassport.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Preferred Cycle Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Preferred Cycle *
        </label>
        <select
          {...register("preferredCycle", { required: "Please select a cycle" })}
          className={`w-full p-2 border rounded ${errors.preferredCycle ? "border-red-500" : ""}`}
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

      {/* Submit Button and Messages */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? "Processing..." : `Pay £3,600 Now`}
      </button>

      {message && (
        <div
          className={`text-center p-3 rounded ${message.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          <p className="wrap-break-word whitespace-normal">{message}</p>
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
