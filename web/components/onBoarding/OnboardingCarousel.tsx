'use client';
import React, { TouchEvent, useState } from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import OnBoardingWrapper from '@/components/onBoarding/OnBoardingWrapper';

interface Slide {
  title: string;
  text: string;
  image: string;
}

interface OnboardingCarouselProps {
  slides: Slide[];
  onComplete: () => void;
}

// 슬라이드
function OnboardingCarousel({ slides, onComplete }: OnboardingCarouselProps) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX;

    if (touchDiff < -50 && index < slides.length - 1) setIndex(index + 1);
    if (touchDiff > 50 && index > 0) setIndex(index - 1);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex flex-grow flex-col p-4"
    >
      <OnBoardingWrapper
        title={slides[index].title}
        text={slides[index].text}
      />
      {/* 이미지 + 점 */}
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <Image
          src={`/assets/onboarding/${slides[index].image}.svg`}
          alt={slides[index].image}
          width={243}
          height={243}
          priority
          className="max-w-[70vw] object-contain"
        />
        <div className="mt-[8vh] flex justify-between gap-[3vw]">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                index === i
                  ? 'bg-primary h-[14px] w-[32px]'
                  : 'bg-gray-60 h-[14px] w-[14px]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="absolute right-4 bottom-11 left-4">
        {index !== slides.length - 1 ? (
          <button
            className="text-gray-60 float-right text-[0.875rem] sm:text-[1rem]"
            onClick={() => setIndex(index + 1)}
          >
            건너뛰기
          </button>
        ) : (
          <Button
            className="h-[6vh] w-full text-[1rem] sm:text-[1.25rem]"
            onClick={onComplete}
          >
            시작하기
          </Button>
        )}
      </div>
    </div>
  );
}

export default OnboardingCarousel;
