import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Globe, GraduationCap, Users } from "lucide-react";

function TeachingMethods() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          World-Leading Teaching Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Small Class Sizes</h3>
              <p className="text-muted-foreground">
                Average class size of 8 students ensures personalized attention
                from expert tutors.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Tutors</h3>
              <p className="text-muted-foreground">
                Learn from academics at world's top universities with passion
                for their subjects.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                University-Style Teaching
              </h3>
              <p className="text-muted-foreground">
                Teaching inspired by Oxford and Cambridge methodologies for
                rapid development.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
              <p className="text-muted-foreground">
                Study with students from over 120 countries and gain
                international insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default TeachingMethods;
