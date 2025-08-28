'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.key;
    const index = code.findIndex(char => char === '');
    const newCode = [...code];
    if (event.key === 'Backspace' && (index > 0 || index === -1)) {
      newCode[index === -1 ? 5 : index - 1] = '';
      setCode(newCode);
      return;
    }
    if (index === -1) return; // 모든 칸이 채워져 있으면 무시

    newCode[index] = value.at(-1) || ''; // 마지막 문자만 사용
    setCode(newCode);
  };

  return (
    <div className="flex justify-evenly gap-2">
      {code.map((char, idx) => (
        <input
          key={idx}
          type="number"
          inputMode="numeric"
          name={`code-${idx}`}
          value={char}
          onChange={() => {}}
          onKeyUp={e => handleChange(e)}
          className="block h-16 w-13 flex-1 rounded-xl bg-[#3A3A3C] p-4 text-center text-2xl text-[28px] font-bold text-white"
        />
      ))}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
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
