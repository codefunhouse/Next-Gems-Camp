"use client";

import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string | React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  classNames?: string;
  link?: string;
  leftIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disableHover?: boolean;
  buttonType?: "pry" | "sec" | "tert" | "outline" | "google" | "onlyIcon";

  isOnlyIcon?: boolean;
  isGray?: boolean;
  loadingStyle?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  isLoading = false,
  isDisabled = false,
  onClick,
  classNames,
  link,
  leftIcon,
  endIcon,
  type = "button",
  disableHover,
  buttonType = "pry",
  loadingStyle,
}) => {
  const renderSpinner = () => {
    return (
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    );
  };
  const content = isLoading ? renderSpinner() : label;

  const shouldDisable = isLoading || isDisabled;

  const hoverStyles = disableHover
    ? ""
    : `transition ease-in-out duration-300 hover:opacity-60 `;

  const baseStyles = [
    `flex justify-center items-center !text-sm gap-1.5 cursor-pointer shrink-0! px-2 sm:px-2 py-3 font-medium rounded-full w-full`,
    link ? "text-center" : "",
    isDisabled ? "opacity-50" : "",
    hoverStyles,
  ];

  const buttonTypeStyles: Record<string, string> = {
    pry: "bg-blue-primary text-white",
    sec: "text-grey-base bg-white",
    tert: "bg-[#F4C1421A] text-base-text border border-[#F4C142]",
    outline: "bg-white/10 text-white border border-white",
    google:
      "bg-transparent border border-[#E9EAEC] text-base-text px-4 rounded-full gap-3",
    onlyIcon: "!w-fit !h-fit !p-0 sm:!p-0 border border-transparent",
  };

  const mergedClassNames = twMerge(
    [...baseStyles, buttonTypeStyles[buttonType] ?? "", classNames].join(" ")
  );

  const finalClassNames = twMerge(
    mergedClassNames,
    isLoading && buttonType === "onlyIcon" ? loadingStyle : ""
  );

  const buttonContent = (
    <>
      {/* {buttonType === "google" && <Google />} */}
      {leftIcon && !isLoading && <span>{leftIcon}</span>}
      {content}
      {endIcon && !isLoading && <span>{endIcon}</span>}
    </>
  );

  if (link) {
    return (
      <Link to={link} className={finalClassNames} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={finalClassNames}
      onClick={onClick}
      disabled={shouldDisable}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
