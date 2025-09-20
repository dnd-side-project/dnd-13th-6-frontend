'use client';
import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import NicknameInput from '@/components/onBoarding/NicknameInput';
import { useSetNickname } from '@/hooks/queries/useSetNickname';
import { AxiosError } from 'axios';

function Page() {
  const [nickname, setNickname] = useState('');
  const [helpMessage, setHelpMessage] = useState('');
  const passMessage = '✔ 사용가능한 닉네임입니다.';

  const { mutate, isPending, isSuccess, isError, error } =
    useSetNickname('onboarding');

  useEffect(() => {
    if (isError && error) {
      if (error instanceof AxiosError && error.response) {
        const apiError = error.response.data as { message: string };
        setHelpMessage(apiError.message || '오류가 발생했습니다.');
      } else {
        setHelpMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [isError, error]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
    setHelpMessage(''); // Reset message on new input
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
          helpMessage={helpMessage}
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
