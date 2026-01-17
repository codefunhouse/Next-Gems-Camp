"use client";

import { PaymentOption, ProgramCycle } from "@/types/payment";

interface PaymentOptionSelectorProps {
  cycle: ProgramCycle;
  selectedOption: PaymentOption | null;
  onSelect: (option: PaymentOption) => void;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PaymentOptionSelector({
  cycle,
  selectedOption,
  onSelect,
}: PaymentOptionSelectorProps) {
  const { pricing, balanceDueDate } = cycle;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          Choose Payment Option
        </h3>
        <p className="text-sm text-gray-600">
          Select how you would like to pay for your booking
        </p>
      </div>

      <div className="grid gap-4">
        {/* Full Payment Option */}
        <button
          type="button"
          onClick={() => onSelect("full")}
          className={`w-full text-left p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedOption === "full"
              ? "border-green-600 bg-green-50 ring-2 ring-green-200"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-[1.01] hover:shadow-sm"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-900">Pay in Full</h4>
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Complete your booking with a single payment
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-gray-900">
                {formatPrice(pricing.full.amount)}
              </p>
              <p className="text-xs text-gray-500">One-time payment</p>
            </div>
          </div>

          {selectedOption === "full" && (
            <div className="mt-3 pt-3 border-t border-green-200">
              <div className="flex items-center text-green-700 text-sm">
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
                Selected - Pay once and you&apos;re done!
              </div>
            </div>
          )}
        </button>

        {/* Deposit Option */}
        <button
          type="button"
          onClick={() => onSelect("deposit")}
          className={`w-full text-left p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedOption === "deposit"
              ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-[1.01] hover:shadow-sm"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">Pay 25% Deposit</h4>
              <p className="text-sm text-gray-600 mt-1">
                Secure your spot now, pay the rest later
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-blue-600">
                {formatPrice(pricing.deposit.amount)}
              </p>
              <p className="text-xs text-gray-500">Today</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Remaining balance</span>
              <span className="font-medium text-gray-900">
                {formatPrice(pricing.deposit.balanceAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">Due by</span>
              <span className="font-medium text-orange-600">
                {formatDate(balanceDueDate)}
              </span>
            </div>
          </div>

          {selectedOption === "deposit" && (
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
                Selected - Invoice for balance will be emailed
              </div>
            </div>
          )}
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-amber-800">
            <strong>Deposit Note:</strong> If you choose the deposit option, an
            invoice for the remaining {formatPrice(pricing.deposit.balanceAmount)}{" "}
            will be sent to your email and must be paid by{" "}
            {formatDate(balanceDueDate)}.
          </p>
        </div>
      </div>
    </div>
  );
}
