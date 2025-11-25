import StarTickIcon from "@/components/svgs/StarTickIcon";
import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { WhyChooseUs } from "@/types/sanityTypes";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function FeaturesSection({ title, features }: WhyChooseUs) {
  const renderCard = ({
    title,
    description,
    idx,
  }: {
    icon?: ReactNode | string;
    title: string;
    description: string;
    idx: string | number;
  }) => {
    return (
      <Card
        className="transition-shadow bg-white border-[0.6px] border-[#E2E2E2] rounded-4xl hover:border-[1.5px] hover:border-blue-primary px-8! py-11!"
        key={idx}
        style={{
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))",
        }}
      >
        <CardContent className="flex flex-col gap-2! p-0!">
          <div className="flex items-center gap-[0.54rem]">
            <StarTickIcon className="mt-2.5" />
            <h5 className="">{title}</h5>
          </div>
          <p className="text-[#959595] text-base sm:text-lg">{description}</p>
        </CardContent>
      </Card>
    );
  };
  return (
    <section className={twMerge(" bg-grey-muted py-16", commonSectionStyles)}>
      <div className="container mx-auto space-y-11">
        <h1 className="text-center">
          {title || landingPageDummyData.whyChooseUs.title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(features || landingPageDummyData.whyChooseUs.features).map(
            (feature, index) =>
              renderCard({
                title: feature.title as string,
                description: feature.desc as string,
                idx: index,
              })
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
