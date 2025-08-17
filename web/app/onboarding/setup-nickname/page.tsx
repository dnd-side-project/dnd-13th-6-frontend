'use client';
import React, { useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const [nickname, setNickname] = useState('');
  const helpMessage = {
    error: '(이미 사용중인 닉네임이에요)',
    pass: '✔ 사용가능한 닉네임입니다.'
  };
  const [test, setTest] = useState<'error' | 'pass' | null>(null);
  const onClick = () => {
    setTest(prev => (prev === 'pass' ? 'error' : 'pass'));
  };
  const router = useRouter();
  return (
    <div className="flex flex-col flex-grow p-4">
      <div>
        <ProgressBar progress={50} className="h-[6px]" />
        <p className="text-gray-20 text-[26px] font-bold whitespace-pre-line mt-[51px] leading-[35px] tracking-[-0.025em]">
          {`닉네임을\n설정해주세요!`}
        </p>
      </div>
      <div className="flex items-center border-gray-60 border-b-2 mt-[15vh]">
        <input
          className="flex-grow bg-transparent outline-none"
          value={nickname}
          onChange={e => setNickname(e.target.value.trim())}
        />
        <button
          disabled={nickname.trim() === ''}
          className={` border-2 p-2 rounded-xl mb-4 font-regular text-[0.8125rem] tracking-[-0.025em]
           ${nickname.trim() !== '' ? 'border-white text-white ' : 'border-gray-60 text-gray-60'}
           `}
          onClick={onClick}
        >
          중복 확인
        </button>
      </div>
      <p
        className={`body2 mt-3
      ${test === 'error' ? 'text-[#FF7373]' : 'text-[#00AF49]'}
      `}
      >
        {test && helpMessage[test]}
      </p>
      <div className="mt-auto">
        <Button
          className="w-full h-15 mb-5"
          disabled={test !== 'pass'}
          onClick={() => router.push('/onboarding/select-character')}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}

export default Page;
