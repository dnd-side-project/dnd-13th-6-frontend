'use client';
import { useState } from 'react';
import { API_END_POINT, MODULE } from '@/utils/apis/api';
import api from '@/utils/apis/customAxios';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
function CodePad({
  code,
  setCode
}: {
  code: string[];
  setCode: (code: string[]) => void;
}) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = event.target.value;

    // 빈 값이거나 숫자/영문자만 허용
    if (value === '') {
      const newCode = [...code];
      newCode[idx] = value.toUpperCase(); // 대문자로 변환
      setCode(newCode);

      // 다음 입력칸으로 자동 포커스
      if (value && idx < 5) {
        const nextInput = document.querySelector(
          `input[name="code-${idx + 1}"]`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (event.key === 'Backspace' && !code[idx] && idx > 0) {
      // 현재 칸이 비어있고 백스페이스를 누르면 이전 칸으로 이동
      const prevInput = document.querySelector(
        `input[name="code-${idx - 1}"]`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        const newCode = [...code];
        newCode[idx - 1] = '';
        setCode(newCode);
      }
    }
  };

  return (
    <div className="flex justify-evenly gap-2">
      {code.map((char, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="text"
          name={`code-${idx}`}
          value={char}
          maxLength={1}
          onChange={e => handleChange(e, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          className="block h-16 w-13 flex-1 rounded-xl bg-[#3A3A3C] p-4 text-center text-2xl text-[28px] font-bold text-white focus:ring-2 focus:ring-[#32FF76] focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
        />
      ))}
    </div>
  );
}

export default function Page() {
  const [code, setCode] = useState(Array(6).fill(''));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post(API_END_POINT.CREWS.JOIN_CREW(), {
        code: code.join('')
      });
      postMessageToApp(
        MODULE.PUSH,
        JSON.stringify({
          url: `/(tabs)/(group)/running/${code.join('')}`
        })
      );
    } catch (error) {
      console.error(error, 'here11');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[calc(100vh-60px)] flex-col px-2"
    >
      {/* Content */}
      <div className="mt-8 flex flex-1 flex-col">
        <p className="text-lg font-bold text-white">
          초대 코드를 입력해주세요.
        </p>
        <div className="mt-16 w-full">
          <CodePad code={code} setCode={setCode} />
        </div>
      </div>
      {/* Footer */}
      <button
        type="submit"
        disabled={code.join('').trim().length !== 6}
        className="mt-auto mb-3 w-full self-end rounded-xl bg-[#32FF76] disabled:opacity-20"
      >
        <div className="py-3 text-[18px] font-bold text-black">
          초대 코드 입력하기
        </div>
      </button>
    </form>
  );
}
