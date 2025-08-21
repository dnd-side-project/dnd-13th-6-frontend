'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const clover = 20;
  const [isAnimating, setIsAnimating] = useState(false);
  const validateCount = () => {
    return clover / 10 >= 1;
  };
  const [isOnClick, setIsOnClick] = useState(false);
  const router = useRouter();
  const handleGacha = () => {
    if (validateCount()) {
      setIsOnClick(true);
      setIsAnimating(true);
      setTimeout(() => {
        router.push('/badge-collection/gacha/result');
      }, 3000);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden"
      style={{ height: 'calc(100vh - 147px)' }}
    >
      {/* 상단 텍스트 */}
      <p className="onboarding mt-6 text-center whitespace-pre-line sm:mt-12">
        {validateCount()
          ? `오늘의 행운\n배지를 뽑아보세요!`
          : `클로버가 조금 부족해요\n러닝으로 더 모아볼까요?`}
      </p>

      {/* 이미지 화면 정중앙 고정 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={
            validateCount()
              ? '/assets/gacha/pickgachaball.svg'
              : '/assets/gacha/disabledgachaball.svg'
          }
          alt="가챠공"
          width={validateCount() ? 270 : 228}
          height={validateCount() ? 270 : 228}
          className={isAnimating ? 'animate-roll' : ''}
        />
      </div>

      {/* 하단 버튼 */}
      <div className="absolute bottom-0 w-full">
        {!isOnClick && (
          <>
            <p className="pretendard-headline2 text-gray-60 mb-[26px] text-center">
              [사후르]님은 가챠뽑기권 <span className="text-gray-20">1장</span>{' '}
              소유중
            </p>
            <Button
              className="mb-5 h-15 w-full"
              disabled={!validateCount()}
              onClick={handleGacha}
            >
              캐릭터 뽑기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
