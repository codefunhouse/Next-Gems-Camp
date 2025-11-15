import { MapPin } from "lucide-react";
import { twMerge } from "tailwind-merge";

function HeroSection() {
  const renderDetailcard = ({
    data,
    className,
  }: {
    data: {
      text: string;
      subtext: string;
    }[];
    className?: string;
  }) => {
    return (
      <div
        className={twMerge(
          "rounded-md sm:rounded-lg bg-[#1E1918]/20 backdrop-blur-md px-6 py-4 flex flex-col gap-2 w-full max-w-[400px]",
          className
        )}
      >
        {data.map((item, index) => (
          <p key={index} className="text-white">
            <span className="font-medium">{item.text}:</span> {item.subtext}
          </p>
        ))}
      </div>
    );
  };
  return (
    <section className="relative pt-24 sm:pt-44 pb-16 sm:pb-40 bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop')",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <MapPin className="h-6 w-6" />
          <span className="text-lg">Norfolk, England</span>
        </div>
        <h1 className=" font-bold mb-6 text-center">Norfolk Camp</h1>

        <>
          {renderDetailcard({
            data: [
              { text: "Start Dates", subtext: "6th July 2026" },
              { text: "End Date", subtext: "16th August 2026" },
              { text: "Pricing per two week cycle", subtext: "£3000" },
              { text: "Age", subtext: "9-12" },
            ],
          })}
        </>
      </div>
    </section>
  );
}

export default HeroSection;
