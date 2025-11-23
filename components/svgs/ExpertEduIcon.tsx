import { CustomSVGProps } from "@/types/types1";
import { twMerge } from "tailwind-merge";

function ExpertEduIcon({
  className,
  stroke = "#161616",
  innerClassStyles,
}: CustomSVGProps) {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("", className)}
    >
      <path
        d="M17.5 5.83325H34.1667M17.5 9.16659H34.1667M17.5 12.4999H27.5M7.50004 22.4999V27.4999M37.5 17.4999H23.3334L19.1667 21.6666V17.4999H14.1667V0.833252H37.5V17.4999ZM10.8334 19.1666L7.50004 20.8333L4.16671 19.1666V14.9999L7.50004 13.3333L10.8334 14.9999V19.1666ZM14.1667 30.8333L11.6667 22.4999H3.33337L0.833374 30.8333H4.16671L5.00004 39.1666H10L10.8334 30.8333H14.1667Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={innerClassStyles}
      />
    </svg>
  );
}

export default ExpertEduIcon;
