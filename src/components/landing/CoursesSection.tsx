import { Card, CardContent } from "@/components/ui/card";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";

function CoursesSection() {
  const renderCard = ({
    imageUrl,
    title,
    description,
    imageAlt = "Program image",
    idx,
  }: {
    imageUrl: string;
    title: string;
    description: string;
    imageAlt?: string;
    idx: string | number;
  }) => {
    return (
      <Card className="hover:shadow-lg transition-shadow" key={idx}>
        <CardContent className="p-6">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          {/* <Link to="/location-oxford">
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </Link> */}
        </CardContent>
      </Card>
    );
  };
  return (
    <section className="py-20 bg-background border-b border-b-slate-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {landingPageDummyData.ourProgrammes.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {landingPageDummyData.ourProgrammes.programmes.map((card, idx) =>
            renderCard({
              idx,
              title: card.title,
              description: card.description,
              imageUrl: card.imgUrl,
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
