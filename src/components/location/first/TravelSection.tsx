import { Card, CardContent } from "@/components/ui/card";
import { Coffee, MapPin } from "lucide-react";

function TravelSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Getting to Cambridge
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">By Train</h3>
                  <p className="text-muted-foreground">
                    Direct trains from London King's Cross take 50 minutes.
                    Cambridge station has excellent connections across the UK.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <Coffee className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">From Airports</h3>
                  <p className="text-muted-foreground">
                    London Stansted (30 minutes), London Heathrow (2 hours),
                    London Luton (1 hour). Airport transfer service available
                    for all arrivals.
                  </p>
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> We provide comprehensive travel
                  guidance and optional meet-and-greet service at all major
                  airports.
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
