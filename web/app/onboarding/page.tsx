'use client';
import React, { TouchEvent, useState } from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const slides: { title: string; text: string; image: string }[] = [
    {
      title: '지금 친구가 \n어디쯤 달리고 있을까?',
      text: '함께 달리며, 행운의 클로버를 보내 응원해보세요.',
      image: 'onboarding1'
    },
    {
      title: '우리 팀 목표, \n세계의 행운이 함께 응원해요!',
      text: '크루 목표는 매주 확인! 성공할 때마다 클로버 득템!',
      image: 'onboarding2'
    },
    {
      title: '같이 달리는 기쁨,\n지금 여기서 시작해요!',
      text: '',
      image: 'img3'
    }
  ];

  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const router = useRouter();

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
      className="min-h-screen flex flex-col justify-between px-[5vw]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 글 영역 - 위쪽 */}
      <div className="pt-[16vh]">
        <p className="font-bold text-[1.625rem] text-gray-20 tracking-[-0.025em] leading-[1.35] whitespace-pre-line ">
          {slides[index].title}
        </p>
        <p className="pretendard-headline2 whitespace-pre-line text-gray-60 mt-[1.5vh] sm:mt-[2vh] leading-[1.375] text-[0.9375rem] sm:text-[1.5vw]">
          {slides[index].text}
        </p>
      </div>

      {/* 이미지 + 점 */}
      <div className="flex flex-col items-center mt-[-9vh]">
        <Image
          src={`/assets/onboarding/${slides[index].image}.svg`}
          alt={slides[index].image}
          width={243}
          height={243}
          priority
          className="object-contain max-w-[70vw]"
        />
        <div className="flex gap-[3vw] mt-[8vh]">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                index === i
                  ? 'bg-primary w-[32px] h-[14px]'
                  : 'bg-gray-60 w-[14px] h-[14px]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="h-[8vh]">
        {index !== 2 ? (
          <button
            className="float-right text-gray-60 text-[0.875rem] sm:text-[1rem]"
            onClick={() => setIndex(index + 1)}
          >
            건너뛰기
          </button>
        ) : (
          <Button
            className="h-[6vh] w-full text-[1rem] sm:text-[1.25rem]"
            onClick={() => router.replace('/login')}
          >
            시작하기
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
