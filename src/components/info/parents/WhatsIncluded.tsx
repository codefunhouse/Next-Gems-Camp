import StarTickIcon from "@/components/svgs/StarTickIcon";

function WhatsIncludedSection() {
  const includedItems = [
    "30 hours of accredited English tuition",
    "Specialism program of choice",
    "Cultural excursions and social activities",
    "Full-board accommodation and meals",
    "Airport/station transfers (on arrival & departure days)",
    "24/7 supervision and medical support",
    "End-of-camp certificate and report",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[602px] w-full mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <h1 className="">What's Included</h1>

          <p className="text-base sm:text-lg max-w-[471px]">
            Parents can be confident their children are supported in a caring,
            structured, and secure environment.
          </p>
        </div>

        {/* Items List */}
        <div className="flex flex-col w-full max-w-[602px]">
          {includedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 py-6 px-5 rounded-xl border-b border-b-[#E2E2E2] hover:shadow-md transition-all duration-300"
            >
              <StarTickIcon className="mt-1.5" />

              <p className="text-base sm:text-lg">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default WhatsIncludedSection;
