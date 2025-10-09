'use client';
import React, { useState } from 'react';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useTargetDistance } from '@/hooks/running/useTargetDistance';
import { useCurrentPosition } from '@/hooks/running/useCurrentPosition';

function Page() {
  const router = useRouter();
  const [onFocus, setOnFocus] = useState(false);
  const { position } = useCurrentPosition();

  const {
    targetDistance,
    handleDistanceChange,
    formatAndSetDistance,
    saveDistanceToStorage
  } = useTargetDistance();

  const handleStartRun = () => {
    saveDistanceToStorage();
    router.push('/start-count');
  };

  return (
    <div className="relative h-screen">
      <GoogleMap height={'100vh'} paths={[[position]]} type="prepare" />

      {/* 하단 카드 */}
      <div
        className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-center transition-all duration-300 ease-in-out ${
          onFocus ? 'bottom-2/3 translate-y-1/2' : 'bottom-10'
        }`}
      >
        {/* 거리 목표 버튼 */}
        <button className="font-pretendard mb-3 rounded-full bg-[#1c1c1e]/50 px-6 py-2 text-lg font-medium text-white backdrop-blur-sm">
          거리 목표
        </button>
        {/* 카드 영역 */}
        <div
          className="flex h-[40vh] w-[90vw] flex-col items-center justify-between rounded-3xl bg-[#1c1c1e]/70 p-10 text-center shadow-lg"
          style={{ backdropFilter: 'blur(1px)' }}
        >
          <p className="text-xl text-white/70">이번 러닝 목표</p>
          <div className="flex max-w-[320px] items-baseline justify-center space-x-1">
            <input
              className="font-lufga w-full [appearance:textfield] border-none bg-transparent text-right text-8xl font-extrabold text-white italic focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="text"
              inputMode="decimal"
              value={targetDistance}
              placeholder="3.00"
              onFocus={() => setOnFocus(true)}
              onChange={handleDistanceChange}
              onBlur={() => {
                setOnFocus(false);
                formatAndSetDistance();
              }}
            />
            <span className="font-lufga text-3xl font-semibold text-gray-50 italic">
              km
            </span>
          </div>
          <Button
            className="mb-5 w-50 rounded-full p-4 text-xl"
            onClickAction={handleStartRun}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
