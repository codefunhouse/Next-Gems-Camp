import { Card, CardContent } from "@/components/ui/card";
import Button from "../general/Button";

function BrowseCourses() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Browse Popular Summer Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              age: "9-10 years",
              title: "Creative Writing Explorers",
              price: "£6995",
              img: "photo-1456513080510-7bf3a84b82f8",
            },
            {
              age: "12-14 years",
              title: "History Scholars",
              price: "£6995",
              img: "photo-1461360370896-922624d12aa1",
            },
            {
              age: "13-15 years",
              title: "English Literature",
              price: "£6995",
              img: "photo-1456513080510-7bf3a84b82f8",
            },
            {
              age: "18-24 years",
              title: "Economics",
              price: "£6995",
              img: "photo-1454165804606-c3d57bc86b40",
            },
          ].map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <img
                  src={`https://images.unsplash.com/${course.img}?w=300&h=200&fit=crop`}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {course.age}
                  </p>
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-lg font-bold text-primary mb-4">
                    FROM {course.price}
                  </p>
                  {/* <Button variant="outline" className="w-full">
                    Find Out More
                  </Button> */}
                  <Button label="Find Out More" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrowseCourses;
