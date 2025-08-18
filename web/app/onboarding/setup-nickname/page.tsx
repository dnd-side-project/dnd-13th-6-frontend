'use client';
import React, { useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import NicknameInput from '@/components/onBoarding/NicknameInput';

function Page() {
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const router = useRouter();

  const handleValidationChange = (isValid: boolean) => {
    setIsNicknameValid(isValid);
  };

  return (
    <div className="flex flex-grow flex-col">
      <div>
        <ProgressBar progress={50} className="h-[6px]" />
        <p className="text-gray-20 mt-[51px] text-[26px] leading-[35px] font-bold tracking-[-0.025em] whitespace-pre-line">
          {`닉네임을\n설정해주세요!`}
        </p>
      </div>
      <NicknameInput onValidationChange={handleValidationChange} />
      <div className="mt-auto">
        <Button
          className="mb-5 h-15 w-full"
          disabled={!isNicknameValid}
          onClick={() => router.push('/onboarding/select-character')}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}

export default Page;
