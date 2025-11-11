import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Heart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest academic standards with world-class tutors and rigorous curriculum design.",
  },
  {
    icon: Users,
    title: "Personalized Learning",
    description:
      "Small class sizes ensure individual attention and tailored educational experiences for each student.",
  },
  {
    icon: BookOpen,
    title: "Academic Rigor",
    description:
      "Our programs challenge students intellectually while fostering critical thinking and creativity.",
  },
  {
    icon: TrendingUp,
    title: "Future Success",
    description:
      "Alumni consistently gain admission to top universities worldwide and excel in their chosen fields.",
  },
  {
    icon: Heart,
    title: "Pastoral Care",
    description:
      "24/7 support and welfare ensure students feel safe, supported, and able to thrive.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Comprehensive safeguarding policies and experienced staff provide peace of mind for parents.",
  },
];

function ValuesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <value.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;
