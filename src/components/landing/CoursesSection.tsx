import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function CoursesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Summer Programmes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
                alt="Oxford Summer School"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Oxford Summer School
              </h3>
              <p className="text-muted-foreground mb-4">
                29 subjects, ages 13-24. Experience the summer of a lifetime at
                historic Oxford colleges.
              </p>
              <Link to="/location-oxford">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop"
                alt="Cambridge Summer School"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Cambridge Summer School
              </h3>
              <p className="text-muted-foreground mb-4">
                23 subjects, ages 13-24. Study at prestigious Cambridge colleges
                with expert tutors.
              </p>
              <Link to="/location-cambridge">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop"
                alt="Scholars Programme"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Scholars Programme</h3>
              <p className="text-muted-foreground mb-4">
                8 subjects, ages 12-14. Designed for young scholars ready for
                academic challenge.
              </p>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop"
                alt="Junior Summer School"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Junior Summer School
              </h3>
              <p className="text-muted-foreground mb-4">
                8 subjects, ages 9-12. Introduction to academic excellence in a
                supportive environment.
              </p>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
