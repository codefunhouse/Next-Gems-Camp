import { Award } from "lucide-react";

function AwardsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Award-Winning Excellence</h2>
        <p className="text-xl max-w-3xl mx-auto opacity-90 mb-8">
          Recognized internationally for our commitment to educational
          innovation and student success. Our programs have received numerous
          accolades from educational authorities and parent organizations.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8" />
            <span className="text-lg">Best Summer Program 2023</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8" />
            <span className="text-lg">Excellence in Education Award</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8" />
            <span className="text-lg">Parents' Choice Gold Winner</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AwardsSection;
