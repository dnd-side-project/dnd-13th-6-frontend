'use client';
import React, { TouchEvent, useRef } from 'react';
import Image from 'next/image';

interface Character {
  image: string;
}

interface CharacterCarouselProps {
  characters: Character[];
  index: number;
  setIndex: (text: number) => void;
}

function CharacterCarousel({
  characters,
  index,
  setIndex
}: CharacterCarouselProps) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (touchDiff > swipeThreshold) {
      if (index < characters.length - 1) {
        setIndex(index + 1);
      }
    } else if (touchDiff < -swipeThreshold) {
      if (index > 0) {
        setIndex(index - 1);
      }
    }
  };

  const itemWidth = 201;
  const itemGap = 32;

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <div
        className="w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex items-center transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(calc(50% - ${itemWidth / 2}px - ${index * (itemWidth + itemGap)}px))`,
            gap: `${itemGap}px`
          }}
        >
          {characters.map((character, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: `${itemWidth}px` }}
            >
              <Image
                src={`/assets/icon/${character.image}.svg`}
                alt={`${character.image}`}
                width={itemWidth}
                height={itemWidth}
                priority
                className={`h-auto w-full object-contain transition-transform duration-300 ${
                  index === i ? 'scale-100' : 'scale-75'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[3vh] flex gap-[3vw]">
        {characters.map((_, i) => (
          <div
            key={i}
            className={`h-[14px] w-[14px] rounded-full transition-all ${
              index === i ? 'bg-primary' : 'bg-gray-60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterCarousel;
