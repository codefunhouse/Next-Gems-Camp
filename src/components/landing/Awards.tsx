import { Award } from "lucide-react";

function Awards() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Award-Winning Excellence
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="font-semibold">Best Summer School 2024</p>
          </div>
          <div className="text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="font-semibold">Excellence in Education</p>
          </div>
          <div className="text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="font-semibold">Top Rated Programme</p>
          </div>
          <div className="text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="font-semibold">Student Choice Award</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
