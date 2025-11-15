import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { twMerge } from "tailwind-merge";
import FAQComp from "./subComps/FAQComp";

function QuestionsAndAnswers({ className = "" }: { className?: string }) {
  return (
    <section
      className={twMerge("py-20 bg-muted", commonSectionStyles, className)}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12">{`Frequently Asked Questions`}</h2>
        <div className="max-w-3xl mx-auto">
          <FAQComp faqs={landingPageDummyData.faqs.questions} />
        </div>
      </div>
    </section>
  );
}

export default QuestionsAndAnswers;
