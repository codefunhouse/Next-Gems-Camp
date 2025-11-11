import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Train } from "lucide-react";

function TravelSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Getting to Oxford
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <Train className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">By Train</h3>
                  <p className="text-muted-foreground">
                    Direct trains from London Paddington take approximately 1
                    hour. Oxford station is a short taxi ride from the college.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">From Airports</h3>
                  <p className="text-muted-foreground">
                    London Heathrow (1 hour), London Gatwick (2 hours),
                    Birmingham Airport (1.5 hours). We offer optional airport
                    transfer service for all major UK airports.
                  </p>
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Detailed arrival instructions and
                  airport transfer options will be provided upon enrollment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default TravelSection;
