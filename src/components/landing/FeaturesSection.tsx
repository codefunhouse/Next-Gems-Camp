import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { Award, BookOpen, Globe, Users } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import StarTickIcon from "../svgs/StarTickIcon";

const features = [
  {
    icon: BookOpen,
    title: "40+ Subjects",
    description:
      "Choose from a wide range of academic subjects tailored to your interests",
  },
  {
    icon: Users,
    title: "Expert Tutors",
    description:
      "Learn from experienced academics from top universities worldwide",
  },
  {
    icon: Award,
    title: "Prestigious Locations",
    description:
      "Study at world-renowned university colleges and boarding schools",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with like-minded students from over 100 countries",
  },
];

function FeaturesSection() {
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
        className="transition-shadow bg-white border-[0.6px] border-[#E2E2E2] rounded-[2rem] hover:border-[1.5px] hover:border-[#15B1FB]"
        key={idx}
        style={{
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))",
        }}
      >
        <CardContent className="px-6 py-8 flex flex-col gap-2">
          <div className="flex items-center gap-[0.54rem]">
            <StarTickIcon className="mt-2.5" />
            <h5 className="">{title}</h5>
          </div>
          <p className="text-[#959595] text-lg">{description}</p>
        </CardContent>
      </Card>
    );
  };
  return (
    <section className={twMerge(" bg-grey-muted py-16", commonSectionStyles)}>
      <div className="container mx-auto px-4 space-y-11">
        <h1 className="text-center">
          {landingPageDummyData.whyChooseUs.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landingPageDummyData.whyChooseUs.features.map((feature, index) =>
            renderCard({
              icon: feature.icon,
              title: feature.title,
              description: feature.desc,
              idx: index,
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
