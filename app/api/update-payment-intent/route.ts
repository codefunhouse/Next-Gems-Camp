import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      paymentIntentId,
      agentCode,
      parentName,
      parentEmail,
      parentAddress,
      parentPhone,
      childName,
      childDOB,
      childAge,
      preferredCycle,
    } = body;

    // Validate required fields
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Payment Intent ID is required" },
        { status: 400 }
      );
    }

    // Update the PaymentIntent with metadata
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        agentCode: agentCode || "",
        parentName: parentName || "",
        parentEmail: parentEmail || "",
        parentAddress: parentAddress || "",
        parentPhone: parentPhone || "",
        childName: childName || "",
        childDOB: childDOB || "",
        childAge: childAge || "",
        preferredCycle: preferredCycle || "",
      },
    });

    return NextResponse.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        metadata: paymentIntent.metadata,
      },
    });
  } catch (error) {
    console.error("Error updating payment intent:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update payment intent" },
      { status: 500 }
    );
  }
}
