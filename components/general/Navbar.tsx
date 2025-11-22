import { useModal } from "@/hooks/useModal";
import useScrollEffect from "@/hooks/useScrollEffect";
import ApplyForm from "@/pages/ApplyForm";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ShortArrowDown from "../svgs/ShortArrowDown";
import Button from "./Button";
import Logo from "./Logo";

const Navbar = () => {
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locationsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const { openModal, closeModal } = useModal();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLocationsOpen(false);
    setIsInfoOpen(false);
  };

  const toggleLocationsDropdown = () => {
    setIsLocationsOpen(!isLocationsOpen);
  };

  const toggleInfoDropdown = () => {
    setIsInfoOpen(!isInfoOpen);
  };
  const hasScrolled = useScrollEffect(100);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationsRef.current &&
        !locationsRef.current.contains(event.target as Node)
      ) {
        setIsLocationsOpen(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setIsInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={twMerge(
          "bg-gradient-to-r from-[#15B1FB]/50 to-[#FFA70F]/25 flex justify-center items-center w-full py-3 sm:pt-[0.95rem] sm:pb-3 px-2 text-center font-medium",
          hasScrolled
            ? "from-[#44bdf5] to-[#f3ca8c]"
            : "from-[#15B1FB] to-[#FFA70F]/25 "
        )}
      >
        <button
          onClick={() => openModal(<ApplyForm onClick={() => closeModal()} />)}
          className="no-underline relative inline-block pb-1 transition-all duration-500 hover:before:scale-x-100 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-grey-base before:transition-all before:duration-500 before:scale-x-0 hover:before:w-full cursor-pointer"
        >
          Register Now to secure your place for 2026!
        </button>
      </div>

      {/* Main navbar */}
      <div
        className={twMerge(
          "font-medium text-white transition-all duration-300",
          hasScrolled ? "bg-blue-sec" : "bg-transparent"
        )}
      >
        <div
          className={twMerge(
            "flex items-center justify-between py-[1.4rem] px-5 sm:px-8 md:px-[4.8rem]"
          )}
        >
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-14">
            <Link to="/" className=" hover:text-blue-primary transition-colors">
              Home
            </Link>

            {/* Custom Locations Dropdown */}
            <div ref={locationsRef} className="relative">
              <button
                className="flex items-center gap-1  hover:text-blue-primary transition-colors focus:outline-none"
                onClick={toggleLocationsDropdown}
              >
                Locations
                <ShortArrowDown
                  className={`transition-transform duration-200 mt-0.5 ${
                    isLocationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Dropdown */}
              <div
                className={`
                absolute top-full left-0 mt-2 bg-white border border-border rounded-md shadow-lg min-w-[140px] py-2 z-50
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
                    to="/locations/canterbury"
                    className="block px-2 py-2 text-sm text-foreground hover:bg-blue-primary/5  transition-colors rounded-md"
                    onClick={() => setIsLocationsOpen(false)}
                  >
                    Canterbury
                  </Link>
                  <Link
                    to="/locations/norfolk"
                    className="block px-2 py-2 text-sm text-foreground hover:bg-blue-primary/5  transition-colors rounded-md"
                    onClick={() => setIsLocationsOpen(false)}
                  >
                    Norfolk
                  </Link>
                </div>
              </div>
            </div>
            {/* Info Dropdown */}
            <div ref={infoRef} className="relative">
              <button
                className="flex items-center gap-1  hover:text-blue-primary transition-colors focus:outline-none"
                onClick={toggleInfoDropdown}
              >
                Info
                <ShortArrowDown
                  className={`transition-transform duration-200 mt-0.5 ${
                    isInfoOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Dropdown */}
              <div
                className={`
                absolute top-full left-0 mt-2 bg-white border border-border rounded-md shadow-lg min-w-[140px] py-2 z-50
                transition-all duration-300 ease-in-out overflow-hidden
                ${
                  isInfoOpen
                    ? "max-h-32 opacity-100 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
                    : "max-h-0 opacity-0 animate-out fade-out-0 zoom-out-95 slide-out-to-top-2"
                }
              `}
              >
                <div className="px-2">
                  <Link
                    to="/info/parents"
                    className="block px-2 py-2 text-sm text-foreground hover:bg-blue-primary/5 transition-colors rounded-md"
                    onClick={() => setIsInfoOpen(false)}
                  >
                    Parents
                  </Link>
                  <Link
                    to="/info/agents"
                    className="block px-2 py-2 text-sm text-foreground hover:bg-blue-primary/5 transition-colors rounded-md"
                    onClick={() => setIsInfoOpen(false)}
                  >
                    Agents
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Register Now Button - Hidden on mobile */}
          <Button
            label="Register Now"
            classNames="!max-w-[120px] hidden md:inline-block"
            onClick={() =>
              openModal(<ApplyForm onClick={() => closeModal()} />)
            }
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2  hover:text-blue-primary transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 animate-in fade-in-0 zoom-in-95 " />
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
                className="text-gray-800 hover:text-blue-sec transition-colors py-2 border-b border-gray-100 font-medium"
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              {/* Mobile Locations Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  className="flex items-center justify-between w-full text-gray-800 hover:text-blue-sec transition-colors py-2 focus:outline-none font-medium"
                  onClick={(e) => {
                    e.stopPropagation();

                    setIsMobileLocationsOpen(!isMobileLocationsOpen);
                  }}
                >
                  <span>Locations</span>
                  <ShortArrowDown
                    className={`transition-transform duration-200 ${
                      isMobileLocationsOpen ? "rotate-180" : ""
                    }`}
                    fill="#161616"
                  />
                </button>

                <div
                  className={`
                  transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    isMobileLocationsOpen
                      ? "max-h-32 opacity-100 animate-in fade-in-0 slide-in-from-top-2"
                      : "max-h-0 opacity-0 animate-out fade-out-0 slide-out-to-top-2"
                  }
                `}
                >
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      to="/locations/canterbury"
                      className="block py-2 text-sm text-gray-600 hover:text-blue-primary transition-colors font-normal"
                      onClick={closeMobileMenu}
                    >
                      Canterbury
                    </Link>
                    <Link
                      to="/locations/norfolk"
                      className="block py-2 text-sm text-gray-600 hover:text-blue-primary transition-colors font-normal"
                      onClick={closeMobileMenu}
                    >
                      Norfolk
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Info Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  className="flex items-center justify-between w-full text-gray-800 hover:text-blue-sec transition-colors py-2 focus:outline-none font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileInfoOpen(!isMobileInfoOpen);
                  }}
                >
                  <span>Info</span>
                  <ShortArrowDown
                    className={`transition-transform duration-200 ${
                      isMobileInfoOpen ? "rotate-180" : ""
                    }`}
                    fill="#161616"
                  />
                </button>

                <div
                  className={`
                  transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    isMobileInfoOpen
                      ? "max-h-32 opacity-100 animate-in fade-in-0 slide-in-from-top-2"
                      : "max-h-0 opacity-0 animate-out fade-out-0 slide-out-to-top-2"
                  }
                `}
                >
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      to="/info/parents"
                      className="block py-2 text-sm text-gray-600 hover:text-blue-primary hover:bg-blue-primary transition-colors font-normal"
                      onClick={closeMobileMenu}
                    >
                      Parents
                    </Link>
                    <Link
                      to="/info/agents"
                      className="block py-2 text-sm text-gray-600 hover:text-blue-primary hover:bg-blue-primary transition-colors font-normal"
                      onClick={closeMobileMenu}
                    >
                      Agents
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Register Now Button */}
              <Button
                label="Register Now"
                classNames="max-w-[300px] mx-auto"
                onClick={() => {
                  closeMobileMenu();
                  openModal(<ApplyForm onClick={() => closeModal()} />);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
