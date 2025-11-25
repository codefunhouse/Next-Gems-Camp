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
        <div className="flex flex-col gap-2 rounded-4xl border transition-all border-[#E2E2E2] group-hover:border-[1.5px] group-hover:border-blue-primary group-hover:bg-[#15B1FB0F] py-11 px-8 h-full">
          <h5 className="text-xl font-semibold">{title}</h5>
          <p className="text-muted-foreground text-base sm:text-lg">
            {description}
          </p>
        </div>
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
        <div className="text-center flex flex-col gap-1.5 max-w-3xl items-center">
          <h1 className="">
            {title || landingPageDummyData.teachingApproaches.title}
          </h1>
          <p className="text-base sm:text-lg max-w-[609px]">
            {description || landingPageDummyData.teachingApproaches.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-">
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
              title: approach?.title as string,
              description: approach?.description as string,
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
