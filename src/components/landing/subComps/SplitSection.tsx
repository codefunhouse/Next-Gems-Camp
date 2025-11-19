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
  const bgColor = background === "gray" ? "bg-grey-muted" : "bg-white";

  return (
    <section
      className={twMerge(`py-16 ${bgColor}`, commonSectionStyles, className)}
    >
      {(mainTitle || mainDesc) && (
        <div className="mb-8 max-w-3xl mx-auto text-center">
          {mainTitle && <h1 className="text-center mb-4">{mainTitle}</h1>}
          {mainDesc && (
            <p className="text-center text-base sm:text-lg mx-auto">
              {mainDesc}
            </p>
          )}
        </div>
      )}
      <div className="mx-auto px-4">
        <div
          className={twMerge(
            "flex flex-col sm:flex-row items-center gap-8 lg:gap-12 max-w-7xl mx-auto",
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
