# Payment Booking Flow Documentation

This document describes the payment booking system for Next Gems Camp, including the Stripe integration, multi-step checkout process, and invoice generation for deposit payments.

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Payment Flow Steps](#payment-flow-steps)
4. [Components](#components)
5. [API Routes](#api-routes)
6. [Stripe Integration](#stripe-integration)
7. [Multiple Children Support](#multiple-children-support)
8. [Agent Code Validation](#agent-code-validation)
9. [Card Saving for Future Payments](#card-saving-for-future-payments)
10. [Webhook Handling](#webhook-handling)
11. [Data Flow Diagram](#data-flow-diagram)

---

## Overview

The payment system allows parents to book camp programs for their children through an agent referral system. Key features include:

- **Two payment options**: Full payment or 25% deposit
- **Multiple children**: Support for registering multiple children in a single booking
- **Agent referral tracking**: Bookings are linked to referring agents via URL parameters
- **Automatic invoicing**: Deposit payments automatically generate balance invoices
- **Card saving**: Customer cards are saved for easy balance payment

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                          │
├─────────────────────────────────────────────────────────────────────┤
│  Payment.tsx → CycleSelector → PaymentOptionSelector → CheckoutForm │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API Routes                                   │
├─────────────────────────────────────────────────────────────────────┤
│  /api/check-eligibility     - Validate agent code, get cycles       │
│  /api/create-payment-intent - Create Stripe PaymentIntent           │
│  /api/update-payment-intent - Update with customer data             │
│  /api/verify-payment        - Verify payment status                 │
│  /api/webhooks/stripe       - Handle Stripe webhook events          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Stripe                                       │
├─────────────────────────────────────────────────────────────────────┤
│  PaymentIntents, Customers, PaymentMethods, Invoices                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Payment Flow Steps

### Step 1: Agent Code Validation
1. User visits `/agent-payments-by-parent?agentCode=NGA-AGENT-SC26`
2. Agent code is extracted from URL query parameter
3. If no agent code, error screen is displayed
4. `/api/check-eligibility` validates the agent code and returns available program cycles

### Step 2: Cycle Selection
1. User selects a program cycle (e.g., "Summer Camp 2026 - Cycle 1")
2. Pricing information is displayed for the selected cycle

### Step 3: Payment Option Selection
1. User chooses between:
   - **Full Payment**: Pay 100% upfront
   - **Deposit**: Pay 25% now, 75% invoiced for later
2. PaymentIntent is created via `/api/create-payment-intent`

### Step 4: Checkout Form (3 Sub-steps)
1. **Parent Details**: Name, email, address, phone
2. **Child Details**: Add one or more children with name, DOB, age
3. **Review & Pay**: Order summary, payment form (Stripe Elements)

### Step 5: Payment Processing
1. PaymentIntent is updated with customer data via `/api/update-payment-intent`
2. Card is charged via Stripe Elements
3. User is redirected to success page

### Step 6: Post-Payment (Webhook)
1. Stripe webhook receives `payment_intent.succeeded` event
2. For deposits: Balance invoice is created and sent to customer
3. Customer's card is saved for future payments

---

## Components

### `Payment.tsx`
**Location**: `components/payment/Payment.tsx`

Main orchestrator component that manages the payment flow state.

**Responsibilities**:
- Extract agent code from URL query parameter
- Display error screen if no agent code
- Manage flow steps: loading → cycle-select → payment-select → checkout
- Fetch eligibility data and available cycles
- Create PaymentIntent when payment option is selected
- Pass data to child components

**Key State**:
```typescript
type FlowStep = "loading" | "no-agent-code" | "cycle-select" | "payment-select" | "checkout" | "contact" | "error";

const [step, setStep] = useState<FlowStep>("loading");
const [selectedCycle, setSelectedCycle] = useState<ProgramCycle | null>(null);
const [paymentOption, setPaymentOption] = useState<PaymentOption | null>(null);
const [clientSecret, setClientSecret] = useState<string | null>(null);
```

### `CycleSelector.tsx`
**Location**: `components/payment/CycleSelector.tsx`

Displays available program cycles as selectable cards.

**Features**:
- Hover animations (scale and shadow)
- Visual selection state (blue border and background)
- Displays cycle name, dates, and pricing

### `PaymentOptionSelector.tsx`
**Location**: `components/payment/PaymentOptionSelector.tsx`

Allows user to choose between full payment and deposit.

**Features**:
- Full payment option (green theme)
- Deposit option (blue theme) with breakdown of deposit and balance amounts
- Hover animations

### `CheckoutForm.tsx`
**Location**: `components/payment/CheckoutForm.tsx`

Multi-step form handling parent/child data collection and payment.

**Props**:
```typescript
interface CheckoutFormProps {
  clientSecret: string;
  selectedCycle: ProgramCycle;
  paymentOption: PaymentOption;
  agentCode: string;
}
```

**Form Steps**:
1. Parent details (agent code read-only)
2. Child details (supports multiple children)
3. Review and payment

**Key Features**:
- Uses `react-hook-form` with `useFieldArray` for dynamic children
- Age auto-calculation from DOB
- Real-time price calculation based on number of children
- Stripe Elements integration for secure card input

---

## API Routes

### `POST /api/check-eligibility`
Validates agent code and returns available program cycles.

**Request**:
```json
{
  "agentCode": "NGA-AGENT-SC26"
}
```

**Response**:
```json
{
  "eligible": true,
  "cycles": [
    {
      "id": "cycle-1",
      "name": "Summer Camp 2026 - Cycle 1",
      "startDate": "2026-07-01",
      "endDate": "2026-07-14",
      "pricing": {
        "full": { "amount": 360000 },
        "deposit": { "amount": 90000, "balanceAmount": 270000 }
      }
    }
  ]
}
```

### `POST /api/create-payment-intent`
Creates a Stripe PaymentIntent for the selected cycle and payment option.

**Request**:
```json
{
  "cycleId": "cycle-1",
  "paymentOption": "deposit",
  "productName": "Summer Camp 2026 - Cycle 1"
}
```

**Response**:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### `POST /api/update-payment-intent`
Updates PaymentIntent with customer data before payment confirmation.

**Request**:
```json
{
  "paymentIntentId": "pi_xxx",
  "agentCode": "NGA-AGENT-SC26",
  "parentName": "John Doe",
  "parentEmail": "john@example.com",
  "parentAddress": "123 Main St",
  "parentPhone": "+44123456789",
  "children": [
    { "childName": "Jane Doe", "childDOB": "2015-03-15", "childAge": "11" }
  ],
  "numberOfChildren": 1,
  "totalAmount": 90000,
  "totalBalanceAmount": 270000,
  "preferredCycle": "cycle-1"
}
```

**Actions**:
1. Creates or retrieves existing Stripe Customer
2. Updates PaymentIntent with:
   - Customer ID
   - Receipt email
   - `setup_future_usage: "off_session"` (saves card)
   - All form data as metadata

### `GET /api/verify-payment`
Verifies payment status after redirect from Stripe.

**Query Parameters**:
- `payment_intent_id`: The PaymentIntent ID

**Response**:
```json
{
  "status": "succeeded",
  "amount": 90000,
  "currency": "gbp",
  "agentCode": "NGA-AGENT-SC26",
  "customerEmail": "john@example.com",
  "paymentType": "deposit",
  "productName": "Summer Camp 2026 - Cycle 1",
  "balanceAmount": 270000,
  "balanceDueDate": "2026-05-06"
}
```

### `POST /api/webhooks/stripe`
Handles Stripe webhook events.

**Handled Events**:
- `payment_intent.succeeded`: Creates balance invoice for deposits
- `payment_intent.payment_failed`: Logs failed payment
- `charge.refunded`: Logs refund
- `invoice.paid`: Logs successful invoice payment
- `invoice.payment_failed`: Logs failed invoice payment

---

## Stripe Integration

### PaymentIntent Metadata
All booking data is stored in PaymentIntent metadata:

```typescript
metadata: {
  agentCode: "NGA-AGENT-SC26",
  parentName: "John Doe",
  parentEmail: "john@example.com",
  parentAddress: "123 Main St",
  parentPhone: "+44123456789",
  numberOfChildren: "2",
  childrenNames: "Jane Doe, Jack Doe",
  children: "[{...}, {...}]", // JSON string
  totalBalanceAmount: "540000",
  preferredCycle: "cycle-1",
  payment_type: "deposit",
  product_id: "cycle-1",
  product_name: "Summer Camp 2026 - Cycle 1",
  program_start: "2026-07-01",
  balance_amount: "270000" // per child
}
```

### Stripe Elements Configuration
```typescript
const options: StripeElementsOptions = {
  clientSecret,
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#2563eb",
      colorText: "#1f2937",
    },
  },
};
```

---

## Multiple Children Support

### Form Structure
```typescript
type ChildInfo = {
  childName: string;
  childDOB: string;
  childAge: string;
};

type FormData = {
  agentCode: string;
  parentName: string;
  parentEmail: string;
  parentAddress: string;
  parentPhone: string;
  children: ChildInfo[];
};
```

### Dynamic Field Management
Uses `react-hook-form`'s `useFieldArray`:
```typescript
const { fields, append, remove } = useFieldArray({
  control,
  name: "children",
});
```

### Price Calculation
```typescript
const numberOfChildren = fields.length;
const totalAmount = amount * numberOfChildren;
const totalBalanceAmount = paymentOption === "deposit"
  ? selectedCycle.pricing.deposit.balanceAmount * numberOfChildren
  : 0;
```

### Age Auto-Calculation
```typescript
const calculateAge = (dob: string): string => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age.toString();
};

const handleDOBChange = (index: number, value: string) => {
  setValue(`children.${index}.childDOB`, value);
  const age = calculateAge(value);
  setValue(`children.${index}.childAge`, age);
};
```

---

## Agent Code Validation

### URL-Based Agent Code
Agent codes must be provided via URL query parameter:
```
/agent-payments-by-parent?agentCode=NGA-AGENT-SC26
```

### Validation Flow
```typescript
// In Payment.tsx
const searchParams = useSearchParams();
const agentCode = searchParams.get("agentCode");

useEffect(() => {
  if (!agentCode) {
    setStep("no-agent-code");
    return;
  }
  // Proceed with eligibility check
}, [agentCode]);
```

### Error Screen
If no agent code is provided:
```
┌─────────────────────────────────────┐
│       Agent Code Required           │
│                                     │
│  You cannot proceed without a       │
│  valid agent code. Please ask       │
│  your agent to send you the         │
│  correct booking link.              │
│                                     │
│       [Return to Home]              │
└─────────────────────────────────────┘
```

### Read-Only Agent Code Field
In CheckoutForm, the agent code field is pre-filled and disabled:
```tsx
<input
  type="text"
  value={agentCode}
  disabled
  className="bg-gray-100 cursor-not-allowed"
/>
```

---

## Card Saving for Future Payments

### How It Works
1. Customer is created/retrieved in `update-payment-intent`
2. PaymentIntent includes `setup_future_usage: "off_session"`
3. When payment succeeds, card is automatically saved to customer
4. Balance invoice includes saved payment method as default

### Implementation

**In update-payment-intent/route.ts**:
```typescript
const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
  customer: customer.id,
  setup_future_usage: "off_session", // Saves the card
  // ...
});
```

**In webhooks/stripe/route.ts** (when creating invoice):
```typescript
// Retrieve saved payment method
const paymentMethods = await stripe.paymentMethods.list({
  customer: customerId,
  type: "card",
  limit: 1,
});

const defaultPaymentMethod = paymentMethods.data[0]?.id || null;

// Attach to invoice
const invoice = await stripe.invoices.create({
  customer: customerId,
  default_payment_method: defaultPaymentMethod || undefined,
  // ...
});
```

---

## Webhook Handling

### Webhook Route
**Location**: `app/api/webhooks/stripe/route.ts`

### Signature Verification
```typescript
const signature = request.headers.get("stripe-signature");
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

### Balance Invoice Creation
For deposit payments, a balance invoice is automatically created:

```typescript
async function createBalanceInvoice(paymentIntent: Stripe.PaymentIntent) {
  const metadata = paymentIntent.metadata;
  const customerId = paymentIntent.customer as string;

  // Calculate due date (8 weeks before program start)
  const programStart = metadata.program_start;
  const dueDate = new Date(programStart);
  dueDate.setDate(dueDate.getDate() - 8 * 7);

  // Get balance amount (handles multiple children)
  const balanceAmount = parseInt(
    metadata.totalBalanceAmount || metadata.balance_amount || "0",
    10
  );

  // Create and send invoice
  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: "send_invoice",
    due_date: Math.floor(dueDate.getTime() / 1000),
    default_payment_method: savedPaymentMethodId,
  });

  await stripe.invoiceItems.create({
    customer: customerId,
    invoice: invoice.id,
    amount: balanceAmount,
    currency: paymentIntent.currency,
    description: `Balance Payment - ${productName} (75% remaining)`,
  });

  await stripe.invoices.finalizeInvoice(invoice.id);
  await stripe.invoices.sendInvoice(invoice.id);
}
```

---

## Data Flow Diagram

```
User visits /agent-payments-by-parent?agentCode=XXX
                    │
                    ▼
┌───────────────────────────────────────┐
│ Payment.tsx extracts agentCode        │
│ from URL query params                 │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ POST /api/check-eligibility           │
│ → Validates agent, returns cycles     │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ User selects cycle                    │
│ (CycleSelector.tsx)                   │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ User selects payment option           │
│ (PaymentOptionSelector.tsx)           │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ POST /api/create-payment-intent       │
│ → Creates PaymentIntent               │
│ → Returns clientSecret                │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ User fills checkout form              │
│ (CheckoutForm.tsx)                    │
│ - Step 1: Parent details              │
│ - Step 2: Child(ren) details          │
│ - Step 3: Review & pay                │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ POST /api/update-payment-intent       │
│ → Creates/updates Stripe Customer     │
│ → Updates PaymentIntent with metadata │
│ → Sets setup_future_usage             │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ stripe.confirmPayment()               │
│ → Charges card via Stripe Elements    │
│ → Redirects to success page           │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│ GET /api/verify-payment               │
│ → Verifies payment succeeded          │
│ → Returns details for success page    │
└───────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐       ┌───────────────────────────┐
│ Success Page  │       │ Stripe Webhook            │
│ displayed     │       │ (payment_intent.succeeded)│
└───────────────┘       └───────────────────────────┘
                                    │
                                    ▼
                        ┌───────────────────────────┐
                        │ If deposit payment:       │
                        │ → Create balance invoice  │
                        │ → Attach saved card       │
                        │ → Send invoice to email   │
                        └───────────────────────────┘
```

---

## Environment Variables

```env
# Stripe
STRIPE_SECRET_KEY=sk_xxx
STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

## Testing

### Test Mode Considerations
- Stripe test mode does not send real emails
- Use Stripe Dashboard to view invoices
- Test card: `4242 4242 4242 4242`

### Testing the Flow
1. Visit `/agent-payments-by-parent?agentCode=TEST-AGENT-001`
2. Select a program cycle
3. Choose deposit or full payment
4. Fill in parent and child details
5. Use test card to complete payment
6. Verify success page displays correctly
7. Check Stripe Dashboard for:
   - PaymentIntent with correct metadata
   - Customer created with saved card
   - Invoice created (for deposits)

### Webhook Testing
Use Stripe CLI for local webhook testing:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## File Structure

```
├── app/
│   ├── agent-payments-by-parent/
│   │   └── success/
│   │       └── page.tsx          # Success page
│   └── api/
│       ├── check-eligibility/
│       │   └── route.ts          # Agent validation
│       ├── create-payment-intent/
│       │   └── route.ts          # Create PaymentIntent
│       ├── update-payment-intent/
│       │   └── route.ts          # Update with customer data
│       ├── verify-payment/
│       │   └── route.ts          # Verify payment status
│       └── webhooks/
│           └── stripe/
│               └── route.ts      # Webhook handler
├── components/
│   └── payment/
│       ├── Payment.tsx           # Main flow orchestrator
│       ├── CycleSelector.tsx     # Cycle selection
│       ├── PaymentOptionSelector.tsx  # Full/deposit selection
│       ├── CheckoutForm.tsx      # Multi-step checkout form
│       └── ContactUs.tsx         # Contact form (alternate flow)
├── lib/
│   └── stripe.ts                 # Stripe client initialization
└── types/
    └── payment.ts                # TypeScript types
```

---

## Security Considerations

1. **Webhook Signature Verification**: All webhooks verify Stripe signature
2. **Server-Side Price Calculation**: Amounts are calculated server-side, not trusted from client
3. **Environment Variables**: Stripe keys stored in environment variables
4. **setup_future_usage**: Card details handled by Stripe, never touch our servers
5. **Agent Code Validation**: Server-side validation of agent codes

---

## Future Improvements

- [ ] Add rate limiting to API routes
- [ ] Implement email notifications via SendGrid/Resend
- [ ] Add admin dashboard for viewing bookings
- [ ] Support partial refunds
- [ ] Add promo code support
