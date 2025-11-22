"use client";
import LocationIcon from "@/components/svgs/LocationIcon";
import LongArrowRight from "@/components/svgs/LongArrowRight";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { getSanityImageUrl } from "@/lib/sanity/getSanityImageUrl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Calculate responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024)
        setCardsPerView(3); // lg screens - 3 cards
      else if (width >= 768)
        setCardsPerView(2); // md screens - 2 cards
      else if (width >= 640)
        setCardsPerView(2); // sm screens - 2 cards
      else setCardsPerView(1); // mobile - 1 card
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const currentCity = cities?.[activeTab];
  const totalProgrammes = currentCity?.images?.length;
  const maxIndex =
    totalProgrammes && Math.max(0, totalProgrammes - cardsPerView);

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;

    const newIndex = Math.max(0, Math.min(index, maxIndex || 0));
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
  const showNextButton = currentIndex < (maxIndex || 0);

  return (
    <section className={twMerge("py-16 bg-white", commonSectionStyles)}>
      <div className="container mx-auto px-4 space-y-12">
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
                    "border border-[#E2E2E2] rounded-full gap-1.5 py-1.5 px-4 text-base sm:text-lg flex items-center shrink-0 cursor-pointer",
                    activeTab === idx &&
                      "border-[#15B1FB] bg-[#15B1FB29] transition-all"
                  )}
                  onClick={() => {
                    setActiveTab(idx);
                  }}
                >
                  {idx === activeTab && <LocationIcon />}
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

          {/* Simpler approach with percentage widths */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth noScrollbar w-full"
          >
            {currentCity?.images?.map((card, idx) => (
              <div
                className="space-y-6 shrink-0 snap-always snap-center"
                key={idx}
                style={{
                  width: `${100 / cardsPerView}%`,
                  flex: `0 0 ${100 / cardsPerView}%`,
                }}
              >
                <div className="w-full max-w-[345px] rounded-4xl mx-auto">
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
                  />
                </div>
                <h5 className="text-center">{card.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurExcursion;
