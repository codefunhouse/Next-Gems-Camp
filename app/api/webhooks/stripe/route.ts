import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rawBody = await request.arrayBuffer();
  const body = Buffer.from(rawBody).toString("utf-8");

  const signature = request.headers.get("stripe-signature");

  console.log("📝 Body length:", body.length);
  console.log("🔑 Signature exists:", !!signature);
  console.log("🔐 Webhook secret exists:", !!process.env.STRIPE_WEBHOOK_SECRET);

  // 1. Verify the webhook came from Stripe
  let event: Stripe.Event;
  try {
    if (!signature) {
      console.error("❌ Missing stripe-signature header");
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("❌ STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error(`⚠️ Webhook signature verification failed.`, errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // 2. Handle the specific event we care about
  console.log("🔍 Attempting to verify signature...");

  if (event.type === "payment_intent.succeeded") {
    // Type guard to ensure we have the correct event type
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const agentCode = paymentIntent.metadata?.agent_code;

    console.log(
      `💰 PaymentIntent ${paymentIntent.id} succeeded for agent ${agentCode}.`
    );

    // 3. **THIS IS WHERE YOUR BUSINESS LOGIC GOES**
    // You can safely access all metadata fields here:
    const metadata = paymentIntent.metadata;
    if (metadata) {
      console.log("Full metadata received:", {
        parentName: metadata.parent_name,
        parentEmail: metadata.parent_email,
        childName: metadata.child_name,
        preferredCycle: metadata.preferred_cycle,
        agentCode: metadata.agent_code,
      });

      // Example: Save booking to database
      // await saveBookingToDatabase({
      //   parentName: metadata.parent_name,
      //   parentEmail: metadata.parent_email,
      //   parentAddress: metadata.parent_address,
      //   parentPhone: metadata.parent_phone,
      //   childName: metadata.child_name,
      //   childDOB: metadata.child_dob,
      //   childAge: metadata.child_age,
      //   childPassport: metadata.child_passport,
      //   preferredCycle: metadata.preferred_cycle,
      //   agentCode: metadata.agent_code,
      //   stripePaymentIntentId: paymentIntent.id,
      //   amountPaid: paymentIntent.amount,
      //   currency: paymentIntent.currency,
      // });
    }

    // 4. Send confirmation email if receipt_email exists
    if (paymentIntent.receipt_email) {
      // await sendConfirmationEmail(paymentIntent.receipt_email, {
      //   agentCode,
      //   amount: paymentIntent.amount / 100, // Convert pence to pounds
      //   currency: paymentIntent.currency,
      //   paymentIntentId: paymentIntent.id,
      // });
      console.log(
        `Confirmation email would be sent to: ${paymentIntent.receipt_email}`
      );
    }

    // 5. Immediately return a 200 response to Stripe
    return NextResponse.json({ received: true, processed: true });
  }

  // Handle other event types if needed
  switch (event.type) {
    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.error(`❌ Payment failed for intent: ${failedPayment.id}`);
      // Optional: Log failed payments or notify admin
      break;

    case "charge.refunded":
      const refundedCharge = event.data.object as Stripe.Charge;
      console.log(`↩️ Refund processed for charge: ${refundedCharge.id}`);
      // Optional: Update booking status in your database
      break;

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  // Return a 200 for any other event types
  return NextResponse.json({ received: true });
}
