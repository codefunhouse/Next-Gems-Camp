import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { twMerge } from "tailwind-merge";

interface SplitSectionProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  position?: "left-right" | "right-left";
  background?: "white" | "gray";
  className?: string;
  contentClassName?: string;
  mainTitle?: string;
  mainDesc?: string;
}

function SplitSection({
  leftContent,
  rightContent,
  position = "left-right",
  background = "white",
  className = "",
  contentClassName = "",
  mainTitle = "",
  mainDesc = "",
}: SplitSectionProps) {
  const bgColor = background === "gray" ? "bg-[#F1F5F9]" : "bg-white";

  return (
    <section
      className={twMerge(
        `py-16 md:py-20 ${bgColor}`,
        commonSectionStyles,
        className
      )}
    >
      <div className="mb-8 max-w-3xl mx-auto text-center">
        {mainTitle && (
          <h2 className="text-3xl font-bold text-center mb-4">{mainTitle}</h2>
        )}
        {mainDesc && (
          <p className="text-center max-w-3xl mx-auto">{mainDesc}</p>
        )}
      </div>
      <div className="container mx-auto px-4">
        <div
          className={twMerge(
            "flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-7xl mx-auto",
            contentClassName
          )}
        >
          {/* Left Content */}
          <div
            className={twMerge(
              "flex-1 w-full flex justify-center",
              position === "left-right" ? "lg:order-1" : "lg:order-2"
            )}
          >
            {leftContent}
          </div>

          {/* Right Content */}
          <div
            className={twMerge(
              "flex-1 w-full flex justify-center",
              position === "left-right" ? "lg:order-2" : "lg:order-1"
            )}
          >
            {rightContent}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitSection;
