import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { parentInfoData } from "@/lib/dummyData/infoData";
import { getSanityImageUrl } from "@/lib/sanityFns/getSanityImageUrl";
import { TravelVisasSection } from "@/types/sanityTypes";
import { twMerge } from "tailwind-merge";
import ImageContentCard from "../../shared/ImageCard";
import WhatToExpectCard from "../../shared/WhatToExpectCard";

function TravelAndTransfer({
  mainDesc,
  mainTitle,
  section1,
  section2,
}: TravelVisasSection) {
  return (
    <section
      className={twMerge(
        "py-20 flex flex-col gap-16 items-center bg-grey-muted",
        commonSectionStyles
      )}
    >
      <div className="flex flex-col items-center gap-3 w-full max-w-[880px] mx-auto text-center">
        <h1>{mainTitle || parentInfoData.travelVisasAndTransfers.mainTitle}</h1>
        <p className="text-base sm:text-lg">
          {mainDesc || parentInfoData.travelVisasAndTransfers.mainDesc}
        </p>
      </div>

      {/* Main body */}
      <div className="flex flex-col gap-12 w-full">
        {/* Upper section */}
        <div className="flex flex-col sm:flex-row w-full items-center border-b border-b-slate-200 pb-16 gap-8">
          <div className="flex-1 w-full">
            <WhatToExpectCard
              title={
                section1?.leftData?.title ||
                parentInfoData.travelVisasAndTransfers.section1?.leftData?.title
              }
              list={
                section1?.leftData?.lists ||
                parentInfoData.travelVisasAndTransfers.section1?.leftData?.lists
              }
              headingStyles="!text-[1.875rem] sm:!text-[3rem]"
            />
          </div>
          <div className="flex-1 w-full flex sm:justify-center">
            <ImageContentCard
              imageUrl={
                getSanityImageUrl(section1?.rightData?.imageUrl) ||
                parentInfoData.travelVisasAndTransfers.section1?.rightData
                  .imageUrl
              }
              alt={
                section1?.rightData?.alt ||
                parentInfoData.travelVisasAndTransfers.section1?.rightData.alt
              }
            />
          </div>
        </div>
        {/* Lower section */}
        <div className="flex flex-col sm:flex-row w-full items-center gap-8">
          <div className="flex-1 w-full flex sm:justify-center">
            <ImageContentCard
              imageUrl={
                getSanityImageUrl(section2?.rightData?.imageUrl) ||
                parentInfoData.travelVisasAndTransfers.section2.rightData
                  .imageUrl
              }
              alt={
                section2?.rightData?.alt ||
                parentInfoData.travelVisasAndTransfers.section2.rightData.alt
              }
            />
          </div>
          <div className="flex-1 w-full flex flex-col items-center">
            <WhatToExpectCard
              title={
                section2?.leftData?.title ||
                parentInfoData.travelVisasAndTransfers.section2.leftData?.title
              }
              list={
                section2?.leftData?.lists ||
                parentInfoData.travelVisasAndTransfers.section2.leftData?.lists
              }
              headingStyles="!text-[1.875rem] sm:!text-[3rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelAndTransfer;
