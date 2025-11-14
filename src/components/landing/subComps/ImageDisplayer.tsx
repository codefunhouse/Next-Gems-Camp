import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ImageItem {
  image: string;
  description: string;
}

interface ImageDisplayerProps {
  data: ImageItem[];
  className?: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  title?: string;
}

function ImageDisplayer({
  data,
  className,
  autoSlide = true,
  autoSlideInterval = 5000,
  title,
}: ImageDisplayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use useCallback to memoize the nextSlide function
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  }, [data.length]); // Add data.length as dependency

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || data.length <= 1) return;

    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [currentIndex, autoSlide, autoSlideInterval, data.length, nextSlide]); // Add nextSlide to dependencies

  if (!data || data.length === 0) {
    return <div>No images to display</div>;
  }

  const currentItem = data[currentIndex];
  const descriptionParts = currentItem.description.split("—");

  return (
    <section
      className={twMerge(
        "w-full py-10 border-t border-slate-200",
        commonSectionStyles,
        className
      )}
    >
      <div className="flex flex-col gap-8">
        {title && <h3 className="text-center">{title}</h3>}
        {/* Image Section */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={currentItem.image}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {data.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
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
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
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
              </>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="text-center">
          {descriptionParts.length >= 2 ? (
            <div className="flex items-center justify-center">
              <span className="font-bold text-lg block">
                {descriptionParts[0].trim()}
              </span>
              <span className="text-gray-600 block">
                — {descriptionParts.slice(1).join("—").trim()}
              </span>
            </div>
          ) : (
            <p className="text-gray-600">{currentItem.description}</p>
          )}
        </div>

        {/* Dot Indicators */}
        {data.length > 1 && (
          <div className="flex justify-center space-x-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={twMerge(
                  "w-3 h-3 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-blue-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ImageDisplayer;
