import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building2, Bike, Coffee, Book, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LocationCambridge = () => {
  const highlights = [
    {
      icon: Building2,
      title: "University Colleges",
      description: "Learn in authentic Cambridge college settings with beautiful architecture"
    },
    {
      icon: Book,
      title: "Academic Excellence",
      description: "Cambridge tutors bring cutting-edge research and teaching expertise"
    },
    {
      icon: Bike,
      title: "Cycling City",
      description: "Explore Cambridge by bike, the traditional student mode of transport"
    },
    {
      icon: Landmark,
      title: "Cultural Heritage",
      description: "Visit King's College Chapel, the Fitzwilliam Museum, and more"
    }
  ];

  const courses = [
    { name: "Computer Science", ages: "16-18", weeks: "2 weeks" },
    { name: "Natural Sciences", ages: "16-18", weeks: "2 weeks" },
    { name: "Philosophy", ages: "15-18", weeks: "2 weeks" },
    { name: "Psychology", ages: "16-18", weeks: "2 weeks" },
    { name: "Mathematics", ages: "14-18", weeks: "2 weeks" },
    { name: "History", ages: "13-18", weeks: "2 weeks" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-hero-start to-hero-end text-white">
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1600&h=600&fit=crop')"
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <MapPin className="h-6 w-6" />
            <span className="text-lg">Cambridge, England</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">Cambridge Summer Programs</h1>
          <p className="text-xl max-w-3xl mx-auto text-center opacity-90">
            Experience academic excellence at the University of Cambridge, a beacon of learning since 1209
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">The Cambridge Experience</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg mb-4">
                  Cambridge University has produced more Nobel Prize winners than any other institution in 
                  the world. Our summer programs offer students the extraordinary opportunity to study at 
                  this iconic university, immersing themselves in its rich academic traditions.
                </p>
                <p className="text-lg mb-4">
                  Students live in historic college buildings, many dating back centuries, and participate 
                  in the time-honored Cambridge traditions. Small group tutorials—Cambridge's signature 
                  teaching method—encourage critical thinking and in-depth discussion with expert tutors.
                </p>
                <p className="text-lg">
                  The compact city center means everything is within easy reach. Students can punt along 
                  the River Cam, explore world-class museums, attend evensong at King's College Chapel, 
                  and cycle through the picturesque streets just like generations of Cambridge students 
                  before them.
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
          <h2 className="text-4xl font-bold text-center mb-12">Available Courses in Cambridge</h2>
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

      {/* Activities Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Activities & Excursions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Cultural Activities</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Punting on the River Cam</li>
                  <li>• Visit to King's College Chapel</li>
                  <li>• Fitzwilliam Museum tour</li>
                  <li>• Mathematical Bridge exploration</li>
                  <li>• Trinity College Library visit</li>
                  <li>• Cambridge market shopping</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Day Trips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• London sightseeing and museums</li>
                  <li>• Ely Cathedral visit</li>
                  <li>• Imperial War Museum Duxford</li>
                  <li>• Wimpole Estate country house</li>
                  <li>• Grafham Water outdoor activities</li>
                  <li>• Historic Bury St Edmunds</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Getting to Cambridge</h2>
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">By Train</h3>
                    <p className="text-muted-foreground">
                      Direct trains from London King's Cross take 50 minutes. Cambridge station has 
                      excellent connections across the UK.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <Coffee className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">From Airports</h3>
                    <p className="text-muted-foreground">
                      London Stansted (30 minutes), London Heathrow (2 hours), London Luton (1 hour). 
                      Airport transfer service available for all arrivals.
                    </p>
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> We provide comprehensive travel guidance and optional meet-and-greet 
                    service at all major airports.
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
          <h2 className="text-4xl font-bold mb-6">Join Us in Cambridge</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the Cambridge tutorial system and immerse yourself in centuries of academic tradition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
            </Link>
            <Link to="/locations/oxford">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Oxford Location
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationCambridge;
