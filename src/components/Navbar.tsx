import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#894619] flex justify-center items-center w-full py-4 sm:py-4 px-2 ">
        <Link
          to="/apply"
          className="text-white no-underline relative inline-block pb-1 transition-all duration-500 hover:before:scale-x-100 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-500 before:scale-x-0 hover:before:w-full"
        >
          Apply Now to secure your place for 2026
        </Link>
      </div>
      <div className="container px-4 bg-secondary/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between py-3 sm:px-[4.8rem]">
          <Link
            to="/"
            className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            <div>
              <img
                src="/images/logo.png"
                alt="Next Gems Camp Logo"
                className="h-8 w-8"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-secondary-foreground hover:text-primary transition-colors"
            >
              HOME
            </Link>

            {/* Custom Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsLocationsOpen(true)}
            >
              <button className="flex items-center gap-1 text-secondary-foreground hover:text-primary transition-colors focus:outline-none">
                LOCATIONS
                <ChevronDown className="h-4 w-4" />
              </button>

              {isLocationsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white border border-border rounded-md shadow-lg min-w-[180px] py-2 z-50"
                  onMouseLeave={() => setIsLocationsOpen(false)}
                >
                  <Link
                    to="/locations/oxford"
                    className="block px-4 py-2 text-sm text-grey-500 hover:bg-accent hover:text-white transition-colors hover:underline"
                  >
                    Oxford
                  </Link>
                  <Link
                    to="/locations/cambridge"
                    className="block px-4 py-2 text-sm ytext-grey-500 hover:bg-accent hover:text-white transition-colors hover:underline"
                  >
                    Cambridge
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="text-secondary-foreground hover:text-primary transition-colors"
            >
              WHY US
            </Link>
            <Link
              to="/parents"
              className="text-secondary-foreground hover:text-primary transition-colors"
            >
              INFO FOR PARENTS
            </Link>
          </div>
          <Link to="/apply">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
