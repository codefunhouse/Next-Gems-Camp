import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const [age, setAge] = useState("15");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");

  const testimonials = [
    {
      name: "Oscar",
      country: "Germany",
      text: "The tutorials were the best, with individual feedback and valuable suggestions. This personalized approach was helpful.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      name: "Alexis",
      country: "United Kingdom",
      text: "The course was adapted to our interests and taught by an expert. Discussions with eager students were well-facilitated.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Valerie",
      country: "Canada",
      text: "My course was in-depth and engaging. The smaller class size helped me participate more and get one-on-one time with my tutor.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "40+ Subjects",
      description: "Choose from a wide range of academic subjects tailored to your interests"
    },
    {
      icon: Users,
      title: "Expert Tutors",
      description: "Learn from experienced academics from top universities worldwide"
    },
    {
      icon: Award,
      title: "Prestigious Locations",
      description: "Study at world-renowned university colleges and boarding schools"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with like-minded students from over 100 countries"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 min-h-[600px] flex items-center justify-center bg-gradient-to-br from-hero-start to-hero-end text-white">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop')"
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Elite Summer Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Nurturing independent thought through award-winning exceptional education. Choose from over 40 subjects for ages 9-24.
          </p>
          
          {/* Course Finder */}
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Find Your Course</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={age} onValueChange={setAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-12">9-12 years</SelectItem>
                    <SelectItem value="13-15">13-15 years</SelectItem>
                    <SelectItem value="15">15-18 years</SelectItem>
                    <SelectItem value="18-24">18-24 years</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="law">Law</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oxford">Oxford</SelectItem>
                    <SelectItem value="cambridge">Cambridge</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="bg-primary hover:bg-primary/90">Search</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Student Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students from around the world</p>
          <Link to="/apply">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Apply Now for 2026
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
