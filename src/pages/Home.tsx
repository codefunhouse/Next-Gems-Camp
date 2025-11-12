import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import CoursesSection from "@/components/landing/CoursesSection";
import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import Testimonials from "@/components/landing/Testimonials";

const Home = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />
      <CoursesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </PublicPagesLayout>
  );
};

export default Home;
