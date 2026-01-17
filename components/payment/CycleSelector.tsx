"use client";

import { ProgramCycle } from "@/types/payment";

interface CycleSelectorProps {
  cycles: ProgramCycle[];
  selectedCycle: ProgramCycle | null;
  onSelect: (cycle: ProgramCycle) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

export default function CycleSelector({
  cycles,
  selectedCycle,
  onSelect,
}: CycleSelectorProps) {
  const eligibleCycles = cycles.filter((c) => c.isEligible);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          Select Your Preferred Cycle
        </h3>
        <p className="text-sm text-gray-600">
          Choose the dates that work best for you
        </p>
      </div>

      <div className="grid gap-4">
        {eligibleCycles.map((cycle) => {
          const isSelected = selectedCycle?.id === cycle.id;

          return (
            <button
              key={cycle.id}
              type="button"
              onClick={() => onSelect(cycle)}
              className={`w-full text-left p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-[1.02] hover:shadow-md"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{cycle.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-base text-gray-900">
                    {formatPrice(cycle.pricing.full.amount)}
                  </p>
                  <p className="text-xs text-gray-500">Full price</p>
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center text-blue-700 text-sm">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Selected
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {eligibleCycles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No cycles available at this time.</p>
        </div>
      )}
    </div>
  );
}
