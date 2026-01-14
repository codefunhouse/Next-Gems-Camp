import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Generate random agent code (e.g., "AGT-7B3K9")
    const agentCode =
      "AGT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_PRICE_ID!,
          quantity: 1,
        },
      ],
      custom_fields: [
        // Parent/Guardian Details
        {
          key: "parent_name",
          label: { type: "custom", custom: "Parent/Guardian Full Name" },
          type: "text",
          optional: false,
        },
        {
          key: "parent_email",
          label: { type: "custom", custom: "Parent/Guardian Email Address" },
          type: "text",
          optional: false,
        },
        {
          key: "parent_address",
          label: { type: "custom", custom: "Parent/Guardian Home Address" },
          type: "text",
          optional: false,
        },
        {
          key: "parent_phone",
          label: { type: "custom", custom: "Parent/Guardian Contact No" },
          type: "text",
          optional: false,
        },
        // Agent Code (prefilled & hidden)
        {
          key: "agent_code",
          label: { type: "custom", custom: "Agent Code" },
          type: "text",
          text: {
            default_value: agentCode, // Randomly generated
          },
          optional: false,
        },
        // Child Details
        {
          key: "child_name",
          label: { type: "custom", custom: "Child Full Name" },
          type: "text",
          optional: false,
        },
        {
          key: "child_dob",
          label: { type: "custom", custom: "Child Date of Birth" },
          type: "text",
          optional: false,
        },
        {
          key: "child_age",
          label: { type: "custom", custom: "Child Age" },
          type: "text",
          optional: false,
        },
        {
          key: "child_passport",
          label: { type: "custom", custom: "Child's Passport Number" },
          type: "text",
          optional: false,
        },
        // Preferred Cycle (Dropdown)
        {
          key: "preferred_cycle",
          label: { type: "custom", custom: "Preferred Cycle" },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: "Canterbury 6th July 2026 - 20th July 2026",
                value: "cycle_1",
              },
              {
                label: "Canterbury 20th July 2026 - 3rd August 2026",
                value: "cycle_2",
              },
              {
                label: "Canterbury 3rd August 2026 - 17th August 2026",
                value: "cycle_3",
              },
            ],
          },
          optional: false,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      metadata: {
        agent_code: agentCode,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
