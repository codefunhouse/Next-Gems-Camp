import { CustomSVGProps } from "@/types/types1";
import { twMerge } from "tailwind-merge";

function StarTickIcon({ className }: CustomSVGProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("shrink-0 mt-0.5", className)}
    >
      <path
        d="M7.27051 0.233643L6.27051 3.23364H2.27051L3.27051 7.23364L0.270508 9.23364L3.27051 11.2336L2.27051 15.2336H6.27051L7.27051 18.2336L10.2705 16.2336L13.2705 18.2336L14.2705 15.2336H18.2705L17.2705 11.2336L20.2705 9.23364L17.2705 7.23364L18.2705 3.23364H14.2705L13.2705 0.233643L10.2705 2.23364L7.27051 0.233643ZM14.2705 5.23364L15.2705 6.23364L8.27051 13.2336L5.27051 10.2336L6.27051 9.23364L8.27051 11.2336L14.2705 5.23364Z"
        fill="#15B1FB"
        stroke="#15B1FB"
        strokeWidth="0.3"
      />
    </svg>
  );
}

export default StarTickIcon;
