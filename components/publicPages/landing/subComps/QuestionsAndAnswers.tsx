import { FAQs } from "@/types/sanityTypes";
import { commonSectionStyles } from "@/utils/constants/commonStyles";
import { landingPageDummyData } from "@/utils/dummyData/landingPage";
import { twMerge } from "tailwind-merge";
import FAQComp from "./subComps/FAQComp";

function QuestionsAndAnswers({
  className = "",
  apiFAQs,
}: {
  className?: string;
  apiFAQs?: FAQs;
}) {
  return (
    <section
      className={twMerge("py-20 bg-grey-muted", commonSectionStyles, className)}
    >
      <div className="container mx-auto flex flex-col gap-10 px-4">
        <h1 className="text-center">
          {apiFAQs?.title || `Frequently Asked Questions`}
        </h1>
        <div className="w-full max-w-[873px] mx-auto">
          <FAQComp
            faqs={apiFAQs?.questions || landingPageDummyData.faqs.questions}
          />
        </div>
      </div>
    </section>
  );
}

export default QuestionsAndAnswers;
