import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Define the simple request body structure
interface PaymentIntentRequestBody {
  amount: number;
  currency: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<{ clientSecret: string } | { error: string }>> {
  try {
    // Parse request body
    let body: PaymentIntentRequestBody;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        {
          error:
            "Invalid JSON payload" +
            (parseError instanceof Error ? `: ${parseError.message}` : ""),
        },
        { status: 400 }
      );
    }

    // Validate the simple payload
    if (typeof body.amount !== "number" || body.amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    if (typeof body.currency !== "string" || body.currency.length !== 3) {
      return NextResponse.json(
        { error: "Currency must be a 3-letter ISO code" },
        { status: 400 }
      );
    }

    // Create PaymentIntent with only amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: body.currency.toLowerCase(),
      description:
        "Next Gems Summer Camp is a fully supervised residential programme for students aged 9–17, led by qualified teachers and focused on English, innovation, business, and sport. This payment secures a place on the programme.",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return only the client secret
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret as string },
      { status: 200 }
    );
  } catch (error) {
    console.error("PaymentIntent creation error:", error);

    // Generic error response
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to create payment intent: " + errorMessage },
      { status: 500 }
    );
  }
}
