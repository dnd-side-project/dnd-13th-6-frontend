'use client';
import React, { useState } from 'react';

interface NicknameInputProps {
  onValidationChange: (isValid: boolean) => void;
}

function NicknameInput({ onValidationChange }: NicknameInputProps) {
  const [nickname, setNickname] = useState('');
  const helpMessage = {
    error: 'X 이미 사용중인 닉네임이에요',
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
    <div className="flex flex-col">
      {/* input + 버튼 */}
      <div className="border-gray-60 flex w-full items-center border-b-1">
        <input
          className="mb-[12px] min-w-0 flex-1 bg-transparent py-2 text-[20px] font-semibold tracking-[-0.025em] outline-none"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력해주세요"
        />
        <button
          disabled={nickname.trim() === ''}
          className={`footnote mb-[12px] ml-2 flex-shrink-0 rounded-xl border-1 px-[15px] py-[8px] whitespace-nowrap ${nickname.trim() !== '' ? 'border-white text-white' : 'border-gray-60 text-gray-60'}`}
          onClick={handleDuplicateCheck}
        >
          중복 확인
        </button>
      </div>

      {/* validation 메시지 */}
      {validationStatus && (
        <p
          className={`body2 mt-2 truncate ${validationStatus === 'error' ? 'text-[#FF7373]' : 'text-[#00AF49]'}`}
        >
          {helpMessage[validationStatus]}
        </p>
      )}
    </div>
  );
}

export default NicknameInput;
