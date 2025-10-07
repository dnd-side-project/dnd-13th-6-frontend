'use client';
import { useRef, useCallback } from 'react';

interface UseSwipeNavigationProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  activationWidth?: number; // 0 to 1 (percentage of screen width)
  threshold?: number; // in pixels
}

export const useSwipeNavigation = ({
  onSwipeLeft,
  onSwipeRight,
  activationWidth = 0.2,
  threshold = 50
}: UseSwipeNavigationProps) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipeActive = useRef(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touchX = e.targetTouches[0].clientX;
      const screenWidth = window.innerWidth;
      const activationZoneWidth = screenWidth * activationWidth;

      if (
        touchX < activationZoneWidth ||
        touchX > screenWidth - activationZoneWidth
      ) {
        isSwipeActive.current = true;
        touchStartX.current = touchX;
        touchEndX.current = touchX; // Initialize touchEndX
      } else {
        isSwipeActive.current = false;
      }
    },
    [activationWidth]
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isSwipeActive.current) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isSwipeActive.current) {
      const swipeDistance = touchStartX.current - touchEndX.current;

      if (swipeDistance > threshold) {
        onSwipeLeft();
      } else if (swipeDistance < -threshold) {
        onSwipeRight();
      }
    }
    isSwipeActive.current = false; // Reset on touch end
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
