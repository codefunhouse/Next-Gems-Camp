"use client";
// hooks/useScrollEffect.ts
import { useEffect, useRef, useState } from "react";

const useScrollEffect = (threshold: number = 50) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;

        requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > threshold);
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return hasScrolled;
};

export default useScrollEffect;
