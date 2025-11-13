import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const tutors = [
  {
    name: "Dr. Amanda H",
    credentials: "DPhil Literature, University of Oxford",
    description:
      "Specializes in Medieval English literature and poetry. Published author with extensive teaching experience.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
  },
  {
    name: "Dr. Kieron W",
    credentials: "DPhil English Literature, University of Oxford",
    description:
      "Award-winning poet and creative writing specialist. Former poet in residence at prestigious institutions.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
  },
  {
    name: "Prof. Sarah M",
    credentials: "PhD Physics, University of Cambridge",
    description:
      "Research physicist with 15 years of teaching experience. Published extensively in quantum mechanics.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop",
  },
  {
    name: "Dr. James L",
    credentials: "PhD Mathematics, University of Cambridge",
    description:
      "Mathematics professor with expertise in advanced calculus and theoretical mathematics. Passionate about making math accessible.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "Prof. Elena R",
    credentials: "DPhil History, University of Oxford",
    description:
      "Renowned historian specializing in European history. Bestselling author and frequent media contributor.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
];

function AboutTutors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Responsive card display
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
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, tutors.length - cardsToShow);

  const nextSlide = useCallback(() => {
    if (isAnimating || currentIndex >= maxIndex) return;

    setDirection("right");
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex, maxIndex]);

  const prevSlide = useCallback(() => {
    if (isAnimating || currentIndex <= 0) return;

    setDirection("left");
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        setDirection("left");
        setCurrentIndex(0);
      } else {
        nextSlide();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, nextSlide]);

  // Card entrance animations based on position
  const getCardAnimation = (cardIndex: number) => {
    const relativeIndex = cardIndex - currentIndex;
    if (isAnimating) {
      if (direction === "right") {
        return "animate-in slide-in-from-right-10 duration-500";
      } else {
        return "animate-in slide-in-from-left-10 duration-500";
      }
    }

    // Staggered entrance for initial load
    return `animate-in fade-in-0 zoom-in-95 duration-500 delay-${
      relativeIndex * 100
    }`;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-center mb-6">
            Exceptional Tutors
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our tutors are expert academics, passionate about their subjects,
            and here to guide you towards success.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0 || isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 bg-background/90 backdrop-blur-sm rounded-full p-3 md:p-4 shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 group"
            aria-label="Previous tutors"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary/80" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex || isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 bg-background/90 backdrop-blur-sm rounded-full p-3 md:p-4 shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 group"
            aria-label="Next tutors"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary/80" />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className={`flex gap-8 transition-transform duration-500 ${
                isAnimating
                  ? direction === "right"
                    ? "ease-out"
                    : "ease-in-out"
                  : "ease-in-out"
              }`}
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsToShow)
                }%)`,
              }}
            >
              {tutors.map((tutor, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <Card
                    className={`hover:shadow-2xl transition-all duration-500 border-primary/20 bg-gradient-to-b from-background to-muted/50 h-full group hover:scale-105 ${getCardAnimation(
                      index
                    )}`}
                  >
                    <CardContent className="p-8 text-center relative overflow-hidden">
                      {/* Hover effect background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10">
                        {/* Image with elegant frame */}
                        <div className="relative mx-auto mb-6 w-36 h-36">
                          <img
                            src={tutor.image}
                            alt={tutor.name}
                            className="w-full h-full rounded-full object-cover border-4 border-primary/10 group-hover:border-primary/30 transition-all duration-500 shadow-lg"
                          />
                          {/* Decorative elements */}
                          <div className="absolute -inset-2 rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500"></div>
                          <div className="absolute -inset-4 rounded-full border border-primary/10 group-hover:border-primary/20 transition-all duration-700"></div>
                        </div>

                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                          {tutor.name}
                        </h3>

                        <p className="text-sm text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
                          {tutor.credentials}
                        </p>

                        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          {tutor.description}
                        </p>

                        {/* Expertise indicator */}
                        <div className="mt-6 flex justify-center items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-muted-foreground font-medium">
                            Available for Mentorship
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators - Dots with numbers */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left");
                  setCurrentIndex(index);
                }}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 border ${
                  index === currentIndex
                    ? "bg-primary text-primary-foreground border-primary scale-110"
                    : "bg-background text-muted-foreground border-primary/30 hover:border-primary/50 hover:scale-105"
                }`}
                aria-label={`Go to tutor group ${index + 1}`}
              >
                <span className="text-sm font-medium">{index + 1}</span>
              </button>
            ))}
          </div>

          {/* Slide counter with total tutors */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            Showing{" "}
            {Math.min(cardsToShow, tutors.length - currentIndex * cardsToShow)}{" "}
            of {tutors.length} Exceptional Tutors
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutTutors;
