import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { HighlightedText } from "../general/HighlightedText";
import LongArrowRight from "../svgs/LongArrowRight";
import BgImage from "./subComps/BgImage";

type ProgramCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  imageAlt?: string;
  icon: ReactNode;
};

function ProgramCards({
  imageUrl,
  imageAlt,
  title,
  description,
  icon,
}: ProgramCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      className="rounded-[2rem] relative  overflow-hidden cursor-pointer w-full max-w-[369px] shrink-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ y: -5 }} // Optional: slight lift on hover
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BgImage
        src={imageUrl}
        alt={imageAlt || title}
        overlayStyles={twMerge(isHovering ? "!bg-black/85" : "!bg-black/55")}
      />

      {/* Main content */}
      <div
        className={twMerge(
          "relative z-10 flex flex-col gap-[2.08rem] text-white p-5 sm:p-8 min-h-[21rem] h-full",
          isHovering ? "" : "justify-between"
        )}
      >
        <span className="self-end">{icon}</span>

        <div className="w-full text-center space-y-2">
          <h4 className="!font-medium">{title}</h4>

          <AnimatePresence>
            {isHovering && (
              <motion.p
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.2,
                }}
                className="overflow-hidden"
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function OurPathwayProgrammes() {
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

  const totalProgrammes = landingPageDummyData.ourProgrammes.programmes.length;
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
    <section
      className={twMerge(
        "py-20 bg-background border-b border-b-slate-100",
        commonSectionStyles
      )}
    >
      <div className="container mx-auto px-4 space-y-12">
        {/* Centered Title */}
        <div className="text-center flex flex-col sm:flex-row w-full gap-6 sm:justify-between items-center">
          <HighlightedText
            wrapperTag="h1"
            text={landingPageDummyData.ourProgrammes.title}
            highlights={[
              {
                text: "Programmes",
                color: "#15B1FB",
              },
            ]}
            className="!max-w-full sm:!max-w-[359px]"
          />

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
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
        >
          {landingPageDummyData.ourProgrammes.programmes.map((card, idx) => (
            <ProgramCards
              icon={card.icon}
              key={idx}
              title={card.title}
              description={card.description}
              imageUrl={card.imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurPathwayProgrammes;
