'use client';
import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import OnBoardingWrapper from '@/components/onBoarding/OnBoardingWrapper';
import TermsAgreements from '@/components/onBoarding/TermsAgreements';

function Page() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const params = new URLSearchParams(hash);
      const signupToken = params.get('signupToken');
      if (signupToken) {
        sessionStorage.setItem('signupToken', signupToken);
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      }
    }
  }, []);

  const handleAgreementChange = (isValid: boolean) => {
    setIsButtonDisabled(!isValid);
  };

  return (
    <div className="flex flex-grow flex-col">
      {/* ProgressBar는 상단 고정 */}
      <ProgressBar
        progress={20}
        className="mb-[51px] h-[6px]"
        barStyle="h-[8px]"
      />
      {/* 나머지 공간은 온보딩 영역으로 */}
      <OnBoardingWrapper title={`서비스 이용 약관에 \n동의해주세요.`} />
      <TermsAgreements onAgreementChange={handleAgreementChange} />
      <div className="flex-grow" />
      <Button
        className="mb-5 h-15 w-full"
        disabled={isButtonDisabled}
        onClickAction={() => router.push('/onboarding/setup-nickname')}
      >
        다음으로
      </Button>
    </div>
  );
}

export default Page;
