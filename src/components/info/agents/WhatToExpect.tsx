import WhatToExpectCard from "@/components/landing/subComps/WhatToExpectCard";
import { parentsInfoData } from "@/lib/dummyData/infoData";

function WhatToExpect() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center flex flex-col gap-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center">
            {parentsInfoData.title}
          </h2>
          <p className="text-lg">{parentsInfoData.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {parentsInfoData.data.map((expectation, idx) => (
            <WhatToExpectCard
              key={idx}
              title={expectation.title}
              list={expectation.list}
              description={expectation.description}
              subsections={expectation.subsections}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatToExpect;
