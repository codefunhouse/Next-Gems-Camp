import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { Award, BookOpen, Globe, Users } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

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
    icon,
    title,
    description,
    idx,
  }: {
    icon: ReactNode | string;
    title: string;
    description: string;
    idx: string | number;
  }) => {
    return (
      <Card className="hover:shadow-lg transition-shadow" key={idx}>
        <CardContent className="p-6 text-center flex flex-col gap-1">
          {typeof icon === "string" ? (
            <span className="text-4xl">{icon}</span>
          ) : (
            icon
          )}
          <h3 className="text-xl font-semibold mt-1">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  };
  return (
    <section className={twMerge("py-20 bg-muted", commonSectionStyles)}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {landingPageDummyData.whyChooseUs.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
