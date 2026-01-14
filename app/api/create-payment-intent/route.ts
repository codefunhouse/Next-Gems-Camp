import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // MUST match your Stripe CLI version
});

// Define the expected request body structure
interface PaymentIntentRequestBody {
  parentName: string;
  parentEmail: string;
  childName: string;
  childDOB: string;
  childAge: string;
  childPassport: string;
  preferredCycle: string;
  agentCode: string;
  // Make these optional since they have character limits
  parentAddress?: string;
  parentPhone?: string;
  // Optional initial request
  amount?: number;
  currency?: string;
}

// Helper function to validate request data
function validateRequestBody(
  data: Partial<PaymentIntentRequestBody>
): string | null {
  // If this is an initial request with minimal data
  if (data.amount && data.currency) {
    if (typeof data.amount !== "number" || data.amount <= 0) {
      return "Amount must be a positive number";
    }
    if (typeof data.currency !== "string" || data.currency.length !== 3) {
      return "Currency must be a 3-letter ISO code";
    }
    return null;
  }

  // If this is a full form submission
  const requiredFields = [
    "parentName",
    "parentEmail",
    "childName",
    "childDOB",
    "childAge",
    "childPassport",
    "preferredCycle",
    "agentCode",
  ] as const;

  for (const field of requiredFields) {
    if (
      !data[field] ||
      typeof data[field] !== "string" ||
      data[field].trim() === ""
    ) {
      return `${field.replace(/([A-Z])/g, " $1").toLowerCase()} is required`;
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.parentEmail && !emailRegex.test(data.parentEmail)) {
    return "Invalid email format";
  }

  // Phone validation (optional)
  if (data.parentPhone && data.parentPhone.trim() !== "") {
    const phoneRegex = /^[+]?[\d\s-()]+$/;
    if (!phoneRegex.test(data.parentPhone.replace(/\s/g, ""))) {
      return "Invalid phone number";
    }
  }

  // Date validation
  if (data.childDOB) {
    const dob = new Date(data.childDOB);
    if (isNaN(dob.getTime())) {
      return "Invalid date of birth";
    }
    if (dob > new Date()) {
      return "Date of birth cannot be in the future";
    }
  }

  return null;
}

// Define response types
interface SuccessResponse {
  clientSecret: string;
  paymentIntentId?: string;
  amount?: number;
  currency?: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

// Truncate long strings for metadata (Stripe metadata has 500 char value limit)
function truncateForMetadata(value: string, maxLength: number = 200): string {
  return value.length > maxLength
    ? value.substring(0, maxLength - 3) + "..."
    : value;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Parse and validate request body
    let body: Partial<PaymentIntentRequestBody>;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        {
          error: "Invalid JSON payload",
          details: "The request body must be valid JSON",
        } as ErrorResponse,
        { status: 400 }
      );
    }

    // Validate request data
    const validationError = validateRequestBody(body);
    if (validationError) {
      console.error("Validation error:", validationError);
      return NextResponse.json({ error: validationError } as ErrorResponse, {
        status: 400,
      });
    }

    // Determine if this is an initial request or full submission
    const isInitialRequest = Boolean(
      body.amount && body.currency && !body.parentName
    );

    // Prepare metadata with truncation for long values
    const metadata: Record<string, string> = isInitialRequest
      ? {
          agent_code: body.agentCode || `INIT-${Date.now()}`,
          request_type: "initial",
          timestamp: new Date().toISOString(),
        }
      : {
          // Full form submission - truncate long fields
          parent_name: truncateForMetadata(body.parentName as string, 100),
          parent_email: body.parentEmail as string,
          child_name: truncateForMetadata(body.childName as string, 100),
          child_dob: body.childDOB as string,
          child_age: body.childAge as string,
          child_passport: truncateForMetadata(body.childPassport as string, 50),
          preferred_cycle: body.preferredCycle as string,
          agent_code: body.agentCode as string,
          submitted_at: new Date().toISOString(),
        };

    // Add optional fields if they exist and are not empty
    if (!isInitialRequest) {
      if (body.parentAddress && body.parentAddress.trim() !== "") {
        metadata.parent_address = truncateForMetadata(body.parentAddress, 150);
      }
      if (body.parentPhone && body.parentPhone.trim() !== "") {
        metadata.parent_phone = truncateForMetadata(body.parentPhone, 30);
      }
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: isInitialRequest ? (body.amount as number) : 360000, // £3600 in pence
      currency: isInitialRequest ? (body.currency as string) : "gbp",
      metadata,
      // For full submissions, create a customer record
      ...(!isInitialRequest && {
        receipt_email: body.parentEmail as string,
        description: `Canterbury Summer Program - ${body.preferredCycle}`,
      }),
      // Enable automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return response
    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret as string,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      } as SuccessResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ PaymentIntent creation error:", error);

    // Handle Stripe-specific errors with proper type checking
    if (error instanceof Stripe.errors.StripeError) {
      switch (error.type) {
        case "StripeInvalidRequestError":
          return NextResponse.json(
            {
              error: "Invalid payment request",
              details: error.message || "Please check your payment details",
            } as ErrorResponse,
            { status: 400 }
          );
        case "StripeAuthenticationError":
          return NextResponse.json(
            {
              error: "Authentication failed",
              details: "Invalid Stripe API key configuration",
            } as ErrorResponse,
            { status: 500 }
          );
        case "StripeConnectionError":
          return NextResponse.json(
            {
              error: "Connection error",
              details: "Unable to connect to payment processor",
            } as ErrorResponse,
            { status: 503 }
          );
        case "StripeRateLimitError":
          return NextResponse.json(
            {
              error: "Rate limit exceeded",
              details: "Too many requests. Please try again later.",
            } as ErrorResponse,
            { status: 429 }
          );
        default:
          return NextResponse.json(
            {
              error: "Stripe payment error",
              details: error.message,
            } as ErrorResponse,
            { status: 400 }
          );
      }
    }

    // Generic error response
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to create payment intent",
        details: errorMessage,
      } as ErrorResponse,
      { status: 500 }
    );
  }
}
