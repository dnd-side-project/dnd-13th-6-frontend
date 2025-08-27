'use client';
import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { registerWithNickname } from '@/utils/apis/auth';
import { updateNickname } from '@/utils/apis/member';

function NicknameInput({ type }: { type: 'onboarding' | 'profile' }) {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const [helpMessage, setHelpMessage] = useState('');
  const passMessage = '✔ 사용가능한 닉네임입니다.';
  const [validationStatus, setValidationStatus] = useState<
    'error' | 'pass' | null
  >(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
    setValidationStatus(null);
  };

  const handleDuplicateCheck = async () => {
    try {
      if (type === 'onboarding') {
        await registerWithNickname(nickname);
      } else {
        await updateNickname(nickname);
      }

      setValidationStatus('pass');
      handlePost();
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        const apiError = err.response.data as {
          status: string;
          code: string;
          message: string;
        };
        const message = apiError.message;
        console.log(message);
        setValidationStatus('error');
        setHelpMessage(message); // message를 상태로 표시
      } else {
        console.error(err);
      }
    }
  };
  const handlePost = () => {
    if (type === 'onboarding') {
      router.push('/onboarding/select-character');
    } else {
      router.push('/main');
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
        />
        {/*<button*/}
        {/*  disabled={validationStatus === 'pass'}*/}
        {/*  className={`font-regular mb-4 rounded-xl border-2 p-2 text-[0.8125rem] tracking-[-0.025em] ${validationStatus !== 'pass' ? 'border-white text-white' : 'border-gray-60 text-gray-60'} `}*/}
        {/*  onClick={handleDuplicateCheck}*/}
        {/*>*/}
        {/*  중복 확인*/}
        {/*</button>*/}
      </div>
      <p
        className={`body2 mt-3 ${validationStatus === 'error' ? 'text-[#FF7373]' : 'text-[#00AF49]'}`}
      >
        {validationStatus === 'error'
          ? helpMessage
          : validationStatus === 'pass'
            ? passMessage
            : ''}
      </p>
      <div className="absolute bottom-15 w-[calc(100vw-32px)]">
        <Button
          className="mb-5 h-15 w-full"
          onClickAction={handleDuplicateCheck}
        >
          닉네임 설정
        </Button>
      </div>
    </>
  );
}

export default NicknameInput;
