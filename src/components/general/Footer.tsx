import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-blue-sec text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center md:items-stretch md:grid md:grid-cols-4 gap-8 px-4 sm:px-10">
          <Logo />

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/locations/oxford"
                  className="hover:text-primary transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  to="/parents"
                  className="hover:text-primary transition-colors"
                >
                  Parents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sciences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Humanities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Arts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@nextgemscamp.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+44 20 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-white">
          <p>&copy; 2025 Next Gems Camps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
