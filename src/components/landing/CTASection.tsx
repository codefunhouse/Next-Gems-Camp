import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { twMerge } from "tailwind-merge";
import Button from "../general/Button";

function CTASection() {
  return (
    <section
      className={twMerge(
        "py-20 bg-blue-primary text-primary-foreground",
        commonSectionStyles
      )}
    >
      <div className="container mx-auto px-4 text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6">
          {landingPageDummyData.ctaSection.title}
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {landingPageDummyData.ctaSection.subtitle}
        </p>
        <Button
          label={landingPageDummyData.ctaSection.buttonText}
          classNames="max-w-[200px] w-full"
          link="/apply"
        />
      </div>
    </section>
  );
}

export default CTASection;
