import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

function HeroSection({
  title,
  subtitle,
  className,
  bgImage,
}: {
  title: string;
  subtitle: string;
  className?: string;
  bgImage: string;
}) {
  return (
    <section
      className={twMerge(
        "relative py-40 flex items-center justify-center bg-gradient-to-br from-hero-start to-hero-end text-white",
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
        <motion.h2
          className="font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}

export default HeroSection;
