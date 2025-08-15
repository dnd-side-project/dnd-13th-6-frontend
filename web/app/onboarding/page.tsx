'use client';
import React, { TouchEvent, useState } from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const slides: { title: string; text: string; image: string }[] = [
    {
      title: '지금 친구가 \n어디쯤 달리고 있을까?',
      text: '실시간으로 함께 느끼는 러닝, 이제 당신 차례에요.',
      image: 'img1'
    },
    {
      title: '우리 팀 목표, \n세계의 행운이 함께 응원해요!',
      text: '각 나라의 행운 상징에서 탄생한 캐릭터들과 \n 목표를 달성하고, 클로버 보상까지 받아보세요!',
      image: 'img2'
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

    // 오른쪽으로 스와이프 (->)
    if (touchDiff < -50 && index < slides.length - 1) {
      setIndex(index + 1);
    }

    // 왼쪽으로 스와이프 (<-)
    if (touchDiff > 50 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-between px-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 글 영역 - 위쪽 */}
      <div className="pt-[132px]">
        <p className="text-gray-20 text-[26px] font-bold whitespace-pre-line leading-[35px] tracking-[-0.025em]">
          {slides[index].title}
        </p>
        <p className="pretendard-headline2 whitespace-pre-line text-gray-60 mt-[12px] leading-[22px]">
          {slides[index].text}
        </p>
      </div>

      {/* 이미지 + 점 - 화면 정중앙 */}
      <div className="flex flex-col items-center">
        <Image
          src={`/assets/onboarding/${slides[index].image}.png`}
          alt={slides[index].image}
          width={243}
          height={243}
          priority
          className="object-contain"
        />
        <div className="flex gap-3 mt-[78px]">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-3.5 rounded-full transition-all ${index === i ? 'bg-primary w-8' : 'bg-gray-60 w-3.5'}`}
            />
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="h-20">
        {index !== 2 ? (
          <button
            className="float-right text-gray-60"
            onClick={() => setIndex(index + 1)}
          >
            건너뛰기
          </button>
        ) : (
          <Button
            className="h-13 w-full"
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
