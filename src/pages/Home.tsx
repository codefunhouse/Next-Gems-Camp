import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import CoursesSection from "@/components/landing/CoursesSection";
import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ReviewsSection from "@/components/landing/ReviewsSection";
import TeachingMethods from "@/components/landing/TeachingMethods";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";

const Home = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection
        title={landingPageDummyData.heroSection.title}
        subtitle={landingPageDummyData.heroSection.subtitle}
        bgImage={landingPageDummyData.heroSection.image}
      />

      <CoursesSection />

      {/* Features Section */}
      <FeaturesSection />

      <TeachingMethods />

      <QuestionsAndAnswers />

      {/* Testimonials Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <CTASection />
    </PublicPagesLayout>
  );
};

export default Home;
