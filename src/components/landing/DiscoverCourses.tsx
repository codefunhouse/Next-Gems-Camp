import {
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Shield,
  Users,
} from "lucide-react";

function DiscoverCourses() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Discover the Summer Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Learn From Inspiring Teachers
            </h3>
            <p className="text-muted-foreground">
              Explore your passions and be guided by expert tutors who bring
              subjects to life.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Make Global Friends</h3>
            <p className="text-muted-foreground">
              Join students from over 120 countries and build lifelong
              connections.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Experience Exceptional Teaching
            </h3>
            <p className="text-muted-foreground">
              Over 10,000 teaching hours delivered across all courses annually.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Discover the Best of the UK
            </h3>
            <p className="text-muted-foreground">
              Visit iconic landmarks and immerse yourself in British culture.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Feel Supported</h3>
            <p className="text-muted-foreground">
              24/7 care from our friendly team to help you succeed.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Study in Iconic Locations
            </h3>
            <p className="text-muted-foreground">
              Learn in historic venues that have inspired generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscoverCourses;
