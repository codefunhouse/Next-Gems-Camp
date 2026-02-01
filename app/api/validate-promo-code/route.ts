import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, productId } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, error: "Promotion code is required" },
        { status: 400 },
      );
    }

    // Look up the promotion code in Stripe
    const promotionCodes = await stripe.promotionCodes.list({
      code: code.trim().toUpperCase(),
      active: true,
      limit: 1,
      expand: ["data.promotion.coupon"],
    });

    if (promotionCodes.data.length === 0) {
      return NextResponse.json({
        valid: false,
        error: "Invalid or expired promotion code",
      });
    }

    const promoCode = promotionCodes.data[0];
    // coupon is expanded via the expand parameter above
    const coupon = promoCode.promotion.coupon as Stripe.Coupon;

    if (!coupon) {
      return NextResponse.json({
        valid: false,
        error: "No coupon associated with this promotion code",
      });
    }

    // Validate the promotion code is still usable
    if (!promoCode.active) {
      return NextResponse.json({
        valid: false,
        error: "This promotion code is no longer active",
      });
    }

    if (!coupon.valid) {
      return NextResponse.json({
        valid: false,
        error: "This coupon has expired",
      });
    }

    // Check expiry
    if (promoCode.expires_at && promoCode.expires_at < Date.now() / 1000) {
      return NextResponse.json({
        valid: false,
        error: "This promotion code has expired",
      });
    }

    // Check max redemptions
    if (
      promoCode.max_redemptions &&
      promoCode.times_redeemed >= promoCode.max_redemptions
    ) {
      return NextResponse.json({
        valid: false,
        error: "This promotion code has reached its usage limit",
      });
    }

    // Check product restrictions
    if (coupon.applies_to?.products && productId) {
      if (!coupon.applies_to.products.includes(productId)) {
        return NextResponse.json({
          valid: false,
          error: "This promotion code does not apply to the selected program",
        });
      }
    }

    return NextResponse.json({
      valid: true,
      promotionCodeId: promoCode.id,
      couponId: coupon.id,
      percentOff: coupon.percent_off || null,
      amountOff: coupon.amount_off || null,
      currency: coupon.currency || null,
      name: coupon.name || promoCode.code,
      minimumAmount: promoCode.restrictions?.minimum_amount || null,
    });
  } catch (error) {
    console.error("Error validating promotion code:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate promotion code" },
      { status: 500 },
    );
  }
}
