import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import OurPathwayProgrammes from "@/components/landing/OurPathwayProgrammes";

import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ReviewsSection from "@/components/landing/ReviewsSection";
import TeachingMethods from "@/components/landing/TeachingMethods";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";

const Home = () => {
  return (
    <PublicPagesLayout>
      <HeroSection
        title={landingPageDummyData.heroSection.title}
        subtitle={landingPageDummyData.heroSection.subtitle}
        bgImage={landingPageDummyData.heroSection.image}
        buttons={
          <Button
            label="Register Now"
            endIcon={<ShortArrowRight />}
            classNames="!w-full !max-w-[158px]"
            buttonType="sec"
          />
        }
      />

      <OurPathwayProgrammes />

      <FeaturesSection />

      <TeachingMethods />

      <QuestionsAndAnswers />

      <ReviewsSection />
    </PublicPagesLayout>
  );
};

export default Home;
