"use client";

import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { InfoParentsProps } from "@/types/types1";
import { parentInfoData } from "@/utils/dummyData/infoData";
import { getSanityImageUrl } from "@/utils/sanityFns/getSanityImageUrl";
import QuestionsAndAnswers from "../landing/subComps/QuestionsAndAnswers";
import ApplyForm from "../shared/ApplyForm";
import HeroSection from "../shared/HeroSection";
import ImageContentCard from "../shared/ImageCard";
import SplitSection from "../shared/SplitSection";
import WhatToExpectCard from "../shared/WhatToExpectCard";
import TravelAndTransfer from "./subComps/TravelAndTransfer";
import WhatsIncludedSection from "./subComps/WhatsIncluded";

const Parents = ({ data, landingPageData }: InfoParentsProps) => {
  const { openModal, closeModal } = useModal();

  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection
        title={data?.heroSection?.title || parentInfoData.heroSection.title}
        subtitle={
          data?.heroSection?.subtitle || parentInfoData.heroSection.subtitle
        }
        bgImage={
          getSanityImageUrl(data?.heroSection?.bgImage) ||
          parentInfoData.heroSection.bgImage
        }
        buttons={
          <Button
            label={
              data?.heroSection?.buttonText ||
              parentInfoData.heroSection.buttonText
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
          parentInfoData.heroSection.infoDetails
        }
      />

      {/* Learning and Enrichment */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.learningAndEnrichment?.leftData?.title ||
              parentInfoData.learningAndEnrichment.leftData.title
            }
            list={
              data?.learningAndEnrichment?.leftData?.lists ||
              parentInfoData.learningAndEnrichment.leftData.lists
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(
                data?.learningAndEnrichment?.rightData?.imageUrl
              ) || parentInfoData.learningAndEnrichment.rightData.imageUrl
            }
            alt={
              data?.learningAndEnrichment?.rightData?.alt ||
              parentInfoData.learningAndEnrichment.rightData.alt
            }
          />
        }
      />

      <TravelAndTransfer {...data?.travelVisasAndTransfers} />

      {/* Accomodation and welfare */}
      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.accommodationAndWelfare?.leftData?.title ||
              parentInfoData.accommodationAndWelfare.leftData.title
            }
            list={
              data?.accommodationAndWelfare?.leftData?.lists ||
              parentInfoData.accommodationAndWelfare.leftData.lists
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(
                data?.accommodationAndWelfare?.rightData?.imageUrl
              ) || parentInfoData.accommodationAndWelfare.rightData.imageUrl
            }
            alt={
              data?.accommodationAndWelfare?.rightData?.alt ||
              parentInfoData.accommodationAndWelfare.rightData.alt
            }
          />
        }
      />

      {/* safeguarding */}

      <SplitSection
        leftContent={
          <WhatToExpectCard
            title={
              data?.safeguardingAndChildProtection?.leftData?.title ||
              parentInfoData.safeguardingAndChildProtection.leftData.title
            }
            list={
              data?.safeguardingAndChildProtection?.leftData?.list ||
              parentInfoData.safeguardingAndChildProtection.leftData.list
            }
          />
        }
        rightContent={
          <ImageContentCard
            imageUrl={
              getSanityImageUrl(
                data?.safeguardingAndChildProtection?.rightData?.imageUrl
              ) ||
              parentInfoData.safeguardingAndChildProtection.rightData.imageUrl
            }
            alt={
              data?.safeguardingAndChildProtection?.rightData?.alt ||
              parentInfoData.safeguardingAndChildProtection.rightData.alt
            }
          />
        }
        background="gray"
        position="right-left"
      />

      <WhatsIncludedSection {...data?.whatsIncluded} />
      {/* FAQ Section */}
      <QuestionsAndAnswers
        className="bg-[#F7F7F7]"
        apiFAQs={landingPageData?.faqs}
      />
    </PublicPagesLayout>
  );
};

export default Parents;
