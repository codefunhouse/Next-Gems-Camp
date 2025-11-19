import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { twMerge } from "tailwind-merge";
import Button from "../general/Button";
import BgImage from "./subComps/BgImage";

function CTASection() {
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
      <div className="relative z-10 mx-auto px-4 text-center flex flex-col items-center w-full max-w-[450px] gap-3">
        <h1 className="">{landingPageDummyData.ctaSection.title}</h1>
        <p className="text-base sm:text-lg max-w-[304px]">
          {landingPageDummyData.ctaSection.subtitle}
        </p>
        <Button
          label={landingPageDummyData.ctaSection.buttonText}
          classNames="max-w-[200px] w-full mt-3"
          link="/apply"
          buttonType="sec"
        />
      </div>
    </section>
  );
}

export default CTASection;
