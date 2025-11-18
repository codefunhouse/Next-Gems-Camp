import { CustomSVGProps } from "@/types/types1";
import { twMerge } from "tailwind-merge";

function LongArrowRight({ className }: CustomSVGProps) {
  return (
    <svg
      width={71}
      height={14}
      viewBox="0 0 71 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("", className)}
    >
      <path
        d="M69 7H1M63.5 13C63.5 13 69.5 8.581 69.5 7C69.5 5.419 63.5 1 63.5 1"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LongArrowRight;
