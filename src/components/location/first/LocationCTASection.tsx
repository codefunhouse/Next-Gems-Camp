import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function LocationCTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Join Us in Cambridge</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Experience the Cambridge tutorial system and immerse yourself in
          centuries of academic tradition
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/apply">
            <Button size="lg" variant="secondary">
              Apply Now
            </Button>
          </Link>
          <Link to="/locations/oxford">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Oxford Location
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LocationCTASection;
