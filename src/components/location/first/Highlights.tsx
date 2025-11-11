import { Card, CardContent } from "@/components/ui/card";
import { Bike, Book, Building2, Landmark } from "lucide-react";

const highlights = [
  {
    icon: Building2,
    title: "University Colleges",
    description:
      "Learn in authentic Cambridge college settings with beautiful architecture",
  },
  {
    icon: Book,
    title: "Academic Excellence",
    description:
      "Cambridge tutors bring cutting-edge research and teaching expertise",
  },
  {
    icon: Bike,
    title: "Cycling City",
    description:
      "Explore Cambridge by bike, the traditional student mode of transport",
  },
  {
    icon: Landmark,
    title: "Cultural Heritage",
    description:
      "Visit King's College Chapel, the Fitzwilliam Museum, and more",
  },
];

function Highlights() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Location Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <highlight.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
