import ImageContentCard from "@/components/landing/subComps/ImageCard";
import WhatToExpectCard from "@/components/landing/subComps/WhatToExpectCard";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { parentInfoData } from "@/lib/dummyData/infoData";
import { twMerge } from "tailwind-merge";

function TravelAndTransfer() {
  return (
    <section
      className={twMerge(
        "py-20 flex flex-col gap-16 items-center bg-grey-muted",
        commonSectionStyles
      )}
    >
      <div className="flex flex-col items-center gap-3 w-full max-w-[880px] mx-auto text-center">
        <h1>{parentInfoData.travelVisasAndTransfers.mainTitle}</h1>
        <p className="text-base sm:text-lg">
          {parentInfoData.travelVisasAndTransfers.mainDesc}
        </p>
      </div>

      {/* Main body */}
      <div className="flex flex-col gap-12 w-full">
        {/* Upper section */}
        <div className="flex flex-col sm:flex-row w-full items-center border-b border-b-slate-200 pb-16">
          <div className="flex-1 w-full">
            <WhatToExpectCard
              title={
                parentInfoData.travelVisasAndTransfers.section1.leftData.title
              }
              list={
                parentInfoData.travelVisasAndTransfers.section1.leftData.lists
              }
              headingStyles="!text-[1.875rem] sm:!text-[3rem]"
            />
          </div>
          <div className="flex-1 w-full flex sm:justify-center">
            <ImageContentCard
              imageUrl={
                parentInfoData.travelVisasAndTransfers.section1.rightData
                  .imageUrl
              }
              alt={
                parentInfoData.travelVisasAndTransfers.section1.rightData.alt
              }
            />
          </div>
        </div>
        {/* Lower section */}
        <div className="flex flex-col sm:flex-row w-full items-center">
          <div className="flex-1 w-full flex sm:justify-center">
            <ImageContentCard
              imageUrl={
                parentInfoData.travelVisasAndTransfers.section2.rightData
                  .imageUrl
              }
              alt={
                parentInfoData.travelVisasAndTransfers.section2.rightData.alt
              }
            />
          </div>
          <div className="flex-1 w-full flex flex-col items-center">
            <WhatToExpectCard
              title={
                parentInfoData.travelVisasAndTransfers.section2.leftData.title
              }
              list={
                parentInfoData.travelVisasAndTransfers.section2.leftData.lists
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
