import { stripe } from "@/lib/stripe";
import { PaymentOption } from "@/types/payment";
import { NextRequest, NextResponse } from "next/server";

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
    const metadata = paymentIntent.metadata;

    // Get payment type from metadata
    const paymentType = (metadata?.payment_type as PaymentOption) || "full";
    const balanceAmount = metadata?.balance_amount
      ? parseInt(metadata.balance_amount, 10)
      : undefined;

    // Calculate balance due date if deposit payment
    let balanceDueDate: string | undefined;
    if (paymentType === "deposit" && metadata?.program_start) {
      const programStart = new Date(metadata.program_start);
      programStart.setDate(programStart.getDate() - 8 * 7); // 8 weeks before
      balanceDueDate = programStart.toISOString().split("T")[0];
    }

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      agentCode: metadata?.agent_code,
      customerEmail: paymentIntent.receipt_email,
      created: new Date(paymentIntent.created * 1000).toISOString(),
      // New fields for deposit support
      paymentType,
      productId: metadata?.product_id,
      productName: metadata?.product_name,
      programStart: metadata?.program_start,
      programEnd: metadata?.program_end,
      balanceAmount,
      balanceDueDate,
    });
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }
}
