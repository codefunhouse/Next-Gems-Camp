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
import { parentInfoData } from "@/lib/dummyData/infoData";

const Parents = () => {
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
          />
        }
        infoDetails={parentInfoData.heroSection.infoDetails}
      />

      <SplitSection
        mainDesc="Next Gems Summer Camp combines 30 hours of accredited English tuition with global cultural immersion and exciting specialist programs in Technology, Business, Sport, Arts, and Leadership. Our safe, small-group environment ensures every child learns, grows, and enjoys a truly international experience."
        leftContent={
          <WhatToExpectCard
            title={parentInfoData.learningAndEnrichment.leftData.title}
            description={
              parentInfoData.learningAndEnrichment.leftData.upperDesc
            }
            list={parentInfoData.learningAndEnrichment.leftData.lists}
            lowerDescription={
              parentInfoData.learningAndEnrichment.leftData.lowerDesc
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={parentInfoData.learningAndEnrichment.rightData.imageUrl}
            alt={parentInfoData.learningAndEnrichment.rightData.alt}
          />
        }
        background="gray"
      />

      <TravelAndTransfer />

      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={parentInfoData.accommodationAndWelfare.leftData.title}
            description={
              parentInfoData.accommodationAndWelfare.leftData.upperDesc
            }
            list={parentInfoData.accommodationAndWelfare.leftData.lists}
            lowerDescription={
              parentInfoData.accommodationAndWelfare.leftData.lowerDesc
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={parentInfoData.accommodationAndWelfare.rightData.imageUrl}
            alt={parentInfoData.accommodationAndWelfare.rightData.alt}
          />
        }
        background="gray"
      />

      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={parentInfoData.safeguardingAndChildProtection.leftData.title}
            description={
              parentInfoData.safeguardingAndChildProtection.leftData.upperDesc
            }
            list={parentInfoData.safeguardingAndChildProtection.leftData.lists}
            lowerDescription={
              parentInfoData.safeguardingAndChildProtection.leftData.lowerDesc
            }
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
        // background="gray"
      />

      <WhatsIncludedSection />
      {/* FAQ Section */}
      <QuestionsAndAnswers className="bg-[#F7F7F7]" />
    </PublicPagesLayout>
  );
};

export default Parents;
