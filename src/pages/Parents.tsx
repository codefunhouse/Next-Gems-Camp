import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import TravelAndTransfer from "@/components/info/parents/TravelAndTransfer";
import WhatsIncludedSection from "@/components/info/parents/WhatsIncluded";
import HeroSection from "@/components/landing/HeroSection";
import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ImageContentCard from "@/components/landing/subComps/ImageCard";
import SplitSection from "@/components/landing/subComps/SplitSection";
import WhatToExpectCard from "@/components/landing/subComps/WhatToExpectCard";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { useParentPage } from "@/hooks/useSanityData";
import { parentInfoData } from "@/lib/dummyData/infoData";
import ApplyForm from "./ApplyForm";

const Parents = () => {
  const { openModal, closeModal } = useModal();
  const { data } = useParentPage();

  console.log("Parent: ", data);

  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection
        title={parentInfoData.heroSection.title}
        subtitle={parentInfoData.heroSection.subtitle}
        bgImage={parentInfoData.heroSection.bgImage}
        buttons={
          <Button
            label={parentInfoData.heroSection.buttonText}
            endIcon={<ShortArrowRight />}
            classNames="!w-full !max-w-[194px]"
            buttonType="sec"
            onClick={() =>
              openModal(<ApplyForm onClick={() => closeModal()} />)
            }
          />
        }
        infoDetails={parentInfoData.heroSection.infoDetails}
      />

      {/* Learning and Enrichment */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={parentInfoData.learningAndEnrichment.leftData.title}
            list={parentInfoData.learningAndEnrichment.leftData.lists}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={parentInfoData.learningAndEnrichment.rightData.imageUrl}
            alt={parentInfoData.learningAndEnrichment.rightData.alt}
          />
        }
      />

      <TravelAndTransfer />

      {/* Accomodation and welfare */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={parentInfoData.accommodationAndWelfare.leftData.title}
            list={parentInfoData.accommodationAndWelfare.leftData.lists}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={parentInfoData.accommodationAndWelfare.rightData.imageUrl}
            alt={parentInfoData.accommodationAndWelfare.rightData.alt}
          />
        }
      />

      {/* safeguarding */}

      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={parentInfoData.safeguardingAndChildProtection.leftData.title}
            list={parentInfoData.safeguardingAndChildProtection.leftData.list}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              parentInfoData.safeguardingAndChildProtection.rightData.imageUrl
            }
            alt={parentInfoData.safeguardingAndChildProtection.rightData.alt}
          />
        }
        background="gray"
        position="right-left"
      />

      <WhatsIncludedSection />
      {/* FAQ Section */}
      <QuestionsAndAnswers className="bg-[#F7F7F7]" />
    </PublicPagesLayout>
  );
};

export default Parents;
