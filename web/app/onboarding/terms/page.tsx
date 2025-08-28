'use client';
import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import OnBoardingWrapper from '@/components/onBoarding/OnBoardingWrapper';
import TermsAgreements from '@/components/onBoarding/TermsAgreements';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { MODULE } from '@/utils/apis/api';

function Page() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  const handleAgreementChange = (isValid: boolean) => {
    setIsButtonDisabled(!isValid);
  };
  useEffect(() => {
    const cookie = document.cookie;
    const cookieArray = cookie.split(';');
    const accessToken = cookieArray.find(cookie =>
      cookie.startsWith('accessToken=')
    );
    const refreshToken = cookieArray.find(cookie =>
      cookie.startsWith('refreshToken=')
    );
    const refreshTokenValue = refreshToken?.split('=')[1];
    const accessTokenValue = accessToken?.split('=')[1];

    postMessageToApp(
      MODULE.AUTH,
      JSON.stringify({
        accessToken: accessTokenValue,
        refreshToken: refreshTokenValue
      })
    );
  }, []);

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
        onClickAction={() => {
          router.push('/onboarding/setup-nickname');
        }}
      >
        다음으로
      </Button>
    </div>
  );
}

export default Page;
