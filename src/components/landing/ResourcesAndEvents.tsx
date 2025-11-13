import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

function ResourcesAndEvents() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Resources and Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop"
                alt="Brochures"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Our Brochures</h3>
              <p className="text-muted-foreground mb-4">
                View our 2026 brochures for ages 9-24. Explore subjects,
                teaching styles, and daily schedules.
              </p>
              <Button variant="outline" className="w-full">
                View Brochures
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop"
                alt="Why Choose Us"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
              <p className="text-muted-foreground mb-4">
                Discover what sets us apart - from small classes to top-tier
                tutors and included excursions.
              </p>
              <Link to="/about">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop"
                alt="FAQs"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">FAQs</h3>
              <p className="text-muted-foreground mb-4">
                Got questions? Find answers about applications, content,
                accommodation, and daily life.
              </p>
              <Button variant="outline" className="w-full">
                View FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ResourcesAndEvents;
