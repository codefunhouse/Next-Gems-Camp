import { Button } from "@/components/ui/button";

function ContactCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Our admissions team is here to help. Contact us for a personal
          consultation about your child's summer experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Schedule a Call
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Download Brochure
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
