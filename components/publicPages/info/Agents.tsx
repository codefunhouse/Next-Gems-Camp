"use client";
import Button from "@/components/general/Button";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { agentsInfoData } from "@/lib/dummyData/infoData";
import { getSanityImageUrl } from "@/lib/sanityFns/getSanityImageUrl";
import { InfoProps } from "@/types/types1";
import QuestionsAndAnswers from "../landing/subComps/QuestionsAndAnswers";
import ApplyForm from "../shared/ApplyForm";
import HeroSection from "../shared/HeroSection";
import ImageContentCard from "../shared/ImageCard";
import SplitSection from "../shared/SplitSection";
import WhatToExpectCard from "../shared/WhatToExpectCard";

function Agents({ data, landingPageData }: InfoProps) {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <HeroSection
        title={data?.heroSection?.title || agentsInfoData.heroSection.title}
        subtitle={
          data?.heroSection?.subtitle || agentsInfoData.heroSection.subtitle
        }
        bgImage={
          getSanityImageUrl(data?.heroSection?.bgImage) ||
          agentsInfoData.heroSection.bgImage
        }
        buttons={
          <Button
            label={
              data?.heroSection?.buttonText ||
              agentsInfoData.heroSection.buttonText
            }
            endIcon={<ShortArrowRight />}
            classNames="!w-full !max-w-[194px]"
            buttonType="sec"
            onClick={() =>
              openModal(<ApplyForm onClick={() => closeModal()} />)
            }
          />
        }
        infoDetails={
          data?.heroSection?.infoDetails ||
          agentsInfoData.heroSection.infoDetails
        }
      />

      {/* Why Partner with us */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.whyPartnerWithUs?.leftData?.title ||
              agentsInfoData.whyPartnerWithUs.leftData.title
            }
            list={
              data?.whyPartnerWithUs?.leftData?.lists ||
              agentsInfoData.whyPartnerWithUs.leftData.lists
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(data?.whyPartnerWithUs?.rightData?.imageUrl) ||
              agentsInfoData.whyPartnerWithUs.rightData.imageUrl
            }
            alt={
              data?.whyPartnerWithUs?.rightData?.alt ||
              agentsInfoData.whyPartnerWithUs.rightData.alt
            }
          />
        }
      />

      {/* Program overview */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.programOverview?.leftData?.title ||
              agentsInfoData.programOverview.leftData.title
            }
            list={
              data?.programOverview?.leftData?.lists ||
              agentsInfoData.programOverview.leftData.lists
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(data?.programOverview?.rightData?.imageUrl) ||
              agentsInfoData.programOverview.rightData.imageUrl
            }
            alt={
              data?.programOverview?.rightData?.alt ||
              agentsInfoData.programOverview.rightData.alt
            }
          />
        }
        position="right-left"
        background="gray"
      />
      {/* Travel and Transfer */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.travelAndTransfers?.leftData?.title ||
              agentsInfoData.travelAndTransfers.leftData.title
            }
            list={
              data?.travelAndTransfers?.leftData?.lists ||
              agentsInfoData.travelAndTransfers.leftData.lists
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(
                data?.travelAndTransfers?.rightData?.imageUrl
              ) || agentsInfoData.travelAndTransfers.rightData.imageUrl
            }
            alt={getSanityImageUrl(
              agentsInfoData.travelAndTransfers.rightData.alt
            )}
          />
        }
      />

      {/* Safeguard and compliance */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.safeguardingAndCompliance?.leftData?.title ||
              agentsInfoData.safeguardingAndCompliance.leftData.title
            }
            list={
              data?.safeguardingAndCompliance?.leftData?.list ||
              agentsInfoData.safeguardingAndCompliance.leftData.list
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(
                data?.safeguardingAndCompliance?.rightData?.imageUrl
              ) || agentsInfoData.safeguardingAndCompliance.rightData.imageUrl
            }
            alt={
              data?.safeguardingAndCompliance?.rightData?.alt ||
              agentsInfoData.safeguardingAndCompliance.rightData.alt
            }
          />
        }
        position="right-left"
        background="gray"
      />
      {/* Agent support */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.agentSupport?.leftData?.title ||
              agentsInfoData.agentSupport.leftData.title
            }
            list={
              data?.agentSupport?.leftData?.list ||
              agentsInfoData.agentSupport.leftData.list
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(data?.agentSupport?.rightData?.imageUrl) ||
              agentsInfoData.agentSupport.rightData.imageUrl
            }
            alt={
              data?.agentSupport?.rightData?.alt ||
              agentsInfoData.agentSupport.rightData.alt
            }
          />
        }
      />
      {/* FAQ Section */}
      <QuestionsAndAnswers
        className="bg-grey-muted"
        apiFAQs={landingPageData?.faqs}
      />
    </>
  );
}

export default Agents;
