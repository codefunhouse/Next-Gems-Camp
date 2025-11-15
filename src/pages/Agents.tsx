import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import ContactCTA from "@/components/info/agents/ContactCTA";
import HeroSection from "@/components/landing/HeroSection";
import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ImageContentCard from "@/components/landing/subComps/ImageCard";
import SplitSection from "@/components/landing/subComps/SplitSection";
import WhatToExpectCard from "@/components/landing/subComps/WhatToExpectCard";
import { agentsInfoData } from "@/lib/dummyData/infoData";

function Agents() {
  return (
    <PublicPagesLayout>
      <HeroSection
        title="Partner with Next Gems Summer Camp
"
        subtitle="A premium UK summer experience designed for young global learners.
"
        bgImage="https://elements-resized.envatousercontent.com/envato-dam-assets-production/a974488f-31d0-46ba-aff9-57b2c0e50849/9fad783c-02a6-472a-84f8-975a1decf499.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=61d352c43e9bba47d2990ce91ff6f11494b3d330fe7d9fb1e8d91746f7934926"
      />

      <SplitSection
        mainDesc="Next Gems Summer Camp offers an exclusive opportunity for international education agents to represent a high-quality, accredited summer program that combines English language learning, cultural immersion, and specialist pathways in a safe, luxury environment."
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.whyPartnerWithUs.leftData.title}
            description={agentsInfoData.whyPartnerWithUs.leftData.upperDesc}
            list={agentsInfoData.whyPartnerWithUs.leftData.lists}
            lowerDescription={
              agentsInfoData.whyPartnerWithUs.leftData.lowerDesc
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.whyPartnerWithUs.rightData.imageUrl}
            alt={agentsInfoData.whyPartnerWithUs.rightData.alt}
          />
        }
        background="gray"
      />
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.programOverview.leftData.title}
            description={agentsInfoData.programOverview.leftData.upperDesc}
            list={agentsInfoData.programOverview.leftData.lists}
            lowerDescription={agentsInfoData.programOverview.leftData.lowerDesc}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.programOverview.rightData.imageUrl}
            alt={agentsInfoData.programOverview.rightData.alt}
          />
        }
        position="right-left"
      />
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.travelAndTransfers.leftData.title}
            description={agentsInfoData.travelAndTransfers.leftData.upperDesc}
            list={agentsInfoData.travelAndTransfers.leftData.lists}
            lowerDescription={
              agentsInfoData.travelAndTransfers.leftData.lowerDesc
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.travelAndTransfers.rightData.imageUrl}
            alt={agentsInfoData.travelAndTransfers.rightData.alt}
          />
        }
        background="gray"
      />
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.safeguardingAndCompliance.leftData.title}
            description={
              agentsInfoData.safeguardingAndCompliance.leftData.upperDesc
            }
            list={agentsInfoData.safeguardingAndCompliance.leftData.lists}
            lowerDescription={
              agentsInfoData.safeguardingAndCompliance.leftData.lowerDesc
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              agentsInfoData.safeguardingAndCompliance.rightData.imageUrl
            }
            alt={agentsInfoData.safeguardingAndCompliance.rightData.alt}
          />
        }
        position="right-left"
      />
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.agentSupport.leftData.title}
            description={agentsInfoData.agentSupport.leftData.upperDesc}
            list={agentsInfoData.agentSupport.leftData.lists}
            lowerDescription={agentsInfoData.agentSupport.leftData.lowerDesc}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.agentSupport.rightData.imageUrl}
            alt={agentsInfoData.agentSupport.rightData.alt}
          />
        }
        background="gray"
      />
      {/* FAQ Section */}
      <QuestionsAndAnswers className="bg-white" />

      {/* Contact CTA */}
      <ContactCTA className="!bg-grey-primary" />
    </PublicPagesLayout>
  );
}

export default Agents;
