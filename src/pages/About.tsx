import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, BookOpen, TrendingUp, Heart, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest academic standards with world-class tutors and rigorous curriculum design."
    },
    {
      icon: Users,
      title: "Personalized Learning",
      description: "Small class sizes ensure individual attention and tailored educational experiences for each student."
    },
    {
      icon: BookOpen,
      title: "Academic Rigor",
      description: "Our programs challenge students intellectually while fostering critical thinking and creativity."
    },
    {
      icon: TrendingUp,
      title: "Future Success",
      description: "Alumni consistently gain admission to top universities worldwide and excel in their chosen fields."
    },
    {
      icon: Heart,
      title: "Pastoral Care",
      description: "24/7 support and welfare ensure students feel safe, supported, and able to thrive."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Comprehensive safeguarding policies and experienced staff provide peace of mind for parents."
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "40+", label: "Academic Subjects" },
    { number: "100+", label: "Countries Represented" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-hero-start to-hero-end text-white">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=600&fit=crop')"
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Why Choose Elite Summer Academy</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Discover what makes our summer programs the premier choice for ambitious students worldwide
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Our Mission</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg mb-4">
                  At Elite Summer Academy, we believe in nurturing independent thought and academic excellence. 
                  Our mission is to provide transformative educational experiences that challenge, inspire, 
                  and prepare students for success in their future academic and professional endeavors.
                </p>
                <p className="text-lg mb-4">
                  We create an environment where curiosity thrives, critical thinking is cultivated, and 
                  students from diverse backgrounds come together to learn from world-class educators and 
                  each other.
                </p>
                <p className="text-lg">
                  Located at prestigious university colleges and renowned boarding schools, our programs 
                  offer more than just academic learning—they provide a glimpse into university life and 
                  foster lifelong friendships across cultures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Award-Winning Excellence</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90 mb-8">
            Recognized internationally for our commitment to educational innovation and student success. 
            Our programs have received numerous accolades from educational authorities and parent organizations.
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

      <Footer />
    </div>
  );
};

export default About;
