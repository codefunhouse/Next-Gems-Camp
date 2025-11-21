import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { Link } from "react-router-dom";
import CallIcon from "../svgs/CallIcon";
import CaretRightIcon from "../svgs/CaretRightIcon";
import EmailIcon from "../svgs/EmailIcon";
import LocationIcon from "../svgs/LocationIcon";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 pt-[3.3rem] pb-[1.9rem]">
        <div className="flex flex-col md:flex-row justify-between gap-8 px-6 sm:px-16">
          <Logo className="self-center md:self-auto" type="sec" />

          <div className="w-full pl-10 mx-auto md:mx-0 md:pl-0 max-w-[800px] flex flex-col sm:flex-row  gap-8 justify-between">
            <div className="flex flex-col gap-4">
              <h5 className="!font-medium">
                {landingPageDummyData.footerData.quickLinks.title}
              </h5>
              <ul className="space-y-2 sm:pl-2">
                {landingPageDummyData.footerData.quickLinks.links.map(
                  (item, idx) => (
                    <li key={idx}>
                      <Link
                        to={item.link}
                        className="hover:text-blue-primary transition-colors flex items-center gap-1.5"
                      >
                        <CaretRightIcon />
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-medium">
                {landingPageDummyData.footerData.contact.title}
              </h5>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <EmailIcon />
                  <span>
                    {landingPageDummyData.footerData.contact.contacts.email}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CallIcon />
                  <span>
                    {landingPageDummyData.footerData.contact.contacts.phone}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <LocationIcon />
                  <span>
                    {landingPageDummyData.footerData.contact.contacts.location}
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-medium">
                {landingPageDummyData.footerData.socials.title}
              </h5>
              <div className="flex items-center gap-4">
                {landingPageDummyData.footerData.socials.socials.map(
                  (item, idx) => (
                    <Link key={idx} to={item.link}>
                      {item.icon}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1616161A] mt-14 pt-[2.15rem] text-center">
          <p className="text-sm text-[#16161680]">
            {landingPageDummyData.footerData.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
