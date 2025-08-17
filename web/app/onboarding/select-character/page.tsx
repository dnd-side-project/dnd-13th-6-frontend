'use client';
import React, { TouchEvent, useRef, useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

function Page() {
  const slides = [{ image: 'pig' }, { image: 'elephant' }, { image: 'img3' }];
  const router = useRouter();
  const [index, setIndex] = useState(0);

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
      if (index < slides.length - 1) {
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
    <div className="flex flex-col justify-between flex-grow p-4 overflow-hidden">
      <div>
        <ProgressBar progress={70} className="h-[6px]" />
        <p className="text-gray-20 text-[26px] font-bold whitespace-pre-line mt-[51px] leading-[35px] tracking-[-0.025em]">
          {`반가워요🍀\n함께 할 행운 배지를 골라주세요!`}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
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
            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{ width: `${itemWidth}px` }}
              >
                <Image
                  src={`/assets/icon/${slide.image}.svg`}
                  alt=""
                  width={itemWidth}
                  height={itemWidth}
                  priority
                  className={`object-contain w-full h-auto transition-transform duration-300 ${
                    index === i ? 'scale-100' : 'scale-75'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-[3vw] mt-[3vh]">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all w-[14px] h-[14px] ${
                index === i ? 'bg-primary' : 'bg-gray-60'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex  justify-center items-center whitespace-pre-line text-center mb-[4vh]">
        <p className="text-gray-40 text-[13px] leading-[1.2] tracking-[-0.025em] ">
          {
            '다양한 세계의 행운을 상징하는\n배지들이 당신의 목표를 응원해요\n클로버를 모아 새로운 행운을 만나보세요'
          }
        </p>
      </div>
      <Button
        className="w-full h-15 mb-5"
        onClick={() => {
          router.push('/onboarding/setup-target');
        }}
      >
        다음으로
      </Button>
    </div>
  );
}

export default Page;
