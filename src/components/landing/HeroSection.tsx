import { motion } from "motion/react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import LocationIcon from "../svgs/LocationIcon";
import BgImage from "./subComps/BgImage";

type LocationDetails = {
  label: string;
  value: string;
};

function HeroSection({
  title,
  subtitle,
  locationDesc,
  className,
  bgImage,
  bgImageAlt,
  buttons,
  locationDetails,
  infoDetails,
}: {
  title: string;
  subtitle: string;
  locationDesc?: string;
  className?: string;
  bgImage: string;
  bgImageAlt?: string;
  showReviews?: boolean;
  buttons?: ReactNode;
  locationDetails?: LocationDetails[];
  infoDetails?: ReactNode;
}) {
  const renderLocationDetail = ({
    className,
    label,
    value,
    showLeftBorder,
    idx,
  }: {
    className?: string;
    label: string;
    value: string;
    showLeftBorder?: boolean;
    idx: string | number;
  }) => (
    <div
      key={idx}
      className={twMerge(
        "w-full min-w-[115px] max-w-[172px] px-7 py-[1.2rem] border border-r-white/70 text-center text-wrap",
        showLeftBorder && "border-l-white/70",
        className
      )}
    >
      <p className="flex flex-col gap-0.5 items-center text-white">
        <span>{label}</span>
        <span className="text-3xl text-[2rem] font-medium">{value}</span>
      </p>
    </div>
  );
  return (
    <section
      className={twMerge(
        "relative flex flex-col gap-6 items-center justify-center text-white",
        className
      )}
    >
      <BgImage
        src={bgImage || ""}
        alt={bgImageAlt || "Hero Background Image"}
      />
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-2 px-4 py-48 text-center max-w-[902px]">
        {locationDesc && (
          <motion.p
            className="max-w-[466px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <LocationIcon />
            <span>{locationDesc}</span>
          </motion.p>
        )}
        <motion.h1
          className=""
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg max-w-[466px] flex items-center gap-1.5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
        {locationDetails && (
          <div className="w-full mt-8 max-w-full flex sm:max-w-[688px]">
            {locationDetails.map((detail, idx) =>
              renderLocationDetail({
                idx,
                label: detail.label,
                value: detail.label,
                showLeftBorder: idx === 0,
              })
            )}
          </div>
        )}
        {buttons && (
          <div className="flex items-center justify-center gap-3 max-w-lg w-full mt-8">
            {buttons}
          </div>
        )}
        {infoDetails && (
          <div className="w-full mt-12 max-w-[687px] px-8 py-8 rounded-[1rem] border border-white/[24] bg-white/[6]">
            {infoDetails}
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
