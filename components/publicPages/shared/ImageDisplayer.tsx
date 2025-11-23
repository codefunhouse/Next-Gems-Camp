"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ImageItem {
  src: string;
  alt?: string;
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
  autoSlide = true,
  autoSlideInterval = 5000,
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

  return (
    <div className="flex flex-col gap-6 max-h-[537px]">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-[600px] w-full rounded-4xl">
          <Image
            src={currentItem.src}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover aspect-600/493 rounded-4xl"
            width={600}
            height={493}
          />
        </div>

        {/* Navigation Arrows */}
        {data.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronRight />
            </button>
          </>
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
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "bg-blue-primary"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageDisplayer;
