import { Card, CardContent } from "@/components/ui/card";
import { commonSectionStyles } from "@/lib/constants/commonStyles";
import { landingPageDummyData } from "@/lib/dummyData/landingPage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

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

function ReviewsSection({
  forHeroSection = false,
}: {
  forHeroSection?: boolean;
}) {
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
        !forHeroSection ? `py-20 bg-muted/50  ${commonSectionStyles}` : "px-4"
      )}
    >
      {/* Background decorative elements */}
      {!forHeroSection && (
        <>
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {!forHeroSection && (
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-bold mb-4 ">
              {landingPageDummyData.reviews.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {landingPageDummyData.reviews.description}
            </p>
          </div>
        )}

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0 || isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 bg-background/80 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex || isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 bg-background/80 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </button>

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
              {landingPageDummyData.reviews.reviews.map(
                (testimonial, index) => {
                  const [name, reviewerGroup] = testimonial.reviewer.split(",");
                  const [reviewerType, country] = reviewerGroup.split("(");
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0"
                      style={{ width: `${100 / cardsToShow}%` }}
                    >
                      <Card className="hover:shadow-xl transition-all duration-300 border-primary/10 h-full group hover:border-primary/20 hover:-translate-y-2">
                        <CardContent className="p-6 md:p-8 h-full flex flex-col">
                          {/* Quote icon */}
                          <div className="text-4xl text-primary/20 mb-4 group-hover:text-primary/30 transition-colors">
                            "
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                              <img
                                src={testimonial.image}
                                alt={testimonial.title}
                                className="w-16 h-16 rounded-full object-cover border-2 border-primary/10 group-hover:border-primary/30 transition-colors"
                              />
                              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/50 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <span>🇩🇪</span>
                                <span className="font-semibold">
                                  {reviewerType}
                                </span>
                                {`(${country}`}
                              </p>
                            </div>
                          </div>

                          <p className="text-muted-foreground italic flex-grow leading-relaxed">
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
          {!forHeroSection && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-primary w-8"
                      : "bg-blue-primary/30 hover:bg-blue-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide counter */}
          {!forHeroSection && (
            <div className="text-center mt-4 text-sm text-muted-foreground">
              {currentIndex + 1} of {maxIndex + 1}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
