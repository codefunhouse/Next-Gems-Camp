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
    <section className="py-20 bg-grey-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center flex flex-col gap-4 mb-12 w-full max-w-3xl">
            <h2 className="font-semibold">What's Included</h2>

            <p className="text-lg">
              Parents can be confident their children are supported in a caring,
              structured, and secure environment.
            </p>
          </div>

          {/* Items List */}
          <div className="grid gap-3">
            {includedItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default WhatsIncludedSection;
