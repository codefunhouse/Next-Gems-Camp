import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { twMerge } from "tailwind-merge";
import Button from "../general/Button";

function CTASection() {
  return (
    <section
      className={twMerge(
        "py-20 bg-blue-primary text-white",
        commonSectionStyles
      )}
    >
      <div className="container mx-auto px-4 text-center flex flex-col items-center w-full max-w-[450px] gap-3">
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
