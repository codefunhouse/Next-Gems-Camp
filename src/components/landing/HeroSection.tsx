import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import ReviewsSection from "./ReviewsSection";

function HeroSection({
  title,
  subtitle,
  desc,
  className,
  bgImage,
  showReviews = false,
}: {
  title: string;
  subtitle: string;
  desc?: string;
  className?: string;
  bgImage: string;
  showReviews?: boolean;
}) {
  return (
    <section
      className={twMerge(
        "relative py-36 flex flex-col gap-6 items-center justify-center bg-gradient-to-br from-hero-start to-hero-end text-white",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <motion.h1
          className="font-semibold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
        {desc && (
          <motion.p
            className="mb-8 mx-auto opacity-90 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {desc}
          </motion.p>
        )}
      </div>

      {/* FAQs */}
      {showReviews && (
        <div className="w-full max-w-8xl">
          <ReviewsSection forHeroSection />
        </div>
      )}
    </section>
  );
}

export default HeroSection;
