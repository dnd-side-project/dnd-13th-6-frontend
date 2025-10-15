'use client';
import React from 'react';
import Button from '@/components/common/Button';

interface NicknameInputProps {
  nickname: string;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpMessage?: string;
  isError?: boolean;
  isSuccess?: boolean;
  passMessage?: string;
  isPending?: boolean;
  type: 'onboarding' | 'profile';
  onSubmit?: () => void;
}

function NicknameInput({
  nickname,
  onNicknameChange,
  helpMessage,
  isError,
  isSuccess,
  passMessage,
  isPending,
  onSubmit
}: NicknameInputProps) {
  return (
    <>
      <div className="border-gray-60 flex items-center border-b-2">
        <input
          className="flex-grow bg-transparent text-[20px] font-semibold tracking-[-0.025em] outline-none"
          value={nickname}
          onChange={onNicknameChange}
          placeholder="닉네임을 입력해주세요"
          disabled={isPending}
        />
      </div>
      <p
        className={`body2 mt-3 ${isError ? 'text-[#FF7373]' : 'text-[#00AF49]'}`}
      >
        {isError ? helpMessage : isSuccess ? passMessage : ''}
      </p>
      {onSubmit && (
        <div className="absolute bottom-15 w-[calc(100vw-32px)]">
          <Button
            className="mb-5 h-15 w-full"
            onClickAction={onSubmit}
            disabled={isPending || !nickname}
          >
            {isPending ? '설정 중...' : '닉네임 설정'}
          </Button>
        </div>
      )}
    </>
  );
}

export default NicknameInput;
