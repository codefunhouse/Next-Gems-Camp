import { Card, CardContent } from "@/components/ui/card";

const courses = [
  { name: "Computer Science", ages: "16-18", weeks: "2 weeks" },
  { name: "Natural Sciences", ages: "16-18", weeks: "2 weeks" },
  { name: "Philosophy", ages: "15-18", weeks: "2 weeks" },
  { name: "Psychology", ages: "16-18", weeks: "2 weeks" },
  { name: "Mathematics", ages: "14-18", weeks: "2 weeks" },
  { name: "History", ages: "13-18", weeks: "2 weeks" },
];

function Courses() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Available Courses in Cambridge
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{course.name}</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Ages: {course.ages}</p>
                  <p>Duration: {course.weeks}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
