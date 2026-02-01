import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

async function getOrCreateCustomer(
  email: string,
  name: string,
  phone?: string,
  address?: string,
): Promise<Stripe.Customer> {
  // Check if customer already exists
  const existingCustomers = await stripe.customers.list({
    email: email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    // Update existing customer with latest info
    const customer = await stripe.customers.update(
      existingCustomers.data[0].id,
      {
        name: name || undefined,
        phone: phone || undefined,
        metadata: {
          address: address || "",
        },
      },
    );
    return customer;
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email: email,
    name: name || undefined,
    phone: phone || undefined,
    metadata: {
      address: address || "",
      source: "deposit_payment",
    },
  });

  return customer;
}

type ChildInfo = {
  childName: string;
  childDOB: string;
  childAge: string;
  preferredPathway: string;
};

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
      children,
      numberOfChildren,
      totalAmount,
      totalBalanceAmount,
      preferredCycle,
      promotionCodeId,
      couponId,
      couponName,
      originalTotal,
    } = body;

    // Validate required fields
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Payment Intent ID is required" },
        { status: 400 },
      );
    }

    if (!parentEmail) {
      return NextResponse.json(
        { error: "Parent email is required" },
        { status: 400 },
      );
    }

    if (!children || !Array.isArray(children) || children.length === 0) {
      return NextResponse.json(
        { error: "At least one child is required" },
        { status: 400 },
      );
    }

    // Create or get existing customer
    const customer = await getOrCreateCustomer(
      parentEmail,
      parentName,
      parentPhone,
      parentAddress,
    );

    // Prepare children names for display (first child's name as primary)
    const childrenNames = (children as ChildInfo[])
      .map((c) => c.childName)
      .join(", ");

    // Server-side coupon validation and amount recalculation
    let serverDiscountAmount = 0;
    let validatedCouponName = couponName || "";
    let validatedPercentOff = "";
    let validatedAmountOff = "";
    let validatedPromotionCodeId = "";
    let validatedCouponId = "";

    if (promotionCodeId) {
      const promoCode = await stripe.promotionCodes.retrieve(
        promotionCodeId,
        { expand: ["promotion.coupon"] },
      );

      const coupon = promoCode.promotion.coupon as Stripe.Coupon | null;

      if (!promoCode.active || !coupon?.valid) {
        return NextResponse.json(
          { error: "Promotion code is no longer valid" },
          { status: 400 },
        );
      }

      // Check minimum amount restriction
      if (
        promoCode.restrictions?.minimum_amount &&
        originalTotal < promoCode.restrictions.minimum_amount
      ) {
        return NextResponse.json(
          { error: "Order total does not meet the minimum for this promotion" },
          { status: 400 },
        );
      }

      validatedPromotionCodeId = promoCode.id;
      validatedCouponId = coupon.id;
      validatedCouponName = coupon.name || promoCode.code;

      // Recalculate discount server-side
      if (coupon.percent_off) {
        validatedPercentOff = String(coupon.percent_off);
        serverDiscountAmount = Math.round(
          originalTotal * (coupon.percent_off / 100),
        );
      } else if (coupon.amount_off) {
        validatedAmountOff = String(coupon.amount_off);
        serverDiscountAmount = Math.min(
          coupon.amount_off,
          originalTotal,
        );
      }
    }

    // Recalculate final amounts server-side
    const discountedTotal = originalTotal
      ? originalTotal - serverDiscountAmount
      : totalAmount;

    // Determine if this is a deposit payment (balance > 0 means deposit)
    const isDeposit = totalBalanceAmount > 0 || (originalTotal && totalAmount < originalTotal);

    let serverFinalAmount: number;
    let serverFinalBalanceAmount: number;

    if (promotionCodeId && originalTotal) {
      if (isDeposit) {
        serverFinalAmount = Math.round(discountedTotal * 0.25);
        serverFinalBalanceAmount = discountedTotal - serverFinalAmount;
      } else {
        serverFinalAmount = discountedTotal;
        serverFinalBalanceAmount = 0;
      }
    } else {
      serverFinalAmount = totalAmount;
      serverFinalBalanceAmount = totalBalanceAmount || 0;
    }

    // Guard against zero or negative amounts
    if (serverFinalAmount <= 0) {
      return NextResponse.json(
        { error: "Discount exceeds order total" },
        { status: 400 },
      );
    }

    // Update the PaymentIntent with customer, recalculated amount, and metadata
    // Setting setup_future_usage saves the card for future payments
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount: serverFinalAmount,
      customer: customer.id,
      receipt_email: parentEmail,
      setup_future_usage: "off_session",
      metadata: {
        agentCode: agentCode || "",
        parentName: parentName || "",
        parentEmail: parentEmail || "",
        parentAddress: parentAddress || "",
        parentPhone: parentPhone || "",
        numberOfChildren: String(numberOfChildren || children.length),
        childrenNames: childrenNames,
        children: JSON.stringify(children),
        totalBalanceAmount: String(serverFinalBalanceAmount),
        preferredCycle: preferredCycle || "",
        promotionCodeId: validatedPromotionCodeId,
        couponId: validatedCouponId || couponId || "",
        couponName: validatedCouponName,
        discountAmount: String(serverDiscountAmount),
        originalTotal: String(originalTotal || totalAmount),
        percentOff: validatedPercentOff,
        amountOff: validatedAmountOff,
      },
    });

    return NextResponse.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        metadata: paymentIntent.metadata,
      },
    });
  } catch (error) {
    console.error("Error updating payment intent:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update payment intent" },
      { status: 500 },
    );
  }
}
