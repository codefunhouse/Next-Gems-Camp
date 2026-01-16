import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const ELIGIBILITY_WEEKS = 8;

function calculateBalanceDueDate(programStart: string): Date {
  const startDate = new Date(programStart);
  startDate.setDate(startDate.getDate() - ELIGIBILITY_WEEKS * 7);
  return startDate;
}

async function createBalanceInvoice(paymentIntent: Stripe.PaymentIntent) {
  const metadata = paymentIntent.metadata;
  const customerId = paymentIntent.customer as string | null;
  const receiptEmail = paymentIntent.receipt_email;

  if (!customerId) {
    console.error("❌ No customer attached to payment intent, cannot create invoice");
    return;
  }

  const programStart = metadata.program_start;
  // Use totalBalanceAmount for multiple children, fall back to balance_amount for single child
  const balanceAmount = parseInt(metadata.totalBalanceAmount || metadata.balance_amount || "0", 10);
  const productName = metadata.product_name;
  const numberOfChildren = parseInt(metadata.numberOfChildren || "1", 10);
  const childrenNames = metadata.childrenNames || "";

  if (!programStart || !balanceAmount) {
    console.error("❌ Missing required metadata for invoice creation");
    return;
  }

  try {
    // Get the customer (should already exist from update-payment-intent)
    const customer = await stripe.customers.retrieve(customerId);

    if (customer.deleted) {
      console.error("❌ Customer has been deleted");
      return;
    }

    // Get the customer's default payment method (saved from the deposit payment)
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
      limit: 1,
    });

    const defaultPaymentMethod = paymentMethods.data[0]?.id || null;

    if (defaultPaymentMethod) {
      console.log(`💳 Found saved payment method: ${defaultPaymentMethod}`);
    } else {
      console.log("ℹ️ No saved payment method found, invoice will require manual payment");
    }

    // Calculate due date (8 weeks before program start)
    const dueDate = calculateBalanceDueDate(programStart);

    // Create invoice with saved payment method as default
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      due_date: Math.floor(dueDate.getTime() / 1000),
      default_payment_method: defaultPaymentMethod || undefined,
      metadata: {
        payment_type: "balance",
        original_payment_intent: paymentIntent.id,
        product_id: metadata.product_id,
        program_start: programStart,
      },
    });

    // Add line item for balance amount
    const childrenSuffix = numberOfChildren > 1
      ? ` - ${numberOfChildren} children (${childrenNames})`
      : childrenNames ? ` - ${childrenNames}` : "";

    await stripe.invoiceItems.create({
      customer: customerId,
      invoice: invoice.id,
      amount: balanceAmount,
      currency: paymentIntent.currency,
      description: `Balance Payment - ${productName} (75% remaining)${childrenSuffix}`,
    });

    // Finalize and send the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
    await stripe.invoices.sendInvoice(finalizedInvoice.id);

    console.log(`✅ Balance invoice created and sent: ${finalizedInvoice.id}`);
    console.log(`   Customer: ${receiptEmail}`);
    console.log(`   Amount: ${balanceAmount / 100} ${paymentIntent.currency.toUpperCase()}`);
    console.log(`   Due date: ${dueDate.toISOString().split("T")[0]}`);
    if (defaultPaymentMethod) {
      console.log(`   💳 Saved card attached for easy payment`);
    }
  } catch (error) {
    console.error("❌ Failed to create balance invoice:", error);
    throw error;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rawBody = await request.arrayBuffer();
  const body = Buffer.from(rawBody).toString("utf-8");

  const signature = request.headers.get("stripe-signature");

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
  console.log("🔍 Processing webhook event:", event.type);

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const metadata = paymentIntent.metadata;
    const paymentType = metadata?.payment_type;

    console.log(
      `💰 PaymentIntent ${paymentIntent.id} succeeded (type: ${paymentType || "unknown"}).`
    );

    // Log metadata for debugging
    if (metadata) {
      console.log("Full metadata received:", {
        parentName: metadata.parentName,
        parentEmail: metadata.parentEmail,
        numberOfChildren: metadata.numberOfChildren,
        childrenNames: metadata.childrenNames,
        preferredCycle: metadata.preferredCycle,
        agentCode: metadata.agentCode,
        paymentType: metadata.payment_type,
        productId: metadata.product_id,
        productName: metadata.product_name,
        totalBalanceAmount: metadata.totalBalanceAmount,
      });
    }

    // Handle deposit payments - create balance invoice
    if (paymentType === "deposit") {
      console.log("📧 Creating balance invoice for deposit payment...");
      try {
        await createBalanceInvoice(paymentIntent);
      } catch (error) {
        console.error("❌ Failed to create balance invoice:", error);
        // Don't fail the webhook - the payment succeeded, we just need to manually follow up
      }
    }

    // Log confirmation email info
    if (paymentIntent.receipt_email) {
      console.log(
        `📬 Confirmation email would be sent to: ${paymentIntent.receipt_email}`
      );
    }

    return NextResponse.json({ received: true, processed: true });
  }

  // Handle other event types
  switch (event.type) {
    case "payment_intent.payment_failed": {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.error(`❌ Payment failed for intent: ${failedPayment.id}`);
      break;
    }

    case "charge.refunded": {
      const refundedCharge = event.data.object as Stripe.Charge;
      console.log(`↩️ Refund processed for charge: ${refundedCharge.id}`);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`✅ Invoice paid: ${invoice.id}`);
      console.log(`   Amount: ${(invoice.amount_paid || 0) / 100} ${invoice.currency?.toUpperCase()}`);
      if (invoice.metadata?.payment_type === "balance") {
        console.log("   This was a balance payment for a deposit booking.");
      }
      break;
    }

    case "invoice.payment_failed": {
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.error(`❌ Invoice payment failed: ${failedInvoice.id}`);
      console.error(`   Customer: ${failedInvoice.customer_email}`);
      if (failedInvoice.metadata?.payment_type === "balance") {
        console.error("   This was a balance payment - follow up required!");
      }
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  // Return a 200 for any other event types
  return NextResponse.json({ received: true });
}
