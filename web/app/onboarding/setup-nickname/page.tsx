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
    <div className="flex flex-col flex-grow p-4">
      <div>
        <ProgressBar progress={50} className="h-[6px]" />
        <p className="text-gray-20 text-[26px] font-bold whitespace-pre-line mt-[51px] leading-[35px] tracking-[-0.025em]">
          {`닉네임을\n설정해주세요!`}
        </p>
      </div>
      <NicknameInput onValidationChange={handleValidationChange} />
      <div className="mt-auto">
        <Button
          className="w-full h-15 mb-5"
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
