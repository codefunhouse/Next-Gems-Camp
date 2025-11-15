import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import ContactCTA from "@/components/info/parents/ContactCTA";
import WhatsIncludedSection from "@/components/info/parents/WhatsIncluded";
import HeroSection from "@/components/landing/HeroSection";
import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ImageContentCard from "@/components/landing/subComps/ImageCard";
import SplitSection from "@/components/landing/subComps/SplitSection";
import WhatToExpectCard from "@/components/landing/subComps/WhatToExpectCard";
import { parentInfoData } from "@/lib/dummyData/infoData";

const Parents = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection
        title=" Next Gems Summer Camp — Parent Information Guide"
        subtitle=" A premium UK summer experience where language, culture, and adventure
          come together."
        bgImage="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=1600&h=600&fit=crop"
      />

      <SplitSection
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
        // background="gray"
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
        background="gray"
      />

      <WhatsIncludedSection />
      {/* FAQ Section */}
      <QuestionsAndAnswers />

      {/* Contact CTA */}
      <ContactCTA />
    </PublicPagesLayout>
  );
};

export default Parents;
