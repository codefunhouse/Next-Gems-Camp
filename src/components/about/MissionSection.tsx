import { Card, CardContent } from "@/components/ui/card";

function MissionSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Our Mission</h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-lg mb-4">
                At Elite Summer Academy, we believe in nurturing independent
                thought and academic excellence. Our mission is to provide
                transformative educational experiences that challenge, inspire,
                and prepare students for success in their future academic and
                professional endeavors.
              </p>
              <p className="text-lg mb-4">
                We create an environment where curiosity thrives, critical
                thinking is cultivated, and students from diverse backgrounds
                come together to learn from world-class educators and each
                other.
              </p>
              <p className="text-lg">
                Located at prestigious university colleges and renowned boarding
                schools, our programs offer more than just academic
                learning—they provide a glimpse into university life and foster
                lifelong friendships across cultures.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
