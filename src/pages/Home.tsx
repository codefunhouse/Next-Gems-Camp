import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";
import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import Testimonials from "@/components/landing/Testimonials";

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
