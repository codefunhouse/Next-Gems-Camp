import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import AboutTutors from "@/components/landing/AboutTutors";
import Awards from "@/components/landing/Awards";
import BrowseCourses from "@/components/landing/BrowseCourses";
import ChooseSubjects from "@/components/landing/ChooseSubjects";
import CoursesSection from "@/components/landing/CoursesSection";
import CTASection from "@/components/landing/CTASection";
import DiscoverCourses from "@/components/landing/DiscoverCourses";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ResourcesAndEvents from "@/components/landing/ResourcesAndEvents";
import ReviewsSection from "@/components/landing/ReviewsSection";
import TakeQuizSection from "@/components/landing/TakeQuizSection";
import TeachingMethods from "@/components/landing/TeachingMethods";
import WhyOurCourses from "@/components/landing/WhyOurCourses";

const Home = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />

      <CoursesSection />

      <TakeQuizSection />

      {/* Features Section */}
      <FeaturesSection />
      <WhyOurCourses />
      <TeachingMethods />
      <ResourcesAndEvents />
      <DiscoverCourses />
      <BrowseCourses />
      <QuestionsAndAnswers />
      <ChooseSubjects />
      <AboutTutors />
      <Awards />

      {/* Testimonials Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <CTASection />
    </PublicPagesLayout>
  );
};

export default Home;
