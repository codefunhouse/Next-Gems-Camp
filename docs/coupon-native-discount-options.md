# Coupon Implementation: Native Stripe Discount Options

## The Problem

Our current coupon implementation manually calculates discounted amounts and sets them on the PaymentIntent. From Stripe's perspective, it just sees a payment for the reduced amount — there is no formal link between the PaymentIntent and the Stripe Coupon/Promotion Code object.

This means:

- `times_redeemed` on the Promotion Code is never incremented by Stripe
- `max_redemptions` limits will never be enforced (the check in our code reads a counter that never updates)
- Per-customer restrictions (`first_time_transaction`) are not enforced
- The payment does not appear under the Coupon's redemption history in the Stripe Dashboard

The coupon details are stored in PaymentIntent metadata (couponId, couponName, discountAmount, etc.), so they are visible in the Dashboard — but there is no automated tracking.

---

## Where Stripe Supports Native Discounts

Stripe only supports the `discounts` parameter on two objects:

1. **Checkout Sessions** — `stripe.checkout.sessions.create({ discounts: [{ promotion_code: 'promo_xxx' }] })`
2. **Invoices** — `stripe.invoices.create({ discounts: [{ coupon: 'coupon_id' }] })`

**PaymentIntents do not have a `discounts` parameter.** This is the core constraint. Our deposit/full payment uses a PaymentIntent, so we cannot natively attach a coupon to it.

---

## Option A: Switch to Stripe Checkout Sessions

Replace our custom payment form (PaymentElement) with Stripe's hosted Checkout page. The customer is redirected to Stripe's UI to complete payment.

### How it works

1. User completes Steps 1-2 on our site (parent/child details)
2. Instead of showing PaymentElement in Step 3, we create a Checkout Session:
   ```
   stripe.checkout.sessions.create({
     line_items: [{ price: priceId, quantity: numberOfChildren }],
     discounts: [{ promotion_code: promoCodeId }],
     mode: 'payment',
     success_url: '...',
     cancel_url: '...',
     metadata: { ...bookingData }
   })
   ```
3. User is redirected to Stripe's hosted page
4. Stripe handles discount display, validation, and redemption tracking
5. After payment, user is redirected back to our success page
6. Webhook fires as normal

### What changes

| Area | Current | After change |
|------|---------|--------------|
| Payment UI | Custom PaymentElement in our form | Stripe's hosted checkout page |
| Promo code input | Our custom input in Step 3 | Stripe's built-in promo code field, or passed programmatically |
| User experience | Single-page, seamless | Redirect away from site, then back |
| Coupon tracking | Manual (metadata only) | Fully automatic (Stripe tracks redemptions) |
| `max_redemptions` | Not enforced | Enforced by Stripe |
| Custom form fields | Integrated with payment | Separate from payment (Steps 1-2 only) |

### Files affected

- `components/payment/Payment.tsx` — Replace PaymentIntent creation + Elements wrapper with Checkout Session redirect
- `components/payment/CheckoutForm.tsx` — Remove Step 3 entirely, or restructure as a review step before redirect
- `app/api/create-payment-intent/route.ts` — Replace with `create-checkout-session` route
- `app/api/update-payment-intent/route.ts` — Likely removed; metadata passed at session creation
- `app/api/validate-promo-code/route.ts` — Possibly removed if Stripe handles validation in Checkout

### Trade-offs

| Pros | Cons |
|------|------|
| Full native coupon tracking | Lose control over payment UI |
| Stripe handles all discount logic | User leaves our site during payment |
| PCI compliance simplified | Cannot customise the payment form appearance |
| Automatic receipt with discount shown | Breaks the seamless single-page experience |
| Less code to maintain | Harder to show custom order summary alongside payment |

### Verdict

**Not recommended.** The custom multi-step form with integrated PaymentElement is a better user experience. Switching to hosted Checkout is a significant UX downgrade for this use case.

---

## Option B: Switch to Invoice-Based Payment

Instead of creating a PaymentIntent directly, create a Stripe Invoice for both the deposit and the full payment. Invoices support native `discounts` and auto-create a PaymentIntent when finalised. We use that PaymentIntent's clientSecret with our existing PaymentElement — keeping the custom UI intact.

### How it works

