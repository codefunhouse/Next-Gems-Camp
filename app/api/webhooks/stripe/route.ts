import { stripe } from "@/lib/stripe";
import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Email sending function
async function sendConfirmationEmail(
  recipientEmail: string,
  bookingDetails: {
    agentCode: string;
    parentName: string;
    childName: string;
    preferredCycle: string;
    amount: number;
    currency: string;
    paymentIntentId: string;
  }
) {
  const cycleMapping: Record<string, string> = {
    cycle_1: "Canterbury 6th July 2026 - 20th July 2026",
    cycle_2: "Canterbury 20th July 2026 - 3rd August 2026",
    cycle_3: "Canterbury 3rd August 2026 - 17th August 2026",
  };

  const cycleName =
    cycleMapping[bookingDetails.preferredCycle] ||
    bookingDetails.preferredCycle;

  const msg = {
    to: recipientEmail,
    from: process.env.SENDGRID_FROM_EMAIL!, // Your verified sender email
    subject: `Booking Confirmation - Summer Camp 2026 (${bookingDetails.agentCode})`,
    text: `
Dear ${bookingDetails.parentName},

Thank you for booking with us! Your payment has been successfully processed.

BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent Code:       ${bookingDetails.agentCode}
Child Name:       ${bookingDetails.childName}
Program:          ${cycleName}
Amount Paid:      ${bookingDetails.currency.toUpperCase()} ${bookingDetails.amount.toFixed(2)}
Payment ID:       ${bookingDetails.paymentIntentId}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please save your Agent Code (${bookingDetails.agentCode}) for future reference.

We will contact you shortly with further details about the summer camp program.

If you have any questions, please don't hesitate to contact us.

Best regards,
Summer Camp Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .agent-code-box {
      background: #f0f4ff;
      border: 2px solid #667eea;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      text-align: center;
    }
    .agent-code-box .label {
      font-size: 12px;
      color: #667eea;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .agent-code-box .code {
      font-size: 28px;
      font-weight: bold;
      color: #667eea;
      font-family: 'Courier New', monospace;
      margin-top: 5px;
    }
    .details-table {
      width: 100%;
      margin: 20px 0;
      border-collapse: collapse;
    }
    .details-table td {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
    }
    .details-table td:first-child {
      font-weight: bold;
      color: #666;
      width: 40%;
    }
    .details-table td:last-child {
      color: #333;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 10px 10px;
      font-size: 12px;
      color: #666;
    }
    .success-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="success-icon">✓</div>
    <h1>Booking Confirmed!</h1>
    <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
      Summer Camp 2026
    </p>
  </div>
  
  <div class="content">
    <p>Dear <strong>${bookingDetails.parentName}</strong>,</p>
    
    <p>
      Thank you for booking with us! Your payment has been successfully processed.
    </p>

    <div class="agent-code-box">
      <div class="label">Your Agent Reference Code</div>
      <div class="code">${bookingDetails.agentCode}</div>
      <div style="font-size: 11px; color: #666; margin-top: 8px;">
        Please save this code for future communication
      </div>
    </div>

    <h3 style="color: #667eea; margin-top: 30px;">Booking Details</h3>
    
    <table class="details-table">
      <tr>
        <td>Child Name</td>
        <td>${bookingDetails.childName}</td>
      </tr>
      <tr>
        <td>Program</td>
        <td>${cycleName}</td>
      </tr>
      <tr>
        <td>Amount Paid</td>
        <td><strong>${bookingDetails.currency.toUpperCase()} ${bookingDetails.amount.toFixed(2)}</strong></td>
      </tr>
      <tr>
        <td>Payment ID</td>
        <td style="font-family: monospace; font-size: 12px;">${bookingDetails.paymentIntentId}</td>
      </tr>
    </table>

    <p style="margin-top: 30px;">
      We will contact you shortly with further details about the summer camp program, 
      including arrival instructions, what to pack, and the full schedule.
    </p>

    <p>
      If you have any questions, please don't hesitate to contact us.
    </p>

    <p style="margin-top: 30px;">
      Best regards,<br>
      <strong>Summer Camp Team</strong>
    </p>
  </div>

  <div class="footer">
    <p>
      This is an automated confirmation email. Please do not reply directly to this message.
    </p>
    <p style="margin-top: 10px;">
      © 2026 Summer Camp. All rights reserved.
    </p>
  </div>
</body>
</html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent successfully to ${recipientEmail}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return { success: false, error };
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
  console.log("🔍 Attempting to verify signature...");

  if (event.type === "payment_intent.succeeded") {
    // Type guard to ensure we have the correct event type
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const metadata = paymentIntent.metadata;

    console.log(
      `💰 PaymentIntent ${paymentIntent.id} succeeded for agent ${metadata?.agentCode}.`
    );

    // 3. Extract all metadata
    if (metadata) {
      console.log("Full metadata received:", {
        parentName: metadata.parentName,
        parentEmail: metadata.parentEmail,
        childName: metadata.childName,
        preferredCycle: metadata.preferredCycle,
        agentCode: metadata.agentCode,
      });

      // 4. Send confirmation email
      const recipientEmail =
        metadata.parentEmail ||
        paymentIntent.receipt_email ||
        "nicholas.okeke87@gmail.com";

      if (recipientEmail) {
        await sendConfirmationEmail(recipientEmail, {
          agentCode: metadata.agentCode || "N/A",
          parentName: metadata.parentName || "Valued Customer",
          childName: metadata.childName || "N/A",
          preferredCycle: metadata.preferredCycle || "N/A",
          amount: paymentIntent.amount / 100, // Convert pence/cents to main currency
          currency: paymentIntent.currency,
          paymentIntentId: paymentIntent.id,
        });

        console.log("Email sent");
      } else {
        console.warn("⚠️ No email address found for confirmation email");
      }
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
