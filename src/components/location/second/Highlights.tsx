import { Card, CardContent } from "@/components/ui/card";
import { Book, Building2, Coffee, Users } from "lucide-react";

const highlights = [
  {
    icon: Building2,
    title: "Historic College",
    description:
      "Study in authentic Oxford college buildings with centuries of academic heritage",
  },
  {
    icon: Book,
    title: "World-Class Libraries",
    description:
      "Access to the Bodleian Library and college libraries for research",
  },
  {
    icon: Users,
    title: "Student Life",
    description:
      "Experience genuine Oxford student life with formal dinners and traditions",
  },
  {
    icon: Coffee,
    title: "City Center",
    description: "Walking distance to museums, cafes, and historic landmarks",
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
