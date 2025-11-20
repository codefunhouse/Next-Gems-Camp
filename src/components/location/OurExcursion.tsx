import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import LocationIcon from "../svgs/LocationIcon";
import LongArrowRight from "../svgs/LongArrowRight";

type OurExcursionProps = {
  images: { imageUrl: string; title: string }[];
  mainTitle: string;
  location: string;
};

function OurExcursion({ mainTitle, location, images }: OurExcursionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardsPerView(3); // lg screens - 3 cards
      else if (width >= 768) setCardsPerView(2); // md screens - 2 cards
      else if (width >= 640) setCardsPerView(2); // sm screens - 2 cards
      else setCardsPerView(1); // mobile - 1 card
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const totalProgrammes = images.length;
  const maxIndex = Math.max(0, totalProgrammes - cardsPerView);

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;

    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);

    const cardElement = sliderRef.current.children[0] as HTMLElement;
    if (cardElement) {
      const cardWidth = cardElement.offsetWidth + 32; // card width + gap
      sliderRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => scrollToSlide(currentIndex + 1);
  const prevSlide = () => scrollToSlide(currentIndex - 1);

  // Check if buttons should be visible
  const showPrevButton = currentIndex > 0;
  const showNextButton = currentIndex < maxIndex;

  return (
    <section className={twMerge("py-16 bg-white", commonSectionStyles)}>
      <div className="container mx-auto px-4 space-y-12">
        {/* Centered Title */}
        <div className="text-center flex flex-col sm:flex-row w-full gap-6 sm:justify-between items-center">
          <div className="space-y-2">
            <p
              className="flex items-center gap-1.5
            "
            >
              <LocationIcon />
              <span className="text-base sm:text-lg">{location}</span>
            </p>
            <h1>{mainTitle}</h1>
          </div>
          {/* Navigation buttons and counter */}
          <div className="flex justify-center items-center gap-6">
            {/* Previous Button */}
            <AnimatePresence>
              {showPrevButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={prevSlide}
                  className="p-3 rounded-full border border-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous cards"
                >
                  <LongArrowRight className="rotate-180 transform" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Slider counter */}
            <div className="text-lg font-medium text-gray-600 min-w-[80px]">
              {currentIndex + 1} / {maxIndex + 1}
            </div>

            {/* Next Button */}
            <AnimatePresence>
              {showNextButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={nextSlide}
                  className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next cards"
                >
                  <LongArrowRight />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Slider container - hidden scrollbar */}
        <div ref={sliderRef} className="flex gap-6">
          {images.map((card, idx) => (
            <div className="space-y-6" key={idx}>
              <div className="w-full max-w-[338px] rounded-[2rem]">
                <img
                  width={369}
                  height={338}
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover aspect-[369/338] rounded-[2rem]"
                />
              </div>
              <h4 className="text-center">{card.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurExcursion;
