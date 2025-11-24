"use client";

import Button from "@/components/general/Button";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { getSanityImageUrl } from "@/lib/sanityFns/getSanityImageUrl";
import { LandingPage } from "@/types/sanityTypes";
import ApplyForm from "../shared/contactForms/ApplyForm";
import HeroSection from "../shared/HeroSection";
import FeaturesSection from "./subComps/FeaturesSection";
import OurPathwayProgrammes from "./subComps/OurPathwayProgrammes";
import QuestionsAndAnswers from "./subComps/QuestionsAndAnswers";
import ReviewsSection from "./subComps/ReviewsSection";
import TeachingMethods from "./subComps/TeachingMethods";

const Home = ({ data }: { data: LandingPage }) => {
  const { openModal, closeModal } = useModal();

  return (
    <>
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
              data?.heroSection?.buttonText ||
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
    </>
  );
};

export default Home;
