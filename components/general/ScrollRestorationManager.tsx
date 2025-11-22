"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ScrollRestorationManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Function to save the current scroll position
    const saveScrollPosition = () => {
      const scrollPositions = JSON.parse(
        sessionStorage.getItem("scrollPositions") || "{}"
      );
      // Use the full route (path + query string) as a unique key
      scrollPositions[pathname + searchParams.toString()] = window.scrollY;
      sessionStorage.setItem(
        "scrollPositions",
        JSON.stringify(scrollPositions)
      );
    };

    // Function to restore the saved scroll position
    const restoreScrollPosition = () => {
      const scrollPositions = JSON.parse(
        sessionStorage.getItem("scrollPositions") || "{}"
      );
      const savedPosition = scrollPositions[pathname + searchParams.toString()];

      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      }
    };

    // Restore position on page load
    restoreScrollPosition();

    // Save position when the page is about to unload (refresh or close)
    window.addEventListener("beforeunload", saveScrollPosition);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [pathname, searchParams]); // Rerun this effect if the route changes

  return null; // This component doesn't render anything visually
}