**Current flow:**
```
Select cycle → Select payment option → Create PaymentIntent → Show form with PaymentElement → Submit form → Update PaymentIntent → confirmPayment → Success
```

**New flow:**
```
Select cycle → Select payment option → Show form (no PaymentElement yet) → Submit form → Create & finalise Invoice (with discount) → Mount PaymentElement with Invoice's PI → User enters card → confirmPayment → Success
```

The key difference: PaymentElement mounts AFTER the form is submitted, not before. This is because the Invoice must be finalised to generate a PaymentIntent, and we can't finalise until we know the final amount (number of children + coupon).

### Step-by-step new flow

1. **User selects cycle and payment option** — No API call yet (currently we create PI here)
2. **User fills parent/child details (Step 1-2)** — Same as now
3. **User enters promo code and reviews order (Step 3)** — Promo code validation via our existing `/api/validate-promo-code` route
4. **User clicks "Proceed to Payment":**
   - Frontend calls a new `/api/create-booking-invoice` route
   - Backend creates a draft Invoice with:
     - Line item(s) for deposit or full amount x number of children
     - Customer (created/retrieved as now)
     - `discounts: [{ promotion_code: promoCodeId }]` if coupon applied
     - `metadata` with all booking data
   - Backend finalises the Invoice → Stripe auto-creates a PaymentIntent
   - Backend returns the PaymentIntent's `clientSecret`
5. **PaymentElement mounts** with the clientSecret
6. **User enters card details and clicks Pay** — `stripe.confirmPayment()` as now
7. **Webhook fires** — `invoice.paid` event (instead of `payment_intent.succeeded`)
   - For deposits: create the balance Invoice with the same coupon via `discounts`
   - Stripe automatically tracks the coupon redemption on both Invoices

### What changes

| Area | Current | After change |
|------|---------|--------------|
| Initial API call | `create-payment-intent` (on payment option select) | No API call until form submit |
| PaymentElement mount time | Immediately when Step 3 loads | After "Proceed to Payment" click |
| Payment object | PaymentIntent (manual amount) | Invoice → auto-created PaymentIntent |
| Coupon application | Manual amount calculation | Native `discounts` on Invoice |
| Coupon tracking | Not tracked | Fully tracked by Stripe |
| `max_redemptions` | Not enforced | Enforced by Stripe |
| Balance Invoice (deposits) | Manual line items + negative discount | Native `discounts` on second Invoice |
| Webhook event | `payment_intent.succeeded` | `invoice.paid` |

### UX impact

The user will experience a brief loading state between clicking "Proceed to Payment" and seeing the card input form. During this time, the Invoice is being created and finalised. This could be 1-2 seconds.

**Two ways to handle this:**

1. **Loading state** — Show a spinner after "Proceed to Payment", then reveal PaymentElement. Simple.
2. **Split Step 3** — Step 3 becomes "Review Order" with promo code input. A new Step 4 becomes "Enter Payment Details" with PaymentElement. More explicit but adds a step.

### Files affected

| File | Change |
|------|--------|
| `app/api/create-payment-intent/route.ts` | Replace with `create-booking-invoice/route.ts` (creates draft Invoice, finalises, returns clientSecret) |
| `app/api/update-payment-intent/route.ts` | Remove or repurpose — all data is set at Invoice creation time |
| `app/api/validate-promo-code/route.ts` | Keep as-is (still needed for client-side validation before showing discount) |
| `components/payment/Payment.tsx` | Remove early PaymentIntent creation; pass cycle/option data to CheckoutForm without clientSecret |
| `components/payment/CheckoutForm.tsx` | Restructure Step 3: PaymentElement mounts after form submission, not on load. Add loading state or extra step. |
| `app/api/webhooks/stripe/route.ts` | Listen for `invoice.paid` instead of `payment_intent.succeeded`. Balance Invoice uses native `discounts`. |
| `components/payment/PaymentOptionSelector.tsx` | No change |
| `components/payment/CycleSelector.tsx` | No change |

### Deposit + balance flow with native discounts

For a deposit booking with a 20% off coupon and 2 children at 2000 GBP each:

**Deposit Invoice (created at checkout):**
```
Line item: "Summer Camp 2026 - Deposit (25%)" × 2 = 1000 GBP
Discount: "SUMMER20 (20%)" = -200 GBP
Total due: 800 GBP
→ Stripe tracks 1 coupon redemption
```

