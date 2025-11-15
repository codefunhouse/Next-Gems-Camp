import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-blue-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center md:items-start md:grid md:grid-cols-3 gap-8 px-6 sm:px-16">
          <Logo />

          <div className="flex flex-col">
            <h4 className="font-semibold mb-4">
              {landingPageDummyData.footerData.quickLinks.title}
            </h4>
            <ul className="space-y-2 sm:pl-4 font-medium">
              {landingPageDummyData.footerData.quickLinks.links.map(
                (item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.link}
                      className="hover:text-secondary-foreground transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@nextgemscamp.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+44 20 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/20 mt-8 pt-8 text-center">
          <p className="font-semibold">
            {landingPageDummyData.footerData.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
