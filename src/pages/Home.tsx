import Footer from "@/components/Footer";
import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import Testimonials from "@/components/landing/Testimonials";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Home;
