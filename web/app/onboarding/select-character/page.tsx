'use client';
import React from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import CharacterCarousel from '@/components/onBoarding/CharacterCarousel';

function Page() {
  const characters = [
    { image: 'pig' },
    { image: 'elephant' },
    { image: 'img3' }
  ];
  const router = useRouter();

  return (
    <div className="flex flex-grow flex-col justify-between overflow-hidden">
      <div>
        <ProgressBar progress={70} className="h-[6px]" />
        <p className="text-gray-20 mt-[51px] text-[26px] leading-[35px] font-bold tracking-[-0.025em] whitespace-pre-line">
          {`반가워요\n함께 할 행운 배지를 골라주세요!`}
        </p>
      </div>

      <CharacterCarousel characters={characters} />

      <div className="mb-[4vh] flex items-center justify-center text-center whitespace-pre-line">
        <p className="text-gray-40 text-[13px] leading-[1.2] tracking-[-0.025em]">
          {
            '다양한 세계의 행운을 상징하는\n배지들이 당신의 목표를 응원해요\n클로버를 모아 새로운 행운을 만나보세요'
          }
        </p>
      </div>
      <Button
        className="mb-5 h-15 w-full"
        onClickAction={() => {
          router.push('/onboarding/setup-target');
        }}
      >
        다음으로
      </Button>
    </div>
  );
}

export default Page;
