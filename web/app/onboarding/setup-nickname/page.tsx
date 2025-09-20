'use client';
import React, { useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import NicknameInput from '@/components/onBoarding/NicknameInput';
import { useSetNickname } from '@/hooks/queries/useSetNickname';

function Page() {
  const [nickname, setNickname] = useState('');
  const passMessage = '✔ 사용가능한 닉네임입니다.';

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    setErrorMessage
  } = useSetNickname('onboarding');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
    setErrorMessage(''); // Reset message on new input
  };

  const handleSubmit = () => {
    if (nickname) {
      mutate(nickname);
    }
  };

  return (
    <div className="flex w-[calc(100vw-32px)] flex-grow flex-col">
      <div>
        <ProgressBar progress={50} className="h-[6px]" />
        <p className="text-gray-20 mt-[51px] text-[26px] leading-[35px] font-bold tracking-[-0.025em] whitespace-pre-line">
          {`닉네임을\n설정해주세요!`}
        </p>
      </div>
      <div className="mt-[15vh]">
        <NicknameInput
          type="onboarding"
          nickname={nickname}
          onNicknameChange={handleNicknameChange}
          onSubmit={handleSubmit}
          helpMessage={errorMessage}
          isError={isError}
          isSuccess={isSuccess}
          passMessage={passMessage}
          isPending={isPending}
        />
      </div>
    </div>
  );
}

export default Page;
