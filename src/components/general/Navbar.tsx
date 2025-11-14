import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";

const Navbar = () => {
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locationsRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLocationsOpen(false);
  };

  const toggleLocationsDropdown = () => {
    setIsLocationsOpen(!isLocationsOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationsRef.current &&
        !locationsRef.current.contains(event.target as Node)
      ) {
        setIsLocationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-blue-primary flex justify-center items-center w-full py-4 sm:py-4 px-2">
        <Link
          to="/apply"
          className="text-white no-underline relative inline-block pb-1 transition-all duration-500 hover:before:scale-x-100 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-500 before:scale-x-0 hover:before:w-full"
        >
          Apply Now to secure your place for 2026
        </Link>
      </div>
      <div className="container px-4 bg-secondary/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between py-3 sm:px-[4.8rem]">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white hover:text-primary transition-colors"
            >
              HOME
            </Link>

            {/* Custom Locations Dropdown */}
            <div ref={locationsRef} className="relative">
              <button
                className="flex items-center gap-1 text-white hover:text-primary transition-colors focus:outline-none"
                onClick={toggleLocationsDropdown}
                onMouseEnter={() => setIsLocationsOpen(true)}
              >
                LOCATIONS
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isLocationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Dropdown */}
              <div
                className={`
                absolute top-full left-0 mt-2 bg-white border border-border rounded-md shadow-lg min-w-[180px] py-2 z-50
                transition-all duration-300 ease-in-out overflow-hidden
                ${
                  isLocationsOpen
                    ? "max-h-32 opacity-100 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
                    : "max-h-0 opacity-0 animate-out fade-out-0 zoom-out-95 slide-out-to-top-2"
                }
              `}
              >
                <div className="px-2">
                  <Link
                    to="/locations/oxford"
                    className="block px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
                    onClick={() => setIsLocationsOpen(false)}
                  >
                    Oxford
                  </Link>
                  <Link
                    to="/locations/cambridge"
                    className="block px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
                    onClick={() => setIsLocationsOpen(false)}
                  >
                    Cambridge
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="text-white hover:text-primary transition-colors"
            >
              WHY US
            </Link>
            <Link
              to="/parents"
              className="text-white hover:text-primary transition-colors"
            >
              INFO FOR PARENTS
            </Link>
          </div>

          {/* Apply Now Button - Hidden on mobile */}
          <Button label="Apply Now" classNames="!max-w-[120px]" link="/apply" />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 animate-in fade-in-0 zoom-in-95 text-white" />
            ) : (
              <Menu className="h-6 w-6 animate-in fade-in-0 zoom-in-95" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
          md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-40
          transition-all duration-300 ease-in-out overflow-hidden
          ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 animate-in slide-in-from-top-0 fade-in-0"
              : "max-h-0 opacity-0 animate-out slide-out-to-top-0 fade-out-0"
          }
        `}
        >
          <div className="container px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-primary transition-colors py-2 border-b border-gray-100 font-medium"
                onClick={closeMobileMenu}
              >
                HOME
              </Link>

              {/* Mobile Locations Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  className="flex items-center justify-between w-full text-gray-800 hover:text-primary transition-colors py-2 focus:outline-none font-medium"
                  onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                >
                  <span>LOCATIONS</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isLocationsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`
                  transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    isLocationsOpen
                      ? "max-h-32 opacity-100 animate-in fade-in-0 slide-in-from-top-2"
                      : "max-h-0 opacity-0 animate-out fade-out-0 slide-out-to-top-2"
                  }
                `}
                >
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      to="/locations/oxford"
                      className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors font-normal"
                      onClick={closeMobileMenu}
                    >
                      Oxford
                    </Link>
                    <Link
                      to="/locations/cambridge"
                      className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors font-normal"
                      onClick={closeMobileMenu}
                    >
                      Cambridge
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to="/about"
                className="text-gray-800 hover:text-primary transition-colors py-2 border-b border-gray-100 font-medium"
                onClick={closeMobileMenu}
              >
                WHY US
              </Link>
              <Link
                to="/parents"
                className="text-gray-800 hover:text-primary transition-colors py-2 border-b border-gray-100 font-medium"
                onClick={closeMobileMenu}
              >
                INFO FOR PARENTS
              </Link>

              {/* Mobile Apply Now Button */}
              <Button
                label="Apply Now"
                classNames="max-w-[120px]"
                onClick={closeMobileMenu}
                link="/apply"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
