import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { TeachingApproaches } from "@/types/sanityTypes";
import { twMerge } from "tailwind-merge";

function TeachingMethods({
  title,
  description,
  approaches,
}: TeachingApproaches) {
  const renderCard = ({
    icon,
    title,
    description,
    idx,
    iconPosition = "left",
  }: {
    icon: string | React.ReactNode;
    title: string;
    description: string;
    idx: string | number;
    iconPosition?: "left" | "right";
  }) => {
    return (
      <div
        className={twMerge(
          "flex items-center gap-6 group",
          iconPosition === "left" ? "flex-row" : "flex-row-reverse"
        )}
        key={idx}
      >
        {typeof icon === "string" ? (
          <div className="h-12 w-12 text-primary mb-4 text-2xl flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <div className="h-12 w-12 text-primary mb-4 flex items-center justify-center">
            {icon}
          </div>
        )}
        <Card className="flex items-center gap-6 rounded-[2rem] border-[#E2E2E2] transition-all hover:border-[1.5px] hover:border-blue-primary hover:bg-[#15B1FB0F]">
          <CardContent className="py-11 px-8">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </div>
    );
  };
  return (
    <section
      className={twMerge(
        "py-20 border-t border-slate-200",
        commonSectionStyles
      )}
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-12">
        <div className="text-center flex flex-col gap-1.5 max-w-3xl">
          <h1 className="">
            {title || landingPageDummyData.teachingApproaches.title}
          </h1>
          <p className="text-base sm:text-lg">
            {description || landingPageDummyData.teachingApproaches.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {(
            approaches || landingPageDummyData.teachingApproaches.approaches
          ).map((approach, idx) =>
            renderCard({
              icon:
                idx > 4
                  ? landingPageDummyData.teachingApproaches.approachesIcons[0]
                  : landingPageDummyData.teachingApproaches.approachesIcons[
                      idx
                    ],
              title: approach.title,
              description: approach.description,
              idx,
              iconPosition: idx % 2 !== 0 ? "right" : "left",
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default TeachingMethods;
