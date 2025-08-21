'use client';
import React, { useState } from 'react';

interface NicknameInputProps {
  onValidationChange: (isValid: boolean) => void;
}

function NicknameInput({ onValidationChange }: NicknameInputProps) {
  const [nickname, setNickname] = useState('');
  const helpMessage = {
    error: '(이미 사용중인 닉네임이에요)',
    pass: '✔ 사용가능한 닉네임입니다.'
  };
  const [validationStatus, setValidationStatus] = useState<
    'error' | 'pass' | null
  >(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
    setValidationStatus(null);
    onValidationChange(false);
  };

  const handleDuplicateCheck = () => {
    const isDuplicate = Math.random() > 0.5;
    const newStatus = isDuplicate ? 'error' : 'pass';
    setValidationStatus(newStatus);
    onValidationChange(newStatus === 'pass');
  };

  return (
    <div>
      <div className="border-gray-60 mt-[15vh] flex items-center border-b-2">
        <input
          className="flex-grow bg-transparent outline-none"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력해주세요"
        />
        <button
          disabled={nickname.trim() === ''}
          className={`font-regular mb-4 rounded-xl border-2 p-2 text-[0.8125rem] tracking-[-0.025em] ${nickname.trim() !== '' ? 'border-white text-white' : 'border-gray-60 text-gray-60'} `}
          onClick={handleDuplicateCheck}
        >
          중복 확인
        </button>
      </div>
      <p
        className={`body2 mt-3 ${validationStatus === 'error' ? 'text-[#FF7373]' : 'text-[#00AF49]'} `}
      >
        {validationStatus && helpMessage[validationStatus]}
      </p>
    </div>
  );
}

export default NicknameInput;
