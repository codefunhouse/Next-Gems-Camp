import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { twMerge } from "tailwind-merge";
import FAQComp from "./subComps/FAQComp";

function QuestionsAndAnswers() {
  return (
    <section className={twMerge("py-20 bg-muted", commonSectionStyles)}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {landingPageDummyData.faqs.title}
        </h2>
        <div className="max-w-3xl mx-auto">
          <FAQComp faqs={landingPageDummyData.faqs.questions} />
        </div>
      </div>
    </section>
  );
}

export default QuestionsAndAnswers;
