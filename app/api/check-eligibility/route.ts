import { stripe } from "@/lib/stripe";
import { EligibilityResponse, ProgramCycle } from "@/types/payment";
import { NextResponse } from "next/server";

const ELIGIBILITY_WEEKS = 8; // Minimum weeks before program start for deposit eligibility

function calculateBalanceDueDate(programStart: string): string {
  const startDate = new Date(programStart);
  startDate.setDate(startDate.getDate() - ELIGIBILITY_WEEKS * 7);
  return startDate.toISOString().split("T")[0];
}

function isEligibleForDeposit(programStart: string): boolean {
  const startDate = new Date(programStart);
  const today = new Date();
  const diffTime = startDate.getTime() - today.getTime();
  const diffWeeks = diffTime / (1000 * 60 * 60 * 24 * 7);
  return diffWeeks >= ELIGIBILITY_WEEKS;
}

export async function GET(): Promise<NextResponse<EligibilityResponse | { error: string }>> {
  try {
    // Search for products with metadata.type = 'summer_camp_cycle'
    const products = await stripe.products.search({
      query: "metadata['type']:'summer_camp_cycle'",
      expand: ["data.default_price"],
    });

    if (products.data.length === 0) {
      return NextResponse.json({ cycles: [] });
    }

    // For each product, fetch its prices
    const cyclesPromises = products.data.map(async (product) => {
      // Get all prices for this product
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });

      // Find full and deposit prices by metadata
      const fullPrice = prices.data.find((p) => p.metadata?.type === "full");
      const depositPrice = prices.data.find((p) => p.metadata?.type === "deposit");

      if (!fullPrice || !depositPrice) {
        console.warn(`Product ${product.id} missing full or deposit price`);
        return null;
      }

      const programStart = product.metadata?.program_start;
      const programEnd = product.metadata?.program_end;

      if (!programStart || !programEnd) {
        console.warn(`Product ${product.id} missing program dates in metadata`);
        return null;
      }

      const ageRange = product.metadata?.age_range || "";
      const ageRangeInfo = product.metadata?.age_range_info || "";
      const location = product.metadata?.location || "";

      const fullAmount = fullPrice.unit_amount || 0;
      const depositAmount = depositPrice.unit_amount || 0;
      const balanceAmount = fullAmount - depositAmount;

      const cycle: ProgramCycle = {
        id: product.id,
        name: product.name,
        startDate: programStart,
        endDate: programEnd,
        isEligible: isEligibleForDeposit(programStart),
        balanceDueDate: calculateBalanceDueDate(programStart),
        ageRange,
        ageRangeInfo,
        location,
        pricing: {
          full: {
            priceId: fullPrice.id,
            amount: fullAmount,
          },
          deposit: {
            priceId: depositPrice.id,
            amount: depositAmount,
            balanceAmount,
          },
        },
      };

      return cycle;
    });

    const cyclesResults = await Promise.all(cyclesPromises);
    const cycles = cyclesResults.filter((c): c is ProgramCycle => c !== null);

    // Sort cycles by start date
    cycles.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return NextResponse.json({ cycles });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to check eligibility: ${errorMessage}` },
      { status: 500 }
    );
  }
}
