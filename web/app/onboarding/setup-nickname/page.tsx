'use client';
import React from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import NicknameInput from '@/components/onBoarding/NicknameInput';

function Page() {
  return (
    <div className="flex w-[calc(100vw-32px)] flex-grow flex-col">
      <div>
        <ProgressBar progress={50} className="h-[6px]" />
        <p className="text-gray-20 mt-[51px] text-[26px] leading-[35px] font-bold tracking-[-0.025em] whitespace-pre-line">
          {`닉네임을\n설정해주세요!`}
        </p>
      </div>
      <div className="mt-[15vh]">
        <NicknameInput type="onboarding" />
      </div>
    </div>
  );
}

export default Page;
