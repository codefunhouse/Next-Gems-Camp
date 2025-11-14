import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-secondary-foreground hover:text-blue-primary transition-colors"
    >
      <div className="rounded-md">
        <img
          src="/images/logo.png"
          alt="Next Gems Camp Logo"
          className="h-10 w-10 aspect-square object-contain sm:h-20 sm:w-20 rounded-md border-[0.1px] border-blue-sec/20"
        />
      </div>
      {/* <span className="text-xs sm:text-sm">Next Gems Camp</span> */}
    </Link>
  );
}

export default Logo;
