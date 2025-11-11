import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of students from around the world
        </p>
        <Link to="/apply">
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Apply Now for 2026
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
