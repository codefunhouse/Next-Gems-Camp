"use client";

import { AgeRangeGroup } from "@/types/payment";

interface AgeRangeSelectorProps {
  ageRangeGroups: AgeRangeGroup[];
  selectedAgeRange: AgeRangeGroup | null;
  onSelect: (group: AgeRangeGroup) => void;
}

export default function AgeRangeSelector({
  ageRangeGroups,
  selectedAgeRange,
  onSelect,
}: AgeRangeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          Select Age Group
        </h3>
        <p className="text-sm text-gray-600">
          Choose the appropriate age range for your child
        </p>
      </div>

      <div className="grid gap-4">
        {ageRangeGroups.map((group) => {
          const isSelected = selectedAgeRange?.ageRange === group.ageRange;

          return (
            <button
              key={group.ageRange}
              type="button"
              onClick={() => onSelect(group)}
              className={`w-full text-left p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-[1.02] hover:shadow-md"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {group.ageRangeInfo}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <svg
                      className="w-4 h-4 mr-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {group.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {group.cycleCount} {group.cycleCount === 1 ? "cycle" : "cycles"} available
                  </p>
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

      {ageRangeGroups.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No age groups available at this time.</p>
        </div>
      )}
    </div>
  );
}
