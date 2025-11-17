import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={twMerge(
        "flex items-center gap-2 text-secondary-foreground hover:text-blue-primary transition-colors",
        className
      )}
    >
      <div className="rounded-md">
        <img
          src="/images/logo.png"
          alt="Next Gems Camp Logo"
          className="h-12 w-12 aspect-square object-contain sm:h-16 sm:w-16 rounded-md border-[0.1px] border-blue-sec/20"
        />
      </div>
      {/* <span className="text-xs sm:text-sm">Next Gems Camp</span> */}
    </Link>
  );
}

export default Logo;
