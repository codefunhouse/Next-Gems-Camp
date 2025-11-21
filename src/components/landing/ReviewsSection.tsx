import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { getSanityImageUrl } from "@/lib/sanity/getSanityImageUrl";
import { Reviews } from "@/types/sanityTypes";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { HighlightedText } from "../general/HighlightedText";
import LongArrowLeft from "../svgs/LongArrowLeft";
import LongArrowRight from "../svgs/LongArrowRight";

const testimonials = [
  {
    name: "Oscar",
    country: "Germany",
    text: "The tutorials were the best, with individual feedback and valuable suggestions. This personalized approach was helpful.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "Alexis",
    country: "United Kingdom",
    text: "The course was adapted to our interests and taught by an expert. Discussions with eager students were well-facilitated.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    name: "Valerie",
    country: "Canada",
    text: "My course was in-depth and engaging. The smaller class size helped me participate more and get one-on-one time with my tutor.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    name: "Marcus",
    country: "Australia",
    text: "An incredible learning experience that pushed me beyond my comfort zone. The tutors were exceptional mentors.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
  {
    name: "Sophie",
    country: "France",
    text: "The blend of academic rigor and practical application made this program stand out. Truly transformative!",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
];

function ReviewsSection({ title, description, reviews, textColor }: Reviews) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Responsive card display - show different number of cards based on screen size
  const getCardsToShow = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
      // Reset to first slide when resizing to avoid empty spaces
      setCurrentIndex(0);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  // Use useCallback to memoize the nextSlide function
  const nextSlide = useCallback(() => {
    if (isAnimating || currentIndex >= maxIndex) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex, maxIndex]);

  const prevSlide = useCallback(() => {
    if (isAnimating || currentIndex <= 0) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  // Auto-slide every 5 seconds - fixed useEffect dependency
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        setCurrentIndex(0);
      } else {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, nextSlide]);

  return (
    <section
      className={twMerge(
        "relative overflow-hidden",
        `pt-16 pb-24  ${commonSectionStyles}`
      )}
    >
      <div className="container mx-auto px-4 relative z-10 flex flex-col gap-12">
        <div className="flex items-center gap-4 sm:justify-between flex-col sm:flex-row justify-center">
          {
            <div className="flex flex-col gap-3 w-full max-w-[400px]">
              <HighlightedText
                wrapperTag="h1"
                text={title || landingPageDummyData.reviews.title}
                highlights={
                  textColor || [
                    {
                      text: "Families",
                      color: "#15B1FB",
                    },
                  ]
                }
              />
              <p className="text-lg">
                {description || landingPageDummyData.reviews.description}
              </p>
            </div>
          }

          <div className="flex items-center gap-3">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0 || isAnimating}
              className="rounded-full p-2 md:p-3 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              aria-label="Previous testimonials"
            >
              <LongArrowLeft />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex || isAnimating}
              className="rounded-full p-2 md:p-3 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              aria-label="Next testimonials"
            >
              <LongArrowRight />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className={`flex gap-6 transition-transform duration-500 ease-out ${
                isAnimating ? "ease-out" : "ease-in-out"
              }`}
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsToShow)
                }%)`,
              }}
            >
              {(reviews || landingPageDummyData.reviews.reviews).map(
                (testimonial, index) => {
                  const [name, reviewerGroup] = testimonial.reviewer.split(",");
                  const [reviewerType, country] = reviewerGroup.split("(");
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 "
                      style={{ width: `${100 / cardsToShow}%` }}
                    >
                      <Card className="transition-all duration-300 h-full group rounded-[2rem]">
                        <CardContent className="px-6 md:px-8 py-11 h-full flex flex-col">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                              <img
                                src={
                                  typeof testimonial.image === "string"
                                    ? testimonial.image
                                    : getSanityImageUrl(testimonial.image)
                                }
                                alt={testimonial.title}
                                className="w-16 h-16 rounded-full object-cover border border-[#E2E2E2] group-hover:border-primary/30 transition-colors"
                              />
                              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/50 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="space-y-2">
                              <h5 className="">{name}</h5>
                              <p className="text-base sm:text-lgflex items-center gap-1">
                                <span className="">{reviewerType}</span>
                                {`(${country}`}
                              </p>
                            </div>
                          </div>

                          <p className="text-[#959595] italic flex-grow leading-relaxed">
                            "{testimonial.description}"
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Progress Indicators */}
          {
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-primary"
                      : "bg-blue-primary/30 hover:bg-blue-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          }

          {/* Slide counter */}
          {
            <div className="text-center mt-4 text-sm text-muted-foreground">
              {currentIndex + 1} of {maxIndex + 1}
            </div>
          }
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
