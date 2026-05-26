import { useEffect, useRef } from "react";
import { useRouter, useLocation } from "@tanstack/react-router";
import { NAV_LINKS } from "@/lib/constants";

export function ScrollNavigator() {
  const router = useRouter();
  const location = useLocation();
  const isCooldown = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleNavigate = (direction: "next" | "prev") => {
      if (isCooldown.current) return;

      // Determine current index in the NAV_LINKS array
      const currentIndex = NAV_LINKS.findIndex((link) => link.to === location.pathname);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      if (direction === "next" && currentIndex < NAV_LINKS.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (direction === "prev" && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      if (nextIndex !== currentIndex) {
        isCooldown.current = true;
        // Navigate to the new section
        router.navigate({ to: NAV_LINKS[nextIndex].to });
        
        // 1-second cooldown to prevent rapid switching
        setTimeout(() => {
          isCooldown.current = false;
        }, 1000);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Check if it's primarily a horizontal scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // threshold to prevent micro-movements from triggering
        if (e.deltaX > 40) {
          // Scrolling right
          handleNavigate("next");
        } else if (e.deltaX < -40) {
          // Scrolling left
          handleNavigate("prev");
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      // Check if the swipe was predominantly horizontal and long enough (>50px)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swiped left across screen -> means we want to see the "next" page
          handleNavigate("next");
        } else {
          // Swiped right across screen -> means we want to see "prev" page
          handleNavigate("prev");
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    // Use passive listeners for better scroll performance
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, router]);

  return null; // This component handles logic only, no UI
}
