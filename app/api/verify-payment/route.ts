import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function GET(request: NextRequest) {
  const paymentIntentId = request.nextUrl.searchParams.get("payment_intent_id");

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: "No payment_intent_id provided" },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      agentCode: paymentIntent.metadata?.agent_code,
      customerEmail: paymentIntent.receipt_email,
      created: new Date(paymentIntent.created * 1000).toISOString(),
    });
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }
}
