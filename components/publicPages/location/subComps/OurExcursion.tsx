"use client";
import LocationIcon from "@/components/svgs/LocationIcon";
import LongArrowRight from "@/components/svgs/LongArrowRight";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { getSanityImageUrl } from "@/lib/sanityFns/getSanityImageUrl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type CityImage = { imageUrl: string | SanityImageSource; title: string };

type OurExcursionProps = {
  mainTitle: string;
  tabs: string[];
  cities?: {
    name: string;
    images: CityImage[];
  }[];
};

function OurExcursion({ mainTitle, cities, tabs }: OurExcursionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  // Calculate responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024)
        setCardsPerView(3); // lg screens - 3 cards
      else if (width >= 768)
        setCardsPerView(3); // md screens - 3 cards
      else if (width >= 640)
        setCardsPerView(2); // sm screens - 2 cards
      else setCardsPerView(1); // mobile - 1 card
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const currentCity = cities?.[activeTab];
  const gap = 24;

  const maxIndex = Math.max(
    0,
    (currentCity?.images?.length || 0) - cardsPerView
  );
  const cardBaseWidth = `calc((100% - ${(cardsPerView - 1) * gap}px) / ${cardsPerView})`;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Handle tab change - reset to first slide
  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setCurrentIndex(0); // Reset slide index when tab changes
  };

  // Check if buttons should be visible
  const showPrevButton = currentIndex > 0;
  const showNextButton = currentIndex < maxIndex;

  return (
    <section className={twMerge("py-16 bg-white", commonSectionStyles)}>
      <div className="mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row w-full gap-6 sm:justify-between items-center">
          <div className="space-y-5 w-full">
            {/* Centered Title */}
            <h1>{mainTitle}</h1>

            {/* Tabs */}
            <div className="flex gap-2 items-center w-full max-w-screen sm:max-w-[600px] scroll-smooth noScrollbar overflow-x-auto">
              {tabs?.map((tab, idx) => (
                <button
                  key={idx}
                  className={twMerge(
                    "border border-[#E2E2E2] rounded-full gap-1.5 py-1.5 px-4 text-base sm:text-lg flex items-center shrink-0 cursor-pointer transition-colors duration-[800] ease-in-out",
                    activeTab === idx && "border-blue-primary bg-[#15B1FB29] "
                  )}
                  onClick={() => handleTabChange(idx)}
                >
                  {idx === activeTab && (
                    <motion.div
                      key="icon"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <LocationIcon />
                    </motion.div>
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="w-full space-y-4">
          {/* Navigation buttons and counter */}
          <div className="flex justify-center items-center gap-6 mx-auto">
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
            <div className="text-lg font-medium text-gray-600 min-w-20">
              {currentIndex + 1} / {(maxIndex || 0) + 1}
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

          {/* Carousel with CSS Transforms */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-all duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% / ${cardsPerView} + ${gap / cardsPerView}px)))`,
              }}
            >
              {currentCity?.images?.map((card, idx) => (
                <div
                  key={idx}
                  className="space-y-6 shrink-0"
                  style={{
                    width: cardBaseWidth,
                  }}
                >
                  <div className="w-full rounded-4xl mx-auto transition-all duration-700 ease-in">
                    <Image
                      src={
                        typeof card.imageUrl === "string"
                          ? card.imageUrl
                          : getSanityImageUrl(card.imageUrl)
                      }
                      alt={card.title}
                      width={369}
                      height={338}
                      className="w-full h-full object-cover aspect-369/338 rounded-4xl"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-center">{card.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurExcursion;
