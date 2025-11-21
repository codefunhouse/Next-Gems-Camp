"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CentralizerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article" | "footer" | "header";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Centralizer({
  children,
  className = "",
  as: Component = "div",
  size = "full",
  fullScreen = true,
}: CentralizerProps) {
  const baseClasses = "w-full px-4 sm:px-6 lg:px-8";
  const centeredClasses = "flex items-center justify-center"; // Vertical and horizontal centering
  const sizeClass = sizeClasses[size];
  const heightClass = fullScreen ? "min-h-screen" : "";

  return (
    <Component
      className={twMerge(
        baseClasses,
        centeredClasses,
        sizeClass,
        heightClass,
        "mx-auto",
        className
      )}
    >
      {children}
    </Component>
  );
}
