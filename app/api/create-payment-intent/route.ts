import { stripe } from "@/lib/stripe";
import { CreatePaymentIntentRequest, PaymentOption } from "@/types/payment";
import { NextRequest, NextResponse } from "next/server";

const ELIGIBILITY_WEEKS = 8;

function isEligibleForDeposit(programStart: string): boolean {
  const startDate = new Date(programStart);
  const today = new Date();
  const diffTime = startDate.getTime() - today.getTime();
  const diffWeeks = diffTime / (1000 * 60 * 60 * 24 * 7);
  return diffWeeks >= ELIGIBILITY_WEEKS;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<{ clientSecret: string } | { error: string }>> {
  try {
    let body: CreatePaymentIntentRequest;
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

    const { productId, priceId, paymentOption } = body;

    // Validate required fields
    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "productId is required and must be a string" },
        { status: 400 }
      );
    }

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        { error: "priceId is required and must be a string" },
        { status: 400 }
      );
    }

    if (!paymentOption || !["full", "deposit"].includes(paymentOption)) {
      return NextResponse.json(
        { error: "paymentOption must be 'full' or 'deposit'" },
        { status: 400 }
      );
    }

    // Fetch the product to validate and get metadata
    const product = await stripe.products.retrieve(productId);

    if (!product.active) {
      return NextResponse.json(
        { error: "Product is not available" },
        { status: 400 }
      );
    }

    // Validate product type
    if (product.metadata?.type !== "summer_camp_cycle") {
      return NextResponse.json(
        { error: "Invalid product type" },
        { status: 400 }
      );
    }

    const programStart = product.metadata?.program_start;
    if (!programStart) {
      return NextResponse.json(
        { error: "Product missing program start date" },
        { status: 400 }
      );
    }

    // Validate eligibility for deposit payments
    if (paymentOption === "deposit" && !isEligibleForDeposit(programStart)) {
      return NextResponse.json(
        {
          error:
            "Deposit payment is not available - program starts within 8 weeks",
        },
        { status: 400 }
      );
    }

    // Fetch the price to get the amount
    const price = await stripe.prices.retrieve(priceId);

    if (!price.active) {
      return NextResponse.json(
        { error: "Price is not available" },
        { status: 400 }
      );
    }

    // Validate price belongs to the product
    if (price.product !== productId) {
      return NextResponse.json(
        { error: "Price does not belong to the specified product" },
        { status: 400 }
      );
    }

    // Validate price type matches payment option
    const priceType = price.metadata?.type as PaymentOption | undefined;
    if (priceType !== paymentOption) {
      return NextResponse.json(
        { error: "Price type does not match payment option" },
        { status: 400 }
      );
    }

    const amount = price.unit_amount;
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid price amount" },
        { status: 400 }
      );
    }

    // Calculate balance amount for deposit payments
    let balanceAmount: number | undefined;
    if (paymentOption === "deposit") {
      // Get the full price for this product
      const prices = await stripe.prices.list({
        product: productId,
        active: true,
      });
      const fullPrice = prices.data.find((p) => p.metadata?.type === "full");
      if (fullPrice?.unit_amount) {
        balanceAmount = fullPrice.unit_amount - amount;
      }
    }

    // Create PaymentIntent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: price.currency || "gbp",
      description: `Next Gems Summer Camp - ${product.name} (${paymentOption === "deposit" ? "25% Deposit" : "Full Payment"})`,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        product_id: productId,
        product_name: product.name,
        payment_type: paymentOption,
        price_id: priceId,
        program_start: programStart,
        program_end: product.metadata?.program_end || "",
        ...(balanceAmount && { balance_amount: balanceAmount.toString() }),
      },
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret as string },
      { status: 200 }
    );
  } catch (error) {
    console.error("PaymentIntent creation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to create payment intent: " + errorMessage },
      { status: 500 }
    );
  }
}
