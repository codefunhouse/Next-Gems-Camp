import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

function CoursesSection() {
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

  const renderCard = ({
    imageUrl,
    title,
    description,
    imageAlt = "Program image",
    idx,
  }: {
    imageUrl: string;
    title: string;
    description: string;
    imageAlt?: string;
    idx: string | number;
  }) => {
    return (
      <Card
        className="hover:shadow-lg transition-shadow flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2"
        key={idx}
      >
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <section
      className={twMerge(
        "py-20 bg-background border-b border-b-slate-100",
        commonSectionStyles
      )}
    >
      <div className="container mx-auto px-4">
        {/* Centered Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-8">
            {landingPageDummyData.ourProgrammes.title}
          </h2>

          {/* Navigation buttons and counter - centered below title */}
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous cards"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Slider counter */}
            <div className="text-lg font-medium text-gray-600 min-w-[80px]">
              {currentIndex + 1} / {maxIndex + 1}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next cards"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider container - hidden scrollbar */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
        >
          {landingPageDummyData.ourProgrammes.programmes.map((card, idx) =>
            renderCard({
              idx,
              title: card.title,
              description: card.description,
              imageUrl: card.imgUrl,
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