**Balance Invoice (created by webhook after deposit paid):**
```
Line item: "Summer Camp 2026 - Balance (75%)" × 2 = 3000 GBP
Discount: "SUMMER20 (20%)" = -600 GBP
Total due: 2400 GBP
→ Stripe tracks another coupon redemption
```

Both Invoices show the discount natively. Both are tracked under the Coupon's redemption history.

### Trade-offs

| Pros | Cons |
|------|------|
| Full native coupon tracking on both payments | Restructures when PaymentElement mounts |
| `max_redemptions` enforced by Stripe | Brief loading state before card form appears |
| Discount appears on Stripe-generated receipts | More complex Invoice lifecycle to manage |
| Both deposit and balance Invoices show discount | Webhook changes from `payment_intent.succeeded` to `invoice.paid` |
| Keeps our custom UI | Draft → finalise → pay is more steps than PaymentIntent |
| Coupon appears in Stripe Dashboard reports | Need to handle Invoice failure/void edge cases |

### Verdict

**Recommended for long-term.** This is the correct architecture if coupon tracking and limit enforcement matter. The UX trade-off (brief loading before PaymentElement) is minor. The code changes are moderate — mainly restructuring the backend from PaymentIntent-first to Invoice-first.

---

## Option C: Hybrid — Native Discounts on Balance Invoice Only

Keep the current PaymentIntent flow for the deposit/full payment. Only apply native discounts on the balance Invoice (which is already a Stripe Invoice).

### How it works

Everything stays the same except the webhook's balance Invoice creation:

```ts
// Current: manual two-line-item approach
await stripe.invoiceItems.create({ amount: originalBalance, ... });
await stripe.invoiceItems.create({ amount: -balanceDiscount, ... });

// New: native discount
const invoice = await stripe.invoices.create({
  customer: customerId,
  discounts: [{ coupon: couponId }],  // native
  ...
});
await stripe.invoiceItems.create({ amount: originalBalance, ... });
```

### What changes

Only `app/api/webhooks/stripe/route.ts` changes. Everything else stays as-is.

### Limitations

- Deposit payment: coupon redemption is NOT tracked (still manual amount)
- `max_redemptions`: only incremented when balance Invoice is paid, not at deposit time
- If a coupon has `max_redemptions: 10`, it could be used for 10 deposits before the first balance Invoice is even paid — so redemptions are tracked late
- For fixed-amount coupons: Stripe applies the fixed amount to the Invoice total, but our balance is only 75% of the full price. A 50 GBP coupon would take 50 GBP off the balance instead of the proportional 37.50 GBP. We'd still need manual calculation for fixed-amount coupons.
- Percentage coupons work correctly with this approach

### Trade-offs

| Pros | Cons |
|------|------|
| Smallest code change (webhook only) | Deposit payment still not tracked |
| Balance Invoice gets native tracking | `max_redemptions` enforcement is delayed |
| No UX changes | Fixed-amount coupons need manual math |
| No flow restructuring | Half-native, half-manual — inconsistent |

### Verdict

**Quick fix only.** Solves the balance Invoice display but doesn't address the core tracking problem for deposit payments. Acceptable if you only use percentage coupons and don't rely heavily on `max_redemptions`.

---

## Recommendation

| Criteria | Option A (Checkout Sessions) | Option B (Invoice-based) | Option C (Hybrid) |
|----------|-----|-----|-----|
| Keeps custom UI | No | Yes | Yes |
| Full coupon tracking | Yes | Yes | Partial |
| `max_redemptions` enforced | Yes | Yes | Delayed |
| Code change size | Large | Moderate | Small |
| UX impact | Major (redirect) | Minor (loading state) | None |
| Fixed-amount coupons | Automatic | Automatic | Manual |
| Long-term maintainability | Good | Good | Poor |

**Option B (Invoice-based payment)** is the recommended path. It preserves the custom UI, gives full native coupon tracking on both deposit and balance payments, enforces limits correctly, and the only UX trade-off is a brief loading state before the card form appears.

If coupon limits are not critical right now and you want to ship quickly, **Option C** gets the balance Invoice looking correct with minimal changes, and Option B can be implemented later.
