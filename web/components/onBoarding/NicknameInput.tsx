'use client';
import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Button from '@/components/common/Button';
import { useSetNickname } from '@/hooks/queries/useSetNickname';

function NicknameInput({ type }: { type: 'onboarding' | 'profile' }) {
  const [nickname, setNickname] = useState('');

  const [helpMessage, setHelpMessage] = useState('');
  const passMessage = '✔ 사용가능한 닉네임입니다.';

  const { mutate, isPending, isSuccess, isError, error } = useSetNickname(type);

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
    <>
      <div className="border-gray-60 flex items-center border-b-2">
        <input
          className="flex-grow bg-transparent text-[20px] font-semibold tracking-[-0.025em] outline-none"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력해주세요"
          disabled={isPending}
        />
      </div>
      <p
        className={`body2 mt-3 ${isError ? 'text-[#FF7373]' : 'text-[#00AF49]'}`}
      >
        {isError ? helpMessage : isSuccess ? passMessage : ''}
      </p>
      <div className="absolute bottom-15 w-[calc(100vw-32px)]">
        <Button
          className="mb-5 h-15 w-full"
          onClickAction={handleSubmit}
          disabled={isPending || !nickname}
        >
          {isPending ? '설정 중...' : '닉네임 설정'}
        </Button>
      </div>
    </>
  );
}

export default NicknameInput;
