import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export type LogoType = "pry" | "sec";
function Logo({
  className,
  type = "pry",
}: {
  className?: string;
  type?: LogoType;
}) {
  return (
    <Link to="/" className={twMerge("", className)}>
      <div
        className={twMerge(
          "w-full",
          type === "pry" ? "max-w-[94px]" : "max-w-[131px]"
        )}
      >
        {type === "pry" ? (
          <img
            src={"/images/logo_1.png"}
            width={94}
            height={44.68}
            alt="Next Gems Camp Logo"
            className="h-full w-full aspect-[94/44.68] object-contain"
          />
        ) : (
          <img
            src={"/images/logo_2.png"}
            width={131}
            height={61.96}
            alt="Next Gems Camp Logo"
            className="h-full w-full aspect-[131/61.96] object-contain"
          />
        )}
      </div>
    </Link>
  );
}

export default Logo;
