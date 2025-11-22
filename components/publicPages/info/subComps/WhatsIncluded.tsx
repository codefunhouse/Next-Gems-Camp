import StarTickIcon from "@/components/svgs/StarTickIcon";
import { parentInfoData } from "@/lib/dummyData/infoData";
import { WhatsIncludedProps } from "@/types/sanityTypes";

function WhatsIncludedSection({
  title,
  description,
  includedItems,
}: WhatsIncludedProps) {
  console.log("Inluded items: ", includedItems);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[602px] w-full mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <h1 className="">{title || parentInfoData.whatsIncluded.title}</h1>

          <p className="text-base sm:text-lg max-w-[471px]">
            {description || parentInfoData.whatsIncluded.description}
          </p>
        </div>

        {/* Items List */}
        <div className="flex flex-col w-full max-w-[602px]">
          {(includedItems || parentInfoData.whatsIncluded.includedItems).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 py-6 px-5 rounded-xl border-b border-b-[#E2E2E2] hover:shadow-md transition-all duration-300"
              >
                <StarTickIcon className="mt-1.5" />

                <p className="text-base sm:text-lg">{item?.item}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
export default WhatsIncludedSection;
