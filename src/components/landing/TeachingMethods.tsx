import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { twMerge } from "tailwind-merge";

function TeachingMethods() {
  const renderCard = ({
    icon,
    title,
    description,
    idx,
  }: {
    icon: string | React.ReactNode;
    title: string;
    description: string;
    idx: string | number;
  }) => {
    return (
      <Card key={idx}>
        <CardContent className="p-6">
          {typeof icon === "string" ? (
            <div className="h-12 w-12 text-primary mb-4 text-2xl flex items-center justify-center">
              {icon}
            </div>
          ) : (
            <div className="h-12 w-12 text-primary mb-4 flex items-center justify-center">
              {icon}
            </div>
          )}
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  };
  return (
    <section
      className={twMerge(
        "py-20 border-t border-slate-200",
        commonSectionStyles
      )}
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-12 max-w-3xl flex flex-col gap-3">
          <h2 className="text-4xl font-bold">
            {landingPageDummyData.teachingApproaches.title}
          </h2>
          <p>{landingPageDummyData.teachingApproaches.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {landingPageDummyData.teachingApproaches.approaches.map(
            (approach, idx) =>
              renderCard({
                icon: approach.icon,
                title: approach.title,
                description: approach.description,
                idx,
              })
          )}
        </div>
      </div>
    </section>
  );
}

export default TeachingMethods;
