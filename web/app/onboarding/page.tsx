'use client';
import React, { useState } from 'react';
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
      title: '우리팀 목표, \n세계의 행운이 함께 응원해요!',
      text: '각 나라의 행운 상징에서 탄생한 캐릭터들과 \n목표를 달성하고, 클로버 보상까지 받아보세요!',
      image: 'img2'
    },
    {
      title: '같이 달리는 기쁨,\n지금 여기서 시작해요!',
      text: '',
      image: 'img3'
    }
  ];

  const [index, setIndex] = useState(0);
  const router = useRouter();
  return (
    <>
      {/* 글 영역 - 위쪽 */}
      <div className="ml-3 mt-10">
        <p className="text-gray-20 text-2xl font-bold whitespace-pre-line">
          {slides[index].title}
        </p>
        <p className="whitespace-pre-line text-base text-gray-60 mt-2">
          {slides[index].text}
        </p>
      </div>

      {/* 이미지 + 점 - 화면 정중앙 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <Image
          src={`/assets/onboarding/${slides[index].image}.png`}
          alt={slides[index].image}
          width={243}
          height={243}
          priority
          className="object-contain"
        />
        <div className="flex gap-2">
          <div
            className={`h-3 rounded-full  ${index === 0 ? 'bg-primary w-8' : 'bg-gray-60 w-3 '}`}
          />
          <div
            className={`w-3 h-3 rounded-full  ${index === 1 ? 'bg-primary w-8' : 'bg-gray-60 w-3 '}`}
          />
          <div
            className={`w-3 h-3 rounded-full  ${index === 2 ? 'bg-primary w-8' : 'bg-gray-60 w-3 '}`}
          />
        </div>
      </div>

      {/* 버튼 */}
      {index !== 2 ? (
        <button
          className="absolute bottom-13 right-5 text-gray-60"
          onClick={() => setIndex(index + 1)}
        >
          건너뛰기
        </button>
      ) : (
        <Button
          className="absolute bottom-13 h-13 left-5 right-5"
          onClick={() => router.replace('/login')}
        >
          시작하기
        </Button>
      )}
    </>
  );
}

export default Page;
