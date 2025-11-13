import { Button } from "@/components/ui/button";

const subjects = [
  "Medicine",
  "Law",
  "Business",
  "Engineering",
  "Literature",
  "History",
];

function ChooseSubjects() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Choose From Over 40 Subjects for Ages 9-24
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {subjects.map((subject, index) => (
            <Button key={index} variant="outline" size="lg">
              {subject}
            </Button>
          ))}
          <Button variant="default" size="lg">
            View All Subjects
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ChooseSubjects;
