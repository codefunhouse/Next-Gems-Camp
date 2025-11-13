import { Button } from "@/components/ui/button";

function TakeQuizSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Unsure About Which Course to Study?
        </h2>
        <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Take our quiz to get personalized summer course recommendations based
          on your interests and passions.
        </p>
        <Button size="lg" className="text-lg px-8">
          Start Quiz
        </Button>
      </div>
    </section>
  );
}

export default TakeQuizSection;
