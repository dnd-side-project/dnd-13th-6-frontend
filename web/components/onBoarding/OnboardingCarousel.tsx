'use client';
import React from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import OnBoardingWrapper from '@/components/onBoarding/OnBoardingWrapper';
import { useCarousel } from '@/hooks/useCarousel';

interface Slide {
  title: string;
  text: string;
  image: string;
}

interface OnboardingCarouselProps {
  slides: Slide[];
  onComplete: () => void;
}

function OnboardingCarousel({ slides, onComplete }: OnboardingCarouselProps) {
  const { index, handleTouchStart, handleTouchEnd, nextSlide } = useCarousel({
    slideCount: slides.length
  });

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="mt-15 flex flex-grow flex-col"
    >
      <OnBoardingWrapper
        title={slides[index].title}
        text={slides[index].text}
      />
      {/* 이미지 + 점 */}
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center pt-20">
        <Image
          src={`/assets/icon/${slides[index].image}.svg`}
          alt={slides[index].image}
          width={index === 2 ? 275 : 243}
          height={index === 2 ? 275 : 243}
          priority
          className="max-w-[70vw] object-contain"
        />
        <div className="mt-19 flex justify-between gap-[3vw]">
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
      <>
        {index !== slides.length - 1 ? (
          <div className="absolute right-4 bottom-17 left-4">
            <button
              className="text-gray-60 float-right text-[1rem] sm:text-[1rem]"
              onClick={nextSlide}
            >
              건너뛰기
            </button>
          </div>
        ) : (
          <div className="absolute right-4 bottom-10 left-4">
            <Button className="h-15 w-full" onClickAction={onComplete}>
              시작하기
            </Button>
          </div>
        )}
      </>
    </div>
  );
}

export default OnboardingCarousel;