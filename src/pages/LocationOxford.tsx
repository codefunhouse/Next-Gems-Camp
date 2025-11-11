import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building2, Train, Coffee, Book, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LocationOxford = () => {
  const highlights = [
    {
      icon: Building2,
      title: "Historic College",
      description: "Study in authentic Oxford college buildings with centuries of academic heritage"
    },
    {
      icon: Book,
      title: "World-Class Libraries",
      description: "Access to the Bodleian Library and college libraries for research"
    },
    {
      icon: Users,
      title: "Student Life",
      description: "Experience genuine Oxford student life with formal dinners and traditions"
    },
    {
      icon: Coffee,
      title: "City Center",
      description: "Walking distance to museums, cafes, and historic landmarks"
    }
  ];

  const courses = [
    { name: "Medicine", ages: "16-18", weeks: "2 weeks" },
    { name: "Law", ages: "16-18", weeks: "2 weeks" },
    { name: "Business & Economics", ages: "15-18", weeks: "2-4 weeks" },
    { name: "Engineering", ages: "16-18", weeks: "2 weeks" },
    { name: "English Literature", ages: "13-18", weeks: "2 weeks" },
    { name: "Mathematics", ages: "13-18", weeks: "2 weeks" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-hero-start to-hero-end text-white">
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop')"
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <MapPin className="h-6 w-6" />
            <span className="text-lg">Oxford, England</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">Oxford Summer Programs</h1>
          <p className="text-xl max-w-3xl mx-auto text-center opacity-90">
            Study at the prestigious University of Oxford, one of the world's most renowned academic institutions
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">The Oxford Experience</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg mb-4">
                  Oxford has been a center of academic excellence for over 900 years. Our summer programs 
                  allow students to experience life at one of the world's most prestigious universities, 
                  studying in historic college buildings and learning from Oxford tutors.
                </p>
                <p className="text-lg mb-4">
                  Students stay in authentic Oxford college accommodation, dine in historic dining halls, 
                  and enjoy the unique traditions of Oxford student life. The city itself is a living 
                  classroom, with world-class museums, libraries, and architectural wonders at every turn.
                </p>
                <p className="text-lg">
                  Beyond academics, students explore Oxford's rich cultural heritage, from punting on the 
                  river to visiting the famous Bodleian Library and Ashmolean Museum. Weekend excursions 
                  to London, Stratford-upon-Avon, and other historic sites complete the experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Location Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <highlight.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Available Courses in Oxford</h2>
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

      {/* Travel Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Getting to Oxford</h2>
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Train className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">By Train</h3>
                    <p className="text-muted-foreground">
                      Direct trains from London Paddington take approximately 1 hour. Oxford station is 
                      a short taxi ride from the college.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">From Airports</h3>
                    <p className="text-muted-foreground">
                      London Heathrow (1 hour), London Gatwick (2 hours), Birmingham Airport (1.5 hours). 
                      We offer optional airport transfer service for all major UK airports.
                    </p>
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> Detailed arrival instructions and airport transfer options 
                    will be provided upon enrollment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Study at Oxford?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Secure your place for summer 2026 and experience academic excellence in the heart of Oxford
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
            </Link>
            <Link to="/locations/cambridge">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Cambridge Location
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationOxford;
