import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Globe, Users } from "lucide-react";

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
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
