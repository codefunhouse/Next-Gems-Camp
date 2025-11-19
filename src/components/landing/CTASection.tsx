import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { agentsInfoData, parentInfoData } from "@/lib/dummyData/infoData";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "../general/Button";
import BgImage from "./subComps/BgImage";

function CTASection() {
  const location = useLocation();
  const isParentRoute = location.pathname === "/info/parents";
  const isAgentRoute = location.pathname === "/info/agents";
  return (
    <section
      className={twMerge(
        "py-20 bg-blue-primary text-white relative",
        commonSectionStyles
      )}
    >
      <BgImage
        src="/images/cta_bg_img.jpg"
        alt="vivid blurred colourful wallpaper"
        overlayStyles="bg-transparent"
        className="bg-blue-primary opacity-40"
      />
      <div className="relative z-10 mx-auto px-4 text-center flex flex-col items-center w-full max-w-[790px] gap-3">
        <h1 className="">
          {isParentRoute
            ? parentInfoData.cta.title
            : isAgentRoute
            ? agentsInfoData.cta.title
            : landingPageDummyData.ctaSection.title}
        </h1>
        <p className="text-base sm:text-lg max-w-[598px]">
          {isParentRoute
            ? parentInfoData.cta.description
            : isAgentRoute
            ? agentsInfoData.cta.description
            : landingPageDummyData.ctaSection.subtitle}
        </p>
        <Button
          label={
            isParentRoute
              ? parentInfoData.cta.buttonText
              : isAgentRoute
              ? agentsInfoData.cta.buttonText
              : landingPageDummyData.ctaSection.buttonText
          }
          classNames="max-w-[200px] w-full mt-3"
          link="/apply"
          buttonType="sec"
        />
      </div>
    </section>
  );
}

export default CTASection;
