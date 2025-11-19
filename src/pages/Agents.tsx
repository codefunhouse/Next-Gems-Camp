import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import HeroSection from "@/components/landing/HeroSection";
import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import ImageContentCard from "@/components/landing/subComps/ImageCard";
import SplitSection from "@/components/landing/subComps/SplitSection";
import WhatToExpectCard from "@/components/landing/subComps/WhatToExpectCard";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { agentsInfoData } from "@/lib/dummyData/infoData";

function Agents() {
  return (
    <PublicPagesLayout>
      <HeroSection
        title={agentsInfoData.heroSection.title}
        subtitle={agentsInfoData.heroSection.subtitle}
        bgImage={agentsInfoData.heroSection.bgImage}
        buttons={
          <Button
            label={agentsInfoData.heroSection.buttonText}
            endIcon={<ShortArrowRight />}
            classNames="!w-full !max-w-[194px]"
            buttonType="sec"
          />
        }
        infoDetails={agentsInfoData.heroSection.infoDetails}
      />

      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.whyPartnerWithUs.leftData.title}
            list={agentsInfoData.whyPartnerWithUs.leftData.lists}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.whyPartnerWithUs.rightData.imageUrl}
            alt={agentsInfoData.whyPartnerWithUs.rightData.alt}
          />
        }
      />
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.programOverview.leftData.title}
            list={agentsInfoData.programOverview.leftData.lists}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.programOverview.rightData.imageUrl}
            alt={agentsInfoData.programOverview.rightData.alt}
          />
        }
        position="right-left"
        background="gray"
      />
      {/* Travel and Transfer */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.travelAndTransfers.leftData.title}
            list={agentsInfoData.travelAndTransfers.leftData.lists}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.travelAndTransfers.rightData.imageUrl}
            alt={agentsInfoData.travelAndTransfers.rightData.alt}
          />
        }
      />

      {/* Safeguard and compliance */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.safeguardingAndCompliance.leftData.title}
            list={agentsInfoData.safeguardingAndCompliance.leftData.list}
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
        background="gray"
      />
      {/* Agent support */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={agentsInfoData.agentSupport.leftData.title}
            list={agentsInfoData.agentSupport.leftData.list}
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={agentsInfoData.agentSupport.rightData.imageUrl}
            alt={agentsInfoData.agentSupport.rightData.alt}
          />
        }
      />
      {/* FAQ Section */}
      <QuestionsAndAnswers className="bg-grey-muted" />
    </PublicPagesLayout>
  );
}

export default Agents;
