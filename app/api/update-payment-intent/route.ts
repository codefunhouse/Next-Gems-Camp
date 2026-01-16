import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

async function getOrCreateCustomer(
  email: string,
  name: string,
  phone?: string,
  address?: string
): Promise<Stripe.Customer> {
  // Check if customer already exists
  const existingCustomers = await stripe.customers.list({
    email: email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    // Update existing customer with latest info
    const customer = await stripe.customers.update(existingCustomers.data[0].id, {
      name: name || undefined,
      phone: phone || undefined,
      metadata: {
        address: address || "",
      },
    });
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
    } = body;

    // Validate required fields
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Payment Intent ID is required" },
        { status: 400 }
      );
    }

    if (!parentEmail) {
      return NextResponse.json(
        { error: "Parent email is required" },
        { status: 400 }
      );
    }

    if (!children || !Array.isArray(children) || children.length === 0) {
      return NextResponse.json(
        { error: "At least one child is required" },
        { status: 400 }
      );
    }

    // Create or get existing customer
    const customer = await getOrCreateCustomer(
      parentEmail,
      parentName,
      parentPhone,
      parentAddress
    );

    // Prepare children names for display (first child's name as primary)
    const childrenNames = (children as ChildInfo[])
      .map((c) => c.childName)
      .join(", ");

    // Update the PaymentIntent with customer, new amount, and metadata
    // Setting setup_future_usage saves the card for future payments
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount: totalAmount,
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
        totalBalanceAmount: String(totalBalanceAmount || 0),
        preferredCycle: preferredCycle || "",
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
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update payment intent" },
      { status: 500 }
    );
  }
}
