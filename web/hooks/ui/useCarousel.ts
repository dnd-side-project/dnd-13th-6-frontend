'use client';
import { useState, TouchEvent, useCallback } from 'react';

interface UseCarouselProps {
  slideCount: number;
}

export const useCarousel = ({ slideCount }: UseCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchDiff = touchEndX - touchStartX;

      if (touchDiff < -50 && index < slideCount - 1) {
        setIndex(index + 1);
      }
      if (touchDiff > 50 && index > 0) {
        setIndex(index - 1);
      }
    },
    [touchStartX, index, slideCount]
  );

  const nextSlide = () => {
    if (index < slideCount - 1) {
      setIndex(index + 1);
    }
  };

  return { index, handleTouchStart, handleTouchEnd, nextSlide };
};
