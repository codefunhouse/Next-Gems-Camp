import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import OurPathwayProgrammes from "@/components/landing/OurPathwayProgrammes";

import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ReviewsSection from "@/components/landing/ReviewsSection";
import TeachingMethods from "@/components/landing/TeachingMethods";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { useLandingPage } from "@/hooks/useSanityData";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { getSanityImageUrl } from "@/lib/sanity/getSanityImageUrl";
import ApplyForm from "./ApplyForm";

const Home = () => {
  const { openModal, closeModal } = useModal();
  const { data, loading, error } = useLandingPage();
  console.log("Landing Page Data: ", data);
  // const {
  //   heroSection,
  //   ourProgrammes,
  //   whyChooseUs,
  //   teachingApproaches,
  //   faqs,
  //   reviews,
  //   ctaSection,
  // } = data;

  return (
    <PublicPagesLayout>
      <HeroSection
        title={
          data?.heroSection?.title || landingPageDummyData.heroSection.title
        }
        subtitle={
          data?.heroSection?.subtitle ||
          landingPageDummyData.heroSection.subtitle
        }
        bgImage={
          getSanityImageUrl(data?.heroSection?.image) ||
          landingPageDummyData.heroSection.image
        }
        buttons={
          <Button
            label={
              data?.heroSection.buttonText ||
              landingPageDummyData.heroSection.buttonText
            }
            endIcon={<ShortArrowRight />}
            classNames="!w-full !max-w-[158px]"
            buttonType="sec"
            onClick={() =>
              openModal(<ApplyForm onClick={() => closeModal()} />)
            }
          />
        }
      />

      <OurPathwayProgrammes {...data?.ourProgrammes} />

      <FeaturesSection {...data?.whyChooseUs} />

      <TeachingMethods {...data?.teachingApproaches} />

      <QuestionsAndAnswers apiFAQs={data?.faqs} />

      <ReviewsSection {...data?.reviews} />
    </PublicPagesLayout>
  );
};

export default Home;
