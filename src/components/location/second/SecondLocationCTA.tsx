import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function SecondLocationCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Study at Oxford?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Secure your place for summer 2026 and experience academic excellence
          in the heart of Oxford
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/apply">
            <Button size="lg" variant="secondary">
              Register Now
            </Button>
          </Link>
          <Link to="/locations/cambridge">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-gray-700 hover:bg-white/10"
            >
              View Cambridge Location
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SecondLocationCTA;
